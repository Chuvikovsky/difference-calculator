import { cwd } from 'node:process';
import path from 'node:path';

const createAbsolutePath = (pathToFile) => path.resolve(cwd(), pathToFile);

const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const getKey = (key) => `${key.slice(0, -1)}`;

export { createAbsolutePath, isObject, getKey };
