import { join } from 'path';
import { homedir } from 'os';

const FILE_BASE_DIR = join(process.cwd(), 'file');

export const FILE_UPLOAD_DIR = join(FILE_BASE_DIR, 'upload');

export const MESHROOM_OUTPUT_DIR = join(FILE_BASE_DIR, 'meshroom');
export const MESHROOM_OBJ_DIR = join(
  MESHROOM_OUTPUT_DIR,
  '13_Texturing',
  'texturedMesh.obj',
);

export const CLI_DIR = join(process.cwd(), 'cli', 'meshroom.py');
export const MESHROOM_BIN_DIR = join(
  homedir(),
  'Desktop',
  'Meshroom-2020.1.1',
  'aliceVision',
  'bin',
);
