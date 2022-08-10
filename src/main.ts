import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidateInputPipe } from './common/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype',
    );
    res.header('access-control-expose-headers', 'Authorization');
    next();
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());
  const config = new DocumentBuilder()
    .setTitle('DOC - ZULU')
    .setDescription('The documentation to API Zulu')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: `Doc - Zulu ${process.env.STAGE}`,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, customOptions);
  const port = process.env.PORT || 3001;

  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
