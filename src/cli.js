import { Command } from 'commander';
import gendiff from './gendiff.js';
import parse from './parsers.js';
import showDiff from './show.js';

export default () => {
  const program = new Command();

  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<file1>', 'first file to compare')
    .argument('<file2>', 'second file to compare')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((file1, file2) => {
      const diffObj = gendiff(parse(file1), parse(file2));
      const { format } = program.opts();
      const result = format === 'stylish' ? showDiff(diffObj) : showDiff(diffObj);
      console.log(result);
    })
    .parse();
};
