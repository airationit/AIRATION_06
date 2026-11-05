import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);

// Execute the real server metadata exports; isolate UI imports and API fixtures.
// No browser, network, Next build, or application business logic is needed.
function load(file, mocks = {}) {
  const filename = resolve(root, file);
  const loaded = { exports: {} };
  const code = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const localRequire = (id) => {
    if (id in mocks) return mocks[id];
    if (["@/config/site", "@/lib/seo/page-metadata"].includes(id)) return load(`src/${id.slice(2)}.ts`, mocks);
    if (id === "react") return require(id);
    return {};
  };
  vm.runInNewContext(code, { module: loaded, exports: loaded.exports, require: localRequire, URL, console }, { filename });
  return loaded.exports;
}

const { siteConfig } = load("src/config/site.ts");
const imageUrl = (image) => typeof image === "string" ? image : image.url;
function assertSocial(metadata, canonical, image = siteConfig.ogImage) {
  assert.equal(metadata.alternates.canonical, canonical);
  assert.equal(metadata.openGraph.url, canonical);
  assert.equal(metadata.openGraph.siteName, "Hirance");
  assert.equal(metadata.openGraph.locale, "en_IN");
  assert.equal(imageUrl(metadata.openGraph.images[0]), image);
  assert.equal(metadata.twitter.card, "summary_large_image");
  assert.equal(imageUrl(metadata.twitter.images[0]), image);
  assert.equal(new URL(image, siteConfig.url).protocol, "https:");
}

test("homepage and root use the official absolute social image and requested branding", () => {
  const home = load("src/app/page.tsx").metadata;
  const layout = load("src/app/layout.tsx").metadata;
  assertSocial(home, "https://hirance.com");
  assert.equal(home.openGraph.title, "Hirance — Next-Gen Swipe-Based Hiring Platform");
  assert.equal(home.openGraph.description, "Discover job opportunities and connect with employers on Hirance.");
  assert.equal(layout.metadataBase.href, "https://hirance.com/");
  assert.equal(imageUrl(layout.twitter.images[0]), siteConfig.ogImage);
  assert.equal(new URL(siteConfig.ogImage).origin, "https://hirance.com");
  // A root file-based OG image would override page-specific social images.
  for (const name of ["opengraph-image", "twitter-image"]) {
    for (const ext of ["png", "jpg", "jpeg", "tsx", "ts"]) assert.equal(existsSync(resolve(root, `src/app/${name}.${ext}`)), false);
  }
});

test("all static public page metadata keeps canonical and image references consistent", () => {
  function visit(dir) {
    for (const item of readdirSync(resolve(root, dir), { withFileTypes: true })) {
      const file = `${dir}/${item.name}`;
      if (item.isDirectory()) { if (!item.name.includes("[")) visit(file); continue; }
      if (item.name !== "page.tsx") continue;
      const metadata = load(file).metadata;
      if (!metadata) continue; // redirect-only routes and metadata re-exports
      assert.equal(new URL(metadata.alternates.canonical).origin, siteConfig.url, file);
      assert.equal(imageUrl(metadata.openGraph.images[0]), siteConfig.ogImage, file);
      assert.equal(metadata.openGraph.locale, "en_IN", file);
      if (metadata.twitter) assert.equal(imageUrl(metadata.twitter.images[0]), siteConfig.ogImage, file);
      assert.equal(readFileSync(resolve(root, file), "utf8").includes('/og.png'), false, file);
    }
  }
  visit("src/app");
});

test("blog articles preserve their cover image and fall back to Hirance artwork", async () => {
  for (const cover of [undefined, { url: "https://cdn.hirance.com/article.png", alt: "Article cover" }]) {
    const { generateMetadata } = load("src/app/blog/[slug]/page.tsx", {
      "@/lib/api/blogs": { fetchBlogBySlug: async () => ({ title: "Career guide", slug: "career-guide", excerpt: "Career advice", tags: [], cover_image: cover }) },
    });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "career-guide" }) });
    assertSocial(metadata, "https://hirance.com/blog/career-guide", cover?.url || siteConfig.ogImage);
    assert.equal(metadata.openGraph.type, "article");
  }
});

test("company previews use the relevant company logo only on that company's route", async () => {
  for (const logo of ["", "https://cdn.hirance.com/employer.png"]) {
    const { generateMetadata } = load("src/app/company/[id]/page.tsx", {
      "@/lib/api/companies": { extractCompanyId: (id) => id, fetchCompanyById: async () => ({ data: { company_name: "Employer", company_logo: logo } }) },
    });
    assertSocial(await generateMetadata({ params: Promise.resolve({ id: "employer" }) }), "https://hirance.com/company/employer", logo || siteConfig.ogImage);
  }
});

test("job detail metadata retains its dynamic image and clean canonical", async () => {
  const { generateMetadata } = load("src/app/jobs/view/[id]/page.tsx", {
    "@/lib/jobs-data": { getJobById: async () => ({ slug: "developer-123", title: "Developer", company: "Employer" }) },
    "@/lib/seo/generateJobTitle": { generateJobTitle: () => "Developer at Employer" },
    "@/lib/seo/generateJobDescription": { generateJobDescription: () => "Apply on Hirance" },
    "@/lib/seo/generateJobKeywords": { generateJobKeywords: () => ["Developer"] },
  });
  assertSocial(await generateMetadata({ params: Promise.resolve({ id: "123" }) }), "https://hirance.com/jobs/view/developer-123", "https://hirance.com/jobs/view/123/opengraph-image");
});

test("category metadata stays specific to its route", async () => {
  const { generateMetadata } = load("src/app/blog/category/[category]/page.tsx");
  assertSocial(await generateMetadata({ params: Promise.resolve({ category: "career-advice" }) }), "https://hirance.com/blog/category/career-advice");
});

test("social PNG is 1200 by 630, reproduces the official icon, and fixes the legacy URL", async () => {
  const file = resolve(root, "public/images/hirance-social.png");
  const info = await sharp(file).metadata();
  assert.equal(info.format, "png");
  assert.equal(info.width, 1200);
  assert.equal(info.height, 630);
  assert.ok(readFileSync(file).equals(readFileSync(resolve(root, "public/og.png"))));
  const resized = await sharp(resolve(root, "public/images/icon.png"))
    .resize(230, 214, { fit: "contain", background: "#ffffff" }).png().toBuffer();
  const expected = await sharp(resized).flatten({ background: "#ffffff" }).raw().toBuffer();
  const actual = await sharp(file).extract({ left: 100, top: 130, width: 230, height: 214 }).removeAlpha().raw().toBuffer();
  // PNG alpha compositing can round individual channels by one level.
  assert.equal(actual.length, expected.length);
  assert.ok(actual.every((value, index) => Math.abs(value - expected[index]) <= 1), "Preview must contain the official icon");
});

test("crawler rules allow social preview access", () => {
  const robots = load("src/app/robots.ts").default();
  assert.equal(robots.rules.userAgent, "*");
  assert.equal(robots.rules.allow, "/");
  assert.equal(robots.sitemap, "https://hirance.com/sitemap.xml");
});
