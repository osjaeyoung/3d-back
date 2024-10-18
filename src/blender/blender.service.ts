import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';
import {
  BLENDER_CLI_DIR,
  BLENDER_DIR,
  BLENDER_FILE_DIR,
  BLENDER_OUTPUT_DIR,
  MESHROOM_OBJ_DIR,
} from 'src/constant/file.constant';
import { FileNotFoundException } from 'src/libs/exception/file.exception';
import { UnCatchedException } from 'src/libs/exception/uncatch.exception';
import { existsFile, makeDir, readFile } from 'src/utils/file';

@Injectable()
export class BlenderService {
  run() {
    const exec = () => {
      const files = readFile(MESHROOM_OBJ_DIR);

      if (!files) throw new FileNotFoundException();

      if (!existsFile(BLENDER_OUTPUT_DIR)) {
        makeDir(BLENDER_OUTPUT_DIR);
      }

      const pyProcess = spawnSync(
        BLENDER_DIR,
        [
          '-b',
          '-P',
          BLENDER_CLI_DIR,
          '--',
          '--ratio',
          '0.5',
          '--inm',
          MESHROOM_OBJ_DIR,
          '--outm',
          BLENDER_FILE_DIR,
        ],
        { stdio: ['inherit', 'pipe', 'pipe'] },
      );

      const log = pyProcess.output.join('');

      if (!/result/.test(log)) {
        const error = pyProcess.stderr.toString().split('\n');
        const filteredError = error.filter((v) => /Error/.test(v)).join();
        throw new UnCatchedException(filteredError);
      }

      const result = /\[.*\]/g.exec(log)[0];
      const parse = JSON.parse(`${result.replaceAll("'", '"')}`);
      return { data: parse };
    };

    try {
      const result = exec();
      return result;
    } catch (e: any) {
      console.error('run blender failed.', e);
      throw e;
    }
  }
}
