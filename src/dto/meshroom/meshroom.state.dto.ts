import { ApiProperty } from '@nestjs/swagger';

enum MeshroomState {
  CameraInit = 'CameraInit',
  FeatureExtraction = 'FeatureExtraction',
  ImageMatching = 'ImageMatching',
  featureMatching = 'featureMatching',
  structureFromMotion = 'structureFromMotion',
  PrepareDenseScene = 'PrepareDenseScene',
  DepthMap = 'DepthMap',
  DepthMapFilter = 'DepthMapFilter',
  Meshing = 'Meshing',
  MeshFiltering = 'MeshFiltering',
  MeshDecimate = 'MeshDecimate',
  MeshResampling = 'MeshResampling',
  Texturing = 'Texturing',
}

export class MeshroomStateDto {
  @ApiProperty({
    type: 'number',
    description: 'pipeline의 단계를 나타낸다. (1 ~ 13)',
    example: 1,
  })
  step: number;

  @ApiProperty({
    enum: [
      'CameraInit',
      'FeatureExtraction',
      'ImageMatching',
      'featureMatching',
      'structureFromMotion',
      'PrepareDenseScene',
      'DepthMap',
      'DepthMapFilter',
      'Meshing',
      'MeshFiltering',
      'MeshDecimate',
      'MeshResampling',
      'Texturing',
    ],
    description: 'pipeline',
    example: 'CameraInit',
  })
  pipeline: MeshroomState;

  @ApiProperty({
    type: 'boolean',
    description: '에러 발생 여부',
    example: true,
  })
  isError: boolean;
}
