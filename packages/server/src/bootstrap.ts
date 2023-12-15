import { getEnv, isProd } from '@koh/common';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { StripUndefinedPipe } from './stripUndefined.pipe';
import * as expressSession from 'express-session';
import * as passport from 'passport';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap(hot: any): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  if (process.env.NODE_ENV === 'production') {
    setupAPM(app);
  }
  app.enableShutdownHooks(); // So we can clean up SSE.
  addGlobalsToApp(app);
  app.setGlobalPrefix('api/v1');

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
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(3002);

  if (hot) {
    hot.accept();
    hot.dispose(() => app.close());
  }
}

function setupAPM(app: INestApplication): void {
  Sentry.init({
    dsn: process.env.SENTRY_APM_DSN,
    tracesSampleRate: 0.2,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Postgres(),
      new Tracing.Integrations.Express({
        app: app.getHttpAdapter().getInstance(),
      }),
      new RewriteFrames(),
    ],
    // Service Version is the git hash, added by Webpack at build time.
    release: process.env.SERVICE_VERSION,
    environment: getEnv(),
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
