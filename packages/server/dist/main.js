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
var QuestionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const common_1 = __webpack_require__(14);
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
const queue_entity_1 = __webpack_require__(27);
const question_fsm_1 = __webpack_require__(33);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3QtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLWZzbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS1yb2xlcy5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3VhcmRzL3JvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxhc3RpYy1hcG0tbm9kZVwiIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLXJvbGUuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zc2Uvc3NlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtY29tbWFuZFwiIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2UvaWNhbC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtaWNhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvd3MtaWFuYS9kaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50LXRpbWV6b25lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnJ1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWItcHVzaFwiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR3aWxpb1wiIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2p3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHAtc2lnbmF0dXJlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vbG9naW4tY291cnNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2p3dC5zdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvZmlsZS9wcm9maWxlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24tcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uc3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC91dGlsL2ZhY3Rvcmllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0eXBlb3JtLWZhY3RvcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VlZC9zZWVkLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXN0anMtYWRtaW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vY3JlZGVudGlhbFZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLWVudGl0aWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5jb21tYW5kLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWRsaW5lLXN5bmNcIiIsIndlYnBhY2s6Ly8vLi9vcm1jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2ZpbGwvYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL3F1ZXN0aW9uLWZpcnN0LWhlbHBlZC1hdC5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWxlYXNlLW5vdGVzL3JlbGVhc2Utbm90ZXMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RyaXBVbmRlZmluZWQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBtLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7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QWEsRUFBRTtnQkFDbEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCWSxjQUFjO0lBRDFCLG1CQUFVLEVBQUU7R0FDQSxjQUFjLENBZ0IxQjtBQWhCWSx3Q0FBYzs7Ozs7OztBQ1ozQiwyQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0ICdlbGFzdGljLWFwbS1ub2RlL3N0YXJ0JztcbmltcG9ydCB7IGJvb3RzdHJhcCB9IGZyb20gJy4vYm9vdHN0cmFwJztcblxuZGVjbGFyZSBjb25zdCBtb2R1bGU6IGFueTtcblxuYm9vdHN0cmFwKG1vZHVsZS5ob3QpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZS9zdGFydFwiKTsiLCJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUGlwZSwgSU5lc3RBcHBsaWNhdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAubW9kdWxlJztcbmltcG9ydCB7IFN0cmlwVW5kZWZpbmVkUGlwZSB9IGZyb20gJy4vc3RyaXBVbmRlZmluZWQucGlwZSc7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBBcG1JbnRlcmNlcHRvciB9IGZyb20gJy4vYXBtLmludGVyY2VwdG9yJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBib290c3RyYXAoaG90OiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlKEFwcE1vZHVsZSwge1xuICAgIGxvZ2dlcjogWydlcnJvcicsICd3YXJuJywgJ2xvZycsICdkZWJ1ZycsICd2ZXJib3NlJ10sXG4gIH0pO1xuICBhZGRHbG9iYWxzVG9BcHAoYXBwKTtcbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpL3YxJyk7XG4gIGFwcC51c2VHbG9iYWxJbnRlcmNlcHRvcnMobmV3IEFwbUludGVyY2VwdG9yKCkpO1xuXG4gIGlmIChpc1Byb2QoKSkge1xuICAgIGNvbnNvbGUubG9nKGBSdW5uaW5nIHByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LmApO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFJ1bm5pbmcgbm9uLXByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LiBUSElTIE1TRyBTSE9VTEQgTk9UIEFQUEVBUiBPTiBQUk9EIFZNYCxcbiAgICApO1xuICB9XG4gIGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gIGF3YWl0IGFwcC5saXN0ZW4oMzAwMik7XG5cbiAgaWYgKGhvdCkge1xuICAgIGhvdC5hY2NlcHQoKTtcbiAgICBob3QuZGlzcG9zZSgoKSA9PiBhcHAuY2xvc2UoKSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIHRydWUgaW4gcHJvZCBhbmQgaW4gaW50ZWdyYXRpb24gdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBhZGRHbG9iYWxzVG9BcHAoYXBwOiBJTmVzdEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhcbiAgICBuZXcgVmFsaWRhdGlvblBpcGUoe1xuICAgICAgd2hpdGVsaXN0OiB0cnVlLFxuICAgICAgZm9yYmlkTm9uV2hpdGVsaXN0ZWQ6IHRydWUsXG4gICAgICB0cmFuc2Zvcm06IHRydWUsXG4gICAgfSksXG4gICk7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhuZXcgU3RyaXBVbmRlZmluZWRQaXBlKCkpO1xuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbW1vblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFNjaGVkdWxlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2R1bGUgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UubW9kdWxlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTG9naW5Nb2R1bGUgfSBmcm9tICcuL2xvZ2luL2xvZ2luLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9maWxlTW9kdWxlIH0gZnJvbSAnLi9wcm9maWxlL3Byb2ZpbGUubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kdWxlIH0gZnJvbSAnLi9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBTZWVkTW9kdWxlIH0gZnJvbSAnLi9zZWVkL3NlZWQubW9kdWxlJztcbmltcG9ydCB7IEFkbWluTW9kdWxlIH0gZnJvbSAnLi9hZG1pbi9hZG1pbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbWFuZE1vZHVsZSB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJy4vc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0ICogYXMgdHlwZW9ybUNvbmZpZyBmcm9tICcuLi9vcm1jb25maWcnO1xuaW1wb3J0IHsgQmFja2ZpbGxNb2R1bGUgfSBmcm9tICdiYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUnO1xuaW1wb3J0IHsgUmVsZWFzZU5vdGVzTW9kdWxlIH0gZnJvbSAncmVsZWFzZS1ub3Rlcy9yZWxlYXNlLW5vdGVzLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVHlwZU9ybU1vZHVsZS5mb3JSb290KHR5cGVvcm1Db25maWcpLFxuICAgIFNjaGVkdWxlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBMb2dpbk1vZHVsZSxcbiAgICBQcm9maWxlTW9kdWxlLFxuICAgIENvdXJzZU1vZHVsZSxcbiAgICBRdWV1ZU1vZHVsZSxcbiAgICBOb3RpZmljYXRpb25Nb2R1bGUsXG4gICAgUXVlc3Rpb25Nb2R1bGUsXG4gICAgU2VlZE1vZHVsZSxcbiAgICBDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBlbnZGaWxlUGF0aDogW1xuICAgICAgICAnLmVudicsXG4gICAgICAgIC4uLihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gWycuZW52LmRldmVsb3BtZW50J10gOiBbXSksXG4gICAgICBdLFxuICAgICAgaXNHbG9iYWw6IHRydWUsXG4gICAgfSksXG4gICAgQWRtaW5Nb2R1bGUsXG4gICAgQ29tbWFuZE1vZHVsZSxcbiAgICBTU0VNb2R1bGUsXG4gICAgQmFja2ZpbGxNb2R1bGUsXG4gICAgUmVsZWFzZU5vdGVzTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvdHlwZW9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3NjaGVkdWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXJzZUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvdXJzZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IElDYWxDb21tYW5kIH0gZnJvbSAnLi9pY2FsLmNvbW1hbmQnO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW0NvdXJzZUNvbnRyb2xsZXJdLFxuICBpbXBvcnRzOiBbUXVldWVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtJQ2FsQ29tbWFuZCwgSWNhbFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBHZXRDb3Vyc2VSZXNwb25zZSwgUXVldWVQYXJ0aWFsLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIGdldFJlcG9zaXRvcnkgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VSb2xlc0d1YXJkIH0gZnJvbSAnLi9jb3Vyc2Utcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignY291cnNlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgQ291cnNlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgQ291cnNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlQ2xlYW5TZXJ2aWNlOiBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOmlkJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQsIFJvbGUuVEEpXG4gIGFzeW5jIGdldChAUGFyYW0oJ2lkJykgaWQ6IG51bWJlcik6IFByb21pc2U8R2V0Q291cnNlUmVzcG9uc2U+IHtcbiAgICAvLyBUT0RPOiBmb3IgYWxsIGNvdXJzZSBlbmRwb2ludCwgY2hlY2sgaWYgdGhleSdyZSBhIHN0dWRlbnQgb3IgYSBUQVxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoaWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZXMnLCAncXVldWVzLnN0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgLy8gVXNlIHJhdyBxdWVyeSBmb3IgcGVyZm9ybWFuY2UgKGF2b2lkIGVudGl0eSBpbnN0YW50aWF0aW9uIGFuZCBzZXJpYWxpemF0aW9uKVxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IGF3YWl0IGdldFJlcG9zaXRvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcignb2gnKVxuICAgICAgLnNlbGVjdChbJ2lkJywgJ3RpdGxlJywgYFwic3RhcnRUaW1lXCJgLCBgXCJlbmRUaW1lXCJgXSlcbiAgICAgIC53aGVyZSgnb2guY291cnNlSWQgPSA6Y291cnNlSWQnLCB7IGNvdXJzZUlkOiBjb3Vyc2UuaWQgfSlcbiAgICAgIC5nZXRSYXdNYW55KCk7XG5cbiAgICBjb3Vyc2UucXVldWVzID0gYXdhaXQgYXN5bmMuZmlsdGVyKFxuICAgICAgY291cnNlLnF1ZXVlcyxcbiAgICAgIGFzeW5jIChxKSA9PiBhd2FpdCBxLmNoZWNrSXNPcGVuKCksXG4gICAgKTtcbiAgICBhd2FpdCBhc3luYy5lYWNoKGNvdXJzZS5xdWV1ZXMsIGFzeW5jIChxKSA9PiB7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlVGltZXMoKTtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVTaXplKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291cnNlO1xuICB9XG5cbiAgQFBvc3QoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tJbihcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8UXVldWVQYXJ0aWFsPiB7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgcXVldWUuc3RhZmZMaXN0LnB1c2godXNlcik7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tPdXQoXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuXG4gICAgcXVldWUuc3RhZmZMaXN0ID0gcXVldWUuc3RhZmZMaXN0LmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gdXNlci5pZCk7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gZmFsc2U7XG4gICAgfVxuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAvLyBDbGVhbiB1cCBxdWV1ZSBpZiBuZWNlc3NhcnlcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVDbGVhblNlcnZpY2UuY2xlYW5RdWV1ZShxdWV1ZS5pZCk7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcbmltcG9ydCB7XG4gIElzQm9vbGVhbixcbiAgSXNEZWZpbmVkLFxuICBJc0VudW0sXG4gIElzSW50LFxuICBJc05vdEVtcHR5LFxuICBJc09wdGlvbmFsLFxuICBJc1N0cmluZyxcbiAgVmFsaWRhdGVJZixcbn0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5leHBvcnQgY29uc3QgUFJPRF9VUkwgPSBcImh0dHBzOi8va2hvdXJ5b2ZmaWNlaG91cnMuY29tXCI7XG5leHBvcnQgY29uc3QgaXNQcm9kID0gKCk6IGJvb2xlYW4gPT5cbiAgcHJvY2Vzcy5lbnYuRE9NQUlOID09PSBQUk9EX1VSTCB8fFxuICAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3c/LmxvY2F0aW9uPy5vcmlnaW4gPT09IFBST0RfVVJMKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBJIEJhc2UgRGF0YSBUeXBlcyAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBOT1RFOiBUaGVzZSBhcmUgbm90IHRoZSBEQiBkYXRhIHR5cGVzLiBUaGV5IGFyZSBvbmx5IHVzZWQgZm9yIHRoZSBhcGlcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXNlci5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIGVtYWlsIHN0cmluZyBvZiB0aGUgdXNlciBpZiB0aGV5IHByb3ZpZGUgaXQgKG51bGxhYmxlKVxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICogQHBhcmFtIGNvdXJzZXMgLSBUaGUgbGlzdCBvZiBjb3Vyc2VzIHRoYXQgdGhlIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIChhcyBlaXRoZXIgYSAnc3R1ZGVudCcsICd0YScgb3IgJ3Byb2Zlc3NvcicpXG4gKiBAcGFyYW0gZGVza3RvcE5vdGlmcyAtIGxpc3Qgb2YgZW5kcG9pbnRzIHNvIHRoYXQgZnJvbnRlbmQgY2FuIGZpZ3VyZSBvdXQgaWYgZGV2aWNlIGlzIGVuYWJsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWwhOiBzdHJpbmc7XG4gIG5hbWUhOiBzdHJpbmc7XG4gIHBob3RvVVJMITogc3RyaW5nO1xuICBjb3Vyc2VzITogVXNlckNvdXJzZVtdO1xuICBkZXNrdG9wTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGVza3RvcE5vdGlmUGFydGlhbClcbiAgZGVza3RvcE5vdGlmcyE6IERlc2t0b3BOb3RpZlBhcnRpYWxbXTtcblxuICBwaG9uZU5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuICBwaG9uZU51bWJlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW5kcG9pbnQhOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIHBhcnRpYWwgdXNlciBpbmZvIG5lZWRlZCBieSB0aGUgZnJvbnRlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZVxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcGhvdG9VUkw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpYWwgY291cnNlIGRhdGEgbmVlZGVkIG9uIHRoZSBmcm9udCBlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqL1xuZXhwb3J0IHR5cGUgQ291cnNlUGFydGlhbCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIHRoYXQgYSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCBhbmQgdGhlaXIgcm9sZSBpbiB0aGF0IGNvdXJzZVxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhlIHVzZXIgYWNjb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHJvbGUgLSBUaGUgdXNlcidzIHJvbGUgaW4gdGhlIGNvdXJzZS5cbiAqL1xuZXhwb3J0IHR5cGUgVXNlckNvdXJzZSA9IHtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb2xlOiBSb2xlO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSB1c2VyIHJvbGVzIGluIGEgY291cnNlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgU1RVREVOVCA9IFwic3R1ZGVudFwiLFxuICBUQSA9IFwidGFcIixcbiAgUFJPRkVTU09SID0gXCJwcm9mZXNzb3JcIixcbn1cblxuY2xhc3MgT2ZmaWNlSG91clBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgdGl0bGUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lITogRGF0ZTtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHRoYXQgc3R1ZGVudHMgY2FuIGpvaW4gd2l0aCB0aGllciB0aWNrZXRzLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGF0IHRoaXMgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGZvci5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBxdWVzdGlvbnMgLSBUaGUgbGlzdCBvZiB0aGUgc3R1ZGVudHMgcXVlc3Rpb25zIGFzc29jYWl0ZWQgd2l0aCB0aGUgcXVldWUuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWUge1xuICBpZDogbnVtYmVyO1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvb206IHN0cmluZztcbiAgc3RhZmZMaXN0OiBVc2VyUGFydGlhbFtdO1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gIHN0YXJ0VGltZT86IERhdGU7XG4gIGVuZFRpbWU/OiBEYXRlO1xuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHBhcnRpYWwgdG8gYmUgc2hvd24gb24gdGhlIHRvZGF5IHBhZ2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICByb29tITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBzdGFmZkxpc3QhOiBVc2VyUGFydGlhbFtdO1xuXG4gIHF1ZXVlU2l6ZSE6IG51bWJlcjtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGlzT3BlbiE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lPzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lPzogRGF0ZTtcblxuICBhbGxvd1F1ZXN0aW9ucyE6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWVzdGlvbiBpcyBjcmVhdGVkIHdoZW4gYSBzdHVkZW50IHdhbnRzIGhlbHAgZnJvbSBhIFRBLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgc3R1ZGVudCBxdWVzdGlvbi5cbiAqIEBwYXJhbSBjcmVhdG9yIC0gVGhlIFN0dWRlbnQgdGhhdCBoYXMgY3JlYXRlZCB0aGUgcXVlc3Rpb24uXG4gKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IGRlc2NyaXRpcG4gb2Ygd2hhdCBoZS9zaGUgbmVlZHMgaGVscCB3aXRoLlxuICogQHBhcmFtIGNyZWF0ZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVGlja2V0IHdhcyBjcmVhdGVkLiBFeDogXCIyMDIwLTA5LTEyVDEyOjAwOjAwLTA0OjAwXCJcbiAqIEBwYXJhbSBoZWxwZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgYmVnYW4gaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBjbG9zZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgZmluaXNoZWQgaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBxdWVzdGlvblR5cGUgLSBUaGUgcXVlc3Rpb24gdHlwZSBoZWxwcyBkaXN0aW5ndWlzaCBxdWVzdGlvbiBmb3IgVEEncyBhbmQgZGF0YSBpbnNpZ2h0cy5cbiAqIEBwYXJhbSBzdGF0dXMgLSBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoaXMgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJ0aWN1bGFyIHN0dWRlbnQsIHRvIGhlbHAgVEEncyBmaW5kIHRoZW1cbiAqIEBwYXJhbSBpc09ubGluZSAtIFdldGhlciBvciBub3QgdGhlIHF1ZXN0aW9uIHdpbGwgaGVscGVkIG9ubGluZSBvciBpbi1wZXJzb25cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIHtcbiAgaWQhOiBudW1iZXI7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIGNyZWF0b3IhOiBVc2VyUGFydGlhbDtcbiAgdGV4dD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgdGFIZWxwZWQ/OiBVc2VyUGFydGlhbDtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGhlbHBlZEF0PzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjbG9zZWRBdD86IERhdGU7XG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcbiAgc3RhdHVzITogUXVlc3Rpb25TdGF0dXM7XG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuICBpc09ubGluZT86IGJvb2xlYW47XG59XG5cbi8vIFF1ZXN0aW9uIFR5cGVzXG5leHBvcnQgZW51bSBRdWVzdGlvblR5cGUge1xuICBDb25jZXB0ID0gXCJDb25jZXB0XCIsXG4gIENsYXJpZmljYXRpb24gPSBcIkNsYXJpZmljYXRpb25cIixcbiAgVGVzdGluZyA9IFwiVGVzdGluZ1wiLFxuICBCdWcgPSBcIkJ1Z1wiLFxuICBTZXR1cCA9IFwiU2V0dXBcIixcbiAgT3RoZXIgPSBcIk90aGVyXCIsXG59XG5cbmV4cG9ydCBlbnVtIE9wZW5RdWVzdGlvblN0YXR1cyB7XG4gIERyYWZ0aW5nID0gXCJEcmFmdGluZ1wiLFxuICBRdWV1ZWQgPSBcIlF1ZXVlZFwiLFxuICBIZWxwaW5nID0gXCJIZWxwaW5nXCIsXG4gIFByaW9yaXR5UXVldWVkID0gXCJQcmlvcml0eVF1ZXVlZFwiLFxufVxuXG4vKipcbiAqIExpbWJvIHN0YXR1c2VzIGFyZSBhd2FpdGluZyBzb21lIGNvbmZpcm1hdGlvbiBmcm9tIHRoZSBzdHVkZW50XG4gKi9cbmV4cG9ydCBlbnVtIExpbWJvUXVlc3Rpb25TdGF0dXMge1xuICBDYW50RmluZCA9IFwiQ2FudEZpbmRcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgc3R1ZGVudCBjYW4ndCBiZSBmb3VuZCBieSBhIFRBXG4gIFJlUXVldWVpbmcgPSBcIlJlUXVldWVpbmdcIiwgLy8gcmVwcmVzZW50cyB3aGVuIGEgVEEgd2FudHMgdG8gZ2V0IGJhY2sgdG8gYSBzdHVkZW50IGxhdGVyIGFuZCBnaXZlIHRoZW0gdGhlIG9wdGlvbiB0byBiZSBwdXQgaW50byB0aGUgcHJpb3JpdHkgcXVldWVcbiAgVEFEZWxldGVkID0gXCJUQURlbGV0ZWRcIiwgLy8gV2hlbiBhIFRBIGRlbGV0ZXMgYSBxdWVzdGlvbiBmb3IgYSBtdWx0aXR1ZGUgb2YgcmVhc29uc1xufVxuXG5leHBvcnQgZW51bSBDbG9zZWRRdWVzdGlvblN0YXR1cyB7XG4gIFJlc29sdmVkID0gXCJSZXNvbHZlZFwiLFxuICBDb25maXJtZWREZWxldGVkID0gXCJDb25maXJtZWREZWxldGVkXCIsXG4gIFN0dWRlbnRDYW5jZWxsZWQgPSBcIlN0dWRlbnRDYW5jZWxsZWRcIixcbiAgU3RhbGUgPSBcIlN0YWxlXCIsXG59XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNJblF1ZXVlID0gW1xuICBPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWQsXG5dO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlID0gW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF07XG5cbmV4cG9ydCBjb25zdCBTdGF0dXNTZW50VG9DcmVhdG9yID0gW1xuICAuLi5TdGF0dXNJblByaW9yaXR5UXVldWUsXG4gIC4uLlN0YXR1c0luUXVldWUsXG4gIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuXTtcblxuLy8gVGlja2V0IFN0YXR1cyAtIFJlcHJlc2VudHMgYSBnaXZlbiBzdGF0dXMgb2YgYXMgc3R1ZGVudCdzIHRpY2tldFxuZXhwb3J0IHR5cGUgUXVlc3Rpb25TdGF0dXMgPSBrZXlvZiB0eXBlb2YgUXVlc3Rpb25TdGF0dXNLZXlzO1xuLy8gYW4gRW51bS1saWtlIGNvbnN0YW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBzdGF0dXNlcyBmb3IgY29udmVuaWVuY2UuXG5leHBvcnQgY29uc3QgUXVlc3Rpb25TdGF0dXNLZXlzID0ge1xuICAuLi5PcGVuUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkNsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICAuLi5MaW1ib1F1ZXN0aW9uU3RhdHVzLFxufTtcblxuLyoqXG4gKiBBIFNlbWVzdGVyIG9iamVjdCwgcmVwcmVzZW50aW5nIGEgc2NoZWR1bGUgc2VtZXN0ZXIgdGVybSBmb3IgdGhlIHB1cnBvc2VzIG9mIGEgY291cnNlLlxuICogQHBhcmFtIHNlYXNvbiAtIFRoZSBzZWFzb24gb2YgdGhpcyBzZW1lc3Rlci5cbiAqIEBwYXJhbSB5ZWFyIC0gVGhlIHllYXIgb2YgdGhpcyBzZW1lc3Rlci5cbiAqL1xuaW50ZXJmYWNlIFNlbWVzdGVyIHtcbiAgc2Vhc29uOiBTZWFzb247XG4gIHllYXI6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aGUgc2Vhc29ucyBpbiB3aGljaCBhIGNvdXJzZSBjYW4gdGFrZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2Vhc29uID0gXCJGYWxsXCIgfCBcIlNwcmluZ1wiIHwgXCJTdW1tZXIgMVwiIHwgXCJTdW1tZXIgMlwiO1xuXG5leHBvcnQgdHlwZSBEZXNrdG9wTm90aWZCb2R5ID0ge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBleHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAga2V5czoge1xuICAgIHAyNTZkaDogc3RyaW5nO1xuICAgIGF1dGg6IHN0cmluZztcbiAgfTtcbiAgbmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFBob25lTm90aWZCb2R5ID0ge1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PSBBUEkgUm91dGUgVHlwZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPbiBiYWNrZW5kLCB2YWxpZGF0ZWQgd2l0aCBodHRwczovL2RvY3MubmVzdGpzLmNvbS90ZWNobmlxdWVzL3ZhbGlkYXRpb25cbi8vIEFQSSByb3V0ZSBQYXJhbXMgYW5kIFJlc3BvbnNlc1xuXG4vLyBPZmZpY2UgSG91cnMgUmVzcG9uc2UgVHlwZXNcbmV4cG9ydCBjbGFzcyBHZXRQcm9maWxlUmVzcG9uc2UgZXh0ZW5kcyBVc2VyIHt9XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlEYXRhUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgZW1haWwhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgZmlyc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBsYXN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzSW50KClcbiAgY2FtcHVzITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzU3RyaW5nKClcbiAgcGhvdG9fdXJsITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIGNvdXJzZXMhOiBLaG91cnlTdHVkZW50Q291cnNlW107XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgdGFfY291cnNlcyE6IEtob3VyeVRBQ291cnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlTdHVkZW50Q291cnNlIHtcbiAgQElzSW50KClcbiAgY3JuITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWNjZWxlcmF0ZWQhOiBib29sZWFuO1xuXG4gIEBJc0ludCgpXG4gIHNlY3Rpb24hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgdGl0bGUhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlUQUNvdXJzZSB7XG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLaG91cnlSZWRpcmVjdFJlc3BvbnNlIHtcbiAgcmVkaXJlY3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVQYXJhbXMge1xuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBAVmFsaWRhdGVJZigobykgPT4gby5waG9uZU5vdGlmc0VuYWJsZWQpXG4gIEBJc1N0cmluZygpXG4gIEBJc05vdEVtcHR5KClcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VSZXNwb25zZSB7XG4gIGlkITogbnVtYmVyO1xuICBuYW1lITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IE9mZmljZUhvdXJQYXJ0aWFsKVxuICBvZmZpY2VIb3VycyE6IEFycmF5PE9mZmljZUhvdXJQYXJ0aWFsPjtcblxuICBAVHlwZSgoKSA9PiBRdWV1ZVBhcnRpYWwpXG4gIHF1ZXVlcyE6IFF1ZXVlUGFydGlhbFtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVldWVSZXNwb25zZSBleHRlbmRzIFF1ZXVlUGFydGlhbCB7fVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUXVldWVzUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWV1ZVBhcnRpYWw+IHt9XG5cbmV4cG9ydCBjbGFzcyBMaXN0UXVlc3Rpb25zUmVzcG9uc2Uge1xuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgeW91clF1ZXN0aW9uPzogUXVlc3Rpb247XG5cbiAgQFR5cGUoKCkgPT4gUXVlc3Rpb24pXG4gIHF1ZXN0aW9uc0dldHRpbmdIZWxwITogQXJyYXk8UXVlc3Rpb24+O1xuXG4gIEBUeXBlKCgpID0+IFF1ZXN0aW9uKVxuICBxdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcblxuICBAVHlwZSgoKSA9PiBRdWVzdGlvbilcbiAgcHJpb3JpdHlRdWV1ZSE6IEFycmF5PFF1ZXN0aW9uPjtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICB0ZXh0ITogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBxdWV1ZUlkITogbnVtYmVyO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBmb3JjZSE6IGJvb2xlYW47XG59XG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgdGV4dD86IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgQElzT3B0aW9uYWwoKVxuICBxdWV1ZUlkPzogbnVtYmVyO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25TdGF0dXNLZXlzKVxuICBASXNPcHRpb25hbCgpXG4gIHN0YXR1cz86IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgdHlwZSBUQVVwZGF0ZVN0YXR1c1Jlc3BvbnNlID0gUXVldWVQYXJ0aWFsO1xuZXhwb3J0IHR5cGUgUXVldWVOb3RlUGF5bG9hZFR5cGUgPSB7XG4gIG5vdGVzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVldWVQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIG5vdGVzPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhbGxvd1F1ZXN0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTU0VRdWV1ZVJlc3BvbnNlIHtcbiAgcXVldWU/OiBHZXRRdWV1ZVJlc3BvbnNlO1xuICBxdWVzdGlvbnM/OiBMaXN0UXVlc3Rpb25zUmVzcG9uc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvQm9keSB7XG4gIFRvQ291bnRyeTogc3RyaW5nO1xuICBUb1N0YXRlOiBzdHJpbmc7XG4gIFNtc01lc3NhZ2VTaWQ6IHN0cmluZztcbiAgTnVtTWVkaWE6IHN0cmluZztcbiAgVG9DaXR5OiBzdHJpbmc7XG4gIEZyb21aaXA6IHN0cmluZztcbiAgU21zU2lkOiBzdHJpbmc7XG4gIEZyb21TdGF0ZTogc3RyaW5nO1xuICBTbXNTdGF0dXM6IHN0cmluZztcbiAgRnJvbUNpdHk6IHN0cmluZztcbiAgQm9keTogc3RyaW5nO1xuICBGcm9tQ291bnRyeTogc3RyaW5nO1xuICBUbzogc3RyaW5nO1xuICBUb1ppcDogc3RyaW5nO1xuICBOdW1TZWdtZW50czogc3RyaW5nO1xuICBNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIEFjY291bnRTaWQ6IHN0cmluZztcbiAgRnJvbTogc3RyaW5nO1xuICBBcGlWZXJzaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UmVsZWFzZU5vdGVzUmVzcG9uc2Uge1xuICByZWxlYXNlTm90ZXM6IHVua25vd247XG4gIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bWJlcjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXRyYW5zZm9ybWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzeW5jXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm1cIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0QXV0aEd1YXJkIGV4dGVuZHMgQXV0aEd1YXJkKCdqd3QnKSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9wYXNzcG9ydFwiKTsiLCJpbXBvcnQgeyBTZXRNZXRhZGF0YSwgQ3VzdG9tRGVjb3JhdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgUm9sZXMgPSAoLi4ucm9sZXM6IHN0cmluZ1tdKTogQ3VzdG9tRGVjb3JhdG9yPHN0cmluZz4gPT5cbiAgU2V0TWV0YWRhdGEoJ3JvbGVzJywgcm9sZXMpO1xuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXIgPSBjcmVhdGVQYXJhbURlY29yYXRvcjxzdHJpbmdbXT4oXG4gIGFzeW5jIChyZWxhdGlvbnM6IHN0cmluZ1tdLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwgeyByZWxhdGlvbnMgfSk7XG4gIH0sXG4pO1xuXG5leHBvcnQgY29uc3QgVXNlcklkID0gY3JlYXRlUGFyYW1EZWNvcmF0b3IoXG4gIChkYXRhOiB1bmtub3duLCBjdHg6IEV4ZWN1dGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gY3R4LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICByZXR1cm4gTnVtYmVyKHJlcXVlc3QudXNlci51c2VySWQpO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgTWFueVRvTWFueSxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob3RvVVJMOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gVXNlckNvdXJzZU1vZGVsLCAodWNtKSA9PiB1Y20udXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VzOiBVc2VyQ291cnNlTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIGRlc2t0b3BOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgZGVza3RvcHM/XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBwaG9uZU5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBwaG9uZT9cblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBEZXNrdG9wTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIGRlc2t0b3BOb3RpZnM6IERlc2t0b3BOb3RpZk1vZGVsW107XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBQaG9uZU5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBwaG9uZU5vdGlmOiBQaG9uZU5vdGlmTW9kZWw7XG5cbiAgQEV4Y2x1ZGUoKVxuICBATWFueVRvTWFueSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5zdGFmZkxpc3QpXG4gIHF1ZXVlczogUXVldWVNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnZGVza3RvcF9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgRGVza3RvcE5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBleHBpcmF0aW9uVGltZTogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcDI1NmRoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGF1dGg6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmRlc2t0b3BOb3RpZnMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7IHR5cGU6ICd0aW1lc3RhbXAnIH0pXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgdHlwZTogJ3RleHQnLCBudWxsYWJsZTogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3Bob25lX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBQaG9uZU5vdGlmTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5waG9uZU5vdGlmKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIHZlcmlmaWVkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBKb2luVGFibGUsXG4gIExlc3NUaGFuT3JFcXVhbCxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBNb3JlVGhhbk9yRXF1YWwsXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcblxuaW50ZXJmYWNlIFRpbWVJbnRlcnZhbCB7XG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcbn1cblxuQEVudGl0eSgncXVldWVfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UucXVldWVzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICByb29tOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gUXVlc3Rpb25Nb2RlbCwgKHFtKSA9PiBxbS5xdWV1ZSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWVzdGlvbnM6IFF1ZXN0aW9uTW9kZWxbXTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBub3Rlczogc3RyaW5nO1xuXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnF1ZXVlcylcbiAgQEpvaW5UYWJsZSgpXG4gIHN0YWZmTGlzdDogVXNlck1vZGVsW107XG5cbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXG4gIGFsbG93UXVlc3Rpb25zOiBib29sZWFuO1xuXG4gIEBFeGNsdWRlKClcbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLnF1ZXVlKVxuICBASm9pblRhYmxlKClcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIHN0YXJ0VGltZTogRGF0ZTtcbiAgZW5kVGltZTogRGF0ZTtcblxuICBpc09wZW46IGJvb2xlYW47XG5cbiAgYXN5bmMgY2hlY2tJc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuc3RhZmZMaXN0ICYmIHRoaXMuc3RhZmZMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IE1TX0lOX01JTlVURSA9IDYwMDAwO1xuICAgIGNvbnN0IG9ocyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCBvcGVuID0gISFvaHMuZmluZChcbiAgICAgIChlKSA9PlxuICAgICAgICBlLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxMCAqIE1TX0lOX01JTlVURSA8IG5vdy5nZXRUaW1lKCkgJiZcbiAgICAgICAgZS5lbmRUaW1lLmdldFRpbWUoKSArIDEgKiBNU19JTl9NSU5VVEUgPiBub3cuZ2V0VGltZSgpLFxuICAgICk7XG4gICAgdGhpcy5pc09wZW4gPSBvcGVuO1xuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcXVldWVTaXplOiBudW1iZXI7XG5cbiAgYXN5bmMgYWRkUXVldWVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVTaXplID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZSh0aGlzLmlkKS5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgaW4gdGhlIGNvbnRleHQgb2Ygb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICogQHBhcmFtIHNlbWVzdGVyIC0gVGhlIHNlbWVzdGVyIG9mIHRoaXMgY291cnNlLlxuICovXG4vKmludGVyZmFjZSBDb3Vyc2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNlbWVzdGVyOiBTZW1lc3RlcjtcbiAgICB1c2VyczogVXNlckNvdXJzZVtdXG59Ki9cblxuQEVudGl0eSgnY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLmNvdXJzZSlcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLmNvdXJzZSlcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGljYWxVUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS5jb3Vyc2UpXG4gIEBFeGNsdWRlKClcbiAgdXNlckNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbDtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBTZW1lc3Rlck1vZGVsLCAoc2VtZXN0ZXIpID0+IHNlbWVzdGVyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3NlbWVzdGVySWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgc2VtZXN0ZXI6IFNlbWVzdGVyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgLy8gVE9ETzogY2FuIHdlIG1ha2UgdGhlc2Ugbm90IG51bGxhYmxlIGFuZCB3b3JrIHdpdGggVHlwZU9STVxuICBzZW1lc3RlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbignYm9vbGVhbicsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZW5hYmxlZDogYm9vbGVhbjsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIGdpdmVuIHRoZSBjb3Vyc2UgaXMgdXNpbmcgb3VyIGFwcFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBTZWFzb24gfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3NlbWVzdGVyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBTZW1lc3Rlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc2Vhc29uOiBTZWFzb247XG5cbiAgQENvbHVtbigpXG4gIHllYXI6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnNlbWVzdGVyKVxuICBjb3Vyc2VzOiBDb3Vyc2VNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSwgUm9sZSwgU3RhdHVzSW5RdWV1ZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGNhbkNoYW5nZVF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnLi9xdWVzdGlvbi1mc20nO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBmaXJzdCBoZWxwZWQgKGRvZXNuJ3Qgb3ZlcndyaXRlKVxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBmaXJzdEhlbHBlZEF0OiBEYXRlO1xuXG4gIC8vIFdoZW4gdGhlIHF1ZXN0aW9uIHdhcyBsYXN0IGhlbHBlZCAoZ2V0dGluZyBoZWxwIGFnYWluIG9uIHByaW9yaXR5IHF1ZXVlIG92ZXJ3cml0ZXMpXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICAvLyBXaGVuIHRoZSBxdWVzdGlvbiBsZWF2ZXMgdGhlIHF1ZXVlXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjbG9zZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWVzdGlvblR5cGU6IFF1ZXN0aW9uVHlwZTtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc3RhdHVzOiBRdWVzdGlvblN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbG9jYXRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZSB0aGUgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBhcyB0aGUgZ2l2ZW4gcm9sZVxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIHN0YXR1cyBjaGFuZ2Ugc3VjY2VlZGVkXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU3RhdHVzKG5ld1N0YXR1czogUXVlc3Rpb25TdGF0dXMsIHJvbGU6IFJvbGUpOiBib29sZWFuIHtcbiAgICBpZiAoY2FuQ2hhbmdlUXVlc3Rpb25TdGF0dXModGhpcy5zdGF0dXMsIG5ld1N0YXR1cywgcm9sZSkpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgaW5RdWV1ZVdpdGhTdGF0dXMoXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIHN0YXR1c2VzOiBRdWVzdGlvblN0YXR1c1tdLFxuICApOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlcyxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXN0aW9ucyB0aGF0IGFyZSBvcGVuIGluIHRoZSBxdWV1ZSAobm90IGluIHByaW9yaXR5IHF1ZXVlKVxuICAgKi9cbiAgc3RhdGljIHdhaXRpbmdJblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxRdWVzdGlvbk1vZGVsPiB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgU3RhdHVzSW5RdWV1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5cbmludGVyZmFjZSBBbGxvd2FibGVUcmFuc2l0aW9ucyB7XG4gIHN0dWRlbnQ/OiBRdWVzdGlvblN0YXR1c1tdO1xuICB0YT86IFF1ZXN0aW9uU3RhdHVzW107XG59XG5cbmNvbnN0IFFVRVVFX1RSQU5TSVRJT05TOiBBbGxvd2FibGVUcmFuc2l0aW9ucyA9IHtcbiAgdGE6IFtPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZywgTGltYm9RdWVzdGlvblN0YXR1cy5UQURlbGV0ZWRdLFxuICBzdHVkZW50OiBbXG4gICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICBdLFxufTtcblxuY29uc3QgUVVFU1RJT05fU1RBVEVTOiBSZWNvcmQ8UXVlc3Rpb25TdGF0dXMsIEFsbG93YWJsZVRyYW5zaXRpb25zPiA9IHtcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5EcmFmdGluZ106IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWQsXG4gICAgXSxcbiAgfSxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdOiBRVUVVRV9UUkFOU0lUSU9OUyxcbiAgW09wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZF06IFFVRVVFX1RSQU5TSVRJT05TLFxuICBbT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmddOiB7XG4gICAgdGE6IFtcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuQ2FudEZpbmQsXG4gICAgICBMaW1ib1F1ZXN0aW9uU3RhdHVzLlJlUXVldWVpbmcsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZCxcbiAgICAgIExpbWJvUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkLFxuICAgIF0sXG4gICAgc3R1ZGVudDogW0Nsb3NlZFF1ZXN0aW9uU3RhdHVzLkNvbmZpcm1lZERlbGV0ZWRdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5DYW50RmluZF06IHtcbiAgICBzdHVkZW50OiBbXG4gICAgICBPcGVuUXVlc3Rpb25TdGF0dXMuUHJpb3JpdHlRdWV1ZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkLFxuICAgICAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZCxcbiAgICBdLFxuICB9LFxuICBbTGltYm9RdWVzdGlvblN0YXR1cy5SZVF1ZXVlaW5nXToge1xuICAgIHN0dWRlbnQ6IFtcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5Qcmlvcml0eVF1ZXVlZCxcbiAgICAgIENsb3NlZFF1ZXN0aW9uU3RhdHVzLlN0dWRlbnRDYW5jZWxsZWQsXG4gICAgICBDbG9zZWRRdWVzdGlvblN0YXR1cy5Db25maXJtZWREZWxldGVkLFxuICAgIF0sXG4gIH0sXG4gIFtMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZF06IHtcbiAgICBzdHVkZW50OiBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF0sXG4gIH0sXG4gIFtDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuQ29uZmlybWVkRGVsZXRlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3R1ZGVudENhbmNlbGxlZF06IHt9LFxuICBbQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGVdOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VRdWVzdGlvblN0YXR1cyhcbiAgb2xkU3RhdHVzOiBRdWVzdGlvblN0YXR1cyxcbiAgZ29hbFN0YXR1czogUXVlc3Rpb25TdGF0dXMsXG4gIHJvbGU6IFJvbGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRTdGF0dXMgPT09IGdvYWxTdGF0dXMgfHxcbiAgICBRVUVTVElPTl9TVEFURVNbb2xkU3RhdHVzXVtyb2xlXT8uaW5jbHVkZXMoZ29hbFN0YXR1cylcbiAgKTtcbn1cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFN0YXR1c0luUHJpb3JpdHlRdWV1ZSxcbiAgU3RhdHVzSW5RdWV1ZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24sIENyb25FeHByZXNzaW9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIENsZWFuIHRoZSBxdWV1ZSBhbmQgbWFyayBzdGFsZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVDbGVhblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgQENyb24oQ3JvbkV4cHJlc3Npb24uRVZFUllfREFZX0FUX01JRE5JR0hUKVxuICBwcml2YXRlIGFzeW5jIGNsZWFuQWxsUXVldWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zOiBRdWV1ZU1vZGVsW10gPSBhd2FpdCBRdWV1ZU1vZGVsLmdldFJlcG9zaXRvcnkoKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVldWUnKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWV1ZV9tb2RlbC5xdWVzdGlvbnMnLCAncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXMpJywge1xuICAgICAgICBzdGF0dXM6IE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICAgIH0pXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnMuZm9yRWFjaCgocXVldWUpID0+IHtcbiAgICAgIHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgcXVldWUubm90ZXMgPSAnJztcbiAgICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAgIGF3YWl0IHRoaXMudW5zYWZlQ2xlYW4ocXVldWUuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5pblF1ZXVlV2l0aFN0YXR1cyhcbiAgICAgIHF1ZXVlSWQsXG4gICAgICBPYmplY3QudmFsdWVzKE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKS5nZXRNYW55KCk7XG4gICAgY29uc3Qgb3BlblF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICAocSkgPT4gcS5zdGF0dXMgaW4gT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAgICk7XG5cbiAgICBvcGVuUXVlc3Rpb25zLmZvckVhY2goKHE6IFF1ZXN0aW9uTW9kZWwpID0+IHtcbiAgICAgIHEuc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGU7XG4gICAgICBxLmNsb3NlZEF0ID0gbmV3IERhdGUoKTtcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuc2F2ZShvcGVuUXVlc3Rpb25zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlUm9sZXNHdWFyZCBleHRlbmRzIFJvbGVzR3VhcmQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBhc3luYyBzZXR1cERhdGEoXG4gICAgcmVxdWVzdDogYW55LFxuICApOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgcmV0dXJuIHsgY291cnNlSWQsIHVzZXIgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQ2FuQWN0aXZhdGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgTm90Rm91bmRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBSb2xlc0d1YXJkIHtcbiAgY2FuQWN0aXZhdGUoY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgbWF0Y2hSb2xlcyhyb2xlczogc3RyaW5nW10sIHVzZXI6IFVzZXJNb2RlbCwgY291cnNlSWQ6IG51bWJlcik6IGJvb2xlYW47XG5cbiAgc2V0dXBEYXRhKHJlcXVlc3Q6IGFueSk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogUmVmbGVjdG9yKSB7fVxuXG4gIGFzeW5jIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMucmVmbGVjdG9yLmdldDxzdHJpbmdbXT4oJ3JvbGVzJywgY29udGV4dC5nZXRIYW5kbGVyKCkpO1xuICAgIGlmICghcm9sZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgeyBjb3Vyc2VJZCwgdXNlciB9ID0gYXdhaXQgdGhpcy5zZXR1cERhdGEocmVxdWVzdCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ011c3QgYmUgbG9nZ2VkIGluJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb3Vyc2VJZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdObyBjb3Vyc2VpZCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hdGNoUm9sZXMocm9sZXMsIHVzZXIsIGNvdXJzZUlkKTtcbiAgfVxuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQ291cnNlID0gdXNlci5jb3Vyc2VzLmZpbmQoKGNvdXJzZSkgPT4ge1xuICAgICAgcmV0dXJuIE51bWJlcihjb3Vyc2UuY291cnNlSWQpID09PSBOdW1iZXIoY291cnNlSWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ05vdCBJbiBUaGlzIENvdXJzZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHJvbGVzLmZpbHRlcigocm9sZSkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb3Vyc2Uucm9sZS50b1N0cmluZygpID09PSByb2xlO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgYFlvdSBtdXN0IGhhdmUgb25lIG9mIHJvbGVzIFske3JvbGVzLmpvaW4oXG4gICAgICAgICAgJywgJyxcbiAgICAgICAgKX1dIHRvIGFjY2VzcyB0aGlzIGNvdXJzZWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZW1haW5pbmcubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUm9sZSwgU1NFUXVldWVSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU1NFU2VydmljZSB9IGZyb20gJ3NzZS9zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuXG50eXBlIFF1ZXVlQ2xpZW50TWV0YWRhdGEgPSB7IHVzZXJJZDogbnVtYmVyOyByb2xlOiBSb2xlIH07XG5cbmNvbnN0IGlkVG9Sb29tID0gKHF1ZXVlSWQ6IG51bWJlcikgPT4gYHEtJHtxdWV1ZUlkfWA7XG4vKipcbiAqIEhhbmRsZSBzZW5kaW5nIHF1ZXVlIHNzZSBldmVudHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU1NFU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcXVldWVTZXJ2aWNlOiBRdWV1ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzc2VTZXJ2aWNlOiBTU0VTZXJ2aWNlPFF1ZXVlQ2xpZW50TWV0YWRhdGE+LFxuICApIHt9XG5cbiAgc3Vic2NyaWJlQ2xpZW50KFxuICAgIHF1ZXVlSWQ6IG51bWJlcixcbiAgICByZXM6IFJlc3BvbnNlLFxuICAgIG1ldGFkYXRhOiBRdWV1ZUNsaWVudE1ldGFkYXRhLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLnNzZVNlcnZpY2Uuc3Vic2NyaWJlQ2xpZW50KGlkVG9Sb29tKHF1ZXVlSWQpLCB7IHJlcywgbWV0YWRhdGEgfSk7XG4gIH1cblxuICAvLyBTZW5kIGV2ZW50IHdpdGggbmV3IHF1ZXN0aW9ucywgYnV0IG5vIG1vcmUgdGhhbiBvbmNlIGEgc2Vjb25kXG4gIHVwZGF0ZVF1ZXN0aW9ucyA9IHRoaXMudGhyb3R0bGVVcGRhdGUoYXN5bmMgKHF1ZXVlSWQpID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgaWYgKHF1ZXN0aW9ucykge1xuICAgICAgdGhpcy5zZW5kVG9Sb29tKHF1ZXVlSWQsIGFzeW5jICh7IHJvbGUsIHVzZXJJZCB9KSA9PiAoe1xuICAgICAgICBxdWVzdGlvbnM6IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgICAgIHF1ZXVlSWQsXG4gICAgICAgICAgcXVlc3Rpb25zLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByb2xlLFxuICAgICAgICApLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlUXVldWUgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCBhc3luYyAoKSA9PiAoeyBxdWV1ZSB9KSk7XG4gICAgfVxuICB9KTtcblxuICBwcml2YXRlIGFzeW5jIHNlbmRUb1Jvb20oXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIGRhdGE6IChtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSkgPT4gUHJvbWlzZTxTU0VRdWV1ZVJlc3BvbnNlPixcbiAgKSB7XG4gICAgYXdhaXQgdGhpcy5zc2VTZXJ2aWNlLnNlbmRFdmVudChpZFRvUm9vbShxdWV1ZUlkKSwgZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlVXBkYXRlKHVwZGF0ZUZ1bmN0aW9uOiAocXVldWVJZDogbnVtYmVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgcmV0dXJuIHRocm90dGxlKFxuICAgICAgYXN5bmMgKHF1ZXVlSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUZ1bmN0aW9uKHF1ZXVlSWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSxcbiAgICAgIDEwMDAsXG4gICAgICB7XG4gICAgICAgIGxlYWRpbmc6IGZhbHNlLFxuICAgICAgICB0cmFpbGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWVudDxUPiB7XG4gIG1ldGFkYXRhOiBUO1xuICByZXM6IFJlc3BvbnNlO1xufVxuLyoqXG4gKiBUIGlzIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCBlYWNoIENsaWVudFxuICpcbiAqIExvdyBsZXZlbCBhYnN0cmFjdGlvbiBmb3Igc2VuZGluZyBTU0UgdG8gXCJyb29tc1wiIG9mIGNsaWVudHMuXG4gKiBQcm9iYWJseSBkb24ndCB1c2UgdGhpcyBkaXJlY3RseSwgYW5kIHdyYXAgaXQgaW4gYSBzZXJ2aWNlIHNwZWNpZmljIHRvIHRoYXQgZXZlbnQgc291cmNlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTU0VTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBjbGllbnRzOiBSZWNvcmQ8YW55LCBDbGllbnQ8VD5bXT4gPSB7fTtcblxuICAvKiogQWRkIGEgY2xpZW50IHRvIGEgcm9vbSAqL1xuICBzdWJzY3JpYmVDbGllbnQocm9vbTogc3RyaW5nLCBjbGllbnQ6IENsaWVudDxUPik6IHZvaWQge1xuICAgIC8vIEtlZXAgdHJhY2sgb2YgcmVzcG9uc2VzIHNvIHdlIGNhbiBzZW5kIHNzZSB0aHJvdWdoIHRoZW1cbiAgICBpZiAoIShyb29tIGluIHRoaXMuY2xpZW50cykpIHtcbiAgICAgIHRoaXMuY2xpZW50c1tyb29tXSA9IFtdO1xuICAgIH1cbiAgICBjb25zdCByb29tcmVmID0gdGhpcy5jbGllbnRzW3Jvb21dO1xuICAgIHJvb21yZWYucHVzaChjbGllbnQpO1xuXG4gICAgLy8gUmVtb3ZlIGRlYWQgY29ubmVjdGlvbnMhXG4gICAgY2xpZW50LnJlcy5zb2NrZXQub24oJ2VuZCcsICgpID0+IHtcbiAgICAgIHJvb21yZWYuc3BsaWNlKHJvb21yZWYuaW5kZXhPZihjbGllbnQpLCAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTZW5kIHNvbWUgZGF0YSB0byBldmVyeW9uZSBpbiBhIHJvb20gKi9cbiAgYXN5bmMgc2VuZEV2ZW50PEQ+KFxuICAgIHJvb206IHN0cmluZyxcbiAgICBwYXlsb2FkOiAobWV0YWRhdGE6IFQpID0+IFByb21pc2U8RD4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChyb29tIGluIHRoaXMuY2xpZW50cykge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBzZW5kaW5nIHNzZSB0byAke3RoaXMuY2xpZW50c1tyb29tXS5sZW5ndGh9IGNsaWVudHMgaW4gJHtyb29tfWAsXG4gICAgICApO1xuICAgICAgY29uc29sZS50aW1lKGBzZW5kaW5nIHNzZSB0aW1lOiBgKTtcbiAgICAgIGFwbS5zdGFydFRyYW5zYWN0aW9uKCdzc2UnKTtcbiAgICAgIGZvciAoY29uc3QgeyByZXMsIG1ldGFkYXRhIH0gb2YgdGhpcy5jbGllbnRzW3Jvb21dKSB7XG4gICAgICAgIGNvbnN0IHRvU2VuZCA9IGBkYXRhOiAke3NlcmlhbGl6ZShhd2FpdCBwYXlsb2FkKG1ldGFkYXRhKSl9XFxuXFxuYDtcbiAgICAgICAgcmVzLndyaXRlKHRvU2VuZCk7XG4gICAgICB9XG4gICAgICBhcG0uZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgIGNvbnNvbGUudGltZUVuZChgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGFzdGljLWFwbS1ub2RlXCIpOyIsImltcG9ydCB7XG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvbixcbiAgUm9sZSxcbiAgU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICBTdGF0dXNJblF1ZXVlLFxuICBTdGF0dXNTZW50VG9DcmVhdG9yLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGNsYXNzVG9DbGFzcywgY2xhc3NUb1BsYWluIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIEdldCBkYXRhIGluIHNlcnZpY2Ugb2YgdGhlIHF1ZXVlIGNvbnRyb2xsZXIgYW5kIFNTRVxuICogV0hZPyBUbyBlbnN1cmUgZGF0YSByZXR1cm5lZCBieSBlbmRwb2ludHMgaXMgKmV4YWN0bHkqIGVxdWFsIHRvIGRhdGEgc2VudCBieSBTU0VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBhc3luYyBnZXRRdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVUaW1lcygpO1xuICAgIGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVTaXplKCk7XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBhc3luYyBnZXRRdWVzdGlvbnMocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICAvLyB0b2RvOiBNYWtlIGEgc3R1ZGVudCBhbmQgYSBUQSB2ZXJzaW9uIG9mIHRoaXMgZnVuY3Rpb24sIGFuZCBzd2l0Y2ggd2hpY2ggb25lIHRvIHVzZSBpbiB0aGUgY29udHJvbGxlclxuICAgIC8vIGZvciBub3csIGp1c3QgcmV0dXJuIHRoZSBzdHVkZW50IHJlc3BvbnNlXG4gICAgY29uc3QgcXVldWVTaXplID0gYXdhaXQgUXVldWVNb2RlbC5jb3VudCh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgIH0pO1xuICAgIC8vIENoZWNrIHRoYXQgdGhlIHF1ZXVlIGV4aXN0c1xuICAgIGlmIChxdWV1ZVNpemUgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uc0Zyb21EYiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuaW5RdWV1ZVdpdGhTdGF0dXMocXVldWVJZCwgW1xuICAgICAgLi4uU3RhdHVzSW5Qcmlvcml0eVF1ZXVlLFxuICAgICAgLi4uU3RhdHVzSW5RdWV1ZSxcbiAgICAgIE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgIF0pXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXN0aW9uLmNyZWF0b3InLCAnY3JlYXRvcicpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXN0aW9uLnRhSGVscGVkJywgJ3RhSGVscGVkJylcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBjb25zdCBxdWVzdGlvbnMgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG5cbiAgICBxdWVzdGlvbnMucXVldWUgPSBxdWVzdGlvbnNGcm9tRGIuZmlsdGVyKChxdWVzdGlvbikgPT5cbiAgICAgIFN0YXR1c0luUXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5xdWVzdGlvbnNHZXR0aW5nSGVscCA9IHF1ZXN0aW9uc0Zyb21EYi5maWx0ZXIoXG4gICAgICAocXVlc3Rpb24pID0+IHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcsXG4gICAgKTtcblxuICAgIHF1ZXN0aW9ucy5wcmlvcml0eVF1ZXVlID0gcXVlc3Rpb25zRnJvbURiLmZpbHRlcigocXVlc3Rpb24pID0+XG4gICAgICBTdGF0dXNJblByaW9yaXR5UXVldWUuaW5jbHVkZXMocXVlc3Rpb24uc3RhdHVzIGFzIE9wZW5RdWVzdGlvblN0YXR1cyksXG4gICAgKTtcblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvKiogSGlkZSBzZW5zaXRpdmUgZGF0YSB0byBvdGhlciBzdHVkZW50cyAqL1xuICBhc3luYyBwZXJzb25hbGl6ZVF1ZXN0aW9ucyhcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcXVlc3Rpb25zOiBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gICAgdXNlcklkOiBudW1iZXIsXG4gICAgcm9sZTogUm9sZSxcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBpZiAocm9sZSA9PT0gUm9sZS5TVFVERU5UKSB7XG4gICAgICBjb25zdCBuZXdMUVIgPSBuZXcgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKG5ld0xRUiwgcXVlc3Rpb25zKTtcblxuICAgICAgbmV3TFFSLnF1ZXVlID0gcXVlc3Rpb25zLnF1ZXVlLm1hcCgocXVlc3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgY3JlYXRvciA9XG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCA9PT0gdXNlcklkXG4gICAgICAgICAgICA/IHF1ZXN0aW9uLmNyZWF0b3JcbiAgICAgICAgICAgIDogcGljayhxdWVzdGlvbi5jcmVhdG9yLCBbJ2lkJ10pO1xuICAgICAgICAvLyBjbGFzc1RvQ2xhc3MgdHJhbnNmb3JtZXIgd2lsbCBhcHBseSB0aGUgQEV4Y2x1ZGVzXG4gICAgICAgIHJldHVybiBjbGFzc1RvQ2xhc3M8UXVlc3Rpb24+KFxuICAgICAgICAgIFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHsgLi4ucXVlc3Rpb24sIGNyZWF0b3IgfSksXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgbmV3TFFSLnlvdXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgY3JlYXRvcklkOiB1c2VySWQsXG4gICAgICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgICAgICBzdGF0dXM6IEluKFN0YXR1c1NlbnRUb0NyZWF0b3IpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBuZXdMUVIucHJpb3JpdHlRdWV1ZSA9IFtdO1xuXG4gICAgICByZXR1cm4gbmV3TFFSO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZUNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXVlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgU1NFTW9kdWxlIH0gZnJvbSAnc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWV1ZS5zdWJzY3JpYmVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVldWVDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUXVldWVDbGVhblNlcnZpY2UsXG4gICAgUXVldWVTZXJ2aWNlLFxuICAgIFF1ZXVlU1NFU2VydmljZSxcbiAgICBRdWV1ZVN1YnNjcmliZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtRdWV1ZUNsZWFuU2VydmljZSwgUXVldWVTU0VTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1NTRU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXVlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBHZXRRdWV1ZVJlc3BvbnNlLFxuICBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXVlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBSZXMsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAncHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFF1ZXVlUm9sZSB9IGZyb20gJy4vcXVldWUtcm9sZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4vcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdxdWV1ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXVlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVldWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNlcnZpY2U6IFF1ZXVlU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWV1ZUlkJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXVlKEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8R2V0UXVldWVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgfVxuXG4gIEBHZXQoJzpxdWV1ZUlkL3F1ZXN0aW9ucycpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5UKVxuICBhc3luYyBnZXRRdWVzdGlvbnMoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWVzdGlvbnMocXVldWVJZCk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLnBlcnNvbmFsaXplUXVlc3Rpb25zKFxuICAgICAgcXVldWVJZCxcbiAgICAgIHF1ZXN0aW9ucyxcbiAgICAgIHVzZXJJZCxcbiAgICAgIHJvbGUsXG4gICAgKTtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXVlKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXVlUGFyYW1zLFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5ub3RlcyA9IGJvZHkubm90ZXM7XG4gICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBib2R5LmFsbG93UXVlc3Rpb25zO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdRdWV1ZSBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNTRVNlcnZpY2UgfSBmcm9tICcuL3NzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7IHByb3ZpZGVyczogW1NTRVNlcnZpY2VdLCBleHBvcnRzOiBbU1NFU2VydmljZV0gfSlcbmV4cG9ydCBjbGFzcyBTU0VNb2R1bGUge31cbiIsImltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vcXVldWUuZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVldWVTdWJzY3JpYmVyIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWV1ZU1vZGVsPiB7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlKSB7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXVlTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVldWVNb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKGV2ZW50LmVudGl0eS5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSUNhbENvbW1hbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGljYWxTZXJ2aWNlOiBJY2FsU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdpY2FsOnNjcmFwZScsXG4gICAgZGVzY3JpYmU6ICdzY3JhcGUgaWNhbCBmb3IgYSBjb3Vyc2UnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5pY2FsU2VydmljZS51cGRhdGVBbGxDb3Vyc2VzKCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1jb21tYW5kXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDcm9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICBmcm9tVVJMLFxuICBDYWxlbmRhckNvbXBvbmVudCxcbiAgQ2FsZW5kYXJSZXNwb25zZSxcbiAgVkV2ZW50LFxufSBmcm9tICdub2RlLWljYWwnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwsIENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgZmluZE9uZUlhbmEgfSBmcm9tICd3aW5kb3dzLWlhbmEvZGlzdCc7XG5pbXBvcnQgJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBSUnVsZSB9IGZyb20gJ3JydWxlJztcblxudHlwZSBNb21lbnQgPSBtb21lbnQuTW9tZW50O1xuXG50eXBlIENyZWF0ZU9mZmljZUhvdXIgPSBEZWVwUGFydGlhbDxPZmZpY2VIb3VyTW9kZWw+W107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJY2FsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICAvLyB0eiBzaG91bGQgbm90IGJlIHByZWNvbnZlcnRlZCBieSBmaW5kT25lSWFuYVxuICBwcml2YXRlIGZpeE91dGxvb2tUWihkYXRlOiBNb21lbnQsIHR6OiBzdHJpbmcpOiBNb21lbnQge1xuICAgIGNvbnN0IGlhbmEgPSBmaW5kT25lSWFuYSh0eik7IC8vIEdldCBJQU5BIHRpbWV6b25lIGZyb20gd2luZG93cyB0aW1lem9uZVxuICAgIGlmIChpYW5hKSB7XG4gICAgICAvLyBNb3ZlIHRvIHRoZSB0aW1lem9uZSBiZWNhdXNlIG5vZGUtaWNhbCBkaWRuJ3QgZG8gaXQgZm9yIHVzLCBzaW5jZSBpdCBkb2VzIG5vdCByZWNvZ25pemUgd2luZG93cyB0aW1lem9uZVxuICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS50eihpYW5hLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZGF0ZSBvZiBvY2N1cmVuY2VzIGZvciBhbiBycnVsZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUsIGV4Y2x1ZGluZyB0aGUgbGlzdCBvZiBkYXRlc1xuICBwcml2YXRlIHJydWxlVG9EYXRlcyhycnVsZTogYW55LCBldmVudFRaOiBzdHJpbmcsIGV4ZGF0ZVJhdzogRGF0ZVtdKTogRGF0ZVtdIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgIGNvbnN0IGR0c3RhcnQ6IE1vbWVudCA9IHRoaXMuZml4T3V0bG9va1RaKG1vbWVudChvcHRpb25zLmR0c3RhcnQpLCBldmVudFRaKTtcbiAgICBjb25zdCB1bnRpbDogTW9tZW50ID1cbiAgICAgIG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9wdGlvbnMudW50aWwpLCBldmVudFRaKTtcbiAgICBjb25zdCBldmVudFRaTW9tZW50ID0gbW9tZW50LnR6LnpvbmUoZmluZE9uZUlhbmEoZXZlbnRUWikgfHwgZXZlbnRUWik7XG5cbiAgICAvLyBHZXQgdGhlIFVUQyBPZmZzZXQgaW4gdGhpcyBldmVudCdzIHRpbWV6b25lLCBhdCB0aGlzIHRpbWUuIEFjY291bnRzIGZvciBEYXlsaWdodCBTYXZpbmdzIGFuZCBvdGhlciBvZGRpdGllc1xuICAgIGNvbnN0IHR6VVRDT2Zmc2V0T25EYXRlID0gKGRhdGU6IE1vbWVudCkgPT5cbiAgICAgIGV2ZW50VFpNb21lbnQudXRjT2Zmc2V0KGRhdGUudmFsdWVPZigpKTtcbiAgICBjb25zdCBkdHN0YXJ0VVRDT2Zmc2V0ID0gdHpVVENPZmZzZXRPbkRhdGUoZHRzdGFydCk7XG5cbiAgICAvLyBBcHBseSBhIFVUQyBvZmZzZXQgaW4gbWludXRlcyB0byB0aGUgZ2l2ZW4gTW9tZW50XG4gICAgY29uc3QgYXBwbHlPZmZzZXQgPSAoZGF0ZTogTW9tZW50LCB1dGNPZmZzZXQ6IG51bWJlcik6IE1vbWVudCA9PlxuICAgICAgbW9tZW50KGRhdGUpLnN1YnRyYWN0KHV0Y09mZnNldCwgJ20nKTtcbiAgICAvLyBhcHBseSB0aGUgVVRDIGFkanVzdG1lbnQgcmVxdWlyZWQgYnkgdGhlIHJydWxlIGxpYlxuICAgIGNvbnN0IHByZVJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgZHRzdGFydFVUQ09mZnNldCk7XG4gICAgLy8gUmV2ZXJ0IHRoZSBVVEMgYWRqdXN0bWVudCByZXF1aXJlZCBieSB0aGUgcnJ1bGUgbGliXG4gICAgY29uc3QgcG9zdFJSdWxlID0gKGRhdGU6IE1vbWVudCkgPT4gYXBwbHlPZmZzZXQoZGF0ZSwgLWR0c3RhcnRVVENPZmZzZXQpO1xuXG4gICAgLy8gQWRqdXN0IGZvciBycnVsZSBub3QgdGFraW5nIGludG8gYWNjb3VudCBEU1QgaW4gbG9jYWxlXG4gICAgLy8gICBpZS4gXCI4cG0gZXZlcnkgZnJpZGF5XCIgbWVhbnMgaGF2aW5nIHRvIHB1c2ggYmFjayA2MCBtaW51dGVzIGFmdGVyIEZhbGwgQmFja3dhcmRzXG4gICAgY29uc3QgZml4RFNUID0gKGRhdGU6IE1vbWVudCk6IE1vbWVudCA9PlxuICAgICAgLy8gR2V0IHRoZSBkaWZmZXJlbmNlIGluIFVUQyBvZmZzZXQgYmV0d2VlbiBkdHN0YXJ0IGFuZCB0aGlzIGRhdGUgKHNvIGlmIHdlIGNyb3NzZWQgRFNUIHN3aXRjaCwgdGhpcyB3aWxsIGJlIG5vbnplcm8pXG4gICAgICBtb21lbnQoZGF0ZSkuc3VidHJhY3QoZHRzdGFydFVUQ09mZnNldCAtIHR6VVRDT2Zmc2V0T25EYXRlKGRhdGUpLCAnbScpO1xuXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSUnVsZSh7XG4gICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICBpbnRlcnZhbDogb3B0aW9ucy5pbnRlcnZhbCxcbiAgICAgIHdrc3Q6IG9wdGlvbnMud2tzdCxcbiAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgYnl3ZWVrZGF5OiBvcHRpb25zLmJ5d2Vla2RheSxcbiAgICAgIGR0c3RhcnQ6IHByZVJSdWxlKGR0c3RhcnQpLnRvRGF0ZSgpLFxuICAgICAgdW50aWw6IHVudGlsICYmIHByZVJSdWxlKHVudGlsKS50b0RhdGUoKSxcbiAgICB9KTtcblxuICAgIC8vIERhdGVzIHRvIGV4Y2x1ZGUgZnJvbSByZWN1cnJlbmNlLCBzZXBhcmF0ZSBleGRhdGUgdGltZXN0YW1wIGZvciBmaWx0ZXJpbmdcbiAgICBjb25zdCBleGRhdGVzOiBudW1iZXJbXSA9IE9iamVjdC52YWx1ZXMoZXhkYXRlUmF3IHx8IHt9KVxuICAgICAgLm1hcCgoZCkgPT4gdGhpcy5maXhPdXRsb29rVFoobW9tZW50KGQpLCBldmVudFRaKSlcbiAgICAgIC5tYXAoKGQpID0+IGFwcGx5T2Zmc2V0KGQsIHR6VVRDT2Zmc2V0T25EYXRlKGQpKS52YWx1ZU9mKCkpO1xuXG4gICAgLy8gRG9pbmcgbWF0aCBoZXJlIGJlY2F1c2UgbW9tZW50LmFkZCBjaGFuZ2VzIGJlaGF2aW9yIGJhc2VkIG9uIHNlcnZlciB0aW1lem9uZVxuICAgIGNvbnN0IGluMTBXZWVrcyA9IG5ldyBEYXRlKFxuICAgICAgZHRzdGFydC52YWx1ZU9mKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogNyAqIDEwLFxuICAgICk7XG4gICAgcmV0dXJuIHJ1bGVcbiAgICAgIC5hbGwoKGQpID0+ICEhdW50aWwgfHwgZCA8IGluMTBXZWVrcylcbiAgICAgIC5maWx0ZXIoKGRhdGUpID0+ICFleGRhdGVzLmluY2x1ZGVzKGRhdGUuZ2V0VGltZSgpKSlcbiAgICAgIC5tYXAoKGQpID0+IGZpeERTVChwb3N0UlJ1bGUobW9tZW50KGQpKSkudG9EYXRlKCkpO1xuICB9XG5cbiAgcGFyc2VJY2FsKGljYWxEYXRhOiBDYWxlbmRhclJlc3BvbnNlLCBjb3Vyc2VJZDogbnVtYmVyKTogQ3JlYXRlT2ZmaWNlSG91ciB7XG4gICAgY29uc3QgaWNhbERhdGFWYWx1ZXM6IEFycmF5PENhbGVuZGFyQ29tcG9uZW50PiA9IE9iamVjdC52YWx1ZXMoaWNhbERhdGEpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBpY2FsRGF0YVZhbHVlcy5maWx0ZXIoXG4gICAgICAoaUNhbEVsZW1lbnQpOiBpQ2FsRWxlbWVudCBpcyBWRXZlbnQgPT5cbiAgICAgICAgaUNhbEVsZW1lbnQudHlwZSA9PT0gJ1ZFVkVOVCcgJiZcbiAgICAgICAgaUNhbEVsZW1lbnQuc3RhcnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5lbmQgIT09IHVuZGVmaW5lZCxcbiAgICApO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNFdmVudFJlZ2V4ID0gL1xcYl4oT0h8SG91cnMpXFxiLztcblxuICAgIGNvbnN0IGZpbHRlcmVkT2ZmaWNlSG91cnMgPSBvZmZpY2VIb3Vycy5maWx0ZXIoKGV2ZW50KSA9PlxuICAgICAgb2ZmaWNlSG91cnNFdmVudFJlZ2V4LnRlc3QoZXZlbnQuc3VtbWFyeSksXG4gICAgKTtcblxuICAgIGxldCByZXN1bHRPZmZpY2VIb3VycyA9IFtdO1xuXG4gICAgZmlsdGVyZWRPZmZpY2VIb3Vycy5mb3JFYWNoKChvaDogVkV2ZW50KSA9PiB7XG4gICAgICAvLyBUaGlzIG9mZmljZSBob3VyIHRpbWV6b25lLiBBU1NVTUlORyBldmVyeSBkYXRlIGZpZWxkIGhhcyBzYW1lIHRpbWV6b25lIGFzIG9oLnN0YXJ0XG4gICAgICBjb25zdCBldmVudFRaID0gb2guc3RhcnQudHo7XG4gICAgICBjb25zdCB7IHJydWxlIH0gPSBvaCBhcyBhbnk7XG4gICAgICBpZiAocnJ1bGUpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvaC5lbmQuZ2V0VGltZSgpIC0gb2guc3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGFsbERhdGVzID0gdGhpcy5ycnVsZVRvRGF0ZXMocnJ1bGUsIGV2ZW50VFosIG9oLmV4ZGF0ZSk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZE9mZmljZUhvdXJzID0gYWxsRGF0ZXMubWFwKChkYXRlKSA9PiAoe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IGRhdGUsXG4gICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkdXJhdGlvbiksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMgPSByZXN1bHRPZmZpY2VIb3Vycy5jb25jYXQoZ2VuZXJhdGVkT2ZmaWNlSG91cnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLnN0YXJ0KSwgZXZlbnRUWikudG9EYXRlKCksXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5maXhPdXRsb29rVFoobW9tZW50KG9oLmVuZCksIGV2ZW50VFopLnRvRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0T2ZmaWNlSG91cnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgT2ZmaWNlSG91cnMgZm9yIGEgZ2l2ZW4gQ291cnNlIGJ5IHJlc2NyYXBpbmcgaWNhbFxuICAgKiBAcGFyYW0gY291cnNlIHRvIHBhcnNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoY291cnNlOiBDb3Vyc2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYHNjcmFwaW5nIGljYWwgZm9yIGNvdXJzZSBcIiR7Y291cnNlLm5hbWV9XCIoJHtjb3Vyc2UuaWR9IGF0IHVybDogJHtjb3Vyc2UuaWNhbFVSTH0uLi5gLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb3Vyc2VJZDogY291cnNlLmlkLCByb29tOiAnT25saW5lJyB9LFxuICAgIH0pO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tOiAnT25saW5lJyxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5pZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gdGhpcy5wYXJzZUljYWwoXG4gICAgICBhd2FpdCBmcm9tVVJMKGNvdXJzZS5pY2FsVVJMKSxcbiAgICAgIGNvdXJzZS5pZCxcbiAgICApO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5kZWxldGUoeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5zYXZlKFxuICAgICAgb2ZmaWNlSG91cnMubWFwKChlKSA9PiB7XG4gICAgICAgIGUucXVldWVJZCA9IHF1ZXVlLmlkO1xuICAgICAgICByZXR1cm4gT2ZmaWNlSG91ck1vZGVsLmNyZWF0ZShlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGNvbnNvbGUubG9nKCdkb25lIHNjcmFwaW5nIScpO1xuICB9XG5cbiAgQENyb24oJzUxIDAgKiAqIConKVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlQWxsQ291cnNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY291cnNlIGljYWxzJyk7XG4gICAgY29uc3QgY291cnNlcyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmQoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb3Vyc2VzLm1hcCgoYykgPT4gdGhpcy51cGRhdGVDYWxlbmRhckZvckNvdXJzZShjKSkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWljYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luZG93cy1pYW5hL2Rpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJycnVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbTm90aWZpY2F0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW05vdGlmaWNhdGlvblNlcnZpY2UsIERlc2t0b3BOb3RpZlN1YnNjcmliZXIsIFR3aWxpb1NlcnZpY2VdLFxuICBleHBvcnRzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgVHdpbGlvU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBDb25uZWN0aW9uLFxuICBJbnNlcnRFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBEZXNrdG9wTm90aWZNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxEZXNrdG9wTm90aWZNb2RlbD4pIHtcbiAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlEZXNrdG9wKFxuICAgICAgZXZlbnQuZW50aXR5LFxuICAgICAgXCJZb3UndmUgc3VjY2Vzc2Z1bGx5IHNpZ25lZCB1cCBmb3IgZGVza3RvcCBub3RpZmljYXRpb25zIVwiLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJhZFJlcXVlc3RFeGNlcHRpb24sIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCAqIGFzIHdlYlB1c2ggZnJvbSAnd2ViLXB1c2gnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuZXhwb3J0IGNvbnN0IE5vdGlmTXNncyA9IHtcbiAgcGhvbmU6IHtcbiAgICBXUk9OR19NRVNTQUdFOlxuICAgICAgJ1BsZWFzZSByZXNwb25kIHdpdGggZWl0aGVyIFlFUyBvciBOTy4gVGV4dCBTVE9QIGF0IGFueSB0aW1lIHRvIHN0b3AgcmVjZWl2aW5nIHRleHQgbWVzc2FnZXMnLFxuICAgIENPVUxEX05PVF9GSU5EX05VTUJFUjpcbiAgICAgICdDb3VsZCBub3QgZmluZCBhbiBPZmZpY2UgSG91cnMgYWNjb3VudCB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyLicsXG4gICAgVU5SRUdJU1RFUjpcbiAgICAgIFwiWW91J3ZlIHVucmVnaXN0ZXJlZCBmcm9tIHRleHQgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gRmVlbCBmcmVlIHRvIHJlLXJlZ2lzdGVyIGFueSB0aW1lIHRocm91Z2ggdGhlIHdlYnNpdGVcIixcbiAgICBEVVBMSUNBVEU6XG4gICAgICBcIllvdSd2ZSBhbHJlYWR5IGJlZW4gdmVyaWZpZWQgdG8gcmVjZWl2ZSB0ZXh0IG5vdGlmaWNhdGlvbnMgZnJvbSBLaG91cnkgT2ZmaWNlIEhvdXJzIVwiLFxuICAgIE9LOlxuICAgICAgJ1RoYW5rIHlvdSBmb3IgdmVyaWZ5aW5nIHlvdXIgbnVtYmVyIHdpdGggS2hvdXJ5IE9mZmljZSBIb3VycyEgWW91IGFyZSBub3cgc2lnbmVkIHVwIGZvciB0ZXh0IG5vdGlmaWNhdGlvbnMhJyxcbiAgfSxcbiAgcXVldWU6IHtcbiAgICBBTEVSVF9CVVRUT046XG4gICAgICBcIlRoZSBUQSBjb3VsZCd0IHJlYWNoIHlvdSwgcGxlYXNlIGhhdmUgTWljcm9zb2Z0IFRlYW1zIG9wZW4gYW5kIGNvbmZpcm0geW91IGFyZSBiYWNrIVwiLFxuICAgIFRISVJEX1BMQUNFOiBgWW91J3JlIDNyZCBpbiB0aGUgcXVldWUuIEJlIHJlYWR5IGZvciBhIFRBIHRvIGNhbGwgeW91IHNvb24hYCxcbiAgICBUQV9ISVRfSEVMUEVEOiAodGFOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICAgIGAke3RhTmFtZX0gaXMgY29taW5nIHRvIGhlbHAgeW91IWAsXG4gICAgUkVNT1ZFRDogYFlvdSd2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuIFBsZWFzZSByZXR1cm4gdG8gdGhlIGFwcCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gLFxuICB9LFxuICB0YToge1xuICAgIFNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFOlxuICAgICAgJ0Egc3R1ZGVudCBoYXMgam9pbmVkIHlvdXIgKHByZXZpb3VzbHkgZW1wdHkpIHF1ZXVlIScsXG4gIH0sXG59O1xuXG4vL1RPRE8gdGVzdCB0aGlzIHNlcnZpY2Ugb21nXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIGRlc2t0b3BQdWJsaWNLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlLFxuICApIHtcbiAgICB3ZWJQdXNoLnNldFZhcGlkRGV0YWlscyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0VNQUlMJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BSSVZBVEVLRVknKSxcbiAgICApO1xuICAgIHRoaXMuZGVza3RvcFB1YmxpY0tleSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wKFxuICAgIGluZm86IERlZXBQYXJ0aWFsPERlc2t0b3BOb3RpZk1vZGVsPixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICAgIC8vIGNyZWF0ZSBpZiBub3QgZXhpc3RcbiAgICBsZXQgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogaW5mby51c2VySWQsIGVuZHBvaW50OiBpbmZvLmVuZHBvaW50IH0sXG4gICAgfSk7XG4gICAgaWYgKCFkbikge1xuICAgICAgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5jcmVhdGUoaW5mbykuc2F2ZSgpO1xuICAgICAgYXdhaXQgZG4ucmVsb2FkKCk7XG4gICAgfVxuICAgIHJldHVybiBkbjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgdXNlcjogVXNlck1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZnVsbE51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXIpO1xuICAgIGlmICghZnVsbE51bWJlcikge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ3Bob25lIG51bWJlciBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgbGV0IHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KTtcblxuICAgIGlmIChwaG9uZU5vdGlmTW9kZWwpIHtcbiAgICAgIC8vIFBob25lIG51bWJlciBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPT09IGZ1bGxOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBqdXN0IGNoYW5nZSBpdFxuICAgICAgICBwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPSBmdWxsTnVtYmVyO1xuICAgICAgICBwaG9uZU5vdGlmTW9kZWwudmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcGhvbmVOb3RpZk1vZGVsLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBmdWxsTnVtYmVyLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcblxuICAgICAgLy8gTVVUQVRFIHNvIGlmIHVzZXIuc2F2ZSgpIGlzIGNhbGxlZCBsYXRlciBpdCBkb2Vzbid0IGRpcy1hc3NvY2lhdGVcbiAgICAgIHVzZXIucGhvbmVOb3RpZiA9IHBob25lTm90aWZNb2RlbDtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm5vdGlmeVBob25lKFxuICAgICAgcGhvbmVOb3RpZk1vZGVsLFxuICAgICAgXCJZb3UndmUgc2lnbmVkIHVwIGZvciBwaG9uZSBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBUbyB2ZXJpZnkgeW91ciBudW1iZXIsIHBsZWFzZSByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIFlFUy4gVG8gdW5zdWJzY3JpYmUsIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggTk8gb3IgU1RPUFwiLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLy8gTm90aWZ5IHVzZXIgb24gYWxsIHBsYXRmb3Jtc1xuICBhc3luYyBub3RpZnlVc2VyKHVzZXJJZDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3RpZk1vZGVsc09mVXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2Rlc2t0b3BOb3RpZnMnLCAncGhvbmVOb3RpZiddLFxuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBwcm9taXNlcyBjb25jdXJyZW50bHlcbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzLm1hcChhc3luYyAobm0pID0+XG4gICAgICAgICAgdGhpcy5ub3RpZnlEZXNrdG9wKG5tLCBtZXNzYWdlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmICYmIG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWZzRW5hYmxlZCkge1xuICAgICAgdGhpcy5ub3RpZnlQaG9uZShub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuICBhc3luYyBub3RpZnlEZXNrdG9wKG5tOiBEZXNrdG9wTm90aWZNb2RlbCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdlYlB1c2guc2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBubS5lbmRwb2ludCxcbiAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICBwMjU2ZGg6IG5tLnAyNTZkaCxcbiAgICAgICAgICAgIGF1dGg6IG5tLmF1dGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShubSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBwaG9uZSBudW1iZXJcbiAgYXN5bmMgbm90aWZ5UGhvbmUoXG4gICAgcG46IFBob25lTm90aWZNb2RlbCxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZm9yY2U6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChmb3JjZSB8fCBwbi52ZXJpZmllZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLnNlbmRTTVMocG4ucGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncHJvYmxlbSBzZW5kaW5nIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5UGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwaG9uZU5vdGlmID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXBob25lTm90aWYpIHtcbiAgICAgIGFwbS5zZXRDdXN0b21Db250ZXh0KHsgcGhvbmVOdW1iZXIgfSk7XG4gICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHBob25lIG51bWJlciBkdXJpbmcgdmVyaWZpY2F0aW9uJyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5DT1VMRF9OT1RfRklORF9OVU1CRVI7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlICE9PSAnWUVTJyAmJiBtZXNzYWdlICE9PSAnTk8nICYmIG1lc3NhZ2UgIT09ICdTVE9QJykge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5XUk9OR19NRVNTQUdFO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PT0gJ05PJyB8fCBtZXNzYWdlID09PSAnU1RPUCcpIHtcbiAgICAgIC8vIGRpZCBzb21lIG1vcmUgZGlnZ2luZywgU1RPUCBqdXN0IHN0b3BzIG1lc3NhZ2VzIGNvbXBsZXRlbHksIHdlJ2xsIG5ldmVyIHJlY2VpdmUgaXRcbiAgICAgIC8vIHNvIHVoLi4uIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhhdFxuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZShwaG9uZU5vdGlmKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuVU5SRUdJU1RFUjtcbiAgICB9IGVsc2UgaWYgKHBob25lTm90aWYudmVyaWZpZWQpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuRFVQTElDQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHBob25lTm90aWYuc2F2ZSgpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5PSztcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYi1wdXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0d2lsaW8gU0RLIHRvIG1ha2UgdGVzdGluZyBlYXNpZXIuXG4gKiBTaG91bGQgTk9UIGludGVyYWN0IHdpdGggREIgbW9kZWxzIG9yIGRvIGFueXRoaW5nIHNtYXJ0LiBKdXN0IHdyYXAgVHdpbGlvLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvU2VydmljZSB7XG4gIHByaXZhdGUgdHdpbGlvQ2xpZW50OiB0d2lsaW8uVHdpbGlvO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudHdpbGlvQ2xpZW50ID0gdHdpbGlvKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQUNDT1VOVFNJRCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBwaG9uZSBudW1iZXIgb3IgcmV0dXJuIGZhbHNlIGlmIHBob25lIG51bWJlciBpc24ndCByZWFsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RnVsbFBob25lTnVtYmVyKFxuICAgIHBob25lTnVtYmVyOiBzdHJpbmcsXG4gICk6IFByb21pc2U8c3RyaW5nIHwgZmFsc2U+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5sb29rdXBzLnBob25lTnVtYmVycyhwaG9uZU51bWJlcikuZmV0Y2goKSlcbiAgICAgICAgLnBob25lTnVtYmVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlIHBob25lIG51bWJlciBpcyBub3QgZm91bmQsIHRoZW4gZW5kcG9pbnQgc2hvdWxkIHJldHVybiBpbnZhbGlkXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgU01TIHRvIHBob25lIG51bWJlciB1c2luZyBvdXIgVHdpbGlvIG51bWJlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9QSE9ORU5VTUJFUicpLFxuICAgICAgdG86IHBob25lTnVtYmVyLFxuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2lsaW9cIik7IiwiaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIEhlYWRlcixcbiAgSGVhZGVycyxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZkJvZHksIERlc2t0b3BOb3RpZlBhcnRpYWwsIFR3aWxpb0JvZHkgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ25vdGlmaWNhdGlvbnMnKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZXNrdG9wL2NyZWRlbnRpYWxzJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGdldERlc2t0b3BDcmVkZW50aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm5vdGlmU2VydmljZS5kZXNrdG9wUHVibGljS2V5KTtcbiAgfVxuXG4gIEBQb3N0KCdkZXNrdG9wL2RldmljZScpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyByZWdpc3RlckRlc2t0b3BVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogRGVza3RvcE5vdGlmQm9keSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmUGFydGlhbD4ge1xuICAgIGNvbnN0IGRldmljZSA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyRGVza3RvcCh7XG4gICAgICBlbmRwb2ludDogYm9keS5lbmRwb2ludCxcbiAgICAgIGV4cGlyYXRpb25UaW1lOiBib2R5LmV4cGlyYXRpb25UaW1lICYmIG5ldyBEYXRlKGJvZHkuZXhwaXJhdGlvblRpbWUpLFxuICAgICAgcDI1NmRoOiBib2R5LmtleXMucDI1NmRoLFxuICAgICAgYXV0aDogYm9keS5rZXlzLmF1dGgsXG4gICAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGRldmljZS5pZCxcbiAgICAgIGVuZHBvaW50OiBkZXZpY2UuZW5kcG9pbnQsXG4gICAgICBjcmVhdGVkQXQ6IGRldmljZS5jcmVhdGVkQXQsXG4gICAgICBuYW1lOiBkZXZpY2UubmFtZSxcbiAgICB9O1xuICB9XG5cbiAgQERlbGV0ZSgnZGVza3RvcC9kZXZpY2UvOmRldmljZUlkJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZURlc2t0b3BVc2VyKFxuICAgIEBQYXJhbSgnZGV2aWNlSWQnKSBkZXZpY2VJZDogbnVtYmVyLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kKHsgaWQ6IGRldmljZUlkLCB1c2VySWQgfSk7XG4gICAgaWYgKGRuLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShkbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYmhvb2sgZnJvbSB0d2lsaW9cbiAgQFBvc3QoJy9waG9uZS92ZXJpZnknKVxuICBASGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKVxuICBhc3luYyB2ZXJpZnlQaG9uZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBUd2lsaW9Cb2R5LFxuICAgIEBIZWFkZXJzKCd4LXR3aWxpby1zaWduYXR1cmUnKSB0d2lsaW9TaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYm9keS5Cb2R5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlbmRlck51bWJlciA9IGJvZHkuRnJvbTtcblxuICAgIGNvbnN0IHR3aWxpb0F1dGhUb2tlbiA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpO1xuXG4gICAgY29uc3QgaXNWYWxpZGF0ZWQgPSB0d2lsaW8udmFsaWRhdGVSZXF1ZXN0KFxuICAgICAgdHdpbGlvQXV0aFRva2VuLFxuICAgICAgdHdpbGlvU2lnbmF0dXJlLnRyaW0oKSxcbiAgICAgIGAke3RoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpfS9hcGkvdjEvbm90aWZpY2F0aW9ucy9waG9uZS92ZXJpZnlgLFxuICAgICAgYm9keSxcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignTWVzc2FnZSBub3QgZnJvbSBUd2lsaW8nKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlVG9Vc2VyID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UudmVyaWZ5UGhvbmUoXG4gICAgICBzZW5kZXJOdW1iZXIsXG4gICAgICBtZXNzYWdlLFxuICAgICk7XG4gICAgY29uc3QgTWVzc2FnaW5nUmVzcG9uc2UgPSB0d2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2U7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgTWVzc2FnaW5nUmVzcG9uc2UoKTtcbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2VUb1VzZXIpO1xuXG4gICAgcmV0dXJuIHR3aW1sLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IExvZ2luQ29udHJvbGxlciB9IGZyb20gJy4vbG9naW4uY29udHJvbGxlcic7XG5pbXBvcnQgeyBKd3RTdHJhdGVneSB9IGZyb20gJy4uL2xvZ2luL2p3dC5zdHJhdGVneSc7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBKd3RNb2R1bGUucmVnaXN0ZXJBc3luYyh7XG4gICAgICBpbXBvcnRzOiBbQ29uZmlnTW9kdWxlXSxcbiAgICAgIGluamVjdDogW0NvbmZpZ1NlcnZpY2VdLFxuICAgICAgdXNlRmFjdG9yeTogYXN5bmMgKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+ICh7XG4gICAgICAgIHNlY3JldDogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxuICBjb250cm9sbGVyczogW0xvZ2luQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW0p3dFN0cmF0ZWd5LCBMb2dpbkNvdXJzZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQge1xuICBLaG91cnlEYXRhUGFyYW1zLFxuICBLaG91cnlSZWRpcmVjdFJlc3BvbnNlLFxuICBLaG91cnlTdHVkZW50Q291cnNlLFxuICBLaG91cnlUQUNvdXJzZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGh0dHBTaWduYXR1cmUgZnJvbSAnaHR0cC1zaWduYXR1cmUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vLi4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbG9naW5Db3Vyc2VTZXJ2aWNlOiBMb2dpbkNvdXJzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBqd3RTZXJ2aWNlOiBKd3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBQb3N0KCcva2hvdXJ5X2xvZ2luJylcbiAgYXN5bmMgcmVjaWV2ZURhdGFGcm9tS2hvdXJ5KFxuICAgIEBSZXEoKSByZXE6IFJlcXVlc3QsXG4gICAgQEJvZHkoKSBib2R5OiBLaG91cnlEYXRhUGFyYW1zLFxuICApOiBQcm9taXNlPEtob3VyeVJlZGlyZWN0UmVzcG9uc2U+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gQ2hlY2sgdGhhdCByZXF1ZXN0IGhhcyBjb21lIGZyb20gS2hvdXJ5XG4gICAgICBjb25zdCBwYXJzZWRSZXF1ZXN0ID0gaHR0cFNpZ25hdHVyZS5wYXJzZVJlcXVlc3QocmVxKTtcbiAgICAgIGNvbnN0IHZlcmlmeSA9IGh0dHBTaWduYXR1cmUudmVyaWZ5SE1BQyhcbiAgICAgICAgcGFyc2VkUmVxdWVzdCxcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnS0hPVVJZX1BSSVZBVEVfS0VZJyksXG4gICAgICApO1xuICAgICAgaWYgKCF2ZXJpZnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB1c2VyOiBVc2VyTW9kZWw7XG4gICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGVtYWlsOiBib2R5LmVtYWlsIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZSh7IGNvdXJzZXM6IFtdIH0pO1xuICAgIH1cblxuICAgIC8vIFE6IERvIHdlIG5lZWQgdGhpcyBpZiBpdCdzIG5vdCBnb2luZyB0byBjaGFuZ2U/XG4gICAgdXNlciA9IE9iamVjdC5hc3NpZ24odXNlciwge1xuICAgICAgZW1haWw6IGJvZHkuZW1haWwsXG4gICAgICBuYW1lOiBib2R5LmZpcnN0X25hbWUgKyAnICcgKyBib2R5Lmxhc3RfbmFtZSxcbiAgICAgIHBob3RvVVJMOiAnJyxcbiAgICB9KTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJDb3Vyc2VzID0gW107XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LmNvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlTdHVkZW50Q291cnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdXJzZTogQ291cnNlTW9kZWwgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgICAgICAgYy5jb3Vyc2UsXG4gICAgICAgICAgYy5zZWN0aW9uLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb3Vyc2UpIHtcbiAgICAgICAgICBjb25zdCB1c2VyQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZS5pZCxcbiAgICAgICAgICAgIFJvbGUuU1RVREVOVCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godXNlckNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkudGFfY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVRBQ291cnNlKSA9PiB7XG4gICAgICAgIC8vIFF1ZXJ5IGZvciBhbGwgdGhlIGNvdXJzZXMgd2hpY2ggbWF0Y2ggdGhlIG5hbWUgb2YgdGhlIGdlbmVyaWMgY291cnNlIGZyb20gS2hvdXJ5XG4gICAgICAgIGNvbnN0IGNvdXJzZU1hcHBpbmdzID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kKHtcbiAgICAgICAgICB3aGVyZTogeyBnZW5lcmljQ291cnNlTmFtZTogYy5jb3Vyc2UgfSwgLy8gVE9ETzogQWRkIHNlbWVzdGVyIHN1cHBvcnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBjb3Vyc2VNYXBwaW5nIG9mIGNvdXJzZU1hcHBpbmdzKSB7XG4gICAgICAgICAgY29uc3QgdGFDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlTWFwcGluZy5jb3Vyc2VJZCxcbiAgICAgICAgICAgIFJvbGUuVEEsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHRhQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgICB1c2VyLmNvdXJzZXMgPSB1c2VyQ291cnNlcztcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyhcbiAgICAgIHsgdXNlcklkOiB1c2VyLmlkIH0sXG4gICAgICB7IGV4cGlyZXNJbjogNSAqIDYwIH0sXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3Q6XG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpICsgYC9hcGkvdjEvbG9naW4vZW50cnk/dG9rZW49JHt0b2tlbn1gLFxuICAgIH07XG4gIH1cblxuICAvLyBOT1RFOiBBbHRob3VnaCB0aGUgdHdvIHJvdXRlcyBiZWxvdyBhcmUgb24gdGhlIGJhY2tlbmQsXG4gIC8vIHRoZXkgYXJlIG1lYW50IHRvIGJlIHZpc2l0ZWQgYnkgdGhlIGJyb3dzZXIgc28gYSBjb29raWUgY2FuIGJlIHNldFxuXG4gIC8vIFRoaXMgaXMgdGhlIHJlYWwgYWRtaW4gZW50cnkgcG9pbnRcbiAgQEdldCgnL2xvZ2luL2VudHJ5JylcbiAgYXN5bmMgZW50ZXJGcm9tS2hvdXJ5KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndG9rZW4nKSB0b2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpc1ZlcmlmaWVkID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnZlcmlmeUFzeW5jKHRva2VuKTtcblxuICAgIGlmICghaXNWZXJpZmllZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmp3dFNlcnZpY2UuZGVjb2RlKHRva2VuKSBhcyB7IHVzZXJJZDogbnVtYmVyIH07XG5cbiAgICB0aGlzLmVudGVyKHJlcywgcGF5bG9hZC51c2VySWQpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyBmb3IgbG9naW4gb24gZGV2ZWxvcG1lbnQgb25seVxuICBAR2V0KCcvbG9naW4vZGV2JylcbiAgQFVzZUd1YXJkcyhOb25Qcm9kdWN0aW9uR3VhcmQpXG4gIGFzeW5jIGVudGVyRnJvbURldihcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3VzZXJJZCcpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmVudGVyKHJlcywgdXNlcklkKTtcbiAgfVxuXG4gIC8vIFNldCBjb29raWUgYW5kIHJlZGlyZWN0IHRvIHByb3BlciBwYWdlXG4gIHByaXZhdGUgYXN5bmMgZW50ZXIocmVzOiBSZXNwb25zZSwgdXNlcklkOiBudW1iZXIpIHtcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKHsgdXNlcklkIH0pO1xuICAgIGNvbnN0IGlzU2VjdXJlID0gdGhpcy5jb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0PHN0cmluZz4oJ0RPTUFJTicpXG4gICAgICAuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICByZXNcbiAgICAgIC5jb29raWUoJ2F1dGhfdG9rZW4nLCBhdXRoVG9rZW4sIHsgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogaXNTZWN1cmUgfSlcbiAgICAgIC5yZWRpcmVjdCgzMDIsICcvJyk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHAtc2lnbmF0dXJlXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUsIENhbkFjdGl2YXRlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9uUHJvZHVjdGlvbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjYW5BY3RpdmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzUHJvZCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdjb3Vyc2Vfc2VjdGlvbl9tYXBwaW5nX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICAvLyBUaGlzIGlzIHRoZSBjb3Vyc2UgbmFtZSB0aGF0IGlzIHNlbnQgdG8gdXMgZnJvbSB0aGUga2hvdXJ5IGFtaW4gYmFja2VuZFxuICBAQ29sdW1uKClcbiAgZ2VuZXJpY0NvdXJzZU5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc2VjdGlvbjogbnVtYmVyO1xuXG4gIC8vIFJlcHJlc2VudHMgdGhlIGNvdXJzZSB0aGF0IHRoaXMgbWFwcyB0b1xuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNvdXJzZUlkOiBudW1iZXI7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJ2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ291cnNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBwdWJsaWMgYXN5bmMgY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgIGNvdXJlc05hbWU6IHN0cmluZyxcbiAgICBjb3Vyc2VTZWN0aW9uOiBudW1iZXIsXG4gICk6IFByb21pc2U8Q291cnNlTW9kZWw+IHtcbiAgICBjb25zdCBjb3Vyc2VTZWN0aW9uTW9kZWwgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGNvdXJlc05hbWUsIHNlY3Rpb246IGNvdXJzZVNlY3Rpb24gfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2UnXSxcbiAgICB9KTtcbiAgICByZXR1cm4gY291cnNlU2VjdGlvbk1vZGVsPy5jb3Vyc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY291cnNlVG9Vc2VyQ291cnNlKFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgcm9sZTogUm9sZSxcbiAgKTogUHJvbWlzZTxVc2VyQ291cnNlTW9kZWw+IHtcbiAgICBsZXQgdXNlckNvdXJzZTogVXNlckNvdXJzZU1vZGVsO1xuICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyB1c2VySWQsIGNvdXJzZUlkLCByb2xlIH0sXG4gICAgfSk7XG4gICAgaWYgKCF1c2VyQ291cnNlKSB7XG4gICAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHJvbGUsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuICAgIHJldHVybiB1c2VyQ291cnNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFeHRyYWN0Snd0LCBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5pbXBvcnQgeyBQYXNzcG9ydFN0cmF0ZWd5IH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3Rvcihjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgand0RnJvbVJlcXVlc3Q6IChyZXE6IFJlcXVlc3QpID0+IHJlcS5jb29raWVzWydhdXRoX3Rva2VuJ10sXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcbiAgICAgIHNlY3JldE9yS2V5OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgIH0pO1xuICB9XG5cbiAgdmFsaWRhdGUocGF5bG9hZDogeyB1c2VySWQ6IG51bWJlciB9KTogYW55IHtcbiAgICByZXR1cm4geyAuLi5wYXlsb2FkIH07XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWp3dFwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcm9maWxlQ29udHJvbGxlciB9IGZyb20gJy4vcHJvZmlsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBjb250cm9sbGVyczogW1Byb2ZpbGVDb250cm9sbGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBVc2VHdWFyZHMsIFBhdGNoLCBCb2R5IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIERlc2t0b3BOb3RpZlBhcnRpYWwsXG4gIEdldFByb2ZpbGVSZXNwb25zZSxcbiAgVXBkYXRlUHJvZmlsZVBhcmFtcyxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdwcm9maWxlJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGdldChcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IGNvdXJzZXMgPSB1c2VyLmNvdXJzZXNcbiAgICAgIC5maWx0ZXIoKHVzZXJDb3Vyc2UpID0+IHVzZXJDb3Vyc2UuY291cnNlLmVuYWJsZWQpXG4gICAgICAubWFwKCh1c2VyQ291cnNlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY291cnNlOiB7XG4gICAgICAgICAgICBpZDogdXNlckNvdXJzZS5jb3Vyc2VJZCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXJDb3Vyc2UuY291cnNlLm5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByb2xlOiB1c2VyQ291cnNlLnJvbGUsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGRlc2t0b3BOb3RpZnM6IERlc2t0b3BOb3RpZlBhcnRpYWxbXSA9IHVzZXIuZGVza3RvcE5vdGlmcy5tYXAoXG4gICAgICAoZCkgPT4gKHtcbiAgICAgICAgZW5kcG9pbnQ6IGQuZW5kcG9pbnQsXG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBjcmVhdGVkQXQ6IGQuY3JlYXRlZEF0LFxuICAgICAgICBuYW1lOiBkLm5hbWUsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgY29uc3QgdXNlclJlc3BvbnNlID0gcGljayh1c2VyLCBbXG4gICAgICAnaWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdwaG90b1VSTCcsXG4gICAgICAnZGVza3RvcE5vdGlmc0VuYWJsZWQnLFxuICAgICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnVzZXJSZXNwb25zZSxcbiAgICAgIGNvdXJzZXMsXG4gICAgICBwaG9uZU51bWJlcjogdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlcixcbiAgICAgIGRlc2t0b3BOb3RpZnMsXG4gICAgfTtcbiAgfVxuXG4gIEBQYXRjaCgpXG4gIGFzeW5jIHBhdGNoKFxuICAgIEBCb2R5KCkgdXNlclBhdGNoOiBVcGRhdGVQcm9maWxlUGFyYW1zLFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgdXNlciA9IE9iamVjdC5hc3NpZ24odXNlciwgdXNlclBhdGNoKTtcbiAgICBpZiAoXG4gICAgICB1c2VyLnBob25lTm90aWZzRW5hYmxlZCAmJlxuICAgICAgdXNlclBhdGNoLnBob25lTnVtYmVyICE9PSB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5yZWdpc3RlclBob25lKHVzZXJQYXRjaC5waG9uZU51bWJlciwgdXNlcik7XG4gICAgfVxuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVzZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRyb2xsZXIgfSBmcm9tICcuL3F1ZXN0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVlc3Rpb25TdWJzY3JpYmVyIH0gZnJvbSAnLi9xdWVzdGlvbi5zdWJzY3JpYmVyJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUXVlc3Rpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbUXVlc3Rpb25TdWJzY3JpYmVyXSxcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZSwgUXVldWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2xvc2VkUXVlc3Rpb25TdGF0dXMsXG4gIENyZWF0ZVF1ZXN0aW9uUGFyYW1zLFxuICBDcmVhdGVRdWVzdGlvblJlc3BvbnNlLFxuICBHZXRRdWVzdGlvblJlc3BvbnNlLFxuICBMaW1ib1F1ZXN0aW9uU3RhdHVzLFxuICBPcGVuUXVlc3Rpb25TdGF0dXMsXG4gIFF1ZXN0aW9uU3RhdHVzS2V5cyxcbiAgUm9sZSxcbiAgVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7XG4gIEJhZFJlcXVlc3RFeGNlcHRpb24sXG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIEluIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXIsIFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uUm9sZXNHdWFyZCB9IGZyb20gJy4vcXVlc3Rpb24tcm9sZS5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcigncXVlc3Rpb25zJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkLCBRdWVzdGlvblJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpxdWVzdGlvbklkJylcbiAgYXN5bmMgZ2V0UXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICApOiBQcm9taXNlPEdldFF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY3JlYXRvcicsICd0YUhlbHBlZCddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUG9zdCgpXG4gIEBSb2xlcyhSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGNyZWF0ZVF1ZXN0aW9uKFxuICAgIEBCb2R5KCkgYm9keTogQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8Q3JlYXRlUXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgdGV4dCwgcXVlc3Rpb25UeXBlLCBxdWV1ZUlkLCBmb3JjZSB9ID0gYm9keTtcblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBxdWV1ZUlkIH0sXG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1Bvc3RlZCB0byBhbiBpbnZhbGlkIHF1ZXVlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFxdWV1ZS5hbGxvd1F1ZXN0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ1F1ZXVlIG5vdCBhbGxvd2luZyBuZXcgcXVlc3Rpb25zJyk7XG4gICAgfVxuICAgIGlmICghKGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbignUXVldWUgaXMgY2xvc2VkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNVc2VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY3JlYXRvcklkOiB1c2VyLmlkLFxuICAgICAgICBzdGF0dXM6IEluKE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCEhcHJldmlvdXNVc2VyUXVlc3Rpb24pIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICBwcmV2aW91c1VzZXJRdWVzdGlvbi5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5TdHVkZW50Q2FuY2VsbGVkO1xuICAgICAgICBhd2FpdCBwcmV2aW91c1VzZXJRdWVzdGlvbi5zYXZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBcIllvdSBjYW4ndCBjcmVhdGUgbW9yZSB0aGFuIG9uZSBxdWVzdGlvbiBhdCBhIHRpbWUuXCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7XG4gICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIHRleHQsXG4gICAgICBxdWVzdGlvblR5cGUsXG4gICAgICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzS2V5cy5EcmFmdGluZyxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlzT25saW5lOiB0cnVlLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXN0aW9uSWQnKVxuICBAUm9sZXMoUm9sZS5TVFVERU5ULCBSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgLy8gVE9ETzogVXNlIHF1ZXVlUm9sZSBkZWNvcmF0b3IsIGJ1dCB3ZSBuZWVkIHRvIGZpeCBpdHMgcGVyZm9ybWFuY2UgZmlyc3RcbiAgYXN5bmMgdXBkYXRlUXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3F1ZXVlJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ3JlYXRvciA9IHVzZXJJZCA9PT0gcXVlc3Rpb24uY3JlYXRvcklkO1xuXG4gICAgaWYgKGlzQ3JlYXRvcikge1xuICAgICAgLy8gRmFpbCBpZiBzdHVkZW50IHRyaWVzIGFuIGludmFsaWQgc3RhdHVzIGNoYW5nZVxuICAgICAgaWYgKGJvZHkuc3RhdHVzICYmICFxdWVzdGlvbi5jaGFuZ2VTdGF0dXMoYm9keS5zdGF0dXMsIFJvbGUuU1RVREVOVCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBgU3R1ZGVudCBjYW5ub3QgY2hhbmdlIHN0YXR1cyBmcm9tICR7cXVlc3Rpb24uc3RhdHVzfSB0byAke2JvZHkuc3RhdHVzfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbiA9IE9iamVjdC5hc3NpZ24ocXVlc3Rpb24sIGJvZHkpO1xuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCBjcmVhdG9yLCBjaGVjayBpZiB1c2VyIGlzIFRBL1BST0Ygb2YgY291cnNlIG9mIHF1ZXN0aW9uXG4gICAgY29uc3QgaXNUYU9yUHJvZiA9XG4gICAgICAoYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY291cnNlSWQ6IHF1ZXN0aW9uLnF1ZXVlLmNvdXJzZUlkLFxuICAgICAgICAgIHJvbGU6IEluKFtSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUl0pLFxuICAgICAgICB9LFxuICAgICAgfSkpID4gMDtcblxuICAgIGlmIChpc1RhT3JQcm9mKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoYm9keSkubGVuZ3RoICE9PSAxIHx8IE9iamVjdC5rZXlzKGJvZHkpWzBdICE9PSAnc3RhdHVzJykge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICdUQS9Qcm9mZXNzb3JzIGNhbiBvbmx5IGVkaXQgcXVlc3Rpb24gc3RhdHVzJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFN0YXR1cyA9IHF1ZXN0aW9uLnN0YXR1cztcbiAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IGJvZHkuc3RhdHVzO1xuICAgICAgLy8gSWYgdGhlIHRhSGVscGVkIGlzIGFscmVhZHkgc2V0LCBtYWtlIHN1cmUgdGhlIHNhbWUgdGEgdXBkYXRlcyB0aGUgc3RhdHVzXG4gICAgICBpZiAocXVlc3Rpb24udGFIZWxwZWQ/LmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgaWYgKG9sZFN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgJ0Fub3RoZXIgVEEgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGlzIHF1ZXN0aW9uJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgICdBbm90aGVyIFRBIGhhcyBhbHJlYWR5IHJlc29sdmVkIHRoaXMgcXVlc3Rpb24nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNBbHJlYWR5SGVscGluZ09uZSA9XG4gICAgICAgIChhd2FpdCBRdWVzdGlvbk1vZGVsLmNvdW50KHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgdGFIZWxwZWRJZDogdXNlcklkLFxuICAgICAgICAgICAgc3RhdHVzOiBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSkgPT09IDE7XG4gICAgICBpZiAoaXNBbHJlYWR5SGVscGluZ09uZSAmJiBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdUQSBpcyBhbHJlYWR5IGhlbHBpbmcgc29tZW9uZSBlbHNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkVHJhbnNpdGlvbiA9IHF1ZXN0aW9uLmNoYW5nZVN0YXR1cyhuZXdTdGF0dXMsIFJvbGUuVEEpO1xuICAgICAgaWYgKCF2YWxpZFRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICBgVEEgY2Fubm90IGNoYW5nZSBzdGF0dXMgZnJvbSAke3F1ZXN0aW9uLnN0YXR1c30gdG8gJHtib2R5LnN0YXR1c31gLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgVEEgYXMgdGFIZWxwZWQgd2hlbiB0aGUgVEEgc3RhcnRzIGhlbHBpbmcgdGhlIHN0dWRlbnRcbiAgICAgIGlmIChcbiAgICAgICAgb2xkU3RhdHVzICE9PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyAmJlxuICAgICAgICBuZXdTdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXG4gICAgICApIHtcbiAgICAgICAgcXVlc3Rpb24udGFIZWxwZWQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh1c2VySWQpO1xuICAgICAgICBxdWVzdGlvbi5oZWxwZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gU2V0IGZpcnN0SGVscGVkQXQgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKCFxdWVzdGlvbi5maXJzdEhlbHBlZEF0KSB7XG4gICAgICAgICAgcXVlc3Rpb24uZmlyc3RIZWxwZWRBdCA9IHF1ZXN0aW9uLmhlbHBlZEF0O1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MucXVldWUuVEFfSElUX0hFTFBFRChxdWVzdGlvbi50YUhlbHBlZC5uYW1lKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgJ0xvZ2dlZC1pbiB1c2VyIGRvZXMgbm90IGhhdmUgZWRpdCBhY2Nlc3MnLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAUG9zdCgnOnF1ZXN0aW9uSWQvbm90aWZ5JylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SKVxuICBhc3luYyBub3RpZnkoQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ3F1ZXVlJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5BTEVSVF9CVVRUT04sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBMaW1ib1F1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuUkVNT1ZFRCxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGxldCBxdWV1ZUlkO1xuXG4gICAgaWYgKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpO1xuICAgICAgaWYgKCFxdWVzdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1F1ZXN0aW9uIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuICAgICAgcXVldWVJZCA9IHF1ZXN0aW9uLnF1ZXVlSWQ7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmJvZHkucXVldWVJZCkge1xuICAgICAgLy8gSWYgeW91IGFyZSBjcmVhdGluZyBhIG5ldyBxdWVzdGlvblxuICAgICAgcXVldWVJZCA9IHJlcXVlc3QuYm9keS5xdWV1ZUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbignQ2Fubm90IGZpbmQgcXVldWUgb2YgcXVlc3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkKTtcblxuICAgIC8vIFlvdSBjYW5ub3QgaW50ZXJhY3Qgd2l0aCBhIHF1ZXN0aW9uIGluIGEgbm9uZXhpc3RlbnQgcXVldWVcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1RoaXMgcXVldWUgZG9lcyBub3QgZXhpc3QhJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIEluc2VydEV2ZW50LFxuICBSZW1vdmVFdmVudCxcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWVzdGlvbk1vZGVsPiB7XG4gIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuXG4gICAgLy8gU2VuZCBwdXNoIG5vdGlmaWNhdGlvbiB0byBzdHVkZW50cyB3aGVuIHRoZXkgYXJlIGhpdCAzcmQgaW4gbGluZVxuICAgIC8vIGlmIHN0YXR1cyB1cGRhdGVkIHRvIGNsb3NlZFxuICAgIGlmIChcbiAgICAgIGV2ZW50LnVwZGF0ZWRDb2x1bW5zLmZpbmQoKGMpID0+IGMucHJvcGVydHlOYW1lID09PSAnc3RhdHVzJykgJiZcbiAgICAgIGV2ZW50LmVudGl0eS5zdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXNcbiAgICApIHtcbiAgICAgIC8vIGdldCAzcmQgaW4gcXVldWUgYmVmb3JlIGFuZCBhZnRlciB0aGlzIHVwZGF0ZVxuICAgICAgY29uc3QgcHJldmlvdXNUaGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICAgKVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGNvbnN0IHRoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC53YWl0aW5nSW5RdWV1ZShldmVudC5lbnRpdHkucXVldWVJZClcbiAgICAgICAgLnNldFF1ZXJ5UnVubmVyKGV2ZW50LnF1ZXJ5UnVubmVyKSAvLyBSdW4gaW4gc2FtZSB0cmFuc2FjdGlvbiBhcyB0aGUgdXBkYXRlXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgaWYgKHRoaXJkICYmIHByZXZpb3VzVGhpcmQ/LmlkICE9PSB0aGlyZD8uaWQpIHtcbiAgICAgICAgY29uc3QgeyBjcmVhdG9ySWQgfSA9IHRoaXJkO1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKGNyZWF0b3JJZCwgTm90aWZNc2dzLnF1ZXVlLlRISVJEX1BMQUNFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJPZlF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwud2FpdGluZ0luUXVldWUoXG4gICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICApLmdldENvdW50KCk7XG5cbiAgICBpZiAobnVtYmVyT2ZRdWVzdGlvbnMgPT09IDApIHtcbiAgICAgIGNvbnN0IHN0YWZmID0gKFxuICAgICAgICBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoZXZlbnQuZW50aXR5LnF1ZXVlSWQsIHtcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgICAgIH0pXG4gICAgICApLnN0YWZmTGlzdDtcblxuICAgICAgc3RhZmYuZm9yRWFjaCgoc3RhZmYpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgICBzdGFmZi5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MudGEuU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICB9XG5cbiAgYXN5bmMgYmVmb3JlUmVtb3ZlKGV2ZW50OiBSZW1vdmVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGR1ZSB0byBjYXNjYWRlcyBlbnRpdHkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgbG9hZGVkXG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgU2VlZENvbnRyb2xsZXIgfSBmcm9tICcuL3NlZWQuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWVkU2VydmljZSB9IGZyb20gJy4vc2VlZC5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbU2VlZENvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtTZWVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZWRNb2R1bGUge31cbiIsImltcG9ydCB7IEJvZHksIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUm9sZSwgQ3JlYXRlUXVlc3Rpb25QYXJhbXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBPZmZpY2VIb3VyRmFjdG9yeSxcbiAgUXVlc3Rpb25GYWN0b3J5LFxuICBRdWV1ZUZhY3RvcnksXG4gIFVzZXJDb3Vyc2VGYWN0b3J5LFxuICBTZW1lc3RlckZhY3RvcnksXG4gIENvdXJzZUZhY3RvcnksXG4gIFVzZXJGYWN0b3J5LFxufSBmcm9tICcuLi8uLi90ZXN0L3V0aWwvZmFjdG9yaWVzJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3NlZWRzJylcbkBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuZXhwb3J0IGNsYXNzIFNlZWRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgc2VlZFNlcnZpY2U6IFNlZWRTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVsZXRlJylcbiAgYXN5bmMgZGVsZXRlQWxsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoT2ZmaWNlSG91ck1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWVzdGlvbk1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWV1ZU1vZGVsKTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgcmVzZXQnO1xuICB9XG5cbiAgQEdldCgnY3JlYXRlJylcbiAgYXN5bmMgY3JlYXRlU2VlZHMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBGaXJzdCBkZWxldGUgdGhlIG9sZCBkYXRhXG4gICAgYXdhaXQgdGhpcy5kZWxldGVBbGwoKTtcblxuICAgIC8vIFRoZW4gYWRkIHRoZSBuZXcgc2VlZCBkYXRhXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuXG4gICAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRvbW9ycm93LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMTkpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgLSA0NTAwMDAwKSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAxMDAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1llc3RlcmRheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHllc3RlcmRheSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHllc3RlcmRheS52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvbW9ycm93ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogdG9tb3Jyb3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh0b21vcnJvdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUV4aXN0cyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFjb3Vyc2VFeGlzdHMpIHtcbiAgICAgIGF3YWl0IFNlbWVzdGVyRmFjdG9yeS5jcmVhdGUoeyBzZWFzb246ICdGYWxsJywgeWVhcjogMjAyMCB9KTtcbiAgICAgIGF3YWl0IENvdXJzZUZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICAgIHJlbGF0aW9uczogWydvZmZpY2VIb3VycyddLFxuICAgIH0pO1xuXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gW1xuICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgIF07XG4gICAgY291cnNlLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJFeHNpc3RzID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKTtcbiAgICBpZiAoIXVzZXJFeHNpc3RzKSB7XG4gICAgICAvLyBTdHVkZW50IDFcbiAgICAgIGNvbnN0IHVzZXIxID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdsaXUuc3RhQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnU3RhbmxleSBMaXUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVIyMENHMzZFLWNmMGYzNzUyNTJiZC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMSxcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gU3R1bmRlbnQgMlxuICAgICAgY29uc3QgdXNlcjIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3Rha2F5YW1hLmFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdBbGV4IFRha2F5YW1hJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVKTDk3NDQzRC01MDEyMTMzOTY4NmItNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjIsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDFcbiAgICAgIGNvbnN0IHVzZXIzID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdzdGVuemVsLndAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdXaWxsIFN0ZW56ZWwnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVJGMjU2S1JULWQxMDA5OGU4NzlkYS01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMyxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDJcbiAgICAgIGNvbnN0IHVzZXI0ID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdjaHUuZGFqQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnRGEtSmluIENodScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VRTU2WTVVVDEtODVkYjU5YTQ3NGY0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI0LFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICByb29tOiAnV0hWIDEwMScsXG4gICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIG9mZmljZUhvdXJzOiBbXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICAgIF0sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAyNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQEdldCgnZmlsbF9xdWV1ZScpXG4gIGFzeW5jIGZpbGxRdWV1ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKCk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVVc2VyJylcbiAgYXN5bmMgY3JlYXRlVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IHsgcm9sZTogUm9sZTsgY291cnNlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB0YTogVXNlckNvdXJzZU1vZGVsO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUsIGNvdXJzZTogY291cnNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXVlJylcbiAgYXN5bmMgY3JlYXRlUXVldWUoXG4gICAgQEJvZHkoKSBib2R5OiB7IGNvdXJzZUlkOiBudW1iZXI7IGFsbG93UXVlc3Rpb25zOiBib29sZWFuIH0sXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvZHkuYWxsb3dRdWVzdGlvbnMgPz8gZmFsc2UsXG4gICAgfTtcbiAgICBpZiAoYm9keS5jb3Vyc2VJZCkge1xuICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LmNvdXJzZUlkKTtcbiAgICAgIG9wdGlvbnNbJ2NvdXJzZSddID0gY291cnNlO1xuICAgIH1cbiAgICBjb25zdCBxdWV1ZTogUXVldWVNb2RlbCA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXN0aW9uJylcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKVxuICAgIGJvZHk6IHtcbiAgICAgIHF1ZXVlSWQ6IG51bWJlcjtcbiAgICAgIHN0dWRlbnRJZDogbnVtYmVyO1xuICAgICAgZGF0YTogQ3JlYXRlUXVlc3Rpb25QYXJhbXM7XG4gICAgfSxcbiAgKTogUHJvbWlzZTxRdWVzdGlvbk1vZGVsPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmIChib2R5LnF1ZXVlSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkucXVldWVJZCk7XG4gICAgICBvcHRpb25zWydxdWV1ZSddID0gcXVldWU7XG4gICAgfVxuICAgIGlmIChib2R5LnN0dWRlbnRJZCkge1xuICAgICAgY29uc3Qgc3R1ZGVudCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuc3R1ZGVudElkKTtcbiAgICAgIG9wdGlvbnNbJ2NyZWF0b3InXSA9IHN0dWRlbnQ7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbk1vZGVsID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgLi4uYm9keS5kYXRhLFxuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsICdPbmxpbmUnKVxuICAuYXNzb2NPbmUoJ2NvdXJzZScsIENvdXJzZUZhY3RvcnkpXG4gIC5hdHRyKCdhbGxvd1F1ZXN0aW9ucycsIGZhbHNlKVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuLy8gV0FSTklORzogRE8gTk9UIFVTRSBDUkVBVE9SSUQuIEFTIFlPVSBTRUUgSEVSRSwgV0UgT05MWSBBQ0NFUFQgQ1JFQVRPUlxuLy9UT0RPOiBtYWtlIGl0IGFjY2VwdCBjcmVhdG9ySWQgYXMgd2VsbFxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFF1ZXN0aW9uTW9kZWwpXG4gIC5zZXF1ZW5jZSgndGV4dCcsIChpKSA9PiBgcXVlc3Rpb24gJHtpfWApXG4gIC5hdHRyKCdzdGF0dXMnLCAnUXVldWVkJylcbiAgLmF0dHIoJ3F1ZXN0aW9uVHlwZScsIFF1ZXN0aW9uVHlwZS5PdGhlcilcbiAgLmF0dHIoJ2NyZWF0ZWRBdCcsIG5ldyBEYXRlKCkpXG4gIC5hc3NvY09uZSgncXVldWUnLCBRdWV1ZUZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY3JlYXRvcicsIFVzZXJGYWN0b3J5KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm0tZmFjdG9yeVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VlZFNlcnZpY2Uge1xuICBhc3luYyBkZWxldGVBbGwobW9kZWw6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGdldENvbm5lY3Rpb24oKS5jcmVhdGVRdWVyeUJ1aWxkZXIoKS5kZWxldGUoKS5mcm9tKG1vZGVsKS5leGVjdXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEFkbWluQ29yZU1vZHVsZUZhY3RvcnksXG4gIEFkbWluQXV0aE1vZHVsZUZhY3RvcnksXG4gIERlZmF1bHRBZG1pblNpdGUsXG59IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgfSBmcm9tICcuL2NyZWRlbnRpYWxWYWxpZGF0b3InO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHtcbiAgQ291cnNlQWRtaW4sXG4gIFF1ZXVlQWRtaW4sXG4gIFVzZXJBZG1pbixcbiAgVXNlckNvdXJzZUFkbWluLFxuICBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluLFxufSBmcm9tICcuL2FkbWluLWVudGl0aWVzJztcbmltcG9ydCB7IEFkbWluQ29tbWFuZCB9IGZyb20gJy4vYWRtaW4uY29tbWFuZCc7XG5cbmNvbnN0IENvcmVNb2R1bGUgPSBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQ29yZU1vZHVsZSh7fSk7XG5jb25zdCBBdXRoTW9kdWxlID0gQWRtaW5BdXRoTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkF1dGhNb2R1bGUoe1xuICBhZG1pbkNvcmVNb2R1bGU6IENvcmVNb2R1bGUsXG4gIGNyZWRlbnRpYWxWYWxpZGF0b3I6IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciwgLy8gaG93IGRvIHlvdSB2YWxpZGF0ZSBjcmVkZW50aWFsc1xuICBpbXBvcnRzOiBbVHlwZU9ybU1vZHVsZS5mb3JGZWF0dXJlKFtBZG1pblVzZXJNb2RlbF0pXSwgLy8gd2hhdCBtb2R1bGVzIGV4cG9ydCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZSBjcmVkZW50aWFsVmFsaWRhdG9yIGF2YWlsYWJsZVxuICBwcm92aWRlcnM6IFtdLFxufSk7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQWRtaW5Db21tYW5kXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFkbWluU2l0ZTogRGVmYXVsdEFkbWluU2l0ZSkge1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlJywgQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlcicsIFVzZXJBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyQ291cnNlJywgVXNlckNvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1F1ZXVlJywgUXVldWVBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2VTZWN0aW9uTWFwcGluZycsIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtYWRtaW5cIik7IiwiaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICdiY3J5cHQnO1xuXG5leHBvcnQgY29uc3QgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yID0ge1xuICBpbmplY3Q6IFtdLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ3JlZGVudGlhbHMoXG4gICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPEFkbWluVXNlck1vZGVsPiB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgaWYgKGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKSkge1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9LFxufTtcbiIsImltcG9ydCB7IEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiwgQmFzZUVudGl0eSwgQ29sdW1uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdCc7XG5cbi8qKlxuICogQWRtaW4gdXNlcnMgYXJlIHRvdGFsbHkgc2VwYXJhdGUgZnJvbSByZWd1bGFyIHVzZXJzIGFuZCBjYW4gb25seSBiZSBjcmVhdGVkIGZyb20gY29tbWFuZCBsaW5lLlxuICogYHlhcm4gY2xpIGFkbWluOmNyZWF0ZWBcbiAqL1xuQEVudGl0eSgnYWRtaW5fdXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQWRtaW5Vc2VyTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIHNldFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBhc3N3b3JkSGFzaCA9IGhhc2hTeW5jKHBhc3N3b3JkLCA1KTtcbiAgfVxuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgdW5pcXVlOiB0cnVlLCBudWxsYWJsZTogZmFsc2UgfSlcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIG51bGxhYmxlOiBmYWxzZSB9KVxuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJpbXBvcnQgeyBBZG1pbkVudGl0eSB9IGZyb20gJ25lc3Rqcy1hZG1pbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnbmFtZSddO1xufVxuXG5leHBvcnQgY2xhc3MgUXVldWVBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gUXVldWVNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3Jvb20nLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlck1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZW1haWwnLCAnbmFtZSddO1xuICBzZWFyY2hGaWVsZHMgPSBbJ2VtYWlsJywgJ25hbWUnXTtcbiAgZmllbGRzID0gW1xuICAgICdpZCcsXG4gICAgJ2VtYWlsJyxcbiAgICAnbmFtZScsXG4gICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICAncXVldWVzJyxcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gVXNlckNvdXJzZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAndXNlcklkJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAnZ2VuZXJpY0NvdXJzZU5hbWUnLCAnc2VjdGlvbicsICdjb3Vyc2VJZCddO1xufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCwgUG9zaXRpb25hbCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcXVlc3Rpb24sIGtleUluWU4gfSBmcm9tICdyZWFkbGluZS1zeW5jJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkbWluQ29tbWFuZCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnY3JlYXRlOmFkbWluIDx1c2VybmFtZT4nLFxuICAgIGRlc2NyaWJlOiAnY3JlYXRlIGFuIGFkbWluIHVzZXInLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjcmVhdGUoXG4gICAgQFBvc2l0aW9uYWwoe1xuICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcbiAgICAgIGRlc2NyaWJlOiAndGhlIGFkbWluIHVzZXJuYW1lJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0pXG4gICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IGNoYW5nZVBhc3N3b3JkID0ga2V5SW5ZTihcbiAgICAgICAgYFVzZXIgJHt1c2VybmFtZX0gYWxyZWFkeSBleGlzdHMuIERvIHlvdSB3YW50IHRvIGNoYW5nZSB0aGVpciBwYXNzd29yZD9gLFxuICAgICAgKTtcbiAgICAgIGlmICghY2hhbmdlUGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyID0gQWRtaW5Vc2VyTW9kZWwuY3JlYXRlKHsgdXNlcm5hbWUgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBhc3N3b3JkOiBzdHJpbmcgPSBxdWVzdGlvbignUGFzc3dvcmQ6ICcsIHtcbiAgICAgIGhpZGVFY2hvQmFjazogdHJ1ZSxcbiAgICB9KTtcbiAgICB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgQ3JlYXRlZCB1c2VyOiAke3VzZXIudXNlcm5hbWV9YCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWRsaW5lLXN5bmNcIik7IiwiaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9hZG1pbi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmNvbmZpZygpO1xuXG4vLyBPcHRpb25zIG9ubHkgdXNlZCB3aGUgcnVuIHZpYSBDTElcbmNvbnN0IGluQ0xJID0ge1xuICBtaWdyYXRpb25zOiBbJ21pZ3JhdGlvbi8qLnRzJ10sXG4gIGNsaToge1xuICAgIG1pZ3JhdGlvbnNEaXI6ICdtaWdyYXRpb24nLFxuICB9LFxufTtcblxuY29uc3QgdHlwZW9ybSA9IHtcbiAgdHlwZTogJ3Bvc3RncmVzJyxcbiAgdXJsOiBwcm9jZXNzLmVudi5EQl9VUkwgfHwgJ3Bvc3RncmVzOi8vcG9zdGdyZXNAbG9jYWxob3N0OjU0MzIvZGV2JyxcbiAgc3luY2hyb25pemU6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG4gIGVudGl0aWVzOiBbXG4gICAgQ291cnNlTW9kZWwsXG4gICAgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCxcbiAgICBPZmZpY2VIb3VyTW9kZWwsXG4gICAgU2VtZXN0ZXJNb2RlbCxcbiAgICBVc2VyTW9kZWwsXG4gICAgVXNlckNvdXJzZU1vZGVsLFxuICAgIFF1ZXN0aW9uTW9kZWwsXG4gICAgUXVldWVNb2RlbCxcbiAgICBEZXNrdG9wTm90aWZNb2RlbCxcbiAgICBQaG9uZU5vdGlmTW9kZWwsXG4gICAgQWRtaW5Vc2VyTW9kZWwsXG4gIF0sXG4gIGtlZXBDb25uZWN0aW9uQWxpdmU6IHRydWUsXG4gIGxvZ2dpbmc6ICEhcHJvY2Vzcy5lbnYuVFlQRU9STV9MT0dHSU5HLFxuICAuLi4oISFwcm9jZXNzLmVudi5UWVBFT1JNX0NMSSA/IGluQ0xJIDoge30pLFxufTtcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9ybTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCYWNrZmlsbFBob25lTm90aWZzIH0gZnJvbSAnLi9iYWNrZmlsbC1waG9uZS1ub3RpZnMuY29tbWFuZCc7XG5pbXBvcnQgeyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB9IGZyb20gJy4vcXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0LmNvbW1hbmQnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0JhY2tmaWxsUGhvbmVOb3RpZnMsIEJhY2tmaWxsUXVlc3Rpb25GaXJzdEhlbHBlZEF0XSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICdub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKChkKSA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKChkKSA9PiBkLmlkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnNUb0Rpc2FibGUgPSAoXG4gICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZCh7XG4gICAgICAgIHdoZXJlOiB7IHBob25lTm90aWZzRW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICByZWxhdGlvbnM6IFsncGhvbmVOb3RpZiddLFxuICAgICAgfSlcbiAgICApLmZpbHRlcigodSkgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCgodSkgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICdxdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgSXNOdWxsIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFF1ZXN0aW9uRmlyc3RIZWxwZWRBdCB7XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYmFja2ZpbGw6cXVlc3Rpb24tZmlyc3QtaGVscGVkLWF0JyxcbiAgICBkZXNjcmliZTogJ2NvcHkgYWxsIGV4aXN0aW5nIGhlbHBlZEF0IHRvIGZpcnN0SGVscGVkQXQnLFxuICAgIGF1dG9FeGl0OiB0cnVlLFxuICB9KVxuICBhc3luYyBjb3B5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFF1ZXN0aW9uTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKClcbiAgICAgIC51cGRhdGUoKVxuICAgICAgLnNldCh7IGZpcnN0SGVscGVkQXQ6ICgpID0+ICdcImhlbHBlZEF0XCInIH0pXG4gICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgLmNhbGxMaXN0ZW5lcnMoZmFsc2UpXG4gICAgICAuZXhlY3V0ZSgpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFVwZGF0ZWQgJHthd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAud2hlcmUoeyBmaXJzdEhlbHBlZEF0OiBJc051bGwoKSB9KVxuICAgICAgICAuZ2V0Q291bnQoKX0gcmVjb3Jkc2AsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlLCBIdHRwTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB9IGZyb20gJy4vcmVsZWFzZS1ub3Rlcy5jb250cm9sbGVyJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUmVsZWFzZU5vdGVzQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwTW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgdXNlRmFjdG9yeTogKCkgPT4gKHtcbiAgICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgICAgbWF4UmVkaXJlY3RzOiA1LFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlbGVhc2VOb3Rlc01vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgVXNlR3VhcmRzLFxuICBHZXQsXG4gIEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24sXG4gIEh0dHBTZXJ2aWNlLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICdsb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQENvbnRyb2xsZXIoJ3JlbGVhc2Vfbm90ZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUmVsZWFzZU5vdGVzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXRSZWxlYXNlTm90ZXMoKTogUHJvbWlzZTxHZXRSZWxlYXNlTm90ZXNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBHZXRSZWxlYXNlTm90ZXNSZXNwb25zZSA9IHtcbiAgICAgIGxhc3RVcGRhdGVkVW5peFRpbWU6IG51bGwsXG4gICAgICByZWxlYXNlTm90ZXM6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldChcbiAgICAgICAgJ2h0dHBzOi8vbm90aW9uLWFwaS5zcGxpdGJlZS5pby92MS9wYWdlL2FiYmEyNDZiZmEwODQ3YmFhMjcwNmFiMzBkMGM2YzdkJyxcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgICBjb25zdCBkYXRhID0gcmVxdWVzdC5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aW1lVGV4dCA9XG4gICAgICAgIGRhdGFbJ2JlYWUyYTAyLTI0OWUtNGI2MS05YmZjLTgxMjU4ZDkzZjIwZCddPy52YWx1ZT8ucHJvcGVydGllc1xuICAgICAgICAgID8udGl0bGVbMF1bMF07XG4gICAgICByZXNwb25zZS5sYXN0VXBkYXRlZFVuaXhUaW1lID0gdGltZVRleHQuc3BsaXQoJ1VuaXggJylbMV0gKiAxMDAwO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKFxuICAgICAgICAnRXJyb3IgUGFyc2luZyByZWxlYXNlIG5vdGVzIHRpbWU6ICcgKyBlLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSB0aW1lIGJsb2NrIGFuZCBwYWdlIGxpbmsgYmxvY2sgZnJvbSBwYWdlXG4gICAgZGF0YVsnYmVhZTJhMDItMjQ5ZS00YjYxLTliZmMtODEyNThkOTNmMjBkJ10udmFsdWUucHJvcGVydGllcy50aXRsZSA9IFtdO1xuICAgIGRhdGFbJzRkMjVmMzkzLWU1NzAtNGNkNS1hZDY2LWIyNzhhMDkyNDIyNSddLnZhbHVlLnByb3BlcnRpZXMudGl0bGUgPSBbXTtcbiAgICByZXNwb25zZS5yZWxlYXNlTm90ZXMgPSBkYXRhO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgQXJndW1lbnRNZXRhZGF0YSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuLyoqXG4gKiBTdHJpcCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIGJvZHkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHJpcFVuZGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIG1ldGFkYXRhOiBBcmd1bWVudE1ldGFkYXRhKTogYW55IHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ2JvZHknKSB7XG4gICAgICB0aGlzLmRyb3BVbmRlZmluZWQodmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmRlZmluZWQob2JqOiB1bmtub3duKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOZXN0SW50ZXJjZXB0b3IsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIENhbGxIYW5kbGVyLFxuICBIdHRwRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICBuZXh0OiBDYWxsSGFuZGxlcixcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXhjZXB0aW9uKSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=