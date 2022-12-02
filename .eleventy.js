const { DateTime } = require("luxon");
const fs = require("fs");
const pluginNavigation = require("@11ty/eleventy-navigation");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const purgeCssPlugin = require("eleventy-plugin-purgecss");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const img2picture = require("eleventy-plugin-img2picture");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

  eleventyConfig.addPlugin(purgeCssPlugin, {
    // Optional: Specify the location of your PurgeCSS config
    config: "./purgecss.config.js",

    // Optional: Set quiet: true to suppress terminal output
    quiet: false,
  });

  eleventyConfig.addPlugin(faviconsPlugin, {
    outputDir: "./_site",
    manifestData: { name: "Eduardo Laborda | La mirada Laborda" },
  });

  eleventyConfig.addPlugin(img2picture, {
    // Should be same as Eleventy input folder set using `dir.input`.
    eleventyInputDir: ".",

    // Output folder for optimized images.
    imagesOutputDir: "_site/img/fotos",

    // URL prefix for images src URLS.
    // It should match with path suffix in `imagesOutputDir`.
    // Eg: imagesOutputDir with `_site/images` likely need urlPath as `/images/`
    urlPath: "/img/fotos/",
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
