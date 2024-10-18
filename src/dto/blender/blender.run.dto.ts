import { ApiProperty } from '@nestjs/swagger';

class BlenderOutout {
  @ApiProperty({
    type: 'number',
  })
  vertex: number;

  @ApiProperty({
    type: 'number',
  })
  edge: number;

  @ApiProperty({
    type: 'number',
  })
  polygon: number;
}

class BlenderResult {
  @ApiProperty({
    type: BlenderOutout,
  })
  from: BlenderOutout;

  @ApiProperty({
    type: BlenderOutout,
  })
  to: BlenderOutout;
}

export class BlenderRunDto {
  @ApiProperty({
    isArray: true,
    type: BlenderResult,
    example: [
      {
        from: {
          vertex: 11986,
          edge: 35359,
          polygon: 23362,
        },
        to: {
          vertex: 6114,
          edge: 17805,
          polygon: 11680,
        },
      },
    ],
  })
  data: BlenderResult[];
}
