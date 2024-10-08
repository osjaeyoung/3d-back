import type { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

export class InitSwaggerDocument {
  private _builder = new DocumentBuilder();
  private _config: Omit<OpenAPIObject, 'paths'>;
  private _document: OpenAPIObject;

  constructor(app: INestApplication) {
    this.initializeOptions();
    this.createDocument(app);
    this.setup(app);
  }

  private initializeOptions() {
    this._config = this._builder
      .setTitle('Backend API')
      .setDescription(
        `테스트용 백엔드 API 입니다.<br><br>
        **개발 참고**<br>
         - **/file/upload** : 이미지 업로드 시 기존에 업로드 된 이미지들은 초기화 됩니다.<br>
         - **/file/download** : 가장 최근 만들어진 obj 파일이 다운로드 됩니다.<br>
         - **/meshroom/run** : 만약 run 작업 도중에 다시 run을 수행하면 기존 작업은 초기화되고 다시 run을 실행합니다.<br>
         - **/meshroom/stop** : 실행중인 프로세스가 없어도 항상 200 status code를 반환합니다.
         <br>
         <br>
         **참고**<br>
         - 빠른 프로토 타이핑을 위해 기본적인 api 로직이 들어있습니다. 기능 추가 및 validation은 계속 추가해나갈 예정입니다. 진행하시면서 언제든지 질문 주세요!!
         `,
      )
      .build();
  }

  private createDocument(app: INestApplication) {
    this._document = SwaggerModule.createDocument(app, this._config);
  }

  private setup(app: INestApplication) {
    SwaggerModule.setup('api', app, this._document);
  }
}
