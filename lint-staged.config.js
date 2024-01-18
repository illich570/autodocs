export default {
  // This will lint JavaScript files
  '**/*.(tsx|ts)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // this will Format MarkDown and JSON
  '**/*.(json)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
}
