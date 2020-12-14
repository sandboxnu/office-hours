import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { NestFactory, Reflector } from '@nestjs/core';
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
  setupAPM(app);
  app.useGlobalInterceptors(new ApmInterceptor(new Reflector()));
  if (isProd()) {
    console.log(`Running production at ${process.env.DOMAIN}.`);
  } else {
    console.log(
      `Running non-production at ${process.env.DOMAIN}. THIS MSG SHOULD NOT APPEAR ON PROD VM`,
    );
  }

  addGlobalsToApp(app);
  app.setGlobalPrefix('api/v1');
  app.use(morgan('dev'));
  await app.listen(3002);

  if (hot) {
    hot.accept();
    hot.dispose(() => app.close());
  }
}

function setupAPM(app: INestApplication): void {
  Sentry.init({
    dsn:
      'https://7300ca8a1f1a4902b0a6f9a889525180@o440615.ingest.sentry.io/5410042',
    tracesSampleRate: 1,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    environment: isProd()
      ? 'production'
      : process.env.DOMAIN &&
        new URL(process.env.DOMAIN).hostname.replace(/\./g, '-'),
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
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
