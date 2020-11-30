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
const stripUndefined_pipe_1 = __webpack_require__(100);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(101);
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
const notification_module_1 = __webpack_require__(57);
const login_module_1 = __webpack_require__(64);
const profile_module_1 = __webpack_require__(73);
const question_module_1 = __webpack_require__(75);
const queue_module_1 = __webpack_require__(44);
const seed_module_1 = __webpack_require__(79);
const admin_module_1 = __webpack_require__(84);
const nestjs_command_1 = __webpack_require__(51);
const sse_module_1 = __webpack_require__(48);
const typeormConfig = __webpack_require__(92);
const backfill_module_1 = __webpack_require__(94);
const release_notes_module_1 = __webpack_require__(98);
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
const queue_module_1 = __webpack_require__(44);
const ical_command_1 = __webpack_require__(50);
const ical_service_1 = __webpack_require__(52);
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        controllers: [course_controller_1.CourseController],
        imports: [queue_module_1.QueueModule],
        providers: [ical_command_1.ICalCommand, ical_service_1.IcalService],
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
const office_hour_entity_1 = __webpack_require__(27);
const queue_sse_service_1 = __webpack_require__(39);
const moment = __webpack_require__(36);
let CourseController = class CourseController {
    constructor(connection, queueCleanService, queueSSEService) {
        this.connection = connection;
        this.queueCleanService = queueCleanService;
        this.queueSSEService = queueSSEService;
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
        queue_sse_service_1.QueueSSEService])
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
exports.ERROR_MESSAGES = exports.SSEQueueResponse = exports.UpdateQueueParams = exports.TACheckoutResponse = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.StatusSentToCreator = exports.StatusInPriorityQueue = exports.StatusInQueue = exports.ClosedQuestionStatus = exports.LimboQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.isProd = exports.PROD_URL = void 0;
const class_transformer_1 = __webpack_require__(15);
const class_validator_1 = __webpack_require__(16);
__webpack_require__(17);
exports.PROD_URL = "https://khouryofficehours.com";
exports.isProd = () => {
    var _a;
    return process.env.DOMAIN === exports.PROD_URL ||
        (typeof window !== "undefined" && ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin) === exports.PROD_URL);
};
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
exports.QueueSSEService = void 0;
const common_1 = __webpack_require__(5);
const lodash_1 = __webpack_require__(40);
const sse_service_1 = __webpack_require__(41);
const queue_service_1 = __webpack_require__(43);
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
/* 40 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 41 */
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
const apm = __webpack_require__(42);
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
/* 42 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

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
/* 44 */
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
const queue_controller_1 = __webpack_require__(45);
const queue_clean_service_1 = __webpack_require__(35);
const sse_module_1 = __webpack_require__(48);
const queue_service_1 = __webpack_require__(43);
const queue_sse_service_1 = __webpack_require__(39);
const queue_subscriber_1 = __webpack_require__(49);
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
exports.QueueController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_decorator_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(31);
const roles_decorator_1 = __webpack_require__(33);
const queue_role_decorator_1 = __webpack_require__(46);
const queue_role_guard_1 = __webpack_require__(47);
const queue_sse_service_1 = __webpack_require__(39);
const queue_service_1 = __webpack_require__(43);
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
const sse_service_1 = __webpack_require__(41);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(39);
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
/* 50 */
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
const nestjs_command_1 = __webpack_require__(51);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(52);
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
/* 51 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

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
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(53);
const typeorm_1 = __webpack_require__(19);
const office_hour_entity_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const dist_1 = __webpack_require__(54);
__webpack_require__(55);
const moment = __webpack_require__(36);
const rrule_1 = __webpack_require__(56);
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
/* 53 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("rrule");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(5);
const desktop_notif_subscriber_1 = __webpack_require__(58);
const notification_controller_1 = __webpack_require__(63);
const notification_service_1 = __webpack_require__(59);
const twilio_service_1 = __webpack_require__(61);
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
exports.DesktopNotifSubscriber = void 0;
const typeorm_1 = __webpack_require__(19);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(59);
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
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const apm = __webpack_require__(42);
const webPush = __webpack_require__(60);
const user_entity_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(24);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(61);
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
/* 60 */
/***/ (function(module, exports) {

module.exports = require("web-push");

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
exports.TwilioService = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(62);
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
/* 62 */
/***/ (function(module, exports) {

module.exports = require("twilio");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(62);
const jwt_auth_guard_1 = __webpack_require__(31);
const user_decorator_1 = __webpack_require__(34);
const desktop_notif_entity_1 = __webpack_require__(24);
const notification_service_1 = __webpack_require__(59);
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
/* 64 */
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
const login_controller_1 = __webpack_require__(65);
const jwt_strategy_1 = __webpack_require__(71);
const jwt_1 = __webpack_require__(66);
const config_1 = __webpack_require__(9);
const login_course_service_1 = __webpack_require__(70);
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
exports.LoginController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(66);
const httpSignature = __webpack_require__(67);
const typeorm_1 = __webpack_require__(19);
const non_production_guard_1 = __webpack_require__(68);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(69);
const login_course_service_1 = __webpack_require__(70);
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
/* 66 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

/***/ }),
/* 68 */
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
/* 69 */
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
exports.LoginCourseService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(22);
const course_section_mapping_entity_1 = __webpack_require__(69);
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
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(72);
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
/* 72 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_controller_1 = __webpack_require__(74);
const notification_module_1 = __webpack_require__(57);
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
const notification_service_1 = __webpack_require__(59);
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
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(57);
const question_controller_1 = __webpack_require__(76);
const question_subscriber_1 = __webpack_require__(78);
const queue_module_1 = __webpack_require__(44);
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
exports.QuestionController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(31);
const notification_service_1 = __webpack_require__(59);
const roles_decorator_1 = __webpack_require__(33);
const user_course_entity_1 = __webpack_require__(22);
const user_decorator_1 = __webpack_require__(34);
const user_entity_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(26);
const question_role_guard_1 = __webpack_require__(77);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSubscriber = void 0;
const common_1 = __webpack_require__(14);
const queue_sse_service_1 = __webpack_require__(39);
const queue_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(19);
const notification_service_1 = __webpack_require__(59);
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
exports.SeedModule = void 0;
const common_1 = __webpack_require__(5);
const seed_controller_1 = __webpack_require__(80);
const seed_service_1 = __webpack_require__(83);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(19);
const factories_1 = __webpack_require__(81);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const non_production_guard_1 = __webpack_require__(68);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const seed_service_1 = __webpack_require__(83);
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(82);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(69);
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
/* 82 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

/***/ }),
/* 83 */
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
/* 84 */
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
const nestjs_admin_1 = __webpack_require__(85);
const credentialValidator_1 = __webpack_require__(86);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(87);
const admin_entities_1 = __webpack_require__(89);
const admin_command_1 = __webpack_require__(90);
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
/* 85 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(87);
const bcrypt_1 = __webpack_require__(88);
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
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(19);
const bcrypt_1 = __webpack_require__(88);
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
/* 88 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(85);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(23);
const course_section_mapping_entity_1 = __webpack_require__(69);
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
/* 90 */
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
const nestjs_command_1 = __webpack_require__(51);
const common_1 = __webpack_require__(5);
const admin_user_entity_1 = __webpack_require__(87);
const readline_sync_1 = __webpack_require__(91);
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
/* 91 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(93);
const admin_user_entity_1 = __webpack_require__(87);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const semester_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(69);
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
/* 93 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 94 */
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
const notification_module_1 = __webpack_require__(57);
const backfill_phone_notifs_command_1 = __webpack_require__(95);
const question_first_helped_at_command_1 = __webpack_require__(96);
const separate_first_last_names_command_1 = __webpack_require__(97);
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
/* 95 */
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
const nestjs_command_1 = __webpack_require__(51);
const phone_notif_entity_1 = __webpack_require__(25);
const twilio_service_1 = __webpack_require__(61);
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
exports.BackfillQuestionFirstHelpedAt = void 0;
const nestjs_command_1 = __webpack_require__(51);
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
exports.BackfillSeparateFirstLastNames = void 0;
const common_1 = __webpack_require__(5);
const nestjs_command_1 = __webpack_require__(51);
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
/* 98 */
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
const release_notes_controller_1 = __webpack_require__(99);
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(102);
const apm = __webpack_require__(42);
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
/* 102 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsYXN0aWMtYXBtLW5vZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWNvbW1hbmRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RyaXBVbmRlZmluZWQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBtLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7QUNsRkEsdUJBQWdDO0FBQ2hDLDJDQUF3QztBQUl4QyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7QUNMdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBLG1EOzs7Ozs7Ozs7O0FDQUEsc0NBQTJDO0FBQzNDLHdDQUFrRTtBQUNsRSw0Q0FBOEM7QUFDOUMsc0NBQWlDO0FBQ2pDLDRDQUF5QztBQUN6Qyx1REFBMkQ7QUFDM0QseUNBQXFDO0FBQ3JDLG1EQUFtRDtBQUc1QyxLQUFLLFVBQVUsU0FBUyxDQUFDLEdBQVE7SUFDdEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxrQkFBVyxDQUFDLE1BQU0sQ0FBQyxzQkFBUyxFQUFFO1FBQzlDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7S0FDckQsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksZ0NBQWMsRUFBRSxDQUFDLENBQUM7SUFFaEQsSUFBSSxlQUFNLEVBQUUsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUM3RDtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FDVCw2QkFBNkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLHlDQUF5QyxDQUN6RixDQUFDO0tBQ0g7SUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV2QixJQUFJLEdBQUcsRUFBRTtRQUNQLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBdEJELDhCQXNCQztBQUdELFNBQWdCLGVBQWUsQ0FBQyxHQUFxQjtJQUNuRCxHQUFHLENBQUMsY0FBYyxDQUNoQixJQUFJLHVCQUFjLENBQUM7UUFDakIsU0FBUyxFQUFFLElBQUk7UUFDZixvQkFBb0IsRUFBRSxJQUFJO1FBQzFCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FDSCxDQUFDO0lBQ0YsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLHdDQUFrQixFQUFFLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQVZELDBDQVVDOzs7Ozs7O0FDN0NELHlDOzs7Ozs7QUNBQSwyQzs7Ozs7O0FDQUEsMEM7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQXdDO0FBQ3hDLHdDQUE4QztBQUM5QywwQ0FBZ0Q7QUFDaEQsMkNBQWtEO0FBQ2xELGdEQUFzRDtBQUN0RCxzREFBd0U7QUFDeEUsK0NBQW1EO0FBQ25ELGlEQUF5RDtBQUN6RCxrREFBNEQ7QUFDNUQsK0NBQW1EO0FBQ25ELDhDQUFnRDtBQUNoRCwrQ0FBbUQ7QUFDbkQsaURBQStDO0FBQy9DLDZDQUE2QztBQUM3Qyw4Q0FBOEM7QUFDOUMsa0RBQTBEO0FBQzFELHVEQUF3RTtBQTJCeEUsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztDQUFHO0FBQVosU0FBUztJQXpCckIsZUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ1AsdUJBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3BDLHlCQUFjLENBQUMsT0FBTyxFQUFFO1lBQ3hCLDBCQUFXO1lBQ1gsOEJBQWE7WUFDYiw0QkFBWTtZQUNaLDBCQUFXO1lBQ1gsd0NBQWtCO1lBQ2xCLGdDQUFjO1lBQ2Qsd0JBQVU7WUFDVixxQkFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsV0FBVyxFQUFFO29CQUNYLE1BQU07b0JBQ04sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQ3ZFO2dCQUNELFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQztZQUNGLDBCQUFXO1lBQ1gsOEJBQWE7WUFDYixzQkFBUztZQUNULGdDQUFjO1lBQ2QseUNBQWtCO1NBQ25CO0tBQ0YsQ0FBQztHQUNXLFNBQVMsQ0FBRztBQUFaLDhCQUFTOzs7Ozs7O0FDM0N0QiwyQzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQXdDO0FBQ3hDLG9EQUF1RDtBQUN2RCwrQ0FBb0Q7QUFDcEQsK0NBQTZDO0FBQzdDLCtDQUE2QztBQU83QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUc7QUFBZixZQUFZO0lBTHhCLGVBQU0sQ0FBQztRQUNOLFdBQVcsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDdEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSwwQkFBVyxDQUFDO0tBQ3RDLENBQUM7R0FDVyxZQUFZLENBQUc7QUFBZixvQ0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYekIsd0NBU3dCO0FBQ3hCLHlDQUtxQjtBQUNyQix3Q0FBMEI7QUFDMUIsMENBQXFFO0FBQ3JFLHFEQUFtRTtBQUNuRSxpREFBdUQ7QUFDdkQsa0RBQW1EO0FBQ25ELGlEQUFpRDtBQUNqRCw4Q0FBbUQ7QUFDbkQsc0RBQTZFO0FBQzdFLCtDQUFtRDtBQUNuRCxxREFBd0Q7QUFDeEQsZ0RBQThDO0FBQzlDLHFEQUF1RDtBQUN2RCxvREFBNkQ7QUFDN0QsdUNBQWtDO0FBS2xDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQ1UsVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQztJQUlKLEtBQUssQ0FBQyxHQUFHLENBQWMsRUFBVTtRQUUvQixNQUFNLE1BQU0sR0FBRyxNQUFNLDJCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUMzQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBR0gsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLHVCQUFhLENBQUMsb0NBQWUsQ0FBQzthQUN0RCxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7YUFDeEIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDbkQsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUN6RCxVQUFVLEVBQUUsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sZUFBSyxDQUFDLE1BQU0sQ0FDaEMsTUFBTSxDQUFDLE1BQU0sRUFDYixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FDbkMsQ0FBQztRQUNGLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QixNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFJRCxLQUFLLENBQUMsT0FBTyxDQUNFLFFBQWdCLEVBQ2QsSUFBWSxFQUNuQixJQUFlO1FBRXZCLElBQUksS0FBSyxHQUFHLE1BQU0seUJBQVUsQ0FBQyxPQUFPLENBQ2xDO1lBQ0UsSUFBSTtZQUNKLFFBQVE7U0FDVCxFQUNELEVBQUUsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FDN0IsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsSUFBSTtnQkFDSixRQUFRO2dCQUNSLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxFQUFFO2dCQUNiLGNBQWMsRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixNQUFNLCtCQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3RCLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNoQixTQUFTLEVBQUUsOEJBQVMsQ0FBQyxhQUFhO1lBQ2xDLElBQUk7WUFDSixRQUFRO1NBQ1QsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVYsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBSUQsS0FBSyxDQUFDLFFBQVEsQ0FDQyxRQUFnQixFQUNkLElBQVksRUFDbkIsSUFBZTtRQUV2QixNQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFVLENBQUMsT0FBTyxDQUNwQztZQUNFLElBQUk7WUFDSixRQUFRO1NBQ1QsRUFDRCxFQUFFLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQzdCLENBQUM7UUFDRixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQyxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM5QjtRQUNELE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5CLE1BQU0sK0JBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdEIsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2hCLFNBQVMsRUFBRSw4QkFBUyxDQUFDLGNBQWM7WUFDbkMsSUFBSTtZQUNKLFFBQVE7U0FDVCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUc5QixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xELE1BQU0sY0FBYyxHQUFHLE1BQU0sb0NBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSx5QkFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQyxLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFFLEtBQUs7aUJBQ2pCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsa0JBQWtCLEdBQUcsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFNBQVMsQ0FBQztTQUNoRDtRQUNELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0NBQ0Y7QUFoSEM7SUFGQyxZQUFHLENBQUMsS0FBSyxDQUFDO0lBQ1YsdUJBQUssQ0FBQyxhQUFJLENBQUMsU0FBUyxFQUFFLGFBQUksQ0FBQyxPQUFPLEVBQUUsYUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNsQyx5QkFBSyxDQUFDLElBQUksQ0FBQzs7OzsyQ0F1QnJCO0FBSUQ7SUFGQyxhQUFJLENBQUMsdUJBQXVCLENBQUM7SUFDN0IsdUJBQUssQ0FBQyxhQUFJLENBQUMsU0FBUyxFQUFFLGFBQUksQ0FBQyxFQUFFLENBQUM7SUFFNUIseUJBQUssQ0FBQyxJQUFJLENBQUM7SUFDWCx5QkFBSyxDQUFDLE1BQU0sQ0FBQztJQUNiLGdDQUFJLEVBQUU7O3FEQUFPLHVCQUFTOzsrQ0FvQ3hCO0FBSUQ7SUFGQyxlQUFNLENBQUMsdUJBQXVCLENBQUM7SUFDL0IsdUJBQUssQ0FBQyxhQUFJLENBQUMsU0FBUyxFQUFFLGFBQUksQ0FBQyxFQUFFLENBQUM7SUFFNUIseUJBQUssQ0FBQyxJQUFJLENBQUM7SUFDWCx5QkFBSyxDQUFDLE1BQU0sQ0FBQztJQUNiLGdDQUFJLEVBQUU7O3FEQUFPLHVCQUFTOztnREFzQ3hCO0FBeEhVLGdCQUFnQjtJQUg1QixtQkFBVSxDQUFDLFNBQVMsQ0FBQztJQUNyQixrQkFBUyxDQUFDLDZCQUFZLEVBQUUscUNBQWdCLENBQUM7SUFDekMsd0JBQWUsQ0FBQyxtQ0FBMEIsQ0FBQztxQ0FHcEIsb0JBQVU7UUFDSCx1Q0FBaUI7UUFDbkIsbUNBQWU7R0FKL0IsZ0JBQWdCLENBeUg1QjtBQXpIWSw0Q0FBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEM3QixvREFBeUM7QUFDekMsa0RBU3lCO0FBQ3pCLHdCQUEwQjtBQUViLGdCQUFRLEdBQUcsK0JBQStCLENBQUM7QUFDM0MsY0FBTSxHQUFHLEdBQVksRUFBRTs7SUFDbEMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssZ0JBQVE7UUFDL0IsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksYUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFFBQVEsMENBQUUsTUFBTSxNQUFLLGdCQUFRLENBQUM7Q0FBQSxDQUFDO0FBaUIzRSxNQUFhLElBQUk7Q0FlaEI7QUFKQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7OzJDQUNNO0FBWHhDLG9CQWVDO0FBRUQsTUFBYSxtQkFBbUI7Q0FNL0I7QUFEQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDOzhCQUNMLElBQUk7c0RBQUM7QUFMbkIsa0RBTUM7QUFRRCxNQUFhLFdBQVc7Q0FLdkI7QUFMRCxrQ0FLQztBQXlCRCxJQUFZLElBSVg7QUFKRCxXQUFZLElBQUk7SUFDZCwyQkFBbUI7SUFDbkIsaUJBQVM7SUFDVCwrQkFBdUI7QUFDekIsQ0FBQyxFQUpXLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQUlmO0FBRUQsTUFBTSxpQkFBaUI7Q0FTdEI7QUFKQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDOzhCQUNMLElBQUk7b0RBQUM7QUFHakI7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzs4QkFDUCxJQUFJO2tEQUFDO0FBZ0NqQixNQUFhLFlBQVk7Q0FrQnhCO0FBYkM7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQzs7K0NBQ0U7QUFPMUI7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzs4QkFDTCxJQUFJOytDQUFDO0FBR2pCO0lBREMsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7OEJBQ1AsSUFBSTs2Q0FBQztBQWZqQixvQ0FrQkM7QUFnQkQsTUFBYSxRQUFRO0NBc0JwQjtBQWxCQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDOzhCQUNkLFdBQVc7eUNBQUM7QUFJdEI7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQzs4QkFDYixXQUFXOzBDQUFDO0FBR3ZCO0lBREMsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7OEJBQ0wsSUFBSTsyQ0FBQztBQUdqQjtJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDOzhCQUNOLElBQUk7MENBQUM7QUFHaEI7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzs4QkFDTixJQUFJOzBDQUFDO0FBakJsQiw0QkFzQkM7QUFHRCxJQUFZLFlBT1g7QUFQRCxXQUFZLFlBQVk7SUFDdEIsbUNBQW1CO0lBQ25CLCtDQUErQjtJQUMvQixtQ0FBbUI7SUFDbkIsMkJBQVc7SUFDWCwrQkFBZTtJQUNmLCtCQUFlO0FBQ2pCLENBQUMsRUFQVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU92QjtBQUVELElBQVksa0JBS1g7QUFMRCxXQUFZLGtCQUFrQjtJQUM1QiwyQ0FBcUI7SUFDckIsdUNBQWlCO0lBQ2pCLHlDQUFtQjtJQUNuQix1REFBaUM7QUFDbkMsQ0FBQyxFQUxXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSzdCO0FBS0QsSUFBWSxtQkFJWDtBQUpELFdBQVksbUJBQW1CO0lBQzdCLDRDQUFxQjtJQUNyQixnREFBeUI7SUFDekIsOENBQXVCO0FBQ3pCLENBQUMsRUFKVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUk5QjtBQUVELElBQVksb0JBS1g7QUFMRCxXQUFZLG9CQUFvQjtJQUM5Qiw2Q0FBcUI7SUFDckIsNkRBQXFDO0lBQ3JDLDZEQUFxQztJQUNyQyx1Q0FBZTtBQUNqQixDQUFDLEVBTFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFLL0I7QUFFWSxxQkFBYSxHQUFHO0lBQzNCLGtCQUFrQixDQUFDLFFBQVE7SUFDM0Isa0JBQWtCLENBQUMsTUFBTTtDQUMxQixDQUFDO0FBRVcsNkJBQXFCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1RCwyQkFBbUIsR0FBRztJQUNqQyxHQUFHLDZCQUFxQjtJQUN4QixHQUFHLHFCQUFhO0lBQ2hCLGtCQUFrQixDQUFDLE9BQU87SUFDMUIsbUJBQW1CLENBQUMsVUFBVTtJQUM5QixtQkFBbUIsQ0FBQyxRQUFRO0lBQzVCLG1CQUFtQixDQUFDLFNBQVM7Q0FDOUIsQ0FBQztBQUtXLDBCQUFrQixpREFDMUIsa0JBQWtCLEdBQ2xCLG9CQUFvQixHQUNwQixtQkFBbUIsRUFDdEI7QUFvQ0YsTUFBYSxrQkFBbUIsU0FBUSxJQUFJO0NBQUc7QUFBL0MsZ0RBQStDO0FBRS9DLE1BQWEsZ0JBQWdCO0NBd0I1QjtBQXRCQztJQURDLDBCQUFRLEVBQUU7OytDQUNJO0FBR2Y7SUFEQywwQkFBUSxFQUFFOztvREFDUztBQUdwQjtJQURDLDBCQUFRLEVBQUU7O21EQUNRO0FBR25CO0lBREMsdUJBQUssRUFBRTs7Z0RBQ1E7QUFJaEI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7bURBQ1E7QUFJbkI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMkJBQVMsRUFBRTs7aURBQ29CO0FBSWhDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDJCQUFTLEVBQUU7O29EQUNrQjtBQXZCaEMsNENBd0JDO0FBRUQsTUFBYSxtQkFBbUI7Q0FrQi9CO0FBaEJDO0lBREMsdUJBQUssRUFBRTs7Z0RBQ0s7QUFHYjtJQURDLDBCQUFRLEVBQUU7O21EQUNLO0FBR2hCO0lBREMsMkJBQVMsRUFBRTs7d0RBQ1U7QUFHdEI7SUFEQyx1QkFBSyxFQUFFOztvREFDUztBQUdqQjtJQURDLDBCQUFRLEVBQUU7O3FEQUNPO0FBR2xCO0lBREMsMEJBQVEsRUFBRTs7a0RBQ0k7QUFqQmpCLGtEQWtCQztBQUVELE1BQWEsY0FBYztDQU0xQjtBQUpDO0lBREMsMEJBQVEsRUFBRTs7OENBQ0s7QUFHaEI7SUFEQywwQkFBUSxFQUFFOztnREFDTztBQUxwQix3Q0FNQztBQU1ELE1BQWEsbUJBQW1CO0NBcUIvQjtBQWxCQztJQUZDLDJCQUFTLEVBQUU7SUFDWCw0QkFBVSxFQUFFOztpRUFDa0I7QUFJL0I7SUFGQywyQkFBUyxFQUFFO0lBQ1gsNEJBQVUsRUFBRTs7K0RBQ2dCO0FBSzdCO0lBSEMsNEJBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQ3ZDLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzt3REFDUTtBQUlyQjtJQUZDLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOztzREFDTTtBQUluQjtJQUZDLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOztxREFDSztBQXBCcEIsa0RBcUJDO0FBRUQsTUFBYSxpQkFBaUI7Q0FTN0I7QUFKQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7OEJBQ2hCLEtBQUs7c0RBQW9CO0FBR3ZDO0lBREMsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7O2lEQUNEO0FBUjFCLDhDQVNDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxZQUFZO0NBQUc7QUFBckQsNENBQXFEO0FBRXJELE1BQWEsdUJBQXdCLFNBQVEsS0FBbUI7Q0FBRztBQUFuRSwwREFBbUU7QUFFbkUsTUFBYSxxQkFBcUI7Q0FZakM7QUFWQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDOzhCQUNOLFFBQVE7MkRBQUM7QUFHeEI7SUFEQyx3QkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFDRSxLQUFLO21FQUFXO0FBR3ZDO0lBREMsd0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBQ2IsS0FBSztvREFBVztBQUd4QjtJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDOzhCQUNMLEtBQUs7NERBQVc7QUFYbEMsc0RBWUM7QUFFRCxNQUFhLG1CQUFvQixTQUFRLFFBQVE7Q0FBRztBQUFwRCxrREFBb0Q7QUFFcEQsTUFBYSxvQkFBb0I7Q0FxQmhDO0FBbkJDO0lBREMsMEJBQVEsRUFBRTs7a0RBQ0c7QUFJZDtJQUZDLHdCQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3BCLDRCQUFVLEVBQUU7OzBEQUNlO0FBRzVCO0lBREMsdUJBQUssRUFBRTs7cURBQ1M7QUFJakI7SUFGQywyQkFBUyxFQUFFO0lBQ1gsNEJBQVUsRUFBRTs7c0RBQ007QUFJbkI7SUFGQywwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7c0RBQ0s7QUFHbEI7SUFEQywyQkFBUyxFQUFFOzttREFDSTtBQXBCbEIsb0RBcUJDO0FBQ0QsTUFBYSxzQkFBdUIsU0FBUSxRQUFRO0NBQUc7QUFBdkQsd0RBQXVEO0FBRXZELE1BQWEsb0JBQW9CO0NBd0JoQztBQXJCQztJQUZDLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOztrREFDQztBQUlkO0lBRkMsd0JBQU0sQ0FBQyxZQUFZLENBQUM7SUFDcEIsNEJBQVUsRUFBRTs7MERBQ2U7QUFJNUI7SUFGQyx1QkFBSyxFQUFFO0lBQ1AsNEJBQVUsRUFBRTs7cURBQ0k7QUFJakI7SUFGQyx3QkFBTSxDQUFDLDBCQUFrQixDQUFDO0lBQzFCLDRCQUFVLEVBQUU7O29EQUNXO0FBSXhCO0lBRkMsMkJBQVMsRUFBRTtJQUNYLDRCQUFVLEVBQUU7O3NEQUNNO0FBSW5CO0lBRkMsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7O3NEQUNLO0FBdkJwQixvREF3QkM7QUFDRCxNQUFhLHNCQUF1QixTQUFRLFFBQVE7Q0FBRztBQUF2RCx3REFBdUQ7QUFPdkQsTUFBYSxrQkFBa0I7Q0FPOUI7QUFEQztJQURDLHdCQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDOzhCQUNJLElBQUk7OERBQUM7QUFONUIsZ0RBT0M7QUFFRCxNQUFhLGlCQUFpQjtDQU83QjtBQUpDO0lBRkMsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7O2dEQUNFO0FBR2Y7SUFEQywyQkFBUyxFQUFFOzt5REFDYTtBQU4zQiw4Q0FPQztBQUVELE1BQWEsZ0JBQWdCO0NBRzVCO0FBSEQsNENBR0M7QUE2Qlksc0JBQWMsR0FBRztJQUM1QixrQkFBa0IsRUFBRTtRQUNsQixjQUFjLEVBQUU7WUFDZCxZQUFZLEVBQUUsNEJBQTRCO1lBQzFDLGNBQWMsRUFBRSxrQ0FBa0M7WUFDbEQsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixrQkFBa0IsRUFBRSxvREFBb0Q7U0FDekU7UUFDRCxjQUFjLEVBQUU7WUFDZCxZQUFZLEVBQUUsQ0FDWixJQUFZLEVBQ1osY0FBc0IsRUFDdEIsVUFBa0IsRUFDVixFQUFFLENBQ1YsR0FBRyxJQUFJLDhCQUE4QixjQUFjLE9BQU8sVUFBVSxFQUFFO1lBQ3hFLHdCQUF3QixFQUFFLDZDQUE2QztZQUN2RSxjQUFjLEVBQUUsb0RBQW9EO1lBQ3BFLGVBQWUsRUFBRSwrQ0FBK0M7WUFDaEUsY0FBYyxFQUFFLG9DQUFvQztZQUNwRCxpQkFBaUIsRUFBRSwwQ0FBMEM7U0FDOUQ7S0FDRjtJQUNELGVBQWUsRUFBRTtRQUNmLHFCQUFxQixFQUFFLDJCQUEyQjtLQUNuRDtJQUNELHNCQUFzQixFQUFFO1FBQ3RCLG9CQUFvQixFQUFFLHlCQUF5QjtLQUNoRDtJQUNELG1CQUFtQixFQUFFO1FBQ25CLGFBQWEsRUFBRSxzQkFBc0I7S0FDdEM7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixnQkFBZ0IsRUFBRSxvQkFBb0I7UUFDdEMsdUJBQXVCLEVBQUUsK0JBQStCO1FBQ3hELGlCQUFpQixFQUFFLDRCQUE0QjtLQUNoRDtJQUNELGNBQWMsRUFBRTtRQUNkLGFBQWEsRUFBRSxpQkFBaUI7S0FDakM7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixnQkFBZ0IsRUFBRSxDQUFDLENBQU0sRUFBVSxFQUFFLENBQ25DLG9DQUFvQyxHQUFHLENBQUM7S0FDM0M7SUFDRCxTQUFTLEVBQUU7UUFDVCxXQUFXLEVBQUUsbUJBQW1CO1FBQ2hDLGVBQWUsRUFBRSxtQkFBbUI7UUFDcEMsV0FBVyxFQUFFLG9CQUFvQjtRQUNqQyxzQkFBc0IsRUFBRSxDQUFDLEtBQWUsRUFBVSxFQUFFLENBQ2xELCtCQUErQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUI7S0FDM0U7Q0FDRixDQUFDOzs7Ozs7O0FDaGpCRiw4Qzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxvREFBNEM7QUFDNUMsMENBT2lCO0FBQ2pCLGdEQUFzRDtBQUN0RCw4Q0FBMEM7QUFLMUMsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLDBDQUE2QjtJQUM3Qiw0Q0FBK0I7QUFDakMsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBR0QsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLG9CQUFVO0NBeUJ6QztBQXZCQztJQURDLGdDQUFzQixFQUFFOztzQ0FDZDtBQUdYO0lBREMsZ0JBQU0sRUFBRTs4QkFDSCxJQUFJO3dDQUFDO0FBR1g7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzZDQUNyQjtBQUlyQjtJQUZDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHVCQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckQsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs4QkFDekIsdUJBQVM7d0NBQUM7QUFJaEI7SUFGQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzFCLDJCQUFPLEVBQUU7OzBDQUNLO0FBSWY7SUFGQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywyQkFBVyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzNELG9CQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7OEJBQ3pCLDJCQUFXOzBDQUFDO0FBSXBCO0lBRkMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMxQiwyQkFBTyxFQUFFOzs0Q0FDTztBQXhCTixVQUFVO0lBRHRCLGdCQUFNLENBQUMsYUFBYSxDQUFDO0dBQ1QsVUFBVSxDQXlCdEI7QUF6QlksZ0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJ2QixvREFBNEM7QUFDNUMsMENBUWlCO0FBQ2pCLHFEQUEyRDtBQUMzRCxxREFBZ0U7QUFDaEUsK0NBQW1EO0FBQ25ELHFEQUF1RDtBQUN2RCxrREFBa0Q7QUFpQmxELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxvQkFBVTtDQXFDMUM7QUFuQ0M7SUFEQyxnQ0FBc0IsRUFBRTs7dUNBQ2Q7QUFHWDtJQURDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLG9DQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7O2dEQUN6QjtBQUcvQjtJQURDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHlCQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7OzJDQUM1QjtBQUdyQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzt5Q0FDRjtBQUliO0lBRkMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDbEMsMkJBQU8sRUFBRTs7NENBQ007QUFJaEI7SUFGQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxvQ0FBZSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3pELDJCQUFPLEVBQUU7OEJBQ0csb0NBQWU7Z0RBQUM7QUFLN0I7SUFIQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywrQkFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ2xFLG9CQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDbEMsMkJBQU8sRUFBRTs4QkFDQSwrQkFBYTs2Q0FBQztBQUt4QjtJQUhDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsMkJBQU8sRUFBRTs7K0NBRVM7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ3JCO0FBSWpCO0lBRkMsbUJBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsK0JBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4RCwyQkFBTyxFQUFFOzsyQ0FDVztBQXBDVixXQUFXO0lBRHZCLGdCQUFNLENBQUMsY0FBYyxDQUFDO0dBQ1YsV0FBVyxDQXFDdkI7QUFyQ1ksa0NBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0J4Qix5Q0FBbUM7QUFDbkMsMENBT2lCO0FBQ2pCLGdEQUFzRDtBQUN0RCw4Q0FBMEM7QUFHMUMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxvQkFBVTtDQW9COUM7QUFsQkM7SUFEQyxnQ0FBc0IsRUFBRTs7MkNBQ2Q7QUFJWDtJQUZDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHVCQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEQsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs4QkFDekIsdUJBQVM7NkNBQUM7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDWjtBQUlmO0lBRkMsbUJBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsMkJBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNoRSxvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzhCQUN6QiwyQkFBVzsrQ0FBQztBQUdwQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUNWO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQUksRUFBRSxPQUFPLEVBQUUsYUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs2Q0FDakQ7QUFuQkEsZUFBZTtJQUQzQixnQkFBTSxDQUFDLG1CQUFtQixDQUFDO0dBQ2YsZUFBZSxDQW9CM0I7QUFwQlksMENBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYjVCLG9EQUE0QztBQUM1QywwQ0FRaUI7QUFDakIsdURBQXlFO0FBQ3pFLHFEQUFxRTtBQUNyRSwrQ0FBbUQ7QUFDbkQscURBQWtEO0FBQ2xELHFEQUF1RDtBQUd2RCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsb0JBQVU7Q0E4Q3hDO0FBNUNDO0lBREMsZ0NBQXNCLEVBQUU7O3FDQUNkO0FBR1g7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7d0NBQ0Q7QUFHZDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzt1Q0FDRjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUNqQjtBQUdsQjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsyQ0FDbEI7QUFHakI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7MkNBQ0U7QUFJakI7SUFGQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxvQ0FBZSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3ZELDJCQUFPLEVBQUU7OzBDQUNpQjtBQUkzQjtJQUZDLGdCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUMzQywyQkFBTyxFQUFFOzt1REFDb0I7QUFJOUI7SUFGQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDM0MsMkJBQU8sRUFBRTs7cURBQ2tCO0FBSTVCO0lBRkMsbUJBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsd0NBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0QsMkJBQU8sRUFBRTs7Z0RBQ3lCO0FBSW5DO0lBRkMsa0JBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsb0NBQWUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUMxRCwyQkFBTyxFQUFFOzhCQUNFLG9DQUFlOzZDQUFDO0FBSTVCO0lBRkMsMkJBQU8sRUFBRTtJQUNULG9CQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHlCQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7O3lDQUN4QztBQUlyQjtJQUZDLDJCQUFPLEVBQUU7SUFDVCxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywrQkFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzt5Q0FDbEM7QUE3Q1YsU0FBUztJQURyQixnQkFBTSxDQUFDLFlBQVksQ0FBQztHQUNSLFNBQVMsQ0E4Q3JCO0FBOUNZLDhCQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCdEIsMENBUWlCO0FBQ2pCLDhDQUFtRDtBQUduRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLG9CQUFVO0NBNEJoRDtBQTFCQztJQURDLGdDQUFzQixFQUFFOzs2Q0FDZDtBQUdYO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O21EQUNFO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDWCxJQUFJO3lEQUFDO0FBR3JCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O2lEQUNBO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7K0NBQ0Y7QUFJYjtJQUZDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHVCQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUQsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs4QkFDekIsdUJBQVM7K0NBQUM7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDWjtBQUdmO0lBREMsMEJBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7OEJBQzdCLElBQUk7b0RBQUM7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUM1QjtBQTNCRixpQkFBaUI7SUFEN0IsZ0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQztHQUNqQixpQkFBaUIsQ0E0QjdCO0FBNUJZLDhDQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaOUIsMENBT2lCO0FBQ2pCLDhDQUFtRDtBQUduRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLG9CQUFVO0NBZ0I5QztBQWRDO0lBREMsZ0NBQXNCLEVBQUU7OzJDQUNkO0FBR1g7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7b0RBQ0s7QUFJcEI7SUFGQyxrQkFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyx1QkFBUyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hELG9CQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OEJBQ3pCLHVCQUFTOzZDQUFDO0FBR2hCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ1o7QUFHZjtJQURDLGdCQUFNLEVBQUU7O2lEQUNTO0FBZlAsZUFBZTtJQUQzQixnQkFBTSxDQUFDLG1CQUFtQixDQUFDO0dBQ2YsZUFBZSxDQWdCM0I7QUFoQlksMENBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVjVCLG9EQUE0QztBQUM1QywwQ0FZaUI7QUFDakIsZ0RBQXNEO0FBQ3RELHFEQUErRDtBQUMvRCw4Q0FBbUQ7QUFDbkQsa0RBQTREO0FBUTVELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxvQkFBVTtJQXVDeEMsS0FBSyxDQUFDLFdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDckIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ3pELENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQ3pELENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFJRCxLQUFLLENBQUMsWUFBWTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sK0JBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFFLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYTtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXZCLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2hELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRSxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFFNUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztZQUM5RCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzVELE9BQU8sVUFBVSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxVQUFVLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUdPLEtBQUssQ0FBQyxjQUFjO1FBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMvQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRW5DLE9BQU8sTUFBTSxvQ0FBZSxDQUFDLElBQUksQ0FBQztZQUNoQyxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUNoQixTQUFTLEVBQUUseUJBQWUsQ0FBQyxVQUFVLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSx5QkFBZSxDQUFDLFVBQVUsQ0FBQztpQkFDckM7YUFDRjtZQUNELEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywyQkFBMkIsQ0FDakMsV0FBOEI7UUFFOUIsTUFBTSxhQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUN6QyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDakMsSUFDRSxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUN0RTtnQkFDQSxhQUFhLENBQUMsSUFBSSxDQUFDO29CQUNqQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7b0JBQy9CLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztpQkFDNUIsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDUjtZQUVELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELFNBQVMsQ0FBQyxPQUFPO2dCQUNmLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU87b0JBQ3BDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTztvQkFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0NBR0Y7QUFuSUM7SUFEQyxnQ0FBc0IsRUFBRTs7c0NBQ2Q7QUFJWDtJQUZDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLDJCQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDM0Qsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzs4QkFDekIsMkJBQVc7MENBQUM7QUFJcEI7SUFGQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzFCLDJCQUFPLEVBQUU7OzRDQUNPO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3dDQUNGO0FBSWI7SUFGQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywrQkFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ3BELDJCQUFPLEVBQUU7OzZDQUNpQjtBQUczQjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt5Q0FDckI7QUFJZDtJQUZDLG9CQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHVCQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEQsbUJBQVMsRUFBRTs7NkNBQ1c7QUFHdkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOztrREFDSDtBQUt4QjtJQUhDLDJCQUFPLEVBQUU7SUFDVCxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxvQ0FBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ3RELG1CQUFTLEVBQUU7OytDQUNtQjtBQWhDcEIsVUFBVTtJQUR0QixnQkFBTSxDQUFDLGFBQWEsQ0FBQztHQUNULFVBQVUsQ0FxSXRCO0FBcklZLGdDQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCdkIsMENBUWlCO0FBQ2pCLGdEQUE4QztBQUM5QyxvREFBb0Q7QUFDcEQsK0NBQW1EO0FBR25ELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsb0JBQVU7SUFrQzdDLElBQUksSUFBSTs7UUFDTixhQUFPLElBQUksQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFuQ0M7SUFEQyxnQ0FBc0IsRUFBRTs7MkNBQ2Q7QUFLWDtJQUhDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLDJCQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDaEUsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNoQywyQkFBTyxFQUFFOzhCQUNGLDJCQUFXOytDQUFDO0FBSXBCO0lBRkMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMxQiwyQkFBTyxFQUFFOztpREFDTztBQU9qQjtJQUxDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHlCQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7UUFDN0QsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDO0lBQ0Qsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMvQiwyQkFBTyxFQUFFOzhCQUNILHlCQUFVOzhDQUFDO0FBSWxCO0lBRkMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMxQiwyQkFBTyxFQUFFOztnREFDTTtBQUdoQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzs4Q0FDRDtBQUdkO0lBREMsZ0JBQU0sRUFBRTs4QkFDRSxJQUFJO2tEQUFDO0FBR2hCO0lBREMsZ0JBQU0sRUFBRTs4QkFDQSxJQUFJO2dEQUFDO0FBR2Q7SUFEQywwQkFBTSxFQUFFOzs7MkNBR1I7QUFwQ1UsZUFBZTtJQUQzQixnQkFBTSxDQUFDLGFBQWEsQ0FBQztHQUNULGVBQWUsQ0FxQzNCO0FBckNZLDBDQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkNUIseUNBQWdGO0FBQ2hGLG9EQUE0QztBQUM1QywwQ0FRaUI7QUFDakIsOENBQW1EO0FBQ25ELCtDQUFtRDtBQUNuRCwrQ0FBeUQ7QUFHekQsSUFBYSxhQUFhLHFCQUExQixNQUFhLGFBQWMsU0FBUSxvQkFBVTtJQWlFcEMsWUFBWSxDQUFDLFNBQXlCLEVBQUUsSUFBVTtRQUN2RCxJQUFJLHNDQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBS0QsTUFBTSxDQUFDLGlCQUFpQixDQUN0QixPQUFlLEVBQ2YsUUFBMEI7UUFFMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2pELFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRTtZQUM3QyxRQUFRO1NBQ1QsQ0FBQzthQUNELE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBS0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFlO1FBQ25DLE9BQU8sZUFBYSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxzQkFBYSxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGO0FBN0ZDO0lBREMsZ0NBQXNCLEVBQUU7O3lDQUNkO0FBS1g7SUFIQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyx5QkFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ25ELG9CQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDL0IsMkJBQU8sRUFBRTs4QkFDSCx5QkFBVTs0Q0FBQztBQUlsQjtJQUZDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsMkJBQU8sRUFBRTs7OENBQ007QUFHaEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7MkNBQ0Y7QUFJYjtJQUZDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLHVCQUFTLENBQUM7SUFDOUIsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs4QkFDekIsdUJBQVM7OENBQUM7QUFJbkI7SUFGQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzFCLDJCQUFPLEVBQUU7O2dEQUNRO0FBSWxCO0lBRkMsbUJBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsdUJBQVMsQ0FBQztJQUM5QixvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzhCQUN6Qix1QkFBUzsrQ0FBQztBQUlwQjtJQUZDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsMkJBQU8sRUFBRTs7aURBQ1M7QUFHbkI7SUFEQyxnQkFBTSxFQUFFOzhCQUNFLElBQUk7Z0RBQUM7QUFLaEI7SUFGQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzFCLDJCQUFPLEVBQUU7OEJBQ0ssSUFBSTtvREFBQztBQUlwQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2pCLElBQUk7K0NBQUM7QUFJZjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2pCLElBQUk7K0NBQUM7QUFHZjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDUjtBQUczQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzs2Q0FDUTtBQUd2QjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUNWO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ1Q7QUExRFAsYUFBYTtJQUR6QixnQkFBTSxDQUFDLGdCQUFnQixDQUFDO0dBQ1osYUFBYSxDQStGekI7QUEvRlksc0NBQWE7Ozs7Ozs7Ozs7O0FDaEIxQix5Q0FNcUI7QUFPckIsTUFBTSxpQkFBaUIsR0FBeUI7SUFDOUMsRUFBRSxFQUFFLENBQUMsMkJBQWtCLENBQUMsT0FBTyxFQUFFLDRCQUFtQixDQUFDLFNBQVMsQ0FBQztJQUMvRCxPQUFPLEVBQUU7UUFDUCw2QkFBb0IsQ0FBQyxnQkFBZ0I7UUFDckMsNkJBQW9CLENBQUMsZ0JBQWdCO0tBQ3RDO0NBQ0YsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFpRDtJQUNwRSxDQUFDLDJCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sRUFBRTtZQUNQLDJCQUFrQixDQUFDLE1BQU07WUFDekIsNkJBQW9CLENBQUMsZ0JBQWdCO1lBQ3JDLDZCQUFvQixDQUFDLGdCQUFnQjtTQUN0QztLQUNGO0lBQ0QsQ0FBQywyQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxpQkFBaUI7SUFDOUMsQ0FBQywyQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxpQkFBaUI7SUFDdEQsQ0FBQywyQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QixFQUFFLEVBQUU7WUFDRiw0QkFBbUIsQ0FBQyxRQUFRO1lBQzVCLDRCQUFtQixDQUFDLFVBQVU7WUFDOUIsNkJBQW9CLENBQUMsUUFBUTtZQUM3Qiw0QkFBbUIsQ0FBQyxTQUFTO1NBQzlCO1FBQ0QsT0FBTyxFQUFFLENBQUMsNkJBQW9CLENBQUMsZ0JBQWdCLENBQUM7S0FDakQ7SUFDRCxDQUFDLDRCQUFtQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sRUFBRTtZQUNQLDJCQUFrQixDQUFDLGNBQWM7WUFDakMsNkJBQW9CLENBQUMsZ0JBQWdCO1lBQ3JDLDZCQUFvQixDQUFDLGdCQUFnQjtTQUN0QztLQUNGO0lBQ0QsQ0FBQyw0QkFBbUIsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNoQyxPQUFPLEVBQUU7WUFDUCwyQkFBa0IsQ0FBQyxjQUFjO1lBQ2pDLDZCQUFvQixDQUFDLGdCQUFnQjtZQUNyQyw2QkFBb0IsQ0FBQyxnQkFBZ0I7U0FDdEM7S0FDRjtJQUNELENBQUMsNEJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDL0IsT0FBTyxFQUFFLENBQUMsNkJBQW9CLENBQUMsZ0JBQWdCLENBQUM7S0FDakQ7SUFDRCxDQUFDLDZCQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7SUFDbkMsQ0FBQyw2QkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUU7SUFDM0MsQ0FBQyw2QkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUU7SUFDM0MsQ0FBQyw2QkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO0NBQ2pDLENBQUM7QUFFRixTQUFnQix1QkFBdUIsQ0FDckMsU0FBeUIsRUFDekIsVUFBMEIsRUFDMUIsSUFBVTs7SUFFVixPQUFPLENBQ0wsU0FBUyxLQUFLLFVBQVUsV0FDeEIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQ0FBRSxRQUFRLENBQUMsVUFBVSxFQUFDLENBQ3ZELENBQUM7QUFDSixDQUFDO0FBVEQsMERBU0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVELDBDQU1pQjtBQUVqQixnREFBOEM7QUFHOUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLG9CQUFVO0NBWTVDO0FBVkM7SUFEQyxnQ0FBc0IsRUFBRTs7eUNBQ2Q7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzs2Q0FDQTtBQUdmO0lBREMsZ0JBQU0sRUFBRTs7MkNBQ0k7QUFHYjtJQURDLG1CQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLDJCQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7OzhDQUN2QztBQVhaLGFBQWE7SUFEekIsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQztHQUNaLGFBQWEsQ0FZekI7QUFaWSxzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYMUIsd0NBQTRDO0FBQzVDLDJDQUE2QztBQUc3QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsb0JBQVMsQ0FBQyxLQUFLLENBQUM7Q0FBRztBQUF4QyxZQUFZO0lBRHhCLG1CQUFVLEVBQUU7R0FDQSxZQUFZLENBQTRCO0FBQXhDLG9DQUFZOzs7Ozs7O0FDSnpCLDZDOzs7Ozs7Ozs7O0FDQUEsd0NBQThEO0FBRWpELGFBQUssR0FBRyxDQUFDLEdBQUcsS0FBZSxFQUEyQixFQUFFLENBQ25FLG9CQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ0g5Qix3Q0FBd0U7QUFDeEUsOENBQTBDO0FBRTdCLFlBQUksR0FBRyw2QkFBb0IsQ0FDdEMsS0FBSyxFQUFFLFNBQW1CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ25ELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxPQUFPLE1BQU0sdUJBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FDRixDQUFDO0FBRVcsY0FBTSxHQUFHLDZCQUFvQixDQUN4QyxDQUFDLElBQWEsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDdkMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkYseUNBQXVFO0FBQ3ZFLHdDQUE0QztBQUM1QywyQ0FBd0Q7QUFDeEQscURBQTREO0FBQzVELHVDQUFrQztBQUNsQywwQ0FBdUU7QUFDdkUsa0RBQStEO0FBQy9ELCtDQUE2QztBQU03QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUM1QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUd0QyxLQUFLLENBQUMsY0FBYztRQUMxQixNQUFNLHVCQUF1QixHQUFpQixNQUFNLHlCQUFVLENBQUMsYUFBYSxFQUFFO2FBQzNFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQzthQUMzQixpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUM7YUFDdEQsS0FBSyxDQUFDLGlDQUFpQyxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLDJCQUFrQixDQUFDO1NBQzFDLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztRQUViLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZix1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ2xFLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlLEVBQUUsS0FBZTtRQUN0RCxNQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM5QyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDekMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDakIsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFJTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBaUI7UUFDN0MsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFFaEMsTUFBTSxtQkFBbUIsR0FDdkIsQ0FBQyxNQUFNLCtCQUFhLENBQUMsaUJBQWlCLENBQ3BDLEtBQUssQ0FBQyxFQUFFLEVBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBa0IsQ0FBQyxDQUNsQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksbUJBQW1CLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xELE1BQU0saUJBQWlCLEdBQ3JCLENBQUMsTUFBTSxvQ0FBZSxDQUFDLEtBQUssQ0FBQztvQkFDM0IsS0FBSyxFQUFFO3dCQUNMLFNBQVMsRUFBRSx5QkFBZSxDQUFDLElBQUksQ0FBQzt3QkFDaEMsT0FBTyxFQUFFLHlCQUFlLENBQUMsSUFBSSxDQUFDO3FCQUMvQjtpQkFDRixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUN0QixPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQWU7UUFDdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSwrQkFBYSxDQUFDLGlCQUFpQixDQUNyRCxPQUFPLEVBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBa0IsQ0FBQyxDQUNsQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ1osTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FDcEMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksMkJBQWtCLENBQ3RDLENBQUM7UUFFRixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQ3pDLENBQUMsQ0FBQyxNQUFNLEdBQUcsNkJBQW9CLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sK0JBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBckVDO0lBREMsZUFBSSxDQUFDLHlCQUFjLENBQUMscUJBQXFCLENBQUM7Ozs7dURBYTFDO0FBaEJVLGlCQUFpQjtJQUQ3QixtQkFBVSxFQUFFO3FDQUVxQixvQkFBVTtHQUQvQixpQkFBaUIsQ0F5RTdCO0FBekVZLDhDQUFpQjs7Ozs7OztBQ2I5QixtQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLHdDQUFtRTtBQUNuRSw4Q0FBbUQ7QUFDbkQsNkNBQWtEO0FBR2xELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQVU7SUFFOUMsS0FBSyxDQUFDLFNBQVMsQ0FDYixPQUFZO1FBRVosTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN4RCxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFaWSxnQkFBZ0I7SUFENUIsbUJBQVUsRUFBRTtHQUNBLGdCQUFnQixDQVk1QjtBQVpZLDRDQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMN0IseUNBQTZDO0FBQzdDLHdDQU13QjtBQUN4QixzQ0FBeUM7QUFZekMsSUFBc0IsVUFBVSxHQUFoQyxNQUFzQixVQUFVO0lBQzlCLFlBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBRyxDQUFDO0lBRTVDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBeUI7UUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVcsT0FBTyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksOEJBQXFCLENBQUMsdUJBQWMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLDBCQUFpQixDQUFDLHVCQUFjLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFlLEVBQUUsSUFBZSxFQUFFLFFBQWdCO1FBQzNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksMEJBQWlCLENBQUMsdUJBQWMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkU7UUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDekIsTUFBTSxJQUFJLDhCQUFxQixDQUM3Qix1QkFBYyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FDdkQsQ0FBQztTQUNIO1FBRUQsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUEzQ3FCLFVBQVU7SUFEL0IsbUJBQVUsRUFBRTtxQ0FFb0IsZ0JBQVM7R0FEcEIsVUFBVSxDQTJDL0I7QUEzQ3FCLGdDQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CaEMsd0NBQTRDO0FBRTVDLHlDQUFrQztBQUNsQyw4Q0FBNkM7QUFDN0MsZ0RBQStDO0FBSS9DLE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDO0FBS3JELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDVSxZQUEwQixFQUMxQixVQUEyQztRQUQzQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFpQztRQVlyRCxvQkFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3RELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEUsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwRCxTQUFTLEVBQUUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUNyRCxPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixJQUFJLENBQ0w7aUJBQ0YsQ0FBQyxDQUFDLENBQUM7YUFDTDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0JBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUNsRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUE5QkEsQ0FBQztJQUVKLGVBQWUsQ0FDYixPQUFlLEVBQ2YsR0FBYSxFQUNiLFFBQTZCO1FBRTdCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUF3Qk8sS0FBSyxDQUFDLFVBQVUsQ0FDdEIsT0FBZSxFQUNmLElBQWtFO1FBRWxFLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxjQUFjLENBQUMsY0FBa0Q7UUFDdkUsT0FBTyxpQkFBUSxDQUNiLEtBQUssRUFBRSxPQUFlLEVBQUUsRUFBRTtZQUN4QixJQUFJO2dCQUNGLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUNoQixDQUFDLEVBQ0QsSUFBSSxFQUNKO1lBQ0UsT0FBTyxFQUFFLEtBQUs7WUFDZCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXpEWSxlQUFlO0lBRDNCLG1CQUFVLEVBQUU7cUNBR2EsNEJBQVk7UUFDZCx3QkFBVTtHQUhyQixlQUFlLENBeUQzQjtBQXpEWSwwQ0FBZTs7Ozs7OztBQ2Q1QixtQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLHdDQUE0QztBQUM1QyxvREFBOEM7QUFDOUMsb0NBQXdDO0FBY3hDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFBdkI7UUFDVSxZQUFPLEdBQTZCLEVBQUUsQ0FBQztJQW9DakQsQ0FBQztJQWpDQyxlQUFlLENBQUMsSUFBWSxFQUFFLE1BQWlCO1FBRTdDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdELEtBQUssQ0FBQyxTQUFTLENBQ2IsSUFBWSxFQUNaLE9BQW9DO1FBRXBDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrQkFBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLGVBQWUsSUFBSSxFQUFFLENBQ2pFLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbkMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEtBQUssTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsRCxNQUFNLE1BQU0sR0FBRyxTQUFTLDZCQUFTLENBQUMsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNqRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7Q0FDRjtBQXJDWSxVQUFVO0lBRHRCLG1CQUFVLEVBQUU7R0FDQSxVQUFVLENBcUN0QjtBQXJDWSxnQ0FBVTs7Ozs7OztBQ2hCdkIsNkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSx5Q0FRcUI7QUFDckIsd0NBQStEO0FBQy9ELG9EQUErRDtBQUMvRCx5Q0FBOEI7QUFDOUIsa0RBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywrQ0FBNEM7QUFPNUMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUU5QyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWU7UUFDNUIsTUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDOUMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBZTtRQUdoQyxNQUFNLFNBQVMsR0FBRyxNQUFNLHlCQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUU7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE1BQU0sSUFBSSwwQkFBaUIsRUFBRSxDQUFDO1NBQy9CO1FBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSwrQkFBYSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUNyRSxHQUFHLDhCQUFxQjtZQUN4QixHQUFHLHNCQUFhO1lBQ2hCLDJCQUFrQixDQUFDLE9BQU87U0FDM0IsQ0FBQzthQUNDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQzthQUNoRCxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUM7YUFDbEQsT0FBTyxFQUFFLENBQUM7UUFFYixNQUFNLFNBQVMsR0FBRyxJQUFJLDhCQUFxQixFQUFFLENBQUM7UUFFOUMsU0FBUyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDcEQsc0JBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQTRCLENBQUMsQ0FDOUQsQ0FBQztRQUVGLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUNyRCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSywyQkFBa0IsQ0FBQyxPQUFPLENBQzdELENBQUM7UUFFRixTQUFTLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUM1RCw4QkFBcUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQTRCLENBQUMsQ0FDdEUsQ0FBQztRQUVGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFHRCxLQUFLLENBQUMsb0JBQW9CLENBQ3hCLE9BQWUsRUFDZixTQUFnQyxFQUNoQyxNQUFjLEVBQ2QsSUFBVTtRQUVWLElBQUksSUFBSSxLQUFLLGFBQUksQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSw4QkFBcUIsRUFBRSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxPQUFPLEdBQ1gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssTUFBTTtvQkFDNUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPO29CQUNsQixDQUFDLENBQUMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxPQUFPLGdDQUFZLENBQ2pCLCtCQUFhLENBQUMsTUFBTSxpQ0FBTSxRQUFRLEtBQUUsT0FBTyxJQUFHLENBQy9DLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSwrQkFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDaEQsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQkFDbEMsS0FBSyxFQUFFO29CQUNMLFNBQVMsRUFBRSxNQUFNO29CQUNqQixPQUFPLEVBQUUsT0FBTztvQkFDaEIsTUFBTSxFQUFFLFlBQUUsQ0FBQyw0QkFBbUIsQ0FBQztpQkFDaEM7YUFDRixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUUxQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBdkZZLFlBQVk7SUFEeEIsbUJBQVUsRUFBRTtxQ0FFcUIsb0JBQVU7R0FEL0IsWUFBWSxDQXVGeEI7QUF2Rlksb0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJ6Qix3Q0FBd0M7QUFDeEMsbURBQXFEO0FBQ3JELHNEQUFzRTtBQUN0RSw2Q0FBMkM7QUFDM0MsZ0RBQStDO0FBQy9DLG9EQUFzRDtBQUN0RCxtREFBcUQ7QUFhckQsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFHO0FBQWQsV0FBVztJQVh2QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1FBQzlCLFNBQVMsRUFBRTtZQUNULHVDQUFpQjtZQUNqQiw0QkFBWTtZQUNaLG1DQUFlO1lBQ2Ysa0NBQWU7U0FDaEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyx1Q0FBaUIsRUFBRSxtQ0FBZSxDQUFDO1FBQzdDLE9BQU8sRUFBRSxDQUFDLHNCQUFTLENBQUM7S0FDckIsQ0FBQztHQUNXLFdBQVcsQ0FBRztBQUFkLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CeEIseUNBS3FCO0FBQ3JCLHdDQVl3QjtBQUV4QixpREFBZ0Q7QUFDaEQsMENBQXFDO0FBQ3JDLGlEQUF1RDtBQUN2RCxrREFBbUQ7QUFDbkQsdURBQW1EO0FBQ25ELG1EQUFxRDtBQUNyRCxvREFBc0Q7QUFFdEQsZ0RBQStDO0FBQy9DLHNEQUFzRTtBQUt0RSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQzFCLFlBQ1UsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEMsaUJBQW9DLEVBQ3BDLFlBQTBCO1FBSDFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUlKLEtBQUssQ0FBQyxRQUFRLENBQW1CLE9BQWU7UUFDOUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBSUQsS0FBSyxDQUFDLFlBQVksQ0FDRSxPQUFlLEVBQ3BCLElBQVUsRUFDYixNQUFjO1FBRXhCLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsT0FBTyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQ2pELE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUlELEtBQUssQ0FBQyxXQUFXLENBQ0csT0FBZSxFQUN6QixJQUF1QjtRQUUvQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixNQUFNLElBQUksMEJBQWlCLEVBQUUsQ0FBQztTQUMvQjtRQUVELEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0MsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBSUQsS0FBSyxDQUFDLFVBQVUsQ0FBbUIsT0FBZTtRQUVoRCxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlELFNBQVMsQ0FDVyxPQUFlLEVBQ3BCLElBQVUsRUFDYixNQUFjLEVBQ2pCLEdBQWE7UUFFcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNOLGNBQWMsRUFBRSxtQkFBbUI7WUFDbkMsZUFBZSxFQUFFLFVBQVU7WUFDM0IsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBaEVDO0lBRkMsWUFBRyxDQUFDLFVBQVUsQ0FBQztJQUNmLHVCQUFLLENBQUMsYUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFJLENBQUMsU0FBUyxFQUFFLGFBQUksQ0FBQyxPQUFPLENBQUM7SUFDN0IseUJBQUssQ0FBQyxTQUFTLENBQUM7Ozs7K0NBRS9CO0FBSUQ7SUFGQyxZQUFHLENBQUMsb0JBQW9CLENBQUM7SUFDekIsdUJBQUssQ0FBQyxhQUFJLENBQUMsRUFBRSxFQUFFLGFBQUksQ0FBQyxTQUFTLEVBQUUsYUFBSSxDQUFDLE9BQU8sQ0FBQztJQUUxQyx5QkFBSyxDQUFDLFNBQVMsQ0FBQztJQUNoQiwyQ0FBUyxFQUFFO0lBQ1gsa0NBQU0sRUFBRTs7OzttREFTVjtBQUlEO0lBRkMsY0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNqQix1QkFBSyxDQUFDLGFBQUksQ0FBQyxFQUFFLEVBQUUsYUFBSSxDQUFDLFNBQVMsQ0FBQztJQUU1Qix5QkFBSyxDQUFDLFNBQVMsQ0FBQztJQUNoQix3QkFBSSxFQUFFOzs2Q0FBTywwQkFBaUI7O2tEQVdoQztBQUlEO0lBRkMsYUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ3RCLHVCQUFLLENBQUMsYUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2IseUJBQUssQ0FBQyxTQUFTLENBQUM7Ozs7aURBTWpDO0FBSUQ7SUFEQyxZQUFHLENBQUMsY0FBYyxDQUFDO0lBRWpCLHlCQUFLLENBQUMsU0FBUyxDQUFDO0lBQ2hCLDJDQUFTLEVBQUU7SUFDWCxrQ0FBTSxFQUFFO0lBQ1IsdUJBQUcsRUFBRTs7OztnREFVUDtBQXpFVSxlQUFlO0lBSDNCLG1CQUFVLENBQUMsUUFBUSxDQUFDO0lBQ3BCLGtCQUFTLENBQUMsNkJBQVksRUFBRSxrQ0FBZSxDQUFDO0lBQ3hDLHdCQUFlLENBQUMsbUNBQTBCLENBQUM7cUNBR3BCLG9CQUFVO1FBQ0wsbUNBQWU7UUFDYix1Q0FBaUI7UUFDdEIsNEJBQVk7R0FMekIsZUFBZSxDQTBFM0I7QUExRVksMENBQWU7Ozs7Ozs7Ozs7O0FDbEM1Qix3Q0FBd0U7QUFDeEUsOENBQWdEO0FBQ2hELCtDQUE0QztBQUUvQixpQkFBUyxHQUFHLDZCQUFvQixDQUMzQyxLQUFLLEVBQUUsSUFBYSxFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUM3QyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEQsTUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELE1BQU0sUUFBUSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLENBQUM7SUFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUN4RCxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM5QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3pCLENBQUMsQ0FDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCRix5Q0FBNkM7QUFDN0Msd0NBQStEO0FBQy9ELDZDQUFrRDtBQUNsRCw4Q0FBbUQ7QUFDbkQsK0NBQTRDO0FBRzVDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsdUJBQVU7SUFFN0MsS0FBSyxDQUFDLFNBQVMsQ0FDYixPQUFZO1FBRVosTUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksMEJBQWlCLENBQUMsdUJBQWMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUU7UUFDRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDeEQsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBaEJZLGVBQWU7SUFEM0IsbUJBQVUsRUFBRTtHQUNBLGVBQWUsQ0FnQjNCO0FBaEJZLDBDQUFlOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1A1Qix3Q0FBd0M7QUFDeEMsOENBQTJDO0FBRzNDLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7Q0FBRztBQUFaLFNBQVM7SUFEckIsZUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsd0JBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLHdCQUFVLENBQUMsRUFBRSxDQUFDO0dBQzlDLFNBQVMsQ0FBRztBQUFaLDhCQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0p0QixvREFBNkQ7QUFDN0QsMENBS2lCO0FBQ2pCLCtDQUE0QztBQUc1QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRTFCLFlBQVksVUFBc0IsRUFBRSxlQUFnQztRQUNsRSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBR0QsUUFBUTtRQUNOLE9BQU8seUJBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUE4QjtRQUM5QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFFaEIsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztDQUNGO0FBbEJZLGVBQWU7SUFEM0IseUJBQWUsRUFBRTtxQ0FHUSxvQkFBVSxFQUFtQixtQ0FBZTtHQUZ6RCxlQUFlLENBa0IzQjtBQWxCWSwwQ0FBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWNUIsaURBQXlDO0FBQ3pDLHdDQUE0QztBQUM1QywrQ0FBNkM7QUFHN0MsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixZQUE2QixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFNekQsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUFIQztJQUxDLHdCQUFPLENBQUM7UUFDUCxPQUFPLEVBQUUsYUFBYTtRQUN0QixRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7Ozt5Q0FHRDtBQVRVLFdBQVc7SUFEdkIsbUJBQVUsRUFBRTtxQ0FFK0IsMEJBQVc7R0FEMUMsV0FBVyxDQVV2QjtBQVZZLGtDQUFXOzs7Ozs7O0FDTHhCLDJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQTRDO0FBQzVDLDJDQUF3QztBQUN4Qyw0Q0FLbUI7QUFDbkIsMENBQWtEO0FBQ2xELHFEQUF1RDtBQUN2RCxnREFBOEM7QUFDOUMsK0NBQW1EO0FBQ25ELHVDQUFnRDtBQUNoRCx3QkFBeUI7QUFDekIsdUNBQWtDO0FBQ2xDLHdDQUE4QjtBQU85QixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBR3RDLFlBQVksQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUMzQyxNQUFNLElBQUksR0FBRyxrQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksSUFBSSxFQUFFO1lBRVIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFHTyxZQUFZLENBQUMsS0FBVSxFQUFFLE9BQWUsRUFBRSxTQUFpQjtRQUNqRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RSxNQUFNLEtBQUssR0FDVCxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDO1FBR3RFLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUN6QyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHcEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBVSxFQUFFLENBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFdkUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBSXpFLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBWSxFQUFVLEVBQUUsQ0FFdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6RSxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQztZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ25DLEtBQUssRUFBRSxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtTQUN6QyxDQUFDLENBQUM7UUFHSCxNQUFNLE9BQU8sR0FBYSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7YUFDckQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNqRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRzlELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUN4QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQ2pELENBQUM7UUFDRixPQUFPLElBQUk7YUFDUixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUNwQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxTQUFTLENBQUMsUUFBMEIsRUFBRSxRQUFnQjtRQUNwRCxNQUFNLGNBQWMsR0FBNkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RSxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUN2QyxDQUFDLFdBQVcsRUFBeUIsRUFBRSxDQUNyQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDN0IsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQy9CLFdBQVcsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUNoQyxDQUFDO1FBRUYsTUFBTSxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztRQUVoRCxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUN2RCxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUMxQyxDQUFDO1FBRUYsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFM0IsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7WUFFekMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQVMsQ0FBQztZQUM1QixJQUFJLEtBQUssRUFBRTtnQkFDVCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXZELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlELE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPO29CQUNqQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRO29CQUNqQixTQUFTLEVBQUUsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQztpQkFDN0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0wsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUNyQixLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU87b0JBQ2pCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVE7b0JBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNoRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtpQkFDN0QsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQU1NLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxNQUFtQjtRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUNULDZCQUE2QixNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxFQUFFLFlBQVksTUFBTSxDQUFDLE9BQU8sS0FBSyxDQUN0RixDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1NBQy9DLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQixTQUFTLEVBQUUsRUFBRTtnQkFDYixTQUFTLEVBQUUsRUFBRTtnQkFDYixjQUFjLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQ2hDLE1BQU0sbUJBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzdCLE1BQU0sQ0FBQyxFQUFFLENBQ1YsQ0FBQztRQUNGLE1BQU0sb0NBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQsTUFBTSxvQ0FBZSxDQUFDLElBQUksQ0FDeEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BCLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLG9DQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUdNLEtBQUssQ0FBQyxnQkFBZ0I7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0Y7QUFMQztJQURDLGVBQUksQ0FBQyxZQUFZLENBQUM7Ozs7bURBS2xCO0FBM0pVLFdBQVc7SUFEdkIsbUJBQVUsRUFBRTtxQ0FFcUIsb0JBQVU7R0FEL0IsV0FBVyxDQTRKdkI7QUE1Slksa0NBQVc7Ozs7Ozs7QUN0QnhCLHNDOzs7Ozs7QUNBQSw4Qzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQXdDO0FBQ3hDLDJEQUFvRTtBQUNwRSwwREFBbUU7QUFDbkUsdURBQTZEO0FBQzdELGlEQUF3RDtBQU94RCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFHO0FBQXJCLGtCQUFrQjtJQUw5QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxnREFBc0IsQ0FBQztRQUNyQyxTQUFTLEVBQUUsQ0FBQywwQ0FBbUIsRUFBRSxpREFBc0IsRUFBRSw4QkFBYSxDQUFDO1FBQ3ZFLE9BQU8sRUFBRSxDQUFDLDBDQUFtQixFQUFFLDhCQUFhLENBQUM7S0FDOUMsQ0FBQztHQUNXLGtCQUFrQixDQUFHO0FBQXJCLGdEQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYL0IsMENBS2lCO0FBQ2pCLHVEQUEyRDtBQUMzRCx1REFBNkQ7QUFHN0QsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFHakMsWUFBWSxVQUFzQixFQUFFLFlBQWlDO1FBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyx3Q0FBaUIsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFxQztRQUNyRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUNuQyxLQUFLLENBQUMsTUFBTSxFQUNaLDBEQUEwRCxDQUMzRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbEJZLHNCQUFzQjtJQURsQyx5QkFBZSxFQUFFO3FDQUlRLG9CQUFVLEVBQWdCLDBDQUFtQjtHQUgxRCxzQkFBc0IsQ0FrQmxDO0FBbEJZLHdEQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWbkMseUNBQTZDO0FBQzdDLHdDQUFpRTtBQUNqRSx3Q0FBK0M7QUFDL0Msb0NBQXdDO0FBRXhDLHdDQUFvQztBQUNwQyw4Q0FBbUQ7QUFDbkQsdURBQTJEO0FBQzNELHFEQUF1RDtBQUN2RCxpREFBd0Q7QUFFM0MsaUJBQVMsR0FBRztJQUN2QixLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQ1gsNkZBQTZGO1FBQy9GLHFCQUFxQixFQUNuQixnRUFBZ0U7UUFDbEUsVUFBVSxFQUNSLDRIQUE0SDtRQUM5SCxTQUFTLEVBQ1Asc0ZBQXNGO1FBQ3hGLEVBQUUsRUFDQSw2R0FBNkc7S0FDaEg7SUFDRCxLQUFLLEVBQUU7UUFDTCxZQUFZLEVBQ1Ysc0ZBQXNGO1FBQ3hGLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFVLEVBQUUsQ0FDeEMsR0FBRyxNQUFNLHlCQUF5QjtRQUNwQyxPQUFPLEVBQUUsb0ZBQW9GO0tBQzlGO0lBQ0QsRUFBRSxFQUFFO1FBQ0YsMEJBQTBCLEVBQ3hCLHFEQUFxRDtLQUN4RDtDQUNGLENBQUM7QUFJRixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUc5QixZQUNVLGFBQTRCLEVBQzVCLGFBQTRCO1FBRDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRXBDLE9BQU8sQ0FBQyxlQUFlLENBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQ25CLElBQW9DO1FBR3BDLElBQUksRUFBRSxHQUFHLE1BQU0sd0NBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ3hELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxFQUFFLEdBQUcsTUFBTSx3Q0FBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkI7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQW1CLEVBQUUsSUFBZTtRQUN0RCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSw0QkFBbUIsQ0FDM0IsdUJBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQ2pELENBQUM7U0FDSDtRQUVELElBQUksZUFBZSxHQUFHLE1BQU0sb0NBQWUsQ0FBQyxPQUFPLENBQUM7WUFDbEQsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQUksZUFBZSxFQUFFO1lBRW5CLElBQUksZUFBZSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQzlDLE9BQU87YUFDUjtpQkFBTTtnQkFFTCxlQUFlLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDekMsZUFBZSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzlCO1NBQ0Y7YUFBTTtZQUNMLGVBQWUsR0FBRyxNQUFNLG9DQUFlLENBQUMsTUFBTSxDQUFDO2dCQUM3QyxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNmLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUdWLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDO1NBQ25DO1FBRUQsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUNwQixlQUFlLEVBQ2YsMkxBQTJMLEVBQzNMLElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUdELEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWU7UUFDOUMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHVCQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2hELEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsTUFBTTthQUNYO1lBQ0QsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztTQUMzQyxDQUFDLENBQUM7UUFHSCxJQUFJLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFO1lBQzFDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixpQkFBaUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FDaEMsQ0FDRixDQUFDO1NBQ0g7UUFDRCxJQUFJLGlCQUFpQixDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRTtZQUN4RSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBR0QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFxQixFQUFFLE9BQWU7UUFDeEQsSUFBSTtZQUNGLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixDQUM1QjtnQkFDRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7Z0JBQ3JCLElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU07b0JBQ2pCLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtpQkFDZDthQUNGLEVBQ0QsT0FBTyxDQUNSLENBQUM7U0FDSDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSx3Q0FBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBR0QsS0FBSyxDQUFDLFdBQVcsQ0FDZixFQUFtQixFQUNuQixPQUFlLEVBQ2YsS0FBYztRQUVkLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0Q7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFtQixFQUFFLE9BQWU7UUFDcEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxvQ0FBZSxDQUFDLE9BQU8sQ0FBQztZQUMvQyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO1NBQ3BDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxZQUFZLENBQ2QsSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FDN0QsQ0FBQztZQUNGLE9BQU8saUJBQVMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7U0FDOUM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3RFLE9BQU8saUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFHakQsTUFBTSxvQ0FBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxPQUFPLGlCQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUNuQzthQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUM5QixPQUFPLGlCQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDM0IsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsT0FBTyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0NBQ0Y7QUF0SlksbUJBQW1CO0lBRC9CLG1CQUFVLEVBQUU7cUNBS2Msc0JBQWE7UUFDYiw4QkFBYTtHQUwzQixtQkFBbUIsQ0FzSi9CO0FBdEpZLGtEQUFtQjs7Ozs7OztBQ3hDaEMscUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSx3Q0FBNEM7QUFDNUMsd0NBQStDO0FBQy9DLHVDQUFpQztBQU9qQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBR3hCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUtNLEtBQUssQ0FBQyxrQkFBa0IsQ0FDN0IsV0FBbUI7UUFFbkIsSUFBSTtZQUNGLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDdkUsV0FBVyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFFWixPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUtNLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBbUIsRUFBRSxPQUFlO1FBQ3ZELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1lBQ2pELEVBQUUsRUFBRSxXQUFXO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5DWSxhQUFhO0lBRHpCLG1CQUFVLEVBQUU7cUNBSXdCLHNCQUFhO0dBSHJDLGFBQWEsQ0FtQ3pCO0FBbkNZLHNDQUFhOzs7Ozs7O0FDVDFCLG1DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEseUNBS3FCO0FBQ3JCLHdDQVl3QjtBQUN4Qix3Q0FBK0M7QUFDL0MsdUNBQWlDO0FBQ2pDLGlEQUF1RDtBQUN2RCxpREFBbUQ7QUFDbkQsdURBQTJEO0FBQzNELHVEQUE2RDtBQUc3RCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUNqQyxZQUNVLFlBQWlDLEVBQ2pDLGFBQTRCO1FBRDVCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBSUoscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUlELEtBQUssQ0FBQyxtQkFBbUIsQ0FDZixJQUFzQixFQUNwQixNQUFjO1FBRXhCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7WUFDckQsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDcEUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTztZQUNMLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNiLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBSUQsS0FBSyxDQUFDLGlCQUFpQixDQUNGLFFBQWdCLEVBQ3pCLE1BQWM7UUFFeEIsTUFBTSxFQUFFLEdBQUcsTUFBTSx3Q0FBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqQixNQUFNLHdDQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxJQUFJLDBCQUFpQixFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBS0QsS0FBSyxDQUFDLGVBQWUsQ0FDWCxJQUFnQixFQUNPLGVBQXVCO1FBRXRELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUUvQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQ3hDLGVBQWUsRUFDZixlQUFlLENBQUMsSUFBSSxFQUFFLEVBQ3RCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxFQUN2RSxJQUFJLENBQ0wsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxJQUFJLDhCQUFxQixDQUM3Qix1QkFBYyxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUMzRCxDQUFDO1NBQ0g7UUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUN2RCxZQUFZLEVBQ1osT0FBTyxDQUNSLENBQUM7UUFDRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0IsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBM0VDO0lBRkMsWUFBRyxDQUFDLHFCQUFxQixDQUFDO0lBQzFCLGtCQUFTLENBQUMsNkJBQVksQ0FBQzs7OzttRUFHdkI7QUFJRDtJQUZDLGFBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN0QixrQkFBUyxDQUFDLDZCQUFZLENBQUM7SUFFckIsd0JBQUksRUFBRTtJQUNOLGtDQUFNLEVBQUU7Ozs7aUVBZ0JWO0FBSUQ7SUFGQyxlQUFNLENBQUMsMEJBQTBCLENBQUM7SUFDbEMsa0JBQVMsQ0FBQyw2QkFBWSxDQUFDO0lBRXJCLHlCQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pCLGtDQUFNLEVBQUU7Ozs7K0RBUVY7QUFLRDtJQUZDLGFBQUksQ0FBQyxlQUFlLENBQUM7SUFDckIsZUFBTSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUM7SUFFaEMsd0JBQUksRUFBRTtJQUNOLDJCQUFPLENBQUMsb0JBQW9CLENBQUM7Ozs7NkRBNkIvQjtBQWxGVSxzQkFBc0I7SUFEbEMsbUJBQVUsQ0FBQyxlQUFlLENBQUM7cUNBR0YsMENBQW1CO1FBQ2xCLHNCQUFhO0dBSDNCLHNCQUFzQixDQW1GbEM7QUFuRlksd0RBQXNCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNCbkMsd0NBQXdDO0FBQ3hDLG1EQUFxRDtBQUNyRCwrQ0FBb0Q7QUFDcEQsc0NBQXdDO0FBQ3hDLHdDQUE2RDtBQUM3RCx1REFBNEQ7QUFlNUQsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFHO0FBQWQsV0FBVztJQWJ2QixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDUCxlQUFTLENBQUMsYUFBYSxDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxzQkFBYSxDQUFDO2dCQUN2QixVQUFVLEVBQUUsS0FBSyxFQUFFLGFBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ25ELE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztpQkFDeEMsQ0FBQzthQUNILENBQUM7U0FDSDtRQUNELFdBQVcsRUFBRSxDQUFDLGtDQUFlLENBQUM7UUFDOUIsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSx5Q0FBa0IsQ0FBQztLQUM3QyxDQUFDO0dBQ1csV0FBVyxDQUFHO0FBQWQsa0NBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJ4Qix5Q0FPcUI7QUFDckIsd0NBVXdCO0FBQ3hCLHdDQUErQztBQUMvQyxzQ0FBeUM7QUFFekMsOENBQWdEO0FBQ2hELDBDQUFxQztBQUVyQyx1REFBb0U7QUFDcEUsOENBQTBEO0FBQzFELGdFQUE0RTtBQUM1RSx1REFBNEQ7QUFHNUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUMxQixZQUNVLFVBQXNCLEVBQ3RCLGtCQUFzQyxFQUN0QyxVQUFzQixFQUN0QixhQUE0QjtRQUg1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBR0osS0FBSyxDQUFDLHFCQUFxQixDQUNsQixHQUFZLEVBQ1gsSUFBc0I7UUFFOUIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFFekMsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUNyQyxhQUFhLEVBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FDN0MsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLDhCQUFxQixDQUM3Qix1QkFBYyxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FDckQsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxJQUFJLElBQWUsQ0FBQztRQUNwQixJQUFJLEdBQUcsTUFBTSx1QkFBUyxDQUFDLE9BQU8sQ0FBQztZQUM3QixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM1QixTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULElBQUksR0FBRyxNQUFNLHVCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQ7UUFHRCxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQzVDLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBc0IsRUFBRSxFQUFFO1lBQ2hELE1BQU0sTUFBTSxHQUFnQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FDN0UsQ0FBQyxDQUFDLE1BQU0sRUFDUixDQUFDLENBQUMsT0FBTyxDQUNWLENBQUM7WUFFRixJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FDakUsSUFBSSxDQUFDLEVBQUUsRUFDUCxNQUFNLENBQUMsRUFBRSxFQUNULGFBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztnQkFDRixXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBaUIsRUFBRSxFQUFFO1lBRTlDLE1BQU0sY0FBYyxHQUFHLE1BQU0seURBQXlCLENBQUMsSUFBSSxDQUFDO2dCQUMxRCxLQUFLLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO2FBQ3ZDLENBQUMsQ0FBQztZQUVILEtBQUssTUFBTSxhQUFhLElBQUksY0FBYyxFQUFFO2dCQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FDL0QsSUFBSSxDQUFDLEVBQUUsRUFDUCxhQUFhLENBQUMsUUFBUSxFQUN0QixhQUFJLENBQUMsRUFBRSxDQUNSLENBQUM7Z0JBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUMzQixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUMzQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQ25CLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdEIsQ0FBQztRQUNGLE9BQU87WUFDTCxRQUFRLEVBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsNkJBQTZCLEtBQUssRUFBRTtTQUMxRSxDQUFDO0lBQ0osQ0FBQztJQU9ELEtBQUssQ0FBQyxlQUFlLENBQ1osR0FBYSxFQUNKLEtBQWE7UUFFN0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLDhCQUFxQixFQUFFLENBQUM7U0FDbkM7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQXVCLENBQUM7UUFFcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFLRCxLQUFLLENBQUMsWUFBWSxDQUNULEdBQWEsRUFDSCxNQUFjO1FBRS9CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFHTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQWEsRUFBRSxNQUFjO1FBQy9DLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhO2FBQ2hDLEdBQUcsQ0FBUyxRQUFRLENBQUM7YUFDckIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLEdBQUc7YUFDQSxNQUFNLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ3JFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBL0hDO0lBREMsYUFBSSxDQUFDLGVBQWUsQ0FBQztJQUVuQix1QkFBRyxFQUFFO0lBQ0wsd0JBQUksRUFBRTs7NkNBQU8seUJBQWdCOzs0REFtRi9CO0FBT0Q7SUFEQyxZQUFHLENBQUMsY0FBYyxDQUFDO0lBRWpCLHVCQUFHLEVBQUU7SUFDTCx5QkFBSyxDQUFDLE9BQU8sQ0FBQzs7OztzREFXaEI7QUFLRDtJQUZDLFlBQUcsQ0FBQyxZQUFZLENBQUM7SUFDakIsa0JBQVMsQ0FBQyx5Q0FBa0IsQ0FBQztJQUUzQix1QkFBRyxFQUFFO0lBQ0wseUJBQUssQ0FBQyxRQUFRLENBQUM7Ozs7bURBR2pCO0FBNUhVLGVBQWU7SUFEM0IsbUJBQVUsRUFBRTtxQ0FHVyxvQkFBVTtRQUNGLHlDQUFrQjtRQUMxQixnQkFBVTtRQUNQLHNCQUFhO0dBTDNCLGVBQWUsQ0F3STNCO0FBeElZLDBDQUFlOzs7Ozs7O0FDL0I1Qix3Qzs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSx3Q0FBeUQ7QUFDekQseUNBQXFDO0FBR3JDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBQzdCLFdBQVc7UUFDVCxPQUFPLENBQUMsZUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBSlksa0JBQWtCO0lBRDlCLG1CQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0FJOUI7QUFKWSxnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSi9CLDBDQU9pQjtBQUNqQixnREFBc0Q7QUFHdEQsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxvQkFBVTtDQWtCeEQ7QUFoQkM7SUFEQyxnQ0FBc0IsRUFBRTs7cURBQ2Q7QUFJWDtJQURDLGdCQUFNLEVBQUU7O29FQUNpQjtBQUcxQjtJQURDLGdCQUFNLEVBQUU7OzBEQUNPO0FBS2hCO0lBRkMsbUJBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsMkJBQVcsQ0FBQztJQUNoQyxvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzhCQUN6QiwyQkFBVzt5REFBQztBQUdwQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJEQUNWO0FBakJOLHlCQUF5QjtJQURyQyxnQkFBTSxDQUFDLDhCQUE4QixDQUFDO0dBQzFCLHlCQUF5QixDQWtCckM7QUFsQlksOERBQXlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1h0Qyx3Q0FBNEM7QUFDNUMsMENBQXFDO0FBRXJDLHFEQUE2RDtBQUU3RCxnRUFBZ0Y7QUFHaEYsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFDN0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFdkMsS0FBSyxDQUFDLHFCQUFxQixDQUNoQyxVQUFrQixFQUNsQixhQUFxQjtRQUVyQixNQUFNLGtCQUFrQixHQUFHLE1BQU0seURBQXlCLENBQUMsT0FBTyxDQUFDO1lBQ2pFLEtBQUssRUFBRSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFO1lBQ2hFLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUM3QixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsSUFBVTtRQUVWLElBQUksVUFBMkIsQ0FBQztRQUNoQyxVQUFVLEdBQUcsTUFBTSxvQ0FBZSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBVSxHQUFHLE1BQU0sb0NBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixJQUFJO2FBQ0wsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFoQ1ksa0JBQWtCO0lBRDlCLG1CQUFVLEVBQUU7cUNBRXFCLG9CQUFVO0dBRC9CLGtCQUFrQixDQWdDOUI7QUFoQ1ksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1IvQiwrQ0FBb0Q7QUFDcEQsMkNBQW9EO0FBQ3BELHdDQUE0QztBQUM1Qyx3Q0FBK0M7QUFJL0MsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLDJCQUFnQixDQUFDLHVCQUFRLENBQUM7SUFDekQsWUFBWSxhQUE0QjtRQUN0QyxLQUFLLENBQUM7WUFDSixjQUFjLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQzNELGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1NBQzdDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBMkI7UUFDbEMseUJBQVksT0FBTyxFQUFHO0lBQ3hCLENBQUM7Q0FDRjtBQVpZLFdBQVc7SUFEdkIsbUJBQVUsRUFBRTtxQ0FFZ0Isc0JBQWE7R0FEN0IsV0FBVyxDQVl2QjtBQVpZLGtDQUFXOzs7Ozs7O0FDUHhCLHlDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQXdDO0FBQ3hDLHFEQUF5RDtBQUN6RCxzREFBeUU7QUFNekUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFHO0FBQWhCLGFBQWE7SUFKekIsZUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsd0NBQWtCLENBQUM7UUFDN0IsV0FBVyxFQUFFLENBQUMsc0NBQWlCLENBQUM7S0FDakMsQ0FBQztHQUNXLGFBQWEsQ0FBRztBQUFoQixzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSMUIseUNBSXFCO0FBQ3JCLHdDQUF5RTtBQUN6RSx5Q0FBOEI7QUFDOUIsMENBQXFDO0FBQ3JDLGlEQUF1RDtBQUN2RCx1REFBMkU7QUFDM0UsaURBQXdDO0FBQ3hDLDhDQUEwQztBQUkxQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUM1QixZQUNVLFVBQXNCLEVBQ3RCLFlBQWlDO1FBRGpDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQXFCO0lBQ3hDLENBQUM7SUFHSixLQUFLLENBQUMsR0FBRyxDQUVQLElBQWU7O1FBRWYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDekIsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNqRCxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNsQixPQUFPO2dCQUNMLE1BQU0sRUFBRTtvQkFDTixFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVE7b0JBQ3ZCLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUk7aUJBQzdCO2dCQUNELElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTthQUN0QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFTCxNQUFNLGFBQWEsR0FBMEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ2pFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ04sUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNSLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztZQUN0QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7U0FDYixDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLGFBQUksQ0FBQyxJQUFJLEVBQUU7WUFDOUIsSUFBSTtZQUNKLE9BQU87WUFDUCxNQUFNO1lBQ04sV0FBVztZQUNYLFVBQVU7WUFDVixVQUFVO1lBQ1Ysc0JBQXNCO1lBQ3RCLG9CQUFvQjtTQUNyQixDQUFDLENBQUM7UUFDSCx1Q0FDSyxZQUFZLEtBQ2YsT0FBTyxFQUNQLFdBQVcsUUFBRSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxXQUFXLEVBQ3pDLGFBQWEsSUFDYjtJQUNKLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSyxDQUNELFNBQThCLEVBRXRDLElBQWU7O1FBRWYsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUNFLElBQUksQ0FBQyxrQkFBa0I7WUFDdkIsU0FBUyxDQUFDLFdBQVcsWUFBSyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxXQUFXLEdBQ3REO1lBQ0EsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQTdEQztJQURDLFlBQUcsRUFBRTtJQUVILGdDQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDOztxQ0FDN0QsdUJBQVM7OzRDQXVDaEI7QUFHRDtJQURDLGNBQUssRUFBRTtJQUVMLHdCQUFJLEVBQUU7SUFDTixnQ0FBSSxDQUFDLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQzs7cUNBRGhELDRCQUFtQjtRQUVoQyx1QkFBUzs7OENBYWhCO0FBbkVVLGlCQUFpQjtJQUY3QixtQkFBVSxDQUFDLFNBQVMsQ0FBQztJQUNyQixrQkFBUyxDQUFDLDZCQUFZLENBQUM7cUNBR0Esb0JBQVU7UUFDUiwwQ0FBbUI7R0FIaEMsaUJBQWlCLENBb0U3QjtBQXBFWSw4Q0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZjlCLHdDQUF3QztBQUN4QyxzREFBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUEyRDtBQUMzRCwrQ0FBb0Q7QUFPcEQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHO0FBQWpCLGNBQWM7SUFMMUIsZUFBTSxDQUFDO1FBQ04sV0FBVyxFQUFFLENBQUMsd0NBQWtCLENBQUM7UUFDakMsU0FBUyxFQUFFLENBQUMsd0NBQWtCLENBQUM7UUFDL0IsT0FBTyxFQUFFLENBQUMsd0NBQWtCLEVBQUUsMEJBQVcsQ0FBQztLQUMzQyxDQUFDO0dBQ1csY0FBYyxDQUFHO0FBQWpCLHdDQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1gzQix5Q0FZcUI7QUFDckIsd0NBYXdCO0FBQ3hCLDBDQUF5QztBQUN6QyxpREFBdUQ7QUFDdkQsdURBRzhDO0FBQzlDLGtEQUFtRDtBQUNuRCxxREFBZ0U7QUFDaEUsaURBQXlEO0FBQ3pELDhDQUFtRDtBQUNuRCwrQ0FBbUQ7QUFDbkQsc0RBQTJEO0FBQzNELGtEQUFrRDtBQUtsRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUM3QixZQUNVLFVBQXNCLEVBQ3RCLFlBQWlDO1FBRGpDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQXFCO0lBQ3hDLENBQUM7SUFHSixLQUFLLENBQUMsV0FBVyxDQUNNLFVBQWtCO1FBRXZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sK0JBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3ZELFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLE1BQU0sSUFBSSwwQkFBaUIsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUlELEtBQUssQ0FBQyxjQUFjLENBQ1YsSUFBMEIsRUFDMUIsSUFBZTtRQUV2QixNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRXBELE1BQU0sS0FBSyxHQUFHLE1BQU0seUJBQVUsQ0FBQyxPQUFPLENBQUM7WUFDckMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRTtZQUN0QixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sSUFBSSwwQkFBaUIsQ0FDekIsdUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUM5RCxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUN6QixNQUFNLElBQUksNEJBQW1CLENBQzNCLHVCQUFjLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDaEUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksNEJBQW1CLENBQzNCLHVCQUFjLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FDN0QsQ0FBQztTQUNIO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLCtCQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3ZELEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxZQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBa0IsQ0FBQyxDQUFDO2FBQzlDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7WUFDMUIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1Qsb0JBQW9CLENBQUMsTUFBTSxHQUFHLDZCQUFvQixDQUFDLGdCQUFnQixDQUFDO2dCQUNwRSxNQUFNLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSw0QkFBbUIsQ0FDM0IsdUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQ3BFLENBQUM7YUFDSDtTQUNGO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSwrQkFBYSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUk7WUFDSixZQUFZO1lBQ1osTUFBTSxFQUFFLDJCQUFrQixDQUFDLFFBQVE7WUFDbkMsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUtELEtBQUssQ0FBQyxjQUFjLENBQ0csVUFBa0IsRUFDL0IsSUFBMEIsRUFDeEIsTUFBYzs7UUFFeEIsSUFBSSxRQUFRLEdBQUcsTUFBTSwrQkFBYSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixNQUFNLElBQUksMEJBQWlCLEVBQUUsQ0FBQztTQUMvQjtRQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRWhELElBQUksU0FBUyxFQUFFO1lBRWIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEUsTUFBTSxJQUFJLDhCQUFxQixDQUM3Qix1QkFBYyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQzNELFNBQVMsRUFDVCxRQUFRLENBQUMsTUFBTSxFQUNmLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FDRixDQUFDO2FBQ0g7WUFDRCxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFHRCxNQUFNLFVBQVUsR0FDZCxDQUFDLE1BQU0sb0NBQWUsQ0FBQyxLQUFLLENBQUM7WUFDM0IsS0FBSyxFQUFFO2dCQUNMLE1BQU07Z0JBQ04sUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDakMsSUFBSSxFQUFFLFlBQUUsQ0FBQyxDQUFDLGFBQUksQ0FBQyxFQUFFLEVBQUUsYUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVYsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDdkUsTUFBTSxJQUFJLDhCQUFxQixDQUM3Qix1QkFBYyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FDMUUsQ0FBQzthQUNIO1lBQ0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRTlCLElBQUksZUFBUSxDQUFDLFFBQVEsMENBQUUsRUFBRSxNQUFLLE1BQU0sRUFBRTtnQkFDcEMsSUFBSSxTQUFTLEtBQUssMkJBQWtCLENBQUMsT0FBTyxFQUFFO29CQUM1QyxNQUFNLElBQUksOEJBQXFCLENBQzdCLHVCQUFjLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDaEUsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLFNBQVMsS0FBSyw2QkFBb0IsQ0FBQyxRQUFRLEVBQUU7b0JBQy9DLE1BQU0sSUFBSSw4QkFBcUIsQ0FDN0IsdUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUNqRSxDQUFDO2lCQUNIO2FBQ0Y7WUFFRCxNQUFNLG1CQUFtQixHQUN2QixDQUFDLE1BQU0sK0JBQWEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLEtBQUssRUFBRTtvQkFDTCxVQUFVLEVBQUUsTUFBTTtvQkFDbEIsTUFBTSxFQUFFLDJCQUFrQixDQUFDLE9BQU87aUJBQ25DO2FBQ0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxtQkFBbUIsSUFBSSxTQUFTLEtBQUssMkJBQWtCLENBQUMsT0FBTyxFQUFFO2dCQUNuRSxNQUFNLElBQUksNEJBQW1CLENBQzNCLHVCQUFjLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDaEUsQ0FBQzthQUNIO1lBRUQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsYUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3BCLE1BQU0sSUFBSSw4QkFBcUIsQ0FDN0IsdUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUMzRCxJQUFJLEVBQ0osUUFBUSxDQUFDLE1BQU0sRUFDZixJQUFJLENBQUMsTUFBTSxDQUNaLENBQ0YsQ0FBQzthQUNIO1lBR0QsSUFDRSxTQUFTLEtBQUssMkJBQWtCLENBQUMsT0FBTztnQkFDeEMsU0FBUyxLQUFLLDJCQUFrQixDQUFDLE9BQU8sRUFDeEM7Z0JBQ0EsUUFBUSxDQUFDLFFBQVEsR0FBRyxNQUFNLHVCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBRy9CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO29CQUMzQixRQUFRLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7aUJBQzVDO2dCQUNELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUNuQixnQ0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDdEQsQ0FBQzthQUNIO1lBQ0QsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTTtZQUNMLE1BQU0sSUFBSSw4QkFBcUIsQ0FDN0IsdUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQ25FLENBQUM7U0FDSDtJQUNILENBQUM7SUFJRCxLQUFLLENBQUMsTUFBTSxDQUFzQixVQUFrQjtRQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLCtCQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN2RCxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLDRCQUFtQixDQUFDLFFBQVEsRUFBRTtZQUNwRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUNoQyxRQUFRLENBQUMsU0FBUyxFQUNsQixnQ0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQzdCLENBQUM7U0FDSDthQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyw0QkFBbUIsQ0FBQyxTQUFTLEVBQUU7WUFDNUQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FDaEMsUUFBUSxDQUFDLFNBQVMsRUFDbEIsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN4QixDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUFqTkM7SUFEQyxZQUFHLENBQUMsYUFBYSxDQUFDO0lBRWhCLHlCQUFLLENBQUMsWUFBWSxDQUFDOzs7O3FEQVVyQjtBQUlEO0lBRkMsYUFBSSxFQUFFO0lBQ04sdUJBQUssQ0FBQyxhQUFJLENBQUMsT0FBTyxDQUFDO0lBRWpCLHdCQUFJLEVBQUU7SUFDTixnQ0FBSSxFQUFFOztxQ0FETyw2QkFBb0I7UUFDcEIsdUJBQVM7O3dEQXVEeEI7QUFLRDtJQUhDLGNBQUssQ0FBQyxhQUFhLENBQUM7SUFDcEIsdUJBQUssQ0FBQyxhQUFJLENBQUMsT0FBTyxFQUFFLGFBQUksQ0FBQyxFQUFFLEVBQUUsYUFBSSxDQUFDLFNBQVMsQ0FBQztJQUcxQyx5QkFBSyxDQUFDLFlBQVksQ0FBQztJQUNuQix3QkFBSSxFQUFFO0lBQ04sa0NBQU0sRUFBRTs7NkNBREssNkJBQW9COzt3REE2R25DO0FBSUQ7SUFGQyxhQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDMUIsdUJBQUssQ0FBQyxhQUFJLENBQUMsRUFBRSxFQUFFLGFBQUksQ0FBQyxTQUFTLENBQUM7SUFDakIseUJBQUssQ0FBQyxZQUFZLENBQUM7Ozs7Z0RBZ0JoQztBQXZOVSxrQkFBa0I7SUFIOUIsbUJBQVUsQ0FBQyxXQUFXLENBQUM7SUFDdkIsa0JBQVMsQ0FBQyw2QkFBWSxFQUFFLHdDQUFrQixDQUFDO0lBQzNDLHdCQUFlLENBQUMsbUNBQTBCLENBQUM7cUNBR3BCLG9CQUFVO1FBQ1IsMENBQW1CO0dBSGhDLGtCQUFrQixDQXdOOUI7QUF4TlksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVDL0IseUNBQTZDO0FBQzdDLHdDQUl3QjtBQUN4Qiw2Q0FBa0Q7QUFDbEQsOENBQW1EO0FBQ25ELCtDQUFtRDtBQUNuRCxrREFBa0Q7QUFHbEQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSx1QkFBVTtJQUVoRCxLQUFLLENBQUMsU0FBUyxDQUNiLE9BQVk7UUFFWixJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSwrQkFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLDBCQUFpQixDQUN6Qix1QkFBYyxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUNsRCxDQUFDO2FBQ0g7WUFDRCxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUM1QjthQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFFL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxNQUFNLElBQUksNEJBQW1CLENBQzNCLHVCQUFjLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQ3pELENBQUM7U0FDSDtRQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0seUJBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHaEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sSUFBSSwwQkFBaUIsQ0FDekIsdUJBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FDbkQsQ0FBQztTQUNIO1FBQ0QsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hELFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN2QixDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQXZDWSxrQkFBa0I7SUFEOUIsbUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQXVDOUI7QUF2Q1ksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ovQix5Q0FBdUU7QUFDdkUsb0RBQTZEO0FBQzdELCtDQUFtRDtBQUNuRCwwQ0FPaUI7QUFDakIsdURBRzhDO0FBQzlDLGtEQUFrRDtBQUdsRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUk3QixZQUNFLFVBQXNCLEVBQ3RCLFlBQWlDLEVBQ2pDLGVBQWdDO1FBRWhDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFHRCxRQUFRO1FBQ04sT0FBTywrQkFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWlDO1FBRWpELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUlqRSxJQUNFLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQztZQUM3RCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSw2QkFBb0IsRUFDM0M7WUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLCtCQUFhLENBQUMsY0FBYyxDQUN0RCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDckI7aUJBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDVCxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sS0FBSyxHQUFHLE1BQU0sK0JBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQ25FLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2lCQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1osSUFBSSxLQUFLLElBQUksY0FBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLEVBQUUsT0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsRUFBRSxHQUFFO2dCQUM1QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEU7U0FDRjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWlDO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsTUFBTSwrQkFBYSxDQUFDLGNBQWMsQ0FDMUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFYixJQUFJLGlCQUFpQixLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLEtBQUssR0FBRyxDQUNaLE1BQU0seUJBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUN6QixDQUFDLENBQ0gsQ0FBQyxTQUFTLENBQUM7WUFFWixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUMxQixLQUFLLENBQUMsRUFBRSxFQUNSLGdDQUFTLENBQUMsRUFBRSxDQUFDLDBCQUEwQixDQUN4QyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUdELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFpQztRQUVsRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFFaEIsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztDQUNGO0FBN0VZLGtCQUFrQjtJQUQ5Qix5QkFBZSxFQUFFO3FDQU1GLG9CQUFVO1FBQ1IsMENBQW1CO1FBQ2hCLG1DQUFlO0dBUHZCLGtCQUFrQixDQTZFOUI7QUE3RVksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCL0Isd0NBQXdDO0FBQ3hDLGtEQUFtRDtBQUNuRCwrQ0FBNkM7QUFNN0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQUFHO0FBQWIsVUFBVTtJQUp0QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1FBQzdCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7S0FDekIsQ0FBQztHQUNXLFVBQVUsQ0FBRztBQUFiLGdDQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1J2Qix5Q0FBeUQ7QUFDekQsd0NBQXdFO0FBRXhFLDhDQUFnRDtBQUNoRCwwQ0FBcUM7QUFDckMsNENBUW1DO0FBQ25DLGdEQUFzRDtBQUN0RCxxREFBK0Q7QUFDL0QsdURBQTZEO0FBQzdELGtEQUE0RDtBQUM1RCwrQ0FBbUQ7QUFDbkQsK0NBQTZDO0FBSTdDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFDVSxVQUFzQixFQUN0QixXQUF3QjtRQUR4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQy9CLENBQUM7SUFHSixLQUFLLENBQUMsU0FBUztRQUNiLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsb0NBQWUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsK0JBQWEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMseUJBQVUsQ0FBQyxDQUFDO1FBRTdDLE9BQU8seUJBQXlCLENBQUM7SUFDbkMsQ0FBQztJQUdELEtBQUssQ0FBQyxXQUFXO1FBRWYsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFHdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV2QixNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFN0MsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLDZCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUN0RCxTQUFTLEVBQUUsR0FBRztZQUNkLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1NBQzNDLENBQUMsQ0FBQztRQUNILE1BQU0sdUJBQXVCLEdBQUcsTUFBTSw2QkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDN0QsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDNUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDM0MsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLDZCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUMxRCxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztTQUNqRCxDQUFDLENBQUM7UUFDSCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sNkJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3pELFNBQVMsRUFBRSxRQUFRO1lBQ25CLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxPQUFPLENBQUM7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE1BQU0sMkJBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdELE1BQU0seUJBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5QjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxPQUFPLENBQUM7WUFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFdBQVcsR0FBRztZQUNuQixnQkFBZ0I7WUFDaEIsb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQix1QkFBdUI7U0FDeEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVkLE1BQU0sV0FBVyxHQUFHLE1BQU0sdUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBRWhCLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLElBQUksRUFBRSxhQUFhO2dCQUNuQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUNOLGdFQUFnRTthQUNuRSxDQUFDLENBQUM7WUFDSCxNQUFNLDZCQUFpQixDQUFDLE1BQU0sQ0FBQztnQkFDN0IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLGFBQUksQ0FBQyxPQUFPO2dCQUNsQixNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSw2QkFBNkI7Z0JBQ3BDLElBQUksRUFBRSxlQUFlO2dCQUNyQixTQUFTLEVBQUUsTUFBTTtnQkFDakIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFDTixnRUFBZ0U7YUFDbkUsQ0FBQyxDQUFDO1lBQ0gsTUFBTSw2QkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxhQUFJLENBQUMsT0FBTztnQkFDbEIsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFFSCxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFXLENBQUMsTUFBTSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsNEJBQTRCO2dCQUNuQyxJQUFJLEVBQUUsY0FBYztnQkFDcEIsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQ04sZ0VBQWdFO2FBQ25FLENBQUMsQ0FBQztZQUNILE1BQU0sNkJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUM3QixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsYUFBSSxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFFSCxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFXLENBQUMsTUFBTSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsMEJBQTBCO2dCQUNqQyxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFDTixnRUFBZ0U7YUFDbkUsQ0FBQyxDQUFDO1lBQ0gsTUFBTSw2QkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxhQUFJLENBQUMsRUFBRTtnQkFDYixNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBWSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxNQUFNO1lBQ2QsV0FBVyxFQUFFO2dCQUNYLGdCQUFnQjtnQkFDaEIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLHVCQUF1QjthQUN4QjtZQUNELGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUVILE1BQU0sMkJBQWUsQ0FBQyxNQUFNLENBQUM7WUFDM0IsS0FBSyxFQUFFLEtBQUs7WUFDWixTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztTQUMxQyxDQUFDLENBQUM7UUFDSCxNQUFNLDJCQUFlLENBQUMsTUFBTSxDQUFDO1lBQzNCLEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSwyQkFBZSxDQUFDLE1BQU0sQ0FBQztZQUMzQixLQUFLLEVBQUUsS0FBSztZQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUVILE9BQU8sMEJBQTBCLENBQUM7SUFDcEMsQ0FBQztJQUdELEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXpDLE1BQU0sMkJBQWUsQ0FBQyxNQUFNLENBQUM7WUFDM0IsS0FBSyxFQUFFLEtBQUs7WUFDWixTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztTQUMxQyxDQUFDLENBQUM7UUFDSCxNQUFNLDJCQUFlLENBQUMsTUFBTSxDQUFDO1lBQzNCLEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSwyQkFBZSxDQUFDLE1BQU0sQ0FBQztZQUMzQixLQUFLLEVBQUUsS0FBSztZQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUVILE9BQU8sMEJBQTBCLENBQUM7SUFDcEMsQ0FBQztJQUdELEtBQUssQ0FBQyxVQUFVLENBQ04sSUFBc0M7UUFFOUMsSUFBSSxFQUFtQixDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLDJCQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5RCxFQUFFLEdBQUcsTUFBTSw2QkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMxRTthQUFNO1lBQ0wsRUFBRSxHQUFHLE1BQU0sNkJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBR0QsS0FBSyxDQUFDLFdBQVcsQ0FFZixJQUtDOztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSw2QkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDakQsU0FBUyxFQUFFLEdBQUc7WUFDZCxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsS0FBSSxPQUFPLENBQUMsQ0FBQztTQUMvRCxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRztZQUNkLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUMxQixjQUFjLFFBQUUsSUFBSSxDQUFDLGNBQWMsbUNBQUksS0FBSztTQUM3QyxDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDNUI7UUFDRCxNQUFNLEtBQUssR0FBZSxNQUFNLHdCQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUdELEtBQUssQ0FBQyxjQUFjLENBRWxCLElBSUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sS0FBSyxHQUFHLE1BQU0seUJBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsTUFBTSxPQUFPLEdBQUcsTUFBTSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUM5QjtRQUNELE1BQU0sUUFBUSxHQUFrQixNQUFNLDJCQUFlLENBQUMsTUFBTSxpQ0FDdkQsT0FBTyxHQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1osQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQXpPQztJQURDLFlBQUcsQ0FBQyxRQUFRLENBQUM7Ozs7K0NBT2I7QUFHRDtJQURDLFlBQUcsQ0FBQyxRQUFRLENBQUM7Ozs7aURBMEliO0FBR0Q7SUFEQyxZQUFHLENBQUMsWUFBWSxDQUFDOzs7OytDQWtCakI7QUFHRDtJQURDLGFBQUksQ0FBQyxZQUFZLENBQUM7SUFFaEIsd0JBQUksRUFBRTs7OztnREFVUjtBQUdEO0lBREMsYUFBSSxDQUFDLGFBQWEsQ0FBQztJQUVqQix3QkFBSSxFQUFFOzs7O2lEQXVCUjtBQUdEO0lBREMsYUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBRXBCLHdCQUFJLEVBQUU7Ozs7b0RBcUJSO0FBL09VLGNBQWM7SUFGMUIsbUJBQVUsQ0FBQyxPQUFPLENBQUM7SUFDbkIsa0JBQVMsQ0FBQyx5Q0FBa0IsQ0FBQztxQ0FHTixvQkFBVTtRQUNULDBCQUFXO0dBSHZCLGNBQWMsQ0FnUDFCO0FBaFBZLHdDQUFjOzs7Ozs7Ozs7OztBQ3ZCM0IseUNBQWlEO0FBQ2pELGtEQUEwQztBQUMxQyxnREFBNkQ7QUFDN0QscURBQXNFO0FBQ3RFLGtEQUFpRTtBQUNqRSxnRUFBMEY7QUFDMUYscURBQXVFO0FBQ3ZFLDhDQUEwRDtBQUMxRCxrREFBbUU7QUFDbkUsK0NBQTBEO0FBRTdDLG1CQUFXLEdBQUcsSUFBSSx5QkFBTyxDQUFDLHVCQUFTLENBQUM7S0FDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUM7S0FDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7S0FDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7S0FDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRTVCLDRCQUFvQixHQUFHLElBQUkseUJBQU8sQ0FBQyxvQ0FBZSxDQUFDLENBQUMsSUFBSSxDQUNuRSxNQUFNLEVBQ04sYUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO0FBRVcsdUJBQWUsR0FBRyxJQUFJLHlCQUFPLENBQUMsb0NBQWUsQ0FBQyxDQUFDLElBQUksQ0FDOUQsTUFBTSxFQUNOLGFBQUksQ0FBQyxFQUFFLENBQ1IsQ0FBQztBQUVXLHVCQUFlLEdBQUcsSUFBSSx5QkFBTyxDQUFDLCtCQUFhLENBQUM7S0FDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7S0FDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVULCtCQUF1QixHQUFHLElBQUkseUJBQU8sQ0FBQyxvQ0FBZSxDQUFDO0tBQ2hFLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUM7S0FDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3ZELElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO0FBRTVDLHlCQUFpQixHQUFHLElBQUkseUJBQU8sQ0FBQyxvQ0FBZSxDQUFDO0tBQzFELElBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUM7S0FDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzNELElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRWhELHFCQUFhLEdBQUcsSUFBSSx5QkFBTyxDQUFDLDJCQUFXLENBQUM7S0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7S0FDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUM7S0FDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7S0FDckIsUUFBUSxDQUFDLFVBQVUsRUFBRSx1QkFBZSxDQUFDO0tBQ3JDLFNBQVMsQ0FBQyxhQUFhLEVBQUUseUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFckMsNEJBQW9CLEdBQUcsSUFBSSx5QkFBTyxDQUFDLHlEQUF5QixDQUFDO0tBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLENBQUM7S0FDcEMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCLFFBQVEsQ0FBQyxRQUFRLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0FBRXhCLHlCQUFpQixHQUFHLElBQUkseUJBQU8sQ0FBQyxvQ0FBZSxDQUFDO0tBQzFELFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUJBQVcsQ0FBQztLQUM3QixRQUFRLENBQUMsUUFBUSxFQUFFLHFCQUFhLENBQUM7S0FDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFakIsb0JBQVksR0FBRyxJQUFJLHlCQUFPLENBQUMseUJBQVUsQ0FBQztLQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztLQUN0QixRQUFRLENBQUMsUUFBUSxFQUFFLHFCQUFhLENBQUM7S0FDakMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztLQUM3QixTQUFTLENBQUMsYUFBYSxFQUFFLHlCQUFpQixDQUFDO0tBQzNDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUk3Qix1QkFBZSxHQUFHLElBQUkseUJBQU8sQ0FBQywrQkFBYSxDQUFDO0tBQ3RELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7S0FDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7S0FDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxxQkFBWSxDQUFDLEtBQUssQ0FBQztLQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7S0FDN0IsUUFBUSxDQUFDLE9BQU8sRUFBRSxvQkFBWSxDQUFDO0tBQy9CLFFBQVEsQ0FBQyxTQUFTLEVBQUUsbUJBQVcsQ0FBQyxDQUFDOzs7Ozs7O0FDekVwQyw0Qzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLHdDQUE0QztBQUM1QywwQ0FBd0M7QUFHeEMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQVU7UUFDeEIsTUFBTSx1QkFBYSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUUsQ0FBQztDQUNGO0FBSlksV0FBVztJQUR2QixtQkFBVSxFQUFFO0dBQ0EsV0FBVyxDQUl2QjtBQUpZLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0p4Qix3Q0FBd0M7QUFDeEMsK0NBSXNCO0FBQ3RCLHNEQUFpRTtBQUNqRSwwQ0FBZ0Q7QUFDaEQsb0RBQXFEO0FBQ3JELGlEQU0wQjtBQUMxQixnREFBK0M7QUFFL0MsTUFBTSxVQUFVLEdBQUcscUNBQXNCLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEUsTUFBTSxVQUFVLEdBQUcscUNBQXNCLENBQUMscUJBQXFCLENBQUM7SUFDOUQsZUFBZSxFQUFFLFVBQVU7SUFDM0IsbUJBQW1CLEVBQUUsOENBQXdCO0lBQzdDLE9BQU8sRUFBRSxDQUFDLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsa0NBQWMsQ0FBQyxDQUFDLENBQUM7SUFDckQsU0FBUyxFQUFFLEVBQUU7Q0FDZCxDQUFDLENBQUM7QUFPSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFlBQTZCLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ3RELFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLDRCQUFXLENBQUMsQ0FBQztRQUMxQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSwwQkFBUyxDQUFDLENBQUM7UUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsZ0NBQWUsQ0FBQyxDQUFDO1FBQ2xELFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLDJCQUFVLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLDBDQUF5QixDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGO0FBUlksV0FBVztJQUx2QixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFDakMsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO3FDQUV3QywrQkFBZ0I7R0FEN0MsV0FBVyxDQVF2QjtBQVJZLGtDQUFXOzs7Ozs7O0FDL0J4Qix5Qzs7Ozs7Ozs7OztBQ0FBLG9EQUFxRDtBQUNyRCx5Q0FBaUM7QUFFcEIsZ0NBQXdCLEdBQUc7SUFDdEMsTUFBTSxFQUFFLEVBQUU7SUFDVixVQUFVLEVBQUUsR0FBRyxFQUFFO1FBQ2YsT0FBTyxLQUFLLFVBQVUsbUJBQW1CLENBQ3ZDLFFBQWdCLEVBQ2hCLFFBQWdCO1lBRWhCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0NBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksTUFBTSxnQkFBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzlDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CRiwwQ0FBNkU7QUFDN0UseUNBQWtDO0FBT2xDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxvQkFBVTtJQUk1QyxXQUFXLENBQUMsUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBT0Y7QUFYQztJQURDLGdDQUFzQixFQUFFOzswQ0FDZDtBQU9YO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O2dEQUN0QztBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7b0RBQ3BCO0FBWlYsY0FBYztJQUQxQixnQkFBTSxDQUFDLGtCQUFrQixDQUFDO0dBQ2QsY0FBYyxDQWExQjtBQWJZLHdDQUFjOzs7Ozs7O0FDUjNCLG1DOzs7Ozs7Ozs7O0FDQUEsK0NBQTJDO0FBQzNDLGdEQUFzRDtBQUN0RCwrQ0FBbUQ7QUFDbkQsOENBQW1EO0FBQ25ELGdFQUFtRjtBQUNuRixxREFBNkQ7QUFFN0QsTUFBYSxXQUFZLFNBQVEsMEJBQVc7SUFBNUM7O1FBQ0UsV0FBTSxHQUFHLDJCQUFXLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQUE7QUFIRCxrQ0FHQztBQUVELE1BQWEsVUFBVyxTQUFRLDBCQUFXO0lBQTNDOztRQUNFLFdBQU0sR0FBRyx5QkFBVSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FBQTtBQUhELGdDQUdDO0FBRUQsTUFBYSxTQUFVLFNBQVEsMEJBQVc7SUFBMUM7O1FBQ0UsV0FBTSxHQUFHLHVCQUFTLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsaUJBQVksR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQUc7WUFDUCxJQUFJO1lBQ0osT0FBTztZQUNQLE1BQU07WUFDTixzQkFBc0I7WUFDdEIsb0JBQW9CO1lBQ3BCLFFBQVE7U0FDVCxDQUFDO0lBQ0osQ0FBQztDQUFBO0FBWkQsOEJBWUM7QUFFRCxNQUFhLGVBQWdCLFNBQVEsMEJBQVc7SUFBaEQ7O1FBQ0UsV0FBTSxHQUFHLG9DQUFlLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUFBO0FBSEQsMENBR0M7QUFFRCxNQUFhLHlCQUEwQixTQUFRLDBCQUFXO0lBQTFEOztRQUNFLFdBQU0sR0FBRyx5REFBeUIsQ0FBQztRQUNuQyxnQkFBVyxHQUFHLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUE7QUFIRCw4REFHQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0QsaURBQXFEO0FBQ3JELHdDQUE0QztBQUM1QyxvREFBcUQ7QUFDckQsZ0RBQWtEO0FBR2xELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFNdkIsS0FBSyxDQUFDLE1BQU0sQ0FNVixRQUFnQjtRQUVoQixJQUFJLElBQUksR0FBRyxNQUFNLGtDQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sY0FBYyxHQUFHLHVCQUFPLENBQzVCLFFBQVEsUUFBUSx3REFBd0QsQ0FDekUsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ25CLE9BQU87YUFDUjtTQUNGO2FBQU07WUFDTCxJQUFJLEdBQUcsa0NBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsTUFBTSxRQUFRLEdBQVcsd0JBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDOUMsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUExQkM7SUFMQyx3QkFBTyxDQUFDO1FBQ1AsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQztJQUVDLHNDQUFVLENBQUM7UUFDVixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQzs7OzswQ0FvQkg7QUEvQlUsWUFBWTtJQUR4QixtQkFBVSxFQUFFO0dBQ0EsWUFBWSxDQWdDeEI7QUFoQ1ksb0NBQVk7Ozs7Ozs7QUNOekIsMEM7Ozs7Ozs7OztBQ0FBLHlDQUFnQztBQUNoQyxvREFBK0Q7QUFDL0QsZ0RBQXlEO0FBQ3pELHFEQUFrRTtBQUNsRSxrREFBNkQ7QUFDN0QsZ0VBQXNGO0FBQ3RGLHVEQUE0RTtBQUM1RSxxREFBd0U7QUFDeEUscURBQThEO0FBQzlELHFEQUFtRTtBQUNuRSw4Q0FBc0Q7QUFDdEQsa0RBQStEO0FBQy9ELCtDQUFzRDtBQUN0RCxlQUFNLEVBQUUsQ0FBQztBQUdULE1BQU0sS0FBSyxHQUFHO0lBQ1osVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDOUIsR0FBRyxFQUFFO1FBQ0gsYUFBYSxFQUFFLFdBQVc7S0FDM0I7Q0FDRixDQUFDO0FBRUYsTUFBTSxPQUFPLG1CQUNYLElBQUksRUFBRSxVQUFVLEVBQ2hCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSx3Q0FBd0MsRUFDbkUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFDbEQsUUFBUSxFQUFFO1FBQ1IsMkJBQVc7UUFDWCx5REFBeUI7UUFDekIsb0NBQWU7UUFDZiwrQkFBYTtRQUNiLHVCQUFTO1FBQ1Qsb0NBQWU7UUFDZiwrQkFBYTtRQUNiLHlCQUFVO1FBQ1Ysd0NBQWlCO1FBQ2pCLG9DQUFlO1FBQ2Ysa0NBQWM7UUFDZCwrQkFBVTtLQUNYLEVBQ0QsbUJBQW1CLEVBQUUsSUFBSSxFQUN6QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUNuQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDNUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7Ozs7O0FDN0N6QixtQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLHdDQUF3QztBQUN4QyxzREFBc0U7QUFDdEUsZ0VBQXNFO0FBQ3RFLG1FQUFtRjtBQUNuRixvRUFBcUY7QUFVckYsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHO0FBQWpCLGNBQWM7SUFSMUIsZUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsd0NBQWtCLENBQUM7UUFDN0IsU0FBUyxFQUFFO1lBQ1QsbURBQW1CO1lBQ25CLGdFQUE2QjtZQUM3QixrRUFBOEI7U0FDL0I7S0FDRixDQUFDO0dBQ1csY0FBYyxDQUFHO0FBQWpCLHdDQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2QzQix3Q0FBNEM7QUFDNUMsaURBQXlDO0FBQ3pDLHFEQUFrRTtBQUNsRSxpREFBbUU7QUFDbkUsOENBQWdEO0FBQ2hELDBDQUFpQztBQUdqQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUM5QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFHLENBQUM7SUFPcEQsS0FBSyxDQUFDLEdBQUc7UUFFUCxNQUFNLE1BQU0sR0FBRyxNQUFNLG9DQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLGdCQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE1BQU0sQ0FBQyxRQUFRLG9DQUFvQyxDQUFDLENBQUM7UUFHNUUsTUFBTSxRQUFRLEdBQXNCLEVBQUUsQ0FBQztRQUd2QyxNQUFNLElBQUksR0FBRyxNQUFNLG9DQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO2FBQzVELE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNyQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7YUFDN0IsTUFBTSxDQUFDLGNBQWMsQ0FBQzthQUN0QixVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7UUFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXZCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFbkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQ0FBZSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQzVCLFVBQVUsSUFBSSxDQUFDLENBQUM7aUJBQ2pCO2dCQUNELENBQUMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEI7U0FDRjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLFVBQVUsNEJBQTRCLENBQUMsQ0FBQztRQUN0RSxNQUFNLG9DQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1QseUJBQXlCLEVBQ3pCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDbkMsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixNQUFNLG9DQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsTUFBTSxjQUFjLEdBQUcsQ0FDckIsTUFBTSx1QkFBUyxDQUFDLElBQUksQ0FBQztZQUNuQixLQUFLLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUU7WUFDbkMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQzFCLENBQUMsQ0FDSCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5RCxNQUFNLHVCQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLGNBQWMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FDRjtBQXpEQztJQU5DLHdCQUFPLENBQUM7UUFDUCxPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFFBQVEsRUFDTix1SEFBdUg7UUFDekgsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs7OzhDQXlERDtBQWhFVSxtQkFBbUI7SUFEL0IsbUJBQVUsRUFBRTtxQ0FFd0IsOEJBQWE7R0FEckMsbUJBQW1CLENBaUUvQjtBQWpFWSxrREFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUmhDLGlEQUF5QztBQUN6Qyx3Q0FBNEM7QUFDNUMsa0RBQXlEO0FBQ3pELDBDQUFpQztBQUdqQyxJQUFhLDZCQUE2QixHQUExQyxNQUFhLDZCQUE2QjtJQU14QyxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sK0JBQWEsQ0FBQyxrQkFBa0IsRUFBRTthQUNyQyxNQUFNLEVBQUU7YUFDUixHQUFHLENBQUMsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDMUMsS0FBSyxDQUFDLEVBQUUsYUFBYSxFQUFFLGdCQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ2xDLGFBQWEsQ0FBQyxLQUFLLENBQUM7YUFDcEIsT0FBTyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsR0FBRyxDQUNULFdBQVcsTUFBTSwrQkFBYSxDQUFDLGtCQUFrQixFQUFFO2FBQ2hELE1BQU0sRUFBRTthQUNSLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxnQkFBTSxFQUFFLEVBQUUsQ0FBQzthQUNsQyxRQUFRLEVBQUUsVUFBVSxDQUN4QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBZEM7SUFMQyx3QkFBTyxDQUFDO1FBQ1AsT0FBTyxFQUFFLG1DQUFtQztRQUM1QyxRQUFRLEVBQUUsNkNBQTZDO1FBQ3ZELFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7Ozt5REFjRDtBQW5CVSw2QkFBNkI7SUFEekMsbUJBQVUsRUFBRTtHQUNBLDZCQUE2QixDQW9CekM7QUFwQlksc0VBQTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04xQyx3Q0FBNEM7QUFDNUMsaURBQXlDO0FBQ3pDLDhDQUFnRDtBQUdoRCxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQU16QyxLQUFLLENBQUMsR0FBRztRQUNQLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSTtnQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLHVCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLE1BQU0sS0FBSyxHQUFHLHVCQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUFqQkM7SUFMQyx3QkFBTyxDQUFDO1FBQ1AsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxRQUFRLEVBQUUsMENBQTBDO1FBQ3BELFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7Ozt5REFpQkQ7QUF0QlUsOEJBQThCO0lBRDFDLG1CQUFVLEVBQUU7R0FDQSw4QkFBOEIsQ0F1QjFDO0FBdkJZLHdFQUE4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMM0Msd0NBQW9EO0FBQ3BELDJEQUFvRTtBQWNwRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFHO0FBQXJCLGtCQUFrQjtJQVo5QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxpREFBc0IsQ0FBQztRQUNyQyxTQUFTLEVBQUUsRUFBRTtRQUNiLE9BQU8sRUFBRTtZQUNQLG1CQUFVLENBQUMsYUFBYSxDQUFDO2dCQUN2QixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDakIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsWUFBWSxFQUFFLENBQUM7aUJBQ2hCLENBQUM7YUFDSCxDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBQUc7QUFBckIsZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2YvQix5Q0FBc0U7QUFDdEUsd0NBTXdCO0FBQ3hCLGlEQUFvRDtBQUNwRCwwQ0FBcUM7QUFJckMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFDakMsWUFDVSxVQUFzQixFQUN0QixXQUF3QjtRQUR4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQy9CLENBQUM7SUFHSixLQUFLLENBQUMsZUFBZTs7UUFDbkIsTUFBTSxRQUFRLEdBQTRCO1lBQ3hDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVc7YUFDbkMsR0FBRyxDQUNGLHlFQUF5RSxDQUMxRTthQUNBLFNBQVMsRUFBRSxDQUFDO1FBQ2YsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJO1lBQ0YsTUFBTSxRQUFRLHFCQUNaLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQywwQ0FBRSxLQUFLLDBDQUFFLFVBQVUsMENBQzNELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsUUFBUSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ2xFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUkscUNBQTRCLENBQ3BDLHVCQUFjLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQzFELENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN6RSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDekUsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBM0JDO0lBREMsWUFBRyxFQUFFOzs7OzZEQTJCTDtBQWpDVSxzQkFBc0I7SUFGbEMsbUJBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0Isa0JBQVMsQ0FBQyw2QkFBWSxDQUFDO3FDQUdBLG9CQUFVO1FBQ1Qsb0JBQVc7R0FIdkIsc0JBQXNCLENBa0NsQztBQWxDWSx3REFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYm5DLHdDQUE2RTtBQU03RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUU3QixTQUFTLENBQUMsS0FBVSxFQUFFLFFBQTBCO1FBQzlDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sYUFBYSxDQUFDLEdBQVk7UUFDaEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM5QjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBbkJZLGtCQUFrQjtJQUQ5QixtQkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBbUI5QjtBQW5CWSxnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTi9CLHdDQU13QjtBQUV4Qiw2Q0FBNEM7QUFDNUMsb0NBQXdDO0FBR3hDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDdkIsc0JBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLElBQUksS0FBSyxZQUFZLHNCQUFhLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7WUFDRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoQlksY0FBYztJQUQxQixtQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWM7Ozs7Ozs7QUNaM0IsMkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAnZWxhc3RpYy1hcG0tbm9kZS9zdGFydCc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2Jvb3RzdHJhcCc7XG5cbmRlY2xhcmUgY29uc3QgbW9kdWxlOiBhbnk7XG5cbmJvb3RzdHJhcChtb2R1bGUuaG90KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGUvc3RhcnRcIik7IiwiaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUsIElOZXN0QXBwbGljYXRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwLm1vZHVsZSc7XG5pbXBvcnQgeyBTdHJpcFVuZGVmaW5lZFBpcGUgfSBmcm9tICcuL3N0cmlwVW5kZWZpbmVkLnBpcGUnO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQXBtSW50ZXJjZXB0b3IgfSBmcm9tICcuL2FwbS5pbnRlcmNlcHRvcic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKGhvdDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShBcHBNb2R1bGUsIHtcbiAgICBsb2dnZXI6IFsnZXJyb3InLCAnd2FybicsICdsb2cnLCAnZGVidWcnLCAndmVyYm9zZSddLFxuICB9KTtcbiAgYWRkR2xvYmFsc1RvQXBwKGFwcCk7XG4gIGFwcC5zZXRHbG9iYWxQcmVmaXgoJ2FwaS92MScpO1xuICBhcHAudXNlR2xvYmFsSW50ZXJjZXB0b3JzKG5ldyBBcG1JbnRlcmNlcHRvcigpKTtcblxuICBpZiAoaXNQcm9kKCkpIHtcbiAgICBjb25zb2xlLmxvZyhgUnVubmluZyBwcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS5gKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBSdW5uaW5nIG5vbi1wcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS4gVEhJUyBNU0cgU0hPVUxEIE5PVCBBUFBFQVIgT04gUFJPRCBWTWAsXG4gICAgKTtcbiAgfVxuICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICBhd2FpdCBhcHAubGlzdGVuKDMwMDIpO1xuXG4gIGlmIChob3QpIHtcbiAgICBob3QuYWNjZXB0KCk7XG4gICAgaG90LmRpc3Bvc2UoKCkgPT4gYXBwLmNsb3NlKCkpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSB0cnVlIGluIHByb2QgYW5kIGluIGludGVncmF0aW9uIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24gYWRkR2xvYmFsc1RvQXBwKGFwcDogSU5lc3RBcHBsaWNhdGlvbik6IHZvaWQge1xuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIHdoaXRlbGlzdDogdHJ1ZSxcbiAgICAgIGZvcmJpZE5vbldoaXRlbGlzdGVkOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgIH0pLFxuICApO1xuICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFN0cmlwVW5kZWZpbmVkUGlwZSgpKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBTY2hlZHVsZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgQ291cnNlTW9kdWxlIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZU1vZHVsZSB9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZHVsZSB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgU2VlZE1vZHVsZSB9IGZyb20gJy4vc2VlZC9zZWVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBZG1pbk1vZHVsZSB9IGZyb20gJy4vYWRtaW4vYWRtaW4ubW9kdWxlJztcbmltcG9ydCB7IENvbW1hbmRNb2R1bGUgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICcuL3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCAqIGFzIHR5cGVvcm1Db25maWcgZnJvbSAnLi4vb3JtY29uZmlnJztcbmltcG9ydCB7IEJhY2tmaWxsTW9kdWxlIH0gZnJvbSAnYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc01vZHVsZSB9IGZyb20gJ3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdCh0eXBlb3JtQ29uZmlnKSxcbiAgICBTY2hlZHVsZU1vZHVsZS5mb3JSb290KCksXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgUHJvZmlsZU1vZHVsZSxcbiAgICBDb3Vyc2VNb2R1bGUsXG4gICAgUXVldWVNb2R1bGUsXG4gICAgTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIFF1ZXN0aW9uTW9kdWxlLFxuICAgIFNlZWRNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZW52RmlsZVBhdGg6IFtcbiAgICAgICAgJy5lbnYnLFxuICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IFsnLmVudi5kZXZlbG9wbWVudCddIDogW10pLFxuICAgICAgXSxcbiAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIENvbW1hbmRNb2R1bGUsXG4gICAgU1NFTW9kdWxlLFxuICAgIEJhY2tmaWxsTW9kdWxlLFxuICAgIFJlbGVhc2VOb3Rlc01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3R5cGVvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9zY2hlZHVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VDb250cm9sbGVyIH0gZnJvbSAnLi9jb3Vyc2UuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBJQ2FsQ29tbWFuZCB9IGZyb20gJy4vaWNhbC5jb21tYW5kJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtDb3Vyc2VDb250cm9sbGVyXSxcbiAgaW1wb3J0czogW1F1ZXVlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbSUNhbENvbW1hbmQsIEljYWxTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgR2V0Q291cnNlUmVzcG9uc2UsXG4gIFF1ZXVlUGFydGlhbCxcbiAgUm9sZSxcbiAgVEFDaGVja291dFJlc3BvbnNlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgZ2V0UmVwb3NpdG9yeSwgTW9yZVRoYW5PckVxdWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsLCBFdmVudFR5cGUgfSBmcm9tICdwcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlUm9sZXNHdWFyZCB9IGZyb20gJy4vY291cnNlLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxuQENvbnRyb2xsZXIoJ2NvdXJzZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIENvdXJzZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5ULCBSb2xlLlRBKVxuICBhc3luYyBnZXQoQFBhcmFtKCdpZCcpIGlkOiBudW1iZXIpOiBQcm9taXNlPEdldENvdXJzZVJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogZm9yIGFsbCBjb3Vyc2UgZW5kcG9pbnQsIGNoZWNrIGlmIHRoZXkncmUgYSBzdHVkZW50IG9yIGEgVEFcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWVzJywgJ3F1ZXVlcy5zdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIC8vIFVzZSByYXcgcXVlcnkgZm9yIHBlcmZvcm1hbmNlIChhdm9pZCBlbnRpdHkgaW5zdGFudGlhdGlvbiBhbmQgc2VyaWFsaXphdGlvbilcbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ29oJylcbiAgICAgIC5zZWxlY3QoWydpZCcsICd0aXRsZScsIGBcInN0YXJ0VGltZVwiYCwgYFwiZW5kVGltZVwiYF0pXG4gICAgICAud2hlcmUoJ29oLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuXG4gICAgY291cnNlLnF1ZXVlcyA9IGF3YWl0IGFzeW5jLmZpbHRlcihcbiAgICAgIGNvdXJzZS5xdWV1ZXMsXG4gICAgICBhc3luYyAocSkgPT4gYXdhaXQgcS5jaGVja0lzT3BlbigpLFxuICAgICk7XG4gICAgYXdhaXQgYXN5bmMuZWFjaChjb3Vyc2UucXVldWVzLCBhc3luYyAocSkgPT4ge1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVRpbWVzKCk7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdXJzZTtcbiAgfVxuXG4gIEBQb3N0KCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrSW4oXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPFF1ZXVlUGFydGlhbD4ge1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIHF1ZXVlLnN0YWZmTGlzdC5wdXNoKHVzZXIpO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcblxuICAgIGF3YWl0IEV2ZW50TW9kZWwuY3JlYXRlKHtcbiAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICBldmVudFR5cGU6IEV2ZW50VHlwZS5UQV9DSEVDS0VEX0lOLFxuICAgICAgdXNlcixcbiAgICAgIGNvdXJzZUlkLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBARGVsZXRlKCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrT3V0KFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxUQUNoZWNrb3V0UmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuICAgIHF1ZXVlLnN0YWZmTGlzdCA9IHF1ZXVlLnN0YWZmTGlzdC5maWx0ZXIoKGUpID0+IGUuaWQgIT09IHVzZXIuaWQpO1xuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IGZhbHNlO1xuICAgIH1cbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCBFdmVudE1vZGVsLmNyZWF0ZSh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgZXZlbnRUeXBlOiBFdmVudFR5cGUuVEFfQ0hFQ0tFRF9PVVQsXG4gICAgICB1c2VyLFxuICAgICAgY291cnNlSWQsXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgY29uc3QgY2FuQ2xlYXJRdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVDbGVhblNlcnZpY2Uuc2hvdWxkQ2xlYW5RdWV1ZShxdWV1ZSk7XG4gICAgbGV0IG5leHRPZmZpY2VIb3VyVGltZSA9IG51bGw7XG5cbiAgICAvLyBmaW5kIG91dCBob3cgbG9uZyB1bnRpbCBuZXh0IG9mZmljZSBob3VyXG4gICAgaWYgKGNhbkNsZWFyUXVldWUpIHtcbiAgICAgIGNvbnN0IHNvb24gPSBtb21lbnQoKS5hZGQoMTUsICdtaW51dGVzJykudG9EYXRlKCk7XG4gICAgICBjb25zdCBuZXh0T2ZmaWNlSG91ciA9IGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3RhcnRUaW1lOiBNb3JlVGhhbk9yRXF1YWwoc29vbikgfSxcbiAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBuZXh0T2ZmaWNlSG91clRpbWUgPSBuZXh0T2ZmaWNlSG91cj8uc3RhcnRUaW1lO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHsgcXVldWVJZDogcXVldWUuaWQsIGNhbkNsZWFyUXVldWUsIG5leHRPZmZpY2VIb3VyVGltZSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBUeXBlIH0gZnJvbSBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XG5pbXBvcnQge1xuICBJc0Jvb2xlYW4sXG4gIElzRGVmaW5lZCxcbiAgSXNFbnVtLFxuICBJc0ludCxcbiAgSXNOb3RFbXB0eSxcbiAgSXNPcHRpb25hbCxcbiAgSXNTdHJpbmcsXG4gIFZhbGlkYXRlSWYsXG59IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcblxuZXhwb3J0IGNvbnN0IFBST0RfVVJMID0gXCJodHRwczovL2tob3VyeW9mZmljZWhvdXJzLmNvbVwiO1xuZXhwb3J0IGNvbnN0IGlzUHJvZCA9ICgpOiBib29sZWFuID0+XG4gIHByb2Nlc3MuZW52LkRPTUFJTiA9PT0gUFJPRF9VUkwgfHxcbiAgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Py5sb2NhdGlvbj8ub3JpZ2luID09PSBQUk9EX1VSTCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFQSSBCYXNlIERhdGEgVHlwZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gTk9URTogVGhlc2UgYXJlIG5vdCB0aGUgREIgZGF0YSB0eXBlcy4gVGhleSBhcmUgb25seSB1c2VkIGZvciB0aGUgYXBpXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHVzZXIuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBlbWFpbCBzdHJpbmcgb2YgdGhlIHVzZXIgaWYgdGhleSBwcm92aWRlIGl0IChudWxsYWJsZSlcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqIEBwYXJhbSBjb3Vyc2VzIC0gVGhlIGxpc3Qgb2YgY291cnNlcyB0aGF0IHRoZSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCAoYXMgZWl0aGVyIGEgJ3N0dWRlbnQnLCAndGEnIG9yICdwcm9mZXNzb3InKVxuICogQHBhcmFtIGRlc2t0b3BOb3RpZnMgLSBsaXN0IG9mIGVuZHBvaW50cyBzbyB0aGF0IGZyb250ZW5kIGNhbiBmaWd1cmUgb3V0IGlmIGRldmljZSBpcyBlbmFibGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsITogc3RyaW5nO1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIGxhc3ROYW1lPzogc3RyaW5nO1xuICBuYW1lITogc3RyaW5nO1xuICBwaG90b1VSTCE6IHN0cmluZztcbiAgY291cnNlcyE6IFVzZXJDb3Vyc2VbXTtcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERlc2t0b3BOb3RpZlBhcnRpYWwpXG4gIGRlc2t0b3BOb3RpZnMhOiBEZXNrdG9wTm90aWZQYXJ0aWFsW107XG5cbiAgcGhvbmVOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcbiAgcGhvbmVOdW1iZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVuZHBvaW50ITogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBwYXJ0aWFsIHVzZXIgaW5mbyBuZWVkZWQgYnkgdGhlIGZyb250ZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICovXG5leHBvcnQgY2xhc3MgVXNlclBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWw/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob3RvVVJMPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWFsIGNvdXJzZSBkYXRhIG5lZWRlZCBvbiB0aGUgZnJvbnQgZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKi9cbmV4cG9ydCB0eXBlIENvdXJzZVBhcnRpYWwgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSB0aGF0IGEgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggYW5kIHRoZWlyIHJvbGUgaW4gdGhhdCBjb3Vyc2VcbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoZSB1c2VyIGFjY29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSByb2xlIC0gVGhlIHVzZXIncyByb2xlIGluIHRoZSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCB0eXBlIFVzZXJDb3Vyc2UgPSB7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9sZTogUm9sZTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgdXNlciByb2xlcyBpbiBhIGNvdXJzZS5cbiAqL1xuZXhwb3J0IGVudW0gUm9sZSB7XG4gIFNUVURFTlQgPSBcInN0dWRlbnRcIixcbiAgVEEgPSBcInRhXCIsXG4gIFBST0ZFU1NPUiA9IFwicHJvZmVzc29yXCIsXG59XG5cbmNsYXNzIE9mZmljZUhvdXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHRpdGxlITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZSE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZSE6IERhdGU7XG59XG5cbi8qKlxuICogQSBRdWV1ZSB0aGF0IHN0dWRlbnRzIGNhbiBqb2luIHdpdGggdGhpZXIgdGlja2V0cy5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhhdCB0aGlzIG9mZmljZSBob3VycyBxdWV1ZSBpcyBmb3IuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gcXVlc3Rpb25zIC0gVGhlIGxpc3Qgb2YgdGhlIHN0dWRlbnRzIHF1ZXN0aW9ucyBhc3NvY2FpdGVkIHdpdGggdGhlIHF1ZXVlLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb29tOiBzdHJpbmc7XG4gIHN0YWZmTGlzdDogVXNlclBhcnRpYWxbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBzdGFydFRpbWU/OiBEYXRlO1xuICBlbmRUaW1lPzogRGF0ZTtcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWV1ZSBwYXJ0aWFsIHRvIGJlIHNob3duIG9uIHRoZSB0b2RheSBwYWdlLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZVBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgcm9vbSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgc3RhZmZMaXN0ITogVXNlclBhcnRpYWxbXTtcblxuICBxdWV1ZVNpemUhOiBudW1iZXI7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBpc09wZW4hOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZT86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZT86IERhdGU7XG5cbiAgYWxsb3dRdWVzdGlvbnMhOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgUXVlc3Rpb24gaXMgY3JlYXRlZCB3aGVuIGEgc3R1ZGVudCB3YW50cyBoZWxwIGZyb20gYSBUQS5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIHN0dWRlbnQgcXVlc3Rpb24uXG4gKiBAcGFyYW0gY3JlYXRvciAtIFRoZSBTdHVkZW50IHRoYXQgaGFzIGNyZWF0ZWQgdGhlIHF1ZXN0aW9uLlxuICogQHBhcmFtIHRleHQgLSBUaGUgdGV4dCBkZXNjcml0aXBuIG9mIHdoYXQgaGUvc2hlIG5lZWRzIGhlbHAgd2l0aC5cbiAqIEBwYXJhbSBjcmVhdGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRpY2tldCB3YXMgY3JlYXRlZC4gRXg6IFwiMjAyMC0wOS0xMlQxMjowMDowMC0wNDowMFwiXG4gKiBAcGFyYW0gaGVscGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGJlZ2FuIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gY2xvc2VkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGZpbmlzaGVkIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gcXVlc3Rpb25UeXBlIC0gVGhlIHF1ZXN0aW9uIHR5cGUgaGVscHMgZGlzdGluZ3Vpc2ggcXVlc3Rpb24gZm9yIFRBJ3MgYW5kIGRhdGEgaW5zaWdodHMuXG4gKiBAcGFyYW0gc3RhdHVzIC0gVGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGlzIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiBvZiB0aGUgcGFydGljdWxhciBzdHVkZW50LCB0byBoZWxwIFRBJ3MgZmluZCB0aGVtXG4gKiBAcGFyYW0gaXNPbmxpbmUgLSBXZXRoZXIgb3Igbm90IHRoZSBxdWVzdGlvbiB3aWxsIGhlbHBlZCBvbmxpbmUgb3IgaW4tcGVyc29uXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbiB7XG4gIGlkITogbnVtYmVyO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBjcmVhdG9yITogVXNlclBhcnRpYWw7XG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIHRhSGVscGVkPzogVXNlclBhcnRpYWw7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY3JlYXRlZEF0ITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBoZWxwZWRBdD86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY2xvc2VkQXQ/OiBEYXRlO1xuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG4gIHN0YXR1cyE6IFF1ZXN0aW9uU3RhdHVzO1xuICBsb2NhdGlvbj86IHN0cmluZztcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xufVxuXG4vLyBRdWVzdGlvbiBUeXBlc1xuZXhwb3J0IGVudW0gUXVlc3Rpb25UeXBlIHtcbiAgQ29uY2VwdCA9IFwiQ29uY2VwdFwiLFxuICBDbGFyaWZpY2F0aW9uID0gXCJDbGFyaWZpY2F0aW9uXCIsXG4gIFRlc3RpbmcgPSBcIlRlc3RpbmdcIixcbiAgQnVnID0gXCJCdWdcIixcbiAgU2V0dXAgPSBcIlNldHVwXCIsXG4gIE90aGVyID0gXCJPdGhlclwiLFxufVxuXG5leHBvcnQgZW51bSBPcGVuUXVlc3Rpb25TdGF0dXMge1xuICBEcmFmdGluZyA9IFwiRHJhZnRpbmdcIixcbiAgUXVldWVkID0gXCJRdWV1ZWRcIixcbiAgSGVscGluZyA9IFwiSGVscGluZ1wiLFxuICBQcmlvcml0eVF1ZXVlZCA9IFwiUHJpb3JpdHlRdWV1ZWRcIixcbn1cblxuLyoqXG4gKiBMaW1ibyBzdGF0dXNlcyBhcmUgYXdhaXRpbmcgc29tZSBjb25maXJtYXRpb24gZnJvbSB0aGUgc3R1ZGVudFxuICovXG5leHBvcnQgZW51bSBMaW1ib1F1ZXN0aW9uU3RhdHVzIHtcbiAgQ2FudEZpbmQgPSBcIkNhbnRGaW5kXCIsIC8vIHJlcHJlc2VudHMgd2hlbiBhIHN0dWRlbnQgY2FuJ3QgYmUgZm91bmQgYnkgYSBUQVxuICBSZVF1ZXVlaW5nID0gXCJSZVF1ZXVlaW5nXCIsIC8vIHJlcHJlc2VudHMgd2hlbiBhIFRBIHdhbnRzIHRvIGdldCBiYWNrIHRvIGEgc3R1ZGVudCBsYXRlciBhbmQgZ2l2ZSB0aGVtIHRoZSBvcHRpb24gdG8gYmUgcHV0IGludG8gdGhlIHByaW9yaXR5IHF1ZXVlXG4gIFRBRGVsZXRlZCA9IFwiVEFEZWxldGVkXCIsIC8vIFdoZW4gYSBUQSBkZWxldGVzIGEgcXVlc3Rpb24gZm9yIGEgbXVsdGl0dWRlIG9mIHJlYXNvbnNcbn1cblxuZXhwb3J0IGVudW0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMge1xuICBSZXNvbHZlZCA9IFwiUmVzb2x2ZWRcIixcbiAgQ29uZmlybWVkRGVsZXRlZCA9IFwiQ29uZmlybWVkRGVsZXRlZFwiLFxuICBTdHVkZW50Q2FuY2VsbGVkID0gXCJTdHVkZW50Q2FuY2VsbGVkXCIsXG4gIFN0YWxlID0gXCJTdGFsZVwiLFxufVxuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5RdWV1ZSA9IFtcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUHJpb3JpdHlRdWV1ZSA9IFtPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWRdO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzU2VudFRvQ3JlYXRvciA9IFtcbiAgLi4uU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICAuLi5TdGF0dXNJblF1ZXVlLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCxcbl07XG5cbi8vIFRpY2tldCBTdGF0dXMgLSBSZXByZXNlbnRzIGEgZ2l2ZW4gc3RhdHVzIG9mIGFzIHN0dWRlbnQncyB0aWNrZXRcbmV4cG9ydCB0eXBlIFF1ZXN0aW9uU3RhdHVzID0ga2V5b2YgdHlwZW9mIFF1ZXN0aW9uU3RhdHVzS2V5cztcbi8vIGFuIEVudW0tbGlrZSBjb25zdGFudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgc3RhdHVzZXMgZm9yIGNvbnZlbmllbmNlLlxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uU3RhdHVzS2V5cyA9IHtcbiAgLi4uT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAuLi5DbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgLi4uTGltYm9RdWVzdGlvblN0YXR1cyxcbn07XG5cbi8qKlxuICogQSBTZW1lc3RlciBvYmplY3QsIHJlcHJlc2VudGluZyBhIHNjaGVkdWxlIHNlbWVzdGVyIHRlcm0gZm9yIHRoZSBwdXJwb3NlcyBvZiBhIGNvdXJzZS5cbiAqIEBwYXJhbSBzZWFzb24gLSBUaGUgc2Vhc29uIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKiBAcGFyYW0geWVhciAtIFRoZSB5ZWFyIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKi9cbmludGVyZmFjZSBTZW1lc3RlciB7XG4gIHNlYXNvbjogU2Vhc29uO1xuICB5ZWFyOiBudW1iZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhlIHNlYXNvbnMgaW4gd2hpY2ggYSBjb3Vyc2UgY2FuIHRha2UgcGxhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIFNlYXNvbiA9IFwiRmFsbFwiIHwgXCJTcHJpbmdcIiB8IFwiU3VtbWVyIDFcIiB8IFwiU3VtbWVyIDJcIjtcblxuZXhwb3J0IHR5cGUgRGVza3RvcE5vdGlmQm9keSA9IHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgZXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIGtleXM6IHtcbiAgICBwMjU2ZGg6IHN0cmluZztcbiAgICBhdXRoOiBzdHJpbmc7XG4gIH07XG4gIG5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQaG9uZU5vdGlmQm9keSA9IHtcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT0gQVBJIFJvdXRlIFR5cGVzID09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT24gYmFja2VuZCwgdmFsaWRhdGVkIHdpdGggaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20vdGVjaG5pcXVlcy92YWxpZGF0aW9uXG4vLyBBUEkgcm91dGUgUGFyYW1zIGFuZCBSZXNwb25zZXNcblxuLy8gT2ZmaWNlIEhvdXJzIFJlc3BvbnNlIFR5cGVzXG5leHBvcnQgY2xhc3MgR2V0UHJvZmlsZVJlc3BvbnNlIGV4dGVuZHMgVXNlciB7fVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5RGF0YVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIGVtYWlsITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGZpcnN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgbGFzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc0ludCgpXG4gIGNhbXB1cyE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc1N0cmluZygpXG4gIHBob3RvX3VybCE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICBjb3Vyc2VzITogS2hvdXJ5U3R1ZGVudENvdXJzZVtdO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIHRhX2NvdXJzZXMhOiBLaG91cnlUQUNvdXJzZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5U3R1ZGVudENvdXJzZSB7XG4gIEBJc0ludCgpXG4gIGNybiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFjY2VsZXJhdGVkITogYm9vbGVhbjtcblxuICBASXNJbnQoKVxuICBzZWN0aW9uITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHRpdGxlITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5VEFDb3Vyc2Uge1xuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSB7XG4gIHJlZGlyZWN0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9maWxlUGFyYW1zIHtcbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIHBob25lTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQFZhbGlkYXRlSWYoKG8pID0+IG8ucGhvbmVOb3RpZnNFbmFibGVkKVxuICBASXNTdHJpbmcoKVxuICBASXNOb3RFbXB0eSgpXG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgZmlyc3ROYW1lPzogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VSZXNwb25zZSB7XG4gIGlkITogbnVtYmVyO1xuICBuYW1lITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IE9mZmljZUhvdXJQYXJ0aWFsKVxuICBvZmZpY2VIb3VycyE6IEFycmF5PE9mZmljZUhvdXJQYXJ0aWFsPjtcblxuICBAVHlwZSgoKSA9PiBRdWV1ZVBhcnRpYWwpXG4gIHF1ZXVlcyE6IFF1ZXVlUGFydGlhbFtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVldWVSZXNwb25zZSBleHRlbmRzIFF1ZXVlUGFydGlhbCB7fVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUXVldWVzUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWV1ZVBhcnRpYWw+IHt9XG5cbmV4cG9ydCBjbGFzcyBMaXN0UXVlc3Rpb25zUmVzcG9uc2Uge1xuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgeW91clF1ZXN0aW9uPzogUXVlc3Rpb247XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXN0aW9uc0dldHRpbmdIZWxwITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcHJpb3JpdHlRdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICB0ZXh0ITogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBxdWV1ZUlkITogbnVtYmVyO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBmb3JjZSE6IGJvb2xlYW47XG59XG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgdGV4dD86IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgQElzT3B0aW9uYWwoKVxuICBxdWV1ZUlkPzogbnVtYmVyO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25TdGF0dXNLZXlzKVxuICBASXNPcHRpb25hbCgpXG4gIHN0YXR1cz86IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgdHlwZSBUQVVwZGF0ZVN0YXR1c1Jlc3BvbnNlID0gUXVldWVQYXJ0aWFsO1xuZXhwb3J0IHR5cGUgUXVldWVOb3RlUGF5bG9hZFR5cGUgPSB7XG4gIG5vdGVzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVEFDaGVja291dFJlc3BvbnNlIHtcbiAgLy8gVGhlIElEIG9mIHRoZSBxdWV1ZSB3ZSBjaGVja2VkIG91dCBvZlxuICBxdWV1ZUlkITogbnVtYmVyO1xuICBjYW5DbGVhclF1ZXVlITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBuZXh0T2ZmaWNlSG91clRpbWU/OiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVldWVQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIG5vdGVzPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhbGxvd1F1ZXN0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTU0VRdWV1ZVJlc3BvbnNlIHtcbiAgcXVldWU/OiBHZXRRdWV1ZVJlc3BvbnNlO1xuICBxdWVzdGlvbnM/OiBMaXN0UXVlc3Rpb25zUmVzcG9uc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvQm9keSB7XG4gIFRvQ291bnRyeTogc3RyaW5nO1xuICBUb1N0YXRlOiBzdHJpbmc7XG4gIFNtc01lc3NhZ2VTaWQ6IHN0cmluZztcbiAgTnVtTWVkaWE6IHN0cmluZztcbiAgVG9DaXR5OiBzdHJpbmc7XG4gIEZyb21aaXA6IHN0cmluZztcbiAgU21zU2lkOiBzdHJpbmc7XG4gIEZyb21TdGF0ZTogc3RyaW5nO1xuICBTbXNTdGF0dXM6IHN0cmluZztcbiAgRnJvbUNpdHk6IHN0cmluZztcbiAgQm9keTogc3RyaW5nO1xuICBGcm9tQ291bnRyeTogc3RyaW5nO1xuICBUbzogc3RyaW5nO1xuICBUb1ppcDogc3RyaW5nO1xuICBOdW1TZWdtZW50czogc3RyaW5nO1xuICBNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIEFjY291bnRTaWQ6IHN0cmluZztcbiAgRnJvbTogc3RyaW5nO1xuICBBcGlWZXJzaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2Uge1xuICByZWxlYXNlTm90ZXM6IHVua25vd247XG4gIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEVSUk9SX01FU1NBR0VTID0ge1xuICBxdWVzdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBjcmVhdGVRdWVzdGlvbjoge1xuICAgICAgaW52YWxpZFF1ZXVlOiBcIlBvc3RlZCB0byBhbiBpbnZhbGlkIHF1ZXVlXCIsXG4gICAgICBub05ld1F1ZXN0aW9uczogXCJRdWV1ZSBub3QgYWxsb3dpbmcgbmV3IHF1ZXN0aW9uc1wiLFxuICAgICAgY2xvc2VkUXVldWU6IFwiUXVldWUgaXMgY2xvc2VkXCIsXG4gICAgICBvbmVRdWVzdGlvbkF0QVRpbWU6IFwiWW91IGNhbid0IGNyZWF0ZSBtb3JlIHRoYW4gb25lIHF1ZXN0aW9uIGF0IGEgdGltZS5cIixcbiAgICB9LFxuICAgIHVwZGF0ZVF1ZXN0aW9uOiB7XG4gICAgICBmc21WaW9sYXRpb246IChcbiAgICAgICAgcm9sZTogc3RyaW5nLFxuICAgICAgICBxdWVzdGlvblN0YXR1czogc3RyaW5nLFxuICAgICAgICBib2R5U3RhdHVzOiBzdHJpbmdcbiAgICAgICk6IHN0cmluZyA9PlxuICAgICAgICBgJHtyb2xlfSBjYW5ub3QgY2hhbmdlIHN0YXR1cyBmcm9tICR7cXVlc3Rpb25TdGF0dXN9IHRvICR7Ym9keVN0YXR1c31gLFxuICAgICAgdGFPbmx5RWRpdFF1ZXN0aW9uU3RhdHVzOiBcIlRBL1Byb2Zlc3NvcnMgY2FuIG9ubHkgZWRpdCBxdWVzdGlvbiBzdGF0dXNcIixcbiAgICAgIG90aGVyVEFIZWxwaW5nOiBcIkFub3RoZXIgVEEgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICBvdGhlclRBUmVzb2x2ZWQ6IFwiQW5vdGhlciBUQSBoYXMgYWxyZWFkeSByZXNvbHZlZCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICB0YUhlbHBpbmdPdGhlcjogXCJUQSBpcyBhbHJlYWR5IGhlbHBpbmcgc29tZW9uZSBlbHNlXCIsXG4gICAgICBsb2dpblVzZXJDYW50RWRpdDogXCJMb2dnZWQtaW4gdXNlciBkb2VzIG5vdCBoYXZlIGVkaXQgYWNjZXNzXCIsXG4gICAgfSxcbiAgfSxcbiAgbG9naW5Db250cm9sbGVyOiB7XG4gICAgcmVjZWl2ZURhdGFGcm9tS2hvdXJ5OiBcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmVcIixcbiAgfSxcbiAgbm90aWZpY2F0aW9uQ29udHJvbGxlcjoge1xuICAgIG1lc3NhZ2VOb3RGcm9tVHdpbGlvOiBcIk1lc3NhZ2Ugbm90IGZyb20gVHdpbGlvXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvblNlcnZpY2U6IHtcbiAgICByZWdpc3RlclBob25lOiBcInBob25lIG51bWJlciBpbnZhbGlkXCIsXG4gIH0sXG4gIHF1ZXN0aW9uUm9sZUd1YXJkOiB7XG4gICAgcXVlc3Rpb25Ob3RGb3VuZDogXCJRdWVzdGlvbiBub3QgZm91bmRcIixcbiAgICBxdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZDogXCJDYW5ub3QgZmluZCBxdWV1ZSBvZiBxdWVzdGlvblwiLFxuICAgIHF1ZXVlRG9lc05vdEV4aXN0OiBcIlRoaXMgcXVldWUgZG9lcyBub3QgZXhpc3QhXCIsXG4gIH0sXG4gIHF1ZXVlUm9sZUd1YXJkOiB7XG4gICAgcXVldWVOb3RGb3VuZDogXCJRdWV1ZSBub3QgZm91bmRcIixcbiAgfSxcbiAgcmVsZWFzZU5vdGVzQ29udHJvbGxlcjoge1xuICAgIHJlbGVhc2VOb3Rlc1RpbWU6IChlOiBhbnkpOiBzdHJpbmcgPT5cbiAgICAgIFwiRXJyb3IgUGFyc2luZyByZWxlYXNlIG5vdGVzIHRpbWU6IFwiICsgZSxcbiAgfSxcbiAgcm9sZUd1YXJkOiB7XG4gICAgbm90TG9nZ2VkSW46IFwiTXVzdCBiZSBsb2dnZWQgaW5cIixcbiAgICBub0NvdXJzZUlkRm91bmQ6IFwiTm8gY291cnNlaWQgZm91bmRcIixcbiAgICBub3RJbkNvdXJzZTogXCJOb3QgSW4gVGhpcyBDb3Vyc2VcIixcbiAgICBtdXN0QmVSb2xlVG9Kb2luQ291cnNlOiAocm9sZXM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gICAgICBgWW91IG11c3QgaGF2ZSBvbmUgb2Ygcm9sZXMgWyR7cm9sZXMuam9pbihcIiwgXCIpfV0gdG8gYWNjZXNzIHRoaXMgY291cnNlYCxcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy10cmFuc2Zvcm1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsImltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBFdmVudCBpbiB0aGUgRXZlbnRNb2RlbCB0YWJsZSwgdXNlZCBmb3IgYWR2YW5jZWQgbWV0cmljcy5cbiAqL1xuZXhwb3J0IGVudW0gRXZlbnRUeXBlIHtcbiAgVEFfQ0hFQ0tFRF9JTiA9ICd0YUNoZWNrZWRJbicsXG4gIFRBX0NIRUNLRURfT1VUID0gJ3RhQ2hlY2tlZE91dCcsXG59XG5cbkBFbnRpdHkoJ2V2ZW50X21vZGVsJylcbmV4cG9ydCBjbGFzcyBFdmVudE1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdGltZTogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ2VudW0nLCBlbnVtOiBFdmVudFR5cGUgfSlcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5ldmVudHMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zZW1lc3Rlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgaW4gdGhlIGNvbnRleHQgb2Ygb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICogQHBhcmFtIHNlbWVzdGVyIC0gVGhlIHNlbWVzdGVyIG9mIHRoaXMgY291cnNlLlxuICovXG4vKmludGVyZmFjZSBDb3Vyc2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNlbWVzdGVyOiBTZW1lc3RlcjtcbiAgICB1c2VyczogVXNlckNvdXJzZVtdXG59Ki9cblxuQEVudGl0eSgnY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLmNvdXJzZSlcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLmNvdXJzZSlcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGljYWxVUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS5jb3Vyc2UpXG4gIEBFeGNsdWRlKClcbiAgdXNlckNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbDtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBTZW1lc3Rlck1vZGVsLCAoc2VtZXN0ZXIpID0+IHNlbWVzdGVyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3NlbWVzdGVySWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgc2VtZXN0ZXI6IFNlbWVzdGVyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgLy8gVE9ETzogY2FuIHdlIG1ha2UgdGhlc2Ugbm90IG51bGxhYmxlIGFuZCB3b3JrIHdpdGggVHlwZU9STVxuICBzZW1lc3RlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbignYm9vbGVhbicsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZW5hYmxlZDogYm9vbGVhbjsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIGdpdmVuIHRoZSBjb3Vyc2UgaXMgdXNpbmcgb3VyIGFwcFxuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQuY291cnNlKVxuICBARXhjbHVkZSgpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgndXNlcl9jb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS51c2VyQ291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogUm9sZSwgZGVmYXVsdDogUm9sZS5TVFVERU5UIH0pXG4gIHJvbGU6IFJvbGU7XG59XG4iLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIE1hbnlUb01hbnksXG4gIE9uZVRvTWFueSxcbiAgT25lVG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3VzZXItY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBmaXJzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsYXN0TmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG90b1VSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgY291cnNlczogVXNlckNvdXJzZU1vZGVsW107XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIGRlc2t0b3BzP1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgcGhvbmU/XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gRGVza3RvcE5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZNb2RlbFtdO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gUGhvbmVOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZjogUGhvbmVOb3RpZk1vZGVsO1xuXG4gIEBFeGNsdWRlKClcbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUuc3RhZmZMaXN0KVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcblxuICBARXhjbHVkZSgpXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQudXNlcilcbiAgZXZlbnRzOiBFdmVudE1vZGVsW107XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBDcmVhdGVEYXRlQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdkZXNrdG9wX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGV4cGlyYXRpb25UaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwMjU2ZGg6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgYXV0aDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZGVza3RvcE5vdGlmcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgdHlwZTogJ3RpbWVzdGFtcCcgfSlcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAndGV4dCcsIG51bGxhYmxlOiB0cnVlIH0pXG4gIG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgncGhvbmVfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFBob25lTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnBob25lTm90aWYpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdmVyaWZpZWQ6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTGVzc1RoYW5PckVxdWFsLFxuICBNYW55VG9NYW55LFxuICBNYW55VG9PbmUsXG4gIE1vcmVUaGFuT3JFcXVhbCxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuXG5pbnRlcmZhY2UgVGltZUludGVydmFsIHtcbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xufVxuXG5ARW50aXR5KCdxdWV1ZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVldWVNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5xdWV1ZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHJvb206IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWVzdGlvbk1vZGVsLCAocW0pID0+IHFtLnF1ZXVlKVxuICBARXhjbHVkZSgpXG4gIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIG5vdGVzOiBzdHJpbmc7XG5cbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucXVldWVzKVxuICBASm9pblRhYmxlKClcbiAgc3RhZmZMaXN0OiBVc2VyTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2gucXVldWUpXG4gIEBKb2luVGFibGUoKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xuXG4gIGlzT3BlbjogYm9vbGVhbjtcblxuICBhc3luYyBjaGVja0lzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zdGFmZkxpc3QgJiYgdGhpcy5zdGFmZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgTVNfSU5fTUlOVVRFID0gNjAwMDA7XG4gICAgY29uc3Qgb2hzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IG9wZW4gPSAhIW9ocy5maW5kKFxuICAgICAgKGUpID0+XG4gICAgICAgIGUuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDEwICogTVNfSU5fTUlOVVRFIDwgbm93LmdldFRpbWUoKSAmJlxuICAgICAgICBlLmVuZFRpbWUuZ2V0VGltZSgpICsgMSAqIE1TX0lOX01JTlVURSA+IG5vdy5nZXRUaW1lKCksXG4gICAgKTtcbiAgICB0aGlzLmlzT3BlbiA9IG9wZW47XG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBxdWV1ZVNpemU6IG51bWJlcjtcblxuICBhc3luYyBhZGRRdWV1ZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5xdWV1ZVNpemUgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKHRoaXMuaWQpLmdldENvdW50KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkUXVldWVUaW1lcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCB0aGlzLmdldE9mZmljZUhvdXJzKCk7XG4gICAgY29uc3QgdGltZUludGVydmFscyA9IHRoaXMuZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKG9mZmljZUhvdXJzKTtcbiAgICBjb25zdCBjdXJyVGltZSA9IHRpbWVJbnRlcnZhbHMuZmluZCgoZ3JvdXApID0+IHtcbiAgICAgIC8vIEZpbmQgYSB0aW1lIGludGVydmFsIHdpdGhpbiAxNSBtaW51dGVzIG9mIGJvdW5kcyB0byBhY2NvdW50IGZvciBUQSBlZGdlIGNhc2VzXG4gICAgICBjb25zdCBsb3dlckJvdW5kID0gZ3JvdXAuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDE1ICogNjAgKiAxMDAwO1xuICAgICAgY29uc3QgdXBwZXJCb3VuZCA9IGdyb3VwLmVuZFRpbWUuZ2V0VGltZSgpICsgMTUgKiA2MCAqIDEwMDA7XG4gICAgICByZXR1cm4gbG93ZXJCb3VuZCA8PSBub3cuZ2V0VGltZSgpICYmIHVwcGVyQm91bmQgPj0gbm93LmdldFRpbWUoKTtcbiAgICB9KTtcblxuICAgIGlmIChjdXJyVGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBjdXJyVGltZS5zdGFydFRpbWU7XG4gICAgICB0aGlzLmVuZFRpbWUgPSBjdXJyVGltZS5lbmRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBPZmZpY2UgaG91cnMgaW4gYSA3MmhyIHdpbmRvdyBhcm91bmQgbm93LCBzbmFwcGVkIHRvIG1pZG5pZ2h0XG4gIHByaXZhdGUgYXN5bmMgZ2V0T2ZmaWNlSG91cnMoKTogUHJvbWlzZTxPZmZpY2VIb3VyTW9kZWxbXT4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBsb3dlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuICAgIGxvd2VyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICBjb25zdCB1cHBlckJvdW5kID0gbmV3IERhdGUobm93KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMjQpO1xuICAgIHVwcGVyQm91bmQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmZpbmQoe1xuICAgICAgd2hlcmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHF1ZXVlSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgc3RhcnRUaW1lOiBNb3JlVGhhbk9yRXF1YWwobG93ZXJCb3VuZCksXG4gICAgICAgICAgZW5kVGltZTogTGVzc1RoYW5PckVxdWFsKHVwcGVyQm91bmQpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIG9yZGVyOiB7XG4gICAgICAgIHN0YXJ0VGltZTogJ0FTQycsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1lcmdlZFRpbWVJbnRlcnZhbHMoXG4gICAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdLFxuICApOiBUaW1lSW50ZXJ2YWxbXSB7XG4gICAgY29uc3QgdGltZUludGVydmFsczogVGltZUludGVydmFsW10gPSBbXTtcbiAgICBvZmZpY2VIb3Vycy5mb3JFYWNoKChvZmZpY2VIb3VyKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRpbWVJbnRlcnZhbHMubGVuZ3RoID09IDAgfHxcbiAgICAgICAgb2ZmaWNlSG91ci5zdGFydFRpbWUgPiB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV0uZW5kVGltZVxuICAgICAgKSB7XG4gICAgICAgIHRpbWVJbnRlcnZhbHMucHVzaCh7XG4gICAgICAgICAgc3RhcnRUaW1lOiBvZmZpY2VIb3VyLnN0YXJ0VGltZSxcbiAgICAgICAgICBlbmRUaW1lOiBvZmZpY2VIb3VyLmVuZFRpbWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZHcm91cCA9IHRpbWVJbnRlcnZhbHNbdGltZUludGVydmFscy5sZW5ndGggLSAxXTtcbiAgICAgIHByZXZHcm91cC5lbmRUaW1lID1cbiAgICAgICAgb2ZmaWNlSG91ci5lbmRUaW1lID4gcHJldkdyb3VwLmVuZFRpbWVcbiAgICAgICAgICA/IG9mZmljZUhvdXIuZW5kVGltZVxuICAgICAgICAgIDogcHJldkdyb3VwLmVuZFRpbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGltZUludGVydmFscztcbiAgfVxuXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgZmlndXJlIG91dCBob3cgc3RhZmYgZ2V0IHNlbnQgdG8gRkUgYXMgd2VsbFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQgeyBRdWVzdGlvblN0YXR1cywgUXVlc3Rpb25UeXBlLCBSb2xlLCBTdGF0dXNJblF1ZXVlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFNlbGVjdFF1ZXJ5QnVpbGRlcixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXMgfSBmcm9tICcuL3F1ZXN0aW9uLWZzbSc7XG5cbkBFbnRpdHkoJ3F1ZXN0aW9uX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5xdWVzdGlvbnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3F1ZXVlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWU6IFF1ZXVlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWVJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICB0ZXh0OiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjcmVhdG9ySWQnIH0pXG4gIGNyZWF0b3I6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjcmVhdG9ySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3RhSGVscGVkSWQnIH0pXG4gIHRhSGVscGVkOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgdGFIZWxwZWRJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGZpcnN0IGhlbHBlZCAoZG9lc24ndCBvdmVyd3JpdGUpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGZpcnN0SGVscGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGxhc3QgaGVscGVkIChnZXR0aW5nIGhlbHAgYWdhaW4gb24gcHJpb3JpdHkgcXVldWUgb3ZlcndyaXRlcylcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIGxlYXZlcyB0aGUgcXVldWVcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlIHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGFzIHRoZSBnaXZlbiByb2xlXG4gICAqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgc3RhdHVzIGNoYW5nZSBzdWNjZWVkZWRcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTdGF0dXMobmV3U3RhdHVzOiBRdWVzdGlvblN0YXR1cywgcm9sZTogUm9sZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyh0aGlzLnN0YXR1cywgbmV3U3RhdHVzLCByb2xlKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBpblF1ZXVlV2l0aFN0YXR1cyhcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgc3RhdHVzZXM6IFF1ZXN0aW9uU3RhdHVzW10sXG4gICk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnF1ZXVlSWQgPSA6cXVldWVJZCcsIHsgcXVldWVJZCB9KVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXNlcyknLCB7XG4gICAgICAgIHN0YXR1c2VzLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cblxuICAvKipcbiAgICogUXVlc3Rpb25zIHRoYXQgYXJlIG9wZW4gaW4gdGhlIHF1ZXVlIChub3QgaW4gcHJpb3JpdHkgcXVldWUpXG4gICAqL1xuICBzdGF0aWMgd2FpdGluZ0luUXVldWUocXVldWVJZDogbnVtYmVyKTogU2VsZWN0UXVlcnlCdWlsZGVyPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBTdGF0dXNJblF1ZXVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXMsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcblxuaW50ZXJmYWNlIEFsbG93YWJsZVRyYW5zaXRpb25zIHtcbiAgc3R1ZGVudD86IFF1ZXN0aW9uU3RhdHVzW107XG4gIHRhPzogUXVlc3Rpb25TdGF0dXNbXTtcbn1cblxuY29uc3QgUVVFVUVfVFJBTlNJVElPTlM6IEFsbG93YWJsZVRyYW5zaXRpb25zID0ge1xuICB0YTogW09wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLCBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF0sXG4gIHN0dWRlbnQ6IFtcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gIF0sXG59O1xuXG5jb25zdCBRVUVTVElPTl9TVEFURVM6IFJlY29yZDxRdWVzdGlvblN0YXR1cywgQWxsb3dhYmxlVHJhbnNpdGlvbnM+ID0ge1xuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkXTogUVVFVUVfVFJBTlNJVElPTlMsXG4gIFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZ106IHtcbiAgICB0YTogW1xuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZyxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkLFxuICAgICAgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQsXG4gICAgXSxcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmddOiB7XG4gICAgc3R1ZGVudDogW1xuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW0xpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkXToge1xuICAgIHN0dWRlbnQ6IFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXSxcbiAgfSxcbiAgW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkXToge30sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZV06IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzKFxuICBvbGRTdGF0dXM6IFF1ZXN0aW9uU3RhdHVzLFxuICBnb2FsU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgcm9sZTogUm9sZSxcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG9sZFN0YXR1cyA9PT0gZ29hbFN0YXR1cyB8fFxuICAgIFFVRVNUSU9OX1NUQVRFU1tvbGRTdGF0dXNdW3JvbGVdPy5pbmNsdWRlcyhnb2FsU3RhdHVzKVxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBTZWFzb24gfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3NlbWVzdGVyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBTZW1lc3Rlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc2Vhc29uOiBTZWFzb247XG5cbiAgQENvbHVtbigpXG4gIHllYXI6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnNlbWVzdGVyKVxuICBjb3Vyc2VzOiBDb3Vyc2VNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0QXV0aEd1YXJkIGV4dGVuZHMgQXV0aEd1YXJkKCdqd3QnKSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9wYXNzcG9ydFwiKTsiLCJpbXBvcnQgeyBTZXRNZXRhZGF0YSwgQ3VzdG9tRGVjb3JhdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgUm9sZXMgPSAoLi4ucm9sZXM6IHN0cmluZ1tdKTogQ3VzdG9tRGVjb3JhdG9yPHN0cmluZz4gPT5cbiAgU2V0TWV0YWRhdGEoJ3JvbGVzJywgcm9sZXMpO1xuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXIgPSBjcmVhdGVQYXJhbURlY29yYXRvcjxzdHJpbmdbXT4oXG4gIGFzeW5jIChyZWxhdGlvbnM6IHN0cmluZ1tdLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwgeyByZWxhdGlvbnMgfSk7XG4gIH0sXG4pO1xuXG5leHBvcnQgY29uc3QgVXNlcklkID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gTnVtYmVyKHJlcXVlc3QudXNlci51c2VySWQpO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJ2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgTGVzc1RoYW5PckVxdWFsLCBNb3JlVGhhbk9yRXF1YWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zLm1hcCgocXVldWUpID0+IHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCkpLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmIChmb3JjZSB8fCAhKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdWxkIHdlIGNvbnNpZGVyIGNsZWFuaW5nIHRoZSBxdWV1ZT9cbiAgLy8gIENoZWNrcyBpZiB0aGVyZSBhcmUgbm8gc3RhZmYsIG9wZW4gcXVlc3Rpb25zIGFuZCB0aGF0IHRoZXJlIGFyZW4ndCBhbnkgb2ZmaWNlIGhvdXJzIHNvb25cbiAgcHVibGljIGFzeW5jIHNob3VsZENsZWFuUXVldWUocXVldWU6IFF1ZXVlTW9kZWwpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTGFzdCBUQSB0byBjaGVja291dCwgc28gY2hlY2sgaWYgd2UgbWlnaHQgd2FudCB0byBjbGVhciB0aGUgcXVldWVcbiAgICAgIGNvbnN0IGFyZUFueVF1ZXN0aW9uc09wZW4gPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgICAgICBxdWV1ZS5pZCxcbiAgICAgICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICAgICkuZ2V0Q291bnQoKSkgPiAwO1xuICAgICAgaWYgKGFyZUFueVF1ZXN0aW9uc09wZW4pIHtcbiAgICAgICAgY29uc3Qgc29vbiA9IG1vbWVudCgpLmFkZCgxNSwgJ21pbnV0ZXMnKS50b0RhdGUoKTtcbiAgICAgICAgY29uc3QgYXJlT2ZmaWNlSG91clNvb24gPVxuICAgICAgICAgIChhd2FpdCBPZmZpY2VIb3VyTW9kZWwuY291bnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiBMZXNzVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICAgIGVuZFRpbWU6IE1vcmVUaGFuT3JFcXVhbChzb29uKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpID4gMDtcbiAgICAgICAgaWYgKCFhcmVPZmZpY2VIb3VyU29vbikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKS5nZXRNYW55KCk7XG4gICAgY29uc3Qgb3BlblF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICAocSkgPT4gcS5zdGF0dXMgaW4gT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAgICk7XG5cbiAgICBvcGVuUXVlc3Rpb25zLmZvckVhY2goKHE6IFF1ZXN0aW9uTW9kZWwpID0+IHtcbiAgICAgIHEuc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGU7XG4gICAgICBxLmNsb3NlZEF0ID0gbmV3IERhdGUoKTtcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuc2F2ZShvcGVuUXVlc3Rpb25zKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXJzZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vdExvZ2dlZEluKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvdXJzZUlkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vQ291cnNlSWRGb3VuZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hSb2xlcyhyb2xlcywgdXNlciwgY291cnNlSWQpO1xuICB9XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm90SW5Db3Vyc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm11c3RCZVJvbGVUb0pvaW5Db3Vyc2Uocm9sZXMpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtYWluaW5nLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJvbGUsIFNTRVF1ZXVlUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICdzc2Uvc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgeyByZXMsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLy8gU2VuZCBldmVudCB3aXRoIG5ldyBxdWVzdGlvbnMsIGJ1dCBubyBtb3JlIHRoYW4gb25jZSBhIHNlY29uZFxuICB1cGRhdGVRdWVzdGlvbnMgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIGlmIChxdWVzdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCBhc3luYyAoeyByb2xlLCB1c2VySWQgfSkgPT4gKHtcbiAgICAgICAgcXVlc3Rpb25zOiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgICAgICBxdWV1ZUlkLFxuICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgcm9sZSxcbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZVF1ZXVlID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKCkgPT4gKHsgcXVldWUgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVG9Sb29tKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBkYXRhOiAobWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEpID0+IFByb21pc2U8U1NFUXVldWVSZXNwb25zZT4sXG4gICkge1xuICAgIGF3YWl0IHRoaXMuc3NlU2VydmljZS5zZW5kRXZlbnQoaWRUb1Jvb20ocXVldWVJZCksIGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsZVVwZGF0ZSh1cGRhdGVGdW5jdGlvbjogKHF1ZXVlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIHJldHVybiB0aHJvdHRsZShcbiAgICAgIGFzeW5jIChxdWV1ZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVGdW5jdGlvbihxdWV1ZUlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAge1xuICAgICAgICBsZWFkaW5nOiBmYWxzZSxcbiAgICAgICAgdHJhaWxpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmluUXVldWVXaXRoU3RhdHVzKHF1ZXVlSWQsIFtcbiAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgIC4uLlN0YXR1c0luUXVldWUsXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICBdKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgY29uc3QgcXVlc3Rpb25zID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucXVlc3Rpb25zR2V0dGluZ0hlbHAgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKFxuICAgICAgKHF1ZXN0aW9uKSA9PiBxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucHJpb3JpdHlRdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYXN5bmMgcGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgY29uc3QgbmV3TFFSID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdMUVIsIHF1ZXN0aW9ucyk7XG5cbiAgICAgIG5ld0xRUi5xdWV1ZSA9IHF1ZXN0aW9ucy5xdWV1ZS5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgLy8gY2xhc3NUb0NsYXNzIHRyYW5zZm9ybWVyIHdpbGwgYXBwbHkgdGhlIEBFeGNsdWRlc1xuICAgICAgICByZXR1cm4gY2xhc3NUb0NsYXNzPFF1ZXN0aW9uPihcbiAgICAgICAgICBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICAgICAgc3RhdHVzOiBJbihTdGF0dXNTZW50VG9DcmVhdG9yKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV3TFFSLnByaW9yaXR5UXVldWUgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ld0xRUjtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVDb250cm9sbGVyIH0gZnJvbSAnLi9xdWV1ZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJ3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU3Vic2NyaWJlciB9IGZyb20gJy4vcXVldWUuc3Vic2NyaWJlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXVlQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIFF1ZXVlU2VydmljZSxcbiAgICBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgUXVldWVTdWJzY3JpYmVyLFxuICBdLFxuICBleHBvcnRzOiBbUXVldWVDbGVhblNlcnZpY2UsIFF1ZXVlU1NFU2VydmljZV0sXG4gIGltcG9ydHM6IFtTU0VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgR2V0UXVldWVSZXNwb25zZSxcbiAgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICBSb2xlLFxuICBVcGRhdGVRdWV1ZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgUmVzLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGUgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVldWUtcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncXVldWVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWV1ZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXVlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWV1ZShAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPEdldFF1ZXVlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gIH1cblxuICBAR2V0KCc6cXVldWVJZC9xdWVzdGlvbnMnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBxdWVzdGlvbnMsXG4gICAgICB1c2VySWQsXG4gICAgICByb2xlLFxuICAgICk7XG4gIH1cblxuICBAUGF0Y2goJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyB1cGRhdGVRdWV1ZShcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWV1ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcXVldWUubm90ZXMgPSBib2R5Lm5vdGVzO1xuICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gYm9keS5hbGxvd1F1ZXN0aW9ucztcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJzpxdWV1ZUlkL2NsZWFuJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBjbGVhblF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENsZWFuIHVwIHF1ZXVlIGlmIG5lY2Vzc2FyeVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5jbGVhblF1ZXVlKHF1ZXVlSWQsIHRydWUpO1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWVJZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5xdWV1ZVJvbGVHdWFyZC5xdWV1ZU5vdEZvdW5kKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICcuL3NzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7IHByb3ZpZGVyczogW1NTRVNlcnZpY2VdLCBleHBvcnRzOiBbU1NFU2VydmljZV0gfSlcbmV4cG9ydCBjbGFzcyBTU0VNb2R1bGUge31cbiIsImltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVldWVTdWJzY3JpYmVyIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWV1ZU1vZGVsPiB7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlKSB7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXVlTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVldWVNb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKGV2ZW50LmVudGl0eS5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSUNhbENvbW1hbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGljYWxTZXJ2aWNlOiBJY2FsU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdpY2FsOnNjcmFwZScsXG4gICAgZGVzY3JpYmU6ICdzY3JhcGUgaWNhbCBmb3IgYSBjb3Vyc2UnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5pY2FsU2VydmljZS51cGRhdGVBbGxDb3Vyc2VzKCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1jb21tYW5kXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDcm9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICBmcm9tVVJMLFxuICBDYWxlbmRhckNvbXBvbmVudCxcbiAgQ2FsZW5kYXJSZXNwb25zZSxcbiAgVkV2ZW50LFxufSBmcm9tICdub2RlLWljYWwnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwsIENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgZmluZE9uZUlhbmEgfSBmcm9tICd3aW5kb3dzLWlhbmEvZGlzdCc7XG5pbXBvcnQgJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBSUnVsZSB9IGZyb20gJ3JydWxlJztcblxudHlwZSBNb21lbnQgPSBtb21lbnQuTW9tZW50O1xuXG50eXBlIENyZWF0ZU9mZmljZUhvdXIgPSBEZWVwUGFydGlhbDxPZmZpY2VIb3VyTW9kZWw+W107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJY2FsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICAvLyB0eiBzaG91bGQgbm90IGJlIHByZWNvbnZlcnRlZCBieSBmaW5kT25lSWFuYVxuICBwcml2YXRlIGZpeE91dGxvb2tUWihkYXRlOiBNb21lbnQsIHR6OiBzdHJpbmcpOiBNb21lbnQge1xuICAgIGNvbnN0IGlhbmEgPSBmaW5kT25lSWFuYSh0eik7IC8vIEdldCBJQU5BIHRpbWV6b25lIGZyb20gd2luZG93cyB0aW1lem9uZVxuICAgIGlmIChpYW5hKSB7XG4gICAgICAvLyBNb3ZlIHRvIHRoZSB0aW1lem9uZSBiZWNhdXNlIG5vZGUtaWNhbCBkaWRuJ3QgZG8gaXQgZm9yIHVzLCBzaW5jZSBpdCBkb2VzIG5vdCByZWNvZ25pemUgd2luZG93cyB0aW1lem9uZVxuICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS50eihpYW5hLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZGF0ZSBvZiBvY2N1cmVuY2VzIGZvciBhbiBycnVsZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUsIGV4Y2x1ZGluZyB0aGUgbGlzdCBvZiBkYXRlc1xuICBwcml2YXRlIHJydWxlVG9EYXRlcyhycnVsZTogYW55LCBldmVudFRaOiBzdHJpbmcsIGV4ZGF0ZVJhdzogRGF0ZVtdKTogRGF0ZVtdIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgIGNvbnN0IGR0c3RhcnQ6IE1vbWVudCA9IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLmR0c3RhcnQpLCBldmVudFRaKTtcbiAgICBjb25zdCB1bnRpbDogTW9tZW50ID1cbiAgICAgIG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMudW50aWwpLCBldmVudFRaKTtcbiAgICBjb25zdCBldmVudFRaTW9tZW50ID0gbW9tZW50LnR6LnpvbmUoZmluZE9uZUlhbmEoZXZlbnRUWikgfHwgZXZlbnRUWik7XG5cbiAgICAvLyBHZXQgdGhlIFVUQyBPZmZzZXQgaW4gdGhpcyBldmVudCdzIHRpbWV6b25lLCBhdCB0aGlzIHRpbWUuIEFjY291bnRzIGZvciBEYXlsaWdodCBTYXZpbmdzIGFuZCBvdGhlciBvZGRpdGllc1xuICAgIGNvbnN0IHR6VVRDT2Zmc2V0T25EYXRlID0gKGRhdGU6IE1vbWVudCkgPT5cbiAgICAgIGV2ZW50VFpNb21lbnQudXRjT2Zmc2V0KGRhdGUudmFsdWVPZigpKTtcbiAgICBjb25zdCBkdHN0YXJ0VVRDT2Zmc2V0ID0gdHpVVENPZmZzZXRPbkRhdGUoZHRzdGFydCk7XG5cbiAgICAvLyBBcHBseSBhIFVUQyBvZmZzZXQgaW4gbWludXRlcyB0byB0aGUgZ2l2ZW4gTW9tZW50XG4gICAgY29uc3QgYXBwbHlPZmZzZXQgPSAoZGF0ZTogTW9tZW50LCB1dGNPZmZzZXQ6IG51bWJlcik6IE1vbWVudCA9PlxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KHV0Y09mZnNldCwgJ20nKTtcbiAgICAvLyBhcHBseSB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHByZVJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgZHRzdGFydFVUQ09mZnNldCk7XG4gICAgLy8gUmV2ZXJ0IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcG9zdFJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgLWR0c3RhcnRVVENPZmZzZXQpO1xuXG4gICAgLy8gQWRqdXN0IGZvciBycnVsZSBub3QgdGFraW5nIGludG8gYWNjb3VudCBEU1QgaW4gbG9jYWxlXG4gICAgLy8gICBpZS4gXCI4cG0gZXZlcnkgZnJpZGF5XCIgbWVhbnMgaGF2aW5nIHRvIHB1c2ggYmFjayA2MCBtaW51dGVzIGFmdGVyIEZhbGwgQmFja3dhcmRzXG4gICAgY29uc3QgZml4RFNUID0gKGRhdGU6IE1vbWVudCk6IE1vbWVudCA9PlxuICAgICAgLy8gR2V0IHRoZSBkaWZmZXJlbmNlIGluIFVUQyBvZmZzZXQgYmV0d2VlbiBkdHN0YXJ0IGFuZCB0aGlzIGRhdGUgKHNvIGlmIHdlIGNyb3NzZWQgRFNUIHN3aXRjaCwgdGhpcyB3aWxsIGJlIG5vbnplcm8pXG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QoZHRzdGFydFVUQ09mZnNldCAtIHR6VVRDT2Zmc2V0T25EYXRlKGRhdGUpLCAnbScpO1xuXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSUnVsZSh7XG4gICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICBpbnRlcnZhbDogb3B0aW9ucy5pbnRlcnZhbCxcbiAgICAgIHdrc3Q6IG9wdGlvbnMud2tzdCxcbiAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgYnl3ZWVrZGF5OiBvcHRpb25zLmJ5d2Vla2RheSxcbiAgICAgIGR0c3RhcnQ6IHByZVJSdWxlKGR0c3RhcnQpLnRvRGF0ZSgpLFxuICAgICAgdW50aWw6IHVudGlsICYmIHByZVJSdWxlKHVudGlsKS50b0RhdGUoKSxcbiAgICB9KTtcblxuICAgIC8vIERhdGVzIHRvIGV4Y2x1ZGUgZnJvbSByZWN1cnJlbmNlLCBzZXBhcmF0ZSBleGRhdGUgdGltZXN0YW1wIGZvciBmaWx0ZXJpbmdcbiAgICBjb25zdCBleGRhdGVzOiBudW1iZXJbXSA9IE9iamVjdC52YWx1ZXMoZXhkYXRlUmF3IHx8IHt9KVxuICAgICAgLm1hcCgoZCkgPT4gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KGQpLCBldmVudFRaKSlcbiAgICAgIC5tYXAoKGQpID0+IGFwcGx5T2Zmc2V0KGQsIHR6VVRDT2Zmc2V0T25EYXRlKGQpKS52YWx1ZU9mKCkpO1xuXG4gICAgLy8gRG9pbmcgbWF0aCBoZXJlIGJlY2F1c2UgbW9tZW50LmFkZCBjaGFuZ2VzIGJlaGF2aW9yIGJhc2VkIG9uIHNlcnZlciB0aW1lem9uZVxuICAgIGNvbnN0IGluMTBXZWVrcyA9IG5ldyBEYXRlKFxuICAgICAgZHRzdGFydC52YWx1ZU9mKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogNyAqIDEwLFxuICAgICk7XG4gICAgcmV0dXJuIHJ1bGVcbiAgICAgIC5hbGwoKGQpID0+ICEhdW50aWwgfHwgZCA8IGluMTBXZWVrcylcbiAgICAgIC5maWx0ZXIoKGRhdGUpID0+ICFleGRhdGVzLmluY2x1ZGVzKGRhdGUuZ2V0VGltZSgpKSlcbiAgICAgIC5tYXAoKGQpID0+IGZpeERTVChwb3N0UlJ1bGUobW9tZW50KGQpKSkudG9EYXRlKCkpO1xuICB9XG5cbiAgcGFyc2VJY2FsKGljYWxEYXRhOiBDYWxlbmRhclJlc3BvbnNlLCBjb3Vyc2VJZDogbnVtYmVyKTogQ3JlYXRlT2ZmaWNlSG91ciB7XG4gICAgY29uc3QgaWNhbERhdGFWYWx1ZXM6IEFycmF5PENhbGVuZGFyQ29tcG9uZW50PiA9IE9iamVjdC52YWx1ZXMoaWNhbERhdGEpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBpY2FsRGF0YVZhbHVlcy5maWx0ZXIoXG4gICAgICAoaUNhbEVsZW1lbnQpOiBpQ2FsRWxlbWVudCBpcyBWRXZlbnQgPT5cbiAgICAgICAgaUNhbEVsZW1lbnQudHlwZSA9PT0gJ1ZFVkVOVCcgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuc3RhcnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5lbmQgIT09IHVuZGVmaW5lZCxcbiAgICApO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNFdmVudFJlZ2V4ID0gL1xcYl4oT0h8SG91cnMpXFxiLztcblxuICAgIGNvbnN0IGZpbHRlcmVkT2ZmaWNlSG91cnMgPSBvZmZpY2VIb3Vycy5maWx0ZXIoKGV2ZW50KSA9PlxuICAgICAgb2ZmaWNlSG91cnNFdmVudFJlZ2V4LnRlc3QoZXZlbnQuc3VtbWFyeSksXG4gICAgKTtcblxuICAgIGxldCByZXN1bHRPZmZpY2VIb3VycyA9IFtdO1xuXG4gICAgZmlsdGVyZWRPZmZpY2VIb3Vycy5mb3JFYWNoKChvaDogVkV2ZW50KSA9PiB7XG4gICAgICAvLyBUaGlzIG9mZmljZSBob3VyIHRpbWV6b25lLiBBU1NVTUlORyBldmVyeSBkYXRlIGZpZWxkIGhhcyBzYW1lIHRpbWV6b25lIGFzIG9oLnN0YXJ0XG4gICAgICBjb25zdCBldmVudFRaID0gb2guc3RhcnQudHo7XG4gICAgICBjb25zdCB7IHJydWxlIH0gPSBvaCBhcyBhbnk7XG4gICAgICBpZiAocnJ1bGUpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvaC5lbmQuZ2V0VGltZSgpIC0gb2guc3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGFsbERhdGVzID0gdGhpcy5ycnVsZVRvRGF0ZXMocnJ1bGUsIGV2ZW50VFosIG9oLmV4ZGF0ZSk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZE9mZmljZUhvdXJzID0gYWxsRGF0ZXMubWFwKChkYXRlKSA9PiAoe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IGRhdGUsXG4gICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkdXJhdGlvbiksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMgPSByZXN1bHRPZmZpY2VIb3Vycy5jb25jYXQoZ2VuZXJhdGVkT2ZmaWNlSG91cnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLnN0YXJ0KSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLmVuZCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0T2ZmaWNlSG91cnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgT2ZmaWNlSG91cnMgZm9yIGEgZ2l2ZW4gQ291cnNlIGJ5IHJlc2NyYXBpbmcgaWNhbFxuICAgKiBAcGFyYW0gY291cnNlIHRvIHBhcnNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoY291cnNlOiBDb3Vyc2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYHNjcmFwaW5nIGljYWwgZm9yIGNvdXJzZSBcIiR7Y291cnNlLm5hbWV9XCIoJHtjb3Vyc2UuaWR9IGF0IHVybDogJHtjb3Vyc2UuaWNhbFVSTH0uLi5gLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb3Vyc2VJZDogY291cnNlLmlkLCByb29tOiAnT25saW5lJyB9LFxuICAgIH0pO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tOiAnT25saW5lJyxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5pZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gdGhpcy5wYXJzZUljYWwoXG4gICAgICBhd2FpdCBmcm9tVVJMKGNvdXJzZS5pY2FsVVJMKSxcbiAgICAgIGNvdXJzZS5pZCxcbiAgICApO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5kZWxldGUoeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5zYXZlKFxuICAgICAgb2ZmaWNlSG91cnMubWFwKChlKSA9PiB7XG4gICAgICAgIGUucXVldWVJZCA9IHF1ZXVlLmlkO1xuICAgICAgICByZXR1cm4gT2ZmaWNlSG91ck1vZGVsLmNyZWF0ZShlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGNvbnNvbGUubG9nKCdkb25lIHNjcmFwaW5nIScpO1xuICB9XG5cbiAgQENyb24oJzUxIDAgKiAqIConKVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlQWxsQ291cnNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY291cnNlIGljYWxzJyk7XG4gICAgY29uc3QgY291cnNlcyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmQoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb3Vyc2VzLm1hcCgoYykgPT4gdGhpcy51cGRhdGVDYWxlbmRhckZvckNvdXJzZShjKSkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWljYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luZG93cy1pYW5hL2Rpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJydWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZlN1YnNjcmliZXIgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYtc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtOb3RpZmljYXRpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgRGVza3RvcE5vdGlmU3Vic2NyaWJlciwgVHdpbGlvU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBUd2lsaW9TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFdmVudFN1YnNjcmliZXIsXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIENvbm5lY3Rpb24sXG4gIEluc2VydEV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIERlc2t0b3BOb3RpZk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PERlc2t0b3BOb3RpZk1vZGVsPikge1xuICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeURlc2t0b3AoXG4gICAgICBldmVudC5lbnRpdHksXG4gICAgICBcIllvdSd2ZSBzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIGZvciBkZXNrdG9wIG5vdGlmaWNhdGlvbnMhXCIsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXhjZXB0aW9uLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgKiBhcyB3ZWJQdXNoIGZyb20gJ3dlYi1wdXNoJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBOb3RpZk1zZ3MgPSB7XG4gIHBob25lOiB7XG4gICAgV1JPTkdfTUVTU0FHRTpcbiAgICAgICdQbGVhc2UgcmVzcG9uZCB3aXRoIGVpdGhlciBZRVMgb3IgTk8uIFRleHQgU1RPUCBhdCBhbnkgdGltZSB0byBzdG9wIHJlY2VpdmluZyB0ZXh0IG1lc3NhZ2VzJyxcbiAgICBDT1VMRF9OT1RfRklORF9OVU1CRVI6XG4gICAgICAnQ291bGQgbm90IGZpbmQgYW4gT2ZmaWNlIEhvdXJzIGFjY291bnQgd2l0aCB5b3VyIHBob25lIG51bWJlci4nLFxuICAgIFVOUkVHSVNURVI6XG4gICAgICBcIllvdSd2ZSB1bnJlZ2lzdGVyZWQgZnJvbSB0ZXh0IG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIEZlZWwgZnJlZSB0byByZS1yZWdpc3RlciBhbnkgdGltZSB0aHJvdWdoIHRoZSB3ZWJzaXRlXCIsXG4gICAgRFVQTElDQVRFOlxuICAgICAgXCJZb3UndmUgYWxyZWFkeSBiZWVuIHZlcmlmaWVkIHRvIHJlY2VpdmUgdGV4dCBub3RpZmljYXRpb25zIGZyb20gS2hvdXJ5IE9mZmljZSBIb3VycyFcIixcbiAgICBPSzpcbiAgICAgICdUaGFuayB5b3UgZm9yIHZlcmlmeWluZyB5b3VyIG51bWJlciB3aXRoIEtob3VyeSBPZmZpY2UgSG91cnMhIFlvdSBhcmUgbm93IHNpZ25lZCB1cCBmb3IgdGV4dCBub3RpZmljYXRpb25zIScsXG4gIH0sXG4gIHF1ZXVlOiB7XG4gICAgQUxFUlRfQlVUVE9OOlxuICAgICAgXCJUaGUgVEEgY291bGQndCByZWFjaCB5b3UsIHBsZWFzZSBoYXZlIE1pY3Jvc29mdCBUZWFtcyBvcGVuIGFuZCBjb25maXJtIHlvdSBhcmUgYmFjayFcIixcbiAgICBUSElSRF9QTEFDRTogYFlvdSdyZSAzcmQgaW4gdGhlIHF1ZXVlLiBCZSByZWFkeSBmb3IgYSBUQSB0byBjYWxsIHlvdSBzb29uIWAsXG4gICAgVEFfSElUX0hFTFBFRDogKHRhTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgICBgJHt0YU5hbWV9IGlzIGNvbWluZyB0byBoZWxwIHlvdSFgLFxuICAgIFJFTU9WRUQ6IGBZb3UndmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHF1ZXVlLiBQbGVhc2UgcmV0dXJuIHRvIHRoZSBhcHAgZm9yIG1vcmUgaW5mb3JtYXRpb24uYCxcbiAgfSxcbiAgdGE6IHtcbiAgICBTVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRTpcbiAgICAgICdBIHN0dWRlbnQgaGFzIGpvaW5lZCB5b3VyIChwcmV2aW91c2x5IGVtcHR5KSBxdWV1ZSEnLFxuICB9LFxufTtcblxuLy9UT0RPIHRlc3QgdGhpcyBzZXJ2aWNlIG9tZ1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBkZXNrdG9wUHVibGljS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSxcbiAgKSB7XG4gICAgd2ViUHVzaC5zZXRWYXBpZERldGFpbHMoXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdFTUFJTCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQUklWQVRFS0VZJyksXG4gICAgKTtcbiAgICB0aGlzLmRlc2t0b3BQdWJsaWNLZXkgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKTtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcChcbiAgICBpbmZvOiBEZWVwUGFydGlhbDxEZXNrdG9wTm90aWZNb2RlbD4sXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgICAvLyBjcmVhdGUgaWYgbm90IGV4aXN0XG4gICAgbGV0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQ6IGluZm8udXNlcklkLCBlbmRwb2ludDogaW5mby5lbmRwb2ludCB9LFxuICAgIH0pO1xuICAgIGlmICghZG4pIHtcbiAgICAgIGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuY3JlYXRlKGluZm8pLnNhdmUoKTtcbiAgICAgIGF3YWl0IGRuLnJlbG9hZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZG47XG4gIH1cblxuICBhc3luYyByZWdpc3RlclBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIHVzZXI6IFVzZXJNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZ1bGxOdW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHBob25lTnVtYmVyKTtcbiAgICBpZiAoIWZ1bGxOdW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5ub3RpZmljYXRpb25TZXJ2aWNlLnJlZ2lzdGVyUGhvbmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICBpZiAocGhvbmVOb3RpZk1vZGVsKSB7XG4gICAgICAvLyBQaG9uZSBudW1iZXIgaGFzIG5vdCBjaGFuZ2VkXG4gICAgICBpZiAocGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID09PSBmdWxsTnVtYmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8ganVzdCBjaGFuZ2UgaXRcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID0gZnVsbE51bWJlcjtcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHBob25lTm90aWZNb2RlbC5zYXZlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGUoe1xuICAgICAgICBwaG9uZU51bWJlcjogZnVsbE51bWJlcixcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG5cbiAgICAgIC8vIE1VVEFURSBzbyBpZiB1c2VyLnNhdmUoKSBpcyBjYWxsZWQgbGF0ZXIgaXQgZG9lc24ndCBkaXMtYXNzb2NpYXRlXG4gICAgICB1c2VyLnBob25lTm90aWYgPSBwaG9uZU5vdGlmTW9kZWw7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5ub3RpZnlQaG9uZShcbiAgICAgIHBob25lTm90aWZNb2RlbCxcbiAgICAgIFwiWW91J3ZlIHNpZ25lZCB1cCBmb3IgcGhvbmUgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gVG8gdmVyaWZ5IHlvdXIgbnVtYmVyLCBwbGVhc2UgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBZRVMuIFRvIHVuc3Vic2NyaWJlLCByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIE5PIG9yIFNUT1BcIixcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIC8vIE5vdGlmeSB1c2VyIG9uIGFsbCBwbGF0Zm9ybXNcbiAgYXN5bmMgbm90aWZ5VXNlcih1c2VySWQ6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm90aWZNb2RlbHNPZlVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczogWydkZXNrdG9wTm90aWZzJywgJ3Bob25lTm90aWYnXSxcbiAgICB9KTtcblxuICAgIC8vIHJ1biB0aGUgcHJvbWlzZXMgY29uY3VycmVudGx5XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnNFbmFibGVkKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgbm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmcy5tYXAoYXN5bmMgKG5tKSA9PlxuICAgICAgICAgIHRoaXMubm90aWZ5RGVza3RvcChubSwgbWVzc2FnZSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiAmJiBub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubm90aWZ5UGhvbmUobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiwgbWVzc2FnZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgZGVza3RvcCBub3RpZmljYXRpb25cbiAgYXN5bmMgbm90aWZ5RGVza3RvcChubTogRGVza3RvcE5vdGlmTW9kZWwsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3ZWJQdXNoLnNlbmROb3RpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlbmRwb2ludDogbm0uZW5kcG9pbnQsXG4gICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgcDI1NmRoOiBubS5wMjU2ZGgsXG4gICAgICAgICAgICBhdXRoOiBubS5hdXRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUobm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgcGhvbmUgbnVtYmVyXG4gIGFzeW5jIG5vdGlmeVBob25lKFxuICAgIHBuOiBQaG9uZU5vdGlmTW9kZWwsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZvcmNlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZm9yY2UgfHwgcG4udmVyaWZpZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5zZW5kU01TKHBuLnBob25lTnVtYmVyLCBtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2JsZW0gc2VuZGluZyBtZXNzYWdlJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeVBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcGhvbmVOb3RpZiA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHBob25lTnVtYmVyOiBwaG9uZU51bWJlciB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFwaG9uZU5vdGlmKSB7XG4gICAgICBhcG0uc2V0Q3VzdG9tQ29udGV4dCh7IHBob25lTnVtYmVyIH0pO1xuICAgICAgYXBtLmNhcHR1cmVFcnJvcihcbiAgICAgICAgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwaG9uZSBudW1iZXIgZHVyaW5nIHZlcmlmaWNhdGlvbicpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuQ09VTERfTk9UX0ZJTkRfTlVNQkVSO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSAhPT0gJ1lFUycgJiYgbWVzc2FnZSAhPT0gJ05PJyAmJiBtZXNzYWdlICE9PSAnU1RPUCcpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuV1JPTkdfTUVTU0FHRTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT09ICdOTycgfHwgbWVzc2FnZSA9PT0gJ1NUT1AnKSB7XG4gICAgICAvLyBkaWQgc29tZSBtb3JlIGRpZ2dpbmcsIFNUT1AganVzdCBzdG9wcyBtZXNzYWdlcyBjb21wbGV0ZWx5LCB3ZSdsbCBuZXZlciByZWNlaXZlIGl0XG4gICAgICAvLyBzbyB1aC4uLiB0aGVyZSdzIHByb2JhYmx5IGEgd2F5IHRvIGRvIHRoYXRcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUocGhvbmVOb3RpZik7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLlVOUkVHSVNURVI7XG4gICAgfSBlbHNlIGlmIChwaG9uZU5vdGlmLnZlcmlmaWVkKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkRVUExJQ0FURTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZi52ZXJpZmllZCA9IHRydWU7XG4gICAgICBhd2FpdCBwaG9uZU5vdGlmLnNhdmUoKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuT0s7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWItcHVzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdHdpbGlvIFNESyB0byBtYWtlIHRlc3RpbmcgZWFzaWVyLlxuICogU2hvdWxkIE5PVCBpbnRlcmFjdCB3aXRoIERCIG1vZGVscyBvciBkbyBhbnl0aGluZyBzbWFydC4gSnVzdCB3cmFwIFR3aWxpby5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR3aWxpb1NlcnZpY2Uge1xuICBwcml2YXRlIHR3aWxpb0NsaWVudDogdHdpbGlvLlR3aWxpbztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnR3aWxpb0NsaWVudCA9IHR3aWxpbyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FDQ09VTlRTSUQnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZ1bGwgcGhvbmUgbnVtYmVyIG9yIHJldHVybiBmYWxzZSBpZiBwaG9uZSBudW1iZXIgaXNuJ3QgcmVhbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZ1bGxQaG9uZU51bWJlcihcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubG9va3Vwcy5waG9uZU51bWJlcnMocGhvbmVOdW1iZXIpLmZldGNoKCkpXG4gICAgICAgIC5waG9uZU51bWJlcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGlmIHRoZSBwaG9uZSBudW1iZXIgaXMgbm90IGZvdW5kLCB0aGVuIGVuZHBvaW50IHNob3VsZCByZXR1cm4gaW52YWxpZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIFNNUyB0byBwaG9uZSBudW1iZXIgdXNpbmcgb3VyIFR3aWxpbyBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kU01TKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPUEhPTkVOVU1CRVInKSxcbiAgICAgIHRvOiBwaG9uZU51bWJlcixcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpbGlvXCIpOyIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZkJvZHksXG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBUd2lsaW9Cb2R5LFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgSGVhZGVyLFxuICBIZWFkZXJzLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdub3RpZmljYXRpb25zJylcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVza3RvcC9jcmVkZW50aWFscycpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBnZXREZXNrdG9wQ3JlZGVudGlhbHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5ub3RpZlNlcnZpY2UuZGVza3RvcFB1YmxpY0tleSk7XG4gIH1cblxuICBAUG9zdCgnZGVza3RvcC9kZXZpY2UnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IERlc2t0b3BOb3RpZkJvZHksXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZlBhcnRpYWw+IHtcbiAgICBjb25zdCBkZXZpY2UgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlckRlc2t0b3Aoe1xuICAgICAgZW5kcG9pbnQ6IGJvZHkuZW5kcG9pbnQsXG4gICAgICBleHBpcmF0aW9uVGltZTogYm9keS5leHBpcmF0aW9uVGltZSAmJiBuZXcgRGF0ZShib2R5LmV4cGlyYXRpb25UaW1lKSxcbiAgICAgIHAyNTZkaDogYm9keS5rZXlzLnAyNTZkaCxcbiAgICAgIGF1dGg6IGJvZHkua2V5cy5hdXRoLFxuICAgICAgbmFtZTogYm9keS5uYW1lLFxuICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXZpY2UuaWQsXG4gICAgICBlbmRwb2ludDogZGV2aWNlLmVuZHBvaW50LFxuICAgICAgY3JlYXRlZEF0OiBkZXZpY2UuY3JlYXRlZEF0LFxuICAgICAgbmFtZTogZGV2aWNlLm5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIEBEZWxldGUoJ2Rlc2t0b3AvZGV2aWNlLzpkZXZpY2VJZCcpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyBkZWxldGVEZXNrdG9wVXNlcihcbiAgICBAUGFyYW0oJ2RldmljZUlkJykgZGV2aWNlSWQ6IG51bWJlcixcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZCh7IGlkOiBkZXZpY2VJZCwgdXNlcklkIH0pO1xuICAgIGlmIChkbi5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUoZG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZWJob29rIGZyb20gdHdpbGlvXG4gIEBQb3N0KCcvcGhvbmUvdmVyaWZ5JylcbiAgQEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sJylcbiAgYXN5bmMgdmVyaWZ5UGhvbmVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogVHdpbGlvQm9keSxcbiAgICBASGVhZGVycygneC10d2lsaW8tc2lnbmF0dXJlJykgdHdpbGlvU2lnbmF0dXJlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGJvZHkuQm9keS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBzZW5kZXJOdW1iZXIgPSBib2R5LkZyb207XG5cbiAgICBjb25zdCB0d2lsaW9BdXRoVG9rZW4gPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKTtcblxuICAgIGNvbnN0IGlzVmFsaWRhdGVkID0gdHdpbGlvLnZhbGlkYXRlUmVxdWVzdChcbiAgICAgIHR3aWxpb0F1dGhUb2tlbixcbiAgICAgIHR3aWxpb1NpZ25hdHVyZS50cmltKCksXG4gICAgICBgJHt0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKX0vYXBpL3YxL25vdGlmaWNhdGlvbnMvcGhvbmUvdmVyaWZ5YCxcbiAgICAgIGJvZHksXG4gICAgKTtcblxuICAgIGlmICghaXNWYWxpZGF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvbkNvbnRyb2xsZXIubWVzc2FnZU5vdEZyb21Ud2lsaW8sXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VUb1VzZXIgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS52ZXJpZnlQaG9uZShcbiAgICAgIHNlbmRlck51bWJlcixcbiAgICAgIG1lc3NhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBNZXNzYWdpbmdSZXNwb25zZSA9IHR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZVRvVXNlcik7XG5cbiAgICByZXR1cm4gdHdpbWwudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9naW5Db250cm9sbGVyIH0gZnJvbSAnLi9sb2dpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vbG9naW4vand0LnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4gKHtcbiAgICAgICAgc2VjcmV0OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbSnd0U3RyYXRlZ3ksIExvZ2luQ291cnNlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFUlJPUl9NRVNTQUdFUyxcbiAgS2hvdXJ5RGF0YVBhcmFtcyxcbiAgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSxcbiAgS2hvdXJ5U3R1ZGVudENvdXJzZSxcbiAgS2hvdXJ5VEFDb3Vyc2UsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgaHR0cFNpZ25hdHVyZSBmcm9tICdodHRwLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi8uLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBsb2dpbkNvdXJzZVNlcnZpY2U6IExvZ2luQ291cnNlU2VydmljZSxcbiAgICBwcml2YXRlIGp3dFNlcnZpY2U6IEp3dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQFBvc3QoJy9raG91cnlfbG9naW4nKVxuICBhc3luYyByZWNpZXZlRGF0YUZyb21LaG91cnkoXG4gICAgQFJlcSgpIHJlcTogUmVxdWVzdCxcbiAgICBAQm9keSgpIGJvZHk6IEtob3VyeURhdGFQYXJhbXMsXG4gICk6IFByb21pc2U8S2hvdXJ5UmVkaXJlY3RSZXNwb25zZT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IHJlcXVlc3QgaGFzIGNvbWUgZnJvbSBLaG91cnlcbiAgICAgIGNvbnN0IHBhcnNlZFJlcXVlc3QgPSBodHRwU2lnbmF0dXJlLnBhcnNlUmVxdWVzdChyZXEpO1xuICAgICAgY29uc3QgdmVyaWZ5ID0gaHR0cFNpZ25hdHVyZS52ZXJpZnlITUFDKFxuICAgICAgICBwYXJzZWRSZXF1ZXN0LFxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdLSE9VUllfUFJJVkFURV9LRVknKSxcbiAgICAgICk7XG4gICAgICBpZiAoIXZlcmlmeSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLmxvZ2luQ29udHJvbGxlci5yZWNlaXZlRGF0YUZyb21LaG91cnksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHVzZXI6IFVzZXJNb2RlbDtcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgY291cnNlczogW10gfSk7XG4gICAgfVxuXG4gICAgLy8gUTogRG8gd2UgbmVlZCB0aGlzIGlmIGl0J3Mgbm90IGdvaW5nIHRvIGNoYW5nZT9cbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB7XG4gICAgICBlbWFpbDogYm9keS5lbWFpbCxcbiAgICAgIGZpcnN0TmFtZTogYm9keS5maXJzdF9uYW1lLFxuICAgICAgbGFzdE5hbWU6IGJvZHkubGFzdF9uYW1lLFxuICAgICAgbmFtZTogYm9keS5maXJzdF9uYW1lICsgJyAnICsgYm9keS5sYXN0X25hbWUsXG4gICAgICBwaG90b1VSTDogJycsXG4gICAgfSk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgICAgICAgIGMuY291cnNlLFxuICAgICAgICAgIGMuc2VjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgY29uc3QgdXNlckNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2UuaWQsXG4gICAgICAgICAgICBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHVzZXJDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LnRhX2NvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlUQUNvdXJzZSkgPT4ge1xuICAgICAgICAvLyBRdWVyeSBmb3IgYWxsIHRoZSBjb3Vyc2VzIHdoaWNoIG1hdGNoIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmljIGNvdXJzZSBmcm9tIEtob3VyeVxuICAgICAgICBjb25zdCBjb3Vyc2VNYXBwaW5ncyA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZCh7XG4gICAgICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGMuY291cnNlIH0sIC8vIFRPRE86IEFkZCBzZW1lc3RlciBzdXBwb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgY291cnNlTWFwcGluZyBvZiBjb3Vyc2VNYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IHRhQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoXG4gICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgeyBleHBpcmVzSW46IDUgKiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7IHVzZXJJZCB9KTtcbiAgICBjb25zdCBpc1NlY3VyZSA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgLmdldDxzdHJpbmc+KCdET01BSU4nKVxuICAgICAgLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgcmVzXG4gICAgICAuY29va2llKCdhdXRoX3Rva2VuJywgYXV0aFRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGlzU2VjdXJlIH0pXG4gICAgICAucmVkaXJlY3QoMzAyLCAnLycpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEdldFByb2ZpbGVSZXNwb25zZSxcbiAgVXBkYXRlUHJvZmlsZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQYXRjaCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAnZmlyc3ROYW1lJyxcbiAgICAgICdsYXN0TmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgdXNlci5uYW1lID0gdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lO1xuICAgIGlmIChcbiAgICAgIHVzZXIucGhvbmVOb3RpZnNFbmFibGVkICYmXG4gICAgICB1c2VyUGF0Y2gucGhvbmVOdW1iZXIgIT09IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXJcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyUGhvbmUodXNlclBhdGNoLnBob25lTnVtYmVyLCB1c2VyKTtcbiAgICB9XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXQodXNlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vcXVlc3Rpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWVzdGlvblN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXN0aW9uLnN1YnNjcmliZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWVzdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtRdWVzdGlvblN1YnNjcmliZXJdLFxuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlLCBRdWV1ZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBHZXRRdWVzdGlvblJlc3BvbnNlLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzS2V5cyxcbiAgUm9sZSxcbiAgVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXIsIFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVlc3Rpb24tcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncXVlc3Rpb25zJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWVzdGlvblJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWVzdGlvbklkJylcbiAgYXN5bmMgZ2V0UXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICApOiBQcm9taXNlPEdldFF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUG9zdCgpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KCkgYm9keTogQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8Q3JlYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdGV4dCwgcXVlc3Rpb25UeXBlLCBxdWV1ZUlkLCBmb3JjZSB9ID0gYm9keTtcblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWV1ZUlkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5pbnZhbGlkUXVldWUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghcXVldWUuYWxsb3dRdWVzdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ubm9OZXdRdWVzdGlvbnMsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5jbG9zZWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNVc2VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY3JlYXRvcklkOiB1c2VyLmlkLFxuICAgICAgICBzdGF0dXM6IEluKE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCEhcHJldmlvdXNVc2VyUXVlc3Rpb24pIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICBwcmV2aW91c1VzZXJRdWVzdGlvbi5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkO1xuICAgICAgICBhd2FpdCBwcmV2aW91c1VzZXJRdWVzdGlvbi5zYXZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24ub25lUXVlc3Rpb25BdEFUaW1lLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoe1xuICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgIGNyZWF0b3I6IHVzZXIsXG4gICAgICB0ZXh0LFxuICAgICAgcXVlc3Rpb25UeXBlLFxuICAgICAgc3RhdHVzOiBRdWVzdGlvblN0YXR1c0tleXMuRHJhZnRpbmcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc09ubGluZTogdHJ1ZSxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUGF0Y2goJzpxdWVzdGlvbklkJylcbiAgQFJvbGVzKFJvbGUuU1RVREVOVCwgUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIC8vIFRPRE86IFVzZSBxdWV1ZVJvbGUgZGVjb3JhdG9yLCBidXQgd2UgbmVlZCB0byBmaXggaXRzIHBlcmZvcm1hbmNlIGZpcnN0XG4gIGFzeW5jIHVwZGF0ZVF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxVcGRhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgbGV0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWVzdGlvbklkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICdxdWV1ZScsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NyZWF0b3IgPSB1c2VySWQgPT09IHF1ZXN0aW9uLmNyZWF0b3JJZDtcblxuICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgIC8vIEZhaWwgaWYgc3R1ZGVudCB0cmllcyBhbiBpbnZhbGlkIHN0YXR1cyBjaGFuZ2VcbiAgICAgIGlmIChib2R5LnN0YXR1cyAmJiAhcXVlc3Rpb24uY2hhbmdlU3RhdHVzKGJvZHkuc3RhdHVzLCBSb2xlLlNUVURFTlQpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdTdHVkZW50JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbiA9IE9iamVjdC5hc3NpZ24ocXVlc3Rpb24sIGJvZHkpO1xuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCBjcmVhdG9yLCBjaGVjayBpZiB1c2VyIGlzIFRBL1BST0Ygb2YgY291cnNlIG9mIHF1ZXN0aW9uXG4gICAgY29uc3QgaXNUYU9yUHJvZiA9XG4gICAgICAoYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY291cnNlSWQ6IHF1ZXN0aW9uLnF1ZXVlLmNvdXJzZUlkLFxuICAgICAgICAgIHJvbGU6IEluKFtSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUl0pLFxuICAgICAgICB9LFxuICAgICAgfSkpID4gMDtcblxuICAgIGlmIChpc1RhT3JQcm9mKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoYm9keSkubGVuZ3RoICE9PSAxIHx8IE9iamVjdC5rZXlzKGJvZHkpWzBdICE9PSAnc3RhdHVzJykge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi50YU9ubHlFZGl0UXVlc3Rpb25TdGF0dXMsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRTdGF0dXMgPSBxdWVzdGlvbi5zdGF0dXM7XG4gICAgICBjb25zdCBuZXdTdGF0dXMgPSBib2R5LnN0YXR1cztcbiAgICAgIC8vIElmIHRoZSB0YUhlbHBlZCBpcyBhbHJlYWR5IHNldCwgbWFrZSBzdXJlIHRoZSBzYW1lIHRhIHVwZGF0ZXMgdGhlIHN0YXR1c1xuICAgICAgaWYgKHF1ZXN0aW9uLnRhSGVscGVkPy5pZCAhPT0gdXNlcklkKSB7XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBSGVscGluZyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5vdGhlclRBUmVzb2x2ZWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0FscmVhZHlIZWxwaW5nT25lID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB0YUhlbHBlZElkOiB1c2VySWQsXG4gICAgICAgICAgICBzdGF0dXM6IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKSA9PT0gMTtcbiAgICAgIGlmIChpc0FscmVhZHlIZWxwaW5nT25lICYmIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhSGVscGluZ090aGVyLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZFRyYW5zaXRpb24gPSBxdWVzdGlvbi5jaGFuZ2VTdGF0dXMobmV3U3RhdHVzLCBSb2xlLlRBKTtcbiAgICAgIGlmICghdmFsaWRUcmFuc2l0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmZzbVZpb2xhdGlvbihcbiAgICAgICAgICAgICdUQScsXG4gICAgICAgICAgICBxdWVzdGlvbi5zdGF0dXMsXG4gICAgICAgICAgICBib2R5LnN0YXR1cyxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgVEEgYXMgdGFIZWxwZWQgd2hlbiB0aGUgVEEgc3RhcnRzIGhlbHBpbmcgdGhlIHN0dWRlbnRcbiAgICAgIGlmIChcbiAgICAgICAgb2xkU3RhdHVzICE9PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyAmJlxuICAgICAgICBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXG4gICAgICApIHtcbiAgICAgICAgcXVlc3Rpb24udGFIZWxwZWQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh1c2VySWQpO1xuICAgICAgICBxdWVzdGlvbi5oZWxwZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gU2V0IGZpcnN0SGVscGVkQXQgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKCFxdWVzdGlvbi5maXJzdEhlbHBlZEF0KSB7XG4gICAgICAgICAgcXVlc3Rpb24uZmlyc3RIZWxwZWRBdCA9IHF1ZXN0aW9uLmhlbHBlZEF0O1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MucXVldWUuVEFfSElUX0hFTFBFRChxdWVzdGlvbi50YUhlbHBlZC5uYW1lKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmxvZ2luVXNlckNhbnRFZGl0LFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAUG9zdCgnOnF1ZXN0aW9uSWQvbm90aWZ5JylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBub3RpZnkoQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5BTEVSVF9CVVRUT04sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuUkVNT1ZFRCxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgbGV0IHF1ZXVlSWQ7XG5cbiAgICBpZiAocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCkge1xuICAgICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCk7XG4gICAgICBpZiAoIXF1ZXN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWVzdGlvbk5vdEZvdW5kLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcXVldWVJZCA9IHF1ZXN0aW9uLnF1ZXVlSWQ7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmJvZHkucXVldWVJZCkge1xuICAgICAgLy8gSWYgeW91IGFyZSBjcmVhdGluZyBhIG5ldyBxdWVzdGlvblxuICAgICAgcXVldWVJZCA9IHJlcXVlc3QuYm9keS5xdWV1ZUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVldWVPZlF1ZXN0aW9uTm90Rm91bmQsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQpO1xuXG4gICAgLy8gWW91IGNhbm5vdCBpbnRlcmFjdCB3aXRoIGEgcXVlc3Rpb24gaW4gYSBub25leGlzdGVudCBxdWV1ZVxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVldWVEb2VzTm90RXhpc3QsXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsIE9wZW5RdWVzdGlvblN0YXR1cyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBJbnNlcnRFdmVudCxcbiAgUmVtb3ZlRXZlbnQsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVlc3Rpb25Nb2RlbD4ge1xuICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoXG4gICAgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWVzdGlvbk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcblxuICAgIC8vIFNlbmQgcHVzaCBub3RpZmljYXRpb24gdG8gc3R1ZGVudHMgd2hlbiB0aGV5IGFyZSBoaXQgM3JkIGluIGxpbmVcbiAgICAvLyBpZiBzdGF0dXMgdXBkYXRlZCB0byBjbG9zZWRcbiAgICBpZiAoXG4gICAgICBldmVudC51cGRhdGVkQ29sdW1ucy5maW5kKChjKSA9PiBjLnByb3BlcnR5TmFtZSA9PT0gJ3N0YXR1cycpICYmXG4gICAgICBldmVudC5lbnRpdHkuc3RhdHVzIGluIENsb3NlZFF1ZXN0aW9uU3RhdHVzXG4gICAgKSB7XG4gICAgICAvLyBnZXQgM3JkIGluIHF1ZXVlIGJlZm9yZSBhbmQgYWZ0ZXIgdGhpcyB1cGRhdGVcbiAgICAgIGNvbnN0IHByZXZpb3VzVGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKFxuICAgICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICAgIClcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBjb25zdCB0aGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoZXZlbnQuZW50aXR5LnF1ZXVlSWQpXG4gICAgICAgIC5zZXRRdWVyeVJ1bm5lcihldmVudC5xdWVyeVJ1bm5lcikgLy8gUnVuIGluIHNhbWUgdHJhbnNhY3Rpb24gYXMgdGhlIHVwZGF0ZVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGlmICh0aGlyZCAmJiBwcmV2aW91c1RoaXJkPy5pZCAhPT0gdGhpcmQ/LmlkKSB7XG4gICAgICAgIGNvbnN0IHsgY3JlYXRvcklkIH0gPSB0aGlyZDtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihjcmVhdG9ySWQsIE5vdGlmTXNncy5xdWV1ZS5USElSRF9QTEFDRSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbnVtYmVyT2ZRdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKFxuICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgKS5nZXRDb3VudCgpO1xuXG4gICAgaWYgKG51bWJlck9mUXVlc3Rpb25zID09PSAwKSB7XG4gICAgICBjb25zdCBzdGFmZiA9IChcbiAgICAgICAgYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKGV2ZW50LmVudGl0eS5xdWV1ZUlkLCB7XG4gICAgICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgICAgICB9KVxuICAgICAgKS5zdGFmZkxpc3Q7XG5cbiAgICAgIHN0YWZmLmZvckVhY2goKHN0YWZmKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgc3RhZmYuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnRhLlNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgfVxuXG4gIGFzeW5jIGJlZm9yZVJlbW92ZShldmVudDogUmVtb3ZlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBkdWUgdG8gY2FzY2FkZXMgZW50aXR5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGxvYWRlZFxuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNlZWRDb250cm9sbGVyIH0gZnJvbSAnLi9zZWVkLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1NlZWRDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbU2VlZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWVkTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDcmVhdGVRdWVzdGlvblBhcmFtcywgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBDb3Vyc2VGYWN0b3J5LFxuICBPZmZpY2VIb3VyRmFjdG9yeSxcbiAgUXVlc3Rpb25GYWN0b3J5LFxuICBRdWV1ZUZhY3RvcnksXG4gIFNlbWVzdGVyRmFjdG9yeSxcbiAgVXNlckNvdXJzZUZhY3RvcnksXG4gIFVzZXJGYWN0b3J5LFxufSBmcm9tICcuLi8uLi90ZXN0L3V0aWwvZmFjdG9yaWVzJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdzZWVkcycpXG5AVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbmV4cG9ydCBjbGFzcyBTZWVkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHNlZWRTZXJ2aWNlOiBTZWVkU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2RlbGV0ZScpXG4gIGFzeW5jIGRlbGV0ZUFsbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKE9mZmljZUhvdXJNb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVlc3Rpb25Nb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVldWVNb2RlbCk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHJlc2V0JztcbiAgfVxuXG4gIEBHZXQoJ2NyZWF0ZScpXG4gIGFzeW5jIGNyZWF0ZVNlZWRzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gRmlyc3QgZGVsZXRlIHRoZSBvbGQgZGF0YVxuICAgIGF3YWl0IHRoaXMuZGVsZXRlQWxsKCk7XG5cbiAgICAvLyBUaGVuIGFkZCB0aGUgbmV3IHNlZWQgZGF0YVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcblxuICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICB0b21vcnJvdy5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDE5KTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpIC0gNDUwMDAwMCksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgMTAwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNZZXN0ZXJkYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB5ZXN0ZXJkYXksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh5ZXN0ZXJkYXkudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb21vcnJvdyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHRvbW9ycm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUodG9tb3Jyb3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VFeGlzdHMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgIH0pO1xuICAgIGlmICghY291cnNlRXhpc3RzKSB7XG4gICAgICBhd2FpdCBTZW1lc3RlckZhY3RvcnkuY3JlYXRlKHsgc2Vhc29uOiAnRmFsbCcsIHllYXI6IDIwMjAgfSk7XG4gICAgICBhd2FpdCBDb3Vyc2VGYWN0b3J5LmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgICByZWxhdGlvbnM6IFsnb2ZmaWNlSG91cnMnXSxcbiAgICB9KTtcblxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IFtcbiAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICBdO1xuICAgIGNvdXJzZS5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyRXhzaXN0cyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKCk7XG4gICAgaWYgKCF1c2VyRXhzaXN0cykge1xuICAgICAgLy8gU3R1ZGVudCAxXG4gICAgICBjb25zdCB1c2VyMSA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnbGl1LnN0YUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1N0YW5sZXkgTGl1JyxcbiAgICAgICAgZmlyc3ROYW1lOiAnU3RhbmxleScsXG4gICAgICAgIGxhc3ROYW1lOiAnTGl1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSMjBDRzM2RS1jZjBmMzc1MjUyYmQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjEsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFN0dW5kZW50IDJcbiAgICAgIGNvbnN0IHVzZXIyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICd0YWtheWFtYS5hQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnQWxleCBUYWtheWFtYScsXG4gICAgICAgIGZpcnN0TmFtZTogJ0FsZXgnLFxuICAgICAgICBsYXN0TmFtZTogJ1Rha2F5YW1hJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVKTDk3NDQzRC01MDEyMTMzOTY4NmItNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjIsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDFcbiAgICAgIGNvbnN0IHVzZXIzID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdzdGVuemVsLndAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdXaWxsIFN0ZW56ZWwnLFxuICAgICAgICBmaXJzdE5hbWU6ICdXaWxsJyxcbiAgICAgICAgbGFzdE5hbWU6ICdTdGVuemVsJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSRjI1NktSVC1kMTAwOThlODc5ZGEtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjMsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAyXG4gICAgICBjb25zdCB1c2VyNCA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnY2h1LmRhakBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0RhLUppbiBDaHUnLFxuICAgICAgICBmaXJzdE5hbWU6ICdEYS1KaW4nLFxuICAgICAgICBsYXN0TmFtZTogJ0NodScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VRTU2WTVVVDEtODVkYjU5YTQ3NGY0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI0LFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICByb29tOiAnV0hWIDEwMScsXG4gICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIG9mZmljZUhvdXJzOiBbXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICAgIF0sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAyNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQEdldCgnZmlsbF9xdWV1ZScpXG4gIGFzeW5jIGZpbGxRdWV1ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKCk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVVc2VyJylcbiAgYXN5bmMgY3JlYXRlVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IHsgcm9sZTogUm9sZTsgY291cnNlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB0YTogVXNlckNvdXJzZU1vZGVsO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUsIGNvdXJzZTogY291cnNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXVlJylcbiAgYXN5bmMgY3JlYXRlUXVldWUoXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIGNvdXJzZUlkOiBudW1iZXI7XG4gICAgICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbiAgICAgIC8vIGNsb3NlcyBpbiBuIG1pbGxpc2Vjb25kcyBmcm9tIG5vd1xuICAgICAgY2xvc2VzSW4/OiBudW1iZXI7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAoYm9keT8uY2xvc2VzSW4gfHwgNDUwMDAwMCkpLFxuICAgIH0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBvZmZpY2VIb3VyczogW29mZmljZUhvdXJzXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiBib2R5LmFsbG93UXVlc3Rpb25zID8/IGZhbHNlLFxuICAgIH07XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICBvcHRpb25zWydjb3Vyc2UnXSA9IGNvdXJzZTtcbiAgICB9XG4gICAgY29uc3QgcXVldWU6IFF1ZXVlTW9kZWwgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWVzdGlvbicpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KClcbiAgICBib2R5OiB7XG4gICAgICBxdWV1ZUlkOiBudW1iZXI7XG4gICAgICBzdHVkZW50SWQ6IG51bWJlcjtcbiAgICAgIGRhdGE6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zO1xuICAgIH0sXG4gICk6IFByb21pc2U8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBpZiAoYm9keS5xdWV1ZUlkKSB7XG4gICAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnF1ZXVlSWQpO1xuICAgICAgb3B0aW9uc1sncXVldWUnXSA9IHF1ZXVlO1xuICAgIH1cbiAgICBpZiAoYm9keS5zdHVkZW50SWQpIHtcbiAgICAgIGNvbnN0IHN0dWRlbnQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnN0dWRlbnRJZCk7XG4gICAgICBvcHRpb25zWydjcmVhdG9yJ10gPSBzdHVkZW50O1xuICAgIH1cbiAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25Nb2RlbCA9IGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIC4uLmJvZHkuZGF0YSxcbiAgICB9KTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IFF1ZXN0aW9uVHlwZSwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICd0eXBlb3JtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlck1vZGVsKVxuICAuYXR0cignZW1haWwnLCBgdXNlckBuZXUuZWR1YClcbiAgLmF0dHIoJ25hbWUnLCBgVXNlcmApXG4gIC5hdHRyKCdmaXJzdE5hbWUnLCAnVXNlcicpXG4gIC5hdHRyKCdwaG90b1VSTCcsIGBodHRwczovL3BpY3MvdXNlcmApO1xuXG5leHBvcnQgY29uc3QgU3R1ZGVudENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5TVFVERU5ULFxuKTtcblxuZXhwb3J0IGNvbnN0IFRBQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlRBLFxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbWVzdGVyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFNlbWVzdGVyTW9kZWwpXG4gIC5hdHRyKCdzZWFzb24nLCAnRmFsbCcpXG4gIC5hdHRyKCd5ZWFyJywgMjAyMCk7XG5cbmV4cG9ydCBjb25zdCBDbG9zZWRPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE0OjAwOjAwLjAwMFonKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNTozMDowMC4wMDBaJykpO1xuXG5leHBvcnQgY29uc3QgT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDM2MDAwMDApKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMzYwMDAwMCkpO1xuXG5leHBvcnQgY29uc3QgQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZU1vZGVsKVxuICAuYXR0cignbmFtZScsICdDUyAyNTAwJylcbiAgLmF0dHIoJ2ljYWxVUkwnLCAnaHR0cDovL2hpLmNvbScpXG4gIC5hdHRyKCdlbmFibGVkJywgdHJ1ZSlcbiAgLmFzc29jT25lKCdzZW1lc3RlcicsIFNlbWVzdGVyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSwgMCk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VTZWN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwpXG4gIC5hdHRyKCdnZW5lcmljQ291cnNlTmFtZScsICdDUyAyNTAwJylcbiAgLnNlcXVlbmNlKCdzZWN0aW9uJywgKGkpID0+IGkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbClcbiAgLmFzc29jT25lKCd1c2VyJywgVXNlckZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ3JvbGUnLCBSb2xlLlNUVURFTlQpO1xuXG5leHBvcnQgY29uc3QgUXVldWVGYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVldWVNb2RlbClcbiAgLmF0dHIoJ3Jvb20nLCAnT25saW5lJylcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cignYWxsb3dRdWVzdGlvbnMnLCBmYWxzZSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnc3RhZmZMaXN0JywgVXNlckZhY3RvcnksIDApO1xuXG4vLyBXQVJOSU5HOiBETyBOT1QgVVNFIENSRUFUT1JJRC4gQVMgWU9VIFNFRSBIRVJFLCBXRSBPTkxZIEFDQ0VQVCBDUkVBVE9SXG4vL1RPRE86IG1ha2UgaXQgYWNjZXB0IGNyZWF0b3JJZCBhcyB3ZWxsXG5leHBvcnQgY29uc3QgUXVlc3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVlc3Rpb25Nb2RlbClcbiAgLnNlcXVlbmNlKCd0ZXh0JywgKGkpID0+IGBxdWVzdGlvbiAke2l9YClcbiAgLmF0dHIoJ3N0YXR1cycsICdRdWV1ZWQnKVxuICAuYXR0cigncXVlc3Rpb25UeXBlJywgUXVlc3Rpb25UeXBlLk90aGVyKVxuICAuYXR0cignY3JlYXRlZEF0JywgbmV3IERhdGUoKSlcbiAgLmFzc29jT25lKCdxdWV1ZScsIFF1ZXVlRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjcmVhdG9yJywgVXNlckZhY3RvcnkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybS1mYWN0b3J5XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWVkU2VydmljZSB7XG4gIGFzeW5jIGRlbGV0ZUFsbChtb2RlbDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZ2V0Q29ubmVjdGlvbigpLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpLmRlbGV0ZSgpLmZyb20obW9kZWwpLmV4ZWN1dGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWRtaW5Db3JlTW9kdWxlRmFjdG9yeSxcbiAgQWRtaW5BdXRoTW9kdWxlRmFjdG9yeSxcbiAgRGVmYXVsdEFkbWluU2l0ZSxcbn0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciB9IGZyb20gJy4vY3JlZGVudGlhbFZhbGlkYXRvcic7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb3Vyc2VBZG1pbixcbiAgUXVldWVBZG1pbixcbiAgVXNlckFkbWluLFxuICBVc2VyQ291cnNlQWRtaW4sXG4gIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4sXG59IGZyb20gJy4vYWRtaW4tZW50aXRpZXMnO1xuaW1wb3J0IHsgQWRtaW5Db21tYW5kIH0gZnJvbSAnLi9hZG1pbi5jb21tYW5kJztcblxuY29uc3QgQ29yZU1vZHVsZSA9IEFkbWluQ29yZU1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5Db3JlTW9kdWxlKHt9KTtcbmNvbnN0IEF1dGhNb2R1bGUgPSBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQXV0aE1vZHVsZSh7XG4gIGFkbWluQ29yZU1vZHVsZTogQ29yZU1vZHVsZSxcbiAgY3JlZGVudGlhbFZhbGlkYXRvcjogYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yLCAvLyBob3cgZG8geW91IHZhbGlkYXRlIGNyZWRlbnRpYWxzXG4gIGltcG9ydHM6IFtUeXBlT3JtTW9kdWxlLmZvckZlYXR1cmUoW0FkbWluVXNlck1vZGVsXSldLCAvLyB3aGF0IG1vZHVsZXMgZXhwb3J0IHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIGNyZWRlbnRpYWxWYWxpZGF0b3IgYXZhaWxhYmxlXG4gIHByb3ZpZGVyczogW10sXG59KTtcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgZXhwb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtBZG1pbkNvbW1hbmRdLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYWRtaW5TaXRlOiBEZWZhdWx0QWRtaW5TaXRlKSB7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2UnLCBDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyJywgVXNlckFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXJDb3Vyc2UnLCBVc2VyQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignUXVldWUnLCBRdWV1ZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZVNlY3Rpb25NYXBwaW5nJywgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbik7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1hZG1pblwiKTsiLCJpbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ2JjcnlwdCc7XG5cbmV4cG9ydCBjb25zdCBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgPSB7XG4gIGluamVjdDogW10sXG4gIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVDcmVkZW50aWFscyhcbiAgICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICk6IFByb21pc2U8QWRtaW5Vc2VyTW9kZWw+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBpZiAoYXdhaXQgY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgRW50aXR5LCBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLCBCYXNlRW50aXR5LCBDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0JztcblxuLyoqXG4gKiBBZG1pbiB1c2VycyBhcmUgdG90YWxseSBzZXBhcmF0ZSBmcm9tIHJlZ3VsYXIgdXNlcnMgYW5kIGNhbiBvbmx5IGJlIGNyZWF0ZWQgZnJvbSBjb21tYW5kIGxpbmUuXG4gKiBgeWFybiBjbGkgYWRtaW46Y3JlYXRlYFxuICovXG5ARW50aXR5KCdhZG1pbl91c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBBZG1pblVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgc2V0UGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGFzc3dvcmRIYXNoID0gaGFzaFN5bmMocGFzc3dvcmQsIDUpO1xuICB9XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCB1bmlxdWU6IHRydWUsIG51bGxhYmxlOiBmYWxzZSB9KVxuICB1c2VybmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHBhc3N3b3JkSGFzaDogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsImltcG9ydCB7IEFkbWluRW50aXR5IH0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICduYW1lJ107XG59XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBRdWV1ZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAncm9vbScsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdlbWFpbCcsICduYW1lJ107XG4gIHNlYXJjaEZpZWxkcyA9IFsnZW1haWwnLCAnbmFtZSddO1xuICBmaWVsZHMgPSBbXG4gICAgJ2lkJyxcbiAgICAnZW1haWwnLFxuICAgICduYW1lJyxcbiAgICAnZGVza3RvcE5vdGlmc0VuYWJsZWQnLFxuICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgICdxdWV1ZXMnLFxuICBdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckNvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICd1c2VySWQnLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdnZW5lcmljQ291cnNlTmFtZScsICdzZWN0aW9uJywgJ2NvdXJzZUlkJ107XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kLCBQb3NpdGlvbmFsIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBxdWVzdGlvbiwga2V5SW5ZTiB9IGZyb20gJ3JlYWRsaW5lLXN5bmMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWRtaW5Db21tYW5kIHtcbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdjcmVhdGU6YWRtaW4gPHVzZXJuYW1lPicsXG4gICAgZGVzY3JpYmU6ICdjcmVhdGUgYW4gYWRtaW4gdXNlcicsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBAUG9zaXRpb25hbCh7XG4gICAgICBuYW1lOiAndXNlcm5hbWUnLFxuICAgICAgZGVzY3JpYmU6ICd0aGUgYWRtaW4gdXNlcm5hbWUnLFxuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSlcbiAgICB1c2VybmFtZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3QgY2hhbmdlUGFzc3dvcmQgPSBrZXlJbllOKFxuICAgICAgICBgVXNlciAke3VzZXJuYW1lfSBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gY2hhbmdlIHRoZWlyIHBhc3N3b3JkP2AsXG4gICAgICApO1xuICAgICAgaWYgKCFjaGFuZ2VQYXNzd29yZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzZXIgPSBBZG1pblVzZXJNb2RlbC5jcmVhdGUoeyB1c2VybmFtZSB9KTtcbiAgICB9XG4gICAgY29uc3QgcGFzc3dvcmQ6IHN0cmluZyA9IHF1ZXN0aW9uKCdQYXNzd29yZDogJywge1xuICAgICAgaGlkZUVjaG9CYWNrOiB0cnVlLFxuICAgIH0pO1xuICAgIHVzZXIuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIHVzZXI6ICR7dXNlci51c2VybmFtZX1gKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhZGxpbmUtc3luY1wiKTsiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmNvbmZpZygpO1xuXG4vLyBPcHRpb25zIG9ubHkgdXNlZCB3aGUgcnVuIHZpYSBDTElcbmNvbnN0IGluQ0xJID0ge1xuICBtaWdyYXRpb25zOiBbJ21pZ3JhdGlvbi8qLnRzJ10sXG4gIGNsaToge1xuICAgIG1pZ3JhdGlvbnNEaXI6ICdtaWdyYXRpb24nLFxuICB9LFxufTtcblxuY29uc3QgdHlwZW9ybSA9IHtcbiAgdHlwZTogJ3Bvc3RncmVzJyxcbiAgdXJsOiBwcm9jZXNzLmVudi5EQl9VUkwgfHwgJ3Bvc3RncmVzOi8vcG9zdGdyZXNAbG9jYWxob3N0OjU0MzIvZGV2JyxcbiAgc3luY2hyb25pemU6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG4gIGVudGl0aWVzOiBbXG4gICAgQ291cnNlTW9kZWwsXG4gICAgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCxcbiAgICBPZmZpY2VIb3VyTW9kZWwsXG4gICAgU2VtZXN0ZXJNb2RlbCxcbiAgICBVc2VyTW9kZWwsXG4gICAgVXNlckNvdXJzZU1vZGVsLFxuICAgIFF1ZXN0aW9uTW9kZWwsXG4gICAgUXVldWVNb2RlbCxcbiAgICBEZXNrdG9wTm90aWZNb2RlbCxcbiAgICBQaG9uZU5vdGlmTW9kZWwsXG4gICAgQWRtaW5Vc2VyTW9kZWwsXG4gICAgRXZlbnRNb2RlbCxcbiAgXSxcbiAga2VlcENvbm5lY3Rpb25BbGl2ZTogdHJ1ZSxcbiAgbG9nZ2luZzogISFwcm9jZXNzLmVudi5UWVBFT1JNX0xPR0dJTkcsXG4gIC4uLighIXByb2Nlc3MuZW52LlRZUEVPUk1fQ0xJID8gaW5DTEkgOiB7fSksXG59O1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb3JtO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJ25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IEJhY2tmaWxsUGhvbmVOb3RpZnMgfSBmcm9tICcuL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kJztcbmltcG9ydCB7IEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0IH0gZnJvbSAnLi9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMgfSBmcm9tICcuL3NlcGFyYXRlLWZpcnN0LWxhc3QtbmFtZXMuY29tbWFuZCc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQmFja2ZpbGxQaG9uZU5vdGlmcyxcbiAgICBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCxcbiAgICBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJ25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJ25vdGlmaWNhdGlvbi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsUGhvbmVOb3RpZnMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cGhvbmUtbm90aWZzJyxcbiAgICBkZXNjcmliZTpcbiAgICAgICdkZWxldGUgcGhvbmUgbm90aWZzIHdpdGggbm8gdXNlcmlkcywgZGVsZXRlIGR1cGxpY2F0ZSBwaG9uZSBub3RpZnMsIGFuZCBmb3JjaWJseSBzZXQgdmVyaWZpZWQgb24gZXhpc3RpbmcgcGhvbmVub3RpZnMnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBmaXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRGVsZXRlIHRob3NlIHdpdGhvdXQgdXNlcmlkcyBhc3NvY2lhdGVkXG4gICAgY29uc3Qgbm9Vc2VyID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZSh7IHVzZXJJZDogSXNOdWxsKCkgfSk7XG4gICAgY29uc29sZS5sb2coYGRlbGV0ZWQgJHtub1VzZXIuYWZmZWN0ZWR9IGRlc2t0b3Bub3RpZm1vZGVscyB3aXRoIG5vIHVzZXJpZGApO1xuXG4gICAgLy8gZGVsZXRlIGF0IG9uY2VcbiAgICBjb25zdCB0b0RlbGV0ZTogUGhvbmVOb3RpZk1vZGVsW10gPSBbXTtcblxuICAgIC8vIERlbGV0ZSBkdXBsaWNhdGVzXG4gICAgY29uc3QgZHVwcyA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ3Bub3RpZicpXG4gICAgICAuc2VsZWN0KFtgXCJwaG9uZU51bWJlclwiYCwgJ0NPVU5UKCopJ10pXG4gICAgICAuZ3JvdXBCeSgncG5vdGlmLnBob25lTnVtYmVyJylcbiAgICAgIC5oYXZpbmcoJ0NPVU5UKCopID4gMScpXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuICAgIGNvbnNvbGUubG9nKGBmb3VuZCAke2R1cHMubGVuZ3RofSBkdXBzYCk7XG4gICAgdG9EZWxldGUucHVzaCguLi5kdXBzKTtcblxuICAgIGNvbnN0IHZhbGlkID0gW107XG4gICAgbGV0IGNoYW5nZWROdW0gPSAwO1xuICAgIC8vIGNoYW5nZSB0byByZWFsIG51bWJlclxuICAgIGNvbnN0IGFsbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kKHsgcmVsYXRpb25zOiBbJ3VzZXInXSB9KTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYWxsKSB7XG4gICAgICBjb25zdCBudW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHAucGhvbmVOdW1iZXIpO1xuICAgICAgaWYgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyICE9PSBwLnBob25lTnVtYmVyKSB7XG4gICAgICAgICAgY2hhbmdlZE51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHAucGhvbmVOdW1iZXIgPSBudW1iZXI7XG4gICAgICAgIHAudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgICB2YWxpZC5wdXNoKHApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9EZWxldGUucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coYFR3aWxpbyBjaGFuZ2VkICR7Y2hhbmdlZE51bX0gcGhvbmUgbnVtYmVycyB0byBmdWxsIG51bWApO1xuICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5zYXZlKHZhbGlkKTtcblxuICAgIC8vIERlbGV0ZSBhbmQgbWFrZSBzdXJlIHRvIGRpc2FibGUgcGhvbmVub3RpZiBmb3IgdXNlclxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ2RlbGV0aW5nIHBob25lIG5vdGlmczogJyxcbiAgICAgIHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5waG9uZU51bWJlciksXG4gICAgKTtcbiAgICBpZiAodG9EZWxldGUubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5pZCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzVG9EaXNhYmxlID0gKFxuICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmQoe1xuICAgICAgICB3aGVyZTogeyBwaG9uZU5vdGlmc0VuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgcmVsYXRpb25zOiBbJ3Bob25lTm90aWYnXSxcbiAgICAgIH0pXG4gICAgKS5maWx0ZXIoKHUpID0+ICF1LnBob25lTm90aWYpO1xuICAgIHVzZXJzVG9EaXNhYmxlLmZvckVhY2goKHUpID0+ICh1LnBob25lTm90aWZzRW5hYmxlZCA9IGZhbHNlKSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vyc1RvRGlzYWJsZSk7XG4gICAgY29uc29sZS5sb2coYGRpc2FibGVkIHBob25lbm90aWZzIGZvciAke3VzZXJzVG9EaXNhYmxlLmxlbmd0aH0gdXNlcnNgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnF1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdCcsXG4gICAgZGVzY3JpYmU6ICdjb3B5IGFsbCBleGlzdGluZyBoZWxwZWRBdCB0byBmaXJzdEhlbHBlZEF0JyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY29weSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAudXBkYXRlKClcbiAgICAgIC5zZXQoeyBmaXJzdEhlbHBlZEF0OiAoKSA9PiAnXCJoZWxwZWRBdFwiJyB9KVxuICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgIC5jYWxsTGlzdGVuZXJzKGZhbHNlKVxuICAgICAgLmV4ZWN1dGUoKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBVcGRhdGVkICR7YXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoKVxuICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgICAgLmdldENvdW50KCl9IHJlY29yZHNgLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOmZpcnN0LWxhc3QtbmFtZXMnLFxuICAgIGRlc2NyaWJlOiAnY2hhbmdlIGFsbCBuYW1lcyB0byBmaXJzdCBhbmQgbGFzdCBuYW1lcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kKCk7XG4gICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdXNlci5maXJzdE5hbWUgPSB1c2VyLm5hbWUuc3BsaXQoJyAnKVswXTtcbiAgICAgICAgdXNlci5sYXN0TmFtZSA9IHVzZXIubmFtZS5zcGxpdCgnICcpLnNsaWNlKDEpLmpvaW4oJyAnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdXNlci5maXJzdE5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyBuYW1lIGZhaWxlZCBmb3IgJHt1c2VyLm5hbWV9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vycyk7XG4gICAgY29uc3QgY291bnQgPSBVc2VyTW9kZWwuY291bnQoKTtcblxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGVkIG5hbWVzIGZvciAke2NvdW50fSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUsIEh0dHBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNDb250cm9sbGVyIH0gZnJvbSAnLi9yZWxlYXNlLW5vdGVzLmNvbnRyb2xsZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtSZWxlYXNlTm90ZXNDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBNb2R1bGUucmVnaXN0ZXJBc3luYyh7XG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiAoe1xuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICBtYXhSZWRpcmVjdHM6IDUsXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVsZWFzZU5vdGVzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUywgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIEh0dHBTZXJ2aWNlLFxuICBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJ2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQENvbnRyb2xsZXIoJ3JlbGVhc2Vfbm90ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXRSZWxlYXNlTm90ZXMoKTogUHJvbWlzZTxHZXRSZWxlYXNlTm90ZXNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSA9IHtcbiAgICAgIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bGwsXG4gICAgICByZWxlYXNlTm90ZXM6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldChcbiAgICAgICAgJ2h0dHBzOi8vbm90aW9uLWFwaS5zcGxpdGJlZS5pby92MS9wYWdlL2FiYmEyNDZiZmEwODQ3YmFhMjcwNmFiMzBkMGM2YzdkJyxcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgICBjb25zdCBkYXRhID0gcmVxdWVzdC5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aW1lVGV4dCA9XG4gICAgICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddPy52YWx1ZT8ucHJvcGVydGllc1xuICAgICAgICAgID8udGl0bGVbMF1bMF07XG4gICAgICByZXNwb25zZS5sYXN0VXBkYXRlZFVuaXhUaW1lID0gdGltZVRleHQuc3BsaXQoJ1VuaXggJylbMV0gKiAxMDAwO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5yZWxlYXNlTm90ZXNDb250cm9sbGVyLnJlbGVhc2VOb3Rlc1RpbWUoZSksXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIHRpbWUgYmxvY2sgYW5kIHBhZ2UgbGluayBibG9jayBmcm9tIHBhZ2VcbiAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgZGF0YVsnNGQyNWYzOTMtZTU3MC00Y2Q1LWFkNjYtYjI3OGEwOTI0MjI1J10udmFsdWUucHJvcGVydGllcy50aXRsZSA9IFtdO1xuICAgIHJlc3BvbnNlLnJlbGVhc2VOb3RlcyA9IGRhdGE7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBJbmplY3RhYmxlLCBBcmd1bWVudE1ldGFkYXRhIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG4vKipcbiAqIFN0cmlwIHVuZGVmaW5lZCBwcm9wZXJ0aWVzIGZyb20gYm9keS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0cmlwVW5kZWZpbmVkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgbWV0YWRhdGE6IEFyZ3VtZW50TWV0YWRhdGEpOiBhbnkge1xuICAgIGlmIChtZXRhZGF0YS50eXBlID09PSAnYm9keScpIHtcbiAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZCh2YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZHJvcFVuZGVmaW5lZChvYmo6IHVua25vd24pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcgJiYgb2JqW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKG9ialtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5lc3RJbnRlcmNlcHRvcixcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgQ2FsbEhhbmRsZXIsXG4gIEh0dHBFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcG1JbnRlcmNlcHRvciBpbXBsZW1lbnRzIE5lc3RJbnRlcmNlcHRvciB7XG4gIGludGVyY2VwdChcbiAgICBjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0LFxuICAgIG5leHQ6IENhbGxIYW5kbGVyLFxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFeGNlcHRpb24pIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==