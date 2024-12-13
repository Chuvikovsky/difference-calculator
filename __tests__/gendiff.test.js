import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToFix = (file) => path.join(__dirname, '..', '__fixtures__', file);

const path1Json = pathToFix('file1.json');
const path2Json = pathToFix('file2.json');
const path1Yml = pathToFix('file1.yml');
const path2Yml = pathToFix('file2.yml');
const path1Yaml = pathToFix('file1.yaml');
const path2Yaml = pathToFix('file2.yaml');

test.each([
  {
    name: 'json stylish', file1: path1Json, file2: path2Json, style: 'stylish',
  },
  {
    name: 'yaml stylish', file1: path1Yml, file2: path2Yml, style: 'stylish',
  },
  {
    name: 'yaml stylish with .yaml file', file1: path1Yaml, file2: path2Yaml, style: 'stylish',
  },
  {
    name: 'json plain', file1: path1Json, file2: path2Json, style: 'plain',
  },
  {
    name: 'yaml plain', file1: path1Yml, file2: path2Yml, style: 'plain',
  },
  {
    name: 'json json', file1: path1Json, file2: path2Json, style: 'json',
  },
  {
    name: 'yaml json', file1: path1Yml, file2: path2Yml, style: 'json',
  },
])('$name', ({ file1, file2, style }) => {
  const result = gendiff(file1, file2, style);
  expect(result).toMatchSnapshot();
});

test('yaml txt formatter', () => {
  expect(() => { gendiff(path1Yml, path2Yml, 'txt'); }).toThrow();
});

test('json txt formatter', () => {
  expect(() => { gendiff(path1Json, path2Json, 'txt'); }).toThrow();
});

test('unknown file extenstion', () => {
  const path1 = pathToFix('file1.txt');
  const path2 = pathToFix('file2.txt');
  expect(() => { gendiff(path1, path2, 'json'); }).toThrow();
});
