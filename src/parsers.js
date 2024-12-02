import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import createAbsolutePath from './path.js';

const parse = (filePath) => {
  const ext = path.extname(filePath);
  const absolutePath = createAbsolutePath(filePath);
  const content = readFileSync(absolutePath, { encoding: 'utf-8' });
  switch (ext) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error(`Unknown file extension ${ext}`);
  }
};

export default parse;
