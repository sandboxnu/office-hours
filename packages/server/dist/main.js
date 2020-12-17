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
const stripUndefined_pipe_1 = __webpack_require__(102);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(103);
async function bootstrap(hot) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
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
const notification_module_1 = __webpack_require__(58);
const login_module_1 = __webpack_require__(65);
const profile_module_1 = __webpack_require__(75);
const question_module_1 = __webpack_require__(77);
const queue_module_1 = __webpack_require__(46);
const seed_module_1 = __webpack_require__(81);
const admin_module_1 = __webpack_require__(86);
const nestjs_command_1 = __webpack_require__(41);
const sse_module_1 = __webpack_require__(50);
const typeormConfig = __webpack_require__(94);
const backfill_module_1 = __webpack_require__(96);
const release_notes_module_1 = __webpack_require__(100);
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
const queue_module_1 = __webpack_require__(46);
const ical_command_1 = __webpack_require__(52);
const ical_service_1 = __webpack_require__(53);
const heatmap_service_1 = __webpack_require__(39);
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
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
const async_1 = __webpack_require__(18);
const typeorm_1 = __webpack_require__(19);
const event_model_entity_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(31);
const roles_decorator_1 = __webpack_require__(33);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
const queue_clean_service_1 = __webpack_require__(35);
const queue_entity_1 = __webpack_require__(26);
const course_roles_guard_1 = __webpack_require__(37);
const course_entity_1 = __webpack_require__(21);
const heatmap_service_1 = __webpack_require__(39);
const office_hour_entity_1 = __webpack_require__(27);
const queue_sse_service_1 = __webpack_require__(42);
const moment = __webpack_require__(36);
let CourseController = class CourseController {
    constructor(connection, queueCleanService, queueSSEService, heatmapService) {
        this.connection = connection;
        this.queueCleanService = queueCleanService;
        this.queueSSEService = queueSSEService;
        this.heatmapService = heatmapService;
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
};
__decorate([
    common_1.Get(':id'),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR, common_2.Role.STUDENT, common_2.Role.TA),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "get", null);
__decorate([
    common_1.Post(':id/ta_location/:room'),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR, common_2.Role.TA),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('room')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkIn", null);
__decorate([
    common_1.Delete(':id/ta_location/:room'),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR, common_2.Role.TA),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('room')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkOut", null);
CourseController = __decorate([
    common_1.Controller('courses'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        queue_clean_service_1.QueueCleanService,
        queue_sse_service_1.QueueSSEService,
        heatmap_service_1.HeatmapService])
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
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 20 */
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
const event_model_entity_1 = __webpack_require__(20);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const queue_entity_1 = __webpack_require__(26);
const event_model_entity_1 = __webpack_require__(20);
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
    typeorm_1.Column('text'),
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
const typeorm_1 = __webpack_require__(19);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const role_guard_1 = __webpack_require__(38);
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
/* 38 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const lodash_1 = __webpack_require__(40);
const moment = __webpack_require__(36);
const nestjs_command_1 = __webpack_require__(41);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(19);
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
/* 40 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

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
exports.QueueSSEService = void 0;
const common_1 = __webpack_require__(5);
const lodash_1 = __webpack_require__(40);
const sse_service_1 = __webpack_require__(43);
const queue_service_1 = __webpack_require__(45);
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
        this.sseService.subscribeClient(idToRoom(queueId), { res, metadata });
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
exports.SSEService = void 0;
const common_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(15);
const apm = __webpack_require__(44);
let SSEService = class SSEService {
    constructor() {
        this.clients = {};
    }
    subscribeClient(room, client) {
        if (!(room in this.clients)) {
            this.clients[room] = [];
        }
        const roomref = this.clients[room];
        roomref.push(client);
        client.res.socket.on('end', () => {
            roomref.splice(roomref.indexOf(client), 1);
        });
    }
    async sendEvent(room, payload) {
        if (room in this.clients) {
            console.log(`sending sse to ${this.clients[room].length} clients in ${room}`);
            console.time(`sending sse time: `);
            apm.startTransaction('sse');
            for (const { res, metadata } of this.clients[room]) {
                const toSend = `data: ${class_transformer_1.serialize(await payload(metadata))}\n\n`;
                res.write(toSend);
            }
            apm.endTransaction();
            console.timeEnd(`sending sse time: `);
        }
    }
};
SSEService = __decorate([
    common_1.Injectable()
], SSEService);
exports.SSEService = SSEService;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(15);
const lodash_1 = __webpack_require__(40);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(19);
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
/* 46 */
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
const queue_controller_1 = __webpack_require__(47);
const queue_clean_service_1 = __webpack_require__(35);
const sse_module_1 = __webpack_require__(50);
const queue_service_1 = __webpack_require__(45);
const queue_sse_service_1 = __webpack_require__(42);
const queue_subscriber_1 = __webpack_require__(51);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_decorator_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(31);
const roles_decorator_1 = __webpack_require__(33);
const queue_role_decorator_1 = __webpack_require__(48);
const queue_role_guard_1 = __webpack_require__(49);
const queue_sse_service_1 = __webpack_require__(42);
const queue_service_1 = __webpack_require__(45);
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
/* 48 */
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
/* 49 */
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
const role_guard_1 = __webpack_require__(38);
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
/* 50 */
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
const sse_service_1 = __webpack_require__(43);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


/***/ }),
/* 51 */
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
const queue_sse_service_1 = __webpack_require__(42);
const typeorm_1 = __webpack_require__(19);
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
/* 52 */
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
const nestjs_command_1 = __webpack_require__(41);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(53);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(54);
const typeorm_1 = __webpack_require__(19);
const office_hour_entity_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const dist_1 = __webpack_require__(55);
__webpack_require__(56);
const moment = __webpack_require__(36);
const rrule_1 = __webpack_require__(57);
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
/* 54 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("rrule");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(5);
const desktop_notif_subscriber_1 = __webpack_require__(59);
const notification_controller_1 = __webpack_require__(64);
const notification_service_1 = __webpack_require__(60);
const twilio_service_1 = __webpack_require__(62);
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
/* 59 */
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
const typeorm_1 = __webpack_require__(19);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(60);
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
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const apm = __webpack_require__(44);
const webPush = __webpack_require__(61);
const user_entity_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(62);
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
/* 61 */
/***/ (function(module, exports) {

module.exports = require("web-push");

/***/ }),
/* 62 */
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
const twilio = __webpack_require__(63);
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
/* 63 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ }),
/* 64 */
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
const twilio = __webpack_require__(63);
const jwt_auth_guard_1 = __webpack_require__(31);
const user_decorator_1 = __webpack_require__(34);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(60);
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
/* 65 */
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
const login_controller_1 = __webpack_require__(66);
const jwt_strategy_1 = __webpack_require__(73);
const jwt_1 = __webpack_require__(68);
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
/* 66 */
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
const common_2 = __webpack_require__(5);
const apm_rum_1 = __webpack_require__(67);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(68);
const httpSignature = __webpack_require__(69);
const typeorm_1 = __webpack_require__(19);
const non_production_guard_1 = __webpack_require__(70);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(71);
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
        let user;
        user = await user_entity_1.UserModel.findOne({
            where: { email: body.email },
            relations: ['courses'],
        });
        if (!user) {
            user = await user_entity_1.UserModel.create({ courses: [] });
        }
        user = Object.assign(user, {
            email: body.email,
            firstName: body.first_name,
            lastName: body.last_name,
            name: body.first_name + ' ' + body.last_name,
            photoURL: '',
        });
        await user.save();
        const userCourses = [];
        await Promise.all(body.courses.map(async (c) => {
            const course = await this.loginCourseService.courseSectionToCourse(c.course, c.section);
            if (course) {
                const userCourse = await this.loginCourseService.courseToUserCourse(user.id, course.id, common_1.Role.STUDENT);
                userCourses.push(userCourse);
            }
        }));
        await Promise.all(body.ta_courses.map(async (c) => {
            const courseMappings = await course_section_mapping_entity_1.CourseSectionMappingModel.find({
                where: { genericCourseName: c.course },
            });
            for (const courseMapping of courseMappings) {
                const taCourse = await this.loginCourseService.courseToUserCourse(user.id, courseMapping.courseId, common_1.Role.TA);
                userCourses.push(taCourse);
            }
        }));
        user.courses = userCourses;
        await user.save();
        const token = await this.jwtService.signAsync({ userId: user.id }, { expiresIn: 5 * 60 });
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
        const authToken = await this.jwtService.signAsync({ userId });
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
/* 67 */
/***/ (function(module, exports) {

module.exports = require("@elastic/apm-rum");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

/***/ }),
/* 70 */
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
/* 71 */
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
const typeorm_1 = __webpack_require__(19);
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
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
const course_section_mapping_entity_1 = __webpack_require__(71);
let LoginCourseService = class LoginCourseService {
    constructor(connection) {
        this.connection = connection;
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
    common_1.Injectable(),
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
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(74);
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
/* 74 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 75 */
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
const profile_controller_1 = __webpack_require__(76);
const notification_module_1 = __webpack_require__(58);
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
/* 76 */
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
const lodash_1 = __webpack_require__(40);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(31);
const notification_service_1 = __webpack_require__(60);
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
ProfileController = __decorate([
    common_2.Controller('profile'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        notification_service_1.NotificationService])
], ProfileController);
exports.ProfileController = ProfileController;


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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(58);
const question_controller_1 = __webpack_require__(78);
const question_subscriber_1 = __webpack_require__(80);
const queue_module_1 = __webpack_require__(46);
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
/* 78 */
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
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(31);
const notification_service_1 = __webpack_require__(60);
const roles_decorator_1 = __webpack_require__(33);
const user_course_entity_1 = __webpack_require__(22);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
const question_role_guard_1 = __webpack_require__(79);
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
/* 79 */
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
const role_guard_1 = __webpack_require__(38);
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
/* 80 */
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
const queue_sse_service_1 = __webpack_require__(42);
const queue_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(19);
const notification_service_1 = __webpack_require__(60);
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
/* 81 */
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
const seed_controller_1 = __webpack_require__(82);
const seed_service_1 = __webpack_require__(85);
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
/* 82 */
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
const typeorm_1 = __webpack_require__(19);
const factories_1 = __webpack_require__(83);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const non_production_guard_1 = __webpack_require__(70);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const seed_service_1 = __webpack_require__(85);
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(84);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(71);
const user_course_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
exports.UserFactory = new typeorm_factory_1.Factory(user_entity_1.UserModel)
    .attr('email', `user@neu.edu`)
    .attr('name', `User`)
    .attr('firstName', 'User')
    .attr('photoURL', `https://pics/user`);
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
/* 84 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
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
/* 86 */
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
const nestjs_admin_1 = __webpack_require__(87);
const credentialValidator_1 = __webpack_require__(88);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(89);
const admin_entities_1 = __webpack_require__(91);
const admin_command_1 = __webpack_require__(92);
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
/* 87 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(89);
const bcrypt_1 = __webpack_require__(90);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(19);
const bcrypt_1 = __webpack_require__(90);
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
/* 90 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(87);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(71);
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
/* 92 */
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
const nestjs_command_1 = __webpack_require__(41);
const common_1 = __webpack_require__(5);
const admin_user_entity_1 = __webpack_require__(89);
const readline_sync_1 = __webpack_require__(93);
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
/* 93 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(95);
const admin_user_entity_1 = __webpack_require__(89);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(71);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const event_model_entity_1 = __webpack_require__(20);
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
/* 95 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(58);
const backfill_phone_notifs_command_1 = __webpack_require__(97);
const question_first_helped_at_command_1 = __webpack_require__(98);
const separate_first_last_names_command_1 = __webpack_require__(99);
let BackfillModule = class BackfillModule {
};
BackfillModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        providers: [
            backfill_phone_notifs_command_1.BackfillPhoneNotifs,
            question_first_helped_at_command_1.BackfillQuestionFirstHelpedAt,
            separate_first_last_names_command_1.BackfillSeparateFirstLastNames,
        ],
    })
], BackfillModule);
exports.BackfillModule = BackfillModule;


/***/ }),
/* 97 */
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
const nestjs_command_1 = __webpack_require__(41);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(62);
const user_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(19);
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
/* 98 */
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
const nestjs_command_1 = __webpack_require__(41);
const common_1 = __webpack_require__(5);
const question_entity_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(19);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillSeparateFirstLastNames = void 0;
const common_1 = __webpack_require__(5);
const nestjs_command_1 = __webpack_require__(41);
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
/* 100 */
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
const release_notes_controller_1 = __webpack_require__(101);
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
/* 101 */
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
const typeorm_1 = __webpack_require__(19);
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
/* 102 */
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(104);
const apm = __webpack_require__(44);
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
/* 104 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaGVhdG1hcC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1jb21tYW5kXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGVsYXN0aWMvYXBtLXJ1bVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvand0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cC1zaWduYXR1cmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi1jb3Vyc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vand0LnN0cmF0ZWd5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWp3dFwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L3V0aWwvZmFjdG9yaWVzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR5cGVvcm0tZmFjdG9yeVwiIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4ubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1hZG1pblwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jcmVkZW50aWFsVmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tZW50aXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhZGxpbmUtc3luY1wiIiwid2VicGFjazovLy8uL29ybWNvbmZpZy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvcXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0LmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL3NlcGFyYXRlLWZpcnN0LWxhc3QtbmFtZXMuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cmlwVW5kZWZpbmVkLnBpcGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwbS5pbnRlcmNlcHRvci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL29wZXJhdG9yc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7O0FDbEZBLHVCQUFnQztBQUNoQywyQ0FBd0M7QUFJeEMscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O0FDTHRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JCQSxtRDs7Ozs7Ozs7OztBQ0FBLHNDQUEyQztB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QU13QjtBQUV4Qiw2Q0FBNEM7QUFDNUMsb0NBQXdDO0FBR3hDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDdkIsc0JBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLElBQUksS0FBSyxZQUFZLHNCQUFhLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7WUFDRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoQlksY0FBYztJQUQxQixtQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWM7Ozs7Ozs7QUNaM0IsMkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAnZWxhc3RpYy1hcG0tbm9kZS9zdGFydCc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2Jvb3RzdHJhcCc7XG5cbmRlY2xhcmUgY29uc3QgbW9kdWxlOiBhbnk7XG5cbmJvb3RzdHJhcChtb2R1bGUuaG90KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGUvc3RhcnRcIik7IiwiaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUsIElOZXN0QXBwbGljYXRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwLm1vZHVsZSc7XG5pbXBvcnQgeyBTdHJpcFVuZGVmaW5lZFBpcGUgfSBmcm9tICcuL3N0cmlwVW5kZWZpbmVkLnBpcGUnO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQXBtSW50ZXJjZXB0b3IgfSBmcm9tICcuL2FwbS5pbnRlcmNlcHRvcic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKGhvdDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShBcHBNb2R1bGUsIHtcbiAgICBsb2dnZXI6IFsnZXJyb3InLCAnd2FybicsICdsb2cnLCAnZGVidWcnLCAndmVyYm9zZSddLFxuICB9KTtcbiAgYWRkR2xvYmFsc1RvQXBwKGFwcCk7XG4gIGFwcC5zZXRHbG9iYWxQcmVmaXgoJ2FwaS92MScpO1xuICBhcHAudXNlR2xvYmFsSW50ZXJjZXB0b3JzKG5ldyBBcG1JbnRlcmNlcHRvcigpKTtcblxuICBpZiAoaXNQcm9kKCkpIHtcbiAgICBjb25zb2xlLmxvZyhgUnVubmluZyBwcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS5gKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBSdW5uaW5nIG5vbi1wcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS4gVEhJUyBNU0cgU0hPVUxEIE5PVCBBUFBFQVIgT04gUFJPRCBWTWAsXG4gICAgKTtcbiAgfVxuICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICBhd2FpdCBhcHAubGlzdGVuKDMwMDIpO1xuXG4gIGlmIChob3QpIHtcbiAgICBob3QuYWNjZXB0KCk7XG4gICAgaG90LmRpc3Bvc2UoKCkgPT4gYXBwLmNsb3NlKCkpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSB0cnVlIGluIHByb2QgYW5kIGluIGludGVncmF0aW9uIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24gYWRkR2xvYmFsc1RvQXBwKGFwcDogSU5lc3RBcHBsaWNhdGlvbik6IHZvaWQge1xuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIHdoaXRlbGlzdDogdHJ1ZSxcbiAgICAgIGZvcmJpZE5vbldoaXRlbGlzdGVkOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgIH0pLFxuICApO1xuICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFN0cmlwVW5kZWZpbmVkUGlwZSgpKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBTY2hlZHVsZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgQ291cnNlTW9kdWxlIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZU1vZHVsZSB9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZHVsZSB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgU2VlZE1vZHVsZSB9IGZyb20gJy4vc2VlZC9zZWVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBZG1pbk1vZHVsZSB9IGZyb20gJy4vYWRtaW4vYWRtaW4ubW9kdWxlJztcbmltcG9ydCB7IENvbW1hbmRNb2R1bGUgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICcuL3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCAqIGFzIHR5cGVvcm1Db25maWcgZnJvbSAnLi4vb3JtY29uZmlnJztcbmltcG9ydCB7IEJhY2tmaWxsTW9kdWxlIH0gZnJvbSAnYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc01vZHVsZSB9IGZyb20gJ3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdCh0eXBlb3JtQ29uZmlnKSxcbiAgICBTY2hlZHVsZU1vZHVsZS5mb3JSb290KCksXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgUHJvZmlsZU1vZHVsZSxcbiAgICBDb3Vyc2VNb2R1bGUsXG4gICAgUXVldWVNb2R1bGUsXG4gICAgTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIFF1ZXN0aW9uTW9kdWxlLFxuICAgIFNlZWRNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZW52RmlsZVBhdGg6IFtcbiAgICAgICAgJy5lbnYnLFxuICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IFsnLmVudi5kZXZlbG9wbWVudCddIDogW10pLFxuICAgICAgXSxcbiAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIENvbW1hbmRNb2R1bGUsXG4gICAgU1NFTW9kdWxlLFxuICAgIEJhY2tmaWxsTW9kdWxlLFxuICAgIFJlbGVhc2VOb3Rlc01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3R5cGVvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9zY2hlZHVsZVwiKTsiLCJpbXBvcnQgeyBDYWNoZU1vZHVsZSwgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlQ29udHJvbGxlciB9IGZyb20gJy4vY291cnNlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgSUNhbENvbW1hbmQgfSBmcm9tICcuL2ljYWwuY29tbWFuZCc7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYXRtYXBTZXJ2aWNlIH0gZnJvbSAnLi9oZWF0bWFwLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtDb3Vyc2VDb250cm9sbGVyXSxcbiAgaW1wb3J0czogW1F1ZXVlTW9kdWxlLCBDYWNoZU1vZHVsZS5yZWdpc3RlcigpXSxcbiAgcHJvdmlkZXJzOiBbSUNhbENvbW1hbmQsIEljYWxTZXJ2aWNlLCBIZWF0bWFwU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEdldENvdXJzZVJlc3BvbnNlLFxuICBRdWV1ZVBhcnRpYWwsXG4gIFJvbGUsXG4gIFRBQ2hlY2tvdXRSZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIGdldFJlcG9zaXRvcnksIE1vcmVUaGFuT3JFcXVhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCwgRXZlbnRUeXBlIH0gZnJvbSAncHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVJvbGVzR3VhcmQgfSBmcm9tICcuL2NvdXJzZS1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBIZWF0bWFwU2VydmljZSB9IGZyb20gJy4vaGVhdG1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxuQENvbnRyb2xsZXIoJ2NvdXJzZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIENvdXJzZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIGhlYXRtYXBTZXJ2aWNlOiBIZWF0bWFwU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5ULCBSb2xlLlRBKVxuICBhc3luYyBnZXQoQFBhcmFtKCdpZCcpIGlkOiBudW1iZXIpOiBQcm9taXNlPEdldENvdXJzZVJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogZm9yIGFsbCBjb3Vyc2UgZW5kcG9pbnQsIGNoZWNrIGlmIHRoZXkncmUgYSBzdHVkZW50IG9yIGEgVEFcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWVzJywgJ3F1ZXVlcy5zdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIC8vIFVzZSByYXcgcXVlcnkgZm9yIHBlcmZvcm1hbmNlIChhdm9pZCBlbnRpdHkgaW5zdGFudGlhdGlvbiBhbmQgc2VyaWFsaXphdGlvbilcbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ29oJylcbiAgICAgIC5zZWxlY3QoWydpZCcsICd0aXRsZScsIGBcInN0YXJ0VGltZVwiYCwgYFwiZW5kVGltZVwiYF0pXG4gICAgICAud2hlcmUoJ29oLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuICAgIGNvdXJzZS5oZWF0bWFwID0gYXdhaXQgdGhpcy5oZWF0bWFwU2VydmljZS5nZXRDYWNoZWRIZWF0bWFwRm9yKGlkKTtcblxuICAgIGNvdXJzZS5xdWV1ZXMgPSBhd2FpdCBhc3luYy5maWx0ZXIoXG4gICAgICBjb3Vyc2UucXVldWVzLFxuICAgICAgYXN5bmMgKHEpID0+IGF3YWl0IHEuY2hlY2tJc09wZW4oKSxcbiAgICApO1xuICAgIGF3YWl0IGFzeW5jLmVhY2goY291cnNlLnF1ZXVlcywgYXN5bmMgKHEpID0+IHtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVUaW1lcygpO1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVNpemUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3Vyc2U7XG4gIH1cblxuICBAUG9zdCgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja0luKFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxRdWV1ZVBhcnRpYWw+IHtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QucHVzaCh1c2VyKTtcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCBFdmVudE1vZGVsLmNyZWF0ZSh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgZXZlbnRUeXBlOiBFdmVudFR5cGUuVEFfQ0hFQ0tFRF9JTixcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQERlbGV0ZSgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja091dChcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8VEFDaGVja291dFJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcbiAgICBxdWV1ZS5zdGFmZkxpc3QgPSBxdWV1ZS5zdGFmZkxpc3QuZmlsdGVyKChlKSA9PiBlLmlkICE9PSB1c2VyLmlkKTtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfT1VULFxuICAgICAgdXNlcixcbiAgICAgIGNvdXJzZUlkLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIGNvbnN0IGNhbkNsZWFyUXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLnNob3VsZENsZWFuUXVldWUocXVldWUpO1xuICAgIGxldCBuZXh0T2ZmaWNlSG91clRpbWUgPSBudWxsO1xuXG4gICAgLy8gZmluZCBvdXQgaG93IGxvbmcgdW50aWwgbmV4dCBvZmZpY2UgaG91clxuICAgIGlmIChjYW5DbGVhclF1ZXVlKSB7XG4gICAgICBjb25zdCBzb29uID0gbW9tZW50KCkuYWRkKDE1LCAnbWludXRlcycpLnRvRGF0ZSgpO1xuICAgICAgY29uc3QgbmV4dE9mZmljZUhvdXIgPSBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKHNvb24pIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgc3RhcnRUaW1lOiAnQVNDJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV4dE9mZmljZUhvdXJUaW1lID0gbmV4dE9mZmljZUhvdXI/LnN0YXJ0VGltZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiB7IHF1ZXVlSWQ6IHF1ZXVlLmlkLCBjYW5DbGVhclF1ZXVlLCBuZXh0T2ZmaWNlSG91clRpbWUgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHtcbiAgSXNCb29sZWFuLFxuICBJc0RlZmluZWQsXG4gIElzRW51bSxcbiAgSXNJbnQsXG4gIElzTm90RW1wdHksXG4gIElzT3B0aW9uYWwsXG4gIElzU3RyaW5nLFxuICBWYWxpZGF0ZUlmLFxufSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5cbmV4cG9ydCBjb25zdCBQUk9EX1VSTCA9IFwiaHR0cHM6Ly9raG91cnlvZmZpY2Vob3Vycy5jb21cIjtcbmV4cG9ydCBjb25zdCBpc1Byb2QgPSAoKTogYm9vbGVhbiA9PlxuICBwcm9jZXNzLmVudi5ET01BSU4gPT09IFBST0RfVVJMIHx8XG4gICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdz8ubG9jYXRpb24/Lm9yaWdpbiA9PT0gUFJPRF9VUkwpO1xuXG4vLyBUT0RPOiBDbGVhbiB0aGlzIHVwLCBtb3ZlIGl0IHNvbXdoZXJlIGVsc2UsIHVzZSBtb21lbnQ/Pz9cbi8vIGEgLSBiLCBpbiBtaW51dGVzXG5leHBvcnQgZnVuY3Rpb24gdGltZURpZmZJbk1pbnMoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciB7XG4gIHJldHVybiAoYS5nZXRUaW1lKCkgLSBiLmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBJIEJhc2UgRGF0YSBUeXBlcyAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBOT1RFOiBUaGVzZSBhcmUgbm90IHRoZSBEQiBkYXRhIHR5cGVzLiBUaGV5IGFyZSBvbmx5IHVzZWQgZm9yIHRoZSBhcGlcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXNlci5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIGVtYWlsIHN0cmluZyBvZiB0aGUgdXNlciBpZiB0aGV5IHByb3ZpZGUgaXQgKG51bGxhYmxlKVxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICogQHBhcmFtIGNvdXJzZXMgLSBUaGUgbGlzdCBvZiBjb3Vyc2VzIHRoYXQgdGhlIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIChhcyBlaXRoZXIgYSAnc3R1ZGVudCcsICd0YScgb3IgJ3Byb2Zlc3NvcicpXG4gKiBAcGFyYW0gZGVza3RvcE5vdGlmcyAtIGxpc3Qgb2YgZW5kcG9pbnRzIHNvIHRoYXQgZnJvbnRlbmQgY2FuIGZpZ3VyZSBvdXQgaWYgZGV2aWNlIGlzIGVuYWJsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWwhOiBzdHJpbmc7XG4gIGZpcnN0TmFtZT86IHN0cmluZztcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XG4gIG5hbWUhOiBzdHJpbmc7XG4gIHBob3RvVVJMITogc3RyaW5nO1xuICBjb3Vyc2VzITogVXNlckNvdXJzZVtdO1xuICBkZXNrdG9wTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGVza3RvcE5vdGlmUGFydGlhbClcbiAgZGVza3RvcE5vdGlmcyE6IERlc2t0b3BOb3RpZlBhcnRpYWxbXTtcblxuICBwaG9uZU5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuICBwaG9uZU51bWJlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW5kcG9pbnQhOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIHBhcnRpYWwgdXNlciBpbmZvIG5lZWRlZCBieSB0aGUgZnJvbnRlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZVxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcGhvdG9VUkw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpYWwgY291cnNlIGRhdGEgbmVlZGVkIG9uIHRoZSBmcm9udCBlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqL1xuZXhwb3J0IHR5cGUgQ291cnNlUGFydGlhbCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIHRoYXQgYSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCBhbmQgdGhlaXIgcm9sZSBpbiB0aGF0IGNvdXJzZVxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhlIHVzZXIgYWNjb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHJvbGUgLSBUaGUgdXNlcidzIHJvbGUgaW4gdGhlIGNvdXJzZS5cbiAqL1xuZXhwb3J0IHR5cGUgVXNlckNvdXJzZSA9IHtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb2xlOiBSb2xlO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSB1c2VyIHJvbGVzIGluIGEgY291cnNlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgU1RVREVOVCA9IFwic3R1ZGVudFwiLFxuICBUQSA9IFwidGFcIixcbiAgUFJPRkVTU09SID0gXCJwcm9mZXNzb3JcIixcbn1cblxuY2xhc3MgT2ZmaWNlSG91clBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgdGl0bGUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lITogRGF0ZTtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHRoYXQgc3R1ZGVudHMgY2FuIGpvaW4gd2l0aCB0aGllciB0aWNrZXRzLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGF0IHRoaXMgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGZvci5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBxdWVzdGlvbnMgLSBUaGUgbGlzdCBvZiB0aGUgc3R1ZGVudHMgcXVlc3Rpb25zIGFzc29jYWl0ZWQgd2l0aCB0aGUgcXVldWUuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWUge1xuICBpZDogbnVtYmVyO1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvb206IHN0cmluZztcbiAgc3RhZmZMaXN0OiBVc2VyUGFydGlhbFtdO1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gIHN0YXJ0VGltZT86IERhdGU7XG4gIGVuZFRpbWU/OiBEYXRlO1xuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHBhcnRpYWwgdG8gYmUgc2hvd24gb24gdGhlIHRvZGF5IHBhZ2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICByb29tITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBzdGFmZkxpc3QhOiBVc2VyUGFydGlhbFtdO1xuXG4gIHF1ZXVlU2l6ZSE6IG51bWJlcjtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGlzT3BlbiE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lPzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lPzogRGF0ZTtcblxuICBhbGxvd1F1ZXN0aW9ucyE6IGJvb2xlYW47XG59XG5cbi8vIFJlcHJlc2VudHMgYSBsaXN0IG9mIG9mZmljZSBob3VycyB3YWl0IHRpbWVzIG9mIGVhY2ggaG91ciBvZiB0aGUgd2Vlay5cbi8vIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBhcnJheSBpcyB0aGUgd2FpdCB0aW1lIGZvciB0aGUgZmlyc3QgaG91ciBvZiBTdW5kYXksIFVUQy5cbi8vICAgVXNlcnMgb2YgdGhlIGhlYXRtYXAgc2hvdWxkIHJvdGF0ZSBpdCBhY2NvcmRpbmcgdG8gdGhlaXIgdGltZXpvbmUuXG4vLyBJTlZBUklBTlQ6IE11c3QgaGF2ZSAyNCo3IGVsZW1lbnRzXG4vL1xuLy8gV2FpdCB0aW1lID0gLTEgcmVwcmVzZW50cyBubyBvZmZpY2UgaG91cnMgZGF0YSBhdCB0aGF0IHRpbWUuXG5leHBvcnQgdHlwZSBIZWF0bWFwID0gQXJyYXk8bnVtYmVyPjtcblxuLyoqXG4gKiBBIFF1ZXN0aW9uIGlzIGNyZWF0ZWQgd2hlbiBhIHN0dWRlbnQgd2FudHMgaGVscCBmcm9tIGEgVEEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBzdHVkZW50IHF1ZXN0aW9uLlxuICogQHBhcmFtIGNyZWF0b3IgLSBUaGUgU3R1ZGVudCB0aGF0IGhhcyBjcmVhdGVkIHRoZSBxdWVzdGlvbi5cbiAqIEBwYXJhbSB0ZXh0IC0gVGhlIHRleHQgZGVzY3JpdGlwbiBvZiB3aGF0IGhlL3NoZSBuZWVkcyBoZWxwIHdpdGguXG4gKiBAcGFyYW0gY3JlYXRlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUaWNrZXQgd2FzIGNyZWF0ZWQuIEV4OiBcIjIwMjAtMDktMTJUMTI6MDA6MDAtMDQ6MDBcIlxuICogQHBhcmFtIGhlbHBlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBiZWdhbiBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIGNsb3NlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBmaW5pc2hlZCBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIHF1ZXN0aW9uVHlwZSAtIFRoZSBxdWVzdGlvbiB0eXBlIGhlbHBzIGRpc3Rpbmd1aXNoIHF1ZXN0aW9uIGZvciBUQSdzIGFuZCBkYXRhIGluc2lnaHRzLlxuICogQHBhcmFtIHN0YXR1cyAtIFRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhpcyBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcnRpY3VsYXIgc3R1ZGVudCwgdG8gaGVscCBUQSdzIGZpbmQgdGhlbVxuICogQHBhcmFtIGlzT25saW5lIC0gV2V0aGVyIG9yIG5vdCB0aGUgcXVlc3Rpb24gd2lsbCBoZWxwZWQgb25saW5lIG9yIGluLXBlcnNvblxuICovXG5leHBvcnQgY2xhc3MgUXVlc3Rpb24ge1xuICBpZCE6IG51bWJlcjtcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgY3JlYXRvciE6IFVzZXJQYXJ0aWFsO1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICB0YUhlbHBlZD86IFVzZXJQYXJ0aWFsO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgaGVscGVkQXQ/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNsb3NlZEF0PzogRGF0ZTtcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuICBzdGF0dXMhOiBRdWVzdGlvblN0YXR1cztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIGlzT25saW5lPzogYm9vbGVhbjtcbn1cblxuLy8gUXVlc3Rpb24gVHlwZXNcbmV4cG9ydCBlbnVtIFF1ZXN0aW9uVHlwZSB7XG4gIENvbmNlcHQgPSBcIkNvbmNlcHRcIixcbiAgQ2xhcmlmaWNhdGlvbiA9IFwiQ2xhcmlmaWNhdGlvblwiLFxuICBUZXN0aW5nID0gXCJUZXN0aW5nXCIsXG4gIEJ1ZyA9IFwiQnVnXCIsXG4gIFNldHVwID0gXCJTZXR1cFwiLFxuICBPdGhlciA9IFwiT3RoZXJcIixcbn1cblxuZXhwb3J0IGVudW0gT3BlblF1ZXN0aW9uU3RhdHVzIHtcbiAgRHJhZnRpbmcgPSBcIkRyYWZ0aW5nXCIsXG4gIFF1ZXVlZCA9IFwiUXVldWVkXCIsXG4gIEhlbHBpbmcgPSBcIkhlbHBpbmdcIixcbiAgUHJpb3JpdHlRdWV1ZWQgPSBcIlByaW9yaXR5UXVldWVkXCIsXG59XG5cbi8qKlxuICogTGltYm8gc3RhdHVzZXMgYXJlIGF3YWl0aW5nIHNvbWUgY29uZmlybWF0aW9uIGZyb20gdGhlIHN0dWRlbnRcbiAqL1xuZXhwb3J0IGVudW0gTGltYm9RdWVzdGlvblN0YXR1cyB7XG4gIENhbnRGaW5kID0gXCJDYW50RmluZFwiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBzdHVkZW50IGNhbid0IGJlIGZvdW5kIGJ5IGEgVEFcbiAgUmVRdWV1ZWluZyA9IFwiUmVRdWV1ZWluZ1wiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBUQSB3YW50cyB0byBnZXQgYmFjayB0byBhIHN0dWRlbnQgbGF0ZXIgYW5kIGdpdmUgdGhlbSB0aGUgb3B0aW9uIHRvIGJlIHB1dCBpbnRvIHRoZSBwcmlvcml0eSBxdWV1ZVxuICBUQURlbGV0ZWQgPSBcIlRBRGVsZXRlZFwiLCAvLyBXaGVuIGEgVEEgZGVsZXRlcyBhIHF1ZXN0aW9uIGZvciBhIG11bHRpdHVkZSBvZiByZWFzb25zXG59XG5cbmV4cG9ydCBlbnVtIENsb3NlZFF1ZXN0aW9uU3RhdHVzIHtcbiAgUmVzb2x2ZWQgPSBcIlJlc29sdmVkXCIsXG4gIERlbGV0ZWREcmFmdCA9IFwiRGVsZXRlZERyYWZ0XCIsXG4gIENvbmZpcm1lZERlbGV0ZWQgPSBcIkNvbmZpcm1lZERlbGV0ZWRcIixcbiAgU3RhbGUgPSBcIlN0YWxlXCIsXG59XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblF1ZXVlID0gW1xuICBPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG5dO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlID0gW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNTZW50VG9DcmVhdG9yID0gW1xuICAuLi5TdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIC4uLlN0YXR1c0luUXVldWUsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuXTtcblxuLy8gVGlja2V0IFN0YXR1cyAtIFJlcHJlc2VudHMgYSBnaXZlbiBzdGF0dXMgb2YgYXMgc3R1ZGVudCdzIHRpY2tldFxuZXhwb3J0IHR5cGUgUXVlc3Rpb25TdGF0dXMgPSBrZXlvZiB0eXBlb2YgUXVlc3Rpb25TdGF0dXNLZXlzO1xuLy8gYW4gRW51bS1saWtlIGNvbnN0YW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBzdGF0dXNlcyBmb3IgY29udmVuaWVuY2UuXG5leHBvcnQgY29uc3QgUXVlc3Rpb25TdGF0dXNLZXlzID0ge1xuICAuLi5PcGVuUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkNsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICAuLi5MaW1ib1F1ZXN0aW9uU3RhdHVzLFxufTtcblxuLyoqXG4gKiBBIFNlbWVzdGVyIG9iamVjdCwgcmVwcmVzZW50aW5nIGEgc2NoZWR1bGUgc2VtZXN0ZXIgdGVybSBmb3IgdGhlIHB1cnBvc2VzIG9mIGEgY291cnNlLlxuICogQHBhcmFtIHNlYXNvbiAtIFRoZSBzZWFzb24gb2YgdGhpcyBzZW1lc3Rlci5cbiAqIEBwYXJhbSB5ZWFyIC0gVGhlIHllYXIgb2YgdGhpcyBzZW1lc3Rlci5cbiAqL1xuaW50ZXJmYWNlIFNlbWVzdGVyIHtcbiAgc2Vhc29uOiBTZWFzb247XG4gIHllYXI6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aGUgc2Vhc29ucyBpbiB3aGljaCBhIGNvdXJzZSBjYW4gdGFrZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2Vhc29uID0gXCJGYWxsXCIgfCBcIlNwcmluZ1wiIHwgXCJTdW1tZXIgMVwiIHwgXCJTdW1tZXIgMlwiO1xuXG5leHBvcnQgdHlwZSBEZXNrdG9wTm90aWZCb2R5ID0ge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBleHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAga2V5czoge1xuICAgIHAyNTZkaDogc3RyaW5nO1xuICAgIGF1dGg6IHN0cmluZztcbiAgfTtcbiAgbmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFBob25lTm90aWZCb2R5ID0ge1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PSBBUEkgUm91dGUgVHlwZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPbiBiYWNrZW5kLCB2YWxpZGF0ZWQgd2l0aCBodHRwczovL2RvY3MubmVzdGpzLmNvbS90ZWNobmlxdWVzL3ZhbGlkYXRpb25cbi8vIEFQSSByb3V0ZSBQYXJhbXMgYW5kIFJlc3BvbnNlc1xuXG4vLyBPZmZpY2UgSG91cnMgUmVzcG9uc2UgVHlwZXNcbmV4cG9ydCBjbGFzcyBHZXRQcm9maWxlUmVzcG9uc2UgZXh0ZW5kcyBVc2VyIHt9XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlEYXRhUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgZW1haWwhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgZmlyc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBsYXN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzSW50KClcbiAgY2FtcHVzITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzU3RyaW5nKClcbiAgcGhvdG9fdXJsITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIGNvdXJzZXMhOiBLaG91cnlTdHVkZW50Q291cnNlW107XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgdGFfY291cnNlcyE6IEtob3VyeVRBQ291cnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlTdHVkZW50Q291cnNlIHtcbiAgQElzSW50KClcbiAgY3JuITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWNjZWxlcmF0ZWQhOiBib29sZWFuO1xuXG4gIEBJc0ludCgpXG4gIHNlY3Rpb24hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgdGl0bGUhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlUQUNvdXJzZSB7XG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLaG91cnlSZWRpcmVjdFJlc3BvbnNlIHtcbiAgcmVkaXJlY3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVQYXJhbXMge1xuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBAVmFsaWRhdGVJZigobykgPT4gby5waG9uZU5vdGlmc0VuYWJsZWQpXG4gIEBJc1N0cmluZygpXG4gIEBJc05vdEVtcHR5KClcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsYXN0TmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVJlc3BvbnNlIHtcbiAgaWQhOiBudW1iZXI7XG4gIG5hbWUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gT2ZmaWNlSG91clBhcnRpYWwpXG4gIG9mZmljZUhvdXJzITogQXJyYXk8T2ZmaWNlSG91clBhcnRpYWw+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXVlUGFydGlhbClcbiAgcXVldWVzITogUXVldWVQYXJ0aWFsW107XG5cbiAgaGVhdG1hcCE6IEhlYXRtYXAgfCBmYWxzZTtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXVlUmVzcG9uc2UgZXh0ZW5kcyBRdWV1ZVBhcnRpYWwge31cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVF1ZXVlc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVldWVQYXJ0aWFsPiB7fVxuXG5leHBvcnQgY2xhc3MgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlIHtcbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHlvdXJRdWVzdGlvbj86IFF1ZXN0aW9uO1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWVzdGlvbnNHZXR0aW5nSGVscCE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHByaW9yaXR5UXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgdGV4dCE6IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgcXVldWVJZCE6IG51bWJlcjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgZm9yY2UhOiBib29sZWFuO1xufVxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVldWVJZD86IG51bWJlcjtcblxuICBASXNFbnVtKFF1ZXN0aW9uU3RhdHVzS2V5cylcbiAgQElzT3B0aW9uYWwoKVxuICBzdGF0dXM/OiBRdWVzdGlvblN0YXR1cztcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IHR5cGUgVEFVcGRhdGVTdGF0dXNSZXNwb25zZSA9IFF1ZXVlUGFydGlhbDtcbmV4cG9ydCB0eXBlIFF1ZXVlTm90ZVBheWxvYWRUeXBlID0ge1xuICBub3Rlczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFRBQ2hlY2tvdXRSZXNwb25zZSB7XG4gIC8vIFRoZSBJRCBvZiB0aGUgcXVldWUgd2UgY2hlY2tlZCBvdXQgb2ZcbiAgcXVldWVJZCE6IG51bWJlcjtcbiAgY2FuQ2xlYXJRdWV1ZSE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgbmV4dE9mZmljZUhvdXJUaW1lPzogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXVlUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBub3Rlcz86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWxsb3dRdWVzdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU1NFUXVldWVSZXNwb25zZSB7XG4gIHF1ZXVlPzogR2V0UXVldWVSZXNwb25zZTtcbiAgcXVlc3Rpb25zPzogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0JvZHkge1xuICBUb0NvdW50cnk6IHN0cmluZztcbiAgVG9TdGF0ZTogc3RyaW5nO1xuICBTbXNNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIE51bU1lZGlhOiBzdHJpbmc7XG4gIFRvQ2l0eTogc3RyaW5nO1xuICBGcm9tWmlwOiBzdHJpbmc7XG4gIFNtc1NpZDogc3RyaW5nO1xuICBGcm9tU3RhdGU6IHN0cmluZztcbiAgU21zU3RhdHVzOiBzdHJpbmc7XG4gIEZyb21DaXR5OiBzdHJpbmc7XG4gIEJvZHk6IHN0cmluZztcbiAgRnJvbUNvdW50cnk6IHN0cmluZztcbiAgVG86IHN0cmluZztcbiAgVG9aaXA6IHN0cmluZztcbiAgTnVtU2VnbWVudHM6IHN0cmluZztcbiAgTWVzc2FnZVNpZDogc3RyaW5nO1xuICBBY2NvdW50U2lkOiBzdHJpbmc7XG4gIEZyb206IHN0cmluZztcbiAgQXBpVmVyc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIHtcbiAgcmVsZWFzZU5vdGVzOiB1bmtub3duO1xuICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9NRVNTQUdFUyA9IHtcbiAgcXVlc3Rpb25Db250cm9sbGVyOiB7XG4gICAgY3JlYXRlUXVlc3Rpb246IHtcbiAgICAgIGludmFsaWRRdWV1ZTogXCJQb3N0ZWQgdG8gYW4gaW52YWxpZCBxdWV1ZVwiLFxuICAgICAgbm9OZXdRdWVzdGlvbnM6IFwiUXVldWUgbm90IGFsbG93aW5nIG5ldyBxdWVzdGlvbnNcIixcbiAgICAgIGNsb3NlZFF1ZXVlOiBcIlF1ZXVlIGlzIGNsb3NlZFwiLFxuICAgICAgb25lUXVlc3Rpb25BdEFUaW1lOiBcIllvdSBjYW4ndCBjcmVhdGUgbW9yZSB0aGFuIG9uZSBxdWVzdGlvbiBhdCBhIHRpbWUuXCIsXG4gICAgfSxcbiAgICB1cGRhdGVRdWVzdGlvbjoge1xuICAgICAgZnNtVmlvbGF0aW9uOiAoXG4gICAgICAgIHJvbGU6IHN0cmluZyxcbiAgICAgICAgcXVlc3Rpb25TdGF0dXM6IHN0cmluZyxcbiAgICAgICAgYm9keVN0YXR1czogc3RyaW5nXG4gICAgICApOiBzdHJpbmcgPT5cbiAgICAgICAgYCR7cm9sZX0gY2Fubm90IGNoYW5nZSBzdGF0dXMgZnJvbSAke3F1ZXN0aW9uU3RhdHVzfSB0byAke2JvZHlTdGF0dXN9YCxcbiAgICAgIHRhT25seUVkaXRRdWVzdGlvblN0YXR1czogXCJUQS9Qcm9mZXNzb3JzIGNhbiBvbmx5IGVkaXQgcXVlc3Rpb24gc3RhdHVzXCIsXG4gICAgICBvdGhlclRBSGVscGluZzogXCJBbm90aGVyIFRBIGlzIGN1cnJlbnRseSBoZWxwaW5nIHdpdGggdGhpcyBxdWVzdGlvblwiLFxuICAgICAgb3RoZXJUQVJlc29sdmVkOiBcIkFub3RoZXIgVEEgaGFzIGFscmVhZHkgcmVzb2x2ZWQgdGhpcyBxdWVzdGlvblwiLFxuICAgICAgdGFIZWxwaW5nT3RoZXI6IFwiVEEgaXMgYWxyZWFkeSBoZWxwaW5nIHNvbWVvbmUgZWxzZVwiLFxuICAgICAgbG9naW5Vc2VyQ2FudEVkaXQ6IFwiTG9nZ2VkLWluIHVzZXIgZG9lcyBub3QgaGF2ZSBlZGl0IGFjY2Vzc1wiLFxuICAgIH0sXG4gIH0sXG4gIGxvZ2luQ29udHJvbGxlcjoge1xuICAgIHJlY2VpdmVEYXRhRnJvbUtob3VyeTogXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBtZXNzYWdlTm90RnJvbVR3aWxpbzogXCJNZXNzYWdlIG5vdCBmcm9tIFR3aWxpb1wiLFxuICB9LFxuICBub3RpZmljYXRpb25TZXJ2aWNlOiB7XG4gICAgcmVnaXN0ZXJQaG9uZTogXCJwaG9uZSBudW1iZXIgaW52YWxpZFwiLFxuICB9LFxuICBxdWVzdGlvblJvbGVHdWFyZDoge1xuICAgIHF1ZXN0aW9uTm90Rm91bmQ6IFwiUXVlc3Rpb24gbm90IGZvdW5kXCIsXG4gICAgcXVldWVPZlF1ZXN0aW9uTm90Rm91bmQ6IFwiQ2Fubm90IGZpbmQgcXVldWUgb2YgcXVlc3Rpb25cIixcbiAgICBxdWV1ZURvZXNOb3RFeGlzdDogXCJUaGlzIHF1ZXVlIGRvZXMgbm90IGV4aXN0IVwiLFxuICB9LFxuICBxdWV1ZVJvbGVHdWFyZDoge1xuICAgIHF1ZXVlTm90Rm91bmQ6IFwiUXVldWUgbm90IGZvdW5kXCIsXG4gIH0sXG4gIHJlbGVhc2VOb3Rlc0NvbnRyb2xsZXI6IHtcbiAgICByZWxlYXNlTm90ZXNUaW1lOiAoZTogYW55KTogc3RyaW5nID0+XG4gICAgICBcIkVycm9yIFBhcnNpbmcgcmVsZWFzZSBub3RlcyB0aW1lOiBcIiArIGUsXG4gIH0sXG4gIHJvbGVHdWFyZDoge1xuICAgIG5vdExvZ2dlZEluOiBcIk11c3QgYmUgbG9nZ2VkIGluXCIsXG4gICAgbm9Db3Vyc2VJZEZvdW5kOiBcIk5vIGNvdXJzZWlkIGZvdW5kXCIsXG4gICAgbm90SW5Db3Vyc2U6IFwiTm90IEluIFRoaXMgQ291cnNlXCIsXG4gICAgbXVzdEJlUm9sZVRvSm9pbkNvdXJzZTogKHJvbGVzOiBzdHJpbmdbXSk6IHN0cmluZyA9PlxuICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXCIsIFwiKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybVwiKTsiLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRXZlbnQgaW4gdGhlIEV2ZW50TW9kZWwgdGFibGUsIHVzZWQgZm9yIGFkdmFuY2VkIG1ldHJpY3MuXG4gKi9cbmV4cG9ydCBlbnVtIEV2ZW50VHlwZSB7XG4gIFRBX0NIRUNLRURfSU4gPSAndGFDaGVja2VkSW4nLFxuICBUQV9DSEVDS0VEX09VVCA9ICd0YUNoZWNrZWRPdXQnLFxufVxuXG5ARW50aXR5KCdldmVudF9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRXZlbnRNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHRpbWU6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogRXZlbnRUeXBlIH0pXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLmV2ZW50cylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEhlYXRtYXAgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSBpbiB0aGUgY29udGV4dCBvZiBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKiBAcGFyYW0gc2VtZXN0ZXIgLSBUaGUgc2VtZXN0ZXIgb2YgdGhpcyBjb3Vyc2UuXG4gKi9cbi8qaW50ZXJmYWNlIENvdXJzZSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgc2VtZXN0ZXI6IFNlbWVzdGVyO1xuICAgIHVzZXJzOiBVc2VyQ291cnNlW11cbn0qL1xuXG5ARW50aXR5KCdjb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2guY291cnNlKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEuY291cnNlKVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgaWNhbFVSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VyQ291cnNlczogVXNlckNvdXJzZU1vZGVsO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFNlbWVzdGVyTW9kZWwsIChzZW1lc3RlcikgPT4gc2VtZXN0ZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnc2VtZXN0ZXJJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBzZW1lc3RlcjogU2VtZXN0ZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICAvLyBUT0RPOiBjYW4gd2UgbWFrZSB0aGVzZSBub3QgbnVsbGFibGUgYW5kIHdvcmsgd2l0aCBUeXBlT1JNXG4gIHNlbWVzdGVySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCdib29sZWFuJywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBlbmFibGVkOiBib29sZWFuOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgZ2l2ZW4gdGhlIGNvdXJzZSBpcyB1c2luZyBvdXIgYXBwXG5cbiAgLy8gVGhlIGhlYXRtYXAgaXMgZmFsc2Ugd2hlbiB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgcXVlc3Rpb25zIGFza2VkIHlldCBvciB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgb2ZmaWNlIGhvdXJzXG4gIGhlYXRtYXA6IEhlYXRtYXAgfCBmYWxzZTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICBldmVudHM6IEV2ZW50TW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIE9uZVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbGFzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LnVzZXIpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnZGVza3RvcF9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBleHBpcmF0aW9uVGltZTogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcDI1NmRoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGF1dGg6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmRlc2t0b3BOb3RpZnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7IHR5cGU6ICd0aW1lc3RhbXAnIH0pXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ3RleHQnLCBudWxsYWJsZTogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3Bob25lX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBQaG9uZU5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5waG9uZU5vdGlmKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHZlcmlmaWVkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBKb2luVGFibGUsXG4gIExlc3NUaGFuT3JFcXVhbCxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBNb3JlVGhhbk9yRXF1YWwsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcblxuaW50ZXJmYWNlIFRpbWVJbnRlcnZhbCB7XG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcbn1cblxuQEVudGl0eSgncXVldWVfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UucXVldWVzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICByb29tOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVlc3Rpb25Nb2RlbCwgKHFtKSA9PiBxbS5xdWV1ZSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBub3Rlczogc3RyaW5nO1xuXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnF1ZXVlcylcbiAgQEpvaW5UYWJsZSgpXG4gIHN0YWZmTGlzdDogVXNlck1vZGVsW107XG5cbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuXG4gIEBFeGNsdWRlKClcbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLnF1ZXVlKVxuICBASm9pblRhYmxlKClcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcblxuICBpc09wZW46IGJvb2xlYW47XG5cbiAgYXN5bmMgY2hlY2tJc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuc3RhZmZMaXN0ICYmIHRoaXMuc3RhZmZMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IE1TX0lOX01JTlVURSA9IDYwMDAwO1xuICAgIGNvbnN0IG9ocyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCBvcGVuID0gISFvaHMuZmluZChcbiAgICAgIChlKSA9PlxuICAgICAgICBlLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxMCAqIE1TX0lOX01JTlVURSA8IG5vdy5nZXRUaW1lKCkgJiZcbiAgICAgICAgZS5lbmRUaW1lLmdldFRpbWUoKSArIDEgKiBNU19JTl9NSU5VVEUgPiBub3cuZ2V0VGltZSgpLFxuICAgICk7XG4gICAgdGhpcy5pc09wZW4gPSBvcGVuO1xuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcXVldWVTaXplOiBudW1iZXI7XG5cbiAgYXN5bmMgYWRkUXVldWVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVTaXplID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZSh0aGlzLmlkKS5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSwgUm9sZSwgU3RhdHVzSW5RdWV1ZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnLi9xdWVzdGlvbi1mc20nO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBmaXJzdCBoZWxwZWQgKGRvZXNuJ3Qgb3ZlcndyaXRlKVxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBmaXJzdEhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBsYXN0IGhlbHBlZCAoZ2V0dGluZyBoZWxwIGFnYWluIG9uIHByaW9yaXR5IHF1ZXVlIG92ZXJ3cml0ZXMpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICAvLyBXaGVuIHRoZSBxdWVzdGlvbiBsZWF2ZXMgdGhlIHF1ZXVlXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjbG9zZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWVzdGlvblR5cGU6IFF1ZXN0aW9uVHlwZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc3RhdHVzOiBRdWVzdGlvblN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbG9jYXRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBhcyB0aGUgZ2l2ZW4gcm9sZVxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIHN0YXR1cyBjaGFuZ2Ugc3VjY2VlZGVkXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU3RhdHVzKG5ld1N0YXR1czogUXVlc3Rpb25TdGF0dXMsIHJvbGU6IFJvbGUpOiBib29sZWFuIHtcbiAgICBpZiAoY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXModGhpcy5zdGF0dXMsIG5ld1N0YXR1cywgcm9sZSkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHN0YXR1c2VzOiBRdWVzdGlvblN0YXR1c1tdLFxuICApOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlcyxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXN0aW9ucyB0aGF0IGFyZSBvcGVuIGluIHRoZSBxdWV1ZSAobm90IGluIHByaW9yaXR5IHF1ZXVlKVxuICAgKi9cbiAgc3RhdGljIHdhaXRpbmdJblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgU3RhdHVzSW5RdWV1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG59O1xuXG5jb25zdCBRVUVTVElPTl9TVEFURVM6IFJlY29yZDxRdWVzdGlvblN0YXR1cywgQWxsb3dhYmxlVHJhbnNpdGlvbnM+ID0ge1xuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nXToge1xuICAgIHN0dWRlbnQ6IFtPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLCBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgICB0YTogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkRlbGV0ZWREcmFmdF0sXG4gIH0sXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkXTogUVVFVUVfVFJBTlNJVElPTlMsXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXToge1xuICAgIHRhOiBbXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kLFxuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCxcbiAgICBdLFxuICAgIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmRdOiB7XG4gICAgc3R1ZGVudDogW1xuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkXToge1xuICAgIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgfSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZV06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuRGVsZXRlZERyYWZ0XToge30sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXMoXG4gIG9sZFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIGdvYWxTdGF0dXM6IFF1ZXN0aW9uU3RhdHVzLFxuICByb2xlOiBSb2xlLFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgb2xkU3RhdHVzID09PSBnb2FsU3RhdHVzIHx8XG4gICAgUVVFU1RJT05fU1RBVEVTW29sZFN0YXR1c11bcm9sZV0/LmluY2x1ZGVzKGdvYWxTdGF0dXMpXG4gICk7XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFNlYXNvbiB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnc2VtZXN0ZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFNlbWVzdGVyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzZWFzb246IFNlYXNvbjtcblxuICBAQ29sdW1uKClcbiAgeWVhcjogbnVtYmVyO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2Uuc2VtZXN0ZXIpXG4gIGNvdXJzZXM6IENvdXJzZU1vZGVsW107XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RBdXRoR3VhcmQgZXh0ZW5kcyBBdXRoR3VhcmQoJ2p3dCcpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3Bhc3Nwb3J0XCIpOyIsImltcG9ydCB7IFNldE1ldGFkYXRhLCBDdXN0b21EZWNvcmF0b3IgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBSb2xlcyA9ICguLi5yb2xlczogc3RyaW5nW10pOiBDdXN0b21EZWNvcmF0b3I8c3RyaW5nPiA9PlxuICBTZXRNZXRhZGF0YSgncm9sZXMnLCByb2xlcyk7XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlciA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yPHN0cmluZ1tdPihcbiAgYXN5bmMgKHJlbGF0aW9uczogc3RyaW5nW10sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7IHJlbGF0aW9ucyB9KTtcbiAgfSxcbik7XG5cbmV4cG9ydCBjb25zdCBVc2VySWQgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBOdW1iZXIocmVxdWVzdC51c2VyLnVzZXJJZCk7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24sIENyb25FeHByZXNzaW9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICdjb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCB7IENvbm5lY3Rpb24sIExlc3NUaGFuT3JFcXVhbCwgTW9yZVRoYW5PckVxdWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIENsZWFuIHRoZSBxdWV1ZSBhbmQgbWFyayBzdGFsZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVDbGVhblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgQENyb24oQ3JvbkV4cHJlc3Npb24uRVZFUllfREFZX0FUX01JRE5JR0hUKVxuICBwcml2YXRlIGFzeW5jIGNsZWFuQWxsUXVldWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zOiBRdWV1ZU1vZGVsW10gPSBhd2FpdCBRdWV1ZU1vZGVsLmdldFJlcG9zaXRvcnkoKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVldWUnKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWV1ZV9tb2RlbC5xdWVzdGlvbnMnLCAncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXMpJywge1xuICAgICAgICBzdGF0dXM6IE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICAgIH0pXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9ucy5tYXAoKHF1ZXVlKSA9PiB0aGlzLmNsZWFuUXVldWUocXVldWUuaWQpKSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFuUXVldWUocXVldWVJZDogbnVtYmVyLCBmb3JjZT86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoZm9yY2UgfHwgIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgcXVldWUubm90ZXMgPSAnJztcbiAgICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAgIGF3YWl0IHRoaXMudW5zYWZlQ2xlYW4ocXVldWUuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNob3VsZCB3ZSBjb25zaWRlciBjbGVhbmluZyB0aGUgcXVldWU/XG4gIC8vICBDaGVja3MgaWYgdGhlcmUgYXJlIG5vIHN0YWZmLCBvcGVuIHF1ZXN0aW9ucyBhbmQgdGhhdCB0aGVyZSBhcmVuJ3QgYW55IG9mZmljZSBob3VycyBzb29uXG4gIHB1YmxpYyBhc3luYyBzaG91bGRDbGVhblF1ZXVlKHF1ZXVlOiBRdWV1ZU1vZGVsKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIExhc3QgVEEgdG8gY2hlY2tvdXQsIHNvIGNoZWNrIGlmIHdlIG1pZ2h0IHdhbnQgdG8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICBjb25zdCBhcmVBbnlRdWVzdGlvbnNPcGVuID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgICAgICAgcXVldWUuaWQsXG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgICApLmdldENvdW50KCkpID4gMDtcbiAgICAgIGlmIChhcmVBbnlRdWVzdGlvbnNPcGVuKSB7XG4gICAgICAgIGNvbnN0IHNvb24gPSBtb21lbnQoKS5hZGQoMTUsICdtaW51dGVzJykudG9EYXRlKCk7XG4gICAgICAgIGNvbnN0IGFyZU9mZmljZUhvdXJTb29uID1cbiAgICAgICAgICAoYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmNvdW50KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogTGVzc1RoYW5PckVxdWFsKHNvb24pLFxuICAgICAgICAgICAgICBlbmRUaW1lOiBNb3JlVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pKSA+IDA7XG4gICAgICAgIGlmICghYXJlT2ZmaWNlSG91clNvb24pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVuc2FmZUNsZWFuKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgW1xuICAgICAgLi4uT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyhMaW1ib1F1ZXN0aW9uU3RhdHVzKSxcbiAgICBdKS5nZXRNYW55KCk7XG5cbiAgICBxdWVzdGlvbnMuZm9yRWFjaCgocTogUXVlc3Rpb25Nb2RlbCkgPT4ge1xuICAgICAgcS5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZTtcbiAgICAgIHEuY2xvc2VkQXQgPSBuZXcgRGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25Nb2RlbC5zYXZlKHF1ZXN0aW9ucyk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb3Vyc2VSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY291cnNlSWQgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENhbkFjdGl2YXRlLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZsZWN0b3IgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZXNHdWFyZCB7XG4gIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuO1xuXG4gIHNldHVwRGF0YShyZXF1ZXN0OiBhbnkpOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZsZWN0b3I6IFJlZmxlY3Rvcikge31cblxuICBhc3luYyBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLnJlZmxlY3Rvci5nZXQ8c3RyaW5nW10+KCdyb2xlcycsIGNvbnRleHQuZ2V0SGFuZGxlcigpKTtcbiAgICBpZiAoIXJvbGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IGNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHsgY291cnNlSWQsIHVzZXIgfSA9IGF3YWl0IHRoaXMuc2V0dXBEYXRhKHJlcXVlc3QpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub3RMb2dnZWRJbik7XG4gICAgfVxuXG4gICAgaWYgKCFjb3Vyc2VJZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub0NvdXJzZUlkRm91bmQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hdGNoUm9sZXMocm9sZXMsIHVzZXIsIGNvdXJzZUlkKTtcbiAgfVxuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vdEluQ291cnNlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1haW5pbmcgPSByb2xlcy5maWx0ZXIoKHJvbGUpID0+IHtcbiAgICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGUudG9TdHJpbmcoKSA9PT0gcm9sZTtcbiAgICB9KTtcblxuICAgIGlmIChyZW1haW5pbmcubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5tdXN0QmVSb2xlVG9Kb2luQ291cnNlKHJvbGVzKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbWFpbmluZy5sZW5ndGggPiAwO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgSGVhdG1hcCwgdGltZURpZmZJbk1pbnMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDQUNIRV9NQU5BR0VSLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpblJhbmdlLCBtZWFuLCByYW5nZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBDb21tYW5kLCBQb3NpdGlvbmFsIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBNb3JlVGhhbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICdjYWNoZS1tYW5hZ2VyJztcblxuZnVuY3Rpb24gYXJyYXlSb3RhdGUoYXJyLCBjb3VudCkge1xuICBjb3VudCAtPSBhcnIubGVuZ3RoICogTWF0aC5mbG9vcihjb3VudCAvIGFyci5sZW5ndGgpO1xuICBjb25zdCBzcGxpY2VkID0gYXJyLnNwbGljZSgwLCBjb3VudCk7XG4gIHJldHVybiBbLi4uYXJyLCAuLi5zcGxpY2VkXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlYXRtYXBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChDQUNIRV9NQU5BR0VSKSBwcml2YXRlIGNhY2hlTWFuYWdlcjogQ2FjaGUpIHt9XG5cbiAgYXN5bmMgZ2V0Q2FjaGVkSGVhdG1hcEZvcihjb3Vyc2VJZDogbnVtYmVyKTogUHJvbWlzZTxIZWF0bWFwIHwgZmFsc2U+IHtcbiAgICAvL09uZSB3ZWVrXG4gICAgY29uc3QgY2FjaGVMZW5ndGhJblNlY29uZHMgPSA2MDQ4MDA7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVNYW5hZ2VyLndyYXAoXG4gICAgICBgaGVhdG1hcC8ke2NvdXJzZUlkfWAsXG4gICAgICAoKSA9PiB0aGlzLl9nZXRIZWF0bWFwRm9yKGNvdXJzZUlkKSxcbiAgICAgIHsgdHRsOiBjYWNoZUxlbmd0aEluU2Vjb25kcyB9LFxuICAgICk7XG4gIH1cblxuICAvLyBEbyBub3QgdXNlIHRoaXMgZXh0ZXJuYWxseSBwbHpcbiAgYXN5bmMgX2dldEhlYXRtYXBGb3IoY291cnNlSWQ6IG51bWJlcik6IFByb21pc2U8SGVhdG1hcCB8IGZhbHNlPiB7XG4gICAgLy8gVGhlIG51bWJlciBvZiBtaW51dGVzIHRvIGF2ZXJhZ2UgYWNyb3NzXG4gICAgY29uc3QgQlVDS0VUX1NJWkVfSU5fTUlOUyA9IDE1O1xuICAgIC8vIE51bWJlciBvZiBzYW1wbGVzIHRvIGdhdGhlciBwZXIgYnVja2V0XG4gICAgY29uc3QgU0FNUExFU19QRVJfQlVDS0VUID0gMztcbiAgICBjb25zb2xlLnRpbWUoJ2hlYXRtYXAnKTtcbiAgICBjb25zdCByZWNlbnQgPSBtb21lbnQoKS5zdWJ0cmFjdCg4LCAnd2Vla3MnKS50b0lTT1N0cmluZygpO1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWVzdGlvbicpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXN0aW9uLnF1ZXVlJywgJ3F1ZXVlJylcbiAgICAgIC53aGVyZSgncXVldWUuY291cnNlSWQgPSA6Y291cnNlSWQnLCB7IGNvdXJzZUlkIH0pXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyA9IDpzdGF0dXMnLCB7XG4gICAgICAgIHN0YXR1czogQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQsXG4gICAgICB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5oZWxwZWRBdCBJUyBOT1QgTlVMTCcpXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLmNyZWF0ZWRBdCA+IDpyZWNlbnQnLCB7IHJlY2VudCB9KVxuICAgICAgLm9yZGVyQnkoJ3F1ZXN0aW9uLmNyZWF0ZWRBdCcsICdBU0MnKVxuICAgICAgLmdldE1hbnkoKTtcbiAgICBpZiAocXVlc3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmQoe1xuICAgICAgd2hlcmU6IHsgc3RhcnRUaW1lOiBNb3JlVGhhbihyZWNlbnQpLCBjb3Vyc2VJZCB9LFxuICAgIH0pO1xuXG4gICAgaWYgKG9mZmljZUhvdXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHR6ID0gJ0FtZXJpY2EvTmV3X1lvcmsnO1xuICAgIGxldCBoZWF0bWFwID0gdGhpcy5fZ2VuZXJhdGVIZWF0TWFwV2l0aFJlcGxheShcbiAgICAgIC8vIElnbm9yZSBxdWVzdGlvbnMgdGhhdCBjcm9zcyBtaWRuaWdodCAodXN1YWxseSBhIGZsdWtlKVxuICAgICAgcXVlc3Rpb25zLmZpbHRlcigocSkgPT4gcS5oZWxwZWRBdC5nZXREYXRlKCkgPT09IHEuY3JlYXRlZEF0LmdldERhdGUoKSksXG4gICAgICBvZmZpY2VIb3VycyxcbiAgICAgIHR6LFxuICAgICAgQlVDS0VUX1NJWkVfSU5fTUlOUyxcbiAgICAgIFNBTVBMRVNfUEVSX0JVQ0tFVCxcbiAgICApO1xuICAgIGhlYXRtYXAgPSBhcnJheVJvdGF0ZShcbiAgICAgIGhlYXRtYXAsXG4gICAgICAtbW9tZW50LnR6LnpvbmUodHopLnV0Y09mZnNldChEYXRlLm5vdygpKSAvIEJVQ0tFVF9TSVpFX0lOX01JTlMsXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2hlYXRtYXAnKTtcbiAgICByZXR1cm4gaGVhdG1hcDtcbiAgfVxuXG4gIC8vIFBSSVZBVEUgZnVuY3Rpb24gdGhhdCBpcyBwdWJsaWMgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgLy8gUmV3aW5kIHRocm91Z2ggdGhlIGxhc3QgZmV3IHdlZWtzIGFuZCBmb3IgZWFjaCB0aW1lIGludGVydmFsLFxuICAvLyBmaWd1cmUgb3V0IGhvdyBsb25nIHdhaXQgdGltZSB3b3VsZCBoYXZlIGJlZW4gaWYgeW91IGhhZCBqb2luZWQgdGhlIHF1ZXVlIGF0IHRoYXQgdGltZVxuICAvLyBUaW1lem9uZSBzaG91bGQgYmUgSUFOQVxuICAvLyBSZXR1cm5zIGhlYXRtYXAgaW4gdGhlIHRpbWV6b25lIChpZSAzcmQgYnVja2V0IGlzIDNhbSBpbiB0aGF0IHRpbWV6b25lKVxuICBfZ2VuZXJhdGVIZWF0TWFwV2l0aFJlcGxheShcbiAgICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXSxcbiAgICBob3VyczogT2ZmaWNlSG91ck1vZGVsW10sXG4gICAgdGltZXpvbmU6IHN0cmluZyxcbiAgICBidWNrZXRTaXplOiBudW1iZXIsXG4gICAgc2FtcGxlc1BlckJ1Y2tldDogbnVtYmVyLFxuICApOiBIZWF0bWFwIHtcbiAgICBjb25zdCBzYW1wbGVJbnRlcnZhbCA9IGJ1Y2tldFNpemUgLyBzYW1wbGVzUGVyQnVja2V0O1xuICAgIC8qXG4gICAgVEVTVDogUXVlc3Rpb24xIGlzICAzOjA1IC0gMzoyNVxuICAgIC8vIFRoZSBuZXh0IHF1ZXN0aW9uIGlzIDM6MjEgLSAzOjQ5XG4gICAgVEhlIGZvbGxvd2luZyBxdWVzdGlvbiBpcyA0OjA1IC0gNDoxMFxuICAgIFxuICAgIEJ1Y2tldCA9IDYwLCBTYW1wbGVzID0gMywgc28gdGltZXBvaW50cyBhcmU6IDM6MDAsIDM6MjAsIDM6NDAuXG5cbiAgICAzOjIwIHNhbXBsZSBnZXRzIHdhaXR0aW1lIG9mIDUgbWludXRlc1xuICAgIDM6NDAgc2FtcGxlcyBnZXQgd2FpdHRpbWVzIG9mIDkgbWludXRlc1xuICAgIDQ6MDAgc2FtcGxlIGdldHMgd2FpdHRpbWUgb2YgMCBtaW51dGVzXG5cblxuICAgIElmIGkgZW50ZXJlZCB0aGUgcXVldWUgYXQgdGhhdCB0aW1lIHdoZW4gc2hvdWxkIEkgaGF2ZSBnb3R0ZW4gaGVscD9cbiAgICBFdmVyeSBpbnRlcnZhbCBvZiBtaW51dGVzIGZvciB0aGUgcGFzdCA1IHdlZWtzIGFyZSBhZ2dyZWdhdGVkIChieSB0YWtpbmcgdGhlIGF2ZylcbiAgICBcbiAgICBhbmFseXplIHRoZSBidWNrZXRzIHRvIGZpbmQgdGhlIGNsb3Nlc3QgdGltZSBhcHByb3hpbWF0aW9uXG5cbiAgICBsb29rIGF0IHF1ZXN0aW9uIFExIGFuZCB0aGUgbmV4dCBxdWVzdGlvbiBRMlxuICAgIGZvciBhbGwgc2FtcGxlIHRpbWVwb2ludHMgYmV0d2VlbiBRMS5jcmVhdGVkQXQgYW5kIFEyLmNyZWF0ZWRBdDpcbiAgICAgICAtIHNhbXBsZSA9IFExLmhlbHBlZEF0IC0gdGltZXBvaW50IChpZiBuZWdhdGl2ZSwgdGhlbiBpdCdzIDApXG4gICAgKi9cblxuICAgIGNvbnN0IGhvdXJUaW1lc3RhbXBzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBob3Vycy5tYXAoKGhvdXJzKSA9PiBbXG4gICAgICBob3Vycy5zdGFydFRpbWUuZ2V0VGltZSgpLFxuICAgICAgaG91cnMuZW5kVGltZS5nZXRUaW1lKCksXG4gICAgXSk7XG5cbiAgICBmdW5jdGlvbiBkYXRlVG9CdWNrZXQoZGF0ZTogRGF0ZSB8IG51bWJlcik6IG51bWJlciB7XG4gICAgICAvLyBwYXJzZSBpbiB6b25lIHRvIGhhbmRsZSBkYXlsaWdodCBzYXZpbmdzIGJ5IGdldHRpbmcgZGF5L2hvdXIvbWludXRlIHdpdGhpbiB0aGF0IElBTkEgem9uZVxuICAgICAgY29uc3QgY0luWm9uZSA9IG1vbWVudC50eihkYXRlLCB0aW1lem9uZSk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihcbiAgICAgICAgKGNJblpvbmUuZGF5KCkgKiAyNCAqIDYwICsgY0luWm9uZS5ob3VyKCkgKiA2MCArIGNJblpvbmUubWludXRlKCkpIC9cbiAgICAgICAgICBidWNrZXRTaXplLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdGltZXBvaW50QnVja2V0czogbnVtYmVyW11bXSA9IFtcbiAgICAgIC4uLkFycmF5KCgyNCAqIDcgKiA2MCkgLyBidWNrZXRTaXplKSxcbiAgICBdLm1hcCgoKSA9PiBbXSk7XG5cbiAgICBpZiAocXVlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3RhcnREYXRlID0gcXVlc3Rpb25zWzBdLmNyZWF0ZWRBdDtcbiAgICAgIGNvbnN0IHN1bmRheSA9IG1vbWVudC50eihzdGFydERhdGUsIHRpbWV6b25lKS5zdGFydE9mKCd3ZWVrJykudG9EYXRlKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldE5leHRUaW1lcG9pbnRJbmRleChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZURpZmZJbk1pbnMoZGF0ZSwgc3VuZGF5KSAvIHNhbXBsZUludGVydmFsKSArIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgZGF0ZSBvZiB0aGUgc2FtcGxlIHRpbWVwb2ludCBpbW1lZGlhdGVseSBhZnRlciB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAgZnVuY3Rpb24gZ2V0TmV4dFNhbXBsZVRpbWVwb2ludChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHRpbWVwb2ludEluZGV4ID0gZ2V0TmV4dFRpbWVwb2ludEluZGV4KGRhdGUpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgICAgc3VuZGF5LmdldFRpbWUoKSArIHRpbWVwb2ludEluZGV4ICogc2FtcGxlSW50ZXJ2YWwgKiA2MCAqIDEwMDAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBhbGwgdGltZXBvaW50cyBiZXR3ZWVuIHRoZSB0d28gZGF0ZXNcbiAgICAgIGZ1bmN0aW9uIGdldFNhbXBsZVRpbWVwb2ludHNJbkRhdGVSYW5nZShcbiAgICAgICAgZGF0ZTE6IERhdGUsXG4gICAgICAgIGRhdGUyOiBEYXRlLFxuICAgICAgKTogRGF0ZVtdIHtcbiAgICAgICAgY29uc3QgcmV0ID0gW107XG4gICAgICAgIGxldCBjdXJyID0gZ2V0TmV4dFNhbXBsZVRpbWVwb2ludChkYXRlMSk7XG4gICAgICAgIHdoaWxlIChjdXJyLmdldFRpbWUoKSA8IGRhdGUyLmdldFRpbWUoKSkge1xuICAgICAgICAgIHJldC5wdXNoKGN1cnIpO1xuICAgICAgICAgIGN1cnIgPSBnZXROZXh0U2FtcGxlVGltZXBvaW50KGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgY3VycmVudCBidWNrZXRcbiAgICAgIGZ1bmN0aW9uIGxhc3RCdWNrZXRCb3VuZGFyeShkYXRlOiBEYXRlKTogbW9tZW50Lk1vbWVudCB7XG4gICAgICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gbW9tZW50LnR6KGRhdGUsIHRpbWV6b25lKS5zdGFydE9mKCd3ZWVrJyk7XG4gICAgICAgIGNvbnN0IG0gPSBtb21lbnQoZGF0ZSk7XG4gICAgICAgIHJldHVybiBtLnN1YnRyYWN0KG0uZGlmZihzdGFydE9mV2VlaywgJ20nKSAlIGJ1Y2tldFNpemUsICdtJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdvIHR3byBxdWVzdGlvbnMgYXQgYSB0aW1lXG4gICAgICBsZXQgaXNGaXJzdCA9IHRydWU7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyID0gcXVlc3Rpb25zW2ldO1xuICAgICAgICBjb25zdCBuZXh0ID0gcXVlc3Rpb25zW2kgKyAxXTtcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PT0gcXVlc3Rpb25zLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lcG9pbnRzIGluIGJldHdlZW5cbiAgICAgICAgbGV0IHNhbXBsZWRUaW1lcG9pbnRzID0gZ2V0U2FtcGxlVGltZXBvaW50c0luRGF0ZVJhbmdlKFxuICAgICAgICAgIGlzRmlyc3RcbiAgICAgICAgICAgID8gbGFzdEJ1Y2tldEJvdW5kYXJ5KGN1cnIuY3JlYXRlZEF0KVxuICAgICAgICAgICAgICAgIC5zdWJ0cmFjdCgxLCAncycpIC8vIHNvIHRoYXQgd2UgZ2V0IHRoZSBmaXJzdCB0aW1lcG9pbnRcbiAgICAgICAgICAgICAgICAudG9EYXRlKClcbiAgICAgICAgICAgIDogY3Vyci5jcmVhdGVkQXQsXG4gICAgICAgICAgaXNMYXN0XG4gICAgICAgICAgICA/IGxhc3RCdWNrZXRCb3VuZGFyeShjdXJyLmhlbHBlZEF0KVxuICAgICAgICAgICAgICAgIC5hZGQoYnVja2V0U2l6ZSwgJ20nKSAvLyB0byBnZXQgdGhlIG5leHRCdWNrZXRCb3VuZGFyeVxuICAgICAgICAgICAgICAgIC50b0RhdGUoKVxuICAgICAgICAgICAgOiBuZXh0LmNyZWF0ZWRBdCxcbiAgICAgICAgKTtcbiAgICAgICAgc2FtcGxlZFRpbWVwb2ludHMgPSBzYW1wbGVkVGltZXBvaW50cy5maWx0ZXIoKHRpbWUpID0+XG4gICAgICAgICAgaG91clRpbWVzdGFtcHMuc29tZSgoW3N0YXJ0LCBlbmRdKSA9PlxuICAgICAgICAgICAgaW5SYW5nZSh0aW1lLmdldFRpbWUoKSwgc3RhcnQsIGVuZCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBQYWQgdGhlIGZpcnN0IGJ1Y2tldCB3aXRoIHplcm9zIHRvIGFjY291bnQgZm9yIHRpbWVwb2ludHMgYmVmb3JlIHRoZSBmaXJzdFxuICAgICAgICBpZiAoc2FtcGxlZFRpbWVwb2ludHMubGVuZ3RoID4gMCAmJiBpc0ZpcnN0KSB7XG4gICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gd2Ugd291bGQgaGF2ZSBoeXBvdGhldGljYWxseSBnb3R0ZW4gaGVscCBhdCB0aGlzIHRpbWVwb2ludFxuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2FtcGxlZFRpbWVwb2ludHMpIHtcbiAgICAgICAgICBsZXQgd2FpdCA9IDA7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaW5SYW5nZShcbiAgICAgICAgICAgICAgYy5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIGN1cnIuY3JlYXRlZEF0LmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgY3Vyci5oZWxwZWRBdC5nZXRUaW1lKCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YWl0ID0gKGN1cnIuaGVscGVkQXQuZ2V0VGltZSgpIC0gYy5nZXRUaW1lKCkpIC8gNjAwMDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYnVja2V0SW5kZXggPSBkYXRlVG9CdWNrZXQoYyk7XG4gICAgICAgICAgdGltZXBvaW50QnVja2V0c1tidWNrZXRJbmRleF0ucHVzaCh3YWl0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlcmUgdGhlcmUgZXZlciBvZmZpY2UgaG91cnMgaW4gdGhpcyBidWNrZXQ/XG4gICAgY29uc3Qgd2VyZUhvdXJzRHVyaW5nQnVja2V0OiBib29sZWFuW10gPSBbXG4gICAgICAuLi5BcnJheSgoMjQgKiA3ICogNjApIC8gYnVja2V0U2l6ZSksXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IFtzdGFydCwgZW5kXSBvZiBob3VyVGltZXN0YW1wcykge1xuICAgICAgLy9wcmV2ZW50cyBhbiBvZmZpY2UgaG91ciBmcm9tIFtOLCBNXSB0byByZWdpc3RlciBpbiBtdWx0aXBsZSBidWNrZXRzXG4gICAgICBmb3IgKGNvbnN0IGkgb2YgcmFuZ2UoZGF0ZVRvQnVja2V0KHN0YXJ0KSwgZGF0ZVRvQnVja2V0KGVuZCAtIDEpICsgMSkpIHtcbiAgICAgICAgd2VyZUhvdXJzRHVyaW5nQnVja2V0W2ldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoOiBIZWF0bWFwID0gdGltZXBvaW50QnVja2V0cy5tYXAoKHNhbXBsZXMsIGkpID0+IHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIG1lYW4oc2FtcGxlcyk7XG4gICAgICB9IGVsc2UgaWYgKHdlcmVIb3Vyc0R1cmluZ0J1Y2tldFtpXSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaDtcbiAgfVxuXG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaGVhdG1hcDpnZW5lcmF0ZSA8Y291cnNlSWQ+JyxcbiAgICBkZXNjcmliZTogJ2dlbmVyYXRlIGhlYXRtYXAgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICdjb3Vyc2VJZCcsXG4gICAgICBkZXNjcmliZTogJ3doaWNoIGNvdXJzZSB0aGUgaGVhdG1hcCB3aWxsIGJlIGdlbmVyYXRlZCBmb3InLFxuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgfSlcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhhd2FpdCB0aGlzLl9nZXRIZWF0bWFwRm9yKGNvdXJzZUlkKSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBSb2xlLCBTU0VRdWV1ZVJlc3BvbnNlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnc3NlL3NzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5cbnR5cGUgUXVldWVDbGllbnRNZXRhZGF0YSA9IHsgdXNlcklkOiBudW1iZXI7IHJvbGU6IFJvbGUgfTtcblxuY29uc3QgaWRUb1Jvb20gPSAocXVldWVJZDogbnVtYmVyKSA9PiBgcS0ke3F1ZXVlSWR9YDtcbi8qKlxuICogSGFuZGxlIHNlbmRpbmcgcXVldWUgc3NlIGV2ZW50c1xuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVTU0VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgICBwcml2YXRlIHNzZVNlcnZpY2U6IFNTRVNlcnZpY2U8UXVldWVDbGllbnRNZXRhZGF0YT4sXG4gICkge31cblxuICBzdWJzY3JpYmVDbGllbnQoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHJlczogUmVzcG9uc2UsXG4gICAgbWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuc3NlU2VydmljZS5zdWJzY3JpYmVDbGllbnQoaWRUb1Jvb20ocXVldWVJZCksIHsgcmVzLCBtZXRhZGF0YSB9KTtcbiAgfVxuXG4gIC8vIFNlbmQgZXZlbnQgd2l0aCBuZXcgcXVlc3Rpb25zLCBidXQgbm8gbW9yZSB0aGFuIG9uY2UgYSBzZWNvbmRcbiAgdXBkYXRlUXVlc3Rpb25zID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICBpZiAocXVlc3Rpb25zKSB7XG4gICAgICB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKHsgcm9sZSwgdXNlcklkIH0pID0+ICh7XG4gICAgICAgIHF1ZXN0aW9uczogYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UucGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgICAgICAgcXVldWVJZCxcbiAgICAgICAgICBxdWVzdGlvbnMsXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIHJvbGUsXG4gICAgICAgICksXG4gICAgICB9KSk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVRdWV1ZSA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICgpID0+ICh7IHF1ZXVlIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHByaXZhdGUgYXN5bmMgc2VuZFRvUm9vbShcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgZGF0YTogKG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhKSA9PiBQcm9taXNlPFNTRVF1ZXVlUmVzcG9uc2U+LFxuICApIHtcbiAgICBhd2FpdCB0aGlzLnNzZVNlcnZpY2Uuc2VuZEV2ZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCBkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgdGhyb3R0bGVVcGRhdGUodXBkYXRlRnVuY3Rpb246IChxdWV1ZUlkOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICByZXR1cm4gdGhyb3R0bGUoXG4gICAgICBhc3luYyAocXVldWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlRnVuY3Rpb24ocXVldWVJZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9LFxuICAgICAgMTAwMCxcbiAgICAgIHtcbiAgICAgICAgbGVhZGluZzogZmFsc2UsXG4gICAgICAgIHRyYWlsaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmluUXVldWVXaXRoU3RhdHVzKHF1ZXVlSWQsIFtcbiAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgIC4uLlN0YXR1c0luUXVldWUsXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICBdKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgY29uc3QgcXVlc3Rpb25zID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucXVlc3Rpb25zR2V0dGluZ0hlbHAgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKFxuICAgICAgKHF1ZXN0aW9uKSA9PiBxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucHJpb3JpdHlRdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYXN5bmMgcGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgY29uc3QgbmV3TFFSID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdMUVIsIHF1ZXN0aW9ucyk7XG5cbiAgICAgIG5ld0xRUi5xdWV1ZSA9IHF1ZXN0aW9ucy5xdWV1ZS5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgLy8gY2xhc3NUb0NsYXNzIHRyYW5zZm9ybWVyIHdpbGwgYXBwbHkgdGhlIEBFeGNsdWRlc1xuICAgICAgICByZXR1cm4gY2xhc3NUb0NsYXNzPFF1ZXN0aW9uPihcbiAgICAgICAgICBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICAgICAgc3RhdHVzOiBJbihTdGF0dXNTZW50VG9DcmVhdG9yKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV3TFFSLnByaW9yaXR5UXVldWUgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ld0xRUjtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVDb250cm9sbGVyIH0gZnJvbSAnLi9xdWV1ZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJ3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU3Vic2NyaWJlciB9IGZyb20gJy4vcXVldWUuc3Vic2NyaWJlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXVlQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIFF1ZXVlU2VydmljZSxcbiAgICBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgUXVldWVTdWJzY3JpYmVyLFxuICBdLFxuICBleHBvcnRzOiBbUXVldWVDbGVhblNlcnZpY2UsIFF1ZXVlU1NFU2VydmljZV0sXG4gIGltcG9ydHM6IFtTU0VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgR2V0UXVldWVSZXNwb25zZSxcbiAgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICBSb2xlLFxuICBVcGRhdGVRdWV1ZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgUmVzLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGUgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVldWUtcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncXVldWVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWV1ZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXVlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWV1ZShAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPEdldFF1ZXVlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gIH1cblxuICBAR2V0KCc6cXVldWVJZC9xdWVzdGlvbnMnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBxdWVzdGlvbnMsXG4gICAgICB1c2VySWQsXG4gICAgICByb2xlLFxuICAgICk7XG4gIH1cblxuICBAUGF0Y2goJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyB1cGRhdGVRdWV1ZShcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWV1ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcXVldWUubm90ZXMgPSBib2R5Lm5vdGVzO1xuICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gYm9keS5hbGxvd1F1ZXN0aW9ucztcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJzpxdWV1ZUlkL2NsZWFuJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBjbGVhblF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENsZWFuIHVwIHF1ZXVlIGlmIG5lY2Vzc2FyeVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5jbGVhblF1ZXVlKHF1ZXVlSWQsIHRydWUpO1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWVJZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5xdWV1ZVJvbGVHdWFyZC5xdWV1ZU5vdEZvdW5kKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICcuL3NzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7IHByb3ZpZGVyczogW1NTRVNlcnZpY2VdLCBleHBvcnRzOiBbU1NFU2VydmljZV0gfSlcbmV4cG9ydCBjbGFzcyBTU0VNb2R1bGUge31cbiIsImltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVldWVTdWJzY3JpYmVyIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWV1ZU1vZGVsPiB7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlKSB7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXVlTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVldWVNb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKGV2ZW50LmVudGl0eS5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSUNhbENvbW1hbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGljYWxTZXJ2aWNlOiBJY2FsU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdpY2FsOnNjcmFwZScsXG4gICAgZGVzY3JpYmU6ICdzY3JhcGUgaWNhbCBmb3IgYSBjb3Vyc2UnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5pY2FsU2VydmljZS51cGRhdGVBbGxDb3Vyc2VzKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDcm9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICBmcm9tVVJMLFxuICBDYWxlbmRhckNvbXBvbmVudCxcbiAgQ2FsZW5kYXJSZXNwb25zZSxcbiAgVkV2ZW50LFxufSBmcm9tICdub2RlLWljYWwnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwsIENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgZmluZE9uZUlhbmEgfSBmcm9tICd3aW5kb3dzLWlhbmEvZGlzdCc7XG5pbXBvcnQgJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBSUnVsZSB9IGZyb20gJ3JydWxlJztcblxudHlwZSBNb21lbnQgPSBtb21lbnQuTW9tZW50O1xuXG50eXBlIENyZWF0ZU9mZmljZUhvdXIgPSBEZWVwUGFydGlhbDxPZmZpY2VIb3VyTW9kZWw+W107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJY2FsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICAvLyB0eiBzaG91bGQgbm90IGJlIHByZWNvbnZlcnRlZCBieSBmaW5kT25lSWFuYVxuICBwcml2YXRlIGZpeE91dGxvb2tUWihkYXRlOiBNb21lbnQsIHR6OiBzdHJpbmcpOiBNb21lbnQge1xuICAgIGNvbnN0IGlhbmEgPSBmaW5kT25lSWFuYSh0eik7IC8vIEdldCBJQU5BIHRpbWV6b25lIGZyb20gd2luZG93cyB0aW1lem9uZVxuICAgIGlmIChpYW5hKSB7XG4gICAgICAvLyBNb3ZlIHRvIHRoZSB0aW1lem9uZSBiZWNhdXNlIG5vZGUtaWNhbCBkaWRuJ3QgZG8gaXQgZm9yIHVzLCBzaW5jZSBpdCBkb2VzIG5vdCByZWNvZ25pemUgd2luZG93cyB0aW1lem9uZVxuICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS50eihpYW5hLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZGF0ZSBvZiBvY2N1cmVuY2VzIGZvciBhbiBycnVsZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUsIGV4Y2x1ZGluZyB0aGUgbGlzdCBvZiBkYXRlc1xuICBwcml2YXRlIHJydWxlVG9EYXRlcyhycnVsZTogYW55LCBldmVudFRaOiBzdHJpbmcsIGV4ZGF0ZVJhdzogRGF0ZVtdKTogRGF0ZVtdIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgIGNvbnN0IGR0c3RhcnQ6IE1vbWVudCA9IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLmR0c3RhcnQpLCBldmVudFRaKTtcbiAgICBjb25zdCB1bnRpbDogTW9tZW50ID1cbiAgICAgIG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMudW50aWwpLCBldmVudFRaKTtcbiAgICBjb25zdCBldmVudFRaTW9tZW50ID0gbW9tZW50LnR6LnpvbmUoZmluZE9uZUlhbmEoZXZlbnRUWikgfHwgZXZlbnRUWik7XG5cbiAgICAvLyBHZXQgdGhlIFVUQyBPZmZzZXQgaW4gdGhpcyBldmVudCdzIHRpbWV6b25lLCBhdCB0aGlzIHRpbWUuIEFjY291bnRzIGZvciBEYXlsaWdodCBTYXZpbmdzIGFuZCBvdGhlciBvZGRpdGllc1xuICAgIGNvbnN0IHR6VVRDT2Zmc2V0T25EYXRlID0gKGRhdGU6IE1vbWVudCkgPT5cbiAgICAgIGV2ZW50VFpNb21lbnQudXRjT2Zmc2V0KGRhdGUudmFsdWVPZigpKTtcbiAgICBjb25zdCBkdHN0YXJ0VVRDT2Zmc2V0ID0gdHpVVENPZmZzZXRPbkRhdGUoZHRzdGFydCk7XG5cbiAgICAvLyBBcHBseSBhIFVUQyBvZmZzZXQgaW4gbWludXRlcyB0byB0aGUgZ2l2ZW4gTW9tZW50XG4gICAgY29uc3QgYXBwbHlPZmZzZXQgPSAoZGF0ZTogTW9tZW50LCB1dGNPZmZzZXQ6IG51bWJlcik6IE1vbWVudCA9PlxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KHV0Y09mZnNldCwgJ20nKTtcbiAgICAvLyBhcHBseSB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHByZVJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgZHRzdGFydFVUQ09mZnNldCk7XG4gICAgLy8gUmV2ZXJ0IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcG9zdFJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgLWR0c3RhcnRVVENPZmZzZXQpO1xuXG4gICAgLy8gQWRqdXN0IGZvciBycnVsZSBub3QgdGFraW5nIGludG8gYWNjb3VudCBEU1QgaW4gbG9jYWxlXG4gICAgLy8gICBpZS4gXCI4cG0gZXZlcnkgZnJpZGF5XCIgbWVhbnMgaGF2aW5nIHRvIHB1c2ggYmFjayA2MCBtaW51dGVzIGFmdGVyIEZhbGwgQmFja3dhcmRzXG4gICAgY29uc3QgZml4RFNUID0gKGRhdGU6IE1vbWVudCk6IE1vbWVudCA9PlxuICAgICAgLy8gR2V0IHRoZSBkaWZmZXJlbmNlIGluIFVUQyBvZmZzZXQgYmV0d2VlbiBkdHN0YXJ0IGFuZCB0aGlzIGRhdGUgKHNvIGlmIHdlIGNyb3NzZWQgRFNUIHN3aXRjaCwgdGhpcyB3aWxsIGJlIG5vbnplcm8pXG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QoZHRzdGFydFVUQ09mZnNldCAtIHR6VVRDT2Zmc2V0T25EYXRlKGRhdGUpLCAnbScpO1xuXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSUnVsZSh7XG4gICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICBpbnRlcnZhbDogb3B0aW9ucy5pbnRlcnZhbCxcbiAgICAgIHdrc3Q6IG9wdGlvbnMud2tzdCxcbiAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgYnl3ZWVrZGF5OiBvcHRpb25zLmJ5d2Vla2RheSxcbiAgICAgIGR0c3RhcnQ6IHByZVJSdWxlKGR0c3RhcnQpLnRvRGF0ZSgpLFxuICAgICAgdW50aWw6IHVudGlsICYmIHByZVJSdWxlKHVudGlsKS50b0RhdGUoKSxcbiAgICB9KTtcblxuICAgIC8vIERhdGVzIHRvIGV4Y2x1ZGUgZnJvbSByZWN1cnJlbmNlLCBzZXBhcmF0ZSBleGRhdGUgdGltZXN0YW1wIGZvciBmaWx0ZXJpbmdcbiAgICBjb25zdCBleGRhdGVzOiBudW1iZXJbXSA9IE9iamVjdC52YWx1ZXMoZXhkYXRlUmF3IHx8IHt9KVxuICAgICAgLm1hcCgoZCkgPT4gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KGQpLCBldmVudFRaKSlcbiAgICAgIC5tYXAoKGQpID0+IGFwcGx5T2Zmc2V0KGQsIHR6VVRDT2Zmc2V0T25EYXRlKGQpKS52YWx1ZU9mKCkpO1xuXG4gICAgLy8gRG9pbmcgbWF0aCBoZXJlIGJlY2F1c2UgbW9tZW50LmFkZCBjaGFuZ2VzIGJlaGF2aW9yIGJhc2VkIG9uIHNlcnZlciB0aW1lem9uZVxuICAgIGNvbnN0IGluMTBXZWVrcyA9IG5ldyBEYXRlKFxuICAgICAgZHRzdGFydC52YWx1ZU9mKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogNyAqIDEwLFxuICAgICk7XG4gICAgcmV0dXJuIHJ1bGVcbiAgICAgIC5hbGwoKGQpID0+ICEhdW50aWwgfHwgZCA8IGluMTBXZWVrcylcbiAgICAgIC5maWx0ZXIoKGRhdGUpID0+ICFleGRhdGVzLmluY2x1ZGVzKGRhdGUuZ2V0VGltZSgpKSlcbiAgICAgIC5tYXAoKGQpID0+IGZpeERTVChwb3N0UlJ1bGUobW9tZW50KGQpKSkudG9EYXRlKCkpO1xuICB9XG5cbiAgcGFyc2VJY2FsKGljYWxEYXRhOiBDYWxlbmRhclJlc3BvbnNlLCBjb3Vyc2VJZDogbnVtYmVyKTogQ3JlYXRlT2ZmaWNlSG91ciB7XG4gICAgY29uc3QgaWNhbERhdGFWYWx1ZXM6IEFycmF5PENhbGVuZGFyQ29tcG9uZW50PiA9IE9iamVjdC52YWx1ZXMoaWNhbERhdGEpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBpY2FsRGF0YVZhbHVlcy5maWx0ZXIoXG4gICAgICAoaUNhbEVsZW1lbnQpOiBpQ2FsRWxlbWVudCBpcyBWRXZlbnQgPT5cbiAgICAgICAgaUNhbEVsZW1lbnQudHlwZSA9PT0gJ1ZFVkVOVCcgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuc3RhcnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5lbmQgIT09IHVuZGVmaW5lZCxcbiAgICApO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNFdmVudFJlZ2V4ID0gL1xcYl4oT0h8SG91cnMpXFxiLztcblxuICAgIGNvbnN0IGZpbHRlcmVkT2ZmaWNlSG91cnMgPSBvZmZpY2VIb3Vycy5maWx0ZXIoKGV2ZW50KSA9PlxuICAgICAgb2ZmaWNlSG91cnNFdmVudFJlZ2V4LnRlc3QoZXZlbnQuc3VtbWFyeSksXG4gICAgKTtcblxuICAgIGxldCByZXN1bHRPZmZpY2VIb3VycyA9IFtdO1xuXG4gICAgZmlsdGVyZWRPZmZpY2VIb3Vycy5mb3JFYWNoKChvaDogVkV2ZW50KSA9PiB7XG4gICAgICAvLyBUaGlzIG9mZmljZSBob3VyIHRpbWV6b25lLiBBU1NVTUlORyBldmVyeSBkYXRlIGZpZWxkIGhhcyBzYW1lIHRpbWV6b25lIGFzIG9oLnN0YXJ0XG4gICAgICBjb25zdCBldmVudFRaID0gb2guc3RhcnQudHo7XG4gICAgICBjb25zdCB7IHJydWxlIH0gPSBvaCBhcyBhbnk7XG4gICAgICBpZiAocnJ1bGUpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvaC5lbmQuZ2V0VGltZSgpIC0gb2guc3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGFsbERhdGVzID0gdGhpcy5ycnVsZVRvRGF0ZXMocnJ1bGUsIGV2ZW50VFosIG9oLmV4ZGF0ZSk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZE9mZmljZUhvdXJzID0gYWxsRGF0ZXMubWFwKChkYXRlKSA9PiAoe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IGRhdGUsXG4gICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkdXJhdGlvbiksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMgPSByZXN1bHRPZmZpY2VIb3Vycy5jb25jYXQoZ2VuZXJhdGVkT2ZmaWNlSG91cnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLnN0YXJ0KSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLmVuZCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0T2ZmaWNlSG91cnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgT2ZmaWNlSG91cnMgZm9yIGEgZ2l2ZW4gQ291cnNlIGJ5IHJlc2NyYXBpbmcgaWNhbFxuICAgKiBAcGFyYW0gY291cnNlIHRvIHBhcnNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoY291cnNlOiBDb3Vyc2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYHNjcmFwaW5nIGljYWwgZm9yIGNvdXJzZSBcIiR7Y291cnNlLm5hbWV9XCIoJHtjb3Vyc2UuaWR9IGF0IHVybDogJHtjb3Vyc2UuaWNhbFVSTH0uLi5gLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb3Vyc2VJZDogY291cnNlLmlkLCByb29tOiAnT25saW5lJyB9LFxuICAgIH0pO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tOiAnT25saW5lJyxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5pZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gdGhpcy5wYXJzZUljYWwoXG4gICAgICBhd2FpdCBmcm9tVVJMKGNvdXJzZS5pY2FsVVJMKSxcbiAgICAgIGNvdXJzZS5pZCxcbiAgICApO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5kZWxldGUoeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5zYXZlKFxuICAgICAgb2ZmaWNlSG91cnMubWFwKChlKSA9PiB7XG4gICAgICAgIGUucXVldWVJZCA9IHF1ZXVlLmlkO1xuICAgICAgICByZXR1cm4gT2ZmaWNlSG91ck1vZGVsLmNyZWF0ZShlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGNvbnNvbGUubG9nKCdkb25lIHNjcmFwaW5nIScpO1xuICB9XG5cbiAgQENyb24oJzUxIDAgKiAqIConKVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlQWxsQ291cnNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY291cnNlIGljYWxzJyk7XG4gICAgY29uc3QgY291cnNlcyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmQoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb3Vyc2VzLm1hcCgoYykgPT4gdGhpcy51cGRhdGVDYWxlbmRhckZvckNvdXJzZShjKSkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWljYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luZG93cy1pYW5hL2Rpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJydWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZlN1YnNjcmliZXIgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYtc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtOb3RpZmljYXRpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgRGVza3RvcE5vdGlmU3Vic2NyaWJlciwgVHdpbGlvU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBUd2lsaW9TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFdmVudFN1YnNjcmliZXIsXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIENvbm5lY3Rpb24sXG4gIEluc2VydEV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIERlc2t0b3BOb3RpZk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PERlc2t0b3BOb3RpZk1vZGVsPikge1xuICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeURlc2t0b3AoXG4gICAgICBldmVudC5lbnRpdHksXG4gICAgICBcIllvdSd2ZSBzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIGZvciBkZXNrdG9wIG5vdGlmaWNhdGlvbnMhXCIsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXhjZXB0aW9uLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgKiBhcyB3ZWJQdXNoIGZyb20gJ3dlYi1wdXNoJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBOb3RpZk1zZ3MgPSB7XG4gIHBob25lOiB7XG4gICAgV1JPTkdfTUVTU0FHRTpcbiAgICAgICdQbGVhc2UgcmVzcG9uZCB3aXRoIGVpdGhlciBZRVMgb3IgTk8uIFRleHQgU1RPUCBhdCBhbnkgdGltZSB0byBzdG9wIHJlY2VpdmluZyB0ZXh0IG1lc3NhZ2VzJyxcbiAgICBDT1VMRF9OT1RfRklORF9OVU1CRVI6XG4gICAgICAnQ291bGQgbm90IGZpbmQgYW4gT2ZmaWNlIEhvdXJzIGFjY291bnQgd2l0aCB5b3VyIHBob25lIG51bWJlci4nLFxuICAgIFVOUkVHSVNURVI6XG4gICAgICBcIllvdSd2ZSB1bnJlZ2lzdGVyZWQgZnJvbSB0ZXh0IG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIEZlZWwgZnJlZSB0byByZS1yZWdpc3RlciBhbnkgdGltZSB0aHJvdWdoIHRoZSB3ZWJzaXRlXCIsXG4gICAgRFVQTElDQVRFOlxuICAgICAgXCJZb3UndmUgYWxyZWFkeSBiZWVuIHZlcmlmaWVkIHRvIHJlY2VpdmUgdGV4dCBub3RpZmljYXRpb25zIGZyb20gS2hvdXJ5IE9mZmljZSBIb3VycyFcIixcbiAgICBPSzpcbiAgICAgICdUaGFuayB5b3UgZm9yIHZlcmlmeWluZyB5b3VyIG51bWJlciB3aXRoIEtob3VyeSBPZmZpY2UgSG91cnMhIFlvdSBhcmUgbm93IHNpZ25lZCB1cCBmb3IgdGV4dCBub3RpZmljYXRpb25zIScsXG4gIH0sXG4gIHF1ZXVlOiB7XG4gICAgQUxFUlRfQlVUVE9OOlxuICAgICAgXCJUaGUgVEEgY291bGQndCByZWFjaCB5b3UsIHBsZWFzZSBoYXZlIE1pY3Jvc29mdCBUZWFtcyBvcGVuIGFuZCBjb25maXJtIHlvdSBhcmUgYmFjayFcIixcbiAgICBUSElSRF9QTEFDRTogYFlvdSdyZSAzcmQgaW4gdGhlIHF1ZXVlLiBCZSByZWFkeSBmb3IgYSBUQSB0byBjYWxsIHlvdSBzb29uIWAsXG4gICAgVEFfSElUX0hFTFBFRDogKHRhTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgICBgJHt0YU5hbWV9IGlzIGNvbWluZyB0byBoZWxwIHlvdSFgLFxuICAgIFJFTU9WRUQ6IGBZb3UndmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHF1ZXVlLiBQbGVhc2UgcmV0dXJuIHRvIHRoZSBhcHAgZm9yIG1vcmUgaW5mb3JtYXRpb24uYCxcbiAgfSxcbiAgdGE6IHtcbiAgICBTVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRTpcbiAgICAgICdBIHN0dWRlbnQgaGFzIGpvaW5lZCB5b3VyIChwcmV2aW91c2x5IGVtcHR5KSBxdWV1ZSEnLFxuICB9LFxufTtcblxuLy9UT0RPIHRlc3QgdGhpcyBzZXJ2aWNlIG9tZ1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBkZXNrdG9wUHVibGljS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSxcbiAgKSB7XG4gICAgd2ViUHVzaC5zZXRWYXBpZERldGFpbHMoXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdFTUFJTCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQUklWQVRFS0VZJyksXG4gICAgKTtcbiAgICB0aGlzLmRlc2t0b3BQdWJsaWNLZXkgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKTtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcChcbiAgICBpbmZvOiBEZWVwUGFydGlhbDxEZXNrdG9wTm90aWZNb2RlbD4sXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgICAvLyBjcmVhdGUgaWYgbm90IGV4aXN0XG4gICAgbGV0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQ6IGluZm8udXNlcklkLCBlbmRwb2ludDogaW5mby5lbmRwb2ludCB9LFxuICAgIH0pO1xuICAgIGlmICghZG4pIHtcbiAgICAgIGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuY3JlYXRlKGluZm8pLnNhdmUoKTtcbiAgICAgIGF3YWl0IGRuLnJlbG9hZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZG47XG4gIH1cblxuICBhc3luYyByZWdpc3RlclBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIHVzZXI6IFVzZXJNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZ1bGxOdW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHBob25lTnVtYmVyKTtcbiAgICBpZiAoIWZ1bGxOdW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5ub3RpZmljYXRpb25TZXJ2aWNlLnJlZ2lzdGVyUGhvbmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICBpZiAocGhvbmVOb3RpZk1vZGVsKSB7XG4gICAgICAvLyBQaG9uZSBudW1iZXIgaGFzIG5vdCBjaGFuZ2VkXG4gICAgICBpZiAocGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID09PSBmdWxsTnVtYmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8ganVzdCBjaGFuZ2UgaXRcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID0gZnVsbE51bWJlcjtcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHBob25lTm90aWZNb2RlbC5zYXZlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGUoe1xuICAgICAgICBwaG9uZU51bWJlcjogZnVsbE51bWJlcixcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG5cbiAgICAgIC8vIE1VVEFURSBzbyBpZiB1c2VyLnNhdmUoKSBpcyBjYWxsZWQgbGF0ZXIgaXQgZG9lc24ndCBkaXMtYXNzb2NpYXRlXG4gICAgICB1c2VyLnBob25lTm90aWYgPSBwaG9uZU5vdGlmTW9kZWw7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5ub3RpZnlQaG9uZShcbiAgICAgIHBob25lTm90aWZNb2RlbCxcbiAgICAgIFwiWW91J3ZlIHNpZ25lZCB1cCBmb3IgcGhvbmUgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gVG8gdmVyaWZ5IHlvdXIgbnVtYmVyLCBwbGVhc2UgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBZRVMuIFRvIHVuc3Vic2NyaWJlLCByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIE5PIG9yIFNUT1BcIixcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIC8vIE5vdGlmeSB1c2VyIG9uIGFsbCBwbGF0Zm9ybXNcbiAgYXN5bmMgbm90aWZ5VXNlcih1c2VySWQ6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm90aWZNb2RlbHNPZlVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczogWydkZXNrdG9wTm90aWZzJywgJ3Bob25lTm90aWYnXSxcbiAgICB9KTtcblxuICAgIC8vIHJ1biB0aGUgcHJvbWlzZXMgY29uY3VycmVudGx5XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnNFbmFibGVkKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgbm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmcy5tYXAoYXN5bmMgKG5tKSA9PlxuICAgICAgICAgIHRoaXMubm90aWZ5RGVza3RvcChubSwgbWVzc2FnZSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiAmJiBub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubm90aWZ5UGhvbmUobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiwgbWVzc2FnZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgZGVza3RvcCBub3RpZmljYXRpb25cbiAgYXN5bmMgbm90aWZ5RGVza3RvcChubTogRGVza3RvcE5vdGlmTW9kZWwsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3ZWJQdXNoLnNlbmROb3RpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlbmRwb2ludDogbm0uZW5kcG9pbnQsXG4gICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgcDI1NmRoOiBubS5wMjU2ZGgsXG4gICAgICAgICAgICBhdXRoOiBubS5hdXRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUobm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgcGhvbmUgbnVtYmVyXG4gIGFzeW5jIG5vdGlmeVBob25lKFxuICAgIHBuOiBQaG9uZU5vdGlmTW9kZWwsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZvcmNlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZm9yY2UgfHwgcG4udmVyaWZpZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5zZW5kU01TKHBuLnBob25lTnVtYmVyLCBtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2JsZW0gc2VuZGluZyBtZXNzYWdlJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeVBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcGhvbmVOb3RpZiA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHBob25lTnVtYmVyOiBwaG9uZU51bWJlciB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFwaG9uZU5vdGlmKSB7XG4gICAgICBhcG0uc2V0Q3VzdG9tQ29udGV4dCh7IHBob25lTnVtYmVyIH0pO1xuICAgICAgYXBtLmNhcHR1cmVFcnJvcihcbiAgICAgICAgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwaG9uZSBudW1iZXIgZHVyaW5nIHZlcmlmaWNhdGlvbicpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuQ09VTERfTk9UX0ZJTkRfTlVNQkVSO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSAhPT0gJ1lFUycgJiYgbWVzc2FnZSAhPT0gJ05PJyAmJiBtZXNzYWdlICE9PSAnU1RPUCcpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuV1JPTkdfTUVTU0FHRTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT09ICdOTycgfHwgbWVzc2FnZSA9PT0gJ1NUT1AnKSB7XG4gICAgICAvLyBkaWQgc29tZSBtb3JlIGRpZ2dpbmcsIFNUT1AganVzdCBzdG9wcyBtZXNzYWdlcyBjb21wbGV0ZWx5LCB3ZSdsbCBuZXZlciByZWNlaXZlIGl0XG4gICAgICAvLyBzbyB1aC4uLiB0aGVyZSdzIHByb2JhYmx5IGEgd2F5IHRvIGRvIHRoYXRcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUocGhvbmVOb3RpZik7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLlVOUkVHSVNURVI7XG4gICAgfSBlbHNlIGlmIChwaG9uZU5vdGlmLnZlcmlmaWVkKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkRVUExJQ0FURTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZi52ZXJpZmllZCA9IHRydWU7XG4gICAgICBhd2FpdCBwaG9uZU5vdGlmLnNhdmUoKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuT0s7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWItcHVzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdHdpbGlvIFNESyB0byBtYWtlIHRlc3RpbmcgZWFzaWVyLlxuICogU2hvdWxkIE5PVCBpbnRlcmFjdCB3aXRoIERCIG1vZGVscyBvciBkbyBhbnl0aGluZyBzbWFydC4gSnVzdCB3cmFwIFR3aWxpby5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR3aWxpb1NlcnZpY2Uge1xuICBwcml2YXRlIHR3aWxpb0NsaWVudDogdHdpbGlvLlR3aWxpbztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnR3aWxpb0NsaWVudCA9IHR3aWxpbyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FDQ09VTlRTSUQnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZ1bGwgcGhvbmUgbnVtYmVyIG9yIHJldHVybiBmYWxzZSBpZiBwaG9uZSBudW1iZXIgaXNuJ3QgcmVhbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZ1bGxQaG9uZU51bWJlcihcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubG9va3Vwcy5waG9uZU51bWJlcnMocGhvbmVOdW1iZXIpLmZldGNoKCkpXG4gICAgICAgIC5waG9uZU51bWJlcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGlmIHRoZSBwaG9uZSBudW1iZXIgaXMgbm90IGZvdW5kLCB0aGVuIGVuZHBvaW50IHNob3VsZCByZXR1cm4gaW52YWxpZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIFNNUyB0byBwaG9uZSBudW1iZXIgdXNpbmcgb3VyIFR3aWxpbyBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kU01TKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPUEhPTkVOVU1CRVInKSxcbiAgICAgIHRvOiBwaG9uZU51bWJlcixcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpbGlvXCIpOyIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZkJvZHksXG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBUd2lsaW9Cb2R5LFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgSGVhZGVyLFxuICBIZWFkZXJzLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdub3RpZmljYXRpb25zJylcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVza3RvcC9jcmVkZW50aWFscycpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBnZXREZXNrdG9wQ3JlZGVudGlhbHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5ub3RpZlNlcnZpY2UuZGVza3RvcFB1YmxpY0tleSk7XG4gIH1cblxuICBAUG9zdCgnZGVza3RvcC9kZXZpY2UnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IERlc2t0b3BOb3RpZkJvZHksXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZlBhcnRpYWw+IHtcbiAgICBjb25zdCBkZXZpY2UgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlckRlc2t0b3Aoe1xuICAgICAgZW5kcG9pbnQ6IGJvZHkuZW5kcG9pbnQsXG4gICAgICBleHBpcmF0aW9uVGltZTogYm9keS5leHBpcmF0aW9uVGltZSAmJiBuZXcgRGF0ZShib2R5LmV4cGlyYXRpb25UaW1lKSxcbiAgICAgIHAyNTZkaDogYm9keS5rZXlzLnAyNTZkaCxcbiAgICAgIGF1dGg6IGJvZHkua2V5cy5hdXRoLFxuICAgICAgbmFtZTogYm9keS5uYW1lLFxuICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXZpY2UuaWQsXG4gICAgICBlbmRwb2ludDogZGV2aWNlLmVuZHBvaW50LFxuICAgICAgY3JlYXRlZEF0OiBkZXZpY2UuY3JlYXRlZEF0LFxuICAgICAgbmFtZTogZGV2aWNlLm5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIEBEZWxldGUoJ2Rlc2t0b3AvZGV2aWNlLzpkZXZpY2VJZCcpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyBkZWxldGVEZXNrdG9wVXNlcihcbiAgICBAUGFyYW0oJ2RldmljZUlkJykgZGV2aWNlSWQ6IG51bWJlcixcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZCh7IGlkOiBkZXZpY2VJZCwgdXNlcklkIH0pO1xuICAgIGlmIChkbi5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUoZG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZWJob29rIGZyb20gdHdpbGlvXG4gIEBQb3N0KCcvcGhvbmUvdmVyaWZ5JylcbiAgQEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sJylcbiAgYXN5bmMgdmVyaWZ5UGhvbmVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogVHdpbGlvQm9keSxcbiAgICBASGVhZGVycygneC10d2lsaW8tc2lnbmF0dXJlJykgdHdpbGlvU2lnbmF0dXJlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGJvZHkuQm9keS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBzZW5kZXJOdW1iZXIgPSBib2R5LkZyb207XG5cbiAgICBjb25zdCB0d2lsaW9BdXRoVG9rZW4gPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKTtcblxuICAgIGNvbnN0IGlzVmFsaWRhdGVkID0gdHdpbGlvLnZhbGlkYXRlUmVxdWVzdChcbiAgICAgIHR3aWxpb0F1dGhUb2tlbixcbiAgICAgIHR3aWxpb1NpZ25hdHVyZS50cmltKCksXG4gICAgICBgJHt0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKX0vYXBpL3YxL25vdGlmaWNhdGlvbnMvcGhvbmUvdmVyaWZ5YCxcbiAgICAgIGJvZHksXG4gICAgKTtcblxuICAgIGlmICghaXNWYWxpZGF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvbkNvbnRyb2xsZXIubWVzc2FnZU5vdEZyb21Ud2lsaW8sXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VUb1VzZXIgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS52ZXJpZnlQaG9uZShcbiAgICAgIHNlbmRlck51bWJlcixcbiAgICAgIG1lc3NhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBNZXNzYWdpbmdSZXNwb25zZSA9IHR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZVRvVXNlcik7XG5cbiAgICByZXR1cm4gdHdpbWwudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9naW5Db250cm9sbGVyIH0gZnJvbSAnLi9sb2dpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vbG9naW4vand0LnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4gKHtcbiAgICAgICAgc2VjcmV0OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbSnd0U3RyYXRlZ3ksIExvZ2luQ291cnNlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFUlJPUl9NRVNTQUdFUyxcbiAgS2hvdXJ5RGF0YVBhcmFtcyxcbiAgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSxcbiAgS2hvdXJ5U3R1ZGVudENvdXJzZSxcbiAgS2hvdXJ5VEFDb3Vyc2UsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgYXBtIH0gZnJvbSAnQGVsYXN0aWMvYXBtLXJ1bSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgSnd0U2VydmljZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBodHRwU2lnbmF0dXJlIGZyb20gJ2h0dHAtc2lnbmF0dXJlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uLy4uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGxvZ2luQ291cnNlU2VydmljZTogTG9naW5Db3Vyc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgand0U2VydmljZTogSnd0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAUG9zdCgnL2tob3VyeV9sb2dpbicpXG4gIGFzeW5jIHJlY2lldmVEYXRhRnJvbUtob3VyeShcbiAgICBAUmVxKCkgcmVxOiBSZXF1ZXN0LFxuICAgIEBCb2R5KCkgYm9keTogS2hvdXJ5RGF0YVBhcmFtcyxcbiAgKTogUHJvbWlzZTxLaG91cnlSZWRpcmVjdFJlc3BvbnNlPiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIENoZWNrIHRoYXQgcmVxdWVzdCBoYXMgY29tZSBmcm9tIEtob3VyeVxuICAgICAgY29uc3QgcGFyc2VkUmVxdWVzdCA9IGh0dHBTaWduYXR1cmUucGFyc2VSZXF1ZXN0KHJlcSk7XG4gICAgICBjb25zdCB2ZXJpZnlTaWduYXR1cmUgPSBodHRwU2lnbmF0dXJlLnZlcmlmeUhNQUMoXG4gICAgICAgIHBhcnNlZFJlcXVlc3QsXG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0tIT1VSWV9QUklWQVRFX0tFWScpLFxuICAgICAgKTtcbiAgICAgIGlmICghdmVyaWZ5U2lnbmF0dXJlKSB7XG4gICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoJ0ludmFsaWQgcmVxdWVzdCBzaWduYXR1cmUnKTtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZScpO1xuICAgICAgfVxuICAgICAgLy8gVGhpcyBjaGVja3MgaWYgdGhlIHJlcXVlc3QgaXMgY29taW5nIGZyb20gb25lIG9mIHRoZSBraG91cnkgc2VydmVyc1xuICAgICAgY29uc3QgdmVyaWZ5SVAgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgICAgLmdldCgnS0hPVVJZX1NFUlZFUl9JUCcpXG4gICAgICAgIC5pbmNsdWRlcyhyZXEuaXApO1xuICAgICAgaWYgKCF2ZXJpZnlJUCkge1xuICAgICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICAgICdUaGUgSVAgb2YgdGhlIHJlcXVlc3QgZG9lcyBub3Qgc2VlbSB0byBiZSBjb21pbmcgZnJvbSB0aGUgS2hvdXJ5IHNlcnZlcicsXG4gICAgICAgICk7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBJUCBvZiB0aGUgcmVxdWVzdCBkb2VzIG5vdCBzZWVtIHRvIGJlIGNvbWluZyBmcm9tIHRoZSBLaG91cnkgc2VydmVyJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdXNlcjogVXNlck1vZGVsO1xuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogYm9keS5lbWFpbCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoeyBjb3Vyc2VzOiBbXSB9KTtcbiAgICB9XG5cbiAgICAvLyBROiBEbyB3ZSBuZWVkIHRoaXMgaWYgaXQncyBub3QgZ29pbmcgdG8gY2hhbmdlP1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHtcbiAgICAgIGVtYWlsOiBib2R5LmVtYWlsLFxuICAgICAgZmlyc3ROYW1lOiBib2R5LmZpcnN0X25hbWUsXG4gICAgICBsYXN0TmFtZTogYm9keS5sYXN0X25hbWUsXG4gICAgICBuYW1lOiBib2R5LmZpcnN0X25hbWUgKyAnICcgKyBib2R5Lmxhc3RfbmFtZSxcbiAgICAgIHBob3RvVVJMOiAnJyxcbiAgICB9KTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJDb3Vyc2VzID0gW107XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LmNvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlTdHVkZW50Q291cnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdXJzZTogQ291cnNlTW9kZWwgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgICAgICAgYy5jb3Vyc2UsXG4gICAgICAgICAgYy5zZWN0aW9uLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb3Vyc2UpIHtcbiAgICAgICAgICBjb25zdCB1c2VyQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZS5pZCxcbiAgICAgICAgICAgIFJvbGUuU1RVREVOVCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godXNlckNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkudGFfY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVRBQ291cnNlKSA9PiB7XG4gICAgICAgIC8vIFF1ZXJ5IGZvciBhbGwgdGhlIGNvdXJzZXMgd2hpY2ggbWF0Y2ggdGhlIG5hbWUgb2YgdGhlIGdlbmVyaWMgY291cnNlIGZyb20gS2hvdXJ5XG4gICAgICAgIGNvbnN0IGNvdXJzZU1hcHBpbmdzID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kKHtcbiAgICAgICAgICB3aGVyZTogeyBnZW5lcmljQ291cnNlTmFtZTogYy5jb3Vyc2UgfSwgLy8gVE9ETzogQWRkIHNlbWVzdGVyIHN1cHBvcnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBjb3Vyc2VNYXBwaW5nIG9mIGNvdXJzZU1hcHBpbmdzKSB7XG4gICAgICAgICAgY29uc3QgdGFDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlTWFwcGluZy5jb3Vyc2VJZCxcbiAgICAgICAgICAgIFJvbGUuVEEsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHRhQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgICB1c2VyLmNvdXJzZXMgPSB1c2VyQ291cnNlcztcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyhcbiAgICAgIHsgdXNlcklkOiB1c2VyLmlkIH0sXG4gICAgICB7IGV4cGlyZXNJbjogNSAqIDYwIH0sXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3Q6XG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpICsgYC9hcGkvdjEvbG9naW4vZW50cnk/dG9rZW49JHt0b2tlbn1gLFxuICAgIH07XG4gIH1cblxuICAvLyBOT1RFOiBBbHRob3VnaCB0aGUgdHdvIHJvdXRlcyBiZWxvdyBhcmUgb24gdGhlIGJhY2tlbmQsXG4gIC8vIHRoZXkgYXJlIG1lYW50IHRvIGJlIHZpc2l0ZWQgYnkgdGhlIGJyb3dzZXIgc28gYSBjb29raWUgY2FuIGJlIHNldFxuXG4gIC8vIFRoaXMgaXMgdGhlIHJlYWwgYWRtaW4gZW50cnkgcG9pbnRcbiAgQEdldCgnL2xvZ2luL2VudHJ5JylcbiAgYXN5bmMgZW50ZXJGcm9tS2hvdXJ5KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndG9rZW4nKSB0b2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpc1ZlcmlmaWVkID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnZlcmlmeUFzeW5jKHRva2VuKTtcblxuICAgIGlmICghaXNWZXJpZmllZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmp3dFNlcnZpY2UuZGVjb2RlKHRva2VuKSBhcyB7IHVzZXJJZDogbnVtYmVyIH07XG5cbiAgICB0aGlzLmVudGVyKHJlcywgcGF5bG9hZC51c2VySWQpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyBmb3IgbG9naW4gb24gZGV2ZWxvcG1lbnQgb25seVxuICBAR2V0KCcvbG9naW4vZGV2JylcbiAgQFVzZUd1YXJkcyhOb25Qcm9kdWN0aW9uR3VhcmQpXG4gIGFzeW5jIGVudGVyRnJvbURldihcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3VzZXJJZCcpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmVudGVyKHJlcywgdXNlcklkKTtcbiAgfVxuXG4gIC8vIFNldCBjb29raWUgYW5kIHJlZGlyZWN0IHRvIHByb3BlciBwYWdlXG4gIHByaXZhdGUgYXN5bmMgZW50ZXIocmVzOiBSZXNwb25zZSwgdXNlcklkOiBudW1iZXIpIHtcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKHsgdXNlcklkIH0pO1xuICAgIGNvbnN0IGlzU2VjdXJlID0gdGhpcy5jb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0PHN0cmluZz4oJ0RPTUFJTicpXG4gICAgICAuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICByZXNcbiAgICAgIC5jb29raWUoJ2F1dGhfdG9rZW4nLCBhdXRoVG9rZW4sIHsgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogaXNTZWN1cmUgfSlcbiAgICAgIC5yZWRpcmVjdCgzMDIsICcvJyk7XG4gIH1cblxuICBAR2V0KCcvbG9nb3V0JylcbiAgYXN5bmMgbG9nb3V0KEBSZXMoKSByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNsZWFyQ29va2llKCdhdXRoX3Rva2VuJywgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy9sb2dpbicpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAZWxhc3RpYy9hcG0tcnVtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHAtc2lnbmF0dXJlXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIENhbkFjdGl2YXRlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9uUHJvZHVjdGlvbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjYW5BY3RpdmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzUHJvZCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdjb3Vyc2Vfc2VjdGlvbl9tYXBwaW5nX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICAvLyBUaGlzIGlzIHRoZSBjb3Vyc2UgbmFtZSB0aGF0IGlzIHNlbnQgdG8gdXMgZnJvbSB0aGUga2hvdXJ5IGFtaW4gYmFja2VuZFxuICBAQ29sdW1uKClcbiAgZ2VuZXJpY0NvdXJzZU5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc2VjdGlvbjogbnVtYmVyO1xuXG4gIC8vIFJlcHJlc2VudHMgdGhlIGNvdXJzZSB0aGF0IHRoaXMgbWFwcyB0b1xuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJ2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ291cnNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBwdWJsaWMgYXN5bmMgY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgIGNvdXJlc05hbWU6IHN0cmluZyxcbiAgICBjb3Vyc2VTZWN0aW9uOiBudW1iZXIsXG4gICk6IFByb21pc2U8Q291cnNlTW9kZWw+IHtcbiAgICBjb25zdCBjb3Vyc2VTZWN0aW9uTW9kZWwgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGNvdXJlc05hbWUsIHNlY3Rpb246IGNvdXJzZVNlY3Rpb24gfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2UnXSxcbiAgICB9KTtcbiAgICByZXR1cm4gY291cnNlU2VjdGlvbk1vZGVsPy5jb3Vyc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY291cnNlVG9Vc2VyQ291cnNlKFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgcm9sZTogUm9sZSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdXNlckNvdXJzZTogVXNlckNvdXJzZU1vZGVsO1xuICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQsIGNvdXJzZUlkLCByb2xlIH0sXG4gICAgfSk7XG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHJvbGUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuICAgIHJldHVybiB1c2VyQ291cnNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFeHRyYWN0Snd0LCBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5pbXBvcnQgeyBQYXNzcG9ydFN0cmF0ZWd5IH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3Rvcihjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgand0RnJvbVJlcXVlc3Q6IChyZXE6IFJlcXVlc3QpID0+IHJlcS5jb29raWVzWydhdXRoX3Rva2VuJ10sXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcbiAgICAgIHNlY3JldE9yS2V5OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgIH0pO1xuICB9XG5cbiAgdmFsaWRhdGUocGF5bG9hZDogeyB1c2VySWQ6IG51bWJlciB9KTogYW55IHtcbiAgICByZXR1cm4geyAuLi5wYXlsb2FkIH07XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWp3dFwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcm9maWxlQ29udHJvbGxlciB9IGZyb20gJy4vcHJvZmlsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBjb250cm9sbGVyczogW1Byb2ZpbGVDb250cm9sbGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgR2V0UHJvZmlsZVJlc3BvbnNlLFxuICBVcGRhdGVQcm9maWxlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBHZXQsIFBhdGNoLCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdwcm9maWxlJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGdldChcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IGNvdXJzZXMgPSB1c2VyLmNvdXJzZXNcbiAgICAgIC5maWx0ZXIoKHVzZXJDb3Vyc2UpID0+IHVzZXJDb3Vyc2UuY291cnNlLmVuYWJsZWQpXG4gICAgICAubWFwKCh1c2VyQ291cnNlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY291cnNlOiB7XG4gICAgICAgICAgICBpZDogdXNlckNvdXJzZS5jb3Vyc2VJZCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXJDb3Vyc2UuY291cnNlLm5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByb2xlOiB1c2VyQ291cnNlLnJvbGUsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGRlc2t0b3BOb3RpZnM6IERlc2t0b3BOb3RpZlBhcnRpYWxbXSA9IHVzZXIuZGVza3RvcE5vdGlmcy5tYXAoXG4gICAgICAoZCkgPT4gKHtcbiAgICAgICAgZW5kcG9pbnQ6IGQuZW5kcG9pbnQsXG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBjcmVhdGVkQXQ6IGQuY3JlYXRlZEF0LFxuICAgICAgICBuYW1lOiBkLm5hbWUsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgY29uc3QgdXNlclJlc3BvbnNlID0gcGljayh1c2VyLCBbXG4gICAgICAnaWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdmaXJzdE5hbWUnLFxuICAgICAgJ2xhc3ROYW1lJyxcbiAgICAgICdwaG90b1VSTCcsXG4gICAgICAnZGVza3RvcE5vdGlmc0VuYWJsZWQnLFxuICAgICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnVzZXJSZXNwb25zZSxcbiAgICAgIGNvdXJzZXMsXG4gICAgICBwaG9uZU51bWJlcjogdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlcixcbiAgICAgIGRlc2t0b3BOb3RpZnMsXG4gICAgfTtcbiAgfVxuXG4gIEBQYXRjaCgpXG4gIGFzeW5jIHBhdGNoKFxuICAgIEBCb2R5KCkgdXNlclBhdGNoOiBVcGRhdGVQcm9maWxlUGFyYW1zLFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgdXNlciA9IE9iamVjdC5hc3NpZ24odXNlciwgdXNlclBhdGNoKTtcbiAgICB1c2VyLm5hbWUgPSB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWU7XG4gICAgaWYgKFxuICAgICAgdXNlci5waG9uZU5vdGlmc0VuYWJsZWQgJiZcbiAgICAgIHVzZXJQYXRjaC5waG9uZU51bWJlciAhPT0gdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlclxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJQaG9uZSh1c2VyUGF0Y2gucGhvbmVOdW1iZXIsIHVzZXIpO1xuICAgIH1cbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIHJldHVybiB0aGlzLmdldCh1c2VyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sbGVyIH0gZnJvbSAnLi9xdWVzdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXN0aW9uU3Vic2NyaWJlciB9IGZyb20gJy4vcXVlc3Rpb24uc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXN0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1F1ZXN0aW9uU3Vic2NyaWJlcl0sXG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGUsIFF1ZXVlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIEdldFF1ZXN0aW9uUmVzcG9uc2UsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXNLZXlzLFxuICBSb2xlLFxuICBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlciwgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Sb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWVzdGlvbi1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdxdWVzdGlvbnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXN0aW9uUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXN0aW9uSWQnKVxuICBhc3luYyBnZXRRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8R2V0UXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFJvbGUuU1RVREVOVClcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxDcmVhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvblR5cGUsIHF1ZXVlSWQsIGZvcmNlIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmludmFsaWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFxdWV1ZS5hbGxvd1F1ZXN0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5ub05ld1F1ZXN0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmNsb3NlZFF1ZXVlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1VzZXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBjcmVhdG9ySWQ6IHVzZXIuaWQsXG4gICAgICAgIHN0YXR1czogSW4oT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoISFwcmV2aW91c1VzZXJRdWVzdGlvbikge1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHByZXZpb3VzVXNlclF1ZXN0aW9uLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQ7XG4gICAgICAgIGF3YWl0IHByZXZpb3VzVXNlclF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5vbmVRdWVzdGlvbkF0QVRpbWUsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7XG4gICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIHRleHQsXG4gICAgICBxdWVzdGlvblR5cGUsXG4gICAgICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzS2V5cy5EcmFmdGluZyxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlzT25saW5lOiB0cnVlLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXN0aW9uSWQnKVxuICBAUm9sZXMoUm9sZS5TVFVERU5ULCBSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgLy8gVE9ETzogVXNlIHF1ZXVlUm9sZSBkZWNvcmF0b3IsIGJ1dCB3ZSBuZWVkIHRvIGZpeCBpdHMgcGVyZm9ybWFuY2UgZmlyc3RcbiAgYXN5bmMgdXBkYXRlUXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3F1ZXVlJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ3JlYXRvciA9IHVzZXJJZCA9PT0gcXVlc3Rpb24uY3JlYXRvcklkO1xuXG4gICAgaWYgKGlzQ3JlYXRvcikge1xuICAgICAgLy8gRmFpbCBpZiBzdHVkZW50IHRyaWVzIGFuIGludmFsaWQgc3RhdHVzIGNoYW5nZVxuICAgICAgaWYgKGJvZHkuc3RhdHVzICYmICFxdWVzdGlvbi5jaGFuZ2VTdGF0dXMoYm9keS5zdGF0dXMsIFJvbGUuU1RVREVOVCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1N0dWRlbnQnLFxuICAgICAgICAgICAgcXVlc3Rpb24uc3RhdHVzLFxuICAgICAgICAgICAgYm9keS5zdGF0dXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGNyZWF0b3IsIGNoZWNrIGlmIHVzZXIgaXMgVEEvUFJPRiBvZiBjb3Vyc2Ugb2YgcXVlc3Rpb25cbiAgICBjb25zdCBpc1RhT3JQcm9mID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVlc3Rpb24ucXVldWUuY291cnNlSWQsXG4gICAgICAgICAgcm9sZTogSW4oW1JvbGUuVEEsIFJvbGUuUFJPRkVTU09SXSksXG4gICAgICAgIH0sXG4gICAgICB9KSkgPiAwO1xuXG4gICAgaWYgKGlzVGFPclByb2YpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggIT09IDEgfHwgT2JqZWN0LmtleXMoYm9keSlbMF0gIT09ICdzdGF0dXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhT25seUVkaXRRdWVzdGlvblN0YXR1cyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFN0YXR1cyA9IHF1ZXN0aW9uLnN0YXR1cztcbiAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IGJvZHkuc3RhdHVzO1xuICAgICAgLy8gSWYgdGhlIHRhSGVscGVkIGlzIGFscmVhZHkgc2V0LCBtYWtlIHN1cmUgdGhlIHNhbWUgdGEgdXBkYXRlcyB0aGUgc3RhdHVzXG4gICAgICBpZiAocXVlc3Rpb24udGFIZWxwZWQ/LmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFIZWxwaW5nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFSZXNvbHZlZCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzQWxyZWFkeUhlbHBpbmdPbmUgPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5jb3VudCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHRhSGVscGVkSWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIHN0YXR1czogT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpID09PSAxO1xuICAgICAgaWYgKGlzQWxyZWFkeUhlbHBpbmdPbmUgJiYgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24udGFIZWxwaW5nT3RoZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkVHJhbnNpdGlvbiA9IHF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhuZXdTdGF0dXMsIFJvbGUuVEEpO1xuICAgICAgaWYgKCF2YWxpZFRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1RBJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBUQSBhcyB0YUhlbHBlZCB3aGVuIHRoZSBUQSBzdGFydHMgaGVscGluZyB0aGUgc3R1ZGVudFxuICAgICAgaWYgKFxuICAgICAgICBvbGRTdGF0dXMgIT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nICYmXG4gICAgICAgIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmdcbiAgICAgICkge1xuICAgICAgICBxdWVzdGlvbi50YUhlbHBlZCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHVzZXJJZCk7XG4gICAgICAgIHF1ZXN0aW9uLmhlbHBlZEF0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBTZXQgZmlyc3RIZWxwZWRBdCBpZiBpdCBoYXNuJ3QgYWxyZWFkeVxuICAgICAgICBpZiAoIXF1ZXN0aW9uLmZpcnN0SGVscGVkQXQpIHtcbiAgICAgICAgICBxdWVzdGlvbi5maXJzdEhlbHBlZEF0ID0gcXVlc3Rpb24uaGVscGVkQXQ7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy5xdWV1ZS5UQV9ISVRfSEVMUEVEKHF1ZXN0aW9uLnRhSGVscGVkLm5hbWUpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1N0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1cykge1xuICAgICAgICBxdWVzdGlvbi5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5sb2dpblVzZXJDYW50RWRpdCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQFBvc3QoJzpxdWVzdGlvbklkL25vdGlmeScpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgbm90aWZ5KEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZSddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuQUxFUlRfQlVUVE9OLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlJFTU9WRUQsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGxldCBxdWV1ZUlkO1xuXG4gICAgaWYgKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpO1xuICAgICAgaWYgKCFxdWVzdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVlc3Rpb25Ob3RGb3VuZCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSWQgPSBxdWVzdGlvbi5xdWV1ZUlkO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdC5ib2R5LnF1ZXVlSWQpIHtcbiAgICAgIC8vIElmIHlvdSBhcmUgY3JlYXRpbmcgYSBuZXcgcXVlc3Rpb25cbiAgICAgIHF1ZXVlSWQgPSByZXF1ZXN0LmJvZHkucXVldWVJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXVlT2ZRdWVzdGlvbk5vdEZvdW5kLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkKTtcblxuICAgIC8vIFlvdSBjYW5ub3QgaW50ZXJhY3Qgd2l0aCBhIHF1ZXN0aW9uIGluIGEgbm9uZXhpc3RlbnQgcXVldWVcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXVlRG9lc05vdEV4aXN0LFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgSW5zZXJ0RXZlbnQsXG4gIFJlbW92ZUV2ZW50LFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG5cbiAgICAvLyBTZW5kIHB1c2ggbm90aWZpY2F0aW9uIHRvIHN0dWRlbnRzIHdoZW4gdGhleSBhcmUgaGl0IDNyZCBpbiBsaW5lXG4gICAgLy8gaWYgc3RhdHVzIHVwZGF0ZWQgdG8gY2xvc2VkXG4gICAgaWYgKFxuICAgICAgZXZlbnQudXBkYXRlZENvbHVtbnMuZmluZCgoYykgPT4gYy5wcm9wZXJ0eU5hbWUgPT09ICdzdGF0dXMnKSAmJlxuICAgICAgZXZlbnQuZW50aXR5LnN0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1c1xuICAgICkge1xuICAgICAgLy8gZ2V0IDNyZCBpbiBxdWV1ZSBiZWZvcmUgYW5kIGFmdGVyIHRoaXMgdXBkYXRlXG4gICAgICBjb25zdCBwcmV2aW91c1RoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShcbiAgICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgICApXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgY29uc3QgdGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKGV2ZW50LmVudGl0eS5xdWV1ZUlkKVxuICAgICAgICAuc2V0UXVlcnlSdW5uZXIoZXZlbnQucXVlcnlSdW5uZXIpIC8vIFJ1biBpbiBzYW1lIHRyYW5zYWN0aW9uIGFzIHRoZSB1cGRhdGVcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBpZiAodGhpcmQgJiYgcHJldmlvdXNUaGlyZD8uaWQgIT09IHRoaXJkPy5pZCkge1xuICAgICAgICBjb25zdCB7IGNyZWF0b3JJZCB9ID0gdGhpcmQ7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoY3JlYXRvcklkLCBOb3RpZk1zZ3MucXVldWUuVEhJUkRfUExBQ0UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG51bWJlck9mUXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShcbiAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICkuZ2V0Q291bnQoKTtcblxuICAgIGlmIChudW1iZXJPZlF1ZXN0aW9ucyA9PT0gMCkge1xuICAgICAgY29uc3Qgc3RhZmYgPSAoXG4gICAgICAgIGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShldmVudC5lbnRpdHkucXVldWVJZCwge1xuICAgICAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICAgICAgfSlcbiAgICAgICkuc3RhZmZMaXN0O1xuXG4gICAgICBzdGFmZi5mb3JFYWNoKChzdGFmZikgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHN0YWZmLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy50YS5TVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gIH1cblxuICBhc3luYyBiZWZvcmVSZW1vdmUoZXZlbnQ6IFJlbW92ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gZHVlIHRvIGNhc2NhZGVzIGVudGl0eSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBsb2FkZWRcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTZWVkQ29udHJvbGxlciB9IGZyb20gJy4vc2VlZC5jb250cm9sbGVyJztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtTZWVkQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1NlZWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VlZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgQ291cnNlRmFjdG9yeSxcbiAgT2ZmaWNlSG91ckZhY3RvcnksXG4gIFF1ZXN0aW9uRmFjdG9yeSxcbiAgUXVldWVGYWN0b3J5LFxuICBTZW1lc3RlckZhY3RvcnksXG4gIFVzZXJDb3Vyc2VGYWN0b3J5LFxuICBVc2VyRmFjdG9yeSxcbn0gZnJvbSAnLi4vLi4vdGVzdC91dGlsL2ZhY3Rvcmllcyc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignc2VlZHMnKVxuQFVzZUd1YXJkcyhOb25Qcm9kdWN0aW9uR3VhcmQpXG5leHBvcnQgY2xhc3MgU2VlZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBzZWVkU2VydmljZTogU2VlZFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZWxldGUnKVxuICBhc3luYyBkZWxldGVBbGwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChPZmZpY2VIb3VyTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXN0aW9uTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXVlTW9kZWwpO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSByZXNldCc7XG4gIH1cblxuICBAR2V0KCdjcmVhdGUnKVxuICBhc3luYyBjcmVhdGVTZWVkcygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEZpcnN0IGRlbGV0ZSB0aGUgb2xkIGRhdGFcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZUFsbCgpO1xuXG4gICAgLy8gVGhlbiBhZGQgdGhlIG5ldyBzZWVkIGRhdGFcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgLSAyNCk7XG5cbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgdG9tb3Jyb3cuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgKyAxOSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXlPdmVybGFwID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSAtIDQ1MDAwMDApLFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDEwMDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzWWVzdGVyZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogeWVzdGVyZGF5LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUoeWVzdGVyZGF5LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9tb3Jyb3cgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB0b21vcnJvdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHRvbW9ycm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY291cnNlRXhpc3RzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICB9KTtcbiAgICBpZiAoIWNvdXJzZUV4aXN0cykge1xuICAgICAgYXdhaXQgU2VtZXN0ZXJGYWN0b3J5LmNyZWF0ZSh7IHNlYXNvbjogJ0ZhbGwnLCB5ZWFyOiAyMDIwIH0pO1xuICAgICAgYXdhaXQgQ291cnNlRmFjdG9yeS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgICAgcmVsYXRpb25zOiBbJ29mZmljZUhvdXJzJ10sXG4gICAgfSk7XG5cbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBbXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgXTtcbiAgICBjb3Vyc2Uuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckV4c2lzdHMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSgpO1xuICAgIGlmICghdXNlckV4c2lzdHMpIHtcbiAgICAgIC8vIFN0dWRlbnQgMVxuICAgICAgY29uc3QgdXNlcjEgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2xpdS5zdGFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdTdGFubGV5IExpdScsXG4gICAgICAgIGZpcnN0TmFtZTogJ1N0YW5sZXknLFxuICAgICAgICBsYXN0TmFtZTogJ0xpdScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUjIwQ0czNkUtY2YwZjM3NTI1MmJkLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIxLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBTdHVuZGVudCAyXG4gICAgICBjb25zdCB1c2VyMiA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAndGFrYXlhbWEuYUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0FsZXggVGFrYXlhbWEnLFxuICAgICAgICBmaXJzdE5hbWU6ICdBbGV4JyxcbiAgICAgICAgbGFzdE5hbWU6ICdUYWtheWFtYScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VSkw5NzQ0M0QtNTAxMjEzMzk2ODZiLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIyLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAxXG4gICAgICBjb25zdCB1c2VyMyA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnc3RlbnplbC53QG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnV2lsbCBTdGVuemVsJyxcbiAgICAgICAgZmlyc3ROYW1lOiAnV2lsbCcsXG4gICAgICAgIGxhc3ROYW1lOiAnU3RlbnplbCcsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUkYyNTZLUlQtZDEwMDk4ZTg3OWRhLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIzLFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMlxuICAgICAgY29uc3QgdXNlcjQgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2NodS5kYWpAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdEYS1KaW4gQ2h1JyxcbiAgICAgICAgZmlyc3ROYW1lOiAnRGEtSmluJyxcbiAgICAgICAgbGFzdE5hbWU6ICdDaHUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUU1Nlk1VVQxLTg1ZGI1OWE0NzRmNC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyNCxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcm9vbTogJ1dIViAxMDEnLFxuICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICBvZmZpY2VIb3VyczogW1xuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgICBdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDM1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMjUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBHZXQoJ2ZpbGxfcXVldWUnKVxuICBhc3luYyBmaWxsUXVldWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSgpO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlVXNlcicpXG4gIGFzeW5jIGNyZWF0ZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiB7IHJvbGU6IFJvbGU7IGNvdXJzZUlkOiBudW1iZXIgfSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdGE6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlLCBjb3Vyc2U6IGNvdXJzZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUgfSk7XG4gICAgfVxuICAgIHJldHVybiB0YTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWV1ZScpXG4gIGFzeW5jIGNyZWF0ZVF1ZXVlKFxuICAgIEBCb2R5KClcbiAgICBib2R5OiB7XG4gICAgICBjb3Vyc2VJZDogbnVtYmVyO1xuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG4gICAgICAvLyBjbG9zZXMgaW4gbiBtaWxsaXNlY29uZHMgZnJvbSBub3dcbiAgICAgIGNsb3Nlc0luPzogbnVtYmVyO1xuICAgIH0sXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgKGJvZHk/LmNsb3Nlc0luIHx8IDQ1MDAwMDApKSxcbiAgICB9KTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgb2ZmaWNlSG91cnM6IFtvZmZpY2VIb3Vyc10sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogYm9keS5hbGxvd1F1ZXN0aW9ucyA/PyBmYWxzZSxcbiAgICB9O1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgb3B0aW9uc1snY291cnNlJ10gPSBjb3Vyc2U7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXVlOiBRdWV1ZU1vZGVsID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZShvcHRpb25zKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVlc3Rpb24nKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpXG4gICAgYm9keToge1xuICAgICAgcXVldWVJZDogbnVtYmVyO1xuICAgICAgc3R1ZGVudElkOiBudW1iZXI7XG4gICAgICBkYXRhOiBDcmVhdGVRdWVzdGlvblBhcmFtcztcbiAgICB9LFxuICApOiBQcm9taXNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgaWYgKGJvZHkucXVldWVJZCkge1xuICAgICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5xdWV1ZUlkKTtcbiAgICAgIG9wdGlvbnNbJ3F1ZXVlJ10gPSBxdWV1ZTtcbiAgICB9XG4gICAgaWYgKGJvZHkuc3R1ZGVudElkKSB7XG4gICAgICBjb25zdCBzdHVkZW50ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5zdHVkZW50SWQpO1xuICAgICAgb3B0aW9uc1snY3JlYXRvciddID0gc3R1ZGVudDtcbiAgICB9XG4gICAgY29uc3QgcXVlc3Rpb246IFF1ZXN0aW9uTW9kZWwgPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAuLi5ib2R5LmRhdGEsXG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgeyBRdWVzdGlvblR5cGUsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAndHlwZW9ybS1mYWN0b3J5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJNb2RlbClcbiAgLmF0dHIoJ2VtYWlsJywgYHVzZXJAbmV1LmVkdWApXG4gIC5hdHRyKCduYW1lJywgYFVzZXJgKVxuICAuYXR0cignZmlyc3ROYW1lJywgJ1VzZXInKVxuICAuYXR0cigncGhvdG9VUkwnLCBgaHR0cHM6Ly9waWNzL3VzZXJgKTtcblxuZXhwb3J0IGNvbnN0IFN0dWRlbnRDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuU1RVREVOVCxcbik7XG5cbmV4cG9ydCBjb25zdCBUQUNvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5UQSxcbik7XG5cbmV4cG9ydCBjb25zdCBTZW1lc3RlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShTZW1lc3Rlck1vZGVsKVxuICAuYXR0cignc2Vhc29uJywgJ0ZhbGwnKVxuICAuYXR0cigneWVhcicsIDIwMjApO1xuXG5leHBvcnQgY29uc3QgQ2xvc2VkT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNDowMDowMC4wMDBaJykpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTU6MzA6MDAuMDAwWicpKTtcblxuZXhwb3J0IGNvbnN0IE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgLSAzNjAwMDAwKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDM2MDAwMDApKTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShDb3Vyc2VNb2RlbClcbiAgLmF0dHIoJ25hbWUnLCAnQ1MgMjUwMCcpXG4gIC5hdHRyKCdpY2FsVVJMJywgJ2h0dHA6Ly9oaS5jb20nKVxuICAuYXR0cignZW5hYmxlZCcsIHRydWUpXG4gIC5hc3NvY09uZSgnc2VtZXN0ZXInLCBTZW1lc3RlckZhY3RvcnkpXG4gIC5hc3NvY01hbnkoJ29mZmljZUhvdXJzJywgT2ZmaWNlSG91ckZhY3RvcnksIDApO1xuXG5leHBvcnQgY29uc3QgQ291cnNlU2VjdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsKVxuICAuYXR0cignZ2VuZXJpY0NvdXJzZU5hbWUnLCAnQ1MgMjUwMCcpXG4gIC5zZXF1ZW5jZSgnc2VjdGlvbicsIChpKSA9PiBpKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpO1xuXG5leHBvcnQgY29uc3QgVXNlckNvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpXG4gIC5hc3NvY09uZSgndXNlcicsIFVzZXJGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdyb2xlJywgUm9sZS5TVFVERU5UKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXVlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXVlTW9kZWwpXG4gIC5hdHRyKCdyb29tJywgJ09ubGluZScpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ2FsbG93UXVlc3Rpb25zJywgZmFsc2UpXG4gIC5hc3NvY01hbnkoJ29mZmljZUhvdXJzJywgT2ZmaWNlSG91ckZhY3RvcnkpXG4gIC5hc3NvY01hbnkoJ3N0YWZmTGlzdCcsIFVzZXJGYWN0b3J5LCAwKTtcblxuLy8gV0FSTklORzogRE8gTk9UIFVTRSBDUkVBVE9SSUQuIEFTIFlPVSBTRUUgSEVSRSwgV0UgT05MWSBBQ0NFUFQgQ1JFQVRPUlxuLy9UT0RPOiBtYWtlIGl0IGFjY2VwdCBjcmVhdG9ySWQgYXMgd2VsbFxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXN0aW9uTW9kZWwpXG4gIC5zZXF1ZW5jZSgndGV4dCcsIChpKSA9PiBgcXVlc3Rpb24gJHtpfWApXG4gIC5hdHRyKCdzdGF0dXMnLCAnUXVldWVkJylcbiAgLmF0dHIoJ3F1ZXN0aW9uVHlwZScsIFF1ZXN0aW9uVHlwZS5PdGhlcilcbiAgLmF0dHIoJ2NyZWF0ZWRBdCcsIG5ldyBEYXRlKCkpXG4gIC5hc3NvY09uZSgncXVldWUnLCBRdWV1ZUZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY3JlYXRvcicsIFVzZXJGYWN0b3J5KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm0tZmFjdG9yeVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VlZFNlcnZpY2Uge1xuICBhc3luYyBkZWxldGVBbGwobW9kZWw6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGdldENvbm5lY3Rpb24oKS5jcmVhdGVRdWVyeUJ1aWxkZXIoKS5kZWxldGUoKS5mcm9tKG1vZGVsKS5leGVjdXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEFkbWluQ29yZU1vZHVsZUZhY3RvcnksXG4gIEFkbWluQXV0aE1vZHVsZUZhY3RvcnksXG4gIERlZmF1bHRBZG1pblNpdGUsXG59IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgfSBmcm9tICcuL2NyZWRlbnRpYWxWYWxpZGF0b3InO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ291cnNlQWRtaW4sXG4gIFF1ZXVlQWRtaW4sXG4gIFVzZXJBZG1pbixcbiAgVXNlckNvdXJzZUFkbWluLFxuICBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluLFxufSBmcm9tICcuL2FkbWluLWVudGl0aWVzJztcbmltcG9ydCB7IEFkbWluQ29tbWFuZCB9IGZyb20gJy4vYWRtaW4uY29tbWFuZCc7XG5cbmNvbnN0IENvcmVNb2R1bGUgPSBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQ29yZU1vZHVsZSh7fSk7XG5jb25zdCBBdXRoTW9kdWxlID0gQWRtaW5BdXRoTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkF1dGhNb2R1bGUoe1xuICBhZG1pbkNvcmVNb2R1bGU6IENvcmVNb2R1bGUsXG4gIGNyZWRlbnRpYWxWYWxpZGF0b3I6IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciwgLy8gaG93IGRvIHlvdSB2YWxpZGF0ZSBjcmVkZW50aWFsc1xuICBpbXBvcnRzOiBbVHlwZU9ybU1vZHVsZS5mb3JGZWF0dXJlKFtBZG1pblVzZXJNb2RlbF0pXSwgLy8gd2hhdCBtb2R1bGVzIGV4cG9ydCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZSBjcmVkZW50aWFsVmFsaWRhdG9yIGF2YWlsYWJsZVxuICBwcm92aWRlcnM6IFtdLFxufSk7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQWRtaW5Db21tYW5kXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFkbWluU2l0ZTogRGVmYXVsdEFkbWluU2l0ZSkge1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlJywgQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlcicsIFVzZXJBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyQ291cnNlJywgVXNlckNvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1F1ZXVlJywgUXVldWVBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2VTZWN0aW9uTWFwcGluZycsIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtYWRtaW5cIik7IiwiaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICdiY3J5cHQnO1xuXG5leHBvcnQgY29uc3QgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yID0ge1xuICBpbmplY3Q6IFtdLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ3JlZGVudGlhbHMoXG4gICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPEFkbWluVXNlck1vZGVsPiB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgaWYgKGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKSkge1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9LFxufTtcbiIsImltcG9ydCB7IEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiwgQmFzZUVudGl0eSwgQ29sdW1uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdCc7XG5cbi8qKlxuICogQWRtaW4gdXNlcnMgYXJlIHRvdGFsbHkgc2VwYXJhdGUgZnJvbSByZWd1bGFyIHVzZXJzIGFuZCBjYW4gb25seSBiZSBjcmVhdGVkIGZyb20gY29tbWFuZCBsaW5lLlxuICogYHlhcm4gY2xpIGFkbWluOmNyZWF0ZWBcbiAqL1xuQEVudGl0eSgnYWRtaW5fdXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQWRtaW5Vc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIHNldFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBhc3N3b3JkSGFzaCA9IGhhc2hTeW5jKHBhc3N3b3JkLCA1KTtcbiAgfVxuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgdW5pcXVlOiB0cnVlLCBudWxsYWJsZTogZmFsc2UgfSlcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIG51bGxhYmxlOiBmYWxzZSB9KVxuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJpbXBvcnQgeyBBZG1pbkVudGl0eSB9IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnbmFtZSddO1xufVxuXG5leHBvcnQgY2xhc3MgUXVldWVBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gUXVldWVNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3Jvb20nLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlck1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZW1haWwnLCAnbmFtZSddO1xuICBzZWFyY2hGaWVsZHMgPSBbJ2VtYWlsJywgJ25hbWUnXTtcbiAgZmllbGRzID0gW1xuICAgICdpZCcsXG4gICAgJ2VtYWlsJyxcbiAgICAnbmFtZScsXG4gICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICAncXVldWVzJyxcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlckNvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAndXNlcklkJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZ2VuZXJpY0NvdXJzZU5hbWUnLCAnc2VjdGlvbicsICdjb3Vyc2VJZCddO1xufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCwgUG9zaXRpb25hbCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcXVlc3Rpb24sIGtleUluWU4gfSBmcm9tICdyZWFkbGluZS1zeW5jJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkbWluQ29tbWFuZCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnY3JlYXRlOmFkbWluIDx1c2VybmFtZT4nLFxuICAgIGRlc2NyaWJlOiAnY3JlYXRlIGFuIGFkbWluIHVzZXInLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoXG4gICAgQFBvc2l0aW9uYWwoe1xuICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcbiAgICAgIGRlc2NyaWJlOiAndGhlIGFkbWluIHVzZXJuYW1lJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0pXG4gICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IGNoYW5nZVBhc3N3b3JkID0ga2V5SW5ZTihcbiAgICAgICAgYFVzZXIgJHt1c2VybmFtZX0gYWxyZWFkeSBleGlzdHMuIERvIHlvdSB3YW50IHRvIGNoYW5nZSB0aGVpciBwYXNzd29yZD9gLFxuICAgICAgKTtcbiAgICAgIGlmICghY2hhbmdlUGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyID0gQWRtaW5Vc2VyTW9kZWwuY3JlYXRlKHsgdXNlcm5hbWUgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBhc3N3b3JkOiBzdHJpbmcgPSBxdWVzdGlvbignUGFzc3dvcmQ6ICcsIHtcbiAgICAgIGhpZGVFY2hvQmFjazogdHJ1ZSxcbiAgICB9KTtcbiAgICB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgQ3JlYXRlZCB1c2VyOiAke3VzZXIudXNlcm5hbWV9YCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWRsaW5lLXN5bmNcIik7IiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICAgIEV2ZW50TW9kZWwsXG4gIF0sXG4gIGtlZXBDb25uZWN0aW9uQWxpdmU6IHRydWUsXG4gIGxvZ2dpbmc6ICEhcHJvY2Vzcy5lbnYuVFlQRU9STV9MT0dHSU5HLFxuICAuLi4oISFwcm9jZXNzLmVudi5UWVBFT1JNX0NMSSA/IGluQ0xJIDoge30pLFxufTtcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9ybTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCYWNrZmlsbFBob25lTm90aWZzIH0gZnJvbSAnLi9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB9IGZyb20gJy4vcXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0LmNvbW1hbmQnO1xuaW1wb3J0IHsgQmFja2ZpbGxTZXBhcmF0ZUZpcnN0TGFzdE5hbWVzIH0gZnJvbSAnLi9zZXBhcmF0ZS1maXJzdC1sYXN0LW5hbWVzLmNvbW1hbmQnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIEJhY2tmaWxsUGhvbmVOb3RpZnMsXG4gICAgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQsXG4gICAgQmFja2ZpbGxTZXBhcmF0ZUZpcnN0TGFzdE5hbWVzLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICdub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICdub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFBob25lTm90aWZzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnBob25lLW5vdGlmcycsXG4gICAgZGVzY3JpYmU6XG4gICAgICAnZGVsZXRlIHBob25lIG5vdGlmcyB3aXRoIG5vIHVzZXJpZHMsIGRlbGV0ZSBkdXBsaWNhdGUgcGhvbmUgbm90aWZzLCBhbmQgZm9yY2libHkgc2V0IHZlcmlmaWVkIG9uIGV4aXN0aW5nIHBob25lbm90aWZzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIERlbGV0ZSB0aG9zZSB3aXRob3V0IHVzZXJpZHMgYXNzb2NpYXRlZFxuICAgIGNvbnN0IG5vVXNlciA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUoeyB1c2VySWQ6IElzTnVsbCgpIH0pO1xuICAgIGNvbnNvbGUubG9nKGBkZWxldGVkICR7bm9Vc2VyLmFmZmVjdGVkfSBkZXNrdG9wbm90aWZtb2RlbHMgd2l0aCBubyB1c2VyaWRgKTtcblxuICAgIC8vIGRlbGV0ZSBhdCBvbmNlXG4gICAgY29uc3QgdG9EZWxldGU6IFBob25lTm90aWZNb2RlbFtdID0gW107XG5cbiAgICAvLyBEZWxldGUgZHVwbGljYXRlc1xuICAgIGNvbnN0IGR1cHMgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKCdwbm90aWYnKVxuICAgICAgLnNlbGVjdChbYFwicGhvbmVOdW1iZXJcImAsICdDT1VOVCgqKSddKVxuICAgICAgLmdyb3VwQnkoJ3Bub3RpZi5waG9uZU51bWJlcicpXG4gICAgICAuaGF2aW5nKCdDT1VOVCgqKSA+IDEnKVxuICAgICAgLmdldFJhd01hbnkoKTtcbiAgICBjb25zb2xlLmxvZyhgZm91bmQgJHtkdXBzLmxlbmd0aH0gZHVwc2ApO1xuICAgIHRvRGVsZXRlLnB1c2goLi4uZHVwcyk7XG5cbiAgICBjb25zdCB2YWxpZCA9IFtdO1xuICAgIGxldCBjaGFuZ2VkTnVtID0gMDtcbiAgICAvLyBjaGFuZ2UgdG8gcmVhbCBudW1iZXJcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZCh7IHJlbGF0aW9uczogWyd1c2VyJ10gfSk7XG4gICAgZm9yIChjb25zdCBwIG9mIGFsbCkge1xuICAgICAgY29uc3QgbnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwLnBob25lTnVtYmVyKTtcbiAgICAgIGlmIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciAhPT0gcC5waG9uZU51bWJlcikge1xuICAgICAgICAgIGNoYW5nZWROdW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBwLnBob25lTnVtYmVyID0gbnVtYmVyO1xuICAgICAgICBwLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgICAgdmFsaWQucHVzaChwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvRGVsZXRlLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBUd2lsaW8gY2hhbmdlZCAke2NoYW5nZWROdW19IHBob25lIG51bWJlcnMgdG8gZnVsbCBudW1gKTtcbiAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuc2F2ZSh2YWxpZCk7XG5cbiAgICAvLyBEZWxldGUgYW5kIG1ha2Ugc3VyZSB0byBkaXNhYmxlIHBob25lbm90aWYgZm9yIHVzZXJcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdkZWxldGluZyBwaG9uZSBub3RpZnM6ICcsXG4gICAgICB0b0RlbGV0ZS5tYXAoKGQpID0+IGQucGhvbmVOdW1iZXIpLFxuICAgICk7XG4gICAgaWYgKHRvRGVsZXRlLmxlbmd0aCkge1xuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZSh0b0RlbGV0ZS5tYXAoKGQpID0+IGQuaWQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2Vyc1RvRGlzYWJsZSA9IChcbiAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kKHtcbiAgICAgICAgd2hlcmU6IHsgcGhvbmVOb3RpZnNFbmFibGVkOiB0cnVlIH0sXG4gICAgICAgIHJlbGF0aW9uczogWydwaG9uZU5vdGlmJ10sXG4gICAgICB9KVxuICAgICkuZmlsdGVyKCh1KSA9PiAhdS5waG9uZU5vdGlmKTtcbiAgICB1c2Vyc1RvRGlzYWJsZS5mb3JFYWNoKCh1KSA9PiAodS5waG9uZU5vdGlmc0VuYWJsZWQgPSBmYWxzZSkpO1xuXG4gICAgYXdhaXQgVXNlck1vZGVsLnNhdmUodXNlcnNUb0Rpc2FibGUpO1xuICAgIGNvbnNvbGUubG9nKGBkaXNhYmxlZCBwaG9uZW5vdGlmcyBmb3IgJHt1c2Vyc1RvRGlzYWJsZS5sZW5ndGh9IHVzZXJzYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0IHtcbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpxdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQnLFxuICAgIGRlc2NyaWJlOiAnY29weSBhbGwgZXhpc3RpbmcgaGVscGVkQXQgdG8gZmlyc3RIZWxwZWRBdCcsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNvcHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoKVxuICAgICAgLnVwZGF0ZSgpXG4gICAgICAuc2V0KHsgZmlyc3RIZWxwZWRBdDogKCkgPT4gJ1wiaGVscGVkQXRcIicgfSlcbiAgICAgIC53aGVyZSh7IGZpcnN0SGVscGVkQXQ6IElzTnVsbCgpIH0pXG4gICAgICAuY2FsbExpc3RlbmVycyhmYWxzZSlcbiAgICAgIC5leGVjdXRlKCk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgVXBkYXRlZCAke2F3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgICAgLnNlbGVjdCgpXG4gICAgICAgIC53aGVyZSh7IGZpcnN0SGVscGVkQXQ6IElzTnVsbCgpIH0pXG4gICAgICAgIC5nZXRDb3VudCgpfSByZWNvcmRzYCxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxTZXBhcmF0ZUZpcnN0TGFzdE5hbWVzIHtcbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpmaXJzdC1sYXN0LW5hbWVzJyxcbiAgICBkZXNjcmliZTogJ2NoYW5nZSBhbGwgbmFtZXMgdG8gZmlyc3QgYW5kIGxhc3QgbmFtZXMnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBmaXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZCgpO1xuICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHVzZXIuZmlyc3ROYW1lID0gdXNlci5uYW1lLnNwbGl0KCcgJylbMF07XG4gICAgICAgIHVzZXIubGFzdE5hbWUgPSB1c2VyLm5hbWUuc3BsaXQoJyAnKS5zbGljZSgxKS5qb2luKCcgJyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHVzZXIuZmlyc3ROYW1lID0gdXNlci5uYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgbmFtZSBmYWlsZWQgZm9yICR7dXNlci5uYW1lfWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXdhaXQgVXNlck1vZGVsLnNhdmUodXNlcnMpO1xuICAgIGNvbnN0IGNvdW50ID0gVXNlck1vZGVsLmNvdW50KCk7XG5cbiAgICBjb25zb2xlLmxvZyhgVXBkYXRlZCBuYW1lcyBmb3IgJHtjb3VudH0gdXNlcnNgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlLCBIdHRwTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB9IGZyb20gJy4vcmVsZWFzZS1ub3Rlcy5jb250cm9sbGVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUmVsZWFzZU5vdGVzQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwTW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgdXNlRmFjdG9yeTogKCkgPT4gKHtcbiAgICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgICAgbWF4UmVkaXJlY3RzOiA1LFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMsIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBIdHRwU2VydmljZSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICdsb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBDb250cm9sbGVyKCdyZWxlYXNlX25vdGVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0UmVsZWFzZU5vdGVzKCk6IFByb21pc2U8R2V0UmVsZWFzZU5vdGVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZTogR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgPSB7XG4gICAgICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudWxsLFxuICAgICAgcmVsZWFzZU5vdGVzOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5nZXQoXG4gICAgICAgICdodHRwczovL25vdGlvbi1hcGkuc3BsaXRiZWUuaW8vdjEvcGFnZS9hYmJhMjQ2YmZhMDg0N2JhYTI3MDZhYjMwZDBjNmM3ZCcsXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gICAgY29uc3QgZGF0YSA9IHJlcXVlc3QuZGF0YTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZVRleHQgPVxuICAgICAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXT8udmFsdWU/LnByb3BlcnRpZXNcbiAgICAgICAgICA/LnRpdGxlWzBdWzBdO1xuICAgICAgcmVzcG9uc2UubGFzdFVwZGF0ZWRVbml4VGltZSA9IHRpbWVUZXh0LnNwbGl0KCdVbml4ICcpWzFdICogMTAwMDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucmVsZWFzZU5vdGVzQ29udHJvbGxlci5yZWxlYXNlTm90ZXNUaW1lKGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSB0aW1lIGJsb2NrIGFuZCBwYWdlIGxpbmsgYmxvY2sgZnJvbSBwYWdlXG4gICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10udmFsdWUucHJvcGVydGllcy50aXRsZSA9IFtdO1xuICAgIGRhdGFbJzRkMjVmMzkzLWU1NzAtNGNkNS1hZDY2LWIyNzhhMDkyNDIyNSddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICByZXNwb25zZS5yZWxlYXNlTm90ZXMgPSBkYXRhO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgQXJndW1lbnRNZXRhZGF0YSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuLyoqXG4gKiBTdHJpcCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIGJvZHkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHJpcFVuZGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIG1ldGFkYXRhOiBBcmd1bWVudE1ldGFkYXRhKTogYW55IHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ2JvZHknKSB7XG4gICAgICB0aGlzLmRyb3BVbmRlZmluZWQodmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmRlZmluZWQob2JqOiB1bmtub3duKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOZXN0SW50ZXJjZXB0b3IsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIENhbGxIYW5kbGVyLFxuICBIdHRwRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICBuZXh0OiBDYWxsSGFuZGxlcixcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXhjZXB0aW9uKSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=