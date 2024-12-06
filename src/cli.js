import { Command } from 'commander';
import genDiff from './gendiff.js';

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
      const { format } = program.opts();
      const diff = genDiff(file1, file2, format);
      console.log(diff);
    })
    .parse();
};
