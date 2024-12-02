import { Command } from 'commander';
import gendiff from './gendiff.js';
import parse from './parsers.js';

export default () => {
  const program = new Command();

  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<file1>', 'first file to compare')
    .argument('<file2>', 'second file to compare')
    .option('-f, --format [type]', 'output format')
    .action((file1, file2) => {
      const diffObj = gendiff(parse(file1), parse(file2));
      const result = Object.entries(diffObj).reduce(
        (acc, val) => [...acc, `  ${val[0]}: ${val[1]}`],
        [],
      );
      console.log(['{', ...result, '}'].join('\n'));
    })
    .parse();
};
