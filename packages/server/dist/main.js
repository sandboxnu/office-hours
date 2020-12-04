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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsYXN0aWMtYXBtLW5vZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWNvbW1hbmRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvc2VwYXJhdGUtZmlyc3QtbGFzdC1uYW1lcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RyaXBVbmRlZmluZWQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBtLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7QUNsRkEsdUJBQWdDO0FBQ2hDLDJDQUF3QztBQUl4QyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7QUNMdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBLG1EOzs7Ozs7Ozs7O0FDQUEsc0NBQTJDO0FBQzNDLHdDQUFrRTtBQUNsRSw0Q0FBOEM7QUFDOUMsc0NBQWlDO0FBQ2pDLDRDQUF5QztBQUN6Qyx1REFBMkQ7QUFDM0QseUNBQXFDO0FBQ3JDLG1EQUFt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QUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7Q0FDRjtBQW5CWSxrQkFBa0I7SUFEOUIsbUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQW1COUI7QUFuQlksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ04vQix3Q0FNd0I7QUFFeEIsNkNBQTRDO0FBQzVDLG9DQUF3QztBQUd4QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQ3ZCLHNCQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLEtBQUssWUFBWSxzQkFBYSxFQUFFO2dCQUNsQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjOzs7Ozs7O0FDWjNCLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgJ2VsYXN0aWMtYXBtLW5vZGUvc3RhcnQnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnLi9ib290c3RyYXAnO1xuXG5kZWNsYXJlIGNvbnN0IG1vZHVsZTogYW55O1xuXG5ib290c3RyYXAobW9kdWxlLmhvdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIpOyIsImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25QaXBlLCBJTmVzdEFwcGxpY2F0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RyaXBVbmRlZmluZWRQaXBlIH0gZnJvbSAnLi9zdHJpcFVuZGVmaW5lZC5waXBlJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEFwbUludGVyY2VwdG9yIH0gZnJvbSAnLi9hcG0uaW50ZXJjZXB0b3InO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcChob3Q6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlLCB7XG4gICAgbG9nZ2VyOiBbJ2Vycm9yJywgJ3dhcm4nLCAnbG9nJywgJ2RlYnVnJywgJ3ZlcmJvc2UnXSxcbiAgfSk7XG4gIGFkZEdsb2JhbHNUb0FwcChhcHApO1xuICBhcHAuc2V0R2xvYmFsUHJlZml4KCdhcGkvdjEnKTtcbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhuZXcgQXBtSW50ZXJjZXB0b3IoKSk7XG5cbiAgaWYgKGlzUHJvZCgpKSB7XG4gICAgY29uc29sZS5sb2coYFJ1bm5pbmcgcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uYCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyBub24tcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uIFRISVMgTVNHIFNIT1VMRCBOT1QgQVBQRUFSIE9OIFBST0QgVk1gLFxuICAgICk7XG4gIH1cbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXdhaXQgYXBwLmxpc3RlbigzMDAyKTtcblxuICBpZiAoaG90KSB7XG4gICAgaG90LmFjY2VwdCgpO1xuICAgIGhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxufVxuXG4vLyBHbG9iYWwgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgdHJ1ZSBpbiBwcm9kIGFuZCBpbiBpbnRlZ3JhdGlvbiB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEdsb2JhbHNUb0FwcChhcHA6IElOZXN0QXBwbGljYXRpb24pOiB2b2lkIHtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKFxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XG4gICAgICB3aGl0ZWxpc3Q6IHRydWUsXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZSxcbiAgICB9KSxcbiAgKTtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBTdHJpcFVuZGVmaW5lZFBpcGUoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dpbk1vZHVsZSB9IGZyb20gJy4vbG9naW4vbG9naW4ubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2R1bGUgfSBmcm9tICcuL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IFNlZWRNb2R1bGUgfSBmcm9tICcuL3NlZWQvc2VlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnLi9zc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyB0eXBlb3JtQ29uZmlnIGZyb20gJy4uL29ybWNvbmZpZyc7XG5pbXBvcnQgeyBCYWNrZmlsbE1vZHVsZSB9IGZyb20gJ2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNNb2R1bGUgfSBmcm9tICdyZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBUeXBlT3JtTW9kdWxlLmZvclJvb3QodHlwZW9ybUNvbmZpZyksXG4gICAgU2NoZWR1bGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExvZ2luTW9kdWxlLFxuICAgIFByb2ZpbGVNb2R1bGUsXG4gICAgQ291cnNlTW9kdWxlLFxuICAgIFF1ZXVlTW9kdWxlLFxuICAgIE5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBRdWVzdGlvbk1vZHVsZSxcbiAgICBTZWVkTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbXG4gICAgICAgICcuZW52JyxcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbJy5lbnYuZGV2ZWxvcG1lbnQnXSA6IFtdKSxcbiAgICAgIF0sXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBZG1pbk1vZHVsZSxcbiAgICBDb21tYW5kTW9kdWxlLFxuICAgIFNTRU1vZHVsZSxcbiAgICBCYWNrZmlsbE1vZHVsZSxcbiAgICBSZWxlYXNlTm90ZXNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy90eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc2NoZWR1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlQ29udHJvbGxlciB9IGZyb20gJy4vY291cnNlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgSUNhbENvbW1hbmQgfSBmcm9tICcuL2ljYWwuY29tbWFuZCc7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbQ291cnNlQ29udHJvbGxlcl0sXG4gIGltcG9ydHM6IFtRdWV1ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0lDYWxDb21tYW5kLCBJY2FsU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEdldENvdXJzZVJlc3BvbnNlLFxuICBRdWV1ZVBhcnRpYWwsXG4gIFJvbGUsXG4gIFRBQ2hlY2tvdXRSZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIGdldFJlcG9zaXRvcnksIE1vcmVUaGFuT3JFcXVhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCwgRXZlbnRUeXBlIH0gZnJvbSAncHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVJvbGVzR3VhcmQgfSBmcm9tICcuL2NvdXJzZS1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbkBDb250cm9sbGVyKCdjb3Vyc2VzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBDb3Vyc2VSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVCwgUm9sZS5UQSlcbiAgYXN5bmMgZ2V0KEBQYXJhbSgnaWQnKSBpZDogbnVtYmVyKTogUHJvbWlzZTxHZXRDb3Vyc2VSZXNwb25zZT4ge1xuICAgIC8vIFRPRE86IGZvciBhbGwgY291cnNlIGVuZHBvaW50LCBjaGVjayBpZiB0aGV5J3JlIGEgc3R1ZGVudCBvciBhIFRBXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZShpZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlcycsICdxdWV1ZXMuc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICAvLyBVc2UgcmF3IHF1ZXJ5IGZvciBwZXJmb3JtYW5jZSAoYXZvaWQgZW50aXR5IGluc3RhbnRpYXRpb24gYW5kIHNlcmlhbGl6YXRpb24pXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gYXdhaXQgZ2V0UmVwb3NpdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdvaCcpXG4gICAgICAuc2VsZWN0KFsnaWQnLCAndGl0bGUnLCBgXCJzdGFydFRpbWVcImAsIGBcImVuZFRpbWVcImBdKVxuICAgICAgLndoZXJlKCdvaC5jb3Vyc2VJZCA9IDpjb3Vyc2VJZCcsIHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KVxuICAgICAgLmdldFJhd01hbnkoKTtcblxuICAgIGNvdXJzZS5xdWV1ZXMgPSBhd2FpdCBhc3luYy5maWx0ZXIoXG4gICAgICBjb3Vyc2UucXVldWVzLFxuICAgICAgYXN5bmMgKHEpID0+IGF3YWl0IHEuY2hlY2tJc09wZW4oKSxcbiAgICApO1xuICAgIGF3YWl0IGFzeW5jLmVhY2goY291cnNlLnF1ZXVlcywgYXN5bmMgKHEpID0+IHtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVUaW1lcygpO1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVNpemUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3Vyc2U7XG4gIH1cblxuICBAUG9zdCgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja0luKFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxRdWV1ZVBhcnRpYWw+IHtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QucHVzaCh1c2VyKTtcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCBFdmVudE1vZGVsLmNyZWF0ZSh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgZXZlbnRUeXBlOiBFdmVudFR5cGUuVEFfQ0hFQ0tFRF9JTixcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQERlbGV0ZSgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja091dChcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8VEFDaGVja291dFJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcbiAgICBxdWV1ZS5zdGFmZkxpc3QgPSBxdWV1ZS5zdGFmZkxpc3QuZmlsdGVyKChlKSA9PiBlLmlkICE9PSB1c2VyLmlkKTtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfT1VULFxuICAgICAgdXNlcixcbiAgICAgIGNvdXJzZUlkLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIGNvbnN0IGNhbkNsZWFyUXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLnNob3VsZENsZWFuUXVldWUocXVldWUpO1xuICAgIGxldCBuZXh0T2ZmaWNlSG91clRpbWUgPSBudWxsO1xuXG4gICAgLy8gZmluZCBvdXQgaG93IGxvbmcgdW50aWwgbmV4dCBvZmZpY2UgaG91clxuICAgIGlmIChjYW5DbGVhclF1ZXVlKSB7XG4gICAgICBjb25zdCBzb29uID0gbW9tZW50KCkuYWRkKDE1LCAnbWludXRlcycpLnRvRGF0ZSgpO1xuICAgICAgY29uc3QgbmV4dE9mZmljZUhvdXIgPSBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKHNvb24pIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgc3RhcnRUaW1lOiAnQVNDJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV4dE9mZmljZUhvdXJUaW1lID0gbmV4dE9mZmljZUhvdXI/LnN0YXJ0VGltZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiB7IHF1ZXVlSWQ6IHF1ZXVlLmlkLCBjYW5DbGVhclF1ZXVlLCBuZXh0T2ZmaWNlSG91clRpbWUgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHtcbiAgSXNCb29sZWFuLFxuICBJc0RlZmluZWQsXG4gIElzRW51bSxcbiAgSXNJbnQsXG4gIElzTm90RW1wdHksXG4gIElzT3B0aW9uYWwsXG4gIElzU3RyaW5nLFxuICBWYWxpZGF0ZUlmLFxufSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5cbmV4cG9ydCBjb25zdCBQUk9EX1VSTCA9IFwiaHR0cHM6Ly9raG91cnlvZmZpY2Vob3Vycy5jb21cIjtcbmV4cG9ydCBjb25zdCBpc1Byb2QgPSAoKTogYm9vbGVhbiA9PlxuICBwcm9jZXNzLmVudi5ET01BSU4gPT09IFBST0RfVVJMIHx8XG4gICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdz8ubG9jYXRpb24/Lm9yaWdpbiA9PT0gUFJPRF9VUkwpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBUEkgQmFzZSBEYXRhIFR5cGVzIC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIE5PVEU6IFRoZXNlIGFyZSBub3QgdGhlIERCIGRhdGEgdHlwZXMuIFRoZXkgYXJlIG9ubHkgdXNlZCBmb3IgdGhlIGFwaVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB1c2VyLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gZW1haWwgLSBUaGUgZW1haWwgc3RyaW5nIG9mIHRoZSB1c2VyIGlmIHRoZXkgcHJvdmlkZSBpdCAobnVsbGFibGUpXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKiBAcGFyYW0gY291cnNlcyAtIFRoZSBsaXN0IG9mIGNvdXJzZXMgdGhhdCB0aGUgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggKGFzIGVpdGhlciBhICdzdHVkZW50JywgJ3RhJyBvciAncHJvZmVzc29yJylcbiAqIEBwYXJhbSBkZXNrdG9wTm90aWZzIC0gbGlzdCBvZiBlbmRwb2ludHMgc28gdGhhdCBmcm9udGVuZCBjYW4gZmlndXJlIG91dCBpZiBkZXZpY2UgaXMgZW5hYmxlZFxuICovXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbCE6IHN0cmluZztcbiAgZmlyc3ROYW1lPzogc3RyaW5nO1xuICBsYXN0TmFtZT86IHN0cmluZztcbiAgbmFtZSE6IHN0cmluZztcbiAgcGhvdG9VUkwhOiBzdHJpbmc7XG4gIGNvdXJzZXMhOiBVc2VyQ291cnNlW107XG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEZXNrdG9wTm90aWZQYXJ0aWFsKVxuICBkZXNrdG9wTm90aWZzITogRGVza3RvcE5vdGlmUGFydGlhbFtdO1xuXG4gIHBob25lTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG4gIHBob25lTnVtYmVyITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbmRwb2ludCE6IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY3JlYXRlZEF0ITogRGF0ZTtcbn1cblxuLyoqXG4gKiBDb250YWlucyB0aGUgcGFydGlhbCB1c2VyIGluZm8gbmVlZGVkIGJ5IHRoZSBmcm9udGVuZCB3aGVuIG5lc3RlZCBpbiBhIHJlc3BvbnNlXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBwaG90b1VSTD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGFydGlhbCBjb3Vyc2UgZGF0YSBuZWVkZWQgb24gdGhlIGZyb250IGVuZCB3aGVuIG5lc3RlZCBpbiBhIHJlc3BvbnNlLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICovXG5leHBvcnQgdHlwZSBDb3Vyc2VQYXJ0aWFsID0ge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgdGhhdCBhIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIGFuZCB0aGVpciByb2xlIGluIHRoYXQgY291cnNlXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGUgdXNlciBhY2NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0gcm9sZSAtIFRoZSB1c2VyJ3Mgcm9sZSBpbiB0aGUgY291cnNlLlxuICovXG5leHBvcnQgdHlwZSBVc2VyQ291cnNlID0ge1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvbGU6IFJvbGU7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRocmVlIHBvc3NpYmxlIHVzZXIgcm9sZXMgaW4gYSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCBlbnVtIFJvbGUge1xuICBTVFVERU5UID0gXCJzdHVkZW50XCIsXG4gIFRBID0gXCJ0YVwiLFxuICBQUk9GRVNTT1IgPSBcInByb2Zlc3NvclwiLFxufVxuXG5jbGFzcyBPZmZpY2VIb3VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICB0aXRsZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBzdGFydFRpbWUhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGVuZFRpbWUhOiBEYXRlO1xufVxuXG4vKipcbiAqIEEgUXVldWUgdGhhdCBzdHVkZW50cyBjYW4gam9pbiB3aXRoIHRoaWVyIHRpY2tldHMuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoYXQgdGhpcyBvZmZpY2UgaG91cnMgcXVldWUgaXMgZm9yLlxuICogQHBhcmFtIHJvb20gLSBUaGUgZnVsbCBuYW1lIG9mIHRoZSBidWlsZGluZyArIHJvb20gIyB0aGF0IHRoZSBjdXJyZW50IG9mZmljZSBob3VycyBxdWV1ZSBpcyBpbi5cbiAqIEBwYXJhbSBzdGFmZkxpc3QgLSBUaGUgbGlzdCBvZiBUQSB1c2VyJ3MgdGhhdCBhcmUgY3VycmVudGx5IGhlbHBpbmcgYXQgb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIHF1ZXN0aW9ucyAtIFRoZSBsaXN0IG9mIHRoZSBzdHVkZW50cyBxdWVzdGlvbnMgYXNzb2NhaXRlZCB3aXRoIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWV1ZSB7XG4gIGlkOiBudW1iZXI7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9vbTogc3RyaW5nO1xuICBzdGFmZkxpc3Q6IFVzZXJQYXJ0aWFsW107XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgc3RhcnRUaW1lPzogRGF0ZTtcbiAgZW5kVGltZT86IERhdGU7XG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgUXVldWUgcGFydGlhbCB0byBiZSBzaG93biBvbiB0aGUgdG9kYXkgcGFnZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIHJvb20gLSBUaGUgZnVsbCBuYW1lIG9mIHRoZSBidWlsZGluZyArIHJvb20gIyB0aGF0IHRoZSBjdXJyZW50IG9mZmljZSBob3VycyBxdWV1ZSBpcyBpbi5cbiAqIEBwYXJhbSBzdGFmZkxpc3QgLSBUaGUgbGlzdCBvZiBUQSB1c2VyJ3MgdGhhdCBhcmUgY3VycmVudGx5IGhlbHBpbmcgYXQgb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgY2xhc3MgUXVldWVQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHJvb20hOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIHN0YWZmTGlzdCE6IFVzZXJQYXJ0aWFsW107XG5cbiAgcXVldWVTaXplITogbnVtYmVyO1xuICBub3Rlcz86IHN0cmluZztcbiAgaXNPcGVuITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBzdGFydFRpbWU/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGVuZFRpbWU/OiBEYXRlO1xuXG4gIGFsbG93UXVlc3Rpb25zITogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXN0aW9uIGlzIGNyZWF0ZWQgd2hlbiBhIHN0dWRlbnQgd2FudHMgaGVscCBmcm9tIGEgVEEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBzdHVkZW50IHF1ZXN0aW9uLlxuICogQHBhcmFtIGNyZWF0b3IgLSBUaGUgU3R1ZGVudCB0aGF0IGhhcyBjcmVhdGVkIHRoZSBxdWVzdGlvbi5cbiAqIEBwYXJhbSB0ZXh0IC0gVGhlIHRleHQgZGVzY3JpdGlwbiBvZiB3aGF0IGhlL3NoZSBuZWVkcyBoZWxwIHdpdGguXG4gKiBAcGFyYW0gY3JlYXRlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUaWNrZXQgd2FzIGNyZWF0ZWQuIEV4OiBcIjIwMjAtMDktMTJUMTI6MDA6MDAtMDQ6MDBcIlxuICogQHBhcmFtIGhlbHBlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBiZWdhbiBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIGNsb3NlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBmaW5pc2hlZCBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIHF1ZXN0aW9uVHlwZSAtIFRoZSBxdWVzdGlvbiB0eXBlIGhlbHBzIGRpc3Rpbmd1aXNoIHF1ZXN0aW9uIGZvciBUQSdzIGFuZCBkYXRhIGluc2lnaHRzLlxuICogQHBhcmFtIHN0YXR1cyAtIFRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhpcyBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcnRpY3VsYXIgc3R1ZGVudCwgdG8gaGVscCBUQSdzIGZpbmQgdGhlbVxuICogQHBhcmFtIGlzT25saW5lIC0gV2V0aGVyIG9yIG5vdCB0aGUgcXVlc3Rpb24gd2lsbCBoZWxwZWQgb25saW5lIG9yIGluLXBlcnNvblxuICovXG5leHBvcnQgY2xhc3MgUXVlc3Rpb24ge1xuICBpZCE6IG51bWJlcjtcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgY3JlYXRvciE6IFVzZXJQYXJ0aWFsO1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICB0YUhlbHBlZD86IFVzZXJQYXJ0aWFsO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgaGVscGVkQXQ/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNsb3NlZEF0PzogRGF0ZTtcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuICBzdGF0dXMhOiBRdWVzdGlvblN0YXR1cztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIGlzT25saW5lPzogYm9vbGVhbjtcbn1cblxuLy8gUXVlc3Rpb24gVHlwZXNcbmV4cG9ydCBlbnVtIFF1ZXN0aW9uVHlwZSB7XG4gIENvbmNlcHQgPSBcIkNvbmNlcHRcIixcbiAgQ2xhcmlmaWNhdGlvbiA9IFwiQ2xhcmlmaWNhdGlvblwiLFxuICBUZXN0aW5nID0gXCJUZXN0aW5nXCIsXG4gIEJ1ZyA9IFwiQnVnXCIsXG4gIFNldHVwID0gXCJTZXR1cFwiLFxuICBPdGhlciA9IFwiT3RoZXJcIixcbn1cblxuZXhwb3J0IGVudW0gT3BlblF1ZXN0aW9uU3RhdHVzIHtcbiAgRHJhZnRpbmcgPSBcIkRyYWZ0aW5nXCIsXG4gIFF1ZXVlZCA9IFwiUXVldWVkXCIsXG4gIEhlbHBpbmcgPSBcIkhlbHBpbmdcIixcbiAgUHJpb3JpdHlRdWV1ZWQgPSBcIlByaW9yaXR5UXVldWVkXCIsXG59XG5cbi8qKlxuICogTGltYm8gc3RhdHVzZXMgYXJlIGF3YWl0aW5nIHNvbWUgY29uZmlybWF0aW9uIGZyb20gdGhlIHN0dWRlbnRcbiAqL1xuZXhwb3J0IGVudW0gTGltYm9RdWVzdGlvblN0YXR1cyB7XG4gIENhbnRGaW5kID0gXCJDYW50RmluZFwiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBzdHVkZW50IGNhbid0IGJlIGZvdW5kIGJ5IGEgVEFcbiAgUmVRdWV1ZWluZyA9IFwiUmVRdWV1ZWluZ1wiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBUQSB3YW50cyB0byBnZXQgYmFjayB0byBhIHN0dWRlbnQgbGF0ZXIgYW5kIGdpdmUgdGhlbSB0aGUgb3B0aW9uIHRvIGJlIHB1dCBpbnRvIHRoZSBwcmlvcml0eSBxdWV1ZVxuICBUQURlbGV0ZWQgPSBcIlRBRGVsZXRlZFwiLCAvLyBXaGVuIGEgVEEgZGVsZXRlcyBhIHF1ZXN0aW9uIGZvciBhIG11bHRpdHVkZSBvZiByZWFzb25zXG59XG5cbmV4cG9ydCBlbnVtIENsb3NlZFF1ZXN0aW9uU3RhdHVzIHtcbiAgUmVzb2x2ZWQgPSBcIlJlc29sdmVkXCIsXG4gIENvbmZpcm1lZERlbGV0ZWQgPSBcIkNvbmZpcm1lZERlbGV0ZWRcIixcbiAgU3R1ZGVudENhbmNlbGxlZCA9IFwiU3R1ZGVudENhbmNlbGxlZFwiLFxuICBTdGFsZSA9IFwiU3RhbGVcIixcbn1cblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUXVldWUgPSBbXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZCxcbl07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblByaW9yaXR5UXVldWUgPSBbT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c1NlbnRUb0NyZWF0b3IgPSBbXG4gIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgLi4uU3RhdHVzSW5RdWV1ZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQsXG5dO1xuXG4vLyBUaWNrZXQgU3RhdHVzIC0gUmVwcmVzZW50cyBhIGdpdmVuIHN0YXR1cyBvZiBhcyBzdHVkZW50J3MgdGlja2V0XG5leHBvcnQgdHlwZSBRdWVzdGlvblN0YXR1cyA9IGtleW9mIHR5cGVvZiBRdWVzdGlvblN0YXR1c0tleXM7XG4vLyBhbiBFbnVtLWxpa2UgY29uc3RhbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIHN0YXR1c2VzIGZvciBjb252ZW5pZW5jZS5cbmV4cG9ydCBjb25zdCBRdWVzdGlvblN0YXR1c0tleXMgPSB7XG4gIC4uLk9wZW5RdWVzdGlvblN0YXR1cyxcbiAgLi4uQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkxpbWJvUXVlc3Rpb25TdGF0dXMsXG59O1xuXG4vKipcbiAqIEEgU2VtZXN0ZXIgb2JqZWN0LCByZXByZXNlbnRpbmcgYSBzY2hlZHVsZSBzZW1lc3RlciB0ZXJtIGZvciB0aGUgcHVycG9zZXMgb2YgYSBjb3Vyc2UuXG4gKiBAcGFyYW0gc2Vhc29uIC0gVGhlIHNlYXNvbiBvZiB0aGlzIHNlbWVzdGVyLlxuICogQHBhcmFtIHllYXIgLSBUaGUgeWVhciBvZiB0aGlzIHNlbWVzdGVyLlxuICovXG5pbnRlcmZhY2UgU2VtZXN0ZXIge1xuICBzZWFzb246IFNlYXNvbjtcbiAgeWVhcjogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRoZSBzZWFzb25zIGluIHdoaWNoIGEgY291cnNlIGNhbiB0YWtlIHBsYWNlLlxuICovXG5leHBvcnQgdHlwZSBTZWFzb24gPSBcIkZhbGxcIiB8IFwiU3ByaW5nXCIgfCBcIlN1bW1lciAxXCIgfCBcIlN1bW1lciAyXCI7XG5cbmV4cG9ydCB0eXBlIERlc2t0b3BOb3RpZkJvZHkgPSB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIGV4cGlyYXRpb25UaW1lPzogbnVtYmVyO1xuICBrZXlzOiB7XG4gICAgcDI1NmRoOiBzdHJpbmc7XG4gICAgYXV0aDogc3RyaW5nO1xuICB9O1xuICBuYW1lPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUGhvbmVOb3RpZkJvZHkgPSB7XG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09IEFQSSBSb3V0ZSBUeXBlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE9uIGJhY2tlbmQsIHZhbGlkYXRlZCB3aXRoIGh0dHBzOi8vZG9jcy5uZXN0anMuY29tL3RlY2huaXF1ZXMvdmFsaWRhdGlvblxuLy8gQVBJIHJvdXRlIFBhcmFtcyBhbmQgUmVzcG9uc2VzXG5cbi8vIE9mZmljZSBIb3VycyBSZXNwb25zZSBUeXBlc1xuZXhwb3J0IGNsYXNzIEdldFByb2ZpbGVSZXNwb25zZSBleHRlbmRzIFVzZXIge31cblxuZXhwb3J0IGNsYXNzIEtob3VyeURhdGFQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBlbWFpbCE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBmaXJzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGxhc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNJbnQoKVxuICBjYW1wdXMhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNTdHJpbmcoKVxuICBwaG90b191cmwhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgY291cnNlcyE6IEtob3VyeVN0dWRlbnRDb3Vyc2VbXTtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICB0YV9jb3Vyc2VzITogS2hvdXJ5VEFDb3Vyc2VbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVN0dWRlbnRDb3Vyc2Uge1xuICBASXNJbnQoKVxuICBjcm4hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhY2NlbGVyYXRlZCE6IGJvb2xlYW47XG5cbiAgQElzSW50KClcbiAgc2VjdGlvbiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICB0aXRsZSE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVRBQ291cnNlIHtcbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEtob3VyeVJlZGlyZWN0UmVzcG9uc2Uge1xuICByZWRpcmVjdDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZVBhcmFtcyB7XG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBwaG9uZU5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBWYWxpZGF0ZUlmKChvKSA9PiBvLnBob25lTm90aWZzRW5hYmxlZClcbiAgQElzU3RyaW5nKClcbiAgQElzTm90RW1wdHkoKVxuICBwaG9uZU51bWJlcj86IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGZpcnN0TmFtZT86IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxhc3ROYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUmVzcG9uc2Uge1xuICBpZCE6IG51bWJlcjtcbiAgbmFtZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBPZmZpY2VIb3VyUGFydGlhbClcbiAgb2ZmaWNlSG91cnMhOiBBcnJheTxPZmZpY2VIb3VyUGFydGlhbD47XG5cbiAgQFR5cGUoKCkgPT4gUXVldWVQYXJ0aWFsKVxuICBxdWV1ZXMhOiBRdWV1ZVBhcnRpYWxbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXVlUmVzcG9uc2UgZXh0ZW5kcyBRdWV1ZVBhcnRpYWwge31cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVF1ZXVlc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVldWVQYXJ0aWFsPiB7fVxuXG5leHBvcnQgY2xhc3MgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlIHtcbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHlvdXJRdWVzdGlvbj86IFF1ZXN0aW9uO1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWVzdGlvbnNHZXR0aW5nSGVscCE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHByaW9yaXR5UXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgdGV4dCE6IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgcXVldWVJZCE6IG51bWJlcjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgZm9yY2UhOiBib29sZWFuO1xufVxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVldWVJZD86IG51bWJlcjtcblxuICBASXNFbnVtKFF1ZXN0aW9uU3RhdHVzS2V5cylcbiAgQElzT3B0aW9uYWwoKVxuICBzdGF0dXM/OiBRdWVzdGlvblN0YXR1cztcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IHR5cGUgVEFVcGRhdGVTdGF0dXNSZXNwb25zZSA9IFF1ZXVlUGFydGlhbDtcbmV4cG9ydCB0eXBlIFF1ZXVlTm90ZVBheWxvYWRUeXBlID0ge1xuICBub3Rlczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFRBQ2hlY2tvdXRSZXNwb25zZSB7XG4gIC8vIFRoZSBJRCBvZiB0aGUgcXVldWUgd2UgY2hlY2tlZCBvdXQgb2ZcbiAgcXVldWVJZCE6IG51bWJlcjtcbiAgY2FuQ2xlYXJRdWV1ZSE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgbmV4dE9mZmljZUhvdXJUaW1lPzogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXVlUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBub3Rlcz86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWxsb3dRdWVzdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU1NFUXVldWVSZXNwb25zZSB7XG4gIHF1ZXVlPzogR2V0UXVldWVSZXNwb25zZTtcbiAgcXVlc3Rpb25zPzogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0JvZHkge1xuICBUb0NvdW50cnk6IHN0cmluZztcbiAgVG9TdGF0ZTogc3RyaW5nO1xuICBTbXNNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIE51bU1lZGlhOiBzdHJpbmc7XG4gIFRvQ2l0eTogc3RyaW5nO1xuICBGcm9tWmlwOiBzdHJpbmc7XG4gIFNtc1NpZDogc3RyaW5nO1xuICBGcm9tU3RhdGU6IHN0cmluZztcbiAgU21zU3RhdHVzOiBzdHJpbmc7XG4gIEZyb21DaXR5OiBzdHJpbmc7XG4gIEJvZHk6IHN0cmluZztcbiAgRnJvbUNvdW50cnk6IHN0cmluZztcbiAgVG86IHN0cmluZztcbiAgVG9aaXA6IHN0cmluZztcbiAgTnVtU2VnbWVudHM6IHN0cmluZztcbiAgTWVzc2FnZVNpZDogc3RyaW5nO1xuICBBY2NvdW50U2lkOiBzdHJpbmc7XG4gIEZyb206IHN0cmluZztcbiAgQXBpVmVyc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIHtcbiAgcmVsZWFzZU5vdGVzOiB1bmtub3duO1xuICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9NRVNTQUdFUyA9IHtcbiAgcXVlc3Rpb25Db250cm9sbGVyOiB7XG4gICAgY3JlYXRlUXVlc3Rpb246IHtcbiAgICAgIGludmFsaWRRdWV1ZTogXCJQb3N0ZWQgdG8gYW4gaW52YWxpZCBxdWV1ZVwiLFxuICAgICAgbm9OZXdRdWVzdGlvbnM6IFwiUXVldWUgbm90IGFsbG93aW5nIG5ldyBxdWVzdGlvbnNcIixcbiAgICAgIGNsb3NlZFF1ZXVlOiBcIlF1ZXVlIGlzIGNsb3NlZFwiLFxuICAgICAgb25lUXVlc3Rpb25BdEFUaW1lOiBcIllvdSBjYW4ndCBjcmVhdGUgbW9yZSB0aGFuIG9uZSBxdWVzdGlvbiBhdCBhIHRpbWUuXCIsXG4gICAgfSxcbiAgICB1cGRhdGVRdWVzdGlvbjoge1xuICAgICAgZnNtVmlvbGF0aW9uOiAoXG4gICAgICAgIHJvbGU6IHN0cmluZyxcbiAgICAgICAgcXVlc3Rpb25TdGF0dXM6IHN0cmluZyxcbiAgICAgICAgYm9keVN0YXR1czogc3RyaW5nXG4gICAgICApOiBzdHJpbmcgPT5cbiAgICAgICAgYCR7cm9sZX0gY2Fubm90IGNoYW5nZSBzdGF0dXMgZnJvbSAke3F1ZXN0aW9uU3RhdHVzfSB0byAke2JvZHlTdGF0dXN9YCxcbiAgICAgIHRhT25seUVkaXRRdWVzdGlvblN0YXR1czogXCJUQS9Qcm9mZXNzb3JzIGNhbiBvbmx5IGVkaXQgcXVlc3Rpb24gc3RhdHVzXCIsXG4gICAgICBvdGhlclRBSGVscGluZzogXCJBbm90aGVyIFRBIGlzIGN1cnJlbnRseSBoZWxwaW5nIHdpdGggdGhpcyBxdWVzdGlvblwiLFxuICAgICAgb3RoZXJUQVJlc29sdmVkOiBcIkFub3RoZXIgVEEgaGFzIGFscmVhZHkgcmVzb2x2ZWQgdGhpcyBxdWVzdGlvblwiLFxuICAgICAgdGFIZWxwaW5nT3RoZXI6IFwiVEEgaXMgYWxyZWFkeSBoZWxwaW5nIHNvbWVvbmUgZWxzZVwiLFxuICAgICAgbG9naW5Vc2VyQ2FudEVkaXQ6IFwiTG9nZ2VkLWluIHVzZXIgZG9lcyBub3QgaGF2ZSBlZGl0IGFjY2Vzc1wiLFxuICAgIH0sXG4gIH0sXG4gIGxvZ2luQ29udHJvbGxlcjoge1xuICAgIHJlY2VpdmVEYXRhRnJvbUtob3VyeTogXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBtZXNzYWdlTm90RnJvbVR3aWxpbzogXCJNZXNzYWdlIG5vdCBmcm9tIFR3aWxpb1wiLFxuICB9LFxuICBub3RpZmljYXRpb25TZXJ2aWNlOiB7XG4gICAgcmVnaXN0ZXJQaG9uZTogXCJwaG9uZSBudW1iZXIgaW52YWxpZFwiLFxuICB9LFxuICBxdWVzdGlvblJvbGVHdWFyZDoge1xuICAgIHF1ZXN0aW9uTm90Rm91bmQ6IFwiUXVlc3Rpb24gbm90IGZvdW5kXCIsXG4gICAgcXVldWVPZlF1ZXN0aW9uTm90Rm91bmQ6IFwiQ2Fubm90IGZpbmQgcXVldWUgb2YgcXVlc3Rpb25cIixcbiAgICBxdWV1ZURvZXNOb3RFeGlzdDogXCJUaGlzIHF1ZXVlIGRvZXMgbm90IGV4aXN0IVwiLFxuICB9LFxuICBxdWV1ZVJvbGVHdWFyZDoge1xuICAgIHF1ZXVlTm90Rm91bmQ6IFwiUXVldWUgbm90IGZvdW5kXCIsXG4gIH0sXG4gIHJlbGVhc2VOb3Rlc0NvbnRyb2xsZXI6IHtcbiAgICByZWxlYXNlTm90ZXNUaW1lOiAoZTogYW55KTogc3RyaW5nID0+XG4gICAgICBcIkVycm9yIFBhcnNpbmcgcmVsZWFzZSBub3RlcyB0aW1lOiBcIiArIGUsXG4gIH0sXG4gIHJvbGVHdWFyZDoge1xuICAgIG5vdExvZ2dlZEluOiBcIk11c3QgYmUgbG9nZ2VkIGluXCIsXG4gICAgbm9Db3Vyc2VJZEZvdW5kOiBcIk5vIGNvdXJzZWlkIGZvdW5kXCIsXG4gICAgbm90SW5Db3Vyc2U6IFwiTm90IEluIFRoaXMgQ291cnNlXCIsXG4gICAgbXVzdEJlUm9sZVRvSm9pbkNvdXJzZTogKHJvbGVzOiBzdHJpbmdbXSk6IHN0cmluZyA9PlxuICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXCIsIFwiKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybVwiKTsiLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRXZlbnQgaW4gdGhlIEV2ZW50TW9kZWwgdGFibGUsIHVzZWQgZm9yIGFkdmFuY2VkIG1ldHJpY3MuXG4gKi9cbmV4cG9ydCBlbnVtIEV2ZW50VHlwZSB7XG4gIFRBX0NIRUNLRURfSU4gPSAndGFDaGVja2VkSW4nLFxuICBUQV9DSEVDS0VEX09VVCA9ICd0YUNoZWNrZWRPdXQnLFxufVxuXG5ARW50aXR5KCdldmVudF9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRXZlbnRNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHRpbWU6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogRXZlbnRUeXBlIH0pXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLmV2ZW50cylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4vc2VtZXN0ZXIuZW50aXR5JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIGluIHRoZSBjb250ZXh0IG9mIG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqIEBwYXJhbSBzZW1lc3RlciAtIFRoZSBzZW1lc3RlciBvZiB0aGlzIGNvdXJzZS5cbiAqL1xuLyppbnRlcmZhY2UgQ291cnNlIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBzZW1lc3RlcjogU2VtZXN0ZXI7XG4gICAgdXNlcnM6IFVzZXJDb3Vyc2VbXVxufSovXG5cbkBFbnRpdHkoJ2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5jb3Vyc2UpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5jb3Vyc2UpXG4gIHF1ZXVlczogUXVldWVNb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBpY2FsVVJMOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gVXNlckNvdXJzZU1vZGVsLCAodWNtKSA9PiB1Y20uY291cnNlKVxuICBARXhjbHVkZSgpXG4gIHVzZXJDb3Vyc2VzOiBVc2VyQ291cnNlTW9kZWw7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gU2VtZXN0ZXJNb2RlbCwgKHNlbWVzdGVyKSA9PiBzZW1lc3Rlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdzZW1lc3RlcklkJyB9KVxuICBARXhjbHVkZSgpXG4gIHNlbWVzdGVyOiBTZW1lc3Rlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIC8vIFRPRE86IGNhbiB3ZSBtYWtlIHRoZXNlIG5vdCBudWxsYWJsZSBhbmQgd29yayB3aXRoIFR5cGVPUk1cbiAgc2VtZXN0ZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ2Jvb2xlYW4nLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGVuYWJsZWQ6IGJvb2xlYW47IC8vIFNldCB0byB0cnVlIGlmIHRoZSBnaXZlbiB0aGUgY291cnNlIGlzIHVzaW5nIG91ciBhcHBcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LmNvdXJzZSlcbiAgQEV4Y2x1ZGUoKVxuICBldmVudHM6IEV2ZW50TW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIE9uZVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbGFzdE5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LnVzZXIpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnZGVza3RvcF9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBleHBpcmF0aW9uVGltZTogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcDI1NmRoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGF1dGg6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmRlc2t0b3BOb3RpZnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7IHR5cGU6ICd0aW1lc3RhbXAnIH0pXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ3RleHQnLCBudWxsYWJsZTogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3Bob25lX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBQaG9uZU5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5waG9uZU5vdGlmKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHZlcmlmaWVkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBKb2luVGFibGUsXG4gIExlc3NUaGFuT3JFcXVhbCxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBNb3JlVGhhbk9yRXF1YWwsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcblxuaW50ZXJmYWNlIFRpbWVJbnRlcnZhbCB7XG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcbn1cblxuQEVudGl0eSgncXVldWVfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UucXVldWVzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICByb29tOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVlc3Rpb25Nb2RlbCwgKHFtKSA9PiBxbS5xdWV1ZSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBub3Rlczogc3RyaW5nO1xuXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnF1ZXVlcylcbiAgQEpvaW5UYWJsZSgpXG4gIHN0YWZmTGlzdDogVXNlck1vZGVsW107XG5cbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuXG4gIEBFeGNsdWRlKClcbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLnF1ZXVlKVxuICBASm9pblRhYmxlKClcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcblxuICBpc09wZW46IGJvb2xlYW47XG5cbiAgYXN5bmMgY2hlY2tJc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuc3RhZmZMaXN0ICYmIHRoaXMuc3RhZmZMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IE1TX0lOX01JTlVURSA9IDYwMDAwO1xuICAgIGNvbnN0IG9ocyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCBvcGVuID0gISFvaHMuZmluZChcbiAgICAgIChlKSA9PlxuICAgICAgICBlLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxMCAqIE1TX0lOX01JTlVURSA8IG5vdy5nZXRUaW1lKCkgJiZcbiAgICAgICAgZS5lbmRUaW1lLmdldFRpbWUoKSArIDEgKiBNU19JTl9NSU5VVEUgPiBub3cuZ2V0VGltZSgpLFxuICAgICk7XG4gICAgdGhpcy5pc09wZW4gPSBvcGVuO1xuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcXVldWVTaXplOiBudW1iZXI7XG5cbiAgYXN5bmMgYWRkUXVldWVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVTaXplID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZSh0aGlzLmlkKS5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSwgUm9sZSwgU3RhdHVzSW5RdWV1ZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnLi9xdWVzdGlvbi1mc20nO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBmaXJzdCBoZWxwZWQgKGRvZXNuJ3Qgb3ZlcndyaXRlKVxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBmaXJzdEhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBsYXN0IGhlbHBlZCAoZ2V0dGluZyBoZWxwIGFnYWluIG9uIHByaW9yaXR5IHF1ZXVlIG92ZXJ3cml0ZXMpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICAvLyBXaGVuIHRoZSBxdWVzdGlvbiBsZWF2ZXMgdGhlIHF1ZXVlXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjbG9zZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWVzdGlvblR5cGU6IFF1ZXN0aW9uVHlwZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc3RhdHVzOiBRdWVzdGlvblN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbG9jYXRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBhcyB0aGUgZ2l2ZW4gcm9sZVxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIHN0YXR1cyBjaGFuZ2Ugc3VjY2VlZGVkXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU3RhdHVzKG5ld1N0YXR1czogUXVlc3Rpb25TdGF0dXMsIHJvbGU6IFJvbGUpOiBib29sZWFuIHtcbiAgICBpZiAoY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXModGhpcy5zdGF0dXMsIG5ld1N0YXR1cywgcm9sZSkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHN0YXR1c2VzOiBRdWVzdGlvblN0YXR1c1tdLFxuICApOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlcyxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXN0aW9ucyB0aGF0IGFyZSBvcGVuIGluIHRoZSBxdWV1ZSAobm90IGluIHByaW9yaXR5IHF1ZXVlKVxuICAgKi9cbiAgc3RhdGljIHdhaXRpbmdJblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgU3RhdHVzSW5RdWV1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF06IHtcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGVdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24sIENyb25FeHByZXNzaW9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICdjb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCB7IENvbm5lY3Rpb24sIExlc3NUaGFuT3JFcXVhbCwgTW9yZVRoYW5PckVxdWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIENsZWFuIHRoZSBxdWV1ZSBhbmQgbWFyayBzdGFsZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVDbGVhblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgQENyb24oQ3JvbkV4cHJlc3Npb24uRVZFUllfREFZX0FUX01JRE5JR0hUKVxuICBwcml2YXRlIGFzeW5jIGNsZWFuQWxsUXVldWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zOiBRdWV1ZU1vZGVsW10gPSBhd2FpdCBRdWV1ZU1vZGVsLmdldFJlcG9zaXRvcnkoKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVldWUnKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWV1ZV9tb2RlbC5xdWVzdGlvbnMnLCAncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXMpJywge1xuICAgICAgICBzdGF0dXM6IE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICAgIH0pXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9ucy5tYXAoKHF1ZXVlKSA9PiB0aGlzLmNsZWFuUXVldWUocXVldWUuaWQpKSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFuUXVldWUocXVldWVJZDogbnVtYmVyLCBmb3JjZT86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoZm9yY2UgfHwgIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgcXVldWUubm90ZXMgPSAnJztcbiAgICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAgIGF3YWl0IHRoaXMudW5zYWZlQ2xlYW4ocXVldWUuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNob3VsZCB3ZSBjb25zaWRlciBjbGVhbmluZyB0aGUgcXVldWU/XG4gIC8vICBDaGVja3MgaWYgdGhlcmUgYXJlIG5vIHN0YWZmLCBvcGVuIHF1ZXN0aW9ucyBhbmQgdGhhdCB0aGVyZSBhcmVuJ3QgYW55IG9mZmljZSBob3VycyBzb29uXG4gIHB1YmxpYyBhc3luYyBzaG91bGRDbGVhblF1ZXVlKHF1ZXVlOiBRdWV1ZU1vZGVsKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIExhc3QgVEEgdG8gY2hlY2tvdXQsIHNvIGNoZWNrIGlmIHdlIG1pZ2h0IHdhbnQgdG8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICBjb25zdCBhcmVBbnlRdWVzdGlvbnNPcGVuID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgICAgICAgcXVldWUuaWQsXG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgICApLmdldENvdW50KCkpID4gMDtcbiAgICAgIGlmIChhcmVBbnlRdWVzdGlvbnNPcGVuKSB7XG4gICAgICAgIGNvbnN0IHNvb24gPSBtb21lbnQoKS5hZGQoMTUsICdtaW51dGVzJykudG9EYXRlKCk7XG4gICAgICAgIGNvbnN0IGFyZU9mZmljZUhvdXJTb29uID1cbiAgICAgICAgICAoYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmNvdW50KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogTGVzc1RoYW5PckVxdWFsKHNvb24pLFxuICAgICAgICAgICAgICBlbmRUaW1lOiBNb3JlVGhhbk9yRXF1YWwoc29vbiksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pKSA+IDA7XG4gICAgICAgIGlmICghYXJlT2ZmaWNlSG91clNvb24pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVuc2FmZUNsZWFuKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgICBxdWV1ZUlkLFxuICAgICAgT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICkuZ2V0TWFueSgpO1xuICAgIGNvbnN0IG9wZW5RdWVzdGlvbnMgPSBxdWVzdGlvbnMuZmlsdGVyKFxuICAgICAgKHEpID0+IHEuc3RhdHVzIGluIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgICApO1xuXG4gICAgb3BlblF1ZXN0aW9ucy5mb3JFYWNoKChxOiBRdWVzdGlvbk1vZGVsKSA9PiB7XG4gICAgICBxLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlO1xuICAgICAgcS5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUob3BlblF1ZXN0aW9ucyk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb3Vyc2VSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY291cnNlSWQgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENhbkFjdGl2YXRlLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZsZWN0b3IgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZXNHdWFyZCB7XG4gIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuO1xuXG4gIHNldHVwRGF0YShyZXF1ZXN0OiBhbnkpOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZsZWN0b3I6IFJlZmxlY3Rvcikge31cblxuICBhc3luYyBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLnJlZmxlY3Rvci5nZXQ8c3RyaW5nW10+KCdyb2xlcycsIGNvbnRleHQuZ2V0SGFuZGxlcigpKTtcbiAgICBpZiAoIXJvbGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IGNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHsgY291cnNlSWQsIHVzZXIgfSA9IGF3YWl0IHRoaXMuc2V0dXBEYXRhKHJlcXVlc3QpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub3RMb2dnZWRJbik7XG4gICAgfVxuXG4gICAgaWYgKCFjb3Vyc2VJZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub0NvdXJzZUlkRm91bmQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hdGNoUm9sZXMocm9sZXMsIHVzZXIsIGNvdXJzZUlkKTtcbiAgfVxuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucm9sZUd1YXJkLm5vdEluQ291cnNlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1haW5pbmcgPSByb2xlcy5maWx0ZXIoKHJvbGUpID0+IHtcbiAgICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGUudG9TdHJpbmcoKSA9PT0gcm9sZTtcbiAgICB9KTtcblxuICAgIGlmIChyZW1haW5pbmcubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5tdXN0QmVSb2xlVG9Kb2luQ291cnNlKHJvbGVzKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbWFpbmluZy5sZW5ndGggPiAwO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSb2xlLCBTU0VRdWV1ZVJlc3BvbnNlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnc3NlL3NzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5cbnR5cGUgUXVldWVDbGllbnRNZXRhZGF0YSA9IHsgdXNlcklkOiBudW1iZXI7IHJvbGU6IFJvbGUgfTtcblxuY29uc3QgaWRUb1Jvb20gPSAocXVldWVJZDogbnVtYmVyKSA9PiBgcS0ke3F1ZXVlSWR9YDtcbi8qKlxuICogSGFuZGxlIHNlbmRpbmcgcXVldWUgc3NlIGV2ZW50c1xuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVTU0VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgICBwcml2YXRlIHNzZVNlcnZpY2U6IFNTRVNlcnZpY2U8UXVldWVDbGllbnRNZXRhZGF0YT4sXG4gICkge31cblxuICBzdWJzY3JpYmVDbGllbnQoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHJlczogUmVzcG9uc2UsXG4gICAgbWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuc3NlU2VydmljZS5zdWJzY3JpYmVDbGllbnQoaWRUb1Jvb20ocXVldWVJZCksIHsgcmVzLCBtZXRhZGF0YSB9KTtcbiAgfVxuXG4gIC8vIFNlbmQgZXZlbnQgd2l0aCBuZXcgcXVlc3Rpb25zLCBidXQgbm8gbW9yZSB0aGFuIG9uY2UgYSBzZWNvbmRcbiAgdXBkYXRlUXVlc3Rpb25zID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICBpZiAocXVlc3Rpb25zKSB7XG4gICAgICB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKHsgcm9sZSwgdXNlcklkIH0pID0+ICh7XG4gICAgICAgIHF1ZXN0aW9uczogYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UucGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgICAgICAgcXVldWVJZCxcbiAgICAgICAgICBxdWVzdGlvbnMsXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIHJvbGUsXG4gICAgICAgICksXG4gICAgICB9KSk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVRdWV1ZSA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICgpID0+ICh7IHF1ZXVlIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHByaXZhdGUgYXN5bmMgc2VuZFRvUm9vbShcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgZGF0YTogKG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhKSA9PiBQcm9taXNlPFNTRVF1ZXVlUmVzcG9uc2U+LFxuICApIHtcbiAgICBhd2FpdCB0aGlzLnNzZVNlcnZpY2Uuc2VuZEV2ZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCBkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgdGhyb3R0bGVVcGRhdGUodXBkYXRlRnVuY3Rpb246IChxdWV1ZUlkOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICByZXR1cm4gdGhyb3R0bGUoXG4gICAgICBhc3luYyAocXVldWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlRnVuY3Rpb24ocXVldWVJZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9LFxuICAgICAgMTAwMCxcbiAgICAgIHtcbiAgICAgICAgbGVhZGluZzogZmFsc2UsXG4gICAgICAgIHRyYWlsaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50PFQ+IHtcbiAgbWV0YWRhdGE6IFQ7XG4gIHJlczogUmVzcG9uc2U7XG59XG4vKipcbiAqIFQgaXMgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIGVhY2ggQ2xpZW50XG4gKlxuICogTG93IGxldmVsIGFic3RyYWN0aW9uIGZvciBzZW5kaW5nIFNTRSB0byBcInJvb21zXCIgb2YgY2xpZW50cy5cbiAqIFByb2JhYmx5IGRvbid0IHVzZSB0aGlzIGRpcmVjdGx5LCBhbmQgd3JhcCBpdCBpbiBhIHNlcnZpY2Ugc3BlY2lmaWMgdG8gdGhhdCBldmVudCBzb3VyY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNTRVNlcnZpY2U8VD4ge1xuICBwcml2YXRlIGNsaWVudHM6IFJlY29yZDxhbnksIENsaWVudDxUPltdPiA9IHt9O1xuXG4gIC8qKiBBZGQgYSBjbGllbnQgdG8gYSByb29tICovXG4gIHN1YnNjcmliZUNsaWVudChyb29tOiBzdHJpbmcsIGNsaWVudDogQ2xpZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gS2VlcCB0cmFjayBvZiByZXNwb25zZXMgc28gd2UgY2FuIHNlbmQgc3NlIHRocm91Z2ggdGhlbVxuICAgIGlmICghKHJvb20gaW4gdGhpcy5jbGllbnRzKSkge1xuICAgICAgdGhpcy5jbGllbnRzW3Jvb21dID0gW107XG4gICAgfVxuICAgIGNvbnN0IHJvb21yZWYgPSB0aGlzLmNsaWVudHNbcm9vbV07XG4gICAgcm9vbXJlZi5wdXNoKGNsaWVudCk7XG5cbiAgICAvLyBSZW1vdmUgZGVhZCBjb25uZWN0aW9ucyFcbiAgICBjbGllbnQucmVzLnNvY2tldC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgcm9vbXJlZi5zcGxpY2Uocm9vbXJlZi5pbmRleE9mKGNsaWVudCksIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNlbmQgc29tZSBkYXRhIHRvIGV2ZXJ5b25lIGluIGEgcm9vbSAqL1xuICBhc3luYyBzZW5kRXZlbnQ8RD4oXG4gICAgcm9vbTogc3RyaW5nLFxuICAgIHBheWxvYWQ6IChtZXRhZGF0YTogVCkgPT4gUHJvbWlzZTxEPixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHJvb20gaW4gdGhpcy5jbGllbnRzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYHNlbmRpbmcgc3NlIHRvICR7dGhpcy5jbGllbnRzW3Jvb21dLmxlbmd0aH0gY2xpZW50cyBpbiAke3Jvb219YCxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLnRpbWUoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgICAgYXBtLnN0YXJ0VHJhbnNhY3Rpb24oJ3NzZScpO1xuICAgICAgZm9yIChjb25zdCB7IHJlcywgbWV0YWRhdGEgfSBvZiB0aGlzLmNsaWVudHNbcm9vbV0pIHtcbiAgICAgICAgY29uc3QgdG9TZW5kID0gYGRhdGE6ICR7c2VyaWFsaXplKGF3YWl0IHBheWxvYWQobWV0YWRhdGEpKX1cXG5cXG5gO1xuICAgICAgICByZXMud3JpdGUodG9TZW5kKTtcbiAgICAgIH1cbiAgICAgIGFwbS5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgY29uc29sZS50aW1lRW5kKGBzZW5kaW5nIHNzZSB0aW1lOiBgKTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGVcIik7IiwiaW1wb3J0IHtcbiAgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uLFxuICBSb2xlLFxuICBTdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIFN0YXR1c0luUXVldWUsXG4gIFN0YXR1c1NlbnRUb0NyZWF0b3IsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgY2xhc3NUb0NsYXNzLCBjbGFzc1RvUGxhaW4gfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogR2V0IGRhdGEgaW4gc2VydmljZSBvZiB0aGUgcXVldWUgY29udHJvbGxlciBhbmQgU1NFXG4gKiBXSFk/IFRvIGVuc3VyZSBkYXRhIHJldHVybmVkIGJ5IGVuZHBvaW50cyBpcyAqZXhhY3RseSogZXF1YWwgdG8gZGF0YSBzZW50IGJ5IFNTRVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIGFzeW5jIGdldFF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcbiAgICBhd2FpdCBxdWV1ZS5hZGRRdWV1ZVRpbWVzKCk7XG4gICAgYXdhaXQgcXVldWUuY2hlY2tJc09wZW4oKTtcbiAgICBhd2FpdCBxdWV1ZS5hZGRRdWV1ZVNpemUoKTtcblxuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIGFzeW5jIGdldFF1ZXN0aW9ucyhxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIC8vIHRvZG86IE1ha2UgYSBzdHVkZW50IGFuZCBhIFRBIHZlcnNpb24gb2YgdGhpcyBmdW5jdGlvbiwgYW5kIHN3aXRjaCB3aGljaCBvbmUgdG8gdXNlIGluIHRoZSBjb250cm9sbGVyXG4gICAgLy8gZm9yIG5vdywganVzdCByZXR1cm4gdGhlIHN0dWRlbnQgcmVzcG9uc2VcbiAgICBjb25zdCBxdWV1ZVNpemUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNvdW50KHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWV1ZUlkIH0sXG4gICAgfSk7XG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgcXVldWUgZXhpc3RzXG4gICAgaWYgKHF1ZXVlU2l6ZSA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb25zRnJvbURiID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhxdWV1ZUlkLCBbXG4gICAgICAuLi5TdGF0dXNJblByaW9yaXR5UXVldWUsXG4gICAgICAuLi5TdGF0dXNJblF1ZXVlLFxuICAgICAgT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgXSlcbiAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdCgncXVlc3Rpb24uY3JlYXRvcicsICdjcmVhdG9yJylcbiAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdCgncXVlc3Rpb24udGFIZWxwZWQnLCAndGFIZWxwZWQnKVxuICAgICAgLmdldE1hbnkoKTtcblxuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IG5ldyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UoKTtcblxuICAgIHF1ZXN0aW9ucy5xdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5RdWV1ZS5pbmNsdWRlcyhxdWVzdGlvbi5zdGF0dXMgYXMgT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICApO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXN0aW9uc0dldHRpbmdIZWxwID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcihcbiAgICAgIChxdWVzdGlvbikgPT4gcXVlc3Rpb24uc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICApO1xuXG4gICAgcXVlc3Rpb25zLnByaW9yaXR5UXVldWUgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKChxdWVzdGlvbikgPT5cbiAgICAgIFN0YXR1c0luUHJpb3JpdHlRdWV1ZS5pbmNsdWRlcyhxdWVzdGlvbi5zdGF0dXMgYXMgT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIC8qKiBIaWRlIHNlbnNpdGl2ZSBkYXRhIHRvIG90aGVyIHN0dWRlbnRzICovXG4gIGFzeW5jIHBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBxdWVzdGlvbnM6IExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGlmIChyb2xlID09PSBSb2xlLlNUVURFTlQpIHtcbiAgICAgIGNvbnN0IG5ld0xRUiA9IG5ldyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UoKTtcbiAgICAgIE9iamVjdC5hc3NpZ24obmV3TFFSLCBxdWVzdGlvbnMpO1xuXG4gICAgICBuZXdMUVIucXVldWUgPSBxdWVzdGlvbnMucXVldWUubWFwKChxdWVzdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBjcmVhdG9yID1cbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkID09PSB1c2VySWRcbiAgICAgICAgICAgID8gcXVlc3Rpb24uY3JlYXRvclxuICAgICAgICAgICAgOiBwaWNrKHF1ZXN0aW9uLmNyZWF0b3IsIFsnaWQnXSk7XG4gICAgICAgIC8vIGNsYXNzVG9DbGFzcyB0cmFuc2Zvcm1lciB3aWxsIGFwcGx5IHRoZSBARXhjbHVkZXNcbiAgICAgICAgcmV0dXJuIGNsYXNzVG9DbGFzczxRdWVzdGlvbj4oXG4gICAgICAgICAgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoeyAuLi5xdWVzdGlvbiwgY3JlYXRvciB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXdMUVIueW91clF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBjcmVhdG9ySWQ6IHVzZXJJZCxcbiAgICAgICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgICAgIHN0YXR1czogSW4oU3RhdHVzU2VudFRvQ3JlYXRvciksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIG5ld0xRUi5wcmlvcml0eVF1ZXVlID0gW107XG5cbiAgICAgIHJldHVybiBuZXdMUVI7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlQ29udHJvbGxlciB9IGZyb20gJy4vcXVldWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICdzc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXVlLnN1YnNjcmliZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWV1ZUNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtcbiAgICBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBRdWV1ZVNlcnZpY2UsXG4gICAgUXVldWVTU0VTZXJ2aWNlLFxuICAgIFF1ZXVlU3Vic2NyaWJlcixcbiAgXSxcbiAgZXhwb3J0czogW1F1ZXVlQ2xlYW5TZXJ2aWNlLCBRdWV1ZVNTRVNlcnZpY2VdLFxuICBpbXBvcnRzOiBbU1NFTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVldWVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEdldFF1ZXVlUmVzcG9uc2UsXG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgUm9sZSxcbiAgVXBkYXRlUXVldWVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFBvc3QsXG4gIFJlcyxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICdwcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3F1ZXVlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVldWVSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWV1ZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlQ2xlYW5TZXJ2aWNlOiBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxHZXRRdWV1ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICB9XG5cbiAgQEdldCgnOnF1ZXVlSWQvcXVlc3Rpb25zJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXN0aW9ucyhcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UucGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgICBxdWV1ZUlkLFxuICAgICAgcXVlc3Rpb25zLFxuICAgICAgdXNlcklkLFxuICAgICAgcm9sZSxcbiAgICApO1xuICB9XG5cbiAgQFBhdGNoKCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgdXBkYXRlUXVldWUoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVldWVQYXJhbXMsXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIHF1ZXVlLm5vdGVzID0gYm9keS5ub3RlcztcbiAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IGJvZHkuYWxsb3dRdWVzdGlvbnM7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBQb3N0KCc6cXVldWVJZC9jbGVhbicpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgY2xlYW5RdWV1ZShAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBDbGVhbiB1cCBxdWV1ZSBpZiBuZWNlc3NhcnlcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVDbGVhblNlcnZpY2UuY2xlYW5RdWV1ZShxdWV1ZUlkLCB0cnVlKTtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlSWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRW5kcG9pbnQgdG8gc2VuZCBmcm9udGVuZCByZWNlaXZlIHNlcnZlci1zZW50IGV2ZW50cyB3aGVuIHF1ZXVlIGNoYW5nZXNcbiAgQEdldCgnOnF1ZXVlSWQvc3NlJylcbiAgc2VuZEV2ZW50KFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICk6IHZvaWQge1xuICAgIHJlcy5zZXQoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2V2ZW50LXN0cmVhbScsXG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScsXG4gICAgICAnWC1BY2NlbC1CdWZmZXJpbmcnOiAnbm8nLFxuICAgICAgQ29ubmVjdGlvbjogJ2tlZXAtYWxpdmUnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KHF1ZXVlSWQsIHJlcywgeyByb2xlLCB1c2VySWQgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgUXVldWVSb2xlID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIGFzeW5jIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlPy5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZTtcbiAgfSxcbik7XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucXVldWVSb2xlR3VhcmQucXVldWVOb3RGb3VuZCk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnLi9zc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoeyBwcm92aWRlcnM6IFtTU0VTZXJ2aWNlXSwgZXhwb3J0czogW1NTRVNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgU1NFTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU3Vic2NyaWJlciBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVldWVNb2RlbD4ge1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSkge1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWV1ZU1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXVlTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShldmVudC5lbnRpdHkuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElDYWxDb21tYW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaWNhbDpzY3JhcGUnLFxuICAgIGRlc2NyaWJlOiAnc2NyYXBlIGljYWwgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaWNhbFNlcnZpY2UudXBkYXRlQWxsQ291cnNlcygpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgTW9tZW50ID0gbW9tZW50Lk1vbWVudDtcblxudHlwZSBDcmVhdGVPZmZpY2VIb3VyID0gRGVlcFBhcnRpYWw8T2ZmaWNlSG91ck1vZGVsPltdO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWNhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgLy8gdHogc2hvdWxkIG5vdCBiZSBwcmVjb252ZXJ0ZWQgYnkgZmluZE9uZUlhbmFcbiAgcHJpdmF0ZSBmaXhPdXRsb29rVFooZGF0ZTogTW9tZW50LCB0ejogc3RyaW5nKTogTW9tZW50IHtcbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcbiAgICBpZiAoaWFuYSkge1xuICAgICAgLy8gTW92ZSB0byB0aGUgdGltZXpvbmUgYmVjYXVzZSBub2RlLWljYWwgZGlkbid0IGRvIGl0IGZvciB1cywgc2luY2UgaXQgZG9lcyBub3QgcmVjb2duaXplIHdpbmRvd3MgdGltZXpvbmVcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkudHooaWFuYSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGRhdGUgb2Ygb2NjdXJlbmNlcyBmb3IgYW4gcnJ1bGUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLCBleGNsdWRpbmcgdGhlIGxpc3Qgb2YgZGF0ZXNcbiAgcHJpdmF0ZSBycnVsZVRvRGF0ZXMocnJ1bGU6IGFueSwgZXZlbnRUWjogc3RyaW5nLCBleGRhdGVSYXc6IERhdGVbXSk6IERhdGVbXSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBycnVsZTtcbiAgICBjb25zdCBkdHN0YXJ0OiBNb21lbnQgPSB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy5kdHN0YXJ0KSwgZXZlbnRUWik7XG4gICAgY29uc3QgdW50aWw6IE1vbWVudCA9XG4gICAgICBvcHRpb25zLnVudGlsICYmIHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLnVudGlsKSwgZXZlbnRUWik7XG4gICAgY29uc3QgZXZlbnRUWk1vbWVudCA9IG1vbWVudC50ei56b25lKGZpbmRPbmVJYW5hKGV2ZW50VFopIHx8IGV2ZW50VFopO1xuXG4gICAgLy8gR2V0IHRoZSBVVEMgT2Zmc2V0IGluIHRoaXMgZXZlbnQncyB0aW1lem9uZSwgYXQgdGhpcyB0aW1lLiBBY2NvdW50cyBmb3IgRGF5bGlnaHQgU2F2aW5ncyBhbmQgb3RoZXIgb2RkaXRpZXNcbiAgICBjb25zdCB0elVUQ09mZnNldE9uRGF0ZSA9IChkYXRlOiBNb21lbnQpID0+XG4gICAgICBldmVudFRaTW9tZW50LnV0Y09mZnNldChkYXRlLnZhbHVlT2YoKSk7XG4gICAgY29uc3QgZHRzdGFydFVUQ09mZnNldCA9IHR6VVRDT2Zmc2V0T25EYXRlKGR0c3RhcnQpO1xuXG4gICAgLy8gQXBwbHkgYSBVVEMgb2Zmc2V0IGluIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIE1vbWVudFxuICAgIGNvbnN0IGFwcGx5T2Zmc2V0ID0gKGRhdGU6IE1vbWVudCwgdXRjT2Zmc2V0OiBudW1iZXIpOiBNb21lbnQgPT5cbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdCh1dGNPZmZzZXQsICdtJyk7XG4gICAgLy8gYXBwbHkgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwcmVSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIGR0c3RhcnRVVENPZmZzZXQpO1xuICAgIC8vIFJldmVydCB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHBvc3RSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIC1kdHN0YXJ0VVRDT2Zmc2V0KTtcblxuICAgIC8vIEFkanVzdCBmb3IgcnJ1bGUgbm90IHRha2luZyBpbnRvIGFjY291bnQgRFNUIGluIGxvY2FsZVxuICAgIC8vICAgaWUuIFwiOHBtIGV2ZXJ5IGZyaWRheVwiIG1lYW5zIGhhdmluZyB0byBwdXNoIGJhY2sgNjAgbWludXRlcyBhZnRlciBGYWxsIEJhY2t3YXJkc1xuICAgIGNvbnN0IGZpeERTVCA9IChkYXRlOiBNb21lbnQpOiBNb21lbnQgPT5cbiAgICAgIC8vIEdldCB0aGUgZGlmZmVyZW5jZSBpbiBVVEMgb2Zmc2V0IGJldHdlZW4gZHRzdGFydCBhbmQgdGhpcyBkYXRlIChzbyBpZiB3ZSBjcm9zc2VkIERTVCBzd2l0Y2gsIHRoaXMgd2lsbCBiZSBub256ZXJvKVxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KGR0c3RhcnRVVENPZmZzZXQgLSB0elVUQ09mZnNldE9uRGF0ZShkYXRlKSwgJ20nKTtcblxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgUlJ1bGUoe1xuICAgICAgZnJlcTogb3B0aW9ucy5mcmVxLFxuICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICB3a3N0OiBvcHRpb25zLndrc3QsXG4gICAgICBjb3VudDogb3B0aW9ucy5jb3VudCxcbiAgICAgIGJ5d2Vla2RheTogb3B0aW9ucy5ieXdlZWtkYXksXG4gICAgICBkdHN0YXJ0OiBwcmVSUnVsZShkdHN0YXJ0KS50b0RhdGUoKSxcbiAgICAgIHVudGlsOiB1bnRpbCAmJiBwcmVSUnVsZSh1bnRpbCkudG9EYXRlKCksXG4gICAgfSk7XG5cbiAgICAvLyBEYXRlcyB0byBleGNsdWRlIGZyb20gcmVjdXJyZW5jZSwgc2VwYXJhdGUgZXhkYXRlIHRpbWVzdGFtcCBmb3IgZmlsdGVyaW5nXG4gICAgY29uc3QgZXhkYXRlczogbnVtYmVyW10gPSBPYmplY3QudmFsdWVzKGV4ZGF0ZVJhdyB8fCB7fSlcbiAgICAgIC5tYXAoKGQpID0+IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChkKSwgZXZlbnRUWikpXG4gICAgICAubWFwKChkKSA9PiBhcHBseU9mZnNldChkLCB0elVUQ09mZnNldE9uRGF0ZShkKSkudmFsdWVPZigpKTtcblxuICAgIC8vIERvaW5nIG1hdGggaGVyZSBiZWNhdXNlIG1vbWVudC5hZGQgY2hhbmdlcyBiZWhhdmlvciBiYXNlZCBvbiBzZXJ2ZXIgdGltZXpvbmVcbiAgICBjb25zdCBpbjEwV2Vla3MgPSBuZXcgRGF0ZShcbiAgICAgIGR0c3RhcnQudmFsdWVPZigpICsgMTAwMCAqIDYwICogNjAgKiAyNCAqIDcgKiAxMCxcbiAgICApO1xuICAgIHJldHVybiBydWxlXG4gICAgICAuYWxsKChkKSA9PiAhIXVudGlsIHx8IGQgPCBpbjEwV2Vla3MpXG4gICAgICAuZmlsdGVyKChkYXRlKSA9PiAhZXhkYXRlcy5pbmNsdWRlcyhkYXRlLmdldFRpbWUoKSkpXG4gICAgICAubWFwKChkKSA9PiBmaXhEU1QocG9zdFJSdWxlKG1vbWVudChkKSkpLnRvRGF0ZSgpKTtcbiAgfVxuXG4gIHBhcnNlSWNhbChpY2FsRGF0YTogQ2FsZW5kYXJSZXNwb25zZSwgY291cnNlSWQ6IG51bWJlcik6IENyZWF0ZU9mZmljZUhvdXIge1xuICAgIGNvbnN0IGljYWxEYXRhVmFsdWVzOiBBcnJheTxDYWxlbmRhckNvbXBvbmVudD4gPSBPYmplY3QudmFsdWVzKGljYWxEYXRhKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gaWNhbERhdGFWYWx1ZXMuZmlsdGVyKFxuICAgICAgKGlDYWxFbGVtZW50KTogaUNhbEVsZW1lbnQgaXMgVkV2ZW50ID0+XG4gICAgICAgIGlDYWxFbGVtZW50LnR5cGUgPT09ICdWRVZFTlQnICYmXG4gICAgICAgIGlDYWxFbGVtZW50LnN0YXJ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuZW5kICE9PSB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzRXZlbnRSZWdleCA9IC9cXGJeKE9IfEhvdXJzKVxcYi87XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9mZmljZUhvdXJzID0gb2ZmaWNlSG91cnMuZmlsdGVyKChldmVudCkgPT5cbiAgICAgIG9mZmljZUhvdXJzRXZlbnRSZWdleC50ZXN0KGV2ZW50LnN1bW1hcnkpLFxuICAgICk7XG5cbiAgICBsZXQgcmVzdWx0T2ZmaWNlSG91cnMgPSBbXTtcblxuICAgIGZpbHRlcmVkT2ZmaWNlSG91cnMuZm9yRWFjaCgob2g6IFZFdmVudCkgPT4ge1xuICAgICAgLy8gVGhpcyBvZmZpY2UgaG91ciB0aW1lem9uZS4gQVNTVU1JTkcgZXZlcnkgZGF0ZSBmaWVsZCBoYXMgc2FtZSB0aW1lem9uZSBhcyBvaC5zdGFydFxuICAgICAgY29uc3QgZXZlbnRUWiA9IG9oLnN0YXJ0LnR6O1xuICAgICAgY29uc3QgeyBycnVsZSB9ID0gb2ggYXMgYW55O1xuICAgICAgaWYgKHJydWxlKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gb2guZW5kLmdldFRpbWUoKSAtIG9oLnN0YXJ0LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBhbGxEYXRlcyA9IHRoaXMucnJ1bGVUb0RhdGVzKHJydWxlLCBldmVudFRaLCBvaC5leGRhdGUpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRPZmZpY2VIb3VycyA9IGFsbERhdGVzLm1hcCgoZGF0ZSkgPT4gKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiBkYXRlLFxuICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZHVyYXRpb24pLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzID0gcmVzdWx0T2ZmaWNlSG91cnMuY29uY2F0KGdlbmVyYXRlZE9mZmljZUhvdXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5zdGFydCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICAgIGVuZFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5lbmQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdE9mZmljZUhvdXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIE9mZmljZUhvdXJzIGZvciBhIGdpdmVuIENvdXJzZSBieSByZXNjcmFwaW5nIGljYWxcbiAgICogQHBhcmFtIGNvdXJzZSB0byBwYXJzZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGNvdXJzZTogQ291cnNlTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBzY3JhcGluZyBpY2FsIGZvciBjb3Vyc2UgXCIke2NvdXJzZS5uYW1lfVwiKCR7Y291cnNlLmlkfSBhdCB1cmw6ICR7Y291cnNlLmljYWxVUkx9Li4uYCxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZShgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgY291cnNlSWQ6IGNvdXJzZS5pZCwgcm9vbTogJ09ubGluZScgfSxcbiAgICB9KTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbTogJ09ubGluZScsXG4gICAgICAgIGNvdXJzZUlkOiBjb3Vyc2UuaWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IHRoaXMucGFyc2VJY2FsKFxuICAgICAgYXdhaXQgZnJvbVVSTChjb3Vyc2UuaWNhbFVSTCksXG4gICAgICBjb3Vyc2UuaWQsXG4gICAgKTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZGVsZXRlKHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuc2F2ZShcbiAgICAgIG9mZmljZUhvdXJzLm1hcCgoZSkgPT4ge1xuICAgICAgICBlLnF1ZXVlSWQgPSBxdWV1ZS5pZDtcbiAgICAgICAgcmV0dXJuIE9mZmljZUhvdXJNb2RlbC5jcmVhdGUoZSk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZUVuZChgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBjb25zb2xlLmxvZygnZG9uZSBzY3JhcGluZyEnKTtcbiAgfVxuXG4gIEBDcm9uKCc1MSAwICogKiAqJylcbiAgcHVibGljIGFzeW5jIHVwZGF0ZUFsbENvdXJzZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNvdXJzZSBpY2FscycpO1xuICAgIGNvbnN0IGNvdXJzZXMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY291cnNlcy5tYXAoKGMpID0+IHRoaXMudXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoYykpKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1pY2FsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbmRvd3MtaWFuYS9kaXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudC10aW1lem9uZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJycnVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbTm90aWZpY2F0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW05vdGlmaWNhdGlvblNlcnZpY2UsIERlc2t0b3BOb3RpZlN1YnNjcmliZXIsIFR3aWxpb1NlcnZpY2VdLFxuICBleHBvcnRzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgVHdpbGlvU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBDb25uZWN0aW9uLFxuICBJbnNlcnRFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBEZXNrdG9wTm90aWZNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxEZXNrdG9wTm90aWZNb2RlbD4pIHtcbiAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlEZXNrdG9wKFxuICAgICAgZXZlbnQuZW50aXR5LFxuICAgICAgXCJZb3UndmUgc3VjY2Vzc2Z1bGx5IHNpZ25lZCB1cCBmb3IgZGVza3RvcCBub3RpZmljYXRpb25zIVwiLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQmFkUmVxdWVzdEV4Y2VwdGlvbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5pbXBvcnQgeyBEZWVwUGFydGlhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0ICogYXMgd2ViUHVzaCBmcm9tICd3ZWItcHVzaCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgTm90aWZNc2dzID0ge1xuICBwaG9uZToge1xuICAgIFdST05HX01FU1NBR0U6XG4gICAgICAnUGxlYXNlIHJlc3BvbmQgd2l0aCBlaXRoZXIgWUVTIG9yIE5PLiBUZXh0IFNUT1AgYXQgYW55IHRpbWUgdG8gc3RvcCByZWNlaXZpbmcgdGV4dCBtZXNzYWdlcycsXG4gICAgQ09VTERfTk9UX0ZJTkRfTlVNQkVSOlxuICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFuIE9mZmljZSBIb3VycyBhY2NvdW50IHdpdGggeW91ciBwaG9uZSBudW1iZXIuJyxcbiAgICBVTlJFR0lTVEVSOlxuICAgICAgXCJZb3UndmUgdW5yZWdpc3RlcmVkIGZyb20gdGV4dCBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBGZWVsIGZyZWUgdG8gcmUtcmVnaXN0ZXIgYW55IHRpbWUgdGhyb3VnaCB0aGUgd2Vic2l0ZVwiLFxuICAgIERVUExJQ0FURTpcbiAgICAgIFwiWW91J3ZlIGFscmVhZHkgYmVlbiB2ZXJpZmllZCB0byByZWNlaXZlIHRleHQgbm90aWZpY2F0aW9ucyBmcm9tIEtob3VyeSBPZmZpY2UgSG91cnMhXCIsXG4gICAgT0s6XG4gICAgICAnVGhhbmsgeW91IGZvciB2ZXJpZnlpbmcgeW91ciBudW1iZXIgd2l0aCBLaG91cnkgT2ZmaWNlIEhvdXJzISBZb3UgYXJlIG5vdyBzaWduZWQgdXAgZm9yIHRleHQgbm90aWZpY2F0aW9ucyEnLFxuICB9LFxuICBxdWV1ZToge1xuICAgIEFMRVJUX0JVVFRPTjpcbiAgICAgIFwiVGhlIFRBIGNvdWxkJ3QgcmVhY2ggeW91LCBwbGVhc2UgaGF2ZSBNaWNyb3NvZnQgVGVhbXMgb3BlbiBhbmQgY29uZmlybSB5b3UgYXJlIGJhY2shXCIsXG4gICAgVEhJUkRfUExBQ0U6IGBZb3UncmUgM3JkIGluIHRoZSBxdWV1ZS4gQmUgcmVhZHkgZm9yIGEgVEEgdG8gY2FsbCB5b3Ugc29vbiFgLFxuICAgIFRBX0hJVF9IRUxQRUQ6ICh0YU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgICAgYCR7dGFOYW1lfSBpcyBjb21pbmcgdG8gaGVscCB5b3UhYCxcbiAgICBSRU1PVkVEOiBgWW91J3ZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBxdWV1ZS4gUGxlYXNlIHJldHVybiB0byB0aGUgYXBwIGZvciBtb3JlIGluZm9ybWF0aW9uLmAsXG4gIH0sXG4gIHRhOiB7XG4gICAgU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUU6XG4gICAgICAnQSBzdHVkZW50IGhhcyBqb2luZWQgeW91ciAocHJldmlvdXNseSBlbXB0eSkgcXVldWUhJyxcbiAgfSxcbn07XG5cbi8vVE9ETyB0ZXN0IHRoaXMgc2VydmljZSBvbWdcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgZGVza3RvcFB1YmxpY0tleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UsXG4gICkge1xuICAgIHdlYlB1c2guc2V0VmFwaWREZXRhaWxzKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRU1BSUwnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFJJVkFURUtFWScpLFxuICAgICk7XG4gICAgdGhpcy5kZXNrdG9wUHVibGljS2V5ID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyk7XG4gIH1cblxuICBhc3luYyByZWdpc3RlckRlc2t0b3AoXG4gICAgaW5mbzogRGVlcFBhcnRpYWw8RGVza3RvcE5vdGlmTW9kZWw+LFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gICAgLy8gY3JlYXRlIGlmIG5vdCBleGlzdFxuICAgIGxldCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkOiBpbmZvLnVzZXJJZCwgZW5kcG9pbnQ6IGluZm8uZW5kcG9pbnQgfSxcbiAgICB9KTtcbiAgICBpZiAoIWRuKSB7XG4gICAgICBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmNyZWF0ZShpbmZvKS5zYXZlKCk7XG4gICAgICBhd2FpdCBkbi5yZWxvYWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRuO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCB1c2VyOiBVc2VyTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBmdWxsTnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwaG9uZU51bWJlcik7XG4gICAgaWYgKCFmdWxsTnVtYmVyKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMubm90aWZpY2F0aW9uU2VydmljZS5yZWdpc3RlclBob25lLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgIH0pO1xuXG4gICAgaWYgKHBob25lTm90aWZNb2RlbCkge1xuICAgICAgLy8gUGhvbmUgbnVtYmVyIGhhcyBub3QgY2hhbmdlZFxuICAgICAgaWYgKHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9PT0gZnVsbE51bWJlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGp1c3QgY2hhbmdlIGl0XG4gICAgICAgIHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9IGZ1bGxOdW1iZXI7XG4gICAgICAgIHBob25lTm90aWZNb2RlbC52ZXJpZmllZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBwaG9uZU5vdGlmTW9kZWwuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IGZ1bGxOdW1iZXIsXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuXG4gICAgICAvLyBNVVRBVEUgc28gaWYgdXNlci5zYXZlKCkgaXMgY2FsbGVkIGxhdGVyIGl0IGRvZXNuJ3QgZGlzLWFzc29jaWF0ZVxuICAgICAgdXNlci5waG9uZU5vdGlmID0gcGhvbmVOb3RpZk1vZGVsO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMubm90aWZ5UGhvbmUoXG4gICAgICBwaG9uZU5vdGlmTW9kZWwsXG4gICAgICBcIllvdSd2ZSBzaWduZWQgdXAgZm9yIHBob25lIG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIFRvIHZlcmlmeSB5b3VyIG51bWJlciwgcGxlYXNlIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggWUVTLiBUbyB1bnN1YnNjcmliZSwgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBOTyBvciBTVE9QXCIsXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvLyBOb3RpZnkgdXNlciBvbiBhbGwgcGxhdGZvcm1zXG4gIGFzeW5jIG5vdGlmeVVzZXIodXNlcklkOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdGlmTW9kZWxzT2ZVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IFsnZGVza3RvcE5vdGlmcycsICdwaG9uZU5vdGlmJ10sXG4gICAgfSk7XG5cbiAgICAvLyBydW4gdGhlIHByb21pc2VzIGNvbmN1cnJlbnRseVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzRW5hYmxlZCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnMubWFwKGFzeW5jIChubSkgPT5cbiAgICAgICAgICB0aGlzLm5vdGlmeURlc2t0b3Aobm0sIG1lc3NhZ2UpLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYgJiYgbm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZnNFbmFibGVkKSB7XG4gICAgICB0aGlzLm5vdGlmeVBob25lKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYsIG1lc3NhZ2UsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIGRlc2t0b3Agbm90aWZpY2F0aW9uXG4gIGFzeW5jIG5vdGlmeURlc2t0b3Aobm06IERlc2t0b3BOb3RpZk1vZGVsLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd2ViUHVzaC5zZW5kTm90aWZpY2F0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IG5tLmVuZHBvaW50LFxuICAgICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgIHAyNTZkaDogbm0ucDI1NmRoLFxuICAgICAgICAgICAgYXV0aDogbm0uYXV0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKG5tKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIHBob25lIG51bWJlclxuICBhc3luYyBub3RpZnlQaG9uZShcbiAgICBwbjogUGhvbmVOb3RpZk1vZGVsLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmb3JjZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGZvcmNlIHx8IHBuLnZlcmlmaWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2Uuc2VuZFNNUyhwbi5waG9uZU51bWJlciwgbWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9ibGVtIHNlbmRpbmcgbWVzc2FnZScsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyB2ZXJpZnlQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHBob25lTm90aWYgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIgfSxcbiAgICB9KTtcblxuICAgIGlmICghcGhvbmVOb3RpZikge1xuICAgICAgYXBtLnNldEN1c3RvbUNvbnRleHQoeyBwaG9uZU51bWJlciB9KTtcbiAgICAgIGFwbS5jYXB0dXJlRXJyb3IoXG4gICAgICAgIG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcGhvbmUgbnVtYmVyIGR1cmluZyB2ZXJpZmljYXRpb24nKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkNPVUxEX05PVF9GSU5EX05VTUJFUjtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgIT09ICdZRVMnICYmIG1lc3NhZ2UgIT09ICdOTycgJiYgbWVzc2FnZSAhPT0gJ1NUT1AnKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLldST05HX01FU1NBR0U7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlID09PSAnTk8nIHx8IG1lc3NhZ2UgPT09ICdTVE9QJykge1xuICAgICAgLy8gZGlkIHNvbWUgbW9yZSBkaWdnaW5nLCBTVE9QIGp1c3Qgc3RvcHMgbWVzc2FnZXMgY29tcGxldGVseSwgd2UnbGwgbmV2ZXIgcmVjZWl2ZSBpdFxuICAgICAgLy8gc28gdWguLi4gdGhlcmUncyBwcm9iYWJseSBhIHdheSB0byBkbyB0aGF0XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHBob25lTm90aWYpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5VTlJFR0lTVEVSO1xuICAgIH0gZWxzZSBpZiAocGhvbmVOb3RpZi52ZXJpZmllZCkge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5EVVBMSUNBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWYudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgYXdhaXQgcGhvbmVOb3RpZi5zYXZlKCk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLk9LO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2ViLXB1c2hcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIHR3aWxpbyBTREsgdG8gbWFrZSB0ZXN0aW5nIGVhc2llci5cbiAqIFNob3VsZCBOT1QgaW50ZXJhY3Qgd2l0aCBEQiBtb2RlbHMgb3IgZG8gYW55dGhpbmcgc21hcnQuIEp1c3Qgd3JhcCBUd2lsaW8uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUd2lsaW9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB0d2lsaW9DbGllbnQ6IHR3aWxpby5Ud2lsaW87XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy50d2lsaW9DbGllbnQgPSB0d2lsaW8oXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BQ0NPVU5UU0lEJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmdWxsIHBob25lIG51bWJlciBvciByZXR1cm4gZmFsc2UgaWYgcGhvbmUgbnVtYmVyIGlzbid0IHJlYWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGdWxsUGhvbmVOdW1iZXIoXG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBmYWxzZT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lmxvb2t1cHMucGhvbmVOdW1iZXJzKHBob25lTnVtYmVyKS5mZXRjaCgpKVxuICAgICAgICAucGhvbmVOdW1iZXI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBpZiB0aGUgcGhvbmUgbnVtYmVyIGlzIG5vdCBmb3VuZCwgdGhlbiBlbmRwb2ludCBzaG91bGQgcmV0dXJuIGludmFsaWRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBTTVMgdG8gcGhvbmUgbnVtYmVyIHVzaW5nIG91ciBUd2lsaW8gbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZFNNUyhwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgIGZyb206IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT1BIT05FTlVNQkVSJyksXG4gICAgICB0bzogcGhvbmVOdW1iZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aWxpb1wiKTsiLCJpbXBvcnQge1xuICBEZXNrdG9wTm90aWZCb2R5LFxuICBEZXNrdG9wTm90aWZQYXJ0aWFsLFxuICBFUlJPUl9NRVNTQUdFUyxcbiAgVHdpbGlvQm9keSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIEhlYWRlcixcbiAgSGVhZGVycyxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignbm90aWZpY2F0aW9ucycpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2Rlc2t0b3AvY3JlZGVudGlhbHMnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgZ2V0RGVza3RvcENyZWRlbnRpYWxzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubm90aWZTZXJ2aWNlLmRlc2t0b3BQdWJsaWNLZXkpO1xuICB9XG5cbiAgQFBvc3QoJ2Rlc2t0b3AvZGV2aWNlJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcFVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBEZXNrdG9wTm90aWZCb2R5LFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZQYXJ0aWFsPiB7XG4gICAgY29uc3QgZGV2aWNlID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJEZXNrdG9wKHtcbiAgICAgIGVuZHBvaW50OiBib2R5LmVuZHBvaW50LFxuICAgICAgZXhwaXJhdGlvblRpbWU6IGJvZHkuZXhwaXJhdGlvblRpbWUgJiYgbmV3IERhdGUoYm9keS5leHBpcmF0aW9uVGltZSksXG4gICAgICBwMjU2ZGg6IGJvZHkua2V5cy5wMjU2ZGgsXG4gICAgICBhdXRoOiBib2R5LmtleXMuYXV0aCxcbiAgICAgIG5hbWU6IGJvZHkubmFtZSxcbiAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogZGV2aWNlLmlkLFxuICAgICAgZW5kcG9pbnQ6IGRldmljZS5lbmRwb2ludCxcbiAgICAgIGNyZWF0ZWRBdDogZGV2aWNlLmNyZWF0ZWRBdCxcbiAgICAgIG5hbWU6IGRldmljZS5uYW1lLFxuICAgIH07XG4gIH1cblxuICBARGVsZXRlKCdkZXNrdG9wL2RldmljZS86ZGV2aWNlSWQnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgZGVsZXRlRGVza3RvcFVzZXIoXG4gICAgQFBhcmFtKCdkZXZpY2VJZCcpIGRldmljZUlkOiBudW1iZXIsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmQoeyBpZDogZGV2aWNlSWQsIHVzZXJJZCB9KTtcbiAgICBpZiAoZG4ubGVuZ3RoID4gMCkge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKGRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2ViaG9vayBmcm9tIHR3aWxpb1xuICBAUG9zdCgnL3Bob25lL3ZlcmlmeScpXG4gIEBIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpXG4gIGFzeW5jIHZlcmlmeVBob25lVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IFR3aWxpb0JvZHksXG4gICAgQEhlYWRlcnMoJ3gtdHdpbGlvLXNpZ25hdHVyZScpIHR3aWxpb1NpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBib2R5LkJvZHkudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgc2VuZGVyTnVtYmVyID0gYm9keS5Gcm9tO1xuXG4gICAgY29uc3QgdHdpbGlvQXV0aFRva2VuID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyk7XG5cbiAgICBjb25zdCBpc1ZhbGlkYXRlZCA9IHR3aWxpby52YWxpZGF0ZVJlcXVlc3QoXG4gICAgICB0d2lsaW9BdXRoVG9rZW4sXG4gICAgICB0d2lsaW9TaWduYXR1cmUudHJpbSgpLFxuICAgICAgYCR7dGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJyl9L2FwaS92MS9ub3RpZmljYXRpb25zL3Bob25lL3ZlcmlmeWAsXG4gICAgICBib2R5LFxuICAgICk7XG5cbiAgICBpZiAoIWlzVmFsaWRhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5ub3RpZmljYXRpb25Db250cm9sbGVyLm1lc3NhZ2VOb3RGcm9tVHdpbGlvLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlVG9Vc2VyID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UudmVyaWZ5UGhvbmUoXG4gICAgICBzZW5kZXJOdW1iZXIsXG4gICAgICBtZXNzYWdlLFxuICAgICk7XG4gICAgY29uc3QgTWVzc2FnaW5nUmVzcG9uc2UgPSB0d2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2U7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgTWVzc2FnaW5nUmVzcG9uc2UoKTtcbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2VUb1VzZXIpO1xuXG4gICAgcmV0dXJuIHR3aW1sLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IExvZ2luQ29udHJvbGxlciB9IGZyb20gJy4vbG9naW4uY29udHJvbGxlcic7XG5pbXBvcnQgeyBKd3RTdHJhdGVneSB9IGZyb20gJy4uL2xvZ2luL2p3dC5zdHJhdGVneSc7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBKd3RNb2R1bGUucmVnaXN0ZXJBc3luYyh7XG4gICAgICBpbXBvcnRzOiBbQ29uZmlnTW9kdWxlXSxcbiAgICAgIGluamVjdDogW0NvbmZpZ1NlcnZpY2VdLFxuICAgICAgdXNlRmFjdG9yeTogYXN5bmMgKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+ICh7XG4gICAgICAgIHNlY3JldDogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxuICBjb250cm9sbGVyczogW0xvZ2luQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW0p3dFN0cmF0ZWd5LCBMb2dpbkNvdXJzZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRVJST1JfTUVTU0FHRVMsXG4gIEtob3VyeURhdGFQYXJhbXMsXG4gIEtob3VyeVJlZGlyZWN0UmVzcG9uc2UsXG4gIEtob3VyeVN0dWRlbnRDb3Vyc2UsXG4gIEtob3VyeVRBQ291cnNlLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIFBvc3QsXG4gIFF1ZXJ5LFxuICBSZXEsXG4gIFJlcyxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBKd3RTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGh0dHBTaWduYXR1cmUgZnJvbSAnaHR0cC1zaWduYXR1cmUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vLi4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbG9naW5Db3Vyc2VTZXJ2aWNlOiBMb2dpbkNvdXJzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBqd3RTZXJ2aWNlOiBKd3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBQb3N0KCcva2hvdXJ5X2xvZ2luJylcbiAgYXN5bmMgcmVjaWV2ZURhdGFGcm9tS2hvdXJ5KFxuICAgIEBSZXEoKSByZXE6IFJlcXVlc3QsXG4gICAgQEJvZHkoKSBib2R5OiBLaG91cnlEYXRhUGFyYW1zLFxuICApOiBQcm9taXNlPEtob3VyeVJlZGlyZWN0UmVzcG9uc2U+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gQ2hlY2sgdGhhdCByZXF1ZXN0IGhhcyBjb21lIGZyb20gS2hvdXJ5XG4gICAgICBjb25zdCBwYXJzZWRSZXF1ZXN0ID0gaHR0cFNpZ25hdHVyZS5wYXJzZVJlcXVlc3QocmVxKTtcbiAgICAgIGNvbnN0IHZlcmlmeSA9IGh0dHBTaWduYXR1cmUudmVyaWZ5SE1BQyhcbiAgICAgICAgcGFyc2VkUmVxdWVzdCxcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnS0hPVVJZX1BSSVZBVEVfS0VZJyksXG4gICAgICApO1xuICAgICAgaWYgKCF2ZXJpZnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5sb2dpbkNvbnRyb2xsZXIucmVjZWl2ZURhdGFGcm9tS2hvdXJ5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB1c2VyOiBVc2VyTW9kZWw7XG4gICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGVtYWlsOiBib2R5LmVtYWlsIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZSh7IGNvdXJzZXM6IFtdIH0pO1xuICAgIH1cblxuICAgIC8vIFE6IERvIHdlIG5lZWQgdGhpcyBpZiBpdCdzIG5vdCBnb2luZyB0byBjaGFuZ2U/XG4gICAgdXNlciA9IE9iamVjdC5hc3NpZ24odXNlciwge1xuICAgICAgZW1haWw6IGJvZHkuZW1haWwsXG4gICAgICBmaXJzdE5hbWU6IGJvZHkuZmlyc3RfbmFtZSxcbiAgICAgIGxhc3ROYW1lOiBib2R5Lmxhc3RfbmFtZSxcbiAgICAgIG5hbWU6IGJvZHkuZmlyc3RfbmFtZSArICcgJyArIGJvZHkubGFzdF9uYW1lLFxuICAgICAgcGhvdG9VUkw6ICcnLFxuICAgIH0pO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZXMgPSBbXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkuY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVN0dWRlbnRDb3Vyc2UpID0+IHtcbiAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2VNb2RlbCA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICAgICAgICBjLmNvdXJzZSxcbiAgICAgICAgICBjLnNlY3Rpb24sXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvdXJzZSkge1xuICAgICAgICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgICAgUm9sZS5TVFVERU5ULFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh1c2VyQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS50YV9jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5VEFDb3Vyc2UpID0+IHtcbiAgICAgICAgLy8gUXVlcnkgZm9yIGFsbCB0aGUgY291cnNlcyB3aGljaCBtYXRjaCB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJpYyBjb3Vyc2UgZnJvbSBLaG91cnlcbiAgICAgICAgY29uc3QgY291cnNlTWFwcGluZ3MgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmQoe1xuICAgICAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjLmNvdXJzZSB9LCAvLyBUT0RPOiBBZGQgc2VtZXN0ZXIgc3VwcG9ydFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvdXJzZU1hcHBpbmcgb2YgY291cnNlTWFwcGluZ3MpIHtcbiAgICAgICAgICBjb25zdCB0YUNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2VNYXBwaW5nLmNvdXJzZUlkLFxuICAgICAgICAgICAgUm9sZS5UQSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godGFDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIHVzZXIuY291cnNlcyA9IHVzZXJDb3Vyc2VzO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKFxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcbiAgICAgIHsgZXhwaXJlc0luOiA1ICogNjAgfSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICByZWRpcmVjdDpcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJykgKyBgL2FwaS92MS9sb2dpbi9lbnRyeT90b2tlbj0ke3Rva2VufWAsXG4gICAgfTtcbiAgfVxuXG4gIC8vIE5PVEU6IEFsdGhvdWdoIHRoZSB0d28gcm91dGVzIGJlbG93IGFyZSBvbiB0aGUgYmFja2VuZCxcbiAgLy8gdGhleSBhcmUgbWVhbnQgdG8gYmUgdmlzaXRlZCBieSB0aGUgYnJvd3NlciBzbyBhIGNvb2tpZSBjYW4gYmUgc2V0XG5cbiAgLy8gVGhpcyBpcyB0aGUgcmVhbCBhZG1pbiBlbnRyeSBwb2ludFxuICBAR2V0KCcvbG9naW4vZW50cnknKVxuICBhc3luYyBlbnRlckZyb21LaG91cnkoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd0b2tlbicpIHRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlzVmVyaWZpZWQgPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2UudmVyaWZ5QXN5bmModG9rZW4pO1xuXG4gICAgaWYgKCFpc1ZlcmlmaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuand0U2VydmljZS5kZWNvZGUodG9rZW4pIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcblxuICAgIHRoaXMuZW50ZXIocmVzLCBwYXlsb2FkLnVzZXJJZCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGZvciBsb2dpbiBvbiBkZXZlbG9wbWVudCBvbmx5XG4gIEBHZXQoJy9sb2dpbi9kZXYnKVxuICBAVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbiAgYXN5bmMgZW50ZXJGcm9tRGV2KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndXNlcklkJykgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZW50ZXIocmVzLCB1c2VySWQpO1xuICB9XG5cbiAgLy8gU2V0IGNvb2tpZSBhbmQgcmVkaXJlY3QgdG8gcHJvcGVyIHBhZ2VcbiAgcHJpdmF0ZSBhc3luYyBlbnRlcihyZXM6IFJlc3BvbnNlLCB1c2VySWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGF1dGhUb2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoeyB1c2VySWQgfSk7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNvb2tpZSgnYXV0aF90b2tlbicsIGF1dGhUb2tlbiwgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy8nKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cC1zaWduYXR1cmVcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb25Qcm9kdWN0aW9uR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNhbkFjdGl2YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNQcm9kKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ2NvdXJzZV9zZWN0aW9uX21hcHBpbmdfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIC8vIFRoaXMgaXMgdGhlIGNvdXJzZSBuYW1lIHRoYXQgaXMgc2VudCB0byB1cyBmcm9tIHRoZSBraG91cnkgYW1pbiBiYWNrZW5kXG4gIEBDb2x1bW4oKVxuICBnZW5lcmljQ291cnNlTmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oKVxuICBzZWN0aW9uOiBudW1iZXI7XG5cbiAgLy8gUmVwcmVzZW50cyB0aGUgY291cnNlIHRoYXQgdGhpcyBtYXBzIHRvXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICdjb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5Db3Vyc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgY291cmVzTmFtZTogc3RyaW5nLFxuICAgIGNvdXJzZVNlY3Rpb246IG51bWJlcixcbiAgKTogUHJvbWlzZTxDb3Vyc2VNb2RlbD4ge1xuICAgIGNvbnN0IGNvdXJzZVNlY3Rpb25Nb2RlbCA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBnZW5lcmljQ291cnNlTmFtZTogY291cmVzTmFtZSwgc2VjdGlvbjogY291cnNlU2VjdGlvbiB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZSddLFxuICAgIH0pO1xuICAgIHJldHVybiBjb3Vyc2VTZWN0aW9uTW9kZWw/LmNvdXJzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgdXNlcklkOiBudW1iZXIsXG4gICAgY291cnNlSWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB1c2VyQ291cnNlOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZCwgY291cnNlSWQsIHJvbGUgfSxcbiAgICB9KTtcbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgcm9sZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IEV4dHJhY3RKd3QsIFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtand0JztcbmltcG9ydCB7IFBhc3Nwb3J0U3RyYXRlZ3kgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0U3RyYXRlZ3kgZXh0ZW5kcyBQYXNzcG9ydFN0cmF0ZWd5KFN0cmF0ZWd5KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBqd3RGcm9tUmVxdWVzdDogKHJlcTogUmVxdWVzdCkgPT4gcmVxLmNvb2tpZXNbJ2F1dGhfdG9rZW4nXSxcbiAgICAgIGlnbm9yZUV4cGlyYXRpb246IGZhbHNlLFxuICAgICAgc2VjcmV0T3JLZXk6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgfSk7XG4gIH1cblxuICB2YWxpZGF0ZShwYXlsb2FkOiB7IHVzZXJJZDogbnVtYmVyIH0pOiBhbnkge1xuICAgIHJldHVybiB7IC4uLnBheWxvYWQgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtand0XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByb2ZpbGVDb250cm9sbGVyIH0gZnJvbSAnLi9wcm9maWxlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIGNvbnRyb2xsZXJzOiBbUHJvZmlsZUNvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBEZXNrdG9wTm90aWZQYXJ0aWFsLFxuICBHZXRQcm9maWxlUmVzcG9uc2UsXG4gIFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUGF0Y2gsIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3Byb2ZpbGUnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0KFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgY291cnNlcyA9IHVzZXIuY291cnNlc1xuICAgICAgLmZpbHRlcigodXNlckNvdXJzZSkgPT4gdXNlckNvdXJzZS5jb3Vyc2UuZW5hYmxlZClcbiAgICAgIC5tYXAoKHVzZXJDb3Vyc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb3Vyc2U6IHtcbiAgICAgICAgICAgIGlkOiB1c2VyQ291cnNlLmNvdXJzZUlkLFxuICAgICAgICAgICAgbmFtZTogdXNlckNvdXJzZS5jb3Vyc2UubmFtZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGU6IHVzZXJDb3Vyc2Uucm9sZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmUGFydGlhbFtdID0gdXNlci5kZXNrdG9wTm90aWZzLm1hcChcbiAgICAgIChkKSA9PiAoe1xuICAgICAgICBlbmRwb2ludDogZC5lbmRwb2ludCxcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGNyZWF0ZWRBdDogZC5jcmVhdGVkQXQsXG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCB1c2VyUmVzcG9uc2UgPSBwaWNrKHVzZXIsIFtcbiAgICAgICdpZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ25hbWUnLFxuICAgICAgJ2ZpcnN0TmFtZScsXG4gICAgICAnbGFzdE5hbWUnLFxuICAgICAgJ3Bob3RvVVJMJyxcbiAgICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICBdKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXNlclJlc3BvbnNlLFxuICAgICAgY291cnNlcyxcbiAgICAgIHBob25lTnVtYmVyOiB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyLFxuICAgICAgZGVza3RvcE5vdGlmcyxcbiAgICB9O1xuICB9XG5cbiAgQFBhdGNoKClcbiAgYXN5bmMgcGF0Y2goXG4gICAgQEJvZHkoKSB1c2VyUGF0Y2g6IFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB1c2VyUGF0Y2gpO1xuICAgIHVzZXIubmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgJyAnICsgdXNlci5sYXN0TmFtZTtcbiAgICBpZiAoXG4gICAgICB1c2VyLnBob25lTm90aWZzRW5hYmxlZCAmJlxuICAgICAgdXNlclBhdGNoLnBob25lTnVtYmVyICE9PSB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlclBob25lKHVzZXJQYXRjaC5waG9uZU51bWJlciwgdXNlcik7XG4gICAgfVxuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVzZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXN0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVlc3Rpb25TdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWVzdGlvbi5zdWJzY3JpYmVyJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVlc3Rpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbUXVlc3Rpb25TdWJzY3JpYmVyXSxcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZSwgUXVldWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIENyZWF0ZVF1ZXN0aW9uUGFyYW1zLFxuICBDcmVhdGVRdWVzdGlvblJlc3BvbnNlLFxuICBFUlJPUl9NRVNTQUdFUyxcbiAgR2V0UXVlc3Rpb25SZXNwb25zZSxcbiAgTGltYm9RdWVzdGlvblN0YXR1cyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvblN0YXR1c0tleXMsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICBVcGRhdGVRdWVzdGlvblJlc3BvbnNlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyLCBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvblJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXN0aW9uLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3F1ZXN0aW9ucycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVlc3Rpb25Sb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVlc3Rpb25JZCcpXG4gIGFzeW5jIGdldFF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxHZXRRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgQFBvc3QoKVxuICBAUm9sZXMoUm9sZS5TVFVERU5UKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpIGJvZHk6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCB7IHRleHQsIHF1ZXN0aW9uVHlwZSwgcXVldWVJZCwgZm9yY2UgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24uaW52YWxpZFF1ZXVlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXF1ZXVlLmFsbG93UXVlc3Rpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLm5vTmV3UXVlc3Rpb25zLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCEoYXdhaXQgcXVldWUuY2hlY2tJc09wZW4oKSkpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIuY3JlYXRlUXVlc3Rpb24uY2xvc2VkUXVldWUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzVXNlclF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGNyZWF0b3JJZDogdXNlci5pZCxcbiAgICAgICAgc3RhdHVzOiBJbihPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cykpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmICghIXByZXZpb3VzVXNlclF1ZXN0aW9uKSB7XG4gICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgcHJldmlvdXNVc2VyUXVlc3Rpb24uc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZDtcbiAgICAgICAgYXdhaXQgcHJldmlvdXNVc2VyUXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLm9uZVF1ZXN0aW9uQXRBVGltZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHtcbiAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICBjcmVhdG9yOiB1c2VyLFxuICAgICAgdGV4dCxcbiAgICAgIHF1ZXN0aW9uVHlwZSxcbiAgICAgIHN0YXR1czogUXVlc3Rpb25TdGF0dXNLZXlzLkRyYWZ0aW5nLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgaXNPbmxpbmU6IHRydWUsXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgQFBhdGNoKCc6cXVlc3Rpb25JZCcpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQsIFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICAvLyBUT0RPOiBVc2UgcXVldWVSb2xlIGRlY29yYXRvciwgYnV0IHdlIG5lZWQgdG8gZml4IGl0cyBwZXJmb3JtYW5jZSBmaXJzdFxuICBhc3luYyB1cGRhdGVRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8VXBkYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGxldCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVlc3Rpb25JZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAncXVldWUnLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDcmVhdG9yID0gdXNlcklkID09PSBxdWVzdGlvbi5jcmVhdG9ySWQ7XG5cbiAgICBpZiAoaXNDcmVhdG9yKSB7XG4gICAgICAvLyBGYWlsIGlmIHN0dWRlbnQgdHJpZXMgYW4gaW52YWxpZCBzdGF0dXMgY2hhbmdlXG4gICAgICBpZiAoYm9keS5zdGF0dXMgJiYgIXF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhib2R5LnN0YXR1cywgUm9sZS5TVFVERU5UKSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5mc21WaW9sYXRpb24oXG4gICAgICAgICAgICAnU3R1ZGVudCcsXG4gICAgICAgICAgICBxdWVzdGlvbi5zdGF0dXMsXG4gICAgICAgICAgICBib2R5LnN0YXR1cyxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcXVlc3Rpb24gPSBPYmplY3QuYXNzaWduKHF1ZXN0aW9uLCBib2R5KTtcbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9XG5cbiAgICAvLyBJZiBub3QgY3JlYXRvciwgY2hlY2sgaWYgdXNlciBpcyBUQS9QUk9GIG9mIGNvdXJzZSBvZiBxdWVzdGlvblxuICAgIGNvbnN0IGlzVGFPclByb2YgPVxuICAgICAgKGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jb3VudCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNvdXJzZUlkOiBxdWVzdGlvbi5xdWV1ZS5jb3Vyc2VJZCxcbiAgICAgICAgICByb2xlOiBJbihbUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1JdKSxcbiAgICAgICAgfSxcbiAgICAgIH0pKSA+IDA7XG5cbiAgICBpZiAoaXNUYU9yUHJvZikge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGJvZHkpLmxlbmd0aCAhPT0gMSB8fCBPYmplY3Qua2V5cyhib2R5KVswXSAhPT0gJ3N0YXR1cycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24udGFPbmx5RWRpdFF1ZXN0aW9uU3RhdHVzLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkU3RhdHVzID0gcXVlc3Rpb24uc3RhdHVzO1xuICAgICAgY29uc3QgbmV3U3RhdHVzID0gYm9keS5zdGF0dXM7XG4gICAgICAvLyBJZiB0aGUgdGFIZWxwZWQgaXMgYWxyZWFkeSBzZXQsIG1ha2Ugc3VyZSB0aGUgc2FtZSB0YSB1cGRhdGVzIHRoZSBzdGF0dXNcbiAgICAgIGlmIChxdWVzdGlvbi50YUhlbHBlZD8uaWQgIT09IHVzZXJJZCkge1xuICAgICAgICBpZiAob2xkU3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24ub3RoZXJUQUhlbHBpbmcsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3RhdHVzID09PSBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24ub3RoZXJUQVJlc29sdmVkLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNBbHJlYWR5SGVscGluZ09uZSA9XG4gICAgICAgIChhd2FpdCBRdWVzdGlvbk1vZGVsLmNvdW50KHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgdGFIZWxwZWRJZDogdXNlcklkLFxuICAgICAgICAgICAgc3RhdHVzOiBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSkgPT09IDE7XG4gICAgICBpZiAoaXNBbHJlYWR5SGVscGluZ09uZSAmJiBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi50YUhlbHBpbmdPdGhlcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRUcmFuc2l0aW9uID0gcXVlc3Rpb24uY2hhbmdlU3RhdHVzKG5ld1N0YXR1cywgUm9sZS5UQSk7XG4gICAgICBpZiAoIXZhbGlkVHJhbnNpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci51cGRhdGVRdWVzdGlvbi5mc21WaW9sYXRpb24oXG4gICAgICAgICAgICAnVEEnLFxuICAgICAgICAgICAgcXVlc3Rpb24uc3RhdHVzLFxuICAgICAgICAgICAgYm9keS5zdGF0dXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IFRBIGFzIHRhSGVscGVkIHdoZW4gdGhlIFRBIHN0YXJ0cyBoZWxwaW5nIHRoZSBzdHVkZW50XG4gICAgICBpZiAoXG4gICAgICAgIG9sZFN0YXR1cyAhPT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcgJiZcbiAgICAgICAgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZ1xuICAgICAgKSB7XG4gICAgICAgIHF1ZXN0aW9uLnRhSGVscGVkID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUodXNlcklkKTtcbiAgICAgICAgcXVlc3Rpb24uaGVscGVkQXQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIFNldCBmaXJzdEhlbHBlZEF0IGlmIGl0IGhhc24ndCBhbHJlYWR5XG4gICAgICAgIGlmICghcXVlc3Rpb24uZmlyc3RIZWxwZWRBdCkge1xuICAgICAgICAgIHF1ZXN0aW9uLmZpcnN0SGVscGVkQXQgPSBxdWVzdGlvbi5oZWxwZWRBdDtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlRBX0hJVF9IRUxQRUQocXVlc3Rpb24udGFIZWxwZWQubmFtZSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAobmV3U3RhdHVzIGluIENsb3NlZFF1ZXN0aW9uU3RhdHVzKSB7XG4gICAgICAgIHF1ZXN0aW9uLmNsb3NlZEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLmxvZ2luVXNlckNhbnRFZGl0LFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAUG9zdCgnOnF1ZXN0aW9uSWQvbm90aWZ5JylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBub3RpZnkoQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5BTEVSVF9CVVRUT04sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuUkVNT1ZFRCxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgbGV0IHF1ZXVlSWQ7XG5cbiAgICBpZiAocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCkge1xuICAgICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCk7XG4gICAgICBpZiAoIXF1ZXN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWVzdGlvbk5vdEZvdW5kLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcXVldWVJZCA9IHF1ZXN0aW9uLnF1ZXVlSWQ7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmJvZHkucXVldWVJZCkge1xuICAgICAgLy8gSWYgeW91IGFyZSBjcmVhdGluZyBhIG5ldyBxdWVzdGlvblxuICAgICAgcXVldWVJZCA9IHJlcXVlc3QuYm9keS5xdWV1ZUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVldWVPZlF1ZXN0aW9uTm90Rm91bmQsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQpO1xuXG4gICAgLy8gWW91IGNhbm5vdCBpbnRlcmFjdCB3aXRoIGEgcXVlc3Rpb24gaW4gYSBub25leGlzdGVudCBxdWV1ZVxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Sb2xlR3VhcmQucXVldWVEb2VzTm90RXhpc3QsXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsIE9wZW5RdWVzdGlvblN0YXR1cyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBJbnNlcnRFdmVudCxcbiAgUmVtb3ZlRXZlbnQsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVlc3Rpb25Nb2RlbD4ge1xuICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoXG4gICAgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWVzdGlvbk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcblxuICAgIC8vIFNlbmQgcHVzaCBub3RpZmljYXRpb24gdG8gc3R1ZGVudHMgd2hlbiB0aGV5IGFyZSBoaXQgM3JkIGluIGxpbmVcbiAgICAvLyBpZiBzdGF0dXMgdXBkYXRlZCB0byBjbG9zZWRcbiAgICBpZiAoXG4gICAgICBldmVudC51cGRhdGVkQ29sdW1ucy5maW5kKChjKSA9PiBjLnByb3BlcnR5TmFtZSA9PT0gJ3N0YXR1cycpICYmXG4gICAgICBldmVudC5lbnRpdHkuc3RhdHVzIGluIENsb3NlZFF1ZXN0aW9uU3RhdHVzXG4gICAgKSB7XG4gICAgICAvLyBnZXQgM3JkIGluIHF1ZXVlIGJlZm9yZSBhbmQgYWZ0ZXIgdGhpcyB1cGRhdGVcbiAgICAgIGNvbnN0IHByZXZpb3VzVGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKFxuICAgICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICAgIClcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBjb25zdCB0aGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoZXZlbnQuZW50aXR5LnF1ZXVlSWQpXG4gICAgICAgIC5zZXRRdWVyeVJ1bm5lcihldmVudC5xdWVyeVJ1bm5lcikgLy8gUnVuIGluIHNhbWUgdHJhbnNhY3Rpb24gYXMgdGhlIHVwZGF0ZVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGlmICh0aGlyZCAmJiBwcmV2aW91c1RoaXJkPy5pZCAhPT0gdGhpcmQ/LmlkKSB7XG4gICAgICAgIGNvbnN0IHsgY3JlYXRvcklkIH0gPSB0aGlyZDtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihjcmVhdG9ySWQsIE5vdGlmTXNncy5xdWV1ZS5USElSRF9QTEFDRSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbnVtYmVyT2ZRdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLndhaXRpbmdJblF1ZXVlKFxuICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgKS5nZXRDb3VudCgpO1xuXG4gICAgaWYgKG51bWJlck9mUXVlc3Rpb25zID09PSAwKSB7XG4gICAgICBjb25zdCBzdGFmZiA9IChcbiAgICAgICAgYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKGV2ZW50LmVudGl0eS5xdWV1ZUlkLCB7XG4gICAgICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgICAgICB9KVxuICAgICAgKS5zdGFmZkxpc3Q7XG5cbiAgICAgIHN0YWZmLmZvckVhY2goKHN0YWZmKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgc3RhZmYuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnRhLlNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgfVxuXG4gIGFzeW5jIGJlZm9yZVJlbW92ZShldmVudDogUmVtb3ZlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBkdWUgdG8gY2FzY2FkZXMgZW50aXR5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGxvYWRlZFxuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNlZWRDb250cm9sbGVyIH0gZnJvbSAnLi9zZWVkLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1NlZWRDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbU2VlZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWVkTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDcmVhdGVRdWVzdGlvblBhcmFtcywgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBDb3Vyc2VGYWN0b3J5LFxuICBPZmZpY2VIb3VyRmFjdG9yeSxcbiAgUXVlc3Rpb25GYWN0b3J5LFxuICBRdWV1ZUZhY3RvcnksXG4gIFNlbWVzdGVyRmFjdG9yeSxcbiAgVXNlckNvdXJzZUZhY3RvcnksXG4gIFVzZXJGYWN0b3J5LFxufSBmcm9tICcuLi8uLi90ZXN0L3V0aWwvZmFjdG9yaWVzJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdzZWVkcycpXG5AVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbmV4cG9ydCBjbGFzcyBTZWVkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHNlZWRTZXJ2aWNlOiBTZWVkU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2RlbGV0ZScpXG4gIGFzeW5jIGRlbGV0ZUFsbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKE9mZmljZUhvdXJNb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVlc3Rpb25Nb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVldWVNb2RlbCk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHJlc2V0JztcbiAgfVxuXG4gIEBHZXQoJ2NyZWF0ZScpXG4gIGFzeW5jIGNyZWF0ZVNlZWRzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gRmlyc3QgZGVsZXRlIHRoZSBvbGQgZGF0YVxuICAgIGF3YWl0IHRoaXMuZGVsZXRlQWxsKCk7XG5cbiAgICAvLyBUaGVuIGFkZCB0aGUgbmV3IHNlZWQgZGF0YVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcblxuICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICB0b21vcnJvdy5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDE5KTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpIC0gNDUwMDAwMCksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgMTAwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNZZXN0ZXJkYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB5ZXN0ZXJkYXksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh5ZXN0ZXJkYXkudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb21vcnJvdyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHRvbW9ycm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUodG9tb3Jyb3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VFeGlzdHMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgIH0pO1xuICAgIGlmICghY291cnNlRXhpc3RzKSB7XG4gICAgICBhd2FpdCBTZW1lc3RlckZhY3RvcnkuY3JlYXRlKHsgc2Vhc29uOiAnRmFsbCcsIHllYXI6IDIwMjAgfSk7XG4gICAgICBhd2FpdCBDb3Vyc2VGYWN0b3J5LmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgICByZWxhdGlvbnM6IFsnb2ZmaWNlSG91cnMnXSxcbiAgICB9KTtcblxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IFtcbiAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICBdO1xuICAgIGNvdXJzZS5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyRXhzaXN0cyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKCk7XG4gICAgaWYgKCF1c2VyRXhzaXN0cykge1xuICAgICAgLy8gU3R1ZGVudCAxXG4gICAgICBjb25zdCB1c2VyMSA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnbGl1LnN0YUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1N0YW5sZXkgTGl1JyxcbiAgICAgICAgZmlyc3ROYW1lOiAnU3RhbmxleScsXG4gICAgICAgIGxhc3ROYW1lOiAnTGl1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSMjBDRzM2RS1jZjBmMzc1MjUyYmQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjEsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFN0dW5kZW50IDJcbiAgICAgIGNvbnN0IHVzZXIyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICd0YWtheWFtYS5hQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnQWxleCBUYWtheWFtYScsXG4gICAgICAgIGZpcnN0TmFtZTogJ0FsZXgnLFxuICAgICAgICBsYXN0TmFtZTogJ1Rha2F5YW1hJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVKTDk3NDQzRC01MDEyMTMzOTY4NmItNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjIsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDFcbiAgICAgIGNvbnN0IHVzZXIzID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdzdGVuemVsLndAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdXaWxsIFN0ZW56ZWwnLFxuICAgICAgICBmaXJzdE5hbWU6ICdXaWxsJyxcbiAgICAgICAgbGFzdE5hbWU6ICdTdGVuemVsJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSRjI1NktSVC1kMTAwOThlODc5ZGEtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjMsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAyXG4gICAgICBjb25zdCB1c2VyNCA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnY2h1LmRhakBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0RhLUppbiBDaHUnLFxuICAgICAgICBmaXJzdE5hbWU6ICdEYS1KaW4nLFxuICAgICAgICBsYXN0TmFtZTogJ0NodScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VRTU2WTVVVDEtODVkYjU5YTQ3NGY0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI0LFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICByb29tOiAnV0hWIDEwMScsXG4gICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIG9mZmljZUhvdXJzOiBbXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICAgIF0sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAyNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQEdldCgnZmlsbF9xdWV1ZScpXG4gIGFzeW5jIGZpbGxRdWV1ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKCk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVVc2VyJylcbiAgYXN5bmMgY3JlYXRlVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IHsgcm9sZTogUm9sZTsgY291cnNlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB0YTogVXNlckNvdXJzZU1vZGVsO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUsIGNvdXJzZTogY291cnNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXVlJylcbiAgYXN5bmMgY3JlYXRlUXVldWUoXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIGNvdXJzZUlkOiBudW1iZXI7XG4gICAgICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbiAgICAgIC8vIGNsb3NlcyBpbiBuIG1pbGxpc2Vjb25kcyBmcm9tIG5vd1xuICAgICAgY2xvc2VzSW4/OiBudW1iZXI7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAoYm9keT8uY2xvc2VzSW4gfHwgNDUwMDAwMCkpLFxuICAgIH0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBvZmZpY2VIb3VyczogW29mZmljZUhvdXJzXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiBib2R5LmFsbG93UXVlc3Rpb25zID8/IGZhbHNlLFxuICAgIH07XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICBvcHRpb25zWydjb3Vyc2UnXSA9IGNvdXJzZTtcbiAgICB9XG4gICAgY29uc3QgcXVldWU6IFF1ZXVlTW9kZWwgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWVzdGlvbicpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KClcbiAgICBib2R5OiB7XG4gICAgICBxdWV1ZUlkOiBudW1iZXI7XG4gICAgICBzdHVkZW50SWQ6IG51bWJlcjtcbiAgICAgIGRhdGE6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zO1xuICAgIH0sXG4gICk6IFByb21pc2U8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBpZiAoYm9keS5xdWV1ZUlkKSB7XG4gICAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnF1ZXVlSWQpO1xuICAgICAgb3B0aW9uc1sncXVldWUnXSA9IHF1ZXVlO1xuICAgIH1cbiAgICBpZiAoYm9keS5zdHVkZW50SWQpIHtcbiAgICAgIGNvbnN0IHN0dWRlbnQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnN0dWRlbnRJZCk7XG4gICAgICBvcHRpb25zWydjcmVhdG9yJ10gPSBzdHVkZW50O1xuICAgIH1cbiAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25Nb2RlbCA9IGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIC4uLmJvZHkuZGF0YSxcbiAgICB9KTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IFF1ZXN0aW9uVHlwZSwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICd0eXBlb3JtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlck1vZGVsKVxuICAuYXR0cignZW1haWwnLCBgdXNlckBuZXUuZWR1YClcbiAgLmF0dHIoJ25hbWUnLCBgVXNlcmApXG4gIC5hdHRyKCdmaXJzdE5hbWUnLCAnVXNlcicpXG4gIC5hdHRyKCdwaG90b1VSTCcsIGBodHRwczovL3BpY3MvdXNlcmApO1xuXG5leHBvcnQgY29uc3QgU3R1ZGVudENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5TVFVERU5ULFxuKTtcblxuZXhwb3J0IGNvbnN0IFRBQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlRBLFxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbWVzdGVyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFNlbWVzdGVyTW9kZWwpXG4gIC5hdHRyKCdzZWFzb24nLCAnRmFsbCcpXG4gIC5hdHRyKCd5ZWFyJywgMjAyMCk7XG5cbmV4cG9ydCBjb25zdCBDbG9zZWRPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE0OjAwOjAwLjAwMFonKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNTozMDowMC4wMDBaJykpO1xuXG5leHBvcnQgY29uc3QgT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDM2MDAwMDApKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMzYwMDAwMCkpO1xuXG5leHBvcnQgY29uc3QgQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZU1vZGVsKVxuICAuYXR0cignbmFtZScsICdDUyAyNTAwJylcbiAgLmF0dHIoJ2ljYWxVUkwnLCAnaHR0cDovL2hpLmNvbScpXG4gIC5hdHRyKCdlbmFibGVkJywgdHJ1ZSlcbiAgLmFzc29jT25lKCdzZW1lc3RlcicsIFNlbWVzdGVyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSwgMCk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VTZWN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwpXG4gIC5hdHRyKCdnZW5lcmljQ291cnNlTmFtZScsICdDUyAyNTAwJylcbiAgLnNlcXVlbmNlKCdzZWN0aW9uJywgKGkpID0+IGkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbClcbiAgLmFzc29jT25lKCd1c2VyJywgVXNlckZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ3JvbGUnLCBSb2xlLlNUVURFTlQpO1xuXG5leHBvcnQgY29uc3QgUXVldWVGYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVldWVNb2RlbClcbiAgLmF0dHIoJ3Jvb20nLCAnT25saW5lJylcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cignYWxsb3dRdWVzdGlvbnMnLCBmYWxzZSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnc3RhZmZMaXN0JywgVXNlckZhY3RvcnksIDApO1xuXG4vLyBXQVJOSU5HOiBETyBOT1QgVVNFIENSRUFUT1JJRC4gQVMgWU9VIFNFRSBIRVJFLCBXRSBPTkxZIEFDQ0VQVCBDUkVBVE9SXG4vL1RPRE86IG1ha2UgaXQgYWNjZXB0IGNyZWF0b3JJZCBhcyB3ZWxsXG5leHBvcnQgY29uc3QgUXVlc3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVlc3Rpb25Nb2RlbClcbiAgLnNlcXVlbmNlKCd0ZXh0JywgKGkpID0+IGBxdWVzdGlvbiAke2l9YClcbiAgLmF0dHIoJ3N0YXR1cycsICdRdWV1ZWQnKVxuICAuYXR0cigncXVlc3Rpb25UeXBlJywgUXVlc3Rpb25UeXBlLk90aGVyKVxuICAuYXR0cignY3JlYXRlZEF0JywgbmV3IERhdGUoKSlcbiAgLmFzc29jT25lKCdxdWV1ZScsIFF1ZXVlRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjcmVhdG9yJywgVXNlckZhY3RvcnkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybS1mYWN0b3J5XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWVkU2VydmljZSB7XG4gIGFzeW5jIGRlbGV0ZUFsbChtb2RlbDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZ2V0Q29ubmVjdGlvbigpLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpLmRlbGV0ZSgpLmZyb20obW9kZWwpLmV4ZWN1dGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWRtaW5Db3JlTW9kdWxlRmFjdG9yeSxcbiAgQWRtaW5BdXRoTW9kdWxlRmFjdG9yeSxcbiAgRGVmYXVsdEFkbWluU2l0ZSxcbn0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciB9IGZyb20gJy4vY3JlZGVudGlhbFZhbGlkYXRvcic7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb3Vyc2VBZG1pbixcbiAgUXVldWVBZG1pbixcbiAgVXNlckFkbWluLFxuICBVc2VyQ291cnNlQWRtaW4sXG4gIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4sXG59IGZyb20gJy4vYWRtaW4tZW50aXRpZXMnO1xuaW1wb3J0IHsgQWRtaW5Db21tYW5kIH0gZnJvbSAnLi9hZG1pbi5jb21tYW5kJztcblxuY29uc3QgQ29yZU1vZHVsZSA9IEFkbWluQ29yZU1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5Db3JlTW9kdWxlKHt9KTtcbmNvbnN0IEF1dGhNb2R1bGUgPSBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQXV0aE1vZHVsZSh7XG4gIGFkbWluQ29yZU1vZHVsZTogQ29yZU1vZHVsZSxcbiAgY3JlZGVudGlhbFZhbGlkYXRvcjogYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yLCAvLyBob3cgZG8geW91IHZhbGlkYXRlIGNyZWRlbnRpYWxzXG4gIGltcG9ydHM6IFtUeXBlT3JtTW9kdWxlLmZvckZlYXR1cmUoW0FkbWluVXNlck1vZGVsXSldLCAvLyB3aGF0IG1vZHVsZXMgZXhwb3J0IHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIGNyZWRlbnRpYWxWYWxpZGF0b3IgYXZhaWxhYmxlXG4gIHByb3ZpZGVyczogW10sXG59KTtcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgZXhwb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtBZG1pbkNvbW1hbmRdLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYWRtaW5TaXRlOiBEZWZhdWx0QWRtaW5TaXRlKSB7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2UnLCBDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyJywgVXNlckFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXJDb3Vyc2UnLCBVc2VyQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignUXVldWUnLCBRdWV1ZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZVNlY3Rpb25NYXBwaW5nJywgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbik7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1hZG1pblwiKTsiLCJpbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ2JjcnlwdCc7XG5cbmV4cG9ydCBjb25zdCBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgPSB7XG4gIGluamVjdDogW10sXG4gIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVDcmVkZW50aWFscyhcbiAgICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICk6IFByb21pc2U8QWRtaW5Vc2VyTW9kZWw+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBpZiAoYXdhaXQgY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgRW50aXR5LCBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLCBCYXNlRW50aXR5LCBDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0JztcblxuLyoqXG4gKiBBZG1pbiB1c2VycyBhcmUgdG90YWxseSBzZXBhcmF0ZSBmcm9tIHJlZ3VsYXIgdXNlcnMgYW5kIGNhbiBvbmx5IGJlIGNyZWF0ZWQgZnJvbSBjb21tYW5kIGxpbmUuXG4gKiBgeWFybiBjbGkgYWRtaW46Y3JlYXRlYFxuICovXG5ARW50aXR5KCdhZG1pbl91c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBBZG1pblVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgc2V0UGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGFzc3dvcmRIYXNoID0gaGFzaFN5bmMocGFzc3dvcmQsIDUpO1xuICB9XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCB1bmlxdWU6IHRydWUsIG51bGxhYmxlOiBmYWxzZSB9KVxuICB1c2VybmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHBhc3N3b3JkSGFzaDogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsImltcG9ydCB7IEFkbWluRW50aXR5IH0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICduYW1lJ107XG59XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBRdWV1ZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAncm9vbScsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdlbWFpbCcsICduYW1lJ107XG4gIHNlYXJjaEZpZWxkcyA9IFsnZW1haWwnLCAnbmFtZSddO1xuICBmaWVsZHMgPSBbXG4gICAgJ2lkJyxcbiAgICAnZW1haWwnLFxuICAgICduYW1lJyxcbiAgICAnZGVza3RvcE5vdGlmc0VuYWJsZWQnLFxuICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgICdxdWV1ZXMnLFxuICBdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckNvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICd1c2VySWQnLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdnZW5lcmljQ291cnNlTmFtZScsICdzZWN0aW9uJywgJ2NvdXJzZUlkJ107XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kLCBQb3NpdGlvbmFsIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBxdWVzdGlvbiwga2V5SW5ZTiB9IGZyb20gJ3JlYWRsaW5lLXN5bmMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWRtaW5Db21tYW5kIHtcbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdjcmVhdGU6YWRtaW4gPHVzZXJuYW1lPicsXG4gICAgZGVzY3JpYmU6ICdjcmVhdGUgYW4gYWRtaW4gdXNlcicsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBAUG9zaXRpb25hbCh7XG4gICAgICBuYW1lOiAndXNlcm5hbWUnLFxuICAgICAgZGVzY3JpYmU6ICd0aGUgYWRtaW4gdXNlcm5hbWUnLFxuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSlcbiAgICB1c2VybmFtZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3QgY2hhbmdlUGFzc3dvcmQgPSBrZXlJbllOKFxuICAgICAgICBgVXNlciAke3VzZXJuYW1lfSBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gY2hhbmdlIHRoZWlyIHBhc3N3b3JkP2AsXG4gICAgICApO1xuICAgICAgaWYgKCFjaGFuZ2VQYXNzd29yZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzZXIgPSBBZG1pblVzZXJNb2RlbC5jcmVhdGUoeyB1c2VybmFtZSB9KTtcbiAgICB9XG4gICAgY29uc3QgcGFzc3dvcmQ6IHN0cmluZyA9IHF1ZXN0aW9uKCdQYXNzd29yZDogJywge1xuICAgICAgaGlkZUVjaG9CYWNrOiB0cnVlLFxuICAgIH0pO1xuICAgIHVzZXIuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIHVzZXI6ICR7dXNlci51c2VybmFtZX1gKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhZGxpbmUtc3luY1wiKTsiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmNvbmZpZygpO1xuXG4vLyBPcHRpb25zIG9ubHkgdXNlZCB3aGUgcnVuIHZpYSBDTElcbmNvbnN0IGluQ0xJID0ge1xuICBtaWdyYXRpb25zOiBbJ21pZ3JhdGlvbi8qLnRzJ10sXG4gIGNsaToge1xuICAgIG1pZ3JhdGlvbnNEaXI6ICdtaWdyYXRpb24nLFxuICB9LFxufTtcblxuY29uc3QgdHlwZW9ybSA9IHtcbiAgdHlwZTogJ3Bvc3RncmVzJyxcbiAgdXJsOiBwcm9jZXNzLmVudi5EQl9VUkwgfHwgJ3Bvc3RncmVzOi8vcG9zdGdyZXNAbG9jYWxob3N0OjU0MzIvZGV2JyxcbiAgc3luY2hyb25pemU6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG4gIGVudGl0aWVzOiBbXG4gICAgQ291cnNlTW9kZWwsXG4gICAgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCxcbiAgICBPZmZpY2VIb3VyTW9kZWwsXG4gICAgU2VtZXN0ZXJNb2RlbCxcbiAgICBVc2VyTW9kZWwsXG4gICAgVXNlckNvdXJzZU1vZGVsLFxuICAgIFF1ZXN0aW9uTW9kZWwsXG4gICAgUXVldWVNb2RlbCxcbiAgICBEZXNrdG9wTm90aWZNb2RlbCxcbiAgICBQaG9uZU5vdGlmTW9kZWwsXG4gICAgQWRtaW5Vc2VyTW9kZWwsXG4gICAgRXZlbnRNb2RlbCxcbiAgXSxcbiAga2VlcENvbm5lY3Rpb25BbGl2ZTogdHJ1ZSxcbiAgbG9nZ2luZzogISFwcm9jZXNzLmVudi5UWVBFT1JNX0xPR0dJTkcsXG4gIC4uLighIXByb2Nlc3MuZW52LlRZUEVPUk1fQ0xJID8gaW5DTEkgOiB7fSksXG59O1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb3JtO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJ25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IEJhY2tmaWxsUGhvbmVOb3RpZnMgfSBmcm9tICcuL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kJztcbmltcG9ydCB7IEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0IH0gZnJvbSAnLi9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMgfSBmcm9tICcuL3NlcGFyYXRlLWZpcnN0LWxhc3QtbmFtZXMuY29tbWFuZCc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQmFja2ZpbGxQaG9uZU5vdGlmcyxcbiAgICBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCxcbiAgICBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJ25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJ25vdGlmaWNhdGlvbi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsUGhvbmVOb3RpZnMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cGhvbmUtbm90aWZzJyxcbiAgICBkZXNjcmliZTpcbiAgICAgICdkZWxldGUgcGhvbmUgbm90aWZzIHdpdGggbm8gdXNlcmlkcywgZGVsZXRlIGR1cGxpY2F0ZSBwaG9uZSBub3RpZnMsIGFuZCBmb3JjaWJseSBzZXQgdmVyaWZpZWQgb24gZXhpc3RpbmcgcGhvbmVub3RpZnMnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBmaXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRGVsZXRlIHRob3NlIHdpdGhvdXQgdXNlcmlkcyBhc3NvY2lhdGVkXG4gICAgY29uc3Qgbm9Vc2VyID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZSh7IHVzZXJJZDogSXNOdWxsKCkgfSk7XG4gICAgY29uc29sZS5sb2coYGRlbGV0ZWQgJHtub1VzZXIuYWZmZWN0ZWR9IGRlc2t0b3Bub3RpZm1vZGVscyB3aXRoIG5vIHVzZXJpZGApO1xuXG4gICAgLy8gZGVsZXRlIGF0IG9uY2VcbiAgICBjb25zdCB0b0RlbGV0ZTogUGhvbmVOb3RpZk1vZGVsW10gPSBbXTtcblxuICAgIC8vIERlbGV0ZSBkdXBsaWNhdGVzXG4gICAgY29uc3QgZHVwcyA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ3Bub3RpZicpXG4gICAgICAuc2VsZWN0KFtgXCJwaG9uZU51bWJlclwiYCwgJ0NPVU5UKCopJ10pXG4gICAgICAuZ3JvdXBCeSgncG5vdGlmLnBob25lTnVtYmVyJylcbiAgICAgIC5oYXZpbmcoJ0NPVU5UKCopID4gMScpXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuICAgIGNvbnNvbGUubG9nKGBmb3VuZCAke2R1cHMubGVuZ3RofSBkdXBzYCk7XG4gICAgdG9EZWxldGUucHVzaCguLi5kdXBzKTtcblxuICAgIGNvbnN0IHZhbGlkID0gW107XG4gICAgbGV0IGNoYW5nZWROdW0gPSAwO1xuICAgIC8vIGNoYW5nZSB0byByZWFsIG51bWJlclxuICAgIGNvbnN0IGFsbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kKHsgcmVsYXRpb25zOiBbJ3VzZXInXSB9KTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYWxsKSB7XG4gICAgICBjb25zdCBudW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHAucGhvbmVOdW1iZXIpO1xuICAgICAgaWYgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyICE9PSBwLnBob25lTnVtYmVyKSB7XG4gICAgICAgICAgY2hhbmdlZE51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHAucGhvbmVOdW1iZXIgPSBudW1iZXI7XG4gICAgICAgIHAudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgICB2YWxpZC5wdXNoKHApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9EZWxldGUucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coYFR3aWxpbyBjaGFuZ2VkICR7Y2hhbmdlZE51bX0gcGhvbmUgbnVtYmVycyB0byBmdWxsIG51bWApO1xuICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5zYXZlKHZhbGlkKTtcblxuICAgIC8vIERlbGV0ZSBhbmQgbWFrZSBzdXJlIHRvIGRpc2FibGUgcGhvbmVub3RpZiBmb3IgdXNlclxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ2RlbGV0aW5nIHBob25lIG5vdGlmczogJyxcbiAgICAgIHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5waG9uZU51bWJlciksXG4gICAgKTtcbiAgICBpZiAodG9EZWxldGUubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5pZCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzVG9EaXNhYmxlID0gKFxuICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmQoe1xuICAgICAgICB3aGVyZTogeyBwaG9uZU5vdGlmc0VuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgcmVsYXRpb25zOiBbJ3Bob25lTm90aWYnXSxcbiAgICAgIH0pXG4gICAgKS5maWx0ZXIoKHUpID0+ICF1LnBob25lTm90aWYpO1xuICAgIHVzZXJzVG9EaXNhYmxlLmZvckVhY2goKHUpID0+ICh1LnBob25lTm90aWZzRW5hYmxlZCA9IGZhbHNlKSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vyc1RvRGlzYWJsZSk7XG4gICAgY29uc29sZS5sb2coYGRpc2FibGVkIHBob25lbm90aWZzIGZvciAke3VzZXJzVG9EaXNhYmxlLmxlbmd0aH0gdXNlcnNgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnF1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdCcsXG4gICAgZGVzY3JpYmU6ICdjb3B5IGFsbCBleGlzdGluZyBoZWxwZWRBdCB0byBmaXJzdEhlbHBlZEF0JyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY29weSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAudXBkYXRlKClcbiAgICAgIC5zZXQoeyBmaXJzdEhlbHBlZEF0OiAoKSA9PiAnXCJoZWxwZWRBdFwiJyB9KVxuICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgIC5jYWxsTGlzdGVuZXJzKGZhbHNlKVxuICAgICAgLmV4ZWN1dGUoKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBVcGRhdGVkICR7YXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoKVxuICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgICAgLmdldENvdW50KCl9IHJlY29yZHNgLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFNlcGFyYXRlRmlyc3RMYXN0TmFtZXMge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOmZpcnN0LWxhc3QtbmFtZXMnLFxuICAgIGRlc2NyaWJlOiAnY2hhbmdlIGFsbCBuYW1lcyB0byBmaXJzdCBhbmQgbGFzdCBuYW1lcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kKCk7XG4gICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdXNlci5maXJzdE5hbWUgPSB1c2VyLm5hbWUuc3BsaXQoJyAnKVswXTtcbiAgICAgICAgdXNlci5sYXN0TmFtZSA9IHVzZXIubmFtZS5zcGxpdCgnICcpLnNsaWNlKDEpLmpvaW4oJyAnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdXNlci5maXJzdE5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyBuYW1lIGZhaWxlZCBmb3IgJHt1c2VyLm5hbWV9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vycyk7XG4gICAgY29uc3QgY291bnQgPSBVc2VyTW9kZWwuY291bnQoKTtcblxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGVkIG5hbWVzIGZvciAke2NvdW50fSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUsIEh0dHBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNDb250cm9sbGVyIH0gZnJvbSAnLi9yZWxlYXNlLW5vdGVzLmNvbnRyb2xsZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtSZWxlYXNlTm90ZXNDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBNb2R1bGUucmVnaXN0ZXJBc3luYyh7XG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiAoe1xuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICBtYXhSZWRpcmVjdHM6IDUsXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVsZWFzZU5vdGVzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUywgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIEh0dHBTZXJ2aWNlLFxuICBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJ2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQENvbnRyb2xsZXIoJ3JlbGVhc2Vfbm90ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXRSZWxlYXNlTm90ZXMoKTogUHJvbWlzZTxHZXRSZWxlYXNlTm90ZXNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSA9IHtcbiAgICAgIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bGwsXG4gICAgICByZWxlYXNlTm90ZXM6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldChcbiAgICAgICAgJ2h0dHBzOi8vbm90aW9uLWFwaS5zcGxpdGJlZS5pby92MS9wYWdlL2FiYmEyNDZiZmEwODQ3YmFhMjcwNmFiMzBkMGM2YzdkJyxcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgICBjb25zdCBkYXRhID0gcmVxdWVzdC5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aW1lVGV4dCA9XG4gICAgICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddPy52YWx1ZT8ucHJvcGVydGllc1xuICAgICAgICAgID8udGl0bGVbMF1bMF07XG4gICAgICByZXNwb25zZS5sYXN0VXBkYXRlZFVuaXhUaW1lID0gdGltZVRleHQuc3BsaXQoJ1VuaXggJylbMV0gKiAxMDAwO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5yZWxlYXNlTm90ZXNDb250cm9sbGVyLnJlbGVhc2VOb3Rlc1RpbWUoZSksXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIHRpbWUgYmxvY2sgYW5kIHBhZ2UgbGluayBibG9jayBmcm9tIHBhZ2VcbiAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgZGF0YVsnNGQyNWYzOTMtZTU3MC00Y2Q1LWFkNjYtYjI3OGEwOTI0MjI1J10udmFsdWUucHJvcGVydGllcy50aXRsZSA9IFtdO1xuICAgIHJlc3BvbnNlLnJlbGVhc2VOb3RlcyA9IGRhdGE7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBJbmplY3RhYmxlLCBBcmd1bWVudE1ldGFkYXRhIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG4vKipcbiAqIFN0cmlwIHVuZGVmaW5lZCBwcm9wZXJ0aWVzIGZyb20gYm9keS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0cmlwVW5kZWZpbmVkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgbWV0YWRhdGE6IEFyZ3VtZW50TWV0YWRhdGEpOiBhbnkge1xuICAgIGlmIChtZXRhZGF0YS50eXBlID09PSAnYm9keScpIHtcbiAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZCh2YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZHJvcFVuZGVmaW5lZChvYmo6IHVua25vd24pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcgJiYgb2JqW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKG9ialtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5lc3RJbnRlcmNlcHRvcixcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgQ2FsbEhhbmRsZXIsXG4gIEh0dHBFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcG1JbnRlcmNlcHRvciBpbXBsZW1lbnRzIE5lc3RJbnRlcmNlcHRvciB7XG4gIGludGVyY2VwdChcbiAgICBjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0LFxuICAgIG5leHQ6IENhbGxIYW5kbGVyLFxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFeGNlcHRpb24pIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==