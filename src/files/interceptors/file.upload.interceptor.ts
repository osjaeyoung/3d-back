import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FILE_UPLOAD_DIR } from 'src/constant/file.constant';
import { removeAllFilesSync } from 'src/utils/file';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    removeAllFilesSync(FILE_UPLOAD_DIR);

    return next.handle();
  }
}
