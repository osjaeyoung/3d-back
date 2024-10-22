import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { join } from 'path';
import { Observable } from 'rxjs';
import { FILE_BASE_DIR, FILE_UPLOAD_DIR } from 'src/constant/file.constant';
import { existsFile, makeDir, removeAllFilesSync } from 'src/utils/file';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user = context.switchToHttp().getRequest().user;
    const userFileUploadDir = join(FILE_UPLOAD_DIR, user.sub);

    if (!existsFile(FILE_BASE_DIR)) {
      makeDir(FILE_BASE_DIR);
    }

    if (!existsFile(FILE_UPLOAD_DIR)) {
      makeDir(FILE_UPLOAD_DIR);
    }

    if (!existsFile(userFileUploadDir)) {
      makeDir(userFileUploadDir);
    }

    if (existsFile(userFileUploadDir)) {
      removeAllFilesSync(userFileUploadDir);
    }

    return next.handle();
  }
}
