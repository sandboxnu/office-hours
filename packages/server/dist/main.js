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
const stripUndefined_pipe_1 = __webpack_require__(97);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(98);
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
const notification_module_1 = __webpack_require__(56);
const login_module_1 = __webpack_require__(63);
const profile_module_1 = __webpack_require__(72);
const question_module_1 = __webpack_require__(74);
const queue_module_1 = __webpack_require__(42);
const seed_module_1 = __webpack_require__(78);
const admin_module_1 = __webpack_require__(83);
const nestjs_command_1 = __webpack_require__(49);
const sse_module_1 = __webpack_require__(46);
const typeormConfig = __webpack_require__(91);
const backfill_module_1 = __webpack_require__(93);
const release_notes_module_1 = __webpack_require__(95);
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
const queue_module_1 = __webpack_require__(42);
const ical_command_1 = __webpack_require__(48);
const ical_service_1 = __webpack_require__(50);
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
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_decorator_1 = __webpack_require__(22);
const user_decorator_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(24);
const queue_clean_service_1 = __webpack_require__(34);
const queue_entity_1 = __webpack_require__(27);
const course_roles_guard_1 = __webpack_require__(35);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const queue_sse_service_1 = __webpack_require__(37);
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
        setTimeout(async () => {
            await this.queueCleanService.cleanQueue(queue.id);
            await this.queueSSEService.updateQueue(queue.id);
        });
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
exports.SSEQueueResponse = exports.UpdateQueueParams = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.StatusSentToCreator = exports.StatusInPriorityQueue = exports.StatusInQueue = exports.ClosedQuestionStatus = exports.LimboQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.isProd = exports.PROD_URL = void 0;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(21);
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
};
JwtAuthGuard = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = __webpack_require__(5);
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.User = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
exports.User = common_1.createParamDecorator(async (relations, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return await user_entity_1.UserModel.findOne(request.user.userId, { relations });
});
exports.UserId = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return Number(request.user.userId);
});


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
exports.UserModel = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(19);
const desktop_notif_entity_1 = __webpack_require__(25);
const phone_notif_entity_1 = __webpack_require__(26);
const queue_entity_1 = __webpack_require__(27);
const user_course_entity_1 = __webpack_require__(30);
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
UserModel = __decorate([
    typeorm_1.Entity('user_model')
], UserModel);
exports.UserModel = UserModel;


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
exports.DesktopNotifModel = void 0;
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
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
exports.PhoneNotifModel = void 0;
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
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
exports.QueueModel = void 0;
const common_1 = __webpack_require__(14);
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(19);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const user_entity_1 = __webpack_require__(24);
const question_entity_1 = __webpack_require__(32);
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
        this.queueSize = await question_entity_1.QuestionModel.openInQueue(this.id)
            .andWhere('question.status IN (:...openStatus)', {
            openStatus: [common_1.OpenQuestionStatus.Drafting, common_1.OpenQuestionStatus.Queued],
        })
            .getCount();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const typeorm_1 = __webpack_require__(19);
