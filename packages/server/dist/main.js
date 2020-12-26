require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(2);
const bootstrap_1 = __webpack_require__(3);
bootstrap_1.bootstrap(module.hot);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node/start");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addGlobalsToApp = exports.bootstrap = void 0;
const core_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const cookieParser = __webpack_require__(6);
const morgan = __webpack_require__(7);
const app_module_1 = __webpack_require__(8);
const stripUndefined_pipe_1 = __webpack_require__(113);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(114);
async function bootstrap(hot) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    app.enableShutdownHooks();
    addGlobalsToApp(app);
    app.setGlobalPrefix('api/v1');
    app.useGlobalInterceptors(new apm_interceptor_1.ApmInterceptor());
    if (common_2.isProd()) {
        console.log(`Running production at ${process.env.DOMAIN}.`);
    }
    else {
        console.log(`Running non-production at ${process.env.DOMAIN}. THIS MSG SHOULD NOT APPEAR ON PROD VM`);
    }
    app.use(morgan('dev'));
    await app.listen(3002);
    if (hot) {
        hot.accept();
        hot.dispose(() => app.close());
    }
}
exports.bootstrap = bootstrap;
function addGlobalsToApp(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalPipes(new stripUndefined_pipe_1.StripUndefinedPipe());
    app.use(cookieParser());
}
exports.addGlobalsToApp = addGlobalsToApp;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(10);
const schedule_1 = __webpack_require__(11);
const course_module_1 = __webpack_require__(12);
const notification_module_1 = __webpack_require__(59);
const login_module_1 = __webpack_require__(66);
const profile_module_1 = __webpack_require__(76);
const question_module_1 = __webpack_require__(84);
const queue_module_1 = __webpack_require__(52);
const seed_module_1 = __webpack_require__(88);
const admin_module_1 = __webpack_require__(93);
const nestjs_command_1 = __webpack_require__(46);
const sse_module_1 = __webpack_require__(56);
const typeormConfig = __webpack_require__(101);
const backfill_module_1 = __webpack_require__(103);
const release_notes_module_1 = __webpack_require__(108);
const nestjs_redis_1 = __webpack_require__(41);
const healthcheck_module_1 = __webpack_require__(110);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeormConfig),
            schedule_1.ScheduleModule.forRoot(),
            login_module_1.LoginModule,
            profile_module_1.ProfileModule,
            course_module_1.CourseModule,
            queue_module_1.QueueModule,
            notification_module_1.NotificationModule,
            question_module_1.QuestionModule,
            seed_module_1.SeedModule,
            config_1.ConfigModule.forRoot({
                envFilePath: [
                    '.env',
                    ...(process.env.NODE_ENV !== 'production' ? ['.env.development'] : []),
                ],
                isGlobal: true,
            }),
            admin_module_1.AdminModule,
            nestjs_command_1.CommandModule,
            sse_module_1.SSEModule,
            backfill_module_1.BackfillModule,
            release_notes_module_1.ReleaseNotesModule,
            nestjs_redis_1.RedisModule.register([{ name: 'pub' }, { name: 'sub' }, { name: 'db' }]),
            healthcheck_module_1.HealthcheckModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = __webpack_require__(5);
const course_controller_1 = __webpack_require__(13);
const queue_module_1 = __webpack_require__(52);
const ical_command_1 = __webpack_require__(58);
const ical_service_1 = __webpack_require__(47);
const heatmap_service_1 = __webpack_require__(45);
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        controllers: [course_controller_1.CourseController],
        imports: [queue_module_1.QueueModule, common_1.CacheModule.register()],
        providers: [ical_command_1.ICalCommand, ical_service_1.IcalService, heatmap_service_1.HeatmapService],
    })
], CourseModule);
exports.CourseModule = CourseModule;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const async_1 = __webpack_require__(18);
const event_model_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(31);
const roles_decorator_1 = __webpack_require__(33);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
const queue_clean_service_1 = __webpack_require__(35);
const queue_sse_service_1 = __webpack_require__(37);
const queue_entity_1 = __webpack_require__(26);
const course_roles_guard_1 = __webpack_require__(43);
const course_entity_1 = __webpack_require__(21);
const heatmap_service_1 = __webpack_require__(45);
const ical_service_1 = __webpack_require__(47);
const office_hour_entity_1 = __webpack_require__(27);
const moment = __webpack_require__(36);
let CourseController = class CourseController {
    constructor(connection, queueCleanService, queueSSEService, heatmapService, icalService) {
        this.connection = connection;
        this.queueCleanService = queueCleanService;
        this.queueSSEService = queueSSEService;
        this.heatmapService = heatmapService;
        this.icalService = icalService;
    }
    async get(id) {
        const course = await course_entity_1.CourseModel.findOne(id, {
            relations: ['queues', 'queues.staffList'],
        });
        course.officeHours = await typeorm_1.getRepository(office_hour_entity_1.OfficeHourModel)
            .createQueryBuilder('oh')
            .select(['id', 'title', `"startTime"`, `"endTime"`])
            .where('oh.courseId = :courseId', { courseId: course.id })
            .getRawMany();
        course.heatmap = await this.heatmapService.getCachedHeatmapFor(id);
        course.queues = await async_1.default.filter(course.queues, async (q) => await q.checkIsOpen());
        await async_1.default.each(course.queues, async (q) => {
            await q.addQueueTimes();
            await q.addQueueSize();
        });
        return course;
    }
    async checkIn(courseId, room, user) {
        let queue = await queue_entity_1.QueueModel.findOne({
            room,
            courseId,
        }, { relations: ['staffList'] });
        if (!queue) {
            queue = await queue_entity_1.QueueModel.create({
                room,
                courseId,
                staffList: [],
                questions: [],
                allowQuestions: true,
            }).save();
        }
        if (queue.staffList.length === 0) {
            queue.allowQuestions = true;
        }
        queue.staffList.push(user);
        await queue.save();
        await event_model_entity_1.EventModel.create({
            time: new Date(),
            eventType: event_model_entity_1.EventType.TA_CHECKED_IN,
            user,
            courseId,
        }).save();
        await this.queueSSEService.updateQueue(queue.id);
        return queue;
    }
    async checkOut(courseId, room, user) {
        const queue = await queue_entity_1.QueueModel.findOne({
            room,
            courseId,
        }, { relations: ['staffList'] });
        queue.staffList = queue.staffList.filter((e) => e.id !== user.id);
        if (queue.staffList.length === 0) {
            queue.allowQuestions = false;
        }
        await queue.save();
        await event_model_entity_1.EventModel.create({
            time: new Date(),
            eventType: event_model_entity_1.EventType.TA_CHECKED_OUT,
            user,
            courseId,
        }).save();
        const canClearQueue = await this.queueCleanService.shouldCleanQueue(queue);
        let nextOfficeHourTime = null;
        if (canClearQueue) {
            const soon = moment().add(15, 'minutes').toDate();
            const nextOfficeHour = await office_hour_entity_1.OfficeHourModel.findOne({
                where: { startTime: typeorm_1.MoreThanOrEqual(soon) },
                order: {
                    startTime: 'ASC',
                },
            });
            nextOfficeHourTime = nextOfficeHour === null || nextOfficeHour === void 0 ? void 0 : nextOfficeHour.startTime;
        }
        await this.queueSSEService.updateQueue(queue.id);
        return { queueId: queue.id, canClearQueue, nextOfficeHourTime };
    }
    async updateCalendar(courseId) {
        const course = await course_entity_1.CourseModel.findOne(courseId);
        await this.icalService.updateCalendarForCourse(course);
    }
};
__decorate([
    common_2.Get(':id'),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR, common_1.Role.STUDENT, common_1.Role.TA),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "get", null);
__decorate([
    common_2.Post(':id/ta_location/:room'),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR, common_1.Role.TA),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Param('room')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkIn", null);
__decorate([
    common_2.Delete(':id/ta_location/:room'),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR, common_1.Role.TA),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Param('room')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkOut", null);
__decorate([
    common_2.Post(':id/update_calendar'),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCalendar", null);
CourseController = __decorate([
    common_2.Controller('courses'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    common_2.UseInterceptors(common_2.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        queue_clean_service_1.QueueCleanService,
        queue_sse_service_1.QueueSSEService,
        heatmap_service_1.HeatmapService,
        ical_service_1.IcalService])
], CourseController);
exports.CourseController = CourseController;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.SSEQueueResponse = exports.UpdateQueueParams = exports.TACheckoutResponse = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.StatusSentToCreator = exports.StatusInPriorityQueue = exports.StatusInQueue = exports.ClosedQuestionStatus = exports.LimboQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.timeDiffInMins = exports.isProd = exports.PROD_URL = void 0;
const class_transformer_1 = __webpack_require__(15);
const class_validator_1 = __webpack_require__(16);
__webpack_require__(17);
exports.PROD_URL = "https://khouryofficehours.com";
exports.isProd = () => {
    var _a;
    return process.env.DOMAIN === exports.PROD_URL ||
        (typeof window !== "undefined" && ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin) === exports.PROD_URL);
};
function timeDiffInMins(a, b) {
    return (a.getTime() - b.getTime()) / (1000 * 60);
}
exports.timeDiffInMins = timeDiffInMins;
class User {
}
__decorate([
    class_transformer_1.Type(() => DesktopNotifPartial),
    __metadata("design:type", Array)
], User.prototype, "desktopNotifs", void 0);
exports.User = User;
class DesktopNotifPartial {
}
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], DesktopNotifPartial.prototype, "createdAt", void 0);
exports.DesktopNotifPartial = DesktopNotifPartial;
class UserPartial {
}
exports.UserPartial = UserPartial;
var Role;
(function (Role) {
    Role["STUDENT"] = "student";
    Role["TA"] = "ta";
    Role["PROFESSOR"] = "professor";
})(Role = exports.Role || (exports.Role = {}));
class OfficeHourPartial {
}
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], OfficeHourPartial.prototype, "startTime", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], OfficeHourPartial.prototype, "endTime", void 0);
class QueuePartial {
}
__decorate([
    class_transformer_1.Type(() => UserPartial),
    __metadata("design:type", Array)
], QueuePartial.prototype, "staffList", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], QueuePartial.prototype, "startTime", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], QueuePartial.prototype, "endTime", void 0);
exports.QueuePartial = QueuePartial;
class Question {
}
__decorate([
    class_transformer_1.Type(() => UserPartial),
    __metadata("design:type", UserPartial)
], Question.prototype, "creator", void 0);
__decorate([
    class_transformer_1.Type(() => UserPartial),
    __metadata("design:type", UserPartial)
], Question.prototype, "taHelped", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], Question.prototype, "helpedAt", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], Question.prototype, "closedAt", void 0);
exports.Question = Question;
var QuestionType;
(function (QuestionType) {
    QuestionType["Concept"] = "Concept";
    QuestionType["Clarification"] = "Clarification";
    QuestionType["Testing"] = "Testing";
    QuestionType["Bug"] = "Bug";
    QuestionType["Setup"] = "Setup";
    QuestionType["Other"] = "Other";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var OpenQuestionStatus;
(function (OpenQuestionStatus) {
    OpenQuestionStatus["Drafting"] = "Drafting";
    OpenQuestionStatus["Queued"] = "Queued";
    OpenQuestionStatus["Helping"] = "Helping";
    OpenQuestionStatus["PriorityQueued"] = "PriorityQueued";
})(OpenQuestionStatus = exports.OpenQuestionStatus || (exports.OpenQuestionStatus = {}));
var LimboQuestionStatus;
(function (LimboQuestionStatus) {
    LimboQuestionStatus["CantFind"] = "CantFind";
    LimboQuestionStatus["ReQueueing"] = "ReQueueing";
    LimboQuestionStatus["TADeleted"] = "TADeleted";
})(LimboQuestionStatus = exports.LimboQuestionStatus || (exports.LimboQuestionStatus = {}));
var ClosedQuestionStatus;
(function (ClosedQuestionStatus) {
    ClosedQuestionStatus["Resolved"] = "Resolved";
    ClosedQuestionStatus["DeletedDraft"] = "DeletedDraft";
    ClosedQuestionStatus["ConfirmedDeleted"] = "ConfirmedDeleted";
    ClosedQuestionStatus["Stale"] = "Stale";
})(ClosedQuestionStatus = exports.ClosedQuestionStatus || (exports.ClosedQuestionStatus = {}));
exports.StatusInQueue = [
    OpenQuestionStatus.Drafting,
    OpenQuestionStatus.Queued,
];
exports.StatusInPriorityQueue = [OpenQuestionStatus.PriorityQueued];
exports.StatusSentToCreator = [
    ...exports.StatusInPriorityQueue,
    ...exports.StatusInQueue,
    OpenQuestionStatus.Helping,
    LimboQuestionStatus.ReQueueing,
    LimboQuestionStatus.CantFind,
    LimboQuestionStatus.TADeleted,
];
exports.QuestionStatusKeys = Object.assign(Object.assign(Object.assign({}, OpenQuestionStatus), ClosedQuestionStatus), LimboQuestionStatus);
class GetProfileResponse extends User {
}
exports.GetProfileResponse = GetProfileResponse;
class KhouryDataParams {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "campus", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "professor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryDataParams.prototype, "photo_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Array)
], KhouryDataParams.prototype, "courses", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Array)
], KhouryDataParams.prototype, "ta_courses", void 0);
exports.KhouryDataParams = KhouryDataParams;
class KhouryStudentCourse {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], KhouryStudentCourse.prototype, "crn", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryStudentCourse.prototype, "course", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], KhouryStudentCourse.prototype, "accelerated", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], KhouryStudentCourse.prototype, "section", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryStudentCourse.prototype, "semester", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryStudentCourse.prototype, "title", void 0);
exports.KhouryStudentCourse = KhouryStudentCourse;
class KhouryTACourse {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryTACourse.prototype, "course", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], KhouryTACourse.prototype, "semester", void 0);
exports.KhouryTACourse = KhouryTACourse;
class UpdateProfileParams {
}
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UpdateProfileParams.prototype, "desktopNotifsEnabled", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UpdateProfileParams.prototype, "phoneNotifsEnabled", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.phoneNotifsEnabled),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateProfileParams.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileParams.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileParams.prototype, "lastName", void 0);
exports.UpdateProfileParams = UpdateProfileParams;
class GetCourseResponse {
}
__decorate([
    class_transformer_1.Type(() => OfficeHourPartial),
    __metadata("design:type", Array)
], GetCourseResponse.prototype, "officeHours", void 0);
__decorate([
    class_transformer_1.Type(() => QueuePartial),
    __metadata("design:type", Array)
], GetCourseResponse.prototype, "queues", void 0);
exports.GetCourseResponse = GetCourseResponse;
class GetQueueResponse extends QueuePartial {
}
exports.GetQueueResponse = GetQueueResponse;
class GetCourseQueuesResponse extends Array {
}
exports.GetCourseQueuesResponse = GetCourseQueuesResponse;
class ListQuestionsResponse {
}
__decorate([
    class_transformer_1.Type(() => Question),
    __metadata("design:type", Question)
], ListQuestionsResponse.prototype, "yourQuestion", void 0);
__decorate([
    class_transformer_1.Type(() => Question),
    __metadata("design:type", Array)
], ListQuestionsResponse.prototype, "questionsGettingHelp", void 0);
__decorate([
    class_transformer_1.Type(() => Question),
    __metadata("design:type", Array)
], ListQuestionsResponse.prototype, "queue", void 0);
__decorate([
    class_transformer_1.Type(() => Question),
    __metadata("design:type", Array)
], ListQuestionsResponse.prototype, "priorityQueue", void 0);
exports.ListQuestionsResponse = ListQuestionsResponse;
class GetQuestionResponse extends Question {
}
exports.GetQuestionResponse = GetQuestionResponse;
class CreateQuestionParams {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateQuestionParams.prototype, "text", void 0);
__decorate([
    class_validator_1.IsEnum(QuestionType),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateQuestionParams.prototype, "questionType", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateQuestionParams.prototype, "queueId", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreateQuestionParams.prototype, "isOnline", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateQuestionParams.prototype, "location", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateQuestionParams.prototype, "force", void 0);
exports.CreateQuestionParams = CreateQuestionParams;
class CreateQuestionResponse extends Question {
}
exports.CreateQuestionResponse = CreateQuestionResponse;
class UpdateQuestionParams {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateQuestionParams.prototype, "text", void 0);
__decorate([
    class_validator_1.IsEnum(QuestionType),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateQuestionParams.prototype, "questionType", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateQuestionParams.prototype, "queueId", void 0);
__decorate([
    class_validator_1.IsEnum(exports.QuestionStatusKeys),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateQuestionParams.prototype, "status", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UpdateQuestionParams.prototype, "isOnline", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateQuestionParams.prototype, "location", void 0);
exports.UpdateQuestionParams = UpdateQuestionParams;
class UpdateQuestionResponse extends Question {
}
exports.UpdateQuestionResponse = UpdateQuestionResponse;
class TACheckoutResponse {
}
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], TACheckoutResponse.prototype, "nextOfficeHourTime", void 0);
exports.TACheckoutResponse = TACheckoutResponse;
class UpdateQueueParams {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateQueueParams.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateQueueParams.prototype, "allowQuestions", void 0);
exports.UpdateQueueParams = UpdateQueueParams;
class SSEQueueResponse {
}
exports.SSEQueueResponse = SSEQueueResponse;
exports.ERROR_MESSAGES = {
    questionController: {
        createQuestion: {
            invalidQueue: "Posted to an invalid queue",
            noNewQuestions: "Queue not allowing new questions",
            closedQueue: "Queue is closed",
            oneQuestionAtATime: "You can't create more than one question at a time.",
        },
        updateQuestion: {
            fsmViolation: (role, questionStatus, bodyStatus) => `${role} cannot change status from ${questionStatus} to ${bodyStatus}`,
            taOnlyEditQuestionStatus: "TA/Professors can only edit question status",
            otherTAHelping: "Another TA is currently helping with this question",
            otherTAResolved: "Another TA has already resolved this question",
            taHelpingOther: "TA is already helping someone else",
            loginUserCantEdit: "Logged-in user does not have edit access",
        },
    },
    loginController: {
        receiveDataFromKhoury: "Invalid request signature",
    },
    notificationController: {
        messageNotFromTwilio: "Message not from Twilio",
    },
    notificationService: {
        registerPhone: "phone number invalid",
    },
    questionRoleGuard: {
        questionNotFound: "Question not found",
        queueOfQuestionNotFound: "Cannot find queue of question",
        queueDoesNotExist: "This queue does not exist!",
    },
    queueRoleGuard: {
        queueNotFound: "Queue not found",
    },
    releaseNotesController: {
        releaseNotesTime: (e) => "Error Parsing release notes time: " + e,
    },
    roleGuard: {
        notLoggedIn: "Must be logged in",
        noCourseIdFound: "No courseid found",
        notInCourse: "Not In This Course",
        mustBeRoleToJoinCourse: (roles) => `You must have one of roles [${roles.join(", ")}] to access this course`,
    },
    profileController: {
        noDiskSpace: "There is no disk space left to store an image. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.",
    },
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.EventType = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(23);
var EventType;
(function (EventType) {
    EventType["TA_CHECKED_IN"] = "taCheckedIn";
    EventType["TA_CHECKED_OUT"] = "taCheckedOut";
})(EventType = exports.EventType || (exports.EventType = {}));
let EventModel = class EventModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EventModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], EventModel.prototype, "time", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: EventType }),
    __metadata("design:type", String)
], EventModel.prototype, "eventType", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel, (user) => user.events),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserModel)
], EventModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], EventModel.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel, (course) => course.events),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.CourseModel)
], EventModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], EventModel.prototype, "courseId", void 0);
EventModel = __decorate([
    typeorm_1.Entity('event_model')
], EventModel);
exports.EventModel = EventModel;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(20);
const event_model_entity_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
const queue_entity_1 = __webpack_require__(26);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
let CourseModel = class CourseModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CourseModel.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany((type) => office_hour_entity_1.OfficeHourModel, (oh) => oh.course),
    __metadata("design:type", Array)
], CourseModel.prototype, "officeHours", void 0);
__decorate([
    typeorm_1.OneToMany((type) => queue_entity_1.QueueModel, (q) => q.course),
    __metadata("design:type", Array)
], CourseModel.prototype, "queues", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], CourseModel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], CourseModel.prototype, "icalURL", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_course_entity_1.UserCourseModel, (ucm) => ucm.course),
    class_transformer_1.Exclude(),
    __metadata("design:type", user_course_entity_1.UserCourseModel)
], CourseModel.prototype, "userCourses", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => semester_entity_1.SemesterModel, (semester) => semester.courses),
    typeorm_1.JoinColumn({ name: 'semesterId' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", semester_entity_1.SemesterModel)
], CourseModel.prototype, "semester", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], CourseModel.prototype, "semesterId", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true }),
    __metadata("design:type", Boolean)
], CourseModel.prototype, "enabled", void 0);
__decorate([
    typeorm_1.OneToMany((type) => event_model_entity_1.EventModel, (event) => event.course),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], CourseModel.prototype, "events", void 0);
CourseModel = __decorate([
    typeorm_1.Entity('course_model')
], CourseModel);
exports.CourseModel = CourseModel;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseModel = void 0;
const common_1 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(23);
let UserCourseModel = class UserCourseModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserCourseModel.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel, (user) => user.courses),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserModel)
], UserCourseModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserCourseModel.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel, (course) => course.userCourses),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.CourseModel)
], UserCourseModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserCourseModel.prototype, "courseId", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: common_1.Role, default: common_1.Role.STUDENT }),
    __metadata("design:type", String)
], UserCourseModel.prototype, "role", void 0);
UserCourseModel = __decorate([
    typeorm_1.Entity('user_course_model')
], UserCourseModel);
exports.UserCourseModel = UserCourseModel;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(20);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const queue_entity_1 = __webpack_require__(26);
const event_model_entity_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
let UserModel = class UserModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "photoURL", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_course_entity_1.UserCourseModel, (ucm) => ucm.user),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], UserModel.prototype, "courses", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], UserModel.prototype, "desktopNotifsEnabled", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], UserModel.prototype, "phoneNotifsEnabled", void 0);
__decorate([
    typeorm_1.OneToMany((type) => desktop_notif_entity_1.DesktopNotifModel, (notif) => notif.user),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], UserModel.prototype, "desktopNotifs", void 0);
__decorate([
    typeorm_1.OneToOne((type) => phone_notif_entity_1.PhoneNotifModel, (notif) => notif.user),
    class_transformer_1.Exclude(),
    __metadata("design:type", phone_notif_entity_1.PhoneNotifModel)
], UserModel.prototype, "phoneNotif", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.ManyToMany((type) => queue_entity_1.QueueModel, (queue) => queue.staffList),
    __metadata("design:type", Array)
], UserModel.prototype, "queues", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany((type) => event_model_entity_1.EventModel, (event) => event.user),
    __metadata("design:type", Array)
], UserModel.prototype, "events", void 0);
UserModel = __decorate([
    typeorm_1.Entity('user_model')
], UserModel);
exports.UserModel = UserModel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopNotifModel = void 0;
const typeorm_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(23);
let DesktopNotifModel = class DesktopNotifModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DesktopNotifModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], DesktopNotifModel.prototype, "endpoint", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], DesktopNotifModel.prototype, "expirationTime", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], DesktopNotifModel.prototype, "p256dh", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], DesktopNotifModel.prototype, "auth", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel, (user) => user.desktopNotifs),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserModel)
], DesktopNotifModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], DesktopNotifModel.prototype, "userId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DesktopNotifModel.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DesktopNotifModel.prototype, "name", void 0);
DesktopNotifModel = __decorate([
    typeorm_1.Entity('desktop_notif_model')
], DesktopNotifModel);
exports.DesktopNotifModel = DesktopNotifModel;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNotifModel = void 0;
const typeorm_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(23);
let PhoneNotifModel = class PhoneNotifModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PhoneNotifModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], PhoneNotifModel.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.OneToOne((type) => user_entity_1.UserModel, (user) => user.phoneNotif),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserModel)
], PhoneNotifModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], PhoneNotifModel.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], PhoneNotifModel.prototype, "verified", void 0);
PhoneNotifModel = __decorate([
    typeorm_1.Entity('phone_notif_model')
], PhoneNotifModel);
exports.PhoneNotifModel = PhoneNotifModel;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModel = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(28);
let QueueModel = class QueueModel extends typeorm_1.BaseEntity {
    async checkIsOpen() {
        if (this.staffList && this.staffList.length > 0) {
            this.isOpen = true;
            return true;
        }
        const now = new Date();
        const MS_IN_MINUTE = 60000;
        const ohs = await this.getOfficeHours();
        const open = !!ohs.find((e) => e.startTime.getTime() - 10 * MS_IN_MINUTE < now.getTime() &&
            e.endTime.getTime() + 1 * MS_IN_MINUTE > now.getTime());
        this.isOpen = open;
        return open;
    }
    async addQueueSize() {
        this.queueSize = await question_entity_1.QuestionModel.waitingInQueue(this.id).getCount();
    }
    async addQueueTimes() {
        const now = new Date();
        const officeHours = await this.getOfficeHours();
        const timeIntervals = this.generateMergedTimeIntervals(officeHours);
        const currTime = timeIntervals.find((group) => {
            const lowerBound = group.startTime.getTime() - 15 * 60 * 1000;
            const upperBound = group.endTime.getTime() + 15 * 60 * 1000;
            return lowerBound <= now.getTime() && upperBound >= now.getTime();
        });
        if (currTime) {
            this.startTime = currTime.startTime;
            this.endTime = currTime.endTime;
        }
    }
    async getOfficeHours() {
        const now = new Date();
        const lowerBound = new Date(now);
        lowerBound.setUTCHours(now.getUTCHours() - 24);
        lowerBound.setUTCHours(0, 0, 0, 0);
        const upperBound = new Date(now);
        upperBound.setUTCHours(now.getUTCHours() + 24);
        upperBound.setUTCHours(0, 0, 0, 0);
        return await office_hour_entity_1.OfficeHourModel.find({
            where: [
                {
                    queueId: this.id,
                    startTime: typeorm_1.MoreThanOrEqual(lowerBound),
                    endTime: typeorm_1.LessThanOrEqual(upperBound),
                },
            ],
            order: {
                startTime: 'ASC',
            },
        });
    }
    generateMergedTimeIntervals(officeHours) {
        const timeIntervals = [];
        officeHours.forEach((officeHour) => {
            if (timeIntervals.length == 0 ||
                officeHour.startTime > timeIntervals[timeIntervals.length - 1].endTime) {
                timeIntervals.push({
                    startTime: officeHour.startTime,
                    endTime: officeHour.endTime,
                });
                return;
            }
            const prevGroup = timeIntervals[timeIntervals.length - 1];
            prevGroup.endTime =
                officeHour.endTime > prevGroup.endTime
                    ? officeHour.endTime
                    : prevGroup.endTime;
        });
        return timeIntervals;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QueueModel.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel, (course) => course.queues),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.CourseModel)
], QueueModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], QueueModel.prototype, "courseId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], QueueModel.prototype, "room", void 0);
__decorate([
    typeorm_1.OneToMany((type) => question_entity_1.QuestionModel, (qm) => qm.queue),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], QueueModel.prototype, "questions", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], QueueModel.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => user_entity_1.UserModel, (user) => user.queues),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], QueueModel.prototype, "staffList", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], QueueModel.prototype, "allowQuestions", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany((type) => office_hour_entity_1.OfficeHourModel, (oh) => oh.queue),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], QueueModel.prototype, "officeHours", void 0);
