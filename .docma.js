const Docma = require('docma');

const config = {
  debug: 5,
  jsdoc: {
    encoding: 'utf8',
    recurse: false,
    pedantic: false,
    access: null,
    package: null,
    module: true,
    undocumented: false,
    undescribed: false,
    ignored: false,
    hierarchy: true,
    sort: 'alphabetic',
    relativePath: null,
    filter: null,
    allowUnknownTags: true,
    plugins: [],
  },
  markdown: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    tasks: true,
    emoji: true,
  },
  app: {
    title: 'Make-Believe',
    meta: null,
    base: '/',
    entrance: 'content:readme', // use "api:your-lib" to set the entrance to a JSAPI page
    routing: 'path',
    server: 'github',
    favicon: 'docs/img/favicon/favicon-16x16.png', // local path of favicon to be copied
  },
  src: [
    './src/**/*.js',
    './LICENSE:md',
    './README.md',
    './docs/*.md'
  ],
  assets: {
    '/img': ['./docs/img/*.*','./docs/img/bubble-logo.svg'],
  },
  dest: './site_output',
  template: {
    path: 'zebra',
    options: {
      title: {
        label: 'Make-Believe',
        href: '.',
      },
      logo: { // URL String or { dark: String, light: String }
        dark: 'img/bubble-logo.svg',
        light: 'img/bubble-logo.svg',
      },
      sidebar: {
        enabled: true,
        outline: 'tree', // "flat" | "tree"
        collapsed: false,
        toolbar: false,
        itemsFolded: false,
        itemsOverflow: 'crop', // "crop" | "shrink"
        badges: true, // true | false | <string-value>
        search: true,
        animations: true,
      },
      symbols: {
        autoLink: true, // "internal" | "external" | true (both)
        params: 'list', // "list" | "table"
        enums: 'list', // "list" | "table"
        props: 'list', // "list" | "table"
        meta: false,
      },
      contentView: {
        bookmarks: 'h1,h2,h3',
        faLibs: 'all', // "all" or "solid"|"regular"|"brands" or comma-separated or null
      },
      navbar: {
        enabled: true,
        fixed: true,
        dark: false,
        animations: true,
        menu: [
          {
            label: 'Home',
            href: '.',
          },
          {
            label: 'Getting Started',
            href: 'getting_started',
          },
          {
            // "iconClass": "fas fa-book",
            label: 'Examples',
            items: [
              { label: 'Simple Example', href: 'simple_example' },
              { separator: true },
              { label: 'Advanced Example', href: 'advanced_example' },
            ],
          },
          {
            label: 'API',
            href: 'api',
          },
          {
            // "iconClass": "fas fa-book",
            label: 'About',
            items: [
              { label: 'License', href: 'license' },
              { separator: true },
              { label: 'Code of Conduct', href: 'code_of_conduct' },
              { separator: true },
              { label: 'Developing', href: 'developing' },
            ],
          },
          {
            iconClass: 'fab fa-lg fa-github',
            label: '',
            href: 'https://github.com/mcherryleigh/make-believe',
            target: '_blank',
          },
        ],
      },
    },
  },
};

console.log(JSON.stringify(config))

/*Docma.create()
  .build(config)
  .catch((error) => {
    console.log(error);
  });*/