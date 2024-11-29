import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('flat json', () => {
  const file1 = readFileSync(
    path.join(__dirname, '..', '__fixtures__', 'file1.json'),
    'utf-8'
  );
  const file2 = readFileSync(
    path.join(__dirname, '..', '__fixtures__', 'file2.json'),
    'utf-8'
  );
  const diffObj = gendiff(JSON.parse(file1), JSON.parse(file2));
  const result = Object.entries(diffObj).reduce(
    (acc, val) => [...acc, `  ${val[0]}: ${val[1]}`],
    []
  );
  expect(['{', ...result, '}'].join('\n')).toMatchSnapshot();
});
