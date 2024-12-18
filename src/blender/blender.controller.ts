import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlenderService } from './blender.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/libs/exception/base.exception';
import {
  BlenderRunBodyDto,
  BlenderRunDto,
} from 'src/dto/blender/blender.run.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@ApiTags('blender')
@UseGuards(AuthGuard)
@Controller('blender')
export class BlenderController {
  constructor(private readonly blenderService: BlenderService) {}

  @ApiOperation({
    summary: 'blender 최적화',
    description: `obj 파일을 blender를 활용해 최적화 합니다.`,
  })
  @ApiResponse({
    status: 201,
    type: BlenderRunDto,
  })
  @ApiResponse({
    status: 404,
    type: BaseException,
    example: {
      errorCode: '404',
      statusCode: 404,
      timestamp: '2024-10-07T07:03:55.125Z',
      path: '/blender/run',
    },
    description: '변환된 obj 파일이 존재하지 않는 경우',
  })
  @Post('run')
  run(@Req() req: Request, @Body() { meshUrl }: BlenderRunBodyDto) {
    return this.blenderService.runV2(req.user, meshUrl);
  }
}
