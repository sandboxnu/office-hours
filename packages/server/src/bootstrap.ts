import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { StripUndefinedPipe } from './stripUndefined.pipe';
import { isProd } from '@koh/common';
import { ApmInterceptor } from './apm.interceptor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap(hot: any): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  addGlobalsToApp(app);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ApmInterceptor());

  if (isProd()) {
    console.log(`Running production at ${process.env.DOMAIN}.`);
  } else {
    console.log(
      `Running non-production at ${process.env.DOMAIN}. THIS MSG SHOULD NOT APPEAR ON PROD VM`,
    );
  }
  app.use(morgan('dev'));
  await app.listen(3002);

  if (hot) {
    hot.accept();
    hot.dispose(() => app.close());
  }
}

// Global settings that should be true in prod and in integration tests
export function addGlobalsToApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new StripUndefinedPipe());
  app.use(cookieParser());
}
