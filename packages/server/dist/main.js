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
        imports: [queue_module_1.QueueModule],
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
        course.heatmap = await this.heatmapService.getHeatmapFor(id);
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
    ClosedQuestionStatus["StudentCancelled"] = "StudentCancelled";
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
    student: [
        common_1.ClosedQuestionStatus.StudentCancelled,
        common_1.ClosedQuestionStatus.ConfirmedDeleted,
    ],
};
const QUESTION_STATES = {
    [common_1.OpenQuestionStatus.Drafting]: {
        student: [
            common_1.OpenQuestionStatus.Queued,
            common_1.ClosedQuestionStatus.StudentCancelled,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
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
            common_1.ClosedQuestionStatus.StudentCancelled,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.ReQueueing]: {
        student: [
            common_1.OpenQuestionStatus.PriorityQueued,
            common_1.ClosedQuestionStatus.StudentCancelled,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.TADeleted]: {
        student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
    },
    [common_1.ClosedQuestionStatus.Resolved]: {},
    [common_1.ClosedQuestionStatus.ConfirmedDeleted]: {},
    [common_1.ClosedQuestionStatus.StudentCancelled]: {},
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
    async getHeatmapFor(courseId) {
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
    async create() {
        const h = await this.getHeatmapFor(4);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'heatmap:generate',
        describe: 'generate heatmap for a course',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HeatmapService.prototype, "create", null);
HeatmapService = __decorate([
    common_2.Injectable()
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
                previousUserQuestion.status = common_1.ClosedQuestionStatus.StudentCancelled;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaGVhdG1hcC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1jb21tYW5kXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGVsYXN0aWMvYXBtLXJ1bVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvand0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cC1zaWduYXR1cmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi1jb3Vyc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vand0LnN0cmF0ZWd5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWp3dFwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3Byb2ZpbGUuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L3V0aWwvZmFjdG9yaWVzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR5cGVvcm0tZmFjdG9yeVwiIiwid2VicGFjazovLy8uL3NyYy9zZWVkL3NlZWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4ubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1hZG1pblwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jcmVkZW50aWFsVmFsaWRhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tZW50aXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhZGxpbmUtc3luY1wiIiwid2VicGFjazovLy8uL29ybWNvbmZpZy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvcXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0LmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL3NlcGFyYXRlLWZpcnN0LWxhc3QtbmFtZXMuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cmlwVW5kZWZpbmVkLnBpcGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwbS5pbnRlcmNlcHRvci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL29wZXJhdG9yc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7O0FDbEZBLHVCQUFnQztBQUNoQywyQ0FBd0M7QUFJeEMscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O0FDTHRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JCQSxtRDs7Ozs7Ozs7OztBQ0FBLHNDQUEyQztB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LEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFuQlksa0JBQWtCO0lBRDlCLG1CQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0FtQjlCO0FBbkJZLGdEQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOL0Isd0NBTXdCO0FBRXhCLDZDQUE0QztBQUM1QyxvQ0FBd0M7QUFHeEMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixTQUFTLENBQ1AsT0FBeUIsRUFDekIsSUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUN2QixzQkFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxLQUFLLFlBQVksc0JBQWEsRUFBRTtnQkFDbEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCWSxjQUFjO0lBRDFCLG1CQUFVLEVBQUU7R0FDQSxjQUFjLENBZ0IxQjtBQWhCWSx3Q0FBYzs7Ozs7OztBQ1ozQiwyQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0ICdlbGFzdGljLWFwbS1ub2RlL3N0YXJ0JztcbmltcG9ydCB7IGJvb3RzdHJhcCB9IGZyb20gJy4vYm9vdHN0cmFwJztcblxuZGVjbGFyZSBjb25zdCBtb2R1bGU6IGFueTtcblxuYm9vdHN0cmFwKG1vZHVsZS5ob3QpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZS9zdGFydFwiKTsiLCJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUGlwZSwgSU5lc3RBcHBsaWNhdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAubW9kdWxlJztcbmltcG9ydCB7IFN0cmlwVW5kZWZpbmVkUGlwZSB9IGZyb20gJy4vc3RyaXBVbmRlZmluZWQucGlwZSc7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBBcG1JbnRlcmNlcHRvciB9IGZyb20gJy4vYXBtLmludGVyY2VwdG9yJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBib290c3RyYXAoaG90OiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlKEFwcE1vZHVsZSwge1xuICAgIGxvZ2dlcjogWydlcnJvcicsICd3YXJuJywgJ2xvZycsICdkZWJ1ZycsICd2ZXJib3NlJ10sXG4gIH0pO1xuICBhZGRHbG9iYWxzVG9BcHAoYXBwKTtcbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpL3YxJyk7XG4gIGFwcC51c2VHbG9iYWxJbnRlcmNlcHRvcnMobmV3IEFwbUludGVyY2VwdG9yKCkpO1xuXG4gIGlmIChpc1Byb2QoKSkge1xuICAgIGNvbnNvbGUubG9nKGBSdW5uaW5nIHByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LmApO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFJ1bm5pbmcgbm9uLXByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LiBUSElTIE1TRyBTSE9VTEQgTk9UIEFQUEVBUiBPTiBQUk9EIFZNYCxcbiAgICApO1xuICB9XG4gIGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gIGF3YWl0IGFwcC5saXN0ZW4oMzAwMik7XG5cbiAgaWYgKGhvdCkge1xuICAgIGhvdC5hY2NlcHQoKTtcbiAgICBob3QuZGlzcG9zZSgoKSA9PiBhcHAuY2xvc2UoKSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIHRydWUgaW4gcHJvZCBhbmQgaW4gaW50ZWdyYXRpb24gdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBhZGRHbG9iYWxzVG9BcHAoYXBwOiBJTmVzdEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhcbiAgICBuZXcgVmFsaWRhdGlvblBpcGUoe1xuICAgICAgd2hpdGVsaXN0OiB0cnVlLFxuICAgICAgZm9yYmlkTm9uV2hpdGVsaXN0ZWQ6IHRydWUsXG4gICAgICB0cmFuc2Zvcm06IHRydWUsXG4gICAgfSksXG4gICk7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhuZXcgU3RyaXBVbmRlZmluZWRQaXBlKCkpO1xuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbW1vblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFNjaGVkdWxlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2R1bGUgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UubW9kdWxlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTG9naW5Nb2R1bGUgfSBmcm9tICcuL2xvZ2luL2xvZ2luLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9maWxlTW9kdWxlIH0gZnJvbSAnLi9wcm9maWxlL3Byb2ZpbGUubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kdWxlIH0gZnJvbSAnLi9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBTZWVkTW9kdWxlIH0gZnJvbSAnLi9zZWVkL3NlZWQubW9kdWxlJztcbmltcG9ydCB7IEFkbWluTW9kdWxlIH0gZnJvbSAnLi9hZG1pbi9hZG1pbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbWFuZE1vZHVsZSB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJy4vc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0ICogYXMgdHlwZW9ybUNvbmZpZyBmcm9tICcuLi9vcm1jb25maWcnO1xuaW1wb3J0IHsgQmFja2ZpbGxNb2R1bGUgfSBmcm9tICdiYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUnO1xuaW1wb3J0IHsgUmVsZWFzZU5vdGVzTW9kdWxlIH0gZnJvbSAncmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVHlwZU9ybU1vZHVsZS5mb3JSb290KHR5cGVvcm1Db25maWcpLFxuICAgIFNjaGVkdWxlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBMb2dpbk1vZHVsZSxcbiAgICBQcm9maWxlTW9kdWxlLFxuICAgIENvdXJzZU1vZHVsZSxcbiAgICBRdWV1ZU1vZHVsZSxcbiAgICBOb3RpZmljYXRpb25Nb2R1bGUsXG4gICAgUXVlc3Rpb25Nb2R1bGUsXG4gICAgU2VlZE1vZHVsZSxcbiAgICBDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBlbnZGaWxlUGF0aDogW1xuICAgICAgICAnLmVudicsXG4gICAgICAgIC4uLihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gWycuZW52LmRldmVsb3BtZW50J10gOiBbXSksXG4gICAgICBdLFxuICAgICAgaXNHbG9iYWw6IHRydWUsXG4gICAgfSksXG4gICAgQWRtaW5Nb2R1bGUsXG4gICAgQ29tbWFuZE1vZHVsZSxcbiAgICBTU0VNb2R1bGUsXG4gICAgQmFja2ZpbGxNb2R1bGUsXG4gICAgUmVsZWFzZU5vdGVzTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvdHlwZW9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3NjaGVkdWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXJzZUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvdXJzZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IElDYWxDb21tYW5kIH0gZnJvbSAnLi9pY2FsLmNvbW1hbmQnO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5pbXBvcnQgeyBIZWF0bWFwU2VydmljZSB9IGZyb20gJy4vaGVhdG1hcC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbQ291cnNlQ29udHJvbGxlcl0sXG4gIGltcG9ydHM6IFtRdWV1ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0lDYWxDb21tYW5kLCBJY2FsU2VydmljZSwgSGVhdG1hcFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBHZXRDb3Vyc2VSZXNwb25zZSxcbiAgUXVldWVQYXJ0aWFsLFxuICBSb2xlLFxuICBUQUNoZWNrb3V0UmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBnZXRSZXBvc2l0b3J5LCBNb3JlVGhhbk9yRXF1YWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEV2ZW50TW9kZWwsIEV2ZW50VHlwZSB9IGZyb20gJ3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5JztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VSb2xlc0d1YXJkIH0gZnJvbSAnLi9jb3Vyc2Utcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgSGVhdG1hcFNlcnZpY2UgfSBmcm9tICcuL2hlYXRtYXAuc2VydmljZSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbkBDb250cm9sbGVyKCdjb3Vyc2VzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBDb3Vyc2VSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWF0bWFwU2VydmljZTogSGVhdG1hcFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVCwgUm9sZS5UQSlcbiAgYXN5bmMgZ2V0KEBQYXJhbSgnaWQnKSBpZDogbnVtYmVyKTogUHJvbWlzZTxHZXRDb3Vyc2VSZXNwb25zZT4ge1xuICAgIC8vIFRPRE86IGZvciBhbGwgY291cnNlIGVuZHBvaW50LCBjaGVjayBpZiB0aGV5J3JlIGEgc3R1ZGVudCBvciBhIFRBXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZShpZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlcycsICdxdWV1ZXMuc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICAvLyBVc2UgcmF3IHF1ZXJ5IGZvciBwZXJmb3JtYW5jZSAoYXZvaWQgZW50aXR5IGluc3RhbnRpYXRpb24gYW5kIHNlcmlhbGl6YXRpb24pXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gYXdhaXQgZ2V0UmVwb3NpdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdvaCcpXG4gICAgICAuc2VsZWN0KFsnaWQnLCAndGl0bGUnLCBgXCJzdGFydFRpbWVcImAsIGBcImVuZFRpbWVcImBdKVxuICAgICAgLndoZXJlKCdvaC5jb3Vyc2VJZCA9IDpjb3Vyc2VJZCcsIHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KVxuICAgICAgLmdldFJhd01hbnkoKTtcbiAgICBjb3Vyc2UuaGVhdG1hcCA9IGF3YWl0IHRoaXMuaGVhdG1hcFNlcnZpY2UuZ2V0SGVhdG1hcEZvcihpZCk7XG5cbiAgICBjb3Vyc2UucXVldWVzID0gYXdhaXQgYXN5bmMuZmlsdGVyKFxuICAgICAgY291cnNlLnF1ZXVlcyxcbiAgICAgIGFzeW5jIChxKSA9PiBhd2FpdCBxLmNoZWNrSXNPcGVuKCksXG4gICAgKTtcbiAgICBhd2FpdCBhc3luYy5lYWNoKGNvdXJzZS5xdWV1ZXMsIGFzeW5jIChxKSA9PiB7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlVGltZXMoKTtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVTaXplKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291cnNlO1xuICB9XG5cbiAgQFBvc3QoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tJbihcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8UXVldWVQYXJ0aWFsPiB7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgcXVldWUuc3RhZmZMaXN0LnB1c2godXNlcik7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfSU4sXG4gICAgICB1c2VyLFxuICAgICAgY291cnNlSWQsXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tPdXQoXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPFRBQ2hlY2tvdXRSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG4gICAgcXVldWUuc3RhZmZMaXN0ID0gcXVldWUuc3RhZmZMaXN0LmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gdXNlci5pZCk7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gZmFsc2U7XG4gICAgfVxuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcblxuICAgIGF3YWl0IEV2ZW50TW9kZWwuY3JlYXRlKHtcbiAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICBldmVudFR5cGU6IEV2ZW50VHlwZS5UQV9DSEVDS0VEX09VVCxcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBjb25zdCBjYW5DbGVhclF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5zaG91bGRDbGVhblF1ZXVlKHF1ZXVlKTtcbiAgICBsZXQgbmV4dE9mZmljZUhvdXJUaW1lID0gbnVsbDtcblxuICAgIC8vIGZpbmQgb3V0IGhvdyBsb25nIHVudGlsIG5leHQgb2ZmaWNlIGhvdXJcbiAgICBpZiAoY2FuQ2xlYXJRdWV1ZSkge1xuICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgIGNvbnN0IG5leHRPZmZpY2VIb3VyID0gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdGFydFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSB9LFxuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgIHN0YXJ0VGltZTogJ0FTQycsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIG5leHRPZmZpY2VIb3VyVGltZSA9IG5leHRPZmZpY2VIb3VyPy5zdGFydFRpbWU7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICByZXR1cm4geyBxdWV1ZUlkOiBxdWV1ZS5pZCwgY2FuQ2xlYXJRdWV1ZSwgbmV4dE9mZmljZUhvdXJUaW1lIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcbmltcG9ydCB7XG4gIElzQm9vbGVhbixcbiAgSXNEZWZpbmVkLFxuICBJc0VudW0sXG4gIElzSW50LFxuICBJc05vdEVtcHR5LFxuICBJc09wdGlvbmFsLFxuICBJc1N0cmluZyxcbiAgVmFsaWRhdGVJZixcbn0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5leHBvcnQgY29uc3QgUFJPRF9VUkwgPSBcImh0dHBzOi8va2hvdXJ5b2ZmaWNlaG91cnMuY29tXCI7XG5leHBvcnQgY29uc3QgaXNQcm9kID0gKCk6IGJvb2xlYW4gPT5cbiAgcHJvY2Vzcy5lbnYuRE9NQUlOID09PSBQUk9EX1VSTCB8fFxuICAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3c/LmxvY2F0aW9uPy5vcmlnaW4gPT09IFBST0RfVVJMKTtcblxuLy8gVE9ETzogQ2xlYW4gdGhpcyB1cCwgbW92ZSBpdCBzb213aGVyZSBlbHNlLCB1c2UgbW9tZW50Pz8/XG4vLyBhIC0gYiwgaW4gbWludXRlc1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVEaWZmSW5NaW5zKGE6IERhdGUsIGI6IERhdGUpOiBudW1iZXIge1xuICByZXR1cm4gKGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFQSSBCYXNlIERhdGEgVHlwZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gTk9URTogVGhlc2UgYXJlIG5vdCB0aGUgREIgZGF0YSB0eXBlcy4gVGhleSBhcmUgb25seSB1c2VkIGZvciB0aGUgYXBpXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHVzZXIuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBlbWFpbCBzdHJpbmcgb2YgdGhlIHVzZXIgaWYgdGhleSBwcm92aWRlIGl0IChudWxsYWJsZSlcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqIEBwYXJhbSBjb3Vyc2VzIC0gVGhlIGxpc3Qgb2YgY291cnNlcyB0aGF0IHRoZSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCAoYXMgZWl0aGVyIGEgJ3N0dWRlbnQnLCAndGEnIG9yICdwcm9mZXNzb3InKVxuICogQHBhcmFtIGRlc2t0b3BOb3RpZnMgLSBsaXN0IG9mIGVuZHBvaW50cyBzbyB0aGF0IGZyb250ZW5kIGNhbiBmaWd1cmUgb3V0IGlmIGRldmljZSBpcyBlbmFibGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsITogc3RyaW5nO1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIGxhc3ROYW1lPzogc3RyaW5nO1xuICBuYW1lITogc3RyaW5nO1xuICBwaG90b1VSTCE6IHN0cmluZztcbiAgY291cnNlcyE6IFVzZXJDb3Vyc2VbXTtcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERlc2t0b3BOb3RpZlBhcnRpYWwpXG4gIGRlc2t0b3BOb3RpZnMhOiBEZXNrdG9wTm90aWZQYXJ0aWFsW107XG5cbiAgcGhvbmVOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcbiAgcGhvbmVOdW1iZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVuZHBvaW50ITogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBwYXJ0aWFsIHVzZXIgaW5mbyBuZWVkZWQgYnkgdGhlIGZyb250ZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICovXG5leHBvcnQgY2xhc3MgVXNlclBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWw/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob3RvVVJMPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWFsIGNvdXJzZSBkYXRhIG5lZWRlZCBvbiB0aGUgZnJvbnQgZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKi9cbmV4cG9ydCB0eXBlIENvdXJzZVBhcnRpYWwgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSB0aGF0IGEgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggYW5kIHRoZWlyIHJvbGUgaW4gdGhhdCBjb3Vyc2VcbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoZSB1c2VyIGFjY29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSByb2xlIC0gVGhlIHVzZXIncyByb2xlIGluIHRoZSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCB0eXBlIFVzZXJDb3Vyc2UgPSB7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9sZTogUm9sZTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgdXNlciByb2xlcyBpbiBhIGNvdXJzZS5cbiAqL1xuZXhwb3J0IGVudW0gUm9sZSB7XG4gIFNUVURFTlQgPSBcInN0dWRlbnRcIixcbiAgVEEgPSBcInRhXCIsXG4gIFBST0ZFU1NPUiA9IFwicHJvZmVzc29yXCIsXG59XG5cbmNsYXNzIE9mZmljZUhvdXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHRpdGxlITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZSE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZSE6IERhdGU7XG59XG5cbi8qKlxuICogQSBRdWV1ZSB0aGF0IHN0dWRlbnRzIGNhbiBqb2luIHdpdGggdGhpZXIgdGlja2V0cy5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhhdCB0aGlzIG9mZmljZSBob3VycyBxdWV1ZSBpcyBmb3IuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gcXVlc3Rpb25zIC0gVGhlIGxpc3Qgb2YgdGhlIHN0dWRlbnRzIHF1ZXN0aW9ucyBhc3NvY2FpdGVkIHdpdGggdGhlIHF1ZXVlLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb29tOiBzdHJpbmc7XG4gIHN0YWZmTGlzdDogVXNlclBhcnRpYWxbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBzdGFydFRpbWU/OiBEYXRlO1xuICBlbmRUaW1lPzogRGF0ZTtcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWV1ZSBwYXJ0aWFsIHRvIGJlIHNob3duIG9uIHRoZSB0b2RheSBwYWdlLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZVBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgcm9vbSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgc3RhZmZMaXN0ITogVXNlclBhcnRpYWxbXTtcblxuICBxdWV1ZVNpemUhOiBudW1iZXI7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBpc09wZW4hOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZT86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZT86IERhdGU7XG5cbiAgYWxsb3dRdWVzdGlvbnMhOiBib29sZWFuO1xufVxuXG4vLyBSZXByZXNlbnRzIGEgbGlzdCBvZiBvZmZpY2UgaG91cnMgd2FpdCB0aW1lcyBvZiBlYWNoIGhvdXIgb2YgdGhlIHdlZWsuXG4vLyBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgYXJyYXkgaXMgdGhlIHdhaXQgdGltZSBmb3IgdGhlIGZpcnN0IGhvdXIgb2YgU3VuZGF5LCBVVEMuXG4vLyAgIFVzZXJzIG9mIHRoZSBoZWF0bWFwIHNob3VsZCByb3RhdGUgaXQgYWNjb3JkaW5nIHRvIHRoZWlyIHRpbWV6b25lLlxuLy8gSU5WQVJJQU5UOiBNdXN0IGhhdmUgMjQqNyBlbGVtZW50c1xuLy9cbi8vIFdhaXQgdGltZSA9IC0xIHJlcHJlc2VudHMgbm8gb2ZmaWNlIGhvdXJzIGRhdGEgYXQgdGhhdCB0aW1lLlxuZXhwb3J0IHR5cGUgSGVhdG1hcCA9IEFycmF5PG51bWJlcj47XG5cbi8qKlxuICogQSBRdWVzdGlvbiBpcyBjcmVhdGVkIHdoZW4gYSBzdHVkZW50IHdhbnRzIGhlbHAgZnJvbSBhIFRBLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgc3R1ZGVudCBxdWVzdGlvbi5cbiAqIEBwYXJhbSBjcmVhdG9yIC0gVGhlIFN0dWRlbnQgdGhhdCBoYXMgY3JlYXRlZCB0aGUgcXVlc3Rpb24uXG4gKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IGRlc2NyaXRpcG4gb2Ygd2hhdCBoZS9zaGUgbmVlZHMgaGVscCB3aXRoLlxuICogQHBhcmFtIGNyZWF0ZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVGlja2V0IHdhcyBjcmVhdGVkLiBFeDogXCIyMDIwLTA5LTEyVDEyOjAwOjAwLTA0OjAwXCJcbiAqIEBwYXJhbSBoZWxwZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgYmVnYW4gaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBjbG9zZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgZmluaXNoZWQgaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBxdWVzdGlvblR5cGUgLSBUaGUgcXVlc3Rpb24gdHlwZSBoZWxwcyBkaXN0aW5ndWlzaCBxdWVzdGlvbiBmb3IgVEEncyBhbmQgZGF0YSBpbnNpZ2h0cy5cbiAqIEBwYXJhbSBzdGF0dXMgLSBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoaXMgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJ0aWN1bGFyIHN0dWRlbnQsIHRvIGhlbHAgVEEncyBmaW5kIHRoZW1cbiAqIEBwYXJhbSBpc09ubGluZSAtIFdldGhlciBvciBub3QgdGhlIHF1ZXN0aW9uIHdpbGwgaGVscGVkIG9ubGluZSBvciBpbi1wZXJzb25cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIHtcbiAgaWQhOiBudW1iZXI7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIGNyZWF0b3IhOiBVc2VyUGFydGlhbDtcbiAgdGV4dD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgdGFIZWxwZWQ/OiBVc2VyUGFydGlhbDtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGhlbHBlZEF0PzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjbG9zZWRBdD86IERhdGU7XG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcbiAgc3RhdHVzITogUXVlc3Rpb25TdGF0dXM7XG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuICBpc09ubGluZT86IGJvb2xlYW47XG59XG5cbi8vIFF1ZXN0aW9uIFR5cGVzXG5leHBvcnQgZW51bSBRdWVzdGlvblR5cGUge1xuICBDb25jZXB0ID0gXCJDb25jZXB0XCIsXG4gIENsYXJpZmljYXRpb24gPSBcIkNsYXJpZmljYXRpb25cIixcbiAgVGVzdGluZyA9IFwiVGVzdGluZ1wiLFxuICBCdWcgPSBcIkJ1Z1wiLFxuICBTZXR1cCA9IFwiU2V0dXBcIixcbiAgT3RoZXIgPSBcIk90aGVyXCIsXG59XG5cbmV4cG9ydCBlbnVtIE9wZW5RdWVzdGlvblN0YXR1cyB7XG4gIERyYWZ0aW5nID0gXCJEcmFmdGluZ1wiLFxuICBRdWV1ZWQgPSBcIlF1ZXVlZFwiLFxuICBIZWxwaW5nID0gXCJIZWxwaW5nXCIsXG4gIFByaW9yaXR5UXVldWVkID0gXCJQcmlvcml0eVF1ZXVlZFwiLFxufVxuXG4vKipcbiAqIExpbWJvIHN0YXR1c2VzIGFyZSBhd2FpdGluZyBzb21lIGNvbmZpcm1hdGlvbiBmcm9tIHRoZSBzdHVkZW50XG4gKi9cbmV4cG9ydCBlbnVtIExpbWJvUXVlc3Rpb25TdGF0dXMge1xuICBDYW50RmluZCA9IFwiQ2FudEZpbmRcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgc3R1ZGVudCBjYW4ndCBiZSBmb3VuZCBieSBhIFRBXG4gIFJlUXVldWVpbmcgPSBcIlJlUXVldWVpbmdcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgVEEgd2FudHMgdG8gZ2V0IGJhY2sgdG8gYSBzdHVkZW50IGxhdGVyIGFuZCBnaXZlIHRoZW0gdGhlIG9wdGlvbiB0byBiZSBwdXQgaW50byB0aGUgcHJpb3JpdHkgcXVldWVcbiAgVEFEZWxldGVkID0gXCJUQURlbGV0ZWRcIiwgLy8gV2hlbiBhIFRBIGRlbGV0ZXMgYSBxdWVzdGlvbiBmb3IgYSBtdWx0aXR1ZGUgb2YgcmVhc29uc1xufVxuXG5leHBvcnQgZW51bSBDbG9zZWRRdWVzdGlvblN0YXR1cyB7XG4gIFJlc29sdmVkID0gXCJSZXNvbHZlZFwiLFxuICBEZWxldGVkRHJhZnQgPSBcIkRlbGV0ZWREcmFmdFwiLFxuICBDb25maXJtZWREZWxldGVkID0gXCJDb25maXJtZWREZWxldGVkXCIsXG4gIFN0dWRlbnRDYW5jZWxsZWQgPSBcIlN0dWRlbnRDYW5jZWxsZWRcIixcbiAgU3RhbGUgPSBcIlN0YWxlXCIsXG59XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblF1ZXVlID0gW1xuICBPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG5dO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlID0gW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNTZW50VG9DcmVhdG9yID0gW1xuICAuLi5TdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIC4uLlN0YXR1c0luUXVldWUsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuXTtcblxuLy8gVGlja2V0IFN0YXR1cyAtIFJlcHJlc2VudHMgYSBnaXZlbiBzdGF0dXMgb2YgYXMgc3R1ZGVudCdzIHRpY2tldFxuZXhwb3J0IHR5cGUgUXVlc3Rpb25TdGF0dXMgPSBrZXlvZiB0eXBlb2YgUXVlc3Rpb25TdGF0dXNLZXlzO1xuLy8gYW4gRW51bS1saWtlIGNvbnN0YW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBzdGF0dXNlcyBmb3IgY29udmVuaWVuY2UuXG5leHBvcnQgY29uc3QgUXVlc3Rpb25TdGF0dXNLZXlzID0ge1xuICAuLi5PcGVuUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkNsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICAuLi5MaW1ib1F1ZXN0aW9uU3RhdHVzLFxufTtcblxuLyoqXG4gKiBBIFNlbWVzdGVyIG9iamVjdCwgcmVwcmVzZW50aW5nIGEgc2NoZWR1bGUgc2VtZXN0ZXIgdGVybSBmb3IgdGhlIHB1cnBvc2VzIG9mIGEgY291cnNlLlxuICogQHBhcmFtIHNlYXNvbiAtIFRoZSBzZWFzb24gb2YgdGhpcyBzZW1lc3Rlci5cbiAqIEBwYXJhbSB5ZWFyIC0gVGhlIHllYXIgb2YgdGhpcyBzZW1lc3Rlci5cbiAqL1xuaW50ZXJmYWNlIFNlbWVzdGVyIHtcbiAgc2Vhc29uOiBTZWFzb247XG4gIHllYXI6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aGUgc2Vhc29ucyBpbiB3aGljaCBhIGNvdXJzZSBjYW4gdGFrZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2Vhc29uID0gXCJGYWxsXCIgfCBcIlNwcmluZ1wiIHwgXCJTdW1tZXIgMVwiIHwgXCJTdW1tZXIgMlwiO1xuXG5leHBvcnQgdHlwZSBEZXNrdG9wTm90aWZCb2R5ID0ge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBleHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAga2V5czoge1xuICAgIHAyNTZkaDogc3RyaW5nO1xuICAgIGF1dGg6IHN0cmluZztcbiAgfTtcbiAgbmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFBob25lTm90aWZCb2R5ID0ge1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PSBBUEkgUm91dGUgVHlwZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPbiBiYWNrZW5kLCB2YWxpZGF0ZWQgd2l0aCBodHRwczovL2RvY3MubmVzdGpzLmNvbS90ZWNobmlxdWVzL3ZhbGlkYXRpb25cbi8vIEFQSSByb3V0ZSBQYXJhbXMgYW5kIFJlc3BvbnNlc1xuXG4vLyBPZmZpY2UgSG91cnMgUmVzcG9uc2UgVHlwZXNcbmV4cG9ydCBjbGFzcyBHZXRQcm9maWxlUmVzcG9uc2UgZXh0ZW5kcyBVc2VyIHt9XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlEYXRhUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgZW1haWwhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgZmlyc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBsYXN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzSW50KClcbiAgY2FtcHVzITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzU3RyaW5nKClcbiAgcGhvdG9fdXJsITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIGNvdXJzZXMhOiBLaG91cnlTdHVkZW50Q291cnNlW107XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgdGFfY291cnNlcyE6IEtob3VyeVRBQ291cnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlTdHVkZW50Q291cnNlIHtcbiAgQElzSW50KClcbiAgY3JuITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWNjZWxlcmF0ZWQhOiBib29sZWFuO1xuXG4gIEBJc0ludCgpXG4gIHNlY3Rpb24hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgdGl0bGUhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlUQUNvdXJzZSB7XG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLaG91cnlSZWRpcmVjdFJlc3BvbnNlIHtcbiAgcmVkaXJlY3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVQYXJhbXMge1xuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBAVmFsaWRhdGVJZigobykgPT4gby5waG9uZU5vdGlmc0VuYWJsZWQpXG4gIEBJc1N0cmluZygpXG4gIEBJc05vdEVtcHR5KClcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsYXN0TmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVJlc3BvbnNlIHtcbiAgaWQhOiBudW1iZXI7XG4gIG5hbWUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gT2ZmaWNlSG91clBhcnRpYWwpXG4gIG9mZmljZUhvdXJzITogQXJyYXk8T2ZmaWNlSG91clBhcnRpYWw+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXVlUGFydGlhbClcbiAgcXVldWVzITogUXVldWVQYXJ0aWFsW107XG5cbiAgaGVhdG1hcCE6IEhlYXRtYXAgfCBmYWxzZTtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXVlUmVzcG9uc2UgZXh0ZW5kcyBRdWV1ZVBhcnRpYWwge31cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVF1ZXVlc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVldWVQYXJ0aWFsPiB7fVxuXG5leHBvcnQgY2xhc3MgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlIHtcbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHlvdXJRdWVzdGlvbj86IFF1ZXN0aW9uO1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWVzdGlvbnNHZXR0aW5nSGVscCE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHByaW9yaXR5UXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgdGV4dCE6IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgcXVldWVJZCE6IG51bWJlcjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgZm9yY2UhOiBib29sZWFuO1xufVxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVldWVJZD86IG51bWJlcjtcblxuICBASXNFbnVtKFF1ZXN0aW9uU3RhdHVzS2V5cylcbiAgQElzT3B0aW9uYWwoKVxuICBzdGF0dXM/OiBRdWVzdGlvblN0YXR1cztcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IHR5cGUgVEFVcGRhdGVTdGF0dXNSZXNwb25zZSA9IFF1ZXVlUGFydGlhbDtcbmV4cG9ydCB0eXBlIFF1ZXVlTm90ZVBheWxvYWRUeXBlID0ge1xuICBub3Rlczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFRBQ2hlY2tvdXRSZXNwb25zZSB7XG4gIC8vIFRoZSBJRCBvZiB0aGUgcXVldWUgd2UgY2hlY2tlZCBvdXQgb2ZcbiAgcXVldWVJZCE6IG51bWJlcjtcbiAgY2FuQ2xlYXJRdWV1ZSE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgbmV4dE9mZmljZUhvdXJUaW1lPzogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXVlUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBub3Rlcz86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWxsb3dRdWVzdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU1NFUXVldWVSZXNwb25zZSB7XG4gIHF1ZXVlPzogR2V0UXVldWVSZXNwb25zZTtcbiAgcXVlc3Rpb25zPzogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0JvZHkge1xuICBUb0NvdW50cnk6IHN0cmluZztcbiAgVG9TdGF0ZTogc3RyaW5nO1xuICBTbXNNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIE51bU1lZGlhOiBzdHJpbmc7XG4gIFRvQ2l0eTogc3RyaW5nO1xuICBGcm9tWmlwOiBzdHJpbmc7XG4gIFNtc1NpZDogc3RyaW5nO1xuICBGcm9tU3RhdGU6IHN0cmluZztcbiAgU21zU3RhdHVzOiBzdHJpbmc7XG4gIEZyb21DaXR5OiBzdHJpbmc7XG4gIEJvZHk6IHN0cmluZztcbiAgRnJvbUNvdW50cnk6IHN0cmluZztcbiAgVG86IHN0cmluZztcbiAgVG9aaXA6IHN0cmluZztcbiAgTnVtU2VnbWVudHM6IHN0cmluZztcbiAgTWVzc2FnZVNpZDogc3RyaW5nO1xuICBBY2NvdW50U2lkOiBzdHJpbmc7XG4gIEZyb206IHN0cmluZztcbiAgQXBpVmVyc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIHtcbiAgcmVsZWFzZU5vdGVzOiB1bmtub3duO1xuICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9NRVNTQUdFUyA9IHtcbiAgcXVlc3Rpb25Db250cm9sbGVyOiB7XG4gICAgY3JlYXRlUXVlc3Rpb246IHtcbiAgICAgIGludmFsaWRRdWV1ZTogXCJQb3N0ZWQgdG8gYW4gaW52YWxpZCBxdWV1ZVwiLFxuICAgICAgbm9OZXdRdWVzdGlvbnM6IFwiUXVldWUgbm90IGFsbG93aW5nIG5ldyBxdWVzdGlvbnNcIixcbiAgICAgIGNsb3NlZFF1ZXVlOiBcIlF1ZXVlIGlzIGNsb3NlZFwiLFxuICAgICAgb25lUXVlc3Rpb25BdEFUaW1lOiBcIllvdSBjYW4ndCBjcmVhdGUgbW9yZSB0aGFuIG9uZSBxdWVzdGlvbiBhdCBhIHRpbWUuXCIsXG4gICAgfSxcbiAgICB1cGRhdGVRdWVzdGlvbjoge1xuICAgICAgZnNtVmlvbGF0aW9uOiAoXG4gICAgICAgIHJvbGU6IHN0cmluZyxcbiAgICAgICAgcXVlc3Rpb25TdGF0dXM6IHN0cmluZyxcbiAgICAgICAgYm9keVN0YXR1czogc3RyaW5nXG4gICAgICApOiBzdHJpbmcgPT5cbiAgICAgICAgYCR7cm9sZX0gY2Fubm90IGNoYW5nZSBzdGF0dXMgZnJvbSAke3F1ZXN0aW9uU3RhdHVzfSB0byAke2JvZHlTdGF0dXN9YCxcbiAgICAgIHRhT25seUVkaXRRdWVzdGlvblN0YXR1czogXCJUQS9Qcm9mZXNzb3JzIGNhbiBvbmx5IGVkaXQgcXVlc3Rpb24gc3RhdHVzXCIsXG4gICAgICBvdGhlclRBSGVscGluZzogXCJBbm90aGVyIFRBIGlzIGN1cnJlbnRseSBoZWxwaW5nIHdpdGggdGhpcyBxdWVzdGlvblwiLFxuICAgICAgb3RoZXJUQVJlc29sdmVkOiBcIkFub3RoZXIgVEEgaGFzIGFscmVhZHkgcmVzb2x2ZWQgdGhpcyBxdWVzdGlvblwiLFxuICAgICAgdGFIZWxwaW5nT3RoZXI6IFwiVEEgaXMgYWxyZWFkeSBoZWxwaW5nIHNvbWVvbmUgZWxzZVwiLFxuICAgICAgbG9naW5Vc2VyQ2FudEVkaXQ6IFwiTG9nZ2VkLWluIHVzZXIgZG9lcyBub3QgaGF2ZSBlZGl0IGFjY2Vzc1wiLFxuICAgIH0sXG4gIH0sXG4gIGxvZ2luQ29udHJvbGxlcjoge1xuICAgIHJlY2VpdmVEYXRhRnJvbUtob3VyeTogXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBtZXNzYWdlTm90RnJvbVR3aWxpbzogXCJNZXNzYWdlIG5vdCBmcm9tIFR3aWxpb1wiLFxuICB9LFxuICBub3RpZmljYXRpb25TZXJ2aWNlOiB7XG4gICAgcmVnaXN0ZXJQaG9uZTogXCJwaG9uZSBudW1iZXIgaW52YWxpZFwiLFxuICB9LFxuICBxdWVzdGlvblJvbGVHdWFyZDoge1xuICAgIHF1ZXN0aW9uTm90Rm91bmQ6IFwiUXVlc3Rpb24gbm90IGZvdW5kXCIsXG4gICAgcXVldWVPZlF1ZXN0aW9uTm90Rm91bmQ6IFwiQ2Fubm90IGZpbmQgcXVldWUgb2YgcXVlc3Rpb25cIixcbiAgICBxdWV1ZURvZXNOb3RFeGlzdDogXCJUaGlzIHF1ZXVlIGRvZXMgbm90IGV4aXN0IVwiLFxuICB9LFxuICBxdWV1ZVJvbGVHdWFyZDoge1xuICAgIHF1ZXVlTm90Rm91bmQ6IFwiUXVldWUgbm90IGZvdW5kXCIsXG4gIH0sXG4gIHJlbGVhc2VOb3Rlc0NvbnRyb2xsZXI6IHtcbiAgICByZWxlYXNlTm90ZXNUaW1lOiAoZTogYW55KTogc3RyaW5nID0+XG4gICAgICBcIkVycm9yIFBhcnNpbmcgcmVsZWFzZSBub3RlcyB0aW1lOiBcIiArIGUsXG4gIH0sXG4gIHJvbGVHdWFyZDoge1xuICAgIG5vdExvZ2dlZEluOiBcIk11c3QgYmUgbG9nZ2VkIGluXCIsXG4gICAgbm9Db3Vyc2VJZEZvdW5kOiBcIk5vIGNvdXJzZWlkIGZvdW5kXCIsXG4gICAgbm90SW5Db3Vyc2U6IFwiTm90IEluIFRoaXMgQ291cnNlXCIsXG4gICAgbXVzdEJlUm9sZVRvSm9pbkNvdXJzZTogKHJvbGVzOiBzdHJpbmdbXSk6IHN0cmluZyA9PlxuICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXCIsIFwiKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybVwiKTsiLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRXZlbnQgaW4gdGhlIEV2ZW50TW9kZWwgdGFibGUsIHVzZWQgZm9yIGFkdmFuY2VkIG1ldHJpY3MuXG4gKi9cbmV4cG9ydCBlbnVtIEV2ZW50VHlwZSB7XG4gIFRBX0NIRUNLRURfSU4gPSAndGFDaGVja2VkSW4nLFxuICBUQV9DSEVDS0VEX09VVCA9ICd0YUNoZWNrZWRPdXQnLFxufVxuXG5ARW50aXR5KCdldmVudF9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRXZlbnRNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHRpbWU6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogRXZlbnRUeXBlIH0pXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLmV2ZW50cylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEhlYXRtYXAgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSBpbiB0aGUgY29udGV4dCBvZiBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKiBAcGFyYW0gc2VtZXN0ZXIgLSBUaGUgc2VtZXN0ZXIgb2YgdGhpcyBjb3Vyc2UuXG4gKi9cbi8qaW50ZXJmYWNlIENvdXJzZSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgc2VtZXN0ZXI6IFNlbWVzdGVyO1xuICAgIHVzZXJzOiBVc2VyQ291cnNlW11cbn0qL1xuXG5ARW50aXR5KCdjb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2guY291cnNlKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEuY291cnNlKVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgaWNhbFVSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VyQ291cnNlczogVXNlckNvdXJzZU1vZGVsO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFNlbWVzdGVyTW9kZWwsIChzZW1lc3RlcikgPT4gc2VtZXN0ZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnc2VtZXN0ZXJJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBzZW1lc3RlcjogU2VtZXN0ZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICAvLyBUT0RPOiBjYW4gd2UgbWFrZSB0aGVzZSBub3QgbnVsbGFibGUgYW5kIHdvcmsgd2l0aCBUeXBlT1JNXG4gIHNlbWVzdGVySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCdib29sZWFuJywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBlbmFibGVkOiBib29sZWFuOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgZ2l2ZW4gdGhlIGNvdXJzZSBpcyB1c2luZyBvdXIgYXBwXG5cbiAgLy8gVGhlIGhlYXRtYXAgaXMgZmFsc2Ugd2hlbiB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgcXVlc3Rpb25zIGFza2VkIHlldCBvciB0aGVyZSBoYXZlbnQgYmVlbiBhbnkgb2ZmaWNlIGhvdXJzXG4gIGhlYXRtYXA6IEhlYXRtYXAgfCBmYWxzZTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICBldmVudHM6IEV2ZW50TW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIE9uZVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbGFzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LnVzZXIpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnZGVza3RvcF9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBleHBpcmF0aW9uVGltZTogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcDI1NmRoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGF1dGg6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmRlc2t0b3BOb3RpZnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7IHR5cGU6ICd0aW1lc3RhbXAnIH0pXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ3RleHQnLCBudWxsYWJsZTogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3Bob25lX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBQaG9uZU5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5waG9uZU5vdGlmKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHZlcmlmaWVkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBKb2luVGFibGUsXG4gIExlc3NUaGFuT3JFcXVhbCxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBNb3JlVGhhbk9yRXF1YWwsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcblxuaW50ZXJmYWNlIFRpbWVJbnRlcnZhbCB7XG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcbn1cblxuQEVudGl0eSgncXVldWVfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UucXVldWVzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICByb29tOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVlc3Rpb25Nb2RlbCwgKHFtKSA9PiBxbS5xdWV1ZSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBub3Rlczogc3RyaW5nO1xuXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnF1ZXVlcylcbiAgQEpvaW5UYWJsZSgpXG4gIHN0YWZmTGlzdDogVXNlck1vZGVsW107XG5cbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuXG4gIEBFeGNsdWRlKClcbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLnF1ZXVlKVxuICBASm9pblRhYmxlKClcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcblxuICBpc09wZW46IGJvb2xlYW47XG5cbiAgYXN5bmMgY2hlY2tJc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuc3RhZmZMaXN0ICYmIHRoaXMuc3RhZmZMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IE1TX0lOX01JTlVURSA9IDYwMDAwO1xuICAgIGNvbnN0IG9ocyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCBvcGVuID0gISFvaHMuZmluZChcbiAgICAgIChlKSA9PlxuICAgICAgICBlLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxMCAqIE1TX0lOX01JTlVURSA8IG5vdy5nZXRUaW1lKCkgJiZcbiAgICAgICAgZS5lbmRUaW1lLmdldFRpbWUoKSArIDEgKiBNU19JTl9NSU5VVEUgPiBub3cuZ2V0VGltZSgpLFxuICAgICk7XG4gICAgdGhpcy5pc09wZW4gPSBvcGVuO1xuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcXVldWVTaXplOiBudW1iZXI7XG5cbiAgYXN5bmMgYWRkUXVldWVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVTaXplID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZSh0aGlzLmlkKS5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSwgUm9sZSwgU3RhdHVzSW5RdWV1ZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnLi9xdWVzdGlvbi1mc20nO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBmaXJzdCBoZWxwZWQgKGRvZXNuJ3Qgb3ZlcndyaXRlKVxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBmaXJzdEhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBsYXN0IGhlbHBlZCAoZ2V0dGluZyBoZWxwIGFnYWluIG9uIHByaW9yaXR5IHF1ZXVlIG92ZXJ3cml0ZXMpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICAvLyBXaGVuIHRoZSBxdWVzdGlvbiBsZWF2ZXMgdGhlIHF1ZXVlXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjbG9zZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWVzdGlvblR5cGU6IFF1ZXN0aW9uVHlwZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc3RhdHVzOiBRdWVzdGlvblN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbG9jYXRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBhcyB0aGUgZ2l2ZW4gcm9sZVxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIHN0YXR1cyBjaGFuZ2Ugc3VjY2VlZGVkXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU3RhdHVzKG5ld1N0YXR1czogUXVlc3Rpb25TdGF0dXMsIHJvbGU6IFJvbGUpOiBib29sZWFuIHtcbiAgICBpZiAoY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXModGhpcy5zdGF0dXMsIG5ld1N0YXR1cywgcm9sZSkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHN0YXR1c2VzOiBRdWVzdGlvblN0YXR1c1tdLFxuICApOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlcyxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXN0aW9ucyB0aGF0IGFyZSBvcGVuIGluIHRoZSBxdWV1ZSAobm90IGluIHByaW9yaXR5IHF1ZXVlKVxuICAgKi9cbiAgc3RhdGljIHdhaXRpbmdJblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgU3RhdHVzSW5RdWV1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgICB0YTogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkRlbGV0ZWREcmFmdF0sXG4gIH0sXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkXTogUVVFVUVfVFJBTlNJVElPTlMsXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXToge1xuICAgIHRhOiBbXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kLFxuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCxcbiAgICBdLFxuICAgIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmRdOiB7XG4gICAgc3R1ZGVudDogW1xuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdOiB7XG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWRdOiB7fSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdOiB7fSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWRdOiB7fSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5EZWxldGVkRHJhZnRdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJ2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgTGVzc1RoYW5PckVxdWFsLCBNb3JlVGhhbk9yRXF1YWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zLm1hcCgocXVldWUpID0+IHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCkpLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmIChmb3JjZSB8fCAhKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdWxkIHdlIGNvbnNpZGVyIGNsZWFuaW5nIHRoZSBxdWV1ZT9cbiAgLy8gIENoZWNrcyBpZiB0aGVyZSBhcmUgbm8gc3RhZmYsIG9wZW4gcXVlc3Rpb25zIGFuZCB0aGF0IHRoZXJlIGFyZW4ndCBhbnkgb2ZmaWNlIGhvdXJzIHNvb25cbiAgcHVibGljIGFzeW5jIHNob3VsZENsZWFuUXVldWUocXVldWU6IFF1ZXVlTW9kZWwpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTGFzdCBUQSB0byBjaGVja291dCwgc28gY2hlY2sgaWYgd2UgbWlnaHQgd2FudCB0byBjbGVhciB0aGUgcXVldWVcbiAgICAgIGNvbnN0IGFyZUFueVF1ZXN0aW9uc09wZW4gPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgICAgICBxdWV1ZS5pZCxcbiAgICAgICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAgICkuZ2V0Q291bnQoKSkgPiAwO1xuICAgICAgaWYgKGFyZUFueVF1ZXN0aW9uc09wZW4pIHtcbiAgICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgICAgY29uc3QgYXJlT2ZmaWNlSG91clNvb24gPVxuICAgICAgICAgIChhd2FpdCBPZmZpY2VIb3VyTW9kZWwuY291bnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiBMZXNzVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICAgIGVuZFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpID4gMDtcbiAgICAgICAgaWYgKCFhcmVPZmZpY2VIb3VyU29vbikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBbXG4gICAgICAuLi5PYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAuLi5PYmplY3QudmFsdWVzKExpbWJvUXVlc3Rpb25TdGF0dXMpLFxuICAgIF0pLmdldE1hbnkoKTtcblxuICAgIHF1ZXN0aW9ucy5mb3JFYWNoKChxOiBRdWVzdGlvbk1vZGVsKSA9PiB7XG4gICAgICBxLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlO1xuICAgICAgcS5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUocXVlc3Rpb25zKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXJzZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vdExvZ2dlZEluKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvdXJzZUlkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vQ291cnNlSWRGb3VuZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hSb2xlcyhyb2xlcywgdXNlciwgY291cnNlSWQpO1xuICB9XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm90SW5Db3Vyc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm11c3RCZVJvbGVUb0pvaW5Db3Vyc2Uocm9sZXMpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtYWluaW5nLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBIZWF0bWFwLCB0aW1lRGlmZkluTWlucyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpblJhbmdlLCBtZWFuLCByYW5nZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBNb3JlVGhhbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuXG5mdW5jdGlvbiBhcnJheVJvdGF0ZShhcnIsIGNvdW50KSB7XG4gIGNvdW50IC09IGFyci5sZW5ndGggKiBNYXRoLmZsb29yKGNvdW50IC8gYXJyLmxlbmd0aCk7XG4gIGNvbnN0IHNwbGljZWQgPSBhcnIuc3BsaWNlKDAsIGNvdW50KTtcbiAgcmV0dXJuIFsuLi5hcnIsIC4uLnNwbGljZWRdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhdG1hcFNlcnZpY2Uge1xuICBhc3luYyBnZXRIZWF0bWFwRm9yKGNvdXJzZUlkOiBudW1iZXIpOiBQcm9taXNlPEhlYXRtYXAgfCBmYWxzZT4ge1xuICAgIC8vIFRoZSBudW1iZXIgb2YgbWludXRlcyB0byBhdmVyYWdlIGFjcm9zc1xuICAgIGNvbnN0IEJVQ0tFVF9TSVpFX0lOX01JTlMgPSAxNTtcbiAgICAvLyBOdW1iZXIgb2Ygc2FtcGxlcyB0byBnYXRoZXIgcGVyIGJ1Y2tldFxuICAgIGNvbnN0IFNBTVBMRVNfUEVSX0JVQ0tFVCA9IDM7XG4gICAgY29uc29sZS50aW1lKCdoZWF0bWFwJyk7XG4gICAgY29uc3QgcmVjZW50ID0gbW9tZW50KCkuc3VidHJhY3QoOCwgJ3dlZWtzJykudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5xdWV1ZScsICdxdWV1ZScpXG4gICAgICAud2hlcmUoJ3F1ZXVlLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgPSA6c3RhdHVzJywge1xuICAgICAgICBzdGF0dXM6IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkLFxuICAgICAgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uaGVscGVkQXQgSVMgTk9UIE5VTEwnKVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5jcmVhdGVkQXQgPiA6cmVjZW50JywgeyByZWNlbnQgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJylcbiAgICAgIC5nZXRNYW55KCk7XG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW4ocmVjZW50KSwgY291cnNlSWQgfSxcbiAgICB9KTtcblxuICAgIGlmIChvZmZpY2VIb3Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eiA9ICdBbWVyaWNhL05ld19Zb3JrJztcbiAgICBsZXQgaGVhdG1hcCA9IHRoaXMuX2dlbmVyYXRlSGVhdE1hcFdpdGhSZXBsYXkoXG4gICAgICAvLyBJZ25vcmUgcXVlc3Rpb25zIHRoYXQgY3Jvc3MgbWlkbmlnaHQgKHVzdWFsbHkgYSBmbHVrZSlcbiAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoKHEpID0+IHEuaGVscGVkQXQuZ2V0RGF0ZSgpID09PSBxLmNyZWF0ZWRBdC5nZXREYXRlKCkpLFxuICAgICAgb2ZmaWNlSG91cnMsXG4gICAgICB0eixcbiAgICAgIEJVQ0tFVF9TSVpFX0lOX01JTlMsXG4gICAgICBTQU1QTEVTX1BFUl9CVUNLRVQsXG4gICAgKTtcbiAgICBoZWF0bWFwID0gYXJyYXlSb3RhdGUoXG4gICAgICBoZWF0bWFwLFxuICAgICAgLW1vbWVudC50ei56b25lKHR6KS51dGNPZmZzZXQoRGF0ZS5ub3coKSkgLyBCVUNLRVRfU0laRV9JTl9NSU5TLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKCdoZWF0bWFwJyk7XG4gICAgcmV0dXJuIGhlYXRtYXA7XG4gIH1cblxuICAvLyBQUklWQVRFIGZ1bmN0aW9uIHRoYXQgaXMgcHVibGljIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIC8vIFJld2luZCB0aHJvdWdoIHRoZSBsYXN0IGZldyB3ZWVrcyBhbmQgZm9yIGVhY2ggdGltZSBpbnRlcnZhbCxcbiAgLy8gZmlndXJlIG91dCBob3cgbG9uZyB3YWl0IHRpbWUgd291bGQgaGF2ZSBiZWVuIGlmIHlvdSBoYWQgam9pbmVkIHRoZSBxdWV1ZSBhdCB0aGF0IHRpbWVcbiAgLy8gVGltZXpvbmUgc2hvdWxkIGJlIElBTkFcbiAgLy8gUmV0dXJucyBoZWF0bWFwIGluIHRoZSB0aW1lem9uZSAoaWUgM3JkIGJ1Y2tldCBpcyAzYW0gaW4gdGhhdCB0aW1lem9uZSlcbiAgX2dlbmVyYXRlSGVhdE1hcFdpdGhSZXBsYXkoXG4gICAgcXVlc3Rpb25zOiBRdWVzdGlvbk1vZGVsW10sXG4gICAgaG91cnM6IE9mZmljZUhvdXJNb2RlbFtdLFxuICAgIHRpbWV6b25lOiBzdHJpbmcsXG4gICAgYnVja2V0U2l6ZTogbnVtYmVyLFxuICAgIHNhbXBsZXNQZXJCdWNrZXQ6IG51bWJlcixcbiAgKTogSGVhdG1hcCB7XG4gICAgY29uc3Qgc2FtcGxlSW50ZXJ2YWwgPSBidWNrZXRTaXplIC8gc2FtcGxlc1BlckJ1Y2tldDtcbiAgICAvKlxuICAgIFRFU1Q6IFF1ZXN0aW9uMSBpcyAgMzowNSAtIDM6MjVcbiAgICAvLyBUaGUgbmV4dCBxdWVzdGlvbiBpcyAzOjIxIC0gMzo0OVxuICAgIFRIZSBmb2xsb3dpbmcgcXVlc3Rpb24gaXMgNDowNSAtIDQ6MTBcbiAgICBcbiAgICBCdWNrZXQgPSA2MCwgU2FtcGxlcyA9IDMsIHNvIHRpbWVwb2ludHMgYXJlOiAzOjAwLCAzOjIwLCAzOjQwLlxuXG4gICAgMzoyMCBzYW1wbGUgZ2V0cyB3YWl0dGltZSBvZiA1IG1pbnV0ZXNcbiAgICAzOjQwIHNhbXBsZXMgZ2V0IHdhaXR0aW1lcyBvZiA5IG1pbnV0ZXNcbiAgICA0OjAwIHNhbXBsZSBnZXRzIHdhaXR0aW1lIG9mIDAgbWludXRlc1xuXG5cbiAgICBJZiBpIGVudGVyZWQgdGhlIHF1ZXVlIGF0IHRoYXQgdGltZSB3aGVuIHNob3VsZCBJIGhhdmUgZ290dGVuIGhlbHA/XG4gICAgRXZlcnkgaW50ZXJ2YWwgb2YgbWludXRlcyBmb3IgdGhlIHBhc3QgNSB3ZWVrcyBhcmUgYWdncmVnYXRlZCAoYnkgdGFraW5nIHRoZSBhdmcpXG4gICAgXG4gICAgYW5hbHl6ZSB0aGUgYnVja2V0cyB0byBmaW5kIHRoZSBjbG9zZXN0IHRpbWUgYXBwcm94aW1hdGlvblxuXG4gICAgbG9vayBhdCBxdWVzdGlvbiBRMSBhbmQgdGhlIG5leHQgcXVlc3Rpb24gUTJcbiAgICBmb3IgYWxsIHNhbXBsZSB0aW1lcG9pbnRzIGJldHdlZW4gUTEuY3JlYXRlZEF0IGFuZCBRMi5jcmVhdGVkQXQ6XG4gICAgICAgLSBzYW1wbGUgPSBRMS5jbG9zZWRBdCAtIHRpbWVwb2ludCAoaWYgbmVnYXRpdmUsIHRoZW4gaXQncyAwKVxuICAgICovXG5cbiAgICBjb25zdCBob3VyVGltZXN0YW1wczogW251bWJlciwgbnVtYmVyXVtdID0gaG91cnMubWFwKChob3VycykgPT4gW1xuICAgICAgaG91cnMuc3RhcnRUaW1lLmdldFRpbWUoKSxcbiAgICAgIGhvdXJzLmVuZFRpbWUuZ2V0VGltZSgpLFxuICAgIF0pO1xuXG4gICAgZnVuY3Rpb24gZGF0ZVRvQnVja2V0KGRhdGU6IERhdGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgICAgLy8gcGFyc2UgaW4gem9uZSB0byBoYW5kbGUgZGF5bGlnaHQgc2F2aW5ncyBieSBnZXR0aW5nIGRheS9ob3VyL21pbnV0ZSB3aXRoaW4gdGhhdCBJQU5BIHpvbmVcbiAgICAgIGNvbnN0IGNJblpvbmUgPSBtb21lbnQudHooZGF0ZSwgdGltZXpvbmUpO1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoXG4gICAgICAgIChjSW5ab25lLmRheSgpICogMjQgKiA2MCArIGNJblpvbmUuaG91cigpICogNjAgKyBjSW5ab25lLm1pbnV0ZSgpKSAvXG4gICAgICAgICAgYnVja2V0U2l6ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVwb2ludEJ1Y2tldHM6IG51bWJlcltdW10gPSBbXG4gICAgICAuLi5BcnJheSgoMjQgKiA3ICogNjApIC8gYnVja2V0U2l6ZSksXG4gICAgXS5tYXAoKCkgPT4gW10pO1xuXG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHF1ZXN0aW9uc1swXS5jcmVhdGVkQXQ7XG4gICAgICBjb25zdCBzdW5kYXkgPSBtb21lbnQudHooc3RhcnREYXRlLCB0aW1lem9uZSkuc3RhcnRPZignd2VlaycpLnRvRGF0ZSgpO1xuXG4gICAgICBmdW5jdGlvbiBnZXROZXh0VGltZXBvaW50SW5kZXgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVEaWZmSW5NaW5zKGRhdGUsIHN1bmRheSkgLyBzYW1wbGVJbnRlcnZhbCkgKyAxO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIGRhdGUgb2YgdGhlIHNhbXBsZSB0aW1lcG9pbnQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGdpdmVuIGRhdGVcbiAgICAgIGZ1bmN0aW9uIGdldE5leHRTYW1wbGVUaW1lcG9pbnQoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgICAgICBjb25zdCB0aW1lcG9pbnRJbmRleCA9IGdldE5leHRUaW1lcG9pbnRJbmRleChkYXRlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICAgIHN1bmRheS5nZXRUaW1lKCkgKyB0aW1lcG9pbnRJbmRleCAqIHNhbXBsZUludGVydmFsICogNjAgKiAxMDAwLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgYWxsIHRpbWVwb2ludHMgYmV0d2VlbiB0aGUgdHdvIGRhdGVzXG4gICAgICBmdW5jdGlvbiBnZXRTYW1wbGVUaW1lcG9pbnRzSW5EYXRlUmFuZ2UoXG4gICAgICAgIGRhdGUxOiBEYXRlLFxuICAgICAgICBkYXRlMjogRGF0ZSxcbiAgICAgICk6IERhdGVbXSB7XG4gICAgICAgIGNvbnN0IHJldCA9IFtdO1xuICAgICAgICBsZXQgY3VyciA9IGdldE5leHRTYW1wbGVUaW1lcG9pbnQoZGF0ZTEpO1xuICAgICAgICB3aGlsZSAoY3Vyci5nZXRUaW1lKCkgPCBkYXRlMi5nZXRUaW1lKCkpIHtcbiAgICAgICAgICByZXQucHVzaChjdXJyKTtcbiAgICAgICAgICBjdXJyID0gZ2V0TmV4dFNhbXBsZVRpbWVwb2ludChjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIGN1cnJlbnQgYnVja2V0XG4gICAgICBmdW5jdGlvbiBsYXN0QnVja2V0Qm91bmRhcnkoZGF0ZTogRGF0ZSk6IG1vbWVudC5Nb21lbnQge1xuICAgICAgICBjb25zdCBzdGFydE9mV2VlayA9IG1vbWVudC50eihkYXRlLCB0aW1lem9uZSkuc3RhcnRPZignd2VlaycpO1xuICAgICAgICBjb25zdCBtID0gbW9tZW50KGRhdGUpO1xuICAgICAgICByZXR1cm4gbS5zdWJ0cmFjdChtLmRpZmYoc3RhcnRPZldlZWssICdtJykgJSBidWNrZXRTaXplLCAnbScpO1xuICAgICAgfVxuXG4gICAgICAvLyBnbyB0d28gcXVlc3Rpb25zIGF0IGEgdGltZVxuICAgICAgbGV0IGlzRmlyc3QgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VyciA9IHF1ZXN0aW9uc1tpXTtcbiAgICAgICAgY29uc3QgbmV4dCA9IHF1ZXN0aW9uc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGkgPT09IHF1ZXN0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXBvaW50cyBpbiBiZXR3ZWVuXG4gICAgICAgIGxldCBzYW1wbGVkVGltZXBvaW50cyA9IGdldFNhbXBsZVRpbWVwb2ludHNJbkRhdGVSYW5nZShcbiAgICAgICAgICBpc0ZpcnN0XG4gICAgICAgICAgICA/IGxhc3RCdWNrZXRCb3VuZGFyeShjdXJyLmNyZWF0ZWRBdClcbiAgICAgICAgICAgICAgICAuc3VidHJhY3QoMSwgJ3MnKSAvLyBzbyB0aGF0IHdlIGdldCB0aGUgZmlyc3QgdGltZXBvaW50XG4gICAgICAgICAgICAgICAgLnRvRGF0ZSgpXG4gICAgICAgICAgICA6IGN1cnIuY3JlYXRlZEF0LFxuICAgICAgICAgIGlzTGFzdFxuICAgICAgICAgICAgPyBsYXN0QnVja2V0Qm91bmRhcnkoY3Vyci5oZWxwZWRBdClcbiAgICAgICAgICAgICAgICAuYWRkKGJ1Y2tldFNpemUsICdtJykgLy8gdG8gZ2V0IHRoZSBuZXh0QnVja2V0Qm91bmRhcnlcbiAgICAgICAgICAgICAgICAudG9EYXRlKClcbiAgICAgICAgICAgIDogbmV4dC5jcmVhdGVkQXQsXG4gICAgICAgICk7XG4gICAgICAgIHNhbXBsZWRUaW1lcG9pbnRzID0gc2FtcGxlZFRpbWVwb2ludHMuZmlsdGVyKCh0aW1lKSA9PlxuICAgICAgICAgIGhvdXJUaW1lc3RhbXBzLnNvbWUoKFtzdGFydCwgZW5kXSkgPT5cbiAgICAgICAgICAgIGluUmFuZ2UodGltZS5nZXRUaW1lKCksIHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gUGFkIHRoZSBmaXJzdCBidWNrZXQgd2l0aCB6ZXJvcyB0byBhY2NvdW50IGZvciB0aW1lcG9pbnRzIGJlZm9yZSB0aGUgZmlyc3RcbiAgICAgICAgaWYgKHNhbXBsZWRUaW1lcG9pbnRzLmxlbmd0aCA+IDAgJiYgaXNGaXJzdCkge1xuICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHdlIHdvdWxkIGhhdmUgaHlwb3RoZXRpY2FsbHkgZ290dGVuIGhlbHAgYXQgdGhpcyB0aW1lcG9pbnRcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHNhbXBsZWRUaW1lcG9pbnRzKSB7XG4gICAgICAgICAgbGV0IHdhaXQgPSAwO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGluUmFuZ2UoXG4gICAgICAgICAgICAgIGMuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBjdXJyLmNyZWF0ZWRBdC5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIGN1cnIuaGVscGVkQXQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FpdCA9IChjdXJyLmhlbHBlZEF0LmdldFRpbWUoKSAtIGMuZ2V0VGltZSgpKSAvIDYwMDAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGJ1Y2tldEluZGV4ID0gZGF0ZVRvQnVja2V0KGMpO1xuICAgICAgICAgIHRpbWVwb2ludEJ1Y2tldHNbYnVja2V0SW5kZXhdLnB1c2god2FpdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXZXJlIHRoZXJlIGV2ZXIgb2ZmaWNlIGhvdXJzIGluIHRoaXMgYnVja2V0P1xuICAgIGNvbnN0IHdlcmVIb3Vyc0R1cmluZ0J1Y2tldDogYm9vbGVhbltdID0gW1xuICAgICAgLi4uQXJyYXkoKDI0ICogNyAqIDYwKSAvIGJ1Y2tldFNpemUpLFxuICAgIF07XG4gICAgZm9yIChjb25zdCBbc3RhcnQsIGVuZF0gb2YgaG91clRpbWVzdGFtcHMpIHtcbiAgICAgIC8vcHJldmVudHMgYW4gb2ZmaWNlIGhvdXIgZnJvbSBbTiwgTV0gdG8gcmVnaXN0ZXIgaW4gbXVsdGlwbGUgYnVja2V0c1xuICAgICAgZm9yIChjb25zdCBpIG9mIHJhbmdlKGRhdGVUb0J1Y2tldChzdGFydCksIGRhdGVUb0J1Y2tldChlbmQgLSAxKSArIDEpKSB7XG4gICAgICAgIHdlcmVIb3Vyc0R1cmluZ0J1Y2tldFtpXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaDogSGVhdG1hcCA9IHRpbWVwb2ludEJ1Y2tldHMubWFwKChzYW1wbGVzLCBpKSA9PiB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBtZWFuKHNhbXBsZXMpO1xuICAgICAgfSBlbHNlIGlmICh3ZXJlSG91cnNEdXJpbmdCdWNrZXRbaV0pIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGg7XG4gIH1cblxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2hlYXRtYXA6Z2VuZXJhdGUnLFxuICAgIGRlc2NyaWJlOiAnZ2VuZXJhdGUgaGVhdG1hcCBmb3IgYSBjb3Vyc2UnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaCA9IGF3YWl0IHRoaXMuZ2V0SGVhdG1hcEZvcig0KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1jb21tYW5kXCIpOyIsImltcG9ydCB7IFJvbGUsIFNTRVF1ZXVlUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICdzc2Uvc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgeyByZXMsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLy8gU2VuZCBldmVudCB3aXRoIG5ldyBxdWVzdGlvbnMsIGJ1dCBubyBtb3JlIHRoYW4gb25jZSBhIHNlY29uZFxuICB1cGRhdGVRdWVzdGlvbnMgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIGlmIChxdWVzdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCBhc3luYyAoeyByb2xlLCB1c2VySWQgfSkgPT4gKHtcbiAgICAgICAgcXVlc3Rpb25zOiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgICAgICBxdWV1ZUlkLFxuICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgcm9sZSxcbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZVF1ZXVlID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKCkgPT4gKHsgcXVldWUgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVG9Sb29tKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBkYXRhOiAobWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEpID0+IFByb21pc2U8U1NFUXVldWVSZXNwb25zZT4sXG4gICkge1xuICAgIGF3YWl0IHRoaXMuc3NlU2VydmljZS5zZW5kRXZlbnQoaWRUb1Jvb20ocXVldWVJZCksIGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsZVVwZGF0ZSh1cGRhdGVGdW5jdGlvbjogKHF1ZXVlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIHJldHVybiB0aHJvdHRsZShcbiAgICAgIGFzeW5jIChxdWV1ZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVGdW5jdGlvbihxdWV1ZUlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAge1xuICAgICAgICBsZWFkaW5nOiBmYWxzZSxcbiAgICAgICAgdHJhaWxpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWVudDxUPiB7XG4gIG1ldGFkYXRhOiBUO1xuICByZXM6IFJlc3BvbnNlO1xufVxuLyoqXG4gKiBUIGlzIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCBlYWNoIENsaWVudFxuICpcbiAqIExvdyBsZXZlbCBhYnN0cmFjdGlvbiBmb3Igc2VuZGluZyBTU0UgdG8gXCJyb29tc1wiIG9mIGNsaWVudHMuXG4gKiBQcm9iYWJseSBkb24ndCB1c2UgdGhpcyBkaXJlY3RseSwgYW5kIHdyYXAgaXQgaW4gYSBzZXJ2aWNlIHNwZWNpZmljIHRvIHRoYXQgZXZlbnQgc291cmNlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTU0VTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBjbGllbnRzOiBSZWNvcmQ8YW55LCBDbGllbnQ8VD5bXT4gPSB7fTtcblxuICAvKiogQWRkIGEgY2xpZW50IHRvIGEgcm9vbSAqL1xuICBzdWJzY3JpYmVDbGllbnQocm9vbTogc3RyaW5nLCBjbGllbnQ6IENsaWVudDxUPik6IHZvaWQge1xuICAgIC8vIEtlZXAgdHJhY2sgb2YgcmVzcG9uc2VzIHNvIHdlIGNhbiBzZW5kIHNzZSB0aHJvdWdoIHRoZW1cbiAgICBpZiAoIShyb29tIGluIHRoaXMuY2xpZW50cykpIHtcbiAgICAgIHRoaXMuY2xpZW50c1tyb29tXSA9IFtdO1xuICAgIH1cbiAgICBjb25zdCByb29tcmVmID0gdGhpcy5jbGllbnRzW3Jvb21dO1xuICAgIHJvb21yZWYucHVzaChjbGllbnQpO1xuXG4gICAgLy8gUmVtb3ZlIGRlYWQgY29ubmVjdGlvbnMhXG4gICAgY2xpZW50LnJlcy5zb2NrZXQub24oJ2VuZCcsICgpID0+IHtcbiAgICAgIHJvb21yZWYuc3BsaWNlKHJvb21yZWYuaW5kZXhPZihjbGllbnQpLCAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTZW5kIHNvbWUgZGF0YSB0byBldmVyeW9uZSBpbiBhIHJvb20gKi9cbiAgYXN5bmMgc2VuZEV2ZW50PEQ+KFxuICAgIHJvb206IHN0cmluZyxcbiAgICBwYXlsb2FkOiAobWV0YWRhdGE6IFQpID0+IFByb21pc2U8RD4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChyb29tIGluIHRoaXMuY2xpZW50cykge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBzZW5kaW5nIHNzZSB0byAke3RoaXMuY2xpZW50c1tyb29tXS5sZW5ndGh9IGNsaWVudHMgaW4gJHtyb29tfWAsXG4gICAgICApO1xuICAgICAgY29uc29sZS50aW1lKGBzZW5kaW5nIHNzZSB0aW1lOiBgKTtcbiAgICAgIGFwbS5zdGFydFRyYW5zYWN0aW9uKCdzc2UnKTtcbiAgICAgIGZvciAoY29uc3QgeyByZXMsIG1ldGFkYXRhIH0gb2YgdGhpcy5jbGllbnRzW3Jvb21dKSB7XG4gICAgICAgIGNvbnN0IHRvU2VuZCA9IGBkYXRhOiAke3NlcmlhbGl6ZShhd2FpdCBwYXlsb2FkKG1ldGFkYXRhKSl9XFxuXFxuYDtcbiAgICAgICAgcmVzLndyaXRlKHRvU2VuZCk7XG4gICAgICB9XG4gICAgICBhcG0uZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgIGNvbnNvbGUudGltZUVuZChgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlXCIpOyIsImltcG9ydCB7XG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvbixcbiAgUm9sZSxcbiAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICBTdGF0dXNJblF1ZXVlLFxuICBTdGF0dXNTZW50VG9DcmVhdG9yLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGNsYXNzVG9DbGFzcywgY2xhc3NUb1BsYWluIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIEdldCBkYXRhIGluIHNlcnZpY2Ugb2YgdGhlIHF1ZXVlIGNvbnRyb2xsZXIgYW5kIFNTRVxuICogV0hZPyBUbyBlbnN1cmUgZGF0YSByZXR1cm5lZCBieSBlbmRwb2ludHMgaXMgKmV4YWN0bHkqIGVxdWFsIHRvIGRhdGEgc2VudCBieSBTU0VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBhc3luYyBnZXRRdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVUaW1lcygpO1xuICAgIGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVTaXplKCk7XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBhc3luYyBnZXRRdWVzdGlvbnMocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICAvLyB0b2RvOiBNYWtlIGEgc3R1ZGVudCBhbmQgYSBUQSB2ZXJzaW9uIG9mIHRoaXMgZnVuY3Rpb24sIGFuZCBzd2l0Y2ggd2hpY2ggb25lIHRvIHVzZSBpbiB0aGUgY29udHJvbGxlclxuICAgIC8vIGZvciBub3csIGp1c3QgcmV0dXJuIHRoZSBzdHVkZW50IHJlc3BvbnNlXG4gICAgY29uc3QgcXVldWVTaXplID0gYXdhaXQgUXVldWVNb2RlbC5jb3VudCh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgIH0pO1xuICAgIC8vIENoZWNrIHRoYXQgdGhlIHF1ZXVlIGV4aXN0c1xuICAgIGlmIChxdWV1ZVNpemUgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uc0Zyb21EYiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgW1xuICAgICAgLi4uU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICAgICAgLi4uU3RhdHVzSW5RdWV1ZSxcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgIF0pXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXN0aW9uLmNyZWF0b3InLCAnY3JlYXRvcicpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXN0aW9uLnRhSGVscGVkJywgJ3RhSGVscGVkJylcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBjb25zdCBxdWVzdGlvbnMgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG5cbiAgICBxdWVzdGlvbnMucXVldWUgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKChxdWVzdGlvbikgPT5cbiAgICAgIFN0YXR1c0luUXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5xdWVzdGlvbnNHZXR0aW5nSGVscCA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoXG4gICAgICAocXVlc3Rpb24pID0+IHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5wcmlvcml0eVF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblByaW9yaXR5UXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvKiogSGlkZSBzZW5zaXRpdmUgZGF0YSB0byBvdGhlciBzdHVkZW50cyAqL1xuICBhc3luYyBwZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcXVlc3Rpb25zOiBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gICAgdXNlcklkOiBudW1iZXIsXG4gICAgcm9sZTogUm9sZSxcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBpZiAocm9sZSA9PT0gUm9sZS5TVFVERU5UKSB7XG4gICAgICBjb25zdCBuZXdMUVIgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKG5ld0xRUiwgcXVlc3Rpb25zKTtcblxuICAgICAgbmV3TFFSLnF1ZXVlID0gcXVlc3Rpb25zLnF1ZXVlLm1hcCgocXVlc3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgY3JlYXRvciA9XG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCA9PT0gdXNlcklkXG4gICAgICAgICAgICA/IHF1ZXN0aW9uLmNyZWF0b3JcbiAgICAgICAgICAgIDogcGljayhxdWVzdGlvbi5jcmVhdG9yLCBbJ2lkJ10pO1xuICAgICAgICAvLyBjbGFzc1RvQ2xhc3MgdHJhbnNmb3JtZXIgd2lsbCBhcHBseSB0aGUgQEV4Y2x1ZGVzXG4gICAgICAgIHJldHVybiBjbGFzc1RvQ2xhc3M8UXVlc3Rpb24+KFxuICAgICAgICAgIFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHsgLi4ucXVlc3Rpb24sIGNyZWF0b3IgfSksXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgbmV3TFFSLnlvdXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgY3JlYXRvcklkOiB1c2VySWQsXG4gICAgICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgICAgICBzdGF0dXM6IEluKFN0YXR1c1NlbnRUb0NyZWF0b3IpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBuZXdMUVIucHJpb3JpdHlRdWV1ZSA9IFtdO1xuXG4gICAgICByZXR1cm4gbmV3TFFSO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZUNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXVlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWV1ZS5zdWJzY3JpYmVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVldWVDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUXVldWVDbGVhblNlcnZpY2UsXG4gICAgUXVldWVTZXJ2aWNlLFxuICAgIFF1ZXVlU1NFU2VydmljZSxcbiAgICBRdWV1ZVN1YnNjcmliZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtRdWV1ZUNsZWFuU2VydmljZSwgUXVldWVTU0VTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1NTRU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBHZXRRdWV1ZVJlc3BvbnNlLFxuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXVlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBSZXMsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAncHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZSB9IGZyb20gJy4vcXVldWUtcm9sZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdxdWV1ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXVlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVldWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8R2V0UXVldWVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgfVxuXG4gIEBHZXQoJzpxdWV1ZUlkL3F1ZXN0aW9ucycpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWVzdGlvbnMoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgcXVldWVJZCxcbiAgICAgIHF1ZXN0aW9ucyxcbiAgICAgIHVzZXJJZCxcbiAgICAgIHJvbGUsXG4gICAgKTtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXVlKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXVlUGFyYW1zLFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5ub3RlcyA9IGJvZHkubm90ZXM7XG4gICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBib2R5LmFsbG93UXVlc3Rpb25zO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnOnF1ZXVlSWQvY2xlYW4nKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIGNsZWFuUXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQ2xlYW4gdXAgcXVldWUgaWYgbmVjZXNzYXJ5XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLmNsZWFuUXVldWUocXVldWVJZCwgdHJ1ZSk7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEVuZHBvaW50IHRvIHNlbmQgZnJvbnRlbmQgcmVjZWl2ZSBzZXJ2ZXItc2VudCBldmVudHMgd2hlbiBxdWV1ZSBjaGFuZ2VzXG4gIEBHZXQoJzpxdWV1ZUlkL3NzZScpXG4gIHNlbmRFdmVudChcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICApOiB2b2lkIHtcbiAgICByZXMuc2V0KHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9ldmVudC1zdHJlYW0nLFxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUnLFxuICAgICAgJ1gtQWNjZWwtQnVmZmVyaW5nJzogJ25vJyxcbiAgICAgIENvbm5lY3Rpb246ICdrZWVwLWFsaXZlJyxcbiAgICB9KTtcblxuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChxdWV1ZUlkLCByZXMsIHsgcm9sZSwgdXNlcklkIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFF1ZXVlUm9sZSA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICBhc3luYyAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZT8uY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGU7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnF1ZXVlUm9sZUd1YXJkLnF1ZXVlTm90Rm91bmQpO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJy4vc3NlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHsgcHJvdmlkZXJzOiBbU1NFU2VydmljZV0sIGV4cG9ydHM6IFtTU0VTZXJ2aWNlXSB9KVxuZXhwb3J0IGNsYXNzIFNTRU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVN1YnNjcmliZXIgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXVlTW9kZWw+IHtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UpIHtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVldWVNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWV1ZU1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUoZXZlbnQuZW50aXR5LmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJQ2FsQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaWNhbFNlcnZpY2U6IEljYWxTZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2ljYWw6c2NyYXBlJyxcbiAgICBkZXNjcmliZTogJ3NjcmFwZSBpY2FsIGZvciBhIGNvdXJzZScsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmljYWxTZXJ2aWNlLnVwZGF0ZUFsbENvdXJzZXMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7XG4gIGZyb21VUkwsXG4gIENhbGVuZGFyQ29tcG9uZW50LFxuICBDYWxlbmRhclJlc3BvbnNlLFxuICBWRXZlbnQsXG59IGZyb20gJ25vZGUtaWNhbCc7XG5pbXBvcnQgeyBEZWVwUGFydGlhbCwgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBmaW5kT25lSWFuYSB9IGZyb20gJ3dpbmRvd3MtaWFuYS9kaXN0JztcbmltcG9ydCAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCB7IFJSdWxlIH0gZnJvbSAncnJ1bGUnO1xuXG50eXBlIE1vbWVudCA9IG1vbWVudC5Nb21lbnQ7XG5cbnR5cGUgQ3JlYXRlT2ZmaWNlSG91ciA9IERlZXBQYXJ0aWFsPE9mZmljZUhvdXJNb2RlbD5bXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEljYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIC8vIHR6IHNob3VsZCBub3QgYmUgcHJlY29udmVydGVkIGJ5IGZpbmRPbmVJYW5hXG4gIHByaXZhdGUgZml4T3V0bG9va1RaKGRhdGU6IE1vbWVudCwgdHo6IHN0cmluZyk6IE1vbWVudCB7XG4gICAgY29uc3QgaWFuYSA9IGZpbmRPbmVJYW5hKHR6KTsgLy8gR2V0IElBTkEgdGltZXpvbmUgZnJvbSB3aW5kb3dzIHRpbWV6b25lXG4gICAgaWYgKGlhbmEpIHtcbiAgICAgIC8vIE1vdmUgdG8gdGhlIHRpbWV6b25lIGJlY2F1c2Ugbm9kZS1pY2FsIGRpZG4ndCBkbyBpdCBmb3IgdXMsIHNpbmNlIGl0IGRvZXMgbm90IHJlY29nbml6ZSB3aW5kb3dzIHRpbWV6b25lXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGUpLnR6KGlhbmEsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmF0ZSBkYXRlIG9mIG9jY3VyZW5jZXMgZm9yIGFuIHJydWxlIGluIHRoZSBnaXZlbiB0aW1lem9uZSwgZXhjbHVkaW5nIHRoZSBsaXN0IG9mIGRhdGVzXG4gIHByaXZhdGUgcnJ1bGVUb0RhdGVzKHJydWxlOiBhbnksIGV2ZW50VFo6IHN0cmluZywgZXhkYXRlUmF3OiBEYXRlW10pOiBEYXRlW10ge1xuICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gcnJ1bGU7XG4gICAgY29uc3QgZHRzdGFydDogTW9tZW50ID0gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMuZHRzdGFydCksIGV2ZW50VFopO1xuICAgIGNvbnN0IHVudGlsOiBNb21lbnQgPVxuICAgICAgb3B0aW9ucy51bnRpbCAmJiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy51bnRpbCksIGV2ZW50VFopO1xuICAgIGNvbnN0IGV2ZW50VFpNb21lbnQgPSBtb21lbnQudHouem9uZShmaW5kT25lSWFuYShldmVudFRaKSB8fCBldmVudFRaKTtcblxuICAgIC8vIEdldCB0aGUgVVRDIE9mZnNldCBpbiB0aGlzIGV2ZW50J3MgdGltZXpvbmUsIGF0IHRoaXMgdGltZS4gQWNjb3VudHMgZm9yIERheWxpZ2h0IFNhdmluZ3MgYW5kIG90aGVyIG9kZGl0aWVzXG4gICAgY29uc3QgdHpVVENPZmZzZXRPbkRhdGUgPSAoZGF0ZTogTW9tZW50KSA9PlxuICAgICAgZXZlbnRUWk1vbWVudC51dGNPZmZzZXQoZGF0ZS52YWx1ZU9mKCkpO1xuICAgIGNvbnN0IGR0c3RhcnRVVENPZmZzZXQgPSB0elVUQ09mZnNldE9uRGF0ZShkdHN0YXJ0KTtcblxuICAgIC8vIEFwcGx5IGEgVVRDIG9mZnNldCBpbiBtaW51dGVzIHRvIHRoZSBnaXZlbiBNb21lbnRcbiAgICBjb25zdCBhcHBseU9mZnNldCA9IChkYXRlOiBNb21lbnQsIHV0Y09mZnNldDogbnVtYmVyKTogTW9tZW50ID0+XG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QodXRjT2Zmc2V0LCAnbScpO1xuICAgIC8vIGFwcGx5IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcHJlUlJ1bGUgPSAoZGF0ZTogTW9tZW50KSA9PiBhcHBseU9mZnNldChkYXRlLCBkdHN0YXJ0VVRDT2Zmc2V0KTtcbiAgICAvLyBSZXZlcnQgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwb3N0UlJ1bGUgPSAoZGF0ZTogTW9tZW50KSA9PiBhcHBseU9mZnNldChkYXRlLCAtZHRzdGFydFVUQ09mZnNldCk7XG5cbiAgICAvLyBBZGp1c3QgZm9yIHJydWxlIG5vdCB0YWtpbmcgaW50byBhY2NvdW50IERTVCBpbiBsb2NhbGVcbiAgICAvLyAgIGllLiBcIjhwbSBldmVyeSBmcmlkYXlcIiBtZWFucyBoYXZpbmcgdG8gcHVzaCBiYWNrIDYwIG1pbnV0ZXMgYWZ0ZXIgRmFsbCBCYWNrd2FyZHNcbiAgICBjb25zdCBmaXhEU1QgPSAoZGF0ZTogTW9tZW50KTogTW9tZW50ID0+XG4gICAgICAvLyBHZXQgdGhlIGRpZmZlcmVuY2UgaW4gVVRDIG9mZnNldCBiZXR3ZWVuIGR0c3RhcnQgYW5kIHRoaXMgZGF0ZSAoc28gaWYgd2UgY3Jvc3NlZCBEU1Qgc3dpdGNoLCB0aGlzIHdpbGwgYmUgbm9uemVybylcbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdChkdHN0YXJ0VVRDT2Zmc2V0IC0gdHpVVENPZmZzZXRPbkRhdGUoZGF0ZSksICdtJyk7XG5cbiAgICBjb25zdCBydWxlID0gbmV3IFJSdWxlKHtcbiAgICAgIGZyZXE6IG9wdGlvbnMuZnJlcSxcbiAgICAgIGludGVydmFsOiBvcHRpb25zLmludGVydmFsLFxuICAgICAgd2tzdDogb3B0aW9ucy53a3N0LFxuICAgICAgY291bnQ6IG9wdGlvbnMuY291bnQsXG4gICAgICBieXdlZWtkYXk6IG9wdGlvbnMuYnl3ZWVrZGF5LFxuICAgICAgZHRzdGFydDogcHJlUlJ1bGUoZHRzdGFydCkudG9EYXRlKCksXG4gICAgICB1bnRpbDogdW50aWwgJiYgcHJlUlJ1bGUodW50aWwpLnRvRGF0ZSgpLFxuICAgIH0pO1xuXG4gICAgLy8gRGF0ZXMgdG8gZXhjbHVkZSBmcm9tIHJlY3VycmVuY2UsIHNlcGFyYXRlIGV4ZGF0ZSB0aW1lc3RhbXAgZm9yIGZpbHRlcmluZ1xuICAgIGNvbnN0IGV4ZGF0ZXM6IG51bWJlcltdID0gT2JqZWN0LnZhbHVlcyhleGRhdGVSYXcgfHwge30pXG4gICAgICAubWFwKChkKSA9PiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQoZCksIGV2ZW50VFopKVxuICAgICAgLm1hcCgoZCkgPT4gYXBwbHlPZmZzZXQoZCwgdHpVVENPZmZzZXRPbkRhdGUoZCkpLnZhbHVlT2YoKSk7XG5cbiAgICAvLyBEb2luZyBtYXRoIGhlcmUgYmVjYXVzZSBtb21lbnQuYWRkIGNoYW5nZXMgYmVoYXZpb3IgYmFzZWQgb24gc2VydmVyIHRpbWV6b25lXG4gICAgY29uc3QgaW4xMFdlZWtzID0gbmV3IERhdGUoXG4gICAgICBkdHN0YXJ0LnZhbHVlT2YoKSArIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICogMTAsXG4gICAgKTtcbiAgICByZXR1cm4gcnVsZVxuICAgICAgLmFsbCgoZCkgPT4gISF1bnRpbCB8fCBkIDwgaW4xMFdlZWtzKVxuICAgICAgLmZpbHRlcigoZGF0ZSkgPT4gIWV4ZGF0ZXMuaW5jbHVkZXMoZGF0ZS5nZXRUaW1lKCkpKVxuICAgICAgLm1hcCgoZCkgPT4gZml4RFNUKHBvc3RSUnVsZShtb21lbnQoZCkpKS50b0RhdGUoKSk7XG4gIH1cblxuICBwYXJzZUljYWwoaWNhbERhdGE6IENhbGVuZGFyUmVzcG9uc2UsIGNvdXJzZUlkOiBudW1iZXIpOiBDcmVhdGVPZmZpY2VIb3VyIHtcbiAgICBjb25zdCBpY2FsRGF0YVZhbHVlczogQXJyYXk8Q2FsZW5kYXJDb21wb25lbnQ+ID0gT2JqZWN0LnZhbHVlcyhpY2FsRGF0YSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGljYWxEYXRhVmFsdWVzLmZpbHRlcihcbiAgICAgIChpQ2FsRWxlbWVudCk6IGlDYWxFbGVtZW50IGlzIFZFdmVudCA9PlxuICAgICAgICBpQ2FsRWxlbWVudC50eXBlID09PSAnVkVWRU5UJyAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5zdGFydCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGlDYWxFbGVtZW50LmVuZCAhPT0gdW5kZWZpbmVkLFxuICAgICk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc0V2ZW50UmVnZXggPSAvXFxiXihPSHxIb3VycylcXGIvO1xuXG4gICAgY29uc3QgZmlsdGVyZWRPZmZpY2VIb3VycyA9IG9mZmljZUhvdXJzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBvZmZpY2VIb3Vyc0V2ZW50UmVnZXgudGVzdChldmVudC5zdW1tYXJ5KSxcbiAgICApO1xuXG4gICAgbGV0IHJlc3VsdE9mZmljZUhvdXJzID0gW107XG5cbiAgICBmaWx0ZXJlZE9mZmljZUhvdXJzLmZvckVhY2goKG9oOiBWRXZlbnQpID0+IHtcbiAgICAgIC8vIFRoaXMgb2ZmaWNlIGhvdXIgdGltZXpvbmUuIEFTU1VNSU5HIGV2ZXJ5IGRhdGUgZmllbGQgaGFzIHNhbWUgdGltZXpvbmUgYXMgb2guc3RhcnRcbiAgICAgIGNvbnN0IGV2ZW50VFogPSBvaC5zdGFydC50ejtcbiAgICAgIGNvbnN0IHsgcnJ1bGUgfSA9IG9oIGFzIGFueTtcbiAgICAgIGlmIChycnVsZSkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG9oLmVuZC5nZXRUaW1lKCkgLSBvaC5zdGFydC5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgYWxsRGF0ZXMgPSB0aGlzLnJydWxlVG9EYXRlcyhycnVsZSwgZXZlbnRUWiwgb2guZXhkYXRlKTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkT2ZmaWNlSG91cnMgPSBhbGxEYXRlcy5tYXAoKGRhdGUpID0+ICh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogZGF0ZSxcbiAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGR1cmF0aW9uKSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXN1bHRPZmZpY2VIb3VycyA9IHJlc3VsdE9mZmljZUhvdXJzLmNvbmNhdChnZW5lcmF0ZWRPZmZpY2VIb3Vycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRPZmZpY2VIb3Vycy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob2guc3RhcnQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgICBlbmRUaW1lOiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob2guZW5kKSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRPZmZpY2VIb3VycztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBPZmZpY2VIb3VycyBmb3IgYSBnaXZlbiBDb3Vyc2UgYnkgcmVzY3JhcGluZyBpY2FsXG4gICAqIEBwYXJhbSBjb3Vyc2UgdG8gcGFyc2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVDYWxlbmRhckZvckNvdXJzZShjb3Vyc2U6IENvdXJzZU1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgc2NyYXBpbmcgaWNhbCBmb3IgY291cnNlIFwiJHtjb3Vyc2UubmFtZX1cIigke2NvdXJzZS5pZH0gYXQgdXJsOiAke2NvdXJzZS5pY2FsVVJMfS4uLmAsXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWUoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGNvdXJzZUlkOiBjb3Vyc2UuaWQsIHJvb206ICdPbmxpbmUnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb206ICdPbmxpbmUnLFxuICAgICAgICBjb3Vyc2VJZDogY291cnNlLmlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSB0aGlzLnBhcnNlSWNhbChcbiAgICAgIGF3YWl0IGZyb21VUkwoY291cnNlLmljYWxVUkwpLFxuICAgICAgY291cnNlLmlkLFxuICAgICk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmRlbGV0ZSh7IGNvdXJzZUlkOiBjb3Vyc2UuaWQgfSk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLnNhdmUoXG4gICAgICBvZmZpY2VIb3Vycy5tYXAoKGUpID0+IHtcbiAgICAgICAgZS5xdWV1ZUlkID0gcXVldWUuaWQ7XG4gICAgICAgIHJldHVybiBPZmZpY2VIb3VyTW9kZWwuY3JlYXRlKGUpO1xuICAgICAgfSksXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWVFbmQoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgY29uc29sZS5sb2coJ2RvbmUgc2NyYXBpbmchJyk7XG4gIH1cblxuICBAQ3JvbignNTEgMCAqICogKicpXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVBbGxDb3Vyc2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBjb3Vyc2UgaWNhbHMnKTtcbiAgICBjb25zdCBjb3Vyc2VzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZCgpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNvdXJzZXMubWFwKChjKSA9PiB0aGlzLnVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGMpKSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtaWNhbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5kb3dzLWlhbmEvZGlzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQtdGltZXpvbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnJ1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmU3Vic2NyaWJlciB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW05vdGlmaWNhdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBEZXNrdG9wTm90aWZTdWJzY3JpYmVyLCBUd2lsaW9TZXJ2aWNlXSxcbiAgZXhwb3J0czogW05vdGlmaWNhdGlvblNlcnZpY2UsIFR3aWxpb1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgQ29ubmVjdGlvbixcbiAgSW5zZXJ0RXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gRGVza3RvcE5vdGlmTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8RGVza3RvcE5vdGlmTW9kZWw+KSB7XG4gICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5RGVza3RvcChcbiAgICAgIGV2ZW50LmVudGl0eSxcbiAgICAgIFwiWW91J3ZlIHN1Y2Nlc3NmdWxseSBzaWduZWQgdXAgZm9yIGRlc2t0b3Agbm90aWZpY2F0aW9ucyFcIixcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJhZFJlcXVlc3RFeGNlcHRpb24sIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCAqIGFzIHdlYlB1c2ggZnJvbSAnd2ViLXB1c2gnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IE5vdGlmTXNncyA9IHtcbiAgcGhvbmU6IHtcbiAgICBXUk9OR19NRVNTQUdFOlxuICAgICAgJ1BsZWFzZSByZXNwb25kIHdpdGggZWl0aGVyIFlFUyBvciBOTy4gVGV4dCBTVE9QIGF0IGFueSB0aW1lIHRvIHN0b3AgcmVjZWl2aW5nIHRleHQgbWVzc2FnZXMnLFxuICAgIENPVUxEX05PVF9GSU5EX05VTUJFUjpcbiAgICAgICdDb3VsZCBub3QgZmluZCBhbiBPZmZpY2UgSG91cnMgYWNjb3VudCB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyLicsXG4gICAgVU5SRUdJU1RFUjpcbiAgICAgIFwiWW91J3ZlIHVucmVnaXN0ZXJlZCBmcm9tIHRleHQgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gRmVlbCBmcmVlIHRvIHJlLXJlZ2lzdGVyIGFueSB0aW1lIHRocm91Z2ggdGhlIHdlYnNpdGVcIixcbiAgICBEVVBMSUNBVEU6XG4gICAgICBcIllvdSd2ZSBhbHJlYWR5IGJlZW4gdmVyaWZpZWQgdG8gcmVjZWl2ZSB0ZXh0IG5vdGlmaWNhdGlvbnMgZnJvbSBLaG91cnkgT2ZmaWNlIEhvdXJzIVwiLFxuICAgIE9LOlxuICAgICAgJ1RoYW5rIHlvdSBmb3IgdmVyaWZ5aW5nIHlvdXIgbnVtYmVyIHdpdGggS2hvdXJ5IE9mZmljZSBIb3VycyEgWW91IGFyZSBub3cgc2lnbmVkIHVwIGZvciB0ZXh0IG5vdGlmaWNhdGlvbnMhJyxcbiAgfSxcbiAgcXVldWU6IHtcbiAgICBBTEVSVF9CVVRUT046XG4gICAgICBcIlRoZSBUQSBjb3VsZCd0IHJlYWNoIHlvdSwgcGxlYXNlIGhhdmUgTWljcm9zb2Z0IFRlYW1zIG9wZW4gYW5kIGNvbmZpcm0geW91IGFyZSBiYWNrIVwiLFxuICAgIFRISVJEX1BMQUNFOiBgWW91J3JlIDNyZCBpbiB0aGUgcXVldWUuIEJlIHJlYWR5IGZvciBhIFRBIHRvIGNhbGwgeW91IHNvb24hYCxcbiAgICBUQV9ISVRfSEVMUEVEOiAodGFOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICAgIGAke3RhTmFtZX0gaXMgY29taW5nIHRvIGhlbHAgeW91IWAsXG4gICAgUkVNT1ZFRDogYFlvdSd2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuIFBsZWFzZSByZXR1cm4gdG8gdGhlIGFwcCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gLFxuICB9LFxuICB0YToge1xuICAgIFNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFOlxuICAgICAgJ0Egc3R1ZGVudCBoYXMgam9pbmVkIHlvdXIgKHByZXZpb3VzbHkgZW1wdHkpIHF1ZXVlIScsXG4gIH0sXG59O1xuXG4vL1RPRE8gdGVzdCB0aGlzIHNlcnZpY2Ugb21nXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIGRlc2t0b3BQdWJsaWNLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlLFxuICApIHtcbiAgICB3ZWJQdXNoLnNldFZhcGlkRGV0YWlscyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0VNQUlMJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BSSVZBVEVLRVknKSxcbiAgICApO1xuICAgIHRoaXMuZGVza3RvcFB1YmxpY0tleSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wKFxuICAgIGluZm86IERlZXBQYXJ0aWFsPERlc2t0b3BOb3RpZk1vZGVsPixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICAgIC8vIGNyZWF0ZSBpZiBub3QgZXhpc3RcbiAgICBsZXQgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogaW5mby51c2VySWQsIGVuZHBvaW50OiBpbmZvLmVuZHBvaW50IH0sXG4gICAgfSk7XG4gICAgaWYgKCFkbikge1xuICAgICAgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5jcmVhdGUoaW5mbykuc2F2ZSgpO1xuICAgICAgYXdhaXQgZG4ucmVsb2FkKCk7XG4gICAgfVxuICAgIHJldHVybiBkbjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgdXNlcjogVXNlck1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZnVsbE51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXIpO1xuICAgIGlmICghZnVsbE51bWJlcikge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJQaG9uZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KTtcblxuICAgIGlmIChwaG9uZU5vdGlmTW9kZWwpIHtcbiAgICAgIC8vIFBob25lIG51bWJlciBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPT09IGZ1bGxOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBqdXN0IGNoYW5nZSBpdFxuICAgICAgICBwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPSBmdWxsTnVtYmVyO1xuICAgICAgICBwaG9uZU5vdGlmTW9kZWwudmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcGhvbmVOb3RpZk1vZGVsLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBmdWxsTnVtYmVyLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcblxuICAgICAgLy8gTVVUQVRFIHNvIGlmIHVzZXIuc2F2ZSgpIGlzIGNhbGxlZCBsYXRlciBpdCBkb2Vzbid0IGRpcy1hc3NvY2lhdGVcbiAgICAgIHVzZXIucGhvbmVOb3RpZiA9IHBob25lTm90aWZNb2RlbDtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm5vdGlmeVBob25lKFxuICAgICAgcGhvbmVOb3RpZk1vZGVsLFxuICAgICAgXCJZb3UndmUgc2lnbmVkIHVwIGZvciBwaG9uZSBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBUbyB2ZXJpZnkgeW91ciBudW1iZXIsIHBsZWFzZSByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIFlFUy4gVG8gdW5zdWJzY3JpYmUsIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggTk8gb3IgU1RPUFwiLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLy8gTm90aWZ5IHVzZXIgb24gYWxsIHBsYXRmb3Jtc1xuICBhc3luYyBub3RpZnlVc2VyKHVzZXJJZDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3RpZk1vZGVsc09mVXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2Rlc2t0b3BOb3RpZnMnLCAncGhvbmVOb3RpZiddLFxuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBwcm9taXNlcyBjb25jdXJyZW50bHlcbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzLm1hcChhc3luYyAobm0pID0+XG4gICAgICAgICAgdGhpcy5ub3RpZnlEZXNrdG9wKG5tLCBtZXNzYWdlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmICYmIG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWZzRW5hYmxlZCkge1xuICAgICAgdGhpcy5ub3RpZnlQaG9uZShub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuICBhc3luYyBub3RpZnlEZXNrdG9wKG5tOiBEZXNrdG9wTm90aWZNb2RlbCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdlYlB1c2guc2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBubS5lbmRwb2ludCxcbiAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICBwMjU2ZGg6IG5tLnAyNTZkaCxcbiAgICAgICAgICAgIGF1dGg6IG5tLmF1dGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShubSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBwaG9uZSBudW1iZXJcbiAgYXN5bmMgbm90aWZ5UGhvbmUoXG4gICAgcG46IFBob25lTm90aWZNb2RlbCxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZm9yY2U6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChmb3JjZSB8fCBwbi52ZXJpZmllZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLnNlbmRTTVMocG4ucGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncHJvYmxlbSBzZW5kaW5nIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5UGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwaG9uZU5vdGlmID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXBob25lTm90aWYpIHtcbiAgICAgIGFwbS5zZXRDdXN0b21Db250ZXh0KHsgcGhvbmVOdW1iZXIgfSk7XG4gICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHBob25lIG51bWJlciBkdXJpbmcgdmVyaWZpY2F0aW9uJyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5DT1VMRF9OT1RfRklORF9OVU1CRVI7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlICE9PSAnWUVTJyAmJiBtZXNzYWdlICE9PSAnTk8nICYmIG1lc3NhZ2UgIT09ICdTVE9QJykge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5XUk9OR19NRVNTQUdFO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PT0gJ05PJyB8fCBtZXNzYWdlID09PSAnU1RPUCcpIHtcbiAgICAgIC8vIGRpZCBzb21lIG1vcmUgZGlnZ2luZywgU1RPUCBqdXN0IHN0b3BzIG1lc3NhZ2VzIGNvbXBsZXRlbHksIHdlJ2xsIG5ldmVyIHJlY2VpdmUgaXRcbiAgICAgIC8vIHNvIHVoLi4uIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhhdFxuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZShwaG9uZU5vdGlmKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuVU5SRUdJU1RFUjtcbiAgICB9IGVsc2UgaWYgKHBob25lTm90aWYudmVyaWZpZWQpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuRFVQTElDQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHBob25lTm90aWYuc2F2ZSgpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5PSztcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYi1wdXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0d2lsaW8gU0RLIHRvIG1ha2UgdGVzdGluZyBlYXNpZXIuXG4gKiBTaG91bGQgTk9UIGludGVyYWN0IHdpdGggREIgbW9kZWxzIG9yIGRvIGFueXRoaW5nIHNtYXJ0LiBKdXN0IHdyYXAgVHdpbGlvLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvU2VydmljZSB7XG4gIHByaXZhdGUgdHdpbGlvQ2xpZW50OiB0d2lsaW8uVHdpbGlvO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudHdpbGlvQ2xpZW50ID0gdHdpbGlvKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQUNDT1VOVFNJRCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBwaG9uZSBudW1iZXIgb3IgcmV0dXJuIGZhbHNlIGlmIHBob25lIG51bWJlciBpc24ndCByZWFsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RnVsbFBob25lTnVtYmVyKFxuICAgIHBob25lTnVtYmVyOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nIHwgZmFsc2U+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5sb29rdXBzLnBob25lTnVtYmVycyhwaG9uZU51bWJlcikuZmV0Y2goKSlcbiAgICAgICAgLnBob25lTnVtYmVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlIHBob25lIG51bWJlciBpcyBub3QgZm91bmQsIHRoZW4gZW5kcG9pbnQgc2hvdWxkIHJldHVybiBpbnZhbGlkXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgU01TIHRvIHBob25lIG51bWJlciB1c2luZyBvdXIgVHdpbGlvIG51bWJlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9QSE9ORU5VTUJFUicpLFxuICAgICAgdG86IHBob25lTnVtYmVyLFxuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2lsaW9cIik7IiwiaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmQm9keSxcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIFR3aWxpb0JvZHksXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBIZWFkZXIsXG4gIEhlYWRlcnMsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ25vdGlmaWNhdGlvbnMnKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZXNrdG9wL2NyZWRlbnRpYWxzJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGdldERlc2t0b3BDcmVkZW50aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm5vdGlmU2VydmljZS5kZXNrdG9wUHVibGljS2V5KTtcbiAgfVxuXG4gIEBQb3N0KCdkZXNrdG9wL2RldmljZScpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyByZWdpc3RlckRlc2t0b3BVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogRGVza3RvcE5vdGlmQm9keSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmUGFydGlhbD4ge1xuICAgIGNvbnN0IGRldmljZSA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyRGVza3RvcCh7XG4gICAgICBlbmRwb2ludDogYm9keS5lbmRwb2ludCxcbiAgICAgIGV4cGlyYXRpb25UaW1lOiBib2R5LmV4cGlyYXRpb25UaW1lICYmIG5ldyBEYXRlKGJvZHkuZXhwaXJhdGlvblRpbWUpLFxuICAgICAgcDI1NmRoOiBib2R5LmtleXMucDI1NmRoLFxuICAgICAgYXV0aDogYm9keS5rZXlzLmF1dGgsXG4gICAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGRldmljZS5pZCxcbiAgICAgIGVuZHBvaW50OiBkZXZpY2UuZW5kcG9pbnQsXG4gICAgICBjcmVhdGVkQXQ6IGRldmljZS5jcmVhdGVkQXQsXG4gICAgICBuYW1lOiBkZXZpY2UubmFtZSxcbiAgICB9O1xuICB9XG5cbiAgQERlbGV0ZSgnZGVza3RvcC9kZXZpY2UvOmRldmljZUlkJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZURlc2t0b3BVc2VyKFxuICAgIEBQYXJhbSgnZGV2aWNlSWQnKSBkZXZpY2VJZDogbnVtYmVyLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kKHsgaWQ6IGRldmljZUlkLCB1c2VySWQgfSk7XG4gICAgaWYgKGRuLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShkbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYmhvb2sgZnJvbSB0d2lsaW9cbiAgQFBvc3QoJy9waG9uZS92ZXJpZnknKVxuICBASGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKVxuICBhc3luYyB2ZXJpZnlQaG9uZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBUd2lsaW9Cb2R5LFxuICAgIEBIZWFkZXJzKCd4LXR3aWxpby1zaWduYXR1cmUnKSB0d2lsaW9TaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYm9keS5Cb2R5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlbmRlck51bWJlciA9IGJvZHkuRnJvbTtcblxuICAgIGNvbnN0IHR3aWxpb0F1dGhUb2tlbiA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpO1xuXG4gICAgY29uc3QgaXNWYWxpZGF0ZWQgPSB0d2lsaW8udmFsaWRhdGVSZXF1ZXN0KFxuICAgICAgdHdpbGlvQXV0aFRva2VuLFxuICAgICAgdHdpbGlvU2lnbmF0dXJlLnRyaW0oKSxcbiAgICAgIGAke3RoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpfS9hcGkvdjEvbm90aWZpY2F0aW9ucy9waG9uZS92ZXJpZnlgLFxuICAgICAgYm9keSxcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMubm90aWZpY2F0aW9uQ29udHJvbGxlci5tZXNzYWdlTm90RnJvbVR3aWxpbyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZVRvVXNlciA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnZlcmlmeVBob25lKFxuICAgICAgc2VuZGVyTnVtYmVyLFxuICAgICAgbWVzc2FnZSxcbiAgICApO1xuICAgIGNvbnN0IE1lc3NhZ2luZ1Jlc3BvbnNlID0gdHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IE1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlVG9Vc2VyKTtcblxuICAgIHJldHVybiB0d2ltbC50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xvZ2luLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSnd0U3RyYXRlZ3kgfSBmcm9tICcuLi9sb2dpbi9qd3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSnd0TW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXG4gICAgICBpbmplY3Q6IFtDb25maWdTZXJ2aWNlXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGFzeW5jIChjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSA9PiAoe1xuICAgICAgICBzZWNyZXQ6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtMb2dpbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtKd3RTdHJhdGVneSwgTG9naW5Db3Vyc2VTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEVSUk9SX01FU1NBR0VTLFxuICBLaG91cnlEYXRhUGFyYW1zLFxuICBLaG91cnlSZWRpcmVjdFJlc3BvbnNlLFxuICBLaG91cnlTdHVkZW50Q291cnNlLFxuICBLaG91cnlUQUNvdXJzZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBQb3N0LFxuICBRdWVyeSxcbiAgUmVxLFxuICBSZXMsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBhcG0gfSBmcm9tICdAZWxhc3RpYy9hcG0tcnVtJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBKd3RTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGh0dHBTaWduYXR1cmUgZnJvbSAnaHR0cC1zaWduYXR1cmUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vLi4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbG9naW5Db3Vyc2VTZXJ2aWNlOiBMb2dpbkNvdXJzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBqd3RTZXJ2aWNlOiBKd3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBQb3N0KCcva2hvdXJ5X2xvZ2luJylcbiAgYXN5bmMgcmVjaWV2ZURhdGFGcm9tS2hvdXJ5KFxuICAgIEBSZXEoKSByZXE6IFJlcXVlc3QsXG4gICAgQEJvZHkoKSBib2R5OiBLaG91cnlEYXRhUGFyYW1zLFxuICApOiBQcm9taXNlPEtob3VyeVJlZGlyZWN0UmVzcG9uc2U+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gQ2hlY2sgdGhhdCByZXF1ZXN0IGhhcyBjb21lIGZyb20gS2hvdXJ5XG4gICAgICBjb25zdCBwYXJzZWRSZXF1ZXN0ID0gaHR0cFNpZ25hdHVyZS5wYXJzZVJlcXVlc3QocmVxKTtcbiAgICAgIGNvbnN0IHZlcmlmeVNpZ25hdHVyZSA9IGh0dHBTaWduYXR1cmUudmVyaWZ5SE1BQyhcbiAgICAgICAgcGFyc2VkUmVxdWVzdCxcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnS0hPVVJZX1BSSVZBVEVfS0VZJyksXG4gICAgICApO1xuICAgICAgaWYgKCF2ZXJpZnlTaWduYXR1cmUpIHtcbiAgICAgICAgYXBtLmNhcHR1cmVFcnJvcignSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZScpO1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlJyk7XG4gICAgICB9XG4gICAgICAvLyBUaGlzIGNoZWNrcyBpZiB0aGUgcmVxdWVzdCBpcyBjb21pbmcgZnJvbSBvbmUgb2YgdGhlIGtob3VyeSBzZXJ2ZXJzXG4gICAgICBjb25zdCB2ZXJpZnlJUCA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgICAuZ2V0KCdLSE9VUllfU0VSVkVSX0lQJylcbiAgICAgICAgLmluY2x1ZGVzKHJlcS5pcCk7XG4gICAgICBpZiAoIXZlcmlmeUlQKSB7XG4gICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoXG4gICAgICAgICAgJ1RoZSBJUCBvZiB0aGUgcmVxdWVzdCBkb2VzIG5vdCBzZWVtIHRvIGJlIGNvbWluZyBmcm9tIHRoZSBLaG91cnkgc2VydmVyJyxcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIElQIG9mIHRoZSByZXF1ZXN0IGRvZXMgbm90IHNlZW0gdG8gYmUgY29taW5nIGZyb20gdGhlIEtob3VyeSBzZXJ2ZXInLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB1c2VyOiBVc2VyTW9kZWw7XG4gICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGVtYWlsOiBib2R5LmVtYWlsIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZSh7IGNvdXJzZXM6IFtdIH0pO1xuICAgIH1cblxuICAgIC8vIFE6IERvIHdlIG5lZWQgdGhpcyBpZiBpdCdzIG5vdCBnb2luZyB0byBjaGFuZ2U/XG4gICAgdXNlciA9IE9iamVjdC5hc3NpZ24odXNlciwge1xuICAgICAgZW1haWw6IGJvZHkuZW1haWwsXG4gICAgICBmaXJzdE5hbWU6IGJvZHkuZmlyc3RfbmFtZSxcbiAgICAgIGxhc3ROYW1lOiBib2R5Lmxhc3RfbmFtZSxcbiAgICAgIG5hbWU6IGJvZHkuZmlyc3RfbmFtZSArICcgJyArIGJvZHkubGFzdF9uYW1lLFxuICAgICAgcGhvdG9VUkw6ICcnLFxuICAgIH0pO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZXMgPSBbXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkuY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVN0dWRlbnRDb3Vyc2UpID0+IHtcbiAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2VNb2RlbCA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICAgICAgICBjLmNvdXJzZSxcbiAgICAgICAgICBjLnNlY3Rpb24sXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvdXJzZSkge1xuICAgICAgICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgICAgUm9sZS5TVFVERU5ULFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh1c2VyQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS50YV9jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5VEFDb3Vyc2UpID0+IHtcbiAgICAgICAgLy8gUXVlcnkgZm9yIGFsbCB0aGUgY291cnNlcyB3aGljaCBtYXRjaCB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJpYyBjb3Vyc2UgZnJvbSBLaG91cnlcbiAgICAgICAgY29uc3QgY291cnNlTWFwcGluZ3MgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmQoe1xuICAgICAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjLmNvdXJzZSB9LCAvLyBUT0RPOiBBZGQgc2VtZXN0ZXIgc3VwcG9ydFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvdXJzZU1hcHBpbmcgb2YgY291cnNlTWFwcGluZ3MpIHtcbiAgICAgICAgICBjb25zdCB0YUNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2VNYXBwaW5nLmNvdXJzZUlkLFxuICAgICAgICAgICAgUm9sZS5UQSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godGFDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIHVzZXIuY291cnNlcyA9IHVzZXJDb3Vyc2VzO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKFxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcbiAgICAgIHsgZXhwaXJlc0luOiA1ICogNjAgfSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICByZWRpcmVjdDpcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJykgKyBgL2FwaS92MS9sb2dpbi9lbnRyeT90b2tlbj0ke3Rva2VufWAsXG4gICAgfTtcbiAgfVxuXG4gIC8vIE5PVEU6IEFsdGhvdWdoIHRoZSB0d28gcm91dGVzIGJlbG93IGFyZSBvbiB0aGUgYmFja2VuZCxcbiAgLy8gdGhleSBhcmUgbWVhbnQgdG8gYmUgdmlzaXRlZCBieSB0aGUgYnJvd3NlciBzbyBhIGNvb2tpZSBjYW4gYmUgc2V0XG5cbiAgLy8gVGhpcyBpcyB0aGUgcmVhbCBhZG1pbiBlbnRyeSBwb2ludFxuICBAR2V0KCcvbG9naW4vZW50cnknKVxuICBhc3luYyBlbnRlckZyb21LaG91cnkoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd0b2tlbicpIHRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlzVmVyaWZpZWQgPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2UudmVyaWZ5QXN5bmModG9rZW4pO1xuXG4gICAgaWYgKCFpc1ZlcmlmaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuand0U2VydmljZS5kZWNvZGUodG9rZW4pIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcblxuICAgIHRoaXMuZW50ZXIocmVzLCBwYXlsb2FkLnVzZXJJZCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGZvciBsb2dpbiBvbiBkZXZlbG9wbWVudCBvbmx5XG4gIEBHZXQoJy9sb2dpbi9kZXYnKVxuICBAVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbiAgYXN5bmMgZW50ZXJGcm9tRGV2KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndXNlcklkJykgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZW50ZXIocmVzLCB1c2VySWQpO1xuICB9XG5cbiAgLy8gU2V0IGNvb2tpZSBhbmQgcmVkaXJlY3QgdG8gcHJvcGVyIHBhZ2VcbiAgcHJpdmF0ZSBhc3luYyBlbnRlcihyZXM6IFJlc3BvbnNlLCB1c2VySWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGF1dGhUb2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoeyB1c2VySWQgfSk7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNvb2tpZSgnYXV0aF90b2tlbicsIGF1dGhUb2tlbiwgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy8nKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGVsYXN0aWMvYXBtLXJ1bVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEdldFByb2ZpbGVSZXNwb25zZSxcbiAgVXBkYXRlUHJvZmlsZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQYXRjaCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAnZmlyc3ROYW1lJyxcbiAgICAgICdsYXN0TmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgdXNlci5uYW1lID0gdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lO1xuICAgIGlmIChcbiAgICAgIHVzZXIucGhvbmVOb3RpZnNFbmFibGVkICYmXG4gICAgICB1c2VyUGF0Y2gucGhvbmVOdW1iZXIgIT09IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXJcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyUGhvbmUodXNlclBhdGNoLnBob25lTnVtYmVyLCB1c2VyKTtcbiAgICB9XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXQodXNlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vcXVlc3Rpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWVzdGlvblN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXN0aW9uLnN1YnNjcmliZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWVzdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtRdWVzdGlvblN1YnNjcmliZXJdLFxuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlLCBRdWV1ZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBHZXRRdWVzdGlvblJlc3BvbnNlLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzS2V5cyxcbiAgUm9sZSxcbiAgVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXIsIFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVlc3Rpb24tcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncXVlc3Rpb25zJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWVzdGlvblJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWVzdGlvbklkJylcbiAgYXN5bmMgZ2V0UXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICApOiBQcm9taXNlPEdldFF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUG9zdCgpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KCkgYm9keTogQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8Q3JlYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdGV4dCwgcXVlc3Rpb25UeXBlLCBxdWV1ZUlkLCBmb3JjZSB9ID0gYm9keTtcblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWV1ZUlkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5pbnZhbGlkUXVldWUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghcXVldWUuYWxsb3dRdWVzdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ubm9OZXdRdWVzdGlvbnMsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5jbG9zZWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNVc2VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY3JlYXRvcklkOiB1c2VyLmlkLFxuICAgICAgICBzdGF0dXM6IEluKE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCEhcHJldmlvdXNVc2VyUXVlc3Rpb24pIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICBwcmV2aW91c1VzZXJRdWVzdGlvbi5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkO1xuICAgICAgICBhd2FpdCBwcmV2aW91c1VzZXJRdWVzdGlvbi5zYXZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ub25lUXVlc3Rpb25BdEFUaW1lLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoe1xuICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgIGNyZWF0b3I6IHVzZXIsXG4gICAgICB0ZXh0LFxuICAgICAgcXVlc3Rpb25UeXBlLFxuICAgICAgc3RhdHVzOiBRdWVzdGlvblN0YXR1c0tleXMuRHJhZnRpbmcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc09ubGluZTogdHJ1ZSxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUGF0Y2goJzpxdWVzdGlvbklkJylcbiAgQFJvbGVzKFJvbGUuU1RVREVOVCwgUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIC8vIFRPRE86IFVzZSBxdWV1ZVJvbGUgZGVjb3JhdG9yLCBidXQgd2UgbmVlZCB0byBmaXggaXRzIHBlcmZvcm1hbmNlIGZpcnN0XG4gIGFzeW5jIHVwZGF0ZVF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxVcGRhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgbGV0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWVzdGlvbklkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICdxdWV1ZScsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NyZWF0b3IgPSB1c2VySWQgPT09IHF1ZXN0aW9uLmNyZWF0b3JJZDtcblxuICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgIC8vIEZhaWwgaWYgc3R1ZGVudCB0cmllcyBhbiBpbnZhbGlkIHN0YXR1cyBjaGFuZ2VcbiAgICAgIGlmIChib2R5LnN0YXR1cyAmJiAhcXVlc3Rpb24uY2hhbmdlU3RhdHVzKGJvZHkuc3RhdHVzLCBSb2xlLlNUVURFTlQpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdTdHVkZW50JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbiA9IE9iamVjdC5hc3NpZ24ocXVlc3Rpb24sIGJvZHkpO1xuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCBjcmVhdG9yLCBjaGVjayBpZiB1c2VyIGlzIFRBL1BST0Ygb2YgY291cnNlIG9mIHF1ZXN0aW9uXG4gICAgY29uc3QgaXNUYU9yUHJvZiA9XG4gICAgICAoYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY291cnNlSWQ6IHF1ZXN0aW9uLnF1ZXVlLmNvdXJzZUlkLFxuICAgICAgICAgIHJvbGU6IEluKFtSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUl0pLFxuICAgICAgICB9LFxuICAgICAgfSkpID4gMDtcblxuICAgIGlmIChpc1RhT3JQcm9mKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoYm9keSkubGVuZ3RoICE9PSAxIHx8IE9iamVjdC5rZXlzKGJvZHkpWzBdICE9PSAnc3RhdHVzJykge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi50YU9ubHlFZGl0UXVlc3Rpb25TdGF0dXMsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRTdGF0dXMgPSBxdWVzdGlvbi5zdGF0dXM7XG4gICAgICBjb25zdCBuZXdTdGF0dXMgPSBib2R5LnN0YXR1cztcbiAgICAgIC8vIElmIHRoZSB0YUhlbHBlZCBpcyBhbHJlYWR5IHNldCwgbWFrZSBzdXJlIHRoZSBzYW1lIHRhIHVwZGF0ZXMgdGhlIHN0YXR1c1xuICAgICAgaWYgKHF1ZXN0aW9uLnRhSGVscGVkPy5pZCAhPT0gdXNlcklkKSB7XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBSGVscGluZyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBUmVzb2x2ZWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0FscmVhZHlIZWxwaW5nT25lID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB0YUhlbHBlZElkOiB1c2VySWQsXG4gICAgICAgICAgICBzdGF0dXM6IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKSA9PT0gMTtcbiAgICAgIGlmIChpc0FscmVhZHlIZWxwaW5nT25lICYmIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhSGVscGluZ090aGVyLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZFRyYW5zaXRpb24gPSBxdWVzdGlvbi5jaGFuZ2VTdGF0dXMobmV3U3RhdHVzLCBSb2xlLlRBKTtcbiAgICAgIGlmICghdmFsaWRUcmFuc2l0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdUQScsXG4gICAgICAgICAgICBxdWVzdGlvbi5zdGF0dXMsXG4gICAgICAgICAgICBib2R5LnN0YXR1cyxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgVEEgYXMgdGFIZWxwZWQgd2hlbiB0aGUgVEEgc3RhcnRzIGhlbHBpbmcgdGhlIHN0dWRlbnRcbiAgICAgIGlmIChcbiAgICAgICAgb2xkU3RhdHVzICE9PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyAmJlxuICAgICAgICBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXG4gICAgICApIHtcbiAgICAgICAgcXVlc3Rpb24udGFIZWxwZWQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh1c2VySWQpO1xuICAgICAgICBxdWVzdGlvbi5oZWxwZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gU2V0IGZpcnN0SGVscGVkQXQgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKCFxdWVzdGlvbi5maXJzdEhlbHBlZEF0KSB7XG4gICAgICAgICAgcXVlc3Rpb24uZmlyc3RIZWxwZWRBdCA9IHF1ZXN0aW9uLmhlbHBlZEF0O1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MucXVldWUuVEFfSElUX0hFTFBFRChxdWVzdGlvbi50YUhlbHBlZC5uYW1lKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdTdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXMpIHtcbiAgICAgICAgcXVlc3Rpb24uY2xvc2VkQXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24ubG9naW5Vc2VyQ2FudEVkaXQsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBQb3N0KCc6cXVlc3Rpb25JZC9ub3RpZnknKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIG5vdGlmeShAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWUnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLkFMRVJUX0JVVFRPTixcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5SRU1PVkVELFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBsZXQgcXVldWVJZDtcblxuICAgIGlmIChyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKTtcbiAgICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXN0aW9uTm90Rm91bmQsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWV1ZUlkID0gcXVlc3Rpb24ucXVldWVJZDtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuYm9keS5xdWV1ZUlkKSB7XG4gICAgICAvLyBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgbmV3IHF1ZXN0aW9uXG4gICAgICBxdWV1ZUlkID0gcmVxdWVzdC5ib2R5LnF1ZXVlSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCk7XG5cbiAgICAvLyBZb3UgY2Fubm90IGludGVyYWN0IHdpdGggYSBxdWVzdGlvbiBpbiBhIG5vbmV4aXN0ZW50IHF1ZXVlXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZURvZXNOb3RFeGlzdCxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIEluc2VydEV2ZW50LFxuICBSZW1vdmVFdmVudCxcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWVzdGlvbk1vZGVsPiB7XG4gIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuXG4gICAgLy8gU2VuZCBwdXNoIG5vdGlmaWNhdGlvbiB0byBzdHVkZW50cyB3aGVuIHRoZXkgYXJlIGhpdCAzcmQgaW4gbGluZVxuICAgIC8vIGlmIHN0YXR1cyB1cGRhdGVkIHRvIGNsb3NlZFxuICAgIGlmIChcbiAgICAgIGV2ZW50LnVwZGF0ZWRDb2x1bW5zLmZpbmQoKGMpID0+IGMucHJvcGVydHlOYW1lID09PSAnc3RhdHVzJykgJiZcbiAgICAgIGV2ZW50LmVudGl0eS5zdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXNcbiAgICApIHtcbiAgICAgIC8vIGdldCAzcmQgaW4gcXVldWUgYmVmb3JlIGFuZCBhZnRlciB0aGlzIHVwZGF0ZVxuICAgICAgY29uc3QgcHJldmlvdXNUaGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICAgKVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGNvbnN0IHRoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShldmVudC5lbnRpdHkucXVldWVJZClcbiAgICAgICAgLnNldFF1ZXJ5UnVubmVyKGV2ZW50LnF1ZXJ5UnVubmVyKSAvLyBSdW4gaW4gc2FtZSB0cmFuc2FjdGlvbiBhcyB0aGUgdXBkYXRlXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgaWYgKHRoaXJkICYmIHByZXZpb3VzVGhpcmQ/LmlkICE9PSB0aGlyZD8uaWQpIHtcbiAgICAgICAgY29uc3QgeyBjcmVhdG9ySWQgfSA9IHRoaXJkO1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKGNyZWF0b3JJZCwgTm90aWZNc2dzLnF1ZXVlLlRISVJEX1BMQUNFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJPZlF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICApLmdldENvdW50KCk7XG5cbiAgICBpZiAobnVtYmVyT2ZRdWVzdGlvbnMgPT09IDApIHtcbiAgICAgIGNvbnN0IHN0YWZmID0gKFxuICAgICAgICBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoZXZlbnQuZW50aXR5LnF1ZXVlSWQsIHtcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgICAgIH0pXG4gICAgICApLnN0YWZmTGlzdDtcblxuICAgICAgc3RhZmYuZm9yRWFjaCgoc3RhZmYpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBzdGFmZi5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MudGEuU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICB9XG5cbiAgYXN5bmMgYmVmb3JlUmVtb3ZlKGV2ZW50OiBSZW1vdmVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGR1ZSB0byBjYXNjYWRlcyBlbnRpdHkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgbG9hZGVkXG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU2VlZENvbnRyb2xsZXIgfSBmcm9tICcuL3NlZWQuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbU2VlZENvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtTZWVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZWRNb2R1bGUge31cbiIsImltcG9ydCB7IENyZWF0ZVF1ZXN0aW9uUGFyYW1zLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIENvdXJzZUZhY3RvcnksXG4gIE9mZmljZUhvdXJGYWN0b3J5LFxuICBRdWVzdGlvbkZhY3RvcnksXG4gIFF1ZXVlRmFjdG9yeSxcbiAgU2VtZXN0ZXJGYWN0b3J5LFxuICBVc2VyQ291cnNlRmFjdG9yeSxcbiAgVXNlckZhY3RvcnksXG59IGZyb20gJy4uLy4uL3Rlc3QvdXRpbC9mYWN0b3JpZXMnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3NlZWRzJylcbkBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuZXhwb3J0IGNsYXNzIFNlZWRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgc2VlZFNlcnZpY2U6IFNlZWRTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVsZXRlJylcbiAgYXN5bmMgZGVsZXRlQWxsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoT2ZmaWNlSG91ck1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWVzdGlvbk1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWV1ZU1vZGVsKTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgcmVzZXQnO1xuICB9XG5cbiAgQEdldCgnY3JlYXRlJylcbiAgYXN5bmMgY3JlYXRlU2VlZHMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBGaXJzdCBkZWxldGUgdGhlIG9sZCBkYXRhXG4gICAgYXdhaXQgdGhpcy5kZWxldGVBbGwoKTtcblxuICAgIC8vIFRoZW4gYWRkIHRoZSBuZXcgc2VlZCBkYXRhXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuXG4gICAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRvbW9ycm93LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMTkpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgLSA0NTAwMDAwKSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAxMDAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1llc3RlcmRheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHllc3RlcmRheSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHllc3RlcmRheS52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvbW9ycm93ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogdG9tb3Jyb3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh0b21vcnJvdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUV4aXN0cyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFjb3Vyc2VFeGlzdHMpIHtcbiAgICAgIGF3YWl0IFNlbWVzdGVyRmFjdG9yeS5jcmVhdGUoeyBzZWFzb246ICdGYWxsJywgeWVhcjogMjAyMCB9KTtcbiAgICAgIGF3YWl0IENvdXJzZUZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICAgIHJlbGF0aW9uczogWydvZmZpY2VIb3VycyddLFxuICAgIH0pO1xuXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gW1xuICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgIF07XG4gICAgY291cnNlLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJFeHNpc3RzID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKTtcbiAgICBpZiAoIXVzZXJFeHNpc3RzKSB7XG4gICAgICAvLyBTdHVkZW50IDFcbiAgICAgIGNvbnN0IHVzZXIxID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdsaXUuc3RhQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnU3RhbmxleSBMaXUnLFxuICAgICAgICBmaXJzdE5hbWU6ICdTdGFubGV5JyxcbiAgICAgICAgbGFzdE5hbWU6ICdMaXUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVIyMENHMzZFLWNmMGYzNzUyNTJiZC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMSxcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gU3R1bmRlbnQgMlxuICAgICAgY29uc3QgdXNlcjIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3Rha2F5YW1hLmFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdBbGV4IFRha2F5YW1hJyxcbiAgICAgICAgZmlyc3ROYW1lOiAnQWxleCcsXG4gICAgICAgIGxhc3ROYW1lOiAnVGFrYXlhbWEnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUpMOTc0NDNELTUwMTIxMzM5Njg2Yi01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMixcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMVxuICAgICAgY29uc3QgdXNlcjMgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3N0ZW56ZWwud0Bub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1dpbGwgU3RlbnplbCcsXG4gICAgICAgIGZpcnN0TmFtZTogJ1dpbGwnLFxuICAgICAgICBsYXN0TmFtZTogJ1N0ZW56ZWwnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVJGMjU2S1JULWQxMDA5OGU4NzlkYS01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMyxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDJcbiAgICAgIGNvbnN0IHVzZXI0ID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdjaHUuZGFqQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnRGEtSmluIENodScsXG4gICAgICAgIGZpcnN0TmFtZTogJ0RhLUppbicsXG4gICAgICAgIGxhc3ROYW1lOiAnQ2h1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVFNTZZNVVUMS04NWRiNTlhNDc0ZjQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjQsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHJvb206ICdXSFYgMTAxJyxcbiAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgb2ZmaWNlSG91cnM6IFtcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgICAgXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDI1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAR2V0KCdmaWxsX3F1ZXVlJylcbiAgYXN5bmMgZmlsbFF1ZXVlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoKTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVVzZXInKVxuICBhc3luYyBjcmVhdGVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogeyByb2xlOiBSb2xlOyBjb3Vyc2VJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHRhOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSwgY291cnNlOiBjb3Vyc2UgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGE7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVldWUnKVxuICBhc3luYyBjcmVhdGVRdWV1ZShcbiAgICBAQm9keSgpXG4gICAgYm9keToge1xuICAgICAgY291cnNlSWQ6IG51bWJlcjtcbiAgICAgIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuICAgICAgLy8gY2xvc2VzIGluIG4gbWlsbGlzZWNvbmRzIGZyb20gbm93XG4gICAgICBjbG9zZXNJbj86IG51bWJlcjtcbiAgICB9LFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIChib2R5Py5jbG9zZXNJbiB8fCA0NTAwMDAwKSksXG4gICAgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvZHkuYWxsb3dRdWVzdGlvbnMgPz8gZmFsc2UsXG4gICAgfTtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIG9wdGlvbnNbJ2NvdXJzZSddID0gY291cnNlO1xuICAgIH1cbiAgICBjb25zdCBxdWV1ZTogUXVldWVNb2RlbCA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXN0aW9uJylcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIHF1ZXVlSWQ6IG51bWJlcjtcbiAgICAgIHN0dWRlbnRJZDogbnVtYmVyO1xuICAgICAgZGF0YTogQ3JlYXRlUXVlc3Rpb25QYXJhbXM7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWVzdGlvbk1vZGVsPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmIChib2R5LnF1ZXVlSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkucXVldWVJZCk7XG4gICAgICBvcHRpb25zWydxdWV1ZSddID0gcXVldWU7XG4gICAgfVxuICAgIGlmIChib2R5LnN0dWRlbnRJZCkge1xuICAgICAgY29uc3Qgc3R1ZGVudCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuc3R1ZGVudElkKTtcbiAgICAgIG9wdGlvbnNbJ2NyZWF0b3InXSA9IHN0dWRlbnQ7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbk1vZGVsID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgLi4uYm9keS5kYXRhLFxuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ2ZpcnN0TmFtZScsICdVc2VyJylcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5LCAwKTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsICdPbmxpbmUnKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdhbGxvd1F1ZXN0aW9ucycsIGZhbHNlKVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdzdGFmZkxpc3QnLCBVc2VyRmFjdG9yeSwgMCk7XG5cbi8vIFdBUk5JTkc6IERPIE5PVCBVU0UgQ1JFQVRPUklELiBBUyBZT1UgU0VFIEhFUkUsIFdFIE9OTFkgQUNDRVBUIENSRUFUT1Jcbi8vVE9ETzogbWFrZSBpdCBhY2NlcHQgY3JlYXRvcklkIGFzIHdlbGxcbmV4cG9ydCBjb25zdCBRdWVzdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWVzdGlvbk1vZGVsKVxuICAuc2VxdWVuY2UoJ3RleHQnLCAoaSkgPT4gYHF1ZXN0aW9uICR7aX1gKVxuICAuYXR0cignc3RhdHVzJywgJ1F1ZXVlZCcpXG4gIC5hdHRyKCdxdWVzdGlvblR5cGUnLCBRdWVzdGlvblR5cGUuT3RoZXIpXG4gIC5hdHRyKCdjcmVhdGVkQXQnLCBuZXcgRGF0ZSgpKVxuICAuYXNzb2NPbmUoJ3F1ZXVlJywgUXVldWVGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NyZWF0b3InLCBVc2VyRmFjdG9yeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtLWZhY3RvcnlcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZWRTZXJ2aWNlIHtcbiAgYXN5bmMgZGVsZXRlQWxsKG1vZGVsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBnZXRDb25uZWN0aW9uKCkuY3JlYXRlUXVlcnlCdWlsZGVyKCkuZGVsZXRlKCkuZnJvbShtb2RlbCkuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LFxuICBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LFxuICBEZWZhdWx0QWRtaW5TaXRlLFxufSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yIH0gZnJvbSAnLi9jcmVkZW50aWFsVmFsaWRhdG9yJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7XG4gIENvdXJzZUFkbWluLFxuICBRdWV1ZUFkbWluLFxuICBVc2VyQWRtaW4sXG4gIFVzZXJDb3Vyc2VBZG1pbixcbiAgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbixcbn0gZnJvbSAnLi9hZG1pbi1lbnRpdGllcyc7XG5pbXBvcnQgeyBBZG1pbkNvbW1hbmQgfSBmcm9tICcuL2FkbWluLmNvbW1hbmQnO1xuXG5jb25zdCBDb3JlTW9kdWxlID0gQWRtaW5Db3JlTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkNvcmVNb2R1bGUoe30pO1xuY29uc3QgQXV0aE1vZHVsZSA9IEFkbWluQXV0aE1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5BdXRoTW9kdWxlKHtcbiAgYWRtaW5Db3JlTW9kdWxlOiBDb3JlTW9kdWxlLFxuICBjcmVkZW50aWFsVmFsaWRhdG9yOiBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IsIC8vIGhvdyBkbyB5b3UgdmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgaW1wb3J0czogW1R5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbQWRtaW5Vc2VyTW9kZWxdKV0sIC8vIHdoYXQgbW9kdWxlcyBleHBvcnQgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgY3JlZGVudGlhbFZhbGlkYXRvciBhdmFpbGFibGVcbiAgcHJvdmlkZXJzOiBbXSxcbn0pO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0FkbWluQ29tbWFuZF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZG1pblNpdGU6IERlZmF1bHRBZG1pblNpdGUpIHtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZScsIENvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXInLCBVc2VyQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlckNvdXJzZScsIFVzZXJDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdRdWV1ZScsIFF1ZXVlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlU2VjdGlvbk1hcHBpbmcnLCBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWFkbWluXCIpOyIsImltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0JztcblxuZXhwb3J0IGNvbnN0IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciA9IHtcbiAgaW5qZWN0OiBbXSxcbiAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNyZWRlbnRpYWxzKFxuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTxBZG1pblVzZXJNb2RlbD4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGlmIChhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIEJhc2VFbnRpdHksIENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuXG4vKipcbiAqIEFkbWluIHVzZXJzIGFyZSB0b3RhbGx5IHNlcGFyYXRlIGZyb20gcmVndWxhciB1c2VycyBhbmQgY2FuIG9ubHkgYmUgY3JlYXRlZCBmcm9tIGNvbW1hbmQgbGluZS5cbiAqIGB5YXJuIGNsaSBhZG1pbjpjcmVhdGVgXG4gKi9cbkBFbnRpdHkoJ2FkbWluX3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEFkbWluVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBzZXRQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgNSk7XG4gIH1cblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIHVuaXF1ZTogdHJ1ZSwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwiaW1wb3J0IHsgQWRtaW5FbnRpdHkgfSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ25hbWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFF1ZXVlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdyb29tJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXTtcbiAgc2VhcmNoRmllbGRzID0gWydlbWFpbCcsICduYW1lJ107XG4gIGZpZWxkcyA9IFtcbiAgICAnaWQnLFxuICAgICdlbWFpbCcsXG4gICAgJ25hbWUnLFxuICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgJ3F1ZXVlcycsXG4gIF07XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3VzZXJJZCcsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ3NlY3Rpb24nLCAnY291cnNlSWQnXTtcbn1cbiIsImltcG9ydCB7IENvbW1hbmQsIFBvc2l0aW9uYWwgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IHF1ZXN0aW9uLCBrZXlJbllOIH0gZnJvbSAncmVhZGxpbmUtc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkNvbW1hbmQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2NyZWF0ZTphZG1pbiA8dXNlcm5hbWU+JyxcbiAgICBkZXNjcmliZTogJ2NyZWF0ZSBhbiBhZG1pbiB1c2VyJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICBkZXNjcmliZTogJ3RoZSBhZG1pbiB1c2VybmFtZScsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9KVxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VQYXNzd29yZCA9IGtleUluWU4oXG4gICAgICAgIGBVc2VyICR7dXNlcm5hbWV9IGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlaXIgcGFzc3dvcmQ/YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlciA9IEFkbWluVXNlck1vZGVsLmNyZWF0ZSh7IHVzZXJuYW1lIH0pO1xuICAgIH1cbiAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nID0gcXVlc3Rpb24oJ1Bhc3N3b3JkOiAnLCB7XG4gICAgICBoaWRlRWNob0JhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgY29uc29sZS5sb2coYENyZWF0ZWQgdXNlcjogJHt1c2VyLnVzZXJuYW1lfWApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZS1zeW5jXCIpOyIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3NyYy9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuY29uZmlnKCk7XG5cbi8vIE9wdGlvbnMgb25seSB1c2VkIHdoZSBydW4gdmlhIENMSVxuY29uc3QgaW5DTEkgPSB7XG4gIG1pZ3JhdGlvbnM6IFsnbWlncmF0aW9uLyoudHMnXSxcbiAgY2xpOiB7XG4gICAgbWlncmF0aW9uc0RpcjogJ21pZ3JhdGlvbicsXG4gIH0sXG59O1xuXG5jb25zdCB0eXBlb3JtID0ge1xuICB0eXBlOiAncG9zdGdyZXMnLFxuICB1cmw6IHByb2Nlc3MuZW52LkRCX1VSTCB8fCAncG9zdGdyZXM6Ly9wb3N0Z3Jlc0Bsb2NhbGhvc3Q6NTQzMi9kZXYnLFxuICBzeW5jaHJvbml6ZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcbiAgZW50aXRpZXM6IFtcbiAgICBDb3Vyc2VNb2RlbCxcbiAgICBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLFxuICAgIE9mZmljZUhvdXJNb2RlbCxcbiAgICBTZW1lc3Rlck1vZGVsLFxuICAgIFVzZXJNb2RlbCxcbiAgICBVc2VyQ291cnNlTW9kZWwsXG4gICAgUXVlc3Rpb25Nb2RlbCxcbiAgICBRdWV1ZU1vZGVsLFxuICAgIERlc2t0b3BOb3RpZk1vZGVsLFxuICAgIFBob25lTm90aWZNb2RlbCxcbiAgICBBZG1pblVzZXJNb2RlbCxcbiAgICBFdmVudE1vZGVsLFxuICBdLFxuICBrZWVwQ29ubmVjdGlvbkFsaXZlOiB0cnVlLFxuICBsb2dnaW5nOiAhIXByb2Nlc3MuZW52LlRZUEVPUk1fTE9HR0lORyxcbiAgLi4uKCEhcHJvY2Vzcy5lbnYuVFlQRU9STV9DTEkgPyBpbkNMSSA6IHt9KSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvcm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFja2ZpbGxQaG9uZU5vdGlmcyB9IGZyb20gJy4vYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQnO1xuaW1wb3J0IHsgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQgfSBmcm9tICcuL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kJztcbmltcG9ydCB7IEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB9IGZyb20gJy4vc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBCYWNrZmlsbFBob25lTm90aWZzLFxuICAgIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0LFxuICAgIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKChkKSA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKChkKSA9PiBkLmlkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnNUb0Rpc2FibGUgPSAoXG4gICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZCh7XG4gICAgICAgIHdoZXJlOiB7IHBob25lTm90aWZzRW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICByZWxhdGlvbnM6IFsncGhvbmVOb3RpZiddLFxuICAgICAgfSlcbiAgICApLmZpbHRlcigodSkgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCgodSkgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0JyxcbiAgICBkZXNjcmliZTogJ2NvcHkgYWxsIGV4aXN0aW5nIGhlbHBlZEF0IHRvIGZpcnN0SGVscGVkQXQnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjb3B5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgIC51cGRhdGUoKVxuICAgICAgLnNldCh7IGZpcnN0SGVscGVkQXQ6ICgpID0+ICdcImhlbHBlZEF0XCInIH0pXG4gICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgLmNhbGxMaXN0ZW5lcnMoZmFsc2UpXG4gICAgICAuZXhlY3V0ZSgpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFVwZGF0ZWQgJHthd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgICAuZ2V0Q291bnQoKX0gcmVjb3Jkc2AsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6Zmlyc3QtbGFzdC1uYW1lcycsXG4gICAgZGVzY3JpYmU6ICdjaGFuZ2UgYWxsIG5hbWVzIHRvIGZpcnN0IGFuZCBsYXN0IG5hbWVzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlck1vZGVsLmZpbmQoKTtcbiAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZS5zcGxpdCgnICcpWzBdO1xuICAgICAgICB1c2VyLmxhc3ROYW1lID0gdXNlci5uYW1lLnNwbGl0KCcgJykuc2xpY2UoMSkuam9pbignICcpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nIG5hbWUgZmFpbGVkIGZvciAke3VzZXIubmFtZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzKTtcbiAgICBjb25zdCBjb3VudCA9IFVzZXJNb2RlbC5jb3VudCgpO1xuXG4gICAgY29uc29sZS5sb2coYFVwZGF0ZWQgbmFtZXMgZm9yICR7Y291bnR9IHVzZXJzYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgSHR0cE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIgfSBmcm9tICcuL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1JlbGVhc2VOb3Rlc0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+ICh7XG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIG1heFJlZGlyZWN0czogNSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNNb2R1bGUge31cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTLCBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgSHR0cFNlcnZpY2UsXG4gIEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5AQ29udHJvbGxlcigncmVsZWFzZV9ub3RlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGdldFJlbGVhc2VOb3RlcygpOiBQcm9taXNlPEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlID0ge1xuICAgICAgbGFzdFVwZGF0ZWRVbml4VGltZTogbnVsbCxcbiAgICAgIHJlbGVhc2VOb3RlczogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCB0aGlzLmh0dHBTZXJ2aWNlXG4gICAgICAuZ2V0KFxuICAgICAgICAnaHR0cHM6Ly9ub3Rpb24tYXBpLnNwbGl0YmVlLmlvL3YxL3BhZ2UvYWJiYTI0NmJmYTA4NDdiYWEyNzA2YWIzMGQwYzZjN2QnLFxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICAgIGNvbnN0IGRhdGEgPSByZXF1ZXN0LmRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRpbWVUZXh0ID1cbiAgICAgICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10/LnZhbHVlPy5wcm9wZXJ0aWVzXG4gICAgICAgICAgPy50aXRsZVswXVswXTtcbiAgICAgIHJlc3BvbnNlLmxhc3RVcGRhdGVkVW5peFRpbWUgPSB0aW1lVGV4dC5zcGxpdCgnVW5peCAnKVsxXSAqIDEwMDA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIucmVsZWFzZU5vdGVzVGltZShlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgdGltZSBibG9jayBhbmQgcGFnZSBsaW5rIGJsb2NrIGZyb20gcGFnZVxuICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICBkYXRhWyc0ZDI1ZjM5My1lNTcwLTRjZDUtYWQ2Ni1iMjc4YTA5MjQyMjUnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgcmVzcG9uc2UucmVsZWFzZU5vdGVzID0gZGF0YTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUsIEFyZ3VtZW50TWV0YWRhdGEgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbi8qKlxuICogU3RyaXAgdW5kZWZpbmVkIHByb3BlcnRpZXMgZnJvbSBib2R5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RyaXBVbmRlZmluZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBtZXRhZGF0YTogQXJndW1lbnRNZXRhZGF0YSk6IGFueSB7XG4gICAgaWYgKG1ldGFkYXRhLnR5cGUgPT09ICdib2R5Jykge1xuICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkcm9wVW5kZWZpbmVkKG9iajogdW5rbm93bikge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0JyAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3BVbmRlZmluZWQob2JqW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTmVzdEludGVyY2VwdG9yLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBDYWxsSGFuZGxlcixcbiAgSHR0cEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwbUludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgaW50ZXJjZXB0KFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsXG4gICAgbmV4dDogQ2FsbEhhbmRsZXIsXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvbikge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9