import { Injectable } from '@nestjs/common';
import {
  CLI_DIR,
  FILE_UPLOAD_DIR,
  MESHROOM_OUTPUT_DIR,
  MESHROOM_BIN_DIR,
} from 'src/constant/file.constant';
import { spawn } from 'child_process';
import { readDir, removeAllFilesSync } from 'src/utils/file';
import { FileNotFoundException } from 'src/libs/exception/file.exception';
import { join } from 'path';

// 임시 테스트
let pid = -1;

@Injectable()
export class MeshroomService {
  run() {
    const exec = () => {
      const files = readDir(FILE_UPLOAD_DIR);

      if (files.length === 0) throw new FileNotFoundException();

      const pyProcess = spawn('python', [
        CLI_DIR,
        MESHROOM_BIN_DIR,
        MESHROOM_OUTPUT_DIR,
        FILE_UPLOAD_DIR,
      ]);

      pyProcess.stdout.on('data', (data) => {
        console.log(data.toString().replace(/\\n/g, '\n'));
      });

      pyProcess.stderr.on('data', (data) => {
        console.log(data.toString().replace(/\\n/g, '\n'));
      });

      // 임시 테스트
      pid = pyProcess.pid;
    };

    try {
      process.kill(pid);
      exec();
    } catch (e) {
      console.error(e);
      exec();
    } finally {
      return 'ok';
    }
  }

  stop() {
    try {
      process.kill(pid);
      removeAllFilesSync(MESHROOM_OUTPUT_DIR);
    } catch (e) {
      console.error(e);
    } finally {
      return 'ok';
    }
  }

  getState() {
    const files = readDir(MESHROOM_OUTPUT_DIR);

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
