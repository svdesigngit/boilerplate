/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const prettyHtml = require("gulp-pretty-html");
const twig = require("gulp-twig");
const gulpif = require("gulp-if");
const { reload } = require("browser-sync").create();
const fs = require("fs");
const config = require("./config");
const { dump } = require("./utils/dump");
const isDev = process.env.NODE_ENV === "development";

const functions = [
  {
    name: "load",
    func: file => {
      const contents = fs.readFileSync(
        `src/static/data/${ file }.json`,
        "utf8"
      );

      return JSON.parse(contents);
    }
  },
  {
    name: "dump",
    func: dump
  },
  {
    name: "isDev",
    func: () => isDev
  },
  {
    name: "version",
    func: () => new Date().getTime()
  }
];

const filters = [
  {
    name: "customFilter",
    func: function(args) {
      // console.log(arguments);

      return args + " the filter";
    }
  }
]

const compileTwig = cb => {
  const prettyHtmlConfig = {
    indent_size: 4,
    indent_char: " ",
    unformatted: ["code", "em", "strong", "span", "i", "b", "br"],
    content_unformatted: []
  };

  return src(config.pages.input)
    .pipe(plumber(config.notify))
    .pipe(
      twig({
        // base: '', // views base folder
        functions,
        filters,
      })
    )
    .pipe(gulpif(isDev, prettyHtml(prettyHtmlConfig)))
    .pipe(dest(config.pages.output))
    .pipe(reload({ stream: true }));

  // cb();
};

exports.twig = compileTwig;
