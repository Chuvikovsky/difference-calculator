import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createAbsolutePath } from '../utils.js';

export default (filePath) => {
  const extension = path.extname(filePath);
  const absolutePath = createAbsolutePath(filePath);
  const content = readFileSync(absolutePath, { encoding: 'utf-8' });
  return { content, extension };
};
