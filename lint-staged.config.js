export default {
  // This will lint JavaScript files
  '**/*.(tsx|ts)': (filenames) => [
    `pnpm eslint --fix ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],

  // this will Format MarkDown and JSON
  '**/*.(json)': (filenames) => `pnpm prettier --write ${filenames.join(' ')}`,
}