QueueModel = __decorate([
    typeorm_1.Entity('queue_model')
], QueueModel);
exports.QueueModel = QueueModel;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeHourModel = void 0;
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
const class_transformer_1 = __webpack_require__(15);
const queue_entity_1 = __webpack_require__(26);
let OfficeHourModel = class OfficeHourModel extends typeorm_1.BaseEntity {
    get room() {
        var _a;
        return (_a = this.queue) === null || _a === void 0 ? void 0 : _a.room;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OfficeHourModel.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel, (course) => course.officeHours),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", course_entity_1.CourseModel)
], OfficeHourModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], OfficeHourModel.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => queue_entity_1.QueueModel, (queue) => queue.officeHours, {
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'queueId' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", queue_entity_1.QueueModel)
], OfficeHourModel.prototype, "queue", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], OfficeHourModel.prototype, "queueId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], OfficeHourModel.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], OfficeHourModel.prototype, "startTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], OfficeHourModel.prototype, "endTime", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], OfficeHourModel.prototype, "room", null);
OfficeHourModel = __decorate([
    typeorm_1.Entity('office_hour')
], OfficeHourModel);
exports.OfficeHourModel = OfficeHourModel;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var QuestionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const common_1 = __webpack_require__(14);
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
const question_fsm_1 = __webpack_require__(29);
let QuestionModel = QuestionModel_1 = class QuestionModel extends typeorm_1.BaseEntity {
    changeStatus(newStatus, role) {
        if (question_fsm_1.canChangeQuestionStatus(this.status, newStatus, role)) {
            this.status = newStatus;
            return true;
        }
        else {
            return false;
        }
    }
    static inQueueWithStatus(queueId, statuses) {
        return this.createQueryBuilder('question')
            .where('question.queueId = :queueId', { queueId })
            .andWhere('question.status IN (:...statuses)', {
            statuses,
        })
            .orderBy('question.createdAt', 'ASC');
    }
    static waitingInQueue(queueId) {
        return QuestionModel_1.inQueueWithStatus(queueId, common_1.StatusInQueue);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestionModel.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => queue_entity_1.QueueModel, (q) => q.questions),
    typeorm_1.JoinColumn({ name: 'queueId' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", queue_entity_1.QueueModel)
], QuestionModel.prototype, "queue", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], QuestionModel.prototype, "queueId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], QuestionModel.prototype, "text", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel),
    typeorm_1.JoinColumn({ name: 'creatorId' }),
    __metadata("design:type", user_entity_1.UserModel)
], QuestionModel.prototype, "creator", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], QuestionModel.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel),
    typeorm_1.JoinColumn({ name: 'taHelpedId' }),
    __metadata("design:type", user_entity_1.UserModel)
], QuestionModel.prototype, "taHelped", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], QuestionModel.prototype, "taHelpedId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], QuestionModel.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], QuestionModel.prototype, "firstHelpedAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], QuestionModel.prototype, "helpedAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], QuestionModel.prototype, "closedAt", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], QuestionModel.prototype, "questionType", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], QuestionModel.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], QuestionModel.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], QuestionModel.prototype, "isOnline", void 0);
QuestionModel = QuestionModel_1 = __decorate([
    typeorm_1.Entity('question_model')
], QuestionModel);
exports.QuestionModel = QuestionModel;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canChangeQuestionStatus = void 0;
const common_1 = __webpack_require__(14);
const QUEUE_TRANSITIONS = {
    ta: [common_1.OpenQuestionStatus.Helping, common_1.LimboQuestionStatus.TADeleted],
    student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
};
const QUESTION_STATES = {
    [common_1.OpenQuestionStatus.Drafting]: {
        student: [common_1.OpenQuestionStatus.Queued, common_1.ClosedQuestionStatus.ConfirmedDeleted],
        ta: [common_1.ClosedQuestionStatus.DeletedDraft],
    },
    [common_1.OpenQuestionStatus.Queued]: QUEUE_TRANSITIONS,
    [common_1.OpenQuestionStatus.PriorityQueued]: QUEUE_TRANSITIONS,
    [common_1.OpenQuestionStatus.Helping]: {
        ta: [
            common_1.LimboQuestionStatus.CantFind,
            common_1.LimboQuestionStatus.ReQueueing,
            common_1.ClosedQuestionStatus.Resolved,
            common_1.LimboQuestionStatus.TADeleted,
        ],
        student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
    },
    [common_1.LimboQuestionStatus.CantFind]: {
        student: [
            common_1.OpenQuestionStatus.PriorityQueued,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.ReQueueing]: {
        student: [
            common_1.OpenQuestionStatus.PriorityQueued,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.TADeleted]: {
        student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
    },
    [common_1.ClosedQuestionStatus.Resolved]: {},
    [common_1.ClosedQuestionStatus.ConfirmedDeleted]: {},
    [common_1.ClosedQuestionStatus.Stale]: {},
    [common_1.ClosedQuestionStatus.DeletedDraft]: {},
};
function canChangeQuestionStatus(oldStatus, goalStatus, role) {
    var _a;
    return (oldStatus === goalStatus || ((_a = QUESTION_STATES[oldStatus][role]) === null || _a === void 0 ? void 0 : _a.includes(goalStatus)));
}
exports.canChangeQuestionStatus = canChangeQuestionStatus;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterModel = void 0;
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
let SemesterModel = class SemesterModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SemesterModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], SemesterModel.prototype, "season", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SemesterModel.prototype, "year", void 0);
__decorate([
    typeorm_1.OneToMany((type) => course_entity_1.CourseModel, (course) => course.semester),
    __metadata("design:type", Array)
], SemesterModel.prototype, "courses", void 0);
SemesterModel = __decorate([
    typeorm_1.Entity('semester_model')
], SemesterModel);
exports.SemesterModel = SemesterModel;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(32);
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
};
JwtAuthGuard = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = __webpack_require__(5);
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.User = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
exports.User = common_1.createParamDecorator(async (relations, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return await user_entity_1.UserModel.findOne(request.user.userId, { relations });
});
exports.UserId = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return Number(request.user.userId);
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueCleanService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const office_hour_entity_1 = __webpack_require__(27);
const moment = __webpack_require__(36);
const typeorm_1 = __webpack_require__(20);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
let QueueCleanService = class QueueCleanService {
    constructor(connection) {
        this.connection = connection;
    }
    async cleanAllQueues() {
        const queuesWithOpenQuestions = await queue_entity_1.QueueModel.getRepository()
            .createQueryBuilder('queue')
            .leftJoinAndSelect('queue_model.questions', 'question')
            .where('question.status IN (:...status)', {
            status: Object.values(common_1.OpenQuestionStatus),
        })
            .getMany();
        await Promise.all(queuesWithOpenQuestions.map((queue) => this.cleanQueue(queue.id)));
    }
    async cleanQueue(queueId, force) {
        const queue = await queue_entity_1.QueueModel.findOne(queueId, {
            relations: ['staffList'],
        });
        if (force || !(await queue.checkIsOpen())) {
            queue.notes = '';
            await queue.save();
            await this.unsafeClean(queue.id);
        }
    }
    async shouldCleanQueue(queue) {
        if (queue.staffList.length === 0) {
            const areAnyQuestionsOpen = (await question_entity_1.QuestionModel.inQueueWithStatus(queue.id, Object.values(common_1.OpenQuestionStatus)).getCount()) > 0;
            if (areAnyQuestionsOpen) {
                const soon = moment().add(15, 'minutes').toDate();
                const areOfficeHourSoon = (await office_hour_entity_1.OfficeHourModel.count({
                    where: {
                        startTime: typeorm_1.LessThanOrEqual(soon),
                        endTime: typeorm_1.MoreThanOrEqual(soon),
                    },
                })) > 0;
                if (!areOfficeHourSoon) {
                    return true;
                }
            }
        }
        return false;
    }
    async unsafeClean(queueId) {
        const questions = await question_entity_1.QuestionModel.inQueueWithStatus(queueId, [
            ...Object.values(common_1.OpenQuestionStatus),
            ...Object.values(common_1.LimboQuestionStatus),
        ]).getMany();
        questions.forEach((q) => {
            q.status = common_1.ClosedQuestionStatus.Stale;
            q.closedAt = new Date();
        });
        await question_entity_1.QuestionModel.save(questions);
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueCleanService.prototype, "cleanAllQueues", null);
QueueCleanService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QueueCleanService);
exports.QueueCleanService = QueueCleanService;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSSEService = void 0;
const common_1 = __webpack_require__(5);
const lodash_1 = __webpack_require__(38);
const sse_service_1 = __webpack_require__(39);
const queue_service_1 = __webpack_require__(42);
const idToRoom = (queueId) => `q-${queueId}`;
let QueueSSEService = class QueueSSEService {
    constructor(queueService, sseService) {
        this.queueService = queueService;
        this.sseService = sseService;
        this.updateQuestions = this.throttleUpdate(async (queueId) => {
            const questions = await this.queueService.getQuestions(queueId);
            if (questions) {
                this.sendToRoom(queueId, async ({ role, userId }) => ({
                    questions: await this.queueService.personalizeQuestions(queueId, questions, userId, role),
                }));
            }
        });
        this.updateQueue = this.throttleUpdate(async (queueId) => {
            const queue = await this.queueService.getQueue(queueId);
            if (queue) {
                await this.sendToRoom(queueId, async () => ({ queue }));
            }
        });
    }
    subscribeClient(queueId, res, metadata) {
        this.sseService.subscribeClient(idToRoom(queueId), res, metadata);
    }
    async sendToRoom(queueId, data) {
        await this.sseService.sendEvent(idToRoom(queueId), data);
    }
    throttleUpdate(updateFunction) {
        return lodash_1.throttle(async (queueId) => {
            try {
                await updateFunction(queueId);
            }
            catch (e) { }
        }, 1000, {
            leading: false,
            trailing: true,
        });
    }
};
QueueSSEService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [queue_service_1.QueueService,
        sse_service_1.SSEService])
], QueueSSEService);
exports.QueueSSEService = QueueSSEService;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEService = void 0;
const common_1 = __webpack_require__(5);
const async_1 = __webpack_require__(18);
const class_transformer_1 = __webpack_require__(15);
const apm = __webpack_require__(40);
const nestjs_redis_1 = __webpack_require__(41);
let SSEService = class SSEService {
    constructor(redisService) {
        this.redisService = redisService;
        this.directConnnections = {};
        const redisSub = this.redisService.getClient('sub');
        redisSub.on('message', (channel, message) => {
            const id = /sse::client-(\d+)/.exec(channel);
            if (id && id[1] in this.directConnnections) {
                this.directConnnections[id[1]].res.write(`data: ${message}\n\n`);
            }
        });
    }
    async onModuleDestroy() {
        await async_1.each(Object.values(this.directConnnections), async (conn) => {
            await conn.cleanup();
        });
    }
    idToChannel(clientId) {
        return `sse::client-${clientId}`;
    }
    async subscribeClient(room, res, metadata) {
        const redisSub = this.redisService.getClient('sub');
        const redis = this.redisService.getClient('db');
        const clientId = await redis.incr('sse::client::id');
        await redisSub.subscribe(this.idToChannel(clientId));
        const clientInfo = JSON.stringify({
            clientId,
            metadata: metadata,
        });
        await redis.sadd(room, clientInfo);
        this.directConnnections[clientId] = {
            res,
            cleanup: async () => {
                await redis.srem(room, clientInfo);
                await redisSub.unsubscribe(this.idToChannel(clientId));
            },
        };
        res.socket.on('end', async () => {
            await this.directConnnections[clientId].cleanup();
            delete this.directConnnections[clientId];
        });
    }
    async sendEvent(room, payload) {
        const redisPub = this.redisService.getClient('pub');
        const redis = this.redisService.getClient('db');
        const roomInfo = await redis.smembers(room);
        if (room) {
            const clients = roomInfo.map((s) => JSON.parse(s));
            console.log(`sending sse to ${clients.length} clients in ${room}`);
            console.time(`sending sse time: `);
            apm.startTransaction('sse');
            await async_1.each(clients, async ({ clientId, metadata }) => {
                const toSend = class_transformer_1.serialize(await payload(metadata));
                await redisPub.publish(this.idToChannel(clientId), toSend);
            });
            apm.endTransaction();
            console.timeEnd(`sending sse time: `);
        }
    }
};
SSEService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], SSEService);
exports.SSEService = SSEService;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("nestjs-redis");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(15);
const lodash_1 = __webpack_require__(38);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(20);
const queue_entity_1 = __webpack_require__(26);
let QueueService = class QueueService {
    constructor(connection) {
        this.connection = connection;
    }
    async getQueue(queueId) {
        const queue = await queue_entity_1.QueueModel.findOne(queueId, {
            relations: ['staffList'],
        });
        await queue.addQueueTimes();
        await queue.checkIsOpen();
        await queue.addQueueSize();
        return queue;
    }
    async getQuestions(queueId) {
        const queueSize = await queue_entity_1.QueueModel.count({
            where: { id: queueId },
        });
        if (queueSize === 0) {
            throw new common_2.NotFoundException();
        }
        const questionsFromDb = await question_entity_1.QuestionModel.inQueueWithStatus(queueId, [
            ...common_1.StatusInPriorityQueue,
            ...common_1.StatusInQueue,
            common_1.OpenQuestionStatus.Helping,
        ])
            .leftJoinAndSelect('question.creator', 'creator')
            .leftJoinAndSelect('question.taHelped', 'taHelped')
            .getMany();
        const questions = new common_1.ListQuestionsResponse();
        questions.queue = questionsFromDb.filter((question) => common_1.StatusInQueue.includes(question.status));
        questions.questionsGettingHelp = questionsFromDb.filter((question) => question.status === common_1.OpenQuestionStatus.Helping);
        questions.priorityQueue = questionsFromDb.filter((question) => common_1.StatusInPriorityQueue.includes(question.status));
        return questions;
    }
    async personalizeQuestions(queueId, questions, userId, role) {
        if (role === common_1.Role.STUDENT) {
            const newLQR = new common_1.ListQuestionsResponse();
            Object.assign(newLQR, questions);
            newLQR.queue = questions.queue.map((question) => {
                const creator = question.creator.id === userId
                    ? question.creator
                    : lodash_1.pick(question.creator, ['id']);
                return class_transformer_1.classToClass(question_entity_1.QuestionModel.create(Object.assign(Object.assign({}, question), { creator })));
            });
            newLQR.yourQuestion = await question_entity_1.QuestionModel.findOne({
                relations: ['creator', 'taHelped'],
                where: {
                    creatorId: userId,
                    queueId: queueId,
                    status: typeorm_1.In(common_1.StatusSentToCreator),
                },
            });
            newLQR.priorityQueue = [];
            return newLQR;
        }
        return questions;
    }
};
QueueService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QueueService);
exports.QueueService = QueueService;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const role_guard_1 = __webpack_require__(44);
let CourseRolesGuard = class CourseRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        const user = await user_entity_1.UserModel.findOne(request.user.userId, {
            relations: ['courses'],
        });
        const courseId = request.params.id;
        return { courseId, user };
    }
};
CourseRolesGuard = __decorate([
    common_1.Injectable()
], CourseRolesGuard);
exports.CourseRolesGuard = CourseRolesGuard;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const core_1 = __webpack_require__(4);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { courseId, user } = await this.setupData(request);
        if (!user) {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.roleGuard.notLoggedIn);
        }
        if (!courseId) {
            throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.roleGuard.noCourseIdFound);
        }
        return this.matchRoles(roles, user, courseId);
    }
    matchRoles(roles, user, courseId) {
        const userCourse = user.courses.find((course) => {
            return Number(course.courseId) === Number(courseId);
        });
        if (!userCourse) {
            throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.roleGuard.notInCourse);
        }
        const remaining = roles.filter((role) => {
            return userCourse.role.toString() === role;
        });
        if (remaining.length <= 0) {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.roleGuard.mustBeRoleToJoinCourse(roles));
        }
        return remaining.length > 0;
    }
};
RolesGuard = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const lodash_1 = __webpack_require__(38);
const moment = __webpack_require__(36);
const nestjs_command_1 = __webpack_require__(46);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(20);
const office_hour_entity_1 = __webpack_require__(27);
function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    const spliced = arr.splice(0, count);
    return [...arr, ...spliced];
}
let HeatmapService = class HeatmapService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async getCachedHeatmapFor(courseId) {
        const cacheLengthInSeconds = 604800;
        return this.cacheManager.wrap(`heatmap/${courseId}`, () => this._getHeatmapFor(courseId), { ttl: cacheLengthInSeconds });
    }
    async _getHeatmapFor(courseId) {
        const BUCKET_SIZE_IN_MINS = 15;
        const SAMPLES_PER_BUCKET = 3;
        console.time('heatmap');
        const recent = moment().subtract(8, 'weeks').toISOString();
        const questions = await question_entity_1.QuestionModel.createQueryBuilder('question')
            .leftJoinAndSelect('question.queue', 'queue')
            .where('queue.courseId = :courseId', { courseId })
            .andWhere('question.status = :status', {
            status: common_1.ClosedQuestionStatus.Resolved,
        })
            .andWhere('question.helpedAt IS NOT NULL')
            .andWhere('question.createdAt > :recent', { recent })
            .orderBy('question.createdAt', 'ASC')
            .getMany();
        if (questions.length === 0) {
            return false;
        }
        const officeHours = await office_hour_entity_1.OfficeHourModel.find({
            where: { startTime: typeorm_1.MoreThan(recent), courseId },
        });
        if (officeHours.length === 0) {
            return false;
        }
        const tz = 'America/New_York';
        let heatmap = this._generateHeatMapWithReplay(questions.filter((q) => q.helpedAt.getDate() === q.createdAt.getDate()), officeHours, tz, BUCKET_SIZE_IN_MINS, SAMPLES_PER_BUCKET);
        heatmap = arrayRotate(heatmap, -moment.tz.zone(tz).utcOffset(Date.now()) / BUCKET_SIZE_IN_MINS);
        console.timeEnd('heatmap');
        return heatmap;
    }
    _generateHeatMapWithReplay(questions, hours, timezone, bucketSize, samplesPerBucket) {
        const sampleInterval = bucketSize / samplesPerBucket;
        const hourTimestamps = hours.map((hours) => [
            hours.startTime.getTime(),
            hours.endTime.getTime(),
        ]);
        function dateToBucket(date) {
            const cInZone = moment.tz(date, timezone);
            return Math.floor((cInZone.day() * 24 * 60 + cInZone.hour() * 60 + cInZone.minute()) /
                bucketSize);
        }
        const timepointBuckets = [
            ...Array((24 * 7 * 60) / bucketSize),
        ].map(() => []);
        if (questions.length) {
            const startDate = questions[0].createdAt;
            const sunday = moment.tz(startDate, timezone).startOf('week').toDate();
            function getNextTimepointIndex(date) {
                return Math.floor(common_1.timeDiffInMins(date, sunday) / sampleInterval) + 1;
            }
            function getNextSampleTimepoint(date) {
                const timepointIndex = getNextTimepointIndex(date);
                return new Date(sunday.getTime() + timepointIndex * sampleInterval * 60 * 1000);
            }
            function getSampleTimepointsInDateRange(date1, date2) {
                const ret = [];
                let curr = getNextSampleTimepoint(date1);
                while (curr.getTime() < date2.getTime()) {
                    ret.push(curr);
                    curr = getNextSampleTimepoint(curr);
                }
                return ret;
            }
            function lastBucketBoundary(date) {
                const startOfWeek = moment.tz(date, timezone).startOf('week');
                const m = moment(date);
                return m.subtract(m.diff(startOfWeek, 'm') % bucketSize, 'm');
            }
            let isFirst = true;
            for (let i = 0; i < questions.length; i++) {
                const curr = questions[i];
                const next = questions[i + 1];
                const isLast = i === questions.length - 1;
                let sampledTimepoints = getSampleTimepointsInDateRange(isFirst
                    ? lastBucketBoundary(curr.createdAt)
                        .subtract(1, 's')
                        .toDate()
                    : curr.createdAt, isLast
                    ? lastBucketBoundary(curr.helpedAt)
                        .add(bucketSize, 'm')
                        .toDate()
                    : next.createdAt);
                sampledTimepoints = sampledTimepoints.filter((time) => hourTimestamps.some(([start, end]) => lodash_1.inRange(time.getTime(), start, end)));
                if (sampledTimepoints.length > 0 && isFirst) {
                    isFirst = false;
                }
                for (const c of sampledTimepoints) {
                    let wait = 0;
                    if (lodash_1.inRange(c.getTime(), curr.createdAt.getTime(), curr.helpedAt.getTime())) {
                        wait = (curr.helpedAt.getTime() - c.getTime()) / 60000;
                    }
                    const bucketIndex = dateToBucket(c);
                    timepointBuckets[bucketIndex].push(wait);
                }
            }
        }
        const wereHoursDuringBucket = [
            ...Array((24 * 7 * 60) / bucketSize),
        ];
        for (const [start, end] of hourTimestamps) {
            for (const i of lodash_1.range(dateToBucket(start), dateToBucket(end - 1) + 1)) {
                wereHoursDuringBucket[i] = true;
            }
        }
        const h = timepointBuckets.map((samples, i) => {
            if (samples.length > 0) {
                return lodash_1.mean(samples);
            }
            else if (wereHoursDuringBucket[i]) {
                return 0;
            }
            else {
                return -1;
            }
        });
        return h;
    }
    async create(courseId) {
        console.log(await this._getHeatmapFor(courseId));
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'heatmap:generate <courseId>',
        describe: 'generate heatmap for a course',
        autoExit: true,
    }),
    __param(0, nestjs_command_1.Positional({
        name: 'courseId',
        describe: 'which course the heatmap will be generated for',
        type: 'number',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HeatmapService.prototype, "create", null);
HeatmapService = __decorate([
    common_2.Injectable(),
    __param(0, common_2.Inject(common_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], HeatmapService);
exports.HeatmapService = HeatmapService;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(48);
const typeorm_1 = __webpack_require__(20);
const office_hour_entity_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const dist_1 = __webpack_require__(49);
__webpack_require__(50);
const moment = __webpack_require__(36);
const rrule_1 = __webpack_require__(51);
let IcalService = class IcalService {
    constructor(connection) {
        this.connection = connection;
    }
    fixOutlookTZ(date, tz) {
        const iana = dist_1.findOneIana(tz);
        if (iana) {
            return moment(date).tz(iana, true);
        }
        else {
            return date;
        }
    }
    rruleToDates(rrule, eventTZ, exdateRaw) {
        const { options } = rrule;
        const dtstart = this.fixOutlookTZ(moment(options.dtstart), eventTZ);
        const until = options.until && this.fixOutlookTZ(moment(options.until), eventTZ);
        const eventTZMoment = moment.tz.zone(dist_1.findOneIana(eventTZ) || eventTZ);
        const tzUTCOffsetOnDate = (date) => eventTZMoment.utcOffset(date.valueOf());
        const dtstartUTCOffset = tzUTCOffsetOnDate(dtstart);
        const applyOffset = (date, utcOffset) => moment(date).subtract(utcOffset, 'm');
        const preRRule = (date) => applyOffset(date, dtstartUTCOffset);
        const postRRule = (date) => applyOffset(date, -dtstartUTCOffset);
        const fixDST = (date) => moment(date).subtract(dtstartUTCOffset - tzUTCOffsetOnDate(date), 'm');
        const rule = new rrule_1.RRule({
            freq: options.freq,
            interval: options.interval,
            wkst: options.wkst,
            count: options.count,
            byweekday: options.byweekday,
            dtstart: preRRule(dtstart).toDate(),
            until: until && preRRule(until).toDate(),
        });
        const exdates = Object.values(exdateRaw || {})
            .map((d) => this.fixOutlookTZ(moment(d), eventTZ))
            .map((d) => applyOffset(d, tzUTCOffsetOnDate(d)).valueOf());
        const in10Weeks = new Date(dtstart.valueOf() + 1000 * 60 * 60 * 24 * 7 * 10);
        return rule
            .all((d) => !!until || d < in10Weeks)
            .filter((date) => !exdates.includes(date.getTime()))
            .map((d) => fixDST(postRRule(moment(d))).toDate());
    }
    parseIcal(icalData, courseId) {
        const icalDataValues = Object.values(icalData);
        const officeHours = icalDataValues.filter((iCalElement) => iCalElement.type === 'VEVENT' &&
            iCalElement.start !== undefined &&
            iCalElement.end !== undefined);
        const officeHoursEventRegex = /\b^(OH|Hours)\b/;
        const filteredOfficeHours = officeHours.filter((event) => officeHoursEventRegex.test(event.summary));
        let resultOfficeHours = [];
        filteredOfficeHours.forEach((oh) => {
            const eventTZ = oh.start.tz;
            const { rrule } = oh;
            if (rrule) {
                const duration = oh.end.getTime() - oh.start.getTime();
                const allDates = this.rruleToDates(rrule, eventTZ, oh.exdate);
                const generatedOfficeHours = allDates.map((date) => ({
                    title: oh.summary,
                    courseId: courseId,
                    room: oh.location,
                    startTime: date,
                    endTime: new Date(date.getTime() + duration),
                }));
                resultOfficeHours = resultOfficeHours.concat(generatedOfficeHours);
            }
            else {
                resultOfficeHours.push({
                    title: oh.summary,
                    courseId: courseId,
                    room: oh.location,
                    startTime: this.fixOutlookTZ(moment(oh.start), eventTZ).toDate(),
                    endTime: this.fixOutlookTZ(moment(oh.end), eventTZ).toDate(),
                });
            }
        });
        return resultOfficeHours;
    }
    async updateCalendarForCourse(course) {
        console.log(`scraping ical for course "${course.name}"(${course.id} at url: ${course.icalURL}...`);
        console.time(`scrape course ${course.id}`);
        let queue = await queue_entity_1.QueueModel.findOne({
            where: { courseId: course.id, room: 'Online' },
        });
        if (!queue) {
            queue = await queue_entity_1.QueueModel.create({
                room: 'Online',
                courseId: course.id,
                staffList: [],
                questions: [],
                allowQuestions: false,
            }).save();
        }
        const officeHours = this.parseIcal(await node_ical_1.fromURL(course.icalURL), course.id);
        await office_hour_entity_1.OfficeHourModel.delete({ courseId: course.id });
        await office_hour_entity_1.OfficeHourModel.save(officeHours.map((e) => {
            e.queueId = queue.id;
            return office_hour_entity_1.OfficeHourModel.create(e);
        }));
        console.timeEnd(`scrape course ${course.id}`);
        console.log('done scraping!');
    }
    async updateAllCourses() {
        console.log('updating course icals');
        const courses = await course_entity_1.CourseModel.find();
        await Promise.all(courses.map((c) => this.updateCalendarForCourse(c)));
    }
};
__decorate([
    schedule_1.Cron('51 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IcalService.prototype, "updateAllCourses", null);
IcalService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], IcalService);
exports.IcalService = IcalService;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("rrule");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = __webpack_require__(5);
const queue_controller_1 = __webpack_require__(53);
const queue_clean_service_1 = __webpack_require__(35);
const sse_module_1 = __webpack_require__(56);
const queue_service_1 = __webpack_require__(42);
const queue_sse_service_1 = __webpack_require__(37);
const queue_subscriber_1 = __webpack_require__(57);
let QueueModule = class QueueModule {
};
QueueModule = __decorate([
    common_1.Module({
        controllers: [queue_controller_1.QueueController],
        providers: [
            queue_clean_service_1.QueueCleanService,
            queue_service_1.QueueService,
            queue_sse_service_1.QueueSSEService,
            queue_subscriber_1.QueueSubscriber,
        ],
        exports: [queue_clean_service_1.QueueCleanService, queue_sse_service_1.QueueSSEService],
        imports: [sse_module_1.SSEModule],
    })
], QueueModule);
exports.QueueModule = QueueModule;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_decorator_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(31);
const roles_decorator_1 = __webpack_require__(33);
const queue_role_decorator_1 = __webpack_require__(54);
const queue_role_guard_1 = __webpack_require__(55);
const queue_sse_service_1 = __webpack_require__(37);
const queue_service_1 = __webpack_require__(42);
const queue_clean_service_1 = __webpack_require__(35);
let QueueController = class QueueController {
    constructor(connection, queueSSEService, queueCleanService, queueService) {
        this.connection = connection;
        this.queueSSEService = queueSSEService;
        this.queueCleanService = queueCleanService;
        this.queueService = queueService;
    }
    async getQueue(queueId) {
        return this.queueService.getQueue(queueId);
    }
    async getQuestions(queueId, role, userId) {
        const questions = await this.queueService.getQuestions(queueId);
        return await this.queueService.personalizeQuestions(queueId, questions, userId, role);
    }
    async updateQueue(queueId, body) {
        const queue = await this.queueService.getQueue(queueId);
        if (queue === undefined) {
            throw new common_2.NotFoundException();
        }
        queue.notes = body.notes;
        queue.allowQuestions = body.allowQuestions;
        await queue.save();
        return queue;
    }
    async cleanQueue(queueId) {
        setTimeout(async () => {
            await this.queueCleanService.cleanQueue(queueId, true);
            await this.queueSSEService.updateQueue(queueId);
        });
    }
    sendEvent(queueId, role, userId, res) {
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            Connection: 'keep-alive',
        });
        this.queueSSEService.subscribeClient(queueId, res, { role, userId });
    }
};
__decorate([
    common_2.Get(':queueId'),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR, common_1.Role.STUDENT),
    __param(0, common_2.Param('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getQueue", null);
__decorate([
    common_2.Get(':queueId/questions'),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR, common_1.Role.STUDENT),
    __param(0, common_2.Param('queueId')),
    __param(1, queue_role_decorator_1.QueueRole()),
    __param(2, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getQuestions", null);
__decorate([
    common_2.Patch(':queueId'),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Param('queueId')),
    __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_1.UpdateQueueParams]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "updateQueue", null);
__decorate([
    common_2.Post(':queueId/clean'),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Param('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "cleanQueue", null);
__decorate([
    common_2.Get(':queueId/sse'),
    __param(0, common_2.Param('queueId')),
    __param(1, queue_role_decorator_1.QueueRole()),
    __param(2, user_decorator_1.UserId()),
    __param(3, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Object]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "sendEvent", null);
QueueController = __decorate([
    common_2.Controller('queues'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, queue_role_guard_1.QueueRolesGuard),
    common_2.UseInterceptors(common_2.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        queue_sse_service_1.QueueSSEService,
        queue_clean_service_1.QueueCleanService,
        queue_service_1.QueueService])
], QueueController);
exports.QueueController = QueueController;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRole = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
exports.QueueRole = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const queue = await queue_entity_1.QueueModel.findOne(request.params.queueId);
    const courseId = queue === null || queue === void 0 ? void 0 : queue.courseId;
    const user = await user_entity_1.UserModel.findOne(request.user.userId, {
        relations: ['courses'],
    });
    const userCourse = user.courses.find((course) => {
        return Number(course.courseId) === Number(courseId);
    });
    return userCourse.role;
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRolesGuard = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const role_guard_1 = __webpack_require__(44);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
let QueueRolesGuard = class QueueRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        const queue = await queue_entity_1.QueueModel.findOne(request.params.queueId);
        if (!queue) {
            throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.queueRoleGuard.queueNotFound);
        }
        const courseId = queue.courseId;
        const user = await user_entity_1.UserModel.findOne(request.user.userId, {
            relations: ['courses'],
        });
        return { courseId, user };
    }
};
QueueRolesGuard = __decorate([
    common_2.Injectable()
], QueueRolesGuard);
exports.QueueRolesGuard = QueueRolesGuard;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEModule = void 0;
const common_1 = __webpack_require__(5);
const sse_service_1 = __webpack_require__(39);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(37);
const typeorm_1 = __webpack_require__(20);
const queue_entity_1 = __webpack_require__(26);
let QueueSubscriber = class QueueSubscriber {
    constructor(connection, queueSSEService) {
        this.queueSSEService = queueSSEService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return queue_entity_1.QueueModel;
    }
    async afterUpdate(event) {
        if (event.entity) {
            await this.queueSSEService.updateQueue(event.entity.id);
        }
    }
};
QueueSubscriber = __decorate([
    typeorm_1.EventSubscriber(),
    __metadata("design:paramtypes", [typeorm_1.Connection, queue_sse_service_1.QueueSSEService])
], QueueSubscriber);
exports.QueueSubscriber = QueueSubscriber;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICalCommand = void 0;
const nestjs_command_1 = __webpack_require__(46);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(47);
let ICalCommand = class ICalCommand {
    constructor(icalService) {
        this.icalService = icalService;
    }
    async create() {
        await this.icalService.updateAllCourses();
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'ical:scrape',
        describe: 'scrape ical for a course',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ICalCommand.prototype, "create", null);
ICalCommand = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [ical_service_1.IcalService])
], ICalCommand);
exports.ICalCommand = ICalCommand;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(5);
const desktop_notif_subscriber_1 = __webpack_require__(60);
const notification_controller_1 = __webpack_require__(65);
const notification_service_1 = __webpack_require__(61);
const twilio_service_1 = __webpack_require__(63);
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    common_1.Module({
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, desktop_notif_subscriber_1.DesktopNotifSubscriber, twilio_service_1.TwilioService],
        exports: [notification_service_1.NotificationService, twilio_service_1.TwilioService],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopNotifSubscriber = void 0;
const typeorm_1 = __webpack_require__(20);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(61);
let DesktopNotifSubscriber = class DesktopNotifSubscriber {
    constructor(connection, notifService) {
        this.notifService = notifService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return desktop_notif_entity_1.DesktopNotifModel;
    }
    async afterInsert(event) {
        await this.notifService.notifyDesktop(event.entity, "You've successfully signed up for desktop notifications!");
    }
};
DesktopNotifSubscriber = __decorate([
    typeorm_1.EventSubscriber(),
    __metadata("design:paramtypes", [typeorm_1.Connection, notification_service_1.NotificationService])
], DesktopNotifSubscriber);
exports.DesktopNotifSubscriber = DesktopNotifSubscriber;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const apm = __webpack_require__(40);
const webPush = __webpack_require__(62);
const user_entity_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(63);
exports.NotifMsgs = {
    phone: {
        WRONG_MESSAGE: 'Please respond with either YES or NO. Text STOP at any time to stop receiving text messages',
        COULD_NOT_FIND_NUMBER: 'Could not find an Office Hours account with your phone number.',
        UNREGISTER: "You've unregistered from text notifications for Khoury Office Hours. Feel free to re-register any time through the website",
        DUPLICATE: "You've already been verified to receive text notifications from Khoury Office Hours!",
        OK: 'Thank you for verifying your number with Khoury Office Hours! You are now signed up for text notifications!',
    },
    queue: {
        ALERT_BUTTON: "The TA could't reach you, please have Microsoft Teams open and confirm you are back!",
        THIRD_PLACE: `You're 3rd in the queue. Be ready for a TA to call you soon!`,
        TA_HIT_HELPED: (taName) => `${taName} is coming to help you!`,
        REMOVED: `You've been removed from the queue. Please return to the app for more information.`,
    },
    ta: {
        STUDENT_JOINED_EMPTY_QUEUE: 'A student has joined your (previously empty) queue!',
    },
};
let NotificationService = class NotificationService {
    constructor(configService, twilioService) {
        this.configService = configService;
        this.twilioService = twilioService;
        webPush.setVapidDetails(this.configService.get('EMAIL'), this.configService.get('PUBLICKEY'), this.configService.get('PRIVATEKEY'));
        this.desktopPublicKey = this.configService.get('PUBLICKEY');
    }
    async registerDesktop(info) {
        let dn = await desktop_notif_entity_1.DesktopNotifModel.findOne({
            where: { userId: info.userId, endpoint: info.endpoint },
        });
        if (!dn) {
            dn = await desktop_notif_entity_1.DesktopNotifModel.create(info).save();
            await dn.reload();
        }
        return dn;
    }
    async registerPhone(phoneNumber, user) {
        const fullNumber = await this.twilioService.getFullPhoneNumber(phoneNumber);
        if (!fullNumber) {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.notificationService.registerPhone);
        }
        let phoneNotifModel = await phone_notif_entity_1.PhoneNotifModel.findOne({
            userId: user.id,
        });
        if (phoneNotifModel) {
            if (phoneNotifModel.phoneNumber === fullNumber) {
                return;
            }
            else {
                phoneNotifModel.phoneNumber = fullNumber;
                phoneNotifModel.verified = false;
                await phoneNotifModel.save();
            }
        }
        else {
            phoneNotifModel = await phone_notif_entity_1.PhoneNotifModel.create({
                phoneNumber: fullNumber,
                userId: user.id,
                verified: false,
            }).save();
            user.phoneNotif = phoneNotifModel;
        }
        await this.notifyPhone(phoneNotifModel, "You've signed up for phone notifications for Khoury Office Hours. To verify your number, please respond to this message with YES. To unsubscribe, respond to this message with NO or STOP", true);
    }
    async notifyUser(userId, message) {
        const notifModelsOfUser = await user_entity_1.UserModel.findOne({
            where: {
                id: userId,
            },
            relations: ['desktopNotifs', 'phoneNotif'],
        });
        if (notifModelsOfUser.desktopNotifsEnabled) {
            await Promise.all(notifModelsOfUser.desktopNotifs.map(async (nm) => this.notifyDesktop(nm, message)));
        }
        if (notifModelsOfUser.phoneNotif && notifModelsOfUser.phoneNotifsEnabled) {
            this.notifyPhone(notifModelsOfUser.phoneNotif, message, false);
        }
    }
    async notifyDesktop(nm, message) {
        try {
            await webPush.sendNotification({
                endpoint: nm.endpoint,
                keys: {
                    p256dh: nm.p256dh,
                    auth: nm.auth,
                },
            }, message);
        }
        catch (error) {
            await desktop_notif_entity_1.DesktopNotifModel.remove(nm);
        }
    }
    async notifyPhone(pn, message, force) {
        if (force || pn.verified) {
            try {
                await this.twilioService.sendSMS(pn.phoneNumber, message);
            }
            catch (error) {
                console.error('problem sending message', error);
            }
        }
    }
    async verifyPhone(phoneNumber, message) {
        const phoneNotif = await phone_notif_entity_1.PhoneNotifModel.findOne({
            where: { phoneNumber: phoneNumber },
        });
        if (!phoneNotif) {
            apm.setCustomContext({ phoneNumber });
            apm.captureError(new Error('Could not find phone number during verification'));
            return exports.NotifMsgs.phone.COULD_NOT_FIND_NUMBER;
        }
        else if (message !== 'YES' && message !== 'NO' && message !== 'STOP') {
            return exports.NotifMsgs.phone.WRONG_MESSAGE;
        }
        else if (message === 'NO' || message === 'STOP') {
            await phone_notif_entity_1.PhoneNotifModel.delete(phoneNotif);
            return exports.NotifMsgs.phone.UNREGISTER;
        }
        else if (phoneNotif.verified) {
            return exports.NotifMsgs.phone.DUPLICATE;
        }
        else {
            phoneNotif.verified = true;
            await phoneNotif.save();
            return exports.NotifMsgs.phone.OK;
        }
    }
};
NotificationService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        twilio_service_1.TwilioService])
], NotificationService);
exports.NotificationService = NotificationService;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("web-push");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(64);
let TwilioService = class TwilioService {
    constructor(configService) {
        this.configService = configService;
        this.twilioClient = twilio(this.configService.get('TWILIOACCOUNTSID'), this.configService.get('TWILIOAUTHTOKEN'));
    }
    async getFullPhoneNumber(phoneNumber) {
        try {
            return (await this.twilioClient.lookups.phoneNumbers(phoneNumber).fetch())
                .phoneNumber;
        }
        catch (err) {
            return false;
        }
    }
    async sendSMS(phoneNumber, message) {
        await this.twilioClient.messages.create({
            body: message,
            from: this.configService.get('TWILIOPHONENUMBER'),
            to: phoneNumber,
        });
    }
};
TwilioService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioService);
exports.TwilioService = TwilioService;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(64);
const jwt_auth_guard_1 = __webpack_require__(31);
const user_decorator_1 = __webpack_require__(34);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(61);
let NotificationController = class NotificationController {
    constructor(notifService, configService) {
        this.notifService = notifService;
        this.configService = configService;
    }
    getDesktopCredentials() {
        return JSON.stringify(this.notifService.desktopPublicKey);
    }
    async registerDesktopUser(body, userId) {
        const device = await this.notifService.registerDesktop({
            endpoint: body.endpoint,
            expirationTime: body.expirationTime && new Date(body.expirationTime),
            p256dh: body.keys.p256dh,
            auth: body.keys.auth,
            name: body.name,
            userId: userId,
        });
        return {
            id: device.id,
            endpoint: device.endpoint,
            createdAt: device.createdAt,
            name: device.name,
        };
    }
    async deleteDesktopUser(deviceId, userId) {
        const dn = await desktop_notif_entity_1.DesktopNotifModel.find({ id: deviceId, userId });
        if (dn.length > 0) {
            await desktop_notif_entity_1.DesktopNotifModel.remove(dn);
        }
        else {
            throw new common_2.NotFoundException();
        }
    }
    async verifyPhoneUser(body, twilioSignature) {
        const message = body.Body.trim().toUpperCase();
        const senderNumber = body.From;
        const twilioAuthToken = this.configService.get('TWILIOAUTHTOKEN');
        const isValidated = twilio.validateRequest(twilioAuthToken, twilioSignature.trim(), `${this.configService.get('DOMAIN')}/api/v1/notifications/phone/verify`, body);
        if (!isValidated) {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.notificationController.messageNotFromTwilio);
        }
        const messageToUser = await this.notifService.verifyPhone(senderNumber, message);
        const MessagingResponse = twilio.twiml.MessagingResponse;
        const twiml = new MessagingResponse();
        twiml.message(messageToUser);
        return twiml.toString();
    }
};
__decorate([
    common_2.Get('desktop/credentials'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], NotificationController.prototype, "getDesktopCredentials", null);
__decorate([
    common_2.Post('desktop/device'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_2.Body()),
    __param(1, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "registerDesktopUser", null);
__decorate([
    common_2.Delete('desktop/device/:deviceId'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_2.Param('deviceId')),
    __param(1, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteDesktopUser", null);
__decorate([
    common_2.Post('/phone/verify'),
    common_2.Header('Content-Type', 'text/xml'),
    __param(0, common_2.Body()),
    __param(1, common_2.Headers('x-twilio-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "verifyPhoneUser", null);
NotificationController = __decorate([
    common_2.Controller('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        config_1.ConfigService])
], NotificationController);
exports.NotificationController = NotificationController;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = __webpack_require__(5);
const login_controller_1 = __webpack_require__(67);
const jwt_strategy_1 = __webpack_require__(74);
const jwt_1 = __webpack_require__(69);
const config_1 = __webpack_require__(9);
const login_course_service_1 = __webpack_require__(72);
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                }),
            }),
        ],
        controllers: [login_controller_1.LoginController],
        providers: [jwt_strategy_1.JwtStrategy, login_course_service_1.LoginCourseService],
    })
], LoginModule);
exports.LoginModule = LoginModule;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const common_1 = __webpack_require__(14);
const apm_rum_1 = __webpack_require__(68);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(69);
const httpSignature = __webpack_require__(70);
const typeorm_1 = __webpack_require__(20);
const non_production_guard_1 = __webpack_require__(71);
const login_course_service_1 = __webpack_require__(72);
let LoginController = class LoginController {
    constructor(connection, loginCourseService, jwtService, configService) {
        this.connection = connection;
        this.loginCourseService = loginCourseService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async recieveDataFromKhoury(req, body) {
        if (process.env.NODE_ENV === 'production') {
            const parsedRequest = httpSignature.parseRequest(req);
            const verifySignature = httpSignature.verifyHMAC(parsedRequest, this.configService.get('KHOURY_PRIVATE_KEY'));
            if (!verifySignature) {
                apm_rum_1.apm.captureError('Invalid request signature');
                throw new common_2.UnauthorizedException('Invalid request signature');
            }
            const verifyIP = this.configService
                .get('KHOURY_SERVER_IP')
                .includes(req.ip);
            if (!verifyIP) {
                apm_rum_1.apm.captureError('The IP of the request does not seem to be coming from the Khoury server');
                throw new common_2.UnauthorizedException('The IP of the request does not seem to be coming from the Khoury server');
            }
        }
        const user = await this.loginCourseService.addUserFromKhoury(body);
        const token = await this.jwtService.signAsync({ userId: user.id }, { expiresIn: 60 });
        return {
            redirect: this.configService.get('DOMAIN') + `/api/v1/login/entry?token=${token}`,
        };
    }
    async enterFromKhoury(res, token) {
        const isVerified = await this.jwtService.verifyAsync(token);
        if (!isVerified) {
            throw new common_2.UnauthorizedException();
        }
        const payload = this.jwtService.decode(token);
        this.enter(res, payload.userId);
    }
    async enterFromDev(res, userId) {
        this.enter(res, userId);
    }
    async enter(res, userId) {
        const authToken = await this.jwtService.signAsync({
            userId,
            expiresIn: 60 * 60 * 24 * 30,
        });
        const isSecure = this.configService
            .get('DOMAIN')
            .startsWith('https://');
        res
            .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
            .redirect(302, '/');
    }
    async logout(res) {
        const isSecure = this.configService
            .get('DOMAIN')
            .startsWith('https://');
        res
            .clearCookie('auth_token', { httpOnly: true, secure: isSecure })
            .redirect(302, '/login');
    }
};
__decorate([
    common_2.Post('/khoury_login'),
    __param(0, common_2.Req()),
    __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_1.KhouryDataParams]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "recieveDataFromKhoury", null);
__decorate([
    common_2.Get('/login/entry'),
    __param(0, common_2.Res()),
    __param(1, common_2.Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "enterFromKhoury", null);
__decorate([
    common_2.Get('/login/dev'),
    common_2.UseGuards(non_production_guard_1.NonProductionGuard),
    __param(0, common_2.Res()),
    __param(1, common_2.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "enterFromDev", null);
__decorate([
    common_2.Get('/logout'),
    __param(0, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
LoginController = __decorate([
    common_2.Controller(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        login_course_service_1.LoginCourseService,
        jwt_1.JwtService,
        config_1.ConfigService])
], LoginController);
exports.LoginController = LoginController;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("@elastic/apm-rum");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonProductionGuard = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
let NonProductionGuard = class NonProductionGuard {
    canActivate() {
        return !common_2.isProd();
    }
};
NonProductionGuard = __decorate([
    common_1.Injectable()
], NonProductionGuard);
exports.NonProductionGuard = NonProductionGuard;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCourseService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const course_section_mapping_entity_1 = __webpack_require__(73);
const user_course_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(20);
let LoginCourseService = class LoginCourseService {
    constructor(connection) {
        this.connection = connection;
    }
    async addUserFromKhoury(info) {
        let user;
        user = await user_entity_1.UserModel.findOne({
            where: { email: info.email },
            relations: ['courses'],
        });
        if (!user) {
            user = user_entity_1.UserModel.create({
                courses: [],
                email: info.email,
                firstName: info.first_name,
                lastName: info.last_name,
                name: info.first_name + ' ' + info.last_name,
                photoURL: '',
            });
        }
        const userCourses = [];
        await Promise.all(info.courses.map(async (c) => {
            const course = await this.courseSectionToCourse(c.course, c.section);
            if (course) {
                const userCourse = await this.courseToUserCourse(user.id, course.id, common_1.Role.STUDENT);
                userCourses.push(userCourse);
            }
        }));
        await Promise.all(info.ta_courses.map(async (c) => {
            const courseMappings = await course_section_mapping_entity_1.CourseSectionMappingModel.find({
                where: { genericCourseName: c.course },
            });
            for (const courseMapping of courseMappings) {
                const taCourse = await this.courseToUserCourse(user.id, courseMapping.courseId, info.professor === '1' ? common_1.Role.PROFESSOR : common_1.Role.TA);
                userCourses.push(taCourse);
            }
        }));
        user.courses = userCourses;
        await user.save();
        return user;
    }
    async courseSectionToCourse(couresName, courseSection) {
        const courseSectionModel = await course_section_mapping_entity_1.CourseSectionMappingModel.findOne({
            where: { genericCourseName: couresName, section: courseSection },
            relations: ['course'],
        });
        return courseSectionModel === null || courseSectionModel === void 0 ? void 0 : courseSectionModel.course;
    }
    async courseToUserCourse(userId, courseId, role) {
        let userCourse;
        userCourse = await user_course_entity_1.UserCourseModel.findOne({
            where: { userId, courseId, role },
        });
        if (!userCourse) {
            userCourse = await user_course_entity_1.UserCourseModel.create({
                userId,
                courseId,
                role,
            }).save();
        }
        return userCourse;
    }
};
LoginCourseService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], LoginCourseService);
exports.LoginCourseService = LoginCourseService;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingModel = void 0;
const typeorm_1 = __webpack_require__(20);
const course_entity_1 = __webpack_require__(21);
let CourseSectionMappingModel = class CourseSectionMappingModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CourseSectionMappingModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CourseSectionMappingModel.prototype, "genericCourseName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CourseSectionMappingModel.prototype, "section", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.CourseModel)
], CourseSectionMappingModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CourseSectionMappingModel.prototype, "courseId", void 0);
CourseSectionMappingModel = __decorate([
    typeorm_1.Entity('course_section_mapping_model')
], CourseSectionMappingModel);
exports.CourseSectionMappingModel = CourseSectionMappingModel;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(75);
const passport_1 = __webpack_require__(32);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: (req) => req.cookies['auth_token'],
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }
    validate(payload) {
        return Object.assign({}, payload);
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_controller_1 = __webpack_require__(77);
const notification_module_1 = __webpack_require__(59);
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        controllers: [profile_controller_1.ProfileController],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const platform_express_1 = __webpack_require__(78);
const checkDiskSpace = __webpack_require__(79);
const fs = __webpack_require__(80);
const lodash_1 = __webpack_require__(38);
const multer_1 = __webpack_require__(81);
const path = __webpack_require__(82);
const sharp = __webpack_require__(83);
const typeorm_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(31);
const notification_service_1 = __webpack_require__(61);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
let ProfileController = class ProfileController {
    constructor(connection, notifService) {
        this.connection = connection;
        this.notifService = notifService;
    }
    async get(user) {
        var _a;
        const courses = user.courses
            .filter((userCourse) => userCourse.course.enabled)
            .map((userCourse) => {
            return {
                course: {
                    id: userCourse.courseId,
                    name: userCourse.course.name,
                },
                role: userCourse.role,
            };
        });
        const desktopNotifs = user.desktopNotifs.map((d) => ({
            endpoint: d.endpoint,
            id: d.id,
            createdAt: d.createdAt,
            name: d.name,
        }));
        const userResponse = lodash_1.pick(user, [
            'id',
            'email',
            'name',
            'firstName',
            'lastName',
            'photoURL',
            'desktopNotifsEnabled',
            'phoneNotifsEnabled',
        ]);
        return Object.assign(Object.assign({}, userResponse), { courses, phoneNumber: (_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber, desktopNotifs });
    }
    async patch(userPatch, user) {
        var _a;
        user = Object.assign(user, userPatch);
        user.name = user.firstName + ' ' + user.lastName;
        if (user.phoneNotifsEnabled &&
            userPatch.phoneNumber !== ((_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber)) {
            await this.notifService.registerPhone(userPatch.phoneNumber, user);
        }
        await user.save();
        return this.get(user);
    }
    async uploadImage(file, user) {
        if (user.photoURL) {
            fs.unlink(process.env.UPLOAD_LOCATION + '/' + user.photoURL, (err) => {
                console.error('Error deleting previous picture at: ', user.photoURL, err, 'the previous image was at an invalid location?');
            });
        }
        const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);
        if (spaceLeft.free < 1000000000) {
            throw new common_2.ServiceUnavailableException(common_1.ERROR_MESSAGES.profileController.noDiskSpace);
        }
        const fileName = user.id +
            '-' +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        await sharp(file.buffer)
            .resize(256)
            .toFile(path.join(process.env.UPLOAD_LOCATION, fileName));
        user.photoURL = fileName;
        await user.save();
    }
    async getImage(photoURL, res) {
        fs.stat(path.join(process.env.UPLOAD_LOCATION, photoURL), async (err, stats) => {
            if (stats) {
                res.sendFile(photoURL, { root: process.env.UPLOAD_LOCATION });
            }
            else {
                const user = await user_entity_1.UserModel.findOne({
                    where: {
                        photoURL,
                    },
                });
                user.photoURL = null;
                await user.save();
                throw new common_2.NotFoundException();
            }
        });
    }
};
__decorate([
    common_2.Get(),
    __param(0, user_decorator_1.User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "get", null);
__decorate([
    common_2.Patch(),
    __param(0, common_2.Body()),
    __param(1, user_decorator_1.User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_1.UpdateProfileParams,
        user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "patch", null);
__decorate([
    common_2.Post('/upload_picture'),
    common_2.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.memoryStorage(),
    })),
    __param(0, common_2.UploadedFile()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadImage", null);
__decorate([
    common_2.Get('/get_picture/:photoURL'),
    __param(0, common_2.Param('photoURL')),
    __param(1, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getImage", null);
ProfileController = __decorate([
    common_2.Controller('profile'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        notification_service_1.NotificationService])
], ProfileController);
exports.ProfileController = ProfileController;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("check-disk-space");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(59);
const question_controller_1 = __webpack_require__(85);
const question_subscriber_1 = __webpack_require__(87);
const queue_module_1 = __webpack_require__(52);
let QuestionModule = class QuestionModule {
};
QuestionModule = __decorate([
    common_1.Module({
        controllers: [question_controller_1.QuestionController],
        providers: [question_subscriber_1.QuestionSubscriber],
        imports: [notification_module_1.NotificationModule, queue_module_1.QueueModule],
    })
], QuestionModule);
exports.QuestionModule = QuestionModule;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(31);
const notification_service_1 = __webpack_require__(61);
const roles_decorator_1 = __webpack_require__(33);
const user_course_entity_1 = __webpack_require__(22);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
const question_role_guard_1 = __webpack_require__(86);
const question_entity_1 = __webpack_require__(28);
let QuestionController = class QuestionController {
    constructor(connection, notifService) {
        this.connection = connection;
        this.notifService = notifService;
    }
    async getQuestion(questionId) {
        const question = await question_entity_1.QuestionModel.findOne(questionId, {
            relations: ['creator', 'taHelped'],
        });
        if (question === undefined) {
            throw new common_2.NotFoundException();
        }
        return question;
    }
    async createQuestion(body, user) {
        const { text, questionType, queueId, force } = body;
        const queue = await queue_entity_1.QueueModel.findOne({
            where: { id: queueId },
            relations: ['staffList'],
        });
        if (!queue) {
            throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.questionController.createQuestion.invalidQueue);
        }
        if (!queue.allowQuestions) {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionController.createQuestion.noNewQuestions);
        }
        if (!(await queue.checkIsOpen())) {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionController.createQuestion.closedQueue);
        }
        const previousUserQuestion = await question_entity_1.QuestionModel.findOne({
            where: {
                creatorId: user.id,
                status: typeorm_1.In(Object.values(common_1.OpenQuestionStatus)),
            },
        });
        if (!!previousUserQuestion) {
            if (force) {
                previousUserQuestion.status = common_1.ClosedQuestionStatus.ConfirmedDeleted;
                await previousUserQuestion.save();
            }
            else {
                throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime);
            }
        }
        const question = await question_entity_1.QuestionModel.create({
            queueId: queueId,
            creator: user,
            text,
            questionType,
            status: common_1.QuestionStatusKeys.Drafting,
            createdAt: new Date(),
            isOnline: true,
        }).save();
        return question;
    }
    async updateQuestion(questionId, body, userId) {
        var _a;
        let question = await question_entity_1.QuestionModel.findOne({
            where: { id: questionId },
            relations: ['creator', 'queue', 'taHelped'],
        });
        if (question === undefined) {
            throw new common_2.NotFoundException();
        }
        const isCreator = userId === question.creatorId;
        if (isCreator) {
            if (body.status && !question.changeStatus(body.status, common_1.Role.STUDENT)) {
                throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.fsmViolation('Student', question.status, body.status));
            }
            question = Object.assign(question, body);
            await question.save();
            return question;
        }
        const isTaOrProf = (await user_course_entity_1.UserCourseModel.count({
            where: {
                userId,
                courseId: question.queue.courseId,
                role: typeorm_1.In([common_1.Role.TA, common_1.Role.PROFESSOR]),
            },
        })) > 0;
        if (isTaOrProf) {
            if (Object.keys(body).length !== 1 || Object.keys(body)[0] !== 'status') {
                throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.taOnlyEditQuestionStatus);
            }
            const oldStatus = question.status;
            const newStatus = body.status;
            if (((_a = question.taHelped) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
                if (oldStatus === common_1.OpenQuestionStatus.Helping) {
                    throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping);
                }
                if (oldStatus === common_1.ClosedQuestionStatus.Resolved) {
                    throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.otherTAResolved);
                }
            }
            const isAlreadyHelpingOne = (await question_entity_1.QuestionModel.count({
                where: {
                    taHelpedId: userId,
                    status: common_1.OpenQuestionStatus.Helping,
                },
            })) === 1;
            if (isAlreadyHelpingOne && newStatus === common_1.OpenQuestionStatus.Helping) {
                throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionController.updateQuestion.taHelpingOther);
            }
            const validTransition = question.changeStatus(newStatus, common_1.Role.TA);
            if (!validTransition) {
                throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.fsmViolation('TA', question.status, body.status));
            }
            if (oldStatus !== common_1.OpenQuestionStatus.Helping &&
                newStatus === common_1.OpenQuestionStatus.Helping) {
                question.taHelped = await user_entity_1.UserModel.findOne(userId);
                question.helpedAt = new Date();
                if (!question.firstHelpedAt) {
                    question.firstHelpedAt = question.helpedAt;
                }
                await this.notifService.notifyUser(question.creator.id, notification_service_1.NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name));
            }
            if (newStatus in common_1.ClosedQuestionStatus) {
                question.closedAt = new Date();
            }
            await question.save();
            return question;
        }
        else {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.questionController.updateQuestion.loginUserCantEdit);
        }
    }
    async notify(questionId) {
        const question = await question_entity_1.QuestionModel.findOne(questionId, {
            relations: ['queue'],
        });
        if (question.status === common_1.LimboQuestionStatus.CantFind) {
            await this.notifService.notifyUser(question.creatorId, notification_service_1.NotifMsgs.queue.ALERT_BUTTON);
        }
        else if (question.status === common_1.LimboQuestionStatus.TADeleted) {
            await this.notifService.notifyUser(question.creatorId, notification_service_1.NotifMsgs.queue.REMOVED);
        }
    }
};
__decorate([
    common_2.Get(':questionId'),
    __param(0, common_2.Param('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestion", null);
__decorate([
    common_2.Post(),
    roles_decorator_1.Roles(common_1.Role.STUDENT),
    __param(0, common_2.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_1.CreateQuestionParams,
        user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    common_2.Patch(':questionId'),
    roles_decorator_1.Roles(common_1.Role.STUDENT, common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Param('questionId')),
    __param(1, common_2.Body()),
    __param(2, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_1.UpdateQuestionParams, Number]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    common_2.Post(':questionId/notify'),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Param('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "notify", null);
QuestionController = __decorate([
    common_2.Controller('questions'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, question_role_guard_1.QuestionRolesGuard),
    common_2.UseInterceptors(common_2.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        notification_service_1.NotificationService])
], QuestionController);
exports.QuestionController = QuestionController;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRolesGuard = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const role_guard_1 = __webpack_require__(44);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
const question_entity_1 = __webpack_require__(28);
let QuestionRolesGuard = class QuestionRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        let queueId;
        if (request.params.questionId) {
            const question = await question_entity_1.QuestionModel.findOne(request.params.questionId);
            if (!question) {
                throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.questionRoleGuard.questionNotFound);
            }
            queueId = question.queueId;
        }
        else if (request.body.queueId) {
            queueId = request.body.queueId;
        }
        else {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionRoleGuard.queueOfQuestionNotFound);
        }
        const queue = await queue_entity_1.QueueModel.findOne(queueId);
        if (!queue) {
            throw new common_2.NotFoundException(common_1.ERROR_MESSAGES.questionRoleGuard.queueDoesNotExist);
        }
        const courseId = queue.courseId;
        const user = await user_entity_1.UserModel.findOne(request.user.userId, {
            relations: ['courses'],
        });
        return { courseId, user };
    }
};
QuestionRolesGuard = __decorate([
    common_2.Injectable()
], QuestionRolesGuard);
exports.QuestionRolesGuard = QuestionRolesGuard;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSubscriber = void 0;
const common_1 = __webpack_require__(14);
const queue_sse_service_1 = __webpack_require__(37);
const queue_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(20);
const notification_service_1 = __webpack_require__(61);
const question_entity_1 = __webpack_require__(28);
let QuestionSubscriber = class QuestionSubscriber {
    constructor(connection, notifService, queueSSEService) {
        this.notifService = notifService;
        this.queueSSEService = queueSSEService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return question_entity_1.QuestionModel;
    }
    async afterUpdate(event) {
        await this.queueSSEService.updateQuestions(event.entity.queueId);
        if (event.updatedColumns.find((c) => c.propertyName === 'status') &&
            event.entity.status in common_1.ClosedQuestionStatus) {
            const previousThird = await question_entity_1.QuestionModel.waitingInQueue(event.entity.queueId)
                .offset(2)
                .getOne();
            const third = await question_entity_1.QuestionModel.waitingInQueue(event.entity.queueId)
                .setQueryRunner(event.queryRunner)
                .offset(2)
                .getOne();
            if (third && (previousThird === null || previousThird === void 0 ? void 0 : previousThird.id) !== (third === null || third === void 0 ? void 0 : third.id)) {
                const { creatorId } = third;
                this.notifService.notifyUser(creatorId, notification_service_1.NotifMsgs.queue.THIRD_PLACE);
            }
        }
    }
    async afterInsert(event) {
        const numberOfQuestions = await question_entity_1.QuestionModel.waitingInQueue(event.entity.queueId).getCount();
        if (numberOfQuestions === 0) {
            const staff = (await queue_entity_1.QueueModel.findOne(event.entity.queueId, {
                relations: ['staffList'],
            })).staffList;
            staff.forEach((staff) => {
                this.notifService.notifyUser(staff.id, notification_service_1.NotifMsgs.ta.STUDENT_JOINED_EMPTY_QUEUE);
            });
        }
        await this.queueSSEService.updateQuestions(event.entity.queueId);
    }
    async beforeRemove(event) {
        if (event.entity) {
            await this.queueSSEService.updateQuestions(event.entity.queueId);
        }
    }
};
QuestionSubscriber = __decorate([
    typeorm_1.EventSubscriber(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        notification_service_1.NotificationService,
        queue_sse_service_1.QueueSSEService])
], QuestionSubscriber);
exports.QuestionSubscriber = QuestionSubscriber;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = __webpack_require__(5);
const seed_controller_1 = __webpack_require__(89);
const seed_service_1 = __webpack_require__(92);
let SeedModule = class SeedModule {
};
SeedModule = __decorate([
    common_1.Module({
        controllers: [seed_controller_1.SeedController],
        providers: [seed_service_1.SeedService],
    })
], SeedModule);
exports.SeedModule = SeedModule;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(20);
const factories_1 = __webpack_require__(90);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const non_production_guard_1 = __webpack_require__(71);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const seed_service_1 = __webpack_require__(92);
let SeedController = class SeedController {
    constructor(connection, seedService) {
        this.connection = connection;
        this.seedService = seedService;
    }
    async deleteAll() {
        await this.seedService.deleteAll(office_hour_entity_1.OfficeHourModel);
        await this.seedService.deleteAll(question_entity_1.QuestionModel);
        await this.seedService.deleteAll(queue_entity_1.QueueModel);
        return 'Data successfully reset';
    }
    async createSeeds() {
        await this.deleteAll();
        const now = new Date();
        const yesterday = new Date();
        yesterday.setUTCHours(now.getUTCHours() - 24);
        const tomorrow = new Date();
        tomorrow.setUTCHours(now.getUTCHours() + 19);
        const officeHoursToday = await factories_1.OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
        });
        const officeHoursTodayOverlap = await factories_1.OfficeHourFactory.create({
            startTime: new Date(now.valueOf() - 4500000),
            endTime: new Date(now.valueOf() + 1000000),
        });
        const officeHoursYesterday = await factories_1.OfficeHourFactory.create({
            startTime: yesterday,
            endTime: new Date(yesterday.valueOf() + 4500000),
        });
        const officeHoursTomorrow = await factories_1.OfficeHourFactory.create({
            startTime: tomorrow,
            endTime: new Date(tomorrow.valueOf() + 4500000),
        });
        const courseExists = await course_entity_1.CourseModel.findOne({
            where: { name: 'CS 2500' },
        });
        if (!courseExists) {
            await factories_1.SemesterFactory.create({ season: 'Fall', year: 2020 });
            await factories_1.CourseFactory.create();
        }
        const course = await course_entity_1.CourseModel.findOne({
            where: { name: 'CS 2500' },
            relations: ['officeHours'],
        });
        course.officeHours = [
            officeHoursToday,
            officeHoursYesterday,
            officeHoursTomorrow,
            officeHoursTodayOverlap,
        ];
        course.save();
        const userExsists = await user_entity_1.UserModel.findOne();
        if (!userExsists) {
            const user1 = await factories_1.UserFactory.create({
                email: 'liu.sta@northeastern.edu',
                name: 'Stanley Liu',
                firstName: 'Stanley',
                lastName: 'Liu',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UR20CG36E-cf0f375252bd-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user1,
                role: common_1.Role.STUDENT,
                course: course,
            });
            const user2 = await factories_1.UserFactory.create({
                email: 'takayama.a@northeastern.edu',
                name: 'Alex Takayama',
                firstName: 'Alex',
                lastName: 'Takayama',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UJL97443D-50121339686b-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user2,
                role: common_1.Role.STUDENT,
                course: course,
            });
            const user3 = await factories_1.UserFactory.create({
                email: 'stenzel.w@northeastern.edu',
                name: 'Will Stenzel',
                firstName: 'Will',
                lastName: 'Stenzel',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-URF256KRT-d10098e879da-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user3,
                role: common_1.Role.TA,
                course: course,
            });
            const user4 = await factories_1.UserFactory.create({
                email: 'chu.daj@northeastern.edu',
                name: 'Da-Jin Chu',
                firstName: 'Da-Jin',
                lastName: 'Chu',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UE56Y5UT1-85db59a474f4-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user4,
                role: common_1.Role.TA,
                course: course,
            });
            const user5 = await factories_1.UserFactory.create({
                email: 'li.edwa@northeastern.edu',
                name: 'Eddy Li',
                firstName: 'Eddy',
                lastName: 'Li',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UR6P32JBT-a6c89822c544-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user5,
                role: common_1.Role.PROFESSOR,
                course: course,
            });
        }
        const queue = await factories_1.QueueFactory.create({
            room: 'WHV 101',
            course: course,
            officeHours: [
                officeHoursToday,
                officeHoursYesterday,
                officeHoursTomorrow,
                officeHoursTodayOverlap,
            ],
            allowQuestions: true,
        });
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 3500000),
        });
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 2500000),
        });
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 1500000),
        });
        return 'Data successfully seeded';
    }
    async fillQueue() {
        const queue = await queue_entity_1.QueueModel.findOne();
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 1500000),
        });
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 1500000),
        });
        await factories_1.QuestionFactory.create({
            queue: queue,
            createdAt: new Date(Date.now() - 1500000),
        });
        return 'Data successfully seeded';
    }
    async createUser(body) {
        let ta;
        if (body.courseId) {
            const course = await course_entity_1.CourseModel.findOneOrFail(body.courseId);
            ta = await factories_1.UserCourseFactory.create({ role: body.role, course: course });
        }
        else {
            ta = await factories_1.UserCourseFactory.create({ role: body.role });
        }
        return ta;
    }
    async createQueue(body) {
        var _a;
        const now = new Date();
        const officeHours = await factories_1.OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + ((body === null || body === void 0 ? void 0 : body.closesIn) || 4500000)),
        });
        const options = {
            officeHours: [officeHours],
            allowQuestions: (_a = body.allowQuestions) !== null && _a !== void 0 ? _a : false,
        };
        if (body.courseId) {
            const course = await course_entity_1.CourseModel.findOneOrFail(body.courseId);
            options['course'] = course;
        }
        const queue = await factories_1.QueueFactory.create(options);
        return queue;
    }
    async createQuestion(body) {
        const options = {};
        if (body.queueId) {
            const queue = await queue_entity_1.QueueModel.findOneOrFail(body.queueId);
            options['queue'] = queue;
        }
        if (body.studentId) {
            const student = await user_entity_1.UserModel.findOneOrFail(body.studentId);
            options['creator'] = student;
        }
        const question = await factories_1.QuestionFactory.create(Object.assign(Object.assign({}, options), body.data));
        return question;
    }
};
__decorate([
    common_2.Get('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "deleteAll", null);
__decorate([
    common_2.Get('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createSeeds", null);
__decorate([
    common_2.Get('fill_queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "fillQueue", null);
__decorate([
    common_2.Post('createUser'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createUser", null);
__decorate([
    common_2.Post('createQueue'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createQueue", null);
__decorate([
    common_2.Post('createQuestion'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createQuestion", null);
SeedController = __decorate([
    common_2.Controller('seeds'),
    common_2.UseGuards(non_production_guard_1.NonProductionGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        seed_service_1.SeedService])
], SeedController);
exports.SeedController = SeedController;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(91);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(73);
const user_course_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
exports.UserFactory = new typeorm_factory_1.Factory(user_entity_1.UserModel)
    .attr('email', `user@neu.edu`)
    .attr('name', `User`)
    .attr('firstName', 'User');
exports.StudentCourseFactory = new typeorm_factory_1.Factory(user_course_entity_1.UserCourseModel).attr('role', common_1.Role.STUDENT);
exports.TACourseFactory = new typeorm_factory_1.Factory(user_course_entity_1.UserCourseModel).attr('role', common_1.Role.TA);
exports.SemesterFactory = new typeorm_factory_1.Factory(semester_entity_1.SemesterModel)
    .attr('season', 'Fall')
    .attr('year', 2020);
exports.ClosedOfficeHourFactory = new typeorm_factory_1.Factory(office_hour_entity_1.OfficeHourModel)
    .attr('title', 'Alex & Stanley')
    .attr('startTime', new Date('2020-05-20T14:00:00.000Z'))
    .attr('endTime', new Date('2020-05-20T15:30:00.000Z'));
exports.OfficeHourFactory = new typeorm_factory_1.Factory(office_hour_entity_1.OfficeHourModel)
    .attr('title', 'Alex & Stanley')
    .attr('startTime', new Date(new Date().getTime() - 3600000))
    .attr('endTime', new Date(new Date().getTime() + 3600000));
exports.CourseFactory = new typeorm_factory_1.Factory(course_entity_1.CourseModel)
    .attr('name', 'CS 2500')
    .attr('icalURL', 'http://hi.com')
    .attr('enabled', true)
    .assocOne('semester', exports.SemesterFactory)
    .assocMany('officeHours', exports.OfficeHourFactory, 0);
exports.CourseSectionFactory = new typeorm_factory_1.Factory(course_section_mapping_entity_1.CourseSectionMappingModel)
    .attr('genericCourseName', 'CS 2500')
    .sequence('section', (i) => i)
    .assocOne('course', exports.CourseFactory);
exports.UserCourseFactory = new typeorm_factory_1.Factory(user_course_entity_1.UserCourseModel)
    .assocOne('user', exports.UserFactory)
    .assocOne('course', exports.CourseFactory)
    .attr('role', common_1.Role.STUDENT);
exports.QueueFactory = new typeorm_factory_1.Factory(queue_entity_1.QueueModel)
    .attr('room', 'Online')
    .assocOne('course', exports.CourseFactory)
    .attr('allowQuestions', false)
    .assocMany('officeHours', exports.OfficeHourFactory)
    .assocMany('staffList', exports.UserFactory, 0);
exports.QuestionFactory = new typeorm_factory_1.Factory(question_entity_1.QuestionModel)
    .sequence('text', (i) => `question ${i}`)
    .attr('status', 'Queued')
    .attr('questionType', common_1.QuestionType.Other)
    .attr('createdAt', new Date())
    .assocOne('queue', exports.QueueFactory)
    .assocOne('creator', exports.UserFactory);


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(20);
let SeedService = class SeedService {
    async deleteAll(model) {
        await typeorm_1.getConnection().createQueryBuilder().delete().from(model).execute();
    }
};
SeedService = __decorate([
    common_1.Injectable()
], SeedService);
exports.SeedService = SeedService;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = __webpack_require__(5);
const nestjs_admin_1 = __webpack_require__(94);
const credentialValidator_1 = __webpack_require__(95);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(96);
const admin_entities_1 = __webpack_require__(98);
const admin_command_1 = __webpack_require__(99);
const CoreModule = nestjs_admin_1.AdminCoreModuleFactory.createAdminCoreModule({});
const AuthModule = nestjs_admin_1.AdminAuthModuleFactory.createAdminAuthModule({
    adminCoreModule: CoreModule,
    credentialValidator: credentialValidator_1.adminCredentialValidator,
    imports: [typeorm_1.TypeOrmModule.forFeature([admin_user_entity_1.AdminUserModel])],
    providers: [],
});
let AdminModule = class AdminModule {
    constructor(adminSite) {
        this.adminSite = adminSite;
        adminSite.register('Course', admin_entities_1.CourseAdmin);
        adminSite.register('User', admin_entities_1.UserAdmin);
        adminSite.register('UserCourse', admin_entities_1.UserCourseAdmin);
        adminSite.register('Queue', admin_entities_1.QueueAdmin);
        adminSite.register('CourseSectionMapping', admin_entities_1.CourseSectionMappingAdmin);
    }
};
AdminModule = __decorate([
    common_1.Module({
        imports: [CoreModule, AuthModule],
        exports: [CoreModule, AuthModule],
        providers: [admin_command_1.AdminCommand],
    }),
    __metadata("design:paramtypes", [nestjs_admin_1.DefaultAdminSite])
], AdminModule);
exports.AdminModule = AdminModule;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(96);
const bcrypt_1 = __webpack_require__(97);
exports.adminCredentialValidator = {
    inject: [],
    useFactory: () => {
        return async function validateCredentials(username, password) {
            const user = await admin_user_entity_1.AdminUserModel.findOne({ username });
            if (user) {
                if (await bcrypt_1.compare(password, user.passwordHash)) {
                    return user;
                }
            }
            return null;
        };
    },
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(20);
const bcrypt_1 = __webpack_require__(97);
let AdminUserModel = class AdminUserModel extends typeorm_1.BaseEntity {
    setPassword(password) {
        this.passwordHash = bcrypt_1.hashSync(password, 5);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdminUserModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 128, unique: true, nullable: false }),
    __metadata("design:type", String)
], AdminUserModel.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], AdminUserModel.prototype, "passwordHash", void 0);
AdminUserModel = __decorate([
    typeorm_1.Entity('admin_user_model')
], AdminUserModel);
exports.AdminUserModel = AdminUserModel;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(94);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(73);
const user_course_entity_1 = __webpack_require__(22);
class CourseAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = course_entity_1.CourseModel;
        this.listDisplay = ['id', 'name'];
    }
}
exports.CourseAdmin = CourseAdmin;
class QueueAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = queue_entity_1.QueueModel;
        this.listDisplay = ['id', 'room', 'courseId'];
    }
}
exports.QueueAdmin = QueueAdmin;
class UserAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = user_entity_1.UserModel;
        this.listDisplay = ['id', 'email', 'name'];
        this.searchFields = ['email', 'name'];
        this.fields = [
            'id',
            'email',
            'name',
            'desktopNotifsEnabled',
            'phoneNotifsEnabled',
            'queues',
        ];
    }
}
exports.UserAdmin = UserAdmin;
class UserCourseAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = user_course_entity_1.UserCourseModel;
        this.listDisplay = ['id', 'userId', 'courseId'];
    }
}
exports.UserCourseAdmin = UserCourseAdmin;
class CourseSectionMappingAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = course_section_mapping_entity_1.CourseSectionMappingModel;
        this.listDisplay = ['id', 'genericCourseName', 'section', 'courseId'];
    }
}
exports.CourseSectionMappingAdmin = CourseSectionMappingAdmin;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCommand = void 0;
const nestjs_command_1 = __webpack_require__(46);
const common_1 = __webpack_require__(5);
const admin_user_entity_1 = __webpack_require__(96);
const readline_sync_1 = __webpack_require__(100);
let AdminCommand = class AdminCommand {
    async create(username) {
        let user = await admin_user_entity_1.AdminUserModel.findOne({ username });
        if (user) {
            const changePassword = readline_sync_1.keyInYN(`User ${username} already exists. Do you want to change their password?`);
            if (!changePassword) {
                return;
            }
        }
        else {
            user = admin_user_entity_1.AdminUserModel.create({ username });
        }
        const password = readline_sync_1.question('Password: ', {
            hideEchoBack: true,
        });
        user.setPassword(password);
        await user.save();
        console.log(`Created user: ${user.username}`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'create:admin <username>',
        describe: 'create an admin user',
        autoExit: true,
    }),
    __param(0, nestjs_command_1.Positional({
        name: 'username',
        describe: 'the admin username',
        type: 'string',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCommand.prototype, "create", null);
AdminCommand = __decorate([
    common_1.Injectable()
], AdminCommand);
exports.AdminCommand = AdminCommand;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(102);
const admin_user_entity_1 = __webpack_require__(96);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(73);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const event_model_entity_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
dotenv_1.config();
const inCLI = {
    migrations: ['migration/*.ts'],
    cli: {
        migrationsDir: 'migration',
    },
};
const typeorm = Object.assign({ type: 'postgres', url: process.env.DB_URL || 'postgres://postgres@localhost:5432/dev', synchronize: process.env.NODE_ENV !== 'production', entities: [
        course_entity_1.CourseModel,
        course_section_mapping_entity_1.CourseSectionMappingModel,
        office_hour_entity_1.OfficeHourModel,
        semester_entity_1.SemesterModel,
        user_entity_1.UserModel,
        user_course_entity_1.UserCourseModel,
        question_entity_1.QuestionModel,
        queue_entity_1.QueueModel,
        desktop_notif_entity_1.DesktopNotifModel,
        phone_notif_entity_1.PhoneNotifModel,
        admin_user_entity_1.AdminUserModel,
        event_model_entity_1.EventModel,
    ], keepConnectionAlive: true, logging: !!process.env.TYPEORM_LOGGING }, (!!process.env.TYPEORM_CLI ? inCLI : {}));
module.exports = typeorm;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(59);
const backfill_phone_notifs_command_1 = __webpack_require__(104);
const make_empty_photourl_null_command_1 = __webpack_require__(105);
const question_first_helped_at_command_1 = __webpack_require__(106);
const separate_first_last_names_command_1 = __webpack_require__(107);
let BackfillModule = class BackfillModule {
};
BackfillModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        providers: [
            backfill_phone_notifs_command_1.BackfillPhoneNotifs,
            question_first_helped_at_command_1.BackfillQuestionFirstHelpedAt,
            separate_first_last_names_command_1.BackfillSeparateFirstLastNames,
            make_empty_photourl_null_command_1.BackfillMakeEmptyPhotoURLNull,
        ],
    })
], BackfillModule);
exports.BackfillModule = BackfillModule;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillPhoneNotifs = void 0;
const common_1 = __webpack_require__(5);
const nestjs_command_1 = __webpack_require__(46);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(63);
const user_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(20);
let BackfillPhoneNotifs = class BackfillPhoneNotifs {
    constructor(twilioService) {
        this.twilioService = twilioService;
    }
    async fix() {
        const noUser = await phone_notif_entity_1.PhoneNotifModel.delete({ userId: typeorm_1.IsNull() });
        console.log(`deleted ${noUser.affected} desktopnotifmodels with no userid`);
        const toDelete = [];
        const dups = await phone_notif_entity_1.PhoneNotifModel.createQueryBuilder('pnotif')
            .select([`"phoneNumber"`, 'COUNT(*)'])
            .groupBy('pnotif.phoneNumber')
            .having('COUNT(*) > 1')
            .getRawMany();
        console.log(`found ${dups.length} dups`);
        toDelete.push(...dups);
        const valid = [];
        let changedNum = 0;
        const all = await phone_notif_entity_1.PhoneNotifModel.find({ relations: ['user'] });
        for (const p of all) {
            const number = await this.twilioService.getFullPhoneNumber(p.phoneNumber);
            if (number) {
                if (number !== p.phoneNumber) {
                    changedNum += 1;
                }
                p.phoneNumber = number;
                p.verified = true;
                valid.push(p);
            }
            else {
                toDelete.push(p);
            }
        }
        console.log(`Twilio changed ${changedNum} phone numbers to full num`);
        await phone_notif_entity_1.PhoneNotifModel.save(valid);
        console.log('deleting phone notifs: ', toDelete.map((d) => d.phoneNumber));
        if (toDelete.length) {
            await phone_notif_entity_1.PhoneNotifModel.delete(toDelete.map((d) => d.id));
        }
        const usersToDisable = (await user_entity_1.UserModel.find({
            where: { phoneNotifsEnabled: true },
            relations: ['phoneNotif'],
        })).filter((u) => !u.phoneNotif);
        usersToDisable.forEach((u) => (u.phoneNotifsEnabled = false));
        await user_entity_1.UserModel.save(usersToDisable);
        console.log(`disabled phonenotifs for ${usersToDisable.length} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:phone-notifs',
        describe: 'delete phone notifs with no userids, delete duplicate phone notifs, and forcibly set verified on existing phonenotifs',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillPhoneNotifs.prototype, "fix", null);
BackfillPhoneNotifs = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [twilio_service_1.TwilioService])
], BackfillPhoneNotifs);
exports.BackfillPhoneNotifs = BackfillPhoneNotifs;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillMakeEmptyPhotoURLNull = void 0;
const common_1 = __webpack_require__(5);
const nestjs_command_1 = __webpack_require__(46);
const user_entity_1 = __webpack_require__(23);
let BackfillMakeEmptyPhotoURLNull = class BackfillMakeEmptyPhotoURLNull {
    async fix() {
        let countOfChanged = 0;
        const users = await user_entity_1.UserModel.find();
        users.forEach((user) => {
            if (user.photoURL === '') {
                user.photoURL = null;
                countOfChanged += 1;
            }
        });
        await user_entity_1.UserModel.save(users);
        console.log(`Updated names for ${countOfChanged} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:make-empty-photoURL-null',
        describe: 'changes empty string photoURLs to null',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillMakeEmptyPhotoURLNull.prototype, "fix", null);
BackfillMakeEmptyPhotoURLNull = __decorate([
    common_1.Injectable()
], BackfillMakeEmptyPhotoURLNull);
exports.BackfillMakeEmptyPhotoURLNull = BackfillMakeEmptyPhotoURLNull;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillQuestionFirstHelpedAt = void 0;
const nestjs_command_1 = __webpack_require__(46);
const common_1 = __webpack_require__(5);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(20);
let BackfillQuestionFirstHelpedAt = class BackfillQuestionFirstHelpedAt {
    async copy() {
        await question_entity_1.QuestionModel.createQueryBuilder()
            .update()
            .set({ firstHelpedAt: () => '"helpedAt"' })
            .where({ firstHelpedAt: typeorm_1.IsNull() })
            .callListeners(false)
            .execute();
        console.log(`Updated ${await question_entity_1.QuestionModel.createQueryBuilder()
            .select()
            .where({ firstHelpedAt: typeorm_1.IsNull() })
            .getCount()} records`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:question-first-helped-at',
        describe: 'copy all existing helpedAt to firstHelpedAt',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillQuestionFirstHelpedAt.prototype, "copy", null);
BackfillQuestionFirstHelpedAt = __decorate([
    common_1.Injectable()
], BackfillQuestionFirstHelpedAt);
exports.BackfillQuestionFirstHelpedAt = BackfillQuestionFirstHelpedAt;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillSeparateFirstLastNames = void 0;
const common_1 = __webpack_require__(5);
const nestjs_command_1 = __webpack_require__(46);
const user_entity_1 = __webpack_require__(23);
let BackfillSeparateFirstLastNames = class BackfillSeparateFirstLastNames {
    async fix() {
        const users = await user_entity_1.UserModel.find();
        users.forEach((user) => {
            try {
                user.firstName = user.name.split(' ')[0];
                user.lastName = user.name.split(' ').slice(1).join(' ');
            }
            catch (e) {
                user.firstName = user.name;
                console.log(`Updating name failed for ${user.name}`);
            }
        });
        await user_entity_1.UserModel.save(users);
        const count = user_entity_1.UserModel.count();
        console.log(`Updated names for ${count} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:first-last-names',
        describe: 'change all names to first and last names',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillSeparateFirstLastNames.prototype, "fix", null);
BackfillSeparateFirstLastNames = __decorate([
    common_1.Injectable()
], BackfillSeparateFirstLastNames);
exports.BackfillSeparateFirstLastNames = BackfillSeparateFirstLastNames;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseNotesModule = void 0;
const common_1 = __webpack_require__(5);
const release_notes_controller_1 = __webpack_require__(109);
let ReleaseNotesModule = class ReleaseNotesModule {
};
ReleaseNotesModule = __decorate([
    common_1.Module({
        controllers: [release_notes_controller_1.ReleaseNotesController],
        providers: [],
        imports: [
            common_1.HttpModule.registerAsync({
                useFactory: () => ({
                    timeout: 5000,
                    maxRedirects: 5,
                }),
            }),
        ],
    })
], ReleaseNotesModule);
exports.ReleaseNotesModule = ReleaseNotesModule;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseNotesController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const jwt_auth_guard_1 = __webpack_require__(31);
const typeorm_1 = __webpack_require__(20);
let ReleaseNotesController = class ReleaseNotesController {
    constructor(connection, httpService) {
        this.connection = connection;
        this.httpService = httpService;
    }
    async getReleaseNotes() {
        var _a, _b, _c;
        const response = {
            lastUpdatedUnixTime: null,
            releaseNotes: null,
        };
        const request = await this.httpService
            .get('https://notion-api.splitbee.io/v1/page/abba246bfa0847baa2706ab30d0c6c7d')
            .toPromise();
        const data = request.data;
        try {
            const timeText = (_c = (_b = (_a = data['beae2a02-249e-4b61-9bfc-81258d93f20d']) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.properties) === null || _c === void 0 ? void 0 : _c.title[0][0];
            response.lastUpdatedUnixTime = timeText.split('Unix ')[1] * 1000;
        }
        catch (e) {
            throw new common_2.InternalServerErrorException(common_1.ERROR_MESSAGES.releaseNotesController.releaseNotesTime(e));
        }
        data['beae2a02-249e-4b61-9bfc-81258d93f20d'].value.properties.title = [];
        data['4d25f393-e570-4cd5-ad66-b278a0924225'].value.properties.title = [];
        response.releaseNotes = data;
        return response;
    }
};
__decorate([
    common_2.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReleaseNotesController.prototype, "getReleaseNotes", null);
ReleaseNotesController = __decorate([
    common_2.Controller('release_notes'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        common_2.HttpService])
], ReleaseNotesController);
exports.ReleaseNotesController = ReleaseNotesController;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckModule = void 0;
const common_1 = __webpack_require__(5);
const healthcheck_controller_1 = __webpack_require__(111);
let HealthcheckModule = class HealthcheckModule {
};
HealthcheckModule = __decorate([
    common_1.Module({
        controllers: [healthcheck_controller_1.HealthcheckController],
    })
], HealthcheckModule);
exports.HealthcheckModule = HealthcheckModule;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckController = void 0;
const common_1 = __webpack_require__(5);
const decorators_1 = __webpack_require__(112);
let HealthcheckController = class HealthcheckController {
    health() {
        return 'healthy';
    }
};
__decorate([
    decorators_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], HealthcheckController.prototype, "health", null);
HealthcheckController = __decorate([
    common_1.Controller('healthcheck')
], HealthcheckController);
exports.HealthcheckController = HealthcheckController;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common/decorators");

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripUndefinedPipe = void 0;
const common_1 = __webpack_require__(5);
let StripUndefinedPipe = class StripUndefinedPipe {
    transform(value, metadata) {
        if (metadata.type === 'body') {
            this.dropUndefined(value);
            return value;
        }
        return value;
    }
    dropUndefined(obj) {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.dropUndefined(obj[key]);
            }
        }
    }
};
StripUndefinedPipe = __decorate([
    common_1.Injectable()
], StripUndefinedPipe);
exports.StripUndefinedPipe = StripUndefinedPipe;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(115);
const apm = __webpack_require__(40);
let ApmInterceptor = class ApmInterceptor {
    intercept(context, next) {
        return next.handle().pipe(operators_1.catchError((error) => {
            if (error instanceof common_1.HttpException) {
                apm.captureError(error.message);
            }
            else {
                apm.captureError(error);
            }
            throw error;
        }));
    }
};
ApmInterceptor = __decorate([
    common_1.Injectable()
], ApmInterceptor);
exports.ApmInterceptor = ApmInterceptor;


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR5cGVvcm1cIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1yZWRpc1wiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvY291cnNlLXJvbGVzLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9ndWFyZHMvcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2hlYXRtYXAuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtY29tbWFuZFwiIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaWNhbC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtaWNhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvd3MtaWFuYS9kaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50LXRpbWV6b25lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnJ1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGVsYXN0aWMvYXBtLXJ1bVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvand0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cC1zaWduYXR1cmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vand0LnN0cmF0ZWd5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWp3dFwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3BsYXRmb3JtLWV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGVjay1kaXNrLXNwYWNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtdWx0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2hhcnBcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L3V0aWwvZmFjdG9yaWVzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR5cGVvcm0tZmFjdG9yeVwiIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4ubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1hZG1pblwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jcmVkZW50aWFsVmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tZW50aXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhZGxpbmUtc3luY1wiIiwid2VicGFjazovLy8uL29ybWNvbmZpZy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvbWFrZS1lbXB0eS1waG90b3VybC1udWxsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9zZXBhcmF0ZS1maXJzdC1sYXN0LW5hbWVzLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWFsdGhjaGVjay9oZWFsdGhjaGVjay5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlYWx0aGNoZWNrL2hlYWx0aGNoZWNrLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9jb21tb24vZGVjb3JhdG9yc1wiIiwid2VicGFjazovLy8uL3NyYy9zdHJpcFVuZGVmaW5lZC5waXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcG0uaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FB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TTtnQkFDTCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjOzs7Ozs7O0FDWjNCLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgJ2VsYXN0aWMtYXBtLW5vZGUvc3RhcnQnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnLi9ib290c3RyYXAnO1xuXG5kZWNsYXJlIGNvbnN0IG1vZHVsZTogYW55O1xuXG5ib290c3RyYXAobW9kdWxlLmhvdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIpOyIsImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25QaXBlLCBJTmVzdEFwcGxpY2F0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RyaXBVbmRlZmluZWRQaXBlIH0gZnJvbSAnLi9zdHJpcFVuZGVmaW5lZC5waXBlJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEFwbUludGVyY2VwdG9yIH0gZnJvbSAnLi9hcG0uaW50ZXJjZXB0b3InO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcChob3Q6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlLCB7XG4gICAgbG9nZ2VyOiBbJ2Vycm9yJywgJ3dhcm4nLCAnbG9nJywgJ2RlYnVnJywgJ3ZlcmJvc2UnXSxcbiAgfSk7XG4gIGFwcC5lbmFibGVTaHV0ZG93bkhvb2tzKCk7IC8vIFNvIHdlIGNhbiBjbGVhbiB1cCBTU0UuXG4gIGFkZEdsb2JhbHNUb0FwcChhcHApO1xuICBhcHAuc2V0R2xvYmFsUHJlZml4KCdhcGkvdjEnKTtcbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhuZXcgQXBtSW50ZXJjZXB0b3IoKSk7XG5cbiAgaWYgKGlzUHJvZCgpKSB7XG4gICAgY29uc29sZS5sb2coYFJ1bm5pbmcgcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uYCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyBub24tcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uIFRISVMgTVNHIFNIT1VMRCBOT1QgQVBQRUFSIE9OIFBST0QgVk1gLFxuICAgICk7XG4gIH1cbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXdhaXQgYXBwLmxpc3RlbigzMDAyKTtcblxuICBpZiAoaG90KSB7XG4gICAgaG90LmFjY2VwdCgpO1xuICAgIGhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxufVxuXG4vLyBHbG9iYWwgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgdHJ1ZSBpbiBwcm9kIGFuZCBpbiBpbnRlZ3JhdGlvbiB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEdsb2JhbHNUb0FwcChhcHA6IElOZXN0QXBwbGljYXRpb24pOiB2b2lkIHtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKFxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XG4gICAgICB3aGl0ZWxpc3Q6IHRydWUsXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZSxcbiAgICB9KSxcbiAgKTtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBTdHJpcFVuZGVmaW5lZFBpcGUoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dpbk1vZHVsZSB9IGZyb20gJy4vbG9naW4vbG9naW4ubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2R1bGUgfSBmcm9tICcuL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IFNlZWRNb2R1bGUgfSBmcm9tICcuL3NlZWQvc2VlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnLi9zc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyB0eXBlb3JtQ29uZmlnIGZyb20gJy4uL29ybWNvbmZpZyc7XG5pbXBvcnQgeyBCYWNrZmlsbE1vZHVsZSB9IGZyb20gJ2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNNb2R1bGUgfSBmcm9tICdyZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlJztcbmltcG9ydCB7IFJlZGlzTW9kdWxlIH0gZnJvbSAnbmVzdGpzLXJlZGlzJztcbmltcG9ydCB7IEhlYWx0aGNoZWNrTW9kdWxlIH0gZnJvbSAnLi9oZWFsdGhjaGVjay9oZWFsdGhjaGVjay5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdCh0eXBlb3JtQ29uZmlnKSxcbiAgICBTY2hlZHVsZU1vZHVsZS5mb3JSb290KCksXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgUHJvZmlsZU1vZHVsZSxcbiAgICBDb3Vyc2VNb2R1bGUsXG4gICAgUXVldWVNb2R1bGUsXG4gICAgTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIFF1ZXN0aW9uTW9kdWxlLFxuICAgIFNlZWRNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZW52RmlsZVBhdGg6IFtcbiAgICAgICAgJy5lbnYnLFxuICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IFsnLmVudi5kZXZlbG9wbWVudCddIDogW10pLFxuICAgICAgXSxcbiAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIENvbW1hbmRNb2R1bGUsXG4gICAgU1NFTW9kdWxlLFxuICAgIEJhY2tmaWxsTW9kdWxlLFxuICAgIFJlbGVhc2VOb3Rlc01vZHVsZSxcbiAgICAvLyBPbmx5IHVzZSAncHViJyBmb3IgcHVibGlzaGluZyBldmVudHMsICdzdWInIGZvciBzdWJzY3JpYmluZywgYW5kICdkYicgZm9yIHdyaXRpbmcgdG8ga2V5L3ZhbHVlIHN0b3JlXG4gICAgUmVkaXNNb2R1bGUucmVnaXN0ZXIoW3sgbmFtZTogJ3B1YicgfSwgeyBuYW1lOiAnc3ViJyB9LCB7IG5hbWU6ICdkYicgfV0pLFxuICAgIEhlYWx0aGNoZWNrTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvdHlwZW9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3NjaGVkdWxlXCIpOyIsImltcG9ydCB7IENhY2hlTW9kdWxlLCBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VDb250cm9sbGVyIH0gZnJvbSAnLi9jb3Vyc2UuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBJQ2FsQ29tbWFuZCB9IGZyb20gJy4vaWNhbC5jb21tYW5kJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhdG1hcFNlcnZpY2UgfSBmcm9tICcuL2hlYXRtYXAuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW0NvdXJzZUNvbnRyb2xsZXJdLFxuICBpbXBvcnRzOiBbUXVldWVNb2R1bGUsIENhY2hlTW9kdWxlLnJlZ2lzdGVyKCldLFxuICBwcm92aWRlcnM6IFtJQ2FsQ29tbWFuZCwgSWNhbFNlcnZpY2UsIEhlYXRtYXBTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBHZXRDb3Vyc2VSZXNwb25zZSxcbiAgUXVldWVQYXJ0aWFsLFxuICBSb2xlLFxuICBUQUNoZWNrb3V0UmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCwgRXZlbnRUeXBlIH0gZnJvbSAncHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgZ2V0UmVwb3NpdG9yeSwgTW9yZVRoYW5PckVxdWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlUm9sZXNHdWFyZCB9IGZyb20gJy4vY291cnNlLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEhlYXRtYXBTZXJ2aWNlIH0gZnJvbSAnLi9oZWF0bWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbkBDb250cm9sbGVyKCdjb3Vyc2VzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBDb3Vyc2VSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWF0bWFwU2VydmljZTogSGVhdG1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVCwgUm9sZS5UQSlcbiAgYXN5bmMgZ2V0KEBQYXJhbSgnaWQnKSBpZDogbnVtYmVyKTogUHJvbWlzZTxHZXRDb3Vyc2VSZXNwb25zZT4ge1xuICAgIC8vIFRPRE86IGZvciBhbGwgY291cnNlIGVuZHBvaW50LCBjaGVjayBpZiB0aGV5J3JlIGEgc3R1ZGVudCBvciBhIFRBXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZShpZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlcycsICdxdWV1ZXMuc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICAvLyBVc2UgcmF3IHF1ZXJ5IGZvciBwZXJmb3JtYW5jZSAoYXZvaWQgZW50aXR5IGluc3RhbnRpYXRpb24gYW5kIHNlcmlhbGl6YXRpb24pXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gYXdhaXQgZ2V0UmVwb3NpdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdvaCcpXG4gICAgICAuc2VsZWN0KFsnaWQnLCAndGl0bGUnLCBgXCJzdGFydFRpbWVcImAsIGBcImVuZFRpbWVcImBdKVxuICAgICAgLndoZXJlKCdvaC5jb3Vyc2VJZCA9IDpjb3Vyc2VJZCcsIHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KVxuICAgICAgLmdldFJhd01hbnkoKTtcbiAgICBjb3Vyc2UuaGVhdG1hcCA9IGF3YWl0IHRoaXMuaGVhdG1hcFNlcnZpY2UuZ2V0Q2FjaGVkSGVhdG1hcEZvcihpZCk7XG5cbiAgICBjb3Vyc2UucXVldWVzID0gYXdhaXQgYXN5bmMuZmlsdGVyKFxuICAgICAgY291cnNlLnF1ZXVlcyxcbiAgICAgIGFzeW5jIChxKSA9PiBhd2FpdCBxLmNoZWNrSXNPcGVuKCksXG4gICAgKTtcbiAgICBhd2FpdCBhc3luYy5lYWNoKGNvdXJzZS5xdWV1ZXMsIGFzeW5jIChxKSA9PiB7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlVGltZXMoKTtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVTaXplKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291cnNlO1xuICB9XG5cbiAgQFBvc3QoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tJbihcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8UXVldWVQYXJ0aWFsPiB7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgcXVldWUuc3RhZmZMaXN0LnB1c2godXNlcik7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfSU4sXG4gICAgICB1c2VyLFxuICAgICAgY291cnNlSWQsXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tPdXQoXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPFRBQ2hlY2tvdXRSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG4gICAgcXVldWUuc3RhZmZMaXN0ID0gcXVldWUuc3RhZmZMaXN0LmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gdXNlci5pZCk7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gZmFsc2U7XG4gICAgfVxuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcblxuICAgIGF3YWl0IEV2ZW50TW9kZWwuY3JlYXRlKHtcbiAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICBldmVudFR5cGU6IEV2ZW50VHlwZS5UQV9DSEVDS0VEX09VVCxcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBjb25zdCBjYW5DbGVhclF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5zaG91bGRDbGVhblF1ZXVlKHF1ZXVlKTtcbiAgICBsZXQgbmV4dE9mZmljZUhvdXJUaW1lID0gbnVsbDtcblxuICAgIC8vIGZpbmQgb3V0IGhvdyBsb25nIHVudGlsIG5leHQgb2ZmaWNlIGhvdXJcbiAgICBpZiAoY2FuQ2xlYXJRdWV1ZSkge1xuICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgIGNvbnN0IG5leHRPZmZpY2VIb3VyID0gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdGFydFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSB9LFxuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgIHN0YXJ0VGltZTogJ0FTQycsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIG5leHRPZmZpY2VIb3VyVGltZSA9IG5leHRPZmZpY2VIb3VyPy5zdGFydFRpbWU7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICByZXR1cm4geyBxdWV1ZUlkOiBxdWV1ZS5pZCwgY2FuQ2xlYXJRdWV1ZSwgbmV4dE9mZmljZUhvdXJUaW1lIH07XG4gIH1cblxuICBAUG9zdCgnOmlkL3VwZGF0ZV9jYWxlbmRhcicpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgdXBkYXRlQ2FsZW5kYXIoQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGNvdXJzZUlkKTtcbiAgICBhd2FpdCB0aGlzLmljYWxTZXJ2aWNlLnVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGNvdXJzZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcbmltcG9ydCB7XG4gIElzQm9vbGVhbixcbiAgSXNEZWZpbmVkLFxuICBJc0VudW0sXG4gIElzSW50LFxuICBJc05vdEVtcHR5LFxuICBJc09wdGlvbmFsLFxuICBJc1N0cmluZyxcbiAgVmFsaWRhdGVJZixcbn0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5leHBvcnQgY29uc3QgUFJPRF9VUkwgPSBcImh0dHBzOi8va2hvdXJ5b2ZmaWNlaG91cnMuY29tXCI7XG5leHBvcnQgY29uc3QgaXNQcm9kID0gKCk6IGJvb2xlYW4gPT5cbiAgcHJvY2Vzcy5lbnYuRE9NQUlOID09PSBQUk9EX1VSTCB8fFxuICAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3c/LmxvY2F0aW9uPy5vcmlnaW4gPT09IFBST0RfVVJMKTtcblxuLy8gVE9ETzogQ2xlYW4gdGhpcyB1cCwgbW92ZSBpdCBzb213aGVyZSBlbHNlLCB1c2UgbW9tZW50Pz8/XG4vLyBhIC0gYiwgaW4gbWludXRlc1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVEaWZmSW5NaW5zKGE6IERhdGUsIGI6IERhdGUpOiBudW1iZXIge1xuICByZXR1cm4gKGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFQSSBCYXNlIERhdGEgVHlwZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gTk9URTogVGhlc2UgYXJlIG5vdCB0aGUgREIgZGF0YSB0eXBlcy4gVGhleSBhcmUgb25seSB1c2VkIGZvciB0aGUgYXBpXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHVzZXIuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBlbWFpbCBzdHJpbmcgb2YgdGhlIHVzZXIgaWYgdGhleSBwcm92aWRlIGl0IChudWxsYWJsZSlcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqIEBwYXJhbSBjb3Vyc2VzIC0gVGhlIGxpc3Qgb2YgY291cnNlcyB0aGF0IHRoZSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCAoYXMgZWl0aGVyIGEgJ3N0dWRlbnQnLCAndGEnIG9yICdwcm9mZXNzb3InKVxuICogQHBhcmFtIGRlc2t0b3BOb3RpZnMgLSBsaXN0IG9mIGVuZHBvaW50cyBzbyB0aGF0IGZyb250ZW5kIGNhbiBmaWd1cmUgb3V0IGlmIGRldmljZSBpcyBlbmFibGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsITogc3RyaW5nO1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIGxhc3ROYW1lPzogc3RyaW5nO1xuICBuYW1lITogc3RyaW5nO1xuICBwaG90b1VSTCE6IHN0cmluZztcbiAgY291cnNlcyE6IFVzZXJDb3Vyc2VbXTtcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERlc2t0b3BOb3RpZlBhcnRpYWwpXG4gIGRlc2t0b3BOb3RpZnMhOiBEZXNrdG9wTm90aWZQYXJ0aWFsW107XG5cbiAgcGhvbmVOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcbiAgcGhvbmVOdW1iZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVuZHBvaW50ITogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBwYXJ0aWFsIHVzZXIgaW5mbyBuZWVkZWQgYnkgdGhlIGZyb250ZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICovXG5leHBvcnQgY2xhc3MgVXNlclBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWw/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob3RvVVJMPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWFsIGNvdXJzZSBkYXRhIG5lZWRlZCBvbiB0aGUgZnJvbnQgZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKi9cbmV4cG9ydCB0eXBlIENvdXJzZVBhcnRpYWwgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSB0aGF0IGEgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggYW5kIHRoZWlyIHJvbGUgaW4gdGhhdCBjb3Vyc2VcbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoZSB1c2VyIGFjY29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSByb2xlIC0gVGhlIHVzZXIncyByb2xlIGluIHRoZSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCB0eXBlIFVzZXJDb3Vyc2UgPSB7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9sZTogUm9sZTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgdXNlciByb2xlcyBpbiBhIGNvdXJzZS5cbiAqL1xuZXhwb3J0IGVudW0gUm9sZSB7XG4gIFNUVURFTlQgPSBcInN0dWRlbnRcIixcbiAgVEEgPSBcInRhXCIsXG4gIFBST0ZFU1NPUiA9IFwicHJvZmVzc29yXCIsXG59XG5cbmNsYXNzIE9mZmljZUhvdXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHRpdGxlITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZSE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZSE6IERhdGU7XG59XG5cbi8qKlxuICogQSBRdWV1ZSB0aGF0IHN0dWRlbnRzIGNhbiBqb2luIHdpdGggdGhpZXIgdGlja2V0cy5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhhdCB0aGlzIG9mZmljZSBob3VycyBxdWV1ZSBpcyBmb3IuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gcXVlc3Rpb25zIC0gVGhlIGxpc3Qgb2YgdGhlIHN0dWRlbnRzIHF1ZXN0aW9ucyBhc3NvY2FpdGVkIHdpdGggdGhlIHF1ZXVlLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb29tOiBzdHJpbmc7XG4gIHN0YWZmTGlzdDogVXNlclBhcnRpYWxbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBzdGFydFRpbWU/OiBEYXRlO1xuICBlbmRUaW1lPzogRGF0ZTtcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWV1ZSBwYXJ0aWFsIHRvIGJlIHNob3duIG9uIHRoZSB0b2RheSBwYWdlLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZVBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgcm9vbSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgc3RhZmZMaXN0ITogVXNlclBhcnRpYWxbXTtcblxuICBxdWV1ZVNpemUhOiBudW1iZXI7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBpc09wZW4hOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZT86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZT86IERhdGU7XG5cbiAgYWxsb3dRdWVzdGlvbnMhOiBib29sZWFuO1xufVxuXG4vLyBSZXByZXNlbnRzIGEgbGlzdCBvZiBvZmZpY2UgaG91cnMgd2FpdCB0aW1lcyBvZiBlYWNoIGhvdXIgb2YgdGhlIHdlZWsuXG4vLyBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgYXJyYXkgaXMgdGhlIHdhaXQgdGltZSBmb3IgdGhlIGZpcnN0IGhvdXIgb2YgU3VuZGF5LCBVVEMuXG4vLyAgIFVzZXJzIG9mIHRoZSBoZWF0bWFwIHNob3VsZCByb3RhdGUgaXQgYWNjb3JkaW5nIHRvIHRoZWlyIHRpbWV6b25lLlxuLy8gSU5WQVJJQU5UOiBNdXN0IGhhdmUgMjQqNyBlbGVtZW50c1xuLy9cbi8vIFdhaXQgdGltZSA9IC0xIHJlcHJlc2VudHMgbm8gb2ZmaWNlIGhvdXJzIGRhdGEgYXQgdGhhdCB0aW1lLlxuZXhwb3J0IHR5cGUgSGVhdG1hcCA9IEFycmF5PG51bWJlcj47XG5cbi8qKlxuICogQSBRdWVzdGlvbiBpcyBjcmVhdGVkIHdoZW4gYSBzdHVkZW50IHdhbnRzIGhlbHAgZnJvbSBhIFRBLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgc3R1ZGVudCBxdWVzdGlvbi5cbiAqIEBwYXJhbSBjcmVhdG9yIC0gVGhlIFN0dWRlbnQgdGhhdCBoYXMgY3JlYXRlZCB0aGUgcXVlc3Rpb24uXG4gKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IGRlc2NyaXRpcG4gb2Ygd2hhdCBoZS9zaGUgbmVlZHMgaGVscCB3aXRoLlxuICogQHBhcmFtIGNyZWF0ZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVGlja2V0IHdhcyBjcmVhdGVkLiBFeDogXCIyMDIwLTA5LTEyVDEyOjAwOjAwLTA0OjAwXCJcbiAqIEBwYXJhbSBoZWxwZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgYmVnYW4gaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBjbG9zZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgZmluaXNoZWQgaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBxdWVzdGlvblR5cGUgLSBUaGUgcXVlc3Rpb24gdHlwZSBoZWxwcyBkaXN0aW5ndWlzaCBxdWVzdGlvbiBmb3IgVEEncyBhbmQgZGF0YSBpbnNpZ2h0cy5cbiAqIEBwYXJhbSBzdGF0dXMgLSBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoaXMgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJ0aWN1bGFyIHN0dWRlbnQsIHRvIGhlbHAgVEEncyBmaW5kIHRoZW1cbiAqIEBwYXJhbSBpc09ubGluZSAtIFdldGhlciBvciBub3QgdGhlIHF1ZXN0aW9uIHdpbGwgaGVscGVkIG9ubGluZSBvciBpbi1wZXJzb25cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIHtcbiAgaWQhOiBudW1iZXI7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIGNyZWF0b3IhOiBVc2VyUGFydGlhbDtcbiAgdGV4dD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgdGFIZWxwZWQ/OiBVc2VyUGFydGlhbDtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGhlbHBlZEF0PzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjbG9zZWRBdD86IERhdGU7XG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcbiAgc3RhdHVzITogUXVlc3Rpb25TdGF0dXM7XG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuICBpc09ubGluZT86IGJvb2xlYW47XG59XG5cbi8vIFF1ZXN0aW9uIFR5cGVzXG5leHBvcnQgZW51bSBRdWVzdGlvblR5cGUge1xuICBDb25jZXB0ID0gXCJDb25jZXB0XCIsXG4gIENsYXJpZmljYXRpb24gPSBcIkNsYXJpZmljYXRpb25cIixcbiAgVGVzdGluZyA9IFwiVGVzdGluZ1wiLFxuICBCdWcgPSBcIkJ1Z1wiLFxuICBTZXR1cCA9IFwiU2V0dXBcIixcbiAgT3RoZXIgPSBcIk90aGVyXCIsXG59XG5cbmV4cG9ydCBlbnVtIE9wZW5RdWVzdGlvblN0YXR1cyB7XG4gIERyYWZ0aW5nID0gXCJEcmFmdGluZ1wiLFxuICBRdWV1ZWQgPSBcIlF1ZXVlZFwiLFxuICBIZWxwaW5nID0gXCJIZWxwaW5nXCIsXG4gIFByaW9yaXR5UXVldWVkID0gXCJQcmlvcml0eVF1ZXVlZFwiLFxufVxuXG4vKipcbiAqIExpbWJvIHN0YXR1c2VzIGFyZSBhd2FpdGluZyBzb21lIGNvbmZpcm1hdGlvbiBmcm9tIHRoZSBzdHVkZW50XG4gKi9cbmV4cG9ydCBlbnVtIExpbWJvUXVlc3Rpb25TdGF0dXMge1xuICBDYW50RmluZCA9IFwiQ2FudEZpbmRcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgc3R1ZGVudCBjYW4ndCBiZSBmb3VuZCBieSBhIFRBXG4gIFJlUXVldWVpbmcgPSBcIlJlUXVldWVpbmdcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgVEEgd2FudHMgdG8gZ2V0IGJhY2sgdG8gYSBzdHVkZW50IGxhdGVyIGFuZCBnaXZlIHRoZW0gdGhlIG9wdGlvbiB0byBiZSBwdXQgaW50byB0aGUgcHJpb3JpdHkgcXVldWVcbiAgVEFEZWxldGVkID0gXCJUQURlbGV0ZWRcIiwgLy8gV2hlbiBhIFRBIGRlbGV0ZXMgYSBxdWVzdGlvbiBmb3IgYSBtdWx0aXR1ZGUgb2YgcmVhc29uc1xufVxuXG5leHBvcnQgZW51bSBDbG9zZWRRdWVzdGlvblN0YXR1cyB7XG4gIFJlc29sdmVkID0gXCJSZXNvbHZlZFwiLFxuICBEZWxldGVkRHJhZnQgPSBcIkRlbGV0ZWREcmFmdFwiLFxuICBDb25maXJtZWREZWxldGVkID0gXCJDb25maXJtZWREZWxldGVkXCIsXG4gIFN0YWxlID0gXCJTdGFsZVwiLFxufVxuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5RdWV1ZSA9IFtcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUHJpb3JpdHlRdWV1ZSA9IFtPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWRdO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzU2VudFRvQ3JlYXRvciA9IFtcbiAgLi4uU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICAuLi5TdGF0dXNJblF1ZXVlLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCxcbl07XG5cbi8vIFRpY2tldCBTdGF0dXMgLSBSZXByZXNlbnRzIGEgZ2l2ZW4gc3RhdHVzIG9mIGFzIHN0dWRlbnQncyB0aWNrZXRcbmV4cG9ydCB0eXBlIFF1ZXN0aW9uU3RhdHVzID0ga2V5b2YgdHlwZW9mIFF1ZXN0aW9uU3RhdHVzS2V5cztcbi8vIGFuIEVudW0tbGlrZSBjb25zdGFudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgc3RhdHVzZXMgZm9yIGNvbnZlbmllbmNlLlxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uU3RhdHVzS2V5cyA9IHtcbiAgLi4uT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAuLi5DbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgLi4uTGltYm9RdWVzdGlvblN0YXR1cyxcbn07XG5cbi8qKlxuICogQSBTZW1lc3RlciBvYmplY3QsIHJlcHJlc2VudGluZyBhIHNjaGVkdWxlIHNlbWVzdGVyIHRlcm0gZm9yIHRoZSBwdXJwb3NlcyBvZiBhIGNvdXJzZS5cbiAqIEBwYXJhbSBzZWFzb24gLSBUaGUgc2Vhc29uIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKiBAcGFyYW0geWVhciAtIFRoZSB5ZWFyIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKi9cbmludGVyZmFjZSBTZW1lc3RlciB7XG4gIHNlYXNvbjogU2Vhc29uO1xuICB5ZWFyOiBudW1iZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhlIHNlYXNvbnMgaW4gd2hpY2ggYSBjb3Vyc2UgY2FuIHRha2UgcGxhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIFNlYXNvbiA9IFwiRmFsbFwiIHwgXCJTcHJpbmdcIiB8IFwiU3VtbWVyIDFcIiB8IFwiU3VtbWVyIDJcIjtcblxuZXhwb3J0IHR5cGUgRGVza3RvcE5vdGlmQm9keSA9IHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgZXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIGtleXM6IHtcbiAgICBwMjU2ZGg6IHN0cmluZztcbiAgICBhdXRoOiBzdHJpbmc7XG4gIH07XG4gIG5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQaG9uZU5vdGlmQm9keSA9IHtcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT0gQVBJIFJvdXRlIFR5cGVzID09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT24gYmFja2VuZCwgdmFsaWRhdGVkIHdpdGggaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20vdGVjaG5pcXVlcy92YWxpZGF0aW9uXG4vLyBBUEkgcm91dGUgUGFyYW1zIGFuZCBSZXNwb25zZXNcblxuLy8gT2ZmaWNlIEhvdXJzIFJlc3BvbnNlIFR5cGVzXG5leHBvcnQgY2xhc3MgR2V0UHJvZmlsZVJlc3BvbnNlIGV4dGVuZHMgVXNlciB7fVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5RGF0YVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIGVtYWlsITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGZpcnN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgbGFzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc0ludCgpXG4gIGNhbXB1cyE6IHN0cmluZztcblxuICBASXNJbnQoKVxuICBASXNPcHRpb25hbCgpXG4gIHByb2Zlc3NvciE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc1N0cmluZygpXG4gIHBob3RvX3VybCE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICBjb3Vyc2VzITogS2hvdXJ5U3R1ZGVudENvdXJzZVtdO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIHRhX2NvdXJzZXMhOiBLaG91cnlUQUNvdXJzZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5U3R1ZGVudENvdXJzZSB7XG4gIEBJc0ludCgpXG4gIGNybiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFjY2VsZXJhdGVkITogYm9vbGVhbjtcblxuICBASXNJbnQoKVxuICBzZWN0aW9uITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHRpdGxlITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5VEFDb3Vyc2Uge1xuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSB7XG4gIHJlZGlyZWN0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9maWxlUGFyYW1zIHtcbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIHBob25lTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQFZhbGlkYXRlSWYoKG8pID0+IG8ucGhvbmVOb3RpZnNFbmFibGVkKVxuICBASXNTdHJpbmcoKVxuICBASXNOb3RFbXB0eSgpXG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgZmlyc3ROYW1lPzogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VSZXNwb25zZSB7XG4gIGlkITogbnVtYmVyO1xuICBuYW1lITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IE9mZmljZUhvdXJQYXJ0aWFsKVxuICBvZmZpY2VIb3VycyE6IEFycmF5PE9mZmljZUhvdXJQYXJ0aWFsPjtcblxuICBAVHlwZSgoKSA9PiBRdWV1ZVBhcnRpYWwpXG4gIHF1ZXVlcyE6IFF1ZXVlUGFydGlhbFtdO1xuXG4gIGhlYXRtYXAhOiBIZWF0bWFwIHwgZmFsc2U7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWV1ZVJlc3BvbnNlIGV4dGVuZHMgUXVldWVQYXJ0aWFsIHt9XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VRdWV1ZXNSZXNwb25zZSBleHRlbmRzIEFycmF5PFF1ZXVlUGFydGlhbD4ge31cblxuZXhwb3J0IGNsYXNzIExpc3RRdWVzdGlvbnNSZXNwb25zZSB7XG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICB5b3VyUXVlc3Rpb24/OiBRdWVzdGlvbjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVlc3Rpb25zR2V0dGluZ0hlbHAhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXVlITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBwcmlvcml0eVF1ZXVlITogQXJyYXk8UXVlc3Rpb24+O1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIHRleHQhOiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIHF1ZXVlSWQhOiBudW1iZXI7XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGZvcmNlITogYm9vbGVhbjtcbn1cbmV4cG9ydCBjbGFzcyBDcmVhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXVlSWQ/OiBudW1iZXI7XG5cbiAgQElzRW51bShRdWVzdGlvblN0YXR1c0tleXMpXG4gIEBJc09wdGlvbmFsKClcbiAgc3RhdHVzPzogUXVlc3Rpb25TdGF0dXM7XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCB0eXBlIFRBVXBkYXRlU3RhdHVzUmVzcG9uc2UgPSBRdWV1ZVBhcnRpYWw7XG5leHBvcnQgdHlwZSBRdWV1ZU5vdGVQYXlsb2FkVHlwZSA9IHtcbiAgbm90ZXM6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBUQUNoZWNrb3V0UmVzcG9uc2Uge1xuICAvLyBUaGUgSUQgb2YgdGhlIHF1ZXVlIHdlIGNoZWNrZWQgb3V0IG9mXG4gIHF1ZXVlSWQhOiBudW1iZXI7XG4gIGNhbkNsZWFyUXVldWUhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIG5leHRPZmZpY2VIb3VyVGltZT86IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWV1ZVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbm90ZXM/OiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFsbG93UXVlc3Rpb25zPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNTRVF1ZXVlUmVzcG9uc2Uge1xuICBxdWV1ZT86IEdldFF1ZXVlUmVzcG9uc2U7XG4gIHF1ZXN0aW9ucz86IExpc3RRdWVzdGlvbnNSZXNwb25zZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUd2lsaW9Cb2R5IHtcbiAgVG9Db3VudHJ5OiBzdHJpbmc7XG4gIFRvU3RhdGU6IHN0cmluZztcbiAgU21zTWVzc2FnZVNpZDogc3RyaW5nO1xuICBOdW1NZWRpYTogc3RyaW5nO1xuICBUb0NpdHk6IHN0cmluZztcbiAgRnJvbVppcDogc3RyaW5nO1xuICBTbXNTaWQ6IHN0cmluZztcbiAgRnJvbVN0YXRlOiBzdHJpbmc7XG4gIFNtc1N0YXR1czogc3RyaW5nO1xuICBGcm9tQ2l0eTogc3RyaW5nO1xuICBCb2R5OiBzdHJpbmc7XG4gIEZyb21Db3VudHJ5OiBzdHJpbmc7XG4gIFRvOiBzdHJpbmc7XG4gIFRvWmlwOiBzdHJpbmc7XG4gIE51bVNlZ21lbnRzOiBzdHJpbmc7XG4gIE1lc3NhZ2VTaWQ6IHN0cmluZztcbiAgQWNjb3VudFNpZDogc3RyaW5nO1xuICBGcm9tOiBzdHJpbmc7XG4gIEFwaVZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB7XG4gIHJlbGVhc2VOb3RlczogdW5rbm93bjtcbiAgbGFzdFVwZGF0ZWRVbml4VGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgRVJST1JfTUVTU0FHRVMgPSB7XG4gIHF1ZXN0aW9uQ29udHJvbGxlcjoge1xuICAgIGNyZWF0ZVF1ZXN0aW9uOiB7XG4gICAgICBpbnZhbGlkUXVldWU6IFwiUG9zdGVkIHRvIGFuIGludmFsaWQgcXVldWVcIixcbiAgICAgIG5vTmV3UXVlc3Rpb25zOiBcIlF1ZXVlIG5vdCBhbGxvd2luZyBuZXcgcXVlc3Rpb25zXCIsXG4gICAgICBjbG9zZWRRdWV1ZTogXCJRdWV1ZSBpcyBjbG9zZWRcIixcbiAgICAgIG9uZVF1ZXN0aW9uQXRBVGltZTogXCJZb3UgY2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiBvbmUgcXVlc3Rpb24gYXQgYSB0aW1lLlwiLFxuICAgIH0sXG4gICAgdXBkYXRlUXVlc3Rpb246IHtcbiAgICAgIGZzbVZpb2xhdGlvbjogKFxuICAgICAgICByb2xlOiBzdHJpbmcsXG4gICAgICAgIHF1ZXN0aW9uU3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIGJvZHlTdGF0dXM6IHN0cmluZ1xuICAgICAgKTogc3RyaW5nID0+XG4gICAgICAgIGAke3JvbGV9IGNhbm5vdCBjaGFuZ2Ugc3RhdHVzIGZyb20gJHtxdWVzdGlvblN0YXR1c30gdG8gJHtib2R5U3RhdHVzfWAsXG4gICAgICB0YU9ubHlFZGl0UXVlc3Rpb25TdGF0dXM6IFwiVEEvUHJvZmVzc29ycyBjYW4gb25seSBlZGl0IHF1ZXN0aW9uIHN0YXR1c1wiLFxuICAgICAgb3RoZXJUQUhlbHBpbmc6IFwiQW5vdGhlciBUQSBpcyBjdXJyZW50bHkgaGVscGluZyB3aXRoIHRoaXMgcXVlc3Rpb25cIixcbiAgICAgIG90aGVyVEFSZXNvbHZlZDogXCJBbm90aGVyIFRBIGhhcyBhbHJlYWR5IHJlc29sdmVkIHRoaXMgcXVlc3Rpb25cIixcbiAgICAgIHRhSGVscGluZ090aGVyOiBcIlRBIGlzIGFscmVhZHkgaGVscGluZyBzb21lb25lIGVsc2VcIixcbiAgICAgIGxvZ2luVXNlckNhbnRFZGl0OiBcIkxvZ2dlZC1pbiB1c2VyIGRvZXMgbm90IGhhdmUgZWRpdCBhY2Nlc3NcIixcbiAgICB9LFxuICB9LFxuICBsb2dpbkNvbnRyb2xsZXI6IHtcbiAgICByZWNlaXZlRGF0YUZyb21LaG91cnk6IFwiSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZVwiLFxuICB9LFxuICBub3RpZmljYXRpb25Db250cm9sbGVyOiB7XG4gICAgbWVzc2FnZU5vdEZyb21Ud2lsaW86IFwiTWVzc2FnZSBub3QgZnJvbSBUd2lsaW9cIixcbiAgfSxcbiAgbm90aWZpY2F0aW9uU2VydmljZToge1xuICAgIHJlZ2lzdGVyUGhvbmU6IFwicGhvbmUgbnVtYmVyIGludmFsaWRcIixcbiAgfSxcbiAgcXVlc3Rpb25Sb2xlR3VhcmQ6IHtcbiAgICBxdWVzdGlvbk5vdEZvdW5kOiBcIlF1ZXN0aW9uIG5vdCBmb3VuZFwiLFxuICAgIHF1ZXVlT2ZRdWVzdGlvbk5vdEZvdW5kOiBcIkNhbm5vdCBmaW5kIHF1ZXVlIG9mIHF1ZXN0aW9uXCIsXG4gICAgcXVldWVEb2VzTm90RXhpc3Q6IFwiVGhpcyBxdWV1ZSBkb2VzIG5vdCBleGlzdCFcIixcbiAgfSxcbiAgcXVldWVSb2xlR3VhcmQ6IHtcbiAgICBxdWV1ZU5vdEZvdW5kOiBcIlF1ZXVlIG5vdCBmb3VuZFwiLFxuICB9LFxuICByZWxlYXNlTm90ZXNDb250cm9sbGVyOiB7XG4gICAgcmVsZWFzZU5vdGVzVGltZTogKGU6IGFueSk6IHN0cmluZyA9PlxuICAgICAgXCJFcnJvciBQYXJzaW5nIHJlbGVhc2Ugbm90ZXMgdGltZTogXCIgKyBlLFxuICB9LFxuICByb2xlR3VhcmQ6IHtcbiAgICBub3RMb2dnZWRJbjogXCJNdXN0IGJlIGxvZ2dlZCBpblwiLFxuICAgIG5vQ291cnNlSWRGb3VuZDogXCJObyBjb3Vyc2VpZCBmb3VuZFwiLFxuICAgIG5vdEluQ291cnNlOiBcIk5vdCBJbiBUaGlzIENvdXJzZVwiLFxuICAgIG11c3RCZVJvbGVUb0pvaW5Db3Vyc2U6IChyb2xlczogc3RyaW5nW10pOiBzdHJpbmcgPT5cbiAgICAgIGBZb3UgbXVzdCBoYXZlIG9uZSBvZiByb2xlcyBbJHtyb2xlcy5qb2luKFwiLCBcIil9XSB0byBhY2Nlc3MgdGhpcyBjb3Vyc2VgLFxuICB9LFxuICBwcm9maWxlQ29udHJvbGxlcjoge1xuICAgIG5vRGlza1NwYWNlOlxuICAgICAgXCJUaGVyZSBpcyBubyBkaXNrIHNwYWNlIGxlZnQgdG8gc3RvcmUgYW4gaW1hZ2UuIFBsZWFzZSBpbW1lZGlhdGVseSBjb250YWN0IHlvdXIgY291cnNlIHN0YWZmIGFuZCBsZXQgdGhlbSBrbm93LiBUaGV5IHdpbGwgY29udGFjdCB0aGUgS2hvdXJ5IE9mZmljZSBIb3VycyB0ZWFtIGFzIHNvb24gYXMgcG9zc2libGUuXCIsXG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEV2ZW50IGluIHRoZSBFdmVudE1vZGVsIHRhYmxlLCB1c2VkIGZvciBhZHZhbmNlZCBtZXRyaWNzLlxuICovXG5leHBvcnQgZW51bSBFdmVudFR5cGUge1xuICBUQV9DSEVDS0VEX0lOID0gJ3RhQ2hlY2tlZEluJyxcbiAgVEFfQ0hFQ0tFRF9PVVQgPSAndGFDaGVja2VkT3V0Jyxcbn1cblxuQEVudGl0eSgnZXZlbnRfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEV2ZW50TW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICB0aW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IEV2ZW50VHlwZSB9KVxuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmV2ZW50cylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5ldmVudHMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsImltcG9ydCB7IEhlYXRtYXAgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSBpbiB0aGUgY29udGV4dCBvZiBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKiBAcGFyYW0gc2VtZXN0ZXIgLSBUaGUgc2VtZXN0ZXIgb2YgdGhpcyBjb3Vyc2UuXG4gKi9cbi8qaW50ZXJmYWNlIENvdXJzZSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgc2VtZXN0ZXI6IFNlbWVzdGVyO1xuICAgIHVzZXJzOiBVc2VyQ291cnNlW11cbn0qL1xuXG5ARW50aXR5KCdjb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2guY291cnNlKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEuY291cnNlKVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgaWNhbFVSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VyQ291cnNlczogVXNlckNvdXJzZU1vZGVsO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFNlbWVzdGVyTW9kZWwsIChzZW1lc3RlcikgPT4gc2VtZXN0ZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnc2VtZXN0ZXJJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBzZW1lc3RlcjogU2VtZXN0ZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICAvLyBUT0RPOiBjYW4gd2UgbWFrZSB0aGVzZSBub3QgbnVsbGFibGUgYW5kIHdvcmsgd2l0aCBUeXBlT1JNXG4gIHNlbWVzdGVySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCdib29sZWFuJywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBlbmFibGVkOiBib29sZWFuOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgZ2l2ZW4gdGhlIGNvdXJzZSBpcyB1c2luZyBvdXIgYXBwXG5cbiAgLy8gVGhlIGhlYXRtYXAgaXMgZmFsc2Ugd2hlbiB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgcXVlc3Rpb25zIGFza2VkIHlldCBvciB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgb2ZmaWNlIGhvdXJzXG4gIGhlYXRtYXA6IEhlYXRtYXAgfCBmYWxzZTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICBldmVudHM6IEV2ZW50TW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIE9uZVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbGFzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBwaG90b1VSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgY291cnNlczogVXNlckNvdXJzZU1vZGVsW107XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIGRlc2t0b3BzP1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgcGhvbmU/XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gRGVza3RvcE5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZNb2RlbFtdO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gUGhvbmVOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZjogUGhvbmVOb3RpZk1vZGVsO1xuXG4gIEBFeGNsdWRlKClcbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUuc3RhZmZMaXN0KVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBARXhjbHVkZSgpXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQudXNlcilcbiAgZXZlbnRzOiBFdmVudE1vZGVsW107XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBDcmVhdGVEYXRlQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdkZXNrdG9wX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGV4cGlyYXRpb25UaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwMjU2ZGg6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgYXV0aDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZGVza3RvcE5vdGlmcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgdHlwZTogJ3RpbWVzdGFtcCcgfSlcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAndGV4dCcsIG51bGxhYmxlOiB0cnVlIH0pXG4gIG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgncGhvbmVfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFBob25lTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnBob25lTm90aWYpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdmVyaWZpZWQ6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTGVzc1RoYW5PckVxdWFsLFxuICBNYW55VG9NYW55LFxuICBNYW55VG9PbmUsXG4gIE1vcmVUaGFuT3JFcXVhbCxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuXG5pbnRlcmZhY2UgVGltZUludGVydmFsIHtcbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xufVxuXG5ARW50aXR5KCdxdWV1ZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVldWVNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5xdWV1ZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHJvb206IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWVzdGlvbk1vZGVsLCAocW0pID0+IHFtLnF1ZXVlKVxuICBARXhjbHVkZSgpXG4gIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIG5vdGVzOiBzdHJpbmc7XG5cbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucXVldWVzKVxuICBASm9pblRhYmxlKClcbiAgc3RhZmZMaXN0OiBVc2VyTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2gucXVldWUpXG4gIEBKb2luVGFibGUoKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xuXG4gIGlzT3BlbjogYm9vbGVhbjtcblxuICBhc3luYyBjaGVja0lzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zdGFmZkxpc3QgJiYgdGhpcy5zdGFmZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgTVNfSU5fTUlOVVRFID0gNjAwMDA7XG4gICAgY29uc3Qgb2hzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IG9wZW4gPSAhIW9ocy5maW5kKFxuICAgICAgKGUpID0+XG4gICAgICAgIGUuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDEwICogTVNfSU5fTUlOVVRFIDwgbm93LmdldFRpbWUoKSAmJlxuICAgICAgICBlLmVuZFRpbWUuZ2V0VGltZSgpICsgMSAqIE1TX0lOX01JTlVURSA+IG5vdy5nZXRUaW1lKCksXG4gICAgKTtcbiAgICB0aGlzLmlzT3BlbiA9IG9wZW47XG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBxdWV1ZVNpemU6IG51bWJlcjtcblxuICBhc3luYyBhZGRRdWV1ZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5xdWV1ZVNpemUgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKHRoaXMuaWQpLmdldENvdW50KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkUXVldWVUaW1lcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCB0aGlzLmdldE9mZmljZUhvdXJzKCk7XG4gICAgY29uc3QgdGltZUludGVydmFscyA9IHRoaXMuZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKG9mZmljZUhvdXJzKTtcbiAgICBjb25zdCBjdXJyVGltZSA9IHRpbWVJbnRlcnZhbHMuZmluZCgoZ3JvdXApID0+IHtcbiAgICAgIC8vIEZpbmQgYSB0aW1lIGludGVydmFsIHdpdGhpbiAxNSBtaW51dGVzIG9mIGJvdW5kcyB0byBhY2NvdW50IGZvciBUQSBlZGdlIGNhc2VzXG4gICAgICBjb25zdCBsb3dlckJvdW5kID0gZ3JvdXAuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDE1ICogNjAgKiAxMDAwO1xuICAgICAgY29uc3QgdXBwZXJCb3VuZCA9IGdyb3VwLmVuZFRpbWUuZ2V0VGltZSgpICsgMTUgKiA2MCAqIDEwMDA7XG4gICAgICByZXR1cm4gbG93ZXJCb3VuZCA8PSBub3cuZ2V0VGltZSgpICYmIHVwcGVyQm91bmQgPj0gbm93LmdldFRpbWUoKTtcbiAgICB9KTtcblxuICAgIGlmIChjdXJyVGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBjdXJyVGltZS5zdGFydFRpbWU7XG4gICAgICB0aGlzLmVuZFRpbWUgPSBjdXJyVGltZS5lbmRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBPZmZpY2UgaG91cnMgaW4gYSA3MmhyIHdpbmRvdyBhcm91bmQgbm93LCBzbmFwcGVkIHRvIG1pZG5pZ2h0XG4gIHByaXZhdGUgYXN5bmMgZ2V0T2ZmaWNlSG91cnMoKTogUHJvbWlzZTxPZmZpY2VIb3VyTW9kZWxbXT4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBsb3dlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuICAgIGxvd2VyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICBjb25zdCB1cHBlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMjQpO1xuICAgIHVwcGVyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmQoe1xuICAgICAgd2hlcmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHF1ZXVlSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgc3RhcnRUaW1lOiBNb3JlVGhhbk9yRXF1YWwobG93ZXJCb3VuZCksXG4gICAgICAgICAgZW5kVGltZTogTGVzc1RoYW5PckVxdWFsKHVwcGVyQm91bmQpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIG9yZGVyOiB7XG4gICAgICAgIHN0YXJ0VGltZTogJ0FTQycsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1lcmdlZFRpbWVJbnRlcnZhbHMoXG4gICAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdLFxuICApOiBUaW1lSW50ZXJ2YWxbXSB7XG4gICAgY29uc3QgdGltZUludGVydmFsczogVGltZUludGVydmFsW10gPSBbXTtcbiAgICBvZmZpY2VIb3Vycy5mb3JFYWNoKChvZmZpY2VIb3VyKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRpbWVJbnRlcnZhbHMubGVuZ3RoID09IDAgfHxcbiAgICAgICAgb2ZmaWNlSG91ci5zdGFydFRpbWUgPiB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV0uZW5kVGltZVxuICAgICAgKSB7XG4gICAgICAgIHRpbWVJbnRlcnZhbHMucHVzaCh7XG4gICAgICAgICAgc3RhcnRUaW1lOiBvZmZpY2VIb3VyLnN0YXJ0VGltZSxcbiAgICAgICAgICBlbmRUaW1lOiBvZmZpY2VIb3VyLmVuZFRpbWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZHcm91cCA9IHRpbWVJbnRlcnZhbHNbdGltZUludGVydmFscy5sZW5ndGggLSAxXTtcbiAgICAgIHByZXZHcm91cC5lbmRUaW1lID1cbiAgICAgICAgb2ZmaWNlSG91ci5lbmRUaW1lID4gcHJldkdyb3VwLmVuZFRpbWVcbiAgICAgICAgICA/IG9mZmljZUhvdXIuZW5kVGltZVxuICAgICAgICAgIDogcHJldkdyb3VwLmVuZFRpbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGltZUludGVydmFscztcbiAgfVxuXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgZmlndXJlIG91dCBob3cgc3RhZmYgZ2V0IHNlbnQgdG8gRkUgYXMgd2VsbFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQgeyBRdWVzdGlvblN0YXR1cywgUXVlc3Rpb25UeXBlLCBSb2xlLCBTdGF0dXNJblF1ZXVlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFNlbGVjdFF1ZXJ5QnVpbGRlcixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXMgfSBmcm9tICcuL3F1ZXN0aW9uLWZzbSc7XG5cbkBFbnRpdHkoJ3F1ZXN0aW9uX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5xdWVzdGlvbnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3F1ZXVlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWU6IFF1ZXVlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWVJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICB0ZXh0OiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjcmVhdG9ySWQnIH0pXG4gIGNyZWF0b3I6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjcmVhdG9ySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3RhSGVscGVkSWQnIH0pXG4gIHRhSGVscGVkOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgdGFIZWxwZWRJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGZpcnN0IGhlbHBlZCAoZG9lc24ndCBvdmVyd3JpdGUpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGZpcnN0SGVscGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGxhc3QgaGVscGVkIChnZXR0aW5nIGhlbHAgYWdhaW4gb24gcHJpb3JpdHkgcXVldWUgb3ZlcndyaXRlcylcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIGxlYXZlcyB0aGUgcXVldWVcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlIHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGFzIHRoZSBnaXZlbiByb2xlXG4gICAqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgc3RhdHVzIGNoYW5nZSBzdWNjZWVkZWRcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTdGF0dXMobmV3U3RhdHVzOiBRdWVzdGlvblN0YXR1cywgcm9sZTogUm9sZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyh0aGlzLnN0YXR1cywgbmV3U3RhdHVzLCByb2xlKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBpblF1ZXVlV2l0aFN0YXR1cyhcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgc3RhdHVzZXM6IFF1ZXN0aW9uU3RhdHVzW10sXG4gICk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnF1ZXVlSWQgPSA6cXVldWVJZCcsIHsgcXVldWVJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXNlcyknLCB7XG4gICAgICAgIHN0YXR1c2VzLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cblxuICAvKipcbiAgICogUXVlc3Rpb25zIHRoYXQgYXJlIG9wZW4gaW4gdGhlIHF1ZXVlIChub3QgaW4gcHJpb3JpdHkgcXVldWUpXG4gICAqL1xuICBzdGF0aWMgd2FpdGluZ0luUXVldWUocXVldWVJZDogbnVtYmVyKTogU2VsZWN0UXVlcnlCdWlsZGVyPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBTdGF0dXNJblF1ZXVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXMsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcblxuaW50ZXJmYWNlIEFsbG93YWJsZVRyYW5zaXRpb25zIHtcbiAgc3R1ZGVudD86IFF1ZXN0aW9uU3RhdHVzW107XG4gIHRhPzogUXVlc3Rpb25TdGF0dXNbXTtcbn1cblxuY29uc3QgUVVFVUVfVFJBTlNJVElPTlM6IEFsbG93YWJsZVRyYW5zaXRpb25zID0ge1xuICB0YTogW09wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLCBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF0sXG4gIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbn07XG5cbmNvbnN0IFFVRVNUSU9OX1NUQVRFUzogUmVjb3JkPFF1ZXN0aW9uU3RhdHVzLCBBbGxvd2FibGVUcmFuc2l0aW9ucz4gPSB7XG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmddOiB7XG4gICAgc3R1ZGVudDogW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICAgIHRhOiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuRGVsZXRlZERyYWZ0XSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmddOiB7XG4gICAgc3R1ZGVudDogW1xuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdOiB7XG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWRdOiB7fSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdOiB7fSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5EZWxldGVkRHJhZnRdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJ2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgTGVzc1RoYW5PckVxdWFsLCBNb3JlVGhhbk9yRXF1YWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zLm1hcCgocXVldWUpID0+IHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCkpLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmIChmb3JjZSB8fCAhKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdWxkIHdlIGNvbnNpZGVyIGNsZWFuaW5nIHRoZSBxdWV1ZT9cbiAgLy8gIENoZWNrcyBpZiB0aGVyZSBhcmUgbm8gc3RhZmYsIG9wZW4gcXVlc3Rpb25zIGFuZCB0aGF0IHRoZXJlIGFyZW4ndCBhbnkgb2ZmaWNlIGhvdXJzIHNvb25cbiAgcHVibGljIGFzeW5jIHNob3VsZENsZWFuUXVldWUocXVldWU6IFF1ZXVlTW9kZWwpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTGFzdCBUQSB0byBjaGVja291dCwgc28gY2hlY2sgaWYgd2UgbWlnaHQgd2FudCB0byBjbGVhciB0aGUgcXVldWVcbiAgICAgIGNvbnN0IGFyZUFueVF1ZXN0aW9uc09wZW4gPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgICAgICBxdWV1ZS5pZCxcbiAgICAgICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAgICkuZ2V0Q291bnQoKSkgPiAwO1xuICAgICAgaWYgKGFyZUFueVF1ZXN0aW9uc09wZW4pIHtcbiAgICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgICAgY29uc3QgYXJlT2ZmaWNlSG91clNvb24gPVxuICAgICAgICAgIChhd2FpdCBPZmZpY2VIb3VyTW9kZWwuY291bnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiBMZXNzVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICAgIGVuZFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpID4gMDtcbiAgICAgICAgaWYgKCFhcmVPZmZpY2VIb3VyU29vbikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBbXG4gICAgICAuLi5PYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAuLi5PYmplY3QudmFsdWVzKExpbWJvUXVlc3Rpb25TdGF0dXMpLFxuICAgIF0pLmdldE1hbnkoKTtcblxuICAgIHF1ZXN0aW9ucy5mb3JFYWNoKChxOiBRdWVzdGlvbk1vZGVsKSA9PiB7XG4gICAgICBxLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlO1xuICAgICAgcS5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUocXVlc3Rpb25zKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsImltcG9ydCB7IFJvbGUsIFNTRVF1ZXVlUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICdzc2Uvc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgcmVzLCBtZXRhZGF0YSk7XG4gIH1cblxuICAvLyBTZW5kIGV2ZW50IHdpdGggbmV3IHF1ZXN0aW9ucywgYnV0IG5vIG1vcmUgdGhhbiBvbmNlIGEgc2Vjb25kXG4gIHVwZGF0ZVF1ZXN0aW9ucyA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgaWYgKHF1ZXN0aW9ucykge1xuICAgICAgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICh7IHJvbGUsIHVzZXJJZCB9KSA9PiAoe1xuICAgICAgICBxdWVzdGlvbnM6IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgICAgIHF1ZXVlSWQsXG4gICAgICAgICAgcXVlc3Rpb25zLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByb2xlLFxuICAgICAgICApLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlUXVldWUgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCBhc3luYyAoKSA9PiAoeyBxdWV1ZSB9KSk7XG4gICAgfVxuICB9KTtcblxuICBwcml2YXRlIGFzeW5jIHNlbmRUb1Jvb20oXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIGRhdGE6IChtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSkgPT4gUHJvbWlzZTxTU0VRdWV1ZVJlc3BvbnNlPixcbiAgKSB7XG4gICAgYXdhaXQgdGhpcy5zc2VTZXJ2aWNlLnNlbmRFdmVudChpZFRvUm9vbShxdWV1ZUlkKSwgZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlVXBkYXRlKHVwZGF0ZUZ1bmN0aW9uOiAocXVldWVJZDogbnVtYmVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgcmV0dXJuIHRocm90dGxlKFxuICAgICAgYXN5bmMgKHF1ZXVlSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUZ1bmN0aW9uKHF1ZXVlSWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSxcbiAgICAgIDEwMDAsXG4gICAgICB7XG4gICAgICAgIGxlYWRpbmc6IGZhbHNlLFxuICAgICAgICB0cmFpbGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIE9uTW9kdWxlRGVzdHJveSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGVhY2ggfSBmcm9tICdhc3luYyc7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVkaXNTZXJ2aWNlIH0gZnJvbSAnbmVzdGpzLXJlZGlzJztcblxuLyoqXG4gKiBBIGNvbm5lY3Rpb24gdG8gYSBwYXJ0aWN1bGFyIGZyb250ZW5kIGNsaWVudFxuICovXG5pbnRlcmZhY2UgQ29ubmVjdGlvbiB7XG4gIHJlczogUmVzcG9uc2U7XG4gIGNsZWFudXA6ICgpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmludGVyZmFjZSBSZWRpc0NsaWVudEluZm88VD4ge1xuICBjbGllbnRJZDogbnVtYmVyO1xuICBtZXRhZGF0YTogVDtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICpcbiAqIFRoaXMgaGFuZGxlcyB3aGVuIHRoZXJlJ3MgbXVsdGlwbGUgYmFja2VuZCBpbnN0YW5jZXMgYnkgYXNzaWduaW5nIHVuaXF1ZSBjbGllbnQgaWRzIHRvIGVhY2ggY29ubmVjdGlvbi5cbiAqIFdoZW4gb25lIGluc3RhbmNlIHdhbnRzIHRvIHNlbmQgdG8gYSBjbGllbnQsIGl0IHB1Ymxpc2hlcyB0byBhIFJlZGlzIGNoYW5uZWwgZm9yIHRoZSBjbGllbnQuXG4gKiBBbGwgaW5zdGFuY2VzIGxpc3RlbiB0byBSZWRpcywgYW5kIGlmIHRoZXkgYXJlIHRoZSBvbmUgbWFuYWdpbmcgdGhhdCBjbGllbnQsIHRoZXkgc2VuZCB0aGUgbXNnLlxuICpcbiAqIFJvb21zIHdpdGggY2xpZW50IG1ldGFkYXRhIGFyZSBhbHNvIG1haW50YWluZWQgaW4gUmVkaXMga2V5L3ZhbHVlIHN0b3JlLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiBpbXBsZW1lbnRzIE9uTW9kdWxlRGVzdHJveSB7XG4gIC8vIENsaWVudHMgY29ubmVjdGVkIHRvIHRoaXMgaW5zdGFuY2Ugb2YgdGhlIGJhY2tlbmRcbiAgcHJpdmF0ZSBkaXJlY3RDb25ubmVjdGlvbnM6IFJlY29yZDxzdHJpbmcsIENvbm5lY3Rpb24+ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZWRpc1NlcnZpY2U6IFJlZGlzU2VydmljZSkge1xuICAgIGNvbnN0IHJlZGlzU3ViID0gdGhpcy5yZWRpc1NlcnZpY2UuZ2V0Q2xpZW50KCdzdWInKTtcblxuICAgIC8vIElmIGNoYW5uZWwgaXMgbWFuYWdlZCBieSB0aGlzIGluc3RhbmNlLCBzZW5kIHRoZSBtZXNzYWdlIHRvIHRoZSBSZXNwb25zZSBvYmplY3QuXG4gICAgcmVkaXNTdWIub24oJ21lc3NhZ2UnLCAoY2hhbm5lbCwgbWVzc2FnZSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSAvc3NlOjpjbGllbnQtKFxcZCspLy5leGVjKGNoYW5uZWwpO1xuICAgICAgaWYgKGlkICYmIGlkWzFdIGluIHRoaXMuZGlyZWN0Q29ubm5lY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0Q29ubm5lY3Rpb25zW2lkWzFdXS5yZXMud3JpdGUoYGRhdGE6ICR7bWVzc2FnZX1cXG5cXG5gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIG9uTW9kdWxlRGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBDbGVhbnVwIGFsbCBkaXJlY3QgY29ubmVjdGlvbnMgYnkgcmVtb3ZpbmcgdGhlbSBmcm9tIHRoZSByb29tcyBpbiByZWRpcy5cbiAgICBhd2FpdCBlYWNoKE9iamVjdC52YWx1ZXModGhpcy5kaXJlY3RDb25ubmVjdGlvbnMpLCBhc3luYyAoY29ubikgPT4ge1xuICAgICAgYXdhaXQgY29ubi5jbGVhbnVwKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlZGlzIGNoYW5uZWwgbmFtZSBmcm9tIGNsaWVudCBpZFxuICAgKi9cbiAgcHJpdmF0ZSBpZFRvQ2hhbm5lbChjbGllbnRJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBzc2U6OmNsaWVudC0ke2NsaWVudElkfWA7XG4gIH1cblxuICAvKiogQWRkIGEgY2xpZW50IHRvIGEgcm9vbSAqL1xuICBhc3luYyBzdWJzY3JpYmVDbGllbnQoXG4gICAgcm9vbTogc3RyaW5nLFxuICAgIHJlczogUmVzcG9uc2UsXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlZGlzU3ViID0gdGhpcy5yZWRpc1NlcnZpY2UuZ2V0Q2xpZW50KCdzdWInKTtcbiAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXNTZXJ2aWNlLmdldENsaWVudCgnZGInKTtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgY29uc3QgY2xpZW50SWQgPSBhd2FpdCByZWRpcy5pbmNyKCdzc2U6OmNsaWVudDo6aWQnKTtcbiAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIHJlZGlzIGNoYW5uZWwgZm9yIHRoaXMgY2xpZW50XG4gICAgYXdhaXQgcmVkaXNTdWIuc3Vic2NyaWJlKHRoaXMuaWRUb0NoYW5uZWwoY2xpZW50SWQpKTtcblxuICAgIC8vIEFkZCB0byByb29tXG4gICAgY29uc3QgY2xpZW50SW5mbyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGNsaWVudElkLFxuICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgIH0gYXMgUmVkaXNDbGllbnRJbmZvPFQ+KTtcbiAgICBhd2FpdCByZWRpcy5zYWRkKHJvb20sIGNsaWVudEluZm8pO1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiByZXNwb25zZSBvYmplY3QgaW4gZGlyZWN0IGNvbm5lY3Rpb25zXG4gICAgdGhpcy5kaXJlY3RDb25ubmVjdGlvbnNbY2xpZW50SWRdID0ge1xuICAgICAgcmVzLFxuICAgICAgY2xlYW51cDogYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBSZW1vdmUgZnJvbSB0aGUgcmVkaXMgcm9vbVxuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJvb20sIGNsaWVudEluZm8pO1xuICAgICAgICBhd2FpdCByZWRpc1N1Yi51bnN1YnNjcmliZSh0aGlzLmlkVG9DaGFubmVsKGNsaWVudElkKSk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgZGVhZCBjb25uZWN0aW9ucyFcbiAgICByZXMuc29ja2V0Lm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmRpcmVjdENvbm5uZWN0aW9uc1tjbGllbnRJZF0uY2xlYW51cCgpO1xuICAgICAgZGVsZXRlIHRoaXMuZGlyZWN0Q29ubm5lY3Rpb25zW2NsaWVudElkXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTZW5kIHNvbWUgZGF0YSB0byBldmVyeW9uZSBpbiBhIHJvb20gKi9cbiAgYXN5bmMgc2VuZEV2ZW50PEQ+KFxuICAgIHJvb206IHN0cmluZyxcbiAgICBwYXlsb2FkOiAobWV0YWRhdGE6IFQpID0+IFByb21pc2U8RD4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlZGlzUHViID0gdGhpcy5yZWRpc1NlcnZpY2UuZ2V0Q2xpZW50KCdwdWInKTtcbiAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXNTZXJ2aWNlLmdldENsaWVudCgnZGInKTtcbiAgICBjb25zdCByb29tSW5mbyA9IGF3YWl0IHJlZGlzLnNtZW1iZXJzKHJvb20pO1xuICAgIGlmIChyb29tKSB7XG4gICAgICBjb25zdCBjbGllbnRzOiBSZWRpc0NsaWVudEluZm88VD5bXSA9IHJvb21JbmZvLm1hcCgocykgPT4gSlNPTi5wYXJzZShzKSk7XG4gICAgICBjb25zb2xlLmxvZyhgc2VuZGluZyBzc2UgdG8gJHtjbGllbnRzLmxlbmd0aH0gY2xpZW50cyBpbiAke3Jvb219YCk7XG4gICAgICBjb25zb2xlLnRpbWUoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgICAgYXBtLnN0YXJ0VHJhbnNhY3Rpb24oJ3NzZScpO1xuICAgICAgYXdhaXQgZWFjaChjbGllbnRzLCBhc3luYyAoeyBjbGllbnRJZCwgbWV0YWRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpO1xuICAgICAgICBhd2FpdCByZWRpc1B1Yi5wdWJsaXNoKHRoaXMuaWRUb0NoYW5uZWwoY2xpZW50SWQpLCB0b1NlbmQpO1xuICAgICAgfSk7XG4gICAgICBhcG0uZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgIGNvbnNvbGUudGltZUVuZChgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1yZWRpc1wiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmluUXVldWVXaXRoU3RhdHVzKHF1ZXVlSWQsIFtcbiAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgIC4uLlN0YXR1c0luUXVldWUsXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICBdKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgY29uc3QgcXVlc3Rpb25zID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucXVlc3Rpb25zR2V0dGluZ0hlbHAgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKFxuICAgICAgKHF1ZXN0aW9uKSA9PiBxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucHJpb3JpdHlRdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYXN5bmMgcGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgY29uc3QgbmV3TFFSID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdMUVIsIHF1ZXN0aW9ucyk7XG5cbiAgICAgIG5ld0xRUi5xdWV1ZSA9IHF1ZXN0aW9ucy5xdWV1ZS5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgLy8gY2xhc3NUb0NsYXNzIHRyYW5zZm9ybWVyIHdpbGwgYXBwbHkgdGhlIEBFeGNsdWRlc1xuICAgICAgICByZXR1cm4gY2xhc3NUb0NsYXNzPFF1ZXN0aW9uPihcbiAgICAgICAgICBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICAgICAgc3RhdHVzOiBJbihTdGF0dXNTZW50VG9DcmVhdG9yKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV3TFFSLnByaW9yaXR5UXVldWUgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ld0xRUjtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBDYW5BY3RpdmF0ZSxcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVmbGVjdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvbGVzR3VhcmQge1xuICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPjtcblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbjtcblxuICBzZXR1cERhdGEocmVxdWVzdDogYW55KTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvbGVzR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmbGVjdG9yOiBSZWZsZWN0b3IpIHt9XG5cbiAgYXN5bmMgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJvbGVzID0gdGhpcy5yZWZsZWN0b3IuZ2V0PHN0cmluZ1tdPigncm9sZXMnLCBjb250ZXh0LmdldEhhbmRsZXIoKSk7XG4gICAgaWYgKCFyb2xlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3QgPSBjb250ZXh0LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCB7IGNvdXJzZUlkLCB1c2VyIH0gPSBhd2FpdCB0aGlzLnNldHVwRGF0YShyZXF1ZXN0KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm90TG9nZ2VkSW4pO1xuICAgIH1cblxuICAgIGlmICghY291cnNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm9Db3Vyc2VJZEZvdW5kKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXRjaFJvbGVzKHJvbGVzLCB1c2VyLCBjb3Vyc2VJZCk7XG4gIH1cblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcblxuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub3RJbkNvdXJzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtYWluaW5nID0gcm9sZXMuZmlsdGVyKChyb2xlKSA9PiB7XG4gICAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlLnRvU3RyaW5nKCkgPT09IHJvbGU7XG4gICAgfSk7XG5cbiAgICBpZiAocmVtYWluaW5nLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubXVzdEJlUm9sZVRvSm9pbkNvdXJzZShyb2xlcyksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZW1haW5pbmcubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsIEhlYXRtYXAsIHRpbWVEaWZmSW5NaW5zIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ0FDSEVfTUFOQUdFUiwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgaW5SYW5nZSwgbWVhbiwgcmFuZ2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgQ29tbWFuZCwgUG9zaXRpb25hbCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgTW9yZVRoYW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnY2FjaGUtbWFuYWdlcic7XG5cbmZ1bmN0aW9uIGFycmF5Um90YXRlKGFyciwgY291bnQpIHtcbiAgY291bnQgLT0gYXJyLmxlbmd0aCAqIE1hdGguZmxvb3IoY291bnQgLyBhcnIubGVuZ3RoKTtcbiAgY29uc3Qgc3BsaWNlZCA9IGFyci5zcGxpY2UoMCwgY291bnQpO1xuICByZXR1cm4gWy4uLmFyciwgLi4uc3BsaWNlZF07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWF0bWFwU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ0FDSEVfTUFOQUdFUikgcHJpdmF0ZSBjYWNoZU1hbmFnZXI6IENhY2hlKSB7fVxuXG4gIGFzeW5jIGdldENhY2hlZEhlYXRtYXBGb3IoY291cnNlSWQ6IG51bWJlcik6IFByb21pc2U8SGVhdG1hcCB8IGZhbHNlPiB7XG4gICAgLy9PbmUgd2Vla1xuICAgIGNvbnN0IGNhY2hlTGVuZ3RoSW5TZWNvbmRzID0gNjA0ODAwO1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci53cmFwKFxuICAgICAgYGhlYXRtYXAvJHtjb3Vyc2VJZH1gLFxuICAgICAgKCkgPT4gdGhpcy5fZ2V0SGVhdG1hcEZvcihjb3Vyc2VJZCksXG4gICAgICB7IHR0bDogY2FjaGVMZW5ndGhJblNlY29uZHMgfSxcbiAgICApO1xuICB9XG5cbiAgLy8gRG8gbm90IHVzZSB0aGlzIGV4dGVybmFsbHkgcGx6XG4gIGFzeW5jIF9nZXRIZWF0bWFwRm9yKGNvdXJzZUlkOiBudW1iZXIpOiBQcm9taXNlPEhlYXRtYXAgfCBmYWxzZT4ge1xuICAgIC8vIFRoZSBudW1iZXIgb2YgbWludXRlcyB0byBhdmVyYWdlIGFjcm9zc1xuICAgIGNvbnN0IEJVQ0tFVF9TSVpFX0lOX01JTlMgPSAxNTtcbiAgICAvLyBOdW1iZXIgb2Ygc2FtcGxlcyB0byBnYXRoZXIgcGVyIGJ1Y2tldFxuICAgIGNvbnN0IFNBTVBMRVNfUEVSX0JVQ0tFVCA9IDM7XG4gICAgY29uc29sZS50aW1lKCdoZWF0bWFwJyk7XG4gICAgY29uc3QgcmVjZW50ID0gbW9tZW50KCkuc3VidHJhY3QoOCwgJ3dlZWtzJykudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5xdWV1ZScsICdxdWV1ZScpXG4gICAgICAud2hlcmUoJ3F1ZXVlLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgPSA6c3RhdHVzJywge1xuICAgICAgICBzdGF0dXM6IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkLFxuICAgICAgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uaGVscGVkQXQgSVMgTk9UIE5VTEwnKVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5jcmVhdGVkQXQgPiA6cmVjZW50JywgeyByZWNlbnQgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJylcbiAgICAgIC5nZXRNYW55KCk7XG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW4ocmVjZW50KSwgY291cnNlSWQgfSxcbiAgICB9KTtcblxuICAgIGlmIChvZmZpY2VIb3Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eiA9ICdBbWVyaWNhL05ld19Zb3JrJztcbiAgICBsZXQgaGVhdG1hcCA9IHRoaXMuX2dlbmVyYXRlSGVhdE1hcFdpdGhSZXBsYXkoXG4gICAgICAvLyBJZ25vcmUgcXVlc3Rpb25zIHRoYXQgY3Jvc3MgbWlkbmlnaHQgKHVzdWFsbHkgYSBmbHVrZSlcbiAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoKHEpID0+IHEuaGVscGVkQXQuZ2V0RGF0ZSgpID09PSBxLmNyZWF0ZWRBdC5nZXREYXRlKCkpLFxuICAgICAgb2ZmaWNlSG91cnMsXG4gICAgICB0eixcbiAgICAgIEJVQ0tFVF9TSVpFX0lOX01JTlMsXG4gICAgICBTQU1QTEVTX1BFUl9CVUNLRVQsXG4gICAgKTtcbiAgICBoZWF0bWFwID0gYXJyYXlSb3RhdGUoXG4gICAgICBoZWF0bWFwLFxuICAgICAgLW1vbWVudC50ei56b25lKHR6KS51dGNPZmZzZXQoRGF0ZS5ub3coKSkgLyBCVUNLRVRfU0laRV9JTl9NSU5TLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKCdoZWF0bWFwJyk7XG4gICAgcmV0dXJuIGhlYXRtYXA7XG4gIH1cblxuICAvLyBQUklWQVRFIGZ1bmN0aW9uIHRoYXQgaXMgcHVibGljIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIC8vIFJld2luZCB0aHJvdWdoIHRoZSBsYXN0IGZldyB3ZWVrcyBhbmQgZm9yIGVhY2ggdGltZSBpbnRlcnZhbCxcbiAgLy8gZmlndXJlIG91dCBob3cgbG9uZyB3YWl0IHRpbWUgd291bGQgaGF2ZSBiZWVuIGlmIHlvdSBoYWQgam9pbmVkIHRoZSBxdWV1ZSBhdCB0aGF0IHRpbWVcbiAgLy8gVGltZXpvbmUgc2hvdWxkIGJlIElBTkFcbiAgLy8gUmV0dXJucyBoZWF0bWFwIGluIHRoZSB0aW1lem9uZSAoaWUgM3JkIGJ1Y2tldCBpcyAzYW0gaW4gdGhhdCB0aW1lem9uZSlcbiAgX2dlbmVyYXRlSGVhdE1hcFdpdGhSZXBsYXkoXG4gICAgcXVlc3Rpb25zOiBRdWVzdGlvbk1vZGVsW10sXG4gICAgaG91cnM6IE9mZmljZUhvdXJNb2RlbFtdLFxuICAgIHRpbWV6b25lOiBzdHJpbmcsXG4gICAgYnVja2V0U2l6ZTogbnVtYmVyLFxuICAgIHNhbXBsZXNQZXJCdWNrZXQ6IG51bWJlcixcbiAgKTogSGVhdG1hcCB7XG4gICAgY29uc3Qgc2FtcGxlSW50ZXJ2YWwgPSBidWNrZXRTaXplIC8gc2FtcGxlc1BlckJ1Y2tldDtcbiAgICAvKlxuICAgIFRFU1Q6IFF1ZXN0aW9uMSBpcyAgMzowNSAtIDM6MjVcbiAgICAvLyBUaGUgbmV4dCBxdWVzdGlvbiBpcyAzOjIxIC0gMzo0OVxuICAgIFRIZSBmb2xsb3dpbmcgcXVlc3Rpb24gaXMgNDowNSAtIDQ6MTBcbiAgICBcbiAgICBCdWNrZXQgPSA2MCwgU2FtcGxlcyA9IDMsIHNvIHRpbWVwb2ludHMgYXJlOiAzOjAwLCAzOjIwLCAzOjQwLlxuXG4gICAgMzoyMCBzYW1wbGUgZ2V0cyB3YWl0dGltZSBvZiA1IG1pbnV0ZXNcbiAgICAzOjQwIHNhbXBsZXMgZ2V0IHdhaXR0aW1lcyBvZiA5IG1pbnV0ZXNcbiAgICA0OjAwIHNhbXBsZSBnZXRzIHdhaXR0aW1lIG9mIDAgbWludXRlc1xuXG5cbiAgICBJZiBpIGVudGVyZWQgdGhlIHF1ZXVlIGF0IHRoYXQgdGltZSB3aGVuIHNob3VsZCBJIGhhdmUgZ290dGVuIGhlbHA/XG4gICAgRXZlcnkgaW50ZXJ2YWwgb2YgbWludXRlcyBmb3IgdGhlIHBhc3QgNSB3ZWVrcyBhcmUgYWdncmVnYXRlZCAoYnkgdGFraW5nIHRoZSBhdmcpXG4gICAgXG4gICAgYW5hbHl6ZSB0aGUgYnVja2V0cyB0byBmaW5kIHRoZSBjbG9zZXN0IHRpbWUgYXBwcm94aW1hdGlvblxuXG4gICAgbG9vayBhdCBxdWVzdGlvbiBRMSBhbmQgdGhlIG5leHQgcXVlc3Rpb24gUTJcbiAgICBmb3IgYWxsIHNhbXBsZSB0aW1lcG9pbnRzIGJldHdlZW4gUTEuY3JlYXRlZEF0IGFuZCBRMi5jcmVhdGVkQXQ6XG4gICAgICAgLSBzYW1wbGUgPSBRMS5oZWxwZWRBdCAtIHRpbWVwb2ludCAoaWYgbmVnYXRpdmUsIHRoZW4gaXQncyAwKVxuICAgICovXG5cbiAgICBjb25zdCBob3VyVGltZXN0YW1wczogW251bWJlciwgbnVtYmVyXVtdID0gaG91cnMubWFwKChob3VycykgPT4gW1xuICAgICAgaG91cnMuc3RhcnRUaW1lLmdldFRpbWUoKSxcbiAgICAgIGhvdXJzLmVuZFRpbWUuZ2V0VGltZSgpLFxuICAgIF0pO1xuXG4gICAgZnVuY3Rpb24gZGF0ZVRvQnVja2V0KGRhdGU6IERhdGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgICAgLy8gcGFyc2UgaW4gem9uZSB0byBoYW5kbGUgZGF5bGlnaHQgc2F2aW5ncyBieSBnZXR0aW5nIGRheS9ob3VyL21pbnV0ZSB3aXRoaW4gdGhhdCBJQU5BIHpvbmVcbiAgICAgIGNvbnN0IGNJblpvbmUgPSBtb21lbnQudHooZGF0ZSwgdGltZXpvbmUpO1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoXG4gICAgICAgIChjSW5ab25lLmRheSgpICogMjQgKiA2MCArIGNJblpvbmUuaG91cigpICogNjAgKyBjSW5ab25lLm1pbnV0ZSgpKSAvXG4gICAgICAgICAgYnVja2V0U2l6ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVwb2ludEJ1Y2tldHM6IG51bWJlcltdW10gPSBbXG4gICAgICAuLi5BcnJheSgoMjQgKiA3ICogNjApIC8gYnVja2V0U2l6ZSksXG4gICAgXS5tYXAoKCkgPT4gW10pO1xuXG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHF1ZXN0aW9uc1swXS5jcmVhdGVkQXQ7XG4gICAgICBjb25zdCBzdW5kYXkgPSBtb21lbnQudHooc3RhcnREYXRlLCB0aW1lem9uZSkuc3RhcnRPZignd2VlaycpLnRvRGF0ZSgpO1xuXG4gICAgICBmdW5jdGlvbiBnZXROZXh0VGltZXBvaW50SW5kZXgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVEaWZmSW5NaW5zKGRhdGUsIHN1bmRheSkgLyBzYW1wbGVJbnRlcnZhbCkgKyAxO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIGRhdGUgb2YgdGhlIHNhbXBsZSB0aW1lcG9pbnQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGdpdmVuIGRhdGVcbiAgICAgIGZ1bmN0aW9uIGdldE5leHRTYW1wbGVUaW1lcG9pbnQoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgICAgICBjb25zdCB0aW1lcG9pbnRJbmRleCA9IGdldE5leHRUaW1lcG9pbnRJbmRleChkYXRlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICAgIHN1bmRheS5nZXRUaW1lKCkgKyB0aW1lcG9pbnRJbmRleCAqIHNhbXBsZUludGVydmFsICogNjAgKiAxMDAwLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgYWxsIHRpbWVwb2ludHMgYmV0d2VlbiB0aGUgdHdvIGRhdGVzXG4gICAgICBmdW5jdGlvbiBnZXRTYW1wbGVUaW1lcG9pbnRzSW5EYXRlUmFuZ2UoXG4gICAgICAgIGRhdGUxOiBEYXRlLFxuICAgICAgICBkYXRlMjogRGF0ZSxcbiAgICAgICk6IERhdGVbXSB7XG4gICAgICAgIGNvbnN0IHJldCA9IFtdO1xuICAgICAgICBsZXQgY3VyciA9IGdldE5leHRTYW1wbGVUaW1lcG9pbnQoZGF0ZTEpO1xuICAgICAgICB3aGlsZSAoY3Vyci5nZXRUaW1lKCkgPCBkYXRlMi5nZXRUaW1lKCkpIHtcbiAgICAgICAgICByZXQucHVzaChjdXJyKTtcbiAgICAgICAgICBjdXJyID0gZ2V0TmV4dFNhbXBsZVRpbWVwb2ludChjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIGN1cnJlbnQgYnVja2V0XG4gICAgICBmdW5jdGlvbiBsYXN0QnVja2V0Qm91bmRhcnkoZGF0ZTogRGF0ZSk6IG1vbWVudC5Nb21lbnQge1xuICAgICAgICBjb25zdCBzdGFydE9mV2VlayA9IG1vbWVudC50eihkYXRlLCB0aW1lem9uZSkuc3RhcnRPZignd2VlaycpO1xuICAgICAgICBjb25zdCBtID0gbW9tZW50KGRhdGUpO1xuICAgICAgICByZXR1cm4gbS5zdWJ0cmFjdChtLmRpZmYoc3RhcnRPZldlZWssICdtJykgJSBidWNrZXRTaXplLCAnbScpO1xuICAgICAgfVxuXG4gICAgICAvLyBnbyB0d28gcXVlc3Rpb25zIGF0IGEgdGltZVxuICAgICAgbGV0IGlzRmlyc3QgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VyciA9IHF1ZXN0aW9uc1tpXTtcbiAgICAgICAgY29uc3QgbmV4dCA9IHF1ZXN0aW9uc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGkgPT09IHF1ZXN0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXBvaW50cyBpbiBiZXR3ZWVuXG4gICAgICAgIGxldCBzYW1wbGVkVGltZXBvaW50cyA9IGdldFNhbXBsZVRpbWVwb2ludHNJbkRhdGVSYW5nZShcbiAgICAgICAgICBpc0ZpcnN0XG4gICAgICAgICAgICA/IGxhc3RCdWNrZXRCb3VuZGFyeShjdXJyLmNyZWF0ZWRBdClcbiAgICAgICAgICAgICAgICAuc3VidHJhY3QoMSwgJ3MnKSAvLyBzbyB0aGF0IHdlIGdldCB0aGUgZmlyc3QgdGltZXBvaW50XG4gICAgICAgICAgICAgICAgLnRvRGF0ZSgpXG4gICAgICAgICAgICA6IGN1cnIuY3JlYXRlZEF0LFxuICAgICAgICAgIGlzTGFzdFxuICAgICAgICAgICAgPyBsYXN0QnVja2V0Qm91bmRhcnkoY3Vyci5oZWxwZWRBdClcbiAgICAgICAgICAgICAgICAuYWRkKGJ1Y2tldFNpemUsICdtJykgLy8gdG8gZ2V0IHRoZSBuZXh0QnVja2V0Qm91bmRhcnlcbiAgICAgICAgICAgICAgICAudG9EYXRlKClcbiAgICAgICAgICAgIDogbmV4dC5jcmVhdGVkQXQsXG4gICAgICAgICk7XG4gICAgICAgIHNhbXBsZWRUaW1lcG9pbnRzID0gc2FtcGxlZFRpbWVwb2ludHMuZmlsdGVyKCh0aW1lKSA9PlxuICAgICAgICAgIGhvdXJUaW1lc3RhbXBzLnNvbWUoKFtzdGFydCwgZW5kXSkgPT5cbiAgICAgICAgICAgIGluUmFuZ2UodGltZS5nZXRUaW1lKCksIHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gUGFkIHRoZSBmaXJzdCBidWNrZXQgd2l0aCB6ZXJvcyB0byBhY2NvdW50IGZvciB0aW1lcG9pbnRzIGJlZm9yZSB0aGUgZmlyc3RcbiAgICAgICAgaWYgKHNhbXBsZWRUaW1lcG9pbnRzLmxlbmd0aCA+IDAgJiYgaXNGaXJzdCkge1xuICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHdlIHdvdWxkIGhhdmUgaHlwb3RoZXRpY2FsbHkgZ290dGVuIGhlbHAgYXQgdGhpcyB0aW1lcG9pbnRcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHNhbXBsZWRUaW1lcG9pbnRzKSB7XG4gICAgICAgICAgbGV0IHdhaXQgPSAwO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGluUmFuZ2UoXG4gICAgICAgICAgICAgIGMuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBjdXJyLmNyZWF0ZWRBdC5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIGN1cnIuaGVscGVkQXQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FpdCA9IChjdXJyLmhlbHBlZEF0LmdldFRpbWUoKSAtIGMuZ2V0VGltZSgpKSAvIDYwMDAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGJ1Y2tldEluZGV4ID0gZGF0ZVRvQnVja2V0KGMpO1xuICAgICAgICAgIHRpbWVwb2ludEJ1Y2tldHNbYnVja2V0SW5kZXhdLnB1c2god2FpdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXZXJlIHRoZXJlIGV2ZXIgb2ZmaWNlIGhvdXJzIGluIHRoaXMgYnVja2V0P1xuICAgIGNvbnN0IHdlcmVIb3Vyc0R1cmluZ0J1Y2tldDogYm9vbGVhbltdID0gW1xuICAgICAgLi4uQXJyYXkoKDI0ICogNyAqIDYwKSAvIGJ1Y2tldFNpemUpLFxuICAgIF07XG4gICAgZm9yIChjb25zdCBbc3RhcnQsIGVuZF0gb2YgaG91clRpbWVzdGFtcHMpIHtcbiAgICAgIC8vcHJldmVudHMgYW4gb2ZmaWNlIGhvdXIgZnJvbSBbTiwgTV0gdG8gcmVnaXN0ZXIgaW4gbXVsdGlwbGUgYnVja2V0c1xuICAgICAgZm9yIChjb25zdCBpIG9mIHJhbmdlKGRhdGVUb0J1Y2tldChzdGFydCksIGRhdGVUb0J1Y2tldChlbmQgLSAxKSArIDEpKSB7XG4gICAgICAgIHdlcmVIb3Vyc0R1cmluZ0J1Y2tldFtpXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaDogSGVhdG1hcCA9IHRpbWVwb2ludEJ1Y2tldHMubWFwKChzYW1wbGVzLCBpKSA9PiB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBtZWFuKHNhbXBsZXMpO1xuICAgICAgfSBlbHNlIGlmICh3ZXJlSG91cnNEdXJpbmdCdWNrZXRbaV0pIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGg7XG4gIH1cblxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2hlYXRtYXA6Z2VuZXJhdGUgPGNvdXJzZUlkPicsXG4gICAgZGVzY3JpYmU6ICdnZW5lcmF0ZSBoZWF0bWFwIGZvciBhIGNvdXJzZScsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBAUG9zaXRpb25hbCh7XG4gICAgICBuYW1lOiAnY291cnNlSWQnLFxuICAgICAgZGVzY3JpYmU6ICd3aGljaCBjb3Vyc2UgdGhlIGhlYXRtYXAgd2lsbCBiZSBnZW5lcmF0ZWQgZm9yJyxcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgIH0pXG4gICAgY291cnNlSWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coYXdhaXQgdGhpcy5fZ2V0SGVhdG1hcEZvcihjb3Vyc2VJZCkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgTW9tZW50ID0gbW9tZW50Lk1vbWVudDtcblxudHlwZSBDcmVhdGVPZmZpY2VIb3VyID0gRGVlcFBhcnRpYWw8T2ZmaWNlSG91ck1vZGVsPltdO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWNhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgLy8gdHogc2hvdWxkIG5vdCBiZSBwcmVjb252ZXJ0ZWQgYnkgZmluZE9uZUlhbmFcbiAgcHJpdmF0ZSBmaXhPdXRsb29rVFooZGF0ZTogTW9tZW50LCB0ejogc3RyaW5nKTogTW9tZW50IHtcbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcbiAgICBpZiAoaWFuYSkge1xuICAgICAgLy8gTW92ZSB0byB0aGUgdGltZXpvbmUgYmVjYXVzZSBub2RlLWljYWwgZGlkbid0IGRvIGl0IGZvciB1cywgc2luY2UgaXQgZG9lcyBub3QgcmVjb2duaXplIHdpbmRvd3MgdGltZXpvbmVcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkudHooaWFuYSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGRhdGUgb2Ygb2NjdXJlbmNlcyBmb3IgYW4gcnJ1bGUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLCBleGNsdWRpbmcgdGhlIGxpc3Qgb2YgZGF0ZXNcbiAgcHJpdmF0ZSBycnVsZVRvRGF0ZXMocnJ1bGU6IGFueSwgZXZlbnRUWjogc3RyaW5nLCBleGRhdGVSYXc6IERhdGVbXSk6IERhdGVbXSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBycnVsZTtcbiAgICBjb25zdCBkdHN0YXJ0OiBNb21lbnQgPSB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy5kdHN0YXJ0KSwgZXZlbnRUWik7XG4gICAgY29uc3QgdW50aWw6IE1vbWVudCA9XG4gICAgICBvcHRpb25zLnVudGlsICYmIHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLnVudGlsKSwgZXZlbnRUWik7XG4gICAgY29uc3QgZXZlbnRUWk1vbWVudCA9IG1vbWVudC50ei56b25lKGZpbmRPbmVJYW5hKGV2ZW50VFopIHx8IGV2ZW50VFopO1xuXG4gICAgLy8gR2V0IHRoZSBVVEMgT2Zmc2V0IGluIHRoaXMgZXZlbnQncyB0aW1lem9uZSwgYXQgdGhpcyB0aW1lLiBBY2NvdW50cyBmb3IgRGF5bGlnaHQgU2F2aW5ncyBhbmQgb3RoZXIgb2RkaXRpZXNcbiAgICBjb25zdCB0elVUQ09mZnNldE9uRGF0ZSA9IChkYXRlOiBNb21lbnQpID0+XG4gICAgICBldmVudFRaTW9tZW50LnV0Y09mZnNldChkYXRlLnZhbHVlT2YoKSk7XG4gICAgY29uc3QgZHRzdGFydFVUQ09mZnNldCA9IHR6VVRDT2Zmc2V0T25EYXRlKGR0c3RhcnQpO1xuXG4gICAgLy8gQXBwbHkgYSBVVEMgb2Zmc2V0IGluIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIE1vbWVudFxuICAgIGNvbnN0IGFwcGx5T2Zmc2V0ID0gKGRhdGU6IE1vbWVudCwgdXRjT2Zmc2V0OiBudW1iZXIpOiBNb21lbnQgPT5cbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdCh1dGNPZmZzZXQsICdtJyk7XG4gICAgLy8gYXBwbHkgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwcmVSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIGR0c3RhcnRVVENPZmZzZXQpO1xuICAgIC8vIFJldmVydCB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHBvc3RSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIC1kdHN0YXJ0VVRDT2Zmc2V0KTtcblxuICAgIC8vIEFkanVzdCBmb3IgcnJ1bGUgbm90IHRha2luZyBpbnRvIGFjY291bnQgRFNUIGluIGxvY2FsZVxuICAgIC8vICAgaWUuIFwiOHBtIGV2ZXJ5IGZyaWRheVwiIG1lYW5zIGhhdmluZyB0byBwdXNoIGJhY2sgNjAgbWludXRlcyBhZnRlciBGYWxsIEJhY2t3YXJkc1xuICAgIGNvbnN0IGZpeERTVCA9IChkYXRlOiBNb21lbnQpOiBNb21lbnQgPT5cbiAgICAgIC8vIEdldCB0aGUgZGlmZmVyZW5jZSBpbiBVVEMgb2Zmc2V0IGJldHdlZW4gZHRzdGFydCBhbmQgdGhpcyBkYXRlIChzbyBpZiB3ZSBjcm9zc2VkIERTVCBzd2l0Y2gsIHRoaXMgd2lsbCBiZSBub256ZXJvKVxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KGR0c3RhcnRVVENPZmZzZXQgLSB0elVUQ09mZnNldE9uRGF0ZShkYXRlKSwgJ20nKTtcblxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgUlJ1bGUoe1xuICAgICAgZnJlcTogb3B0aW9ucy5mcmVxLFxuICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICB3a3N0OiBvcHRpb25zLndrc3QsXG4gICAgICBjb3VudDogb3B0aW9ucy5jb3VudCxcbiAgICAgIGJ5d2Vla2RheTogb3B0aW9ucy5ieXdlZWtkYXksXG4gICAgICBkdHN0YXJ0OiBwcmVSUnVsZShkdHN0YXJ0KS50b0RhdGUoKSxcbiAgICAgIHVudGlsOiB1bnRpbCAmJiBwcmVSUnVsZSh1bnRpbCkudG9EYXRlKCksXG4gICAgfSk7XG5cbiAgICAvLyBEYXRlcyB0byBleGNsdWRlIGZyb20gcmVjdXJyZW5jZSwgc2VwYXJhdGUgZXhkYXRlIHRpbWVzdGFtcCBmb3IgZmlsdGVyaW5nXG4gICAgY29uc3QgZXhkYXRlczogbnVtYmVyW10gPSBPYmplY3QudmFsdWVzKGV4ZGF0ZVJhdyB8fCB7fSlcbiAgICAgIC5tYXAoKGQpID0+IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChkKSwgZXZlbnRUWikpXG4gICAgICAubWFwKChkKSA9PiBhcHBseU9mZnNldChkLCB0elVUQ09mZnNldE9uRGF0ZShkKSkudmFsdWVPZigpKTtcblxuICAgIC8vIERvaW5nIG1hdGggaGVyZSBiZWNhdXNlIG1vbWVudC5hZGQgY2hhbmdlcyBiZWhhdmlvciBiYXNlZCBvbiBzZXJ2ZXIgdGltZXpvbmVcbiAgICBjb25zdCBpbjEwV2Vla3MgPSBuZXcgRGF0ZShcbiAgICAgIGR0c3RhcnQudmFsdWVPZigpICsgMTAwMCAqIDYwICogNjAgKiAyNCAqIDcgKiAxMCxcbiAgICApO1xuICAgIHJldHVybiBydWxlXG4gICAgICAuYWxsKChkKSA9PiAhIXVudGlsIHx8IGQgPCBpbjEwV2Vla3MpXG4gICAgICAuZmlsdGVyKChkYXRlKSA9PiAhZXhkYXRlcy5pbmNsdWRlcyhkYXRlLmdldFRpbWUoKSkpXG4gICAgICAubWFwKChkKSA9PiBmaXhEU1QocG9zdFJSdWxlKG1vbWVudChkKSkpLnRvRGF0ZSgpKTtcbiAgfVxuXG4gIHBhcnNlSWNhbChpY2FsRGF0YTogQ2FsZW5kYXJSZXNwb25zZSwgY291cnNlSWQ6IG51bWJlcik6IENyZWF0ZU9mZmljZUhvdXIge1xuICAgIGNvbnN0IGljYWxEYXRhVmFsdWVzOiBBcnJheTxDYWxlbmRhckNvbXBvbmVudD4gPSBPYmplY3QudmFsdWVzKGljYWxEYXRhKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gaWNhbERhdGFWYWx1ZXMuZmlsdGVyKFxuICAgICAgKGlDYWxFbGVtZW50KTogaUNhbEVsZW1lbnQgaXMgVkV2ZW50ID0+XG4gICAgICAgIGlDYWxFbGVtZW50LnR5cGUgPT09ICdWRVZFTlQnICYmXG4gICAgICAgIGlDYWxFbGVtZW50LnN0YXJ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuZW5kICE9PSB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzRXZlbnRSZWdleCA9IC9cXGJeKE9IfEhvdXJzKVxcYi87XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9mZmljZUhvdXJzID0gb2ZmaWNlSG91cnMuZmlsdGVyKChldmVudCkgPT5cbiAgICAgIG9mZmljZUhvdXJzRXZlbnRSZWdleC50ZXN0KGV2ZW50LnN1bW1hcnkpLFxuICAgICk7XG5cbiAgICBsZXQgcmVzdWx0T2ZmaWNlSG91cnMgPSBbXTtcblxuICAgIGZpbHRlcmVkT2ZmaWNlSG91cnMuZm9yRWFjaCgob2g6IFZFdmVudCkgPT4ge1xuICAgICAgLy8gVGhpcyBvZmZpY2UgaG91ciB0aW1lem9uZS4gQVNTVU1JTkcgZXZlcnkgZGF0ZSBmaWVsZCBoYXMgc2FtZSB0aW1lem9uZSBhcyBvaC5zdGFydFxuICAgICAgY29uc3QgZXZlbnRUWiA9IG9oLnN0YXJ0LnR6O1xuICAgICAgY29uc3QgeyBycnVsZSB9ID0gb2ggYXMgYW55O1xuICAgICAgaWYgKHJydWxlKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gb2guZW5kLmdldFRpbWUoKSAtIG9oLnN0YXJ0LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBhbGxEYXRlcyA9IHRoaXMucnJ1bGVUb0RhdGVzKHJydWxlLCBldmVudFRaLCBvaC5leGRhdGUpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRPZmZpY2VIb3VycyA9IGFsbERhdGVzLm1hcCgoZGF0ZSkgPT4gKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiBkYXRlLFxuICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZHVyYXRpb24pLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzID0gcmVzdWx0T2ZmaWNlSG91cnMuY29uY2F0KGdlbmVyYXRlZE9mZmljZUhvdXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5zdGFydCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICAgIGVuZFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5lbmQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdE9mZmljZUhvdXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIE9mZmljZUhvdXJzIGZvciBhIGdpdmVuIENvdXJzZSBieSByZXNjcmFwaW5nIGljYWxcbiAgICogQHBhcmFtIGNvdXJzZSB0byBwYXJzZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGNvdXJzZTogQ291cnNlTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBzY3JhcGluZyBpY2FsIGZvciBjb3Vyc2UgXCIke2NvdXJzZS5uYW1lfVwiKCR7Y291cnNlLmlkfSBhdCB1cmw6ICR7Y291cnNlLmljYWxVUkx9Li4uYCxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZShgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgY291cnNlSWQ6IGNvdXJzZS5pZCwgcm9vbTogJ09ubGluZScgfSxcbiAgICB9KTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbTogJ09ubGluZScsXG4gICAgICAgIGNvdXJzZUlkOiBjb3Vyc2UuaWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IHRoaXMucGFyc2VJY2FsKFxuICAgICAgYXdhaXQgZnJvbVVSTChjb3Vyc2UuaWNhbFVSTCksXG4gICAgICBjb3Vyc2UuaWQsXG4gICAgKTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZGVsZXRlKHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuc2F2ZShcbiAgICAgIG9mZmljZUhvdXJzLm1hcCgoZSkgPT4ge1xuICAgICAgICBlLnF1ZXVlSWQgPSBxdWV1ZS5pZDtcbiAgICAgICAgcmV0dXJuIE9mZmljZUhvdXJNb2RlbC5jcmVhdGUoZSk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZUVuZChgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBjb25zb2xlLmxvZygnZG9uZSBzY3JhcGluZyEnKTtcbiAgfVxuXG4gIEBDcm9uKCc1MSAwICogKiAqJylcbiAgcHVibGljIGFzeW5jIHVwZGF0ZUFsbENvdXJzZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNvdXJzZSBpY2FscycpO1xuICAgIGNvbnN0IGNvdXJzZXMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY291cnNlcy5tYXAoKGMpID0+IHRoaXMudXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoYykpKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1pY2FsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbmRvd3MtaWFuYS9kaXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudC10aW1lem9uZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJycnVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZUNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXVlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWV1ZS5zdWJzY3JpYmVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVldWVDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUXVldWVDbGVhblNlcnZpY2UsXG4gICAgUXVldWVTZXJ2aWNlLFxuICAgIFF1ZXVlU1NFU2VydmljZSxcbiAgICBRdWV1ZVN1YnNjcmliZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtRdWV1ZUNsZWFuU2VydmljZSwgUXVldWVTU0VTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1NTRU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBHZXRRdWV1ZVJlc3BvbnNlLFxuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXVlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBSZXMsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAncHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZSB9IGZyb20gJy4vcXVldWUtcm9sZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdxdWV1ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXVlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVldWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8R2V0UXVldWVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgfVxuXG4gIEBHZXQoJzpxdWV1ZUlkL3F1ZXN0aW9ucycpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWVzdGlvbnMoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgcXVldWVJZCxcbiAgICAgIHF1ZXN0aW9ucyxcbiAgICAgIHVzZXJJZCxcbiAgICAgIHJvbGUsXG4gICAgKTtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXVlKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXVlUGFyYW1zLFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5ub3RlcyA9IGJvZHkubm90ZXM7XG4gICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBib2R5LmFsbG93UXVlc3Rpb25zO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnOnF1ZXVlSWQvY2xlYW4nKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIGNsZWFuUXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQ2xlYW4gdXAgcXVldWUgaWYgbmVjZXNzYXJ5XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLmNsZWFuUXVldWUocXVldWVJZCwgdHJ1ZSk7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEVuZHBvaW50IHRvIHNlbmQgZnJvbnRlbmQgcmVjZWl2ZSBzZXJ2ZXItc2VudCBldmVudHMgd2hlbiBxdWV1ZSBjaGFuZ2VzXG4gIEBHZXQoJzpxdWV1ZUlkL3NzZScpXG4gIHNlbmRFdmVudChcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICApOiB2b2lkIHtcbiAgICByZXMuc2V0KHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9ldmVudC1zdHJlYW0nLFxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUnLFxuICAgICAgJ1gtQWNjZWwtQnVmZmVyaW5nJzogJ25vJyxcbiAgICAgIENvbm5lY3Rpb246ICdrZWVwLWFsaXZlJyxcbiAgICB9KTtcblxuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChxdWV1ZUlkLCByZXMsIHsgcm9sZSwgdXNlcklkIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFF1ZXVlUm9sZSA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICBhc3luYyAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZT8uY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGU7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnF1ZXVlUm9sZUd1YXJkLnF1ZXVlTm90Rm91bmQpO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJy4vc3NlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHsgcHJvdmlkZXJzOiBbU1NFU2VydmljZV0sIGV4cG9ydHM6IFtTU0VTZXJ2aWNlXSB9KVxuZXhwb3J0IGNsYXNzIFNTRU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVN1YnNjcmliZXIgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXVlTW9kZWw+IHtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UpIHtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVldWVNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWV1ZU1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUoZXZlbnQuZW50aXR5LmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJQ2FsQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaWNhbFNlcnZpY2U6IEljYWxTZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2ljYWw6c2NyYXBlJyxcbiAgICBkZXNjcmliZTogJ3NjcmFwZSBpY2FsIGZvciBhIGNvdXJzZScsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmljYWxTZXJ2aWNlLnVwZGF0ZUFsbENvdXJzZXMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmU3Vic2NyaWJlciB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW05vdGlmaWNhdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBEZXNrdG9wTm90aWZTdWJzY3JpYmVyLCBUd2lsaW9TZXJ2aWNlXSxcbiAgZXhwb3J0czogW05vdGlmaWNhdGlvblNlcnZpY2UsIFR3aWxpb1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgQ29ubmVjdGlvbixcbiAgSW5zZXJ0RXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gRGVza3RvcE5vdGlmTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8RGVza3RvcE5vdGlmTW9kZWw+KSB7XG4gICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5RGVza3RvcChcbiAgICAgIGV2ZW50LmVudGl0eSxcbiAgICAgIFwiWW91J3ZlIHN1Y2Nlc3NmdWxseSBzaWduZWQgdXAgZm9yIGRlc2t0b3Agbm90aWZpY2F0aW9ucyFcIixcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJhZFJlcXVlc3RFeGNlcHRpb24sIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCAqIGFzIHdlYlB1c2ggZnJvbSAnd2ViLXB1c2gnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IE5vdGlmTXNncyA9IHtcbiAgcGhvbmU6IHtcbiAgICBXUk9OR19NRVNTQUdFOlxuICAgICAgJ1BsZWFzZSByZXNwb25kIHdpdGggZWl0aGVyIFlFUyBvciBOTy4gVGV4dCBTVE9QIGF0IGFueSB0aW1lIHRvIHN0b3AgcmVjZWl2aW5nIHRleHQgbWVzc2FnZXMnLFxuICAgIENPVUxEX05PVF9GSU5EX05VTUJFUjpcbiAgICAgICdDb3VsZCBub3QgZmluZCBhbiBPZmZpY2UgSG91cnMgYWNjb3VudCB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyLicsXG4gICAgVU5SRUdJU1RFUjpcbiAgICAgIFwiWW91J3ZlIHVucmVnaXN0ZXJlZCBmcm9tIHRleHQgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gRmVlbCBmcmVlIHRvIHJlLXJlZ2lzdGVyIGFueSB0aW1lIHRocm91Z2ggdGhlIHdlYnNpdGVcIixcbiAgICBEVVBMSUNBVEU6XG4gICAgICBcIllvdSd2ZSBhbHJlYWR5IGJlZW4gdmVyaWZpZWQgdG8gcmVjZWl2ZSB0ZXh0IG5vdGlmaWNhdGlvbnMgZnJvbSBLaG91cnkgT2ZmaWNlIEhvdXJzIVwiLFxuICAgIE9LOlxuICAgICAgJ1RoYW5rIHlvdSBmb3IgdmVyaWZ5aW5nIHlvdXIgbnVtYmVyIHdpdGggS2hvdXJ5IE9mZmljZSBIb3VycyEgWW91IGFyZSBub3cgc2lnbmVkIHVwIGZvciB0ZXh0IG5vdGlmaWNhdGlvbnMhJyxcbiAgfSxcbiAgcXVldWU6IHtcbiAgICBBTEVSVF9CVVRUT046XG4gICAgICBcIlRoZSBUQSBjb3VsZCd0IHJlYWNoIHlvdSwgcGxlYXNlIGhhdmUgTWljcm9zb2Z0IFRlYW1zIG9wZW4gYW5kIGNvbmZpcm0geW91IGFyZSBiYWNrIVwiLFxuICAgIFRISVJEX1BMQUNFOiBgWW91J3JlIDNyZCBpbiB0aGUgcXVldWUuIEJlIHJlYWR5IGZvciBhIFRBIHRvIGNhbGwgeW91IHNvb24hYCxcbiAgICBUQV9ISVRfSEVMUEVEOiAodGFOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICAgIGAke3RhTmFtZX0gaXMgY29taW5nIHRvIGhlbHAgeW91IWAsXG4gICAgUkVNT1ZFRDogYFlvdSd2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuIFBsZWFzZSByZXR1cm4gdG8gdGhlIGFwcCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gLFxuICB9LFxuICB0YToge1xuICAgIFNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFOlxuICAgICAgJ0Egc3R1ZGVudCBoYXMgam9pbmVkIHlvdXIgKHByZXZpb3VzbHkgZW1wdHkpIHF1ZXVlIScsXG4gIH0sXG59O1xuXG4vL1RPRE8gdGVzdCB0aGlzIHNlcnZpY2Ugb21nXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIGRlc2t0b3BQdWJsaWNLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlLFxuICApIHtcbiAgICB3ZWJQdXNoLnNldFZhcGlkRGV0YWlscyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0VNQUlMJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BSSVZBVEVLRVknKSxcbiAgICApO1xuICAgIHRoaXMuZGVza3RvcFB1YmxpY0tleSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wKFxuICAgIGluZm86IERlZXBQYXJ0aWFsPERlc2t0b3BOb3RpZk1vZGVsPixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICAgIC8vIGNyZWF0ZSBpZiBub3QgZXhpc3RcbiAgICBsZXQgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogaW5mby51c2VySWQsIGVuZHBvaW50OiBpbmZvLmVuZHBvaW50IH0sXG4gICAgfSk7XG4gICAgaWYgKCFkbikge1xuICAgICAgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5jcmVhdGUoaW5mbykuc2F2ZSgpO1xuICAgICAgYXdhaXQgZG4ucmVsb2FkKCk7XG4gICAgfVxuICAgIHJldHVybiBkbjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgdXNlcjogVXNlck1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZnVsbE51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXIpO1xuICAgIGlmICghZnVsbE51bWJlcikge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJQaG9uZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KTtcblxuICAgIGlmIChwaG9uZU5vdGlmTW9kZWwpIHtcbiAgICAgIC8vIFBob25lIG51bWJlciBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPT09IGZ1bGxOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBqdXN0IGNoYW5nZSBpdFxuICAgICAgICBwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPSBmdWxsTnVtYmVyO1xuICAgICAgICBwaG9uZU5vdGlmTW9kZWwudmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcGhvbmVOb3RpZk1vZGVsLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBmdWxsTnVtYmVyLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcblxuICAgICAgLy8gTVVUQVRFIHNvIGlmIHVzZXIuc2F2ZSgpIGlzIGNhbGxlZCBsYXRlciBpdCBkb2Vzbid0IGRpcy1hc3NvY2lhdGVcbiAgICAgIHVzZXIucGhvbmVOb3RpZiA9IHBob25lTm90aWZNb2RlbDtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm5vdGlmeVBob25lKFxuICAgICAgcGhvbmVOb3RpZk1vZGVsLFxuICAgICAgXCJZb3UndmUgc2lnbmVkIHVwIGZvciBwaG9uZSBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBUbyB2ZXJpZnkgeW91ciBudW1iZXIsIHBsZWFzZSByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIFlFUy4gVG8gdW5zdWJzY3JpYmUsIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggTk8gb3IgU1RPUFwiLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLy8gTm90aWZ5IHVzZXIgb24gYWxsIHBsYXRmb3Jtc1xuICBhc3luYyBub3RpZnlVc2VyKHVzZXJJZDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3RpZk1vZGVsc09mVXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2Rlc2t0b3BOb3RpZnMnLCAncGhvbmVOb3RpZiddLFxuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBwcm9taXNlcyBjb25jdXJyZW50bHlcbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzLm1hcChhc3luYyAobm0pID0+XG4gICAgICAgICAgdGhpcy5ub3RpZnlEZXNrdG9wKG5tLCBtZXNzYWdlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmICYmIG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWZzRW5hYmxlZCkge1xuICAgICAgdGhpcy5ub3RpZnlQaG9uZShub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuICBhc3luYyBub3RpZnlEZXNrdG9wKG5tOiBEZXNrdG9wTm90aWZNb2RlbCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdlYlB1c2guc2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBubS5lbmRwb2ludCxcbiAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICBwMjU2ZGg6IG5tLnAyNTZkaCxcbiAgICAgICAgICAgIGF1dGg6IG5tLmF1dGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShubSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBwaG9uZSBudW1iZXJcbiAgYXN5bmMgbm90aWZ5UGhvbmUoXG4gICAgcG46IFBob25lTm90aWZNb2RlbCxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZm9yY2U6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChmb3JjZSB8fCBwbi52ZXJpZmllZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLnNlbmRTTVMocG4ucGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncHJvYmxlbSBzZW5kaW5nIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5UGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwaG9uZU5vdGlmID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXBob25lTm90aWYpIHtcbiAgICAgIGFwbS5zZXRDdXN0b21Db250ZXh0KHsgcGhvbmVOdW1iZXIgfSk7XG4gICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHBob25lIG51bWJlciBkdXJpbmcgdmVyaWZpY2F0aW9uJyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5DT1VMRF9OT1RfRklORF9OVU1CRVI7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlICE9PSAnWUVTJyAmJiBtZXNzYWdlICE9PSAnTk8nICYmIG1lc3NhZ2UgIT09ICdTVE9QJykge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5XUk9OR19NRVNTQUdFO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PT0gJ05PJyB8fCBtZXNzYWdlID09PSAnU1RPUCcpIHtcbiAgICAgIC8vIGRpZCBzb21lIG1vcmUgZGlnZ2luZywgU1RPUCBqdXN0IHN0b3BzIG1lc3NhZ2VzIGNvbXBsZXRlbHksIHdlJ2xsIG5ldmVyIHJlY2VpdmUgaXRcbiAgICAgIC8vIHNvIHVoLi4uIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhhdFxuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZShwaG9uZU5vdGlmKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuVU5SRUdJU1RFUjtcbiAgICB9IGVsc2UgaWYgKHBob25lTm90aWYudmVyaWZpZWQpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuRFVQTElDQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHBob25lTm90aWYuc2F2ZSgpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5PSztcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYi1wdXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0d2lsaW8gU0RLIHRvIG1ha2UgdGVzdGluZyBlYXNpZXIuXG4gKiBTaG91bGQgTk9UIGludGVyYWN0IHdpdGggREIgbW9kZWxzIG9yIGRvIGFueXRoaW5nIHNtYXJ0LiBKdXN0IHdyYXAgVHdpbGlvLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvU2VydmljZSB7XG4gIHByaXZhdGUgdHdpbGlvQ2xpZW50OiB0d2lsaW8uVHdpbGlvO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudHdpbGlvQ2xpZW50ID0gdHdpbGlvKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQUNDT1VOVFNJRCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBwaG9uZSBudW1iZXIgb3IgcmV0dXJuIGZhbHNlIGlmIHBob25lIG51bWJlciBpc24ndCByZWFsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RnVsbFBob25lTnVtYmVyKFxuICAgIHBob25lTnVtYmVyOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nIHwgZmFsc2U+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5sb29rdXBzLnBob25lTnVtYmVycyhwaG9uZU51bWJlcikuZmV0Y2goKSlcbiAgICAgICAgLnBob25lTnVtYmVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlIHBob25lIG51bWJlciBpcyBub3QgZm91bmQsIHRoZW4gZW5kcG9pbnQgc2hvdWxkIHJldHVybiBpbnZhbGlkXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgU01TIHRvIHBob25lIG51bWJlciB1c2luZyBvdXIgVHdpbGlvIG51bWJlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9QSE9ORU5VTUJFUicpLFxuICAgICAgdG86IHBob25lTnVtYmVyLFxuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2lsaW9cIik7IiwiaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmQm9keSxcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIFR3aWxpb0JvZHksXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBIZWFkZXIsXG4gIEhlYWRlcnMsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ25vdGlmaWNhdGlvbnMnKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZXNrdG9wL2NyZWRlbnRpYWxzJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGdldERlc2t0b3BDcmVkZW50aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm5vdGlmU2VydmljZS5kZXNrdG9wUHVibGljS2V5KTtcbiAgfVxuXG4gIEBQb3N0KCdkZXNrdG9wL2RldmljZScpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyByZWdpc3RlckRlc2t0b3BVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogRGVza3RvcE5vdGlmQm9keSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmUGFydGlhbD4ge1xuICAgIGNvbnN0IGRldmljZSA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyRGVza3RvcCh7XG4gICAgICBlbmRwb2ludDogYm9keS5lbmRwb2ludCxcbiAgICAgIGV4cGlyYXRpb25UaW1lOiBib2R5LmV4cGlyYXRpb25UaW1lICYmIG5ldyBEYXRlKGJvZHkuZXhwaXJhdGlvblRpbWUpLFxuICAgICAgcDI1NmRoOiBib2R5LmtleXMucDI1NmRoLFxuICAgICAgYXV0aDogYm9keS5rZXlzLmF1dGgsXG4gICAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGRldmljZS5pZCxcbiAgICAgIGVuZHBvaW50OiBkZXZpY2UuZW5kcG9pbnQsXG4gICAgICBjcmVhdGVkQXQ6IGRldmljZS5jcmVhdGVkQXQsXG4gICAgICBuYW1lOiBkZXZpY2UubmFtZSxcbiAgICB9O1xuICB9XG5cbiAgQERlbGV0ZSgnZGVza3RvcC9kZXZpY2UvOmRldmljZUlkJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZURlc2t0b3BVc2VyKFxuICAgIEBQYXJhbSgnZGV2aWNlSWQnKSBkZXZpY2VJZDogbnVtYmVyLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kKHsgaWQ6IGRldmljZUlkLCB1c2VySWQgfSk7XG4gICAgaWYgKGRuLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShkbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYmhvb2sgZnJvbSB0d2lsaW9cbiAgQFBvc3QoJy9waG9uZS92ZXJpZnknKVxuICBASGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKVxuICBhc3luYyB2ZXJpZnlQaG9uZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBUd2lsaW9Cb2R5LFxuICAgIEBIZWFkZXJzKCd4LXR3aWxpby1zaWduYXR1cmUnKSB0d2lsaW9TaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYm9keS5Cb2R5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlbmRlck51bWJlciA9IGJvZHkuRnJvbTtcblxuICAgIGNvbnN0IHR3aWxpb0F1dGhUb2tlbiA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpO1xuXG4gICAgY29uc3QgaXNWYWxpZGF0ZWQgPSB0d2lsaW8udmFsaWRhdGVSZXF1ZXN0KFxuICAgICAgdHdpbGlvQXV0aFRva2VuLFxuICAgICAgdHdpbGlvU2lnbmF0dXJlLnRyaW0oKSxcbiAgICAgIGAke3RoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpfS9hcGkvdjEvbm90aWZpY2F0aW9ucy9waG9uZS92ZXJpZnlgLFxuICAgICAgYm9keSxcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMubm90aWZpY2F0aW9uQ29udHJvbGxlci5tZXNzYWdlTm90RnJvbVR3aWxpbyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZVRvVXNlciA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnZlcmlmeVBob25lKFxuICAgICAgc2VuZGVyTnVtYmVyLFxuICAgICAgbWVzc2FnZSxcbiAgICApO1xuICAgIGNvbnN0IE1lc3NhZ2luZ1Jlc3BvbnNlID0gdHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IE1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlVG9Vc2VyKTtcblxuICAgIHJldHVybiB0d2ltbC50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xvZ2luLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSnd0U3RyYXRlZ3kgfSBmcm9tICcuLi9sb2dpbi9qd3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSnd0TW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXG4gICAgICBpbmplY3Q6IFtDb25maWdTZXJ2aWNlXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGFzeW5jIChjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSA9PiAoe1xuICAgICAgICBzZWNyZXQ6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtMb2dpbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtKd3RTdHJhdGVneSwgTG9naW5Db3Vyc2VTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUge31cbiIsImltcG9ydCB7IEtob3VyeURhdGFQYXJhbXMsIEtob3VyeVJlZGlyZWN0UmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBhcG0gfSBmcm9tICdAZWxhc3RpYy9hcG0tcnVtJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgaHR0cFNpZ25hdHVyZSBmcm9tICdodHRwLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi8uLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBsb2dpbkNvdXJzZVNlcnZpY2U6IExvZ2luQ291cnNlU2VydmljZSxcbiAgICBwcml2YXRlIGp3dFNlcnZpY2U6IEp3dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQFBvc3QoJy9raG91cnlfbG9naW4nKVxuICBhc3luYyByZWNpZXZlRGF0YUZyb21LaG91cnkoXG4gICAgQFJlcSgpIHJlcTogUmVxdWVzdCxcbiAgICBAQm9keSgpIGJvZHk6IEtob3VyeURhdGFQYXJhbXMsXG4gICk6IFByb21pc2U8S2hvdXJ5UmVkaXJlY3RSZXNwb25zZT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IHJlcXVlc3QgaGFzIGNvbWUgZnJvbSBLaG91cnlcbiAgICAgIGNvbnN0IHBhcnNlZFJlcXVlc3QgPSBodHRwU2lnbmF0dXJlLnBhcnNlUmVxdWVzdChyZXEpO1xuICAgICAgY29uc3QgdmVyaWZ5U2lnbmF0dXJlID0gaHR0cFNpZ25hdHVyZS52ZXJpZnlITUFDKFxuICAgICAgICBwYXJzZWRSZXF1ZXN0LFxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdLSE9VUllfUFJJVkFURV9LRVknKSxcbiAgICAgICk7XG4gICAgICBpZiAoIXZlcmlmeVNpZ25hdHVyZSkge1xuICAgICAgICBhcG0uY2FwdHVyZUVycm9yKCdJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlJyk7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ0ludmFsaWQgcmVxdWVzdCBzaWduYXR1cmUnKTtcbiAgICAgIH1cbiAgICAgIC8vIFRoaXMgY2hlY2tzIGlmIHRoZSByZXF1ZXN0IGlzIGNvbWluZyBmcm9tIG9uZSBvZiB0aGUga2hvdXJ5IHNlcnZlcnNcbiAgICAgIGNvbnN0IHZlcmlmeUlQID0gdGhpcy5jb25maWdTZXJ2aWNlXG4gICAgICAgIC5nZXQoJ0tIT1VSWV9TRVJWRVJfSVAnKVxuICAgICAgICAuaW5jbHVkZXMocmVxLmlwKTtcbiAgICAgIGlmICghdmVyaWZ5SVApIHtcbiAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihcbiAgICAgICAgICAnVGhlIElQIG9mIHRoZSByZXF1ZXN0IGRvZXMgbm90IHNlZW0gdG8gYmUgY29taW5nIGZyb20gdGhlIEtob3VyeSBzZXJ2ZXInLFxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgSVAgb2YgdGhlIHJlcXVlc3QgZG9lcyBub3Qgc2VlbSB0byBiZSBjb21pbmcgZnJvbSB0aGUgS2hvdXJ5IHNlcnZlcicsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmFkZFVzZXJGcm9tS2hvdXJ5KGJvZHkpO1xuXG4gICAgLy8gQ3JlYXRlIHRlbXBvcmFyeSBsb2dpbiB0b2tlbiB0byBzZW5kIHVzZXIgdG8uXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKFxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcbiAgICAgIHsgZXhwaXJlc0luOiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgLy8gRXhwaXJlcyBpbiAzMCBkYXlzXG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7XG4gICAgICB1c2VySWQsXG4gICAgICBleHBpcmVzSW46IDYwICogNjAgKiAyNCAqIDMwLFxuICAgIH0pO1xuICAgIGNvbnN0IGlzU2VjdXJlID0gdGhpcy5jb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0PHN0cmluZz4oJ0RPTUFJTicpXG4gICAgICAuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICByZXNcbiAgICAgIC5jb29raWUoJ2F1dGhfdG9rZW4nLCBhdXRoVG9rZW4sIHsgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogaXNTZWN1cmUgfSlcbiAgICAgIC5yZWRpcmVjdCgzMDIsICcvJyk7XG4gIH1cblxuICBAR2V0KCcvbG9nb3V0JylcbiAgYXN5bmMgbG9nb3V0KEBSZXMoKSByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNsZWFyQ29va2llKCdhdXRoX3Rva2VuJywgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy9sb2dpbicpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAZWxhc3RpYy9hcG0tcnVtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHAtc2lnbmF0dXJlXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIENhbkFjdGl2YXRlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9uUHJvZHVjdGlvbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjYW5BY3RpdmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzUHJvZCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBLaG91cnlEYXRhUGFyYW1zLFxuICBLaG91cnlTdHVkZW50Q291cnNlLFxuICBLaG91cnlUQUNvdXJzZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJ2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5Db3Vyc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBhZGRVc2VyRnJvbUtob3VyeShpbmZvOiBLaG91cnlEYXRhUGFyYW1zKTogUHJvbWlzZTxVc2VyTW9kZWw+IHtcbiAgICBsZXQgdXNlcjogVXNlck1vZGVsO1xuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogaW5mby5lbWFpbCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdXNlciA9IFVzZXJNb2RlbC5jcmVhdGUoe1xuICAgICAgICBjb3Vyc2VzOiBbXSxcbiAgICAgICAgZW1haWw6IGluZm8uZW1haWwsXG4gICAgICAgIGZpcnN0TmFtZTogaW5mby5maXJzdF9uYW1lLFxuICAgICAgICBsYXN0TmFtZTogaW5mby5sYXN0X25hbWUsXG4gICAgICAgIG5hbWU6IGluZm8uZmlyc3RfbmFtZSArICcgJyArIGluZm8ubGFzdF9uYW1lLFxuICAgICAgICBwaG90b1VSTDogJycsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaW5mby5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5jb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgICAgICAgYy5jb3Vyc2UsXG4gICAgICAgICAgYy5zZWN0aW9uLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb3Vyc2UpIHtcbiAgICAgICAgICBjb25zdCB1c2VyQ291cnNlID0gYXdhaXQgdGhpcy5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgICAgUm9sZS5TVFVERU5ULFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh1c2VyQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaW5mby50YV9jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5VEFDb3Vyc2UpID0+IHtcbiAgICAgICAgLy8gUXVlcnkgZm9yIGFsbCB0aGUgY291cnNlcyB3aGljaCBtYXRjaCB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJpYyBjb3Vyc2UgZnJvbSBLaG91cnlcbiAgICAgICAgY29uc3QgY291cnNlTWFwcGluZ3MgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmQoe1xuICAgICAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjLmNvdXJzZSB9LCAvLyBUT0RPOiBBZGQgc2VtZXN0ZXIgc3VwcG9ydFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvdXJzZU1hcHBpbmcgb2YgY291cnNlTWFwcGluZ3MpIHtcbiAgICAgICAgICBjb25zdCB0YUNvdXJzZSA9IGF3YWl0IHRoaXMuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBpbmZvLnByb2Zlc3NvciA9PT0gJzEnID8gUm9sZS5QUk9GRVNTT1IgOiBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgIGNvdXJlc05hbWU6IHN0cmluZyxcbiAgICBjb3Vyc2VTZWN0aW9uOiBudW1iZXIsXG4gICk6IFByb21pc2U8Q291cnNlTW9kZWw+IHtcbiAgICBjb25zdCBjb3Vyc2VTZWN0aW9uTW9kZWwgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGNvdXJlc05hbWUsIHNlY3Rpb246IGNvdXJzZVNlY3Rpb24gfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2UnXSxcbiAgICB9KTtcbiAgICByZXR1cm4gY291cnNlU2VjdGlvbk1vZGVsPy5jb3Vyc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY291cnNlVG9Vc2VyQ291cnNlKFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgcm9sZTogUm9sZSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdXNlckNvdXJzZTogVXNlckNvdXJzZU1vZGVsO1xuICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQsIGNvdXJzZUlkLCByb2xlIH0sXG4gICAgfSk7XG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHJvbGUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuICAgIHJldHVybiB1c2VyQ291cnNlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdjb3Vyc2Vfc2VjdGlvbl9tYXBwaW5nX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICAvLyBUaGlzIGlzIHRoZSBjb3Vyc2UgbmFtZSB0aGF0IGlzIHNlbnQgdG8gdXMgZnJvbSB0aGUga2hvdXJ5IGFtaW4gYmFja2VuZFxuICBAQ29sdW1uKClcbiAgZ2VuZXJpY0NvdXJzZU5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc2VjdGlvbjogbnVtYmVyO1xuXG4gIC8vIFJlcHJlc2VudHMgdGhlIGNvdXJzZSB0aGF0IHRoaXMgbWFwcyB0b1xuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG59XG4iLCJpbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5pbXBvcnQgeyBQYXNzcG9ydFN0cmF0ZWd5IH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3Rvcihjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgand0RnJvbVJlcXVlc3Q6IChyZXE6IFJlcXVlc3QpID0+IHJlcS5jb29raWVzWydhdXRoX3Rva2VuJ10sXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcbiAgICAgIHNlY3JldE9yS2V5OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgIH0pO1xuICB9XG5cbiAgdmFsaWRhdGUocGF5bG9hZDogeyB1c2VySWQ6IG51bWJlciB9KTogYW55IHtcbiAgICByZXR1cm4geyAuLi5wYXlsb2FkIH07XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWp3dFwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcm9maWxlQ29udHJvbGxlciB9IGZyb20gJy4vcHJvZmlsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBjb250cm9sbGVyczogW1Byb2ZpbGVDb250cm9sbGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIEdldFByb2ZpbGVSZXNwb25zZSxcbiAgVXBkYXRlUHJvZmlsZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBSZXMsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZUV4Y2VwdGlvbixcbiAgVXBsb2FkZWRGaWxlLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgRmlsZUludGVyY2VwdG9yIH0gZnJvbSAnQG5lc3Rqcy9wbGF0Zm9ybS1leHByZXNzJztcbmltcG9ydCAqIGFzIGNoZWNrRGlza1NwYWNlIGZyb20gJ2NoZWNrLWRpc2stc3BhY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgbWVtb3J5U3RvcmFnZSB9IGZyb20gJ211bHRlcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgc2hhcnAgZnJvbSAnc2hhcnAnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3Byb2ZpbGUnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0KFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgY291cnNlcyA9IHVzZXIuY291cnNlc1xuICAgICAgLmZpbHRlcigodXNlckNvdXJzZSkgPT4gdXNlckNvdXJzZS5jb3Vyc2UuZW5hYmxlZClcbiAgICAgIC5tYXAoKHVzZXJDb3Vyc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb3Vyc2U6IHtcbiAgICAgICAgICAgIGlkOiB1c2VyQ291cnNlLmNvdXJzZUlkLFxuICAgICAgICAgICAgbmFtZTogdXNlckNvdXJzZS5jb3Vyc2UubmFtZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGU6IHVzZXJDb3Vyc2Uucm9sZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmUGFydGlhbFtdID0gdXNlci5kZXNrdG9wTm90aWZzLm1hcChcbiAgICAgIChkKSA9PiAoe1xuICAgICAgICBlbmRwb2ludDogZC5lbmRwb2ludCxcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGNyZWF0ZWRBdDogZC5jcmVhdGVkQXQsXG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCB1c2VyUmVzcG9uc2UgPSBwaWNrKHVzZXIsIFtcbiAgICAgICdpZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ25hbWUnLFxuICAgICAgJ2ZpcnN0TmFtZScsXG4gICAgICAnbGFzdE5hbWUnLFxuICAgICAgJ3Bob3RvVVJMJyxcbiAgICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICBdKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXNlclJlc3BvbnNlLFxuICAgICAgY291cnNlcyxcbiAgICAgIHBob25lTnVtYmVyOiB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyLFxuICAgICAgZGVza3RvcE5vdGlmcyxcbiAgICB9O1xuICB9XG5cbiAgQFBhdGNoKClcbiAgYXN5bmMgcGF0Y2goXG4gICAgQEJvZHkoKSB1c2VyUGF0Y2g6IFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB1c2VyUGF0Y2gpO1xuICAgIHVzZXIubmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgJyAnICsgdXNlci5sYXN0TmFtZTtcbiAgICBpZiAoXG4gICAgICB1c2VyLnBob25lTm90aWZzRW5hYmxlZCAmJlxuICAgICAgdXNlclBhdGNoLnBob25lTnVtYmVyICE9PSB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlclBob25lKHVzZXJQYXRjaC5waG9uZU51bWJlciwgdXNlcik7XG4gICAgfVxuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVzZXIpO1xuICB9XG5cbiAgQFBvc3QoJy91cGxvYWRfcGljdHVyZScpXG4gIEBVc2VJbnRlcmNlcHRvcnMoXG4gICAgRmlsZUludGVyY2VwdG9yKCdmaWxlJywge1xuICAgICAgc3RvcmFnZTogbWVtb3J5U3RvcmFnZSgpLFxuICAgIH0pLFxuICApXG4gIGFzeW5jIHVwbG9hZEltYWdlKFxuICAgIEBVcGxvYWRlZEZpbGUoKSBmaWxlOiBFeHByZXNzLk11bHRlci5GaWxlLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodXNlci5waG90b1VSTCkge1xuICAgICAgZnMudW5saW5rKHByb2Nlc3MuZW52LlVQTE9BRF9MT0NBVElPTiArICcvJyArIHVzZXIucGhvdG9VUkwsIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnRXJyb3IgZGVsZXRpbmcgcHJldmlvdXMgcGljdHVyZSBhdDogJyxcbiAgICAgICAgICB1c2VyLnBob3RvVVJMLFxuICAgICAgICAgIGVycixcbiAgICAgICAgICAndGhlIHByZXZpb3VzIGltYWdlIHdhcyBhdCBhbiBpbnZhbGlkIGxvY2F0aW9uPycsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzcGFjZUxlZnQgPSBhd2FpdCBjaGVja0Rpc2tTcGFjZShwYXRoLnBhcnNlKHByb2Nlc3MuY3dkKCkpLnJvb3QpO1xuXG4gICAgaWYgKHNwYWNlTGVmdC5mcmVlIDwgMTAwMDAwMDAwMCkge1xuICAgICAgLy8gaWYgbGVzcyB0aGFuIGEgZ2lnYWJ5dGUgbGVmdFxuICAgICAgdGhyb3cgbmV3IFNlcnZpY2VVbmF2YWlsYWJsZUV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucHJvZmlsZUNvbnRyb2xsZXIubm9EaXNrU3BhY2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVOYW1lID1cbiAgICAgIHVzZXIuaWQgK1xuICAgICAgJy0nICtcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxNSkgK1xuICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDE1KTtcblxuICAgIGF3YWl0IHNoYXJwKGZpbGUuYnVmZmVyKVxuICAgICAgLnJlc2l6ZSgyNTYpXG4gICAgICAudG9GaWxlKHBhdGguam9pbihwcm9jZXNzLmVudi5VUExPQURfTE9DQVRJT04sIGZpbGVOYW1lKSk7XG5cbiAgICB1c2VyLnBob3RvVVJMID0gZmlsZU5hbWU7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gIH1cblxuICBAR2V0KCcvZ2V0X3BpY3R1cmUvOnBob3RvVVJMJylcbiAgYXN5bmMgZ2V0SW1hZ2UoXG4gICAgQFBhcmFtKCdwaG90b1VSTCcpIHBob3RvVVJMOiBzdHJpbmcsXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZzLnN0YXQoXG4gICAgICBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuVVBMT0FEX0xPQ0FUSU9OLCBwaG90b1VSTCksXG4gICAgICBhc3luYyAoZXJyLCBzdGF0cykgPT4ge1xuICAgICAgICBpZiAoc3RhdHMpIHtcbiAgICAgICAgICByZXMuc2VuZEZpbGUocGhvdG9VUkwsIHsgcm9vdDogcHJvY2Vzcy5lbnYuVVBMT0FEX0xPQ0FUSU9OIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBwaG90b1VSTCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXNlci5waG90b1VSTCA9IG51bGw7XG4gICAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9wbGF0Zm9ybS1leHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWNrLWRpc2stc3BhY2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2hhcnBcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sbGVyIH0gZnJvbSAnLi9xdWVzdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXN0aW9uU3Vic2NyaWJlciB9IGZyb20gJy4vcXVlc3Rpb24uc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXN0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1F1ZXN0aW9uU3Vic2NyaWJlcl0sXG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGUsIFF1ZXVlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIEdldFF1ZXN0aW9uUmVzcG9uc2UsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXNLZXlzLFxuICBSb2xlLFxuICBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlciwgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Sb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWVzdGlvbi1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdxdWVzdGlvbnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXN0aW9uUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXN0aW9uSWQnKVxuICBhc3luYyBnZXRRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8R2V0UXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFJvbGUuU1RVREVOVClcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxDcmVhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvblR5cGUsIHF1ZXVlSWQsIGZvcmNlIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmludmFsaWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFxdWV1ZS5hbGxvd1F1ZXN0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5ub05ld1F1ZXN0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmNsb3NlZFF1ZXVlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1VzZXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBjcmVhdG9ySWQ6IHVzZXIuaWQsXG4gICAgICAgIHN0YXR1czogSW4oT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoISFwcmV2aW91c1VzZXJRdWVzdGlvbikge1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHByZXZpb3VzVXNlclF1ZXN0aW9uLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQ7XG4gICAgICAgIGF3YWl0IHByZXZpb3VzVXNlclF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5vbmVRdWVzdGlvbkF0QVRpbWUsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7XG4gICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIHRleHQsXG4gICAgICBxdWVzdGlvblR5cGUsXG4gICAgICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzS2V5cy5EcmFmdGluZyxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlzT25saW5lOiB0cnVlLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXN0aW9uSWQnKVxuICBAUm9sZXMoUm9sZS5TVFVERU5ULCBSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgLy8gVE9ETzogVXNlIHF1ZXVlUm9sZSBkZWNvcmF0b3IsIGJ1dCB3ZSBuZWVkIHRvIGZpeCBpdHMgcGVyZm9ybWFuY2UgZmlyc3RcbiAgYXN5bmMgdXBkYXRlUXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3F1ZXVlJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ3JlYXRvciA9IHVzZXJJZCA9PT0gcXVlc3Rpb24uY3JlYXRvcklkO1xuXG4gICAgaWYgKGlzQ3JlYXRvcikge1xuICAgICAgLy8gRmFpbCBpZiBzdHVkZW50IHRyaWVzIGFuIGludmFsaWQgc3RhdHVzIGNoYW5nZVxuICAgICAgaWYgKGJvZHkuc3RhdHVzICYmICFxdWVzdGlvbi5jaGFuZ2VTdGF0dXMoYm9keS5zdGF0dXMsIFJvbGUuU1RVREVOVCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1N0dWRlbnQnLFxuICAgICAgICAgICAgcXVlc3Rpb24uc3RhdHVzLFxuICAgICAgICAgICAgYm9keS5zdGF0dXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGNyZWF0b3IsIGNoZWNrIGlmIHVzZXIgaXMgVEEvUFJPRiBvZiBjb3Vyc2Ugb2YgcXVlc3Rpb25cbiAgICBjb25zdCBpc1RhT3JQcm9mID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVlc3Rpb24ucXVldWUuY291cnNlSWQsXG4gICAgICAgICAgcm9sZTogSW4oW1JvbGUuVEEsIFJvbGUuUFJPRkVTU09SXSksXG4gICAgICAgIH0sXG4gICAgICB9KSkgPiAwO1xuXG4gICAgaWYgKGlzVGFPclByb2YpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggIT09IDEgfHwgT2JqZWN0LmtleXMoYm9keSlbMF0gIT09ICdzdGF0dXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhT25seUVkaXRRdWVzdGlvblN0YXR1cyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFN0YXR1cyA9IHF1ZXN0aW9uLnN0YXR1cztcbiAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IGJvZHkuc3RhdHVzO1xuICAgICAgLy8gSWYgdGhlIHRhSGVscGVkIGlzIGFscmVhZHkgc2V0LCBtYWtlIHN1cmUgdGhlIHNhbWUgdGEgdXBkYXRlcyB0aGUgc3RhdHVzXG4gICAgICBpZiAocXVlc3Rpb24udGFIZWxwZWQ/LmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFIZWxwaW5nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFSZXNvbHZlZCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzQWxyZWFkeUhlbHBpbmdPbmUgPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5jb3VudCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHRhSGVscGVkSWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIHN0YXR1czogT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpID09PSAxO1xuICAgICAgaWYgKGlzQWxyZWFkeUhlbHBpbmdPbmUgJiYgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24udGFIZWxwaW5nT3RoZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkVHJhbnNpdGlvbiA9IHF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhuZXdTdGF0dXMsIFJvbGUuVEEpO1xuICAgICAgaWYgKCF2YWxpZFRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1RBJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBUQSBhcyB0YUhlbHBlZCB3aGVuIHRoZSBUQSBzdGFydHMgaGVscGluZyB0aGUgc3R1ZGVudFxuICAgICAgaWYgKFxuICAgICAgICBvbGRTdGF0dXMgIT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nICYmXG4gICAgICAgIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmdcbiAgICAgICkge1xuICAgICAgICBxdWVzdGlvbi50YUhlbHBlZCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHVzZXJJZCk7XG4gICAgICAgIHF1ZXN0aW9uLmhlbHBlZEF0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBTZXQgZmlyc3RIZWxwZWRBdCBpZiBpdCBoYXNuJ3QgYWxyZWFkeVxuICAgICAgICBpZiAoIXF1ZXN0aW9uLmZpcnN0SGVscGVkQXQpIHtcbiAgICAgICAgICBxdWVzdGlvbi5maXJzdEhlbHBlZEF0ID0gcXVlc3Rpb24uaGVscGVkQXQ7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy5xdWV1ZS5UQV9ISVRfSEVMUEVEKHF1ZXN0aW9uLnRhSGVscGVkLm5hbWUpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1N0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1cykge1xuICAgICAgICBxdWVzdGlvbi5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5sb2dpblVzZXJDYW50RWRpdCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQFBvc3QoJzpxdWVzdGlvbklkL25vdGlmeScpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgbm90aWZ5KEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZSddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuQUxFUlRfQlVUVE9OLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlJFTU9WRUQsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGxldCBxdWV1ZUlkO1xuXG4gICAgaWYgKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpO1xuICAgICAgaWYgKCFxdWVzdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVlc3Rpb25Ob3RGb3VuZCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSWQgPSBxdWVzdGlvbi5xdWV1ZUlkO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdC5ib2R5LnF1ZXVlSWQpIHtcbiAgICAgIC8vIElmIHlvdSBhcmUgY3JlYXRpbmcgYSBuZXcgcXVlc3Rpb25cbiAgICAgIHF1ZXVlSWQgPSByZXF1ZXN0LmJvZHkucXVldWVJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXVlT2ZRdWVzdGlvbk5vdEZvdW5kLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkKTtcblxuICAgIC8vIFlvdSBjYW5ub3QgaW50ZXJhY3Qgd2l0aCBhIHF1ZXN0aW9uIGluIGEgbm9uZXhpc3RlbnQgcXVldWVcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXVlRG9lc05vdEV4aXN0LFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgSW5zZXJ0RXZlbnQsXG4gIFJlbW92ZUV2ZW50LFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG5cbiAgICAvLyBTZW5kIHB1c2ggbm90aWZpY2F0aW9uIHRvIHN0dWRlbnRzIHdoZW4gdGhleSBhcmUgaGl0IDNyZCBpbiBsaW5lXG4gICAgLy8gaWYgc3RhdHVzIHVwZGF0ZWQgdG8gY2xvc2VkXG4gICAgaWYgKFxuICAgICAgZXZlbnQudXBkYXRlZENvbHVtbnMuZmluZCgoYykgPT4gYy5wcm9wZXJ0eU5hbWUgPT09ICdzdGF0dXMnKSAmJlxuICAgICAgZXZlbnQuZW50aXR5LnN0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1c1xuICAgICkge1xuICAgICAgLy8gZ2V0IDNyZCBpbiBxdWV1ZSBiZWZvcmUgYW5kIGFmdGVyIHRoaXMgdXBkYXRlXG4gICAgICBjb25zdCBwcmV2aW91c1RoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShcbiAgICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgICApXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgY29uc3QgdGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKGV2ZW50LmVudGl0eS5xdWV1ZUlkKVxuICAgICAgICAuc2V0UXVlcnlSdW5uZXIoZXZlbnQucXVlcnlSdW5uZXIpIC8vIFJ1biBpbiBzYW1lIHRyYW5zYWN0aW9uIGFzIHRoZSB1cGRhdGVcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBpZiAodGhpcmQgJiYgcHJldmlvdXNUaGlyZD8uaWQgIT09IHRoaXJkPy5pZCkge1xuICAgICAgICBjb25zdCB7IGNyZWF0b3JJZCB9ID0gdGhpcmQ7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoY3JlYXRvcklkLCBOb3RpZk1zZ3MucXVldWUuVEhJUkRfUExBQ0UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG51bWJlck9mUXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShcbiAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICkuZ2V0Q291bnQoKTtcblxuICAgIGlmIChudW1iZXJPZlF1ZXN0aW9ucyA9PT0gMCkge1xuICAgICAgY29uc3Qgc3RhZmYgPSAoXG4gICAgICAgIGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShldmVudC5lbnRpdHkucXVldWVJZCwge1xuICAgICAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICAgICAgfSlcbiAgICAgICkuc3RhZmZMaXN0O1xuXG4gICAgICBzdGFmZi5mb3JFYWNoKChzdGFmZikgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHN0YWZmLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy50YS5TVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gIH1cblxuICBhc3luYyBiZWZvcmVSZW1vdmUoZXZlbnQ6IFJlbW92ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gZHVlIHRvIGNhc2NhZGVzIGVudGl0eSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBsb2FkZWRcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTZWVkQ29udHJvbGxlciB9IGZyb20gJy4vc2VlZC5jb250cm9sbGVyJztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtTZWVkQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1NlZWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VlZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgQ291cnNlRmFjdG9yeSxcbiAgT2ZmaWNlSG91ckZhY3RvcnksXG4gIFF1ZXN0aW9uRmFjdG9yeSxcbiAgUXVldWVGYWN0b3J5LFxuICBTZW1lc3RlckZhY3RvcnksXG4gIFVzZXJDb3Vyc2VGYWN0b3J5LFxuICBVc2VyRmFjdG9yeSxcbn0gZnJvbSAnLi4vLi4vdGVzdC91dGlsL2ZhY3Rvcmllcyc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignc2VlZHMnKVxuQFVzZUd1YXJkcyhOb25Qcm9kdWN0aW9uR3VhcmQpXG5leHBvcnQgY2xhc3MgU2VlZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBzZWVkU2VydmljZTogU2VlZFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZWxldGUnKVxuICBhc3luYyBkZWxldGVBbGwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChPZmZpY2VIb3VyTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXN0aW9uTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXVlTW9kZWwpO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSByZXNldCc7XG4gIH1cblxuICBAR2V0KCdjcmVhdGUnKVxuICBhc3luYyBjcmVhdGVTZWVkcygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEZpcnN0IGRlbGV0ZSB0aGUgb2xkIGRhdGFcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZUFsbCgpO1xuXG4gICAgLy8gVGhlbiBhZGQgdGhlIG5ldyBzZWVkIGRhdGFcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgLSAyNCk7XG5cbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgdG9tb3Jyb3cuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgKyAxOSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXlPdmVybGFwID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSAtIDQ1MDAwMDApLFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDEwMDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzWWVzdGVyZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogeWVzdGVyZGF5LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUoeWVzdGVyZGF5LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9tb3Jyb3cgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB0b21vcnJvdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHRvbW9ycm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY291cnNlRXhpc3RzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICB9KTtcbiAgICBpZiAoIWNvdXJzZUV4aXN0cykge1xuICAgICAgYXdhaXQgU2VtZXN0ZXJGYWN0b3J5LmNyZWF0ZSh7IHNlYXNvbjogJ0ZhbGwnLCB5ZWFyOiAyMDIwIH0pO1xuICAgICAgYXdhaXQgQ291cnNlRmFjdG9yeS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgICAgcmVsYXRpb25zOiBbJ29mZmljZUhvdXJzJ10sXG4gICAgfSk7XG5cbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBbXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgXTtcbiAgICBjb3Vyc2Uuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckV4c2lzdHMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSgpO1xuICAgIGlmICghdXNlckV4c2lzdHMpIHtcbiAgICAgIC8vIFN0dWRlbnQgMVxuICAgICAgY29uc3QgdXNlcjEgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2xpdS5zdGFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdTdGFubGV5IExpdScsXG4gICAgICAgIGZpcnN0TmFtZTogJ1N0YW5sZXknLFxuICAgICAgICBsYXN0TmFtZTogJ0xpdScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUjIwQ0czNkUtY2YwZjM3NTI1MmJkLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIxLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBTdHVuZGVudCAyXG4gICAgICBjb25zdCB1c2VyMiA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAndGFrYXlhbWEuYUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0FsZXggVGFrYXlhbWEnLFxuICAgICAgICBmaXJzdE5hbWU6ICdBbGV4JyxcbiAgICAgICAgbGFzdE5hbWU6ICdUYWtheWFtYScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VSkw5NzQ0M0QtNTAxMjEzMzk2ODZiLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIyLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAxXG4gICAgICBjb25zdCB1c2VyMyA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnc3RlbnplbC53QG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnV2lsbCBTdGVuemVsJyxcbiAgICAgICAgZmlyc3ROYW1lOiAnV2lsbCcsXG4gICAgICAgIGxhc3ROYW1lOiAnU3RlbnplbCcsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUkYyNTZLUlQtZDEwMDk4ZTg3OWRhLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIzLFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMlxuICAgICAgY29uc3QgdXNlcjQgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2NodS5kYWpAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdEYS1KaW4gQ2h1JyxcbiAgICAgICAgZmlyc3ROYW1lOiAnRGEtSmluJyxcbiAgICAgICAgbGFzdE5hbWU6ICdDaHUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUU1Nlk1VVQxLTg1ZGI1OWE0NzRmNC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyNCxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFByb2Zlc3NvciAoU25hcmt5ISEpXG4gICAgICBjb25zdCB1c2VyNSA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnbGkuZWR3YUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0VkZHkgTGknLFxuICAgICAgICBmaXJzdE5hbWU6ICdFZGR5JyxcbiAgICAgICAgbGFzdE5hbWU6ICdMaScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUjZQMzJKQlQtYTZjODk4MjJjNTQ0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI1LFxuICAgICAgICByb2xlOiBSb2xlLlBST0ZFU1NPUixcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcm9vbTogJ1dIViAxMDEnLFxuICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICBvZmZpY2VIb3VyczogW1xuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgICBdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDM1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMjUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBHZXQoJ2ZpbGxfcXVldWUnKVxuICBhc3luYyBmaWxsUXVldWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSgpO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlVXNlcicpXG4gIGFzeW5jIGNyZWF0ZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiB7IHJvbGU6IFJvbGU7IGNvdXJzZUlkOiBudW1iZXIgfSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdGE6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlLCBjb3Vyc2U6IGNvdXJzZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUgfSk7XG4gICAgfVxuICAgIHJldHVybiB0YTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWV1ZScpXG4gIGFzeW5jIGNyZWF0ZVF1ZXVlKFxuICAgIEBCb2R5KClcbiAgICBib2R5OiB7XG4gICAgICBjb3Vyc2VJZDogbnVtYmVyO1xuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG4gICAgICAvLyBjbG9zZXMgaW4gbiBtaWxsaXNlY29uZHMgZnJvbSBub3dcbiAgICAgIGNsb3Nlc0luPzogbnVtYmVyO1xuICAgIH0sXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgKGJvZHk/LmNsb3Nlc0luIHx8IDQ1MDAwMDApKSxcbiAgICB9KTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgb2ZmaWNlSG91cnM6IFtvZmZpY2VIb3Vyc10sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogYm9keS5hbGxvd1F1ZXN0aW9ucyA/PyBmYWxzZSxcbiAgICB9O1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgb3B0aW9uc1snY291cnNlJ10gPSBjb3Vyc2U7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXVlOiBRdWV1ZU1vZGVsID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZShvcHRpb25zKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVlc3Rpb24nKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpXG4gICAgYm9keToge1xuICAgICAgcXVldWVJZDogbnVtYmVyO1xuICAgICAgc3R1ZGVudElkOiBudW1iZXI7XG4gICAgICBkYXRhOiBDcmVhdGVRdWVzdGlvblBhcmFtcztcbiAgICB9LFxuICApOiBQcm9taXNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgaWYgKGJvZHkucXVldWVJZCkge1xuICAgICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5xdWV1ZUlkKTtcbiAgICAgIG9wdGlvbnNbJ3F1ZXVlJ10gPSBxdWV1ZTtcbiAgICB9XG4gICAgaWYgKGJvZHkuc3R1ZGVudElkKSB7XG4gICAgICBjb25zdCBzdHVkZW50ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5zdHVkZW50SWQpO1xuICAgICAgb3B0aW9uc1snY3JlYXRvciddID0gc3R1ZGVudDtcbiAgICB9XG4gICAgY29uc3QgcXVlc3Rpb246IFF1ZXN0aW9uTW9kZWwgPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAuLi5ib2R5LmRhdGEsXG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgeyBRdWVzdGlvblR5cGUsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAndHlwZW9ybS1mYWN0b3J5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJNb2RlbClcbiAgLmF0dHIoJ2VtYWlsJywgYHVzZXJAbmV1LmVkdWApXG4gIC5hdHRyKCduYW1lJywgYFVzZXJgKVxuICAuYXR0cignZmlyc3ROYW1lJywgJ1VzZXInKTtcblxuZXhwb3J0IGNvbnN0IFN0dWRlbnRDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuU1RVREVOVCxcbik7XG5cbmV4cG9ydCBjb25zdCBUQUNvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5UQSxcbik7XG5cbmV4cG9ydCBjb25zdCBTZW1lc3RlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShTZW1lc3Rlck1vZGVsKVxuICAuYXR0cignc2Vhc29uJywgJ0ZhbGwnKVxuICAuYXR0cigneWVhcicsIDIwMjApO1xuXG5leHBvcnQgY29uc3QgQ2xvc2VkT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNDowMDowMC4wMDBaJykpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTU6MzA6MDAuMDAwWicpKTtcblxuZXhwb3J0IGNvbnN0IE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgLSAzNjAwMDAwKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDM2MDAwMDApKTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShDb3Vyc2VNb2RlbClcbiAgLmF0dHIoJ25hbWUnLCAnQ1MgMjUwMCcpXG4gIC5hdHRyKCdpY2FsVVJMJywgJ2h0dHA6Ly9oaS5jb20nKVxuICAuYXR0cignZW5hYmxlZCcsIHRydWUpXG4gIC5hc3NvY09uZSgnc2VtZXN0ZXInLCBTZW1lc3RlckZhY3RvcnkpXG4gIC5hc3NvY01hbnkoJ29mZmljZUhvdXJzJywgT2ZmaWNlSG91ckZhY3RvcnksIDApO1xuXG5leHBvcnQgY29uc3QgQ291cnNlU2VjdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsKVxuICAuYXR0cignZ2VuZXJpY0NvdXJzZU5hbWUnLCAnQ1MgMjUwMCcpXG4gIC5zZXF1ZW5jZSgnc2VjdGlvbicsIChpKSA9PiBpKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpO1xuXG5leHBvcnQgY29uc3QgVXNlckNvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpXG4gIC5hc3NvY09uZSgndXNlcicsIFVzZXJGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdyb2xlJywgUm9sZS5TVFVERU5UKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXVlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXVlTW9kZWwpXG4gIC5hdHRyKCdyb29tJywgJ09ubGluZScpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ2FsbG93UXVlc3Rpb25zJywgZmFsc2UpXG4gIC5hc3NvY01hbnkoJ29mZmljZUhvdXJzJywgT2ZmaWNlSG91ckZhY3RvcnkpXG4gIC5hc3NvY01hbnkoJ3N0YWZmTGlzdCcsIFVzZXJGYWN0b3J5LCAwKTtcblxuLy8gV0FSTklORzogRE8gTk9UIFVTRSBDUkVBVE9SSUQuIEFTIFlPVSBTRUUgSEVSRSwgV0UgT05MWSBBQ0NFUFQgQ1JFQVRPUlxuLy9UT0RPOiBtYWtlIGl0IGFjY2VwdCBjcmVhdG9ySWQgYXMgd2VsbFxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXN0aW9uTW9kZWwpXG4gIC5zZXF1ZW5jZSgndGV4dCcsIChpKSA9PiBgcXVlc3Rpb24gJHtpfWApXG4gIC5hdHRyKCdzdGF0dXMnLCAnUXVldWVkJylcbiAgLmF0dHIoJ3F1ZXN0aW9uVHlwZScsIFF1ZXN0aW9uVHlwZS5PdGhlcilcbiAgLmF0dHIoJ2NyZWF0ZWRBdCcsIG5ldyBEYXRlKCkpXG4gIC5hc3NvY09uZSgncXVldWUnLCBRdWV1ZUZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY3JlYXRvcicsIFVzZXJGYWN0b3J5KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm0tZmFjdG9yeVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VlZFNlcnZpY2Uge1xuICBhc3luYyBkZWxldGVBbGwobW9kZWw6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGdldENvbm5lY3Rpb24oKS5jcmVhdGVRdWVyeUJ1aWxkZXIoKS5kZWxldGUoKS5mcm9tKG1vZGVsKS5leGVjdXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEFkbWluQ29yZU1vZHVsZUZhY3RvcnksXG4gIEFkbWluQXV0aE1vZHVsZUZhY3RvcnksXG4gIERlZmF1bHRBZG1pblNpdGUsXG59IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgfSBmcm9tICcuL2NyZWRlbnRpYWxWYWxpZGF0b3InO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ291cnNlQWRtaW4sXG4gIFF1ZXVlQWRtaW4sXG4gIFVzZXJBZG1pbixcbiAgVXNlckNvdXJzZUFkbWluLFxuICBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluLFxufSBmcm9tICcuL2FkbWluLWVudGl0aWVzJztcbmltcG9ydCB7IEFkbWluQ29tbWFuZCB9IGZyb20gJy4vYWRtaW4uY29tbWFuZCc7XG5cbmNvbnN0IENvcmVNb2R1bGUgPSBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQ29yZU1vZHVsZSh7fSk7XG5jb25zdCBBdXRoTW9kdWxlID0gQWRtaW5BdXRoTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkF1dGhNb2R1bGUoe1xuICBhZG1pbkNvcmVNb2R1bGU6IENvcmVNb2R1bGUsXG4gIGNyZWRlbnRpYWxWYWxpZGF0b3I6IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciwgLy8gaG93IGRvIHlvdSB2YWxpZGF0ZSBjcmVkZW50aWFsc1xuICBpbXBvcnRzOiBbVHlwZU9ybU1vZHVsZS5mb3JGZWF0dXJlKFtBZG1pblVzZXJNb2RlbF0pXSwgLy8gd2hhdCBtb2R1bGVzIGV4cG9ydCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZSBjcmVkZW50aWFsVmFsaWRhdG9yIGF2YWlsYWJsZVxuICBwcm92aWRlcnM6IFtdLFxufSk7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQWRtaW5Db21tYW5kXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFkbWluU2l0ZTogRGVmYXVsdEFkbWluU2l0ZSkge1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlJywgQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlcicsIFVzZXJBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyQ291cnNlJywgVXNlckNvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1F1ZXVlJywgUXVldWVBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2VTZWN0aW9uTWFwcGluZycsIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtYWRtaW5cIik7IiwiaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICdiY3J5cHQnO1xuXG5leHBvcnQgY29uc3QgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yID0ge1xuICBpbmplY3Q6IFtdLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ3JlZGVudGlhbHMoXG4gICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPEFkbWluVXNlck1vZGVsPiB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgaWYgKGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKSkge1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9LFxufTtcbiIsImltcG9ydCB7IEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiwgQmFzZUVudGl0eSwgQ29sdW1uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdCc7XG5cbi8qKlxuICogQWRtaW4gdXNlcnMgYXJlIHRvdGFsbHkgc2VwYXJhdGUgZnJvbSByZWd1bGFyIHVzZXJzIGFuZCBjYW4gb25seSBiZSBjcmVhdGVkIGZyb20gY29tbWFuZCBsaW5lLlxuICogYHlhcm4gY2xpIGFkbWluOmNyZWF0ZWBcbiAqL1xuQEVudGl0eSgnYWRtaW5fdXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQWRtaW5Vc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIHNldFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBhc3N3b3JkSGFzaCA9IGhhc2hTeW5jKHBhc3N3b3JkLCA1KTtcbiAgfVxuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgdW5pcXVlOiB0cnVlLCBudWxsYWJsZTogZmFsc2UgfSlcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIG51bGxhYmxlOiBmYWxzZSB9KVxuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJpbXBvcnQgeyBBZG1pbkVudGl0eSB9IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnbmFtZSddO1xufVxuXG5leHBvcnQgY2xhc3MgUXVldWVBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gUXVldWVNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3Jvb20nLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlck1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZW1haWwnLCAnbmFtZSddO1xuICBzZWFyY2hGaWVsZHMgPSBbJ2VtYWlsJywgJ25hbWUnXTtcbiAgZmllbGRzID0gW1xuICAgICdpZCcsXG4gICAgJ2VtYWlsJyxcbiAgICAnbmFtZScsXG4gICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICAncXVldWVzJyxcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlckNvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAndXNlcklkJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZ2VuZXJpY0NvdXJzZU5hbWUnLCAnc2VjdGlvbicsICdjb3Vyc2VJZCddO1xufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCwgUG9zaXRpb25hbCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcXVlc3Rpb24sIGtleUluWU4gfSBmcm9tICdyZWFkbGluZS1zeW5jJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkbWluQ29tbWFuZCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnY3JlYXRlOmFkbWluIDx1c2VybmFtZT4nLFxuICAgIGRlc2NyaWJlOiAnY3JlYXRlIGFuIGFkbWluIHVzZXInLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoXG4gICAgQFBvc2l0aW9uYWwoe1xuICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcbiAgICAgIGRlc2NyaWJlOiAndGhlIGFkbWluIHVzZXJuYW1lJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0pXG4gICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IGNoYW5nZVBhc3N3b3JkID0ga2V5SW5ZTihcbiAgICAgICAgYFVzZXIgJHt1c2VybmFtZX0gYWxyZWFkeSBleGlzdHMuIERvIHlvdSB3YW50IHRvIGNoYW5nZSB0aGVpciBwYXNzd29yZD9gLFxuICAgICAgKTtcbiAgICAgIGlmICghY2hhbmdlUGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyID0gQWRtaW5Vc2VyTW9kZWwuY3JlYXRlKHsgdXNlcm5hbWUgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBhc3N3b3JkOiBzdHJpbmcgPSBxdWVzdGlvbignUGFzc3dvcmQ6ICcsIHtcbiAgICAgIGhpZGVFY2hvQmFjazogdHJ1ZSxcbiAgICB9KTtcbiAgICB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgQ3JlYXRlZCB1c2VyOiAke3VzZXIudXNlcm5hbWV9YCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWRsaW5lLXN5bmNcIik7IiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICAgIEV2ZW50TW9kZWwsXG4gIF0sXG4gIGtlZXBDb25uZWN0aW9uQWxpdmU6IHRydWUsXG4gIGxvZ2dpbmc6ICEhcHJvY2Vzcy5lbnYuVFlQRU9STV9MT0dHSU5HLFxuICAuLi4oISFwcm9jZXNzLmVudi5UWVBFT1JNX0NMSSA/IGluQ0xJIDoge30pLFxufTtcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9ybTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCYWNrZmlsbFBob25lTm90aWZzIH0gZnJvbSAnLi9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbE1ha2VFbXB0eVBob3RvVVJMTnVsbCB9IGZyb20gJy4vbWFrZS1lbXB0eS1waG90b3VybC1udWxsLmNvbW1hbmQnO1xuaW1wb3J0IHsgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQgfSBmcm9tICcuL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kJztcbmltcG9ydCB7IEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB9IGZyb20gJy4vc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBCYWNrZmlsbFBob25lTm90aWZzLFxuICAgIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0LFxuICAgIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyxcbiAgICBCYWNrZmlsbE1ha2VFbXB0eVBob3RvVVJMTnVsbCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKChkKSA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKChkKSA9PiBkLmlkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnNUb0Rpc2FibGUgPSAoXG4gICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZCh7XG4gICAgICAgIHdoZXJlOiB7IHBob25lTm90aWZzRW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICByZWxhdGlvbnM6IFsncGhvbmVOb3RpZiddLFxuICAgICAgfSlcbiAgICApLmZpbHRlcigodSkgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCgodSkgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNYWtlRW1wdHlQaG90b1VSTE51bGwge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOm1ha2UtZW1wdHktcGhvdG9VUkwtbnVsbCcsXG4gICAgZGVzY3JpYmU6ICdjaGFuZ2VzIGVtcHR5IHN0cmluZyBwaG90b1VSTHMgdG8gbnVsbCcsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgY291bnRPZkNoYW5nZWQgPSAwO1xuXG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZCgpO1xuICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyLnBob3RvVVJMID09PSAnJykge1xuICAgICAgICB1c2VyLnBob3RvVVJMID0gbnVsbDtcbiAgICAgICAgY291bnRPZkNoYW5nZWQgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzKTtcblxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGVkIG5hbWVzIGZvciAke2NvdW50T2ZDaGFuZ2VkfSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0JyxcbiAgICBkZXNjcmliZTogJ2NvcHkgYWxsIGV4aXN0aW5nIGhlbHBlZEF0IHRvIGZpcnN0SGVscGVkQXQnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjb3B5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgIC51cGRhdGUoKVxuICAgICAgLnNldCh7IGZpcnN0SGVscGVkQXQ6ICgpID0+ICdcImhlbHBlZEF0XCInIH0pXG4gICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgLmNhbGxMaXN0ZW5lcnMoZmFsc2UpXG4gICAgICAuZXhlY3V0ZSgpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFVwZGF0ZWQgJHthd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgICAuZ2V0Q291bnQoKX0gcmVjb3Jkc2AsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6Zmlyc3QtbGFzdC1uYW1lcycsXG4gICAgZGVzY3JpYmU6ICdjaGFuZ2UgYWxsIG5hbWVzIHRvIGZpcnN0IGFuZCBsYXN0IG5hbWVzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlck1vZGVsLmZpbmQoKTtcbiAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZS5zcGxpdCgnICcpWzBdO1xuICAgICAgICB1c2VyLmxhc3ROYW1lID0gdXNlci5uYW1lLnNwbGl0KCcgJykuc2xpY2UoMSkuam9pbignICcpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nIG5hbWUgZmFpbGVkIGZvciAke3VzZXIubmFtZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzKTtcbiAgICBjb25zdCBjb3VudCA9IFVzZXJNb2RlbC5jb3VudCgpO1xuXG4gICAgY29uc29sZS5sb2coYFVwZGF0ZWQgbmFtZXMgZm9yICR7Y291bnR9IHVzZXJzYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgSHR0cE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIgfSBmcm9tICcuL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1JlbGVhc2VOb3Rlc0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+ICh7XG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIG1heFJlZGlyZWN0czogNSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNNb2R1bGUge31cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTLCBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgSHR0cFNlcnZpY2UsXG4gIEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5AQ29udHJvbGxlcigncmVsZWFzZV9ub3RlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGdldFJlbGVhc2VOb3RlcygpOiBQcm9taXNlPEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlID0ge1xuICAgICAgbGFzdFVwZGF0ZWRVbml4VGltZTogbnVsbCxcbiAgICAgIHJlbGVhc2VOb3RlczogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCB0aGlzLmh0dHBTZXJ2aWNlXG4gICAgICAuZ2V0KFxuICAgICAgICAnaHR0cHM6Ly9ub3Rpb24tYXBpLnNwbGl0YmVlLmlvL3YxL3BhZ2UvYWJiYTI0NmJmYTA4NDdiYWEyNzA2YWIzMGQwYzZjN2QnLFxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICAgIGNvbnN0IGRhdGEgPSByZXF1ZXN0LmRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRpbWVUZXh0ID1cbiAgICAgICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10/LnZhbHVlPy5wcm9wZXJ0aWVzXG4gICAgICAgICAgPy50aXRsZVswXVswXTtcbiAgICAgIHJlc3BvbnNlLmxhc3RVcGRhdGVkVW5peFRpbWUgPSB0aW1lVGV4dC5zcGxpdCgnVW5peCAnKVsxXSAqIDEwMDA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIucmVsZWFzZU5vdGVzVGltZShlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgdGltZSBibG9jayBhbmQgcGFnZSBsaW5rIGJsb2NrIGZyb20gcGFnZVxuICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICBkYXRhWyc0ZDI1ZjM5My1lNTcwLTRjZDUtYWQ2Ni1iMjc4YTA5MjQyMjUnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgcmVzcG9uc2UucmVsZWFzZU5vdGVzID0gZGF0YTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEhlYWx0aGNoZWNrQ29udHJvbGxlciB9IGZyb20gJy4vaGVhbHRoY2hlY2suY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW0hlYWx0aGNoZWNrQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIEhlYWx0aGNoZWNrTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgR2V0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24vZGVjb3JhdG9ycyc7XG5cbkBDb250cm9sbGVyKCdoZWFsdGhjaGVjaycpXG5leHBvcnQgY2xhc3MgSGVhbHRoY2hlY2tDb250cm9sbGVyIHtcbiAgQEdldCgnLycpXG4gIGhlYWx0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnaGVhbHRoeSc7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uL2RlY29yYXRvcnNcIik7IiwiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgQXJndW1lbnRNZXRhZGF0YSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuLyoqXG4gKiBTdHJpcCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIGJvZHkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHJpcFVuZGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIG1ldGFkYXRhOiBBcmd1bWVudE1ldGFkYXRhKTogYW55IHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ2JvZHknKSB7XG4gICAgICB0aGlzLmRyb3BVbmRlZmluZWQodmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmRlZmluZWQob2JqOiB1bmtub3duKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOZXN0SW50ZXJjZXB0b3IsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIENhbGxIYW5kbGVyLFxuICBIdHRwRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICBuZXh0OiBDYWxsSGFuZGxlcixcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXhjZXB0aW9uKSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=