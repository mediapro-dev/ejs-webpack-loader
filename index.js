// requires

const ejs = require("ejs");
const path = require("path");

// private

const minify = (html) => {
  if (html) {
    html = html
      .replace(/<\!--.*?-->/g, "")
      .replace(/\>[\r\n ]+\</g, "><")
      .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
      .trim();
  }
  return html;
};

// export

module.exports = function (source) {
  // webpack options

  const options = {
    minify: false,
    ...(this.query || {}),
  };

  // minify html

  options.minify && (source = minify(source));

  // compile template

  var template = ejs.compile(source, { client: true });

  // minify js with terser

  return `module.exports = ${template.toString()}`;
};
