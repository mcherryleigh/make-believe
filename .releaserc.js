/* eslint-disable no-useless-escape */

const releaseRules = [
  //patch
  {type: 'chore', release: 'patch'},
  {type: 'docs', release: 'patch'},
  {type: 'fix', release: 'patch'},
  {type: 'test', release: 'patch'},
  //minor
  {type: 'feat', release: 'minor'},
  {type: 'perf', release: 'minor'},
  {type: 'refactor', release: 'minor'},
  //major
  {tag: 'breaking', release: 'major'},
  {tag: 'major', release: 'major'}
];

const parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
  headerCorrespondence: [
    `type`,
    `scope`,
    `subject`
  ],
};

module.exports = {
  branch: "master",
  tagFormat:"${version}",
  preset: 'angular',
  plugins: [
    ["@semantic-release/git", {
      "assets": ["./**/*.{js}", "docs", "package.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ],
  analyzeCommits: {
    releaseRules: releaseRules, // optional, only if you want to set up new/modified release rules inside another file
    parserOpts: parserOpts,
  },
  generateNotes: {
    parserOpts: parserOpts,
  },
};