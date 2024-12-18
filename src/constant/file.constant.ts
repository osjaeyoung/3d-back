import { join } from 'path';
import { homedir } from 'os';

export const FILE_BASE_DIR = join(process.cwd(), 'file');
export const FILE_UPLOAD_DIR = join(FILE_BASE_DIR, 'upload');

/**
 * csm.ai
 */
export const CSM_AI_OUTPUT_DIR = join(FILE_BASE_DIR, 'csm.ai');
export const CSM_AI_OBJ_DIR = (id: string) =>
  join(CSM_AI_OUTPUT_DIR, id, 'mesh.obj');

/**
 * meshroom
 */
export const MESHROOM_OUTPUT_DIR = join(FILE_BASE_DIR, 'meshroom');
export const MESHROOM_OBJ_DIR = (id: string) =>
  join(MESHROOM_OUTPUT_DIR, id, '13_Texturing', 'texturedMesh.obj');

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
export const BLENDER_FILE_DIR = (id: string) =>
  join(BLENDER_OUTPUT_DIR, id, 'blenderedMesh.obj');
export const BLENDER_CLI_DIR = join(process.cwd(), 'cli', 'blender.py');
