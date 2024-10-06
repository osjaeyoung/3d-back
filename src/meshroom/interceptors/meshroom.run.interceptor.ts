import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MESHROOM_OUTPUT_DIR } from 'src/constant/file.constant';
import { removeAllFilesSync } from 'src/utils/file';

@Injectable()
export class MeshroomRunInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    removeAllFilesSync(MESHROOM_OUTPUT_DIR);

    return next.handle();
  }
}
