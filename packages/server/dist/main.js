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
const stripUndefined_pipe_1 = __webpack_require__(98);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(99);
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
const release_notes_module_1 = __webpack_require__(96);
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
const class_transformer_1 = __webpack_require__(15);
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
                return class_transformer_1.classToClass(question_entity_1.QuestionModel.create(Object.assign(Object.assign({}, question), { creator })));
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
                if (!question.firstHelpedAt) {
                    question.firstHelpedAt = question.helpedAt;
                }
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
const question_first_helped_at_command_1 = __webpack_require__(95);
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillQuestionFirstHelpedAt = void 0;
const nestjs_command_1 = __webpack_require__(49);
const common_1 = __webpack_require__(5);
const question_entity_1 = __webpack_require__(32);
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
exports.ReleaseNotesModule = void 0;
const common_1 = __webpack_require__(5);
const release_notes_controller_1 = __webpack_require__(97);
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(100);
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
/* 100 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3QtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLWZzbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS1yb2xlcy5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3VhcmRzL3JvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtY29tbWFuZFwiIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaWNhbC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtaWNhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvd3MtaWFuYS9kaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50LXRpbWV6b25lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnJ1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWItcHVzaFwiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR3aWxpb1wiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2p3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHAtc2lnbmF0dXJlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4tY291cnNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC5zdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24tcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC91dGlsL2ZhY3Rvcmllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0eXBlb3JtLWZhY3RvcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtYWRtaW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vY3JlZGVudGlhbFZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLWVudGl0aWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5jb21tYW5kLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWRsaW5lLXN5bmNcIiIsIndlYnBhY2s6Ly8vLi9vcm1jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RyaXBVbmRlZmluZWQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBtLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7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WUFBWSxzQkFBYSxFQUFFO2dCQUNsQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0FnQjFCO0FBaEJZLHdDQUFjOzs7Ozs7O0FDWjNCLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgJ2VsYXN0aWMtYXBtLW5vZGUvc3RhcnQnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnLi9ib290c3RyYXAnO1xuXG5kZWNsYXJlIGNvbnN0IG1vZHVsZTogYW55O1xuXG5ib290c3RyYXAobW9kdWxlLmhvdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIpOyIsImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25QaXBlLCBJTmVzdEFwcGxpY2F0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RyaXBVbmRlZmluZWRQaXBlIH0gZnJvbSAnLi9zdHJpcFVuZGVmaW5lZC5waXBlJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEFwbUludGVyY2VwdG9yIH0gZnJvbSAnLi9hcG0uaW50ZXJjZXB0b3InO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcChob3Q6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlLCB7XG4gICAgbG9nZ2VyOiBbJ2Vycm9yJywgJ3dhcm4nLCAnbG9nJywgJ2RlYnVnJywgJ3ZlcmJvc2UnXSxcbiAgfSk7XG4gIGFkZEdsb2JhbHNUb0FwcChhcHApO1xuICBhcHAuc2V0R2xvYmFsUHJlZml4KCdhcGkvdjEnKTtcbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhuZXcgQXBtSW50ZXJjZXB0b3IoKSk7XG5cbiAgaWYgKGlzUHJvZCgpKSB7XG4gICAgY29uc29sZS5sb2coYFJ1bm5pbmcgcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uYCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyBub24tcHJvZHVjdGlvbiBhdCAke3Byb2Nlc3MuZW52LkRPTUFJTn0uIFRISVMgTVNHIFNIT1VMRCBOT1QgQVBQRUFSIE9OIFBST0QgVk1gLFxuICAgICk7XG4gIH1cbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXdhaXQgYXBwLmxpc3RlbigzMDAyKTtcblxuICBpZiAoaG90KSB7XG4gICAgaG90LmFjY2VwdCgpO1xuICAgIGhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxufVxuXG4vLyBHbG9iYWwgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgdHJ1ZSBpbiBwcm9kIGFuZCBpbiBpbnRlZ3JhdGlvbiB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEdsb2JhbHNUb0FwcChhcHA6IElOZXN0QXBwbGljYXRpb24pOiB2b2lkIHtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKFxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XG4gICAgICB3aGl0ZWxpc3Q6IHRydWUsXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZSxcbiAgICB9KSxcbiAgKTtcbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBTdHJpcFVuZGVmaW5lZFBpcGUoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dpbk1vZHVsZSB9IGZyb20gJy4vbG9naW4vbG9naW4ubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2R1bGUgfSBmcm9tICcuL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IFNlZWRNb2R1bGUgfSBmcm9tICcuL3NlZWQvc2VlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnLi9zc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyB0eXBlb3JtQ29uZmlnIGZyb20gJy4uL29ybWNvbmZpZyc7XG5pbXBvcnQgeyBCYWNrZmlsbE1vZHVsZSB9IGZyb20gJ2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWxlYXNlTm90ZXNNb2R1bGUgfSBmcm9tICdyZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBUeXBlT3JtTW9kdWxlLmZvclJvb3QodHlwZW9ybUNvbmZpZyksXG4gICAgU2NoZWR1bGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExvZ2luTW9kdWxlLFxuICAgIFByb2ZpbGVNb2R1bGUsXG4gICAgQ291cnNlTW9kdWxlLFxuICAgIFF1ZXVlTW9kdWxlLFxuICAgIE5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBRdWVzdGlvbk1vZHVsZSxcbiAgICBTZWVkTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbXG4gICAgICAgICcuZW52JyxcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbJy5lbnYuZGV2ZWxvcG1lbnQnXSA6IFtdKSxcbiAgICAgIF0sXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBZG1pbk1vZHVsZSxcbiAgICBDb21tYW5kTW9kdWxlLFxuICAgIFNTRU1vZHVsZSxcbiAgICBCYWNrZmlsbE1vZHVsZSxcbiAgICBSZWxlYXNlTm90ZXNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy90eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc2NoZWR1bGVcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlQ29udHJvbGxlciB9IGZyb20gJy4vY291cnNlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgSUNhbENvbW1hbmQgfSBmcm9tICcuL2ljYWwuY29tbWFuZCc7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbQ291cnNlQ29udHJvbGxlcl0sXG4gIGltcG9ydHM6IFtRdWV1ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0lDYWxDb21tYW5kLCBJY2FsU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIERlbGV0ZSxcbiAgR2V0LFxuICBQYXJhbSxcbiAgUG9zdCxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEdldENvdXJzZVJlc3BvbnNlLCBRdWV1ZVBhcnRpYWwsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgZ2V0UmVwb3NpdG9yeSB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlQ2xlYW5TZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVJvbGVzR3VhcmQgfSBmcm9tICcuL2NvdXJzZS1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdjb3Vyc2VzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBDb3Vyc2VSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVDbGVhblNlcnZpY2U6IFF1ZXVlQ2xlYW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVCwgUm9sZS5UQSlcbiAgYXN5bmMgZ2V0KEBQYXJhbSgnaWQnKSBpZDogbnVtYmVyKTogUHJvbWlzZTxHZXRDb3Vyc2VSZXNwb25zZT4ge1xuICAgIC8vIFRPRE86IGZvciBhbGwgY291cnNlIGVuZHBvaW50LCBjaGVjayBpZiB0aGV5J3JlIGEgc3R1ZGVudCBvciBhIFRBXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZShpZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlcycsICdxdWV1ZXMuc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICAvLyBVc2UgcmF3IHF1ZXJ5IGZvciBwZXJmb3JtYW5jZSAoYXZvaWQgZW50aXR5IGluc3RhbnRpYXRpb24gYW5kIHNlcmlhbGl6YXRpb24pXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gYXdhaXQgZ2V0UmVwb3NpdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdvaCcpXG4gICAgICAuc2VsZWN0KFsnaWQnLCAndGl0bGUnLCBgXCJzdGFydFRpbWVcImAsIGBcImVuZFRpbWVcImBdKVxuICAgICAgLndoZXJlKCdvaC5jb3Vyc2VJZCA9IDpjb3Vyc2VJZCcsIHsgY291cnNlSWQ6IGNvdXJzZS5pZCB9KVxuICAgICAgLmdldFJhd01hbnkoKTtcblxuICAgIGNvdXJzZS5xdWV1ZXMgPSBhd2FpdCBhc3luYy5maWx0ZXIoXG4gICAgICBjb3Vyc2UucXVldWVzLFxuICAgICAgYXN5bmMgKHEpID0+IGF3YWl0IHEuY2hlY2tJc09wZW4oKSxcbiAgICApO1xuICAgIGF3YWl0IGFzeW5jLmVhY2goY291cnNlLnF1ZXVlcywgYXN5bmMgKHEpID0+IHtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVUaW1lcygpO1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVNpemUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3Vyc2U7XG4gIH1cblxuICBAUG9zdCgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja0luKFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxRdWV1ZVBhcnRpYWw+IHtcbiAgICBsZXQgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QucHVzaCh1c2VyKTtcbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQERlbGV0ZSgnOmlkL3RhX2xvY2F0aW9uLzpyb29tJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlRBKVxuICBhc3luYyBjaGVja091dChcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBxdWV1ZS5zdGFmZkxpc3QgPSBxdWV1ZS5zdGFmZkxpc3QuZmlsdGVyKChlKSA9PiBlLmlkICE9PSB1c2VyLmlkKTtcbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgIC8vIENsZWFuIHVwIHF1ZXVlIGlmIG5lY2Vzc2FyeVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZUNsZWFuU2VydmljZS5jbGVhblF1ZXVlKHF1ZXVlLmlkKTtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHtcbiAgSXNCb29sZWFuLFxuICBJc0RlZmluZWQsXG4gIElzRW51bSxcbiAgSXNJbnQsXG4gIElzTm90RW1wdHksXG4gIElzT3B0aW9uYWwsXG4gIElzU3RyaW5nLFxuICBWYWxpZGF0ZUlmLFxufSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5cbmV4cG9ydCBjb25zdCBQUk9EX1VSTCA9IFwiaHR0cHM6Ly9raG91cnlvZmZpY2Vob3Vycy5jb21cIjtcbmV4cG9ydCBjb25zdCBpc1Byb2QgPSAoKTogYm9vbGVhbiA9PlxuICBwcm9jZXNzLmVudi5ET01BSU4gPT09IFBST0RfVVJMIHx8XG4gICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdz8ubG9jYXRpb24/Lm9yaWdpbiA9PT0gUFJPRF9VUkwpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBUEkgQmFzZSBEYXRhIFR5cGVzIC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIE5PVEU6IFRoZXNlIGFyZSBub3QgdGhlIERCIGRhdGEgdHlwZXMuIFRoZXkgYXJlIG9ubHkgdXNlZCBmb3IgdGhlIGFwaVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB1c2VyLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gZW1haWwgLSBUaGUgZW1haWwgc3RyaW5nIG9mIHRoZSB1c2VyIGlmIHRoZXkgcHJvdmlkZSBpdCAobnVsbGFibGUpXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKiBAcGFyYW0gY291cnNlcyAtIFRoZSBsaXN0IG9mIGNvdXJzZXMgdGhhdCB0aGUgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggKGFzIGVpdGhlciBhICdzdHVkZW50JywgJ3RhJyBvciAncHJvZmVzc29yJylcbiAqIEBwYXJhbSBkZXNrdG9wTm90aWZzIC0gbGlzdCBvZiBlbmRwb2ludHMgc28gdGhhdCBmcm9udGVuZCBjYW4gZmlndXJlIG91dCBpZiBkZXZpY2UgaXMgZW5hYmxlZFxuICovXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbCE6IHN0cmluZztcbiAgbmFtZSE6IHN0cmluZztcbiAgcGhvdG9VUkwhOiBzdHJpbmc7XG4gIGNvdXJzZXMhOiBVc2VyQ291cnNlW107XG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEZXNrdG9wTm90aWZQYXJ0aWFsKVxuICBkZXNrdG9wTm90aWZzITogRGVza3RvcE5vdGlmUGFydGlhbFtdO1xuXG4gIHBob25lTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG4gIHBob25lTnVtYmVyITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbmRwb2ludCE6IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY3JlYXRlZEF0ITogRGF0ZTtcbn1cblxuLyoqXG4gKiBDb250YWlucyB0aGUgcGFydGlhbCB1c2VyIGluZm8gbmVlZGVkIGJ5IHRoZSBmcm9udGVuZCB3aGVuIG5lc3RlZCBpbiBhIHJlc3BvbnNlXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBwaG90b1VSTD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGFydGlhbCBjb3Vyc2UgZGF0YSBuZWVkZWQgb24gdGhlIGZyb250IGVuZCB3aGVuIG5lc3RlZCBpbiBhIHJlc3BvbnNlLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICovXG5leHBvcnQgdHlwZSBDb3Vyc2VQYXJ0aWFsID0ge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgdGhhdCBhIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIGFuZCB0aGVpciByb2xlIGluIHRoYXQgY291cnNlXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGUgdXNlciBhY2NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0gcm9sZSAtIFRoZSB1c2VyJ3Mgcm9sZSBpbiB0aGUgY291cnNlLlxuICovXG5leHBvcnQgdHlwZSBVc2VyQ291cnNlID0ge1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvbGU6IFJvbGU7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRocmVlIHBvc3NpYmxlIHVzZXIgcm9sZXMgaW4gYSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCBlbnVtIFJvbGUge1xuICBTVFVERU5UID0gXCJzdHVkZW50XCIsXG4gIFRBID0gXCJ0YVwiLFxuICBQUk9GRVNTT1IgPSBcInByb2Zlc3NvclwiLFxufVxuXG5jbGFzcyBPZmZpY2VIb3VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICB0aXRsZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBzdGFydFRpbWUhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGVuZFRpbWUhOiBEYXRlO1xufVxuXG4vKipcbiAqIEEgUXVldWUgdGhhdCBzdHVkZW50cyBjYW4gam9pbiB3aXRoIHRoaWVyIHRpY2tldHMuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoYXQgdGhpcyBvZmZpY2UgaG91cnMgcXVldWUgaXMgZm9yLlxuICogQHBhcmFtIHJvb20gLSBUaGUgZnVsbCBuYW1lIG9mIHRoZSBidWlsZGluZyArIHJvb20gIyB0aGF0IHRoZSBjdXJyZW50IG9mZmljZSBob3VycyBxdWV1ZSBpcyBpbi5cbiAqIEBwYXJhbSBzdGFmZkxpc3QgLSBUaGUgbGlzdCBvZiBUQSB1c2VyJ3MgdGhhdCBhcmUgY3VycmVudGx5IGhlbHBpbmcgYXQgb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIHF1ZXN0aW9ucyAtIFRoZSBsaXN0IG9mIHRoZSBzdHVkZW50cyBxdWVzdGlvbnMgYXNzb2NhaXRlZCB3aXRoIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWV1ZSB7XG4gIGlkOiBudW1iZXI7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9vbTogc3RyaW5nO1xuICBzdGFmZkxpc3Q6IFVzZXJQYXJ0aWFsW107XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgc3RhcnRUaW1lPzogRGF0ZTtcbiAgZW5kVGltZT86IERhdGU7XG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgUXVldWUgcGFydGlhbCB0byBiZSBzaG93biBvbiB0aGUgdG9kYXkgcGFnZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIHJvb20gLSBUaGUgZnVsbCBuYW1lIG9mIHRoZSBidWlsZGluZyArIHJvb20gIyB0aGF0IHRoZSBjdXJyZW50IG9mZmljZSBob3VycyBxdWV1ZSBpcyBpbi5cbiAqIEBwYXJhbSBzdGFmZkxpc3QgLSBUaGUgbGlzdCBvZiBUQSB1c2VyJ3MgdGhhdCBhcmUgY3VycmVudGx5IGhlbHBpbmcgYXQgb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgY2xhc3MgUXVldWVQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHJvb20hOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIHN0YWZmTGlzdCE6IFVzZXJQYXJ0aWFsW107XG5cbiAgcXVldWVTaXplITogbnVtYmVyO1xuICBub3Rlcz86IHN0cmluZztcbiAgaXNPcGVuITogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBzdGFydFRpbWU/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGVuZFRpbWU/OiBEYXRlO1xuXG4gIGFsbG93UXVlc3Rpb25zITogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXN0aW9uIGlzIGNyZWF0ZWQgd2hlbiBhIHN0dWRlbnQgd2FudHMgaGVscCBmcm9tIGEgVEEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBzdHVkZW50IHF1ZXN0aW9uLlxuICogQHBhcmFtIGNyZWF0b3IgLSBUaGUgU3R1ZGVudCB0aGF0IGhhcyBjcmVhdGVkIHRoZSBxdWVzdGlvbi5cbiAqIEBwYXJhbSB0ZXh0IC0gVGhlIHRleHQgZGVzY3JpdGlwbiBvZiB3aGF0IGhlL3NoZSBuZWVkcyBoZWxwIHdpdGguXG4gKiBAcGFyYW0gY3JlYXRlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUaWNrZXQgd2FzIGNyZWF0ZWQuIEV4OiBcIjIwMjAtMDktMTJUMTI6MDA6MDAtMDQ6MDBcIlxuICogQHBhcmFtIGhlbHBlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBiZWdhbiBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIGNsb3NlZEF0IC0gVGhlIGRhdGUgc3RyaW5nIGZvciB0aGUgdGltZSB0aGF0IHRoZSBUQSBmaW5pc2hlZCBoZWxwaW5nIHRoZSBTdHVkZW50LlxuICogQHBhcmFtIHF1ZXN0aW9uVHlwZSAtIFRoZSBxdWVzdGlvbiB0eXBlIGhlbHBzIGRpc3Rpbmd1aXNoIHF1ZXN0aW9uIGZvciBUQSdzIGFuZCBkYXRhIGluc2lnaHRzLlxuICogQHBhcmFtIHN0YXR1cyAtIFRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhpcyBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcnRpY3VsYXIgc3R1ZGVudCwgdG8gaGVscCBUQSdzIGZpbmQgdGhlbVxuICogQHBhcmFtIGlzT25saW5lIC0gV2V0aGVyIG9yIG5vdCB0aGUgcXVlc3Rpb24gd2lsbCBoZWxwZWQgb25saW5lIG9yIGluLXBlcnNvblxuICovXG5leHBvcnQgY2xhc3MgUXVlc3Rpb24ge1xuICBpZCE6IG51bWJlcjtcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgY3JlYXRvciE6IFVzZXJQYXJ0aWFsO1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICB0YUhlbHBlZD86IFVzZXJQYXJ0aWFsO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgaGVscGVkQXQ/OiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNsb3NlZEF0PzogRGF0ZTtcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuICBzdGF0dXMhOiBRdWVzdGlvblN0YXR1cztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIGlzT25saW5lPzogYm9vbGVhbjtcbn1cblxuLy8gUXVlc3Rpb24gVHlwZXNcbmV4cG9ydCBlbnVtIFF1ZXN0aW9uVHlwZSB7XG4gIENvbmNlcHQgPSBcIkNvbmNlcHRcIixcbiAgQ2xhcmlmaWNhdGlvbiA9IFwiQ2xhcmlmaWNhdGlvblwiLFxuICBUZXN0aW5nID0gXCJUZXN0aW5nXCIsXG4gIEJ1ZyA9IFwiQnVnXCIsXG4gIFNldHVwID0gXCJTZXR1cFwiLFxuICBPdGhlciA9IFwiT3RoZXJcIixcbn1cblxuZXhwb3J0IGVudW0gT3BlblF1ZXN0aW9uU3RhdHVzIHtcbiAgRHJhZnRpbmcgPSBcIkRyYWZ0aW5nXCIsXG4gIFF1ZXVlZCA9IFwiUXVldWVkXCIsXG4gIEhlbHBpbmcgPSBcIkhlbHBpbmdcIixcbiAgUHJpb3JpdHlRdWV1ZWQgPSBcIlByaW9yaXR5UXVldWVkXCIsXG59XG5cbi8qKlxuICogTGltYm8gc3RhdHVzZXMgYXJlIGF3YWl0aW5nIHNvbWUgY29uZmlybWF0aW9uIGZyb20gdGhlIHN0dWRlbnRcbiAqL1xuZXhwb3J0IGVudW0gTGltYm9RdWVzdGlvblN0YXR1cyB7XG4gIENhbnRGaW5kID0gXCJDYW50RmluZFwiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBzdHVkZW50IGNhbid0IGJlIGZvdW5kIGJ5IGEgVEFcbiAgUmVRdWV1ZWluZyA9IFwiUmVRdWV1ZWluZ1wiLCAvLyByZXByZXNlbnRzIHdoZW4gYSBUQSB3YW50cyB0byBnZXQgYmFjayB0byBhIHN0dWRlbnQgbGF0ZXIgYW5kIGdpdmUgdGhlbSB0aGUgb3B0aW9uIHRvIGJlIHB1dCBpbnRvIHRoZSBwcmlvcml0eSBxdWV1ZVxuICBUQURlbGV0ZWQgPSBcIlRBRGVsZXRlZFwiLCAvLyBXaGVuIGEgVEEgZGVsZXRlcyBhIHF1ZXN0aW9uIGZvciBhIG11bHRpdHVkZSBvZiByZWFzb25zXG59XG5cbmV4cG9ydCBlbnVtIENsb3NlZFF1ZXN0aW9uU3RhdHVzIHtcbiAgUmVzb2x2ZWQgPSBcIlJlc29sdmVkXCIsXG4gIENvbmZpcm1lZERlbGV0ZWQgPSBcIkNvbmZpcm1lZERlbGV0ZWRcIixcbiAgU3R1ZGVudENhbmNlbGxlZCA9IFwiU3R1ZGVudENhbmNlbGxlZFwiLFxuICBTdGFsZSA9IFwiU3RhbGVcIixcbn1cblxuZXhwb3J0IGNvbnN0IFN0YXR1c0luUXVldWUgPSBbXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZyxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLlF1ZXVlZCxcbl07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblByaW9yaXR5UXVldWUgPSBbT3BlblF1ZXN0aW9uU3RhdHVzLlByaW9yaXR5UXVldWVkXTtcblxuZXhwb3J0IGNvbnN0IFN0YXR1c1NlbnRUb0NyZWF0b3IgPSBbXG4gIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgLi4uU3RhdHVzSW5RdWV1ZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuUmVRdWV1ZWluZyxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZCxcbiAgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWQsXG5dO1xuXG4vLyBUaWNrZXQgU3RhdHVzIC0gUmVwcmVzZW50cyBhIGdpdmVuIHN0YXR1cyBvZiBhcyBzdHVkZW50J3MgdGlja2V0XG5leHBvcnQgdHlwZSBRdWVzdGlvblN0YXR1cyA9IGtleW9mIHR5cGVvZiBRdWVzdGlvblN0YXR1c0tleXM7XG4vLyBhbiBFbnVtLWxpa2UgY29uc3RhbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIHN0YXR1c2VzIGZvciBjb252ZW5pZW5jZS5cbmV4cG9ydCBjb25zdCBRdWVzdGlvblN0YXR1c0tleXMgPSB7XG4gIC4uLk9wZW5RdWVzdGlvblN0YXR1cyxcbiAgLi4uQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkxpbWJvUXVlc3Rpb25TdGF0dXMsXG59O1xuXG4vKipcbiAqIEEgU2VtZXN0ZXIgb2JqZWN0LCByZXByZXNlbnRpbmcgYSBzY2hlZHVsZSBzZW1lc3RlciB0ZXJtIGZvciB0aGUgcHVycG9zZXMgb2YgYSBjb3Vyc2UuXG4gKiBAcGFyYW0gc2Vhc29uIC0gVGhlIHNlYXNvbiBvZiB0aGlzIHNlbWVzdGVyLlxuICogQHBhcmFtIHllYXIgLSBUaGUgeWVhciBvZiB0aGlzIHNlbWVzdGVyLlxuICovXG5pbnRlcmZhY2UgU2VtZXN0ZXIge1xuICBzZWFzb246IFNlYXNvbjtcbiAgeWVhcjogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb25lIG9mIHRoZSBzZWFzb25zIGluIHdoaWNoIGEgY291cnNlIGNhbiB0YWtlIHBsYWNlLlxuICovXG5leHBvcnQgdHlwZSBTZWFzb24gPSBcIkZhbGxcIiB8IFwiU3ByaW5nXCIgfCBcIlN1bW1lciAxXCIgfCBcIlN1bW1lciAyXCI7XG5cbmV4cG9ydCB0eXBlIERlc2t0b3BOb3RpZkJvZHkgPSB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIGV4cGlyYXRpb25UaW1lPzogbnVtYmVyO1xuICBrZXlzOiB7XG4gICAgcDI1NmRoOiBzdHJpbmc7XG4gICAgYXV0aDogc3RyaW5nO1xuICB9O1xuICBuYW1lPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUGhvbmVOb3RpZkJvZHkgPSB7XG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09IEFQSSBSb3V0ZSBUeXBlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE9uIGJhY2tlbmQsIHZhbGlkYXRlZCB3aXRoIGh0dHBzOi8vZG9jcy5uZXN0anMuY29tL3RlY2huaXF1ZXMvdmFsaWRhdGlvblxuLy8gQVBJIHJvdXRlIFBhcmFtcyBhbmQgUmVzcG9uc2VzXG5cbi8vIE9mZmljZSBIb3VycyBSZXNwb25zZSBUeXBlc1xuZXhwb3J0IGNsYXNzIEdldFByb2ZpbGVSZXNwb25zZSBleHRlbmRzIFVzZXIge31cblxuZXhwb3J0IGNsYXNzIEtob3VyeURhdGFQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBlbWFpbCE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBmaXJzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGxhc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNJbnQoKVxuICBjYW1wdXMhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNTdHJpbmcoKVxuICBwaG90b191cmwhOiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgY291cnNlcyE6IEtob3VyeVN0dWRlbnRDb3Vyc2VbXTtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICB0YV9jb3Vyc2VzITogS2hvdXJ5VEFDb3Vyc2VbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVN0dWRlbnRDb3Vyc2Uge1xuICBASXNJbnQoKVxuICBjcm4hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhY2NlbGVyYXRlZCE6IGJvb2xlYW47XG5cbiAgQElzSW50KClcbiAgc2VjdGlvbiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICB0aXRsZSE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEtob3VyeVRBQ291cnNlIHtcbiAgQElzU3RyaW5nKClcbiAgY291cnNlITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEtob3VyeVJlZGlyZWN0UmVzcG9uc2Uge1xuICByZWRpcmVjdDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZVBhcmFtcyB7XG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBwaG9uZU5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBWYWxpZGF0ZUlmKChvKSA9PiBvLnBob25lTm90aWZzRW5hYmxlZClcbiAgQElzU3RyaW5nKClcbiAgQElzTm90RW1wdHkoKVxuICBwaG9uZU51bWJlcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVJlc3BvbnNlIHtcbiAgaWQhOiBudW1iZXI7XG4gIG5hbWUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gT2ZmaWNlSG91clBhcnRpYWwpXG4gIG9mZmljZUhvdXJzITogQXJyYXk8T2ZmaWNlSG91clBhcnRpYWw+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXVlUGFydGlhbClcbiAgcXVldWVzITogUXVldWVQYXJ0aWFsW107XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWV1ZVJlc3BvbnNlIGV4dGVuZHMgUXVldWVQYXJ0aWFsIHt9XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VRdWV1ZXNSZXNwb25zZSBleHRlbmRzIEFycmF5PFF1ZXVlUGFydGlhbD4ge31cblxuZXhwb3J0IGNsYXNzIExpc3RRdWVzdGlvbnNSZXNwb25zZSB7XG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICB5b3VyUXVlc3Rpb24/OiBRdWVzdGlvbjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcXVlc3Rpb25zR2V0dGluZ0hlbHAhOiBBcnJheTxRdWVzdGlvbj47XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXVlITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBwcmlvcml0eVF1ZXVlITogQXJyYXk8UXVlc3Rpb24+O1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIHRleHQhOiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIHF1ZXVlSWQhOiBudW1iZXI7XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGZvcmNlITogYm9vbGVhbjtcbn1cbmV4cG9ydCBjbGFzcyBDcmVhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXVlSWQ/OiBudW1iZXI7XG5cbiAgQElzRW51bShRdWVzdGlvblN0YXR1c0tleXMpXG4gIEBJc09wdGlvbmFsKClcbiAgc3RhdHVzPzogUXVlc3Rpb25TdGF0dXM7XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xuXG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCB0eXBlIFRBVXBkYXRlU3RhdHVzUmVzcG9uc2UgPSBRdWV1ZVBhcnRpYWw7XG5leHBvcnQgdHlwZSBRdWV1ZU5vdGVQYXlsb2FkVHlwZSA9IHtcbiAgbm90ZXM6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWV1ZVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgbm90ZXM/OiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFsbG93UXVlc3Rpb25zPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNTRVF1ZXVlUmVzcG9uc2Uge1xuICBxdWV1ZT86IEdldFF1ZXVlUmVzcG9uc2U7XG4gIHF1ZXN0aW9ucz86IExpc3RRdWVzdGlvbnNSZXNwb25zZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUd2lsaW9Cb2R5IHtcbiAgVG9Db3VudHJ5OiBzdHJpbmc7XG4gIFRvU3RhdGU6IHN0cmluZztcbiAgU21zTWVzc2FnZVNpZDogc3RyaW5nO1xuICBOdW1NZWRpYTogc3RyaW5nO1xuICBUb0NpdHk6IHN0cmluZztcbiAgRnJvbVppcDogc3RyaW5nO1xuICBTbXNTaWQ6IHN0cmluZztcbiAgRnJvbVN0YXRlOiBzdHJpbmc7XG4gIFNtc1N0YXR1czogc3RyaW5nO1xuICBGcm9tQ2l0eTogc3RyaW5nO1xuICBCb2R5OiBzdHJpbmc7XG4gIEZyb21Db3VudHJ5OiBzdHJpbmc7XG4gIFRvOiBzdHJpbmc7XG4gIFRvWmlwOiBzdHJpbmc7XG4gIE51bVNlZ21lbnRzOiBzdHJpbmc7XG4gIE1lc3NhZ2VTaWQ6IHN0cmluZztcbiAgQWNjb3VudFNpZDogc3RyaW5nO1xuICBGcm9tOiBzdHJpbmc7XG4gIEFwaVZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB7XG4gIHJlbGVhc2VOb3RlczogdW5rbm93bjtcbiAgbGFzdFVwZGF0ZWRVbml4VGltZTogbnVtYmVyO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RBdXRoR3VhcmQgZXh0ZW5kcyBBdXRoR3VhcmQoJ2p3dCcpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3Bhc3Nwb3J0XCIpOyIsImltcG9ydCB7IFNldE1ldGFkYXRhLCBDdXN0b21EZWNvcmF0b3IgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBSb2xlcyA9ICguLi5yb2xlczogc3RyaW5nW10pOiBDdXN0b21EZWNvcmF0b3I8c3RyaW5nPiA9PlxuICBTZXRNZXRhZGF0YSgncm9sZXMnLCByb2xlcyk7XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlciA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yPHN0cmluZ1tdPihcbiAgYXN5bmMgKHJlbGF0aW9uczogc3RyaW5nW10sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7IHJlbGF0aW9ucyB9KTtcbiAgfSxcbik7XG5cbmV4cG9ydCBjb25zdCBVc2VySWQgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBOdW1iZXIocmVxdWVzdC51c2VyLnVzZXJJZCk7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIE9uZVRvT25lLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3VzZXItY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBDcmVhdGVEYXRlQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdkZXNrdG9wX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGV4cGlyYXRpb25UaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwMjU2ZGg6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgYXV0aDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZGVza3RvcE5vdGlmcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgdHlwZTogJ3RpbWVzdGFtcCcgfSlcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAndGV4dCcsIG51bGxhYmxlOiB0cnVlIH0pXG4gIG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgncGhvbmVfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFBob25lTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnBob25lTm90aWYpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdmVyaWZpZWQ6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTGVzc1RoYW5PckVxdWFsLFxuICBNYW55VG9NYW55LFxuICBNYW55VG9PbmUsXG4gIE1vcmVUaGFuT3JFcXVhbCxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuXG5pbnRlcmZhY2UgVGltZUludGVydmFsIHtcbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xufVxuXG5ARW50aXR5KCdxdWV1ZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVldWVNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5xdWV1ZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHJvb206IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWVzdGlvbk1vZGVsLCAocW0pID0+IHFtLnF1ZXVlKVxuICBARXhjbHVkZSgpXG4gIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIG5vdGVzOiBzdHJpbmc7XG5cbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucXVldWVzKVxuICBASm9pblRhYmxlKClcbiAgc3RhZmZMaXN0OiBVc2VyTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2gucXVldWUpXG4gIEBKb2luVGFibGUoKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xuXG4gIGlzT3BlbjogYm9vbGVhbjtcblxuICBhc3luYyBjaGVja0lzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zdGFmZkxpc3QgJiYgdGhpcy5zdGFmZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgTVNfSU5fTUlOVVRFID0gNjAwMDA7XG4gICAgY29uc3Qgb2hzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IG9wZW4gPSAhIW9ocy5maW5kKFxuICAgICAgKGUpID0+XG4gICAgICAgIGUuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDEwICogTVNfSU5fTUlOVVRFIDwgbm93LmdldFRpbWUoKSAmJlxuICAgICAgICBlLmVuZFRpbWUuZ2V0VGltZSgpICsgMSAqIE1TX0lOX01JTlVURSA+IG5vdy5nZXRUaW1lKCksXG4gICAgKTtcbiAgICB0aGlzLmlzT3BlbiA9IG9wZW47XG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBxdWV1ZVNpemU6IG51bWJlcjtcblxuICBhc3luYyBhZGRRdWV1ZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5xdWV1ZVNpemUgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKHRoaXMuaWQpXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLm9wZW5TdGF0dXMpJywge1xuICAgICAgICBvcGVuU3RhdHVzOiBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLCBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkXSxcbiAgICAgIH0pXG4gICAgICAuZ2V0Q291bnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRRdWV1ZVRpbWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWxzID0gdGhpcy5nZW5lcmF0ZU1lcmdlZFRpbWVJbnRlcnZhbHMob2ZmaWNlSG91cnMpO1xuICAgIGNvbnN0IGN1cnJUaW1lID0gdGltZUludGVydmFscy5maW5kKChncm91cCkgPT4ge1xuICAgICAgLy8gRmluZCBhIHRpbWUgaW50ZXJ2YWwgd2l0aGluIDE1IG1pbnV0ZXMgb2YgYm91bmRzIHRvIGFjY291bnQgZm9yIFRBIGVkZ2UgY2FzZXNcbiAgICAgIGNvbnN0IGxvd2VyQm91bmQgPSBncm91cC5zdGFydFRpbWUuZ2V0VGltZSgpIC0gMTUgKiA2MCAqIDEwMDA7XG4gICAgICBjb25zdCB1cHBlckJvdW5kID0gZ3JvdXAuZW5kVGltZS5nZXRUaW1lKCkgKyAxNSAqIDYwICogMTAwMDtcbiAgICAgIHJldHVybiBsb3dlckJvdW5kIDw9IG5vdy5nZXRUaW1lKCkgJiYgdXBwZXJCb3VuZCA+PSBub3cuZ2V0VGltZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGN1cnJUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IGN1cnJUaW1lLnN0YXJ0VGltZTtcbiAgICAgIHRoaXMuZW5kVGltZSA9IGN1cnJUaW1lLmVuZFRpbWU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IE9mZmljZSBob3VycyBpbiBhIDcyaHIgd2luZG93IGFyb3VuZCBub3csIHNuYXBwZWQgdG8gbWlkbmlnaHRcbiAgcHJpdmF0ZSBhc3luYyBnZXRPZmZpY2VIb3VycygpOiBQcm9taXNlPE9mZmljZUhvdXJNb2RlbFtdPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IGxvd2VyQm91bmQgPSBuZXcgRGF0ZShub3cpO1xuICAgIGxvd2VyQm91bmQuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgLSAyNCk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIGNvbnN0IHVwcGVyQm91bmQgPSBuZXcgRGF0ZShub3cpO1xuICAgIHVwcGVyQm91bmQuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgKyAyNCk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIHJldHVybiBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZmluZCh7XG4gICAgICB3aGVyZTogW1xuICAgICAgICB7XG4gICAgICAgICAgcXVldWVJZDogdGhpcy5pZCxcbiAgICAgICAgICBzdGFydFRpbWU6IE1vcmVUaGFuT3JFcXVhbChsb3dlckJvdW5kKSxcbiAgICAgICAgICBlbmRUaW1lOiBMZXNzVGhhbk9yRXF1YWwodXBwZXJCb3VuZCksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgb3JkZXI6IHtcbiAgICAgICAgc3RhcnRUaW1lOiAnQVNDJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhcbiAgICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW10sXG4gICk6IFRpbWVJbnRlcnZhbFtdIHtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWxzOiBUaW1lSW50ZXJ2YWxbXSA9IFtdO1xuICAgIG9mZmljZUhvdXJzLmZvckVhY2goKG9mZmljZUhvdXIpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGltZUludGVydmFscy5sZW5ndGggPT0gMCB8fFxuICAgICAgICBvZmZpY2VIb3VyLnN0YXJ0VGltZSA+IHRpbWVJbnRlcnZhbHNbdGltZUludGVydmFscy5sZW5ndGggLSAxXS5lbmRUaW1lXG4gICAgICApIHtcbiAgICAgICAgdGltZUludGVydmFscy5wdXNoKHtcbiAgICAgICAgICBzdGFydFRpbWU6IG9mZmljZUhvdXIuc3RhcnRUaW1lLFxuICAgICAgICAgIGVuZFRpbWU6IG9mZmljZUhvdXIuZW5kVGltZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldkdyb3VwID0gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdO1xuICAgICAgcHJldkdyb3VwLmVuZFRpbWUgPVxuICAgICAgICBvZmZpY2VIb3VyLmVuZFRpbWUgPiBwcmV2R3JvdXAuZW5kVGltZVxuICAgICAgICAgID8gb2ZmaWNlSG91ci5lbmRUaW1lXG4gICAgICAgICAgOiBwcmV2R3JvdXAuZW5kVGltZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aW1lSW50ZXJ2YWxzO1xuICB9XG5cbiAgLy8gVE9ETzogZXZlbnR1YWxseSBmaWd1cmUgb3V0IGhvdyBzdGFmZiBnZXQgc2VudCB0byBGRSBhcyB3ZWxsXG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgT25lVG9NYW55LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIGluIHRoZSBjb250ZXh0IG9mIG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqIEBwYXJhbSBzZW1lc3RlciAtIFRoZSBzZW1lc3RlciBvZiB0aGlzIGNvdXJzZS5cbiAqL1xuLyppbnRlcmZhY2UgQ291cnNlIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBzZW1lc3RlcjogU2VtZXN0ZXI7XG4gICAgdXNlcnM6IFVzZXJDb3Vyc2VbXVxufSovXG5cbkBFbnRpdHkoJ2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5jb3Vyc2UpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5jb3Vyc2UpXG4gIHF1ZXVlczogUXVldWVNb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBpY2FsVVJMOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gVXNlckNvdXJzZU1vZGVsLCAodWNtKSA9PiB1Y20uY291cnNlKVxuICBARXhjbHVkZSgpXG4gIHVzZXJDb3Vyc2VzOiBVc2VyQ291cnNlTW9kZWw7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gU2VtZXN0ZXJNb2RlbCwgKHNlbWVzdGVyKSA9PiBzZW1lc3Rlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdzZW1lc3RlcklkJyB9KVxuICBARXhjbHVkZSgpXG4gIHNlbWVzdGVyOiBTZW1lc3Rlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIC8vIFRPRE86IGNhbiB3ZSBtYWtlIHRoZXNlIG5vdCBudWxsYWJsZSBhbmQgd29yayB3aXRoIFR5cGVPUk1cbiAgc2VtZXN0ZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ2Jvb2xlYW4nLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGVuYWJsZWQ6IGJvb2xlYW47IC8vIFNldCB0byB0cnVlIGlmIHRoZSBnaXZlbiB0aGUgY291cnNlIGlzIHVzaW5nIG91ciBhcHBcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgVXNlckNvdXJzZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnVzZXJDb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY291cnNlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHsgdHlwZTogJ2VudW0nLCBlbnVtOiBSb2xlLCBkZWZhdWx0OiBSb2xlLlNUVURFTlQgfSlcbiAgcm9sZTogUm9sZTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7XG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uVHlwZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFNlbGVjdFF1ZXJ5QnVpbGRlcixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXMgfSBmcm9tICcuL3F1ZXN0aW9uLWZzbSc7XG5cbkBFbnRpdHkoJ3F1ZXN0aW9uX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5xdWVzdGlvbnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3F1ZXVlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWU6IFF1ZXVlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgcXVldWVJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICB0ZXh0OiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjcmVhdG9ySWQnIH0pXG4gIGNyZWF0b3I6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjcmVhdG9ySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3RhSGVscGVkSWQnIH0pXG4gIHRhSGVscGVkOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgdGFIZWxwZWRJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGZpcnN0IGhlbHBlZCAoZG9lc24ndCBvdmVyd3JpdGUpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGZpcnN0SGVscGVkQXQ6IERhdGU7XG5cbiAgLy8gV2hlbiB0aGUgcXVlc3Rpb24gd2FzIGxhc3QgaGVscGVkIChnZXR0aW5nIGhlbHAgYWdhaW4gb24gcHJpb3JpdHkgcXVldWUgb3ZlcndyaXRlcylcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIGxlYXZlcyB0aGUgcXVldWVcbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlIHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGFzIHRoZSBnaXZlbiByb2xlXG4gICAqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgc3RhdHVzIGNoYW5nZSBzdWNjZWVkZWRcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTdGF0dXMobmV3U3RhdHVzOiBRdWVzdGlvblN0YXR1cywgcm9sZTogUm9sZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyh0aGlzLnN0YXR1cywgbmV3U3RhdHVzLCByb2xlKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBvcGVuSW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlczogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF06IHtcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGVdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9ucy5mb3JFYWNoKChxdWV1ZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhblF1ZXVlKHF1ZXVlLmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbGVhblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICBxdWV1ZS5ub3RlcyA9ICcnO1xuICAgICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgICAgYXdhaXQgdGhpcy51bnNhZmVDbGVhbihxdWV1ZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1bnNhZmVDbGVhbihxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKHF1ZXVlSWQpLmdldE1hbnkoKTtcbiAgICBjb25zdCBvcGVuUXVlc3Rpb25zID0gcXVlc3Rpb25zLmZpbHRlcihcbiAgICAgIChxKSA9PiBxLnN0YXR1cyBpbiBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gICAgKTtcblxuICAgIG9wZW5RdWVzdGlvbnMuZm9yRWFjaCgocTogUXVlc3Rpb25Nb2RlbCkgPT4ge1xuICAgICAgcS5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdGFsZTtcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuc2F2ZShvcGVuUXVlc3Rpb25zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ011c3QgYmUgbG9nZ2VkIGluJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb3Vyc2VJZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdObyBjb3Vyc2VpZCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hdGNoUm9sZXMocm9sZXMsIHVzZXIsIGNvdXJzZUlkKTtcbiAgfVxuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ05vdCBJbiBUaGlzIENvdXJzZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXG4gICAgICAgICAgJywgJyxcbiAgICAgICAgKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZW1haW5pbmcubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUm9sZSwgU1NFUXVldWVSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJ3NzZS9zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuXG50eXBlIFF1ZXVlQ2xpZW50TWV0YWRhdGEgPSB7IHVzZXJJZDogbnVtYmVyOyByb2xlOiBSb2xlIH07XG5cbmNvbnN0IGlkVG9Sb29tID0gKHF1ZXVlSWQ6IG51bWJlcikgPT4gYHEtJHtxdWV1ZUlkfWA7XG4vKipcbiAqIEhhbmRsZSBzZW5kaW5nIHF1ZXVlIHNzZSBldmVudHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU1NFU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzc2VTZXJ2aWNlOiBTU0VTZXJ2aWNlPFF1ZXVlQ2xpZW50TWV0YWRhdGE+LFxuICApIHt9XG5cbiAgc3Vic2NyaWJlQ2xpZW50KFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICByZXM6IFJlc3BvbnNlLFxuICAgIG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLnNzZVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCB7IHJlcywgbWV0YWRhdGEgfSk7XG4gIH1cblxuICAvLyBTZW5kIGV2ZW50IHdpdGggbmV3IHF1ZXN0aW9ucywgYnV0IG5vIG1vcmUgdGhhbiBvbmNlIGEgc2Vjb25kXG4gIHVwZGF0ZVF1ZXN0aW9ucyA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgaWYgKHF1ZXN0aW9ucykge1xuICAgICAgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICh7IHJvbGUsIHVzZXJJZCB9KSA9PiAoe1xuICAgICAgICBxdWVzdGlvbnM6IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgcm9sZSxcbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZVF1ZXVlID0gdGhpcy50aHJvdHRsZVVwZGF0ZShhc3luYyAocXVldWVJZCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlbmRUb1Jvb20ocXVldWVJZCwgYXN5bmMgKCkgPT4gKHsgcXVldWUgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kVG9Sb29tKFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBkYXRhOiAobWV0YWRhdGE6IFF1ZXVlQ2xpZW50TWV0YWRhdGEpID0+IFByb21pc2U8U1NFUXVldWVSZXNwb25zZT4sXG4gICkge1xuICAgIGF3YWl0IHRoaXMuc3NlU2VydmljZS5zZW5kRXZlbnQoaWRUb1Jvb20ocXVldWVJZCksIGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsZVVwZGF0ZSh1cGRhdGVGdW5jdGlvbjogKHF1ZXVlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIHJldHVybiB0aHJvdHRsZShcbiAgICAgIGFzeW5jIChxdWV1ZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVGdW5jdGlvbihxdWV1ZUlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAge1xuICAgICAgICBsZWFkaW5nOiBmYWxzZSxcbiAgICAgICAgdHJhaWxpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnQ8VD4ge1xuICBtZXRhZGF0YTogVDtcbiAgcmVzOiBSZXNwb25zZTtcbn1cbi8qKlxuICogVCBpcyBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBDbGllbnRcbiAqXG4gKiBMb3cgbGV2ZWwgYWJzdHJhY3Rpb24gZm9yIHNlbmRpbmcgU1NFIHRvIFwicm9vbXNcIiBvZiBjbGllbnRzLlxuICogUHJvYmFibHkgZG9uJ3QgdXNlIHRoaXMgZGlyZWN0bHksIGFuZCB3cmFwIGl0IGluIGEgc2VydmljZSBzcGVjaWZpYyB0byB0aGF0IGV2ZW50IHNvdXJjZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1NFU2VydmljZTxUPiB7XG4gIHByaXZhdGUgY2xpZW50czogUmVjb3JkPGFueSwgQ2xpZW50PFQ+W10+ID0ge307XG5cbiAgLyoqIEFkZCBhIGNsaWVudCB0byBhIHJvb20gKi9cbiAgc3Vic2NyaWJlQ2xpZW50KHJvb206IHN0cmluZywgY2xpZW50OiBDbGllbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHJlc3BvbnNlcyBzbyB3ZSBjYW4gc2VuZCBzc2UgdGhyb3VnaCB0aGVtXG4gICAgaWYgKCEocm9vbSBpbiB0aGlzLmNsaWVudHMpKSB7XG4gICAgICB0aGlzLmNsaWVudHNbcm9vbV0gPSBbXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vbXJlZiA9IHRoaXMuY2xpZW50c1tyb29tXTtcbiAgICByb29tcmVmLnB1c2goY2xpZW50KTtcblxuICAgIC8vIFJlbW92ZSBkZWFkIGNvbm5lY3Rpb25zIVxuICAgIGNsaWVudC5yZXMuc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICByb29tcmVmLnNwbGljZShyb29tcmVmLmluZGV4T2YoY2xpZW50KSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2VuZCBzb21lIGRhdGEgdG8gZXZlcnlvbmUgaW4gYSByb29tICovXG4gIGFzeW5jIHNlbmRFdmVudDxEPihcbiAgICByb29tOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogKG1ldGFkYXRhOiBUKSA9PiBQcm9taXNlPEQ+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUoYXdhaXQgcGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQge1xuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb24sXG4gIFJvbGUsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbiAgU3RhdHVzU2VudFRvQ3JlYXRvcixcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTm90Rm91bmRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9QbGFpbiB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJ3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuLyoqXG4gKiBHZXQgZGF0YSBpbiBzZXJ2aWNlIG9mIHRoZSBxdWV1ZSBjb250cm9sbGVyIGFuZCBTU0VcbiAqIFdIWT8gVG8gZW5zdXJlIGRhdGEgcmV0dXJuZWQgYnkgZW5kcG9pbnRzIGlzICpleGFjdGx5KiBlcXVhbCB0byBkYXRhIHNlbnQgYnkgU1NFXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgYXN5bmMgZ2V0UXVldWUocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocXVldWVJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlVGltZXMoKTtcbiAgICBhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpO1xuICAgIGF3YWl0IHF1ZXVlLmFkZFF1ZXVlU2l6ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgYXN5bmMgZ2V0UXVlc3Rpb25zKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8TGlzdFF1ZXN0aW9uc1Jlc3BvbnNlPiB7XG4gICAgLy8gdG9kbzogTWFrZSBhIHN0dWRlbnQgYW5kIGEgVEEgdmVyc2lvbiBvZiB0aGlzIGZ1bmN0aW9uLCBhbmQgc3dpdGNoIHdoaWNoIG9uZSB0byB1c2UgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAvLyBmb3Igbm93LCBqdXN0IHJldHVybiB0aGUgc3R1ZGVudCByZXNwb25zZVxuICAgIGNvbnN0IHF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY291bnQoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICB9KTtcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBxdWV1ZSBleGlzdHNcbiAgICBpZiAocXVldWVTaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbnNGcm9tRGIgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmQoe1xuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHF1ZXVlSWQsXG4gICAgICAgIHN0YXR1czogSW4oW1xuICAgICAgICAgIC4uLlN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgICAgICAgICAuLi5TdGF0dXNJblF1ZXVlLFxuICAgICAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICBdKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBxdWVzdGlvbnMgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG5cbiAgICBxdWVzdGlvbnMucXVldWUgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKChxdWVzdGlvbikgPT5cbiAgICAgIFN0YXR1c0luUXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5xdWVzdGlvbnNHZXR0aW5nSGVscCA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoXG4gICAgICAocXVlc3Rpb24pID0+IHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5wcmlvcml0eVF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblByaW9yaXR5UXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvKiogSGlkZSBzZW5zaXRpdmUgZGF0YSB0byBvdGhlciBzdHVkZW50cyAqL1xuICBhc3luYyBwZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICBxdWVzdGlvbnM6IExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGlmIChyb2xlID09PSBSb2xlLlNUVURFTlQpIHtcbiAgICAgIGNvbnN0IG5ld0xRUiA9IG5ldyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UoKTtcbiAgICAgIE9iamVjdC5hc3NpZ24obmV3TFFSLCBxdWVzdGlvbnMpO1xuXG4gICAgICBuZXdMUVIucXVldWUgPSBxdWVzdGlvbnMucXVldWUubWFwKChxdWVzdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBjcmVhdG9yID1cbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkID09PSB1c2VySWRcbiAgICAgICAgICAgID8gcXVlc3Rpb24uY3JlYXRvclxuICAgICAgICAgICAgOiBwaWNrKHF1ZXN0aW9uLmNyZWF0b3IsIFsnaWQnXSk7XG4gICAgICAgIC8vIGNsYXNzVG9DbGFzcyB0cmFuc2Zvcm1lciB3aWxsIGFwcGx5IHRoZSBARXhjbHVkZXNcbiAgICAgICAgcmV0dXJuIGNsYXNzVG9DbGFzczxRdWVzdGlvbj4oXG4gICAgICAgICAgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoeyAuLi5xdWVzdGlvbiwgY3JlYXRvciB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXdMUVIueW91clF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHtcbiAgICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBjcmVhdG9ySWQ6IHVzZXJJZCxcbiAgICAgICAgICBzdGF0dXM6IEluKFN0YXR1c1NlbnRUb0NyZWF0b3IpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBuZXdMUVIucHJpb3JpdHlRdWV1ZSA9IFtdO1xuXG4gICAgICByZXR1cm4gbmV3TFFSO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZUNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXVlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWV1ZS5zdWJzY3JpYmVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVldWVDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUXVldWVDbGVhblNlcnZpY2UsXG4gICAgUXVldWVTZXJ2aWNlLFxuICAgIFF1ZXVlU1NFU2VydmljZSxcbiAgICBRdWV1ZVN1YnNjcmliZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtRdWV1ZUNsZWFuU2VydmljZSwgUXVldWVTU0VTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1NTRU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBHZXRRdWV1ZVJlc3BvbnNlLFxuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXVlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBSZXMsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAncHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZSB9IGZyb20gJy4vcXVldWUtcm9sZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdxdWV1ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXVlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVldWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8R2V0UXVldWVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgfVxuXG4gIEBHZXQoJzpxdWV1ZUlkL3F1ZXN0aW9ucycpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWVzdGlvbnMoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgcXVlc3Rpb25zLFxuICAgICAgdXNlcklkLFxuICAgICAgcm9sZSxcbiAgICApO1xuICB9XG5cbiAgQFBhdGNoKCc6cXVldWVJZCcpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgdXBkYXRlUXVldWUoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVldWVQYXJhbXMsXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVldWUocXVldWVJZCk7XG4gICAgaWYgKHF1ZXVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIHF1ZXVlLm5vdGVzID0gYm9keS5ub3RlcztcbiAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IGJvZHkuYWxsb3dRdWVzdGlvbnM7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIC8vIEVuZHBvaW50IHRvIHNlbmQgZnJvbnRlbmQgcmVjZWl2ZSBzZXJ2ZXItc2VudCBldmVudHMgd2hlbiBxdWV1ZSBjaGFuZ2VzXG4gIEBHZXQoJzpxdWV1ZUlkL3NzZScpXG4gIHNlbmRFdmVudChcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICApOiB2b2lkIHtcbiAgICByZXMuc2V0KHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9ldmVudC1zdHJlYW0nLFxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUnLFxuICAgICAgJ1gtQWNjZWwtQnVmZmVyaW5nJzogJ25vJyxcbiAgICAgIENvbm5lY3Rpb246ICdrZWVwLWFsaXZlJyxcbiAgICB9KTtcblxuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChxdWV1ZUlkLCByZXMsIHsgcm9sZSwgdXNlcklkIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFF1ZXVlUm9sZSA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICBhc3luYyAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZT8uY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGU7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShyZXF1ZXN0LnBhcmFtcy5xdWV1ZUlkKTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1F1ZXVlIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHF1ZXVlLmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJy4vc3NlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHsgcHJvdmlkZXJzOiBbU1NFU2VydmljZV0sIGV4cG9ydHM6IFtTU0VTZXJ2aWNlXSB9KVxuZXhwb3J0IGNsYXNzIFNTRU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvbixcbiAgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZSxcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVN1YnNjcmliZXIgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXVlTW9kZWw+IHtcbiAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UpIHtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVldWVNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWV1ZU1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUoZXZlbnQuZW50aXR5LmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJQ2FsQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaWNhbFNlcnZpY2U6IEljYWxTZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2ljYWw6c2NyYXBlJyxcbiAgICBkZXNjcmliZTogJ3NjcmFwZSBpY2FsIGZvciBhIGNvdXJzZScsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmljYWxTZXJ2aWNlLnVwZGF0ZUFsbENvdXJzZXMoKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWNvbW1hbmRcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7XG4gIGZyb21VUkwsXG4gIENhbGVuZGFyQ29tcG9uZW50LFxuICBDYWxlbmRhclJlc3BvbnNlLFxuICBWRXZlbnQsXG59IGZyb20gJ25vZGUtaWNhbCc7XG5pbXBvcnQgeyBEZWVwUGFydGlhbCwgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBmaW5kT25lSWFuYSB9IGZyb20gJ3dpbmRvd3MtaWFuYS9kaXN0JztcbmltcG9ydCAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCB7IFJSdWxlIH0gZnJvbSAncnJ1bGUnO1xuXG50eXBlIE1vbWVudCA9IG1vbWVudC5Nb21lbnQ7XG5cbnR5cGUgQ3JlYXRlT2ZmaWNlSG91ciA9IERlZXBQYXJ0aWFsPE9mZmljZUhvdXJNb2RlbD5bXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEljYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIC8vIHR6IHNob3VsZCBub3QgYmUgcHJlY29udmVydGVkIGJ5IGZpbmRPbmVJYW5hXG4gIHByaXZhdGUgZml4T3V0bG9va1RaKGRhdGU6IE1vbWVudCwgdHo6IHN0cmluZyk6IE1vbWVudCB7XG4gICAgY29uc3QgaWFuYSA9IGZpbmRPbmVJYW5hKHR6KTsgLy8gR2V0IElBTkEgdGltZXpvbmUgZnJvbSB3aW5kb3dzIHRpbWV6b25lXG4gICAgaWYgKGlhbmEpIHtcbiAgICAgIC8vIE1vdmUgdG8gdGhlIHRpbWV6b25lIGJlY2F1c2Ugbm9kZS1pY2FsIGRpZG4ndCBkbyBpdCBmb3IgdXMsIHNpbmNlIGl0IGRvZXMgbm90IHJlY29nbml6ZSB3aW5kb3dzIHRpbWV6b25lXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGUpLnR6KGlhbmEsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmF0ZSBkYXRlIG9mIG9jY3VyZW5jZXMgZm9yIGFuIHJydWxlIGluIHRoZSBnaXZlbiB0aW1lem9uZSwgZXhjbHVkaW5nIHRoZSBsaXN0IG9mIGRhdGVzXG4gIHByaXZhdGUgcnJ1bGVUb0RhdGVzKHJydWxlOiBhbnksIGV2ZW50VFo6IHN0cmluZywgZXhkYXRlUmF3OiBEYXRlW10pOiBEYXRlW10ge1xuICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gcnJ1bGU7XG4gICAgY29uc3QgZHRzdGFydDogTW9tZW50ID0gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMuZHRzdGFydCksIGV2ZW50VFopO1xuICAgIGNvbnN0IHVudGlsOiBNb21lbnQgPVxuICAgICAgb3B0aW9ucy51bnRpbCAmJiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob3B0aW9ucy51bnRpbCksIGV2ZW50VFopO1xuICAgIGNvbnN0IGV2ZW50VFpNb21lbnQgPSBtb21lbnQudHouem9uZShmaW5kT25lSWFuYShldmVudFRaKSB8fCBldmVudFRaKTtcblxuICAgIC8vIEdldCB0aGUgVVRDIE9mZnNldCBpbiB0aGlzIGV2ZW50J3MgdGltZXpvbmUsIGF0IHRoaXMgdGltZS4gQWNjb3VudHMgZm9yIERheWxpZ2h0IFNhdmluZ3MgYW5kIG90aGVyIG9kZGl0aWVzXG4gICAgY29uc3QgdHpVVENPZmZzZXRPbkRhdGUgPSAoZGF0ZTogTW9tZW50KSA9PlxuICAgICAgZXZlbnRUWk1vbWVudC51dGNPZmZzZXQoZGF0ZS52YWx1ZU9mKCkpO1xuICAgIGNvbnN0IGR0c3RhcnRVVENPZmZzZXQgPSB0elVUQ09mZnNldE9uRGF0ZShkdHN0YXJ0KTtcblxuICAgIC8vIEFwcGx5IGEgVVRDIG9mZnNldCBpbiBtaW51dGVzIHRvIHRoZSBnaXZlbiBNb21lbnRcbiAgICBjb25zdCBhcHBseU9mZnNldCA9IChkYXRlOiBNb21lbnQsIHV0Y09mZnNldDogbnVtYmVyKTogTW9tZW50ID0+XG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QodXRjT2Zmc2V0LCAnbScpO1xuICAgIC8vIGFwcGx5IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcHJlUlJ1bGUgPSAoZGF0ZTogTW9tZW50KSA9PiBhcHBseU9mZnNldChkYXRlLCBkdHN0YXJ0VVRDT2Zmc2V0KTtcbiAgICAvLyBSZXZlcnQgdGhlIFVUQyBhZGp1c3RtZW50IHJlcXVpcmVkIGJ5IHRoZSBycnVsZSBsaWJcbiAgICBjb25zdCBwb3N0UlJ1bGUgPSAoZGF0ZTogTW9tZW50KSA9PiBhcHBseU9mZnNldChkYXRlLCAtZHRzdGFydFVUQ09mZnNldCk7XG5cbiAgICAvLyBBZGp1c3QgZm9yIHJydWxlIG5vdCB0YWtpbmcgaW50byBhY2NvdW50IERTVCBpbiBsb2NhbGVcbiAgICAvLyAgIGllLiBcIjhwbSBldmVyeSBmcmlkYXlcIiBtZWFucyBoYXZpbmcgdG8gcHVzaCBiYWNrIDYwIG1pbnV0ZXMgYWZ0ZXIgRmFsbCBCYWNrd2FyZHNcbiAgICBjb25zdCBmaXhEU1QgPSAoZGF0ZTogTW9tZW50KTogTW9tZW50ID0+XG4gICAgICAvLyBHZXQgdGhlIGRpZmZlcmVuY2UgaW4gVVRDIG9mZnNldCBiZXR3ZWVuIGR0c3RhcnQgYW5kIHRoaXMgZGF0ZSAoc28gaWYgd2UgY3Jvc3NlZCBEU1Qgc3dpdGNoLCB0aGlzIHdpbGwgYmUgbm9uemVybylcbiAgICAgIG1vbWVudChkYXRlKS5zdWJ0cmFjdChkdHN0YXJ0VVRDT2Zmc2V0IC0gdHpVVENPZmZzZXRPbkRhdGUoZGF0ZSksICdtJyk7XG5cbiAgICBjb25zdCBydWxlID0gbmV3IFJSdWxlKHtcbiAgICAgIGZyZXE6IG9wdGlvbnMuZnJlcSxcbiAgICAgIGludGVydmFsOiBvcHRpb25zLmludGVydmFsLFxuICAgICAgd2tzdDogb3B0aW9ucy53a3N0LFxuICAgICAgY291bnQ6IG9wdGlvbnMuY291bnQsXG4gICAgICBieXdlZWtkYXk6IG9wdGlvbnMuYnl3ZWVrZGF5LFxuICAgICAgZHRzdGFydDogcHJlUlJ1bGUoZHRzdGFydCkudG9EYXRlKCksXG4gICAgICB1bnRpbDogdW50aWwgJiYgcHJlUlJ1bGUodW50aWwpLnRvRGF0ZSgpLFxuICAgIH0pO1xuXG4gICAgLy8gRGF0ZXMgdG8gZXhjbHVkZSBmcm9tIHJlY3VycmVuY2UsIHNlcGFyYXRlIGV4ZGF0ZSB0aW1lc3RhbXAgZm9yIGZpbHRlcmluZ1xuICAgIGNvbnN0IGV4ZGF0ZXM6IG51bWJlcltdID0gT2JqZWN0LnZhbHVlcyhleGRhdGVSYXcgfHwge30pXG4gICAgICAubWFwKChkKSA9PiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQoZCksIGV2ZW50VFopKVxuICAgICAgLm1hcCgoZCkgPT4gYXBwbHlPZmZzZXQoZCwgdHpVVENPZmZzZXRPbkRhdGUoZCkpLnZhbHVlT2YoKSk7XG5cbiAgICAvLyBEb2luZyBtYXRoIGhlcmUgYmVjYXVzZSBtb21lbnQuYWRkIGNoYW5nZXMgYmVoYXZpb3IgYmFzZWQgb24gc2VydmVyIHRpbWV6b25lXG4gICAgY29uc3QgaW4xMFdlZWtzID0gbmV3IERhdGUoXG4gICAgICBkdHN0YXJ0LnZhbHVlT2YoKSArIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICogMTAsXG4gICAgKTtcbiAgICByZXR1cm4gcnVsZVxuICAgICAgLmFsbCgoZCkgPT4gISF1bnRpbCB8fCBkIDwgaW4xMFdlZWtzKVxuICAgICAgLmZpbHRlcigoZGF0ZSkgPT4gIWV4ZGF0ZXMuaW5jbHVkZXMoZGF0ZS5nZXRUaW1lKCkpKVxuICAgICAgLm1hcCgoZCkgPT4gZml4RFNUKHBvc3RSUnVsZShtb21lbnQoZCkpKS50b0RhdGUoKSk7XG4gIH1cblxuICBwYXJzZUljYWwoaWNhbERhdGE6IENhbGVuZGFyUmVzcG9uc2UsIGNvdXJzZUlkOiBudW1iZXIpOiBDcmVhdGVPZmZpY2VIb3VyIHtcbiAgICBjb25zdCBpY2FsRGF0YVZhbHVlczogQXJyYXk8Q2FsZW5kYXJDb21wb25lbnQ+ID0gT2JqZWN0LnZhbHVlcyhpY2FsRGF0YSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGljYWxEYXRhVmFsdWVzLmZpbHRlcihcbiAgICAgIChpQ2FsRWxlbWVudCk6IGlDYWxFbGVtZW50IGlzIFZFdmVudCA9PlxuICAgICAgICBpQ2FsRWxlbWVudC50eXBlID09PSAnVkVWRU5UJyAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5zdGFydCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGlDYWxFbGVtZW50LmVuZCAhPT0gdW5kZWZpbmVkLFxuICAgICk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc0V2ZW50UmVnZXggPSAvXFxiXihPSHxIb3VycylcXGIvO1xuXG4gICAgY29uc3QgZmlsdGVyZWRPZmZpY2VIb3VycyA9IG9mZmljZUhvdXJzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBvZmZpY2VIb3Vyc0V2ZW50UmVnZXgudGVzdChldmVudC5zdW1tYXJ5KSxcbiAgICApO1xuXG4gICAgbGV0IHJlc3VsdE9mZmljZUhvdXJzID0gW107XG5cbiAgICBmaWx0ZXJlZE9mZmljZUhvdXJzLmZvckVhY2goKG9oOiBWRXZlbnQpID0+IHtcbiAgICAgIC8vIFRoaXMgb2ZmaWNlIGhvdXIgdGltZXpvbmUuIEFTU1VNSU5HIGV2ZXJ5IGRhdGUgZmllbGQgaGFzIHNhbWUgdGltZXpvbmUgYXMgb2guc3RhcnRcbiAgICAgIGNvbnN0IGV2ZW50VFogPSBvaC5zdGFydC50ejtcbiAgICAgIGNvbnN0IHsgcnJ1bGUgfSA9IG9oIGFzIGFueTtcbiAgICAgIGlmIChycnVsZSkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG9oLmVuZC5nZXRUaW1lKCkgLSBvaC5zdGFydC5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgYWxsRGF0ZXMgPSB0aGlzLnJydWxlVG9EYXRlcyhycnVsZSwgZXZlbnRUWiwgb2guZXhkYXRlKTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkT2ZmaWNlSG91cnMgPSBhbGxEYXRlcy5tYXAoKGRhdGUpID0+ICh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogZGF0ZSxcbiAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGR1cmF0aW9uKSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXN1bHRPZmZpY2VIb3VycyA9IHJlc3VsdE9mZmljZUhvdXJzLmNvbmNhdChnZW5lcmF0ZWRPZmZpY2VIb3Vycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRPZmZpY2VIb3Vycy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob2guc3RhcnQpLCBldmVudFRaKS50b0RhdGUoKSxcbiAgICAgICAgICBlbmRUaW1lOiB0aGlzLmZpeE91dGxvb2tUWihtb21lbnQob2guZW5kKSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRPZmZpY2VIb3VycztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBPZmZpY2VIb3VycyBmb3IgYSBnaXZlbiBDb3Vyc2UgYnkgcmVzY3JhcGluZyBpY2FsXG4gICAqIEBwYXJhbSBjb3Vyc2UgdG8gcGFyc2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVDYWxlbmRhckZvckNvdXJzZShjb3Vyc2U6IENvdXJzZU1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgc2NyYXBpbmcgaWNhbCBmb3IgY291cnNlIFwiJHtjb3Vyc2UubmFtZX1cIigke2NvdXJzZS5pZH0gYXQgdXJsOiAke2NvdXJzZS5pY2FsVVJMfS4uLmAsXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWUoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGNvdXJzZUlkOiBjb3Vyc2UuaWQsIHJvb206ICdPbmxpbmUnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb206ICdPbmxpbmUnLFxuICAgICAgICBjb3Vyc2VJZDogY291cnNlLmlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSB0aGlzLnBhcnNlSWNhbChcbiAgICAgIGF3YWl0IGZyb21VUkwoY291cnNlLmljYWxVUkwpLFxuICAgICAgY291cnNlLmlkLFxuICAgICk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmRlbGV0ZSh7IGNvdXJzZUlkOiBjb3Vyc2UuaWQgfSk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLnNhdmUoXG4gICAgICBvZmZpY2VIb3Vycy5tYXAoKGUpID0+IHtcbiAgICAgICAgZS5xdWV1ZUlkID0gcXVldWUuaWQ7XG4gICAgICAgIHJldHVybiBPZmZpY2VIb3VyTW9kZWwuY3JlYXRlKGUpO1xuICAgICAgfSksXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWVFbmQoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgY29uc29sZS5sb2coJ2RvbmUgc2NyYXBpbmchJyk7XG4gIH1cblxuICBAQ3JvbignNTEgMCAqICogKicpXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVBbGxDb3Vyc2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBjb3Vyc2UgaWNhbHMnKTtcbiAgICBjb25zdCBjb3Vyc2VzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZCgpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNvdXJzZXMubWFwKChjKSA9PiB0aGlzLnVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGMpKSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtaWNhbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5kb3dzLWlhbmEvZGlzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQtdGltZXpvbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJydWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZlN1YnNjcmliZXIgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYtc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtOb3RpZmljYXRpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgRGVza3RvcE5vdGlmU3Vic2NyaWJlciwgVHdpbGlvU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBUd2lsaW9TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFdmVudFN1YnNjcmliZXIsXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIENvbm5lY3Rpb24sXG4gIEluc2VydEV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIERlc2t0b3BOb3RpZk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PERlc2t0b3BOb3RpZk1vZGVsPikge1xuICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeURlc2t0b3AoXG4gICAgICBldmVudC5lbnRpdHksXG4gICAgICBcIllvdSd2ZSBzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIGZvciBkZXNrdG9wIG5vdGlmaWNhdGlvbnMhXCIsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFkUmVxdWVzdEV4Y2VwdGlvbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBEZWVwUGFydGlhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0ICogYXMgd2ViUHVzaCBmcm9tICd3ZWItcHVzaCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5leHBvcnQgY29uc3QgTm90aWZNc2dzID0ge1xuICBwaG9uZToge1xuICAgIFdST05HX01FU1NBR0U6XG4gICAgICAnUGxlYXNlIHJlc3BvbmQgd2l0aCBlaXRoZXIgWUVTIG9yIE5PLiBUZXh0IFNUT1AgYXQgYW55IHRpbWUgdG8gc3RvcCByZWNlaXZpbmcgdGV4dCBtZXNzYWdlcycsXG4gICAgQ09VTERfTk9UX0ZJTkRfTlVNQkVSOlxuICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFuIE9mZmljZSBIb3VycyBhY2NvdW50IHdpdGggeW91ciBwaG9uZSBudW1iZXIuJyxcbiAgICBVTlJFR0lTVEVSOlxuICAgICAgXCJZb3UndmUgdW5yZWdpc3RlcmVkIGZyb20gdGV4dCBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBGZWVsIGZyZWUgdG8gcmUtcmVnaXN0ZXIgYW55IHRpbWUgdGhyb3VnaCB0aGUgd2Vic2l0ZVwiLFxuICAgIERVUExJQ0FURTpcbiAgICAgIFwiWW91J3ZlIGFscmVhZHkgYmVlbiB2ZXJpZmllZCB0byByZWNlaXZlIHRleHQgbm90aWZpY2F0aW9ucyBmcm9tIEtob3VyeSBPZmZpY2UgSG91cnMhXCIsXG4gICAgT0s6XG4gICAgICAnVGhhbmsgeW91IGZvciB2ZXJpZnlpbmcgeW91ciBudW1iZXIgd2l0aCBLaG91cnkgT2ZmaWNlIEhvdXJzISBZb3UgYXJlIG5vdyBzaWduZWQgdXAgZm9yIHRleHQgbm90aWZpY2F0aW9ucyEnLFxuICB9LFxuICBxdWV1ZToge1xuICAgIEFMRVJUX0JVVFRPTjpcbiAgICAgIFwiVGhlIFRBIGNvdWxkJ3QgcmVhY2ggeW91LCBwbGVhc2UgaGF2ZSBNaWNyb3NvZnQgVGVhbXMgb3BlbiBhbmQgY29uZmlybSB5b3UgYXJlIGJhY2shXCIsXG4gICAgVEhJUkRfUExBQ0U6IGBZb3UncmUgM3JkIGluIHRoZSBxdWV1ZS4gQmUgcmVhZHkgZm9yIGEgVEEgdG8gY2FsbCB5b3Ugc29vbiFgLFxuICAgIFRBX0hJVF9IRUxQRUQ6ICh0YU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgICAgYCR7dGFOYW1lfSBpcyBjb21pbmcgdG8gaGVscCB5b3UhYCxcbiAgICBSRU1PVkVEOiBgWW91J3ZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBxdWV1ZS4gUGxlYXNlIHJldHVybiB0byB0aGUgYXBwIGZvciBtb3JlIGluZm9ybWF0aW9uLmAsXG4gIH0sXG4gIHRhOiB7XG4gICAgU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUU6XG4gICAgICAnQSBzdHVkZW50IGhhcyBqb2luZWQgeW91ciAocHJldmlvdXNseSBlbXB0eSkgcXVldWUhJyxcbiAgfSxcbn07XG5cbi8vVE9ETyB0ZXN0IHRoaXMgc2VydmljZSBvbWdcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgZGVza3RvcFB1YmxpY0tleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UsXG4gICkge1xuICAgIHdlYlB1c2guc2V0VmFwaWREZXRhaWxzKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRU1BSUwnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFJJVkFURUtFWScpLFxuICAgICk7XG4gICAgdGhpcy5kZXNrdG9wUHVibGljS2V5ID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyk7XG4gIH1cblxuICBhc3luYyByZWdpc3RlckRlc2t0b3AoXG4gICAgaW5mbzogRGVlcFBhcnRpYWw8RGVza3RvcE5vdGlmTW9kZWw+LFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gICAgLy8gY3JlYXRlIGlmIG5vdCBleGlzdFxuICAgIGxldCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkOiBpbmZvLnVzZXJJZCwgZW5kcG9pbnQ6IGluZm8uZW5kcG9pbnQgfSxcbiAgICB9KTtcbiAgICBpZiAoIWRuKSB7XG4gICAgICBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmNyZWF0ZShpbmZvKS5zYXZlKCk7XG4gICAgICBhd2FpdCBkbi5yZWxvYWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRuO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCB1c2VyOiBVc2VyTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBmdWxsTnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwaG9uZU51bWJlcik7XG4gICAgaWYgKCFmdWxsTnVtYmVyKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbigncGhvbmUgbnVtYmVyIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBsZXQgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgIH0pO1xuXG4gICAgaWYgKHBob25lTm90aWZNb2RlbCkge1xuICAgICAgLy8gUGhvbmUgbnVtYmVyIGhhcyBub3QgY2hhbmdlZFxuICAgICAgaWYgKHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9PT0gZnVsbE51bWJlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGp1c3QgY2hhbmdlIGl0XG4gICAgICAgIHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9IGZ1bGxOdW1iZXI7XG4gICAgICAgIHBob25lTm90aWZNb2RlbC52ZXJpZmllZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBwaG9uZU5vdGlmTW9kZWwuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IGZ1bGxOdW1iZXIsXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuXG4gICAgICAvLyBNVVRBVEUgc28gaWYgdXNlci5zYXZlKCkgaXMgY2FsbGVkIGxhdGVyIGl0IGRvZXNuJ3QgZGlzLWFzc29jaWF0ZVxuICAgICAgdXNlci5waG9uZU5vdGlmID0gcGhvbmVOb3RpZk1vZGVsO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMubm90aWZ5UGhvbmUoXG4gICAgICBwaG9uZU5vdGlmTW9kZWwsXG4gICAgICBcIllvdSd2ZSBzaWduZWQgdXAgZm9yIHBob25lIG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIFRvIHZlcmlmeSB5b3VyIG51bWJlciwgcGxlYXNlIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggWUVTLiBUbyB1bnN1YnNjcmliZSwgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBOTyBvciBTVE9QXCIsXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvLyBOb3RpZnkgdXNlciBvbiBhbGwgcGxhdGZvcm1zXG4gIGFzeW5jIG5vdGlmeVVzZXIodXNlcklkOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdGlmTW9kZWxzT2ZVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IFsnZGVza3RvcE5vdGlmcycsICdwaG9uZU5vdGlmJ10sXG4gICAgfSk7XG5cbiAgICAvLyBydW4gdGhlIHByb21pc2VzIGNvbmN1cnJlbnRseVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzRW5hYmxlZCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnMubWFwKGFzeW5jIChubSkgPT5cbiAgICAgICAgICB0aGlzLm5vdGlmeURlc2t0b3Aobm0sIG1lc3NhZ2UpLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYgJiYgbm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZnNFbmFibGVkKSB7XG4gICAgICB0aGlzLm5vdGlmeVBob25lKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYsIG1lc3NhZ2UsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIGRlc2t0b3Agbm90aWZpY2F0aW9uXG4gIGFzeW5jIG5vdGlmeURlc2t0b3Aobm06IERlc2t0b3BOb3RpZk1vZGVsLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd2ViUHVzaC5zZW5kTm90aWZpY2F0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IG5tLmVuZHBvaW50LFxuICAgICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgIHAyNTZkaDogbm0ucDI1NmRoLFxuICAgICAgICAgICAgYXV0aDogbm0uYXV0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKG5tKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIHBob25lIG51bWJlclxuICBhc3luYyBub3RpZnlQaG9uZShcbiAgICBwbjogUGhvbmVOb3RpZk1vZGVsLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmb3JjZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGZvcmNlIHx8IHBuLnZlcmlmaWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2Uuc2VuZFNNUyhwbi5waG9uZU51bWJlciwgbWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9ibGVtIHNlbmRpbmcgbWVzc2FnZScsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyB2ZXJpZnlQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHBob25lTm90aWYgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIgfSxcbiAgICB9KTtcblxuICAgIGlmICghcGhvbmVOb3RpZikge1xuICAgICAgYXBtLnNldEN1c3RvbUNvbnRleHQoeyBwaG9uZU51bWJlciB9KTtcbiAgICAgIGFwbS5jYXB0dXJlRXJyb3IoXG4gICAgICAgIG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcGhvbmUgbnVtYmVyIGR1cmluZyB2ZXJpZmljYXRpb24nKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkNPVUxEX05PVF9GSU5EX05VTUJFUjtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgIT09ICdZRVMnICYmIG1lc3NhZ2UgIT09ICdOTycgJiYgbWVzc2FnZSAhPT0gJ1NUT1AnKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLldST05HX01FU1NBR0U7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlID09PSAnTk8nIHx8IG1lc3NhZ2UgPT09ICdTVE9QJykge1xuICAgICAgLy8gZGlkIHNvbWUgbW9yZSBkaWdnaW5nLCBTVE9QIGp1c3Qgc3RvcHMgbWVzc2FnZXMgY29tcGxldGVseSwgd2UnbGwgbmV2ZXIgcmVjZWl2ZSBpdFxuICAgICAgLy8gc28gdWguLi4gdGhlcmUncyBwcm9iYWJseSBhIHdheSB0byBkbyB0aGF0XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHBob25lTm90aWYpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5VTlJFR0lTVEVSO1xuICAgIH0gZWxzZSBpZiAocGhvbmVOb3RpZi52ZXJpZmllZCkge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5EVVBMSUNBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWYudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgYXdhaXQgcGhvbmVOb3RpZi5zYXZlKCk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLk9LO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2ViLXB1c2hcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIHR3aWxpbyBTREsgdG8gbWFrZSB0ZXN0aW5nIGVhc2llci5cbiAqIFNob3VsZCBOT1QgaW50ZXJhY3Qgd2l0aCBEQiBtb2RlbHMgb3IgZG8gYW55dGhpbmcgc21hcnQuIEp1c3Qgd3JhcCBUd2lsaW8uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUd2lsaW9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB0d2lsaW9DbGllbnQ6IHR3aWxpby5Ud2lsaW87XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy50d2lsaW9DbGllbnQgPSB0d2lsaW8oXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BQ0NPVU5UU0lEJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmdWxsIHBob25lIG51bWJlciBvciByZXR1cm4gZmFsc2UgaWYgcGhvbmUgbnVtYmVyIGlzbid0IHJlYWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGdWxsUGhvbmVOdW1iZXIoXG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBmYWxzZT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMudHdpbGlvQ2xpZW50Lmxvb2t1cHMucGhvbmVOdW1iZXJzKHBob25lTnVtYmVyKS5mZXRjaCgpKVxuICAgICAgICAucGhvbmVOdW1iZXI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBpZiB0aGUgcGhvbmUgbnVtYmVyIGlzIG5vdCBmb3VuZCwgdGhlbiBlbmRwb2ludCBzaG91bGQgcmV0dXJuIGludmFsaWRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBTTVMgdG8gcGhvbmUgbnVtYmVyIHVzaW5nIG91ciBUd2lsaW8gbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZFNNUyhwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgIGZyb206IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT1BIT05FTlVNQkVSJyksXG4gICAgICB0bzogcGhvbmVOdW1iZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aWxpb1wiKTsiLCJpbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgSGVhZGVyLFxuICBIZWFkZXJzLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmQm9keSwgRGVza3RvcE5vdGlmUGFydGlhbCwgVHdpbGlvQm9keSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcignbm90aWZpY2F0aW9ucycpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2Rlc2t0b3AvY3JlZGVudGlhbHMnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgZ2V0RGVza3RvcENyZWRlbnRpYWxzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubm90aWZTZXJ2aWNlLmRlc2t0b3BQdWJsaWNLZXkpO1xuICB9XG5cbiAgQFBvc3QoJ2Rlc2t0b3AvZGV2aWNlJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcFVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBEZXNrdG9wTm90aWZCb2R5LFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZQYXJ0aWFsPiB7XG4gICAgY29uc3QgZGV2aWNlID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJEZXNrdG9wKHtcbiAgICAgIGVuZHBvaW50OiBib2R5LmVuZHBvaW50LFxuICAgICAgZXhwaXJhdGlvblRpbWU6IGJvZHkuZXhwaXJhdGlvblRpbWUgJiYgbmV3IERhdGUoYm9keS5leHBpcmF0aW9uVGltZSksXG4gICAgICBwMjU2ZGg6IGJvZHkua2V5cy5wMjU2ZGgsXG4gICAgICBhdXRoOiBib2R5LmtleXMuYXV0aCxcbiAgICAgIG5hbWU6IGJvZHkubmFtZSxcbiAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogZGV2aWNlLmlkLFxuICAgICAgZW5kcG9pbnQ6IGRldmljZS5lbmRwb2ludCxcbiAgICAgIGNyZWF0ZWRBdDogZGV2aWNlLmNyZWF0ZWRBdCxcbiAgICAgIG5hbWU6IGRldmljZS5uYW1lLFxuICAgIH07XG4gIH1cblxuICBARGVsZXRlKCdkZXNrdG9wL2RldmljZS86ZGV2aWNlSWQnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgZGVsZXRlRGVza3RvcFVzZXIoXG4gICAgQFBhcmFtKCdkZXZpY2VJZCcpIGRldmljZUlkOiBudW1iZXIsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmQoeyBpZDogZGV2aWNlSWQsIHVzZXJJZCB9KTtcbiAgICBpZiAoZG4ubGVuZ3RoID4gMCkge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKGRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2ViaG9vayBmcm9tIHR3aWxpb1xuICBAUG9zdCgnL3Bob25lL3ZlcmlmeScpXG4gIEBIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpXG4gIGFzeW5jIHZlcmlmeVBob25lVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IFR3aWxpb0JvZHksXG4gICAgQEhlYWRlcnMoJ3gtdHdpbGlvLXNpZ25hdHVyZScpIHR3aWxpb1NpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBib2R5LkJvZHkudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgc2VuZGVyTnVtYmVyID0gYm9keS5Gcm9tO1xuXG4gICAgY29uc3QgdHdpbGlvQXV0aFRva2VuID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyk7XG5cbiAgICBjb25zdCBpc1ZhbGlkYXRlZCA9IHR3aWxpby52YWxpZGF0ZVJlcXVlc3QoXG4gICAgICB0d2lsaW9BdXRoVG9rZW4sXG4gICAgICB0d2lsaW9TaWduYXR1cmUudHJpbSgpLFxuICAgICAgYCR7dGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJyl9L2FwaS92MS9ub3RpZmljYXRpb25zL3Bob25lL3ZlcmlmeWAsXG4gICAgICBib2R5LFxuICAgICk7XG5cbiAgICBpZiAoIWlzVmFsaWRhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdNZXNzYWdlIG5vdCBmcm9tIFR3aWxpbycpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VUb1VzZXIgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS52ZXJpZnlQaG9uZShcbiAgICAgIHNlbmRlck51bWJlcixcbiAgICAgIG1lc3NhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBNZXNzYWdpbmdSZXNwb25zZSA9IHR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZVRvVXNlcik7XG5cbiAgICByZXR1cm4gdHdpbWwudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9naW5Db250cm9sbGVyIH0gZnJvbSAnLi9sb2dpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vbG9naW4vand0LnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4gKHtcbiAgICAgICAgc2VjcmV0OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbSnd0U3RyYXRlZ3ksIExvZ2luQ291cnNlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQb3N0LFxuICBRdWVyeSxcbiAgUmVxLFxuICBSZXMsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgSnd0U2VydmljZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7XG4gIEtob3VyeURhdGFQYXJhbXMsXG4gIEtob3VyeVJlZGlyZWN0UmVzcG9uc2UsXG4gIEtob3VyeVN0dWRlbnRDb3Vyc2UsXG4gIEtob3VyeVRBQ291cnNlLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgaHR0cFNpZ25hdHVyZSBmcm9tICdodHRwLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi8uLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgTG9naW5Db3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2dpbi1jb3Vyc2Uuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBsb2dpbkNvdXJzZVNlcnZpY2U6IExvZ2luQ291cnNlU2VydmljZSxcbiAgICBwcml2YXRlIGp3dFNlcnZpY2U6IEp3dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQFBvc3QoJy9raG91cnlfbG9naW4nKVxuICBhc3luYyByZWNpZXZlRGF0YUZyb21LaG91cnkoXG4gICAgQFJlcSgpIHJlcTogUmVxdWVzdCxcbiAgICBAQm9keSgpIGJvZHk6IEtob3VyeURhdGFQYXJhbXMsXG4gICk6IFByb21pc2U8S2hvdXJ5UmVkaXJlY3RSZXNwb25zZT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IHJlcXVlc3QgaGFzIGNvbWUgZnJvbSBLaG91cnlcbiAgICAgIGNvbnN0IHBhcnNlZFJlcXVlc3QgPSBodHRwU2lnbmF0dXJlLnBhcnNlUmVxdWVzdChyZXEpO1xuICAgICAgY29uc3QgdmVyaWZ5ID0gaHR0cFNpZ25hdHVyZS52ZXJpZnlITUFDKFxuICAgICAgICBwYXJzZWRSZXF1ZXN0LFxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdLSE9VUllfUFJJVkFURV9LRVknKSxcbiAgICAgICk7XG4gICAgICBpZiAoIXZlcmlmeSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHVzZXI6IFVzZXJNb2RlbDtcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgY291cnNlczogW10gfSk7XG4gICAgfVxuXG4gICAgLy8gUTogRG8gd2UgbmVlZCB0aGlzIGlmIGl0J3Mgbm90IGdvaW5nIHRvIGNoYW5nZT9cbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB7XG4gICAgICBlbWFpbDogYm9keS5lbWFpbCxcbiAgICAgIG5hbWU6IGJvZHkuZmlyc3RfbmFtZSArICcgJyArIGJvZHkubGFzdF9uYW1lLFxuICAgICAgcGhvdG9VUkw6ICcnLFxuICAgIH0pO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZXMgPSBbXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkuY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVN0dWRlbnRDb3Vyc2UpID0+IHtcbiAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2VNb2RlbCA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICAgICAgICBjLmNvdXJzZSxcbiAgICAgICAgICBjLnNlY3Rpb24sXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvdXJzZSkge1xuICAgICAgICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgICAgUm9sZS5TVFVERU5ULFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh1c2VyQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS50YV9jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5VEFDb3Vyc2UpID0+IHtcbiAgICAgICAgLy8gUXVlcnkgZm9yIGFsbCB0aGUgY291cnNlcyB3aGljaCBtYXRjaCB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJpYyBjb3Vyc2UgZnJvbSBLaG91cnlcbiAgICAgICAgY29uc3QgY291cnNlTWFwcGluZ3MgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmQoe1xuICAgICAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjLmNvdXJzZSB9LCAvLyBUT0RPOiBBZGQgc2VtZXN0ZXIgc3VwcG9ydFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvdXJzZU1hcHBpbmcgb2YgY291cnNlTWFwcGluZ3MpIHtcbiAgICAgICAgICBjb25zdCB0YUNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2VNYXBwaW5nLmNvdXJzZUlkLFxuICAgICAgICAgICAgUm9sZS5UQSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godGFDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIHVzZXIuY291cnNlcyA9IHVzZXJDb3Vyc2VzO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKFxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcbiAgICAgIHsgZXhwaXJlc0luOiA1ICogNjAgfSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICByZWRpcmVjdDpcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJykgKyBgL2FwaS92MS9sb2dpbi9lbnRyeT90b2tlbj0ke3Rva2VufWAsXG4gICAgfTtcbiAgfVxuXG4gIC8vIE5PVEU6IEFsdGhvdWdoIHRoZSB0d28gcm91dGVzIGJlbG93IGFyZSBvbiB0aGUgYmFja2VuZCxcbiAgLy8gdGhleSBhcmUgbWVhbnQgdG8gYmUgdmlzaXRlZCBieSB0aGUgYnJvd3NlciBzbyBhIGNvb2tpZSBjYW4gYmUgc2V0XG5cbiAgLy8gVGhpcyBpcyB0aGUgcmVhbCBhZG1pbiBlbnRyeSBwb2ludFxuICBAR2V0KCcvbG9naW4vZW50cnknKVxuICBhc3luYyBlbnRlckZyb21LaG91cnkoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd0b2tlbicpIHRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlzVmVyaWZpZWQgPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2UudmVyaWZ5QXN5bmModG9rZW4pO1xuXG4gICAgaWYgKCFpc1ZlcmlmaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuand0U2VydmljZS5kZWNvZGUodG9rZW4pIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcblxuICAgIHRoaXMuZW50ZXIocmVzLCBwYXlsb2FkLnVzZXJJZCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGZvciBsb2dpbiBvbiBkZXZlbG9wbWVudCBvbmx5XG4gIEBHZXQoJy9sb2dpbi9kZXYnKVxuICBAVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbiAgYXN5bmMgZW50ZXJGcm9tRGV2KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndXNlcklkJykgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZW50ZXIocmVzLCB1c2VySWQpO1xuICB9XG5cbiAgLy8gU2V0IGNvb2tpZSBhbmQgcmVkaXJlY3QgdG8gcHJvcGVyIHBhZ2VcbiAgcHJpdmF0ZSBhc3luYyBlbnRlcihyZXM6IFJlc3BvbnNlLCB1c2VySWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGF1dGhUb2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoeyB1c2VySWQgfSk7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNvb2tpZSgnYXV0aF90b2tlbicsIGF1dGhUb2tlbiwgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy8nKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cC1zaWduYXR1cmVcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb25Qcm9kdWN0aW9uR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNhbkFjdGl2YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNQcm9kKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ2NvdXJzZV9zZWN0aW9uX21hcHBpbmdfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIC8vIFRoaXMgaXMgdGhlIGNvdXJzZSBuYW1lIHRoYXQgaXMgc2VudCB0byB1cyBmcm9tIHRoZSBraG91cnkgYW1pbiBiYWNrZW5kXG4gIEBDb2x1bW4oKVxuICBnZW5lcmljQ291cnNlTmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oKVxuICBzZWN0aW9uOiBudW1iZXI7XG5cbiAgLy8gUmVwcmVzZW50cyB0aGUgY291cnNlIHRoYXQgdGhpcyBtYXBzIHRvXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICdjb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5Db3Vyc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgY291cmVzTmFtZTogc3RyaW5nLFxuICAgIGNvdXJzZVNlY3Rpb246IG51bWJlcixcbiAgKTogUHJvbWlzZTxDb3Vyc2VNb2RlbD4ge1xuICAgIGNvbnN0IGNvdXJzZVNlY3Rpb25Nb2RlbCA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBnZW5lcmljQ291cnNlTmFtZTogY291cmVzTmFtZSwgc2VjdGlvbjogY291cnNlU2VjdGlvbiB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZSddLFxuICAgIH0pO1xuICAgIHJldHVybiBjb3Vyc2VTZWN0aW9uTW9kZWw/LmNvdXJzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgdXNlcklkOiBudW1iZXIsXG4gICAgY291cnNlSWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB1c2VyQ291cnNlOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZCwgY291cnNlSWQsIHJvbGUgfSxcbiAgICB9KTtcbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgcm9sZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IEV4dHJhY3RKd3QsIFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtand0JztcbmltcG9ydCB7IFBhc3Nwb3J0U3RyYXRlZ3kgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0U3RyYXRlZ3kgZXh0ZW5kcyBQYXNzcG9ydFN0cmF0ZWd5KFN0cmF0ZWd5KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBqd3RGcm9tUmVxdWVzdDogKHJlcTogUmVxdWVzdCkgPT4gcmVxLmNvb2tpZXNbJ2F1dGhfdG9rZW4nXSxcbiAgICAgIGlnbm9yZUV4cGlyYXRpb246IGZhbHNlLFxuICAgICAgc2VjcmV0T3JLZXk6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgfSk7XG4gIH1cblxuICB2YWxpZGF0ZShwYXlsb2FkOiB7IHVzZXJJZDogbnVtYmVyIH0pOiBhbnkge1xuICAgIHJldHVybiB7IC4uLnBheWxvYWQgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtand0XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByb2ZpbGVDb250cm9sbGVyIH0gZnJvbSAnLi9wcm9maWxlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIGNvbnRyb2xsZXJzOiBbUHJvZmlsZUNvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQsIFVzZUd1YXJkcywgUGF0Y2gsIEJvZHkgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgR2V0UHJvZmlsZVJlc3BvbnNlLFxuICBVcGRhdGVQcm9maWxlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3Byb2ZpbGUnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0KFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgY291cnNlcyA9IHVzZXIuY291cnNlc1xuICAgICAgLmZpbHRlcigodXNlckNvdXJzZSkgPT4gdXNlckNvdXJzZS5jb3Vyc2UuZW5hYmxlZClcbiAgICAgIC5tYXAoKHVzZXJDb3Vyc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb3Vyc2U6IHtcbiAgICAgICAgICAgIGlkOiB1c2VyQ291cnNlLmNvdXJzZUlkLFxuICAgICAgICAgICAgbmFtZTogdXNlckNvdXJzZS5jb3Vyc2UubmFtZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGU6IHVzZXJDb3Vyc2Uucm9sZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmUGFydGlhbFtdID0gdXNlci5kZXNrdG9wTm90aWZzLm1hcChcbiAgICAgIChkKSA9PiAoe1xuICAgICAgICBlbmRwb2ludDogZC5lbmRwb2ludCxcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGNyZWF0ZWRBdDogZC5jcmVhdGVkQXQsXG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCB1c2VyUmVzcG9uc2UgPSBwaWNrKHVzZXIsIFtcbiAgICAgICdpZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ25hbWUnLFxuICAgICAgJ3Bob3RvVVJMJyxcbiAgICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICBdKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXNlclJlc3BvbnNlLFxuICAgICAgY291cnNlcyxcbiAgICAgIHBob25lTnVtYmVyOiB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyLFxuICAgICAgZGVza3RvcE5vdGlmcyxcbiAgICB9O1xuICB9XG5cbiAgQFBhdGNoKClcbiAgYXN5bmMgcGF0Y2goXG4gICAgQEJvZHkoKSB1c2VyUGF0Y2g6IFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB1c2VyUGF0Y2gpO1xuICAgIGlmIChcbiAgICAgIHVzZXIucGhvbmVOb3RpZnNFbmFibGVkICYmXG4gICAgICB1c2VyUGF0Y2gucGhvbmVOdW1iZXIgIT09IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXJcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyUGhvbmUodXNlclBhdGNoLnBob25lTnVtYmVyLCB1c2VyKTtcbiAgICB9XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXQodXNlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vcXVlc3Rpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWVzdGlvblN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXN0aW9uLnN1YnNjcmliZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWVzdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtRdWVzdGlvblN1YnNjcmliZXJdLFxuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlLCBRdWV1ZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG4gIEdldFF1ZXN0aW9uUmVzcG9uc2UsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXNLZXlzLFxuICBSb2xlLFxuICBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlciwgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Sb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWVzdGlvbi1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdxdWVzdGlvbnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXN0aW9uUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXN0aW9uSWQnKVxuICBhc3luYyBnZXRRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8R2V0UXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFJvbGUuU1RVREVOVClcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxDcmVhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvblR5cGUsIHF1ZXVlSWQsIGZvcmNlIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignUG9zdGVkIHRvIGFuIGludmFsaWQgcXVldWUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXF1ZXVlLmFsbG93UXVlc3Rpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbignUXVldWUgbm90IGFsbG93aW5nIG5ldyBxdWVzdGlvbnMnKTtcbiAgICB9XG4gICAgaWYgKCEoYXdhaXQgcXVldWUuY2hlY2tJc09wZW4oKSkpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdRdWV1ZSBpcyBjbG9zZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1VzZXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBjcmVhdG9ySWQ6IHVzZXIuaWQsXG4gICAgICAgIHN0YXR1czogSW4oT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoISFwcmV2aW91c1VzZXJRdWVzdGlvbikge1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHByZXZpb3VzVXNlclF1ZXN0aW9uLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQ7XG4gICAgICAgIGF3YWl0IHByZXZpb3VzVXNlclF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICAgIFwiWW91IGNhbid0IGNyZWF0ZSBtb3JlIHRoYW4gb25lIHF1ZXN0aW9uIGF0IGEgdGltZS5cIixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHtcbiAgICAgIHF1ZXVlSWQ6IHF1ZXVlSWQsXG4gICAgICBjcmVhdG9yOiB1c2VyLFxuICAgICAgdGV4dCxcbiAgICAgIHF1ZXN0aW9uVHlwZSxcbiAgICAgIHN0YXR1czogUXVlc3Rpb25TdGF0dXNLZXlzLkRyYWZ0aW5nLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgaXNPbmxpbmU6IHRydWUsXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgQFBhdGNoKCc6cXVlc3Rpb25JZCcpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQsIFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICAvLyBUT0RPOiBVc2UgcXVldWVSb2xlIGRlY29yYXRvciwgYnV0IHdlIG5lZWQgdG8gZml4IGl0cyBwZXJmb3JtYW5jZSBmaXJzdFxuICBhc3luYyB1cGRhdGVRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICAgQEJvZHkoKSBib2R5OiBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8VXBkYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGxldCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVlc3Rpb25JZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAncXVldWUnLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDcmVhdG9yID0gdXNlcklkID09PSBxdWVzdGlvbi5jcmVhdG9ySWQ7XG5cbiAgICBpZiAoaXNDcmVhdG9yKSB7XG4gICAgICAvLyBGYWlsIGlmIHN0dWRlbnQgdHJpZXMgYW4gaW52YWxpZCBzdGF0dXMgY2hhbmdlXG4gICAgICBpZiAoYm9keS5zdGF0dXMgJiYgIXF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhib2R5LnN0YXR1cywgUm9sZS5TVFVERU5UKSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIGBTdHVkZW50IGNhbm5vdCBjaGFuZ2Ugc3RhdHVzIGZyb20gJHtxdWVzdGlvbi5zdGF0dXN9IHRvICR7Ym9keS5zdGF0dXN9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGNyZWF0b3IsIGNoZWNrIGlmIHVzZXIgaXMgVEEvUFJPRiBvZiBjb3Vyc2Ugb2YgcXVlc3Rpb25cbiAgICBjb25zdCBpc1RhT3JQcm9mID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVlc3Rpb24ucXVldWUuY291cnNlSWQsXG4gICAgICAgICAgcm9sZTogSW4oW1JvbGUuVEEsIFJvbGUuUFJPRkVTU09SXSksXG4gICAgICAgIH0sXG4gICAgICB9KSkgPiAwO1xuXG4gICAgaWYgKGlzVGFPclByb2YpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggIT09IDEgfHwgT2JqZWN0LmtleXMoYm9keSlbMF0gIT09ICdzdGF0dXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgJ1RBL1Byb2Zlc3NvcnMgY2FuIG9ubHkgZWRpdCBxdWVzdGlvbiBzdGF0dXMnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkU3RhdHVzID0gcXVlc3Rpb24uc3RhdHVzO1xuICAgICAgY29uc3QgbmV3U3RhdHVzID0gYm9keS5zdGF0dXM7XG4gICAgICAvLyBJZiB0aGUgdGFIZWxwZWQgaXMgYWxyZWFkeSBzZXQsIG1ha2Ugc3VyZSB0aGUgc2FtZSB0YSB1cGRhdGVzIHRoZSBzdGF0dXNcbiAgICAgIGlmIChxdWVzdGlvbi50YUhlbHBlZD8uaWQgIT09IHVzZXJJZCkge1xuICAgICAgICBpZiAob2xkU3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgICAnQW5vdGhlciBUQSBpcyBjdXJyZW50bHkgaGVscGluZyB3aXRoIHRoaXMgcXVlc3Rpb24nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgJ0Fub3RoZXIgVEEgaGFzIGFscmVhZHkgcmVzb2x2ZWQgdGhpcyBxdWVzdGlvbicsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0FscmVhZHlIZWxwaW5nT25lID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB0YUhlbHBlZElkOiB1c2VySWQsXG4gICAgICAgICAgICBzdGF0dXM6IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKSA9PT0gMTtcbiAgICAgIGlmIChpc0FscmVhZHlIZWxwaW5nT25lICYmIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ1RBIGlzIGFscmVhZHkgaGVscGluZyBzb21lb25lIGVsc2UnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRUcmFuc2l0aW9uID0gcXVlc3Rpb24uY2hhbmdlU3RhdHVzKG5ld1N0YXR1cywgUm9sZS5UQSk7XG4gICAgICBpZiAoIXZhbGlkVHJhbnNpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgIGBUQSBjYW5ub3QgY2hhbmdlIHN0YXR1cyBmcm9tICR7cXVlc3Rpb24uc3RhdHVzfSB0byAke2JvZHkuc3RhdHVzfWAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBUQSBhcyB0YUhlbHBlZCB3aGVuIHRoZSBUQSBzdGFydHMgaGVscGluZyB0aGUgc3R1ZGVudFxuICAgICAgaWYgKFxuICAgICAgICBvbGRTdGF0dXMgIT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nICYmXG4gICAgICAgIG5ld1N0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmdcbiAgICAgICkge1xuICAgICAgICBxdWVzdGlvbi50YUhlbHBlZCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHVzZXJJZCk7XG4gICAgICAgIHF1ZXN0aW9uLmhlbHBlZEF0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBTZXQgZmlyc3RIZWxwZWRBdCBpZiBpdCBoYXNuJ3QgYWxyZWFkeVxuICAgICAgICBpZiAoIXF1ZXN0aW9uLmZpcnN0SGVscGVkQXQpIHtcbiAgICAgICAgICBxdWVzdGlvbi5maXJzdEhlbHBlZEF0ID0gcXVlc3Rpb24uaGVscGVkQXQ7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBxdWVzdGlvbi5jcmVhdG9yLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy5xdWV1ZS5UQV9ISVRfSEVMUEVEKHF1ZXN0aW9uLnRhSGVscGVkLm5hbWUpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAnTG9nZ2VkLWluIHVzZXIgZG9lcyBub3QgaGF2ZSBlZGl0IGFjY2VzcycsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBQb3N0KCc6cXVlc3Rpb25JZC9ub3RpZnknKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIG5vdGlmeShAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWUnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgIHF1ZXN0aW9uLmNyZWF0b3JJZCxcbiAgICAgICAgTm90aWZNc2dzLnF1ZXVlLkFMRVJUX0JVVFRPTixcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5SRU1PVkVELFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgbGV0IHF1ZXVlSWQ7XG5cbiAgICBpZiAocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCkge1xuICAgICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCk7XG4gICAgICBpZiAoIXF1ZXN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignUXVlc3Rpb24gbm90IGZvdW5kJyk7XG4gICAgICB9XG4gICAgICBxdWV1ZUlkID0gcXVlc3Rpb24ucXVldWVJZDtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuYm9keS5xdWV1ZUlkKSB7XG4gICAgICAvLyBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgbmV3IHF1ZXN0aW9uXG4gICAgICBxdWV1ZUlkID0gcmVxdWVzdC5ib2R5LnF1ZXVlSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdDYW5ub3QgZmluZCBxdWV1ZSBvZiBxdWVzdGlvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQpO1xuXG4gICAgLy8gWW91IGNhbm5vdCBpbnRlcmFjdCB3aXRoIGEgcXVlc3Rpb24gaW4gYSBub25leGlzdGVudCBxdWV1ZVxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignVGhpcyBxdWV1ZSBkb2VzIG5vdCBleGlzdCEnKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgSW5zZXJ0RXZlbnQsXG4gIFJlbW92ZUV2ZW50LFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG5cbiAgICAvLyBTZW5kIHB1c2ggbm90aWZpY2F0aW9uIHRvIHN0dWRlbnRzIHdoZW4gdGhleSBhcmUgaGl0IDNyZCBpbiBsaW5lXG4gICAgLy8gaWYgc3RhdHVzIHVwZGF0ZWQgdG8gY2xvc2VkXG4gICAgaWYgKFxuICAgICAgZXZlbnQudXBkYXRlZENvbHVtbnMuZmluZCgoYykgPT4gYy5wcm9wZXJ0eU5hbWUgPT09ICdzdGF0dXMnKSAmJlxuICAgICAgZXZlbnQuZW50aXR5LnN0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1c1xuICAgICkge1xuICAgICAgLy8gZ2V0IDNyZCBpbiBxdWV1ZSBiZWZvcmUgYW5kIGFmdGVyIHRoaXMgdXBkYXRlXG4gICAgICBjb25zdCBwcmV2aW91c1RoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShcbiAgICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgICApXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgY29uc3QgdGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKGV2ZW50LmVudGl0eS5xdWV1ZUlkKVxuICAgICAgICAuc2V0UXVlcnlSdW5uZXIoZXZlbnQucXVlcnlSdW5uZXIpIC8vIFJ1biBpbiBzYW1lIHRyYW5zYWN0aW9uIGFzIHRoZSB1cGRhdGVcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBpZiAodGhpcmQgJiYgcHJldmlvdXNUaGlyZD8uaWQgIT09IHRoaXJkPy5pZCkge1xuICAgICAgICBjb25zdCB7IGNyZWF0b3JJZCB9ID0gdGhpcmQ7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoY3JlYXRvcklkLCBOb3RpZk1zZ3MucXVldWUuVEhJUkRfUExBQ0UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG51bWJlck9mUXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShcbiAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgIClcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4ub3BlblN0YXR1cyknLCB7XG4gICAgICAgIG9wZW5TdGF0dXM6IFtPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdLFxuICAgICAgfSlcbiAgICAgIC5nZXRDb3VudCgpO1xuXG4gICAgaWYgKG51bWJlck9mUXVlc3Rpb25zID09PSAwKSB7XG4gICAgICBjb25zdCBzdGFmZiA9IChcbiAgICAgICAgYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKGV2ZW50LmVudGl0eS5xdWV1ZUlkLCB7XG4gICAgICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgICAgICB9KVxuICAgICAgKS5zdGFmZkxpc3Q7XG5cbiAgICAgIHN0YWZmLmZvckVhY2goKHN0YWZmKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgc3RhZmYuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnRhLlNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgfVxuXG4gIGFzeW5jIGJlZm9yZVJlbW92ZShldmVudDogUmVtb3ZlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBkdWUgdG8gY2FzY2FkZXMgZW50aXR5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGxvYWRlZFxuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNlZWRDb250cm9sbGVyIH0gZnJvbSAnLi9zZWVkLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1NlZWRDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbU2VlZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWVkTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGUsIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgT2ZmaWNlSG91ckZhY3RvcnksXG4gIFF1ZXN0aW9uRmFjdG9yeSxcbiAgUXVldWVGYWN0b3J5LFxuICBVc2VyQ291cnNlRmFjdG9yeSxcbiAgU2VtZXN0ZXJGYWN0b3J5LFxuICBDb3Vyc2VGYWN0b3J5LFxuICBVc2VyRmFjdG9yeSxcbn0gZnJvbSAnLi4vLi4vdGVzdC91dGlsL2ZhY3Rvcmllcyc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdzZWVkcycpXG5AVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbmV4cG9ydCBjbGFzcyBTZWVkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHNlZWRTZXJ2aWNlOiBTZWVkU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2RlbGV0ZScpXG4gIGFzeW5jIGRlbGV0ZUFsbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKE9mZmljZUhvdXJNb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVlc3Rpb25Nb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVldWVNb2RlbCk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHJlc2V0JztcbiAgfVxuXG4gIEBHZXQoJ2NyZWF0ZScpXG4gIGFzeW5jIGNyZWF0ZVNlZWRzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gRmlyc3QgZGVsZXRlIHRoZSBvbGQgZGF0YVxuICAgIGF3YWl0IHRoaXMuZGVsZXRlQWxsKCk7XG5cbiAgICAvLyBUaGVuIGFkZCB0aGUgbmV3IHNlZWQgZGF0YVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcblxuICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICB0b21vcnJvdy5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDE5KTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpIC0gNDUwMDAwMCksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgMTAwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNZZXN0ZXJkYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB5ZXN0ZXJkYXksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh5ZXN0ZXJkYXkudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb21vcnJvdyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHRvbW9ycm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUodG9tb3Jyb3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VFeGlzdHMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgIH0pO1xuICAgIGlmICghY291cnNlRXhpc3RzKSB7XG4gICAgICBhd2FpdCBTZW1lc3RlckZhY3RvcnkuY3JlYXRlKHsgc2Vhc29uOiAnRmFsbCcsIHllYXI6IDIwMjAgfSk7XG4gICAgICBhd2FpdCBDb3Vyc2VGYWN0b3J5LmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgICByZWxhdGlvbnM6IFsnb2ZmaWNlSG91cnMnXSxcbiAgICB9KTtcblxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IFtcbiAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICBdO1xuICAgIGNvdXJzZS5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyRXhzaXN0cyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKCk7XG4gICAgaWYgKCF1c2VyRXhzaXN0cykge1xuICAgICAgLy8gU3R1ZGVudCAxXG4gICAgICBjb25zdCB1c2VyMSA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnbGl1LnN0YUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1N0YW5sZXkgTGl1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSMjBDRzM2RS1jZjBmMzc1MjUyYmQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjEsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFN0dW5kZW50IDJcbiAgICAgIGNvbnN0IHVzZXIyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICd0YWtheWFtYS5hQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnQWxleCBUYWtheWFtYScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VSkw5NzQ0M0QtNTAxMjEzMzk2ODZiLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIyLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAxXG4gICAgICBjb25zdCB1c2VyMyA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnc3RlbnplbC53QG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnV2lsbCBTdGVuemVsJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSRjI1NktSVC1kMTAwOThlODc5ZGEtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjMsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAyXG4gICAgICBjb25zdCB1c2VyNCA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnY2h1LmRhakBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0RhLUppbiBDaHUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUU1Nlk1VVQxLTg1ZGI1OWE0NzRmNC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyNCxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcm9vbTogJ1dIViAxMDEnLFxuICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICBvZmZpY2VIb3VyczogW1xuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgICBdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDM1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMjUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBHZXQoJ2ZpbGxfcXVldWUnKVxuICBhc3luYyBmaWxsUXVldWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSgpO1xuXG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHNlZWRlZCc7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlVXNlcicpXG4gIGFzeW5jIGNyZWF0ZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiB7IHJvbGU6IFJvbGU7IGNvdXJzZUlkOiBudW1iZXIgfSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdGE6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlLCBjb3Vyc2U6IGNvdXJzZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUgfSk7XG4gICAgfVxuICAgIHJldHVybiB0YTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWV1ZScpXG4gIGFzeW5jIGNyZWF0ZVF1ZXVlKFxuICAgIEBCb2R5KCkgYm9keTogeyBjb3Vyc2VJZDogbnVtYmVyOyBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbiB9LFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBvZmZpY2VIb3VyczogW29mZmljZUhvdXJzXSxcbiAgICAgIGFsbG93UXVlc3Rpb25zOiBib2R5LmFsbG93UXVlc3Rpb25zID8/IGZhbHNlLFxuICAgIH07XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICBvcHRpb25zWydjb3Vyc2UnXSA9IGNvdXJzZTtcbiAgICB9XG4gICAgY29uc3QgcXVldWU6IFF1ZXVlTW9kZWwgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVRdWVzdGlvbicpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KClcbiAgICBib2R5OiB7XG4gICAgICBxdWV1ZUlkOiBudW1iZXI7XG4gICAgICBzdHVkZW50SWQ6IG51bWJlcjtcbiAgICAgIGRhdGE6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zO1xuICAgIH0sXG4gICk6IFByb21pc2U8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBpZiAoYm9keS5xdWV1ZUlkKSB7XG4gICAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnF1ZXVlSWQpO1xuICAgICAgb3B0aW9uc1sncXVldWUnXSA9IHF1ZXVlO1xuICAgIH1cbiAgICBpZiAoYm9keS5zdHVkZW50SWQpIHtcbiAgICAgIGNvbnN0IHN0dWRlbnQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnN0dWRlbnRJZCk7XG4gICAgICBvcHRpb25zWydjcmVhdG9yJ10gPSBzdHVkZW50O1xuICAgIH1cbiAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25Nb2RlbCA9IGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIC4uLmJvZHkuZGF0YSxcbiAgICB9KTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IFF1ZXN0aW9uVHlwZSwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICd0eXBlb3JtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlck1vZGVsKVxuICAuYXR0cignZW1haWwnLCBgdXNlckBuZXUuZWR1YClcbiAgLmF0dHIoJ25hbWUnLCBgVXNlcmApXG4gIC5hdHRyKCdwaG90b1VSTCcsIGBodHRwczovL3BpY3MvdXNlcmApO1xuXG5leHBvcnQgY29uc3QgU3R1ZGVudENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5TVFVERU5ULFxuKTtcblxuZXhwb3J0IGNvbnN0IFRBQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlRBLFxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbWVzdGVyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFNlbWVzdGVyTW9kZWwpXG4gIC5hdHRyKCdzZWFzb24nLCAnRmFsbCcpXG4gIC5hdHRyKCd5ZWFyJywgMjAyMCk7XG5cbmV4cG9ydCBjb25zdCBDbG9zZWRPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE0OjAwOjAwLjAwMFonKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNTozMDowMC4wMDBaJykpO1xuXG5leHBvcnQgY29uc3QgT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDM2MDAwMDApKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMzYwMDAwMCkpO1xuXG5leHBvcnQgY29uc3QgQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZU1vZGVsKVxuICAuYXR0cignbmFtZScsICdDUyAyNTAwJylcbiAgLmF0dHIoJ2ljYWxVUkwnLCAnaHR0cDovL2hpLmNvbScpXG4gIC5hdHRyKCdlbmFibGVkJywgdHJ1ZSlcbiAgLmFzc29jT25lKCdzZW1lc3RlcicsIFNlbWVzdGVyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VTZWN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwpXG4gIC5hdHRyKCdnZW5lcmljQ291cnNlTmFtZScsICdDUyAyNTAwJylcbiAgLnNlcXVlbmNlKCdzZWN0aW9uJywgKGkpID0+IGkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbClcbiAgLmFzc29jT25lKCd1c2VyJywgVXNlckZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ3JvbGUnLCBSb2xlLlNUVURFTlQpO1xuXG5leHBvcnQgY29uc3QgUXVldWVGYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVldWVNb2RlbClcbiAgLmF0dHIoJ3Jvb20nLCAnT25saW5lJylcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cignYWxsb3dRdWVzdGlvbnMnLCBmYWxzZSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSk7XG5cbi8vIFdBUk5JTkc6IERPIE5PVCBVU0UgQ1JFQVRPUklELiBBUyBZT1UgU0VFIEhFUkUsIFdFIE9OTFkgQUNDRVBUIENSRUFUT1Jcbi8vVE9ETzogbWFrZSBpdCBhY2NlcHQgY3JlYXRvcklkIGFzIHdlbGxcbmV4cG9ydCBjb25zdCBRdWVzdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWVzdGlvbk1vZGVsKVxuICAuc2VxdWVuY2UoJ3RleHQnLCAoaSkgPT4gYHF1ZXN0aW9uICR7aX1gKVxuICAuYXR0cignc3RhdHVzJywgJ1F1ZXVlZCcpXG4gIC5hdHRyKCdxdWVzdGlvblR5cGUnLCBRdWVzdGlvblR5cGUuT3RoZXIpXG4gIC5hdHRyKCdjcmVhdGVkQXQnLCBuZXcgRGF0ZSgpKVxuICAuYXNzb2NPbmUoJ3F1ZXVlJywgUXVldWVGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NyZWF0b3InLCBVc2VyRmFjdG9yeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtLWZhY3RvcnlcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZWRTZXJ2aWNlIHtcbiAgYXN5bmMgZGVsZXRlQWxsKG1vZGVsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBnZXRDb25uZWN0aW9uKCkuY3JlYXRlUXVlcnlCdWlsZGVyKCkuZGVsZXRlKCkuZnJvbShtb2RlbCkuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LFxuICBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LFxuICBEZWZhdWx0QWRtaW5TaXRlLFxufSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yIH0gZnJvbSAnLi9jcmVkZW50aWFsVmFsaWRhdG9yJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7XG4gIENvdXJzZUFkbWluLFxuICBRdWV1ZUFkbWluLFxuICBVc2VyQWRtaW4sXG4gIFVzZXJDb3Vyc2VBZG1pbixcbiAgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbixcbn0gZnJvbSAnLi9hZG1pbi1lbnRpdGllcyc7XG5pbXBvcnQgeyBBZG1pbkNvbW1hbmQgfSBmcm9tICcuL2FkbWluLmNvbW1hbmQnO1xuXG5jb25zdCBDb3JlTW9kdWxlID0gQWRtaW5Db3JlTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkNvcmVNb2R1bGUoe30pO1xuY29uc3QgQXV0aE1vZHVsZSA9IEFkbWluQXV0aE1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5BdXRoTW9kdWxlKHtcbiAgYWRtaW5Db3JlTW9kdWxlOiBDb3JlTW9kdWxlLFxuICBjcmVkZW50aWFsVmFsaWRhdG9yOiBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IsIC8vIGhvdyBkbyB5b3UgdmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgaW1wb3J0czogW1R5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbQWRtaW5Vc2VyTW9kZWxdKV0sIC8vIHdoYXQgbW9kdWxlcyBleHBvcnQgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgY3JlZGVudGlhbFZhbGlkYXRvciBhdmFpbGFibGVcbiAgcHJvdmlkZXJzOiBbXSxcbn0pO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0FkbWluQ29tbWFuZF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZG1pblNpdGU6IERlZmF1bHRBZG1pblNpdGUpIHtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZScsIENvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXInLCBVc2VyQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlckNvdXJzZScsIFVzZXJDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdRdWV1ZScsIFF1ZXVlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlU2VjdGlvbk1hcHBpbmcnLCBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWFkbWluXCIpOyIsImltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0JztcblxuZXhwb3J0IGNvbnN0IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciA9IHtcbiAgaW5qZWN0OiBbXSxcbiAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNyZWRlbnRpYWxzKFxuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTxBZG1pblVzZXJNb2RlbD4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGlmIChhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIEJhc2VFbnRpdHksIENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuXG4vKipcbiAqIEFkbWluIHVzZXJzIGFyZSB0b3RhbGx5IHNlcGFyYXRlIGZyb20gcmVndWxhciB1c2VycyBhbmQgY2FuIG9ubHkgYmUgY3JlYXRlZCBmcm9tIGNvbW1hbmQgbGluZS5cbiAqIGB5YXJuIGNsaSBhZG1pbjpjcmVhdGVgXG4gKi9cbkBFbnRpdHkoJ2FkbWluX3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEFkbWluVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBzZXRQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgNSk7XG4gIH1cblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIHVuaXF1ZTogdHJ1ZSwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwiaW1wb3J0IHsgQWRtaW5FbnRpdHkgfSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ25hbWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFF1ZXVlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdyb29tJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXTtcbiAgc2VhcmNoRmllbGRzID0gWydlbWFpbCcsICduYW1lJ107XG4gIGZpZWxkcyA9IFtcbiAgICAnaWQnLFxuICAgICdlbWFpbCcsXG4gICAgJ25hbWUnLFxuICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgJ3F1ZXVlcycsXG4gIF07XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3VzZXJJZCcsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ3NlY3Rpb24nLCAnY291cnNlSWQnXTtcbn1cbiIsImltcG9ydCB7IENvbW1hbmQsIFBvc2l0aW9uYWwgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IHF1ZXN0aW9uLCBrZXlJbllOIH0gZnJvbSAncmVhZGxpbmUtc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkNvbW1hbmQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2NyZWF0ZTphZG1pbiA8dXNlcm5hbWU+JyxcbiAgICBkZXNjcmliZTogJ2NyZWF0ZSBhbiBhZG1pbiB1c2VyJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICBkZXNjcmliZTogJ3RoZSBhZG1pbiB1c2VybmFtZScsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9KVxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VQYXNzd29yZCA9IGtleUluWU4oXG4gICAgICAgIGBVc2VyICR7dXNlcm5hbWV9IGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlaXIgcGFzc3dvcmQ/YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlciA9IEFkbWluVXNlck1vZGVsLmNyZWF0ZSh7IHVzZXJuYW1lIH0pO1xuICAgIH1cbiAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nID0gcXVlc3Rpb24oJ1Bhc3N3b3JkOiAnLCB7XG4gICAgICBoaWRlRWNob0JhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgY29uc29sZS5sb2coYENyZWF0ZWQgdXNlcjogJHt1c2VyLnVzZXJuYW1lfWApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZS1zeW5jXCIpOyIsImltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICBdLFxuICBrZWVwQ29ubmVjdGlvbkFsaXZlOiB0cnVlLFxuICBsb2dnaW5nOiAhIXByb2Nlc3MuZW52LlRZUEVPUk1fTE9HR0lORyxcbiAgLi4uKCEhcHJvY2Vzcy5lbnYuVFlQRU9STV9DTEkgPyBpbkNMSSA6IHt9KSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvcm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFja2ZpbGxQaG9uZU5vdGlmcyB9IGZyb20gJy4vYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQnO1xuaW1wb3J0IHsgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQgfSBmcm9tICcuL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtCYWNrZmlsbFBob25lTm90aWZzLCBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdF0sXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJ25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tmaWxsUGhvbmVOb3RpZnMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cGhvbmUtbm90aWZzJyxcbiAgICBkZXNjcmliZTpcbiAgICAgICdkZWxldGUgcGhvbmUgbm90aWZzIHdpdGggbm8gdXNlcmlkcywgZGVsZXRlIGR1cGxpY2F0ZSBwaG9uZSBub3RpZnMsIGFuZCBmb3JjaWJseSBzZXQgdmVyaWZpZWQgb24gZXhpc3RpbmcgcGhvbmVub3RpZnMnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBmaXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRGVsZXRlIHRob3NlIHdpdGhvdXQgdXNlcmlkcyBhc3NvY2lhdGVkXG4gICAgY29uc3Qgbm9Vc2VyID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZSh7IHVzZXJJZDogSXNOdWxsKCkgfSk7XG4gICAgY29uc29sZS5sb2coYGRlbGV0ZWQgJHtub1VzZXIuYWZmZWN0ZWR9IGRlc2t0b3Bub3RpZm1vZGVscyB3aXRoIG5vIHVzZXJpZGApO1xuXG4gICAgLy8gZGVsZXRlIGF0IG9uY2VcbiAgICBjb25zdCB0b0RlbGV0ZTogUGhvbmVOb3RpZk1vZGVsW10gPSBbXTtcblxuICAgIC8vIERlbGV0ZSBkdXBsaWNhdGVzXG4gICAgY29uc3QgZHVwcyA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ3Bub3RpZicpXG4gICAgICAuc2VsZWN0KFtgXCJwaG9uZU51bWJlclwiYCwgJ0NPVU5UKCopJ10pXG4gICAgICAuZ3JvdXBCeSgncG5vdGlmLnBob25lTnVtYmVyJylcbiAgICAgIC5oYXZpbmcoJ0NPVU5UKCopID4gMScpXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuICAgIGNvbnNvbGUubG9nKGBmb3VuZCAke2R1cHMubGVuZ3RofSBkdXBzYCk7XG4gICAgdG9EZWxldGUucHVzaCguLi5kdXBzKTtcblxuICAgIGNvbnN0IHZhbGlkID0gW107XG4gICAgbGV0IGNoYW5nZWROdW0gPSAwO1xuICAgIC8vIGNoYW5nZSB0byByZWFsIG51bWJlclxuICAgIGNvbnN0IGFsbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kKHsgcmVsYXRpb25zOiBbJ3VzZXInXSB9KTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYWxsKSB7XG4gICAgICBjb25zdCBudW1iZXIgPSBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2UuZ2V0RnVsbFBob25lTnVtYmVyKHAucGhvbmVOdW1iZXIpO1xuICAgICAgaWYgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyICE9PSBwLnBob25lTnVtYmVyKSB7XG4gICAgICAgICAgY2hhbmdlZE51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHAucGhvbmVOdW1iZXIgPSBudW1iZXI7XG4gICAgICAgIHAudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgICB2YWxpZC5wdXNoKHApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9EZWxldGUucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coYFR3aWxpbyBjaGFuZ2VkICR7Y2hhbmdlZE51bX0gcGhvbmUgbnVtYmVycyB0byBmdWxsIG51bWApO1xuICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5zYXZlKHZhbGlkKTtcblxuICAgIC8vIERlbGV0ZSBhbmQgbWFrZSBzdXJlIHRvIGRpc2FibGUgcGhvbmVub3RpZiBmb3IgdXNlclxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ2RlbGV0aW5nIHBob25lIG5vdGlmczogJyxcbiAgICAgIHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5waG9uZU51bWJlciksXG4gICAgKTtcbiAgICBpZiAodG9EZWxldGUubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHRvRGVsZXRlLm1hcCgoZCkgPT4gZC5pZCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzVG9EaXNhYmxlID0gKFxuICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmQoe1xuICAgICAgICB3aGVyZTogeyBwaG9uZU5vdGlmc0VuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgcmVsYXRpb25zOiBbJ3Bob25lTm90aWYnXSxcbiAgICAgIH0pXG4gICAgKS5maWx0ZXIoKHUpID0+ICF1LnBob25lTm90aWYpO1xuICAgIHVzZXJzVG9EaXNhYmxlLmZvckVhY2goKHUpID0+ICh1LnBob25lTm90aWZzRW5hYmxlZCA9IGZhbHNlKSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vyc1RvRGlzYWJsZSk7XG4gICAgY29uc29sZS5sb2coYGRpc2FibGVkIHBob25lbm90aWZzIGZvciAke3VzZXJzVG9EaXNhYmxlLmxlbmd0aH0gdXNlcnNgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxRdWVzdGlvbkZpcnN0SGVscGVkQXQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnF1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdCcsXG4gICAgZGVzY3JpYmU6ICdjb3B5IGFsbCBleGlzdGluZyBoZWxwZWRBdCB0byBmaXJzdEhlbHBlZEF0JyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY29weSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAudXBkYXRlKClcbiAgICAgIC5zZXQoeyBmaXJzdEhlbHBlZEF0OiAoKSA9PiAnXCJoZWxwZWRBdFwiJyB9KVxuICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgIC5jYWxsTGlzdGVuZXJzKGZhbHNlKVxuICAgICAgLmV4ZWN1dGUoKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBVcGRhdGVkICR7YXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGVRdWVyeUJ1aWxkZXIoKVxuICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgLndoZXJlKHsgZmlyc3RIZWxwZWRBdDogSXNOdWxsKCkgfSlcbiAgICAgICAgLmdldENvdW50KCl9IHJlY29yZHNgLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgSHR0cE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIgfSBmcm9tICcuL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1JlbGVhc2VOb3Rlc0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+ICh7XG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIG1heFJlZGlyZWN0czogNSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxlYXNlTm90ZXNNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIFVzZUd1YXJkcyxcbiAgR2V0LFxuICBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLFxuICBIdHRwU2VydmljZSxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgfSBmcm9tICdAa29oL2NvbW1vbic7XG5cbkBDb250cm9sbGVyKCdyZWxlYXNlX25vdGVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0UmVsZWFzZU5vdGVzKCk6IFByb21pc2U8R2V0UmVsZWFzZU5vdGVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZTogR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2UgPSB7XG4gICAgICBsYXN0VXBkYXRlZFVuaXhUaW1lOiBudWxsLFxuICAgICAgcmVsZWFzZU5vdGVzOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5nZXQoXG4gICAgICAgICdodHRwczovL25vdGlvbi1hcGkuc3BsaXRiZWUuaW8vdjEvcGFnZS9hYmJhMjQ2YmZhMDg0N2JhYTI3MDZhYjMwZDBjNmM3ZCcsXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gICAgY29uc3QgZGF0YSA9IHJlcXVlc3QuZGF0YTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZVRleHQgPVxuICAgICAgICBkYXRhWydiZWFlMmEwMi0yNDllLTRiNjEtOWJmYy04MTI1OGQ5M2YyMGQnXT8udmFsdWU/LnByb3BlcnRpZXNcbiAgICAgICAgICA/LnRpdGxlWzBdWzBdO1xuICAgICAgcmVzcG9uc2UubGFzdFVwZGF0ZWRVbml4VGltZSA9IHRpbWVUZXh0LnNwbGl0KCdVbml4ICcpWzFdICogMTAwMDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbihcbiAgICAgICAgJ0Vycm9yIFBhcnNpbmcgcmVsZWFzZSBub3RlcyB0aW1lOiAnICsgZSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgdGltZSBibG9jayBhbmQgcGFnZSBsaW5rIGJsb2NrIGZyb20gcGFnZVxuICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICBkYXRhWyc0ZDI1ZjM5My1lNTcwLTRjZDUtYWQ2Ni1iMjc4YTA5MjQyMjUnXS52YWx1ZS5wcm9wZXJ0aWVzLnRpdGxlID0gW107XG4gICAgcmVzcG9uc2UucmVsZWFzZU5vdGVzID0gZGF0YTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUsIEFyZ3VtZW50TWV0YWRhdGEgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbi8qKlxuICogU3RyaXAgdW5kZWZpbmVkIHByb3BlcnRpZXMgZnJvbSBib2R5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RyaXBVbmRlZmluZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBtZXRhZGF0YTogQXJndW1lbnRNZXRhZGF0YSk6IGFueSB7XG4gICAgaWYgKG1ldGFkYXRhLnR5cGUgPT09ICdib2R5Jykge1xuICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkcm9wVW5kZWZpbmVkKG9iajogdW5rbm93bikge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0JyAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3BVbmRlZmluZWQob2JqW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgTmVzdEludGVyY2VwdG9yLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBDYWxsSGFuZGxlcixcbiAgSHR0cEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwbUludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgaW50ZXJjZXB0KFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsXG4gICAgbmV4dDogQ2FsbEhhbmRsZXIsXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvbikge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9