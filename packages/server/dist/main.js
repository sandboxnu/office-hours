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
const stripUndefined_pipe_1 = __webpack_require__(99);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(100);
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
const queue_module_1 = __webpack_require__(43);
const seed_module_1 = __webpack_require__(79);
const admin_module_1 = __webpack_require__(84);
const nestjs_command_1 = __webpack_require__(50);
const sse_module_1 = __webpack_require__(47);
const typeormConfig = __webpack_require__(92);
const backfill_module_1 = __webpack_require__(94);
const release_notes_module_1 = __webpack_require__(97);
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
const queue_module_1 = __webpack_require__(43);
const ical_command_1 = __webpack_require__(49);
const ical_service_1 = __webpack_require__(51);
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
const queue_sse_service_1 = __webpack_require__(36);
const queue_entity_1 = __webpack_require__(26);
const course_roles_guard_1 = __webpack_require__(41);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
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
        setTimeout(async () => {
            await this.queueCleanService.cleanQueue(queue.id);
            await this.queueSSEService.updateQueue(queue.id);
        });
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
CourseController = __decorate([
    common_2.Controller('courses'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    common_2.UseInterceptors(common_2.ClassSerializerInterceptor),
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
exports.ERROR_MESSAGES = exports.SSEQueueResponse = exports.UpdateQueueParams = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.StatusSentToCreator = exports.StatusInPriorityQueue = exports.StatusInQueue = exports.ClosedQuestionStatus = exports.LimboQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.isProd = exports.PROD_URL = void 0;
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
        queuesWithOpenQuestions.forEach((queue) => {
            this.cleanQueue(queue.id);
        });
    }
    async cleanQueue(queueId) {
        const queue = await queue_entity_1.QueueModel.findOne(queueId, {
            relations: ['staffList'],
        });
        if (!(await queue.checkIsOpen())) {
            queue.notes = '';
            await queue.save();
            await this.unsafeClean(queue.id);
        }
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
const lodash_1 = __webpack_require__(37);
const sse_service_1 = __webpack_require__(38);
const queue_service_1 = __webpack_require__(40);
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
/* 37 */
/***/ (function(module, exports) {

module.exports = require("lodash");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEService = void 0;
const common_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(15);
const apm = __webpack_require__(39);
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
/* 39 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

/***/ }),
/* 40 */
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
const lodash_1 = __webpack_require__(37);
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
exports.CourseRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(23);
const role_guard_1 = __webpack_require__(42);
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
exports.QueueModule = void 0;
const common_1 = __webpack_require__(5);
const queue_controller_1 = __webpack_require__(44);
const queue_clean_service_1 = __webpack_require__(35);
const sse_module_1 = __webpack_require__(47);
const queue_service_1 = __webpack_require__(40);
const queue_sse_service_1 = __webpack_require__(36);
const queue_subscriber_1 = __webpack_require__(48);
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
const queue_role_decorator_1 = __webpack_require__(45);
const queue_role_guard_1 = __webpack_require__(46);
const queue_sse_service_1 = __webpack_require__(36);
const queue_service_1 = __webpack_require__(40);
let QueueController = class QueueController {
    constructor(connection, queueSSEService, queueService) {
        this.connection = connection;
        this.queueSSEService = queueSSEService;
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
        queue_service_1.QueueService])
], QueueController);
exports.QueueController = QueueController;


/***/ }),
/* 45 */
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
exports.QueueRolesGuard = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const role_guard_1 = __webpack_require__(42);
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
exports.SSEModule = void 0;
const common_1 = __webpack_require__(5);
const sse_service_1 = __webpack_require__(38);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(36);
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
exports.ICalCommand = void 0;
const nestjs_command_1 = __webpack_require__(50);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(51);
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
/* 50 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

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
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(52);
const typeorm_1 = __webpack_require__(20);
const office_hour_entity_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(21);
const queue_entity_1 = __webpack_require__(26);
const dist_1 = __webpack_require__(53);
__webpack_require__(54);
const moment = __webpack_require__(55);
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
/* 52 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("moment");

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
const typeorm_1 = __webpack_require__(20);
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
const apm = __webpack_require__(39);
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
const typeorm_1 = __webpack_require__(20);
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
const typeorm_1 = __webpack_require__(20);
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
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(23);
const lodash_1 = __webpack_require__(37);
const common_2 = __webpack_require__(14);
const jwt_auth_guard_1 = __webpack_require__(31);
const user_decorator_1 = __webpack_require__(34);
const notification_service_1 = __webpack_require__(59);
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
            'photoURL',
            'desktopNotifsEnabled',
            'phoneNotifsEnabled',
        ]);
        return Object.assign(Object.assign({}, userResponse), { courses, phoneNumber: (_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber, desktopNotifs });
    }
    async patch(userPatch, user) {
        var _a;
        user = Object.assign(user, userPatch);
        if (user.phoneNotifsEnabled &&
            userPatch.phoneNumber !== ((_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber)) {
            await this.notifService.registerPhone(userPatch.phoneNumber, user);
        }
        await user.save();
        return this.get(user);
    }
};
__decorate([
    common_1.Get(),
    __param(0, user_decorator_1.User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "get", null);
__decorate([
    common_1.Patch(),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.UpdateProfileParams,
        user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "patch", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
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
const queue_module_1 = __webpack_require__(43);
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
const typeorm_1 = __webpack_require__(20);
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
const role_guard_1 = __webpack_require__(42);
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
const queue_sse_service_1 = __webpack_require__(36);
const queue_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(20);
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
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(20);
const factories_1 = __webpack_require__(81);
const course_entity_1 = __webpack_require__(21);
const office_hour_entity_1 = __webpack_require__(27);
const non_production_guard_1 = __webpack_require__(68);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const seed_service_1 = __webpack_require__(83);
const user_entity_1 = __webpack_require__(23);
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
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UR20CG36E-cf0f375252bd-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user1,
                role: common_2.Role.STUDENT,
                course: course,
            });
            const user2 = await factories_1.UserFactory.create({
                email: 'takayama.a@northeastern.edu',
                name: 'Alex Takayama',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UJL97443D-50121339686b-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user2,
                role: common_2.Role.STUDENT,
                course: course,
            });
            const user3 = await factories_1.UserFactory.create({
                email: 'stenzel.w@northeastern.edu',
                name: 'Will Stenzel',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-URF256KRT-d10098e879da-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user3,
                role: common_2.Role.TA,
                course: course,
            });
            const user4 = await factories_1.UserFactory.create({
                email: 'chu.daj@northeastern.edu',
                name: 'Da-Jin Chu',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UE56Y5UT1-85db59a474f4-512',
            });
            await factories_1.UserCourseFactory.create({
                user: user4,
                role: common_2.Role.TA,
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
            endTime: new Date(now.valueOf() + 4500000),
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
    common_1.Get('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "deleteAll", null);
__decorate([
    common_1.Get('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createSeeds", null);
__decorate([
    common_1.Get('fill_queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "fillQueue", null);
__decorate([
    common_1.Post('createUser'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createUser", null);
__decorate([
    common_1.Post('createQueue'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createQueue", null);
__decorate([
    common_1.Post('createQuestion'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createQuestion", null);
SeedController = __decorate([
    common_1.Controller('seeds'),
    common_1.UseGuards(non_production_guard_1.NonProductionGuard),
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
const user_course_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(26);
const course_section_mapping_entity_1 = __webpack_require__(69);
exports.UserFactory = new typeorm_factory_1.Factory(user_entity_1.UserModel)
    .attr('email', `user@neu.edu`)
    .attr('name', `User`)
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
    .assocMany('officeHours', exports.OfficeHourFactory);
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
    .assocMany('officeHours', exports.OfficeHourFactory);
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
const typeorm_1 = __webpack_require__(20);
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
const nestjs_command_1 = __webpack_require__(50);
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
let BackfillModule = class BackfillModule {
};
BackfillModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        providers: [backfill_phone_notifs_command_1.BackfillPhoneNotifs, question_first_helped_at_command_1.BackfillQuestionFirstHelpedAt],
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
const nestjs_command_1 = __webpack_require__(50);
const common_1 = __webpack_require__(5);
const phone_notif_entity_1 = __webpack_require__(25);
const typeorm_1 = __webpack_require__(20);
const twilio_service_1 = __webpack_require__(61);
const user_entity_1 = __webpack_require__(23);
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
const nestjs_command_1 = __webpack_require__(50);
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
/* 97 */
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
const release_notes_controller_1 = __webpack_require__(98);
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(101);
const apm = __webpack_require__(39);
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
/* 101 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvZXZlbnQtbW9kZWwuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR5cGVvcm1cIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi1mc20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC1hdXRoLmd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvcGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvY291cnNlLXJvbGVzLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9ndWFyZHMvcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWNvbW1hbmRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9xdWVzdGlvbi1maXJzdC1oZWxwZWQtYXQuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cmlwVW5kZWZpbmVkLnBpcGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwbS5pbnRlcmNlcHRvci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL29wZXJhdG9yc1wi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LEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO2lCQUFNLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7Q0FDRjtBQW5CWSxrQkFBa0I7SUFEOUIsbUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQW1COUI7QUFuQlksZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ04vQix3Q0FNd0I7QUFFeEIsNkNBQTRDO0FBQzVDLG9DQUF3QztBQUd4QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQ3ZCLHNCQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLEtBQUssWUFBWSxzQkFBYSxFQUFFO2dCQUNsQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjOzs7Ozs7O0FDWjNCLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgJ2VsYXN0aWMtYXBtLW5vZGUvc3RhcnQnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnLi9ib290c3RyYXAnO1xuXG5kZWNsYXJlIGNvbnN0IG1vZHVsZTogYW55O1xuXG5ib290c3RyYXAobW9kdWxlLmhvdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIpOyIsImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25QaXBlLCBJTmVzdEFwcGxpY2F0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RyaXBVbmRlZmluZWRQaXBlIH0gZnJvbSAnLi9zdHJpcFVuZGVmaW5lZC5waXBlJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEFwbUludGVyY2VwdG9yIH0gZnJvbSAnLi9hcG0uaW50ZXJjZXB0b3InO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcChob3Q6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlLCB7XG4gICAgbG9nZ2VyOiBbJ2Vycm9yJywgJ3dhcm4nLCAnbG9nJywgJ2RlYnVnJywgJ3ZlcmJvc2UnXSxcbiAgfSk7XG4gIGFkZEdsb2JhbHNUb0FwcChhcHApO1xuICBhcHAuc2V0R2xvYmFsUHJlZml4KCdhcGkvdjEnKTtcbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhuZXcgQXBtSW50ZXJjZXB0b3IoKSk7XG5cbiAgaWYgKGlzUHJvZCgpKSB7XG4gICAgY29uc29sZS5sb2coYFJ1bm5pbmcgcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uYCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyBub24tcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uIFRISVMgTVNHIFNIT1VMRCBOT1QgQVBQRUFSIE9OIFBST0QgVk1gLFxuICAgICk7XG4gIH1cbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXdhaXQgYXBwLmxpc3RlbigzMDAyKTtcblxuICBpZiAoaG90KSB7XG4gICAgaG90LmFjY2VwdCgpO1xuICAgIGhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxufVxuXG4vLyBHbG9iYWwgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgdHJ1ZSBpbiBwcm9kIGFuZCBpbiBpbnRlZ3JhdGlvbiB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEdsb2JhbHNUb0FwcChhcHA6IElOZXN0QXBwbGljYXRpb24pOiB2b2lkIHtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKFxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XG4gICAgICB3aGl0ZWxpc3Q6IHRydWUsXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZSxcbiAgICB9KSxcbiAgKTtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBTdHJpcFVuZGVmaW5lZFBpcGUoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dpbk1vZHVsZSB9IGZyb20gJy4vbG9naW4vbG9naW4ubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2R1bGUgfSBmcm9tICcuL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IFNlZWRNb2R1bGUgfSBmcm9tICcuL3NlZWQvc2VlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnLi9zc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyB0eXBlb3JtQ29uZmlnIGZyb20gJy4uL29ybWNvbmZpZyc7XG5pbXBvcnQgeyBCYWNrZmlsbE1vZHVsZSB9IGZyb20gJ2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNNb2R1bGUgfSBmcm9tICdyZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBUeXBlT3JtTW9kdWxlLmZvclJvb3QodHlwZW9ybUNvbmZpZyksXG4gICAgU2NoZWR1bGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExvZ2luTW9kdWxlLFxuICAgIFByb2ZpbGVNb2R1bGUsXG4gICAgQ291cnNlTW9kdWxlLFxuICAgIFF1ZXVlTW9kdWxlLFxuICAgIE5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBRdWVzdGlvbk1vZHVsZSxcbiAgICBTZWVkTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbXG4gICAgICAgICcuZW52JyxcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbJy5lbnYuZGV2ZWxvcG1lbnQnXSA6IFtdKSxcbiAgICAgIF0sXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBZG1pbk1vZHVsZSxcbiAgICBDb21tYW5kTW9kdWxlLFxuICAgIFNTRU1vZHVsZSxcbiAgICBCYWNrZmlsbE1vZHVsZSxcbiAgICBSZWxlYXNlTm90ZXNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy90eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc2NoZWR1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlQ29udHJvbGxlciB9IGZyb20gJy4vY291cnNlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgSUNhbENvbW1hbmQgfSBmcm9tICcuL2ljYWwuY29tbWFuZCc7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbQ291cnNlQ29udHJvbGxlcl0sXG4gIGltcG9ydHM6IFtRdWV1ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0lDYWxDb21tYW5kLCBJY2FsU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgR2V0Q291cnNlUmVzcG9uc2UsIFF1ZXVlUGFydGlhbCwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCwgRXZlbnRUeXBlIH0gZnJvbSAncHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgZ2V0UmVwb3NpdG9yeSB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVJvbGVzR3VhcmQgfSBmcm9tICcuL2NvdXJzZS1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdjb3Vyc2VzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBDb3Vyc2VSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVCwgUm9sZS5UQSlcbiAgYXN5bmMgZ2V0KEBQYXJhbSgnaWQnKSBpZDogbnVtYmVyKTogUHJvbWlzZTxHZXRDb3Vyc2VSZXNwb25zZT4ge1xuICAgIC8vIFRPRE86IGZvciBhbGwgY291cnNlIGVuZHBvaW50LCBjaGVjayBpZiB0aGV5J3JlIGEgc3R1ZGVudCBvciBhIFRBXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZShpZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlcycsICdxdWV1ZXMuc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICAvLyBVc2UgcmF3IHF1ZXJ5IGZvciBwZXJmb3JtYW5jZSAoYXZvaWQgZW50aXR5IGluc3RhbnRpYXRpb24gYW5kIHNlcmlhbGl6YXRpb24pXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gYXdhaXQgZ2V0UmVwb3NpdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdvaCcpXG4gICAgICAuc2VsZWN0KFsnaWQnLCAndGl0bGUnLCBgXCJzdGFydFRpbWVcImAsIGBcImVuZFRpbWVcImBdKVxuICAgICAgLndoZXJlKCdvaC5jb3Vyc2VJZCA9IDpjb3Vyc2VJZCcsIHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KVxuICAgICAgLmdldFJhd01hbnkoKTtcblxuICAgIGNvdXJzZS5xdWV1ZXMgPSBhd2FpdCBhc3luYy5maWx0ZXIoXG4gICAgICBjb3Vyc2UucXVldWVzLFxuICAgICAgYXN5bmMgKHEpID0+IGF3YWl0IHEuY2hlY2tJc09wZW4oKSxcbiAgICApO1xuICAgIGF3YWl0IGFzeW5jLmVhY2goY291cnNlLnF1ZXVlcywgYXN5bmMgKHEpID0+IHtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVUaW1lcygpO1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVNpemUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3Vyc2U7XG4gIH1cblxuICBAUG9zdCgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja0luKFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxRdWV1ZVBhcnRpYWw+IHtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QucHVzaCh1c2VyKTtcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCBFdmVudE1vZGVsLmNyZWF0ZSh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgZXZlbnRUeXBlOiBFdmVudFR5cGUuVEFfQ0hFQ0tFRF9JTixcbiAgICAgIHVzZXIsXG4gICAgICBjb3Vyc2VJZCxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQERlbGV0ZSgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja091dChcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QgPSBxdWV1ZS5zdGFmZkxpc3QuZmlsdGVyKChlKSA9PiBlLmlkICE9PSB1c2VyLmlkKTtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgRXZlbnRNb2RlbC5jcmVhdGUoe1xuICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlLlRBX0NIRUNLRURfT1VULFxuICAgICAgdXNlcixcbiAgICAgIGNvdXJzZUlkLFxuICAgIH0pLnNhdmUoKTtcbiAgICAvLyBDbGVhbiB1cCBxdWV1ZSBpZiBuZWNlc3NhcnlcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVDbGVhblNlcnZpY2UuY2xlYW5RdWV1ZShxdWV1ZS5pZCk7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcbmltcG9ydCB7XG4gIElzQm9vbGVhbixcbiAgSXNEZWZpbmVkLFxuICBJc0VudW0sXG4gIElzSW50LFxuICBJc05vdEVtcHR5LFxuICBJc09wdGlvbmFsLFxuICBJc1N0cmluZyxcbiAgVmFsaWRhdGVJZixcbn0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5leHBvcnQgY29uc3QgUFJPRF9VUkwgPSBcImh0dHBzOi8va2hvdXJ5b2ZmaWNlaG91cnMuY29tXCI7XG5leHBvcnQgY29uc3QgaXNQcm9kID0gKCk6IGJvb2xlYW4gPT5cbiAgcHJvY2Vzcy5lbnYuRE9NQUlOID09PSBQUk9EX1VSTCB8fFxuICAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3c/LmxvY2F0aW9uPy5vcmlnaW4gPT09IFBST0RfVVJMKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBJIEJhc2UgRGF0YSBUeXBlcyAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBOT1RFOiBUaGVzZSBhcmUgbm90IHRoZSBEQiBkYXRhIHR5cGVzLiBUaGV5IGFyZSBvbmx5IHVzZWQgZm9yIHRoZSBhcGlcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXNlci5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIGVtYWlsIHN0cmluZyBvZiB0aGUgdXNlciBpZiB0aGV5IHByb3ZpZGUgaXQgKG51bGxhYmxlKVxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICogQHBhcmFtIGNvdXJzZXMgLSBUaGUgbGlzdCBvZiBjb3Vyc2VzIHRoYXQgdGhlIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIChhcyBlaXRoZXIgYSAnc3R1ZGVudCcsICd0YScgb3IgJ3Byb2Zlc3NvcicpXG4gKiBAcGFyYW0gZGVza3RvcE5vdGlmcyAtIGxpc3Qgb2YgZW5kcG9pbnRzIHNvIHRoYXQgZnJvbnRlbmQgY2FuIGZpZ3VyZSBvdXQgaWYgZGV2aWNlIGlzIGVuYWJsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWwhOiBzdHJpbmc7XG4gIG5hbWUhOiBzdHJpbmc7XG4gIHBob3RvVVJMITogc3RyaW5nO1xuICBjb3Vyc2VzITogVXNlckNvdXJzZVtdO1xuICBkZXNrdG9wTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGVza3RvcE5vdGlmUGFydGlhbClcbiAgZGVza3RvcE5vdGlmcyE6IERlc2t0b3BOb3RpZlBhcnRpYWxbXTtcblxuICBwaG9uZU5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuICBwaG9uZU51bWJlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW5kcG9pbnQhOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIHBhcnRpYWwgdXNlciBpbmZvIG5lZWRlZCBieSB0aGUgZnJvbnRlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZVxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcGhvdG9VUkw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpYWwgY291cnNlIGRhdGEgbmVlZGVkIG9uIHRoZSBmcm9udCBlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqL1xuZXhwb3J0IHR5cGUgQ291cnNlUGFydGlhbCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIHRoYXQgYSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCBhbmQgdGhlaXIgcm9sZSBpbiB0aGF0IGNvdXJzZVxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhlIHVzZXIgYWNjb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHJvbGUgLSBUaGUgdXNlcidzIHJvbGUgaW4gdGhlIGNvdXJzZS5cbiAqL1xuZXhwb3J0IHR5cGUgVXNlckNvdXJzZSA9IHtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb2xlOiBSb2xlO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSB1c2VyIHJvbGVzIGluIGEgY291cnNlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgU1RVREVOVCA9IFwic3R1ZGVudFwiLFxuICBUQSA9IFwidGFcIixcbiAgUFJPRkVTU09SID0gXCJwcm9mZXNzb3JcIixcbn1cblxuY2xhc3MgT2ZmaWNlSG91clBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgdGl0bGUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lITogRGF0ZTtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHRoYXQgc3R1ZGVudHMgY2FuIGpvaW4gd2l0aCB0aGllciB0aWNrZXRzLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGF0IHRoaXMgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGZvci5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBxdWVzdGlvbnMgLSBUaGUgbGlzdCBvZiB0aGUgc3R1ZGVudHMgcXVlc3Rpb25zIGFzc29jYWl0ZWQgd2l0aCB0aGUgcXVldWUuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWUge1xuICBpZDogbnVtYmVyO1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvb206IHN0cmluZztcbiAgc3RhZmZMaXN0OiBVc2VyUGFydGlhbFtdO1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gIHN0YXJ0VGltZT86IERhdGU7XG4gIGVuZFRpbWU/OiBEYXRlO1xuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHBhcnRpYWwgdG8gYmUgc2hvd24gb24gdGhlIHRvZGF5IHBhZ2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICByb29tITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBzdGFmZkxpc3QhOiBVc2VyUGFydGlhbFtdO1xuXG4gIHF1ZXVlU2l6ZSE6IG51bWJlcjtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGlzT3BlbiE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lPzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lPzogRGF0ZTtcblxuICBhbGxvd1F1ZXN0aW9ucyE6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWVzdGlvbiBpcyBjcmVhdGVkIHdoZW4gYSBzdHVkZW50IHdhbnRzIGhlbHAgZnJvbSBhIFRBLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgc3R1ZGVudCBxdWVzdGlvbi5cbiAqIEBwYXJhbSBjcmVhdG9yIC0gVGhlIFN0dWRlbnQgdGhhdCBoYXMgY3JlYXRlZCB0aGUgcXVlc3Rpb24uXG4gKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IGRlc2NyaXRpcG4gb2Ygd2hhdCBoZS9zaGUgbmVlZHMgaGVscCB3aXRoLlxuICogQHBhcmFtIGNyZWF0ZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVGlja2V0IHdhcyBjcmVhdGVkLiBFeDogXCIyMDIwLTA5LTEyVDEyOjAwOjAwLTA0OjAwXCJcbiAqIEBwYXJhbSBoZWxwZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgYmVnYW4gaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBjbG9zZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgZmluaXNoZWQgaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBxdWVzdGlvblR5cGUgLSBUaGUgcXVlc3Rpb24gdHlwZSBoZWxwcyBkaXN0aW5ndWlzaCBxdWVzdGlvbiBmb3IgVEEncyBhbmQgZGF0YSBpbnNpZ2h0cy5cbiAqIEBwYXJhbSBzdGF0dXMgLSBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoaXMgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJ0aWN1bGFyIHN0dWRlbnQsIHRvIGhlbHAgVEEncyBmaW5kIHRoZW1cbiAqIEBwYXJhbSBpc09ubGluZSAtIFdldGhlciBvciBub3QgdGhlIHF1ZXN0aW9uIHdpbGwgaGVscGVkIG9ubGluZSBvciBpbi1wZXJzb25cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIHtcbiAgaWQhOiBudW1iZXI7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIGNyZWF0b3IhOiBVc2VyUGFydGlhbDtcbiAgdGV4dD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgdGFIZWxwZWQ/OiBVc2VyUGFydGlhbDtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGhlbHBlZEF0PzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjbG9zZWRBdD86IERhdGU7XG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcbiAgc3RhdHVzITogUXVlc3Rpb25TdGF0dXM7XG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuICBpc09ubGluZT86IGJvb2xlYW47XG59XG5cbi8vIFF1ZXN0aW9uIFR5cGVzXG5leHBvcnQgZW51bSBRdWVzdGlvblR5cGUge1xuICBDb25jZXB0ID0gXCJDb25jZXB0XCIsXG4gIENsYXJpZmljYXRpb24gPSBcIkNsYXJpZmljYXRpb25cIixcbiAgVGVzdGluZyA9IFwiVGVzdGluZ1wiLFxuICBCdWcgPSBcIkJ1Z1wiLFxuICBTZXR1cCA9IFwiU2V0dXBcIixcbiAgT3RoZXIgPSBcIk90aGVyXCIsXG59XG5cbmV4cG9ydCBlbnVtIE9wZW5RdWVzdGlvblN0YXR1cyB7XG4gIERyYWZ0aW5nID0gXCJEcmFmdGluZ1wiLFxuICBRdWV1ZWQgPSBcIlF1ZXVlZFwiLFxuICBIZWxwaW5nID0gXCJIZWxwaW5nXCIsXG4gIFByaW9yaXR5UXVldWVkID0gXCJQcmlvcml0eVF1ZXVlZFwiLFxufVxuXG4vKipcbiAqIExpbWJvIHN0YXR1c2VzIGFyZSBhd2FpdGluZyBzb21lIGNvbmZpcm1hdGlvbiBmcm9tIHRoZSBzdHVkZW50XG4gKi9cbmV4cG9ydCBlbnVtIExpbWJvUXVlc3Rpb25TdGF0dXMge1xuICBDYW50RmluZCA9IFwiQ2FudEZpbmRcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgc3R1ZGVudCBjYW4ndCBiZSBmb3VuZCBieSBhIFRBXG4gIFJlUXVldWVpbmcgPSBcIlJlUXVldWVpbmdcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgVEEgd2FudHMgdG8gZ2V0IGJhY2sgdG8gYSBzdHVkZW50IGxhdGVyIGFuZCBnaXZlIHRoZW0gdGhlIG9wdGlvbiB0byBiZSBwdXQgaW50byB0aGUgcHJpb3JpdHkgcXVldWVcbiAgVEFEZWxldGVkID0gXCJUQURlbGV0ZWRcIiwgLy8gV2hlbiBhIFRBIGRlbGV0ZXMgYSBxdWVzdGlvbiBmb3IgYSBtdWx0aXR1ZGUgb2YgcmVhc29uc1xufVxuXG5leHBvcnQgZW51bSBDbG9zZWRRdWVzdGlvblN0YXR1cyB7XG4gIFJlc29sdmVkID0gXCJSZXNvbHZlZFwiLFxuICBDb25maXJtZWREZWxldGVkID0gXCJDb25maXJtZWREZWxldGVkXCIsXG4gIFN0dWRlbnRDYW5jZWxsZWQgPSBcIlN0dWRlbnRDYW5jZWxsZWRcIixcbiAgU3RhbGUgPSBcIlN0YWxlXCIsXG59XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblF1ZXVlID0gW1xuICBPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG5dO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlID0gW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNTZW50VG9DcmVhdG9yID0gW1xuICAuLi5TdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIC4uLlN0YXR1c0luUXVldWUsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuXTtcblxuLy8gVGlja2V0IFN0YXR1cyAtIFJlcHJlc2VudHMgYSBnaXZlbiBzdGF0dXMgb2YgYXMgc3R1ZGVudCdzIHRpY2tldFxuZXhwb3J0IHR5cGUgUXVlc3Rpb25TdGF0dXMgPSBrZXlvZiB0eXBlb2YgUXVlc3Rpb25TdGF0dXNLZXlzO1xuLy8gYW4gRW51bS1saWtlIGNvbnN0YW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBzdGF0dXNlcyBmb3IgY29udmVuaWVuY2UuXG5leHBvcnQgY29uc3QgUXVlc3Rpb25TdGF0dXNLZXlzID0ge1xuICAuLi5PcGVuUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkNsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICAuLi5MaW1ib1F1ZXN0aW9uU3RhdHVzLFxufTtcblxuLyoqXG4gKiBBIFNlbWVzdGVyIG9iamVjdCwgcmVwcmVzZW50aW5nIGEgc2NoZWR1bGUgc2VtZXN0ZXIgdGVybSBmb3IgdGhlIHB1cnBvc2VzIG9mIGEgY291cnNlLlxuICogQHBhcmFtIHNlYXNvbiAtIFRoZSBzZWFzb24gb2YgdGhpcyBzZW1lc3Rlci5cbiAqIEBwYXJhbSB5ZWFyIC0gVGhlIHllYXIgb2YgdGhpcyBzZW1lc3Rlci5cbiAqL1xuaW50ZXJmYWNlIFNlbWVzdGVyIHtcbiAgc2Vhc29uOiBTZWFzb247XG4gIHllYXI6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aGUgc2Vhc29ucyBpbiB3aGljaCBhIGNvdXJzZSBjYW4gdGFrZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2Vhc29uID0gXCJGYWxsXCIgfCBcIlNwcmluZ1wiIHwgXCJTdW1tZXIgMVwiIHwgXCJTdW1tZXIgMlwiO1xuXG5leHBvcnQgdHlwZSBEZXNrdG9wTm90aWZCb2R5ID0ge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBleHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAga2V5czoge1xuICAgIHAyNTZkaDogc3RyaW5nO1xuICAgIGF1dGg6IHN0cmluZztcbiAgfTtcbiAgbmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFBob25lTm90aWZCb2R5ID0ge1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PSBBUEkgUm91dGUgVHlwZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPbiBiYWNrZW5kLCB2YWxpZGF0ZWQgd2l0aCBodHRwczovL2RvY3MubmVzdGpzLmNvbS90ZWNobmlxdWVzL3ZhbGlkYXRpb25cbi8vIEFQSSByb3V0ZSBQYXJhbXMgYW5kIFJlc3BvbnNlc1xuXG4vLyBPZmZpY2UgSG91cnMgUmVzcG9uc2UgVHlwZXNcbmV4cG9ydCBjbGFzcyBHZXRQcm9maWxlUmVzcG9uc2UgZXh0ZW5kcyBVc2VyIHt9XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlEYXRhUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgZW1haWwhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgZmlyc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBsYXN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzSW50KClcbiAgY2FtcHVzITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzU3RyaW5nKClcbiAgcGhvdG9fdXJsITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIGNvdXJzZXMhOiBLaG91cnlTdHVkZW50Q291cnNlW107XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgdGFfY291cnNlcyE6IEtob3VyeVRBQ291cnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlTdHVkZW50Q291cnNlIHtcbiAgQElzSW50KClcbiAgY3JuITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWNjZWxlcmF0ZWQhOiBib29sZWFuO1xuXG4gIEBJc0ludCgpXG4gIHNlY3Rpb24hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgdGl0bGUhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlUQUNvdXJzZSB7XG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLaG91cnlSZWRpcmVjdFJlc3BvbnNlIHtcbiAgcmVkaXJlY3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVQYXJhbXMge1xuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBAVmFsaWRhdGVJZigobykgPT4gby5waG9uZU5vdGlmc0VuYWJsZWQpXG4gIEBJc1N0cmluZygpXG4gIEBJc05vdEVtcHR5KClcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VSZXNwb25zZSB7XG4gIGlkITogbnVtYmVyO1xuICBuYW1lITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IE9mZmljZUhvdXJQYXJ0aWFsKVxuICBvZmZpY2VIb3VycyE6IEFycmF5PE9mZmljZUhvdXJQYXJ0aWFsPjtcblxuICBAVHlwZSgoKSA9PiBRdWV1ZVBhcnRpYWwpXG4gIHF1ZXVlcyE6IFF1ZXVlUGFydGlhbFtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVldWVSZXNwb25zZSBleHRlbmRzIFF1ZXVlUGFydGlhbCB7fVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUXVldWVzUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWV1ZVBhcnRpYWw+IHt9XG5cbmV4cG9ydCBjbGFzcyBMaXN0UXVlc3Rpb25zUmVzcG9uc2Uge1xuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgeW91clF1ZXN0aW9uPzogUXVlc3Rpb247XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXN0aW9uc0dldHRpbmdIZWxwITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcHJpb3JpdHlRdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICB0ZXh0ITogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBxdWV1ZUlkITogbnVtYmVyO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBmb3JjZSE6IGJvb2xlYW47XG59XG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgdGV4dD86IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgQElzT3B0aW9uYWwoKVxuICBxdWV1ZUlkPzogbnVtYmVyO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25TdGF0dXNLZXlzKVxuICBASXNPcHRpb25hbCgpXG4gIHN0YXR1cz86IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgdHlwZSBUQVVwZGF0ZVN0YXR1c1Jlc3BvbnNlID0gUXVldWVQYXJ0aWFsO1xuZXhwb3J0IHR5cGUgUXVldWVOb3RlUGF5bG9hZFR5cGUgPSB7XG4gIG5vdGVzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVldWVQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIG5vdGVzPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhbGxvd1F1ZXN0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTU0VRdWV1ZVJlc3BvbnNlIHtcbiAgcXVldWU/OiBHZXRRdWV1ZVJlc3BvbnNlO1xuICBxdWVzdGlvbnM/OiBMaXN0UXVlc3Rpb25zUmVzcG9uc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvQm9keSB7XG4gIFRvQ291bnRyeTogc3RyaW5nO1xuICBUb1N0YXRlOiBzdHJpbmc7XG4gIFNtc01lc3NhZ2VTaWQ6IHN0cmluZztcbiAgTnVtTWVkaWE6IHN0cmluZztcbiAgVG9DaXR5OiBzdHJpbmc7XG4gIEZyb21aaXA6IHN0cmluZztcbiAgU21zU2lkOiBzdHJpbmc7XG4gIEZyb21TdGF0ZTogc3RyaW5nO1xuICBTbXNTdGF0dXM6IHN0cmluZztcbiAgRnJvbUNpdHk6IHN0cmluZztcbiAgQm9keTogc3RyaW5nO1xuICBGcm9tQ291bnRyeTogc3RyaW5nO1xuICBUbzogc3RyaW5nO1xuICBUb1ppcDogc3RyaW5nO1xuICBOdW1TZWdtZW50czogc3RyaW5nO1xuICBNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIEFjY291bnRTaWQ6IHN0cmluZztcbiAgRnJvbTogc3RyaW5nO1xuICBBcGlWZXJzaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2Uge1xuICByZWxlYXNlTm90ZXM6IHVua25vd247XG4gIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEVSUk9SX01FU1NBR0VTID0ge1xuICBxdWVzdGlvbkNvbnRyb2xsZXI6IHtcbiAgICBjcmVhdGVRdWVzdGlvbjoge1xuICAgICAgaW52YWxpZFF1ZXVlOiBcIlBvc3RlZCB0byBhbiBpbnZhbGlkIHF1ZXVlXCIsXG4gICAgICBub05ld1F1ZXN0aW9uczogXCJRdWV1ZSBub3QgYWxsb3dpbmcgbmV3IHF1ZXN0aW9uc1wiLFxuICAgICAgY2xvc2VkUXVldWU6IFwiUXVldWUgaXMgY2xvc2VkXCIsXG4gICAgICBvbmVRdWVzdGlvbkF0QVRpbWU6IFwiWW91IGNhbid0IGNyZWF0ZSBtb3JlIHRoYW4gb25lIHF1ZXN0aW9uIGF0IGEgdGltZS5cIixcbiAgICB9LFxuICAgIHVwZGF0ZVF1ZXN0aW9uOiB7XG4gICAgICBmc21WaW9sYXRpb246IChcbiAgICAgICAgcm9sZTogc3RyaW5nLFxuICAgICAgICBxdWVzdGlvblN0YXR1czogc3RyaW5nLFxuICAgICAgICBib2R5U3RhdHVzOiBzdHJpbmdcbiAgICAgICk6IHN0cmluZyA9PlxuICAgICAgICBgJHtyb2xlfSBjYW5ub3QgY2hhbmdlIHN0YXR1cyBmcm9tICR7cXVlc3Rpb25TdGF0dXN9IHRvICR7Ym9keVN0YXR1c31gLFxuICAgICAgdGFPbmx5RWRpdFF1ZXN0aW9uU3RhdHVzOiBcIlRBL1Byb2Zlc3NvcnMgY2FuIG9ubHkgZWRpdCBxdWVzdGlvbiBzdGF0dXNcIixcbiAgICAgIG90aGVyVEFIZWxwaW5nOiBcIkFub3RoZXIgVEEgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICBvdGhlclRBUmVzb2x2ZWQ6IFwiQW5vdGhlciBUQSBoYXMgYWxyZWFkeSByZXNvbHZlZCB0aGlzIHF1ZXN0aW9uXCIsXG4gICAgICB0YUhlbHBpbmdPdGhlcjogXCJUQSBpcyBhbHJlYWR5IGhlbHBpbmcgc29tZW9uZSBlbHNlXCIsXG4gICAgICBsb2dpblVzZXJDYW50RWRpdDogXCJMb2dnZWQtaW4gdXNlciBkb2VzIG5vdCBoYXZlIGVkaXQgYWNjZXNzXCIsXG4gICAgfSxcbiAgfSxcbiAgbG9naW5Db250cm9sbGVyOiB7XG4gICAgcmVjZWl2ZURhdGFGcm9tS2hvdXJ5OiBcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmVcIixcbiAgfSxcbiAgbm90aWZpY2F0aW9uQ29udHJvbGxlcjoge1xuICAgIG1lc3NhZ2VOb3RGcm9tVHdpbGlvOiBcIk1lc3NhZ2Ugbm90IGZyb20gVHdpbGlvXCIsXG4gIH0sXG4gIG5vdGlmaWNhdGlvblNlcnZpY2U6IHtcbiAgICByZWdpc3RlclBob25lOiBcInBob25lIG51bWJlciBpbnZhbGlkXCIsXG4gIH0sXG4gIHF1ZXN0aW9uUm9sZUd1YXJkOiB7XG4gICAgcXVlc3Rpb25Ob3RGb3VuZDogXCJRdWVzdGlvbiBub3QgZm91bmRcIixcbiAgICBxdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZDogXCJDYW5ub3QgZmluZCBxdWV1ZSBvZiBxdWVzdGlvblwiLFxuICAgIHF1ZXVlRG9lc05vdEV4aXN0OiBcIlRoaXMgcXVldWUgZG9lcyBub3QgZXhpc3QhXCIsXG4gIH0sXG4gIHF1ZXVlUm9sZUd1YXJkOiB7XG4gICAgcXVldWVOb3RGb3VuZDogXCJRdWV1ZSBub3QgZm91bmRcIixcbiAgfSxcbiAgcmVsZWFzZU5vdGVzQ29udHJvbGxlcjoge1xuICAgIHJlbGVhc2VOb3Rlc1RpbWU6IChlOiBhbnkpOiBzdHJpbmcgPT5cbiAgICAgIFwiRXJyb3IgUGFyc2luZyByZWxlYXNlIG5vdGVzIHRpbWU6IFwiICsgZSxcbiAgfSxcbiAgcm9sZUd1YXJkOiB7XG4gICAgbm90TG9nZ2VkSW46IFwiTXVzdCBiZSBsb2dnZWQgaW5cIixcbiAgICBub0NvdXJzZUlkRm91bmQ6IFwiTm8gY291cnNlaWQgZm91bmRcIixcbiAgICBub3RJbkNvdXJzZTogXCJOb3QgSW4gVGhpcyBDb3Vyc2VcIixcbiAgICBtdXN0QmVSb2xlVG9Kb2luQ291cnNlOiAocm9sZXM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gICAgICBgWW91IG11c3QgaGF2ZSBvbmUgb2Ygcm9sZXMgWyR7cm9sZXMuam9pbihcIiwgXCIpfV0gdG8gYWNjZXNzIHRoaXMgY291cnNlYCxcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy10cmFuc2Zvcm1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY1wiKTsiLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRXZlbnQgaW4gdGhlIEV2ZW50TW9kZWwgdGFibGUsIHVzZWQgZm9yIGFkdmFuY2VkIG1ldHJpY3MuXG4gKi9cbmV4cG9ydCBlbnVtIEV2ZW50VHlwZSB7XG4gIFRBX0NIRUNLRURfSU4gPSAndGFDaGVja2VkSW4nLFxuICBUQV9DSEVDS0VEX09VVCA9ICd0YUNoZWNrZWRPdXQnLFxufVxuXG5ARW50aXR5KCdldmVudF9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRXZlbnRNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHRpbWU6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogRXZlbnRUeXBlIH0pXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZXZlbnRzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLmV2ZW50cylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm1cIik7IiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBFdmVudE1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS9ldmVudC1tb2RlbC5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zZW1lc3Rlci5lbnRpdHknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgaW4gdGhlIGNvbnRleHQgb2Ygb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICogQHBhcmFtIHNlbWVzdGVyIC0gVGhlIHNlbWVzdGVyIG9mIHRoaXMgY291cnNlLlxuICovXG4vKmludGVyZmFjZSBDb3Vyc2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNlbWVzdGVyOiBTZW1lc3RlcjtcbiAgICB1c2VyczogVXNlckNvdXJzZVtdXG59Ki9cblxuQEVudGl0eSgnY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLmNvdXJzZSlcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLmNvdXJzZSlcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGljYWxVUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS5jb3Vyc2UpXG4gIEBFeGNsdWRlKClcbiAgdXNlckNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbDtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBTZW1lc3Rlck1vZGVsLCAoc2VtZXN0ZXIpID0+IHNlbWVzdGVyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3NlbWVzdGVySWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgc2VtZXN0ZXI6IFNlbWVzdGVyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgLy8gVE9ETzogY2FuIHdlIG1ha2UgdGhlc2Ugbm90IG51bGxhYmxlIGFuZCB3b3JrIHdpdGggVHlwZU9STVxuICBzZW1lc3RlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbignYm9vbGVhbicsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZW5hYmxlZDogYm9vbGVhbjsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIGdpdmVuIHRoZSBjb3Vyc2UgaXMgdXNpbmcgb3VyIGFwcFxuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IEV2ZW50TW9kZWwsIChldmVudCkgPT4gZXZlbnQuY291cnNlKVxuICBARXhjbHVkZSgpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgndXNlcl9jb3Vyc2VfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS51c2VyQ291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbih7IHR5cGU6ICdlbnVtJywgZW51bTogUm9sZSwgZGVmYXVsdDogUm9sZS5TVFVERU5UIH0pXG4gIHJvbGU6IFJvbGU7XG59XG4iLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIE1hbnlUb01hbnksXG4gIE9uZVRvTWFueSxcbiAgT25lVG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3VzZXItY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBFdmVudE1vZGVsLCAoZXZlbnQpID0+IGV2ZW50LnVzZXIpXG4gIGV2ZW50czogRXZlbnRNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnZGVza3RvcF9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBleHBpcmF0aW9uVGltZTogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcDI1NmRoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGF1dGg6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmRlc2t0b3BOb3RpZnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7IHR5cGU6ICd0aW1lc3RhbXAnIH0pXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ3RleHQnLCBudWxsYWJsZTogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3Bob25lX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBQaG9uZU5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5waG9uZU5vdGlmKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHZlcmlmaWVkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBKb2luVGFibGUsXG4gIExlc3NUaGFuT3JFcXVhbCxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBNb3JlVGhhbk9yRXF1YWwsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcblxuaW50ZXJmYWNlIFRpbWVJbnRlcnZhbCB7XG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcbn1cblxuQEVudGl0eSgncXVldWVfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UucXVldWVzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICByb29tOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVlc3Rpb25Nb2RlbCwgKHFtKSA9PiBxbS5xdWV1ZSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBub3Rlczogc3RyaW5nO1xuXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnF1ZXVlcylcbiAgQEpvaW5UYWJsZSgpXG4gIHN0YWZmTGlzdDogVXNlck1vZGVsW107XG5cbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuXG4gIEBFeGNsdWRlKClcbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLnF1ZXVlKVxuICBASm9pblRhYmxlKClcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcblxuICBpc09wZW46IGJvb2xlYW47XG5cbiAgYXN5bmMgY2hlY2tJc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuc3RhZmZMaXN0ICYmIHRoaXMuc3RhZmZMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IE1TX0lOX01JTlVURSA9IDYwMDAwO1xuICAgIGNvbnN0IG9ocyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCBvcGVuID0gISFvaHMuZmluZChcbiAgICAgIChlKSA9PlxuICAgICAgICBlLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxMCAqIE1TX0lOX01JTlVURSA8IG5vdy5nZXRUaW1lKCkgJiZcbiAgICAgICAgZS5lbmRUaW1lLmdldFRpbWUoKSArIDEgKiBNU19JTl9NSU5VVEUgPiBub3cuZ2V0VGltZSgpLFxuICAgICk7XG4gICAgdGhpcy5pc09wZW4gPSBvcGVuO1xuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcXVldWVTaXplOiBudW1iZXI7XG5cbiAgYXN5bmMgYWRkUXVldWVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVTaXplID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZSh0aGlzLmlkKS5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSwgUm9sZSwgU3RhdHVzSW5RdWV1ZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnLi9xdWVzdGlvbi1mc20nO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBmaXJzdCBoZWxwZWQgKGRvZXNuJ3Qgb3ZlcndyaXRlKVxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBmaXJzdEhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBsYXN0IGhlbHBlZCAoZ2V0dGluZyBoZWxwIGFnYWluIG9uIHByaW9yaXR5IHF1ZXVlIG92ZXJ3cml0ZXMpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICAvLyBXaGVuIHRoZSBxdWVzdGlvbiBsZWF2ZXMgdGhlIHF1ZXVlXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjbG9zZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWVzdGlvblR5cGU6IFF1ZXN0aW9uVHlwZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc3RhdHVzOiBRdWVzdGlvblN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbG9jYXRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBhcyB0aGUgZ2l2ZW4gcm9sZVxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIHN0YXR1cyBjaGFuZ2Ugc3VjY2VlZGVkXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU3RhdHVzKG5ld1N0YXR1czogUXVlc3Rpb25TdGF0dXMsIHJvbGU6IFJvbGUpOiBib29sZWFuIHtcbiAgICBpZiAoY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXModGhpcy5zdGF0dXMsIG5ld1N0YXR1cywgcm9sZSkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHN0YXR1c2VzOiBRdWVzdGlvblN0YXR1c1tdLFxuICApOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlcyxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXN0aW9ucyB0aGF0IGFyZSBvcGVuIGluIHRoZSBxdWV1ZSAobm90IGluIHByaW9yaXR5IHF1ZXVlKVxuICAgKi9cbiAgc3RhdGljIHdhaXRpbmdJblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgU3RhdHVzSW5RdWV1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF06IHtcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGVdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBTdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIFN0YXR1c0luUXVldWUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDcm9uLCBDcm9uRXhwcmVzc2lvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uLy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBDbGVhbiB0aGUgcXVldWUgYW5kIG1hcmsgc3RhbGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlQ2xlYW5TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIEBDcm9uKENyb25FeHByZXNzaW9uLkVWRVJZX0RBWV9BVF9NSUROSUdIVClcbiAgcHJpdmF0ZSBhc3luYyBjbGVhbkFsbFF1ZXVlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9uczogUXVldWVNb2RlbFtdID0gYXdhaXQgUXVldWVNb2RlbC5nZXRSZXBvc2l0b3J5KClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ3F1ZXVlJylcbiAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdCgncXVldWVfbW9kZWwucXVlc3Rpb25zJywgJ3F1ZXN0aW9uJylcbiAgICAgIC53aGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzKScsIHtcbiAgICAgICAgc3RhdHVzOiBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgICB9KVxuICAgICAgLmdldE1hbnkoKTtcblxuICAgIHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zLmZvckVhY2goKHF1ZXVlKSA9PiB7XG4gICAgICB0aGlzLmNsZWFuUXVldWUocXVldWUuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFuUXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgaWYgKCEoYXdhaXQgcXVldWUuY2hlY2tJc09wZW4oKSkpIHtcbiAgICAgIHF1ZXVlLm5vdGVzID0gJyc7XG4gICAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgICBhd2FpdCB0aGlzLnVuc2FmZUNsZWFuKHF1ZXVlLmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVuc2FmZUNsZWFuKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgICBxdWV1ZUlkLFxuICAgICAgT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICkuZ2V0TWFueSgpO1xuICAgIGNvbnN0IG9wZW5RdWVzdGlvbnMgPSBxdWVzdGlvbnMuZmlsdGVyKFxuICAgICAgKHEpID0+IHEuc3RhdHVzIGluIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgICApO1xuXG4gICAgb3BlblF1ZXN0aW9ucy5mb3JFYWNoKChxOiBRdWVzdGlvbk1vZGVsKSA9PiB7XG4gICAgICBxLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0YWxlO1xuICAgICAgcS5jbG9zZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUob3BlblF1ZXN0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJvbGUsIFNTRVF1ZXVlUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICdzc2Uvc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgeyByZXMsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLy8gU2VuZCBldmVudCB3aXRoIG5ldyBxdWVzdGlvbnMsIGJ1dCBubyBtb3JlIHRoYW4gb25jZSBhIHNlY29uZFxuICB1cGRhdGVRdWVzdGlvbnMgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIGlmIChxdWVzdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCBhc3luYyAoeyByb2xlLCB1c2VySWQgfSkgPT4gKHtcbiAgICAgICAgcXVlc3Rpb25zOiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgICAgICBxdWV1ZUlkLFxuICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgcm9sZSxcbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZVF1ZXVlID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKCkgPT4gKHsgcXVldWUgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVG9Sb29tKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBkYXRhOiAobWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEpID0+IFByb21pc2U8U1NFUXVldWVSZXNwb25zZT4sXG4gICkge1xuICAgIGF3YWl0IHRoaXMuc3NlU2VydmljZS5zZW5kRXZlbnQoaWRUb1Jvb20ocXVldWVJZCksIGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsZVVwZGF0ZSh1cGRhdGVGdW5jdGlvbjogKHF1ZXVlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIHJldHVybiB0aHJvdHRsZShcbiAgICAgIGFzeW5jIChxdWV1ZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVGdW5jdGlvbihxdWV1ZUlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAge1xuICAgICAgICBsZWFkaW5nOiBmYWxzZSxcbiAgICAgICAgdHJhaWxpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmluUXVldWVXaXRoU3RhdHVzKHF1ZXVlSWQsIFtcbiAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgIC4uLlN0YXR1c0luUXVldWUsXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICBdKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgY29uc3QgcXVlc3Rpb25zID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuXG4gICAgcXVlc3Rpb25zLnF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucXVlc3Rpb25zR2V0dGluZ0hlbHAgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKFxuICAgICAgKHF1ZXN0aW9uKSA9PiBxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICk7XG5cbiAgICBxdWVzdGlvbnMucHJpb3JpdHlRdWV1ZSA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoKHF1ZXN0aW9uKSA9PlxuICAgICAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLmluY2x1ZGVzKHF1ZXN0aW9uLnN0YXR1cyBhcyBPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYXN5bmMgcGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgY29uc3QgbmV3TFFSID0gbmV3IExpc3RRdWVzdGlvbnNSZXNwb25zZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdMUVIsIHF1ZXN0aW9ucyk7XG5cbiAgICAgIG5ld0xRUi5xdWV1ZSA9IHF1ZXN0aW9ucy5xdWV1ZS5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgLy8gY2xhc3NUb0NsYXNzIHRyYW5zZm9ybWVyIHdpbGwgYXBwbHkgdGhlIEBFeGNsdWRlc1xuICAgICAgICByZXR1cm4gY2xhc3NUb0NsYXNzPFF1ZXN0aW9uPihcbiAgICAgICAgICBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICAgICAgc3RhdHVzOiBJbihTdGF0dXNTZW50VG9DcmVhdG9yKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgbmV3TFFSLnByaW9yaXR5UXVldWUgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ld0xRUjtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBDYW5BY3RpdmF0ZSxcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVmbGVjdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvbGVzR3VhcmQge1xuICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPjtcblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbjtcblxuICBzZXR1cERhdGEocmVxdWVzdDogYW55KTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvbGVzR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmbGVjdG9yOiBSZWZsZWN0b3IpIHt9XG5cbiAgYXN5bmMgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJvbGVzID0gdGhpcy5yZWZsZWN0b3IuZ2V0PHN0cmluZ1tdPigncm9sZXMnLCBjb250ZXh0LmdldEhhbmRsZXIoKSk7XG4gICAgaWYgKCFyb2xlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3QgPSBjb250ZXh0LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCB7IGNvdXJzZUlkLCB1c2VyIH0gPSBhd2FpdCB0aGlzLnNldHVwRGF0YShyZXF1ZXN0KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm90TG9nZ2VkSW4pO1xuICAgIH1cblxuICAgIGlmICghY291cnNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubm9Db3Vyc2VJZEZvdW5kKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXRjaFJvbGVzKHJvbGVzLCB1c2VyLCBjb3Vyc2VJZCk7XG4gIH1cblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcblxuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKEVSUk9SX01FU1NBR0VTLnJvbGVHdWFyZC5ub3RJbkNvdXJzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtYWluaW5nID0gcm9sZXMuZmlsdGVyKChyb2xlKSA9PiB7XG4gICAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlLnRvU3RyaW5nKCkgPT09IHJvbGU7XG4gICAgfSk7XG5cbiAgICBpZiAocmVtYWluaW5nLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5yb2xlR3VhcmQubXVzdEJlUm9sZVRvSm9pbkNvdXJzZShyb2xlcyksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZW1haW5pbmcubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVDb250cm9sbGVyIH0gZnJvbSAnLi9xdWV1ZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJ3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU3Vic2NyaWJlciB9IGZyb20gJy4vcXVldWUuc3Vic2NyaWJlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXVlQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIFF1ZXVlU2VydmljZSxcbiAgICBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgUXVldWVTdWJzY3JpYmVyLFxuICBdLFxuICBleHBvcnRzOiBbUXVldWVDbGVhblNlcnZpY2UsIFF1ZXVlU1NFU2VydmljZV0sXG4gIGltcG9ydHM6IFtTU0VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgR2V0UXVldWVSZXNwb25zZSxcbiAgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICBSb2xlLFxuICBVcGRhdGVRdWV1ZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUmVzLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGUgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVldWUtcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncXVldWVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWV1ZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXVlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWV1ZShAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPEdldFF1ZXVlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gIH1cblxuICBAR2V0KCc6cXVldWVJZC9xdWVzdGlvbnMnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5wZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBxdWVzdGlvbnMsXG4gICAgICB1c2VySWQsXG4gICAgICByb2xlLFxuICAgICk7XG4gIH1cblxuICBAUGF0Y2goJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyB1cGRhdGVRdWV1ZShcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWV1ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcXVldWUubm90ZXMgPSBib2R5Lm5vdGVzO1xuICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gYm9keS5hbGxvd1F1ZXN0aW9ucztcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgLy8gRW5kcG9pbnQgdG8gc2VuZCBmcm9udGVuZCByZWNlaXZlIHNlcnZlci1zZW50IGV2ZW50cyB3aGVuIHF1ZXVlIGNoYW5nZXNcbiAgQEdldCgnOnF1ZXVlSWQvc3NlJylcbiAgc2VuZEV2ZW50KFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICk6IHZvaWQge1xuICAgIHJlcy5zZXQoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2V2ZW50LXN0cmVhbScsXG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScsXG4gICAgICAnWC1BY2NlbC1CdWZmZXJpbmcnOiAnbm8nLFxuICAgICAgQ29ubmVjdGlvbjogJ2tlZXAtYWxpdmUnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KHF1ZXVlSWQsIHJlcywgeyByb2xlLCB1c2VySWQgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgUXVldWVSb2xlID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIGFzeW5jIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlPy5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZTtcbiAgfSxcbik7XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oRVJST1JfTUVTU0FHRVMucXVldWVSb2xlR3VhcmQucXVldWVOb3RGb3VuZCk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnLi9zc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoeyBwcm92aWRlcnM6IFtTU0VTZXJ2aWNlXSwgZXhwb3J0czogW1NTRVNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgU1NFTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU3Vic2NyaWJlciBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVldWVNb2RlbD4ge1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSkge1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWV1ZU1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXVlTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShldmVudC5lbnRpdHkuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElDYWxDb21tYW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaWNhbDpzY3JhcGUnLFxuICAgIGRlc2NyaWJlOiAnc2NyYXBlIGljYWwgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaWNhbFNlcnZpY2UudXBkYXRlQWxsQ291cnNlcygpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgTW9tZW50ID0gbW9tZW50Lk1vbWVudDtcblxudHlwZSBDcmVhdGVPZmZpY2VIb3VyID0gRGVlcFBhcnRpYWw8T2ZmaWNlSG91ck1vZGVsPltdO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWNhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgLy8gdHogc2hvdWxkIG5vdCBiZSBwcmVjb252ZXJ0ZWQgYnkgZmluZE9uZUlhbmFcbiAgcHJpdmF0ZSBmaXhPdXRsb29rVFooZGF0ZTogTW9tZW50LCB0ejogc3RyaW5nKTogTW9tZW50IHtcbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcbiAgICBpZiAoaWFuYSkge1xuICAgICAgLy8gTW92ZSB0byB0aGUgdGltZXpvbmUgYmVjYXVzZSBub2RlLWljYWwgZGlkbid0IGRvIGl0IGZvciB1cywgc2luY2UgaXQgZG9lcyBub3QgcmVjb2duaXplIHdpbmRvd3MgdGltZXpvbmVcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkudHooaWFuYSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGRhdGUgb2Ygb2NjdXJlbmNlcyBmb3IgYW4gcnJ1bGUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLCBleGNsdWRpbmcgdGhlIGxpc3Qgb2YgZGF0ZXNcbiAgcHJpdmF0ZSBycnVsZVRvRGF0ZXMocnJ1bGU6IGFueSwgZXZlbnRUWjogc3RyaW5nLCBleGRhdGVSYXc6IERhdGVbXSk6IERhdGVbXSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBycnVsZTtcbiAgICBjb25zdCBkdHN0YXJ0OiBNb21lbnQgPSB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy5kdHN0YXJ0KSwgZXZlbnRUWik7XG4gICAgY29uc3QgdW50aWw6IE1vbWVudCA9XG4gICAgICBvcHRpb25zLnVudGlsICYmIHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLnVudGlsKSwgZXZlbnRUWik7XG4gICAgY29uc3QgZXZlbnRUWk1vbWVudCA9IG1vbWVudC50ei56b25lKGZpbmRPbmVJYW5hKGV2ZW50VFopIHx8IGV2ZW50VFopO1xuXG4gICAgLy8gR2V0IHRoZSBVVEMgT2Zmc2V0IGluIHRoaXMgZXZlbnQncyB0aW1lem9uZSwgYXQgdGhpcyB0aW1lLiBBY2NvdW50cyBmb3IgRGF5bGlnaHQgU2F2aW5ncyBhbmQgb3RoZXIgb2RkaXRpZXNcbiAgICBjb25zdCB0elVUQ09mZnNldE9uRGF0ZSA9IChkYXRlOiBNb21lbnQpID0+XG4gICAgICBldmVudFRaTW9tZW50LnV0Y09mZnNldChkYXRlLnZhbHVlT2YoKSk7XG4gICAgY29uc3QgZHRzdGFydFVUQ09mZnNldCA9IHR6VVRDT2Zmc2V0T25EYXRlKGR0c3RhcnQpO1xuXG4gICAgLy8gQXBwbHkgYSBVVEMgb2Zmc2V0IGluIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIE1vbWVudFxuICAgIGNvbnN0IGFwcGx5T2Zmc2V0ID0gKGRhdGU6IE1vbWVudCwgdXRjT2Zmc2V0OiBudW1iZXIpOiBNb21lbnQgPT5cbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdCh1dGNPZmZzZXQsICdtJyk7XG4gICAgLy8gYXBwbHkgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwcmVSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIGR0c3RhcnRVVENPZmZzZXQpO1xuICAgIC8vIFJldmVydCB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHBvc3RSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIC1kdHN0YXJ0VVRDT2Zmc2V0KTtcblxuICAgIC8vIEFkanVzdCBmb3IgcnJ1bGUgbm90IHRha2luZyBpbnRvIGFjY291bnQgRFNUIGluIGxvY2FsZVxuICAgIC8vICAgaWUuIFwiOHBtIGV2ZXJ5IGZyaWRheVwiIG1lYW5zIGhhdmluZyB0byBwdXNoIGJhY2sgNjAgbWludXRlcyBhZnRlciBGYWxsIEJhY2t3YXJkc1xuICAgIGNvbnN0IGZpeERTVCA9IChkYXRlOiBNb21lbnQpOiBNb21lbnQgPT5cbiAgICAgIC8vIEdldCB0aGUgZGlmZmVyZW5jZSBpbiBVVEMgb2Zmc2V0IGJldHdlZW4gZHRzdGFydCBhbmQgdGhpcyBkYXRlIChzbyBpZiB3ZSBjcm9zc2VkIERTVCBzd2l0Y2gsIHRoaXMgd2lsbCBiZSBub256ZXJvKVxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KGR0c3RhcnRVVENPZmZzZXQgLSB0elVUQ09mZnNldE9uRGF0ZShkYXRlKSwgJ20nKTtcblxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgUlJ1bGUoe1xuICAgICAgZnJlcTogb3B0aW9ucy5mcmVxLFxuICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICB3a3N0OiBvcHRpb25zLndrc3QsXG4gICAgICBjb3VudDogb3B0aW9ucy5jb3VudCxcbiAgICAgIGJ5d2Vla2RheTogb3B0aW9ucy5ieXdlZWtkYXksXG4gICAgICBkdHN0YXJ0OiBwcmVSUnVsZShkdHN0YXJ0KS50b0RhdGUoKSxcbiAgICAgIHVudGlsOiB1bnRpbCAmJiBwcmVSUnVsZSh1bnRpbCkudG9EYXRlKCksXG4gICAgfSk7XG5cbiAgICAvLyBEYXRlcyB0byBleGNsdWRlIGZyb20gcmVjdXJyZW5jZSwgc2VwYXJhdGUgZXhkYXRlIHRpbWVzdGFtcCBmb3IgZmlsdGVyaW5nXG4gICAgY29uc3QgZXhkYXRlczogbnVtYmVyW10gPSBPYmplY3QudmFsdWVzKGV4ZGF0ZVJhdyB8fCB7fSlcbiAgICAgIC5tYXAoKGQpID0+IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChkKSwgZXZlbnRUWikpXG4gICAgICAubWFwKChkKSA9PiBhcHBseU9mZnNldChkLCB0elVUQ09mZnNldE9uRGF0ZShkKSkudmFsdWVPZigpKTtcblxuICAgIC8vIERvaW5nIG1hdGggaGVyZSBiZWNhdXNlIG1vbWVudC5hZGQgY2hhbmdlcyBiZWhhdmlvciBiYXNlZCBvbiBzZXJ2ZXIgdGltZXpvbmVcbiAgICBjb25zdCBpbjEwV2Vla3MgPSBuZXcgRGF0ZShcbiAgICAgIGR0c3RhcnQudmFsdWVPZigpICsgMTAwMCAqIDYwICogNjAgKiAyNCAqIDcgKiAxMCxcbiAgICApO1xuICAgIHJldHVybiBydWxlXG4gICAgICAuYWxsKChkKSA9PiAhIXVudGlsIHx8IGQgPCBpbjEwV2Vla3MpXG4gICAgICAuZmlsdGVyKChkYXRlKSA9PiAhZXhkYXRlcy5pbmNsdWRlcyhkYXRlLmdldFRpbWUoKSkpXG4gICAgICAubWFwKChkKSA9PiBmaXhEU1QocG9zdFJSdWxlKG1vbWVudChkKSkpLnRvRGF0ZSgpKTtcbiAgfVxuXG4gIHBhcnNlSWNhbChpY2FsRGF0YTogQ2FsZW5kYXJSZXNwb25zZSwgY291cnNlSWQ6IG51bWJlcik6IENyZWF0ZU9mZmljZUhvdXIge1xuICAgIGNvbnN0IGljYWxEYXRhVmFsdWVzOiBBcnJheTxDYWxlbmRhckNvbXBvbmVudD4gPSBPYmplY3QudmFsdWVzKGljYWxEYXRhKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gaWNhbERhdGFWYWx1ZXMuZmlsdGVyKFxuICAgICAgKGlDYWxFbGVtZW50KTogaUNhbEVsZW1lbnQgaXMgVkV2ZW50ID0+XG4gICAgICAgIGlDYWxFbGVtZW50LnR5cGUgPT09ICdWRVZFTlQnICYmXG4gICAgICAgIGlDYWxFbGVtZW50LnN0YXJ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuZW5kICE9PSB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzRXZlbnRSZWdleCA9IC9cXGJeKE9IfEhvdXJzKVxcYi87XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9mZmljZUhvdXJzID0gb2ZmaWNlSG91cnMuZmlsdGVyKChldmVudCkgPT5cbiAgICAgIG9mZmljZUhvdXJzRXZlbnRSZWdleC50ZXN0KGV2ZW50LnN1bW1hcnkpLFxuICAgICk7XG5cbiAgICBsZXQgcmVzdWx0T2ZmaWNlSG91cnMgPSBbXTtcblxuICAgIGZpbHRlcmVkT2ZmaWNlSG91cnMuZm9yRWFjaCgob2g6IFZFdmVudCkgPT4ge1xuICAgICAgLy8gVGhpcyBvZmZpY2UgaG91ciB0aW1lem9uZS4gQVNTVU1JTkcgZXZlcnkgZGF0ZSBmaWVsZCBoYXMgc2FtZSB0aW1lem9uZSBhcyBvaC5zdGFydFxuICAgICAgY29uc3QgZXZlbnRUWiA9IG9oLnN0YXJ0LnR6O1xuICAgICAgY29uc3QgeyBycnVsZSB9ID0gb2ggYXMgYW55O1xuICAgICAgaWYgKHJydWxlKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gb2guZW5kLmdldFRpbWUoKSAtIG9oLnN0YXJ0LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBhbGxEYXRlcyA9IHRoaXMucnJ1bGVUb0RhdGVzKHJydWxlLCBldmVudFRaLCBvaC5leGRhdGUpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRPZmZpY2VIb3VycyA9IGFsbERhdGVzLm1hcCgoZGF0ZSkgPT4gKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiBkYXRlLFxuICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZHVyYXRpb24pLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzID0gcmVzdWx0T2ZmaWNlSG91cnMuY29uY2F0KGdlbmVyYXRlZE9mZmljZUhvdXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5zdGFydCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICAgIGVuZFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5lbmQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdE9mZmljZUhvdXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIE9mZmljZUhvdXJzIGZvciBhIGdpdmVuIENvdXJzZSBieSByZXNjcmFwaW5nIGljYWxcbiAgICogQHBhcmFtIGNvdXJzZSB0byBwYXJzZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGNvdXJzZTogQ291cnNlTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBzY3JhcGluZyBpY2FsIGZvciBjb3Vyc2UgXCIke2NvdXJzZS5uYW1lfVwiKCR7Y291cnNlLmlkfSBhdCB1cmw6ICR7Y291cnNlLmljYWxVUkx9Li4uYCxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZShgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgY291cnNlSWQ6IGNvdXJzZS5pZCwgcm9vbTogJ09ubGluZScgfSxcbiAgICB9KTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbTogJ09ubGluZScsXG4gICAgICAgIGNvdXJzZUlkOiBjb3Vyc2UuaWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IHRoaXMucGFyc2VJY2FsKFxuICAgICAgYXdhaXQgZnJvbVVSTChjb3Vyc2UuaWNhbFVSTCksXG4gICAgICBjb3Vyc2UuaWQsXG4gICAgKTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZGVsZXRlKHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuc2F2ZShcbiAgICAgIG9mZmljZUhvdXJzLm1hcCgoZSkgPT4ge1xuICAgICAgICBlLnF1ZXVlSWQgPSBxdWV1ZS5pZDtcbiAgICAgICAgcmV0dXJuIE9mZmljZUhvdXJNb2RlbC5jcmVhdGUoZSk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZUVuZChgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBjb25zb2xlLmxvZygnZG9uZSBzY3JhcGluZyEnKTtcbiAgfVxuXG4gIEBDcm9uKCc1MSAwICogKiAqJylcbiAgcHVibGljIGFzeW5jIHVwZGF0ZUFsbENvdXJzZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNvdXJzZSBpY2FscycpO1xuICAgIGNvbnN0IGNvdXJzZXMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY291cnNlcy5tYXAoKGMpID0+IHRoaXMudXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoYykpKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1pY2FsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbmRvd3MtaWFuYS9kaXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudC10aW1lem9uZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnJ1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmU3Vic2NyaWJlciB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW05vdGlmaWNhdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBEZXNrdG9wTm90aWZTdWJzY3JpYmVyLCBUd2lsaW9TZXJ2aWNlXSxcbiAgZXhwb3J0czogW05vdGlmaWNhdGlvblNlcnZpY2UsIFR3aWxpb1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgQ29ubmVjdGlvbixcbiAgSW5zZXJ0RXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gRGVza3RvcE5vdGlmTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8RGVza3RvcE5vdGlmTW9kZWw+KSB7XG4gICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5RGVza3RvcChcbiAgICAgIGV2ZW50LmVudGl0eSxcbiAgICAgIFwiWW91J3ZlIHN1Y2Nlc3NmdWxseSBzaWduZWQgdXAgZm9yIGRlc2t0b3Agbm90aWZpY2F0aW9ucyFcIixcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEJhZFJlcXVlc3RFeGNlcHRpb24sIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCAqIGFzIHdlYlB1c2ggZnJvbSAnd2ViLXB1c2gnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IE5vdGlmTXNncyA9IHtcbiAgcGhvbmU6IHtcbiAgICBXUk9OR19NRVNTQUdFOlxuICAgICAgJ1BsZWFzZSByZXNwb25kIHdpdGggZWl0aGVyIFlFUyBvciBOTy4gVGV4dCBTVE9QIGF0IGFueSB0aW1lIHRvIHN0b3AgcmVjZWl2aW5nIHRleHQgbWVzc2FnZXMnLFxuICAgIENPVUxEX05PVF9GSU5EX05VTUJFUjpcbiAgICAgICdDb3VsZCBub3QgZmluZCBhbiBPZmZpY2UgSG91cnMgYWNjb3VudCB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyLicsXG4gICAgVU5SRUdJU1RFUjpcbiAgICAgIFwiWW91J3ZlIHVucmVnaXN0ZXJlZCBmcm9tIHRleHQgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gRmVlbCBmcmVlIHRvIHJlLXJlZ2lzdGVyIGFueSB0aW1lIHRocm91Z2ggdGhlIHdlYnNpdGVcIixcbiAgICBEVVBMSUNBVEU6XG4gICAgICBcIllvdSd2ZSBhbHJlYWR5IGJlZW4gdmVyaWZpZWQgdG8gcmVjZWl2ZSB0ZXh0IG5vdGlmaWNhdGlvbnMgZnJvbSBLaG91cnkgT2ZmaWNlIEhvdXJzIVwiLFxuICAgIE9LOlxuICAgICAgJ1RoYW5rIHlvdSBmb3IgdmVyaWZ5aW5nIHlvdXIgbnVtYmVyIHdpdGggS2hvdXJ5IE9mZmljZSBIb3VycyEgWW91IGFyZSBub3cgc2lnbmVkIHVwIGZvciB0ZXh0IG5vdGlmaWNhdGlvbnMhJyxcbiAgfSxcbiAgcXVldWU6IHtcbiAgICBBTEVSVF9CVVRUT046XG4gICAgICBcIlRoZSBUQSBjb3VsZCd0IHJlYWNoIHlvdSwgcGxlYXNlIGhhdmUgTWljcm9zb2Z0IFRlYW1zIG9wZW4gYW5kIGNvbmZpcm0geW91IGFyZSBiYWNrIVwiLFxuICAgIFRISVJEX1BMQUNFOiBgWW91J3JlIDNyZCBpbiB0aGUgcXVldWUuIEJlIHJlYWR5IGZvciBhIFRBIHRvIGNhbGwgeW91IHNvb24hYCxcbiAgICBUQV9ISVRfSEVMUEVEOiAodGFOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICAgIGAke3RhTmFtZX0gaXMgY29taW5nIHRvIGhlbHAgeW91IWAsXG4gICAgUkVNT1ZFRDogYFlvdSd2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuIFBsZWFzZSByZXR1cm4gdG8gdGhlIGFwcCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gLFxuICB9LFxuICB0YToge1xuICAgIFNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFOlxuICAgICAgJ0Egc3R1ZGVudCBoYXMgam9pbmVkIHlvdXIgKHByZXZpb3VzbHkgZW1wdHkpIHF1ZXVlIScsXG4gIH0sXG59O1xuXG4vL1RPRE8gdGVzdCB0aGlzIHNlcnZpY2Ugb21nXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIGRlc2t0b3BQdWJsaWNLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlLFxuICApIHtcbiAgICB3ZWJQdXNoLnNldFZhcGlkRGV0YWlscyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0VNQUlMJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BSSVZBVEVLRVknKSxcbiAgICApO1xuICAgIHRoaXMuZGVza3RvcFB1YmxpY0tleSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wKFxuICAgIGluZm86IERlZXBQYXJ0aWFsPERlc2t0b3BOb3RpZk1vZGVsPixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICAgIC8vIGNyZWF0ZSBpZiBub3QgZXhpc3RcbiAgICBsZXQgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogaW5mby51c2VySWQsIGVuZHBvaW50OiBpbmZvLmVuZHBvaW50IH0sXG4gICAgfSk7XG4gICAgaWYgKCFkbikge1xuICAgICAgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5jcmVhdGUoaW5mbykuc2F2ZSgpO1xuICAgICAgYXdhaXQgZG4ucmVsb2FkKCk7XG4gICAgfVxuICAgIHJldHVybiBkbjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgdXNlcjogVXNlck1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZnVsbE51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXIpO1xuICAgIGlmICghZnVsbE51bWJlcikge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLm5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJQaG9uZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KTtcblxuICAgIGlmIChwaG9uZU5vdGlmTW9kZWwpIHtcbiAgICAgIC8vIFBob25lIG51bWJlciBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPT09IGZ1bGxOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBqdXN0IGNoYW5nZSBpdFxuICAgICAgICBwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPSBmdWxsTnVtYmVyO1xuICAgICAgICBwaG9uZU5vdGlmTW9kZWwudmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcGhvbmVOb3RpZk1vZGVsLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBmdWxsTnVtYmVyLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcblxuICAgICAgLy8gTVVUQVRFIHNvIGlmIHVzZXIuc2F2ZSgpIGlzIGNhbGxlZCBsYXRlciBpdCBkb2Vzbid0IGRpcy1hc3NvY2lhdGVcbiAgICAgIHVzZXIucGhvbmVOb3RpZiA9IHBob25lTm90aWZNb2RlbDtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm5vdGlmeVBob25lKFxuICAgICAgcGhvbmVOb3RpZk1vZGVsLFxuICAgICAgXCJZb3UndmUgc2lnbmVkIHVwIGZvciBwaG9uZSBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBUbyB2ZXJpZnkgeW91ciBudW1iZXIsIHBsZWFzZSByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIFlFUy4gVG8gdW5zdWJzY3JpYmUsIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggTk8gb3IgU1RPUFwiLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLy8gTm90aWZ5IHVzZXIgb24gYWxsIHBsYXRmb3Jtc1xuICBhc3luYyBub3RpZnlVc2VyKHVzZXJJZDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3RpZk1vZGVsc09mVXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2Rlc2t0b3BOb3RpZnMnLCAncGhvbmVOb3RpZiddLFxuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBwcm9taXNlcyBjb25jdXJyZW50bHlcbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzLm1hcChhc3luYyAobm0pID0+XG4gICAgICAgICAgdGhpcy5ub3RpZnlEZXNrdG9wKG5tLCBtZXNzYWdlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmICYmIG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWZzRW5hYmxlZCkge1xuICAgICAgdGhpcy5ub3RpZnlQaG9uZShub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuICBhc3luYyBub3RpZnlEZXNrdG9wKG5tOiBEZXNrdG9wTm90aWZNb2RlbCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdlYlB1c2guc2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBubS5lbmRwb2ludCxcbiAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICBwMjU2ZGg6IG5tLnAyNTZkaCxcbiAgICAgICAgICAgIGF1dGg6IG5tLmF1dGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShubSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBwaG9uZSBudW1iZXJcbiAgYXN5bmMgbm90aWZ5UGhvbmUoXG4gICAgcG46IFBob25lTm90aWZNb2RlbCxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZm9yY2U6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChmb3JjZSB8fCBwbi52ZXJpZmllZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLnNlbmRTTVMocG4ucGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncHJvYmxlbSBzZW5kaW5nIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5UGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwaG9uZU5vdGlmID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXBob25lTm90aWYpIHtcbiAgICAgIGFwbS5zZXRDdXN0b21Db250ZXh0KHsgcGhvbmVOdW1iZXIgfSk7XG4gICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHBob25lIG51bWJlciBkdXJpbmcgdmVyaWZpY2F0aW9uJyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5DT1VMRF9OT1RfRklORF9OVU1CRVI7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlICE9PSAnWUVTJyAmJiBtZXNzYWdlICE9PSAnTk8nICYmIG1lc3NhZ2UgIT09ICdTVE9QJykge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5XUk9OR19NRVNTQUdFO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PT0gJ05PJyB8fCBtZXNzYWdlID09PSAnU1RPUCcpIHtcbiAgICAgIC8vIGRpZCBzb21lIG1vcmUgZGlnZ2luZywgU1RPUCBqdXN0IHN0b3BzIG1lc3NhZ2VzIGNvbXBsZXRlbHksIHdlJ2xsIG5ldmVyIHJlY2VpdmUgaXRcbiAgICAgIC8vIHNvIHVoLi4uIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhhdFxuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZShwaG9uZU5vdGlmKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuVU5SRUdJU1RFUjtcbiAgICB9IGVsc2UgaWYgKHBob25lTm90aWYudmVyaWZpZWQpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuRFVQTElDQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHBob25lTm90aWYuc2F2ZSgpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5PSztcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYi1wdXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0d2lsaW8gU0RLIHRvIG1ha2UgdGVzdGluZyBlYXNpZXIuXG4gKiBTaG91bGQgTk9UIGludGVyYWN0IHdpdGggREIgbW9kZWxzIG9yIGRvIGFueXRoaW5nIHNtYXJ0LiBKdXN0IHdyYXAgVHdpbGlvLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvU2VydmljZSB7XG4gIHByaXZhdGUgdHdpbGlvQ2xpZW50OiB0d2lsaW8uVHdpbGlvO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudHdpbGlvQ2xpZW50ID0gdHdpbGlvKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQUNDT1VOVFNJRCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBwaG9uZSBudW1iZXIgb3IgcmV0dXJuIGZhbHNlIGlmIHBob25lIG51bWJlciBpc24ndCByZWFsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RnVsbFBob25lTnVtYmVyKFxuICAgIHBob25lTnVtYmVyOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nIHwgZmFsc2U+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5sb29rdXBzLnBob25lTnVtYmVycyhwaG9uZU51bWJlcikuZmV0Y2goKSlcbiAgICAgICAgLnBob25lTnVtYmVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlIHBob25lIG51bWJlciBpcyBub3QgZm91bmQsIHRoZW4gZW5kcG9pbnQgc2hvdWxkIHJldHVybiBpbnZhbGlkXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgU01TIHRvIHBob25lIG51bWJlciB1c2luZyBvdXIgVHdpbGlvIG51bWJlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9QSE9ORU5VTUJFUicpLFxuICAgICAgdG86IHBob25lTnVtYmVyLFxuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2lsaW9cIik7IiwiaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmQm9keSxcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIFR3aWxpb0JvZHksXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBIZWFkZXIsXG4gIEhlYWRlcnMsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ25vdGlmaWNhdGlvbnMnKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZXNrdG9wL2NyZWRlbnRpYWxzJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGdldERlc2t0b3BDcmVkZW50aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm5vdGlmU2VydmljZS5kZXNrdG9wUHVibGljS2V5KTtcbiAgfVxuXG4gIEBQb3N0KCdkZXNrdG9wL2RldmljZScpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyByZWdpc3RlckRlc2t0b3BVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogRGVza3RvcE5vdGlmQm9keSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmUGFydGlhbD4ge1xuICAgIGNvbnN0IGRldmljZSA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyRGVza3RvcCh7XG4gICAgICBlbmRwb2ludDogYm9keS5lbmRwb2ludCxcbiAgICAgIGV4cGlyYXRpb25UaW1lOiBib2R5LmV4cGlyYXRpb25UaW1lICYmIG5ldyBEYXRlKGJvZHkuZXhwaXJhdGlvblRpbWUpLFxuICAgICAgcDI1NmRoOiBib2R5LmtleXMucDI1NmRoLFxuICAgICAgYXV0aDogYm9keS5rZXlzLmF1dGgsXG4gICAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGRldmljZS5pZCxcbiAgICAgIGVuZHBvaW50OiBkZXZpY2UuZW5kcG9pbnQsXG4gICAgICBjcmVhdGVkQXQ6IGRldmljZS5jcmVhdGVkQXQsXG4gICAgICBuYW1lOiBkZXZpY2UubmFtZSxcbiAgICB9O1xuICB9XG5cbiAgQERlbGV0ZSgnZGVza3RvcC9kZXZpY2UvOmRldmljZUlkJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZURlc2t0b3BVc2VyKFxuICAgIEBQYXJhbSgnZGV2aWNlSWQnKSBkZXZpY2VJZDogbnVtYmVyLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kKHsgaWQ6IGRldmljZUlkLCB1c2VySWQgfSk7XG4gICAgaWYgKGRuLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShkbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYmhvb2sgZnJvbSB0d2lsaW9cbiAgQFBvc3QoJy9waG9uZS92ZXJpZnknKVxuICBASGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKVxuICBhc3luYyB2ZXJpZnlQaG9uZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBUd2lsaW9Cb2R5LFxuICAgIEBIZWFkZXJzKCd4LXR3aWxpby1zaWduYXR1cmUnKSB0d2lsaW9TaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYm9keS5Cb2R5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlbmRlck51bWJlciA9IGJvZHkuRnJvbTtcblxuICAgIGNvbnN0IHR3aWxpb0F1dGhUb2tlbiA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpO1xuXG4gICAgY29uc3QgaXNWYWxpZGF0ZWQgPSB0d2lsaW8udmFsaWRhdGVSZXF1ZXN0KFxuICAgICAgdHdpbGlvQXV0aFRva2VuLFxuICAgICAgdHdpbGlvU2lnbmF0dXJlLnRyaW0oKSxcbiAgICAgIGAke3RoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpfS9hcGkvdjEvbm90aWZpY2F0aW9ucy9waG9uZS92ZXJpZnlgLFxuICAgICAgYm9keSxcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMubm90aWZpY2F0aW9uQ29udHJvbGxlci5tZXNzYWdlTm90RnJvbVR3aWxpbyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZVRvVXNlciA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnZlcmlmeVBob25lKFxuICAgICAgc2VuZGVyTnVtYmVyLFxuICAgICAgbWVzc2FnZSxcbiAgICApO1xuICAgIGNvbnN0IE1lc3NhZ2luZ1Jlc3BvbnNlID0gdHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IE1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlVG9Vc2VyKTtcblxuICAgIHJldHVybiB0d2ltbC50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xvZ2luLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSnd0U3RyYXRlZ3kgfSBmcm9tICcuLi9sb2dpbi9qd3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSnd0TW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXG4gICAgICBpbmplY3Q6IFtDb25maWdTZXJ2aWNlXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGFzeW5jIChjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSA9PiAoe1xuICAgICAgICBzZWNyZXQ6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtMb2dpbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtKd3RTdHJhdGVneSwgTG9naW5Db3Vyc2VTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEVSUk9SX01FU1NBR0VTLFxuICBLaG91cnlEYXRhUGFyYW1zLFxuICBLaG91cnlSZWRpcmVjdFJlc3BvbnNlLFxuICBLaG91cnlTdHVkZW50Q291cnNlLFxuICBLaG91cnlUQUNvdXJzZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBQb3N0LFxuICBRdWVyeSxcbiAgUmVxLFxuICBSZXMsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgSnd0U2VydmljZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBodHRwU2lnbmF0dXJlIGZyb20gJ2h0dHAtc2lnbmF0dXJlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uLy4uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGxvZ2luQ291cnNlU2VydmljZTogTG9naW5Db3Vyc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgand0U2VydmljZTogSnd0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAUG9zdCgnL2tob3VyeV9sb2dpbicpXG4gIGFzeW5jIHJlY2lldmVEYXRhRnJvbUtob3VyeShcbiAgICBAUmVxKCkgcmVxOiBSZXF1ZXN0LFxuICAgIEBCb2R5KCkgYm9keTogS2hvdXJ5RGF0YVBhcmFtcyxcbiAgKTogUHJvbWlzZTxLaG91cnlSZWRpcmVjdFJlc3BvbnNlPiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIENoZWNrIHRoYXQgcmVxdWVzdCBoYXMgY29tZSBmcm9tIEtob3VyeVxuICAgICAgY29uc3QgcGFyc2VkUmVxdWVzdCA9IGh0dHBTaWduYXR1cmUucGFyc2VSZXF1ZXN0KHJlcSk7XG4gICAgICBjb25zdCB2ZXJpZnkgPSBodHRwU2lnbmF0dXJlLnZlcmlmeUhNQUMoXG4gICAgICAgIHBhcnNlZFJlcXVlc3QsXG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0tIT1VSWV9QUklWQVRFX0tFWScpLFxuICAgICAgKTtcbiAgICAgIGlmICghdmVyaWZ5KSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMubG9naW5Db250cm9sbGVyLnJlY2VpdmVEYXRhRnJvbUtob3VyeSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdXNlcjogVXNlck1vZGVsO1xuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogYm9keS5lbWFpbCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoeyBjb3Vyc2VzOiBbXSB9KTtcbiAgICB9XG5cbiAgICAvLyBROiBEbyB3ZSBuZWVkIHRoaXMgaWYgaXQncyBub3QgZ29pbmcgdG8gY2hhbmdlP1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHtcbiAgICAgIGVtYWlsOiBib2R5LmVtYWlsLFxuICAgICAgbmFtZTogYm9keS5maXJzdF9uYW1lICsgJyAnICsgYm9keS5sYXN0X25hbWUsXG4gICAgICBwaG90b1VSTDogJycsXG4gICAgfSk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgICAgICAgIGMuY291cnNlLFxuICAgICAgICAgIGMuc2VjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgY29uc3QgdXNlckNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2UuaWQsXG4gICAgICAgICAgICBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHVzZXJDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LnRhX2NvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlUQUNvdXJzZSkgPT4ge1xuICAgICAgICAvLyBRdWVyeSBmb3IgYWxsIHRoZSBjb3Vyc2VzIHdoaWNoIG1hdGNoIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmljIGNvdXJzZSBmcm9tIEtob3VyeVxuICAgICAgICBjb25zdCBjb3Vyc2VNYXBwaW5ncyA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZCh7XG4gICAgICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGMuY291cnNlIH0sIC8vIFRPRE86IEFkZCBzZW1lc3RlciBzdXBwb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgY291cnNlTWFwcGluZyBvZiBjb3Vyc2VNYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IHRhQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoXG4gICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgeyBleHBpcmVzSW46IDUgKiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7IHVzZXJJZCB9KTtcbiAgICBjb25zdCBpc1NlY3VyZSA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgLmdldDxzdHJpbmc+KCdET01BSU4nKVxuICAgICAgLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgcmVzXG4gICAgICAuY29va2llKCdhdXRoX3Rva2VuJywgYXV0aFRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGlzU2VjdXJlIH0pXG4gICAgICAucmVkaXJlY3QoMzAyLCAnLycpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgVXNlR3VhcmRzLCBQYXRjaCwgQm9keSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuICBEZXNrdG9wTm90aWZQYXJ0aWFsLFxuICBHZXRQcm9maWxlUmVzcG9uc2UsXG4gIFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgaWYgKFxuICAgICAgdXNlci5waG9uZU5vdGlmc0VuYWJsZWQgJiZcbiAgICAgIHVzZXJQYXRjaC5waG9uZU51bWJlciAhPT0gdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlclxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJQaG9uZSh1c2VyUGF0Y2gucGhvbmVOdW1iZXIsIHVzZXIpO1xuICAgIH1cbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIHJldHVybiB0aGlzLmdldCh1c2VyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sbGVyIH0gZnJvbSAnLi9xdWVzdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXN0aW9uU3Vic2NyaWJlciB9IGZyb20gJy4vcXVlc3Rpb24uc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXN0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1F1ZXN0aW9uU3Vic2NyaWJlcl0sXG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGUsIFF1ZXVlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSxcbiAgRVJST1JfTUVTU0FHRVMsXG4gIEdldFF1ZXN0aW9uUmVzcG9uc2UsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXNLZXlzLFxuICBSb2xlLFxuICBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlciwgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Sb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWVzdGlvbi1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdxdWVzdGlvbnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXN0aW9uUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXN0aW9uSWQnKVxuICBhc3luYyBnZXRRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8R2V0UXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFJvbGUuU1RVREVOVClcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxDcmVhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvblR5cGUsIHF1ZXVlSWQsIGZvcmNlIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmludmFsaWRRdWV1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFxdWV1ZS5hbGxvd1F1ZXN0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5ub05ld1F1ZXN0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLmNyZWF0ZVF1ZXN0aW9uLmNsb3NlZFF1ZXVlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1VzZXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBjcmVhdG9ySWQ6IHVzZXIuaWQsXG4gICAgICAgIHN0YXR1czogSW4oT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoISFwcmV2aW91c1VzZXJRdWVzdGlvbikge1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHByZXZpb3VzVXNlclF1ZXN0aW9uLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQ7XG4gICAgICAgIGF3YWl0IHByZXZpb3VzVXNlclF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uQ29udHJvbGxlci5jcmVhdGVRdWVzdGlvbi5vbmVRdWVzdGlvbkF0QVRpbWUsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7XG4gICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIHRleHQsXG4gICAgICBxdWVzdGlvblR5cGUsXG4gICAgICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzS2V5cy5EcmFmdGluZyxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlzT25saW5lOiB0cnVlLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXN0aW9uSWQnKVxuICBAUm9sZXMoUm9sZS5TVFVERU5ULCBSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgLy8gVE9ETzogVXNlIHF1ZXVlUm9sZSBkZWNvcmF0b3IsIGJ1dCB3ZSBuZWVkIHRvIGZpeCBpdHMgcGVyZm9ybWFuY2UgZmlyc3RcbiAgYXN5bmMgdXBkYXRlUXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3F1ZXVlJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ3JlYXRvciA9IHVzZXJJZCA9PT0gcXVlc3Rpb24uY3JlYXRvcklkO1xuXG4gICAgaWYgKGlzQ3JlYXRvcikge1xuICAgICAgLy8gRmFpbCBpZiBzdHVkZW50IHRyaWVzIGFuIGludmFsaWQgc3RhdHVzIGNoYW5nZVxuICAgICAgaWYgKGJvZHkuc3RhdHVzICYmICFxdWVzdGlvbi5jaGFuZ2VTdGF0dXMoYm9keS5zdGF0dXMsIFJvbGUuU1RVREVOVCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1N0dWRlbnQnLFxuICAgICAgICAgICAgcXVlc3Rpb24uc3RhdHVzLFxuICAgICAgICAgICAgYm9keS5zdGF0dXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGNyZWF0b3IsIGNoZWNrIGlmIHVzZXIgaXMgVEEvUFJPRiBvZiBjb3Vyc2Ugb2YgcXVlc3Rpb25cbiAgICBjb25zdCBpc1RhT3JQcm9mID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVlc3Rpb24ucXVldWUuY291cnNlSWQsXG4gICAgICAgICAgcm9sZTogSW4oW1JvbGUuVEEsIFJvbGUuUFJPRkVTU09SXSksXG4gICAgICAgIH0sXG4gICAgICB9KSkgPiAwO1xuXG4gICAgaWYgKGlzVGFPclByb2YpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggIT09IDEgfHwgT2JqZWN0LmtleXMoYm9keSlbMF0gIT09ICdzdGF0dXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLnRhT25seUVkaXRRdWVzdGlvblN0YXR1cyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFN0YXR1cyA9IHF1ZXN0aW9uLnN0YXR1cztcbiAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IGJvZHkuc3RhdHVzO1xuICAgICAgLy8gSWYgdGhlIHRhSGVscGVkIGlzIGFscmVhZHkgc2V0LCBtYWtlIHN1cmUgdGhlIHNhbWUgdGEgdXBkYXRlcyB0aGUgc3RhdHVzXG4gICAgICBpZiAocXVlc3Rpb24udGFIZWxwZWQ/LmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFIZWxwaW5nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgRVJST1JfTUVTU0FHRVMucXVlc3Rpb25Db250cm9sbGVyLnVwZGF0ZVF1ZXN0aW9uLm90aGVyVEFSZXNvbHZlZCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzQWxyZWFkeUhlbHBpbmdPbmUgPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5jb3VudCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHRhSGVscGVkSWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIHN0YXR1czogT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpID09PSAxO1xuICAgICAgaWYgKGlzQWxyZWFkeUhlbHBpbmdPbmUgJiYgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24udGFIZWxwaW5nT3RoZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkVHJhbnNpdGlvbiA9IHF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhuZXdTdGF0dXMsIFJvbGUuVEEpO1xuICAgICAgaWYgKCF2YWxpZFRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24uZnNtVmlvbGF0aW9uKFxuICAgICAgICAgICAgJ1RBJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uLnN0YXR1cyxcbiAgICAgICAgICAgIGJvZHkuc3RhdHVzLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBUQSBhcyB0YUhlbHBlZCB3aGVuIHRoZSBUQSBzdGFydHMgaGVscGluZyB0aGUgc3R1ZGVudFxuICAgICAgaWYgKFxuICAgICAgICBvbGRTdGF0dXMgIT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nICYmXG4gICAgICAgIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmdcbiAgICAgICkge1xuICAgICAgICBxdWVzdGlvbi50YUhlbHBlZCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHVzZXJJZCk7XG4gICAgICAgIHF1ZXN0aW9uLmhlbHBlZEF0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBTZXQgZmlyc3RIZWxwZWRBdCBpZiBpdCBoYXNuJ3QgYWxyZWFkeVxuICAgICAgICBpZiAoIXF1ZXN0aW9uLmZpcnN0SGVscGVkQXQpIHtcbiAgICAgICAgICBxdWVzdGlvbi5maXJzdEhlbHBlZEF0ID0gcXVlc3Rpb24uaGVscGVkQXQ7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy5xdWV1ZS5UQV9ISVRfSEVMUEVEKHF1ZXN0aW9uLnRhSGVscGVkLm5hbWUpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvbkNvbnRyb2xsZXIudXBkYXRlUXVlc3Rpb24ubG9naW5Vc2VyQ2FudEVkaXQsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBQb3N0KCc6cXVlc3Rpb25JZC9ub3RpZnknKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIG5vdGlmeShAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWUnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLkFMRVJUX0JVVFRPTixcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5SRU1PVkVELFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBsZXQgcXVldWVJZDtcblxuICAgIGlmIChyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKTtcbiAgICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICAgIEVSUk9SX01FU1NBR0VTLnF1ZXN0aW9uUm9sZUd1YXJkLnF1ZXN0aW9uTm90Rm91bmQsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWV1ZUlkID0gcXVlc3Rpb24ucXVldWVJZDtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuYm9keS5xdWV1ZUlkKSB7XG4gICAgICAvLyBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgbmV3IHF1ZXN0aW9uXG4gICAgICBxdWV1ZUlkID0gcmVxdWVzdC5ib2R5LnF1ZXVlSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZU9mUXVlc3Rpb25Ob3RGb3VuZCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCk7XG5cbiAgICAvLyBZb3UgY2Fubm90IGludGVyYWN0IHdpdGggYSBxdWVzdGlvbiBpbiBhIG5vbmV4aXN0ZW50IHF1ZXVlXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5xdWVzdGlvblJvbGVHdWFyZC5xdWV1ZURvZXNOb3RFeGlzdCxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIEluc2VydEV2ZW50LFxuICBSZW1vdmVFdmVudCxcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWVzdGlvbk1vZGVsPiB7XG4gIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuXG4gICAgLy8gU2VuZCBwdXNoIG5vdGlmaWNhdGlvbiB0byBzdHVkZW50cyB3aGVuIHRoZXkgYXJlIGhpdCAzcmQgaW4gbGluZVxuICAgIC8vIGlmIHN0YXR1cyB1cGRhdGVkIHRvIGNsb3NlZFxuICAgIGlmIChcbiAgICAgIGV2ZW50LnVwZGF0ZWRDb2x1bW5zLmZpbmQoKGMpID0+IGMucHJvcGVydHlOYW1lID09PSAnc3RhdHVzJykgJiZcbiAgICAgIGV2ZW50LmVudGl0eS5zdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXNcbiAgICApIHtcbiAgICAgIC8vIGdldCAzcmQgaW4gcXVldWUgYmVmb3JlIGFuZCBhZnRlciB0aGlzIHVwZGF0ZVxuICAgICAgY29uc3QgcHJldmlvdXNUaGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICAgKVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGNvbnN0IHRoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShldmVudC5lbnRpdHkucXVldWVJZClcbiAgICAgICAgLnNldFF1ZXJ5UnVubmVyKGV2ZW50LnF1ZXJ5UnVubmVyKSAvLyBSdW4gaW4gc2FtZSB0cmFuc2FjdGlvbiBhcyB0aGUgdXBkYXRlXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgaWYgKHRoaXJkICYmIHByZXZpb3VzVGhpcmQ/LmlkICE9PSB0aGlyZD8uaWQpIHtcbiAgICAgICAgY29uc3QgeyBjcmVhdG9ySWQgfSA9IHRoaXJkO1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKGNyZWF0b3JJZCwgTm90aWZNc2dzLnF1ZXVlLlRISVJEX1BMQUNFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJPZlF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICApLmdldENvdW50KCk7XG5cbiAgICBpZiAobnVtYmVyT2ZRdWVzdGlvbnMgPT09IDApIHtcbiAgICAgIGNvbnN0IHN0YWZmID0gKFxuICAgICAgICBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoZXZlbnQuZW50aXR5LnF1ZXVlSWQsIHtcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgICAgIH0pXG4gICAgICApLnN0YWZmTGlzdDtcblxuICAgICAgc3RhZmYuZm9yRWFjaCgoc3RhZmYpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBzdGFmZi5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MudGEuU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICB9XG5cbiAgYXN5bmMgYmVmb3JlUmVtb3ZlKGV2ZW50OiBSZW1vdmVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGR1ZSB0byBjYXNjYWRlcyBlbnRpdHkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgbG9hZGVkXG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU2VlZENvbnRyb2xsZXIgfSBmcm9tICcuL3NlZWQuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbU2VlZENvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtTZWVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZWRNb2R1bGUge31cbiIsImltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZSwgQ3JlYXRlUXVlc3Rpb25QYXJhbXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBPZmZpY2VIb3VyRmFjdG9yeSxcbiAgUXVlc3Rpb25GYWN0b3J5LFxuICBRdWV1ZUZhY3RvcnksXG4gIFVzZXJDb3Vyc2VGYWN0b3J5LFxuICBTZW1lc3RlckZhY3RvcnksXG4gIENvdXJzZUZhY3RvcnksXG4gIFVzZXJGYWN0b3J5LFxufSBmcm9tICcuLi8uLi90ZXN0L3V0aWwvZmFjdG9yaWVzJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3NlZWRzJylcbkBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuZXhwb3J0IGNsYXNzIFNlZWRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgc2VlZFNlcnZpY2U6IFNlZWRTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVsZXRlJylcbiAgYXN5bmMgZGVsZXRlQWxsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoT2ZmaWNlSG91ck1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWVzdGlvbk1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWV1ZU1vZGVsKTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgcmVzZXQnO1xuICB9XG5cbiAgQEdldCgnY3JlYXRlJylcbiAgYXN5bmMgY3JlYXRlU2VlZHMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBGaXJzdCBkZWxldGUgdGhlIG9sZCBkYXRhXG4gICAgYXdhaXQgdGhpcy5kZWxldGVBbGwoKTtcblxuICAgIC8vIFRoZW4gYWRkIHRoZSBuZXcgc2VlZCBkYXRhXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuXG4gICAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRvbW9ycm93LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMTkpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgLSA0NTAwMDAwKSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAxMDAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1llc3RlcmRheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHllc3RlcmRheSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHllc3RlcmRheS52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvbW9ycm93ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogdG9tb3Jyb3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh0b21vcnJvdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUV4aXN0cyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFjb3Vyc2VFeGlzdHMpIHtcbiAgICAgIGF3YWl0IFNlbWVzdGVyRmFjdG9yeS5jcmVhdGUoeyBzZWFzb246ICdGYWxsJywgeWVhcjogMjAyMCB9KTtcbiAgICAgIGF3YWl0IENvdXJzZUZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICAgIHJlbGF0aW9uczogWydvZmZpY2VIb3VycyddLFxuICAgIH0pO1xuXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gW1xuICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgIF07XG4gICAgY291cnNlLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJFeHNpc3RzID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKTtcbiAgICBpZiAoIXVzZXJFeHNpc3RzKSB7XG4gICAgICAvLyBTdHVkZW50IDFcbiAgICAgIGNvbnN0IHVzZXIxID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdsaXUuc3RhQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnU3RhbmxleSBMaXUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVIyMENHMzZFLWNmMGYzNzUyNTJiZC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMSxcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gU3R1bmRlbnQgMlxuICAgICAgY29uc3QgdXNlcjIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3Rha2F5YW1hLmFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdBbGV4IFRha2F5YW1hJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVKTDk3NDQzRC01MDEyMTMzOTY4NmItNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjIsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDFcbiAgICAgIGNvbnN0IHVzZXIzID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdzdGVuemVsLndAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdXaWxsIFN0ZW56ZWwnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVJGMjU2S1JULWQxMDA5OGU4NzlkYS01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMyxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDJcbiAgICAgIGNvbnN0IHVzZXI0ID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdjaHUuZGFqQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnRGEtSmluIENodScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VRTU2WTVVVDEtODVkYjU5YTQ3NGY0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI0LFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICByb29tOiAnV0hWIDEwMScsXG4gICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIG9mZmljZUhvdXJzOiBbXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICAgIF0sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAyNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQEdldCgnZmlsbF9xdWV1ZScpXG4gIGFzeW5jIGZpbGxRdWV1ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKCk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVVc2VyJylcbiAgYXN5bmMgY3JlYXRlVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IHsgcm9sZTogUm9sZTsgY291cnNlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB0YTogVXNlckNvdXJzZU1vZGVsO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUsIGNvdXJzZTogY291cnNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXVlJylcbiAgYXN5bmMgY3JlYXRlUXVldWUoXG4gICAgQEJvZHkoKSBib2R5OiB7IGNvdXJzZUlkOiBudW1iZXI7IGFsbG93UXVlc3Rpb25zOiBib29sZWFuIH0sXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvZHkuYWxsb3dRdWVzdGlvbnMgPz8gZmFsc2UsXG4gICAgfTtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIG9wdGlvbnNbJ2NvdXJzZSddID0gY291cnNlO1xuICAgIH1cbiAgICBjb25zdCBxdWV1ZTogUXVldWVNb2RlbCA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXN0aW9uJylcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIHF1ZXVlSWQ6IG51bWJlcjtcbiAgICAgIHN0dWRlbnRJZDogbnVtYmVyO1xuICAgICAgZGF0YTogQ3JlYXRlUXVlc3Rpb25QYXJhbXM7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWVzdGlvbk1vZGVsPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmIChib2R5LnF1ZXVlSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkucXVldWVJZCk7XG4gICAgICBvcHRpb25zWydxdWV1ZSddID0gcXVldWU7XG4gICAgfVxuICAgIGlmIChib2R5LnN0dWRlbnRJZCkge1xuICAgICAgY29uc3Qgc3R1ZGVudCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuc3R1ZGVudElkKTtcbiAgICAgIG9wdGlvbnNbJ2NyZWF0b3InXSA9IHN0dWRlbnQ7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbk1vZGVsID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgLi4uYm9keS5kYXRhLFxuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsICdPbmxpbmUnKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdhbGxvd1F1ZXN0aW9ucycsIGZhbHNlKVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuLy8gV0FSTklORzogRE8gTk9UIFVTRSBDUkVBVE9SSUQuIEFTIFlPVSBTRUUgSEVSRSwgV0UgT05MWSBBQ0NFUFQgQ1JFQVRPUlxuLy9UT0RPOiBtYWtlIGl0IGFjY2VwdCBjcmVhdG9ySWQgYXMgd2VsbFxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXN0aW9uTW9kZWwpXG4gIC5zZXF1ZW5jZSgndGV4dCcsIChpKSA9PiBgcXVlc3Rpb24gJHtpfWApXG4gIC5hdHRyKCdzdGF0dXMnLCAnUXVldWVkJylcbiAgLmF0dHIoJ3F1ZXN0aW9uVHlwZScsIFF1ZXN0aW9uVHlwZS5PdGhlcilcbiAgLmF0dHIoJ2NyZWF0ZWRBdCcsIG5ldyBEYXRlKCkpXG4gIC5hc3NvY09uZSgncXVldWUnLCBRdWV1ZUZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY3JlYXRvcicsIFVzZXJGYWN0b3J5KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm0tZmFjdG9yeVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VlZFNlcnZpY2Uge1xuICBhc3luYyBkZWxldGVBbGwobW9kZWw6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGdldENvbm5lY3Rpb24oKS5jcmVhdGVRdWVyeUJ1aWxkZXIoKS5kZWxldGUoKS5mcm9tKG1vZGVsKS5leGVjdXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEFkbWluQ29yZU1vZHVsZUZhY3RvcnksXG4gIEFkbWluQXV0aE1vZHVsZUZhY3RvcnksXG4gIERlZmF1bHRBZG1pblNpdGUsXG59IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgfSBmcm9tICcuL2NyZWRlbnRpYWxWYWxpZGF0b3InO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ291cnNlQWRtaW4sXG4gIFF1ZXVlQWRtaW4sXG4gIFVzZXJBZG1pbixcbiAgVXNlckNvdXJzZUFkbWluLFxuICBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluLFxufSBmcm9tICcuL2FkbWluLWVudGl0aWVzJztcbmltcG9ydCB7IEFkbWluQ29tbWFuZCB9IGZyb20gJy4vYWRtaW4uY29tbWFuZCc7XG5cbmNvbnN0IENvcmVNb2R1bGUgPSBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQ29yZU1vZHVsZSh7fSk7XG5jb25zdCBBdXRoTW9kdWxlID0gQWRtaW5BdXRoTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkF1dGhNb2R1bGUoe1xuICBhZG1pbkNvcmVNb2R1bGU6IENvcmVNb2R1bGUsXG4gIGNyZWRlbnRpYWxWYWxpZGF0b3I6IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciwgLy8gaG93IGRvIHlvdSB2YWxpZGF0ZSBjcmVkZW50aWFsc1xuICBpbXBvcnRzOiBbVHlwZU9ybU1vZHVsZS5mb3JGZWF0dXJlKFtBZG1pblVzZXJNb2RlbF0pXSwgLy8gd2hhdCBtb2R1bGVzIGV4cG9ydCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZSBjcmVkZW50aWFsVmFsaWRhdG9yIGF2YWlsYWJsZVxuICBwcm92aWRlcnM6IFtdLFxufSk7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQWRtaW5Db21tYW5kXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFkbWluU2l0ZTogRGVmYXVsdEFkbWluU2l0ZSkge1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlJywgQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlcicsIFVzZXJBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyQ291cnNlJywgVXNlckNvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1F1ZXVlJywgUXVldWVBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2VTZWN0aW9uTWFwcGluZycsIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtYWRtaW5cIik7IiwiaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICdiY3J5cHQnO1xuXG5leHBvcnQgY29uc3QgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yID0ge1xuICBpbmplY3Q6IFtdLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ3JlZGVudGlhbHMoXG4gICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPEFkbWluVXNlck1vZGVsPiB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgaWYgKGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKSkge1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9LFxufTtcbiIsImltcG9ydCB7IEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiwgQmFzZUVudGl0eSwgQ29sdW1uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdCc7XG5cbi8qKlxuICogQWRtaW4gdXNlcnMgYXJlIHRvdGFsbHkgc2VwYXJhdGUgZnJvbSByZWd1bGFyIHVzZXJzIGFuZCBjYW4gb25seSBiZSBjcmVhdGVkIGZyb20gY29tbWFuZCBsaW5lLlxuICogYHlhcm4gY2xpIGFkbWluOmNyZWF0ZWBcbiAqL1xuQEVudGl0eSgnYWRtaW5fdXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQWRtaW5Vc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIHNldFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBhc3N3b3JkSGFzaCA9IGhhc2hTeW5jKHBhc3N3b3JkLCA1KTtcbiAgfVxuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgdW5pcXVlOiB0cnVlLCBudWxsYWJsZTogZmFsc2UgfSlcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIG51bGxhYmxlOiBmYWxzZSB9KVxuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJpbXBvcnQgeyBBZG1pbkVudGl0eSB9IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnbmFtZSddO1xufVxuXG5leHBvcnQgY2xhc3MgUXVldWVBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gUXVldWVNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3Jvb20nLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlck1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZW1haWwnLCAnbmFtZSddO1xuICBzZWFyY2hGaWVsZHMgPSBbJ2VtYWlsJywgJ25hbWUnXTtcbiAgZmllbGRzID0gW1xuICAgICdpZCcsXG4gICAgJ2VtYWlsJyxcbiAgICAnbmFtZScsXG4gICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICAncXVldWVzJyxcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlckNvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAndXNlcklkJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZ2VuZXJpY0NvdXJzZU5hbWUnLCAnc2VjdGlvbicsICdjb3Vyc2VJZCddO1xufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCwgUG9zaXRpb25hbCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcXVlc3Rpb24sIGtleUluWU4gfSBmcm9tICdyZWFkbGluZS1zeW5jJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkbWluQ29tbWFuZCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnY3JlYXRlOmFkbWluIDx1c2VybmFtZT4nLFxuICAgIGRlc2NyaWJlOiAnY3JlYXRlIGFuIGFkbWluIHVzZXInLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoXG4gICAgQFBvc2l0aW9uYWwoe1xuICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcbiAgICAgIGRlc2NyaWJlOiAndGhlIGFkbWluIHVzZXJuYW1lJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0pXG4gICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IGNoYW5nZVBhc3N3b3JkID0ga2V5SW5ZTihcbiAgICAgICAgYFVzZXIgJHt1c2VybmFtZX0gYWxyZWFkeSBleGlzdHMuIERvIHlvdSB3YW50IHRvIGNoYW5nZSB0aGVpciBwYXNzd29yZD9gLFxuICAgICAgKTtcbiAgICAgIGlmICghY2hhbmdlUGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyID0gQWRtaW5Vc2VyTW9kZWwuY3JlYXRlKHsgdXNlcm5hbWUgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBhc3N3b3JkOiBzdHJpbmcgPSBxdWVzdGlvbignUGFzc3dvcmQ6ICcsIHtcbiAgICAgIGhpZGVFY2hvQmFjazogdHJ1ZSxcbiAgICB9KTtcbiAgICB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgQ3JlYXRlZCB1c2VyOiAke3VzZXIudXNlcm5hbWV9YCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWRsaW5lLXN5bmNcIik7IiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL2V2ZW50LW1vZGVsLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICAgIEV2ZW50TW9kZWwsXG4gIF0sXG4gIGtlZXBDb25uZWN0aW9uQWxpdmU6IHRydWUsXG4gIGxvZ2dpbmc6ICEhcHJvY2Vzcy5lbnYuVFlQRU9STV9MT0dHSU5HLFxuICAuLi4oISFwcm9jZXNzLmVudi5UWVBFT1JNX0NMSSA/IGluQ0xJIDoge30pLFxufTtcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9ybTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCYWNrZmlsbFBob25lTm90aWZzIH0gZnJvbSAnLi9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB9IGZyb20gJy4vcXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0LmNvbW1hbmQnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0JhY2tmaWxsUGhvbmVOb3RpZnMsIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0XSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICdub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKChkKSA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKChkKSA9PiBkLmlkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnNUb0Rpc2FibGUgPSAoXG4gICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZCh7XG4gICAgICAgIHdoZXJlOiB7IHBob25lTm90aWZzRW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICByZWxhdGlvbnM6IFsncGhvbmVOb3RpZiddLFxuICAgICAgfSlcbiAgICApLmZpbHRlcigodSkgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCgodSkgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0JyxcbiAgICBkZXNjcmliZTogJ2NvcHkgYWxsIGV4aXN0aW5nIGhlbHBlZEF0IHRvIGZpcnN0SGVscGVkQXQnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjb3B5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgIC51cGRhdGUoKVxuICAgICAgLnNldCh7IGZpcnN0SGVscGVkQXQ6ICgpID0+ICdcImhlbHBlZEF0XCInIH0pXG4gICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgLmNhbGxMaXN0ZW5lcnMoZmFsc2UpXG4gICAgICAuZXhlY3V0ZSgpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFVwZGF0ZWQgJHthd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgICAuZ2V0Q291bnQoKX0gcmVjb3Jkc2AsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlLCBIdHRwTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB9IGZyb20gJy4vcmVsZWFzZS1ub3Rlcy5jb250cm9sbGVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUmVsZWFzZU5vdGVzQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwTW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgdXNlRmFjdG9yeTogKCkgPT4gKHtcbiAgICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgICAgbWF4UmVkaXJlY3RzOiA1LFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMsIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBIdHRwU2VydmljZSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICdsb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBDb250cm9sbGVyKCdyZWxlYXNlX25vdGVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0UmVsZWFzZU5vdGVzKCk6IFByb21pc2U8R2V0UmVsZWFzZU5vdGVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZTogR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgPSB7XG4gICAgICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudWxsLFxuICAgICAgcmVsZWFzZU5vdGVzOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5nZXQoXG4gICAgICAgICdodHRwczovL25vdGlvbi1hcGkuc3BsaXRiZWUuaW8vdjEvcGFnZS9hYmJhMjQ2YmZhMDg0N2JhYTI3MDZhYjMwZDBjNmM3ZCcsXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gICAgY29uc3QgZGF0YSA9IHJlcXVlc3QuZGF0YTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZVRleHQgPVxuICAgICAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXT8udmFsdWU/LnByb3BlcnRpZXNcbiAgICAgICAgICA/LnRpdGxlWzBdWzBdO1xuICAgICAgcmVzcG9uc2UubGFzdFVwZGF0ZWRVbml4VGltZSA9IHRpbWVUZXh0LnNwbGl0KCdVbml4ICcpWzFdICogMTAwMDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbihcbiAgICAgICAgRVJST1JfTUVTU0FHRVMucmVsZWFzZU5vdGVzQ29udHJvbGxlci5yZWxlYXNlTm90ZXNUaW1lKGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSB0aW1lIGJsb2NrIGFuZCBwYWdlIGxpbmsgYmxvY2sgZnJvbSBwYWdlXG4gICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10udmFsdWUucHJvcGVydGllcy50aXRsZSA9IFtdO1xuICAgIGRhdGFbJzRkMjVmMzkzLWU1NzAtNGNkNS1hZDY2LWIyNzhhMDkyNDIyNSddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICByZXNwb25zZS5yZWxlYXNlTm90ZXMgPSBkYXRhO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgQXJndW1lbnRNZXRhZGF0YSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuLyoqXG4gKiBTdHJpcCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIGJvZHkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHJpcFVuZGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIG1ldGFkYXRhOiBBcmd1bWVudE1ldGFkYXRhKTogYW55IHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ2JvZHknKSB7XG4gICAgICB0aGlzLmRyb3BVbmRlZmluZWQodmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmRlZmluZWQob2JqOiB1bmtub3duKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOZXN0SW50ZXJjZXB0b3IsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIENhbGxIYW5kbGVyLFxuICBIdHRwRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICBuZXh0OiBDYWxsSGFuZGxlcixcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXhjZXB0aW9uKSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=