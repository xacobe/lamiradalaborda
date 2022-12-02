# Dark-Portfolio-Template-11ty

A starter repository showing how to build a blog with the [Eleventy](https://github.com/11ty/eleventy) static site generator.
Uses the W3CSS template "Dark Portfolio Template"

[![Build Status](https://travis-ci.com/jmschrack/Dark-Portfolio-Template-11ty.svg?branch=dev)](https://travis-ci.org/jmschrack/dark-portfolio-template-11ty)

## Demos

* [GitHub Pages](https://jmschrack.github.io/Dark-Portfolio-Template-11ty/)



## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/jmschrack/Dark-Portfolio-Template-11ty.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npx eleventy
```

Or build and host locally for local development
```
npx eleventy --serve
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a content page.
* `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
* Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `home.njk` and `about/index.md`.
* Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
	* Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
* The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
* This example uses three layouts:
  * `_includes/layouts/base.njk`: the top level HTML structure
  * `_includes/layouts/home.njk`: the inicio page template (wrapped into `base.njk`)
  * `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
* `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `home.njk` has an example of how to use it.

* The latest 6 blog posts with the "photo" tag wil be used in the photo gallery.

* Palette of colours used: https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226

* Using node version 16.13.0

* Set up purgecss https://www.npmjs.com/package/eleventy-plugin-purgecss

* Using img2picture plugin for replace img with picture and create diferent sizes https://www.npmjs.com/package/eleventy-plugin-img2picture
