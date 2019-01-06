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

module.exports = {
  branch: "master",
  tagFormat:"${version}",
  analyzeCommits: {
    preset: 'eslint',
    releaseRules: releaseRules, // optional, only if you want to set up new/modified release rules inside another file
    parserOpts: {
      headerPattern: /^(?::([\w-]*):)?\s*(\w*):\s*(.*)$/,
      headerCorrespondence: [
        'emoji',
        'tag',
        'message',
      ],
    },
  },
  generateNotes: {
    preset: 'eslint',
    parserOpts: {
      headerPattern: /^(?::([\w-]*):)?\s*(\w*):\s*(.*)$/,
      headerCorrespondence: [
        'emoji',
        'tag',
        'message',
      ],
    },
  },
};