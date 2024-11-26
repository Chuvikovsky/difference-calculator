import { Command } from 'commander';

export default () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .parse();

  const options = program.opts();
  console.log(options.format);
};