const office_hour_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(27);
const user_course_entity_1 = __webpack_require__(30);
const semester_entity_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(15);
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
CourseModel = __decorate([
    typeorm_1.Entity('course_model')
], CourseModel);
exports.CourseModel = CourseModel;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const course_entity_1 = __webpack_require__(28);
const class_transformer_1 = __webpack_require__(15);
const queue_entity_1 = __webpack_require__(27);
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
exports.UserCourseModel = void 0;
const typeorm_1 = __webpack_require__(19);
const course_entity_1 = __webpack_require__(28);
const common_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(24);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const course_entity_1 = __webpack_require__(28);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.QuestionModel = void 0;
const common_1 = __webpack_require__(14);
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
const queue_entity_1 = __webpack_require__(27);
const question_fsm_1 = __webpack_require__(33);
let QuestionModel = class QuestionModel extends typeorm_1.BaseEntity {
    changeStatus(newStatus, role) {
        if (question_fsm_1.canChangeQuestionStatus(this.status, newStatus, role)) {
            this.status = newStatus;
            return true;
        }
        else {
            return false;
        }
    }
    static openInQueue(queueId) {
        return this.createQueryBuilder('question')
            .where('question.queueId = :queueId', { queueId })
            .andWhere('question.status IN (:...statuses)', {
            statuses: Object.values(common_1.OpenQuestionStatus),
        })
            .orderBy('question.createdAt', 'ASC');
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
QuestionModel = __decorate([
    typeorm_1.Entity('question_model')
], QuestionModel);
exports.QuestionModel = QuestionModel;


/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const typeorm_1 = __webpack_require__(19);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
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
        const questions = await question_entity_1.QuestionModel.openInQueue(queueId).getMany();
        const openQuestions = questions.filter((q) => q.status in common_1.OpenQuestionStatus);
        openQuestions.forEach((q) => {
            q.status = common_1.ClosedQuestionStatus.Stale;
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
/* 35 */
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
const user_entity_1 = __webpack_require__(24);
const role_guard_1 = __webpack_require__(36);
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(5);
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
            throw new common_1.UnauthorizedException('Must be logged in');
        }
        if (!courseId) {
            throw new common_1.NotFoundException('No courseid found');
        }
        return this.matchRoles(roles, user, courseId);
    }
    matchRoles(roles, user, courseId) {
        const userCourse = user.courses.find((course) => {
            return Number(course.courseId) === Number(courseId);
        });
        if (!userCourse) {
            throw new common_1.NotFoundException('Not In This Course');
        }
        const remaining = roles.filter((role) => {
            return userCourse.role.toString() === role;
        });
        if (remaining.length <= 0) {
            throw new common_1.UnauthorizedException(`You must have one of roles [${roles.join(', ')}] to access this course`);
        }
        return remaining.length > 0;
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;


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
const queue_service_1 = __webpack_require__(41);
const idToRoom = (queueId) => `q-${queueId}`;
let QueueSSEService = class QueueSSEService {
    constructor(queueService, sseService) {
        this.queueService = queueService;
        this.sseService = sseService;
        this.updateQuestions = this.throttleUpdate(async (queueId) => {
            const questions = await this.queueService.getQuestions(queueId);
            if (questions) {
                this.sendToRoom(queueId, async ({ role, userId }) => ({
                    questions: await this.queueService.personalizeQuestions(questions, userId, role),
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEService = void 0;
const common_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(15);
const apm = __webpack_require__(40);
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
/* 40 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const lodash_1 = __webpack_require__(38);
const question_entity_1 = __webpack_require__(32);
const typeorm_1 = __webpack_require__(19);
const queue_entity_1 = __webpack_require__(27);
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
        const questionsFromDb = await question_entity_1.QuestionModel.find({
            relations: ['creator', 'taHelped'],
            where: {
                queueId,
                status: typeorm_1.In([
                    ...common_1.StatusInPriorityQueue,
                    ...common_1.StatusInQueue,
                    common_1.OpenQuestionStatus.Helping,
                ]),
            },
        });
        const questions = new common_1.ListQuestionsResponse();
        questions.queue = questionsFromDb.filter((question) => common_1.StatusInQueue.includes(question.status));
        questions.questionsGettingHelp = questionsFromDb.filter((question) => question.status === common_1.OpenQuestionStatus.Helping);
        questions.priorityQueue = questionsFromDb.filter((question) => common_1.StatusInPriorityQueue.includes(question.status));
        return questions;
    }
    async personalizeQuestions(questions, userId, role) {
        if (role === common_1.Role.STUDENT) {
            const newLQR = new common_1.ListQuestionsResponse();
            Object.assign(newLQR, questions);
            newLQR.queue = questions.queue.map((question) => {
                const creator = question.creator.id === userId
                    ? question.creator
                    : lodash_1.pick(question.creator, ['id']);
                return question_entity_1.QuestionModel.create(Object.assign(Object.assign({}, question), { creator }));
            });
            newLQR.yourQuestion = await question_entity_1.QuestionModel.findOne({
                relations: ['creator', 'taHelped'],
                where: {
                    creatorId: userId,
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
/* 42 */
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
const queue_controller_1 = __webpack_require__(43);
const queue_clean_service_1 = __webpack_require__(34);
const sse_module_1 = __webpack_require__(46);
const queue_service_1 = __webpack_require__(41);
const queue_sse_service_1 = __webpack_require__(37);
const queue_subscriber_1 = __webpack_require__(47);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const user_decorator_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_decorator_1 = __webpack_require__(22);
const queue_role_decorator_1 = __webpack_require__(44);
const queue_role_guard_1 = __webpack_require__(45);
const queue_sse_service_1 = __webpack_require__(37);
const queue_service_1 = __webpack_require__(41);
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
        return await this.queueService.personalizeQuestions(questions, userId, role);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRole = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
const queue_entity_1 = __webpack_require__(27);
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
/* 45 */
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
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
const role_guard_1 = __webpack_require__(36);
const queue_entity_1 = __webpack_require__(27);
let QueueRolesGuard = class QueueRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        const queue = await queue_entity_1.QueueModel.findOne(request.params.queueId);
        if (!queue) {
            throw new common_1.NotFoundException('Queue not found');
        }
        const courseId = queue.courseId;
        const user = await user_entity_1.UserModel.findOne(request.user.userId, {
            relations: ['courses'],
        });
        return { courseId, user };
    }
};
QueueRolesGuard = __decorate([
    common_1.Injectable()
], QueueRolesGuard);
exports.QueueRolesGuard = QueueRolesGuard;


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
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(37);
const typeorm_1 = __webpack_require__(19);
const queue_entity_1 = __webpack_require__(27);
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
exports.ICalCommand = void 0;
const nestjs_command_1 = __webpack_require__(49);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(50);
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
/* 49 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

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
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(51);
const typeorm_1 = __webpack_require__(19);
const office_hour_entity_1 = __webpack_require__(29);
const course_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(27);
const dist_1 = __webpack_require__(52);
__webpack_require__(53);
const moment = __webpack_require__(54);
const rrule_1 = __webpack_require__(55);
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
/* 51 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("rrule");

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
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(5);
const desktop_notif_subscriber_1 = __webpack_require__(57);
const notification_controller_1 = __webpack_require__(62);
const notification_service_1 = __webpack_require__(58);
const twilio_service_1 = __webpack_require__(60);
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
exports.DesktopNotifSubscriber = void 0;
const typeorm_1 = __webpack_require__(19);
const desktop_notif_entity_1 = __webpack_require__(25);
const notification_service_1 = __webpack_require__(58);
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
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const webPush = __webpack_require__(59);
const user_entity_1 = __webpack_require__(24);
const desktop_notif_entity_1 = __webpack_require__(25);
const phone_notif_entity_1 = __webpack_require__(26);
const twilio_service_1 = __webpack_require__(60);
const apm = __webpack_require__(40);
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
            throw new common_1.BadRequestException('phone number invalid');
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
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        twilio_service_1.TwilioService])
], NotificationService);
exports.NotificationService = NotificationService;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("web-push");

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
exports.TwilioService = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(61);
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
/* 61 */
/***/ (function(module, exports) {

module.exports = require("twilio");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(61);
const jwt_auth_guard_1 = __webpack_require__(20);
const notification_service_1 = __webpack_require__(58);
const user_decorator_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(25);
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
            throw new common_1.NotFoundException();
        }
    }
    async verifyPhoneUser(body, twilioSignature) {
        const message = body.Body.trim().toUpperCase();
        const senderNumber = body.From;
        const twilioAuthToken = this.configService.get('TWILIOAUTHTOKEN');
        const isValidated = twilio.validateRequest(twilioAuthToken, twilioSignature.trim(), `${this.configService.get('DOMAIN')}/api/v1/notifications/phone/verify`, body);
        if (!isValidated) {
            throw new common_1.UnauthorizedException('Message not from Twilio');
        }
        const messageToUser = await this.notifService.verifyPhone(senderNumber, message);
        const MessagingResponse = twilio.twiml.MessagingResponse;
        const twiml = new MessagingResponse();
        twiml.message(messageToUser);
        return twiml.toString();
    }
};
__decorate([
    common_1.Get('desktop/credentials'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], NotificationController.prototype, "getDesktopCredentials", null);
__decorate([
    common_1.Post('desktop/device'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "registerDesktopUser", null);
__decorate([
    common_1.Delete('desktop/device/:deviceId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('deviceId')),
    __param(1, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteDesktopUser", null);
__decorate([
    common_1.Post('/phone/verify'),
    common_1.Header('Content-Type', 'text/xml'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('x-twilio-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "verifyPhoneUser", null);
NotificationController = __decorate([
    common_1.Controller('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        config_1.ConfigService])
], NotificationController);
exports.NotificationController = NotificationController;


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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = __webpack_require__(5);
const login_controller_1 = __webpack_require__(64);
const jwt_strategy_1 = __webpack_require__(70);
const jwt_1 = __webpack_require__(65);
const config_1 = __webpack_require__(9);
const login_course_service_1 = __webpack_require__(69);
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
exports.LoginController = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(65);
const common_2 = __webpack_require__(14);
const httpSignature = __webpack_require__(66);
const typeorm_1 = __webpack_require__(19);
const non_production_guard_1 = __webpack_require__(67);
const user_entity_1 = __webpack_require__(24);
const course_section_mapping_entity_1 = __webpack_require__(68);
const login_course_service_1 = __webpack_require__(69);
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
                throw new common_1.UnauthorizedException('Invalid request signature');
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
                const userCourse = await this.loginCourseService.courseToUserCourse(user.id, course.id, common_2.Role.STUDENT);
                userCourses.push(userCourse);
            }
        }));
        await Promise.all(body.ta_courses.map(async (c) => {
            const courseMappings = await course_section_mapping_entity_1.CourseSectionMappingModel.find({
                where: { genericCourseName: c.course },
            });
            for (const courseMapping of courseMappings) {
                const taCourse = await this.loginCourseService.courseToUserCourse(user.id, courseMapping.courseId, common_2.Role.TA);
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
            throw new common_1.UnauthorizedException();
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
    common_1.Post('/khoury_login'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_2.KhouryDataParams]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "recieveDataFromKhoury", null);
__decorate([
    common_1.Get('/login/entry'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "enterFromKhoury", null);
__decorate([
    common_1.Get('/login/dev'),
    common_1.UseGuards(non_production_guard_1.NonProductionGuard),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "enterFromDev", null);
LoginController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        login_course_service_1.LoginCourseService,
        jwt_1.JwtService,
        config_1.ConfigService])
], LoginController);
exports.LoginController = LoginController;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const course_entity_1 = __webpack_require__(28);
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
exports.LoginCourseService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(68);
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
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(71);
const passport_1 = __webpack_require__(21);
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
/* 71 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_controller_1 = __webpack_require__(73);
const notification_module_1 = __webpack_require__(56);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
const lodash_1 = __webpack_require__(38);
const common_2 = __webpack_require__(14);
const jwt_auth_guard_1 = __webpack_require__(20);
const user_decorator_1 = __webpack_require__(23);
const notification_service_1 = __webpack_require__(58);
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
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(56);
const question_controller_1 = __webpack_require__(75);
const question_subscriber_1 = __webpack_require__(77);
const queue_module_1 = __webpack_require__(42);
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
exports.QuestionController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(20);
const notification_service_1 = __webpack_require__(58);
const roles_decorator_1 = __webpack_require__(22);
const user_course_entity_1 = __webpack_require__(30);
const user_decorator_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(24);
const queue_entity_1 = __webpack_require__(27);
const question_role_guard_1 = __webpack_require__(76);
const question_entity_1 = __webpack_require__(32);
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
            throw new common_2.NotFoundException('Posted to an invalid queue');
        }
        if (!queue.allowQuestions) {
            throw new common_2.BadRequestException('Queue not allowing new questions');
        }
        if (!(await queue.checkIsOpen())) {
            throw new common_2.BadRequestException('Queue is closed');
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
                throw new common_2.BadRequestException("You can't create more than one question at a time.");
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
                throw new common_2.UnauthorizedException(`Student cannot change status from ${question.status} to ${body.status}`);
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
                throw new common_2.UnauthorizedException('TA/Professors can only edit question status');
            }
            const oldStatus = question.status;
            const newStatus = body.status;
            if (((_a = question.taHelped) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
                if (oldStatus === common_1.OpenQuestionStatus.Helping) {
                    throw new common_2.UnauthorizedException('Another TA is currently helping with this question');
                }
                if (oldStatus === common_1.ClosedQuestionStatus.Resolved) {
                    throw new common_2.UnauthorizedException('Another TA has already resolved this question');
                }
            }
            const isAlreadyHelpingOne = (await question_entity_1.QuestionModel.count({
                where: {
                    taHelpedId: userId,
                    status: common_1.OpenQuestionStatus.Helping,
                },
            })) === 1;
            if (isAlreadyHelpingOne && newStatus === common_1.OpenQuestionStatus.Helping) {
                throw new common_2.BadRequestException('TA is already helping someone else');
            }
            const validTransition = question.changeStatus(newStatus, common_1.Role.TA);
            if (!validTransition) {
                throw new common_2.UnauthorizedException(`TA cannot change status from ${question.status} to ${body.status}`);
            }
            if (oldStatus !== common_1.OpenQuestionStatus.Helping &&
                newStatus === common_1.OpenQuestionStatus.Helping) {
                question.taHelped = await user_entity_1.UserModel.findOne(userId);
                question.helpedAt = new Date();
                await this.notifService.notifyUser(question.creator.id, notification_service_1.NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name));
            }
            await question.save();
            return question;
        }
        else {
            throw new common_2.UnauthorizedException('Logged-in user does not have edit access');
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
exports.QuestionRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const role_guard_1 = __webpack_require__(36);
let QuestionRolesGuard = class QuestionRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        let queueId;
        if (request.params.questionId) {
            const question = await question_entity_1.QuestionModel.findOne(request.params.questionId);
            if (!question) {
                throw new common_1.NotFoundException('Question not found');
            }
            queueId = question.queueId;
        }
        else if (request.body.queueId) {
            queueId = request.body.queueId;
        }
        else {
            throw new common_1.BadRequestException('Cannot find queue of question');
        }
        const queue = await queue_entity_1.QueueModel.findOne(queueId);
        if (!queue) {
            throw new common_1.NotFoundException('This queue does not exist!');
        }
        const courseId = queue.courseId;
        const user = await user_entity_1.UserModel.findOne(request.user.userId, {
            relations: ['courses'],
        });
        return { courseId, user };
    }
};
QuestionRolesGuard = __decorate([
    common_1.Injectable()
], QuestionRolesGuard);
exports.QuestionRolesGuard = QuestionRolesGuard;


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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSubscriber = void 0;
const common_1 = __webpack_require__(14);
const queue_sse_service_1 = __webpack_require__(37);
const queue_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(19);
const notification_service_1 = __webpack_require__(58);
const question_entity_1 = __webpack_require__(32);
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
            const previousThird = await question_entity_1.QuestionModel.openInQueue(event.entity.queueId)
                .offset(2)
                .getOne();
            const third = await question_entity_1.QuestionModel.openInQueue(event.entity.queueId)
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
        const numberOfQuestions = await question_entity_1.QuestionModel.openInQueue(event.entity.queueId)
            .andWhere('question.status IN (:...openStatus)', {
            openStatus: [common_1.OpenQuestionStatus.Drafting, common_1.OpenQuestionStatus.Queued],
        })
            .getCount();
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
exports.SeedModule = void 0;
const common_1 = __webpack_require__(5);
const seed_controller_1 = __webpack_require__(79);
const seed_service_1 = __webpack_require__(82);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(19);
const factories_1 = __webpack_require__(80);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const non_production_guard_1 = __webpack_require__(67);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const seed_service_1 = __webpack_require__(82);
const user_entity_1 = __webpack_require__(24);
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
        var _a, _b;
        let queue;
        const now = new Date();
        const officeHours = await factories_1.OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
        });
        if (body.courseId) {
            const course = await course_entity_1.CourseModel.findOneOrFail(body.courseId);
            queue = await factories_1.QueueFactory.create({
                course: course,
                officeHours: [officeHours],
                allowQuestions: (_a = body.allowQuestions) !== null && _a !== void 0 ? _a : false,
            });
        }
        else {
            queue = await factories_1.QueueFactory.create({
                officeHours: [officeHours],
                allowQuestions: (_b = body.allowQuestions) !== null && _b !== void 0 ? _b : false,
            });
        }
        return queue;
    }
    async createQuestion(body) {
        let question;
        if (body.queueId) {
            const queue = await queue_entity_1.QueueModel.findOneOrFail(body.queueId);
            question = await factories_1.QuestionFactory.create({
                queue: queue,
                createdAt: new Date(),
            });
        }
        else {
            question = await factories_1.QuestionFactory.create();
        }
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(81);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const semester_entity_1 = __webpack_require__(31);
const user_course_entity_1 = __webpack_require__(30);
const user_entity_1 = __webpack_require__(24);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const course_section_mapping_entity_1 = __webpack_require__(68);
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
    .attr('room', `WVH 101`)
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
/* 81 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const nestjs_admin_1 = __webpack_require__(84);
const credentialValidator_1 = __webpack_require__(85);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(86);
const admin_entities_1 = __webpack_require__(88);
const admin_command_1 = __webpack_require__(89);
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
/* 84 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(86);
const bcrypt_1 = __webpack_require__(87);
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
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(19);
const bcrypt_1 = __webpack_require__(87);
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
/* 87 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(84);
const course_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(24);
const course_section_mapping_entity_1 = __webpack_require__(68);
const user_course_entity_1 = __webpack_require__(30);
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
exports.AdminCommand = void 0;
const nestjs_command_1 = __webpack_require__(49);
const common_1 = __webpack_require__(5);
const admin_user_entity_1 = __webpack_require__(86);
const readline_sync_1 = __webpack_require__(90);
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
/* 90 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const semester_entity_1 = __webpack_require__(31);
const user_entity_1 = __webpack_require__(24);
const user_course_entity_1 = __webpack_require__(30);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const desktop_notif_entity_1 = __webpack_require__(25);
const phone_notif_entity_1 = __webpack_require__(26);
const admin_user_entity_1 = __webpack_require__(86);
const dotenv_1 = __webpack_require__(92);
const course_section_mapping_entity_1 = __webpack_require__(68);
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
    ], keepConnectionAlive: true, logging: !!process.env.TYPEORM_LOGGING }, (!!process.env.TYPEORM_CLI ? inCLI : {}));
module.exports = typeorm;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(56);
const backfill_phone_notifs_command_1 = __webpack_require__(94);
let BackfillModule = class BackfillModule {
};
BackfillModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        providers: [backfill_phone_notifs_command_1.BackfillPhoneNotifs],
    })
], BackfillModule);
exports.BackfillModule = BackfillModule;


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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillPhoneNotifs = void 0;
const nestjs_command_1 = __webpack_require__(49);
const common_1 = __webpack_require__(5);
const phone_notif_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(19);
const twilio_service_1 = __webpack_require__(60);
const user_entity_1 = __webpack_require__(24);
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
exports.ReleaseNotesModule = void 0;
const common_1 = __webpack_require__(5);
const release_notes_controller_1 = __webpack_require__(96);
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
exports.ReleaseNotesController = void 0;
const common_1 = __webpack_require__(5);
const jwt_auth_guard_1 = __webpack_require__(20);
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
            throw new common_1.InternalServerErrorException('Error Parsing release notes time: ' + e);
        }
        data['beae2a02-249e-4b61-9bfc-81258d93f20d'].value.properties.title = [];
        data['4d25f393-e570-4cd5-ad66-b278a0924225'].value.properties.title = [];
        response.releaseNotes = data;
        return response;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReleaseNotesController.prototype, "getReleaseNotes", null);
ReleaseNotesController = __decorate([
    common_1.Controller('release_notes'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        common_1.HttpService])
], ReleaseNotesController);
exports.ReleaseNotesController = ReleaseNotesController;


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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(99);
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
/* 99 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3QtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLWZzbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS1yb2xlcy5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3VhcmRzL3JvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtY29tbWFuZFwiIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaWNhbC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtaWNhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvd3MtaWFuYS9kaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50LXRpbWV6b25lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnJ1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWItcHVzaFwiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR3aWxpb1wiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2p3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHAtc2lnbmF0dXJlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4tY291cnNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC5zdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24tcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC91dGlsL2ZhY3Rvcmllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0eXBlb3JtLWZhY3RvcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtYWRtaW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vY3JlZGVudGlhbFZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLWVudGl0aWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5jb21tYW5kLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWRsaW5lLXN5bmNcIiIsIndlYnBhY2s6Ly8vLi9vcm1jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJpcFVuZGVmaW5lZC5waXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcG0uaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztR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QUFNO2dCQUNMLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7WUFDRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoQlksY0FBYztJQUQxQixtQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWM7Ozs7Ozs7QUNaM0IsMkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAnZWxhc3RpYy1hcG0tbm9kZS9zdGFydCc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2Jvb3RzdHJhcCc7XG5cbmRlY2xhcmUgY29uc3QgbW9kdWxlOiBhbnk7XG5cbmJvb3RzdHJhcChtb2R1bGUuaG90KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGUvc3RhcnRcIik7IiwiaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUsIElOZXN0QXBwbGljYXRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwLm1vZHVsZSc7XG5pbXBvcnQgeyBTdHJpcFVuZGVmaW5lZFBpcGUgfSBmcm9tICcuL3N0cmlwVW5kZWZpbmVkLnBpcGUnO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQXBtSW50ZXJjZXB0b3IgfSBmcm9tICcuL2FwbS5pbnRlcmNlcHRvcic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKGhvdDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShBcHBNb2R1bGUsIHtcbiAgICBsb2dnZXI6IFsnZXJyb3InLCAnd2FybicsICdsb2cnLCAnZGVidWcnLCAndmVyYm9zZSddLFxuICB9KTtcbiAgYWRkR2xvYmFsc1RvQXBwKGFwcCk7XG4gIGFwcC5zZXRHbG9iYWxQcmVmaXgoJ2FwaS92MScpO1xuICBhcHAudXNlR2xvYmFsSW50ZXJjZXB0b3JzKG5ldyBBcG1JbnRlcmNlcHRvcigpKTtcblxuICBpZiAoaXNQcm9kKCkpIHtcbiAgICBjb25zb2xlLmxvZyhgUnVubmluZyBwcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS5gKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBSdW5uaW5nIG5vbi1wcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS4gVEhJUyBNU0cgU0hPVUxEIE5PVCBBUFBFQVIgT04gUFJPRCBWTWAsXG4gICAgKTtcbiAgfVxuICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICBhd2FpdCBhcHAubGlzdGVuKDMwMDIpO1xuXG4gIGlmIChob3QpIHtcbiAgICBob3QuYWNjZXB0KCk7XG4gICAgaG90LmRpc3Bvc2UoKCkgPT4gYXBwLmNsb3NlKCkpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSB0cnVlIGluIHByb2QgYW5kIGluIGludGVncmF0aW9uIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24gYWRkR2xvYmFsc1RvQXBwKGFwcDogSU5lc3RBcHBsaWNhdGlvbik6IHZvaWQge1xuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIHdoaXRlbGlzdDogdHJ1ZSxcbiAgICAgIGZvcmJpZE5vbldoaXRlbGlzdGVkOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgIH0pLFxuICApO1xuICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFN0cmlwVW5kZWZpbmVkUGlwZSgpKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBTY2hlZHVsZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgQ291cnNlTW9kdWxlIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZU1vZHVsZSB9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZHVsZSB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgU2VlZE1vZHVsZSB9IGZyb20gJy4vc2VlZC9zZWVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBZG1pbk1vZHVsZSB9IGZyb20gJy4vYWRtaW4vYWRtaW4ubW9kdWxlJztcbmltcG9ydCB7IENvbW1hbmRNb2R1bGUgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICcuL3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCAqIGFzIHR5cGVvcm1Db25maWcgZnJvbSAnLi4vb3JtY29uZmlnJztcbmltcG9ydCB7IEJhY2tmaWxsTW9kdWxlIH0gZnJvbSAnYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc01vZHVsZSB9IGZyb20gJ3JlbGVhc2Utbm90ZXMvcmVsZWFzZS1ub3Rlcy5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdCh0eXBlb3JtQ29uZmlnKSxcbiAgICBTY2hlZHVsZU1vZHVsZS5mb3JSb290KCksXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgUHJvZmlsZU1vZHVsZSxcbiAgICBDb3Vyc2VNb2R1bGUsXG4gICAgUXVldWVNb2R1bGUsXG4gICAgTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIFF1ZXN0aW9uTW9kdWxlLFxuICAgIFNlZWRNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZW52RmlsZVBhdGg6IFtcbiAgICAgICAgJy5lbnYnLFxuICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IFsnLmVudi5kZXZlbG9wbWVudCddIDogW10pLFxuICAgICAgXSxcbiAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIENvbW1hbmRNb2R1bGUsXG4gICAgU1NFTW9kdWxlLFxuICAgIEJhY2tmaWxsTW9kdWxlLFxuICAgIFJlbGVhc2VOb3Rlc01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3R5cGVvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9zY2hlZHVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VDb250cm9sbGVyIH0gZnJvbSAnLi9jb3Vyc2UuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBJQ2FsQ29tbWFuZCB9IGZyb20gJy4vaWNhbC5jb21tYW5kJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtDb3Vyc2VDb250cm9sbGVyXSxcbiAgaW1wb3J0czogW1F1ZXVlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbSUNhbENvbW1hbmQsIEljYWxTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgR2V0Q291cnNlUmVzcG9uc2UsIFF1ZXVlUGFydGlhbCwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBnZXRSZXBvc2l0b3J5IH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlUm9sZXNHdWFyZCB9IGZyb20gJy4vY291cnNlLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ2NvdXJzZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIENvdXJzZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5ULCBSb2xlLlRBKVxuICBhc3luYyBnZXQoQFBhcmFtKCdpZCcpIGlkOiBudW1iZXIpOiBQcm9taXNlPEdldENvdXJzZVJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogZm9yIGFsbCBjb3Vyc2UgZW5kcG9pbnQsIGNoZWNrIGlmIHRoZXkncmUgYSBzdHVkZW50IG9yIGEgVEFcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWVzJywgJ3F1ZXVlcy5zdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIC8vIFVzZSByYXcgcXVlcnkgZm9yIHBlcmZvcm1hbmNlIChhdm9pZCBlbnRpdHkgaW5zdGFudGlhdGlvbiBhbmQgc2VyaWFsaXphdGlvbilcbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ29oJylcbiAgICAgIC5zZWxlY3QoWydpZCcsICd0aXRsZScsIGBcInN0YXJ0VGltZVwiYCwgYFwiZW5kVGltZVwiYF0pXG4gICAgICAud2hlcmUoJ29oLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuXG4gICAgY291cnNlLnF1ZXVlcyA9IGF3YWl0IGFzeW5jLmZpbHRlcihcbiAgICAgIGNvdXJzZS5xdWV1ZXMsXG4gICAgICBhc3luYyAocSkgPT4gYXdhaXQgcS5jaGVja0lzT3BlbigpLFxuICAgICk7XG4gICAgYXdhaXQgYXN5bmMuZWFjaChjb3Vyc2UucXVldWVzLCBhc3luYyAocSkgPT4ge1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVRpbWVzKCk7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdXJzZTtcbiAgfVxuXG4gIEBQb3N0KCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrSW4oXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPFF1ZXVlUGFydGlhbD4ge1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIHF1ZXVlLnN0YWZmTGlzdC5wdXNoKHVzZXIpO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcblxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBARGVsZXRlKCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrT3V0KFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIHF1ZXVlLnN0YWZmTGlzdCA9IHF1ZXVlLnN0YWZmTGlzdC5maWx0ZXIoKGUpID0+IGUuaWQgIT09IHVzZXIuaWQpO1xuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IGZhbHNlO1xuICAgIH1cbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgLy8gQ2xlYW4gdXAgcXVldWUgaWYgbmVjZXNzYXJ5XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLmNsZWFuUXVldWUocXVldWUuaWQpO1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUeXBlIH0gZnJvbSBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XG5pbXBvcnQge1xuICBJc0Jvb2xlYW4sXG4gIElzRGVmaW5lZCxcbiAgSXNFbnVtLFxuICBJc0ludCxcbiAgSXNOb3RFbXB0eSxcbiAgSXNPcHRpb25hbCxcbiAgSXNTdHJpbmcsXG4gIFZhbGlkYXRlSWYsXG59IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcblxuZXhwb3J0IGNvbnN0IFBST0RfVVJMID0gXCJodHRwczovL2tob3VyeW9mZmljZWhvdXJzLmNvbVwiO1xuZXhwb3J0IGNvbnN0IGlzUHJvZCA9ICgpOiBib29sZWFuID0+XG4gIHByb2Nlc3MuZW52LkRPTUFJTiA9PT0gUFJPRF9VUkwgfHxcbiAgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Py5sb2NhdGlvbj8ub3JpZ2luID09PSBQUk9EX1VSTCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFQSSBCYXNlIERhdGEgVHlwZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gTk9URTogVGhlc2UgYXJlIG5vdCB0aGUgREIgZGF0YSB0eXBlcy4gVGhleSBhcmUgb25seSB1c2VkIGZvciB0aGUgYXBpXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHVzZXIuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBlbWFpbCBzdHJpbmcgb2YgdGhlIHVzZXIgaWYgdGhleSBwcm92aWRlIGl0IChudWxsYWJsZSlcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqIEBwYXJhbSBjb3Vyc2VzIC0gVGhlIGxpc3Qgb2YgY291cnNlcyB0aGF0IHRoZSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCAoYXMgZWl0aGVyIGEgJ3N0dWRlbnQnLCAndGEnIG9yICdwcm9mZXNzb3InKVxuICogQHBhcmFtIGRlc2t0b3BOb3RpZnMgLSBsaXN0IG9mIGVuZHBvaW50cyBzbyB0aGF0IGZyb250ZW5kIGNhbiBmaWd1cmUgb3V0IGlmIGRldmljZSBpcyBlbmFibGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsITogc3RyaW5nO1xuICBuYW1lITogc3RyaW5nO1xuICBwaG90b1VSTCE6IHN0cmluZztcbiAgY291cnNlcyE6IFVzZXJDb3Vyc2VbXTtcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERlc2t0b3BOb3RpZlBhcnRpYWwpXG4gIGRlc2t0b3BOb3RpZnMhOiBEZXNrdG9wTm90aWZQYXJ0aWFsW107XG5cbiAgcGhvbmVOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcbiAgcGhvbmVOdW1iZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVuZHBvaW50ITogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBwYXJ0aWFsIHVzZXIgaW5mbyBuZWVkZWQgYnkgdGhlIGZyb250ZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICovXG5leHBvcnQgY2xhc3MgVXNlclBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWw/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob3RvVVJMPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWFsIGNvdXJzZSBkYXRhIG5lZWRlZCBvbiB0aGUgZnJvbnQgZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKi9cbmV4cG9ydCB0eXBlIENvdXJzZVBhcnRpYWwgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSB0aGF0IGEgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggYW5kIHRoZWlyIHJvbGUgaW4gdGhhdCBjb3Vyc2VcbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoZSB1c2VyIGFjY29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSByb2xlIC0gVGhlIHVzZXIncyByb2xlIGluIHRoZSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCB0eXBlIFVzZXJDb3Vyc2UgPSB7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9sZTogUm9sZTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgdXNlciByb2xlcyBpbiBhIGNvdXJzZS5cbiAqL1xuZXhwb3J0IGVudW0gUm9sZSB7XG4gIFNUVURFTlQgPSBcInN0dWRlbnRcIixcbiAgVEEgPSBcInRhXCIsXG4gIFBST0ZFU1NPUiA9IFwicHJvZmVzc29yXCIsXG59XG5cbmNsYXNzIE9mZmljZUhvdXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHRpdGxlITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZSE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZSE6IERhdGU7XG59XG5cbi8qKlxuICogQSBRdWV1ZSB0aGF0IHN0dWRlbnRzIGNhbiBqb2luIHdpdGggdGhpZXIgdGlja2V0cy5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhhdCB0aGlzIG9mZmljZSBob3VycyBxdWV1ZSBpcyBmb3IuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gcXVlc3Rpb25zIC0gVGhlIGxpc3Qgb2YgdGhlIHN0dWRlbnRzIHF1ZXN0aW9ucyBhc3NvY2FpdGVkIHdpdGggdGhlIHF1ZXVlLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb29tOiBzdHJpbmc7XG4gIHN0YWZmTGlzdDogVXNlclBhcnRpYWxbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBzdGFydFRpbWU/OiBEYXRlO1xuICBlbmRUaW1lPzogRGF0ZTtcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWV1ZSBwYXJ0aWFsIHRvIGJlIHNob3duIG9uIHRoZSB0b2RheSBwYWdlLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZVBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgcm9vbSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgc3RhZmZMaXN0ITogVXNlclBhcnRpYWxbXTtcblxuICBxdWV1ZVNpemUhOiBudW1iZXI7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBpc09wZW4hOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZT86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZT86IERhdGU7XG5cbiAgYWxsb3dRdWVzdGlvbnMhOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgUXVlc3Rpb24gaXMgY3JlYXRlZCB3aGVuIGEgc3R1ZGVudCB3YW50cyBoZWxwIGZyb20gYSBUQS5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIHN0dWRlbnQgcXVlc3Rpb24uXG4gKiBAcGFyYW0gY3JlYXRvciAtIFRoZSBTdHVkZW50IHRoYXQgaGFzIGNyZWF0ZWQgdGhlIHF1ZXN0aW9uLlxuICogQHBhcmFtIHRleHQgLSBUaGUgdGV4dCBkZXNjcml0aXBuIG9mIHdoYXQgaGUvc2hlIG5lZWRzIGhlbHAgd2l0aC5cbiAqIEBwYXJhbSBjcmVhdGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRpY2tldCB3YXMgY3JlYXRlZC4gRXg6IFwiMjAyMC0wOS0xMlQxMjowMDowMC0wNDowMFwiXG4gKiBAcGFyYW0gaGVscGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGJlZ2FuIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gY2xvc2VkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGZpbmlzaGVkIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gcXVlc3Rpb25UeXBlIC0gVGhlIHF1ZXN0aW9uIHR5cGUgaGVscHMgZGlzdGluZ3Vpc2ggcXVlc3Rpb24gZm9yIFRBJ3MgYW5kIGRhdGEgaW5zaWdodHMuXG4gKiBAcGFyYW0gc3RhdHVzIC0gVGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGlzIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiBvZiB0aGUgcGFydGljdWxhciBzdHVkZW50LCB0byBoZWxwIFRBJ3MgZmluZCB0aGVtXG4gKiBAcGFyYW0gaXNPbmxpbmUgLSBXZXRoZXIgb3Igbm90IHRoZSBxdWVzdGlvbiB3aWxsIGhlbHBlZCBvbmxpbmUgb3IgaW4tcGVyc29uXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbiB7XG4gIGlkITogbnVtYmVyO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBjcmVhdG9yITogVXNlclBhcnRpYWw7XG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIHRhSGVscGVkPzogVXNlclBhcnRpYWw7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY3JlYXRlZEF0ITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBoZWxwZWRBdD86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY2xvc2VkQXQ/OiBEYXRlO1xuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG4gIHN0YXR1cyE6IFF1ZXN0aW9uU3RhdHVzO1xuICBsb2NhdGlvbj86IHN0cmluZztcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xufVxuXG4vLyBRdWVzdGlvbiBUeXBlc1xuZXhwb3J0IGVudW0gUXVlc3Rpb25UeXBlIHtcbiAgQ29uY2VwdCA9IFwiQ29uY2VwdFwiLFxuICBDbGFyaWZpY2F0aW9uID0gXCJDbGFyaWZpY2F0aW9uXCIsXG4gIFRlc3RpbmcgPSBcIlRlc3RpbmdcIixcbiAgQnVnID0gXCJCdWdcIixcbiAgU2V0dXAgPSBcIlNldHVwXCIsXG4gIE90aGVyID0gXCJPdGhlclwiLFxufVxuXG5leHBvcnQgZW51bSBPcGVuUXVlc3Rpb25TdGF0dXMge1xuICBEcmFmdGluZyA9IFwiRHJhZnRpbmdcIixcbiAgUXVldWVkID0gXCJRdWV1ZWRcIixcbiAgSGVscGluZyA9IFwiSGVscGluZ1wiLFxuICBQcmlvcml0eVF1ZXVlZCA9IFwiUHJpb3JpdHlRdWV1ZWRcIixcbn1cblxuLyoqXG4gKiBMaW1ibyBzdGF0dXNlcyBhcmUgYXdhaXRpbmcgc29tZSBjb25maXJtYXRpb24gZnJvbSB0aGUgc3R1ZGVudFxuICovXG5leHBvcnQgZW51bSBMaW1ib1F1ZXN0aW9uU3RhdHVzIHtcbiAgQ2FudEZpbmQgPSBcIkNhbnRGaW5kXCIsIC8vIHJlcHJlc2VudHMgd2hlbiBhIHN0dWRlbnQgY2FuJ3QgYmUgZm91bmQgYnkgYSBUQVxuICBSZVF1ZXVlaW5nID0gXCJSZVF1ZXVlaW5nXCIsIC8vIHJlcHJlc2VudHMgd2hlbiBhIFRBIHdhbnRzIHRvIGdldCBiYWNrIHRvIGEgc3R1ZGVudCBsYXRlciBhbmQgZ2l2ZSB0aGVtIHRoZSBvcHRpb24gdG8gYmUgcHV0IGludG8gdGhlIHByaW9yaXR5IHF1ZXVlXG4gIFRBRGVsZXRlZCA9IFwiVEFEZWxldGVkXCIsIC8vIFdoZW4gYSBUQSBkZWxldGVzIGEgcXVlc3Rpb24gZm9yIGEgbXVsdGl0dWRlIG9mIHJlYXNvbnNcbn1cblxuZXhwb3J0IGVudW0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMge1xuICBSZXNvbHZlZCA9IFwiUmVzb2x2ZWRcIixcbiAgQ29uZmlybWVkRGVsZXRlZCA9IFwiQ29uZmlybWVkRGVsZXRlZFwiLFxuICBTdHVkZW50Q2FuY2VsbGVkID0gXCJTdHVkZW50Q2FuY2VsbGVkXCIsXG4gIFN0YWxlID0gXCJTdGFsZVwiLFxufVxuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5RdWV1ZSA9IFtcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUHJpb3JpdHlRdWV1ZSA9IFtPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWRdO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzU2VudFRvQ3JlYXRvciA9IFtcbiAgLi4uU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICAuLi5TdGF0dXNJblF1ZXVlLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCxcbl07XG5cbi8vIFRpY2tldCBTdGF0dXMgLSBSZXByZXNlbnRzIGEgZ2l2ZW4gc3RhdHVzIG9mIGFzIHN0dWRlbnQncyB0aWNrZXRcbmV4cG9ydCB0eXBlIFF1ZXN0aW9uU3RhdHVzID0ga2V5b2YgdHlwZW9mIFF1ZXN0aW9uU3RhdHVzS2V5cztcbi8vIGFuIEVudW0tbGlrZSBjb25zdGFudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgc3RhdHVzZXMgZm9yIGNvbnZlbmllbmNlLlxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uU3RhdHVzS2V5cyA9IHtcbiAgLi4uT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAuLi5DbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgLi4uTGltYm9RdWVzdGlvblN0YXR1cyxcbn07XG5cbi8qKlxuICogQSBTZW1lc3RlciBvYmplY3QsIHJlcHJlc2VudGluZyBhIHNjaGVkdWxlIHNlbWVzdGVyIHRlcm0gZm9yIHRoZSBwdXJwb3NlcyBvZiBhIGNvdXJzZS5cbiAqIEBwYXJhbSBzZWFzb24gLSBUaGUgc2Vhc29uIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKiBAcGFyYW0geWVhciAtIFRoZSB5ZWFyIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKi9cbmludGVyZmFjZSBTZW1lc3RlciB7XG4gIHNlYXNvbjogU2Vhc29uO1xuICB5ZWFyOiBudW1iZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhlIHNlYXNvbnMgaW4gd2hpY2ggYSBjb3Vyc2UgY2FuIHRha2UgcGxhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIFNlYXNvbiA9IFwiRmFsbFwiIHwgXCJTcHJpbmdcIiB8IFwiU3VtbWVyIDFcIiB8IFwiU3VtbWVyIDJcIjtcblxuZXhwb3J0IHR5cGUgRGVza3RvcE5vdGlmQm9keSA9IHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgZXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIGtleXM6IHtcbiAgICBwMjU2ZGg6IHN0cmluZztcbiAgICBhdXRoOiBzdHJpbmc7XG4gIH07XG4gIG5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQaG9uZU5vdGlmQm9keSA9IHtcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT0gQVBJIFJvdXRlIFR5cGVzID09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT24gYmFja2VuZCwgdmFsaWRhdGVkIHdpdGggaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20vdGVjaG5pcXVlcy92YWxpZGF0aW9uXG4vLyBBUEkgcm91dGUgUGFyYW1zIGFuZCBSZXNwb25zZXNcblxuLy8gT2ZmaWNlIEhvdXJzIFJlc3BvbnNlIFR5cGVzXG5leHBvcnQgY2xhc3MgR2V0UHJvZmlsZVJlc3BvbnNlIGV4dGVuZHMgVXNlciB7fVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5RGF0YVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIGVtYWlsITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGZpcnN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgbGFzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc0ludCgpXG4gIGNhbXB1cyE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc1N0cmluZygpXG4gIHBob3RvX3VybCE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICBjb3Vyc2VzITogS2hvdXJ5U3R1ZGVudENvdXJzZVtdO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIHRhX2NvdXJzZXMhOiBLaG91cnlUQUNvdXJzZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5U3R1ZGVudENvdXJzZSB7XG4gIEBJc0ludCgpXG4gIGNybiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFjY2VsZXJhdGVkITogYm9vbGVhbjtcblxuICBASXNJbnQoKVxuICBzZWN0aW9uITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHRpdGxlITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5VEFDb3Vyc2Uge1xuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSB7XG4gIHJlZGlyZWN0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9maWxlUGFyYW1zIHtcbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIHBob25lTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQFZhbGlkYXRlSWYoKG8pID0+IG8ucGhvbmVOb3RpZnNFbmFibGVkKVxuICBASXNTdHJpbmcoKVxuICBASXNOb3RFbXB0eSgpXG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUmVzcG9uc2Uge1xuICBpZCE6IG51bWJlcjtcbiAgbmFtZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBPZmZpY2VIb3VyUGFydGlhbClcbiAgb2ZmaWNlSG91cnMhOiBBcnJheTxPZmZpY2VIb3VyUGFydGlhbD47XG5cbiAgQFR5cGUoKCkgPT4gUXVldWVQYXJ0aWFsKVxuICBxdWV1ZXMhOiBRdWV1ZVBhcnRpYWxbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXVlUmVzcG9uc2UgZXh0ZW5kcyBRdWV1ZVBhcnRpYWwge31cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVF1ZXVlc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVldWVQYXJ0aWFsPiB7fVxuXG5leHBvcnQgY2xhc3MgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlIHtcbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHlvdXJRdWVzdGlvbj86IFF1ZXN0aW9uO1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWVzdGlvbnNHZXR0aW5nSGVscCE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHByaW9yaXR5UXVldWUhOiBBcnJheTxRdWVzdGlvbj47XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgdGV4dCE6IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgcXVldWVJZCE6IG51bWJlcjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgZm9yY2UhOiBib29sZWFuO1xufVxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVldWVJZD86IG51bWJlcjtcblxuICBASXNFbnVtKFF1ZXN0aW9uU3RhdHVzS2V5cylcbiAgQElzT3B0aW9uYWwoKVxuICBzdGF0dXM/OiBRdWVzdGlvblN0YXR1cztcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IHR5cGUgVEFVcGRhdGVTdGF0dXNSZXNwb25zZSA9IFF1ZXVlUGFydGlhbDtcbmV4cG9ydCB0eXBlIFF1ZXVlTm90ZVBheWxvYWRUeXBlID0ge1xuICBub3Rlczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXVlUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBub3Rlcz86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWxsb3dRdWVzdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU1NFUXVldWVSZXNwb25zZSB7XG4gIHF1ZXVlPzogR2V0UXVldWVSZXNwb25zZTtcbiAgcXVlc3Rpb25zPzogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0JvZHkge1xuICBUb0NvdW50cnk6IHN0cmluZztcbiAgVG9TdGF0ZTogc3RyaW5nO1xuICBTbXNNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIE51bU1lZGlhOiBzdHJpbmc7XG4gIFRvQ2l0eTogc3RyaW5nO1xuICBGcm9tWmlwOiBzdHJpbmc7XG4gIFNtc1NpZDogc3RyaW5nO1xuICBGcm9tU3RhdGU6IHN0cmluZztcbiAgU21zU3RhdHVzOiBzdHJpbmc7XG4gIEZyb21DaXR5OiBzdHJpbmc7XG4gIEJvZHk6IHN0cmluZztcbiAgRnJvbUNvdW50cnk6IHN0cmluZztcbiAgVG86IHN0cmluZztcbiAgVG9aaXA6IHN0cmluZztcbiAgTnVtU2VnbWVudHM6IHN0cmluZztcbiAgTWVzc2FnZVNpZDogc3RyaW5nO1xuICBBY2NvdW50U2lkOiBzdHJpbmc7XG4gIEZyb206IHN0cmluZztcbiAgQXBpVmVyc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFJlbGVhc2VOb3Rlc1Jlc3BvbnNlIHtcbiAgcmVsZWFzZU5vdGVzOiB1bmtub3duO1xuICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudW1iZXI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy10cmFuc2Zvcm1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIE1hbnlUb01hbnksXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vdXNlci1jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgndXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgZW1haWw6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG90b1VSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgY291cnNlczogVXNlckNvdXJzZU1vZGVsW107XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIGRlc2t0b3BzP1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgcGhvbmU/XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gRGVza3RvcE5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZNb2RlbFtdO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gUGhvbmVOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZjogUGhvbmVOb3RpZk1vZGVsO1xuXG4gIEBFeGNsdWRlKClcbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUuc3RhZmZMaXN0KVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIENyZWF0ZURhdGVDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ2Rlc2t0b3Bfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZXhwaXJhdGlvblRpbWU6IERhdGU7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHAyNTZkaDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBhdXRoOiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5kZXNrdG9wTm90aWZzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENyZWF0ZURhdGVDb2x1bW4oeyB0eXBlOiAndGltZXN0YW1wJyB9KVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICd0ZXh0JywgbnVsbGFibGU6IHRydWUgfSlcbiAgbmFtZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIE9uZVRvT25lLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdwaG9uZV9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUGhvbmVOb3RpZk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucGhvbmVOb3RpZilcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICB2ZXJpZmllZDogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7IE9wZW5RdWVzdGlvblN0YXR1cyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgSm9pblRhYmxlLFxuICBMZXNzVGhhbk9yRXF1YWwsXG4gIE1hbnlUb01hbnksXG4gIE1hbnlUb09uZSxcbiAgTW9yZVRoYW5PckVxdWFsLFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5cbmludGVyZmFjZSBUaW1lSW50ZXJ2YWwge1xuICBzdGFydFRpbWU6IERhdGU7XG4gIGVuZFRpbWU6IERhdGU7XG59XG5cbkBFbnRpdHkoJ3F1ZXVlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnF1ZXVlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcm9vbTogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXN0aW9uTW9kZWwsIChxbSkgPT4gcW0ucXVldWUpXG4gIEBFeGNsdWRlKClcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbk1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbm90ZXM6IHN0cmluZztcblxuICBATWFueVRvTWFueSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5xdWV1ZXMpXG4gIEBKb2luVGFibGUoKVxuICBzdGFmZkxpc3Q6IFVzZXJNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyBkZWZhdWx0OiBmYWxzZSB9KVxuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcblxuICBARXhjbHVkZSgpXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5xdWV1ZSlcbiAgQEpvaW5UYWJsZSgpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBzdGFydFRpbWU6IERhdGU7XG4gIGVuZFRpbWU6IERhdGU7XG5cbiAgaXNPcGVuOiBib29sZWFuO1xuXG4gIGFzeW5jIGNoZWNrSXNPcGVuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLnN0YWZmTGlzdCAmJiB0aGlzLnN0YWZmTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBNU19JTl9NSU5VVEUgPSA2MDAwMDtcbiAgICBjb25zdCBvaHMgPSBhd2FpdCB0aGlzLmdldE9mZmljZUhvdXJzKCk7XG4gICAgY29uc3Qgb3BlbiA9ICEhb2hzLmZpbmQoXG4gICAgICAoZSkgPT5cbiAgICAgICAgZS5zdGFydFRpbWUuZ2V0VGltZSgpIC0gMTAgKiBNU19JTl9NSU5VVEUgPCBub3cuZ2V0VGltZSgpICYmXG4gICAgICAgIGUuZW5kVGltZS5nZXRUaW1lKCkgKyAxICogTVNfSU5fTUlOVVRFID4gbm93LmdldFRpbWUoKSxcbiAgICApO1xuICAgIHRoaXMuaXNPcGVuID0gb3BlbjtcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHF1ZXVlU2l6ZTogbnVtYmVyO1xuXG4gIGFzeW5jIGFkZFF1ZXVlU2l6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwub3BlbkluUXVldWUodGhpcy5pZClcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4ub3BlblN0YXR1cyknLCB7XG4gICAgICAgIG9wZW5TdGF0dXM6IFtPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdLFxuICAgICAgfSlcbiAgICAgIC5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgaW4gdGhlIGNvbnRleHQgb2Ygb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICogQHBhcmFtIHNlbWVzdGVyIC0gVGhlIHNlbWVzdGVyIG9mIHRoaXMgY291cnNlLlxuICovXG4vKmludGVyZmFjZSBDb3Vyc2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNlbWVzdGVyOiBTZW1lc3RlcjtcbiAgICB1c2VyczogVXNlckNvdXJzZVtdXG59Ki9cblxuQEVudGl0eSgnY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLmNvdXJzZSlcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLmNvdXJzZSlcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGljYWxVUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS5jb3Vyc2UpXG4gIEBFeGNsdWRlKClcbiAgdXNlckNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbDtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBTZW1lc3Rlck1vZGVsLCAoc2VtZXN0ZXIpID0+IHNlbWVzdGVyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3NlbWVzdGVySWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgc2VtZXN0ZXI6IFNlbWVzdGVyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgLy8gVE9ETzogY2FuIHdlIG1ha2UgdGhlc2Ugbm90IG51bGxhYmxlIGFuZCB3b3JrIHdpdGggVHlwZU9STVxuICBzZW1lc3RlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbignYm9vbGVhbicsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZW5hYmxlZDogYm9vbGVhbjsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIGdpdmVuIHRoZSBjb3Vyc2UgaXMgdXNpbmcgb3VyIGFwcFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBTZWFzb24gfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3NlbWVzdGVyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBTZW1lc3Rlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc2Vhc29uOiBTZWFzb247XG5cbiAgQENvbHVtbigpXG4gIHllYXI6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnNlbWVzdGVyKVxuICBjb3Vyc2VzOiBDb3Vyc2VNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25UeXBlLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgU2VsZWN0UXVlcnlCdWlsZGVyLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyB9IGZyb20gJy4vcXVlc3Rpb24tZnNtJztcblxuQEVudGl0eSgncXVlc3Rpb25fbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLnF1ZXN0aW9ucylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRleHQ6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NyZWF0b3JJZCcgfSlcbiAgY3JlYXRvcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNyZWF0b3JJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndGFIZWxwZWRJZCcgfSlcbiAgdGFIZWxwZWQ6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB0YUhlbHBlZElkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaGVscGVkQXQ6IERhdGU7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlIHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGFzIHRoZSBnaXZlbiByb2xlXG4gICAqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgc3RhdHVzIGNoYW5nZSBzdWNjZWVkZWRcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTdGF0dXMobmV3U3RhdHVzOiBRdWVzdGlvblN0YXR1cywgcm9sZTogUm9sZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyh0aGlzLnN0YXR1cywgbmV3U3RhdHVzLCByb2xlKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBvcGVuSW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlczogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF06IHtcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGVdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9ucy5mb3JFYWNoKChxdWV1ZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhblF1ZXVlKHF1ZXVlLmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbGVhblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1bnNhZmVDbGVhbihxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKHF1ZXVlSWQpLmdldE1hbnkoKTtcbiAgICBjb25zdCBvcGVuUXVlc3Rpb25zID0gcXVlc3Rpb25zLmZpbHRlcihcbiAgICAgIChxKSA9PiBxLnN0YXR1cyBpbiBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gICAgKTtcblxuICAgIG9wZW5RdWVzdGlvbnMuZm9yRWFjaCgocTogUXVlc3Rpb25Nb2RlbCkgPT4ge1xuICAgICAgcS5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZTtcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuc2F2ZShvcGVuUXVlc3Rpb25zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ011c3QgYmUgbG9nZ2VkIGluJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb3Vyc2VJZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdObyBjb3Vyc2VpZCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hdGNoUm9sZXMocm9sZXMsIHVzZXIsIGNvdXJzZUlkKTtcbiAgfVxuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ05vdCBJbiBUaGlzIENvdXJzZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXG4gICAgICAgICAgJywgJyxcbiAgICAgICAgKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZW1haW5pbmcubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUm9sZSwgU1NFUXVldWVSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJ3NzZS9zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuXG50eXBlIFF1ZXVlQ2xpZW50TWV0YWRhdGEgPSB7IHVzZXJJZDogbnVtYmVyOyByb2xlOiBSb2xlIH07XG5cbmNvbnN0IGlkVG9Sb29tID0gKHF1ZXVlSWQ6IG51bWJlcikgPT4gYHEtJHtxdWV1ZUlkfWA7XG4vKipcbiAqIEhhbmRsZSBzZW5kaW5nIHF1ZXVlIHNzZSBldmVudHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU1NFU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzc2VTZXJ2aWNlOiBTU0VTZXJ2aWNlPFF1ZXVlQ2xpZW50TWV0YWRhdGE+LFxuICApIHt9XG5cbiAgc3Vic2NyaWJlQ2xpZW50KFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICByZXM6IFJlc3BvbnNlLFxuICAgIG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLnNzZVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCB7IHJlcywgbWV0YWRhdGEgfSk7XG4gIH1cblxuICAvLyBTZW5kIGV2ZW50IHdpdGggbmV3IHF1ZXN0aW9ucywgYnV0IG5vIG1vcmUgdGhhbiBvbmNlIGEgc2Vjb25kXG4gIHVwZGF0ZVF1ZXN0aW9ucyA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgaWYgKHF1ZXN0aW9ucykge1xuICAgICAgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICh7IHJvbGUsIHVzZXJJZCB9KSA9PiAoe1xuICAgICAgICBxdWVzdGlvbnM6IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgcm9sZSxcbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZVF1ZXVlID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKCkgPT4gKHsgcXVldWUgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVG9Sb29tKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBkYXRhOiAobWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEpID0+IFByb21pc2U8U1NFUXVldWVSZXNwb25zZT4sXG4gICkge1xuICAgIGF3YWl0IHRoaXMuc3NlU2VydmljZS5zZW5kRXZlbnQoaWRUb1Jvb20ocXVldWVJZCksIGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsZVVwZGF0ZSh1cGRhdGVGdW5jdGlvbjogKHF1ZXVlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIHJldHVybiB0aHJvdHRsZShcbiAgICAgIGFzeW5jIChxdWV1ZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVGdW5jdGlvbihxdWV1ZUlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAge1xuICAgICAgICBsZWFkaW5nOiBmYWxzZSxcbiAgICAgICAgdHJhaWxpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUm9sZSxcbiAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICBTdGF0dXNJblF1ZXVlLFxuICBTdGF0dXNTZW50VG9DcmVhdG9yLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmQoe1xuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHF1ZXVlSWQsXG4gICAgICAgIHN0YXR1czogSW4oW1xuICAgICAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgICAgICAuLi5TdGF0dXNJblF1ZXVlLFxuICAgICAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICBdKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBxdWVzdGlvbnMgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG5cbiAgICBxdWVzdGlvbnMucXVldWUgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKChxdWVzdGlvbikgPT5cbiAgICAgIFN0YXR1c0luUXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5xdWVzdGlvbnNHZXR0aW5nSGVscCA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoXG4gICAgICAocXVlc3Rpb24pID0+IHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5wcmlvcml0eVF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblByaW9yaXR5UXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvKiogSGlkZSBzZW5zaXRpdmUgZGF0YSB0byBvdGhlciBzdHVkZW50cyAqL1xuICBhc3luYyBwZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICBxdWVzdGlvbnM6IExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGlmIChyb2xlID09PSBSb2xlLlNUVURFTlQpIHtcbiAgICAgIGNvbnN0IG5ld0xRUiA9IG5ldyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UoKTtcbiAgICAgIE9iamVjdC5hc3NpZ24obmV3TFFSLCBxdWVzdGlvbnMpO1xuXG4gICAgICBuZXdMUVIucXVldWUgPSBxdWVzdGlvbnMucXVldWUubWFwKChxdWVzdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBjcmVhdG9yID1cbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkID09PSB1c2VySWRcbiAgICAgICAgICAgID8gcXVlc3Rpb24uY3JlYXRvclxuICAgICAgICAgICAgOiBwaWNrKHF1ZXN0aW9uLmNyZWF0b3IsIFsnaWQnXSk7XG4gICAgICAgIHJldHVybiBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7IC4uLnF1ZXN0aW9uLCBjcmVhdG9yIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ld0xRUi55b3VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNyZWF0b3JJZDogdXNlcklkLFxuICAgICAgICAgIHN0YXR1czogSW4oU3RhdHVzU2VudFRvQ3JlYXRvciksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIG5ld0xRUi5wcmlvcml0eVF1ZXVlID0gW107XG5cbiAgICAgIHJldHVybiBuZXdMUVI7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlQ29udHJvbGxlciB9IGZyb20gJy4vcXVldWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICdzc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXVlLnN1YnNjcmliZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWV1ZUNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtcbiAgICBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBRdWV1ZVNlcnZpY2UsXG4gICAgUXVldWVTU0VTZXJ2aWNlLFxuICAgIFF1ZXVlU3Vic2NyaWJlcixcbiAgXSxcbiAgZXhwb3J0czogW1F1ZXVlQ2xlYW5TZXJ2aWNlLCBRdWV1ZVNTRVNlcnZpY2VdLFxuICBpbXBvcnRzOiBbU1NFTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVldWVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEdldFF1ZXVlUmVzcG9uc2UsXG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgUm9sZSxcbiAgVXBkYXRlUXVldWVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFJlcyxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICdwcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3F1ZXVlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVldWVSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWV1ZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxHZXRRdWV1ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICB9XG5cbiAgQEdldCgnOnF1ZXVlSWQvcXVlc3Rpb25zJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXN0aW9ucyhcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UucGVyc29uYWxpemVRdWVzdGlvbnMoXG4gICAgICBxdWVzdGlvbnMsXG4gICAgICB1c2VySWQsXG4gICAgICByb2xlLFxuICAgICk7XG4gIH1cblxuICBAUGF0Y2goJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyB1cGRhdGVRdWV1ZShcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWV1ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcXVldWUubm90ZXMgPSBib2R5Lm5vdGVzO1xuICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gYm9keS5hbGxvd1F1ZXN0aW9ucztcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgLy8gRW5kcG9pbnQgdG8gc2VuZCBmcm9udGVuZCByZWNlaXZlIHNlcnZlci1zZW50IGV2ZW50cyB3aGVuIHF1ZXVlIGNoYW5nZXNcbiAgQEdldCgnOnF1ZXVlSWQvc3NlJylcbiAgc2VuZEV2ZW50KFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAUXVldWVSb2xlKCkgcm9sZTogUm9sZSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICk6IHZvaWQge1xuICAgIHJlcy5zZXQoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2V2ZW50LXN0cmVhbScsXG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScsXG4gICAgICAnWC1BY2NlbC1CdWZmZXJpbmcnOiAnbm8nLFxuICAgICAgQ29ubmVjdGlvbjogJ2tlZXAtYWxpdmUnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KHF1ZXVlSWQsIHJlcywgeyByb2xlLCB1c2VySWQgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgUXVldWVSb2xlID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIGFzeW5jIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlPy5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSB1c2VyLmNvdXJzZXMuZmluZCgoY291cnNlKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvdXJzZS5jb3Vyc2VJZCkgPT09IE51bWJlcihjb3Vyc2VJZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZTtcbiAgfSxcbik7XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVSb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignUXVldWUgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnLi9zc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoeyBwcm92aWRlcnM6IFtTU0VTZXJ2aWNlXSwgZXhwb3J0czogW1NTRVNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgU1NFTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU3Vic2NyaWJlciBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVldWVNb2RlbD4ge1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSkge1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWV1ZU1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXVlTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShldmVudC5lbnRpdHkuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElDYWxDb21tYW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaWNhbDpzY3JhcGUnLFxuICAgIGRlc2NyaWJlOiAnc2NyYXBlIGljYWwgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaWNhbFNlcnZpY2UudXBkYXRlQWxsQ291cnNlcygpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgTW9tZW50ID0gbW9tZW50Lk1vbWVudDtcblxudHlwZSBDcmVhdGVPZmZpY2VIb3VyID0gRGVlcFBhcnRpYWw8T2ZmaWNlSG91ck1vZGVsPltdO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWNhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgLy8gdHogc2hvdWxkIG5vdCBiZSBwcmVjb252ZXJ0ZWQgYnkgZmluZE9uZUlhbmFcbiAgcHJpdmF0ZSBmaXhPdXRsb29rVFooZGF0ZTogTW9tZW50LCB0ejogc3RyaW5nKTogTW9tZW50IHtcbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcbiAgICBpZiAoaWFuYSkge1xuICAgICAgLy8gTW92ZSB0byB0aGUgdGltZXpvbmUgYmVjYXVzZSBub2RlLWljYWwgZGlkbid0IGRvIGl0IGZvciB1cywgc2luY2UgaXQgZG9lcyBub3QgcmVjb2duaXplIHdpbmRvd3MgdGltZXpvbmVcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkudHooaWFuYSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGRhdGUgb2Ygb2NjdXJlbmNlcyBmb3IgYW4gcnJ1bGUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLCBleGNsdWRpbmcgdGhlIGxpc3Qgb2YgZGF0ZXNcbiAgcHJpdmF0ZSBycnVsZVRvRGF0ZXMocnJ1bGU6IGFueSwgZXZlbnRUWjogc3RyaW5nLCBleGRhdGVSYXc6IERhdGVbXSk6IERhdGVbXSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBycnVsZTtcbiAgICBjb25zdCBkdHN0YXJ0OiBNb21lbnQgPSB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy5kdHN0YXJ0KSwgZXZlbnRUWik7XG4gICAgY29uc3QgdW50aWw6IE1vbWVudCA9XG4gICAgICBvcHRpb25zLnVudGlsICYmIHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLnVudGlsKSwgZXZlbnRUWik7XG4gICAgY29uc3QgZXZlbnRUWk1vbWVudCA9IG1vbWVudC50ei56b25lKGZpbmRPbmVJYW5hKGV2ZW50VFopIHx8IGV2ZW50VFopO1xuXG4gICAgLy8gR2V0IHRoZSBVVEMgT2Zmc2V0IGluIHRoaXMgZXZlbnQncyB0aW1lem9uZSwgYXQgdGhpcyB0aW1lLiBBY2NvdW50cyBmb3IgRGF5bGlnaHQgU2F2aW5ncyBhbmQgb3RoZXIgb2RkaXRpZXNcbiAgICBjb25zdCB0elVUQ09mZnNldE9uRGF0ZSA9IChkYXRlOiBNb21lbnQpID0+XG4gICAgICBldmVudFRaTW9tZW50LnV0Y09mZnNldChkYXRlLnZhbHVlT2YoKSk7XG4gICAgY29uc3QgZHRzdGFydFVUQ09mZnNldCA9IHR6VVRDT2Zmc2V0T25EYXRlKGR0c3RhcnQpO1xuXG4gICAgLy8gQXBwbHkgYSBVVEMgb2Zmc2V0IGluIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIE1vbWVudFxuICAgIGNvbnN0IGFwcGx5T2Zmc2V0ID0gKGRhdGU6IE1vbWVudCwgdXRjT2Zmc2V0OiBudW1iZXIpOiBNb21lbnQgPT5cbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdCh1dGNPZmZzZXQsICdtJyk7XG4gICAgLy8gYXBwbHkgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwcmVSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIGR0c3RhcnRVVENPZmZzZXQpO1xuICAgIC8vIFJldmVydCB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHBvc3RSUnVsZSA9IChkYXRlOiBNb21lbnQpID0+IGFwcGx5T2Zmc2V0KGRhdGUsIC1kdHN0YXJ0VVRDT2Zmc2V0KTtcblxuICAgIC8vIEFkanVzdCBmb3IgcnJ1bGUgbm90IHRha2luZyBpbnRvIGFjY291bnQgRFNUIGluIGxvY2FsZVxuICAgIC8vICAgaWUuIFwiOHBtIGV2ZXJ5IGZyaWRheVwiIG1lYW5zIGhhdmluZyB0byBwdXNoIGJhY2sgNjAgbWludXRlcyBhZnRlciBGYWxsIEJhY2t3YXJkc1xuICAgIGNvbnN0IGZpeERTVCA9IChkYXRlOiBNb21lbnQpOiBNb21lbnQgPT5cbiAgICAgIC8vIEdldCB0aGUgZGlmZmVyZW5jZSBpbiBVVEMgb2Zmc2V0IGJldHdlZW4gZHRzdGFydCBhbmQgdGhpcyBkYXRlIChzbyBpZiB3ZSBjcm9zc2VkIERTVCBzd2l0Y2gsIHRoaXMgd2lsbCBiZSBub256ZXJvKVxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KGR0c3RhcnRVVENPZmZzZXQgLSB0elVUQ09mZnNldE9uRGF0ZShkYXRlKSwgJ20nKTtcblxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgUlJ1bGUoe1xuICAgICAgZnJlcTogb3B0aW9ucy5mcmVxLFxuICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICB3a3N0OiBvcHRpb25zLndrc3QsXG4gICAgICBjb3VudDogb3B0aW9ucy5jb3VudCxcbiAgICAgIGJ5d2Vla2RheTogb3B0aW9ucy5ieXdlZWtkYXksXG4gICAgICBkdHN0YXJ0OiBwcmVSUnVsZShkdHN0YXJ0KS50b0RhdGUoKSxcbiAgICAgIHVudGlsOiB1bnRpbCAmJiBwcmVSUnVsZSh1bnRpbCkudG9EYXRlKCksXG4gICAgfSk7XG5cbiAgICAvLyBEYXRlcyB0byBleGNsdWRlIGZyb20gcmVjdXJyZW5jZSwgc2VwYXJhdGUgZXhkYXRlIHRpbWVzdGFtcCBmb3IgZmlsdGVyaW5nXG4gICAgY29uc3QgZXhkYXRlczogbnVtYmVyW10gPSBPYmplY3QudmFsdWVzKGV4ZGF0ZVJhdyB8fCB7fSlcbiAgICAgIC5tYXAoKGQpID0+IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChkKSwgZXZlbnRUWikpXG4gICAgICAubWFwKChkKSA9PiBhcHBseU9mZnNldChkLCB0elVUQ09mZnNldE9uRGF0ZShkKSkudmFsdWVPZigpKTtcblxuICAgIC8vIERvaW5nIG1hdGggaGVyZSBiZWNhdXNlIG1vbWVudC5hZGQgY2hhbmdlcyBiZWhhdmlvciBiYXNlZCBvbiBzZXJ2ZXIgdGltZXpvbmVcbiAgICBjb25zdCBpbjEwV2Vla3MgPSBuZXcgRGF0ZShcbiAgICAgIGR0c3RhcnQudmFsdWVPZigpICsgMTAwMCAqIDYwICogNjAgKiAyNCAqIDcgKiAxMCxcbiAgICApO1xuICAgIHJldHVybiBydWxlXG4gICAgICAuYWxsKChkKSA9PiAhIXVudGlsIHx8IGQgPCBpbjEwV2Vla3MpXG4gICAgICAuZmlsdGVyKChkYXRlKSA9PiAhZXhkYXRlcy5pbmNsdWRlcyhkYXRlLmdldFRpbWUoKSkpXG4gICAgICAubWFwKChkKSA9PiBmaXhEU1QocG9zdFJSdWxlKG1vbWVudChkKSkpLnRvRGF0ZSgpKTtcbiAgfVxuXG4gIHBhcnNlSWNhbChpY2FsRGF0YTogQ2FsZW5kYXJSZXNwb25zZSwgY291cnNlSWQ6IG51bWJlcik6IENyZWF0ZU9mZmljZUhvdXIge1xuICAgIGNvbnN0IGljYWxEYXRhVmFsdWVzOiBBcnJheTxDYWxlbmRhckNvbXBvbmVudD4gPSBPYmplY3QudmFsdWVzKGljYWxEYXRhKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gaWNhbERhdGFWYWx1ZXMuZmlsdGVyKFxuICAgICAgKGlDYWxFbGVtZW50KTogaUNhbEVsZW1lbnQgaXMgVkV2ZW50ID0+XG4gICAgICAgIGlDYWxFbGVtZW50LnR5cGUgPT09ICdWRVZFTlQnICYmXG4gICAgICAgIGlDYWxFbGVtZW50LnN0YXJ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuZW5kICE9PSB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzRXZlbnRSZWdleCA9IC9cXGJeKE9IfEhvdXJzKVxcYi87XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9mZmljZUhvdXJzID0gb2ZmaWNlSG91cnMuZmlsdGVyKChldmVudCkgPT5cbiAgICAgIG9mZmljZUhvdXJzRXZlbnRSZWdleC50ZXN0KGV2ZW50LnN1bW1hcnkpLFxuICAgICk7XG5cbiAgICBsZXQgcmVzdWx0T2ZmaWNlSG91cnMgPSBbXTtcblxuICAgIGZpbHRlcmVkT2ZmaWNlSG91cnMuZm9yRWFjaCgob2g6IFZFdmVudCkgPT4ge1xuICAgICAgLy8gVGhpcyBvZmZpY2UgaG91ciB0aW1lem9uZS4gQVNTVU1JTkcgZXZlcnkgZGF0ZSBmaWVsZCBoYXMgc2FtZSB0aW1lem9uZSBhcyBvaC5zdGFydFxuICAgICAgY29uc3QgZXZlbnRUWiA9IG9oLnN0YXJ0LnR6O1xuICAgICAgY29uc3QgeyBycnVsZSB9ID0gb2ggYXMgYW55O1xuICAgICAgaWYgKHJydWxlKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gb2guZW5kLmdldFRpbWUoKSAtIG9oLnN0YXJ0LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBhbGxEYXRlcyA9IHRoaXMucnJ1bGVUb0RhdGVzKHJydWxlLCBldmVudFRaLCBvaC5leGRhdGUpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRPZmZpY2VIb3VycyA9IGFsbERhdGVzLm1hcCgoZGF0ZSkgPT4gKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiBkYXRlLFxuICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZHVyYXRpb24pLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzID0gcmVzdWx0T2ZmaWNlSG91cnMuY29uY2F0KGdlbmVyYXRlZE9mZmljZUhvdXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdE9mZmljZUhvdXJzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5zdGFydCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICAgIGVuZFRpbWU6IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvaC5lbmQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdE9mZmljZUhvdXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIE9mZmljZUhvdXJzIGZvciBhIGdpdmVuIENvdXJzZSBieSByZXNjcmFwaW5nIGljYWxcbiAgICogQHBhcmFtIGNvdXJzZSB0byBwYXJzZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGNvdXJzZTogQ291cnNlTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBzY3JhcGluZyBpY2FsIGZvciBjb3Vyc2UgXCIke2NvdXJzZS5uYW1lfVwiKCR7Y291cnNlLmlkfSBhdCB1cmw6ICR7Y291cnNlLmljYWxVUkx9Li4uYCxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZShgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgY291cnNlSWQ6IGNvdXJzZS5pZCwgcm9vbTogJ09ubGluZScgfSxcbiAgICB9KTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbTogJ09ubGluZScsXG4gICAgICAgIGNvdXJzZUlkOiBjb3Vyc2UuaWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IHRoaXMucGFyc2VJY2FsKFxuICAgICAgYXdhaXQgZnJvbVVSTChjb3Vyc2UuaWNhbFVSTCksXG4gICAgICBjb3Vyc2UuaWQsXG4gICAgKTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZGVsZXRlKHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KTtcbiAgICBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuc2F2ZShcbiAgICAgIG9mZmljZUhvdXJzLm1hcCgoZSkgPT4ge1xuICAgICAgICBlLnF1ZXVlSWQgPSBxdWV1ZS5pZDtcbiAgICAgICAgcmV0dXJuIE9mZmljZUhvdXJNb2RlbC5jcmVhdGUoZSk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIGNvbnNvbGUudGltZUVuZChgc2NyYXBlIGNvdXJzZSAke2NvdXJzZS5pZH1gKTtcbiAgICBjb25zb2xlLmxvZygnZG9uZSBzY3JhcGluZyEnKTtcbiAgfVxuXG4gIEBDcm9uKCc1MSAwICogKiAqJylcbiAgcHVibGljIGFzeW5jIHVwZGF0ZUFsbENvdXJzZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNvdXJzZSBpY2FscycpO1xuICAgIGNvbnN0IGNvdXJzZXMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY291cnNlcy5tYXAoKGMpID0+IHRoaXMudXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoYykpKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1pY2FsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbmRvd3MtaWFuYS9kaXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudC10aW1lem9uZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnJ1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmU3Vic2NyaWJlciB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW05vdGlmaWNhdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBEZXNrdG9wTm90aWZTdWJzY3JpYmVyLCBUd2lsaW9TZXJ2aWNlXSxcbiAgZXhwb3J0czogW05vdGlmaWNhdGlvblNlcnZpY2UsIFR3aWxpb1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgQ29ubmVjdGlvbixcbiAgSW5zZXJ0RXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gRGVza3RvcE5vdGlmTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8RGVza3RvcE5vdGlmTW9kZWw+KSB7XG4gICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5RGVza3RvcChcbiAgICAgIGV2ZW50LmVudGl0eSxcbiAgICAgIFwiWW91J3ZlIHN1Y2Nlc3NmdWxseSBzaWduZWQgdXAgZm9yIGRlc2t0b3Agbm90aWZpY2F0aW9ucyFcIixcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCYWRSZXF1ZXN0RXhjZXB0aW9uLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgKiBhcyB3ZWJQdXNoIGZyb20gJ3dlYi1wdXNoJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICcuL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbmV4cG9ydCBjb25zdCBOb3RpZk1zZ3MgPSB7XG4gIHBob25lOiB7XG4gICAgV1JPTkdfTUVTU0FHRTpcbiAgICAgICdQbGVhc2UgcmVzcG9uZCB3aXRoIGVpdGhlciBZRVMgb3IgTk8uIFRleHQgU1RPUCBhdCBhbnkgdGltZSB0byBzdG9wIHJlY2VpdmluZyB0ZXh0IG1lc3NhZ2VzJyxcbiAgICBDT1VMRF9OT1RfRklORF9OVU1CRVI6XG4gICAgICAnQ291bGQgbm90IGZpbmQgYW4gT2ZmaWNlIEhvdXJzIGFjY291bnQgd2l0aCB5b3VyIHBob25lIG51bWJlci4nLFxuICAgIFVOUkVHSVNURVI6XG4gICAgICBcIllvdSd2ZSB1bnJlZ2lzdGVyZWQgZnJvbSB0ZXh0IG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIEZlZWwgZnJlZSB0byByZS1yZWdpc3RlciBhbnkgdGltZSB0aHJvdWdoIHRoZSB3ZWJzaXRlXCIsXG4gICAgRFVQTElDQVRFOlxuICAgICAgXCJZb3UndmUgYWxyZWFkeSBiZWVuIHZlcmlmaWVkIHRvIHJlY2VpdmUgdGV4dCBub3RpZmljYXRpb25zIGZyb20gS2hvdXJ5IE9mZmljZSBIb3VycyFcIixcbiAgICBPSzpcbiAgICAgICdUaGFuayB5b3UgZm9yIHZlcmlmeWluZyB5b3VyIG51bWJlciB3aXRoIEtob3VyeSBPZmZpY2UgSG91cnMhIFlvdSBhcmUgbm93IHNpZ25lZCB1cCBmb3IgdGV4dCBub3RpZmljYXRpb25zIScsXG4gIH0sXG4gIHF1ZXVlOiB7XG4gICAgQUxFUlRfQlVUVE9OOlxuICAgICAgXCJUaGUgVEEgY291bGQndCByZWFjaCB5b3UsIHBsZWFzZSBoYXZlIE1pY3Jvc29mdCBUZWFtcyBvcGVuIGFuZCBjb25maXJtIHlvdSBhcmUgYmFjayFcIixcbiAgICBUSElSRF9QTEFDRTogYFlvdSdyZSAzcmQgaW4gdGhlIHF1ZXVlLiBCZSByZWFkeSBmb3IgYSBUQSB0byBjYWxsIHlvdSBzb29uIWAsXG4gICAgVEFfSElUX0hFTFBFRDogKHRhTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgICBgJHt0YU5hbWV9IGlzIGNvbWluZyB0byBoZWxwIHlvdSFgLFxuICAgIFJFTU9WRUQ6IGBZb3UndmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHF1ZXVlLiBQbGVhc2UgcmV0dXJuIHRvIHRoZSBhcHAgZm9yIG1vcmUgaW5mb3JtYXRpb24uYCxcbiAgfSxcbiAgdGE6IHtcbiAgICBTVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRTpcbiAgICAgICdBIHN0dWRlbnQgaGFzIGpvaW5lZCB5b3VyIChwcmV2aW91c2x5IGVtcHR5KSBxdWV1ZSEnLFxuICB9LFxufTtcblxuLy9UT0RPIHRlc3QgdGhpcyBzZXJ2aWNlIG9tZ1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBkZXNrdG9wUHVibGljS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSxcbiAgKSB7XG4gICAgd2ViUHVzaC5zZXRWYXBpZERldGFpbHMoXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdFTUFJTCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQUklWQVRFS0VZJyksXG4gICAgKTtcbiAgICB0aGlzLmRlc2t0b3BQdWJsaWNLZXkgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKTtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcChcbiAgICBpbmZvOiBEZWVwUGFydGlhbDxEZXNrdG9wTm90aWZNb2RlbD4sXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmTW9kZWw+IHtcbiAgICAvLyBjcmVhdGUgaWYgbm90IGV4aXN0XG4gICAgbGV0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQ6IGluZm8udXNlcklkLCBlbmRwb2ludDogaW5mby5lbmRwb2ludCB9LFxuICAgIH0pO1xuICAgIGlmICghZG4pIHtcbiAgICAgIGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuY3JlYXRlKGluZm8pLnNhdmUoKTtcbiAgICAgIGF3YWl0IGRuLnJlbG9hZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZG47XG4gIH1cblxuICBhc3luYyByZWdpc3RlclBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIHVzZXI6IFVzZXJNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZ1bGxOdW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHBob25lTnVtYmVyKTtcbiAgICBpZiAoIWZ1bGxOdW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdwaG9uZSBudW1iZXIgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIGxldCBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICBpZiAocGhvbmVOb3RpZk1vZGVsKSB7XG4gICAgICAvLyBQaG9uZSBudW1iZXIgaGFzIG5vdCBjaGFuZ2VkXG4gICAgICBpZiAocGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID09PSBmdWxsTnVtYmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8ganVzdCBjaGFuZ2UgaXRcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnBob25lTnVtYmVyID0gZnVsbE51bWJlcjtcbiAgICAgICAgcGhvbmVOb3RpZk1vZGVsLnZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHBob25lTm90aWZNb2RlbC5zYXZlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGUoe1xuICAgICAgICBwaG9uZU51bWJlcjogZnVsbE51bWJlcixcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG5cbiAgICAgIC8vIE1VVEFURSBzbyBpZiB1c2VyLnNhdmUoKSBpcyBjYWxsZWQgbGF0ZXIgaXQgZG9lc24ndCBkaXMtYXNzb2NpYXRlXG4gICAgICB1c2VyLnBob25lTm90aWYgPSBwaG9uZU5vdGlmTW9kZWw7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5ub3RpZnlQaG9uZShcbiAgICAgIHBob25lTm90aWZNb2RlbCxcbiAgICAgIFwiWW91J3ZlIHNpZ25lZCB1cCBmb3IgcGhvbmUgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gVG8gdmVyaWZ5IHlvdXIgbnVtYmVyLCBwbGVhc2UgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBZRVMuIFRvIHVuc3Vic2NyaWJlLCByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIE5PIG9yIFNUT1BcIixcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIC8vIE5vdGlmeSB1c2VyIG9uIGFsbCBwbGF0Zm9ybXNcbiAgYXN5bmMgbm90aWZ5VXNlcih1c2VySWQ6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm90aWZNb2RlbHNPZlVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczogWydkZXNrdG9wTm90aWZzJywgJ3Bob25lTm90aWYnXSxcbiAgICB9KTtcblxuICAgIC8vIHJ1biB0aGUgcHJvbWlzZXMgY29uY3VycmVudGx5XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnNFbmFibGVkKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgbm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmcy5tYXAoYXN5bmMgKG5tKSA9PlxuICAgICAgICAgIHRoaXMubm90aWZ5RGVza3RvcChubSwgbWVzc2FnZSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiAmJiBub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubm90aWZ5UGhvbmUobm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZiwgbWVzc2FnZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgZGVza3RvcCBub3RpZmljYXRpb25cbiAgYXN5bmMgbm90aWZ5RGVza3RvcChubTogRGVza3RvcE5vdGlmTW9kZWwsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3ZWJQdXNoLnNlbmROb3RpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlbmRwb2ludDogbm0uZW5kcG9pbnQsXG4gICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgcDI1NmRoOiBubS5wMjU2ZGgsXG4gICAgICAgICAgICBhdXRoOiBubS5hdXRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUobm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmaWVzIGEgdXNlciB2aWEgcGhvbmUgbnVtYmVyXG4gIGFzeW5jIG5vdGlmeVBob25lKFxuICAgIHBuOiBQaG9uZU5vdGlmTW9kZWwsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZvcmNlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZm9yY2UgfHwgcG4udmVyaWZpZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5zZW5kU01TKHBuLnBob25lTnVtYmVyLCBtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2JsZW0gc2VuZGluZyBtZXNzYWdlJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeVBob25lKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcGhvbmVOb3RpZiA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHBob25lTnVtYmVyOiBwaG9uZU51bWJlciB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFwaG9uZU5vdGlmKSB7XG4gICAgICBhcG0uc2V0Q3VzdG9tQ29udGV4dCh7IHBob25lTnVtYmVyIH0pO1xuICAgICAgYXBtLmNhcHR1cmVFcnJvcihcbiAgICAgICAgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwaG9uZSBudW1iZXIgZHVyaW5nIHZlcmlmaWNhdGlvbicpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuQ09VTERfTk9UX0ZJTkRfTlVNQkVSO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSAhPT0gJ1lFUycgJiYgbWVzc2FnZSAhPT0gJ05PJyAmJiBtZXNzYWdlICE9PSAnU1RPUCcpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuV1JPTkdfTUVTU0FHRTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT09ICdOTycgfHwgbWVzc2FnZSA9PT0gJ1NUT1AnKSB7XG4gICAgICAvLyBkaWQgc29tZSBtb3JlIGRpZ2dpbmcsIFNUT1AganVzdCBzdG9wcyBtZXNzYWdlcyBjb21wbGV0ZWx5LCB3ZSdsbCBuZXZlciByZWNlaXZlIGl0XG4gICAgICAvLyBzbyB1aC4uLiB0aGVyZSdzIHByb2JhYmx5IGEgd2F5IHRvIGRvIHRoYXRcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUocGhvbmVOb3RpZik7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLlVOUkVHSVNURVI7XG4gICAgfSBlbHNlIGlmIChwaG9uZU5vdGlmLnZlcmlmaWVkKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkRVUExJQ0FURTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZi52ZXJpZmllZCA9IHRydWU7XG4gICAgICBhd2FpdCBwaG9uZU5vdGlmLnNhdmUoKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuT0s7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWItcHVzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdHdpbGlvIFNESyB0byBtYWtlIHRlc3RpbmcgZWFzaWVyLlxuICogU2hvdWxkIE5PVCBpbnRlcmFjdCB3aXRoIERCIG1vZGVscyBvciBkbyBhbnl0aGluZyBzbWFydC4gSnVzdCB3cmFwIFR3aWxpby5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR3aWxpb1NlcnZpY2Uge1xuICBwcml2YXRlIHR3aWxpb0NsaWVudDogdHdpbGlvLlR3aWxpbztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnR3aWxpb0NsaWVudCA9IHR3aWxpbyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FDQ09VTlRTSUQnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZ1bGwgcGhvbmUgbnVtYmVyIG9yIHJldHVybiBmYWxzZSBpZiBwaG9uZSBudW1iZXIgaXNuJ3QgcmVhbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZ1bGxQaG9uZU51bWJlcihcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubG9va3Vwcy5waG9uZU51bWJlcnMocGhvbmVOdW1iZXIpLmZldGNoKCkpXG4gICAgICAgIC5waG9uZU51bWJlcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGlmIHRoZSBwaG9uZSBudW1iZXIgaXMgbm90IGZvdW5kLCB0aGVuIGVuZHBvaW50IHNob3VsZCByZXR1cm4gaW52YWxpZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIFNNUyB0byBwaG9uZSBudW1iZXIgdXNpbmcgb3VyIFR3aWxpbyBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kU01TKHBob25lTnVtYmVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPUEhPTkVOVU1CRVInKSxcbiAgICAgIHRvOiBwaG9uZU51bWJlcixcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpbGlvXCIpOyIsImltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBIZWFkZXIsXG4gIEhlYWRlcnMsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZCb2R5LCBEZXNrdG9wTm90aWZQYXJ0aWFsLCBUd2lsaW9Cb2R5IH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdub3RpZmljYXRpb25zJylcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVza3RvcC9jcmVkZW50aWFscycpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBnZXREZXNrdG9wQ3JlZGVudGlhbHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5ub3RpZlNlcnZpY2UuZGVza3RvcFB1YmxpY0tleSk7XG4gIH1cblxuICBAUG9zdCgnZGVza3RvcC9kZXZpY2UnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IERlc2t0b3BOb3RpZkJvZHksXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZlBhcnRpYWw+IHtcbiAgICBjb25zdCBkZXZpY2UgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlckRlc2t0b3Aoe1xuICAgICAgZW5kcG9pbnQ6IGJvZHkuZW5kcG9pbnQsXG4gICAgICBleHBpcmF0aW9uVGltZTogYm9keS5leHBpcmF0aW9uVGltZSAmJiBuZXcgRGF0ZShib2R5LmV4cGlyYXRpb25UaW1lKSxcbiAgICAgIHAyNTZkaDogYm9keS5rZXlzLnAyNTZkaCxcbiAgICAgIGF1dGg6IGJvZHkua2V5cy5hdXRoLFxuICAgICAgbmFtZTogYm9keS5uYW1lLFxuICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXZpY2UuaWQsXG4gICAgICBlbmRwb2ludDogZGV2aWNlLmVuZHBvaW50LFxuICAgICAgY3JlYXRlZEF0OiBkZXZpY2UuY3JlYXRlZEF0LFxuICAgICAgbmFtZTogZGV2aWNlLm5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIEBEZWxldGUoJ2Rlc2t0b3AvZGV2aWNlLzpkZXZpY2VJZCcpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyBkZWxldGVEZXNrdG9wVXNlcihcbiAgICBAUGFyYW0oJ2RldmljZUlkJykgZGV2aWNlSWQ6IG51bWJlcixcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRuID0gYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwuZmluZCh7IGlkOiBkZXZpY2VJZCwgdXNlcklkIH0pO1xuICAgIGlmIChkbi5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5yZW1vdmUoZG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZWJob29rIGZyb20gdHdpbGlvXG4gIEBQb3N0KCcvcGhvbmUvdmVyaWZ5JylcbiAgQEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sJylcbiAgYXN5bmMgdmVyaWZ5UGhvbmVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogVHdpbGlvQm9keSxcbiAgICBASGVhZGVycygneC10d2lsaW8tc2lnbmF0dXJlJykgdHdpbGlvU2lnbmF0dXJlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGJvZHkuQm9keS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBzZW5kZXJOdW1iZXIgPSBib2R5LkZyb207XG5cbiAgICBjb25zdCB0d2lsaW9BdXRoVG9rZW4gPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKTtcblxuICAgIGNvbnN0IGlzVmFsaWRhdGVkID0gdHdpbGlvLnZhbGlkYXRlUmVxdWVzdChcbiAgICAgIHR3aWxpb0F1dGhUb2tlbixcbiAgICAgIHR3aWxpb1NpZ25hdHVyZS50cmltKCksXG4gICAgICBgJHt0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKX0vYXBpL3YxL25vdGlmaWNhdGlvbnMvcGhvbmUvdmVyaWZ5YCxcbiAgICAgIGJvZHksXG4gICAgKTtcblxuICAgIGlmICghaXNWYWxpZGF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ01lc3NhZ2Ugbm90IGZyb20gVHdpbGlvJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZVRvVXNlciA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnZlcmlmeVBob25lKFxuICAgICAgc2VuZGVyTnVtYmVyLFxuICAgICAgbWVzc2FnZSxcbiAgICApO1xuICAgIGNvbnN0IE1lc3NhZ2luZ1Jlc3BvbnNlID0gdHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IE1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlVG9Vc2VyKTtcblxuICAgIHJldHVybiB0d2ltbC50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xvZ2luLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSnd0U3RyYXRlZ3kgfSBmcm9tICcuLi9sb2dpbi9qd3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSnd0TW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXG4gICAgICBpbmplY3Q6IFtDb25maWdTZXJ2aWNlXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGFzeW5jIChjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSA9PiAoe1xuICAgICAgICBzZWNyZXQ6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtMb2dpbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtKd3RTdHJhdGVneSwgTG9naW5Db3Vyc2VTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEJvZHksXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBvc3QsXG4gIFF1ZXJ5LFxuICBSZXEsXG4gIFJlcyxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBKd3RTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHtcbiAgS2hvdXJ5RGF0YVBhcmFtcyxcbiAgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSxcbiAgS2hvdXJ5U3R1ZGVudENvdXJzZSxcbiAgS2hvdXJ5VEFDb3Vyc2UsXG4gIFJvbGUsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBodHRwU2lnbmF0dXJlIGZyb20gJ2h0dHAtc2lnbmF0dXJlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uLy4uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGxvZ2luQ291cnNlU2VydmljZTogTG9naW5Db3Vyc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgand0U2VydmljZTogSnd0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAUG9zdCgnL2tob3VyeV9sb2dpbicpXG4gIGFzeW5jIHJlY2lldmVEYXRhRnJvbUtob3VyeShcbiAgICBAUmVxKCkgcmVxOiBSZXF1ZXN0LFxuICAgIEBCb2R5KCkgYm9keTogS2hvdXJ5RGF0YVBhcmFtcyxcbiAgKTogUHJvbWlzZTxLaG91cnlSZWRpcmVjdFJlc3BvbnNlPiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIENoZWNrIHRoYXQgcmVxdWVzdCBoYXMgY29tZSBmcm9tIEtob3VyeVxuICAgICAgY29uc3QgcGFyc2VkUmVxdWVzdCA9IGh0dHBTaWduYXR1cmUucGFyc2VSZXF1ZXN0KHJlcSk7XG4gICAgICBjb25zdCB2ZXJpZnkgPSBodHRwU2lnbmF0dXJlLnZlcmlmeUhNQUMoXG4gICAgICAgIHBhcnNlZFJlcXVlc3QsXG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0tIT1VSWV9QUklWQVRFX0tFWScpLFxuICAgICAgKTtcbiAgICAgIGlmICghdmVyaWZ5KSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ0ludmFsaWQgcmVxdWVzdCBzaWduYXR1cmUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdXNlcjogVXNlck1vZGVsO1xuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogYm9keS5lbWFpbCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoeyBjb3Vyc2VzOiBbXSB9KTtcbiAgICB9XG5cbiAgICAvLyBROiBEbyB3ZSBuZWVkIHRoaXMgaWYgaXQncyBub3QgZ29pbmcgdG8gY2hhbmdlP1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHtcbiAgICAgIGVtYWlsOiBib2R5LmVtYWlsLFxuICAgICAgbmFtZTogYm9keS5maXJzdF9uYW1lICsgJyAnICsgYm9keS5sYXN0X25hbWUsXG4gICAgICBwaG90b1VSTDogJycsXG4gICAgfSk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgICAgICAgIGMuY291cnNlLFxuICAgICAgICAgIGMuc2VjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgY29uc3QgdXNlckNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2UuaWQsXG4gICAgICAgICAgICBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHVzZXJDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LnRhX2NvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlUQUNvdXJzZSkgPT4ge1xuICAgICAgICAvLyBRdWVyeSBmb3IgYWxsIHRoZSBjb3Vyc2VzIHdoaWNoIG1hdGNoIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmljIGNvdXJzZSBmcm9tIEtob3VyeVxuICAgICAgICBjb25zdCBjb3Vyc2VNYXBwaW5ncyA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZCh7XG4gICAgICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGMuY291cnNlIH0sIC8vIFRPRE86IEFkZCBzZW1lc3RlciBzdXBwb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgY291cnNlTWFwcGluZyBvZiBjb3Vyc2VNYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IHRhQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoXG4gICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgeyBleHBpcmVzSW46IDUgKiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7IHVzZXJJZCB9KTtcbiAgICBjb25zdCBpc1NlY3VyZSA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgLmdldDxzdHJpbmc+KCdET01BSU4nKVxuICAgICAgLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgcmVzXG4gICAgICAuY29va2llKCdhdXRoX3Rva2VuJywgYXV0aFRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGlzU2VjdXJlIH0pXG4gICAgICAucmVkaXJlY3QoMzAyLCAnLycpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgVXNlR3VhcmRzLCBQYXRjaCwgQm9keSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuICBEZXNrdG9wTm90aWZQYXJ0aWFsLFxuICBHZXRQcm9maWxlUmVzcG9uc2UsXG4gIFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgaWYgKFxuICAgICAgdXNlci5waG9uZU5vdGlmc0VuYWJsZWQgJiZcbiAgICAgIHVzZXJQYXRjaC5waG9uZU51bWJlciAhPT0gdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlclxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJQaG9uZSh1c2VyUGF0Y2gucGhvbmVOdW1iZXIsIHVzZXIpO1xuICAgIH1cbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIHJldHVybiB0aGlzLmdldCh1c2VyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sbGVyIH0gZnJvbSAnLi9xdWVzdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXN0aW9uU3Vic2NyaWJlciB9IGZyb20gJy4vcXVlc3Rpb24uc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXN0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1F1ZXN0aW9uU3Vic2NyaWJlcl0sXG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGUsIFF1ZXVlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSxcbiAgR2V0UXVlc3Rpb25SZXNwb25zZSxcbiAgTGltYm9RdWVzdGlvblN0YXR1cyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvblN0YXR1c0tleXMsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICBVcGRhdGVRdWVzdGlvblJlc3BvbnNlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyLCBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvblJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXN0aW9uLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3F1ZXN0aW9ucycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVlc3Rpb25Sb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVlc3Rpb25JZCcpXG4gIGFzeW5jIGdldFF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxHZXRRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgQFBvc3QoKVxuICBAUm9sZXMoUm9sZS5TVFVERU5UKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpIGJvZHk6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCB7IHRleHQsIHF1ZXN0aW9uVHlwZSwgcXVldWVJZCwgZm9yY2UgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdQb3N0ZWQgdG8gYW4gaW52YWxpZCBxdWV1ZScpO1xuICAgIH1cblxuICAgIGlmICghcXVldWUuYWxsb3dRdWVzdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdRdWV1ZSBub3QgYWxsb3dpbmcgbmV3IHF1ZXN0aW9ucycpO1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ1F1ZXVlIGlzIGNsb3NlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzVXNlclF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGNyZWF0b3JJZDogdXNlci5pZCxcbiAgICAgICAgc3RhdHVzOiBJbihPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cykpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmICghIXByZXZpb3VzVXNlclF1ZXN0aW9uKSB7XG4gICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgcHJldmlvdXNVc2VyUXVlc3Rpb24uc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZDtcbiAgICAgICAgYXdhaXQgcHJldmlvdXNVc2VyUXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgXCJZb3UgY2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiBvbmUgcXVlc3Rpb24gYXQgYSB0aW1lLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoe1xuICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgIGNyZWF0b3I6IHVzZXIsXG4gICAgICB0ZXh0LFxuICAgICAgcXVlc3Rpb25UeXBlLFxuICAgICAgc3RhdHVzOiBRdWVzdGlvblN0YXR1c0tleXMuRHJhZnRpbmcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc09ubGluZTogdHJ1ZSxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUGF0Y2goJzpxdWVzdGlvbklkJylcbiAgQFJvbGVzKFJvbGUuU1RVREVOVCwgUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIC8vIFRPRE86IFVzZSBxdWV1ZVJvbGUgZGVjb3JhdG9yLCBidXQgd2UgbmVlZCB0byBmaXggaXRzIHBlcmZvcm1hbmNlIGZpcnN0XG4gIGFzeW5jIHVwZGF0ZVF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxVcGRhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgbGV0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWVzdGlvbklkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICdxdWV1ZScsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NyZWF0b3IgPSB1c2VySWQgPT09IHF1ZXN0aW9uLmNyZWF0b3JJZDtcblxuICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgIC8vIEZhaWwgaWYgc3R1ZGVudCB0cmllcyBhbiBpbnZhbGlkIHN0YXR1cyBjaGFuZ2VcbiAgICAgIGlmIChib2R5LnN0YXR1cyAmJiAhcXVlc3Rpb24uY2hhbmdlU3RhdHVzKGJvZHkuc3RhdHVzLCBSb2xlLlNUVURFTlQpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgYFN0dWRlbnQgY2Fubm90IGNoYW5nZSBzdGF0dXMgZnJvbSAke3F1ZXN0aW9uLnN0YXR1c30gdG8gJHtib2R5LnN0YXR1c31gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcXVlc3Rpb24gPSBPYmplY3QuYXNzaWduKHF1ZXN0aW9uLCBib2R5KTtcbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9XG5cbiAgICAvLyBJZiBub3QgY3JlYXRvciwgY2hlY2sgaWYgdXNlciBpcyBUQS9QUk9GIG9mIGNvdXJzZSBvZiBxdWVzdGlvblxuICAgIGNvbnN0IGlzVGFPclByb2YgPVxuICAgICAgKGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jb3VudCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNvdXJzZUlkOiBxdWVzdGlvbi5xdWV1ZS5jb3Vyc2VJZCxcbiAgICAgICAgICByb2xlOiBJbihbUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1JdKSxcbiAgICAgICAgfSxcbiAgICAgIH0pKSA+IDA7XG5cbiAgICBpZiAoaXNUYU9yUHJvZikge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGJvZHkpLmxlbmd0aCAhPT0gMSB8fCBPYmplY3Qua2V5cyhib2R5KVswXSAhPT0gJ3N0YXR1cycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAnVEEvUHJvZmVzc29ycyBjYW4gb25seSBlZGl0IHF1ZXN0aW9uIHN0YXR1cycsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRTdGF0dXMgPSBxdWVzdGlvbi5zdGF0dXM7XG4gICAgICBjb25zdCBuZXdTdGF0dXMgPSBib2R5LnN0YXR1cztcbiAgICAgIC8vIElmIHRoZSB0YUhlbHBlZCBpcyBhbHJlYWR5IHNldCwgbWFrZSBzdXJlIHRoZSBzYW1lIHRhIHVwZGF0ZXMgdGhlIHN0YXR1c1xuICAgICAgaWYgKHF1ZXN0aW9uLnRhSGVscGVkPy5pZCAhPT0gdXNlcklkKSB7XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgICdBbm90aGVyIFRBIGlzIGN1cnJlbnRseSBoZWxwaW5nIHdpdGggdGhpcyBxdWVzdGlvbicsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3RhdHVzID09PSBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgICAnQW5vdGhlciBUQSBoYXMgYWxyZWFkeSByZXNvbHZlZCB0aGlzIHF1ZXN0aW9uJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzQWxyZWFkeUhlbHBpbmdPbmUgPVxuICAgICAgICAoYXdhaXQgUXVlc3Rpb25Nb2RlbC5jb3VudCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHRhSGVscGVkSWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIHN0YXR1czogT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpID09PSAxO1xuICAgICAgaWYgKGlzQWxyZWFkeUhlbHBpbmdPbmUgJiYgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbignVEEgaXMgYWxyZWFkeSBoZWxwaW5nIHNvbWVvbmUgZWxzZScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZFRyYW5zaXRpb24gPSBxdWVzdGlvbi5jaGFuZ2VTdGF0dXMobmV3U3RhdHVzLCBSb2xlLlRBKTtcbiAgICAgIGlmICghdmFsaWRUcmFuc2l0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgYFRBIGNhbm5vdCBjaGFuZ2Ugc3RhdHVzIGZyb20gJHtxdWVzdGlvbi5zdGF0dXN9IHRvICR7Ym9keS5zdGF0dXN9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IFRBIGFzIHRhSGVscGVkIHdoZW4gdGhlIFRBIHN0YXJ0cyBoZWxwaW5nIHRoZSBzdHVkZW50XG4gICAgICBpZiAoXG4gICAgICAgIG9sZFN0YXR1cyAhPT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcgJiZcbiAgICAgICAgbmV3U3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZ1xuICAgICAgKSB7XG4gICAgICAgIHF1ZXN0aW9uLnRhSGVscGVkID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUodXNlcklkKTtcbiAgICAgICAgcXVlc3Rpb24uaGVscGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlRBX0hJVF9IRUxQRUQocXVlc3Rpb24udGFIZWxwZWQubmFtZSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICdMb2dnZWQtaW4gdXNlciBkb2VzIG5vdCBoYXZlIGVkaXQgYWNjZXNzJyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQFBvc3QoJzpxdWVzdGlvbklkL25vdGlmeScpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgbm90aWZ5KEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZSddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuQUxFUlRfQlVUVE9OLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlJFTU9WRUQsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBsZXQgcXVldWVJZDtcblxuICAgIGlmIChyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWVzdGlvbklkKTtcbiAgICAgIGlmICghcXVlc3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdRdWVzdGlvbiBub3QgZm91bmQnKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSWQgPSBxdWVzdGlvbi5xdWV1ZUlkO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdC5ib2R5LnF1ZXVlSWQpIHtcbiAgICAgIC8vIElmIHlvdSBhcmUgY3JlYXRpbmcgYSBuZXcgcXVlc3Rpb25cbiAgICAgIHF1ZXVlSWQgPSByZXF1ZXN0LmJvZHkucXVldWVJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ0Nhbm5vdCBmaW5kIHF1ZXVlIG9mIHF1ZXN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCk7XG5cbiAgICAvLyBZb3UgY2Fubm90IGludGVyYWN0IHdpdGggYSBxdWVzdGlvbiBpbiBhIG5vbmV4aXN0ZW50IHF1ZXVlXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdUaGlzIHF1ZXVlIGRvZXMgbm90IGV4aXN0IScpO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsIE9wZW5RdWVzdGlvblN0YXR1cyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBJbnNlcnRFdmVudCxcbiAgUmVtb3ZlRXZlbnQsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uU3Vic2NyaWJlclxuICBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVlc3Rpb25Nb2RlbD4ge1xuICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoXG4gICAgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWVzdGlvbk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcblxuICAgIC8vIFNlbmQgcHVzaCBub3RpZmljYXRpb24gdG8gc3R1ZGVudHMgd2hlbiB0aGV5IGFyZSBoaXQgM3JkIGluIGxpbmVcbiAgICAvLyBpZiBzdGF0dXMgdXBkYXRlZCB0byBjbG9zZWRcbiAgICBpZiAoXG4gICAgICBldmVudC51cGRhdGVkQ29sdW1ucy5maW5kKChjKSA9PiBjLnByb3BlcnR5TmFtZSA9PT0gJ3N0YXR1cycpICYmXG4gICAgICBldmVudC5lbnRpdHkuc3RhdHVzIGluIENsb3NlZFF1ZXN0aW9uU3RhdHVzXG4gICAgKSB7XG4gICAgICAvLyBnZXQgM3JkIGluIHF1ZXVlIGJlZm9yZSBhbmQgYWZ0ZXIgdGhpcyB1cGRhdGVcbiAgICAgIGNvbnN0IHByZXZpb3VzVGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKFxuICAgICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICAgIClcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBjb25zdCB0aGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwub3BlbkluUXVldWUoZXZlbnQuZW50aXR5LnF1ZXVlSWQpXG4gICAgICAgIC5zZXRRdWVyeVJ1bm5lcihldmVudC5xdWVyeVJ1bm5lcikgLy8gUnVuIGluIHNhbWUgdHJhbnNhY3Rpb24gYXMgdGhlIHVwZGF0ZVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGlmICh0aGlyZCAmJiBwcmV2aW91c1RoaXJkPy5pZCAhPT0gdGhpcmQ/LmlkKSB7XG4gICAgICAgIGNvbnN0IHsgY3JlYXRvcklkIH0gPSB0aGlyZDtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihjcmVhdG9ySWQsIE5vdGlmTXNncy5xdWV1ZS5USElSRF9QTEFDRSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbnVtYmVyT2ZRdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKFxuICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgKVxuICAgICAgLmFuZFdoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5vcGVuU3RhdHVzKScsIHtcbiAgICAgICAgb3BlblN0YXR1czogW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZywgT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZF0sXG4gICAgICB9KVxuICAgICAgLmdldENvdW50KCk7XG5cbiAgICBpZiAobnVtYmVyT2ZRdWVzdGlvbnMgPT09IDApIHtcbiAgICAgIGNvbnN0IHN0YWZmID0gKFxuICAgICAgICBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoZXZlbnQuZW50aXR5LnF1ZXVlSWQsIHtcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgICAgIH0pXG4gICAgICApLnN0YWZmTGlzdDtcblxuICAgICAgc3RhZmYuZm9yRWFjaCgoc3RhZmYpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBzdGFmZi5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MudGEuU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICB9XG5cbiAgYXN5bmMgYmVmb3JlUmVtb3ZlKGV2ZW50OiBSZW1vdmVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGR1ZSB0byBjYXNjYWRlcyBlbnRpdHkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgbG9hZGVkXG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU2VlZENvbnRyb2xsZXIgfSBmcm9tICcuL3NlZWQuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbU2VlZENvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtTZWVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZWRNb2R1bGUge31cbiIsImltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7XG4gIE9mZmljZUhvdXJGYWN0b3J5LFxuICBRdWVzdGlvbkZhY3RvcnksXG4gIFF1ZXVlRmFjdG9yeSxcbiAgVXNlckNvdXJzZUZhY3RvcnksXG4gIFNlbWVzdGVyRmFjdG9yeSxcbiAgQ291cnNlRmFjdG9yeSxcbiAgVXNlckZhY3RvcnksXG59IGZyb20gJy4uLy4uL3Rlc3QvdXRpbC9mYWN0b3JpZXMnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IE5vblByb2R1Y3Rpb25HdWFyZCB9IGZyb20gJy4uL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5AQ29udHJvbGxlcignc2VlZHMnKVxuQFVzZUd1YXJkcyhOb25Qcm9kdWN0aW9uR3VhcmQpXG5leHBvcnQgY2xhc3MgU2VlZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBzZWVkU2VydmljZTogU2VlZFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZWxldGUnKVxuICBhc3luYyBkZWxldGVBbGwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChPZmZpY2VIb3VyTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXN0aW9uTW9kZWwpO1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKFF1ZXVlTW9kZWwpO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSByZXNldCc7XG4gIH1cblxuICBAR2V0KCdjcmVhdGUnKVxuICBhc3luYyBjcmVhdGVTZWVkcygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEZpcnN0IGRlbGV0ZSB0aGUgb2xkIGRhdGFcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZUFsbCgpO1xuXG4gICAgLy8gVGhlbiBhZGQgdGhlIG5ldyBzZWVkIGRhdGFcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgLSAyNCk7XG5cbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgdG9tb3Jyb3cuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgKyAxOSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXlPdmVybGFwID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSAtIDQ1MDAwMDApLFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDEwMDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzWWVzdGVyZGF5ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogeWVzdGVyZGF5LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUoeWVzdGVyZGF5LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9tb3Jyb3cgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB0b21vcnJvdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHRvbW9ycm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY291cnNlRXhpc3RzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICB9KTtcbiAgICBpZiAoIWNvdXJzZUV4aXN0cykge1xuICAgICAgYXdhaXQgU2VtZXN0ZXJGYWN0b3J5LmNyZWF0ZSh7IHNlYXNvbjogJ0ZhbGwnLCB5ZWFyOiAyMDIwIH0pO1xuICAgICAgYXdhaXQgQ291cnNlRmFjdG9yeS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgICAgcmVsYXRpb25zOiBbJ29mZmljZUhvdXJzJ10sXG4gICAgfSk7XG5cbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBbXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgXTtcbiAgICBjb3Vyc2Uuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckV4c2lzdHMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSgpO1xuICAgIGlmICghdXNlckV4c2lzdHMpIHtcbiAgICAgIC8vIFN0dWRlbnQgMVxuICAgICAgY29uc3QgdXNlcjEgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2xpdS5zdGFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdTdGFubGV5IExpdScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUjIwQ0czNkUtY2YwZjM3NTI1MmJkLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIxLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBTdHVuZGVudCAyXG4gICAgICBjb25zdCB1c2VyMiA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAndGFrYXlhbWEuYUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0FsZXggVGFrYXlhbWEnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUpMOTc0NDNELTUwMTIxMzM5Njg2Yi01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMixcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMVxuICAgICAgY29uc3QgdXNlcjMgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3N0ZW56ZWwud0Bub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1dpbGwgU3RlbnplbCcsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VUkYyNTZLUlQtZDEwMDk4ZTg3OWRhLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIzLFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gVEEgMlxuICAgICAgY29uc3QgdXNlcjQgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ2NodS5kYWpAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdEYS1KaW4gQ2h1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVFNTZZNVVUMS04NWRiNTlhNDc0ZjQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjQsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHJvb206ICdXSFYgMTAxJyxcbiAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgb2ZmaWNlSG91cnM6IFtcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgICAgb2ZmaWNlSG91cnNZZXN0ZXJkYXksXG4gICAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgICAgXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDI1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAR2V0KCdmaWxsX3F1ZXVlJylcbiAgYXN5bmMgZmlsbFF1ZXVlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoKTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVVzZXInKVxuICBhc3luYyBjcmVhdGVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogeyByb2xlOiBSb2xlOyBjb3Vyc2VJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHRhOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSwgY291cnNlOiBjb3Vyc2UgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGE7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVldWUnKVxuICBhc3luYyBjcmVhdGVRdWV1ZShcbiAgICBAQm9keSgpIGJvZHk6IHsgY291cnNlSWQ6IG51bWJlcjsgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW4gfSxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgbGV0IHF1ZXVlOiBRdWV1ZU1vZGVsO1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgICAgb2ZmaWNlSG91cnM6IFtvZmZpY2VIb3Vyc10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBib2R5LmFsbG93UXVlc3Rpb25zID8/IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogYm9keS5hbGxvd1F1ZXN0aW9ucyA/PyBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVlc3Rpb24nKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpIGJvZHk6IHsgcXVldWVJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIGxldCBxdWVzdGlvbjogUXVlc3Rpb25Nb2RlbDtcbiAgICBpZiAoYm9keS5xdWV1ZUlkKSB7XG4gICAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnF1ZXVlSWQpO1xuICAgICAgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsIGBXVkggMTAxYClcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cignYWxsb3dRdWVzdGlvbnMnLCBmYWxzZSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSk7XG5cbi8vIFdBUk5JTkc6IERPIE5PVCBVU0UgQ1JFQVRPUklELiBBUyBZT1UgU0VFIEhFUkUsIFdFIE9OTFkgQUNDRVBUIENSRUFUT1Jcbi8vVE9ETzogbWFrZSBpdCBhY2NlcHQgY3JlYXRvcklkIGFzIHdlbGxcbmV4cG9ydCBjb25zdCBRdWVzdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWVzdGlvbk1vZGVsKVxuICAuc2VxdWVuY2UoJ3RleHQnLCAoaSkgPT4gYHF1ZXN0aW9uICR7aX1gKVxuICAuYXR0cignc3RhdHVzJywgJ1F1ZXVlZCcpXG4gIC5hdHRyKCdxdWVzdGlvblR5cGUnLCBRdWVzdGlvblR5cGUuT3RoZXIpXG4gIC5hdHRyKCdjcmVhdGVkQXQnLCBuZXcgRGF0ZSgpKVxuICAuYXNzb2NPbmUoJ3F1ZXVlJywgUXVldWVGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NyZWF0b3InLCBVc2VyRmFjdG9yeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtLWZhY3RvcnlcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZWRTZXJ2aWNlIHtcbiAgYXN5bmMgZGVsZXRlQWxsKG1vZGVsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBnZXRDb25uZWN0aW9uKCkuY3JlYXRlUXVlcnlCdWlsZGVyKCkuZGVsZXRlKCkuZnJvbShtb2RlbCkuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LFxuICBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LFxuICBEZWZhdWx0QWRtaW5TaXRlLFxufSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yIH0gZnJvbSAnLi9jcmVkZW50aWFsVmFsaWRhdG9yJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7XG4gIENvdXJzZUFkbWluLFxuICBRdWV1ZUFkbWluLFxuICBVc2VyQWRtaW4sXG4gIFVzZXJDb3Vyc2VBZG1pbixcbiAgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbixcbn0gZnJvbSAnLi9hZG1pbi1lbnRpdGllcyc7XG5pbXBvcnQgeyBBZG1pbkNvbW1hbmQgfSBmcm9tICcuL2FkbWluLmNvbW1hbmQnO1xuXG5jb25zdCBDb3JlTW9kdWxlID0gQWRtaW5Db3JlTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkNvcmVNb2R1bGUoe30pO1xuY29uc3QgQXV0aE1vZHVsZSA9IEFkbWluQXV0aE1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5BdXRoTW9kdWxlKHtcbiAgYWRtaW5Db3JlTW9kdWxlOiBDb3JlTW9kdWxlLFxuICBjcmVkZW50aWFsVmFsaWRhdG9yOiBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IsIC8vIGhvdyBkbyB5b3UgdmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgaW1wb3J0czogW1R5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbQWRtaW5Vc2VyTW9kZWxdKV0sIC8vIHdoYXQgbW9kdWxlcyBleHBvcnQgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgY3JlZGVudGlhbFZhbGlkYXRvciBhdmFpbGFibGVcbiAgcHJvdmlkZXJzOiBbXSxcbn0pO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0FkbWluQ29tbWFuZF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZG1pblNpdGU6IERlZmF1bHRBZG1pblNpdGUpIHtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZScsIENvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXInLCBVc2VyQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlckNvdXJzZScsIFVzZXJDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdRdWV1ZScsIFF1ZXVlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlU2VjdGlvbk1hcHBpbmcnLCBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWFkbWluXCIpOyIsImltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0JztcblxuZXhwb3J0IGNvbnN0IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciA9IHtcbiAgaW5qZWN0OiBbXSxcbiAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNyZWRlbnRpYWxzKFxuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTxBZG1pblVzZXJNb2RlbD4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGlmIChhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIEJhc2VFbnRpdHksIENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuXG4vKipcbiAqIEFkbWluIHVzZXJzIGFyZSB0b3RhbGx5IHNlcGFyYXRlIGZyb20gcmVndWxhciB1c2VycyBhbmQgY2FuIG9ubHkgYmUgY3JlYXRlZCBmcm9tIGNvbW1hbmQgbGluZS5cbiAqIGB5YXJuIGNsaSBhZG1pbjpjcmVhdGVgXG4gKi9cbkBFbnRpdHkoJ2FkbWluX3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEFkbWluVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBzZXRQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgNSk7XG4gIH1cblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIHVuaXF1ZTogdHJ1ZSwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwiaW1wb3J0IHsgQWRtaW5FbnRpdHkgfSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ25hbWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFF1ZXVlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdyb29tJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXTtcbiAgc2VhcmNoRmllbGRzID0gWydlbWFpbCcsICduYW1lJ107XG4gIGZpZWxkcyA9IFtcbiAgICAnaWQnLFxuICAgICdlbWFpbCcsXG4gICAgJ25hbWUnLFxuICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgJ3F1ZXVlcycsXG4gIF07XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3VzZXJJZCcsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ3NlY3Rpb24nLCAnY291cnNlSWQnXTtcbn1cbiIsImltcG9ydCB7IENvbW1hbmQsIFBvc2l0aW9uYWwgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IHF1ZXN0aW9uLCBrZXlJbllOIH0gZnJvbSAncmVhZGxpbmUtc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkNvbW1hbmQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2NyZWF0ZTphZG1pbiA8dXNlcm5hbWU+JyxcbiAgICBkZXNjcmliZTogJ2NyZWF0ZSBhbiBhZG1pbiB1c2VyJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICBkZXNjcmliZTogJ3RoZSBhZG1pbiB1c2VybmFtZScsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9KVxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VQYXNzd29yZCA9IGtleUluWU4oXG4gICAgICAgIGBVc2VyICR7dXNlcm5hbWV9IGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlaXIgcGFzc3dvcmQ/YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlciA9IEFkbWluVXNlck1vZGVsLmNyZWF0ZSh7IHVzZXJuYW1lIH0pO1xuICAgIH1cbiAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nID0gcXVlc3Rpb24oJ1Bhc3N3b3JkOiAnLCB7XG4gICAgICBoaWRlRWNob0JhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgY29uc29sZS5sb2coYENyZWF0ZWQgdXNlcjogJHt1c2VyLnVzZXJuYW1lfWApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZS1zeW5jXCIpOyIsImltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICBdLFxuICBrZWVwQ29ubmVjdGlvbkFsaXZlOiB0cnVlLFxuICBsb2dnaW5nOiAhIXByb2Nlc3MuZW52LlRZUEVPUk1fTE9HR0lORyxcbiAgLi4uKCEhcHJvY2Vzcy5lbnYuVFlQRU9STV9DTEkgPyBpbkNMSSA6IHt9KSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvcm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFja2ZpbGxQaG9uZU5vdGlmcyB9IGZyb20gJy4vYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0JhY2tmaWxsUGhvbmVOb3RpZnNdLFxufSlcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICdub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJ25vdGlmaWNhdGlvbi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFBob25lTm90aWZzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnBob25lLW5vdGlmcycsXG4gICAgZGVzY3JpYmU6XG4gICAgICAnZGVsZXRlIHBob25lIG5vdGlmcyB3aXRoIG5vIHVzZXJpZHMsIGRlbGV0ZSBkdXBsaWNhdGUgcGhvbmUgbm90aWZzLCBhbmQgZm9yY2libHkgc2V0IHZlcmlmaWVkIG9uIGV4aXN0aW5nIHBob25lbm90aWZzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIERlbGV0ZSB0aG9zZSB3aXRob3V0IHVzZXJpZHMgYXNzb2NpYXRlZFxuICAgIGNvbnN0IG5vVXNlciA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUoeyB1c2VySWQ6IElzTnVsbCgpIH0pO1xuICAgIGNvbnNvbGUubG9nKGBkZWxldGVkICR7bm9Vc2VyLmFmZmVjdGVkfSBkZXNrdG9wbm90aWZtb2RlbHMgd2l0aCBubyB1c2VyaWRgKTtcblxuICAgIC8vIGRlbGV0ZSBhdCBvbmNlXG4gICAgY29uc3QgdG9EZWxldGU6IFBob25lTm90aWZNb2RlbFtdID0gW107XG5cbiAgICAvLyBEZWxldGUgZHVwbGljYXRlc1xuICAgIGNvbnN0IGR1cHMgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKCdwbm90aWYnKVxuICAgICAgLnNlbGVjdChbYFwicGhvbmVOdW1iZXJcImAsICdDT1VOVCgqKSddKVxuICAgICAgLmdyb3VwQnkoJ3Bub3RpZi5waG9uZU51bWJlcicpXG4gICAgICAuaGF2aW5nKCdDT1VOVCgqKSA+IDEnKVxuICAgICAgLmdldFJhd01hbnkoKTtcbiAgICBjb25zb2xlLmxvZyhgZm91bmQgJHtkdXBzLmxlbmd0aH0gZHVwc2ApO1xuICAgIHRvRGVsZXRlLnB1c2goLi4uZHVwcyk7XG5cbiAgICBjb25zdCB2YWxpZCA9IFtdO1xuICAgIGxldCBjaGFuZ2VkTnVtID0gMDtcbiAgICAvLyBjaGFuZ2UgdG8gcmVhbCBudW1iZXJcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZCh7IHJlbGF0aW9uczogWyd1c2VyJ10gfSk7XG4gICAgZm9yIChjb25zdCBwIG9mIGFsbCkge1xuICAgICAgY29uc3QgbnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwLnBob25lTnVtYmVyKTtcbiAgICAgIGlmIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciAhPT0gcC5waG9uZU51bWJlcikge1xuICAgICAgICAgIGNoYW5nZWROdW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBwLnBob25lTnVtYmVyID0gbnVtYmVyO1xuICAgICAgICBwLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgICAgdmFsaWQucHVzaChwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvRGVsZXRlLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBUd2lsaW8gY2hhbmdlZCAke2NoYW5nZWROdW19IHBob25lIG51bWJlcnMgdG8gZnVsbCBudW1gKTtcbiAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuc2F2ZSh2YWxpZCk7XG5cbiAgICAvLyBEZWxldGUgYW5kIG1ha2Ugc3VyZSB0byBkaXNhYmxlIHBob25lbm90aWYgZm9yIHVzZXJcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdkZWxldGluZyBwaG9uZSBub3RpZnM6ICcsXG4gICAgICB0b0RlbGV0ZS5tYXAoKGQpID0+IGQucGhvbmVOdW1iZXIpLFxuICAgICk7XG4gICAgaWYgKHRvRGVsZXRlLmxlbmd0aCkge1xuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZSh0b0RlbGV0ZS5tYXAoKGQpID0+IGQuaWQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2Vyc1RvRGlzYWJsZSA9IChcbiAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kKHtcbiAgICAgICAgd2hlcmU6IHsgcGhvbmVOb3RpZnNFbmFibGVkOiB0cnVlIH0sXG4gICAgICAgIHJlbGF0aW9uczogWydwaG9uZU5vdGlmJ10sXG4gICAgICB9KVxuICAgICkuZmlsdGVyKCh1KSA9PiAhdS5waG9uZU5vdGlmKTtcbiAgICB1c2Vyc1RvRGlzYWJsZS5mb3JFYWNoKCh1KSA9PiAodS5waG9uZU5vdGlmc0VuYWJsZWQgPSBmYWxzZSkpO1xuXG4gICAgYXdhaXQgVXNlck1vZGVsLnNhdmUodXNlcnNUb0Rpc2FibGUpO1xuICAgIGNvbnNvbGUubG9nKGBkaXNhYmxlZCBwaG9uZW5vdGlmcyBmb3IgJHt1c2Vyc1RvRGlzYWJsZS5sZW5ndGh9IHVzZXJzYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgSHR0cE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIgfSBmcm9tICcuL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1JlbGVhc2VOb3Rlc0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+ICh7XG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIG1heFJlZGlyZWN0czogNSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIFVzZUd1YXJkcyxcbiAgR2V0LFxuICBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLFxuICBIdHRwU2VydmljZSxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5cbkBDb250cm9sbGVyKCdyZWxlYXNlX25vdGVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0UmVsZWFzZU5vdGVzKCk6IFByb21pc2U8R2V0UmVsZWFzZU5vdGVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZTogR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgPSB7XG4gICAgICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudWxsLFxuICAgICAgcmVsZWFzZU5vdGVzOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5nZXQoXG4gICAgICAgICdodHRwczovL25vdGlvbi1hcGkuc3BsaXRiZWUuaW8vdjEvcGFnZS9hYmJhMjQ2YmZhMDg0N2JhYTI3MDZhYjMwZDBjNmM3ZCcsXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gICAgY29uc3QgZGF0YSA9IHJlcXVlc3QuZGF0YTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZVRleHQgPVxuICAgICAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXT8udmFsdWU/LnByb3BlcnRpZXNcbiAgICAgICAgICA/LnRpdGxlWzBdWzBdO1xuICAgICAgcmVzcG9uc2UubGFzdFVwZGF0ZWRVbml4VGltZSA9IHRpbWVUZXh0LnNwbGl0KCdVbml4ICcpWzFdICogMTAwMDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbihcbiAgICAgICAgJ0Vycm9yIFBhcnNpbmcgcmVsZWFzZSBub3RlcyB0aW1lOiAnICsgZSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgdGltZSBibG9jayBhbmQgcGFnZSBsaW5rIGJsb2NrIGZyb20gcGFnZVxuICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICBkYXRhWyc0ZDI1ZjM5My1lNTcwLTRjZDUtYWQ2Ni1iMjc4YTA5MjQyMjUnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgcmVzcG9uc2UucmVsZWFzZU5vdGVzID0gZGF0YTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUsIEFyZ3VtZW50TWV0YWRhdGEgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbi8qKlxuICogU3RyaXAgdW5kZWZpbmVkIHByb3BlcnRpZXMgZnJvbSBib2R5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RyaXBVbmRlZmluZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBtZXRhZGF0YTogQXJndW1lbnRNZXRhZGF0YSk6IGFueSB7XG4gICAgaWYgKG1ldGFkYXRhLnR5cGUgPT09ICdib2R5Jykge1xuICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkcm9wVW5kZWZpbmVkKG9iajogdW5rbm93bikge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0JyAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3BVbmRlZmluZWQob2JqW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTmVzdEludGVyY2VwdG9yLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBDYWxsSGFuZGxlcixcbiAgSHR0cEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwbUludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgaW50ZXJjZXB0KFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsXG4gICAgbmV4dDogQ2FsbEhhbmRsZXIsXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvbikge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9