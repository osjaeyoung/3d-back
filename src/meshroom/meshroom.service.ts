import { Injectable } from '@nestjs/common';
import {
  CLI_DIR,
  FILE_UPLOAD_DIR,
  MESHROOM_OUTPUT_DIR,
  MESHROOM_BIN_DIR,
} from 'src/constant/file.constant';
import { spawn } from 'child_process';
import { readDir } from 'src/utils/file';
import { ERROR } from 'src/constant/error.constant';

// 임시 테스트
let pid = 0;

@Injectable()
export class MeshroomService {
  run() {
    const pyProcess = spawn('python', [
      CLI_DIR,
      MESHROOM_BIN_DIR,
      MESHROOM_OUTPUT_DIR,
      FILE_UPLOAD_DIR,
    ]);

    pyProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    pyProcess.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    // 임시 테스트
    pid = pyProcess.pid;
  }

  stop() {
    try {
      const isKill = process.kill(pid);
      return isKill;
    } catch (e) {
      return false;
    }
  }

  getState() {
    const files = readDir(MESHROOM_OUTPUT_DIR);

    if (!files?.length) return { errorCode: ERROR.NOT_EXIST_FILE };

    const state = files
      .sort((a, b) => {
        const n1 = Number(a.split('_')[0]);
        const n2 = Number(b.split('_')[0]);
        return n1 - n2;
      })
      .slice(-1);

    return { state };
  }
}
