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

test('json stylish', () => {
  const result = gendiff(path1Json, path2Json, 'stylish');
  expect(result).toMatchSnapshot();
});

test('yaml stylish', () => {
  const result = gendiff(path1Yml, path2Yml, 'stylish');
  expect(result).toMatchSnapshot();
});

test('yaml stylish with .yaml file', () => {
  const result = gendiff(path1Yml, path2Yml, 'stylish');
  expect(result).toMatchSnapshot();
});

test('json plain', () => {
  const result = gendiff(path1Json, path2Json, 'plain');
  expect(result).toMatchSnapshot();
});

test('yaml plain', () => {
  const result = gendiff(path1Yml, path2Yml, 'plain');
  expect(result).toMatchSnapshot();
});

test('json json', () => {
  const result = gendiff(path1Json, path2Json, 'json');
  expect(result).toMatchSnapshot();
});

test('yaml json', () => {
  const result = gendiff(path1Yml, path2Yml, 'json');
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
