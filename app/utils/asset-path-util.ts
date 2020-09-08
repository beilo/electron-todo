import path from 'path';
import { app } from 'electron';

const EXTRA_RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'extraResources')
  : path.join(__dirname, '../../extraResources'); // Your relative path may be different!

// https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/2511#issuecomment-657175284
const getAssetPath = (resourceFilename: string): string => {
  return path.join(EXTRA_RESOURCES_PATH, resourceFilename);
};

export default getAssetPath;
