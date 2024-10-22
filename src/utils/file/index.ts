import * as fs from 'fs';
import { join } from 'path';
import { FileNotFoundException } from 'src/libs/exception/file.exception';

export const removeAllFilesSync = (directory: string) => {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(directory, file.name);

      if (file.isDirectory()) {
        fs.rmSync(filePath, { force: true, recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
    // skip
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error(e);
    return;
  }
};

export const readDir = (directory: string) => {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    return files;
  } catch (e: any) {
    console.error(e);
    throw new FileNotFoundException();
  }
};

export const readFile = (directory: string) => {
  try {
    const files = fs.readFileSync(directory);
    return files;
  } catch (e: any) {
    console.error(e);
    throw new FileNotFoundException();
  }
};

export const makeDir = (directory: string) => {
  try {
    const files = fs.mkdirSync(directory);
    console.log('make files', directory, files);
    return files;
  } catch (e: any) {
    console.error(e);
    throw new FileNotFoundException();
  }
};

export const existsFile = (directory: string) => {
  return fs.existsSync(directory);
};
