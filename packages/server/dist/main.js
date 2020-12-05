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
const stripUndefined_pipe_1 = __webpack_require__(101);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(102);
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
const profile_module_1 = __webpack_require__(74);
const question_module_1 = __webpack_require__(76);
const queue_module_1 = __webpack_require__(46);
const seed_module_1 = __webpack_require__(80);
const admin_module_1 = __webpack_require__(85);
const nestjs_command_1 = __webpack_require__(41);
const sse_module_1 = __webpack_require__(50);
const typeormConfig = __webpack_require__(93);
const backfill_module_1 = __webpack_require__(95);
const release_notes_module_1 = __webpack_require__(99);
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
        const questions = await question_entity_1.QuestionModel.inQueueWithStatus(queueId, Object.values(common_1.OpenQuestionStatus)).getMany();
        const openQuestions = questions.filter((q) => q.status in common_1.OpenQuestionStatus);
        openQuestions.forEach((q) => {
            q.status = common_1.ClosedQuestionStatus.Stale;
            q.closedAt = new Date();
        });
        await question_entity_1.QuestionModel.save(openQuestions);
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
        const heatmap = this._generateHeatMapWithReplay(questions.filter((q) => q.helpedAt.getDate() === q.createdAt.getDate()), officeHours, tz, BUCKET_SIZE_IN_MINS, SAMPLES_PER_BUCKET);
        arrayRotate(heatmap, -moment.tz.zone(tz).utcOffset(Date.now()) / BUCKET_SIZE_IN_MINS);
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
const jwt_strategy_1 = __webpack_require__(72);
const jwt_1 = __webpack_require__(67);
const config_1 = __webpack_require__(9);
const login_course_service_1 = __webpack_require__(71);
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
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(67);
const httpSignature = __webpack_require__(68);
const typeorm_1 = __webpack_require__(19);
const non_production_guard_1 = __webpack_require__(69);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(70);
const login_course_service_1 = __webpack_require__(71);
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
            const verify = httpSignature.verifyHMAC(parsedRequest, this.configService.get('KHOURY_PRIVATE_KEY'));
            if (!verify) {
                throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.loginController.receiveDataFromKhoury);
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

module.exports = require("@nestjs/jwt");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

