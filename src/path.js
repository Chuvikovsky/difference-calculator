import { cwd } from 'node:process';
import path from 'node:path';

const createAbsolutePath = (pathToFile) => {
  return path.resolve(cwd(), pathToFile);
};

export { createAbsolutePath };
