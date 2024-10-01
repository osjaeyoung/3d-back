import { Injectable } from '@nestjs/common';
import {
  CLI_DIR,
  FILE_UPLOAD_DIR,
  MESHROOM_OUTPUT_DIR,
} from 'src/constant/file.constant';
import { spawn } from 'child_process';

@Injectable()
export class MeshroomService {
  run() {
    const pyProcess = spawn('python', [
      CLI_DIR,
      MESHROOM_OUTPUT_DIR,
      FILE_UPLOAD_DIR,
    ]);

    pyProcess.stdout.on('data', (data) => {
      console.log(data);
    });
  }
}
