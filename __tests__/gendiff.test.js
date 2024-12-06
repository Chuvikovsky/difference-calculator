import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToFix = (file) => path.join(__dirname, '..', '__fixtures__', file);

test('json stylish', () => {
  const path1 = pathToFix('file1.json');
  const path2 = pathToFix('file2.json');

  const result = gendiff(path1, path2, 'stylish');
  expect(result).toMatchSnapshot();
});

test('yaml stylish', () => {
  const path1 = pathToFix('file1.yml');
  const path2 = pathToFix('file2.yml');

  const result = gendiff(path1, path2, 'stylish');
  expect(result).toMatchSnapshot();
});

test('json plain', () => {
  const path1 = pathToFix('file1.json');
  const path2 = pathToFix('file2.json');

  const result = gendiff(path1, path2, 'plain');
  expect(result).toMatchSnapshot();
});

test('yaml plain', () => {
  const path1 = pathToFix('file1.yml');
  const path2 = pathToFix('file2.yml');

  const result = gendiff(path1, path2, 'plain');
  expect(result).toMatchSnapshot();
});
