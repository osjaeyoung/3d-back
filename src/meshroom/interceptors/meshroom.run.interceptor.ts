import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { join } from 'path';
import { Observable } from 'rxjs';
import { MESHROOM_OUTPUT_DIR } from 'src/constant/file.constant';
import { existsFile, makeDir, removeAllFilesSync } from 'src/utils/file';

@Injectable()
export class MeshroomRunInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user = context.switchToHttp().getRequest().user;
    const userMeshroomDir = join(MESHROOM_OUTPUT_DIR, user.sub);

    if (!existsFile(MESHROOM_OUTPUT_DIR)) {
      makeDir(MESHROOM_OUTPUT_DIR);
    }

    if (existsFile(userMeshroomDir)) {
      removeAllFilesSync(userMeshroomDir);
    }

    return next.handle();
  }
}
