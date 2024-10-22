import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeshroomService } from './meshroom.service';
import { MeshroomRunInterceptor } from './interceptors/meshroom.run.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/libs/exception/base.exception';
import { MeshroomStateDto } from 'src/dto/meshroom/meshroom.state.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('meshroom')
@UseGuards(AuthGuard)
@Controller('meshroom')
export class MeshroomController {
  constructor(private readonly meshroomService: MeshroomService) {}

  @ApiOperation({
    summary: 'meshroom 파이프라인 실행',
    description: `업로드 된 2D 이미지를 3d 이미지로 재구성 합니다. 
      최종 결과물로 obj 파일을 생성합니다. 
      작업 프로세스는 총 13단계이며 **/meshroom/state** api를 통해 
      현재 단계를 확인할 수 있습니다.<br><br>
      **참고**<br>
       파이프라인 중간에 예상치 못한 에러가 (meshroom 프로세스 안에서) 발생하는 경우에는 변환 작업이 도중에 종료됩니다.<br>
      현재는 **/meshroom/state** api를 통해 에러 발생 여부를 파악 가능합니다.<br>
      `,
  })
  @ApiResponse({
    status: 201,
    schema: { type: 'string' },
    example: 'ok',
  })
  @ApiResponse({
    status: 404,
    type: BaseException,
    example: {
      errorCode: '404',
      statusCode: 404,
      timestamp: '2024-10-07T07:03:55.125Z',
      path: '/meshroom/run',
    },
    description: '업로드 된 이미지가 존재하지 않는 경우',
  })
  @Post('run')
  @UseInterceptors(MeshroomRunInterceptor)
  run(@Req() req: Request) {
    return this.meshroomService.run(req.user);
  }

  @ApiOperation({
    summary: 'meshroom 파이프라인 중지',
    description:
      '3d 이미지 재구성 파이프라인을 중지 합니다. meshroom 프로세스가 중지되며 파이프라인의 모든 결과물이 삭제 됩니다.',
  })
  @ApiResponse({
    status: 200,
    schema: { type: 'string' },
    example: 'ok',
  })
  @Get('stop')
  stop(@Req() req: Request) {
    return this.meshroomService.stop(req.user);
  }

  @ApiOperation({
    summary: '파이프라인 상태 조회',
    description: `파이프라인 상태를 조회합니다.<br>
      에러 발생 여부는 **isError** 필드를 통해 확인할 수 있습니다.<br>
      완료 여부는 아래 응답처럼 마지막 상태에 도달하였을 경우 끝났다고 판단하시면 됩니다.<br><br>
      \`\`\`
      { step: 13, pipeline: 'Texturing', isError: false } // 최종 obj 생성 완료
      \`\`\``,
  })
  @ApiResponse({
    status: 200,
    type: MeshroomStateDto,
  })
  @Get('state')
  state(@Req() req: Request) {
    return this.meshroomService.getState(req.user);
  }
}
