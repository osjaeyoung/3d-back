import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';
import { join } from 'path';
import { User } from 'src/auth/types/oauth.type';
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
  run(user: User) {
    const exec = () => {
      const files = readFile(MESHROOM_OBJ_DIR(user.sub));

      if (!files) throw new FileNotFoundException();

      if (!existsFile(BLENDER_OUTPUT_DIR)) {
        makeDir(BLENDER_OUTPUT_DIR);
      }

      if (!existsFile(join(BLENDER_OUTPUT_DIR, user.sub))) {
        makeDir(join(BLENDER_OUTPUT_DIR, user.sub));
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
          MESHROOM_OBJ_DIR(user.sub),
          '--outm',
          BLENDER_FILE_DIR(user.sub),
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