/***/ }),
/* 69 */
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
/* 70 */
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
exports.LoginCourseService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
const course_section_mapping_entity_1 = __webpack_require__(70);
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
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(73);
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
/* 73 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_controller_1 = __webpack_require__(75);
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
/* 75 */
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
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(58);
const question_controller_1 = __webpack_require__(77);
const question_subscriber_1 = __webpack_require__(79);
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
const question_role_guard_1 = __webpack_require__(78);
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
/* 78 */
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
/* 79 */
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
/* 80 */
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
const seed_controller_1 = __webpack_require__(81);
const seed_service_1 = __webpack_require__(84);
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
/* 81 */
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
const factories_1 = __webpack_require__(82);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const non_production_guard_1 = __webpack_require__(69);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const seed_service_1 = __webpack_require__(84);
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(83);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(70);
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
/* 83 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = __webpack_require__(5);
const nestjs_admin_1 = __webpack_require__(86);
const credentialValidator_1 = __webpack_require__(87);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(88);
const admin_entities_1 = __webpack_require__(90);
const admin_command_1 = __webpack_require__(91);
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
/* 86 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(88);
const bcrypt_1 = __webpack_require__(89);
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
/* 88 */
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
const bcrypt_1 = __webpack_require__(89);
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
/* 89 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(86);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(70);
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
/* 91 */
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
const admin_user_entity_1 = __webpack_require__(88);
const readline_sync_1 = __webpack_require__(92);
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
/* 92 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(94);
const admin_user_entity_1 = __webpack_require__(88);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(70);
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
/* 94 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 95 */
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
const backfill_phone_notifs_command_1 = __webpack_require__(96);
const question_first_helped_at_command_1 = __webpack_require__(97);
const separate_first_last_names_command_1 = __webpack_require__(98);
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
/* 99 */
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
const release_notes_controller_1 = __webpack_require__(100);
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
/* 100 */
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
/* 101 */
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(103);
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
/* 103 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaGVhdG1hcC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5lc3Rqcy1jb21tYW5kXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RyaXBVbmRlZmluZWQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBtLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7QUNsRkEsdUJBQWdDO0FBQ2hDLDJDQUF3QztBQUl4QyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7QUNMdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBLG1EOzs7Ozs7Ozs7O0FDQUEsc0NBQTJDO0FBQzNDLHdDQUFrRTtBQUNsRSw0Q0FBOEM7QUFDOUMsc0NBQWlDO0FBQ2pD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QUVqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQ3ZCLHNCQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLEtBQUssWUFBWSxzQkFBYSxFQUFFO2dCQUNsQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjOzs7Ozs7O0FDWjNCLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgJ2VsYXN0aWMtYXBtLW5vZGUvc3RhcnQnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnLi9ib290c3RyYXAnO1xuXG5kZWNsYXJlIGNvbnN0IG1vZHVsZTogYW55O1xuXG5ib290c3RyYXAobW9kdWxlLmhvdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIpOyIsImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25QaXBlLCBJTmVzdEFwcGxpY2F0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RyaXBVbmRlZmluZWRQaXBlIH0gZnJvbSAnLi9zdHJpcFVuZGVmaW5lZC5waXBlJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEFwbUludGVyY2VwdG9yIH0gZnJvbSAnLi9hcG0uaW50ZXJjZXB0b3InO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcChob3Q6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlLCB7XG4gICAgbG9nZ2VyOiBbJ2Vycm9yJywgJ3dhcm4nLCAnbG9nJywgJ2RlYnVnJywgJ3ZlcmJvc2UnXSxcbiAgfSk7XG4gIGFkZEdsb2JhbHNUb0FwcChhcHApO1xuICBhcHAuc2V0R2xvYmFsUHJlZml4KCdhcGkvdjEnKTtcbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhuZXcgQXBtSW50ZXJjZXB0b3IoKSk7XG5cbiAgaWYgKGlzUHJvZCgpKSB7XG4gICAgY29uc29sZS5sb2coYFJ1bm5pbmcgcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uYCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyBub24tcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uIFRISVMgTVNHIFNIT1VMRCBOT1QgQVBQRUFSIE9OIFBST0QgVk1gLFxuICAgICk7XG4gIH1cbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXdhaXQgYXBwLmxpc3RlbigzMDAyKTtcblxuICBpZiAoaG90KSB7XG4gICAgaG90LmFjY2VwdCgpO1xuICAgIGhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxufVxuXG4vLyBHbG9iYWwgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgdHJ1ZSBpbiBwcm9kIGFuZCBpbiBpbnRlZ3JhdGlvbiB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEdsb2JhbHNUb0FwcChhcHA6IElOZXN0QXBwbGljYXRpb24pOiB2b2lkIHtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKFxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XG4gICAgICB3aGl0ZWxpc3Q6IHRydWUsXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZSxcbiAgICB9KSxcbiAgKTtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBTdHJpcFVuZGVmaW5lZFBpcGUoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dpbk1vZHVsZSB9IGZyb20gJy4vbG9naW4vbG9naW4ubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2R1bGUgfSBmcm9tICcuL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IFNlZWRNb2R1bGUgfSBmcm9tICcuL3NlZWQvc2VlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnLi9zc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyB0eXBlb3JtQ29uZmlnIGZyb20gJy4uL29ybWNvbmZpZyc7XG5pbXBvcnQgeyBCYWNrZmlsbE1vZHVsZSB9IGZyb20gJ2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNNb2R1bGUgfSBmcm9tICdyZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBUeXBlT3JtTW9kdWxlLmZvclJvb3QodHlwZW9ybUNvbmZpZyksXG4gICAgU2NoZWR1bGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExvZ2luTW9kdWxlLFxuICAgIFByb2ZpbGVNb2R1bGUsXG4gICAgQ291cnNlTW9kdWxlLFxuICAgIFF1ZXVlTW9kdWxlLFxuICAgIE5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBRdWVzdGlvbk1vZHVsZSxcbiAgICBTZWVkTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbXG4gICAgICAgICcuZW52JyxcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbJy5lbnYuZGV2ZWxvcG1lbnQnXSA6IFtdKSxcbiAgICAgIF0sXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBZG1pbk1vZHVsZSxcbiAgICBDb21tYW5kTW9kdWxlLFxuICAgIFNTRU1vZHVsZSxcbiAgICBCYWNrZmlsbE1vZHVsZSxcbiAgICBSZWxlYXNlTm90ZXNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy90eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc2NoZWR1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlQ29udHJvbGxlciB9IGZyb20gJy4vY291cnNlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgSUNhbENvbW1hbmQgfSBmcm9tICcuL2ljYWwuY29tbWFuZCc7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYXRtYXBTZXJ2aWNlIH0gZnJvbSAnLi9oZWF0bWFwLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtDb3Vyc2VDb250cm9sbGVyXSxcbiAgaW1wb3J0czogW1F1ZXVlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbSUNhbENvbW1hbmQsIEljYWxTZXJ2aWNlLCBIZWF0bWFwU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEdldENvdXJzZVJlc3BvbnNlLFxuICBRdWV1ZVBhcnRpYWwsXG4gIFJvbGUsXG4gIFRBQ2hlY2tvdXRSZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIGdldFJlcG9zaXRvcnksIE1vcmVUaGFuT3JFcXVhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCwgRXZlbnRUeXBlIH0gZnJvbSAncHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVJvbGVzR3VhcmQgfSBmcm9tICcuL2NvdXJzZS1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBIZWF0bWFwU2VydmljZSB9IGZyb20gJy4vaGVhdG1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxuQENvbnRyb2xsZXIoJ2NvdXJzZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIENvdXJzZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIGhlYXRtYXBTZXJ2aWNlOiBIZWF0bWFwU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5ULCBSb2xlLlRBKVxuICBhc3luYyBnZXQoQFBhcmFtKCdpZCcpIGlkOiBudW1iZXIpOiBQcm9taXNlPEdldENvdXJzZVJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogZm9yIGFsbCBjb3Vyc2UgZW5kcG9pbnQsIGNoZWNrIGlmIHRoZXkncmUgYSBzdHVkZW50IG9yIGEgVEFcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWVzJywgJ3F1ZXVlcy5zdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIC8vIFVzZSByYXcgcXVlcnkgZm9yIHBlcmZvcm1hbmNlIChhdm9pZCBlbnRpdHkgaW5zdGFudGlhdGlvbiBhbmQgc2VyaWFsaXphdGlvbilcbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ29oJylcbiAgICAgIC5zZWxlY3QoWydpZCcsICd0aXRsZScsIGBcInN0YXJ0VGltZVwiYCwgYFwiZW5kVGltZVwiYF0pXG4gICAgICAud2hlcmUoJ29oLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuICAgIGNvdXJzZS5oZWF0bWFwID0gYXdhaXQgdGhpcy5oZWF0bWFwU2VydmljZS5nZXRIZWF0bWFwRm9yKGlkKTtcblxuICAgIGNvdXJzZS5xdWV1ZXMgPSBhd2FpdCBhc3luYy5maWx0ZXIoXG4gICAgICBjb3Vyc2UucXVldWVzLFxuICAgICAgYXN5bmMgKHEpID0+IGF3YWl0IHEuY2hlY2tJc09wZW4oKSxcbiAgICApO1xuICAgIGF3YWl0IGFzeW5jLmVhY2goY291cnNlLnF1ZXVlcywgYXN5bmMgKHEpID0+IHtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVUaW1lcygpO1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVNpemUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3Vyc2U7XG4gIH1cblxuICBAUG9zdCgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja0luKFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxRdWV1ZVBhcnRpYWw+IHtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QucHVzaCh1c2VyKTtcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCBFdmVudE1vZGVsLmNyZWF0ZSh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgZXZlbnRUeXBlOiBFdmVudFR5cGUuVEFfQ0hFQ0tFRF9JTixcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQERlbGV0ZSgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja091dChcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8VEFDaGVja291dFJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcbiAgICBxdWV1ZS5zdGFmZkxpc3QgPSBxdWV1ZS5zdGFmZkxpc3QuZmlsdGVyKChlKSA9PiBlLmlkICE9PSB1c2VyLmlkKTtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfT1VULFxuICAgICAgdXNlcixcbiAgICAgIGNvdXJzZUlkLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIGNvbnN0IGNhbkNsZWFyUXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLnNob3VsZENsZWFuUXVldWUocXVldWUpO1xuICAgIGxldCBuZXh0T2ZmaWNlSG91clRpbWUgPSBudWxsO1xuXG4gICAgLy8gZmluZCBvdXQgaG93IGxvbmcgdW50aWwgbmV4dCBvZmZpY2UgaG91clxuICAgIGlmIChjYW5DbGVhclF1ZXVlKSB7XG4gICAgICBjb25zdCBzb29uID0gbW9tZW50KCkuYWRkKDE1LCAnbWludXRlcycpLnRvRGF0ZSgpO1xuICAgICAgY29uc3QgbmV4dE9mZmljZUhvdXIgPSBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKHNvb24pIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgc3RhcnRUaW1lOiAnQVNDJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV4dE9mZmljZUhvdXJUaW1lID0gbmV4dE9mZmljZUhvdXI/LnN0YXJ0VGltZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiB7IHF1ZXVlSWQ6IHF1ZXVlLmlkLCBjYW5DbGVhclF1ZXVlLCBuZXh0T2ZmaWNlSG91clRpbWUgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHtcbiAgSXNCb29sZWFuLFxuICBJc0RlZmluZWQsXG4gIElzRW51bSxcbiAgSXNJbnQsXG4gIElzTm90RW1wdHksXG4gIElzT3B0aW9uYWwsXG4gIElzU3RyaW5nLFxuICBWYWxpZGF0ZUlmLFxufSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5cbmV4cG9ydCBjb25zdCBQUk9EX1VSTCA9IFwiaHR0cHM6Ly9raG91cnlvZmZpY2Vob3Vycy5jb21cIjtcbmV4cG9ydCBjb25zdCBpc1Byb2QgPSAoKTogYm9vbGVhbiA9PlxuICBwcm9jZXNzLmVudi5ET01BSU4gPT09IFBST0RfVVJMIHx8XG4gICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdz8ubG9jYXRpb24/Lm9yaWdpbiA9PT0gUFJPRF9VUkwpO1xuXG4vLyBUT0RPOiBDbGVhbiB0aGlzIHVwLCBtb3ZlIGl0IHNvbXdoZXJlIGVsc2UsIHVzZSBtb21lbnQ/Pz9cbi8vIGEgLSBiLCBpbiBtaW51dGVzXG5leHBvcnQgZnVuY3Rpb24gdGltZURpZmZJbk1pbnMoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciB7XG4gIHJldHVybiAoYS5nZXRUaW1lKCkgLSBiLmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBJIEJhc2UgRGF0YSBUeXBlcyAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBOT1RFOiBUaGVzZSBhcmUgbm90IHRoZSBEQiBkYXRhIHR5cGVzLiBUaGV5IGFyZSBvbmx5IHVzZWQgZm9yIHRoZSBhcGlcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXNlci5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIGVtYWlsIHN0cmluZyBvZiB0aGUgdXNlciBpZiB0aGV5IHByb3ZpZGUgaXQgKG51bGxhYmxlKVxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICogQHBhcmFtIGNvdXJzZXMgLSBUaGUgbGlzdCBvZiBjb3Vyc2VzIHRoYXQgdGhlIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIChhcyBlaXRoZXIgYSAnc3R1ZGVudCcsICd0YScgb3IgJ3Byb2Zlc3NvcicpXG4gKiBAcGFyYW0gZGVza3RvcE5vdGlmcyAtIGxpc3Qgb2YgZW5kcG9pbnRzIHNvIHRoYXQgZnJvbnRlbmQgY2FuIGZpZ3VyZSBvdXQgaWYgZGV2aWNlIGlzIGVuYWJsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWwhOiBzdHJpbmc7XG4gIGZpcnN0TmFtZT86IHN0cmluZztcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XG4gIG5hbWUhOiBzdHJpbmc7XG4gIHBob3RvVVJMITogc3RyaW5nO1xuICBjb3Vyc2VzITogVXNlckNvdXJzZVtdO1xuICBkZXNrdG9wTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGVza3RvcE5vdGlmUGFydGlhbClcbiAgZGVza3RvcE5vdGlmcyE6IERlc2t0b3BOb3RpZlBhcnRpYWxbXTtcblxuICBwaG9uZU5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuICBwaG9uZU51bWJlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW5kcG9pbnQhOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIHBhcnRpYWwgdXNlciBpbmZvIG5lZWRlZCBieSB0aGUgZnJvbnRlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZVxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcGhvdG9VUkw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpYWwgY291cnNlIGRhdGEgbmVlZGVkIG9uIHRoZSBmcm9udCBlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqL1xuZXhwb3J0IHR5cGUgQ291cnNlUGFydGlhbCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIHRoYXQgYSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCBhbmQgdGhlaXIgcm9sZSBpbiB0aGF0IGNvdXJzZVxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhlIHVzZXIgYWNjb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHJvbGUgLSBUaGUgdXNlcidzIHJvbGUgaW4gdGhlIGNvdXJzZS5cbiAqL1xuZXhwb3J0IHR5cGUgVXNlckNvdXJzZSA9IHtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb2xlOiBSb2xlO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSB1c2VyIHJvbGVzIGluIGEgY291cnNlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgU1RVREVOVCA9IFwic3R1ZGVudFwiLFxuICBUQSA9IFwidGFcIixcbiAgUFJPRkVTU09SID0gXCJwcm9mZXNzb3JcIixcbn1cblxuY2xhc3MgT2ZmaWNlSG91clBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgdGl0bGUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lITogRGF0ZTtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHRoYXQgc3R1ZGVudHMgY2FuIGpvaW4gd2l0aCB0aGllciB0aWNrZXRzLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGF0IHRoaXMgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGZvci5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBxdWVzdGlvbnMgLSBUaGUgbGlzdCBvZiB0aGUgc3R1ZGVudHMgcXVlc3Rpb25zIGFzc29jYWl0ZWQgd2l0aCB0aGUgcXVldWUuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWUge1xuICBpZDogbnVtYmVyO1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvb206IHN0cmluZztcbiAgc3RhZmZMaXN0OiBVc2VyUGFydGlhbFtdO1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gIHN0YXJ0VGltZT86IERhdGU7XG4gIGVuZFRpbWU/OiBEYXRlO1xuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHBhcnRpYWwgdG8gYmUgc2hvd24gb24gdGhlIHRvZGF5IHBhZ2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICByb29tITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBzdGFmZkxpc3QhOiBVc2VyUGFydGlhbFtdO1xuXG4gIHF1ZXVlU2l6ZSE6IG51bWJlcjtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGlzT3BlbiE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lPzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lPzogRGF0ZTtcblxuICBhbGxvd1F1ZXN0aW9ucyE6IGJvb2xlYW47XG59XG5cbi8vIFJlcHJlc2VudHMgYSBsaXN0IG9mIG9mZmljZSBob3VycyB3YWl0IHRpbWVzIG9mIGVhY2ggaG91ciBvZiB0aGUgd2Vlay5cbi8vIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBhcnJheSBpcyB0aGUgd2FpdCB0aW1lIGZvciB0aGUgZmlyc3QgaG91ciBvZiBTdW5kYXksIFVUQy5cbi8vICAgVXNlcnMgb2YgdGhlIGhlYXRtYXAgc2hvdWxkIHJvdGF0ZSBpdCBhY2NvcmRpbmcgdG8gdGhlaXIgdGltZXpvbmUuXG4vLyBJTlZBUklBTlQ6IE11c3QgaGF2ZSAyNCo3IGVsZW1lbnRzXG4vL1xuLy8gV2FpdCB0aW1lID0gLTEgcmVwcmVzZW50cyBubyBvZmZpY2UgaG91cnMgZGF0YSBhdCB0aGF0IHRpbWUuXG5leHBvcnQgdHlwZSBIZWF0bWFwID0gQXJyYXk8bnVtYmVyPjtcblxuLyoqXG4gKiBBIFF1ZXN0aW9uIGlzIGNyZWF0ZWQgd2hlbiBhIHN0dWRlbnQgd2FudHMgaGVscCBmcm9tIGEgVEEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBzdHVkZW50IHF1ZXN0aW9uLlxuICogQHBhcmFtIGNyZWF0b3IgLSBUaGUgU3R1ZGVudCB0aGF0IGhhcyBjcmVhdGVkIHRoZSBxdWVzdGlvbi5cbiAqIEBwYXJhbSB0ZXh0IC0gVGhlIHRleHQgZGVzY3JpdGlwbiBvZiB3aGF0IGhlL3NoZSBuZWVkcyBoZWxwIHdpdGguXG4gKiBAcGFyYW0gY3JlYXRlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUaWNrZXQgd2FzIGNyZWF0ZWQuIEV4OiBcIjIwMjAtMDktMTJUMTI6MDA6MDAtMDQ6MDBcIlxuICogQHBhcmFtIGhlbHBlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBiZWdhbiBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIGNsb3NlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBmaW5pc2hlZCBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIHF1ZXN0aW9uVHlwZSAtIFRoZSBxdWVzdGlvbiB0eXBlIGhlbHBzIGRpc3Rpbmd1aXNoIHF1ZXN0aW9uIGZvciBUQSdzIGFuZCBkYXRhIGluc2lnaHRzLlxuICogQHBhcmFtIHN0YXR1cyAtIFRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhpcyBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcnRpY3VsYXIgc3R1ZGVudCwgdG8gaGVscCBUQSdzIGZpbmQgdGhlbVxuICogQHBhcmFtIGlzT25saW5lIC0gV2V0aGVyIG9yIG5vdCB0aGUgcXVlc3Rpb24gd2lsbCBoZWxwZWQgb25saW5lIG9yIGluLXBlcnNvblxuICovXG5leHBvcnQgY2xhc3MgUXVlc3Rpb24ge1xuICBpZCE6IG51bWJlcjtcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgY3JlYXRvciE6IFVzZXJQYXJ0aWFsO1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICB0YUhlbHBlZD86IFVzZXJQYXJ0aWFsO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgaGVscGVkQXQ/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNsb3NlZEF0PzogRGF0ZTtcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuICBzdGF0dXMhOiBRdWVzdGlvblN0YXR1cztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIGlzT25saW5lPzogYm9vbGVhbjtcbn1cblxuLy8gUXVlc3Rpb24gVHlwZXNcbmV4cG9ydCBlbnVtIFF1ZXN0aW9uVHlwZSB7XG4gIENvbmNlcHQgPSBcIkNvbmNlcHRcIixcbiAgQ2xhcmlmaWNhdGlvbiA9IFwiQ2xhcmlmaWNhdGlvblwiLFxuICBUZXN0aW5nID0gXCJUZXN0aW5nXCIsXG4gIEJ1ZyA9IFwiQnVnXCIsXG4gIFNldHVwID0gXCJTZXR1cFwiLFxuICBPdGhlciA9IFwiT3RoZXJcIixcbn1cblxuZXhwb3J0IGVudW0gT3BlblF1ZXN0aW9uU3RhdHVzIHtcbiAgRHJhZnRpbmcgPSBcIkRyYWZ0aW5nXCIsXG4gIFF1ZXVlZCA9IFwiUXVldWVkXCIsXG4gIEhlbHBpbmcgPSBcIkhlbHBpbmdcIixcbiAgUHJpb3JpdHlRdWV1ZWQgPSBcIlByaW9yaXR5UXVldWVkXCIsXG59XG5cbi8qKlxuICogTGltYm8gc3RhdHVzZXMgYXJlIGF3YWl0aW5nIHNvbWUgY29uZmlybWF0aW9uIGZyb20gdGhlIHN0dWRlbnRcbiAqL1xuZXhwb3J0IGVudW0gTGltYm9RdWVzdGlvblN0YXR1cyB7XG4gIENhbnRGaW5kID0gXCJDYW50RmluZFwiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBzdHVkZW50IGNhbid0IGJlIGZvdW5kIGJ5IGEgVEFcbiAgUmVRdWV1ZWluZyA9IFwiUmVRdWV1ZWluZ1wiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBUQSB3YW50cyB0byBnZXQgYmFjayB0byBhIHN0dWRlbnQgbGF0ZXIgYW5kIGdpdmUgdGhlbSB0aGUgb3B0aW9uIHRvIGJlIHB1dCBpbnRvIHRoZSBwcmlvcml0eSBxdWV1ZVxuICBUQURlbGV0ZWQgPSBcIlRBRGVsZXRlZFwiLCAvLyBXaGVuIGEgVEEgZGVsZXRlcyBhIHF1ZXN0aW9uIGZvciBhIG11bHRpdHVkZSBvZiByZWFzb25zXG59XG5cbmV4cG9ydCBlbnVtIENsb3NlZFF1ZXN0aW9uU3RhdHVzIHtcbiAgUmVzb2x2ZWQgPSBcIlJlc29sdmVkXCIsXG4gIENvbmZpcm1lZERlbGV0ZWQgPSBcIkNvbmZpcm1lZERlbGV0ZWRcIixcbiAgU3R1ZGVudENhbmNlbGxlZCA9IFwiU3R1ZGVudENhbmNlbGxlZFwiLFxuICBTdGFsZSA9IFwiU3RhbGVcIixcbn1cblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUXVldWUgPSBbXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZCxcbl07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblByaW9yaXR5UXVldWUgPSBbT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c1NlbnRUb0NyZWF0b3IgPSBbXG4gIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgLi4uU3RhdHVzSW5RdWV1ZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQsXG5dO1xuXG4vLyBUaWNrZXQgU3RhdHVzIC0gUmVwcmVzZW50cyBhIGdpdmVuIHN0YXR1cyBvZiBhcyBzdHVkZW50J3MgdGlja2V0XG5leHBvcnQgdHlwZSBRdWVzdGlvblN0YXR1cyA9IGtleW9mIHR5cGVvZiBRdWVzdGlvblN0YXR1c0tleXM7XG4vLyBhbiBFbnVtLWxpa2UgY29uc3RhbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIHN0YXR1c2VzIGZvciBjb252ZW5pZW5jZS5cbmV4cG9ydCBjb25zdCBRdWVzdGlvblN0YXR1c0tleXMgPSB7XG4gIC4uLk9wZW5RdWVzdGlvblN0YXR1cyxcbiAgLi4uQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkxpbWJvUXVlc3Rpb25TdGF0dXMsXG59O1xuXG4vKipcbiAqIEEgU2VtZXN0ZXIgb2JqZWN0LCByZXByZXNlbnRpbmcgYSBzY2hlZHVsZSBzZW1lc3RlciB0ZXJtIGZvciB0aGUgcHVycG9zZXMgb2YgYSBjb3Vyc2UuXG4gKiBAcGFyYW0gc2Vhc29uIC0gVGhlIHNlYXNvbiBvZiB0aGlzIHNlbWVzdGVyLlxuICogQHBhcmFtIHllYXIgLSBUaGUgeWVhciBvZiB0aGlzIHNlbWVzdGVyLlxuICovXG5pbnRlcmZhY2UgU2VtZXN0ZXIge1xuICBzZWFzb246IFNlYXNvbjtcbiAgeWVhcjogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRoZSBzZWFzb25zIGluIHdoaWNoIGEgY291cnNlIGNhbiB0YWtlIHBsYWNlLlxuICovXG5leHBvcnQgdHlwZSBTZWFzb24gPSBcIkZhbGxcIiB8IFwiU3ByaW5nXCIgfCBcIlN1bW1lciAxXCIgfCBcIlN1bW1lciAyXCI7XG5cbmV4cG9ydCB0eXBlIERlc2t0b3BOb3RpZkJvZHkgPSB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIGV4cGlyYXRpb25UaW1lPzogbnVtYmVyO1xuICBrZXlzOiB7XG4gICAgcDI1NmRoOiBzdHJpbmc7XG4gICAgYXV0aDogc3RyaW5nO1xuICB9O1xuICBuYW1lPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUGhvbmVOb3RpZkJvZHkgPSB7XG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09IEFQSSBSb3V0ZSBUeXBlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE9uIGJhY2tlbmQsIHZhbGlkYXRlZCB3aXRoIGh0dHBzOi8vZG9jcy5uZXN0anMuY29tL3RlY2huaXF1ZXMvdmFsaWRhdGlvblxuLy8gQVBJIHJvdXRlIFBhcmFtcyBhbmQgUmVzcG9uc2VzXG5cbi8vIE9mZmljZSBIb3VycyBSZXNwb25zZSBUeXBlc1xuZXhwb3J0IGNsYXNzIEdldFByb2ZpbGVSZXNwb25zZSBleHRlbmRzIFVzZXIge31cblxuZXhwb3J0IGNsYXNzIEtob3VyeURhdGFQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBlbWFpbCE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBmaXJzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGxhc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNJbnQoKVxuICBjYW1wdXMhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNTdHJpbmcoKVxuICBwaG90b191cmwhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgY291cnNlcyE6IEtob3VyeVN0dWRlbnRDb3Vyc2VbXTtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICB0YV9jb3Vyc2VzITogS2hvdXJ5VEFDb3Vyc2VbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVN0dWRlbnRDb3Vyc2Uge1xuICBASXNJbnQoKVxuICBjcm4hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhY2NlbGVyYXRlZCE6IGJvb2xlYW47XG5cbiAgQElzSW50KClcbiAgc2VjdGlvbiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICB0aXRsZSE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVRBQ291cnNlIHtcbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEtob3VyeVJlZGlyZWN0UmVzcG9uc2Uge1xuICByZWRpcmVjdDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZVBhcmFtcyB7XG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBwaG9uZU5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBWYWxpZGF0ZUlmKChvKSA9PiBvLnBob25lTm90aWZzRW5hYmxlZClcbiAgQElzU3RyaW5nKClcbiAgQElzTm90RW1wdHkoKVxuICBwaG9uZU51bWJlcj86IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGZpcnN0TmFtZT86IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxhc3ROYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUmVzcG9uc2Uge1xuICBpZCE6IG51bWJlcjtcbiAgbmFtZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBPZmZpY2VIb3VyUGFydGlhbClcbiAgb2ZmaWNlSG91cnMhOiBBcnJheTxPZmZpY2VIb3VyUGFydGlhbD47XG5cbiAgQFR5cGUoKCkgPT4gUXVldWVQYXJ0aWFsKVxuICBxdWV1ZXMhOiBRdWV1ZVBhcnRpYWxbXTtcblxuICBoZWF0bWFwITogSGVhdG1hcCB8IGZhbHNlO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVldWVSZXNwb25zZSBleHRlbmRzIFF1ZXVlUGFydGlhbCB7fVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUXVldWVzUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWV1ZVBhcnRpYWw+IHt9XG5cbmV4cG9ydCBjbGFzcyBMaXN0UXVlc3Rpb25zUmVzcG9uc2Uge1xuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgeW91clF1ZXN0aW9uPzogUXVlc3Rpb247XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXN0aW9uc0dldHRpbmdIZWxwITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcHJpb3JpdHlRdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICB0ZXh0ITogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBxdWV1ZUlkITogbnVtYmVyO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBmb3JjZSE6IGJvb2xlYW47XG59XG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgdGV4dD86IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgQElzT3B0aW9uYWwoKVxuICBxdWV1ZUlkPzogbnVtYmVyO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25TdGF0dXNLZXlzKVxuICBASXNPcHRpb25hbCgpXG4gIHN0YXR1cz86IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgdHlwZSBUQVVwZGF0ZVN0YXR1c1Jlc3BvbnNlID0gUXVldWVQYXJ0aWFsO1xuZXhwb3J0IHR5cGUgUXVldWVOb3RlUGF5bG9hZFR5cGUgPSB7XG4gIG5vdGVzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVEFDaGVja291dFJlc3BvbnNlIHtcbiAgLy8gVGhlIElEIG9mIHRoZSBxdWV1ZSB3ZSBjaGVja2VkIG91dCBvZlxuICBxdWV1ZUlkITogbnVtYmVyO1xuICBjYW5DbGVhclF1ZXVlITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBuZXh0T2ZmaWNlSG91clRpbWU/OiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVldWVQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIG5vdGVzPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhbGxvd1F1ZXN0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTU0VRdWV1ZVJlc3BvbnNlIHtcbiAgcXVldWU/OiBHZXRRdWV1ZVJlc3BvbnNlO1xuICBxdWVzdGlvbnM/OiBMaXN0UXVlc3Rpb25zUmVzcG9uc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvQm9keSB7XG4gIFRvQ291bnRyeTogc3RyaW5nO1xuICBUb1N0YXRlOiBzdHJpbmc7XG4gIFNtc01lc3NhZ2VTaWQ6IHN0cmluZztcbiAgTnVtTWVkaWE6IHN0cmluZztcbiAgVG9DaXR5OiBzdHJpbmc7XG4gIEZyb21aaXA6IHN0cmluZztcbiAgU21zU2lkOiBzdHJpbmc7XG4gIEZyb21TdGF0ZTogc3RyaW5nO1xuICBTbXNTdGF0dXM6IHN0cmluZztcbiAgRnJvbUNpdHk6IHN0cmluZztcbiAgQm9keTogc3RyaW5nO1xuICBGcm9tQ291bnRyeTogc3RyaW5nO1xuICBUbzogc3RyaW5nO1xuICBUb1ppcDogc3RyaW5nO1xuICBOdW1TZWdtZW50czogc3RyaW5nO1xuICBNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIEFjY291bnRTaWQ6IHN0cmluZztcbiAgRnJvbTogc3RyaW5nO1xuICBBcGlWZXJzaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2Uge1xuICByZWxlYXNlTm90ZXM6IHVua25vd247XG4gIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEVSUk9SX01FU1NBR0VTID0ge1xuICBxdWVzdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBjcmVhdGVRdWVzdGlvbjoge1xuICAgICAgaW52YWxpZFF1ZXVlOiBcIlBvc3RlZCB0byBhbiBpbnZhbGlkIHF1ZXVlXCIsXG4gICAgICBub05ld1F1ZXN0aW9uczogXCJRdWV1ZSBub3QgYWxsb3dpbmcgbmV3IHF1ZXN0aW9uc1wiLFxuICAgICAgY2xvc2VkUXVldWU6IFwiUXVldWUgaXMgY2xvc2VkXCIsXG4gICAgICBvbmVRdWVzdGlvbkF0QVRpbWU6IFwiWW91IGNhbid0IGNyZWF0ZSBtb3JlIHRoYW4gb25lIHF1ZXN0aW9uIGF0IGEgdGltZS5cIixcbiAgICB9LFxuICAgIHVwZGF0ZVF1ZXN0aW9uOiB7XG4gICAgICBmc21WaW9sYXRpb246IChcbiAgICAgICAgcm9sZTogc3RyaW5nLFxuICAgICAgICBxdWVzdGlvblN0YXR1czogc3RyaW5nLFxuICAgICAgICBib2R5U3RhdHVzOiBzdHJpbmdcbiAgICAgICk6IHN0cmluZyA9PlxuICAgICAgICBgJHtyb2xlfSBjYW5ub3QgY2hhbmdlIHN0YXR1cyBmcm9tICR7cXVlc3Rpb25TdGF0dXN9IHRvICR7Ym9keVN0YXR1c31gLFxuICAgICAgdGFPbmx5RWRpdFF1ZXN0aW9uU3RhdHVzOiBcIlRBL1Byb2Zlc3NvcnMgY2FuIG9ubHkgZWRpdCBxdWVzdGlvbiBzdGF0dXNcIixcbiAgICAgIG90aGVyVEFIZWxwaW5nOiBcIkFub3RoZXIgVEEgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICBvdGhlclRBUmVzb2x2ZWQ6IFwiQW5vdGhlciBUQSBoYXMgYWxyZWFkeSByZXNvbHZlZCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICB0YUhlbHBpbmdPdGhlcjogXCJUQSBpcyBhbHJlYWR5IGhlbHBpbmcgc29tZW9uZSBlbHNlXCIsXG4gICAgICBsb2dpblVzZXJDYW50RWRpdDogXCJMb2dnZWQtaW4gdXNlciBkb2VzIG5vdCBoYXZlIGVkaXQgYWNjZXNzXCIsXG4gICAgfSxcbiAgfSxcbiAgbG9naW5Db250cm9sbGVyOiB7XG4gICAgcmVjZWl2ZURhdGFGcm9tS2hvdXJ5OiBcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmVcIixcbiAgfSxcbiAgbm90aWZpY2F0aW9uQ29udHJvbGxlcjoge1xuICAgIG1lc3NhZ2VOb3RGcm9tVHdpbGlvOiBcIk1lc3NhZ2Ugbm90IGZyb20gVHdpbGlvXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvblNlcnZpY2U6IHtcbiAgICByZWdpc3RlclBob25lOiBcInBob25lIG51bWJlciBpbnZhbGlkXCIsXG4gIH0sXG4gIHF1ZXN0aW9uUm9sZUd1YXJkOiB7XG4gICAgcXVlc3Rpb25Ob3RGb3VuZDogXCJRdWVzdGlvbiBub3QgZm91bmRcIixcbiAgICBxdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZDogXCJDYW5ub3QgZmluZCBxdWV1ZSBvZiBxdWVzdGlvblwiLFxuICAgIHF1ZXVlRG9lc05vdEV4aXN0OiBcIlRoaXMgcXVldWUgZG9lcyBub3QgZXhpc3QhXCIsXG4gIH0sXG4gIHF1ZXVlUm9sZUd1YXJkOiB7XG4gICAgcXVldWVOb3RGb3VuZDogXCJRdWV1ZSBub3QgZm91bmRcIixcbiAgfSxcbiAgcmVsZWFzZU5vdGVzQ29udHJvbGxlcjoge1xuICAgIHJlbGVhc2VOb3Rlc1RpbWU6IChlOiBhbnkpOiBzdHJpbmcgPT5cbiAgICAgIFwiRXJyb3IgUGFyc2luZyByZWxlYXNlIG5vdGVzIHRpbWU6IFwiICsgZSxcbiAgfSxcbiAgcm9sZUd1YXJkOiB7XG4gICAgbm90TG9nZ2VkSW46IFwiTXVzdCBiZSBsb2dnZWQgaW5cIixcbiAgICBub0NvdXJzZUlkRm91bmQ6IFwiTm8gY291cnNlaWQgZm91bmRcIixcbiAgICBub3RJbkNvdXJzZTogXCJOb3QgSW4gVGhpcyBDb3Vyc2VcIixcbiAgICBtdXN0QmVSb2xlVG9Kb2luQ291cnNlOiAocm9sZXM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gICAgICBgWW91IG11c3QgaGF2ZSBvbmUgb2Ygcm9sZXMgWyR7cm9sZXMuam9pbihcIiwgXCIpfV0gdG8gYWNjZXNzIHRoaXMgY291cnNlYCxcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy10cmFuc2Zvcm1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsImltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBFdmVudCBpbiB0aGUgRXZlbnRNb2RlbCB0YWJsZSwgdXNlZCBmb3IgYWR2YW5jZWQgbWV0cmljcy5cbiAqL1xuZXhwb3J0IGVudW0gRXZlbnRUeXBlIHtcbiAgVEFfQ0hFQ0tFRF9JTiA9ICd0YUNoZWNrZWRJbicsXG4gIFRBX0NIRUNLRURfT1VUID0gJ3RhQ2hlY2tlZE91dCcsXG59XG5cbkBFbnRpdHkoJ2V2ZW50X21vZGVsJylcbmV4cG9ydCBjbGFzcyBFdmVudE1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdGltZTogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ2VudW0nLCBlbnVtOiBFdmVudFR5cGUgfSlcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5ldmVudHMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSGVhdG1hcCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4vc2VtZXN0ZXIuZW50aXR5JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIGluIHRoZSBjb250ZXh0IG9mIG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqIEBwYXJhbSBzZW1lc3RlciAtIFRoZSBzZW1lc3RlciBvZiB0aGlzIGNvdXJzZS5cbiAqL1xuLyppbnRlcmZhY2UgQ291cnNlIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBzZW1lc3RlcjogU2VtZXN0ZXI7XG4gICAgdXNlcnM6IFVzZXJDb3Vyc2VbXVxufSovXG5cbkBFbnRpdHkoJ2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5jb3Vyc2UpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5jb3Vyc2UpXG4gIHF1ZXVlczogUXVldWVNb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBpY2FsVVJMOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gVXNlckNvdXJzZU1vZGVsLCAodWNtKSA9PiB1Y20uY291cnNlKVxuICBARXhjbHVkZSgpXG4gIHVzZXJDb3Vyc2VzOiBVc2VyQ291cnNlTW9kZWw7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gU2VtZXN0ZXJNb2RlbCwgKHNlbWVzdGVyKSA9PiBzZW1lc3Rlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdzZW1lc3RlcklkJyB9KVxuICBARXhjbHVkZSgpXG4gIHNlbWVzdGVyOiBTZW1lc3Rlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIC8vIFRPRE86IGNhbiB3ZSBtYWtlIHRoZXNlIG5vdCBudWxsYWJsZSBhbmQgd29yayB3aXRoIFR5cGVPUk1cbiAgc2VtZXN0ZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ2Jvb2xlYW4nLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGVuYWJsZWQ6IGJvb2xlYW47IC8vIFNldCB0byB0cnVlIGlmIHRoZSBnaXZlbiB0aGUgY291cnNlIGlzIHVzaW5nIG91ciBhcHBcblxuICAvLyBUaGUgaGVhdG1hcCBpcyBmYWxzZSB3aGVuIHRoZXJlIGhhdmVudCBiZWVuIGFueSBxdWVzdGlvbnMgYXNrZWQgeWV0IG9yIHRoZXJlIGhhdmVudCBiZWVuIGFueSBvZmZpY2UgaG91cnNcbiAgaGVhdG1hcDogSGVhdG1hcCB8IGZhbHNlO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQuY291cnNlKVxuICBARXhjbHVkZSgpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgndXNlcl9jb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS51c2VyQ291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogUm9sZSwgZGVmYXVsdDogUm9sZS5TVFVERU5UIH0pXG4gIHJvbGU6IFJvbGU7XG59XG4iLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIE1hbnlUb01hbnksXG4gIE9uZVRvTWFueSxcbiAgT25lVG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3VzZXItY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBmaXJzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsYXN0TmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG90b1VSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgY291cnNlczogVXNlckNvdXJzZU1vZGVsW107XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIGRlc2t0b3BzP1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgcGhvbmU/XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gRGVza3RvcE5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZNb2RlbFtdO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gUGhvbmVOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZjogUGhvbmVOb3RpZk1vZGVsO1xuXG4gIEBFeGNsdWRlKClcbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUuc3RhZmZMaXN0KVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBARXhjbHVkZSgpXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQudXNlcilcbiAgZXZlbnRzOiBFdmVudE1vZGVsW107XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBDcmVhdGVEYXRlQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdkZXNrdG9wX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGV4cGlyYXRpb25UaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwMjU2ZGg6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgYXV0aDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZGVza3RvcE5vdGlmcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgdHlwZTogJ3RpbWVzdGFtcCcgfSlcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAndGV4dCcsIG51bGxhYmxlOiB0cnVlIH0pXG4gIG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgncGhvbmVfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFBob25lTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnBob25lTm90aWYpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdmVyaWZpZWQ6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTGVzc1RoYW5PckVxdWFsLFxuICBNYW55VG9NYW55LFxuICBNYW55VG9PbmUsXG4gIE1vcmVUaGFuT3JFcXVhbCxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuXG5pbnRlcmZhY2UgVGltZUludGVydmFsIHtcbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xufVxuXG5ARW50aXR5KCdxdWV1ZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVldWVNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5xdWV1ZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHJvb206IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWVzdGlvbk1vZGVsLCAocW0pID0+IHFtLnF1ZXVlKVxuICBARXhjbHVkZSgpXG4gIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIG5vdGVzOiBzdHJpbmc7XG5cbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucXVldWVzKVxuICBASm9pblRhYmxlKClcbiAgc3RhZmZMaXN0OiBVc2VyTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2gucXVldWUpXG4gIEBKb2luVGFibGUoKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xuXG4gIGlzT3BlbjogYm9vbGVhbjtcblxuICBhc3luYyBjaGVja0lzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zdGFmZkxpc3QgJiYgdGhpcy5zdGFmZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgTVNfSU5fTUlOVVRFID0gNjAwMDA7XG4gICAgY29uc3Qgb2hzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IG9wZW4gPSAhIW9ocy5maW5kKFxuICAgICAgKGUpID0+XG4gICAgICAgIGUuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDEwICogTVNfSU5fTUlOVVRFIDwgbm93LmdldFRpbWUoKSAmJlxuICAgICAgICBlLmVuZFRpbWUuZ2V0VGltZSgpICsgMSAqIE1TX0lOX01JTlVURSA+IG5vdy5nZXRUaW1lKCksXG4gICAgKTtcbiAgICB0aGlzLmlzT3BlbiA9IG9wZW47XG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBxdWV1ZVNpemU6IG51bWJlcjtcblxuICBhc3luYyBhZGRRdWV1ZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5xdWV1ZVNpemUgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKHRoaXMuaWQpLmdldENvdW50KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkUXVldWVUaW1lcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCB0aGlzLmdldE9mZmljZUhvdXJzKCk7XG4gICAgY29uc3QgdGltZUludGVydmFscyA9IHRoaXMuZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKG9mZmljZUhvdXJzKTtcbiAgICBjb25zdCBjdXJyVGltZSA9IHRpbWVJbnRlcnZhbHMuZmluZCgoZ3JvdXApID0+IHtcbiAgICAgIC8vIEZpbmQgYSB0aW1lIGludGVydmFsIHdpdGhpbiAxNSBtaW51dGVzIG9mIGJvdW5kcyB0byBhY2NvdW50IGZvciBUQSBlZGdlIGNhc2VzXG4gICAgICBjb25zdCBsb3dlckJvdW5kID0gZ3JvdXAuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDE1ICogNjAgKiAxMDAwO1xuICAgICAgY29uc3QgdXBwZXJCb3VuZCA9IGdyb3VwLmVuZFRpbWUuZ2V0VGltZSgpICsgMTUgKiA2MCAqIDEwMDA7XG4gICAgICByZXR1cm4gbG93ZXJCb3VuZCA8PSBub3cuZ2V0VGltZSgpICYmIHVwcGVyQm91bmQgPj0gbm93LmdldFRpbWUoKTtcbiAgICB9KTtcblxuICAgIGlmIChjdXJyVGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBjdXJyVGltZS5zdGFydFRpbWU7XG4gICAgICB0aGlzLmVuZFRpbWUgPSBjdXJyVGltZS5lbmRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBPZmZpY2UgaG91cnMgaW4gYSA3MmhyIHdpbmRvdyBhcm91bmQgbm93LCBzbmFwcGVkIHRvIG1pZG5pZ2h0XG4gIHByaXZhdGUgYXN5bmMgZ2V0T2ZmaWNlSG91cnMoKTogUHJvbWlzZTxPZmZpY2VIb3VyTW9kZWxbXT4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBsb3dlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuICAgIGxvd2VyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICBjb25zdCB1cHBlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMjQpO1xuICAgIHVwcGVyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmQoe1xuICAgICAgd2hlcmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHF1ZXVlSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgc3RhcnRUaW1lOiBNb3JlVGhhbk9yRXF1YWwobG93ZXJCb3VuZCksXG4gICAgICAgICAgZW5kVGltZTogTGVzc1RoYW5PckVxdWFsKHVwcGVyQm91bmQpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIG9yZGVyOiB7XG4gICAgICAgIHN0YXJ0VGltZTogJ0FTQycsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1lcmdlZFRpbWVJbnRlcnZhbHMoXG4gICAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdLFxuICApOiBUaW1lSW50ZXJ2YWxbXSB7XG4gICAgY29uc3QgdGltZUludGVydmFsczogVGltZUludGVydmFsW10gPSBbXTtcbiAgICBvZmZpY2VIb3Vycy5mb3JFYWNoKChvZmZpY2VIb3VyKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRpbWVJbnRlcnZhbHMubGVuZ3RoID09IDAgfHxcbiAgICAgICAgb2ZmaWNlSG91ci5zdGFydFRpbWUgPiB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV0uZW5kVGltZVxuICAgICAgKSB7XG4gICAgICAgIHRpbWVJbnRlcnZhbHMucHVzaCh7XG4gICAgICAgICAgc3RhcnRUaW1lOiBvZmZpY2VIb3VyLnN0YXJ0VGltZSxcbiAgICAgICAgICBlbmRUaW1lOiBvZmZpY2VIb3VyLmVuZFRpbWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZHcm91cCA9IHRpbWVJbnRlcnZhbHNbdGltZUludGVydmFscy5sZW5ndGggLSAxXTtcbiAgICAgIHByZXZHcm91cC5lbmRUaW1lID1cbiAgICAgICAgb2ZmaWNlSG91ci5lbmRUaW1lID4gcHJldkdyb3VwLmVuZFRpbWVcbiAgICAgICAgICA/IG9mZmljZUhvdXIuZW5kVGltZVxuICAgICAgICAgIDogcHJldkdyb3VwLmVuZFRpbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGltZUludGVydmFscztcbiAgfVxuXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgZmlndXJlIG91dCBob3cgc3RhZmYgZ2V0IHNlbnQgdG8gRkUgYXMgd2VsbFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQgeyBRdWVzdGlvblN0YXR1cywgUXVlc3Rpb25UeXBlLCBSb2xlLCBTdGF0dXNJblF1ZXVlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFNlbGVjdFF1ZXJ5QnVpbGRlcixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXMgfSBmcm9tICcuL3F1ZXN0aW9uLWZzbSc7XG5cbkBFbnRpdHkoJ3F1ZXN0aW9uX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5xdWVzdGlvbnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3F1ZXVlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWU6IFF1ZXVlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWVJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICB0ZXh0OiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjcmVhdG9ySWQnIH0pXG4gIGNyZWF0b3I6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjcmVhdG9ySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3RhSGVscGVkSWQnIH0pXG4gIHRhSGVscGVkOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgdGFIZWxwZWRJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGZpcnN0IGhlbHBlZCAoZG9lc24ndCBvdmVyd3JpdGUpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGZpcnN0SGVscGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGxhc3QgaGVscGVkIChnZXR0aW5nIGhlbHAgYWdhaW4gb24gcHJpb3JpdHkgcXVldWUgb3ZlcndyaXRlcylcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIGxlYXZlcyB0aGUgcXVldWVcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlIHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGFzIHRoZSBnaXZlbiByb2xlXG4gICAqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgc3RhdHVzIGNoYW5nZSBzdWNjZWVkZWRcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTdGF0dXMobmV3U3RhdHVzOiBRdWVzdGlvblN0YXR1cywgcm9sZTogUm9sZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyh0aGlzLnN0YXR1cywgbmV3U3RhdHVzLCByb2xlKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBpblF1ZXVlV2l0aFN0YXR1cyhcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgc3RhdHVzZXM6IFF1ZXN0aW9uU3RhdHVzW10sXG4gICk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnF1ZXVlSWQgPSA6cXVldWVJZCcsIHsgcXVldWVJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXNlcyknLCB7XG4gICAgICAgIHN0YXR1c2VzLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cblxuICAvKipcbiAgICogUXVlc3Rpb25zIHRoYXQgYXJlIG9wZW4gaW4gdGhlIHF1ZXVlIChub3QgaW4gcHJpb3JpdHkgcXVldWUpXG4gICAqL1xuICBzdGF0aWMgd2FpdGluZ0luUXVldWUocXVldWVJZDogbnVtYmVyKTogU2VsZWN0UXVlcnlCdWlsZGVyPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBTdGF0dXNJblF1ZXVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXMsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcblxuaW50ZXJmYWNlIEFsbG93YWJsZVRyYW5zaXRpb25zIHtcbiAgc3R1ZGVudD86IFF1ZXN0aW9uU3RhdHVzW107XG4gIHRhPzogUXVlc3Rpb25TdGF0dXNbXTtcbn1cblxuY29uc3QgUVVFVUVfVFJBTlNJVElPTlM6IEFsbG93YWJsZVRyYW5zaXRpb25zID0ge1xuICB0YTogW09wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLCBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF0sXG4gIHN0dWRlbnQ6IFtcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gIF0sXG59O1xuXG5jb25zdCBRVUVTVElPTl9TVEFURVM6IFJlY29yZDxRdWVzdGlvblN0YXR1cywgQWxsb3dhYmxlVHJhbnNpdGlvbnM+ID0ge1xuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkXTogUVVFVUVfVFJBTlNJVElPTlMsXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZ106IHtcbiAgICB0YTogW1xuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZyxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkLFxuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQsXG4gICAgXSxcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmddOiB7XG4gICAgc3R1ZGVudDogW1xuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkXToge1xuICAgIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgfSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZV06IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzKFxuICBvbGRTdGF0dXM6IFF1ZXN0aW9uU3RhdHVzLFxuICBnb2FsU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgcm9sZTogUm9sZSxcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG9sZFN0YXR1cyA9PT0gZ29hbFN0YXR1cyB8fFxuICAgIFFVRVNUSU9OX1NUQVRFU1tvbGRTdGF0dXNdW3JvbGVdPy5pbmNsdWRlcyhnb2FsU3RhdHVzKVxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBTZWFzb24gfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3NlbWVzdGVyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBTZW1lc3Rlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc2Vhc29uOiBTZWFzb247XG5cbiAgQENvbHVtbigpXG4gIHllYXI6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnNlbWVzdGVyKVxuICBjb3Vyc2VzOiBDb3Vyc2VNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0QXV0aEd1YXJkIGV4dGVuZHMgQXV0aEd1YXJkKCdqd3QnKSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9wYXNzcG9ydFwiKTsiLCJpbXBvcnQgeyBTZXRNZXRhZGF0YSwgQ3VzdG9tRGVjb3JhdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgUm9sZXMgPSAoLi4ucm9sZXM6IHN0cmluZ1tdKTogQ3VzdG9tRGVjb3JhdG9yPHN0cmluZz4gPT5cbiAgU2V0TWV0YWRhdGEoJ3JvbGVzJywgcm9sZXMpO1xuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXIgPSBjcmVhdGVQYXJhbURlY29yYXRvcjxzdHJpbmdbXT4oXG4gIGFzeW5jIChyZWxhdGlvbnM6IHN0cmluZ1tdLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwgeyByZWxhdGlvbnMgfSk7XG4gIH0sXG4pO1xuXG5leHBvcnQgY29uc3QgVXNlcklkID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gTnVtYmVyKHJlcXVlc3QudXNlci51c2VySWQpO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJ2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgTGVzc1RoYW5PckVxdWFsLCBNb3JlVGhhbk9yRXF1YWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zLm1hcCgocXVldWUpID0+IHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCkpLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmIChmb3JjZSB8fCAhKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdWxkIHdlIGNvbnNpZGVyIGNsZWFuaW5nIHRoZSBxdWV1ZT9cbiAgLy8gIENoZWNrcyBpZiB0aGVyZSBhcmUgbm8gc3RhZmYsIG9wZW4gcXVlc3Rpb25zIGFuZCB0aGF0IHRoZXJlIGFyZW4ndCBhbnkgb2ZmaWNlIGhvdXJzIHNvb25cbiAgcHVibGljIGFzeW5jIHNob3VsZENsZWFuUXVldWUocXVldWU6IFF1ZXVlTW9kZWwpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTGFzdCBUQSB0byBjaGVja291dCwgc28gY2hlY2sgaWYgd2UgbWlnaHQgd2FudCB0byBjbGVhciB0aGUgcXVldWVcbiAgICAgIGNvbnN0IGFyZUFueVF1ZXN0aW9uc09wZW4gPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgICAgICBxdWV1ZS5pZCxcbiAgICAgICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAgICkuZ2V0Q291bnQoKSkgPiAwO1xuICAgICAgaWYgKGFyZUFueVF1ZXN0aW9uc09wZW4pIHtcbiAgICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgICAgY29uc3QgYXJlT2ZmaWNlSG91clNvb24gPVxuICAgICAgICAgIChhd2FpdCBPZmZpY2VIb3VyTW9kZWwuY291bnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiBMZXNzVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICAgIGVuZFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpID4gMDtcbiAgICAgICAgaWYgKCFhcmVPZmZpY2VIb3VyU29vbikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKS5nZXRNYW55KCk7XG4gICAgY29uc3Qgb3BlblF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICAocSkgPT4gcS5zdGF0dXMgaW4gT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAgICk7XG5cbiAgICBvcGVuUXVlc3Rpb25zLmZvckVhY2goKHE6IFF1ZXN0aW9uTW9kZWwpID0+IHtcbiAgICAgIHEuc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGU7XG4gICAgICBxLmNsb3NlZEF0ID0gbmV3IERhdGUoKTtcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuc2F2ZShvcGVuUXVlc3Rpb25zKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXJzZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vdExvZ2dlZEluKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvdXJzZUlkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vQ291cnNlSWRGb3VuZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hSb2xlcyhyb2xlcywgdXNlciwgY291cnNlSWQpO1xuICB9XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm90SW5Db3Vyc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm11c3RCZVJvbGVUb0pvaW5Db3Vyc2Uocm9sZXMpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtYWluaW5nLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBIZWF0bWFwLCB0aW1lRGlmZkluTWlucyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpblJhbmdlLCBtZWFuLCByYW5nZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBNb3JlVGhhbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuXG5mdW5jdGlvbiBhcnJheVJvdGF0ZShhcnIsIGNvdW50KSB7XG4gIGNvdW50IC09IGFyci5sZW5ndGggKiBNYXRoLmZsb29yKGNvdW50IC8gYXJyLmxlbmd0aCk7XG4gIGNvbnN0IHNwbGljZWQgPSBhcnIuc3BsaWNlKDAsIGNvdW50KTtcbiAgcmV0dXJuIFsuLi5hcnIsIC4uLnNwbGljZWRdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhdG1hcFNlcnZpY2Uge1xuICBhc3luYyBnZXRIZWF0bWFwRm9yKGNvdXJzZUlkOiBudW1iZXIpOiBQcm9taXNlPEhlYXRtYXAgfCBmYWxzZT4ge1xuICAgIC8vIFRoZSBudW1iZXIgb2YgbWludXRlcyB0byBhdmVyYWdlIGFjcm9zc1xuICAgIGNvbnN0IEJVQ0tFVF9TSVpFX0lOX01JTlMgPSAxNTtcbiAgICAvLyBOdW1iZXIgb2Ygc2FtcGxlcyB0byBnYXRoZXIgcGVyIGJ1Y2tldFxuICAgIGNvbnN0IFNBTVBMRVNfUEVSX0JVQ0tFVCA9IDM7XG4gICAgY29uc29sZS50aW1lKCdoZWF0bWFwJyk7XG4gICAgY29uc3QgcmVjZW50ID0gbW9tZW50KCkuc3VidHJhY3QoOCwgJ3dlZWtzJykudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5xdWV1ZScsICdxdWV1ZScpXG4gICAgICAud2hlcmUoJ3F1ZXVlLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgPSA6c3RhdHVzJywge1xuICAgICAgICBzdGF0dXM6IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkLFxuICAgICAgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uaGVscGVkQXQgSVMgTk9UIE5VTEwnKVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5jcmVhdGVkQXQgPiA6cmVjZW50JywgeyByZWNlbnQgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJylcbiAgICAgIC5nZXRNYW55KCk7XG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW4ocmVjZW50KSwgY291cnNlSWQgfSxcbiAgICB9KTtcblxuICAgIGlmIChvZmZpY2VIb3Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eiA9ICdBbWVyaWNhL05ld19Zb3JrJztcbiAgICBjb25zdCBoZWF0bWFwID0gdGhpcy5fZ2VuZXJhdGVIZWF0TWFwV2l0aFJlcGxheShcbiAgICAgIC8vIElnbm9yZSBxdWVzdGlvbnMgdGhhdCBjcm9zcyBtaWRuaWdodCAodXN1YWxseSBhIGZsdWtlKVxuICAgICAgcXVlc3Rpb25zLmZpbHRlcigocSkgPT4gcS5oZWxwZWRBdC5nZXREYXRlKCkgPT09IHEuY3JlYXRlZEF0LmdldERhdGUoKSksXG4gICAgICBvZmZpY2VIb3VycyxcbiAgICAgIHR6LFxuICAgICAgQlVDS0VUX1NJWkVfSU5fTUlOUyxcbiAgICAgIFNBTVBMRVNfUEVSX0JVQ0tFVCxcbiAgICApO1xuICAgIGFycmF5Um90YXRlKFxuICAgICAgaGVhdG1hcCxcbiAgICAgIC1tb21lbnQudHouem9uZSh0eikudXRjT2Zmc2V0KERhdGUubm93KCkpIC8gQlVDS0VUX1NJWkVfSU5fTUlOUyxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZUVuZCgnaGVhdG1hcCcpO1xuICAgIHJldHVybiBoZWF0bWFwO1xuICB9XG5cbiAgLy8gUFJJVkFURSBmdW5jdGlvbiB0aGF0IGlzIHB1YmxpYyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAvLyBSZXdpbmQgdGhyb3VnaCB0aGUgbGFzdCBmZXcgd2Vla3MgYW5kIGZvciBlYWNoIHRpbWUgaW50ZXJ2YWwsXG4gIC8vIGZpZ3VyZSBvdXQgaG93IGxvbmcgd2FpdCB0aW1lIHdvdWxkIGhhdmUgYmVlbiBpZiB5b3UgaGFkIGpvaW5lZCB0aGUgcXVldWUgYXQgdGhhdCB0aW1lXG4gIC8vIFRpbWV6b25lIHNob3VsZCBiZSBJQU5BXG4gIC8vIFJldHVybnMgaGVhdG1hcCBpbiB0aGUgdGltZXpvbmUgKGllIDNyZCBidWNrZXQgaXMgM2FtIGluIHRoYXQgdGltZXpvbmUpXG4gIF9nZW5lcmF0ZUhlYXRNYXBXaXRoUmVwbGF5KFxuICAgIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdLFxuICAgIGhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgICB0aW1lem9uZTogc3RyaW5nLFxuICAgIGJ1Y2tldFNpemU6IG51bWJlcixcbiAgICBzYW1wbGVzUGVyQnVja2V0OiBudW1iZXIsXG4gICk6IEhlYXRtYXAge1xuICAgIGNvbnN0IHNhbXBsZUludGVydmFsID0gYnVja2V0U2l6ZSAvIHNhbXBsZXNQZXJCdWNrZXQ7XG4gICAgLypcbiAgICBURVNUOiBRdWVzdGlvbjEgaXMgIDM6MDUgLSAzOjI1XG4gICAgLy8gVGhlIG5leHQgcXVlc3Rpb24gaXMgMzoyMSAtIDM6NDlcbiAgICBUSGUgZm9sbG93aW5nIHF1ZXN0aW9uIGlzIDQ6MDUgLSA0OjEwXG4gICAgXG4gICAgQnVja2V0ID0gNjAsIFNhbXBsZXMgPSAzLCBzbyB0aW1lcG9pbnRzIGFyZTogMzowMCwgMzoyMCwgMzo0MC5cblxuICAgIDM6MjAgc2FtcGxlIGdldHMgd2FpdHRpbWUgb2YgNSBtaW51dGVzXG4gICAgMzo0MCBzYW1wbGVzIGdldCB3YWl0dGltZXMgb2YgOSBtaW51dGVzXG4gICAgNDowMCBzYW1wbGUgZ2V0cyB3YWl0dGltZSBvZiAwIG1pbnV0ZXNcblxuXG4gICAgSWYgaSBlbnRlcmVkIHRoZSBxdWV1ZSBhdCB0aGF0IHRpbWUgd2hlbiBzaG91bGQgSSBoYXZlIGdvdHRlbiBoZWxwP1xuICAgIEV2ZXJ5IGludGVydmFsIG9mIG1pbnV0ZXMgZm9yIHRoZSBwYXN0IDUgd2Vla3MgYXJlIGFnZ3JlZ2F0ZWQgKGJ5IHRha2luZyB0aGUgYXZnKVxuICAgIFxuICAgIGFuYWx5emUgdGhlIGJ1Y2tldHMgdG8gZmluZCB0aGUgY2xvc2VzdCB0aW1lIGFwcHJveGltYXRpb25cblxuICAgIGxvb2sgYXQgcXVlc3Rpb24gUTEgYW5kIHRoZSBuZXh0IHF1ZXN0aW9uIFEyXG4gICAgZm9yIGFsbCBzYW1wbGUgdGltZXBvaW50cyBiZXR3ZWVuIFExLmNyZWF0ZWRBdCBhbmQgUTIuY3JlYXRlZEF0OlxuICAgICAgIC0gc2FtcGxlID0gUTEuY2xvc2VkQXQgLSB0aW1lcG9pbnQgKGlmIG5lZ2F0aXZlLCB0aGVuIGl0J3MgMClcbiAgICAqL1xuXG4gICAgY29uc3QgaG91clRpbWVzdGFtcHM6IFtudW1iZXIsIG51bWJlcl1bXSA9IGhvdXJzLm1hcCgoaG91cnMpID0+IFtcbiAgICAgIGhvdXJzLnN0YXJ0VGltZS5nZXRUaW1lKCksXG4gICAgICBob3Vycy5lbmRUaW1lLmdldFRpbWUoKSxcbiAgICBdKTtcblxuICAgIGZ1bmN0aW9uIGRhdGVUb0J1Y2tldChkYXRlOiBEYXRlIHwgbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgIC8vIHBhcnNlIGluIHpvbmUgdG8gaGFuZGxlIGRheWxpZ2h0IHNhdmluZ3MgYnkgZ2V0dGluZyBkYXkvaG91ci9taW51dGUgd2l0aGluIHRoYXQgSUFOQSB6b25lXG4gICAgICBjb25zdCBjSW5ab25lID0gbW9tZW50LnR6KGRhdGUsIHRpbWV6b25lKTtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKFxuICAgICAgICAoY0luWm9uZS5kYXkoKSAqIDI0ICogNjAgKyBjSW5ab25lLmhvdXIoKSAqIDYwICsgY0luWm9uZS5taW51dGUoKSkgL1xuICAgICAgICAgIGJ1Y2tldFNpemUsXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0aW1lcG9pbnRCdWNrZXRzOiBudW1iZXJbXVtdID0gW1xuICAgICAgLi4uQXJyYXkoKDI0ICogNyAqIDYwKSAvIGJ1Y2tldFNpemUpLFxuICAgIF0ubWFwKCgpID0+IFtdKTtcblxuICAgIGlmIChxdWVzdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSBxdWVzdGlvbnNbMF0uY3JlYXRlZEF0O1xuICAgICAgY29uc3Qgc3VuZGF5ID0gbW9tZW50LnR6KHN0YXJ0RGF0ZSwgdGltZXpvbmUpLnN0YXJ0T2YoJ3dlZWsnKS50b0RhdGUoKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0TmV4dFRpbWVwb2ludEluZGV4KGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aW1lRGlmZkluTWlucyhkYXRlLCBzdW5kYXkpIC8gc2FtcGxlSW50ZXJ2YWwpICsgMTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBkYXRlIG9mIHRoZSBzYW1wbGUgdGltZXBvaW50IGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBnaXZlbiBkYXRlXG4gICAgICBmdW5jdGlvbiBnZXROZXh0U2FtcGxlVGltZXBvaW50KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgdGltZXBvaW50SW5kZXggPSBnZXROZXh0VGltZXBvaW50SW5kZXgoZGF0ZSk7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgICAgICBzdW5kYXkuZ2V0VGltZSgpICsgdGltZXBvaW50SW5kZXggKiBzYW1wbGVJbnRlcnZhbCAqIDYwICogMTAwMCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IGFsbCB0aW1lcG9pbnRzIGJldHdlZW4gdGhlIHR3byBkYXRlc1xuICAgICAgZnVuY3Rpb24gZ2V0U2FtcGxlVGltZXBvaW50c0luRGF0ZVJhbmdlKFxuICAgICAgICBkYXRlMTogRGF0ZSxcbiAgICAgICAgZGF0ZTI6IERhdGUsXG4gICAgICApOiBEYXRlW10ge1xuICAgICAgICBjb25zdCByZXQgPSBbXTtcbiAgICAgICAgbGV0IGN1cnIgPSBnZXROZXh0U2FtcGxlVGltZXBvaW50KGRhdGUxKTtcbiAgICAgICAgd2hpbGUgKGN1cnIuZ2V0VGltZSgpIDwgZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgcmV0LnB1c2goY3Vycik7XG4gICAgICAgICAgY3VyciA9IGdldE5leHRTYW1wbGVUaW1lcG9pbnQoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBzdGFydCB0aW1lIG9mIHRoZSBjdXJyZW50IGJ1Y2tldFxuICAgICAgZnVuY3Rpb24gbGFzdEJ1Y2tldEJvdW5kYXJ5KGRhdGU6IERhdGUpOiBtb21lbnQuTW9tZW50IHtcbiAgICAgICAgY29uc3Qgc3RhcnRPZldlZWsgPSBtb21lbnQudHooZGF0ZSwgdGltZXpvbmUpLnN0YXJ0T2YoJ3dlZWsnKTtcbiAgICAgICAgY29uc3QgbSA9IG1vbWVudChkYXRlKTtcbiAgICAgICAgcmV0dXJuIG0uc3VidHJhY3QobS5kaWZmKHN0YXJ0T2ZXZWVrLCAnbScpICUgYnVja2V0U2l6ZSwgJ20nKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ28gdHdvIHF1ZXN0aW9ucyBhdCBhIHRpbWVcbiAgICAgIGxldCBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnIgPSBxdWVzdGlvbnNbaV07XG4gICAgICAgIGNvbnN0IG5leHQgPSBxdWVzdGlvbnNbaSArIDFdO1xuICAgICAgICBjb25zdCBpc0xhc3QgPSBpID09PSBxdWVzdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgICAgICAvLyBnZXQgdGhlIHRpbWVwb2ludHMgaW4gYmV0d2VlblxuICAgICAgICBsZXQgc2FtcGxlZFRpbWVwb2ludHMgPSBnZXRTYW1wbGVUaW1lcG9pbnRzSW5EYXRlUmFuZ2UoXG4gICAgICAgICAgaXNGaXJzdFxuICAgICAgICAgICAgPyBsYXN0QnVja2V0Qm91bmRhcnkoY3Vyci5jcmVhdGVkQXQpXG4gICAgICAgICAgICAgICAgLnN1YnRyYWN0KDEsICdzJykgLy8gc28gdGhhdCB3ZSBnZXQgdGhlIGZpcnN0IHRpbWVwb2ludFxuICAgICAgICAgICAgICAgIC50b0RhdGUoKVxuICAgICAgICAgICAgOiBjdXJyLmNyZWF0ZWRBdCxcbiAgICAgICAgICBpc0xhc3RcbiAgICAgICAgICAgID8gbGFzdEJ1Y2tldEJvdW5kYXJ5KGN1cnIuaGVscGVkQXQpXG4gICAgICAgICAgICAgICAgLmFkZChidWNrZXRTaXplLCAnbScpIC8vIHRvIGdldCB0aGUgbmV4dEJ1Y2tldEJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgLnRvRGF0ZSgpXG4gICAgICAgICAgICA6IG5leHQuY3JlYXRlZEF0LFxuICAgICAgICApO1xuICAgICAgICBzYW1wbGVkVGltZXBvaW50cyA9IHNhbXBsZWRUaW1lcG9pbnRzLmZpbHRlcigodGltZSkgPT5cbiAgICAgICAgICBob3VyVGltZXN0YW1wcy5zb21lKChbc3RhcnQsIGVuZF0pID0+XG4gICAgICAgICAgICBpblJhbmdlKHRpbWUuZ2V0VGltZSgpLCBzdGFydCwgZW5kKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFBhZCB0aGUgZmlyc3QgYnVja2V0IHdpdGggemVyb3MgdG8gYWNjb3VudCBmb3IgdGltZXBvaW50cyBiZWZvcmUgdGhlIGZpcnN0XG4gICAgICAgIGlmIChzYW1wbGVkVGltZXBvaW50cy5sZW5ndGggPiAwICYmIGlzRmlyc3QpIHtcbiAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB3ZSB3b3VsZCBoYXZlIGh5cG90aGV0aWNhbGx5IGdvdHRlbiBoZWxwIGF0IHRoaXMgdGltZXBvaW50XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBzYW1wbGVkVGltZXBvaW50cykge1xuICAgICAgICAgIGxldCB3YWl0ID0gMDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBpblJhbmdlKFxuICAgICAgICAgICAgICBjLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgY3Vyci5jcmVhdGVkQXQuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBjdXJyLmhlbHBlZEF0LmdldFRpbWUoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhaXQgPSAoY3Vyci5oZWxwZWRBdC5nZXRUaW1lKCkgLSBjLmdldFRpbWUoKSkgLyA2MDAwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBidWNrZXRJbmRleCA9IGRhdGVUb0J1Y2tldChjKTtcbiAgICAgICAgICB0aW1lcG9pbnRCdWNrZXRzW2J1Y2tldEluZGV4XS5wdXNoKHdhaXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2VyZSB0aGVyZSBldmVyIG9mZmljZSBob3VycyBpbiB0aGlzIGJ1Y2tldD9cbiAgICBjb25zdCB3ZXJlSG91cnNEdXJpbmdCdWNrZXQ6IGJvb2xlYW5bXSA9IFtcbiAgICAgIC4uLkFycmF5KCgyNCAqIDcgKiA2MCkgLyBidWNrZXRTaXplKSxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgW3N0YXJ0LCBlbmRdIG9mIGhvdXJUaW1lc3RhbXBzKSB7XG4gICAgICAvL3ByZXZlbnRzIGFuIG9mZmljZSBob3VyIGZyb20gW04sIE1dIHRvIHJlZ2lzdGVyIGluIG11bHRpcGxlIGJ1Y2tldHNcbiAgICAgIGZvciAoY29uc3QgaSBvZiByYW5nZShkYXRlVG9CdWNrZXQoc3RhcnQpLCBkYXRlVG9CdWNrZXQoZW5kIC0gMSkgKyAxKSkge1xuICAgICAgICB3ZXJlSG91cnNEdXJpbmdCdWNrZXRbaV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGg6IEhlYXRtYXAgPSB0aW1lcG9pbnRCdWNrZXRzLm1hcCgoc2FtcGxlcywgaSkgPT4ge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gbWVhbihzYW1wbGVzKTtcbiAgICAgIH0gZWxzZSBpZiAod2VyZUhvdXJzRHVyaW5nQnVja2V0W2ldKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoO1xuICB9XG5cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdoZWF0bWFwOmdlbmVyYXRlJyxcbiAgICBkZXNjcmliZTogJ2dlbmVyYXRlIGhlYXRtYXAgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGggPSBhd2FpdCB0aGlzLmdldEhlYXRtYXBGb3IoNCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBSb2xlLCBTU0VRdWV1ZVJlc3BvbnNlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnc3NlL3NzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5cbnR5cGUgUXVldWVDbGllbnRNZXRhZGF0YSA9IHsgdXNlcklkOiBudW1iZXI7IHJvbGU6IFJvbGUgfTtcblxuY29uc3QgaWRUb1Jvb20gPSAocXVldWVJZDogbnVtYmVyKSA9PiBgcS0ke3F1ZXVlSWR9YDtcbi8qKlxuICogSGFuZGxlIHNlbmRpbmcgcXVldWUgc3NlIGV2ZW50c1xuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVTU0VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgICBwcml2YXRlIHNzZVNlcnZpY2U6IFNTRVNlcnZpY2U8UXVldWVDbGllbnRNZXRhZGF0YT4sXG4gICkge31cblxuICBzdWJzY3JpYmVDbGllbnQoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHJlczogUmVzcG9uc2UsXG4gICAgbWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuc3NlU2VydmljZS5zdWJzY3JpYmVDbGllbnQoaWRUb1Jvb20ocXVldWVJZCksIHsgcmVzLCBtZXRhZGF0YSB9KTtcbiAgfVxuXG4gIC8vIFNlbmQgZXZlbnQgd2l0aCBuZXcgcXVlc3Rpb25zLCBidXQgbm8gbW9yZSB0aGFuIG9uY2UgYSBzZWNvbmRcbiAgdXBkYXRlUXVlc3Rpb25zID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICBpZiAocXVlc3Rpb25zKSB7XG4gICAgICB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKHsgcm9sZSwgdXNlcklkIH0pID0+ICh7XG4gICAgICAgIHF1ZXN0aW9uczogYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UucGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgICAgICAgcXVldWVJZCxcbiAgICAgICAgICBxdWVzdGlvbnMsXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIHJvbGUsXG4gICAgICAgICksXG4gICAgICB9KSk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVRdWV1ZSA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICgpID0+ICh7IHF1ZXVlIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHByaXZhdGUgYXN5bmMgc2VuZFRvUm9vbShcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgZGF0YTogKG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhKSA9PiBQcm9taXNlPFNTRVF1ZXVlUmVzcG9uc2U+LFxuICApIHtcbiAgICBhd2FpdCB0aGlzLnNzZVNlcnZpY2Uuc2VuZEV2ZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCBkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgdGhyb3R0bGVVcGRhdGUodXBkYXRlRnVuY3Rpb246IChxdWV1ZUlkOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICByZXR1cm4gdGhyb3R0bGUoXG4gICAgICBhc3luYyAocXVldWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlRnVuY3Rpb24ocXVldWVJZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9LFxuICAgICAgMTAwMCxcbiAgICAgIHtcbiAgICAgICAgbGVhZGluZzogZmFsc2UsXG4gICAgICAgIHRyYWlsaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmluUXVldWVXaXRoU3RhdHVzKHF1ZXVlSWQsIFtcbiAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgIC4uLlN0YXR1c0luUXVldWUsXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICBdKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgY29uc3QgcXVlc3Rpb25zID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucXVlc3Rpb25zR2V0dGluZ0hlbHAgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKFxuICAgICAgKHF1ZXN0aW9uKSA9PiBxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucHJpb3JpdHlRdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYXN5bmMgcGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgY29uc3QgbmV3TFFSID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdMUVIsIHF1ZXN0aW9ucyk7XG5cbiAgICAgIG5ld0xRUi5xdWV1ZSA9IHF1ZXN0aW9ucy5xdWV1ZS5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgLy8gY2xhc3NUb0NsYXNzIHRyYW5zZm9ybWVyIHdpbGwgYXBwbHkgdGhlIEBFeGNsdWRlc1xuICAgICAgICByZXR1cm4gY2xhc3NUb0NsYXNzPFF1ZXN0aW9uPihcbiAgICAgICAgICBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICAgICAgc3RhdHVzOiBJbihTdGF0dXNTZW50VG9DcmVhdG9yKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV3TFFSLnByaW9yaXR5UXVldWUgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ld0xRUjtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVDb250cm9sbGVyIH0gZnJvbSAnLi9xdWV1ZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJ3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU3Vic2NyaWJlciB9IGZyb20gJy4vcXVldWUuc3Vic2NyaWJlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXVlQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIFF1ZXVlU2VydmljZSxcbiAgICBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgUXVldWVTdWJzY3JpYmVyLFxuICBdLFxuICBleHBvcnRzOiBbUXVldWVDbGVhblNlcnZpY2UsIFF1ZXVlU1NFU2VydmljZV0sXG4gIGltcG9ydHM6IFtTU0VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgR2V0UXVldWVSZXNwb25zZSxcbiAgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICBSb2xlLFxuICBVcGRhdGVRdWV1ZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgUmVzLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGUgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVldWUtcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncXVldWVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWV1ZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXVlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWV1ZShAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPEdldFF1ZXVlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gIH1cblxuICBAR2V0KCc6cXVldWVJZC9xdWVzdGlvbnMnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBxdWVzdGlvbnMsXG4gICAgICB1c2VySWQsXG4gICAgICByb2xlLFxuICAgICk7XG4gIH1cblxuICBAUGF0Y2goJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyB1cGRhdGVRdWV1ZShcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWV1ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcXVldWUubm90ZXMgPSBib2R5Lm5vdGVzO1xuICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gYm9keS5hbGxvd1F1ZXN0aW9ucztcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJzpxdWV1ZUlkL2NsZWFuJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBjbGVhblF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENsZWFuIHVwIHF1ZXVlIGlmIG5lY2Vzc2FyeVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5jbGVhblF1ZXVlKHF1ZXVlSWQsIHRydWUpO1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWVJZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5xdWV1ZVJvbGVHdWFyZC5xdWV1ZU5vdEZvdW5kKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICcuL3NzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7IHByb3ZpZGVyczogW1NTRVNlcnZpY2VdLCBleHBvcnRzOiBbU1NFU2VydmljZV0gfSlcbmV4cG9ydCBjbGFzcyBTU0VNb2R1bGUge31cbiIsImltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVldWVTdWJzY3JpYmVyIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWV1ZU1vZGVsPiB7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlKSB7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXVlTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVldWVNb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKGV2ZW50LmVudGl0eS5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSUNhbENvbW1hbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGljYWxTZXJ2aWNlOiBJY2FsU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdpY2FsOnNjcmFwZScsXG4gICAgZGVzY3JpYmU6ICdzY3JhcGUgaWNhbCBmb3IgYSBjb3Vyc2UnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5pY2FsU2VydmljZS51cGRhdGVBbGxDb3Vyc2VzKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDcm9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICBmcm9tVVJMLFxuICBDYWxlbmRhckNvbXBvbmVudCxcbiAgQ2FsZW5kYXJSZXNwb25zZSxcbiAgVkV2ZW50LFxufSBmcm9tICdub2RlLWljYWwnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwsIENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgZmluZE9uZUlhbmEgfSBmcm9tICd3aW5kb3dzLWlhbmEvZGlzdCc7XG5pbXBvcnQgJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBSUnVsZSB9IGZyb20gJ3JydWxlJztcblxudHlwZSBNb21lbnQgPSBtb21lbnQuTW9tZW50O1xuXG50eXBlIENyZWF0ZU9mZmljZUhvdXIgPSBEZWVwUGFydGlhbDxPZmZpY2VIb3VyTW9kZWw+W107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJY2FsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICAvLyB0eiBzaG91bGQgbm90IGJlIHByZWNvbnZlcnRlZCBieSBmaW5kT25lSWFuYVxuICBwcml2YXRlIGZpeE91dGxvb2tUWihkYXRlOiBNb21lbnQsIHR6OiBzdHJpbmcpOiBNb21lbnQge1xuICAgIGNvbnN0IGlhbmEgPSBmaW5kT25lSWFuYSh0eik7IC8vIEdldCBJQU5BIHRpbWV6b25lIGZyb20gd2luZG93cyB0aW1lem9uZVxuICAgIGlmIChpYW5hKSB7XG4gICAgICAvLyBNb3ZlIHRvIHRoZSB0aW1lem9uZSBiZWNhdXNlIG5vZGUtaWNhbCBkaWRuJ3QgZG8gaXQgZm9yIHVzLCBzaW5jZSBpdCBkb2VzIG5vdCByZWNvZ25pemUgd2luZG93cyB0aW1lem9uZVxuICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS50eihpYW5hLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZGF0ZSBvZiBvY2N1cmVuY2VzIGZvciBhbiBycnVsZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUsIGV4Y2x1ZGluZyB0aGUgbGlzdCBvZiBkYXRlc1xuICBwcml2YXRlIHJydWxlVG9EYXRlcyhycnVsZTogYW55LCBldmVudFRaOiBzdHJpbmcsIGV4ZGF0ZVJhdzogRGF0ZVtdKTogRGF0ZVtdIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgIGNvbnN0IGR0c3RhcnQ6IE1vbWVudCA9IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLmR0c3RhcnQpLCBldmVudFRaKTtcbiAgICBjb25zdCB1bnRpbDogTW9tZW50ID1cbiAgICAgIG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMudW50aWwpLCBldmVudFRaKTtcbiAgICBjb25zdCBldmVudFRaTW9tZW50ID0gbW9tZW50LnR6LnpvbmUoZmluZE9uZUlhbmEoZXZlbnRUWikgfHwgZXZlbnRUWik7XG5cbiAgICAvLyBHZXQgdGhlIFVUQyBPZmZzZXQgaW4gdGhpcyBldmVudCdzIHRpbWV6b25lLCBhdCB0aGlzIHRpbWUuIEFjY291bnRzIGZvciBEYXlsaWdodCBTYXZpbmdzIGFuZCBvdGhlciBvZGRpdGllc1xuICAgIGNvbnN0IHR6VVRDT2Zmc2V0T25EYXRlID0gKGRhdGU6IE1vbWVudCkgPT5cbiAgICAgIGV2ZW50VFpNb21lbnQudXRjT2Zmc2V0KGRhdGUudmFsdWVPZigpKTtcbiAgICBjb25zdCBkdHN0YXJ0VVRDT2Zmc2V0ID0gdHpVVENPZmZzZXRPbkRhdGUoZHRzdGFydCk7XG5cbiAgICAvLyBBcHBseSBhIFVUQyBvZmZzZXQgaW4gbWludXRlcyB0byB0aGUgZ2l2ZW4gTW9tZW50XG4gICAgY29uc3QgYXBwbHlPZmZzZXQgPSAoZGF0ZTogTW9tZW50LCB1dGNPZmZzZXQ6IG51bWJlcik6IE1vbWVudCA9PlxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KHV0Y09mZnNldCwgJ20nKTtcbiAgICAvLyBhcHBseSB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHByZVJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgZHRzdGFydFVUQ09mZnNldCk7XG4gICAgLy8gUmV2ZXJ0IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcG9zdFJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgLWR0c3RhcnRVVENPZmZzZXQpO1xuXG4gICAgLy8gQWRqdXN0IGZvciBycnVsZSBub3QgdGFraW5nIGludG8gYWNjb3VudCBEU1QgaW4gbG9jYWxlXG4gICAgLy8gICBpZS4gXCI4cG0gZXZlcnkgZnJpZGF5XCIgbWVhbnMgaGF2aW5nIHRvIHB1c2ggYmFjayA2MCBtaW51dGVzIGFmdGVyIEZhbGwgQmFja3dhcmRzXG4gICAgY29uc3QgZml4RFNUID0gKGRhdGU6IE1vbWVudCk6IE1vbWVudCA9PlxuICAgICAgLy8gR2V0IHRoZSBkaWZmZXJlbmNlIGluIFVUQyBvZmZzZXQgYmV0d2VlbiBkdHN0YXJ0IGFuZCB0aGlzIGRhdGUgKHNvIGlmIHdlIGNyb3NzZWQgRFNUIHN3aXRjaCwgdGhpcyB3aWxsIGJlIG5vbnplcm8pXG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QoZHRzdGFydFVUQ09mZnNldCAtIHR6VVRDT2Zmc2V0T25EYXRlKGRhdGUpLCAnbScpO1xuXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSUnVsZSh7XG4gICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICBpbnRlcnZhbDogb3B0aW9ucy5pbnRlcnZhbCxcbiAgICAgIHdrc3Q6IG9wdGlvbnMud2tzdCxcbiAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgYnl3ZWVrZGF5OiBvcHRpb25zLmJ5d2Vla2RheSxcbiAgICAgIGR0c3RhcnQ6IHByZVJSdWxlKGR0c3RhcnQpLnRvRGF0ZSgpLFxuICAgICAgdW50aWw6IHVudGlsICYmIHByZVJSdWxlKHVudGlsKS50b0RhdGUoKSxcbiAgICB9KTtcblxuICAgIC8vIERhdGVzIHRvIGV4Y2x1ZGUgZnJvbSByZWN1cnJlbmNlLCBzZXBhcmF0ZSBleGRhdGUgdGltZXN0YW1wIGZvciBmaWx0ZXJpbmdcbiAgICBjb25zdCBleGRhdGVzOiBudW1iZXJbXSA9IE9iamVjdC52YWx1ZXMoZXhkYXRlUmF3IHx8IHt9KVxuICAgICAgLm1hcCgoZCkgPT4gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KGQpLCBldmVudFRaKSlcbiAgICAgIC5tYXAoKGQpID0+IGFwcGx5T2Zmc2V0KGQsIHR6VVRDT2Zmc2V0T25EYXRlKGQpKS52YWx1ZU9mKCkpO1xuXG4gICAgLy8gRG9pbmcgbWF0aCBoZXJlIGJlY2F1c2UgbW9tZW50LmFkZCBjaGFuZ2VzIGJlaGF2aW9yIGJhc2VkIG9uIHNlcnZlciB0aW1lem9uZVxuICAgIGNvbnN0IGluMTBXZWVrcyA9IG5ldyBEYXRlKFxuICAgICAgZHRzdGFydC52YWx1ZU9mKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogNyAqIDEwLFxuICAgICk7XG4gICAgcmV0dXJuIHJ1bGVcbiAgICAgIC5hbGwoKGQpID0+ICEhdW50aWwgfHwgZCA8IGluMTBXZWVrcylcbiAgICAgIC5maWx0ZXIoKGRhdGUpID0+ICFleGRhdGVzLmluY2x1ZGVzKGRhdGUuZ2V0VGltZSgpKSlcbiAgICAgIC5tYXAoKGQpID0+IGZpeERTVChwb3N0UlJ1bGUobW9tZW50KGQpKSkudG9EYXRlKCkpO1xuICB9XG5cbiAgcGFyc2VJY2FsKGljYWxEYXRhOiBDYWxlbmRhclJlc3BvbnNlLCBjb3Vyc2VJZDogbnVtYmVyKTogQ3JlYXRlT2ZmaWNlSG91ciB7XG4gICAgY29uc3QgaWNhbERhdGFWYWx1ZXM6IEFycmF5PENhbGVuZGFyQ29tcG9uZW50PiA9IE9iamVjdC52YWx1ZXMoaWNhbERhdGEpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBpY2FsRGF0YVZhbHVlcy5maWx0ZXIoXG4gICAgICAoaUNhbEVsZW1lbnQpOiBpQ2FsRWxlbWVudCBpcyBWRXZlbnQgPT5cbiAgICAgICAgaUNhbEVsZW1lbnQudHlwZSA9PT0gJ1ZFVkVOVCcgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuc3RhcnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5lbmQgIT09IHVuZGVmaW5lZCxcbiAgICApO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNFdmVudFJlZ2V4ID0gL1xcYl4oT0h8SG91cnMpXFxiLztcblxuICAgIGNvbnN0IGZpbHRlcmVkT2ZmaWNlSG91cnMgPSBvZmZpY2VIb3Vycy5maWx0ZXIoKGV2ZW50KSA9PlxuICAgICAgb2ZmaWNlSG91cnNFdmVudFJlZ2V4LnRlc3QoZXZlbnQuc3VtbWFyeSksXG4gICAgKTtcblxuICAgIGxldCByZXN1bHRPZmZpY2VIb3VycyA9IFtdO1xuXG4gICAgZmlsdGVyZWRPZmZpY2VIb3Vycy5mb3JFYWNoKChvaDogVkV2ZW50KSA9PiB7XG4gICAgICAvLyBUaGlzIG9mZmljZSBob3VyIHRpbWV6b25lLiBBU1NVTUlORyBldmVyeSBkYXRlIGZpZWxkIGhhcyBzYW1lIHRpbWV6b25lIGFzIG9oLnN0YXJ0XG4gICAgICBjb25zdCBldmVudFRaID0gb2guc3RhcnQudHo7XG4gICAgICBjb25zdCB7IHJydWxlIH0gPSBvaCBhcyBhbnk7XG4gICAgICBpZiAocnJ1bGUpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvaC5lbmQuZ2V0VGltZSgpIC0gb2guc3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGFsbERhdGVzID0gdGhpcy5ycnVsZVRvRGF0ZXMocnJ1bGUsIGV2ZW50VFosIG9oLmV4ZGF0ZSk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZE9mZmljZUhvdXJzID0gYWxsRGF0ZXMubWFwKChkYXRlKSA9PiAoe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IGRhdGUsXG4gICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkdXJhdGlvbiksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMgPSByZXN1bHRPZmZpY2VIb3Vycy5jb25jYXQoZ2VuZXJhdGVkT2ZmaWNlSG91cnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLnN0YXJ0KSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLmVuZCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0T2ZmaWNlSG91cnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgT2ZmaWNlSG91cnMgZm9yIGEgZ2l2ZW4gQ291cnNlIGJ5IHJlc2NyYXBpbmcgaWNhbFxuICAgKiBAcGFyYW0gY291cnNlIHRvIHBhcnNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoY291cnNlOiBDb3Vyc2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYHNjcmFwaW5nIGljYWwgZm9yIGNvdXJzZSBcIiR7Y291cnNlLm5hbWV9XCIoJHtjb3Vyc2UuaWR9IGF0IHVybDogJHtjb3Vyc2UuaWNhbFVSTH0uLi5gLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb3Vyc2VJZDogY291cnNlLmlkLCByb29tOiAnT25saW5lJyB9LFxuICAgIH0pO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tOiAnT25saW5lJyxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5pZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gdGhpcy5wYXJzZUljYWwoXG4gICAgICBhd2FpdCBmcm9tVVJMKGNvdXJzZS5pY2FsVVJMKSxcbiAgICAgIGNvdXJzZS5pZCxcbiAgICApO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5kZWxldGUoeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5zYXZlKFxuICAgICAgb2ZmaWNlSG91cnMubWFwKChlKSA9PiB7XG4gICAgICAgIGUucXVldWVJZCA9IHF1ZXVlLmlkO1xuICAgICAgICByZXR1cm4gT2ZmaWNlSG91ck1vZGVsLmNyZWF0ZShlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGNvbnNvbGUubG9nKCdkb25lIHNjcmFwaW5nIScpO1xuICB9XG5cbiAgQENyb24oJzUxIDAgKiAqIConKVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlQWxsQ291cnNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY291cnNlIGljYWxzJyk7XG4gICAgY29uc3QgY291cnNlcyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmQoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb3Vyc2VzLm1hcCgoYykgPT4gdGhpcy51cGRhdGVDYWxlbmRhckZvckNvdXJzZShjKSkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWljYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luZG93cy1pYW5hL2Rpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJydWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZlN1YnNjcmliZXIgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYtc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtOb3RpZmljYXRpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgRGVza3RvcE5vdGlmU3Vic2NyaWJlciwgVHdpbGlvU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBUd2lsaW9TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFdmVudFN1YnNjcmliZXIsXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIENvbm5lY3Rpb24sXG4gIEluc2VydEV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIERlc2t0b3BOb3RpZk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PERlc2t0b3BOb3RpZk1vZGVsPikge1xuICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeURlc2t0b3AoXG4gICAgICBldmVudC5lbnRpdHksXG4gICAgICBcIllvdSd2ZSBzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIGZvciBkZXNrdG9wIG5vdGlmaWNhdGlvbnMhXCIsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXhjZXB0aW9uLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgKiBhcyB3ZWJQdXNoIGZyb20gJ3dlYi1wdXNoJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBOb3RpZk1zZ3MgPSB7XG4gIHBob25lOiB7XG4gICAgV1JPTkdfTUVTU0FHRTpcbiAgICAgICdQbGVhc2UgcmVzcG9uZCB3aXRoIGVpdGhlciBZRVMgb3IgTk8uIFRleHQgU1RPUCBhdCBhbnkgdGltZSB0byBzdG9wIHJlY2VpdmluZyB0ZXh0IG1lc3NhZ2VzJyxcbiAgICBDT1VMRF9OT1RfRklORF9OVU1CRVI6XG4gICAgICAnQ291bGQgbm90IGZpbmQgYW4gT2ZmaWNlIEhvdXJzIGFjY291bnQgd2l0aCB5b3VyIHBob25lIG51bWJlci4nLFxuICAgIFVOUkVHSVNURVI6XG4gICAgICBcIllvdSd2ZSB1bnJlZ2lzdGVyZWQgZnJvbSB0ZXh0IG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIEZlZWwgZnJlZSB0byByZS1yZWdpc3RlciBhbnkgdGltZSB0aHJvdWdoIHRoZSB3ZWJzaXRlXCIsXG4gICAgRFVQTElDQVRFOlxuICAgICAgXCJZb3UndmUgYWxyZWFkeSBiZWVuIHZlcmlmaWVkIHRvIHJlY2VpdmUgdGV4dCBub3RpZmljYXRpb25zIGZyb20gS2hvdXJ5IE9mZmljZSBIb3VycyFcIixcbiAgICBPSzpcbiAgICAgICdUaGFuayB5b3UgZm9yIHZlcmlmeWluZyB5b3VyIG51bWJlciB3aXRoIEtob3VyeSBPZmZpY2UgSG91cnMhIFlvdSBhcmUgbm93IHNpZ25lZCB1cCBmb3IgdGV4dCBub3RpZmljYXRpb25zIScsXG4gIH0sXG4gIHF1ZXVlOiB7XG4gICAgQUxFUlRfQlVUVE9OOlxuICAgICAgXCJUaGUgVEEgY291bGQndCByZWFjaCB5b3UsIHBsZWFzZSBoYXZlIE1pY3Jvc29mdCBUZWFtcyBvcGVuIGFuZCBjb25maXJtIHlvdSBhcmUgYmFjayFcIixcbiAgICBUSElSRF9QTEFDRTogYFlvdSdyZSAzcmQgaW4gdGhlIHF1ZXVlLiBCZSByZWFkeSBmb3IgYSBUQSB0byBjYWxsIHlvdSBzb29uIWAsXG4gICAgVEFfSElUX0hFTFBFRDogKHRhTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgICBgJHt0YU5hbWV9IGlzIGNvbWluZyB0byBoZWxwIHlvdSFgLFxuICAgIFJFTU9WRUQ6IGBZb3UndmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHF1ZXVlLiBQbGVhc2UgcmV0dXJuIHRvIHRoZSBhcHAgZm9yIG1vcmUgaW5mb3JtYXRpb24uYCxcbiAgfSxcbiAgdGE6IHtcbiAgICBTVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRTpcbiAgICAgICdBIHN0dWRlbnQgaGFzIGpvaW5lZCB5b3VyIChwcmV2aW91c2x5IGVtcHR5KSBxdWV1ZSEnLFxuICB9LFxufTtcblxuLy9UT0RPIHRlc3QgdGhpcyBzZXJ2aWNlIG9tZ1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBkZXNrdG9wUHVibGljS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSxcbiAgKSB7XG4gICAgd2ViUHVzaC5zZXRWYXBpZERldGFpbHMoXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdFTUFJTCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQUklWQVRFS0VZJyksXG4gICAgKTtcbiAgICB0aGlzLmRlc2t0b3BQdWJsaWNLZXkgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKTtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcChcbiAgICBpbmZvOiBEZWVwUGFydGlhbDxEZXNrdG9wTm90aWZNb2RlbD4sXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgICAvLyBjcmVhdGUgaWYgbm90IGV4aXN0XG4gICAgbGV0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQ6IGluZm8udXNlcklkLCBlbmRwb2ludDogaW5mby5lbmRwb2ludCB9LFxuICAgIH0pO1xuICAgIGlmICghZG4pIHtcbiAgICAgIGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuY3JlYXRlKGluZm8pLnNhdmUoKTtcbiAgICAgIGF3YWl0IGRuLnJlbG9hZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZG47XG4gIH1cblxuICBhc3luYyByZWdpc3RlclBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIHVzZXI6IFVzZXJNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZ1bGxOdW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHBob25lTnVtYmVyKTtcbiAgICBpZiAoIWZ1bGxOdW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5ub3RpZmljYXRpb25TZXJ2aWNlLnJlZ2lzdGVyUGhvbmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICBpZiAocGhvbmVOb3RpZk1vZGVsKSB7XG4gICAgICAvLyBQaG9uZSBudW1iZXIgaGFzIG5vdCBjaGFuZ2VkXG4gICAgICBpZiAocGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID09PSBmdWxsTnVtYmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8ganVzdCBjaGFuZ2UgaXRcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID0gZnVsbE51bWJlcjtcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHBob25lTm90aWZNb2RlbC5zYXZlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGUoe1xuICAgICAgICBwaG9uZU51bWJlcjogZnVsbE51bWJlcixcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG5cbiAgICAgIC8vIE1VVEFURSBzbyBpZiB1c2VyLnNhdmUoKSBpcyBjYWxsZWQgbGF0ZXIgaXQgZG9lc24ndCBkaXMtYXNzb2NpYXRlXG4gICAgICB1c2VyLnBob25lTm90aWYgPSBwaG9uZU5vdGlmTW9kZWw7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5ub3RpZnlQaG9uZShcbiAgICAgIHBob25lTm90aWZNb2RlbCxcbiAgICAgIFwiWW91J3ZlIHNpZ25lZCB1cCBmb3IgcGhvbmUgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gVG8gdmVyaWZ5IHlvdXIgbnVtYmVyLCBwbGVhc2UgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBZRVMuIFRvIHVuc3Vic2NyaWJlLCByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIE5PIG9yIFNUT1BcIixcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIC8vIE5vdGlmeSB1c2VyIG9uIGFsbCBwbGF0Zm9ybXNcbiAgYXN5bmMgbm90aWZ5VXNlcih1c2VySWQ6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm90aWZNb2RlbHNPZlVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczogWydkZXNrdG9wTm90aWZzJywgJ3Bob25lTm90aWYnXSxcbiAgICB9KTtcblxuICAgIC8vIHJ1biB0aGUgcHJvbWlzZXMgY29uY3VycmVudGx5XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnNFbmFibGVkKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgbm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmcy5tYXAoYXN5bmMgKG5tKSA9PlxuICAgICAgICAgIHRoaXMubm90aWZ5RGVza3RvcChubSwgbWVzc2FnZSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiAmJiBub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubm90aWZ5UGhvbmUobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiwgbWVzc2FnZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgZGVza3RvcCBub3RpZmljYXRpb25cbiAgYXN5bmMgbm90aWZ5RGVza3RvcChubTogRGVza3RvcE5vdGlmTW9kZWwsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3ZWJQdXNoLnNlbmROb3RpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlbmRwb2ludDogbm0uZW5kcG9pbnQsXG4gICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgcDI1NmRoOiBubS5wMjU2ZGgsXG4gICAgICAgICAgICBhdXRoOiBubS5hdXRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUobm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgcGhvbmUgbnVtYmVyXG4gIGFzeW5jIG5vdGlmeVBob25lKFxuICAgIHBuOiBQaG9uZU5vdGlmTW9kZWwsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZvcmNlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZm9yY2UgfHwgcG4udmVyaWZpZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5zZW5kU01TKHBuLnBob25lTnVtYmVyLCBtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2JsZW0gc2VuZGluZyBtZXNzYWdlJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeVBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcGhvbmVOb3RpZiA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHBob25lTnVtYmVyOiBwaG9uZU51bWJlciB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFwaG9uZU5vdGlmKSB7XG4gICAgICBhcG0uc2V0Q3VzdG9tQ29udGV4dCh7IHBob25lTnVtYmVyIH0pO1xuICAgICAgYXBtLmNhcHR1cmVFcnJvcihcbiAgICAgICAgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwaG9uZSBudW1iZXIgZHVyaW5nIHZlcmlmaWNhdGlvbicpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuQ09VTERfTk9UX0ZJTkRfTlVNQkVSO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSAhPT0gJ1lFUycgJiYgbWVzc2FnZSAhPT0gJ05PJyAmJiBtZXNzYWdlICE9PSAnU1RPUCcpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuV1JPTkdfTUVTU0FHRTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT09ICdOTycgfHwgbWVzc2FnZSA9PT0gJ1NUT1AnKSB7XG4gICAgICAvLyBkaWQgc29tZSBtb3JlIGRpZ2dpbmcsIFNUT1AganVzdCBzdG9wcyBtZXNzYWdlcyBjb21wbGV0ZWx5LCB3ZSdsbCBuZXZlciByZWNlaXZlIGl0XG4gICAgICAvLyBzbyB1aC4uLiB0aGVyZSdzIHByb2JhYmx5IGEgd2F5IHRvIGRvIHRoYXRcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUocGhvbmVOb3RpZik7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLlVOUkVHSVNURVI7XG4gICAgfSBlbHNlIGlmIChwaG9uZU5vdGlmLnZlcmlmaWVkKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkRVUExJQ0FURTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZi52ZXJpZmllZCA9IHRydWU7XG4gICAgICBhd2FpdCBwaG9uZU5vdGlmLnNhdmUoKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuT0s7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWItcHVzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdHdpbGlvIFNESyB0byBtYWtlIHRlc3RpbmcgZWFzaWVyLlxuICogU2hvdWxkIE5PVCBpbnRlcmFjdCB3aXRoIERCIG1vZGVscyBvciBkbyBhbnl0aGluZyBzbWFydC4gSnVzdCB3cmFwIFR3aWxpby5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR3aWxpb1NlcnZpY2Uge1xuICBwcml2YXRlIHR3aWxpb0NsaWVudDogdHdpbGlvLlR3aWxpbztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnR3aWxpb0NsaWVudCA9IHR3aWxpbyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FDQ09VTlRTSUQnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZ1bGwgcGhvbmUgbnVtYmVyIG9yIHJldHVybiBmYWxzZSBpZiBwaG9uZSBudW1iZXIgaXNuJ3QgcmVhbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZ1bGxQaG9uZU51bWJlcihcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubG9va3Vwcy5waG9uZU51bWJlcnMocGhvbmVOdW1iZXIpLmZldGNoKCkpXG4gICAgICAgIC5waG9uZU51bWJlcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGlmIHRoZSBwaG9uZSBudW1iZXIgaXMgbm90IGZvdW5kLCB0aGVuIGVuZHBvaW50IHNob3VsZCByZXR1cm4gaW52YWxpZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIFNNUyB0byBwaG9uZSBudW1iZXIgdXNpbmcgb3VyIFR3aWxpbyBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kU01TKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPUEhPTkVOVU1CRVInKSxcbiAgICAgIHRvOiBwaG9uZU51bWJlcixcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpbGlvXCIpOyIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZkJvZHksXG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBUd2lsaW9Cb2R5LFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgSGVhZGVyLFxuICBIZWFkZXJzLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdub3RpZmljYXRpb25zJylcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVza3RvcC9jcmVkZW50aWFscycpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBnZXREZXNrdG9wQ3JlZGVudGlhbHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5ub3RpZlNlcnZpY2UuZGVza3RvcFB1YmxpY0tleSk7XG4gIH1cblxuICBAUG9zdCgnZGVza3RvcC9kZXZpY2UnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IERlc2t0b3BOb3RpZkJvZHksXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZlBhcnRpYWw+IHtcbiAgICBjb25zdCBkZXZpY2UgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlckRlc2t0b3Aoe1xuICAgICAgZW5kcG9pbnQ6IGJvZHkuZW5kcG9pbnQsXG4gICAgICBleHBpcmF0aW9uVGltZTogYm9keS5leHBpcmF0aW9uVGltZSAmJiBuZXcgRGF0ZShib2R5LmV4cGlyYXRpb25UaW1lKSxcbiAgICAgIHAyNTZkaDogYm9keS5rZXlzLnAyNTZkaCxcbiAgICAgIGF1dGg6IGJvZHkua2V5cy5hdXRoLFxuICAgICAgbmFtZTogYm9keS5uYW1lLFxuICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXZpY2UuaWQsXG4gICAgICBlbmRwb2ludDogZGV2aWNlLmVuZHBvaW50LFxuICAgICAgY3JlYXRlZEF0OiBkZXZpY2UuY3JlYXRlZEF0LFxuICAgICAgbmFtZTogZGV2aWNlLm5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIEBEZWxldGUoJ2Rlc2t0b3AvZGV2aWNlLzpkZXZpY2VJZCcpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyBkZWxldGVEZXNrdG9wVXNlcihcbiAgICBAUGFyYW0oJ2RldmljZUlkJykgZGV2aWNlSWQ6IG51bWJlcixcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZCh7IGlkOiBkZXZpY2VJZCwgdXNlcklkIH0pO1xuICAgIGlmIChkbi5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUoZG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZWJob29rIGZyb20gdHdpbGlvXG4gIEBQb3N0KCcvcGhvbmUvdmVyaWZ5JylcbiAgQEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sJylcbiAgYXN5bmMgdmVyaWZ5UGhvbmVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogVHdpbGlvQm9keSxcbiAgICBASGVhZGVycygneC10d2lsaW8tc2lnbmF0dXJlJykgdHdpbGlvU2lnbmF0dXJlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGJvZHkuQm9keS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBzZW5kZXJOdW1iZXIgPSBib2R5LkZyb207XG5cbiAgICBjb25zdCB0d2lsaW9BdXRoVG9rZW4gPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKTtcblxuICAgIGNvbnN0IGlzVmFsaWRhdGVkID0gdHdpbGlvLnZhbGlkYXRlUmVxdWVzdChcbiAgICAgIHR3aWxpb0F1dGhUb2tlbixcbiAgICAgIHR3aWxpb1NpZ25hdHVyZS50cmltKCksXG4gICAgICBgJHt0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKX0vYXBpL3YxL25vdGlmaWNhdGlvbnMvcGhvbmUvdmVyaWZ5YCxcbiAgICAgIGJvZHksXG4gICAgKTtcblxuICAgIGlmICghaXNWYWxpZGF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvbkNvbnRyb2xsZXIubWVzc2FnZU5vdEZyb21Ud2lsaW8sXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VUb1VzZXIgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS52ZXJpZnlQaG9uZShcbiAgICAgIHNlbmRlck51bWJlcixcbiAgICAgIG1lc3NhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBNZXNzYWdpbmdSZXNwb25zZSA9IHR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZVRvVXNlcik7XG5cbiAgICByZXR1cm4gdHdpbWwudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9naW5Db250cm9sbGVyIH0gZnJvbSAnLi9sb2dpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vbG9naW4vand0LnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4gKHtcbiAgICAgICAgc2VjcmV0OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbSnd0U3RyYXRlZ3ksIExvZ2luQ291cnNlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFUlJPUl9NRVNTQUdFUyxcbiAgS2hvdXJ5RGF0YVBhcmFtcyxcbiAgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSxcbiAgS2hvdXJ5U3R1ZGVudENvdXJzZSxcbiAgS2hvdXJ5VEFDb3Vyc2UsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgaHR0cFNpZ25hdHVyZSBmcm9tICdodHRwLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi8uLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBsb2dpbkNvdXJzZVNlcnZpY2U6IExvZ2luQ291cnNlU2VydmljZSxcbiAgICBwcml2YXRlIGp3dFNlcnZpY2U6IEp3dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQFBvc3QoJy9raG91cnlfbG9naW4nKVxuICBhc3luYyByZWNpZXZlRGF0YUZyb21LaG91cnkoXG4gICAgQFJlcSgpIHJlcTogUmVxdWVzdCxcbiAgICBAQm9keSgpIGJvZHk6IEtob3VyeURhdGFQYXJhbXMsXG4gICk6IFByb21pc2U8S2hvdXJ5UmVkaXJlY3RSZXNwb25zZT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IHJlcXVlc3QgaGFzIGNvbWUgZnJvbSBLaG91cnlcbiAgICAgIGNvbnN0IHBhcnNlZFJlcXVlc3QgPSBodHRwU2lnbmF0dXJlLnBhcnNlUmVxdWVzdChyZXEpO1xuICAgICAgY29uc3QgdmVyaWZ5ID0gaHR0cFNpZ25hdHVyZS52ZXJpZnlITUFDKFxuICAgICAgICBwYXJzZWRSZXF1ZXN0LFxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdLSE9VUllfUFJJVkFURV9LRVknKSxcbiAgICAgICk7XG4gICAgICBpZiAoIXZlcmlmeSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLmxvZ2luQ29udHJvbGxlci5yZWNlaXZlRGF0YUZyb21LaG91cnksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHVzZXI6IFVzZXJNb2RlbDtcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgY291cnNlczogW10gfSk7XG4gICAgfVxuXG4gICAgLy8gUTogRG8gd2UgbmVlZCB0aGlzIGlmIGl0J3Mgbm90IGdvaW5nIHRvIGNoYW5nZT9cbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB7XG4gICAgICBlbWFpbDogYm9keS5lbWFpbCxcbiAgICAgIGZpcnN0TmFtZTogYm9keS5maXJzdF9uYW1lLFxuICAgICAgbGFzdE5hbWU6IGJvZHkubGFzdF9uYW1lLFxuICAgICAgbmFtZTogYm9keS5maXJzdF9uYW1lICsgJyAnICsgYm9keS5sYXN0X25hbWUsXG4gICAgICBwaG90b1VSTDogJycsXG4gICAgfSk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgICAgICAgIGMuY291cnNlLFxuICAgICAgICAgIGMuc2VjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgY29uc3QgdXNlckNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2UuaWQsXG4gICAgICAgICAgICBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHVzZXJDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LnRhX2NvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlUQUNvdXJzZSkgPT4ge1xuICAgICAgICAvLyBRdWVyeSBmb3IgYWxsIHRoZSBjb3Vyc2VzIHdoaWNoIG1hdGNoIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmljIGNvdXJzZSBmcm9tIEtob3VyeVxuICAgICAgICBjb25zdCBjb3Vyc2VNYXBwaW5ncyA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZCh7XG4gICAgICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGMuY291cnNlIH0sIC8vIFRPRE86IEFkZCBzZW1lc3RlciBzdXBwb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgY291cnNlTWFwcGluZyBvZiBjb3Vyc2VNYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IHRhQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoXG4gICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgeyBleHBpcmVzSW46IDUgKiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7IHVzZXJJZCB9KTtcbiAgICBjb25zdCBpc1NlY3VyZSA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgLmdldDxzdHJpbmc+KCdET01BSU4nKVxuICAgICAgLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgcmVzXG4gICAgICAuY29va2llKCdhdXRoX3Rva2VuJywgYXV0aFRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGlzU2VjdXJlIH0pXG4gICAgICAucmVkaXJlY3QoMzAyLCAnLycpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEdldFByb2ZpbGVSZXNwb25zZSxcbiAgVXBkYXRlUHJvZmlsZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQYXRjaCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAnZmlyc3ROYW1lJyxcbiAgICAgICdsYXN0TmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgdXNlci5uYW1lID0gdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lO1xuICAgIGlmIChcbiAgICAgIHVzZXIucGhvbmVOb3RpZnNFbmFibGVkICYmXG4gICAgICB1c2VyUGF0Y2gucGhvbmVOdW1iZXIgIT09IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXJcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyUGhvbmUodXNlclBhdGNoLnBob25lTnVtYmVyLCB1c2VyKTtcbiAgICB9XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXQodXNlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vcXVlc3Rpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWVzdGlvblN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXN0aW9uLnN1YnNjcmliZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWVzdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtRdWVzdGlvblN1YnNjcmliZXJdLFxuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlLCBRdWV1ZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBHZXRRdWVzdGlvblJlc3BvbnNlLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzS2V5cyxcbiAgUm9sZSxcbiAgVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXIsIFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVlc3Rpb24tcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncXVlc3Rpb25zJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWVzdGlvblJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWVzdGlvbklkJylcbiAgYXN5bmMgZ2V0UXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICApOiBQcm9taXNlPEdldFF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUG9zdCgpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KCkgYm9keTogQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8Q3JlYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdGV4dCwgcXVlc3Rpb25UeXBlLCBxdWV1ZUlkLCBmb3JjZSB9ID0gYm9keTtcblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWV1ZUlkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5pbnZhbGlkUXVldWUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghcXVldWUuYWxsb3dRdWVzdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ubm9OZXdRdWVzdGlvbnMsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5jbG9zZWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNVc2VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY3JlYXRvcklkOiB1c2VyLmlkLFxuICAgICAgICBzdGF0dXM6IEluKE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCEhcHJldmlvdXNVc2VyUXVlc3Rpb24pIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICBwcmV2aW91c1VzZXJRdWVzdGlvbi5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkO1xuICAgICAgICBhd2FpdCBwcmV2aW91c1VzZXJRdWVzdGlvbi5zYXZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ub25lUXVlc3Rpb25BdEFUaW1lLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoe1xuICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgIGNyZWF0b3I6IHVzZXIsXG4gICAgICB0ZXh0LFxuICAgICAgcXVlc3Rpb25UeXBlLFxuICAgICAgc3RhdHVzOiBRdWVzdGlvblN0YXR1c0tleXMuRHJhZnRpbmcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc09ubGluZTogdHJ1ZSxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUGF0Y2goJzpxdWVzdGlvbklkJylcbiAgQFJvbGVzKFJvbGUuU1RVREVOVCwgUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIC8vIFRPRE86IFVzZSBxdWV1ZVJvbGUgZGVjb3JhdG9yLCBidXQgd2UgbmVlZCB0byBmaXggaXRzIHBlcmZvcm1hbmNlIGZpcnN0XG4gIGFzeW5jIHVwZGF0ZVF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxVcGRhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgbGV0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWVzdGlvbklkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICdxdWV1ZScsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NyZWF0b3IgPSB1c2VySWQgPT09IHF1ZXN0aW9uLmNyZWF0b3JJZDtcblxuICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgIC8vIEZhaWwgaWYgc3R1ZGVudCB0cmllcyBhbiBpbnZhbGlkIHN0YXR1cyBjaGFuZ2VcbiAgICAgIGlmIChib2R5LnN0YXR1cyAmJiAhcXVlc3Rpb24uY2hhbmdlU3RhdHVzKGJvZHkuc3RhdHVzLCBSb2xlLlNUVURFTlQpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdTdHVkZW50JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbiA9IE9iamVjdC5hc3NpZ24ocXVlc3Rpb24sIGJvZHkpO1xuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCBjcmVhdG9yLCBjaGVjayBpZiB1c2VyIGlzIFRBL1BST0Ygb2YgY291cnNlIG9mIHF1ZXN0aW9uXG4gICAgY29uc3QgaXNUYU9yUHJvZiA9XG4gICAgICAoYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY291cnNlSWQ6IHF1ZXN0aW9uLnF1ZXVlLmNvdXJzZUlkLFxuICAgICAgICAgIHJvbGU6IEluKFtSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUl0pLFxuICAgICAgICB9LFxuICAgICAgfSkpID4gMDtcblxuICAgIGlmIChpc1RhT3JQcm9mKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoYm9keSkubGVuZ3RoICE9PSAxIHx8IE9iamVjdC5rZXlzKGJvZHkpWzBdICE9PSAnc3RhdHVzJykge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi50YU9ubHlFZGl0UXVlc3Rpb25TdGF0dXMsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRTdGF0dXMgPSBxdWVzdGlvbi5zdGF0dXM7XG4gICAgICBjb25zdCBuZXdTdGF0dXMgPSBib2R5LnN0YXR1cztcbiAgICAgIC8vIElmIHRoZSB0YUhlbHBlZCBpcyBhbHJlYWR5IHNldCwgbWFrZSBzdXJlIHRoZSBzYW1lIHRhIHVwZGF0ZXMgdGhlIHN0YXR1c1xuICAgICAgaWYgKHF1ZXN0aW9uLnRhSGVscGVkPy5pZCAhPT0gdXNlcklkKSB7XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBSGVscGluZyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBUmVzb2x2ZWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0FscmVhZHlIZWxwaW5nT25lID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB0YUhlbHBlZElkOiB1c2VySWQsXG4gICAgICAgICAgICBzdGF0dXM6IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKSA9PT0gMTtcbiAgICAgIGlmIChpc0FscmVhZHlIZWxwaW5nT25lICYmIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhSGVscGluZ090aGVyLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZFRyYW5zaXRpb24gPSBxdWVzdGlvbi5jaGFuZ2VTdGF0dXMobmV3U3RhdHVzLCBSb2xlLlRBKTtcbiAgICAgIGlmICghdmFsaWRUcmFuc2l0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdUQScsXG4gICAgICAgICAgICBxdWVzdGlvbi5zdGF0dXMsXG4gICAgICAgICAgICBib2R5LnN0YXR1cyxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgVEEgYXMgdGFIZWxwZWQgd2hlbiB0aGUgVEEgc3RhcnRzIGhlbHBpbmcgdGhlIHN0dWRlbnRcbiAgICAgIGlmIChcbiAgICAgICAgb2xkU3RhdHVzICE9PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyAmJlxuICAgICAgICBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXG4gICAgICApIHtcbiAgICAgICAgcXVlc3Rpb24udGFIZWxwZWQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh1c2VySWQpO1xuICAgICAgICBxdWVzdGlvbi5oZWxwZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gU2V0IGZpcnN0SGVscGVkQXQgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKCFxdWVzdGlvbi5maXJzdEhlbHBlZEF0KSB7XG4gICAgICAgICAgcXVlc3Rpb24uZmlyc3RIZWxwZWRBdCA9IHF1ZXN0aW9uLmhlbHBlZEF0O1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MucXVldWUuVEFfSElUX0hFTFBFRChxdWVzdGlvbi50YUhlbHBlZC5uYW1lKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdTdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXMpIHtcbiAgICAgICAgcXVlc3Rpb24uY2xvc2VkQXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24ubG9naW5Vc2VyQ2FudEVkaXQsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBQb3N0KCc6cXVlc3Rpb25JZC9ub3RpZnknKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIG5vdGlmeShAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWUnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLkFMRVJUX0JVVFRPTixcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5SRU1PVkVELFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBsZXQgcXVldWVJZDtcblxuICAgIGlmIChyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKTtcbiAgICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXN0aW9uTm90Rm91bmQsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWV1ZUlkID0gcXVlc3Rpb24ucXVldWVJZDtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuYm9keS5xdWV1ZUlkKSB7XG4gICAgICAvLyBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgbmV3IHF1ZXN0aW9uXG4gICAgICBxdWV1ZUlkID0gcmVxdWVzdC5ib2R5LnF1ZXVlSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCk7XG5cbiAgICAvLyBZb3UgY2Fubm90IGludGVyYWN0IHdpdGggYSBxdWVzdGlvbiBpbiBhIG5vbmV4aXN0ZW50IHF1ZXVlXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZURvZXNOb3RFeGlzdCxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIEluc2VydEV2ZW50LFxuICBSZW1vdmVFdmVudCxcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWVzdGlvbk1vZGVsPiB7XG4gIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuXG4gICAgLy8gU2VuZCBwdXNoIG5vdGlmaWNhdGlvbiB0byBzdHVkZW50cyB3aGVuIHRoZXkgYXJlIGhpdCAzcmQgaW4gbGluZVxuICAgIC8vIGlmIHN0YXR1cyB1cGRhdGVkIHRvIGNsb3NlZFxuICAgIGlmIChcbiAgICAgIGV2ZW50LnVwZGF0ZWRDb2x1bW5zLmZpbmQoKGMpID0+IGMucHJvcGVydHlOYW1lID09PSAnc3RhdHVzJykgJiZcbiAgICAgIGV2ZW50LmVudGl0eS5zdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXNcbiAgICApIHtcbiAgICAgIC8vIGdldCAzcmQgaW4gcXVldWUgYmVmb3JlIGFuZCBhZnRlciB0aGlzIHVwZGF0ZVxuICAgICAgY29uc3QgcHJldmlvdXNUaGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICAgKVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGNvbnN0IHRoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShldmVudC5lbnRpdHkucXVldWVJZClcbiAgICAgICAgLnNldFF1ZXJ5UnVubmVyKGV2ZW50LnF1ZXJ5UnVubmVyKSAvLyBSdW4gaW4gc2FtZSB0cmFuc2FjdGlvbiBhcyB0aGUgdXBkYXRlXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgaWYgKHRoaXJkICYmIHByZXZpb3VzVGhpcmQ/LmlkICE9PSB0aGlyZD8uaWQpIHtcbiAgICAgICAgY29uc3QgeyBjcmVhdG9ySWQgfSA9IHRoaXJkO1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKGNyZWF0b3JJZCwgTm90aWZNc2dzLnF1ZXVlLlRISVJEX1BMQUNFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJPZlF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICApLmdldENvdW50KCk7XG5cbiAgICBpZiAobnVtYmVyT2ZRdWVzdGlvbnMgPT09IDApIHtcbiAgICAgIGNvbnN0IHN0YWZmID0gKFxuICAgICAgICBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoZXZlbnQuZW50aXR5LnF1ZXVlSWQsIHtcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgICAgIH0pXG4gICAgICApLnN0YWZmTGlzdDtcblxuICAgICAgc3RhZmYuZm9yRWFjaCgoc3RhZmYpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBzdGFmZi5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MudGEuU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICB9XG5cbiAgYXN5bmMgYmVmb3JlUmVtb3ZlKGV2ZW50OiBSZW1vdmVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGR1ZSB0byBjYXNjYWRlcyBlbnRpdHkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgbG9hZGVkXG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU2VlZENvbnRyb2xsZXIgfSBmcm9tICcuL3NlZWQuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbU2VlZENvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtTZWVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZWRNb2R1bGUge31cbiIsImltcG9ydCB7IENyZWF0ZVF1ZXN0aW9uUGFyYW1zLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIENvdXJzZUZhY3RvcnksXG4gIE9mZmljZUhvdXJGYWN0b3J5LFxuICBRdWVzdGlvbkZhY3RvcnksXG4gIFF1ZXVlRmFjdG9yeSxcbiAgU2VtZXN0ZXJGYWN0b3J5LFxuICBVc2VyQ291cnNlRmFjdG9yeSxcbiAgVXNlckZhY3RvcnksXG59IGZyb20gJy4uLy4uL3Rlc3QvdXRpbC9mYWN0b3JpZXMnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3NlZWRzJylcbkBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuZXhwb3J0IGNsYXNzIFNlZWRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgc2VlZFNlcnZpY2U6IFNlZWRTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVsZXRlJylcbiAgYXN5bmMgZGVsZXRlQWxsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoT2ZmaWNlSG91ck1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWVzdGlvbk1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWV1ZU1vZGVsKTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgcmVzZXQnO1xuICB9XG5cbiAgQEdldCgnY3JlYXRlJylcbiAgYXN5bmMgY3JlYXRlU2VlZHMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBGaXJzdCBkZWxldGUgdGhlIG9sZCBkYXRhXG4gICAgYXdhaXQgdGhpcy5kZWxldGVBbGwoKTtcblxuICAgIC8vIFRoZW4gYWRkIHRoZSBuZXcgc2VlZCBkYXRhXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuXG4gICAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRvbW9ycm93LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMTkpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgLSA0NTAwMDAwKSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAxMDAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1llc3RlcmRheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHllc3RlcmRheSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHllc3RlcmRheS52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvbW9ycm93ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogdG9tb3Jyb3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh0b21vcnJvdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUV4aXN0cyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFjb3Vyc2VFeGlzdHMpIHtcbiAgICAgIGF3YWl0IFNlbWVzdGVyRmFjdG9yeS5jcmVhdGUoeyBzZWFzb246ICdGYWxsJywgeWVhcjogMjAyMCB9KTtcbiAgICAgIGF3YWl0IENvdXJzZUZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICAgIHJlbGF0aW9uczogWydvZmZpY2VIb3VycyddLFxuICAgIH0pO1xuXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gW1xuICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgIF07XG4gICAgY291cnNlLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJFeHNpc3RzID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKTtcbiAgICBpZiAoIXVzZXJFeHNpc3RzKSB7XG4gICAgICAvLyBTdHVkZW50IDFcbiAgICAgIGNvbnN0IHVzZXIxID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdsaXUuc3RhQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnU3RhbmxleSBMaXUnLFxuICAgICAgICBmaXJzdE5hbWU6ICdTdGFubGV5JyxcbiAgICAgICAgbGFzdE5hbWU6ICdMaXUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVIyMENHMzZFLWNmMGYzNzUyNTJiZC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMSxcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gU3R1bmRlbnQgMlxuICAgICAgY29uc3QgdXNlcjIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3Rha2F5YW1hLmFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdBbGV4IFRha2F5YW1hJyxcbiAgICAgICAgZmlyc3ROYW1lOiAnQWxleCcsXG4gICAgICAgIGxhc3ROYW1lOiAnVGFrYXlhbWEnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUpMOTc0NDNELTUwMTIxMzM5Njg2Yi01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMixcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMVxuICAgICAgY29uc3QgdXNlcjMgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3N0ZW56ZWwud0Bub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1dpbGwgU3RlbnplbCcsXG4gICAgICAgIGZpcnN0TmFtZTogJ1dpbGwnLFxuICAgICAgICBsYXN0TmFtZTogJ1N0ZW56ZWwnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVJGMjU2S1JULWQxMDA5OGU4NzlkYS01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMyxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDJcbiAgICAgIGNvbnN0IHVzZXI0ID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdjaHUuZGFqQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnRGEtSmluIENodScsXG4gICAgICAgIGZpcnN0TmFtZTogJ0RhLUppbicsXG4gICAgICAgIGxhc3ROYW1lOiAnQ2h1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVFNTZZNVVUMS04NWRiNTlhNDc0ZjQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjQsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHJvb206ICdXSFYgMTAxJyxcbiAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgb2ZmaWNlSG91cnM6IFtcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgICAgXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDI1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAR2V0KCdmaWxsX3F1ZXVlJylcbiAgYXN5bmMgZmlsbFF1ZXVlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoKTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVVzZXInKVxuICBhc3luYyBjcmVhdGVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogeyByb2xlOiBSb2xlOyBjb3Vyc2VJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHRhOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSwgY291cnNlOiBjb3Vyc2UgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGE7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVldWUnKVxuICBhc3luYyBjcmVhdGVRdWV1ZShcbiAgICBAQm9keSgpXG4gICAgYm9keToge1xuICAgICAgY291cnNlSWQ6IG51bWJlcjtcbiAgICAgIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuICAgICAgLy8gY2xvc2VzIGluIG4gbWlsbGlzZWNvbmRzIGZyb20gbm93XG4gICAgICBjbG9zZXNJbj86IG51bWJlcjtcbiAgICB9LFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIChib2R5Py5jbG9zZXNJbiB8fCA0NTAwMDAwKSksXG4gICAgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvZHkuYWxsb3dRdWVzdGlvbnMgPz8gZmFsc2UsXG4gICAgfTtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIG9wdGlvbnNbJ2NvdXJzZSddID0gY291cnNlO1xuICAgIH1cbiAgICBjb25zdCBxdWV1ZTogUXVldWVNb2RlbCA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXN0aW9uJylcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIHF1ZXVlSWQ6IG51bWJlcjtcbiAgICAgIHN0dWRlbnRJZDogbnVtYmVyO1xuICAgICAgZGF0YTogQ3JlYXRlUXVlc3Rpb25QYXJhbXM7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWVzdGlvbk1vZGVsPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmIChib2R5LnF1ZXVlSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkucXVldWVJZCk7XG4gICAgICBvcHRpb25zWydxdWV1ZSddID0gcXVldWU7XG4gICAgfVxuICAgIGlmIChib2R5LnN0dWRlbnRJZCkge1xuICAgICAgY29uc3Qgc3R1ZGVudCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuc3R1ZGVudElkKTtcbiAgICAgIG9wdGlvbnNbJ2NyZWF0b3InXSA9IHN0dWRlbnQ7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbk1vZGVsID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgLi4uYm9keS5kYXRhLFxuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ2ZpcnN0TmFtZScsICdVc2VyJylcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5LCAwKTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsICdPbmxpbmUnKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdhbGxvd1F1ZXN0aW9ucycsIGZhbHNlKVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdzdGFmZkxpc3QnLCBVc2VyRmFjdG9yeSwgMCk7XG5cbi8vIFdBUk5JTkc6IERPIE5PVCBVU0UgQ1JFQVRPUklELiBBUyBZT1UgU0VFIEhFUkUsIFdFIE9OTFkgQUNDRVBUIENSRUFUT1Jcbi8vVE9ETzogbWFrZSBpdCBhY2NlcHQgY3JlYXRvcklkIGFzIHdlbGxcbmV4cG9ydCBjb25zdCBRdWVzdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWVzdGlvbk1vZGVsKVxuICAuc2VxdWVuY2UoJ3RleHQnLCAoaSkgPT4gYHF1ZXN0aW9uICR7aX1gKVxuICAuYXR0cignc3RhdHVzJywgJ1F1ZXVlZCcpXG4gIC5hdHRyKCdxdWVzdGlvblR5cGUnLCBRdWVzdGlvblR5cGUuT3RoZXIpXG4gIC5hdHRyKCdjcmVhdGVkQXQnLCBuZXcgRGF0ZSgpKVxuICAuYXNzb2NPbmUoJ3F1ZXVlJywgUXVldWVGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NyZWF0b3InLCBVc2VyRmFjdG9yeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtLWZhY3RvcnlcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZWRTZXJ2aWNlIHtcbiAgYXN5bmMgZGVsZXRlQWxsKG1vZGVsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBnZXRDb25uZWN0aW9uKCkuY3JlYXRlUXVlcnlCdWlsZGVyKCkuZGVsZXRlKCkuZnJvbShtb2RlbCkuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LFxuICBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LFxuICBEZWZhdWx0QWRtaW5TaXRlLFxufSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yIH0gZnJvbSAnLi9jcmVkZW50aWFsVmFsaWRhdG9yJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7XG4gIENvdXJzZUFkbWluLFxuICBRdWV1ZUFkbWluLFxuICBVc2VyQWRtaW4sXG4gIFVzZXJDb3Vyc2VBZG1pbixcbiAgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbixcbn0gZnJvbSAnLi9hZG1pbi1lbnRpdGllcyc7XG5pbXBvcnQgeyBBZG1pbkNvbW1hbmQgfSBmcm9tICcuL2FkbWluLmNvbW1hbmQnO1xuXG5jb25zdCBDb3JlTW9kdWxlID0gQWRtaW5Db3JlTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkNvcmVNb2R1bGUoe30pO1xuY29uc3QgQXV0aE1vZHVsZSA9IEFkbWluQXV0aE1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5BdXRoTW9kdWxlKHtcbiAgYWRtaW5Db3JlTW9kdWxlOiBDb3JlTW9kdWxlLFxuICBjcmVkZW50aWFsVmFsaWRhdG9yOiBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IsIC8vIGhvdyBkbyB5b3UgdmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgaW1wb3J0czogW1R5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbQWRtaW5Vc2VyTW9kZWxdKV0sIC8vIHdoYXQgbW9kdWxlcyBleHBvcnQgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgY3JlZGVudGlhbFZhbGlkYXRvciBhdmFpbGFibGVcbiAgcHJvdmlkZXJzOiBbXSxcbn0pO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0FkbWluQ29tbWFuZF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZG1pblNpdGU6IERlZmF1bHRBZG1pblNpdGUpIHtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZScsIENvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXInLCBVc2VyQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlckNvdXJzZScsIFVzZXJDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdRdWV1ZScsIFF1ZXVlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlU2VjdGlvbk1hcHBpbmcnLCBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWFkbWluXCIpOyIsImltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0JztcblxuZXhwb3J0IGNvbnN0IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciA9IHtcbiAgaW5qZWN0OiBbXSxcbiAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNyZWRlbnRpYWxzKFxuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTxBZG1pblVzZXJNb2RlbD4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGlmIChhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIEJhc2VFbnRpdHksIENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuXG4vKipcbiAqIEFkbWluIHVzZXJzIGFyZSB0b3RhbGx5IHNlcGFyYXRlIGZyb20gcmVndWxhciB1c2VycyBhbmQgY2FuIG9ubHkgYmUgY3JlYXRlZCBmcm9tIGNvbW1hbmQgbGluZS5cbiAqIGB5YXJuIGNsaSBhZG1pbjpjcmVhdGVgXG4gKi9cbkBFbnRpdHkoJ2FkbWluX3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEFkbWluVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBzZXRQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgNSk7XG4gIH1cblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIHVuaXF1ZTogdHJ1ZSwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwiaW1wb3J0IHsgQWRtaW5FbnRpdHkgfSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ25hbWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFF1ZXVlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdyb29tJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXTtcbiAgc2VhcmNoRmllbGRzID0gWydlbWFpbCcsICduYW1lJ107XG4gIGZpZWxkcyA9IFtcbiAgICAnaWQnLFxuICAgICdlbWFpbCcsXG4gICAgJ25hbWUnLFxuICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgJ3F1ZXVlcycsXG4gIF07XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3VzZXJJZCcsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ3NlY3Rpb24nLCAnY291cnNlSWQnXTtcbn1cbiIsImltcG9ydCB7IENvbW1hbmQsIFBvc2l0aW9uYWwgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IHF1ZXN0aW9uLCBrZXlJbllOIH0gZnJvbSAncmVhZGxpbmUtc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkNvbW1hbmQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2NyZWF0ZTphZG1pbiA8dXNlcm5hbWU+JyxcbiAgICBkZXNjcmliZTogJ2NyZWF0ZSBhbiBhZG1pbiB1c2VyJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICBkZXNjcmliZTogJ3RoZSBhZG1pbiB1c2VybmFtZScsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9KVxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VQYXNzd29yZCA9IGtleUluWU4oXG4gICAgICAgIGBVc2VyICR7dXNlcm5hbWV9IGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlaXIgcGFzc3dvcmQ/YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlciA9IEFkbWluVXNlck1vZGVsLmNyZWF0ZSh7IHVzZXJuYW1lIH0pO1xuICAgIH1cbiAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nID0gcXVlc3Rpb24oJ1Bhc3N3b3JkOiAnLCB7XG4gICAgICBoaWRlRWNob0JhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgY29uc29sZS5sb2coYENyZWF0ZWQgdXNlcjogJHt1c2VyLnVzZXJuYW1lfWApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZS1zeW5jXCIpOyIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3NyYy9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuY29uZmlnKCk7XG5cbi8vIE9wdGlvbnMgb25seSB1c2VkIHdoZSBydW4gdmlhIENMSVxuY29uc3QgaW5DTEkgPSB7XG4gIG1pZ3JhdGlvbnM6IFsnbWlncmF0aW9uLyoudHMnXSxcbiAgY2xpOiB7XG4gICAgbWlncmF0aW9uc0RpcjogJ21pZ3JhdGlvbicsXG4gIH0sXG59O1xuXG5jb25zdCB0eXBlb3JtID0ge1xuICB0eXBlOiAncG9zdGdyZXMnLFxuICB1cmw6IHByb2Nlc3MuZW52LkRCX1VSTCB8fCAncG9zdGdyZXM6Ly9wb3N0Z3Jlc0Bsb2NhbGhvc3Q6NTQzMi9kZXYnLFxuICBzeW5jaHJvbml6ZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcbiAgZW50aXRpZXM6IFtcbiAgICBDb3Vyc2VNb2RlbCxcbiAgICBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLFxuICAgIE9mZmljZUhvdXJNb2RlbCxcbiAgICBTZW1lc3Rlck1vZGVsLFxuICAgIFVzZXJNb2RlbCxcbiAgICBVc2VyQ291cnNlTW9kZWwsXG4gICAgUXVlc3Rpb25Nb2RlbCxcbiAgICBRdWV1ZU1vZGVsLFxuICAgIERlc2t0b3BOb3RpZk1vZGVsLFxuICAgIFBob25lTm90aWZNb2RlbCxcbiAgICBBZG1pblVzZXJNb2RlbCxcbiAgICBFdmVudE1vZGVsLFxuICBdLFxuICBrZWVwQ29ubmVjdGlvbkFsaXZlOiB0cnVlLFxuICBsb2dnaW5nOiAhIXByb2Nlc3MuZW52LlRZUEVPUk1fTE9HR0lORyxcbiAgLi4uKCEhcHJvY2Vzcy5lbnYuVFlQRU9STV9DTEkgPyBpbkNMSSA6IHt9KSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvcm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFja2ZpbGxQaG9uZU5vdGlmcyB9IGZyb20gJy4vYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQnO1xuaW1wb3J0IHsgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQgfSBmcm9tICcuL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kJztcbmltcG9ydCB7IEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB9IGZyb20gJy4vc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBCYWNrZmlsbFBob25lTm90aWZzLFxuICAgIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0LFxuICAgIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKChkKSA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKChkKSA9PiBkLmlkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnNUb0Rpc2FibGUgPSAoXG4gICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZCh7XG4gICAgICAgIHdoZXJlOiB7IHBob25lTm90aWZzRW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICByZWxhdGlvbnM6IFsncGhvbmVOb3RpZiddLFxuICAgICAgfSlcbiAgICApLmZpbHRlcigodSkgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCgodSkgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0JyxcbiAgICBkZXNjcmliZTogJ2NvcHkgYWxsIGV4aXN0aW5nIGhlbHBlZEF0IHRvIGZpcnN0SGVscGVkQXQnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjb3B5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgIC51cGRhdGUoKVxuICAgICAgLnNldCh7IGZpcnN0SGVscGVkQXQ6ICgpID0+ICdcImhlbHBlZEF0XCInIH0pXG4gICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgLmNhbGxMaXN0ZW5lcnMoZmFsc2UpXG4gICAgICAuZXhlY3V0ZSgpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFVwZGF0ZWQgJHthd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgICAuZ2V0Q291bnQoKX0gcmVjb3Jkc2AsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsU2VwYXJhdGVGaXJzdExhc3ROYW1lcyB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6Zmlyc3QtbGFzdC1uYW1lcycsXG4gICAgZGVzY3JpYmU6ICdjaGFuZ2UgYWxsIG5hbWVzIHRvIGZpcnN0IGFuZCBsYXN0IG5hbWVzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlck1vZGVsLmZpbmQoKTtcbiAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZS5zcGxpdCgnICcpWzBdO1xuICAgICAgICB1c2VyLmxhc3ROYW1lID0gdXNlci5uYW1lLnNwbGl0KCcgJykuc2xpY2UoMSkuam9pbignICcpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nIG5hbWUgZmFpbGVkIGZvciAke3VzZXIubmFtZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzKTtcbiAgICBjb25zdCBjb3VudCA9IFVzZXJNb2RlbC5jb3VudCgpO1xuXG4gICAgY29uc29sZS5sb2coYFVwZGF0ZWQgbmFtZXMgZm9yICR7Y291bnR9IHVzZXJzYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgSHR0cE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIgfSBmcm9tICcuL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1JlbGVhc2VOb3Rlc0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+ICh7XG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIG1heFJlZGlyZWN0czogNSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNNb2R1bGUge31cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTLCBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgSHR0cFNlcnZpY2UsXG4gIEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5AQ29udHJvbGxlcigncmVsZWFzZV9ub3RlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGdldFJlbGVhc2VOb3RlcygpOiBQcm9taXNlPEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlID0ge1xuICAgICAgbGFzdFVwZGF0ZWRVbml4VGltZTogbnVsbCxcbiAgICAgIHJlbGVhc2VOb3RlczogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCB0aGlzLmh0dHBTZXJ2aWNlXG4gICAgICAuZ2V0KFxuICAgICAgICAnaHR0cHM6Ly9ub3Rpb24tYXBpLnNwbGl0YmVlLmlvL3YxL3BhZ2UvYWJiYTI0NmJmYTA4NDdiYWEyNzA2YWIzMGQwYzZjN2QnLFxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICAgIGNvbnN0IGRhdGEgPSByZXF1ZXN0LmRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRpbWVUZXh0ID1cbiAgICAgICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10/LnZhbHVlPy5wcm9wZXJ0aWVzXG4gICAgICAgICAgPy50aXRsZVswXVswXTtcbiAgICAgIHJlc3BvbnNlLmxhc3RVcGRhdGVkVW5peFRpbWUgPSB0aW1lVGV4dC5zcGxpdCgnVW5peCAnKVsxXSAqIDEwMDA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIucmVsZWFzZU5vdGVzVGltZShlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgdGltZSBibG9jayBhbmQgcGFnZSBsaW5rIGJsb2NrIGZyb20gcGFnZVxuICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICBkYXRhWyc0ZDI1ZjM5My1lNTcwLTRjZDUtYWQ2Ni1iMjc4YTA5MjQyMjUnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgcmVzcG9uc2UucmVsZWFzZU5vdGVzID0gZGF0YTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUsIEFyZ3VtZW50TWV0YWRhdGEgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbi8qKlxuICogU3RyaXAgdW5kZWZpbmVkIHByb3BlcnRpZXMgZnJvbSBib2R5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RyaXBVbmRlZmluZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBtZXRhZGF0YTogQXJndW1lbnRNZXRhZGF0YSk6IGFueSB7XG4gICAgaWYgKG1ldGFkYXRhLnR5cGUgPT09ICdib2R5Jykge1xuICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkcm9wVW5kZWZpbmVkKG9iajogdW5rbm93bikge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0JyAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3BVbmRlZmluZWQob2JqW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTmVzdEludGVyY2VwdG9yLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBDYWxsSGFuZGxlcixcbiAgSHR0cEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwbUludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgaW50ZXJjZXB0KFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsXG4gICAgbmV4dDogQ2FsbEhhbmRsZXIsXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvbikge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9