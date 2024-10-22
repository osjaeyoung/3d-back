import { Injectable } from '@nestjs/common';
import {
  FILE_UPLOAD_DIR,
  MESHROOM_CLI_DIR,
  MESHROOM_OUTPUT_DIR,
  MESHROOM_BIN_DIR,
} from 'src/constant/file.constant';
import { spawn } from 'child_process';
import { existsFile, readDir, removeAllFilesSync } from 'src/utils/file';
import { FileNotFoundException } from 'src/libs/exception/file.exception';
import { join } from 'path';
import { RedisCacheService } from 'src/cache/cache.service';
import { User } from 'src/auth/types/oauth.type';

@Injectable()
export class MeshroomService {
  constructor(private readonly redisCacheService: RedisCacheService) {}
  async run(user: User) {
    const exec = () => {
      const userFileUploadDir = join(FILE_UPLOAD_DIR, user.sub);
      const files = readDir(userFileUploadDir);

      if (files.length === 0) throw new FileNotFoundException();

      const pyProcess = spawn('python', [
        MESHROOM_CLI_DIR,
        MESHROOM_BIN_DIR,
        join(MESHROOM_OUTPUT_DIR, user.sub),
        userFileUploadDir,
      ]);

      // pyProcess.stdout.on('data', (data) => {
      //   console.log(data.toString().replace(/\\n/g, '\n'));
      // });

      // pyProcess.stderr.on('data', (data) => {
      //   console.log(data.toString().replace(/\\n/g, '\n'));
      // });

      this.redisCacheService.set(user.sub, String(pyProcess.pid));
    };

    try {
      const pid = await this.redisCacheService.get(user.sub);
      console.log(pid);
      if (pid) process.kill(Number(pid));
      exec();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      console.error(`meshroom not exist`);
      exec();
    } finally {
      return 'ok';
    }
  }

  async stop(user: User) {
    try {
      const pid = await this.redisCacheService.get(user.sub);
      if (pid) process.kill(Number(pid));
    } catch (e) {
      console.error(e);
    } finally {
      if (existsFile(join(MESHROOM_OUTPUT_DIR, user.sub))) {
        removeAllFilesSync(join(MESHROOM_OUTPUT_DIR, user.sub));
      }
      return 'ok';
    }
  }

  getState(user: User) {
    const files = readDir(join(MESHROOM_OUTPUT_DIR, user.sub));

    if (!files?.length) throw new FileNotFoundException();

    const state = files.sort((a, b) => {
      const n1 = Number(a.name.split('_')[0]);
      const n2 = Number(b.name.split('_')[0]);
      return n1 - n2;
    });

    const successState = state.filter((dir) => {
      const _dir = readDir(join(dir.parentPath, dir.name));

      if (_dir.length > 0) return dir;
      return false;
    });

    const isError = () => {
      const exceptionCondition = successState.length === 12;
      const isError =
        !exceptionCondition &&
        state.length === 13 &&
        state.length > successState.length;

      return isError;
    };

    const currentStep = successState.slice(-1)[0];

    const [step, pipeline] = currentStep.name.split('_');
    return { step: Number(step), pipeline, isError: isError() };
  }
}
