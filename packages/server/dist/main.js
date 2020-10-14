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
const stripUndefined_pipe_1 = __webpack_require__(94);
const common_2 = __webpack_require__(14);
const apm_interceptor_1 = __webpack_require__(95);
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
const notification_module_1 = __webpack_require__(55);
const login_module_1 = __webpack_require__(62);
const profile_module_1 = __webpack_require__(71);
const question_module_1 = __webpack_require__(73);
const queue_module_1 = __webpack_require__(41);
const seed_module_1 = __webpack_require__(77);
const admin_module_1 = __webpack_require__(82);
const nestjs_command_1 = __webpack_require__(48);
const sse_module_1 = __webpack_require__(45);
const typeormConfig = __webpack_require__(90);
const backfill_module_1 = __webpack_require__(92);
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
const queue_module_1 = __webpack_require__(41);
const ical_command_1 = __webpack_require__(47);
const ical_service_1 = __webpack_require__(49);
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
const queue_clean_service_1 = __webpack_require__(33);
const queue_entity_1 = __webpack_require__(27);
const course_roles_guard_1 = __webpack_require__(34);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const queue_sse_service_1 = __webpack_require__(36);
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
exports.SSEQueueResponse = exports.UpdateQueueParams = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.ClosedQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.isProd = exports.PROD_URL = void 0;
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
    OpenQuestionStatus["CantFind"] = "CantFind";
    OpenQuestionStatus["TADeleted"] = "TADeleted";
})(OpenQuestionStatus = exports.OpenQuestionStatus || (exports.OpenQuestionStatus = {}));
var ClosedQuestionStatus;
(function (ClosedQuestionStatus) {
    ClosedQuestionStatus["Resolved"] = "Resolved";
    ClosedQuestionStatus["Deferred"] = "Deferred";
    ClosedQuestionStatus["ConfirmedDeleted"] = "ConfirmedDeleted";
    ClosedQuestionStatus["Stale"] = "Stale";
})(ClosedQuestionStatus = exports.ClosedQuestionStatus || (exports.ClosedQuestionStatus = {}));
exports.QuestionStatusKeys = Object.assign(Object.assign({}, OpenQuestionStatus), ClosedQuestionStatus);
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
class ListQuestionsResponse extends Array {
}
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
let QuestionModel = class QuestionModel extends typeorm_1.BaseEntity {
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 34 */
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
const role_guard_1 = __webpack_require__(35);
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
            throw new common_1.NotFoundException('no user course');
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
const sse_service_1 = __webpack_require__(37);
const queue_service_1 = __webpack_require__(39);
const lodash_1 = __webpack_require__(40);
const idToRoom = (queueId) => `q-${queueId}`;
let QueueSSEService = class QueueSSEService {
    constructor(queueService, sseService) {
        this.queueService = queueService;
        this.sseService = sseService;
        this.updateQuestions = this.throttleUpdate(async (queueId) => {
            const questions = await this.queueService.getQuestions(queueId);
            if (questions) {
                this.sendToRoom(queueId, ({ role, userId }) => ({
                    questions: this.queueService.anonymizeQuestions(questions, userId, role),
                }));
            }
        });
        this.updateQueue = this.throttleUpdate(async (queueId) => {
            const queue = await this.queueService.getQueue(queueId);
            if (queue) {
                this.sendToRoom(queueId, () => ({ queue }));
            }
        });
    }
    subscribeClient(queueId, res, metadata) {
        this.sseService.subscribeClient(idToRoom(queueId), { res, metadata });
    }
    sendToRoom(queueId, data) {
        this.sseService.sendEvent(idToRoom(queueId), data);
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
const apm = __webpack_require__(38);
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
    sendEvent(room, payload) {
        if (room in this.clients) {
            console.log(`sending sse to ${this.clients[room].length} clients in ${room}`);
            console.time(`sending sse time: `);
            apm.startTransaction('sse');
            for (const { res, metadata } of this.clients[room]) {
                const toSend = `data: ${class_transformer_1.serialize(payload(metadata))}\n\n`;
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
/* 38 */
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

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
exports.QueueService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const queue_entity_1 = __webpack_require__(27);
const common_2 = __webpack_require__(14);
const question_entity_1 = __webpack_require__(32);
const lodash_1 = __webpack_require__(40);
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
            throw new common_1.NotFoundException();
        }
        return question_entity_1.QuestionModel.openInQueue(queueId)
            .leftJoinAndSelect('question.creator', 'creator')
            .leftJoinAndSelect('question.taHelped', 'taHelped')
            .getMany();
    }
    anonymizeQuestions(questions, userId, role) {
        if (role === common_2.Role.STUDENT) {
            return questions.map((question) => {
                const creator = question.creator.id === userId
                    ? question.creator
                    : lodash_1.pick(question.creator, ['id']);
                return question_entity_1.QuestionModel.create(Object.assign(Object.assign({}, question), { creator }));
            });
        }
        return questions;
    }
};
QueueService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QueueService);
exports.QueueService = QueueService;


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
exports.QueueModule = void 0;
const common_1 = __webpack_require__(5);
const queue_controller_1 = __webpack_require__(42);
const queue_clean_service_1 = __webpack_require__(33);
const sse_module_1 = __webpack_require__(45);
const queue_service_1 = __webpack_require__(39);
const queue_sse_service_1 = __webpack_require__(36);
const queue_subscriber_1 = __webpack_require__(46);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
const user_decorator_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_decorator_1 = __webpack_require__(22);
const queue_role_decorator_1 = __webpack_require__(43);
const queue_role_guard_1 = __webpack_require__(44);
const queue_sse_service_1 = __webpack_require__(36);
const queue_service_1 = __webpack_require__(39);
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
        return this.queueService.anonymizeQuestions(questions, userId, role);
    }
    async updateQueue(queueId, body) {
        const queue = await this.queueService.getQueue(queueId);
        if (queue === undefined) {
            throw new common_1.NotFoundException();
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
    common_1.Get(':queueId'),
    roles_decorator_1.Roles(common_2.Role.TA, common_2.Role.PROFESSOR, common_2.Role.STUDENT),
    __param(0, common_1.Param('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getQueue", null);
__decorate([
    common_1.Get(':queueId/questions'),
    roles_decorator_1.Roles(common_2.Role.TA, common_2.Role.PROFESSOR, common_2.Role.STUDENT),
    __param(0, common_1.Param('queueId')),
    __param(1, queue_role_decorator_1.QueueRole()),
    __param(2, user_decorator_1.UserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getQuestions", null);
__decorate([
    common_1.Patch(':queueId'),
    roles_decorator_1.Roles(common_2.Role.TA, common_2.Role.PROFESSOR),
    __param(0, common_1.Param('queueId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_2.UpdateQueueParams]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "updateQueue", null);
__decorate([
    common_1.Get(':queueId/sse'),
    __param(0, common_1.Param('queueId')),
    __param(1, queue_role_decorator_1.QueueRole()),
    __param(2, user_decorator_1.UserId()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Object]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "sendEvent", null);
QueueController = __decorate([
    common_1.Controller('queues'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, queue_role_guard_1.QueueRolesGuard),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        queue_sse_service_1.QueueSSEService,
        queue_service_1.QueueService])
], QueueController);
exports.QueueController = QueueController;


/***/ }),
/* 43 */
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
exports.QueueRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
const role_guard_1 = __webpack_require__(35);
const queue_entity_1 = __webpack_require__(27);
let QueueRolesGuard = class QueueRolesGuard extends role_guard_1.RolesGuard {
    async setupData(request) {
        const queue = await queue_entity_1.QueueModel.findOne(request.params.queueId);
        const courseId = queue === null || queue === void 0 ? void 0 : queue.courseId;
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
exports.SSEModule = void 0;
const common_1 = __webpack_require__(5);
const sse_service_1 = __webpack_require__(37);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(36);
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
exports.ICalCommand = void 0;
const nestjs_command_1 = __webpack_require__(48);
const common_1 = __webpack_require__(5);
const ical_service_1 = __webpack_require__(49);
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
/* 48 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

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
exports.IcalService = void 0;
const common_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(11);
const node_ical_1 = __webpack_require__(50);
const typeorm_1 = __webpack_require__(19);
const office_hour_entity_1 = __webpack_require__(29);
const course_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(27);
const dist_1 = __webpack_require__(51);
__webpack_require__(52);
const moment = __webpack_require__(53);
const rrule_1 = __webpack_require__(54);
let IcalService = class IcalService {
    constructor(connection) {
        this.connection = connection;
    }
    fixTimezone(date, tz) {
        if (!tz) {
            return date;
        }
        const iana = dist_1.findOneIana(tz);
        const eventoffset = moment.tz.zone(iana || tz).utcOffset(date.getTime());
        const serveroffset = date.getTimezoneOffset();
        const mome = moment(date);
        if (iana) {
            mome.subtract(serveroffset - eventoffset, 'minutes');
        }
        return mome.toDate();
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
                const { options } = rrule;
                const dtstart = this.fixTimezone(options.dtstart, eventTZ);
                const until = options.until && this.fixTimezone(options.until, eventTZ);
                let byweekday = options.byweekday;
                if (options.byhour[0] >= 0 && options.byhour[0] < 4) {
                    byweekday = options.byweekday.map((bwd) => (bwd + 1) % 7);
                }
                const rule = new rrule_1.RRule({
                    freq: options.freq,
                    interval: options.interval,
                    wkst: options.wkst,
                    count: options.count,
                    byweekday,
                    dtstart: dtstart,
                    until: until,
                });
                const exdates = [];
                for (const date in oh.exdate) {
                    const exdate = this.fixTimezone(oh.exdate[date], eventTZ);
                    exdates.push(exdate.toISOString());
                }
                const in10Weeks = new Date(dtstart.getTime() + 1000 * 60 * 60 * 24 * 7 * 10);
                const allDates = rule
                    .all((d) => !!until || d < in10Weeks)
                    .filter((date) => !exdates.includes(date.toISOString()));
                const duration = oh.end.getTime() - oh.start.getTime();
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
                    startTime: this.fixTimezone(oh.start, eventTZ),
                    endTime: this.fixTimezone(oh.end, eventTZ),
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
/* 50 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("rrule");

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
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(5);
const desktop_notif_subscriber_1 = __webpack_require__(56);
const notification_controller_1 = __webpack_require__(61);
const notification_service_1 = __webpack_require__(57);
const twilio_service_1 = __webpack_require__(59);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
const notification_service_1 = __webpack_require__(57);
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
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const webPush = __webpack_require__(58);
const user_entity_1 = __webpack_require__(24);
const desktop_notif_entity_1 = __webpack_require__(25);
const phone_notif_entity_1 = __webpack_require__(26);
const twilio_service_1 = __webpack_require__(59);
const apm = __webpack_require__(38);
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
/* 58 */
/***/ (function(module, exports) {

module.exports = require("web-push");

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
exports.TwilioService = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(60);
let TwilioService = class TwilioService {
    constructor(configService) {
        this.configService = configService;
        this.twilioClient = twilio(this.configService.get('TWILIOACCOUNTSID'), this.configService.get('TWILIOAUTHTOKEN'));
    }
    async getFullPhoneNumber(phoneNumber) {
        try {
            return (await this.twilioClient.lookups.phoneNumbers(phoneNumber).fetch()).phoneNumber;
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
/* 60 */
/***/ (function(module, exports) {

module.exports = require("twilio");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const twilio = __webpack_require__(60);
const jwt_auth_guard_1 = __webpack_require__(20);
const notification_service_1 = __webpack_require__(57);
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
/* 62 */
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
const login_controller_1 = __webpack_require__(63);
const jwt_strategy_1 = __webpack_require__(69);
const jwt_1 = __webpack_require__(64);
const config_1 = __webpack_require__(9);
const login_course_service_1 = __webpack_require__(68);
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
exports.LoginController = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(64);
const common_2 = __webpack_require__(14);
const httpSignature = __webpack_require__(65);
const typeorm_1 = __webpack_require__(19);
const non_production_guard_1 = __webpack_require__(66);
const user_entity_1 = __webpack_require__(24);
const course_section_mapping_entity_1 = __webpack_require__(67);
const login_course_service_1 = __webpack_require__(68);
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
            console.log('parsed request');
            const verify = httpSignature.verifyHMAC(parsedRequest, this.configService.get('KHOURY_PRIVATE_KEY'));
            if (!verify) {
                console.log('invalid');
                throw new common_1.UnauthorizedException('Invalid request signature');
            }
            console.log('valid');
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
/* 64 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

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
exports.LoginCourseService = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_course_entity_1 = __webpack_require__(30);
const course_section_mapping_entity_1 = __webpack_require__(67);
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
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(70);
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
/* 70 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

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
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(5);
const profile_controller_1 = __webpack_require__(72);
const notification_module_1 = __webpack_require__(55);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(24);
const lodash_1 = __webpack_require__(40);
const common_2 = __webpack_require__(14);
const jwt_auth_guard_1 = __webpack_require__(20);
const user_decorator_1 = __webpack_require__(23);
const notification_service_1 = __webpack_require__(57);
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
exports.QuestionModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(55);
const question_controller_1 = __webpack_require__(74);
const question_subscriber_1 = __webpack_require__(76);
const queue_module_1 = __webpack_require__(41);
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
exports.QuestionController = void 0;
const common_1 = __webpack_require__(14);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(20);
const notification_service_1 = __webpack_require__(57);
const roles_decorator_1 = __webpack_require__(22);
const user_course_entity_1 = __webpack_require__(30);
const user_decorator_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(24);
const queue_entity_1 = __webpack_require__(27);
const question_role_guard_1 = __webpack_require__(75);
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
            throw new common_2.MethodNotAllowedException();
        }
        const isUserInCourse = (await user_course_entity_1.UserCourseModel.count({
            where: {
                role: common_1.Role.STUDENT,
                courseId: queue.courseId,
                userId: user.id,
            },
        })) === 1;
        if (!isUserInCourse) {
            throw new common_2.UnauthorizedException("Can't post question to course you're not in!");
        }
        if (!(await queue.checkIsOpen())) {
            throw new common_2.BadRequestException("You can't post a question to a closed queue");
        }
        const previousUserQuestion = await question_entity_1.QuestionModel.findOne({
            where: {
                creatorId: user.id,
                status: typeorm_1.In(Object.values(common_1.OpenQuestionStatus)),
            },
        });
        if (!!previousUserQuestion) {
            if (force) {
                previousUserQuestion.status = common_1.ClosedQuestionStatus.Resolved;
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
            if (body.status === common_1.OpenQuestionStatus.Helping) {
                throw new common_2.UnauthorizedException('Students cannot mark question as helping');
            }
            if (body.status === common_1.ClosedQuestionStatus.Resolved) {
                throw new common_2.UnauthorizedException('Students cannot mark question as resolved');
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
            if (((_a = question.taHelped) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
                if (question.status === common_1.OpenQuestionStatus.Helping) {
                    throw new common_2.UnauthorizedException('Another TA is currently helping with this question');
                }
                if (question.status === common_1.ClosedQuestionStatus.Resolved) {
                    throw new common_2.UnauthorizedException('Another TA has already resolved this question');
                }
            }
            const isAlreadyHelpingOne = (await question_entity_1.QuestionModel.count({
                where: {
                    taHelpedId: userId,
                    status: common_1.OpenQuestionStatus.Helping,
                },
            })) === 1;
            if (isAlreadyHelpingOne && body.status === common_1.OpenQuestionStatus.Helping) {
                return null;
            }
            if (question.status !== common_1.OpenQuestionStatus.Helping &&
                body.status === common_1.OpenQuestionStatus.Helping) {
                question.taHelped = await user_entity_1.UserModel.findOne(userId);
                question.helpedAt = new Date();
                await this.notifService.notifyUser(question.creator.id, notification_service_1.NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name));
            }
            question = Object.assign(question, body);
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
        if (question.status === common_1.OpenQuestionStatus.CantFind) {
            await this.notifService.notifyUser(question.creatorId, notification_service_1.NotifMsgs.queue.ALERT_BUTTON);
        }
        else if (question.status === common_1.OpenQuestionStatus.TADeleted) {
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
exports.QuestionRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(24);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const role_guard_1 = __webpack_require__(35);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSubscriber = void 0;
const common_1 = __webpack_require__(14);
const queue_sse_service_1 = __webpack_require__(36);
const queue_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(19);
const notification_service_1 = __webpack_require__(57);
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
exports.SeedModule = void 0;
const common_1 = __webpack_require__(5);
const seed_controller_1 = __webpack_require__(78);
const seed_service_1 = __webpack_require__(81);
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
exports.SeedController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(19);
const factories_1 = __webpack_require__(79);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const non_production_guard_1 = __webpack_require__(66);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const seed_service_1 = __webpack_require__(81);
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
    common_1.Get('fillQueue'),
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(14);
const typeorm_factory_1 = __webpack_require__(80);
const course_entity_1 = __webpack_require__(28);
const office_hour_entity_1 = __webpack_require__(29);
const semester_entity_1 = __webpack_require__(31);
const user_course_entity_1 = __webpack_require__(30);
const user_entity_1 = __webpack_require__(24);
const question_entity_1 = __webpack_require__(32);
const queue_entity_1 = __webpack_require__(27);
const course_section_mapping_entity_1 = __webpack_require__(67);
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
/* 80 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = __webpack_require__(5);
const nestjs_admin_1 = __webpack_require__(83);
const credentialValidator_1 = __webpack_require__(84);
const typeorm_1 = __webpack_require__(10);
const admin_user_entity_1 = __webpack_require__(85);
const admin_entities_1 = __webpack_require__(87);
const admin_command_1 = __webpack_require__(88);
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
/* 83 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const admin_user_entity_1 = __webpack_require__(85);
const bcrypt_1 = __webpack_require__(86);
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
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(19);
const bcrypt_1 = __webpack_require__(86);
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
/* 86 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(83);
const course_entity_1 = __webpack_require__(28);
const queue_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(24);
const course_section_mapping_entity_1 = __webpack_require__(67);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCommand = void 0;
const nestjs_command_1 = __webpack_require__(48);
const common_1 = __webpack_require__(5);
const admin_user_entity_1 = __webpack_require__(85);
const readline_sync_1 = __webpack_require__(89);
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
/* 89 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 90 */
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
const admin_user_entity_1 = __webpack_require__(85);
const dotenv_1 = __webpack_require__(91);
const course_section_mapping_entity_1 = __webpack_require__(67);
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
/* 91 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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
exports.BackfillModule = void 0;
const common_1 = __webpack_require__(5);
const notification_module_1 = __webpack_require__(55);
const backfill_phone_notifs_command_1 = __webpack_require__(93);
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
exports.BackfillPhoneNotifs = void 0;
const nestjs_command_1 = __webpack_require__(48);
const common_1 = __webpack_require__(5);
const phone_notif_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(19);
const twilio_service_1 = __webpack_require__(59);
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
        console.log('deleting phone notifs: ', toDelete.map(d => d.phoneNumber));
        if (toDelete.length) {
            await phone_notif_entity_1.PhoneNotifModel.delete(toDelete.map(d => d.id));
        }
        const usersToDisable = (await user_entity_1.UserModel.find({
            where: { phoneNotifsEnabled: true },
            relations: ['phoneNotif'],
        })).filter(u => !u.phoneNotif);
        usersToDisable.forEach(u => (u.phoneNotifsEnabled = false));
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
exports.ApmInterceptor = void 0;
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(96);
const apm = __webpack_require__(38);
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
/* 96 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3QtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsYXN0aWMtYXBtLW5vZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWNvbW1hbmRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJpcFVuZGVmaW5lZC5waXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcG0uaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFF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LElBQUksQ0FDdkIsc0JBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLElBQUksS0FBSyxZQUFZLHNCQUFhLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7WUFDRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoQlksY0FBYztJQUQxQixtQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWM7Ozs7Ozs7QUNaM0IsMkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAnZWxhc3RpYy1hcG0tbm9kZS9zdGFydCc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2Jvb3RzdHJhcCc7XG5cbmRlY2xhcmUgY29uc3QgbW9kdWxlOiBhbnk7XG5cbmJvb3RzdHJhcChtb2R1bGUuaG90KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGUvc3RhcnRcIik7IiwiaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUsIElOZXN0QXBwbGljYXRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwLm1vZHVsZSc7XG5pbXBvcnQgeyBTdHJpcFVuZGVmaW5lZFBpcGUgfSBmcm9tICcuL3N0cmlwVW5kZWZpbmVkLnBpcGUnO1xuaW1wb3J0IHsgaXNQcm9kIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQXBtSW50ZXJjZXB0b3IgfSBmcm9tICcuL2FwbS5pbnRlcmNlcHRvcic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKGhvdDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShBcHBNb2R1bGUsIHtcbiAgICBsb2dnZXI6IFsnZXJyb3InLCAnd2FybicsICdsb2cnLCAnZGVidWcnLCAndmVyYm9zZSddLFxuICB9KTtcbiAgYWRkR2xvYmFsc1RvQXBwKGFwcCk7XG4gIGFwcC5zZXRHbG9iYWxQcmVmaXgoJ2FwaS92MScpO1xuICBhcHAudXNlR2xvYmFsSW50ZXJjZXB0b3JzKG5ldyBBcG1JbnRlcmNlcHRvcigpKTtcblxuICBpZiAoaXNQcm9kKCkpIHtcbiAgICBjb25zb2xlLmxvZyhgUnVubmluZyBwcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS5gKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBSdW5uaW5nIG5vbi1wcm9kdWN0aW9uIGF0ICR7cHJvY2Vzcy5lbnYuRE9NQUlOfS4gVEhJUyBNU0cgU0hPVUxEIE5PVCBBUFBFQVIgT04gUFJPRCBWTWAsXG4gICAgKTtcbiAgfVxuICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICBhd2FpdCBhcHAubGlzdGVuKDMwMDIpO1xuXG4gIGlmIChob3QpIHtcbiAgICBob3QuYWNjZXB0KCk7XG4gICAgaG90LmRpc3Bvc2UoKCkgPT4gYXBwLmNsb3NlKCkpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSB0cnVlIGluIHByb2QgYW5kIGluIGludGVncmF0aW9uIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24gYWRkR2xvYmFsc1RvQXBwKGFwcDogSU5lc3RBcHBsaWNhdGlvbik6IHZvaWQge1xuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIHdoaXRlbGlzdDogdHJ1ZSxcbiAgICAgIGZvcmJpZE5vbldoaXRlbGlzdGVkOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgIH0pLFxuICApO1xuICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFN0cmlwVW5kZWZpbmVkUGlwZSgpKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBTY2hlZHVsZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgQ291cnNlTW9kdWxlIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZU1vZHVsZSB9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZHVsZSB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi9xdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuaW1wb3J0IHsgU2VlZE1vZHVsZSB9IGZyb20gJy4vc2VlZC9zZWVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBZG1pbk1vZHVsZSB9IGZyb20gJy4vYWRtaW4vYWRtaW4ubW9kdWxlJztcbmltcG9ydCB7IENvbW1hbmRNb2R1bGUgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICcuL3NzZS9zc2UubW9kdWxlJztcbmltcG9ydCAqIGFzIHR5cGVvcm1Db25maWcgZnJvbSAnLi4vb3JtY29uZmlnJztcbmltcG9ydCB7IEJhY2tmaWxsTW9kdWxlIH0gZnJvbSAnYmFja2ZpbGwvYmFja2ZpbGwubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBUeXBlT3JtTW9kdWxlLmZvclJvb3QodHlwZW9ybUNvbmZpZyksXG4gICAgU2NoZWR1bGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExvZ2luTW9kdWxlLFxuICAgIFByb2ZpbGVNb2R1bGUsXG4gICAgQ291cnNlTW9kdWxlLFxuICAgIFF1ZXVlTW9kdWxlLFxuICAgIE5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBRdWVzdGlvbk1vZHVsZSxcbiAgICBTZWVkTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbXG4gICAgICAgICcuZW52JyxcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbJy5lbnYuZGV2ZWxvcG1lbnQnXSA6IFtdKSxcbiAgICAgIF0sXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBZG1pbk1vZHVsZSxcbiAgICBDb21tYW5kTW9kdWxlLFxuICAgIFNTRU1vZHVsZSxcbiAgICBCYWNrZmlsbE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3R5cGVvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9zY2hlZHVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VDb250cm9sbGVyIH0gZnJvbSAnLi9jb3Vyc2UuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBJQ2FsQ29tbWFuZCB9IGZyb20gJy4vaWNhbC5jb21tYW5kJztcbmltcG9ydCB7IEljYWxTZXJ2aWNlIH0gZnJvbSAnLi9pY2FsLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtDb3Vyc2VDb250cm9sbGVyXSxcbiAgaW1wb3J0czogW1F1ZXVlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbSUNhbENvbW1hbmQsIEljYWxTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgR2V0Q291cnNlUmVzcG9uc2UsIFF1ZXVlUGFydGlhbCwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBnZXRSZXBvc2l0b3J5IH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVDbGVhblNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1jbGVhbi9xdWV1ZS1jbGVhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlUm9sZXNHdWFyZCB9IGZyb20gJy4vY291cnNlLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlU1NFU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLXNzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ2NvdXJzZXMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIENvdXJzZVJvbGVzR3VhcmQpXG5AVXNlSW50ZXJjZXB0b3JzKENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZUNsZWFuU2VydmljZTogUXVldWVDbGVhblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5TVFVERU5ULCBSb2xlLlRBKVxuICBhc3luYyBnZXQoQFBhcmFtKCdpZCcpIGlkOiBudW1iZXIpOiBQcm9taXNlPEdldENvdXJzZVJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogZm9yIGFsbCBjb3Vyc2UgZW5kcG9pbnQsIGNoZWNrIGlmIHRoZXkncmUgYSBzdHVkZW50IG9yIGEgVEFcbiAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKGlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWVzJywgJ3F1ZXVlcy5zdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIC8vIFVzZSByYXcgcXVlcnkgZm9yIHBlcmZvcm1hbmNlIChhdm9pZCBlbnRpdHkgaW5zdGFudGlhdGlvbiBhbmQgc2VyaWFsaXphdGlvbilcbiAgICBjb3Vyc2Uub2ZmaWNlSG91cnMgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgICAgIC5jcmVhdGVRdWVyeUJ1aWxkZXIoJ29oJylcbiAgICAgIC5zZWxlY3QoWydpZCcsICd0aXRsZScsIGBcInN0YXJ0VGltZVwiYCwgYFwiZW5kVGltZVwiYF0pXG4gICAgICAud2hlcmUoJ29oLmNvdXJzZUlkID0gOmNvdXJzZUlkJywgeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pXG4gICAgICAuZ2V0UmF3TWFueSgpO1xuXG4gICAgY291cnNlLnF1ZXVlcyA9IGF3YWl0IGFzeW5jLmZpbHRlcihcbiAgICAgIGNvdXJzZS5xdWV1ZXMsXG4gICAgICBhc3luYyAocSkgPT4gYXdhaXQgcS5jaGVja0lzT3BlbigpLFxuICAgICk7XG4gICAgYXdhaXQgYXN5bmMuZWFjaChjb3Vyc2UucXVldWVzLCBhc3luYyAocSkgPT4ge1xuICAgICAgYXdhaXQgcS5hZGRRdWV1ZVRpbWVzKCk7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdXJzZTtcbiAgfVxuXG4gIEBQb3N0KCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrSW4oXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPFF1ZXVlUGFydGlhbD4ge1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG5cbiAgICBpZiAocXVldWUuc3RhZmZMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIHF1ZXVlLnN0YWZmTGlzdC5wdXNoKHVzZXIpO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcblxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXVlKHF1ZXVlLmlkKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBARGVsZXRlKCc6aWQvdGFfbG9jYXRpb24vOnJvb20nKVxuICBAUm9sZXMoUm9sZS5QUk9GRVNTT1IsIFJvbGUuVEEpXG4gIGFzeW5jIGNoZWNrT3V0KFxuICAgIEBQYXJhbSgnaWQnKSBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIEBQYXJhbSgncm9vbScpIHJvb206IHN0cmluZyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoXG4gICAgICB7XG4gICAgICAgIHJvb20sXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgfSxcbiAgICAgIHsgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddIH0sXG4gICAgKTtcblxuICAgIHF1ZXVlLnN0YWZmTGlzdCA9IHF1ZXVlLnN0YWZmTGlzdC5maWx0ZXIoKGUpID0+IGUuaWQgIT09IHVzZXIuaWQpO1xuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IGZhbHNlO1xuICAgIH1cbiAgICBhd2FpdCBxdWV1ZS5zYXZlKCk7XG4gICAgLy8gQ2xlYW4gdXAgcXVldWUgaWYgbmVjZXNzYXJ5XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlQ2xlYW5TZXJ2aWNlLmNsZWFuUXVldWUocXVldWUuaWQpO1xuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUeXBlIH0gZnJvbSBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XG5pbXBvcnQge1xuICBJc0Jvb2xlYW4sXG4gIElzRGVmaW5lZCxcbiAgSXNFbnVtLFxuICBJc0ludCxcbiAgSXNOb3RFbXB0eSxcbiAgSXNPcHRpb25hbCxcbiAgSXNTdHJpbmcsXG4gIFZhbGlkYXRlSWYsXG59IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcblxuZXhwb3J0IGNvbnN0IFBST0RfVVJMID0gXCJodHRwczovL2tob3VyeW9mZmljZWhvdXJzLmNvbVwiO1xuZXhwb3J0IGNvbnN0IGlzUHJvZCA9ICgpOiBib29sZWFuID0+XG4gIHByb2Nlc3MuZW52LkRPTUFJTiA9PT0gUFJPRF9VUkwgfHxcbiAgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Py5sb2NhdGlvbj8ub3JpZ2luID09PSBQUk9EX1VSTCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFQSSBCYXNlIERhdGEgVHlwZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gTk9URTogVGhlc2UgYXJlIG5vdCB0aGUgREIgZGF0YSB0eXBlcy4gVGhleSBhcmUgb25seSB1c2VkIGZvciB0aGUgYXBpXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHVzZXIuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG9mIHRoZSB1c2VyIGluIG91ciBkYi5cbiAqIEBwYXJhbSBlbWFpbCAtIFRoZSBlbWFpbCBzdHJpbmcgb2YgdGhlIHVzZXIgaWYgdGhleSBwcm92aWRlIGl0IChudWxsYWJsZSlcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGlzIHVzZXI6IEZpcnN0IExhc3QuXG4gKiBAcGFyYW0gcGhvdG9VUkwgLSBUaGUgVVJMIHN0cmluZyBvZiB0aGlzIHVzZXIgcGhvdG8uIFRoaXMgaXMgcHVsbGVkIGZyb20gdGhlIGFkbWluIHNpdGVcbiAqIEBwYXJhbSBjb3Vyc2VzIC0gVGhlIGxpc3Qgb2YgY291cnNlcyB0aGF0IHRoZSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCAoYXMgZWl0aGVyIGEgJ3N0dWRlbnQnLCAndGEnIG9yICdwcm9mZXNzb3InKVxuICogQHBhcmFtIGRlc2t0b3BOb3RpZnMgLSBsaXN0IG9mIGVuZHBvaW50cyBzbyB0aGF0IGZyb250ZW5kIGNhbiBmaWd1cmUgb3V0IGlmIGRldmljZSBpcyBlbmFibGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVtYWlsITogc3RyaW5nO1xuICBuYW1lITogc3RyaW5nO1xuICBwaG90b1VSTCE6IHN0cmluZztcbiAgY291cnNlcyE6IFVzZXJDb3Vyc2VbXTtcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERlc2t0b3BOb3RpZlBhcnRpYWwpXG4gIGRlc2t0b3BOb3RpZnMhOiBEZXNrdG9wTm90aWZQYXJ0aWFsW107XG5cbiAgcGhvbmVOb3RpZnNFbmFibGVkITogYm9vbGVhbjtcbiAgcGhvbmVOdW1iZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIGVuZHBvaW50ITogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBwYXJ0aWFsIHVzZXIgaW5mbyBuZWVkZWQgYnkgdGhlIGZyb250ZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICovXG5leHBvcnQgY2xhc3MgVXNlclBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWw/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob3RvVVJMPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWFsIGNvdXJzZSBkYXRhIG5lZWRlZCBvbiB0aGUgZnJvbnQgZW5kIHdoZW4gbmVzdGVkIGluIGEgcmVzcG9uc2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgbnVtYmVyIG9mIHRoaXMgQ291cnNlLlxuICogQHBhcmFtIG5hbWUgLSBUaGUgc3ViamVjdCBhbmQgY291cnNlIG51bWJlciBvZiB0aGlzIGNvdXJzZS4gRXg6IFwiQ1MgMjUwMFwiXG4gKi9cbmV4cG9ydCB0eXBlIENvdXJzZVBhcnRpYWwgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvdXJzZSB0aGF0IGEgdXNlciBpcyBhY2NvY2lhdGVkIHdpdGggYW5kIHRoZWlyIHJvbGUgaW4gdGhhdCBjb3Vyc2VcbiAqIEBwYXJhbSBjb3Vyc2UgLSBUaGUgY291cnNlIHRoZSB1c2VyIGFjY29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSByb2xlIC0gVGhlIHVzZXIncyByb2xlIGluIHRoZSBjb3Vyc2UuXG4gKi9cbmV4cG9ydCB0eXBlIFVzZXJDb3Vyc2UgPSB7XG4gIGNvdXJzZTogQ291cnNlUGFydGlhbDtcbiAgcm9sZTogUm9sZTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgdXNlciByb2xlcyBpbiBhIGNvdXJzZS5cbiAqL1xuZXhwb3J0IGVudW0gUm9sZSB7XG4gIFNUVURFTlQgPSBcInN0dWRlbnRcIixcbiAgVEEgPSBcInRhXCIsXG4gIFBST0ZFU1NPUiA9IFwicHJvZmVzc29yXCIsXG59XG5cbmNsYXNzIE9mZmljZUhvdXJQYXJ0aWFsIHtcbiAgaWQhOiBudW1iZXI7XG4gIHRpdGxlITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZSE6IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZSE6IERhdGU7XG59XG5cbi8qKlxuICogQSBRdWV1ZSB0aGF0IHN0dWRlbnRzIGNhbiBqb2luIHdpdGggdGhpZXIgdGlja2V0cy5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIFF1ZXVlLlxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhhdCB0aGlzIG9mZmljZSBob3VycyBxdWV1ZSBpcyBmb3IuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gcXVlc3Rpb25zIC0gVGhlIGxpc3Qgb2YgdGhlIHN0dWRlbnRzIHF1ZXN0aW9ucyBhc3NvY2FpdGVkIHdpdGggdGhlIHF1ZXVlLlxuICogQHBhcmFtIHN0YXJ0VGltZSAtIFRoZSBzY2hlZHVsZWQgc3RhcnQgdGltZSBvZiB0aGlzIHF1ZXVlIGJhc2VkIG9uIHRoZSBwYXJzZWQgaWNhbC5cbiAqIEBwYXJhbSBlbmRUaW1lIC0gVGhlIHNjaGVkdWxlZCBlbmQgdGltZSBvZiB0aGlzIHF1ZXVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb29tOiBzdHJpbmc7XG4gIHN0YWZmTGlzdDogVXNlclBhcnRpYWxbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBzdGFydFRpbWU/OiBEYXRlO1xuICBlbmRUaW1lPzogRGF0ZTtcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWV1ZSBwYXJ0aWFsIHRvIGJlIHNob3duIG9uIHRoZSB0b2RheSBwYWdlLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gcm9vbSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIGJ1aWxkaW5nICsgcm9vbSAjIHRoYXQgdGhlIGN1cnJlbnQgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGluLlxuICogQHBhcmFtIHN0YWZmTGlzdCAtIFRoZSBsaXN0IG9mIFRBIHVzZXIncyB0aGF0IGFyZSBjdXJyZW50bHkgaGVscGluZyBhdCBvZmZpY2UgaG91cnMuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZVBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgcm9vbSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgc3RhZmZMaXN0ITogVXNlclBhcnRpYWxbXTtcblxuICBxdWV1ZVNpemUhOiBudW1iZXI7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBpc09wZW4hOiBib29sZWFuO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIHN0YXJ0VGltZT86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgZW5kVGltZT86IERhdGU7XG5cbiAgYWxsb3dRdWVzdGlvbnMhOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgUXVlc3Rpb24gaXMgY3JlYXRlZCB3aGVuIGEgc3R1ZGVudCB3YW50cyBoZWxwIGZyb20gYSBUQS5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgbnVtYmVyIGZvciBhIHN0dWRlbnQgcXVlc3Rpb24uXG4gKiBAcGFyYW0gY3JlYXRvciAtIFRoZSBTdHVkZW50IHRoYXQgaGFzIGNyZWF0ZWQgdGhlIHF1ZXN0aW9uLlxuICogQHBhcmFtIHRleHQgLSBUaGUgdGV4dCBkZXNjcml0aXBuIG9mIHdoYXQgaGUvc2hlIG5lZWRzIGhlbHAgd2l0aC5cbiAqIEBwYXJhbSBjcmVhdGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRpY2tldCB3YXMgY3JlYXRlZC4gRXg6IFwiMjAyMC0wOS0xMlQxMjowMDowMC0wNDowMFwiXG4gKiBAcGFyYW0gaGVscGVkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGJlZ2FuIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gY2xvc2VkQXQgLSBUaGUgZGF0ZSBzdHJpbmcgZm9yIHRoZSB0aW1lIHRoYXQgdGhlIFRBIGZpbmlzaGVkIGhlbHBpbmcgdGhlIFN0dWRlbnQuXG4gKiBAcGFyYW0gcXVlc3Rpb25UeXBlIC0gVGhlIHF1ZXN0aW9uIHR5cGUgaGVscHMgZGlzdGluZ3Vpc2ggcXVlc3Rpb24gZm9yIFRBJ3MgYW5kIGRhdGEgaW5zaWdodHMuXG4gKiBAcGFyYW0gc3RhdHVzIC0gVGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBxdWVzdGlvbiBpbiB0aGUgcXVldWUuXG4gKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGlzIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiBvZiB0aGUgcGFydGljdWxhciBzdHVkZW50LCB0byBoZWxwIFRBJ3MgZmluZCB0aGVtXG4gKiBAcGFyYW0gaXNPbmxpbmUgLSBXZXRoZXIgb3Igbm90IHRoZSBxdWVzdGlvbiB3aWxsIGhlbHBlZCBvbmxpbmUgb3IgaW4tcGVyc29uXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbiB7XG4gIGlkITogbnVtYmVyO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBjcmVhdG9yITogVXNlclBhcnRpYWw7XG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIHRhSGVscGVkPzogVXNlclBhcnRpYWw7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY3JlYXRlZEF0ITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBoZWxwZWRBdD86IERhdGU7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgY2xvc2VkQXQ/OiBEYXRlO1xuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG4gIHN0YXR1cyE6IFF1ZXN0aW9uU3RhdHVzO1xuICBsb2NhdGlvbj86IHN0cmluZztcbiAgaXNPbmxpbmU/OiBib29sZWFuO1xufVxuXG4vLyBRdWVzdGlvbiBUeXBlc1xuZXhwb3J0IGVudW0gUXVlc3Rpb25UeXBlIHtcbiAgQ29uY2VwdCA9IFwiQ29uY2VwdFwiLFxuICBDbGFyaWZpY2F0aW9uID0gXCJDbGFyaWZpY2F0aW9uXCIsXG4gIFRlc3RpbmcgPSBcIlRlc3RpbmdcIixcbiAgQnVnID0gXCJCdWdcIixcbiAgU2V0dXAgPSBcIlNldHVwXCIsXG4gIE90aGVyID0gXCJPdGhlclwiLFxufVxuXG5leHBvcnQgZW51bSBPcGVuUXVlc3Rpb25TdGF0dXMge1xuICBEcmFmdGluZyA9IFwiRHJhZnRpbmdcIixcbiAgUXVldWVkID0gXCJRdWV1ZWRcIixcbiAgSGVscGluZyA9IFwiSGVscGluZ1wiLFxuICBDYW50RmluZCA9IFwiQ2FudEZpbmRcIixcbiAgVEFEZWxldGVkID0gXCJUQURlbGV0ZWRcIixcbn1cblxuZXhwb3J0IGVudW0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMge1xuICBSZXNvbHZlZCA9IFwiUmVzb2x2ZWRcIixcbiAgRGVmZXJyZWQgPSBcIkRlZmVycmVkXCIsXG4gIENvbmZpcm1lZERlbGV0ZWQgPSBcIkNvbmZpcm1lZERlbGV0ZWRcIixcbiAgU3RhbGUgPSBcIlN0YWxlXCIsXG59XG5cbi8vIFRpY2tldCBTdGF0dXMgLSBSZXByZXNlbnRzIGEgZ2l2ZW4gc3RhdHVzIG9mIGFzIHN0dWRlbnQncyB0aWNrZXRcbmV4cG9ydCB0eXBlIFF1ZXN0aW9uU3RhdHVzID0ga2V5b2YgdHlwZW9mIFF1ZXN0aW9uU3RhdHVzS2V5cztcbi8vIGFuIEVudW0tbGlrZSBjb25zdGFudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgc3RhdHVzZXMgZm9yIGNvbnZlbmllbmNlLlxuZXhwb3J0IGNvbnN0IFF1ZXN0aW9uU3RhdHVzS2V5cyA9IHtcbiAgLi4uT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAuLi5DbG9zZWRRdWVzdGlvblN0YXR1cyxcbn07XG5cbi8qKlxuICogQSBTZW1lc3RlciBvYmplY3QsIHJlcHJlc2VudGluZyBhIHNjaGVkdWxlIHNlbWVzdGVyIHRlcm0gZm9yIHRoZSBwdXJwb3NlcyBvZiBhIGNvdXJzZS5cbiAqIEBwYXJhbSBzZWFzb24gLSBUaGUgc2Vhc29uIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKiBAcGFyYW0geWVhciAtIFRoZSB5ZWFyIG9mIHRoaXMgc2VtZXN0ZXIuXG4gKi9cbmludGVyZmFjZSBTZW1lc3RlciB7XG4gIHNlYXNvbjogU2Vhc29uO1xuICB5ZWFyOiBudW1iZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbmUgb2YgdGhlIHNlYXNvbnMgaW4gd2hpY2ggYSBjb3Vyc2UgY2FuIHRha2UgcGxhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIFNlYXNvbiA9IFwiRmFsbFwiIHwgXCJTcHJpbmdcIiB8IFwiU3VtbWVyIDFcIiB8IFwiU3VtbWVyIDJcIjtcblxuZXhwb3J0IHR5cGUgRGVza3RvcE5vdGlmQm9keSA9IHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgZXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIGtleXM6IHtcbiAgICBwMjU2ZGg6IHN0cmluZztcbiAgICBhdXRoOiBzdHJpbmc7XG4gIH07XG4gIG5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQaG9uZU5vdGlmQm9keSA9IHtcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT0gQVBJIFJvdXRlIFR5cGVzID09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT24gYmFja2VuZCwgdmFsaWRhdGVkIHdpdGggaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20vdGVjaG5pcXVlcy92YWxpZGF0aW9uXG4vLyBBUEkgcm91dGUgUGFyYW1zIGFuZCBSZXNwb25zZXNcblxuLy8gT2ZmaWNlIEhvdXJzIFJlc3BvbnNlIFR5cGVzXG5leHBvcnQgY2xhc3MgR2V0UHJvZmlsZVJlc3BvbnNlIGV4dGVuZHMgVXNlciB7fVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5RGF0YVBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIGVtYWlsITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIGZpcnN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgbGFzdF9uYW1lITogc3RyaW5nO1xuXG4gIEBJc0ludCgpXG4gIGNhbXB1cyE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc1N0cmluZygpXG4gIHBob3RvX3VybCE6IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RlZmluZWQoKSAvLyBUT0RPOiB1c2UgVmFsaWRhdGVOZXN0ZWQgaW5zdGVhZCwgZm9yIHNvbWUgcmVhc29uIGl0J3MgY3J1bmtlZFxuICBjb3Vyc2VzITogS2hvdXJ5U3R1ZGVudENvdXJzZVtdO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIHRhX2NvdXJzZXMhOiBLaG91cnlUQUNvdXJzZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5U3R1ZGVudENvdXJzZSB7XG4gIEBJc0ludCgpXG4gIGNybiE6IG51bWJlcjtcblxuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzQm9vbGVhbigpXG4gIGFjY2VsZXJhdGVkITogYm9vbGVhbjtcblxuICBASXNJbnQoKVxuICBzZWN0aW9uITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIHNlbWVzdGVyITogc3RyaW5nO1xuXG4gIEBJc1N0cmluZygpXG4gIHRpdGxlITogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgS2hvdXJ5VEFDb3Vyc2Uge1xuICBASXNTdHJpbmcoKVxuICBjb3Vyc2UhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2hvdXJ5UmVkaXJlY3RSZXNwb25zZSB7XG4gIHJlZGlyZWN0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9maWxlUGFyYW1zIHtcbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ/OiBib29sZWFuO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIHBob25lTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQFZhbGlkYXRlSWYoKG8pID0+IG8ucGhvbmVOb3RpZnNFbmFibGVkKVxuICBASXNTdHJpbmcoKVxuICBASXNOb3RFbXB0eSgpXG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUmVzcG9uc2Uge1xuICBpZCE6IG51bWJlcjtcbiAgbmFtZSE6IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBPZmZpY2VIb3VyUGFydGlhbClcbiAgb2ZmaWNlSG91cnMhOiBBcnJheTxPZmZpY2VIb3VyUGFydGlhbD47XG5cbiAgQFR5cGUoKCkgPT4gUXVldWVQYXJ0aWFsKVxuICBxdWV1ZXMhOiBRdWV1ZVBhcnRpYWxbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXVlUmVzcG9uc2UgZXh0ZW5kcyBRdWV1ZVBhcnRpYWwge31cblxuZXhwb3J0IGNsYXNzIEdldENvdXJzZVF1ZXVlc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVldWVQYXJ0aWFsPiB7fVxuXG5leHBvcnQgY2xhc3MgTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlIGV4dGVuZHMgQXJyYXk8UXVlc3Rpb24+IHt9XG5cbmV4cG9ydCBjbGFzcyBHZXRRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgdGV4dCE6IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgcXVldWVJZCE6IG51bWJlcjtcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgZm9yY2UhOiBib29sZWFuO1xufVxuZXhwb3J0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgQElzRW51bShRdWVzdGlvblR5cGUpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVlc3Rpb25UeXBlPzogUXVlc3Rpb25UeXBlO1xuXG4gIEBJc0ludCgpXG4gIEBJc09wdGlvbmFsKClcbiAgcXVldWVJZD86IG51bWJlcjtcblxuICBASXNFbnVtKFF1ZXN0aW9uU3RhdHVzS2V5cylcbiAgQElzT3B0aW9uYWwoKVxuICBzdGF0dXM/OiBRdWVzdGlvblN0YXR1cztcblxuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBpc09ubGluZT86IGJvb2xlYW47XG5cbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBsb2NhdGlvbj86IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblJlc3BvbnNlIGV4dGVuZHMgUXVlc3Rpb24ge31cblxuZXhwb3J0IHR5cGUgVEFVcGRhdGVTdGF0dXNSZXNwb25zZSA9IFF1ZXVlUGFydGlhbDtcbmV4cG9ydCB0eXBlIFF1ZXVlTm90ZVBheWxvYWRUeXBlID0ge1xuICBub3Rlczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXVlUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgQElzT3B0aW9uYWwoKVxuICBub3Rlcz86IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWxsb3dRdWVzdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU1NFUXVldWVSZXNwb25zZSB7XG4gIHF1ZXVlPzogR2V0UXVldWVSZXNwb25zZTtcbiAgcXVlc3Rpb25zPzogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0JvZHkge1xuICBUb0NvdW50cnk6IHN0cmluZztcbiAgVG9TdGF0ZTogc3RyaW5nO1xuICBTbXNNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIE51bU1lZGlhOiBzdHJpbmc7XG4gIFRvQ2l0eTogc3RyaW5nO1xuICBGcm9tWmlwOiBzdHJpbmc7XG4gIFNtc1NpZDogc3RyaW5nO1xuICBGcm9tU3RhdGU6IHN0cmluZztcbiAgU21zU3RhdHVzOiBzdHJpbmc7XG4gIEZyb21DaXR5OiBzdHJpbmc7XG4gIEJvZHk6IHN0cmluZztcbiAgRnJvbUNvdW50cnk6IHN0cmluZztcbiAgVG86IHN0cmluZztcbiAgVG9aaXA6IHN0cmluZztcbiAgTnVtU2VnbWVudHM6IHN0cmluZztcbiAgTWVzc2FnZVNpZDogc3RyaW5nO1xuICBBY2NvdW50U2lkOiBzdHJpbmc7XG4gIEZyb206IHN0cmluZztcbiAgQXBpVmVyc2lvbjogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdHJhbnNmb3JtZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RBdXRoR3VhcmQgZXh0ZW5kcyBBdXRoR3VhcmQoJ2p3dCcpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3Bhc3Nwb3J0XCIpOyIsImltcG9ydCB7IFNldE1ldGFkYXRhLCBDdXN0b21EZWNvcmF0b3IgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBSb2xlcyA9ICguLi5yb2xlczogc3RyaW5nW10pOiBDdXN0b21EZWNvcmF0b3I8c3RyaW5nPiA9PlxuICBTZXRNZXRhZGF0YSgncm9sZXMnLCByb2xlcyk7XG4iLCJpbXBvcnQgeyBjcmVhdGVQYXJhbURlY29yYXRvciwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlciA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yPHN0cmluZ1tdPihcbiAgYXN5bmMgKHJlbGF0aW9uczogc3RyaW5nW10sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7IHJlbGF0aW9ucyB9KTtcbiAgfSxcbik7XG5cbmV4cG9ydCBjb25zdCBVc2VySWQgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIHJldHVybiBOdW1iZXIocmVxdWVzdC51c2VyLnVzZXJJZCk7XG4gIH0sXG4pO1xuIiwiaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBNYW55VG9NYW55LFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIE9uZVRvT25lLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcbmltcG9ydCB7IFBob25lTm90aWZNb2RlbCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3VzZXItY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvdG9VUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS51c2VyKVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmc0VuYWJsZWQ6IGJvb2xlYW47IC8vIERvZXMgdXNlciB3YW50IG5vdGlmaWNhdGlvbnMgc2VudCB0byB0aGVpciBkZXNrdG9wcz9cblxuICBAQ29sdW1uKHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9KVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIHBob25lP1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IERlc2t0b3BOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmTW9kZWxbXTtcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFBob25lTm90aWZNb2RlbCwgKG5vdGlmKSA9PiBub3RpZi51c2VyKVxuICBARXhjbHVkZSgpXG4gIHBob25lTm90aWY6IFBob25lTm90aWZNb2RlbDtcblxuICBARXhjbHVkZSgpXG4gIEBNYW55VG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocXVldWUpID0+IHF1ZXVlLnN0YWZmTGlzdClcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBDcmVhdGVEYXRlQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdkZXNrdG9wX25vdGlmX21vZGVsJylcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGV4cGlyYXRpb25UaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwMjU2ZGg6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgYXV0aDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuZGVza3RvcE5vdGlmcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgdHlwZTogJ3RpbWVzdGFtcCcgfSlcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAndGV4dCcsIG51bGxhYmxlOiB0cnVlIH0pXG4gIG5hbWU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBPbmVUb09uZSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgncGhvbmVfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFBob25lTm90aWZNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgQE9uZVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLnBob25lTm90aWYpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgdmVyaWZpZWQ6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTGVzc1RoYW5PckVxdWFsLFxuICBNYW55VG9NYW55LFxuICBNYW55VG9PbmUsXG4gIE1vcmVUaGFuT3JFcXVhbCxcbiAgT25lVG9NYW55LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuXG5pbnRlcmZhY2UgVGltZUludGVydmFsIHtcbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xufVxuXG5ARW50aXR5KCdxdWV1ZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVldWVNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5xdWV1ZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHJvb206IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWVzdGlvbk1vZGVsLCAocW0pID0+IHFtLnF1ZXVlKVxuICBARXhjbHVkZSgpXG4gIHF1ZXN0aW9uczogUXVlc3Rpb25Nb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIG5vdGVzOiBzdHJpbmc7XG5cbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucXVldWVzKVxuICBASm9pblRhYmxlKClcbiAgc3RhZmZMaXN0OiBVc2VyTW9kZWxbXTtcblxuICBAQ29sdW1uKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW47XG5cbiAgQEV4Y2x1ZGUoKVxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBPZmZpY2VIb3VyTW9kZWwsIChvaCkgPT4gb2gucXVldWUpXG4gIEBKb2luVGFibGUoKVxuICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW107XG5cbiAgc3RhcnRUaW1lOiBEYXRlO1xuICBlbmRUaW1lOiBEYXRlO1xuXG4gIGlzT3BlbjogYm9vbGVhbjtcblxuICBhc3luYyBjaGVja0lzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zdGFmZkxpc3QgJiYgdGhpcy5zdGFmZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgTVNfSU5fTUlOVVRFID0gNjAwMDA7XG4gICAgY29uc3Qgb2hzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IG9wZW4gPSAhIW9ocy5maW5kKFxuICAgICAgKGUpID0+XG4gICAgICAgIGUuc3RhcnRUaW1lLmdldFRpbWUoKSAtIDEwICogTVNfSU5fTUlOVVRFIDwgbm93LmdldFRpbWUoKSAmJlxuICAgICAgICBlLmVuZFRpbWUuZ2V0VGltZSgpICsgMSAqIE1TX0lOX01JTlVURSA+IG5vdy5nZXRUaW1lKCksXG4gICAgKTtcbiAgICB0aGlzLmlzT3BlbiA9IG9wZW47XG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBxdWV1ZVNpemU6IG51bWJlcjtcblxuICBhc3luYyBhZGRRdWV1ZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5xdWV1ZVNpemUgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKHRoaXMuaWQpXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLm9wZW5TdGF0dXMpJywge1xuICAgICAgICBvcGVuU3RhdHVzOiBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLCBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkXSxcbiAgICAgIH0pXG4gICAgICAuZ2V0Q291bnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRRdWV1ZVRpbWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGF3YWl0IHRoaXMuZ2V0T2ZmaWNlSG91cnMoKTtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWxzID0gdGhpcy5nZW5lcmF0ZU1lcmdlZFRpbWVJbnRlcnZhbHMob2ZmaWNlSG91cnMpO1xuICAgIGNvbnN0IGN1cnJUaW1lID0gdGltZUludGVydmFscy5maW5kKChncm91cCkgPT4ge1xuICAgICAgLy8gRmluZCBhIHRpbWUgaW50ZXJ2YWwgd2l0aGluIDE1IG1pbnV0ZXMgb2YgYm91bmRzIHRvIGFjY291bnQgZm9yIFRBIGVkZ2UgY2FzZXNcbiAgICAgIGNvbnN0IGxvd2VyQm91bmQgPSBncm91cC5zdGFydFRpbWUuZ2V0VGltZSgpIC0gMTUgKiA2MCAqIDEwMDA7XG4gICAgICBjb25zdCB1cHBlckJvdW5kID0gZ3JvdXAuZW5kVGltZS5nZXRUaW1lKCkgKyAxNSAqIDYwICogMTAwMDtcbiAgICAgIHJldHVybiBsb3dlckJvdW5kIDw9IG5vdy5nZXRUaW1lKCkgJiYgdXBwZXJCb3VuZCA+PSBub3cuZ2V0VGltZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGN1cnJUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IGN1cnJUaW1lLnN0YXJ0VGltZTtcbiAgICAgIHRoaXMuZW5kVGltZSA9IGN1cnJUaW1lLmVuZFRpbWU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IE9mZmljZSBob3VycyBpbiBhIDcyaHIgd2luZG93IGFyb3VuZCBub3csIHNuYXBwZWQgdG8gbWlkbmlnaHRcbiAgcHJpdmF0ZSBhc3luYyBnZXRPZmZpY2VIb3VycygpOiBQcm9taXNlPE9mZmljZUhvdXJNb2RlbFtdPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IGxvd2VyQm91bmQgPSBuZXcgRGF0ZShub3cpO1xuICAgIGxvd2VyQm91bmQuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgLSAyNCk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIGNvbnN0IHVwcGVyQm91bmQgPSBuZXcgRGF0ZShub3cpO1xuICAgIHVwcGVyQm91bmQuc2V0VVRDSG91cnMobm93LmdldFVUQ0hvdXJzKCkgKyAyNCk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIHJldHVybiBhd2FpdCBPZmZpY2VIb3VyTW9kZWwuZmluZCh7XG4gICAgICB3aGVyZTogW1xuICAgICAgICB7XG4gICAgICAgICAgcXVldWVJZDogdGhpcy5pZCxcbiAgICAgICAgICBzdGFydFRpbWU6IE1vcmVUaGFuT3JFcXVhbChsb3dlckJvdW5kKSxcbiAgICAgICAgICBlbmRUaW1lOiBMZXNzVGhhbk9yRXF1YWwodXBwZXJCb3VuZCksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgb3JkZXI6IHtcbiAgICAgICAgc3RhcnRUaW1lOiAnQVNDJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhcbiAgICBvZmZpY2VIb3VyczogT2ZmaWNlSG91ck1vZGVsW10sXG4gICk6IFRpbWVJbnRlcnZhbFtdIHtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWxzOiBUaW1lSW50ZXJ2YWxbXSA9IFtdO1xuICAgIG9mZmljZUhvdXJzLmZvckVhY2goKG9mZmljZUhvdXIpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGltZUludGVydmFscy5sZW5ndGggPT0gMCB8fFxuICAgICAgICBvZmZpY2VIb3VyLnN0YXJ0VGltZSA+IHRpbWVJbnRlcnZhbHNbdGltZUludGVydmFscy5sZW5ndGggLSAxXS5lbmRUaW1lXG4gICAgICApIHtcbiAgICAgICAgdGltZUludGVydmFscy5wdXNoKHtcbiAgICAgICAgICBzdGFydFRpbWU6IG9mZmljZUhvdXIuc3RhcnRUaW1lLFxuICAgICAgICAgIGVuZFRpbWU6IG9mZmljZUhvdXIuZW5kVGltZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldkdyb3VwID0gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdO1xuICAgICAgcHJldkdyb3VwLmVuZFRpbWUgPVxuICAgICAgICBvZmZpY2VIb3VyLmVuZFRpbWUgPiBwcmV2R3JvdXAuZW5kVGltZVxuICAgICAgICAgID8gb2ZmaWNlSG91ci5lbmRUaW1lXG4gICAgICAgICAgOiBwcmV2R3JvdXAuZW5kVGltZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aW1lSW50ZXJ2YWxzO1xuICB9XG5cbiAgLy8gVE9ETzogZXZlbnR1YWxseSBmaWd1cmUgb3V0IGhvdyBzdGFmZiBnZXQgc2VudCB0byBGRSBhcyB3ZWxsXG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgT25lVG9NYW55LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIGluIHRoZSBjb250ZXh0IG9mIG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqIEBwYXJhbSBzZW1lc3RlciAtIFRoZSBzZW1lc3RlciBvZiB0aGlzIGNvdXJzZS5cbiAqL1xuLyppbnRlcmZhY2UgQ291cnNlIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBzZW1lc3RlcjogU2VtZXN0ZXI7XG4gICAgdXNlcnM6IFVzZXJDb3Vyc2VbXVxufSovXG5cbkBFbnRpdHkoJ2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5jb3Vyc2UpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBRdWV1ZU1vZGVsLCAocSkgPT4gcS5jb3Vyc2UpXG4gIHF1ZXVlczogUXVldWVNb2RlbFtdO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBpY2FsVVJMOiBzdHJpbmc7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gVXNlckNvdXJzZU1vZGVsLCAodWNtKSA9PiB1Y20uY291cnNlKVxuICBARXhjbHVkZSgpXG4gIHVzZXJDb3Vyc2VzOiBVc2VyQ291cnNlTW9kZWw7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gU2VtZXN0ZXJNb2RlbCwgKHNlbWVzdGVyKSA9PiBzZW1lc3Rlci5jb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdzZW1lc3RlcklkJyB9KVxuICBARXhjbHVkZSgpXG4gIHNlbWVzdGVyOiBTZW1lc3Rlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIC8vIFRPRE86IGNhbiB3ZSBtYWtlIHRoZXNlIG5vdCBudWxsYWJsZSBhbmQgd29yayB3aXRoIFR5cGVPUk1cbiAgc2VtZXN0ZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oJ2Jvb2xlYW4nLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGVuYWJsZWQ6IGJvb2xlYW47IC8vIFNldCB0byB0cnVlIGlmIHRoZSBnaXZlbiB0aGUgY291cnNlIGlzIHVzaW5nIG91ciBhcHBcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlLCBFeHBvc2UgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgnb2ZmaWNlX2hvdXInKVxuZXhwb3J0IGNsYXNzIE9mZmljZUhvdXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5vZmZpY2VIb3VycylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUub2ZmaWNlSG91cnMsIHtcbiAgICBlYWdlcjogdHJ1ZSxcbiAgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHN0YXJ0VGltZTogRGF0ZTtcblxuICBAQ29sdW1uKClcbiAgZW5kVGltZTogRGF0ZTtcblxuICBARXhwb3NlKClcbiAgZ2V0IHJvb20oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZT8ucm9vbTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCd1c2VyX2NvdXJzZV9tb2RlbCcpXG5leHBvcnQgY2xhc3MgVXNlckNvdXJzZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwsICh1c2VyKSA9PiB1c2VyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3VzZXJJZCcgfSlcbiAgdXNlcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICB1c2VySWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnVzZXJDb3Vyc2VzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY291cnNlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHsgdHlwZTogJ2VudW0nLCBlbnVtOiBSb2xlLCBkZWZhdWx0OiBSb2xlLlNUVURFTlQgfSlcbiAgcm9sZTogUm9sZTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgU2Vhc29uIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuXG5ARW50aXR5KCdzZW1lc3Rlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHNlYXNvbjogU2Vhc29uO1xuXG4gIEBDb2x1bW4oKVxuICB5ZWFyOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gQ291cnNlTW9kZWwsIChjb3Vyc2UpID0+IGNvdXJzZS5zZW1lc3RlcilcbiAgY291cnNlczogQ291cnNlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7IE9wZW5RdWVzdGlvblN0YXR1cywgUXVlc3Rpb25TdGF0dXMsIFF1ZXN0aW9uVHlwZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBTZWxlY3RRdWVyeUJ1aWxkZXIsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcblxuQEVudGl0eSgncXVlc3Rpb25fbW9kZWwnKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLnF1ZXN0aW9ucylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAncXVldWVJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZTogUXVldWVNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICBxdWV1ZUlkOiBudW1iZXI7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHRleHQ6IHN0cmluZztcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBVc2VyTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NyZWF0b3JJZCcgfSlcbiAgY3JlYXRvcjogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNyZWF0b3JJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndGFIZWxwZWRJZCcgfSlcbiAgdGFIZWxwZWQ6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgQEV4Y2x1ZGUoKVxuICB0YUhlbHBlZElkOiBudW1iZXI7XG5cbiAgQENvbHVtbigpXG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgaGVscGVkQXQ6IERhdGU7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNsb3NlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oJ3RleHQnLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHF1ZXN0aW9uVHlwZTogUXVlc3Rpb25UeXBlO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBsb2NhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBpc09ubGluZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2NvcGVzXG4gICAqL1xuICBzdGF0aWMgb3BlbkluUXVldWUocXVldWVJZDogbnVtYmVyKTogU2VsZWN0UXVlcnlCdWlsZGVyPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVRdWVyeUJ1aWxkZXIoJ3F1ZXN0aW9uJylcbiAgICAgIC53aGVyZSgncXVlc3Rpb24ucXVldWVJZCA9IDpxdWV1ZUlkJywgeyBxdWV1ZUlkIH0pXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1c2VzKScsIHtcbiAgICAgICAgc3RhdHVzZXM6IE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICAgIH0pXG4gICAgICAub3JkZXJCeSgncXVlc3Rpb24uY3JlYXRlZEF0JywgJ0FTQycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENyb24sIENyb25FeHByZXNzaW9uIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS5lbnRpdHknO1xuXG4vKipcbiAqIENsZWFuIHRoZSBxdWV1ZSBhbmQgbWFyayBzdGFsZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVldWVDbGVhblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgQENyb24oQ3JvbkV4cHJlc3Npb24uRVZFUllfREFZX0FUX01JRE5JR0hUKVxuICBwcml2YXRlIGFzeW5jIGNsZWFuQWxsUXVldWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlc1dpdGhPcGVuUXVlc3Rpb25zOiBRdWV1ZU1vZGVsW10gPSBhd2FpdCBRdWV1ZU1vZGVsLmdldFJlcG9zaXRvcnkoKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVldWUnKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWV1ZV9tb2RlbC5xdWVzdGlvbnMnLCAncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5zdGF0dXMgSU4gKDouLi5zdGF0dXMpJywge1xuICAgICAgICBzdGF0dXM6IE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSxcbiAgICAgIH0pXG4gICAgICAuZ2V0TWFueSgpO1xuXG4gICAgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnMuZm9yRWFjaCgocXVldWUpID0+IHtcbiAgICAgIHRoaXMuY2xlYW5RdWV1ZShxdWV1ZS5pZCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG5cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgcXVldWUubm90ZXMgPSAnJztcbiAgICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAgIGF3YWl0IHRoaXMudW5zYWZlQ2xlYW4ocXVldWUuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShxdWV1ZUlkKS5nZXRNYW55KCk7XG4gICAgY29uc3Qgb3BlblF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICAocSkgPT4gcS5zdGF0dXMgaW4gT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAgICk7XG5cbiAgICBvcGVuUXVlc3Rpb25zLmZvckVhY2goKHE6IFF1ZXN0aW9uTW9kZWwpID0+IHtcbiAgICAgIHEuc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGU7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUob3BlblF1ZXN0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXJzZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIENhbkFjdGl2YXRlLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZsZWN0b3IgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZXNHdWFyZCB7XG4gIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuO1xuXG4gIHNldHVwRGF0YShyZXF1ZXN0OiBhbnkpOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZsZWN0b3I6IFJlZmxlY3Rvcikge31cblxuICBhc3luYyBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLnJlZmxlY3Rvci5nZXQ8c3RyaW5nW10+KCdyb2xlcycsIGNvbnRleHQuZ2V0SGFuZGxlcigpKTtcbiAgICBpZiAoIXJvbGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IGNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHsgY291cnNlSWQsIHVzZXIgfSA9IGF3YWl0IHRoaXMuc2V0dXBEYXRhKHJlcXVlc3QpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdNdXN0IGJlIGxvZ2dlZCBpbicpO1xuICAgIH1cblxuICAgIGlmICghY291cnNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignTm8gY291cnNlaWQgZm91bmQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXRjaFJvbGVzKHJvbGVzLCB1c2VyLCBjb3Vyc2VJZCk7XG4gIH1cblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcblxuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgaXNuJ3QgaW4gdGhpcyBjb3Vyc2UsIHdlIHNob3VsZG4ndCBsZWFrIHRoYXQgdGhlIGNvdXJzZSBldmVudCBleGlzdHNcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignbm8gdXNlciBjb3Vyc2UnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1haW5pbmcgPSByb2xlcy5maWx0ZXIoKHJvbGUpID0+IHtcbiAgICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGUudG9TdHJpbmcoKSA9PT0gcm9sZTtcbiAgICB9KTtcblxuICAgIGlmIChyZW1haW5pbmcubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIGBZb3UgbXVzdCBoYXZlIG9uZSBvZiByb2xlcyBbJHtyb2xlcy5qb2luKFxuICAgICAgICAgICcsICcsXG4gICAgICAgICl9XSB0byBhY2Nlc3MgdGhpcyBjb3Vyc2VgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtYWluaW5nLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnc3NlL3NzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUm9sZSwgU1NFUXVldWVSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgeyByZXMsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLy8gU2VuZCBldmVudCB3aXRoIG5ldyBxdWVzdGlvbnMsIGJ1dCBubyBtb3JlIHRoYW4gb25jZSBhIHNlY29uZFxuICB1cGRhdGVRdWVzdGlvbnMgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIGlmIChxdWVzdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCAoeyByb2xlLCB1c2VySWQgfSkgPT4gKHtcbiAgICAgICAgcXVlc3Rpb25zOiB0aGlzLnF1ZXVlU2VydmljZS5hbm9ueW1pemVRdWVzdGlvbnMoXG4gICAgICAgICAgcXVlc3Rpb25zLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByb2xlLFxuICAgICAgICApLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlUXVldWUgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCAoKSA9PiAoeyBxdWV1ZSB9KSk7XG4gICAgfVxuICB9KTtcblxuICBwcml2YXRlIHNlbmRUb1Jvb20oXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIGRhdGE6IChtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSkgPT4gU1NFUXVldWVSZXNwb25zZSxcbiAgKSB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnNlbmRFdmVudChpZFRvUm9vbShxdWV1ZUlkKSwgZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlVXBkYXRlKHVwZGF0ZUZ1bmN0aW9uOiAocXVldWVJZDogbnVtYmVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgcmV0dXJuIHRocm90dGxlKFxuICAgICAgYXN5bmMgKHF1ZXVlSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUZ1bmN0aW9uKHF1ZXVlSWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSxcbiAgICAgIDEwMDAsXG4gICAgICB7XG4gICAgICAgIGxlYWRpbmc6IGZhbHNlLFxuICAgICAgICB0cmFpbGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50PFQ+IHtcbiAgbWV0YWRhdGE6IFQ7XG4gIHJlczogUmVzcG9uc2U7XG59XG4vKipcbiAqIFQgaXMgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIGVhY2ggQ2xpZW50XG4gKlxuICogTG93IGxldmVsIGFic3RyYWN0aW9uIGZvciBzZW5kaW5nIFNTRSB0byBcInJvb21zXCIgb2YgY2xpZW50cy5cbiAqIFByb2JhYmx5IGRvbid0IHVzZSB0aGlzIGRpcmVjdGx5LCBhbmQgd3JhcCBpdCBpbiBhIHNlcnZpY2Ugc3BlY2lmaWMgdG8gdGhhdCBldmVudCBzb3VyY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNTRVNlcnZpY2U8VD4ge1xuICBwcml2YXRlIGNsaWVudHM6IFJlY29yZDxhbnksIENsaWVudDxUPltdPiA9IHt9O1xuXG4gIC8qKiBBZGQgYSBjbGllbnQgdG8gYSByb29tICovXG4gIHN1YnNjcmliZUNsaWVudChyb29tOiBzdHJpbmcsIGNsaWVudDogQ2xpZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gS2VlcCB0cmFjayBvZiByZXNwb25zZXMgc28gd2UgY2FuIHNlbmQgc3NlIHRocm91Z2ggdGhlbVxuICAgIGlmICghKHJvb20gaW4gdGhpcy5jbGllbnRzKSkge1xuICAgICAgdGhpcy5jbGllbnRzW3Jvb21dID0gW107XG4gICAgfVxuICAgIGNvbnN0IHJvb21yZWYgPSB0aGlzLmNsaWVudHNbcm9vbV07XG4gICAgcm9vbXJlZi5wdXNoKGNsaWVudCk7XG5cbiAgICAvLyBSZW1vdmUgZGVhZCBjb25uZWN0aW9ucyFcbiAgICBjbGllbnQucmVzLnNvY2tldC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgcm9vbXJlZi5zcGxpY2Uocm9vbXJlZi5pbmRleE9mKGNsaWVudCksIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNlbmQgc29tZSBkYXRhIHRvIGV2ZXJ5b25lIGluIGEgcm9vbSAqL1xuICBzZW5kRXZlbnQ8RD4ocm9vbTogc3RyaW5nLCBwYXlsb2FkOiAobWV0YWRhdGE6IFQpID0+IEQpOiB2b2lkIHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUocGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEdldCBkYXRhIGluIHNlcnZpY2Ugb2YgdGhlIHF1ZXVlIGNvbnRyb2xsZXIgYW5kIFNTRVxuICogV0hZPyBUbyBlbnN1cmUgZGF0YSByZXR1cm5lZCBieSBlbmRwb2ludHMgaXMgKmV4YWN0bHkqIGVxdWFsIHRvIGRhdGEgc2VudCBieSBTU0VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBhc3luYyBnZXRRdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVUaW1lcygpO1xuICAgIGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVTaXplKCk7XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBhc3luYyBnZXRRdWVzdGlvbnMocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICAvLyB0b2RvOiBNYWtlIGEgc3R1ZGVudCBhbmQgYSBUQSB2ZXJzaW9uIG9mIHRoaXMgZnVuY3Rpb24sIGFuZCBzd2l0Y2ggd2hpY2ggb25lIHRvIHVzZSBpbiB0aGUgY29udHJvbGxlclxuICAgIC8vIGZvciBub3csIGp1c3QgcmV0dXJuIHRoZSBzdHVkZW50IHJlc3BvbnNlXG4gICAgY29uc3QgcXVldWVTaXplID0gYXdhaXQgUXVldWVNb2RlbC5jb3VudCh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgIH0pO1xuICAgIC8vIENoZWNrIHRoYXQgdGhlIHF1ZXVlIGV4aXN0c1xuICAgIGlmIChxdWV1ZVNpemUgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShxdWV1ZUlkKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYW5vbnltaXplUXVlc3Rpb25zKFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IExpc3RRdWVzdGlvbnNSZXNwb25zZSB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9ucy5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHsgLi4ucXVlc3Rpb24sIGNyZWF0b3IgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlQ29udHJvbGxlciB9IGZyb20gJy4vcXVldWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICdzc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXVlLnN1YnNjcmliZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWV1ZUNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtcbiAgICBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBRdWV1ZVNlcnZpY2UsXG4gICAgUXVldWVTU0VTZXJ2aWNlLFxuICAgIFF1ZXVlU3Vic2NyaWJlcixcbiAgXSxcbiAgZXhwb3J0czogW1F1ZXVlQ2xlYW5TZXJ2aWNlLCBRdWV1ZVNTRVNlcnZpY2VdLFxuICBpbXBvcnRzOiBbU1NFTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVldWVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFJlcyxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEdldFF1ZXVlUmVzcG9uc2UsXG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgUm9sZSxcbiAgVXBkYXRlUXVldWVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICdwcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3F1ZXVlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVldWVSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWV1ZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxHZXRRdWV1ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICB9XG5cbiAgQEdldCgnOnF1ZXVlSWQvcXVlc3Rpb25zJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXN0aW9ucyhcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuYW5vbnltaXplUXVlc3Rpb25zKHF1ZXN0aW9ucywgdXNlcklkLCByb2xlKTtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXVlKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXVlUGFyYW1zLFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5ub3RlcyA9IGJvZHkubm90ZXM7XG4gICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBib2R5LmFsbG93UXVlc3Rpb25zO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZT8uY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnLi9zc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoeyBwcm92aWRlcnM6IFtTU0VTZXJ2aWNlXSwgZXhwb3J0czogW1NTRVNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgU1NFTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU3Vic2NyaWJlciBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVldWVNb2RlbD4ge1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSkge1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWV1ZU1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXVlTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShldmVudC5lbnRpdHkuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElDYWxDb21tYW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaWNhbDpzY3JhcGUnLFxuICAgIGRlc2NyaWJlOiAnc2NyYXBlIGljYWwgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaWNhbFNlcnZpY2UudXBkYXRlQWxsQ291cnNlcygpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgQ3JlYXRlT2ZmaWNlSG91ciA9IERlZXBQYXJ0aWFsPE9mZmljZUhvdXJNb2RlbD5bXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEljYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIC8vIHR6IHNob3VsZCBub3QgYmUgcHJlY29udmVydGVkIGJ5IGZpbmRPbmVJYW5hXG4gIHByaXZhdGUgZml4VGltZXpvbmUoZGF0ZTogRGF0ZSwgdHo6IHN0cmluZyk6IERhdGUge1xuICAgIGlmICghdHopIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcblxuICAgIGNvbnN0IGV2ZW50b2Zmc2V0ID0gbW9tZW50LnR6LnpvbmUoaWFuYSB8fCB0eikudXRjT2Zmc2V0KGRhdGUuZ2V0VGltZSgpKTtcbiAgICBjb25zdCBzZXJ2ZXJvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgY29uc3QgbW9tZSA9IG1vbWVudChkYXRlKTtcbiAgICBpZiAoaWFuYSkge1xuICAgICAgbW9tZS5zdWJ0cmFjdChzZXJ2ZXJvZmZzZXQgLSBldmVudG9mZnNldCwgJ21pbnV0ZXMnKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbWUudG9EYXRlKCk7XG4gIH1cblxuICBwYXJzZUljYWwoaWNhbERhdGE6IENhbGVuZGFyUmVzcG9uc2UsIGNvdXJzZUlkOiBudW1iZXIpOiBDcmVhdGVPZmZpY2VIb3VyIHtcbiAgICBjb25zdCBpY2FsRGF0YVZhbHVlczogQXJyYXk8Q2FsZW5kYXJDb21wb25lbnQ+ID0gT2JqZWN0LnZhbHVlcyhpY2FsRGF0YSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGljYWxEYXRhVmFsdWVzLmZpbHRlcihcbiAgICAgIChpQ2FsRWxlbWVudCk6IGlDYWxFbGVtZW50IGlzIFZFdmVudCA9PlxuICAgICAgICBpQ2FsRWxlbWVudC50eXBlID09PSAnVkVWRU5UJyAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5zdGFydCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGlDYWxFbGVtZW50LmVuZCAhPT0gdW5kZWZpbmVkLFxuICAgICk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc0V2ZW50UmVnZXggPSAvXFxiXihPSHxIb3VycylcXGIvO1xuXG4gICAgY29uc3QgZmlsdGVyZWRPZmZpY2VIb3VycyA9IG9mZmljZUhvdXJzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBvZmZpY2VIb3Vyc0V2ZW50UmVnZXgudGVzdChldmVudC5zdW1tYXJ5KSxcbiAgICApO1xuXG4gICAgbGV0IHJlc3VsdE9mZmljZUhvdXJzID0gW107XG5cbiAgICBmaWx0ZXJlZE9mZmljZUhvdXJzLmZvckVhY2goKG9oOiBWRXZlbnQpID0+IHtcbiAgICAgIC8vIFRoaXMgb2ZmaWNlIGhvdXIgdGltZXpvbmUuIEFTU1VNSU5HIGV2ZXJ5IGRhdGUgZmllbGQgaGFzIHNhbWUgdGltZXpvbmUgYXMgb2guc3RhcnRcbiAgICAgIGNvbnN0IGV2ZW50VFogPSBvaC5zdGFydC50ejtcbiAgICAgIGNvbnN0IHsgcnJ1bGUgfSA9IG9oIGFzIGFueTtcbiAgICAgIGlmIChycnVsZSkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgICAgICBjb25zdCBkdHN0YXJ0ID0gdGhpcy5maXhUaW1lem9uZShvcHRpb25zLmR0c3RhcnQsIGV2ZW50VFopO1xuICAgICAgICBjb25zdCB1bnRpbCA9IG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhUaW1lem9uZShvcHRpb25zLnVudGlsLCBldmVudFRaKTtcblxuICAgICAgICBsZXQgYnl3ZWVrZGF5ID0gb3B0aW9ucy5ieXdlZWtkYXk7XG4gICAgICAgIGlmIChvcHRpb25zLmJ5aG91clswXSA+PSAwICYmIG9wdGlvbnMuYnlob3VyWzBdIDwgNCkge1xuICAgICAgICAgIGJ5d2Vla2RheSA9IG9wdGlvbnMuYnl3ZWVrZGF5Lm1hcCgoYndkKSA9PiAoYndkICsgMSkgJSA3KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydWxlID0gbmV3IFJSdWxlKHtcbiAgICAgICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICAgICAgd2tzdDogb3B0aW9ucy53a3N0LFxuICAgICAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgICAgIGJ5d2Vla2RheSxcbiAgICAgICAgICBkdHN0YXJ0OiBkdHN0YXJ0LFxuICAgICAgICAgIHVudGlsOiB1bnRpbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRGF0ZXMgdG8gZXhjbHVkZSBmcm9tIHJlY3VycmVuY2UsIHNlcGFyYXRlIGV4ZGF0ZSBJU09TdHJpbmdzIGZvciBmaWx0ZXJpbmdcbiAgICAgICAgY29uc3QgZXhkYXRlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBkYXRlIGluIG9oLmV4ZGF0ZSkge1xuICAgICAgICAgIGNvbnN0IGV4ZGF0ZSA9IHRoaXMuZml4VGltZXpvbmUob2guZXhkYXRlW2RhdGVdLCBldmVudFRaKTtcbiAgICAgICAgICBleGRhdGVzLnB1c2goZXhkYXRlLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG9pbmcgbWF0aCBoZXJlIGJlY2F1c2UgbW9tZW50LmFkZCBjaGFuZ2VzIGJlaGF2aW9yIGJhc2VkIG9uIHNlcnZlciB0aW1lem9uZVxuICAgICAgICBjb25zdCBpbjEwV2Vla3MgPSBuZXcgRGF0ZShcbiAgICAgICAgICBkdHN0YXJ0LmdldFRpbWUoKSArIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICogMTAsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFsbERhdGVzID0gcnVsZVxuICAgICAgICAgIC5hbGwoKGQpID0+ICEhdW50aWwgfHwgZCA8IGluMTBXZWVrcylcbiAgICAgICAgICAuZmlsdGVyKChkYXRlKSA9PiAhZXhkYXRlcy5pbmNsdWRlcyhkYXRlLnRvSVNPU3RyaW5nKCkpKTtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG9oLmVuZC5nZXRUaW1lKCkgLSBvaC5zdGFydC5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkT2ZmaWNlSG91cnMgPSBhbGxEYXRlcy5tYXAoKGRhdGUpID0+ICh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogZGF0ZSxcbiAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGR1cmF0aW9uKSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXN1bHRPZmZpY2VIb3VycyA9IHJlc3VsdE9mZmljZUhvdXJzLmNvbmNhdChnZW5lcmF0ZWRPZmZpY2VIb3Vycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRPZmZpY2VIb3Vycy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogb2guc3VtbWFyeSxcbiAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgcm9vbTogb2gubG9jYXRpb24sXG4gICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLmZpeFRpbWV6b25lKG9oLnN0YXJ0LCBldmVudFRaKSxcbiAgICAgICAgICBlbmRUaW1lOiB0aGlzLmZpeFRpbWV6b25lKG9oLmVuZCwgZXZlbnRUWiksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRPZmZpY2VIb3VycztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBPZmZpY2VIb3VycyBmb3IgYSBnaXZlbiBDb3Vyc2UgYnkgcmVzY3JhcGluZyBpY2FsXG4gICAqIEBwYXJhbSBjb3Vyc2UgdG8gcGFyc2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVDYWxlbmRhckZvckNvdXJzZShjb3Vyc2U6IENvdXJzZU1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgc2NyYXBpbmcgaWNhbCBmb3IgY291cnNlIFwiJHtjb3Vyc2UubmFtZX1cIigke2NvdXJzZS5pZH0gYXQgdXJsOiAke2NvdXJzZS5pY2FsVVJMfS4uLmAsXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWUoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGNvdXJzZUlkOiBjb3Vyc2UuaWQsIHJvb206ICdPbmxpbmUnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHJvb206ICdPbmxpbmUnLFxuICAgICAgICBjb3Vyc2VJZDogY291cnNlLmlkLFxuICAgICAgICBzdGFmZkxpc3Q6IFtdLFxuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogZmFsc2UsXG4gICAgICB9KS5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSB0aGlzLnBhcnNlSWNhbChcbiAgICAgIGF3YWl0IGZyb21VUkwoY291cnNlLmljYWxVUkwpLFxuICAgICAgY291cnNlLmlkLFxuICAgICk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLmRlbGV0ZSh7IGNvdXJzZUlkOiBjb3Vyc2UuaWQgfSk7XG4gICAgYXdhaXQgT2ZmaWNlSG91ck1vZGVsLnNhdmUoXG4gICAgICBvZmZpY2VIb3Vycy5tYXAoKGUpID0+IHtcbiAgICAgICAgZS5xdWV1ZUlkID0gcXVldWUuaWQ7XG4gICAgICAgIHJldHVybiBPZmZpY2VIb3VyTW9kZWwuY3JlYXRlKGUpO1xuICAgICAgfSksXG4gICAgKTtcbiAgICBjb25zb2xlLnRpbWVFbmQoYHNjcmFwZSBjb3Vyc2UgJHtjb3Vyc2UuaWR9YCk7XG4gICAgY29uc29sZS5sb2coJ2RvbmUgc2NyYXBpbmchJyk7XG4gIH1cblxuICBAQ3JvbignNTEgMCAqICogKicpXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVBbGxDb3Vyc2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBjb3Vyc2UgaWNhbHMnKTtcbiAgICBjb25zdCBjb3Vyc2VzID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZCgpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNvdXJzZXMubWFwKChjKSA9PiB0aGlzLnVwZGF0ZUNhbGVuZGFyRm9yQ291cnNlKGMpKSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtaWNhbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5kb3dzLWlhbmEvZGlzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQtdGltZXpvbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJydWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZlN1YnNjcmliZXIgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYtc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtOb3RpZmljYXRpb25Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgRGVza3RvcE5vdGlmU3Vic2NyaWJlciwgVHdpbGlvU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOb3RpZmljYXRpb25TZXJ2aWNlLCBUd2lsaW9TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBFdmVudFN1YnNjcmliZXIsXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIENvbm5lY3Rpb24sXG4gIEluc2VydEV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIERlc2t0b3BOb3RpZk1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJJbnNlcnQoZXZlbnQ6IEluc2VydEV2ZW50PERlc2t0b3BOb3RpZk1vZGVsPikge1xuICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeURlc2t0b3AoXG4gICAgICBldmVudC5lbnRpdHksXG4gICAgICBcIllvdSd2ZSBzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIGZvciBkZXNrdG9wIG5vdGlmaWNhdGlvbnMhXCIsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFkUmVxdWVzdEV4Y2VwdGlvbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBEZWVwUGFydGlhbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0ICogYXMgd2ViUHVzaCBmcm9tICd3ZWItcHVzaCc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IERlc2t0b3BOb3RpZk1vZGVsIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBUd2lsaW9TZXJ2aWNlIH0gZnJvbSAnLi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5leHBvcnQgY29uc3QgTm90aWZNc2dzID0ge1xuICBwaG9uZToge1xuICAgIFdST05HX01FU1NBR0U6XG4gICAgICAnUGxlYXNlIHJlc3BvbmQgd2l0aCBlaXRoZXIgWUVTIG9yIE5PLiBUZXh0IFNUT1AgYXQgYW55IHRpbWUgdG8gc3RvcCByZWNlaXZpbmcgdGV4dCBtZXNzYWdlcycsXG4gICAgQ09VTERfTk9UX0ZJTkRfTlVNQkVSOlxuICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFuIE9mZmljZSBIb3VycyBhY2NvdW50IHdpdGggeW91ciBwaG9uZSBudW1iZXIuJyxcbiAgICBVTlJFR0lTVEVSOlxuICAgICAgXCJZb3UndmUgdW5yZWdpc3RlcmVkIGZyb20gdGV4dCBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBGZWVsIGZyZWUgdG8gcmUtcmVnaXN0ZXIgYW55IHRpbWUgdGhyb3VnaCB0aGUgd2Vic2l0ZVwiLFxuICAgIERVUExJQ0FURTpcbiAgICAgIFwiWW91J3ZlIGFscmVhZHkgYmVlbiB2ZXJpZmllZCB0byByZWNlaXZlIHRleHQgbm90aWZpY2F0aW9ucyBmcm9tIEtob3VyeSBPZmZpY2UgSG91cnMhXCIsXG4gICAgT0s6XG4gICAgICAnVGhhbmsgeW91IGZvciB2ZXJpZnlpbmcgeW91ciBudW1iZXIgd2l0aCBLaG91cnkgT2ZmaWNlIEhvdXJzISBZb3UgYXJlIG5vdyBzaWduZWQgdXAgZm9yIHRleHQgbm90aWZpY2F0aW9ucyEnLFxuICB9LFxuICBxdWV1ZToge1xuICAgIEFMRVJUX0JVVFRPTjpcbiAgICAgIFwiVGhlIFRBIGNvdWxkJ3QgcmVhY2ggeW91LCBwbGVhc2UgaGF2ZSBNaWNyb3NvZnQgVGVhbXMgb3BlbiBhbmQgY29uZmlybSB5b3UgYXJlIGJhY2shXCIsXG4gICAgVEhJUkRfUExBQ0U6IGBZb3UncmUgM3JkIGluIHRoZSBxdWV1ZS4gQmUgcmVhZHkgZm9yIGEgVEEgdG8gY2FsbCB5b3Ugc29vbiFgLFxuICAgIFRBX0hJVF9IRUxQRUQ6ICh0YU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgICAgYCR7dGFOYW1lfSBpcyBjb21pbmcgdG8gaGVscCB5b3UhYCxcbiAgICBSRU1PVkVEOiBgWW91J3ZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBxdWV1ZS4gUGxlYXNlIHJldHVybiB0byB0aGUgYXBwIGZvciBtb3JlIGluZm9ybWF0aW9uLmAsXG4gIH0sXG4gIHRhOiB7XG4gICAgU1RVREVOVF9KT0lORURfRU1QVFlfUVVFVUU6XG4gICAgICAnQSBzdHVkZW50IGhhcyBqb2luZWQgeW91ciAocHJldmlvdXNseSBlbXB0eSkgcXVldWUhJyxcbiAgfSxcbn07XG5cbi8vVE9ETyB0ZXN0IHRoaXMgc2VydmljZSBvbWdcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgZGVza3RvcFB1YmxpY0tleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHR3aWxpb1NlcnZpY2U6IFR3aWxpb1NlcnZpY2UsXG4gICkge1xuICAgIHdlYlB1c2guc2V0VmFwaWREZXRhaWxzKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRU1BSUwnKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFJJVkFURUtFWScpLFxuICAgICk7XG4gICAgdGhpcy5kZXNrdG9wUHVibGljS2V5ID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnUFVCTElDS0VZJyk7XG4gIH1cblxuICBhc3luYyByZWdpc3RlckRlc2t0b3AoXG4gICAgaW5mbzogRGVlcFBhcnRpYWw8RGVza3RvcE5vdGlmTW9kZWw+LFxuICApOiBQcm9taXNlPERlc2t0b3BOb3RpZk1vZGVsPiB7XG4gICAgLy8gY3JlYXRlIGlmIG5vdCBleGlzdFxuICAgIGxldCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkOiBpbmZvLnVzZXJJZCwgZW5kcG9pbnQ6IGluZm8uZW5kcG9pbnQgfSxcbiAgICB9KTtcbiAgICBpZiAoIWRuKSB7XG4gICAgICBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmNyZWF0ZShpbmZvKS5zYXZlKCk7XG4gICAgICBhd2FpdCBkbi5yZWxvYWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRuO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCB1c2VyOiBVc2VyTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBmdWxsTnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwaG9uZU51bWJlcik7XG4gICAgaWYgKCFmdWxsTnVtYmVyKSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbigncGhvbmUgbnVtYmVyIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBsZXQgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgIH0pO1xuXG4gICAgaWYgKHBob25lTm90aWZNb2RlbCkge1xuICAgICAgLy8gUGhvbmUgbnVtYmVyIGhhcyBub3QgY2hhbmdlZFxuICAgICAgaWYgKHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9PT0gZnVsbE51bWJlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGp1c3QgY2hhbmdlIGl0XG4gICAgICAgIHBob25lTm90aWZNb2RlbC5waG9uZU51bWJlciA9IGZ1bGxOdW1iZXI7XG4gICAgICAgIHBob25lTm90aWZNb2RlbC52ZXJpZmllZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBwaG9uZU5vdGlmTW9kZWwuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmTW9kZWwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IGZ1bGxOdW1iZXIsXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuXG4gICAgICAvLyBNVVRBVEUgc28gaWYgdXNlci5zYXZlKCkgaXMgY2FsbGVkIGxhdGVyIGl0IGRvZXNuJ3QgZGlzLWFzc29jaWF0ZVxuICAgICAgdXNlci5waG9uZU5vdGlmID0gcGhvbmVOb3RpZk1vZGVsO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMubm90aWZ5UGhvbmUoXG4gICAgICBwaG9uZU5vdGlmTW9kZWwsXG4gICAgICBcIllvdSd2ZSBzaWduZWQgdXAgZm9yIHBob25lIG5vdGlmaWNhdGlvbnMgZm9yIEtob3VyeSBPZmZpY2UgSG91cnMuIFRvIHZlcmlmeSB5b3VyIG51bWJlciwgcGxlYXNlIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggWUVTLiBUbyB1bnN1YnNjcmliZSwgcmVzcG9uZCB0byB0aGlzIG1lc3NhZ2Ugd2l0aCBOTyBvciBTVE9QXCIsXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvLyBOb3RpZnkgdXNlciBvbiBhbGwgcGxhdGZvcm1zXG4gIGFzeW5jIG5vdGlmeVVzZXIodXNlcklkOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdGlmTW9kZWxzT2ZVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IFsnZGVza3RvcE5vdGlmcycsICdwaG9uZU5vdGlmJ10sXG4gICAgfSk7XG5cbiAgICAvLyBydW4gdGhlIHByb21pc2VzIGNvbmN1cnJlbnRseVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzRW5hYmxlZCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIG5vdGlmTW9kZWxzT2ZVc2VyLmRlc2t0b3BOb3RpZnMubWFwKGFzeW5jIChubSkgPT5cbiAgICAgICAgICB0aGlzLm5vdGlmeURlc2t0b3Aobm0sIG1lc3NhZ2UpLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYgJiYgbm90aWZNb2RlbHNPZlVzZXIucGhvbmVOb3RpZnNFbmFibGVkKSB7XG4gICAgICB0aGlzLm5vdGlmeVBob25lKG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWYsIG1lc3NhZ2UsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIGRlc2t0b3Agbm90aWZpY2F0aW9uXG4gIGFzeW5jIG5vdGlmeURlc2t0b3Aobm06IERlc2t0b3BOb3RpZk1vZGVsLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd2ViUHVzaC5zZW5kTm90aWZpY2F0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IG5tLmVuZHBvaW50LFxuICAgICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgIHAyNTZkaDogbm0ucDI1NmRoLFxuICAgICAgICAgICAgYXV0aDogbm0uYXV0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKG5tKTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZmllcyBhIHVzZXIgdmlhIHBob25lIG51bWJlclxuICBhc3luYyBub3RpZnlQaG9uZShcbiAgICBwbjogUGhvbmVOb3RpZk1vZGVsLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmb3JjZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGZvcmNlIHx8IHBuLnZlcmlmaWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnR3aWxpb1NlcnZpY2Uuc2VuZFNNUyhwbi5waG9uZU51bWJlciwgbWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9ibGVtIHNlbmRpbmcgbWVzc2FnZScsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyB2ZXJpZnlQaG9uZShwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHBob25lTm90aWYgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIgfSxcbiAgICB9KTtcblxuICAgIGlmICghcGhvbmVOb3RpZikge1xuICAgICAgYXBtLnNldEN1c3RvbUNvbnRleHQoeyBwaG9uZU51bWJlciB9KTtcbiAgICAgIGFwbS5jYXB0dXJlRXJyb3IoXG4gICAgICAgIG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcGhvbmUgbnVtYmVyIGR1cmluZyB2ZXJpZmljYXRpb24nKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLkNPVUxEX05PVF9GSU5EX05VTUJFUjtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgIT09ICdZRVMnICYmIG1lc3NhZ2UgIT09ICdOTycgJiYgbWVzc2FnZSAhPT0gJ1NUT1AnKSB7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLldST05HX01FU1NBR0U7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlID09PSAnTk8nIHx8IG1lc3NhZ2UgPT09ICdTVE9QJykge1xuICAgICAgLy8gZGlkIHNvbWUgbW9yZSBkaWdnaW5nLCBTVE9QIGp1c3Qgc3RvcHMgbWVzc2FnZXMgY29tcGxldGVseSwgd2UnbGwgbmV2ZXIgcmVjZWl2ZSBpdFxuICAgICAgLy8gc28gdWguLi4gdGhlcmUncyBwcm9iYWJseSBhIHdheSB0byBkbyB0aGF0XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHBob25lTm90aWYpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5VTlJFR0lTVEVSO1xuICAgIH0gZWxzZSBpZiAocGhvbmVOb3RpZi52ZXJpZmllZCkge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5EVVBMSUNBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBob25lTm90aWYudmVyaWZpZWQgPSB0cnVlO1xuICAgICAgYXdhaXQgcGhvbmVOb3RpZi5zYXZlKCk7XG4gICAgICByZXR1cm4gTm90aWZNc2dzLnBob25lLk9LO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2ViLXB1c2hcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIHR3aWxpbyBTREsgdG8gbWFrZSB0ZXN0aW5nIGVhc2llci5cbiAqIFNob3VsZCBOT1QgaW50ZXJhY3Qgd2l0aCBEQiBtb2RlbHMgb3IgZG8gYW55dGhpbmcgc21hcnQuIEp1c3Qgd3JhcCBUd2lsaW8uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUd2lsaW9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB0d2lsaW9DbGllbnQ6IHR3aWxpby5Ud2lsaW87XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy50d2lsaW9DbGllbnQgPSB0d2lsaW8oXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BQ0NPVU5UU0lEJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9BVVRIVE9LRU4nKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmdWxsIHBob25lIG51bWJlciBvciByZXR1cm4gZmFsc2UgaWYgcGhvbmUgbnVtYmVyIGlzbid0IHJlYWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXI6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgZmFsc2U+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5sb29rdXBzLnBob25lTnVtYmVycyhwaG9uZU51bWJlcikuZmV0Y2goKSkucGhvbmVOdW1iZXI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBpZiB0aGUgcGhvbmUgbnVtYmVyIGlzIG5vdCBmb3VuZCwgdGhlbiBlbmRwb2ludCBzaG91bGQgcmV0dXJuIGludmFsaWRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBTTVMgdG8gcGhvbmUgbnVtYmVyIHVzaW5nIG91ciBUd2lsaW8gbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZFNNUyhwaG9uZU51bWJlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnR3aWxpb0NsaWVudC5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgIGZyb206IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT1BIT05FTlVNQkVSJyksXG4gICAgICB0bzogcGhvbmVOdW1iZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aWxpb1wiKTsiLCJpbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgSGVhZGVyLFxuICBIZWFkZXJzLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmQm9keSwgRGVza3RvcE5vdGlmUGFydGlhbCwgVHdpbGlvQm9keSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCAqIGFzIHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuXG5AQ29udHJvbGxlcignbm90aWZpY2F0aW9ucycpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2Rlc2t0b3AvY3JlZGVudGlhbHMnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgZ2V0RGVza3RvcENyZWRlbnRpYWxzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubm90aWZTZXJ2aWNlLmRlc2t0b3BQdWJsaWNLZXkpO1xuICB9XG5cbiAgQFBvc3QoJ2Rlc2t0b3AvZGV2aWNlJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIHJlZ2lzdGVyRGVza3RvcFVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBEZXNrdG9wTm90aWZCb2R5LFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZQYXJ0aWFsPiB7XG4gICAgY29uc3QgZGV2aWNlID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJEZXNrdG9wKHtcbiAgICAgIGVuZHBvaW50OiBib2R5LmVuZHBvaW50LFxuICAgICAgZXhwaXJhdGlvblRpbWU6IGJvZHkuZXhwaXJhdGlvblRpbWUgJiYgbmV3IERhdGUoYm9keS5leHBpcmF0aW9uVGltZSksXG4gICAgICBwMjU2ZGg6IGJvZHkua2V5cy5wMjU2ZGgsXG4gICAgICBhdXRoOiBib2R5LmtleXMuYXV0aCxcbiAgICAgIG5hbWU6IGJvZHkubmFtZSxcbiAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogZGV2aWNlLmlkLFxuICAgICAgZW5kcG9pbnQ6IGRldmljZS5lbmRwb2ludCxcbiAgICAgIGNyZWF0ZWRBdDogZGV2aWNlLmNyZWF0ZWRBdCxcbiAgICAgIG5hbWU6IGRldmljZS5uYW1lLFxuICAgIH07XG4gIH1cblxuICBARGVsZXRlKCdkZXNrdG9wL2RldmljZS86ZGV2aWNlSWQnKVxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbiAgYXN5bmMgZGVsZXRlRGVza3RvcFVzZXIoXG4gICAgQFBhcmFtKCdkZXZpY2VJZCcpIGRldmljZUlkOiBudW1iZXIsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkbiA9IGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLmZpbmQoeyBpZDogZGV2aWNlSWQsIHVzZXJJZCB9KTtcbiAgICBpZiAoZG4ubGVuZ3RoID4gMCkge1xuICAgICAgYXdhaXQgRGVza3RvcE5vdGlmTW9kZWwucmVtb3ZlKGRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2ViaG9vayBmcm9tIHR3aWxpb1xuICBAUG9zdCgnL3Bob25lL3ZlcmlmeScpXG4gIEBIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpXG4gIGFzeW5jIHZlcmlmeVBob25lVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IFR3aWxpb0JvZHksXG4gICAgQEhlYWRlcnMoJ3gtdHdpbGlvLXNpZ25hdHVyZScpIHR3aWxpb1NpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBib2R5LkJvZHkudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgc2VuZGVyTnVtYmVyID0gYm9keS5Gcm9tO1xuXG4gICAgY29uc3QgdHdpbGlvQXV0aFRva2VuID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyk7XG5cbiAgICBjb25zdCBpc1ZhbGlkYXRlZCA9IHR3aWxpby52YWxpZGF0ZVJlcXVlc3QoXG4gICAgICB0d2lsaW9BdXRoVG9rZW4sXG4gICAgICB0d2lsaW9TaWduYXR1cmUudHJpbSgpLFxuICAgICAgYCR7dGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJyl9L2FwaS92MS9ub3RpZmljYXRpb25zL3Bob25lL3ZlcmlmeWAsXG4gICAgICBib2R5LFxuICAgICk7XG5cbiAgICBpZiAoIWlzVmFsaWRhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdNZXNzYWdlIG5vdCBmcm9tIFR3aWxpbycpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VUb1VzZXIgPSBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS52ZXJpZnlQaG9uZShcbiAgICAgIHNlbmRlck51bWJlcixcbiAgICAgIG1lc3NhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBNZXNzYWdpbmdSZXNwb25zZSA9IHR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZVRvVXNlcik7XG5cbiAgICByZXR1cm4gdHdpbWwudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9naW5Db250cm9sbGVyIH0gZnJvbSAnLi9sb2dpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi4vbG9naW4vand0LnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4gKHtcbiAgICAgICAgc2VjcmV0OiBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVCcpLFxuICAgICAgfSksXG4gICAgfSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbSnd0U3RyYXRlZ3ksIExvZ2luQ291cnNlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBCb2R5LFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQb3N0LFxuICBRdWVyeSxcbiAgUmVxLFxuICBSZXMsXG4gIFVuYXV0aG9yaXplZEV4Y2VwdGlvbixcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgSnd0U2VydmljZSB9IGZyb20gJ0BuZXN0anMvand0JztcbmltcG9ydCB7XG4gIEtob3VyeURhdGFQYXJhbXMsXG4gIEtob3VyeVJlZGlyZWN0UmVzcG9uc2UsXG4gIEtob3VyeVN0dWRlbnRDb3Vyc2UsXG4gIEtob3VyeVRBQ291cnNlLFxuICBSb2xlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgaHR0cFNpZ25hdHVyZSBmcm9tICdodHRwLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi8uLi9zcmMvbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IExvZ2luQ291cnNlU2VydmljZSB9IGZyb20gJy4vbG9naW4tY291cnNlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbG9naW5Db3Vyc2VTZXJ2aWNlOiBMb2dpbkNvdXJzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBqd3RTZXJ2aWNlOiBKd3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgKSB7fVxuXG4gIEBQb3N0KCcva2hvdXJ5X2xvZ2luJylcbiAgYXN5bmMgcmVjaWV2ZURhdGFGcm9tS2hvdXJ5KFxuICAgIEBSZXEoKSByZXE6IFJlcXVlc3QsXG4gICAgQEJvZHkoKSBib2R5OiBLaG91cnlEYXRhUGFyYW1zLFxuICApOiBQcm9taXNlPEtob3VyeVJlZGlyZWN0UmVzcG9uc2U+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gQ2hlY2sgdGhhdCByZXF1ZXN0IGhhcyBjb21lIGZyb20gS2hvdXJ5XG4gICAgICBjb25zdCBwYXJzZWRSZXF1ZXN0ID0gaHR0cFNpZ25hdHVyZS5wYXJzZVJlcXVlc3QocmVxKTtcbiAgICAgIGNvbnNvbGUubG9nKCdwYXJzZWQgcmVxdWVzdCcpO1xuICAgICAgY29uc3QgdmVyaWZ5ID0gaHR0cFNpZ25hdHVyZS52ZXJpZnlITUFDKFxuICAgICAgICBwYXJzZWRSZXF1ZXN0LFxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdLSE9VUllfUFJJVkFURV9LRVknKSxcbiAgICAgICk7XG4gICAgICBpZiAoIXZlcmlmeSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCcpO1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlJyk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygndmFsaWQnKTtcbiAgICB9XG5cbiAgICBsZXQgdXNlcjogVXNlck1vZGVsO1xuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogYm9keS5lbWFpbCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoeyBjb3Vyc2VzOiBbXSB9KTtcbiAgICB9XG5cbiAgICAvLyBROiBEbyB3ZSBuZWVkIHRoaXMgaWYgaXQncyBub3QgZ29pbmcgdG8gY2hhbmdlP1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHtcbiAgICAgIGVtYWlsOiBib2R5LmVtYWlsLFxuICAgICAgbmFtZTogYm9keS5maXJzdF9uYW1lICsgJyAnICsgYm9keS5sYXN0X25hbWUsXG4gICAgICBwaG90b1VSTDogJycsXG4gICAgfSk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyQ291cnNlcyA9IFtdO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS5jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5U3R1ZGVudENvdXJzZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3Vyc2U6IENvdXJzZU1vZGVsID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlU2VjdGlvblRvQ291cnNlKFxuICAgICAgICAgIGMuY291cnNlLFxuICAgICAgICAgIGMuc2VjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgY29uc3QgdXNlckNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2UuaWQsXG4gICAgICAgICAgICBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VyQ291cnNlcy5wdXNoKHVzZXJDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBib2R5LnRhX2NvdXJzZXMubWFwKGFzeW5jIChjOiBLaG91cnlUQUNvdXJzZSkgPT4ge1xuICAgICAgICAvLyBRdWVyeSBmb3IgYWxsIHRoZSBjb3Vyc2VzIHdoaWNoIG1hdGNoIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmljIGNvdXJzZSBmcm9tIEtob3VyeVxuICAgICAgICBjb25zdCBjb3Vyc2VNYXBwaW5ncyA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZCh7XG4gICAgICAgICAgd2hlcmU6IHsgZ2VuZXJpY0NvdXJzZU5hbWU6IGMuY291cnNlIH0sIC8vIFRPRE86IEFkZCBzZW1lc3RlciBzdXBwb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgY291cnNlTWFwcGluZyBvZiBjb3Vyc2VNYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IHRhQ291cnNlID0gYXdhaXQgdGhpcy5sb2dpbkNvdXJzZVNlcnZpY2UuY291cnNlVG9Vc2VyQ291cnNlKFxuICAgICAgICAgICAgdXNlci5pZCxcbiAgICAgICAgICAgIGNvdXJzZU1hcHBpbmcuY291cnNlSWQsXG4gICAgICAgICAgICBSb2xlLlRBLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh0YUNvdXJzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdXNlci5jb3Vyc2VzID0gdXNlckNvdXJzZXM7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoXG4gICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgeyBleHBpcmVzSW46IDUgKiA2MCB9LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OlxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdET01BSU4nKSArIGAvYXBpL3YxL2xvZ2luL2VudHJ5P3Rva2VuPSR7dG9rZW59YCxcbiAgICB9O1xuICB9XG5cbiAgLy8gTk9URTogQWx0aG91Z2ggdGhlIHR3byByb3V0ZXMgYmVsb3cgYXJlIG9uIHRoZSBiYWNrZW5kLFxuICAvLyB0aGV5IGFyZSBtZWFudCB0byBiZSB2aXNpdGVkIGJ5IHRoZSBicm93c2VyIHNvIGEgY29va2llIGNhbiBiZSBzZXRcblxuICAvLyBUaGlzIGlzIHRoZSByZWFsIGFkbWluIGVudHJ5IHBvaW50XG4gIEBHZXQoJy9sb2dpbi9lbnRyeScpXG4gIGFzeW5jIGVudGVyRnJvbUtob3VyeShcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgICBAUXVlcnkoJ3Rva2VuJykgdG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGF3YWl0IHRoaXMuand0U2VydmljZS52ZXJpZnlBc3luYyh0b2tlbik7XG5cbiAgICBpZiAoIWlzVmVyaWZpZWQpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5qd3RTZXJ2aWNlLmRlY29kZSh0b2tlbikgYXMgeyB1c2VySWQ6IG51bWJlciB9O1xuXG4gICAgdGhpcy5lbnRlcihyZXMsIHBheWxvYWQudXNlcklkKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZm9yIGxvZ2luIG9uIGRldmVsb3BtZW50IG9ubHlcbiAgQEdldCgnL2xvZ2luL2RldicpXG4gIEBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuICBhc3luYyBlbnRlckZyb21EZXYoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd1c2VySWQnKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbnRlcihyZXMsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdCB0byBwcm9wZXIgcGFnZVxuICBwcml2YXRlIGFzeW5jIGVudGVyKHJlczogUmVzcG9uc2UsIHVzZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgdGhpcy5qd3RTZXJ2aWNlLnNpZ25Bc3luYyh7IHVzZXJJZCB9KTtcbiAgICBjb25zdCBpc1NlY3VyZSA9IHRoaXMuY29uZmlnU2VydmljZVxuICAgICAgLmdldDxzdHJpbmc+KCdET01BSU4nKVxuICAgICAgLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgcmVzXG4gICAgICAuY29va2llKCdhdXRoX3Rva2VuJywgYXV0aFRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGlzU2VjdXJlIH0pXG4gICAgICAucmVkaXJlY3QoMzAyLCAnLycpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXNpZ25hdHVyZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGlzUHJvZCB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vblByb2R1Y3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc1Byb2QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgnY291cnNlX3NlY3Rpb25fbWFwcGluZ19tb2RlbCcpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyB0aGUgY291cnNlIG5hbWUgdGhhdCBpcyBzZW50IHRvIHVzIGZyb20gdGhlIGtob3VyeSBhbWluIGJhY2tlbmRcbiAgQENvbHVtbigpXG4gIGdlbmVyaWNDb3Vyc2VOYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIHNlY3Rpb246IG51bWJlcjtcblxuICAvLyBSZXByZXNlbnRzIHRoZSBjb3Vyc2UgdGhhdCB0aGlzIG1hcHMgdG9cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gQ291cnNlTW9kZWwpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJ2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICdsb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvdXJzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHt9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICBjb3VyZXNOYW1lOiBzdHJpbmcsXG4gICAgY291cnNlU2VjdGlvbjogbnVtYmVyLFxuICApOiBQcm9taXNlPENvdXJzZU1vZGVsPiB7XG4gICAgY29uc3QgY291cnNlU2VjdGlvbk1vZGVsID0gYXdhaXQgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjb3VyZXNOYW1lLCBzZWN0aW9uOiBjb3Vyc2VTZWN0aW9uIH0sXG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlJ10sXG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdXJzZVNlY3Rpb25Nb2RlbD8uY291cnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvdXJzZVRvVXNlckNvdXJzZShcbiAgICB1c2VySWQ6IG51bWJlcixcbiAgICBjb3Vyc2VJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHVzZXJDb3Vyc2U6IFVzZXJDb3Vyc2VNb2RlbDtcbiAgICB1c2VyQ291cnNlID0gYXdhaXQgVXNlckNvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgdXNlcklkLCBjb3Vyc2VJZCwgcm9sZSB9LFxuICAgIH0pO1xuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNvdXJzZUlkLFxuICAgICAgICByb2xlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckNvdXJzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RTdHJhdGVneSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiAocmVxOiBSZXF1ZXN0KSA9PiByZXEuY29va2llc1snYXV0aF90b2tlbiddLFxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlKHBheWxvYWQ6IHsgdXNlcklkOiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4ucGF5bG9hZCB9O1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZmlsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2ZpbGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtQcm9maWxlQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNb2R1bGUge31cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgVXNlR3VhcmRzLCBQYXRjaCwgQm9keSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuICBEZXNrdG9wTm90aWZQYXJ0aWFsLFxuICBHZXRQcm9maWxlUmVzcG9uc2UsXG4gIFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigncHJvZmlsZScpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoKVxuICBhc3luYyBnZXQoXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlci5jb3Vyc2VzXG4gICAgICAuZmlsdGVyKCh1c2VyQ291cnNlKSA9PiB1c2VyQ291cnNlLmNvdXJzZS5lbmFibGVkKVxuICAgICAgLm1hcCgodXNlckNvdXJzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvdXJzZToge1xuICAgICAgICAgICAgaWQ6IHVzZXJDb3Vyc2UuY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyQ291cnNlLmNvdXJzZS5uYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZTogdXNlckNvdXJzZS5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZQYXJ0aWFsW10gPSB1c2VyLmRlc2t0b3BOb3RpZnMubWFwKFxuICAgICAgKGQpID0+ICh7XG4gICAgICAgIGVuZHBvaW50OiBkLmVuZHBvaW50LFxuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBkLmNyZWF0ZWRBdCxcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IHBpY2sodXNlciwgW1xuICAgICAgJ2lkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAncGhvdG9VUkwnLFxuICAgICAgJ2Rlc2t0b3BOb3RpZnNFbmFibGVkJyxcbiAgICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgIF0pO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51c2VyUmVzcG9uc2UsXG4gICAgICBjb3Vyc2VzLFxuICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXIsXG4gICAgICBkZXNrdG9wTm90aWZzLFxuICAgIH07XG4gIH1cblxuICBAUGF0Y2goKVxuICBhc3luYyBwYXRjaChcbiAgICBAQm9keSgpIHVzZXJQYXRjaDogVXBkYXRlUHJvZmlsZVBhcmFtcyxcbiAgICBAVXNlcihbJ2NvdXJzZXMnLCAnY291cnNlcy5jb3Vyc2UnLCAncGhvbmVOb3RpZicsICdkZXNrdG9wTm90aWZzJ10pXG4gICAgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPEdldFByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHVzZXIgPSBPYmplY3QuYXNzaWduKHVzZXIsIHVzZXJQYXRjaCk7XG4gICAgaWYgKFxuICAgICAgdXNlci5waG9uZU5vdGlmc0VuYWJsZWQgJiZcbiAgICAgIHVzZXJQYXRjaC5waG9uZU51bWJlciAhPT0gdXNlci5waG9uZU5vdGlmPy5waG9uZU51bWJlclxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UucmVnaXN0ZXJQaG9uZSh1c2VyUGF0Y2gucGhvbmVOdW1iZXIsIHVzZXIpO1xuICAgIH1cbiAgICBhd2FpdCB1c2VyLnNhdmUoKTtcblxuICAgIHJldHVybiB0aGlzLmdldCh1c2VyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sbGVyIH0gZnJvbSAnLi9xdWVzdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXN0aW9uU3Vic2NyaWJlciB9IGZyb20gJy4vcXVlc3Rpb24uc3Vic2NyaWJlcic7XG5pbXBvcnQgeyBRdWV1ZU1vZHVsZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1F1ZXN0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1F1ZXN0aW9uU3Vic2NyaWJlcl0sXG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGUsIFF1ZXVlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsb3NlZFF1ZXN0aW9uU3RhdHVzLFxuICBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSxcbiAgR2V0UXVlc3Rpb25SZXNwb25zZSxcbiAgT3BlblF1ZXN0aW9uU3RhdHVzLFxuICBRdWVzdGlvblN0YXR1c0tleXMsXG4gIFJvbGUsXG4gIFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICBVcGRhdGVRdWVzdGlvblJlc3BvbnNlLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQge1xuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxuICBCb2R5LFxuICBDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcixcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBNZXRob2ROb3RBbGxvd2VkRXhjZXB0aW9uLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUGFyYW0sXG4gIFBhdGNoLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBJbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vbG9naW4vand0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9wcm9maWxlL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyLCBVc2VySWQgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvblJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXN0aW9uLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3F1ZXN0aW9ucycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVlc3Rpb25Sb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6cXVlc3Rpb25JZCcpXG4gIGFzeW5jIGdldFF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxHZXRRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocXVlc3Rpb25JZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgQFBvc3QoKVxuICBAUm9sZXMoUm9sZS5TVFVERU5UKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpIGJvZHk6IENyZWF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCB7IHRleHQsIHF1ZXN0aW9uVHlwZSwgcXVldWVJZCwgZm9yY2UgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdQb3N0ZWQgdG8gYW4gaW52YWxpZCBxdWV1ZScpO1xuICAgIH1cblxuICAgIGlmICghcXVldWUuYWxsb3dRdWVzdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBNZXRob2ROb3RBbGxvd2VkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogdGhpbmsgb2YgYSBuZWF0IHdheSB0byBtYWtlIHRoaXMgYWJzdHJhY3RlZFxuICAgIGNvbnN0IGlzVXNlckluQ291cnNlID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVldWUuY291cnNlSWQsXG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICB9LFxuICAgICAgfSkpID09PSAxO1xuXG4gICAgaWYgKCFpc1VzZXJJbkNvdXJzZSkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgXCJDYW4ndCBwb3N0IHF1ZXN0aW9uIHRvIGNvdXJzZSB5b3UncmUgbm90IGluIVwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgIFwiWW91IGNhbid0IHBvc3QgYSBxdWVzdGlvbiB0byBhIGNsb3NlZCBxdWV1ZVwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1VzZXJRdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBjcmVhdG9ySWQ6IHVzZXIuaWQsXG4gICAgICAgIHN0YXR1czogSW4oT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoISFwcmV2aW91c1VzZXJRdWVzdGlvbikge1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHByZXZpb3VzVXNlclF1ZXN0aW9uLnN0YXR1cyA9IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkO1xuICAgICAgICBhd2FpdCBwcmV2aW91c1VzZXJRdWVzdGlvbi5zYXZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcbiAgICAgICAgICBcIllvdSBjYW4ndCBjcmVhdGUgbW9yZSB0aGFuIG9uZSBxdWVzdGlvbiBhdCBhIHRpbWUuXCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmNyZWF0ZSh7XG4gICAgICBxdWV1ZUlkOiBxdWV1ZUlkLFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIHRleHQsXG4gICAgICBxdWVzdGlvblR5cGUsXG4gICAgICBzdGF0dXM6IFF1ZXN0aW9uU3RhdHVzS2V5cy5EcmFmdGluZyxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlzT25saW5lOiB0cnVlLFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXN0aW9uSWQnKVxuICBAUm9sZXMoUm9sZS5TVFVERU5ULCBSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgdXBkYXRlUXVlc3Rpb24oXG4gICAgQFBhcmFtKCdxdWVzdGlvbklkJykgcXVlc3Rpb25JZDogbnVtYmVyLFxuICAgIEBCb2R5KCkgYm9keTogVXBkYXRlUXVlc3Rpb25QYXJhbXMsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2U+IHtcbiAgICAvLyBUT0RPOiBDaGVjayB0aGF0IHRoZSBxdWVzdGlvbl9pZCBiZWxvbmdzIHRvIHRoZSB1c2VyIG9yIGEgVEEgdGhhdCBpcyBjdXJyZW50bHkgaGVscGluZyB3aXRoIHRoZSBnaXZlbiBxdWV1ZV9pZFxuICAgIC8vIFRPRE86IFVzZSB1c2VyIHR5cGUgdG8gZGVydGVybWluZSB3ZXRoZXIgb3Igbm90IHdlIHNob3VsZCBpbmNsdWRlIHRoZSB0ZXh0IGluIHRoZSByZXNwb25zZVxuICAgIGxldCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogcXVlc3Rpb25JZCB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NyZWF0b3InLCAncXVldWUnLCAndGFIZWxwZWQnXSxcbiAgICB9KTtcbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDcmVhdG9yID0gdXNlcklkID09PSBxdWVzdGlvbi5jcmVhdG9ySWQ7XG5cbiAgICBpZiAoaXNDcmVhdG9yKSB7XG4gICAgICAvLyBDcmVhdG9yIGNhbiBhbHdheXMgZWRpdFxuICAgICAgaWYgKGJvZHkuc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICdTdHVkZW50cyBjYW5ub3QgbWFyayBxdWVzdGlvbiBhcyBoZWxwaW5nJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChib2R5LnN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAnU3R1ZGVudHMgY2Fubm90IG1hcmsgcXVlc3Rpb24gYXMgcmVzb2x2ZWQnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcXVlc3Rpb24gPSBPYmplY3QuYXNzaWduKHF1ZXN0aW9uLCBib2R5KTtcbiAgICAgIGF3YWl0IHF1ZXN0aW9uLnNhdmUoKTtcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9XG5cbiAgICAvLyBJZiBub3QgY3JlYXRvciwgY2hlY2sgaWYgdXNlciBpcyBUQS9QUk9GIG9mIGNvdXJzZSBvZiBxdWVzdGlvblxuICAgIGNvbnN0IGlzVGFPclByb2YgPVxuICAgICAgKGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5jb3VudCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNvdXJzZUlkOiBxdWVzdGlvbi5xdWV1ZS5jb3Vyc2VJZCxcbiAgICAgICAgICByb2xlOiBJbihbUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1JdKSxcbiAgICAgICAgfSxcbiAgICAgIH0pKSA+IDA7XG5cbiAgICBpZiAoaXNUYU9yUHJvZikge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGJvZHkpLmxlbmd0aCAhPT0gMSB8fCBPYmplY3Qua2V5cyhib2R5KVswXSAhPT0gJ3N0YXR1cycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAnVEEvUHJvZmVzc29ycyBjYW4gb25seSBlZGl0IHF1ZXN0aW9uIHN0YXR1cycsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgdGFIZWxwZWQgaXMgYWxyZWFkeSBzZXQsIG1ha2Ugc3VyZSB0aGUgc2FtZSB0YSB1cGRhdGVzIHRoZSBzdGF0dXNcbiAgICAgIGlmIChxdWVzdGlvbi50YUhlbHBlZD8uaWQgIT09IHVzZXJJZCkge1xuICAgICAgICBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgICAnQW5vdGhlciBUQSBpcyBjdXJyZW50bHkgaGVscGluZyB3aXRoIHRoaXMgcXVlc3Rpb24nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuUmVzb2x2ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgJ0Fub3RoZXIgVEEgaGFzIGFscmVhZHkgcmVzb2x2ZWQgdGhpcyBxdWVzdGlvbicsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0FscmVhZHlIZWxwaW5nT25lID1cbiAgICAgICAgKGF3YWl0IFF1ZXN0aW9uTW9kZWwuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB0YUhlbHBlZElkOiB1c2VySWQsXG4gICAgICAgICAgICBzdGF0dXM6IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKSA9PT0gMTtcbiAgICAgIGlmIChpc0FscmVhZHlIZWxwaW5nT25lICYmIGJvZHkuc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IFRBIGFzIHRhSGVscGVkIHdoZW4gdGhlIFRBIHN0YXJ0cyBoZWxwaW5nIHRoZSBzdHVkZW50XG4gICAgICBpZiAoXG4gICAgICAgIHF1ZXN0aW9uLnN0YXR1cyAhPT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcgJiZcbiAgICAgICAgYm9keS5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nXG4gICAgICApIHtcbiAgICAgICAgcXVlc3Rpb24udGFIZWxwZWQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh1c2VySWQpO1xuICAgICAgICBxdWVzdGlvbi5oZWxwZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgcXVlc3Rpb24uY3JlYXRvci5pZCxcbiAgICAgICAgICBOb3RpZk1zZ3MucXVldWUuVEFfSElUX0hFTFBFRChxdWVzdGlvbi50YUhlbHBlZC5uYW1lKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICdMb2dnZWQtaW4gdXNlciBkb2VzIG5vdCBoYXZlIGVkaXQgYWNjZXNzJyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQFBvc3QoJzpxdWVzdGlvbklkL25vdGlmeScpXG4gIEBSb2xlcyhSb2xlLlRBLCBSb2xlLlBST0ZFU1NPUilcbiAgYXN5bmMgbm90aWZ5KEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZSddLFxuICAgIH0pO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkNhbnRGaW5kKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5BTEVSVF9CVVRUT04sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocXVlc3Rpb24uc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuVEFEZWxldGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICBxdWVzdGlvbi5jcmVhdG9ySWQsXG4gICAgICAgIE5vdGlmTXNncy5xdWV1ZS5SRU1PVkVELFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvcm9sZS5ndWFyZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgbGV0IHF1ZXVlSWQ7XG5cbiAgICBpZiAocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCkge1xuICAgICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVlc3Rpb25JZCk7XG4gICAgICBpZiAoIXF1ZXN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignUXVlc3Rpb24gbm90IGZvdW5kJyk7XG4gICAgICB9XG4gICAgICBxdWV1ZUlkID0gcXVlc3Rpb24ucXVldWVJZDtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuYm9keS5xdWV1ZUlkKSB7XG4gICAgICAvLyBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgbmV3IHF1ZXN0aW9uXG4gICAgICBxdWV1ZUlkID0gcmVxdWVzdC5ib2R5LnF1ZXVlSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdDYW5ub3QgZmluZCBxdWV1ZSBvZiBxdWVzdGlvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQpO1xuXG4gICAgLy8gWW91IGNhbm5vdCBpbnRlcmFjdCB3aXRoIGEgcXVlc3Rpb24gaW4gYSBub25leGlzdGVudCBxdWV1ZVxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignVGhpcyBxdWV1ZSBkb2VzIG5vdCBleGlzdCEnKTtcbiAgICB9XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZS5jb3Vyc2VJZDtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUocmVxdWVzdC51c2VyLnVzZXJJZCwge1xuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZXMnXSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb24sXG4gIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2UsXG4gIEV2ZW50U3Vic2NyaWJlcixcbiAgSW5zZXJ0RXZlbnQsXG4gIFJlbW92ZUV2ZW50LFxuICBVcGRhdGVFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICBOb3RpZk1zZ3MsXG59IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblN1YnNjcmliZXJcbiAgaW1wbGVtZW50cyBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcXVldWVTU0VTZXJ2aWNlOiBRdWV1ZVNTRVNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLm5vdGlmU2VydmljZSA9IG5vdGlmU2VydmljZTtcbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZSA9IHF1ZXVlU1NFU2VydmljZTtcbiAgICBjb25uZWN0aW9uLnN1YnNjcmliZXJzLnB1c2godGhpcyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICBsaXN0ZW5UbygpIHtcbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVyVXBkYXRlKGV2ZW50OiBVcGRhdGVFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG5cbiAgICAvLyBTZW5kIHB1c2ggbm90aWZpY2F0aW9uIHRvIHN0dWRlbnRzIHdoZW4gdGhleSBhcmUgaGl0IDNyZCBpbiBsaW5lXG4gICAgLy8gaWYgc3RhdHVzIHVwZGF0ZWQgdG8gY2xvc2VkXG4gICAgaWYgKFxuICAgICAgZXZlbnQudXBkYXRlZENvbHVtbnMuZmluZCgoYykgPT4gYy5wcm9wZXJ0eU5hbWUgPT09ICdzdGF0dXMnKSAmJlxuICAgICAgZXZlbnQuZW50aXR5LnN0YXR1cyBpbiBDbG9zZWRRdWVzdGlvblN0YXR1c1xuICAgICkge1xuICAgICAgLy8gZ2V0IDNyZCBpbiBxdWV1ZSBiZWZvcmUgYW5kIGFmdGVyIHRoaXMgdXBkYXRlXG4gICAgICBjb25zdCBwcmV2aW91c1RoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShcbiAgICAgICAgZXZlbnQuZW50aXR5LnF1ZXVlSWQsXG4gICAgICApXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgY29uc3QgdGhpcmQgPSBhd2FpdCBRdWVzdGlvbk1vZGVsLm9wZW5JblF1ZXVlKGV2ZW50LmVudGl0eS5xdWV1ZUlkKVxuICAgICAgICAuc2V0UXVlcnlSdW5uZXIoZXZlbnQucXVlcnlSdW5uZXIpIC8vIFJ1biBpbiBzYW1lIHRyYW5zYWN0aW9uIGFzIHRoZSB1cGRhdGVcbiAgICAgICAgLm9mZnNldCgyKVxuICAgICAgICAuZ2V0T25lKCk7XG4gICAgICBpZiAodGhpcmQgJiYgcHJldmlvdXNUaGlyZD8uaWQgIT09IHRoaXJkPy5pZCkge1xuICAgICAgICBjb25zdCB7IGNyZWF0b3JJZCB9ID0gdGhpcmQ7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoY3JlYXRvcklkLCBOb3RpZk1zZ3MucXVldWUuVEhJUkRfUExBQ0UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxRdWVzdGlvbk1vZGVsPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG51bWJlck9mUXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShcbiAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgIClcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4ub3BlblN0YXR1cyknLCB7XG4gICAgICAgIG9wZW5TdGF0dXM6IFtPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdLFxuICAgICAgfSlcbiAgICAgIC5nZXRDb3VudCgpO1xuXG4gICAgaWYgKG51bWJlck9mUXVlc3Rpb25zID09PSAwKSB7XG4gICAgICBjb25zdCBzdGFmZiA9IChcbiAgICAgICAgYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKGV2ZW50LmVudGl0eS5xdWV1ZUlkLCB7XG4gICAgICAgICAgcmVsYXRpb25zOiBbJ3N0YWZmTGlzdCddLFxuICAgICAgICB9KVxuICAgICAgKS5zdGFmZkxpc3Q7XG5cbiAgICAgIHN0YWZmLmZvckVhY2goKHN0YWZmKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZTZXJ2aWNlLm5vdGlmeVVzZXIoXG4gICAgICAgICAgc3RhZmYuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnRhLlNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgfVxuXG4gIGFzeW5jIGJlZm9yZVJlbW92ZShldmVudDogUmVtb3ZlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBkdWUgdG8gY2FzY2FkZXMgZW50aXR5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGxvYWRlZFxuICAgIGlmIChldmVudC5lbnRpdHkpIHtcbiAgICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVlc3Rpb25zKGV2ZW50LmVudGl0eS5xdWV1ZUlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNlZWRDb250cm9sbGVyIH0gZnJvbSAnLi9zZWVkLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW1NlZWRDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbU2VlZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWVkTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1xuICBPZmZpY2VIb3VyRmFjdG9yeSxcbiAgUXVlc3Rpb25GYWN0b3J5LFxuICBRdWV1ZUZhY3RvcnksXG4gIFVzZXJDb3Vyc2VGYWN0b3J5LFxuICBTZW1lc3RlckZhY3RvcnksXG4gIENvdXJzZUZhY3RvcnksXG4gIFVzZXJGYWN0b3J5LFxufSBmcm9tICcuLi8uLi90ZXN0L3V0aWwvZmFjdG9yaWVzJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBOb25Qcm9kdWN0aW9uR3VhcmQgfSBmcm9tICcuLi9ub24tcHJvZHVjdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgU2VlZFNlcnZpY2UgfSBmcm9tICcuL3NlZWQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ3NlZWRzJylcbkBVc2VHdWFyZHMoTm9uUHJvZHVjdGlvbkd1YXJkKVxuZXhwb3J0IGNsYXNzIFNlZWRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgc2VlZFNlcnZpY2U6IFNlZWRTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnZGVsZXRlJylcbiAgYXN5bmMgZGVsZXRlQWxsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoT2ZmaWNlSG91ck1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWVzdGlvbk1vZGVsKTtcbiAgICBhd2FpdCB0aGlzLnNlZWRTZXJ2aWNlLmRlbGV0ZUFsbChRdWV1ZU1vZGVsKTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgcmVzZXQnO1xuICB9XG5cbiAgQEdldCgnY3JlYXRlJylcbiAgYXN5bmMgY3JlYXRlU2VlZHMoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBGaXJzdCBkZWxldGUgdGhlIG9sZCBkYXRhXG4gICAgYXdhaXQgdGhpcy5kZWxldGVBbGwoKTtcblxuICAgIC8vIFRoZW4gYWRkIHRoZSBuZXcgc2VlZCBkYXRhXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpIC0gMjQpO1xuXG4gICAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRvbW9ycm93LnNldFVUQ0hvdXJzKG5vdy5nZXRVVENIb3VycygpICsgMTkpO1xuXG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5vdyxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgLSA0NTAwMDAwKSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5vdy52YWx1ZU9mKCkgKyAxMDAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1llc3RlcmRheSA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHllc3RlcmRheSxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKHllc3RlcmRheS52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcbiAgICBjb25zdCBvZmZpY2VIb3Vyc1RvbW9ycm93ID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogdG9tb3Jyb3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh0b21vcnJvdy52YWx1ZU9mKCkgKyA0NTAwMDAwKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvdXJzZUV4aXN0cyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFjb3Vyc2VFeGlzdHMpIHtcbiAgICAgIGF3YWl0IFNlbWVzdGVyRmFjdG9yeS5jcmVhdGUoeyBzZWFzb246ICdGYWxsJywgeWVhcjogMjAyMCB9KTtcbiAgICAgIGF3YWl0IENvdXJzZUZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY291cnNlID0gYXdhaXQgQ291cnNlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBuYW1lOiAnQ1MgMjUwMCcgfSxcbiAgICAgIHJlbGF0aW9uczogWydvZmZpY2VIb3VycyddLFxuICAgIH0pO1xuXG4gICAgY291cnNlLm9mZmljZUhvdXJzID0gW1xuICAgICAgb2ZmaWNlSG91cnNUb2RheSxcbiAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgIG9mZmljZUhvdXJzVG9kYXlPdmVybGFwLFxuICAgIF07XG4gICAgY291cnNlLnNhdmUoKTtcblxuICAgIGNvbnN0IHVzZXJFeHNpc3RzID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoKTtcbiAgICBpZiAoIXVzZXJFeHNpc3RzKSB7XG4gICAgICAvLyBTdHVkZW50IDFcbiAgICAgIGNvbnN0IHVzZXIxID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdsaXUuc3RhQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnU3RhbmxleSBMaXUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVIyMENHMzZFLWNmMGYzNzUyNTJiZC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMSxcbiAgICAgICAgcm9sZTogUm9sZS5TVFVERU5ULFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgICAgLy8gU3R1bmRlbnQgMlxuICAgICAgY29uc3QgdXNlcjIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBlbWFpbDogJ3Rha2F5YW1hLmFAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdBbGV4IFRha2F5YW1hJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVKTDk3NDQzRC01MDEyMTMzOTY4NmItNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjIsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDFcbiAgICAgIGNvbnN0IHVzZXIzID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdzdGVuemVsLndAbm9ydGhlYXN0ZXJuLmVkdScsXG4gICAgICAgIG5hbWU6ICdXaWxsIFN0ZW56ZWwnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVVJGMjU2S1JULWQxMDA5OGU4NzlkYS01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyMyxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFRBIDJcbiAgICAgIGNvbnN0IHVzZXI0ID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICdjaHUuZGFqQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnRGEtSmluIENodScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VRTU2WTVVVDEtODVkYjU5YTQ3NGY0LTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXI0LFxuICAgICAgICByb2xlOiBSb2xlLlRBLFxuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICByb29tOiAnV0hWIDEwMScsXG4gICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgIG9mZmljZUhvdXJzOiBbXG4gICAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICAgIG9mZmljZUhvdXJzWWVzdGVyZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvbW9ycm93LFxuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICAgIF0sXG4gICAgICBhbGxvd1F1ZXN0aW9uczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAyNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQEdldCgnZmlsbFF1ZXVlJylcbiAgYXN5bmMgZmlsbFF1ZXVlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoKTtcblxuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdEYXRhIHN1Y2Nlc3NmdWxseSBzZWVkZWQnO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVVzZXInKVxuICBhc3luYyBjcmVhdGVVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogeyByb2xlOiBSb2xlOyBjb3Vyc2VJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8VXNlckNvdXJzZU1vZGVsPiB7XG4gICAgbGV0IHRhOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSwgY291cnNlOiBjb3Vyc2UgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHsgcm9sZTogYm9keS5yb2xlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGE7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVldWUnKVxuICBhc3luYyBjcmVhdGVRdWV1ZShcbiAgICBAQm9keSgpIGJvZHk6IHsgY291cnNlSWQ6IG51bWJlcjsgYWxsb3dRdWVzdGlvbnM6IGJvb2xlYW4gfSxcbiAgKTogUHJvbWlzZTxRdWV1ZU1vZGVsPiB7XG4gICAgbGV0IHF1ZXVlOiBRdWV1ZU1vZGVsO1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnMgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgaWYgKGJvZHkuY291cnNlSWQpIHtcbiAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5jb3Vyc2VJZCk7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcbiAgICAgICAgb2ZmaWNlSG91cnM6IFtvZmZpY2VIb3Vyc10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiBib2R5LmFsbG93UXVlc3Rpb25zID8/IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogYm9keS5hbGxvd1F1ZXN0aW9ucyA/PyBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBAUG9zdCgnY3JlYXRlUXVlc3Rpb24nKVxuICBhc3luYyBjcmVhdGVRdWVzdGlvbihcbiAgICBAQm9keSgpIGJvZHk6IHsgcXVldWVJZDogbnVtYmVyIH0sXG4gICk6IFByb21pc2U8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIGxldCBxdWVzdGlvbjogUXVlc3Rpb25Nb2RlbDtcbiAgICBpZiAoYm9keS5xdWV1ZUlkKSB7XG4gICAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZU9yRmFpbChib2R5LnF1ZXVlSWQpO1xuICAgICAgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVlc3Rpb25UeXBlLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJ3R5cGVvcm0tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyTW9kZWwpXG4gIC5hdHRyKCdlbWFpbCcsIGB1c2VyQG5ldS5lZHVgKVxuICAuYXR0cignbmFtZScsIGBVc2VyYClcbiAgLmF0dHIoJ3Bob3RvVVJMJywgYGh0dHBzOi8vcGljcy91c2VyYCk7XG5cbmV4cG9ydCBjb25zdCBTdHVkZW50Q291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlNUVURFTlQsXG4pO1xuXG5leHBvcnQgY29uc3QgVEFDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKS5hdHRyKFxuICAncm9sZScsXG4gIFJvbGUuVEEsXG4pO1xuXG5leHBvcnQgY29uc3QgU2VtZXN0ZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoU2VtZXN0ZXJNb2RlbClcbiAgLmF0dHIoJ3NlYXNvbicsICdGYWxsJylcbiAgLmF0dHIoJ3llYXInLCAyMDIwKTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE9mZmljZUhvdXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAuYXR0cigndGl0bGUnLCAnQWxleCAmIFN0YW5sZXknKVxuICAuYXR0cignc3RhcnRUaW1lJywgbmV3IERhdGUoJzIwMjAtMDUtMjBUMTQ6MDA6MDAuMDAwWicpKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE1OjMwOjAwLjAwMFonKSk7XG5cbmV4cG9ydCBjb25zdCBPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMzYwMDAwMCkpXG4gIC5hdHRyKCdlbmRUaW1lJywgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwMDAwKSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlTW9kZWwpXG4gIC5hdHRyKCduYW1lJywgJ0NTIDI1MDAnKVxuICAuYXR0cignaWNhbFVSTCcsICdodHRwOi8vaGkuY29tJylcbiAgLmF0dHIoJ2VuYWJsZWQnLCB0cnVlKVxuICAuYXNzb2NPbmUoJ3NlbWVzdGVyJywgU2VtZXN0ZXJGYWN0b3J5KVxuICAuYXNzb2NNYW55KCdvZmZpY2VIb3VycycsIE9mZmljZUhvdXJGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IENvdXJzZVNlY3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbClcbiAgLmF0dHIoJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ0NTIDI1MDAnKVxuICAuc2VxdWVuY2UoJ3NlY3Rpb24nLCAoaSkgPT4gaSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb3Vyc2VGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlckNvdXJzZU1vZGVsKVxuICAuYXNzb2NPbmUoJ3VzZXInLCBVc2VyRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cigncm9sZScsIFJvbGUuU1RVREVOVCk7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWV1ZU1vZGVsKVxuICAuYXR0cigncm9vbScsIGBXVkggMTAxYClcbiAgLmFzc29jT25lKCdjb3Vyc2UnLCBDb3Vyc2VGYWN0b3J5KVxuICAuYXR0cignYWxsb3dRdWVzdGlvbnMnLCBmYWxzZSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSk7XG5cbi8vIFdBUk5JTkc6IERPIE5PVCBVU0UgQ1JFQVRPUklELiBBUyBZT1UgU0VFIEhFUkUsIFdFIE9OTFkgQUNDRVBUIENSRUFUT1Jcbi8vVE9ETzogbWFrZSBpdCBhY2NlcHQgY3JlYXRvcklkIGFzIHdlbGxcbmV4cG9ydCBjb25zdCBRdWVzdGlvbkZhY3RvcnkgPSBuZXcgRmFjdG9yeShRdWVzdGlvbk1vZGVsKVxuICAuc2VxdWVuY2UoJ3RleHQnLCAoaSkgPT4gYHF1ZXN0aW9uICR7aX1gKVxuICAuYXR0cignc3RhdHVzJywgJ1F1ZXVlZCcpXG4gIC5hdHRyKCdxdWVzdGlvblR5cGUnLCBRdWVzdGlvblR5cGUuT3RoZXIpXG4gIC5hdHRyKCdjcmVhdGVkQXQnLCBuZXcgRGF0ZSgpKVxuICAuYXNzb2NPbmUoJ3F1ZXVlJywgUXVldWVGYWN0b3J5KVxuICAuYXNzb2NPbmUoJ2NyZWF0b3InLCBVc2VyRmFjdG9yeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtLWZhY3RvcnlcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZWRTZXJ2aWNlIHtcbiAgYXN5bmMgZGVsZXRlQWxsKG1vZGVsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBnZXRDb25uZWN0aW9uKCkuY3JlYXRlUXVlcnlCdWlsZGVyKCkuZGVsZXRlKCkuZnJvbShtb2RlbCkuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZG1pbkNvcmVNb2R1bGVGYWN0b3J5LFxuICBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LFxuICBEZWZhdWx0QWRtaW5TaXRlLFxufSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yIH0gZnJvbSAnLi9jcmVkZW50aWFsVmFsaWRhdG9yJztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7XG4gIENvdXJzZUFkbWluLFxuICBRdWV1ZUFkbWluLFxuICBVc2VyQWRtaW4sXG4gIFVzZXJDb3Vyc2VBZG1pbixcbiAgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbixcbn0gZnJvbSAnLi9hZG1pbi1lbnRpdGllcyc7XG5pbXBvcnQgeyBBZG1pbkNvbW1hbmQgfSBmcm9tICcuL2FkbWluLmNvbW1hbmQnO1xuXG5jb25zdCBDb3JlTW9kdWxlID0gQWRtaW5Db3JlTW9kdWxlRmFjdG9yeS5jcmVhdGVBZG1pbkNvcmVNb2R1bGUoe30pO1xuY29uc3QgQXV0aE1vZHVsZSA9IEFkbWluQXV0aE1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5BdXRoTW9kdWxlKHtcbiAgYWRtaW5Db3JlTW9kdWxlOiBDb3JlTW9kdWxlLFxuICBjcmVkZW50aWFsVmFsaWRhdG9yOiBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IsIC8vIGhvdyBkbyB5b3UgdmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgaW1wb3J0czogW1R5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbQWRtaW5Vc2VyTW9kZWxdKV0sIC8vIHdoYXQgbW9kdWxlcyBleHBvcnQgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgY3JlZGVudGlhbFZhbGlkYXRvciBhdmFpbGFibGVcbiAgcHJvdmlkZXJzOiBbXSxcbn0pO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29yZU1vZHVsZSwgQXV0aE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0FkbWluQ29tbWFuZF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZG1pblNpdGU6IERlZmF1bHRBZG1pblNpdGUpIHtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZScsIENvdXJzZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXInLCBVc2VyQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignVXNlckNvdXJzZScsIFVzZXJDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdRdWV1ZScsIFF1ZXVlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignQ291cnNlU2VjdGlvbk1hcHBpbmcnLCBDb3Vyc2VTZWN0aW9uTWFwcGluZ0FkbWluKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVzdGpzLWFkbWluXCIpOyIsImltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0JztcblxuZXhwb3J0IGNvbnN0IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciA9IHtcbiAgaW5qZWN0OiBbXSxcbiAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNyZWRlbnRpYWxzKFxuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTxBZG1pblVzZXJNb2RlbD4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGlmIChhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIEJhc2VFbnRpdHksIENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuXG4vKipcbiAqIEFkbWluIHVzZXJzIGFyZSB0b3RhbGx5IHNlcGFyYXRlIGZyb20gcmVndWxhciB1c2VycyBhbmQgY2FuIG9ubHkgYmUgY3JlYXRlZCBmcm9tIGNvbW1hbmQgbGluZS5cbiAqIGB5YXJuIGNsaSBhZG1pbjpjcmVhdGVgXG4gKi9cbkBFbnRpdHkoJ2FkbWluX3VzZXJfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIEFkbWluVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBzZXRQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgNSk7XG4gIH1cblxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMjgsIHVuaXF1ZTogdHJ1ZSwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwiaW1wb3J0IHsgQWRtaW5FbnRpdHkgfSBmcm9tICduZXN0anMtYWRtaW4nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbCB9IGZyb20gJy4uL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ25hbWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFF1ZXVlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdyb29tJywgJ2NvdXJzZUlkJ107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXTtcbiAgc2VhcmNoRmllbGRzID0gWydlbWFpbCcsICduYW1lJ107XG4gIGZpZWxkcyA9IFtcbiAgICAnaWQnLFxuICAgICdlbWFpbCcsXG4gICAgJ25hbWUnLFxuICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgJ3Bob25lTm90aWZzRW5hYmxlZCcsXG4gICAgJ3F1ZXVlcycsXG4gIF07XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IFVzZXJDb3Vyc2VNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ3VzZXJJZCcsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlU2VjdGlvbk1hcHBpbmdNb2RlbDtcbiAgbGlzdERpc3BsYXkgPSBbJ2lkJywgJ2dlbmVyaWNDb3Vyc2VOYW1lJywgJ3NlY3Rpb24nLCAnY291cnNlSWQnXTtcbn1cbiIsImltcG9ydCB7IENvbW1hbmQsIFBvc2l0aW9uYWwgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQWRtaW5Vc2VyTW9kZWwgfSBmcm9tICcuL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IHF1ZXN0aW9uLCBrZXlJbllOIH0gZnJvbSAncmVhZGxpbmUtc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkNvbW1hbmQge1xuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2NyZWF0ZTphZG1pbiA8dXNlcm5hbWU+JyxcbiAgICBkZXNjcmliZTogJ2NyZWF0ZSBhbiBhZG1pbiB1c2VyJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBQb3NpdGlvbmFsKHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICBkZXNjcmliZTogJ3RoZSBhZG1pbiB1c2VybmFtZScsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9KVxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1c2VyID0gYXdhaXQgQWRtaW5Vc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lIH0pO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VQYXNzd29yZCA9IGtleUluWU4oXG4gICAgICAgIGBVc2VyICR7dXNlcm5hbWV9IGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlaXIgcGFzc3dvcmQ/YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlciA9IEFkbWluVXNlck1vZGVsLmNyZWF0ZSh7IHVzZXJuYW1lIH0pO1xuICAgIH1cbiAgICBjb25zdCBwYXNzd29yZDogc3RyaW5nID0gcXVlc3Rpb24oJ1Bhc3N3b3JkOiAnLCB7XG4gICAgICBoaWRlRWNob0JhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG4gICAgY29uc29sZS5sb2coYENyZWF0ZWQgdXNlcjogJHt1c2VyLnVzZXJuYW1lfWApO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZS1zeW5jXCIpOyIsImltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBTZW1lc3Rlck1vZGVsIH0gZnJvbSAnLi9zcmMvY291cnNlL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vc3JjL25vdGlmaWNhdGlvbi9kZXNrdG9wLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvYWRtaW4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuL3NyYy9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5jb25maWcoKTtcblxuLy8gT3B0aW9ucyBvbmx5IHVzZWQgd2hlIHJ1biB2aWEgQ0xJXG5jb25zdCBpbkNMSSA9IHtcbiAgbWlncmF0aW9uczogWydtaWdyYXRpb24vKi50cyddLFxuICBjbGk6IHtcbiAgICBtaWdyYXRpb25zRGlyOiAnbWlncmF0aW9uJyxcbiAgfSxcbn07XG5cbmNvbnN0IHR5cGVvcm0gPSB7XG4gIHR5cGU6ICdwb3N0Z3JlcycsXG4gIHVybDogcHJvY2Vzcy5lbnYuREJfVVJMIHx8ICdwb3N0Z3JlczovL3Bvc3RncmVzQGxvY2FsaG9zdDo1NDMyL2RldicsXG4gIHN5bmNocm9uaXplOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnRpdGllczogW1xuICAgIENvdXJzZU1vZGVsLFxuICAgIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwsXG4gICAgT2ZmaWNlSG91ck1vZGVsLFxuICAgIFNlbWVzdGVyTW9kZWwsXG4gICAgVXNlck1vZGVsLFxuICAgIFVzZXJDb3Vyc2VNb2RlbCxcbiAgICBRdWVzdGlvbk1vZGVsLFxuICAgIFF1ZXVlTW9kZWwsXG4gICAgRGVza3RvcE5vdGlmTW9kZWwsXG4gICAgUGhvbmVOb3RpZk1vZGVsLFxuICAgIEFkbWluVXNlck1vZGVsLFxuICBdLFxuICBrZWVwQ29ubmVjdGlvbkFsaXZlOiB0cnVlLFxuICBsb2dnaW5nOiAhIXByb2Nlc3MuZW52LlRZUEVPUk1fTE9HR0lORyxcbiAgLi4uKCEhcHJvY2Vzcy5lbnYuVFlQRU9STV9DTEkgPyBpbkNMSSA6IHt9KSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvcm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFja2ZpbGxQaG9uZU5vdGlmcyB9IGZyb20gJy4vYmFja2ZpbGwtcGhvbmUtbm90aWZzLmNvbW1hbmQnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0JhY2tmaWxsUGhvbmVOb3RpZnNdLFxufSlcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQaG9uZU5vdGlmTW9kZWwgfSBmcm9tICdub3RpZmljYXRpb24vcGhvbmUtbm90aWYuZW50aXR5JztcbmltcG9ydCB7IElzTnVsbCB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJ25vdGlmaWNhdGlvbi90d2lsaW8vdHdpbGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrZmlsbFBob25lTm90aWZzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlKSB7fVxuICBAQ29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2JhY2tmaWxsOnBob25lLW5vdGlmcycsXG4gICAgZGVzY3JpYmU6XG4gICAgICAnZGVsZXRlIHBob25lIG5vdGlmcyB3aXRoIG5vIHVzZXJpZHMsIGRlbGV0ZSBkdXBsaWNhdGUgcGhvbmUgbm90aWZzLCBhbmQgZm9yY2libHkgc2V0IHZlcmlmaWVkIG9uIGV4aXN0aW5nIHBob25lbm90aWZzJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgZml4KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIERlbGV0ZSB0aG9zZSB3aXRob3V0IHVzZXJpZHMgYXNzb2NpYXRlZFxuICAgIGNvbnN0IG5vVXNlciA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUoeyB1c2VySWQ6IElzTnVsbCgpIH0pO1xuICAgIGNvbnNvbGUubG9nKGBkZWxldGVkICR7bm9Vc2VyLmFmZmVjdGVkfSBkZXNrdG9wbm90aWZtb2RlbHMgd2l0aCBubyB1c2VyaWRgKTtcblxuICAgIC8vIGRlbGV0ZSBhdCBvbmNlXG4gICAgY29uc3QgdG9EZWxldGU6IFBob25lTm90aWZNb2RlbFtdID0gW107XG5cbiAgICAvLyBEZWxldGUgZHVwbGljYXRlc1xuICAgIGNvbnN0IGR1cHMgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuY3JlYXRlUXVlcnlCdWlsZGVyKCdwbm90aWYnKVxuICAgICAgLnNlbGVjdChbYFwicGhvbmVOdW1iZXJcImAsICdDT1VOVCgqKSddKVxuICAgICAgLmdyb3VwQnkoJ3Bub3RpZi5waG9uZU51bWJlcicpXG4gICAgICAuaGF2aW5nKCdDT1VOVCgqKSA+IDEnKVxuICAgICAgLmdldFJhd01hbnkoKTtcbiAgICBjb25zb2xlLmxvZyhgZm91bmQgJHtkdXBzLmxlbmd0aH0gZHVwc2ApO1xuICAgIHRvRGVsZXRlLnB1c2goLi4uZHVwcyk7XG5cbiAgICBjb25zdCB2YWxpZCA9IFtdO1xuICAgIGxldCBjaGFuZ2VkTnVtID0gMDtcbiAgICAvLyBjaGFuZ2UgdG8gcmVhbCBudW1iZXJcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZmluZCh7IHJlbGF0aW9uczogWyd1c2VyJ10gfSk7XG4gICAgZm9yIChjb25zdCBwIG9mIGFsbCkge1xuICAgICAgY29uc3QgbnVtYmVyID0gYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLmdldEZ1bGxQaG9uZU51bWJlcihwLnBob25lTnVtYmVyKTtcbiAgICAgIGlmIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciAhPT0gcC5waG9uZU51bWJlcikge1xuICAgICAgICAgIGNoYW5nZWROdW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBwLnBob25lTnVtYmVyID0gbnVtYmVyO1xuICAgICAgICBwLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgICAgdmFsaWQucHVzaChwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvRGVsZXRlLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBUd2lsaW8gY2hhbmdlZCAke2NoYW5nZWROdW19IHBob25lIG51bWJlcnMgdG8gZnVsbCBudW1gKTtcbiAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuc2F2ZSh2YWxpZCk7XG5cbiAgICAvLyBEZWxldGUgYW5kIG1ha2Ugc3VyZSB0byBkaXNhYmxlIHBob25lbm90aWYgZm9yIHVzZXJcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdkZWxldGluZyBwaG9uZSBub3RpZnM6ICcsXG4gICAgICB0b0RlbGV0ZS5tYXAoZCA9PiBkLnBob25lTnVtYmVyKSxcbiAgICApO1xuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFBob25lTm90aWZNb2RlbC5kZWxldGUodG9EZWxldGUubWFwKGQgPT4gZC5pZCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzVG9EaXNhYmxlID0gKFxuICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmQoe1xuICAgICAgICB3aGVyZTogeyBwaG9uZU5vdGlmc0VuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgcmVsYXRpb25zOiBbJ3Bob25lTm90aWYnXSxcbiAgICAgIH0pXG4gICAgKS5maWx0ZXIodSA9PiAhdS5waG9uZU5vdGlmKTtcbiAgICB1c2Vyc1RvRGlzYWJsZS5mb3JFYWNoKHUgPT4gKHUucGhvbmVOb3RpZnNFbmFibGVkID0gZmFsc2UpKTtcblxuICAgIGF3YWl0IFVzZXJNb2RlbC5zYXZlKHVzZXJzVG9EaXNhYmxlKTtcbiAgICBjb25zb2xlLmxvZyhgZGlzYWJsZWQgcGhvbmVub3RpZnMgZm9yICR7dXNlcnNUb0Rpc2FibGUubGVuZ3RofSB1c2Vyc2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBJbmplY3RhYmxlLCBBcmd1bWVudE1ldGFkYXRhIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG4vKipcbiAqIFN0cmlwIHVuZGVmaW5lZCBwcm9wZXJ0aWVzIGZyb20gYm9keS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0cmlwVW5kZWZpbmVkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgbWV0YWRhdGE6IEFyZ3VtZW50TWV0YWRhdGEpOiBhbnkge1xuICAgIGlmIChtZXRhZGF0YS50eXBlID09PSAnYm9keScpIHtcbiAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZCh2YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZHJvcFVuZGVmaW5lZChvYmo6IHVua25vd24pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcgJiYgb2JqW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kcm9wVW5kZWZpbmVkKG9ialtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE5lc3RJbnRlcmNlcHRvcixcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgQ2FsbEhhbmRsZXIsXG4gIEh0dHBFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcG1JbnRlcmNlcHRvciBpbXBsZW1lbnRzIE5lc3RJbnRlcmNlcHRvciB7XG4gIGludGVyY2VwdChcbiAgICBjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0LFxuICAgIG5leHQ6IENhbGxIYW5kbGVyLFxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFeGNlcHRpb24pIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFwbS5jYXB0dXJlRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==