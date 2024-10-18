import { join } from 'path';
import { homedir } from 'os';

const FILE_BASE_DIR = join(process.cwd(), 'file');
export const FILE_UPLOAD_DIR = join(FILE_BASE_DIR, 'upload');

/**
 * meshroom
 */
export const MESHROOM_OUTPUT_DIR = join(FILE_BASE_DIR, 'meshroom');
export const MESHROOM_OBJ_DIR = join(
  MESHROOM_OUTPUT_DIR,
  '13_Texturing',
  'texturedMesh.obj',
);

export const MESHROOM_CLI_DIR = join(process.cwd(), 'cli', 'meshroom.py');
export const MESHROOM_BIN_DIR = join(
  homedir(),
  'Desktop',
  'Meshroom-2020.1.1',
  'aliceVision',
  'bin',
);

/**
 *  blender
 */
export const BLENDER_DIR = join(
  homedir(),
  'Desktop',
  'blender-4.2.3-windows-x64',
  'blender',
);
export const BLENDER_OUTPUT_DIR = join(FILE_BASE_DIR, 'blender');
export const BLENDER_FILE_DIR = join(BLENDER_OUTPUT_DIR, 'blenderedMesh.obj');
export const BLENDER_CLI_DIR = join(process.cwd(), 'cli', 'blender.py');
