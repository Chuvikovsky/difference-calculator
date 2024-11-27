import { Command } from 'commander';
// import { cwd } from 'node:process';
// import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createAbsolutePath } from './path.js';
import { getFileExt } from './parse.js';
import gendiff from './gendiff.js';

export default () => {
  const program = new Command();

  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<file1>', 'first file to compare')
    .argument('<file2>', 'second file to compare')
    // .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .action((source1, source2) => {
      const path1 = createAbsolutePath(source1);
      const path2 = createAbsolutePath(source2);
      const content1 = readFileSync(path1, { encoding: 'utf-8' });
      const content2 = readFileSync(path2, { encoding: 'utf-8' });
      // console.log('source1: ', JSON.parse(content1));
      // console.log('source2: ', JSON.parse(content2));
      // const options = program.opts();
      // console.log(getFileExt(source1), getFileExt(source2));
      const diffObj = gendiff(JSON.parse(content1), JSON.parse(content2));
      const result = Object.entries(diffObj).reduce((acc, val) => {
        return [...acc, `  ${val[0]}: ${val[1]}`];
      }, []);
      console.log(['{', ...result, '}'].join('\n'));
    })
    .parse();
};
