import 'elastic-apm-node/start';
import { bootstrap } from './bootstrap';

declare const module: any;

bootstrap(module.hot);
