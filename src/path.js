import { cwd } from 'node:process';
import path from 'node:path';

const createAbsolutePath = (pathToFile) => path.resolve(cwd(), pathToFile);

export default createAbsolutePath;
