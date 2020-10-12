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
        queue.staffList = [];
        await queue.save();
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
                    exdates.push(oh.exdate[date].toISOString());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGFzdGljLWFwbS1ub2RlL3N0YXJ0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL2NvbmZpZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvdHlwZW9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvc2NoZWR1bGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2UuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXRyYW5zZm9ybWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybVwiIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3QtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcm9sZXMuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9maWxlL3VzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9waG9uZS1ub3RpZi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9jb3Vyc2Utcm9sZXMuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1YXJkcy9yb2xlLmd1YXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsYXN0aWMtYXBtLW5vZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZS9xdWV1ZS1yb2xlLmRlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWUvcXVldWUtcm9sZS5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3NlL3NzZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlL3F1ZXVlLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdXJzZS9pY2FsLmNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWNvbW1hbmRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlL2ljYWwuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWljYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dzLWlhbmEvZGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJydWxlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi1zdWJzY3JpYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2ViLXB1c2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL3R3aWxpby90d2lsaW8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0d2lsaW9cIiIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwLXNpZ25hdHVyZVwiIiwid2VicGFjazovLy8uL3NyYy9ub24tcHJvZHVjdGlvbi5ndWFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luL2xvZ2luLWNvdXJzZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dpbi9qd3Quc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2ZpbGUvcHJvZmlsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLXJvbGUuZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLnN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3QvdXRpbC9mYWN0b3JpZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZW9ybS1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlZWQvc2VlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmVzdGpzLWFkbWluXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NyZWRlbnRpYWxWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9hZG1pbi1lbnRpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vYWRtaW4uY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZS1zeW5jXCIiLCJ3ZWJwYWNrOi8vLy4vb3JtY29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy8uL3NyYy9iYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tmaWxsL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJpcFVuZGVmaW5lZC5waXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcG0uaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFF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LENBQUMsSUFBSSxDQUN2QixzQkFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxLQUFLLFlBQVksc0JBQWEsRUFBRTtnQkFDbEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCWSxjQUFjO0lBRDFCLG1CQUFVLEVBQUU7R0FDQSxjQUFjLENBZ0IxQjtBQWhCWSx3Q0FBYzs7Ozs7OztBQ1ozQiwyQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0ICdlbGFzdGljLWFwbS1ub2RlL3N0YXJ0JztcbmltcG9ydCB7IGJvb3RzdHJhcCB9IGZyb20gJy4vYm9vdHN0cmFwJztcblxuZGVjbGFyZSBjb25zdCBtb2R1bGU6IGFueTtcblxuYm9vdHN0cmFwKG1vZHVsZS5ob3QpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZS9zdGFydFwiKTsiLCJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUGlwZSwgSU5lc3RBcHBsaWNhdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAubW9kdWxlJztcbmltcG9ydCB7IFN0cmlwVW5kZWZpbmVkUGlwZSB9IGZyb20gJy4vc3RyaXBVbmRlZmluZWQucGlwZSc7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBBcG1JbnRlcmNlcHRvciB9IGZyb20gJy4vYXBtLmludGVyY2VwdG9yJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBib290c3RyYXAoaG90OiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlKEFwcE1vZHVsZSwge1xuICAgIGxvZ2dlcjogWydlcnJvcicsICd3YXJuJywgJ2xvZycsICdkZWJ1ZycsICd2ZXJib3NlJ10sXG4gIH0pO1xuICBhZGRHbG9iYWxzVG9BcHAoYXBwKTtcbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpL3YxJyk7XG4gIGFwcC51c2VHbG9iYWxJbnRlcmNlcHRvcnMobmV3IEFwbUludGVyY2VwdG9yKCkpO1xuXG4gIGlmIChpc1Byb2QoKSkge1xuICAgIGNvbnNvbGUubG9nKGBSdW5uaW5nIHByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LmApO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFJ1bm5pbmcgbm9uLXByb2R1Y3Rpb24gYXQgJHtwcm9jZXNzLmVudi5ET01BSU59LiBUSElTIE1TRyBTSE9VTEQgTk9UIEFQUEVBUiBPTiBQUk9EIFZNYCxcbiAgICApO1xuICB9XG4gIGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gIGF3YWl0IGFwcC5saXN0ZW4oMzAwMik7XG5cbiAgaWYgKGhvdCkge1xuICAgIGhvdC5hY2NlcHQoKTtcbiAgICBob3QuZGlzcG9zZSgoKSA9PiBhcHAuY2xvc2UoKSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIHRydWUgaW4gcHJvZCBhbmQgaW4gaW50ZWdyYXRpb24gdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBhZGRHbG9iYWxzVG9BcHAoYXBwOiBJTmVzdEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhcbiAgICBuZXcgVmFsaWRhdGlvblBpcGUoe1xuICAgICAgd2hpdGVsaXN0OiB0cnVlLFxuICAgICAgZm9yYmlkTm9uV2hpdGVsaXN0ZWQ6IHRydWUsXG4gICAgICB0cmFuc2Zvcm06IHRydWUsXG4gICAgfSksXG4gICk7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhuZXcgU3RyaXBVbmRlZmluZWRQaXBlKCkpO1xuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvbW1vblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFNjaGVkdWxlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2R1bGUgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UubW9kdWxlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTG9naW5Nb2R1bGUgfSBmcm9tICcuL2xvZ2luL2xvZ2luLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9maWxlTW9kdWxlIH0gZnJvbSAnLi9wcm9maWxlL3Byb2ZpbGUubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kdWxlIH0gZnJvbSAnLi9xdWVzdGlvbi9xdWVzdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICcuL3F1ZXVlL3F1ZXVlLm1vZHVsZSc7XG5pbXBvcnQgeyBTZWVkTW9kdWxlIH0gZnJvbSAnLi9zZWVkL3NlZWQubW9kdWxlJztcbmltcG9ydCB7IEFkbWluTW9kdWxlIH0gZnJvbSAnLi9hZG1pbi9hZG1pbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbWFuZE1vZHVsZSB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IFNTRU1vZHVsZSB9IGZyb20gJy4vc3NlL3NzZS5tb2R1bGUnO1xuaW1wb3J0ICogYXMgdHlwZW9ybUNvbmZpZyBmcm9tICcuLi9vcm1jb25maWcnO1xuaW1wb3J0IHsgQmFja2ZpbGxNb2R1bGUgfSBmcm9tICdiYWNrZmlsbC9iYWNrZmlsbC5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdCh0eXBlb3JtQ29uZmlnKSxcbiAgICBTY2hlZHVsZU1vZHVsZS5mb3JSb290KCksXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgUHJvZmlsZU1vZHVsZSxcbiAgICBDb3Vyc2VNb2R1bGUsXG4gICAgUXVldWVNb2R1bGUsXG4gICAgTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIFF1ZXN0aW9uTW9kdWxlLFxuICAgIFNlZWRNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZW52RmlsZVBhdGg6IFtcbiAgICAgICAgJy5lbnYnLFxuICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IFsnLmVudi5kZXZlbG9wbWVudCddIDogW10pLFxuICAgICAgXSxcbiAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIENvbW1hbmRNb2R1bGUsXG4gICAgU1NFTW9kdWxlLFxuICAgIEJhY2tmaWxsTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvdHlwZW9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3NjaGVkdWxlXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXJzZUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvdXJzZS5jb250cm9sbGVyJztcbmltcG9ydCB7IFF1ZXVlTW9kdWxlIH0gZnJvbSAnLi4vcXVldWUvcXVldWUubW9kdWxlJztcbmltcG9ydCB7IElDYWxDb21tYW5kIH0gZnJvbSAnLi9pY2FsLmNvbW1hbmQnO1xuaW1wb3J0IHsgSWNhbFNlcnZpY2UgfSBmcm9tICcuL2ljYWwuc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW0NvdXJzZUNvbnRyb2xsZXJdLFxuICBpbXBvcnRzOiBbUXVldWVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtJQ2FsQ29tbWFuZCwgSWNhbFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBEZWxldGUsXG4gIEdldCxcbiAgUGFyYW0sXG4gIFBvc3QsXG4gIFVzZUd1YXJkcyxcbiAgVXNlSW50ZXJjZXB0b3JzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBHZXRDb3Vyc2VSZXNwb25zZSwgUXVldWVQYXJ0aWFsLCBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIGdldFJlcG9zaXRvcnkgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLWNsZWFuL3F1ZXVlLWNsZWFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VSb2xlc0d1YXJkIH0gZnJvbSAnLi9jb3Vyc2Utcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAncXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignY291cnNlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgQ291cnNlUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgQ291cnNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHF1ZXVlQ2xlYW5TZXJ2aWNlOiBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOmlkJylcbiAgQFJvbGVzKFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQsIFJvbGUuVEEpXG4gIGFzeW5jIGdldChAUGFyYW0oJ2lkJykgaWQ6IG51bWJlcik6IFByb21pc2U8R2V0Q291cnNlUmVzcG9uc2U+IHtcbiAgICAvLyBUT0RPOiBmb3IgYWxsIGNvdXJzZSBlbmRwb2ludCwgY2hlY2sgaWYgdGhleSdyZSBhIHN0dWRlbnQgb3IgYSBUQVxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoaWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydxdWV1ZXMnLCAncXVldWVzLnN0YWZmTGlzdCddLFxuICAgIH0pO1xuXG4gICAgLy8gVXNlIHJhdyBxdWVyeSBmb3IgcGVyZm9ybWFuY2UgKGF2b2lkIGVudGl0eSBpbnN0YW50aWF0aW9uIGFuZCBzZXJpYWxpemF0aW9uKVxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IGF3YWl0IGdldFJlcG9zaXRvcnkoT2ZmaWNlSG91ck1vZGVsKVxuICAgICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcignb2gnKVxuICAgICAgLnNlbGVjdChbJ2lkJywgJ3RpdGxlJywgYFwic3RhcnRUaW1lXCJgLCBgXCJlbmRUaW1lXCJgXSlcbiAgICAgIC53aGVyZSgnb2guY291cnNlSWQgPSA6Y291cnNlSWQnLCB7IGNvdXJzZUlkOiBjb3Vyc2UuaWQgfSlcbiAgICAgIC5nZXRSYXdNYW55KCk7XG5cbiAgICBjb3Vyc2UucXVldWVzID0gYXdhaXQgYXN5bmMuZmlsdGVyKFxuICAgICAgY291cnNlLnF1ZXVlcyxcbiAgICAgIGFzeW5jIChxKSA9PiBhd2FpdCBxLmNoZWNrSXNPcGVuKCksXG4gICAgKTtcbiAgICBhd2FpdCBhc3luYy5lYWNoKGNvdXJzZS5xdWV1ZXMsIGFzeW5jIChxKSA9PiB7XG4gICAgICBhd2FpdCBxLmFkZFF1ZXVlVGltZXMoKTtcbiAgICAgIGF3YWl0IHEuYWRkUXVldWVTaXplKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291cnNlO1xuICB9XG5cbiAgQFBvc3QoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tJbihcbiAgICBAUGFyYW0oJ2lkJykgY291cnNlSWQ6IG51bWJlcixcbiAgICBAUGFyYW0oJ3Jvb20nKSByb29tOiBzdHJpbmcsXG4gICAgQFVzZXIoKSB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8UXVldWVQYXJ0aWFsPiB7XG4gICAgbGV0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKFxuICAgICAge1xuICAgICAgICByb29tLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgIH0sXG4gICAgICB7IHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSB9LFxuICAgICk7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICAgIHN0YWZmTGlzdDogW10sXG4gICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgIGFsbG93UXVlc3Rpb25zOiB0cnVlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGlmIChxdWV1ZS5zdGFmZkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWV1ZS5hbGxvd1F1ZXN0aW9ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgcXVldWUuc3RhZmZMaXN0LnB1c2godXNlcik7XG4gICAgYXdhaXQgcXVldWUuc2F2ZSgpO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVNTRVNlcnZpY2UudXBkYXRlUXVldWUocXVldWUuaWQpO1xuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZC90YV9sb2NhdGlvbi86cm9vbScpXG4gIEBSb2xlcyhSb2xlLlBST0ZFU1NPUiwgUm9sZS5UQSlcbiAgYXN5bmMgY2hlY2tPdXQoXG4gICAgQFBhcmFtKCdpZCcpIGNvdXJzZUlkOiBudW1iZXIsXG4gICAgQFBhcmFtKCdyb29tJykgcm9vbTogc3RyaW5nLFxuICAgIEBVc2VyKCkgdXNlcjogVXNlck1vZGVsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShcbiAgICAgIHtcbiAgICAgICAgcm9vbSxcbiAgICAgICAgY291cnNlSWQsXG4gICAgICB9LFxuICAgICAgeyByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10gfSxcbiAgICApO1xuXG4gICAgcXVldWUuc3RhZmZMaXN0ID0gcXVldWUuc3RhZmZMaXN0LmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gdXNlci5pZCk7XG4gICAgaWYgKHF1ZXVlLnN0YWZmTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXVlLmFsbG93UXVlc3Rpb25zID0gZmFsc2U7XG4gICAgfVxuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAvLyBDbGVhbiB1cCBxdWV1ZSBpZiBuZWNlc3NhcnlcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMucXVldWVDbGVhblNlcnZpY2UuY2xlYW5RdWV1ZShxdWV1ZS5pZCk7XG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShxdWV1ZS5pZCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcbmltcG9ydCB7XG4gIElzQm9vbGVhbixcbiAgSXNEZWZpbmVkLFxuICBJc0VudW0sXG4gIElzSW50LFxuICBJc05vdEVtcHR5LFxuICBJc09wdGlvbmFsLFxuICBJc1N0cmluZyxcbiAgVmFsaWRhdGVJZixcbn0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuXG5leHBvcnQgY29uc3QgUFJPRF9VUkwgPSBcImh0dHBzOi8va2hvdXJ5b2ZmaWNlaG91cnMuY29tXCI7XG5leHBvcnQgY29uc3QgaXNQcm9kID0gKCk6IGJvb2xlYW4gPT5cbiAgcHJvY2Vzcy5lbnYuRE9NQUlOID09PSBQUk9EX1VSTCB8fFxuICAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3c/LmxvY2F0aW9uPy5vcmlnaW4gPT09IFBST0RfVVJMKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBJIEJhc2UgRGF0YSBUeXBlcyAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBOT1RFOiBUaGVzZSBhcmUgbm90IHRoZSBEQiBkYXRhIHR5cGVzLiBUaGV5IGFyZSBvbmx5IHVzZWQgZm9yIHRoZSBhcGlcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXNlci5cbiAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgaWQgb2YgdGhlIHVzZXIgaW4gb3VyIGRiLlxuICogQHBhcmFtIGVtYWlsIC0gVGhlIGVtYWlsIHN0cmluZyBvZiB0aGUgdXNlciBpZiB0aGV5IHByb3ZpZGUgaXQgKG51bGxhYmxlKVxuICogQHBhcmFtIG5hbWUgLSBUaGUgZnVsbCBuYW1lIG9mIHRoaXMgdXNlcjogRmlyc3QgTGFzdC5cbiAqIEBwYXJhbSBwaG90b1VSTCAtIFRoZSBVUkwgc3RyaW5nIG9mIHRoaXMgdXNlciBwaG90by4gVGhpcyBpcyBwdWxsZWQgZnJvbSB0aGUgYWRtaW4gc2l0ZVxuICogQHBhcmFtIGNvdXJzZXMgLSBUaGUgbGlzdCBvZiBjb3Vyc2VzIHRoYXQgdGhlIHVzZXIgaXMgYWNjb2NpYXRlZCB3aXRoIChhcyBlaXRoZXIgYSAnc3R1ZGVudCcsICd0YScgb3IgJ3Byb2Zlc3NvcicpXG4gKiBAcGFyYW0gZGVza3RvcE5vdGlmcyAtIGxpc3Qgb2YgZW5kcG9pbnRzIHNvIHRoYXQgZnJvbnRlbmQgY2FuIGZpZ3VyZSBvdXQgaWYgZGV2aWNlIGlzIGVuYWJsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBpZCE6IG51bWJlcjtcbiAgZW1haWwhOiBzdHJpbmc7XG4gIG5hbWUhOiBzdHJpbmc7XG4gIHBob3RvVVJMITogc3RyaW5nO1xuICBjb3Vyc2VzITogVXNlckNvdXJzZVtdO1xuICBkZXNrdG9wTm90aWZzRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGVza3RvcE5vdGlmUGFydGlhbClcbiAgZGVza3RvcE5vdGlmcyE6IERlc2t0b3BOb3RpZlBhcnRpYWxbXTtcblxuICBwaG9uZU5vdGlmc0VuYWJsZWQhOiBib29sZWFuO1xuICBwaG9uZU51bWJlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZlBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgZW5kcG9pbnQhOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGNyZWF0ZWRBdCE6IERhdGU7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIHBhcnRpYWwgdXNlciBpbmZvIG5lZWRlZCBieSB0aGUgZnJvbnRlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZVxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBvZiB0aGUgdXNlciBpbiBvdXIgZGIuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBmdWxsIG5hbWUgb2YgdGhpcyB1c2VyOiBGaXJzdCBMYXN0LlxuICogQHBhcmFtIHBob3RvVVJMIC0gVGhlIFVSTCBzdHJpbmcgb2YgdGhpcyB1c2VyIHBob3RvLiBUaGlzIGlzIHB1bGxlZCBmcm9tIHRoZSBhZG1pbiBzaXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICBlbWFpbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcGhvdG9VUkw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpYWwgY291cnNlIGRhdGEgbmVlZGVkIG9uIHRoZSBmcm9udCBlbmQgd2hlbiBuZXN0ZWQgaW4gYSByZXNwb25zZS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBpZCBudW1iZXIgb2YgdGhpcyBDb3Vyc2UuXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBzdWJqZWN0IGFuZCBjb3Vyc2UgbnVtYmVyIG9mIHRoaXMgY291cnNlLiBFeDogXCJDUyAyNTAwXCJcbiAqL1xuZXhwb3J0IHR5cGUgQ291cnNlUGFydGlhbCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY291cnNlIHRoYXQgYSB1c2VyIGlzIGFjY29jaWF0ZWQgd2l0aCBhbmQgdGhlaXIgcm9sZSBpbiB0aGF0IGNvdXJzZVxuICogQHBhcmFtIGNvdXJzZSAtIFRoZSBjb3Vyc2UgdGhlIHVzZXIgYWNjb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHJvbGUgLSBUaGUgdXNlcidzIHJvbGUgaW4gdGhlIGNvdXJzZS5cbiAqL1xuZXhwb3J0IHR5cGUgVXNlckNvdXJzZSA9IHtcbiAgY291cnNlOiBDb3Vyc2VQYXJ0aWFsO1xuICByb2xlOiBSb2xlO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSB1c2VyIHJvbGVzIGluIGEgY291cnNlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgU1RVREVOVCA9IFwic3R1ZGVudFwiLFxuICBUQSA9IFwidGFcIixcbiAgUFJPRkVTU09SID0gXCJwcm9mZXNzb3JcIixcbn1cblxuY2xhc3MgT2ZmaWNlSG91clBhcnRpYWwge1xuICBpZCE6IG51bWJlcjtcbiAgdGl0bGUhOiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lITogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lITogRGF0ZTtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHRoYXQgc3R1ZGVudHMgY2FuIGpvaW4gd2l0aCB0aGllciB0aWNrZXRzLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgUXVldWUuXG4gKiBAcGFyYW0gY291cnNlIC0gVGhlIGNvdXJzZSB0aGF0IHRoaXMgb2ZmaWNlIGhvdXJzIHF1ZXVlIGlzIGZvci5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBxdWVzdGlvbnMgLSBUaGUgbGlzdCBvZiB0aGUgc3R1ZGVudHMgcXVlc3Rpb25zIGFzc29jYWl0ZWQgd2l0aCB0aGUgcXVldWUuXG4gKiBAcGFyYW0gc3RhcnRUaW1lIC0gVGhlIHNjaGVkdWxlZCBzdGFydCB0aW1lIG9mIHRoaXMgcXVldWUgYmFzZWQgb24gdGhlIHBhcnNlZCBpY2FsLlxuICogQHBhcmFtIGVuZFRpbWUgLSBUaGUgc2NoZWR1bGVkIGVuZCB0aW1lIG9mIHRoaXMgcXVldWUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWUge1xuICBpZDogbnVtYmVyO1xuICBjb3Vyc2U6IENvdXJzZVBhcnRpYWw7XG4gIHJvb206IHN0cmluZztcbiAgc3RhZmZMaXN0OiBVc2VyUGFydGlhbFtdO1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gIHN0YXJ0VGltZT86IERhdGU7XG4gIGVuZFRpbWU/OiBEYXRlO1xuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIFF1ZXVlIHBhcnRpYWwgdG8gYmUgc2hvd24gb24gdGhlIHRvZGF5IHBhZ2UuXG4gKiBAcGFyYW0gaWQgLSBUaGUgdW5pcXVlIGlkIG51bWJlciBmb3IgYSBRdWV1ZS5cbiAqIEBwYXJhbSByb29tIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgYnVpbGRpbmcgKyByb29tICMgdGhhdCB0aGUgY3VycmVudCBvZmZpY2UgaG91cnMgcXVldWUgaXMgaW4uXG4gKiBAcGFyYW0gc3RhZmZMaXN0IC0gVGhlIGxpc3Qgb2YgVEEgdXNlcidzIHRoYXQgYXJlIGN1cnJlbnRseSBoZWxwaW5nIGF0IG9mZmljZSBob3Vycy5cbiAqIEBwYXJhbSBzdGFydFRpbWUgLSBUaGUgc2NoZWR1bGVkIHN0YXJ0IHRpbWUgb2YgdGhpcyBxdWV1ZSBiYXNlZCBvbiB0aGUgcGFyc2VkIGljYWwuXG4gKiBAcGFyYW0gZW5kVGltZSAtIFRoZSBzY2hlZHVsZWQgZW5kIHRpbWUgb2YgdGhpcyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlUGFydGlhbCB7XG4gIGlkITogbnVtYmVyO1xuICByb29tITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IFVzZXJQYXJ0aWFsKVxuICBzdGFmZkxpc3QhOiBVc2VyUGFydGlhbFtdO1xuXG4gIHF1ZXVlU2l6ZSE6IG51bWJlcjtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGlzT3BlbiE6IGJvb2xlYW47XG5cbiAgQFR5cGUoKCkgPT4gRGF0ZSlcbiAgc3RhcnRUaW1lPzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBlbmRUaW1lPzogRGF0ZTtcblxuICBhbGxvd1F1ZXN0aW9ucyE6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBRdWVzdGlvbiBpcyBjcmVhdGVkIHdoZW4gYSBzdHVkZW50IHdhbnRzIGhlbHAgZnJvbSBhIFRBLlxuICogQHBhcmFtIGlkIC0gVGhlIHVuaXF1ZSBpZCBudW1iZXIgZm9yIGEgc3R1ZGVudCBxdWVzdGlvbi5cbiAqIEBwYXJhbSBjcmVhdG9yIC0gVGhlIFN0dWRlbnQgdGhhdCBoYXMgY3JlYXRlZCB0aGUgcXVlc3Rpb24uXG4gKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IGRlc2NyaXRpcG4gb2Ygd2hhdCBoZS9zaGUgbmVlZHMgaGVscCB3aXRoLlxuICogQHBhcmFtIGNyZWF0ZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVGlja2V0IHdhcyBjcmVhdGVkLiBFeDogXCIyMDIwLTA5LTEyVDEyOjAwOjAwLTA0OjAwXCJcbiAqIEBwYXJhbSBoZWxwZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgYmVnYW4gaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBjbG9zZWRBdCAtIFRoZSBkYXRlIHN0cmluZyBmb3IgdGhlIHRpbWUgdGhhdCB0aGUgVEEgZmluaXNoZWQgaGVscGluZyB0aGUgU3R1ZGVudC5cbiAqIEBwYXJhbSBxdWVzdGlvblR5cGUgLSBUaGUgcXVlc3Rpb24gdHlwZSBoZWxwcyBkaXN0aW5ndWlzaCBxdWVzdGlvbiBmb3IgVEEncyBhbmQgZGF0YSBpbnNpZ2h0cy5cbiAqIEBwYXJhbSBzdGF0dXMgLSBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHF1ZXN0aW9uIGluIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoaXMgcXVlc3Rpb24gaW4gdGhlIHF1ZXVlLlxuICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJ0aWN1bGFyIHN0dWRlbnQsIHRvIGhlbHAgVEEncyBmaW5kIHRoZW1cbiAqIEBwYXJhbSBpc09ubGluZSAtIFdldGhlciBvciBub3QgdGhlIHF1ZXN0aW9uIHdpbGwgaGVscGVkIG9ubGluZSBvciBpbi1wZXJzb25cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIHtcbiAgaWQhOiBudW1iZXI7XG5cbiAgQFR5cGUoKCkgPT4gVXNlclBhcnRpYWwpXG4gIGNyZWF0b3IhOiBVc2VyUGFydGlhbDtcbiAgdGV4dD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBVc2VyUGFydGlhbClcbiAgdGFIZWxwZWQ/OiBVc2VyUGFydGlhbDtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjcmVhdGVkQXQhOiBEYXRlO1xuXG4gIEBUeXBlKCgpID0+IERhdGUpXG4gIGhlbHBlZEF0PzogRGF0ZTtcblxuICBAVHlwZSgoKSA9PiBEYXRlKVxuICBjbG9zZWRBdD86IERhdGU7XG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcbiAgc3RhdHVzITogUXVlc3Rpb25TdGF0dXM7XG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuICBpc09ubGluZT86IGJvb2xlYW47XG59XG5cbi8vIFF1ZXN0aW9uIFR5cGVzXG5leHBvcnQgZW51bSBRdWVzdGlvblR5cGUge1xuICBDb25jZXB0ID0gXCJDb25jZXB0XCIsXG4gIENsYXJpZmljYXRpb24gPSBcIkNsYXJpZmljYXRpb25cIixcbiAgVGVzdGluZyA9IFwiVGVzdGluZ1wiLFxuICBCdWcgPSBcIkJ1Z1wiLFxuICBTZXR1cCA9IFwiU2V0dXBcIixcbiAgT3RoZXIgPSBcIk90aGVyXCIsXG59XG5cbmV4cG9ydCBlbnVtIE9wZW5RdWVzdGlvblN0YXR1cyB7XG4gIERyYWZ0aW5nID0gXCJEcmFmdGluZ1wiLFxuICBRdWV1ZWQgPSBcIlF1ZXVlZFwiLFxuICBIZWxwaW5nID0gXCJIZWxwaW5nXCIsXG4gIENhbnRGaW5kID0gXCJDYW50RmluZFwiLFxuICBUQURlbGV0ZWQgPSBcIlRBRGVsZXRlZFwiLFxufVxuXG5leHBvcnQgZW51bSBDbG9zZWRRdWVzdGlvblN0YXR1cyB7XG4gIFJlc29sdmVkID0gXCJSZXNvbHZlZFwiLFxuICBEZWZlcnJlZCA9IFwiRGVmZXJyZWRcIixcbiAgQ29uZmlybWVkRGVsZXRlZCA9IFwiQ29uZmlybWVkRGVsZXRlZFwiLFxuICBTdGFsZSA9IFwiU3RhbGVcIixcbn1cblxuLy8gVGlja2V0IFN0YXR1cyAtIFJlcHJlc2VudHMgYSBnaXZlbiBzdGF0dXMgb2YgYXMgc3R1ZGVudCdzIHRpY2tldFxuZXhwb3J0IHR5cGUgUXVlc3Rpb25TdGF0dXMgPSBrZXlvZiB0eXBlb2YgUXVlc3Rpb25TdGF0dXNLZXlzO1xuLy8gYW4gRW51bS1saWtlIGNvbnN0YW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBzdGF0dXNlcyBmb3IgY29udmVuaWVuY2UuXG5leHBvcnQgY29uc3QgUXVlc3Rpb25TdGF0dXNLZXlzID0ge1xuICAuLi5PcGVuUXVlc3Rpb25TdGF0dXMsXG4gIC4uLkNsb3NlZFF1ZXN0aW9uU3RhdHVzLFxufTtcblxuLyoqXG4gKiBBIFNlbWVzdGVyIG9iamVjdCwgcmVwcmVzZW50aW5nIGEgc2NoZWR1bGUgc2VtZXN0ZXIgdGVybSBmb3IgdGhlIHB1cnBvc2VzIG9mIGEgY291cnNlLlxuICogQHBhcmFtIHNlYXNvbiAtIFRoZSBzZWFzb24gb2YgdGhpcyBzZW1lc3Rlci5cbiAqIEBwYXJhbSB5ZWFyIC0gVGhlIHllYXIgb2YgdGhpcyBzZW1lc3Rlci5cbiAqL1xuaW50ZXJmYWNlIFNlbWVzdGVyIHtcbiAgc2Vhc29uOiBTZWFzb247XG4gIHllYXI6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9uZSBvZiB0aGUgc2Vhc29ucyBpbiB3aGljaCBhIGNvdXJzZSBjYW4gdGFrZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2Vhc29uID0gXCJGYWxsXCIgfCBcIlNwcmluZ1wiIHwgXCJTdW1tZXIgMVwiIHwgXCJTdW1tZXIgMlwiO1xuXG5leHBvcnQgdHlwZSBEZXNrdG9wTm90aWZCb2R5ID0ge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBleHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAga2V5czoge1xuICAgIHAyNTZkaDogc3RyaW5nO1xuICAgIGF1dGg6IHN0cmluZztcbiAgfTtcbiAgbmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFBob25lTm90aWZCb2R5ID0ge1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PSBBUEkgUm91dGUgVHlwZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPbiBiYWNrZW5kLCB2YWxpZGF0ZWQgd2l0aCBodHRwczovL2RvY3MubmVzdGpzLmNvbS90ZWNobmlxdWVzL3ZhbGlkYXRpb25cbi8vIEFQSSByb3V0ZSBQYXJhbXMgYW5kIFJlc3BvbnNlc1xuXG4vLyBPZmZpY2UgSG91cnMgUmVzcG9uc2UgVHlwZXNcbmV4cG9ydCBjbGFzcyBHZXRQcm9maWxlUmVzcG9uc2UgZXh0ZW5kcyBVc2VyIHt9XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlEYXRhUGFyYW1zIHtcbiAgQElzU3RyaW5nKClcbiAgZW1haWwhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgZmlyc3RfbmFtZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBsYXN0X25hbWUhOiBzdHJpbmc7XG5cbiAgQElzSW50KClcbiAgY2FtcHVzITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzU3RyaW5nKClcbiAgcGhvdG9fdXJsITogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGVmaW5lZCgpIC8vIFRPRE86IHVzZSBWYWxpZGF0ZU5lc3RlZCBpbnN0ZWFkLCBmb3Igc29tZSByZWFzb24gaXQncyBjcnVua2VkXG4gIGNvdXJzZXMhOiBLaG91cnlTdHVkZW50Q291cnNlW107XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEZWZpbmVkKCkgLy8gVE9ETzogdXNlIFZhbGlkYXRlTmVzdGVkIGluc3RlYWQsIGZvciBzb21lIHJlYXNvbiBpdCdzIGNydW5rZWRcbiAgdGFfY291cnNlcyE6IEtob3VyeVRBQ291cnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlTdHVkZW50Q291cnNlIHtcbiAgQElzSW50KClcbiAgY3JuITogbnVtYmVyO1xuXG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNCb29sZWFuKClcbiAgYWNjZWxlcmF0ZWQhOiBib29sZWFuO1xuXG4gIEBJc0ludCgpXG4gIHNlY3Rpb24hOiBudW1iZXI7XG5cbiAgQElzU3RyaW5nKClcbiAgc2VtZXN0ZXIhOiBzdHJpbmc7XG5cbiAgQElzU3RyaW5nKClcbiAgdGl0bGUhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBLaG91cnlUQUNvdXJzZSB7XG4gIEBJc1N0cmluZygpXG4gIGNvdXJzZSE6IHN0cmluZztcblxuICBASXNTdHJpbmcoKVxuICBzZW1lc3RlciE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLaG91cnlSZWRpcmVjdFJlc3BvbnNlIHtcbiAgcmVkaXJlY3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVQYXJhbXMge1xuICBASXNCb29sZWFuKClcbiAgQElzT3B0aW9uYWwoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgQElzQm9vbGVhbigpXG4gIEBJc09wdGlvbmFsKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkPzogYm9vbGVhbjtcblxuICBAVmFsaWRhdGVJZigobykgPT4gby5waG9uZU5vdGlmc0VuYWJsZWQpXG4gIEBJc1N0cmluZygpXG4gIEBJc05vdEVtcHR5KClcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3Vyc2VSZXNwb25zZSB7XG4gIGlkITogbnVtYmVyO1xuICBuYW1lITogc3RyaW5nO1xuXG4gIEBUeXBlKCgpID0+IE9mZmljZUhvdXJQYXJ0aWFsKVxuICBvZmZpY2VIb3VycyE6IEFycmF5PE9mZmljZUhvdXJQYXJ0aWFsPjtcblxuICBAVHlwZSgoKSA9PiBRdWV1ZVBhcnRpYWwpXG4gIHF1ZXVlcyE6IFF1ZXVlUGFydGlhbFtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2V0UXVldWVSZXNwb25zZSBleHRlbmRzIFF1ZXVlUGFydGlhbCB7fVxuXG5leHBvcnQgY2xhc3MgR2V0Q291cnNlUXVldWVzUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWV1ZVBhcnRpYWw+IHt9XG5cbmV4cG9ydCBjbGFzcyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UgZXh0ZW5kcyBBcnJheTxRdWVzdGlvbj4ge31cblxuZXhwb3J0IGNsYXNzIEdldFF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25QYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICB0ZXh0ITogc3RyaW5nO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25UeXBlKVxuICBASXNPcHRpb25hbCgpXG4gIHF1ZXN0aW9uVHlwZT86IFF1ZXN0aW9uVHlwZTtcblxuICBASXNJbnQoKVxuICBxdWV1ZUlkITogbnVtYmVyO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBmb3JjZSE6IGJvb2xlYW47XG59XG5leHBvcnQgY2xhc3MgQ3JlYXRlUXVlc3Rpb25SZXNwb25zZSBleHRlbmRzIFF1ZXN0aW9uIHt9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVRdWVzdGlvblBhcmFtcyB7XG4gIEBJc1N0cmluZygpXG4gIEBJc09wdGlvbmFsKClcbiAgdGV4dD86IHN0cmluZztcblxuICBASXNFbnVtKFF1ZXN0aW9uVHlwZSlcbiAgQElzT3B0aW9uYWwoKVxuICBxdWVzdGlvblR5cGU/OiBRdWVzdGlvblR5cGU7XG5cbiAgQElzSW50KClcbiAgQElzT3B0aW9uYWwoKVxuICBxdWV1ZUlkPzogbnVtYmVyO1xuXG4gIEBJc0VudW0oUXVlc3Rpb25TdGF0dXNLZXlzKVxuICBASXNPcHRpb25hbCgpXG4gIHN0YXR1cz86IFF1ZXN0aW9uU3RhdHVzO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBASXNPcHRpb25hbCgpXG4gIGlzT25saW5lPzogYm9vbGVhbjtcblxuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1ZXN0aW9uUmVzcG9uc2UgZXh0ZW5kcyBRdWVzdGlvbiB7fVxuXG5leHBvcnQgdHlwZSBUQVVwZGF0ZVN0YXR1c1Jlc3BvbnNlID0gUXVldWVQYXJ0aWFsO1xuZXhwb3J0IHR5cGUgUXVldWVOb3RlUGF5bG9hZFR5cGUgPSB7XG4gIG5vdGVzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlUXVldWVQYXJhbXMge1xuICBASXNTdHJpbmcoKVxuICBASXNPcHRpb25hbCgpXG4gIG5vdGVzPzogc3RyaW5nO1xuXG4gIEBJc0Jvb2xlYW4oKVxuICBhbGxvd1F1ZXN0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTU0VRdWV1ZVJlc3BvbnNlIHtcbiAgcXVldWU/OiBHZXRRdWV1ZVJlc3BvbnNlO1xuICBxdWVzdGlvbnM/OiBMaXN0UXVlc3Rpb25zUmVzcG9uc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvQm9keSB7XG4gIFRvQ291bnRyeTogc3RyaW5nO1xuICBUb1N0YXRlOiBzdHJpbmc7XG4gIFNtc01lc3NhZ2VTaWQ6IHN0cmluZztcbiAgTnVtTWVkaWE6IHN0cmluZztcbiAgVG9DaXR5OiBzdHJpbmc7XG4gIEZyb21aaXA6IHN0cmluZztcbiAgU21zU2lkOiBzdHJpbmc7XG4gIEZyb21TdGF0ZTogc3RyaW5nO1xuICBTbXNTdGF0dXM6IHN0cmluZztcbiAgRnJvbUNpdHk6IHN0cmluZztcbiAgQm9keTogc3RyaW5nO1xuICBGcm9tQ291bnRyeTogc3RyaW5nO1xuICBUbzogc3RyaW5nO1xuICBUb1ppcDogc3RyaW5nO1xuICBOdW1TZWdtZW50czogc3RyaW5nO1xuICBNZXNzYWdlU2lkOiBzdHJpbmc7XG4gIEFjY291bnRTaWQ6IHN0cmluZztcbiAgRnJvbTogc3RyaW5nO1xuICBBcGlWZXJzaW9uOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy10cmFuc2Zvcm1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhHdWFyZCBleHRlbmRzIEF1dGhHdWFyZCgnand0Jykge31cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvcGFzc3BvcnRcIik7IiwiaW1wb3J0IHsgU2V0TWV0YWRhdGEsIEN1c3RvbURlY29yYXRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFJvbGVzID0gKC4uLnJvbGVzOiBzdHJpbmdbXSk6IEN1c3RvbURlY29yYXRvcjxzdHJpbmc+ID0+XG4gIFNldE1ldGFkYXRhKCdyb2xlcycsIHJvbGVzKTtcbiIsImltcG9ydCB7IGNyZWF0ZVBhcmFtRGVjb3JhdG9yLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gY3JlYXRlUGFyYW1EZWNvcmF0b3I8c3RyaW5nW10+KFxuICBhc3luYyAocmVsYXRpb25zOiBzdHJpbmdbXSwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHsgcmVsYXRpb25zIH0pO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IFVzZXJJZCA9IGNyZWF0ZVBhcmFtRGVjb3JhdG9yKFxuICAoZGF0YTogdW5rbm93biwgY3R4OiBFeGVjdXRpb25Db250ZXh0KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIE51bWJlcihyZXF1ZXN0LnVzZXIudXNlcklkKTtcbiAgfSxcbik7XG4iLCJpbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIE1hbnlUb01hbnksXG4gIE9uZVRvTWFueSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgT25lVG9PbmUsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuLi9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4vdXNlci1jb3Vyc2UuZW50aXR5JztcblxuQEVudGl0eSgndXNlcl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgVXNlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgZW1haWw6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBwaG90b1VSTDogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFVzZXJDb3Vyc2VNb2RlbCwgKHVjbSkgPT4gdWNtLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgY291cnNlczogVXNlckNvdXJzZU1vZGVsW107XG5cbiAgQENvbHVtbih7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSlcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzRW5hYmxlZDogYm9vbGVhbjsgLy8gRG9lcyB1c2VyIHdhbnQgbm90aWZpY2F0aW9ucyBzZW50IHRvIHRoZWlyIGRlc2t0b3BzP1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0pXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZnNFbmFibGVkOiBib29sZWFuOyAvLyBEb2VzIHVzZXIgd2FudCBub3RpZmljYXRpb25zIHNlbnQgdG8gdGhlaXIgcGhvbmU/XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gRGVza3RvcE5vdGlmTW9kZWwsIChub3RpZikgPT4gbm90aWYudXNlcilcbiAgQEV4Y2x1ZGUoKVxuICBkZXNrdG9wTm90aWZzOiBEZXNrdG9wTm90aWZNb2RlbFtdO1xuXG4gIEBPbmVUb09uZSgodHlwZSkgPT4gUGhvbmVOb3RpZk1vZGVsLCAobm90aWYpID0+IG5vdGlmLnVzZXIpXG4gIEBFeGNsdWRlKClcbiAgcGhvbmVOb3RpZjogUGhvbmVOb3RpZk1vZGVsO1xuXG4gIEBFeGNsdWRlKClcbiAgQE1hbnlUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxdWV1ZSkgPT4gcXVldWUuc3RhZmZMaXN0KVxuICBxdWV1ZXM6IFF1ZXVlTW9kZWxbXTtcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG4gIENyZWF0ZURhdGVDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ2Rlc2t0b3Bfbm90aWZfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIERlc2t0b3BOb3RpZk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZXhwaXJhdGlvblRpbWU6IERhdGU7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHAyNTZkaDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oJ3RleHQnKVxuICBhdXRoOiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5kZXNrdG9wTm90aWZzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd1c2VySWQnIH0pXG4gIHVzZXI6IFVzZXJNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdXNlcklkOiBudW1iZXI7XG5cbiAgQENyZWF0ZURhdGVDb2x1bW4oeyB0eXBlOiAndGltZXN0YW1wJyB9KVxuICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgQENvbHVtbih7IHR5cGU6ICd0ZXh0JywgbnVsbGFibGU6IHRydWUgfSlcbiAgbmFtZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgQmFzZUVudGl0eSxcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIE9uZVRvT25lLFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ARW50aXR5KCdwaG9uZV9ub3RpZl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUGhvbmVOb3RpZk1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcGhvbmVOdW1iZXI6IHN0cmluZztcblxuICBAT25lVG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIucGhvbmVOb3RpZilcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oKVxuICB2ZXJpZmllZDogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7IE9wZW5RdWVzdGlvblN0YXR1cyB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBCYXNlRW50aXR5LFxuICBDb2x1bW4sXG4gIEVudGl0eSxcbiAgSm9pbkNvbHVtbixcbiAgSm9pblRhYmxlLFxuICBMZXNzVGhhbk9yRXF1YWwsXG4gIE1hbnlUb01hbnksXG4gIE1hbnlUb09uZSxcbiAgTW9yZVRoYW5PckVxdWFsLFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2Uvb2ZmaWNlLWhvdXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5cbmludGVyZmFjZSBUaW1lSW50ZXJ2YWwge1xuICBzdGFydFRpbWU6IERhdGU7XG4gIGVuZFRpbWU6IERhdGU7XG59XG5cbkBFbnRpdHkoJ3F1ZXVlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBRdWV1ZU1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnF1ZXVlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY291cnNlSWQnIH0pXG4gIGNvdXJzZTogQ291cnNlTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY291cnNlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgcm9vbTogc3RyaW5nO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXN0aW9uTW9kZWwsIChxbSkgPT4gcW0ucXVldWUpXG4gIEBFeGNsdWRlKClcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbk1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgbm90ZXM6IHN0cmluZztcblxuICBATWFueVRvTWFueSgodHlwZSkgPT4gVXNlck1vZGVsLCAodXNlcikgPT4gdXNlci5xdWV1ZXMpXG4gIEBKb2luVGFibGUoKVxuICBzdGFmZkxpc3Q6IFVzZXJNb2RlbFtdO1xuXG4gIEBDb2x1bW4oeyBkZWZhdWx0OiBmYWxzZSB9KVxuICBhbGxvd1F1ZXN0aW9uczogYm9vbGVhbjtcblxuICBARXhjbHVkZSgpXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IE9mZmljZUhvdXJNb2RlbCwgKG9oKSA9PiBvaC5xdWV1ZSlcbiAgQEpvaW5UYWJsZSgpXG4gIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXTtcblxuICBzdGFydFRpbWU6IERhdGU7XG4gIGVuZFRpbWU6IERhdGU7XG5cbiAgaXNPcGVuOiBib29sZWFuO1xuXG4gIGFzeW5jIGNoZWNrSXNPcGVuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLnN0YWZmTGlzdCAmJiB0aGlzLnN0YWZmTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBNU19JTl9NSU5VVEUgPSA2MDAwMDtcbiAgICBjb25zdCBvaHMgPSBhd2FpdCB0aGlzLmdldE9mZmljZUhvdXJzKCk7XG4gICAgY29uc3Qgb3BlbiA9ICEhb2hzLmZpbmQoXG4gICAgICAoZSkgPT5cbiAgICAgICAgZS5zdGFydFRpbWUuZ2V0VGltZSgpIC0gMTAgKiBNU19JTl9NSU5VVEUgPCBub3cuZ2V0VGltZSgpICYmXG4gICAgICAgIGUuZW5kVGltZS5nZXRUaW1lKCkgKyAxICogTVNfSU5fTUlOVVRFID4gbm93LmdldFRpbWUoKSxcbiAgICApO1xuICAgIHRoaXMuaXNPcGVuID0gb3BlbjtcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHF1ZXVlU2l6ZTogbnVtYmVyO1xuXG4gIGFzeW5jIGFkZFF1ZXVlU2l6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnF1ZXVlU2l6ZSA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwub3BlbkluUXVldWUodGhpcy5pZClcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4ub3BlblN0YXR1cyknLCB7XG4gICAgICAgIG9wZW5TdGF0dXM6IFtPcGVuUXVlc3Rpb25TdGF0dXMuRHJhZnRpbmcsIE9wZW5RdWVzdGlvblN0YXR1cy5RdWV1ZWRdLFxuICAgICAgfSlcbiAgICAgIC5nZXRDb3VudCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFF1ZXVlVGltZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgdGhpcy5nZXRPZmZpY2VIb3VycygpO1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHMgPSB0aGlzLmdlbmVyYXRlTWVyZ2VkVGltZUludGVydmFscyhvZmZpY2VIb3Vycyk7XG4gICAgY29uc3QgY3VyclRpbWUgPSB0aW1lSW50ZXJ2YWxzLmZpbmQoKGdyb3VwKSA9PiB7XG4gICAgICAvLyBGaW5kIGEgdGltZSBpbnRlcnZhbCB3aXRoaW4gMTUgbWludXRlcyBvZiBib3VuZHMgdG8gYWNjb3VudCBmb3IgVEEgZWRnZSBjYXNlc1xuICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IGdyb3VwLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSAxNSAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHVwcGVyQm91bmQgPSBncm91cC5lbmRUaW1lLmdldFRpbWUoKSArIDE1ICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIGxvd2VyQm91bmQgPD0gbm93LmdldFRpbWUoKSAmJiB1cHBlckJvdW5kID49IG5vdy5nZXRUaW1lKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY3VyclRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gY3VyclRpbWUuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gY3VyclRpbWUuZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXQgT2ZmaWNlIGhvdXJzIGluIGEgNzJociB3aW5kb3cgYXJvdW5kIG5vdywgc25hcHBlZCB0byBtaWRuaWdodFxuICBwcml2YXRlIGFzeW5jIGdldE9mZmljZUhvdXJzKCk6IFByb21pc2U8T2ZmaWNlSG91ck1vZGVsW10+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgbG93ZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcbiAgICBsb3dlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdXBwZXJCb3VuZC5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDI0KTtcbiAgICB1cHBlckJvdW5kLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5maW5kKHtcbiAgICAgIHdoZXJlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBxdWV1ZUlkOiB0aGlzLmlkLFxuICAgICAgICAgIHN0YXJ0VGltZTogTW9yZVRoYW5PckVxdWFsKGxvd2VyQm91bmQpLFxuICAgICAgICAgIGVuZFRpbWU6IExlc3NUaGFuT3JFcXVhbCh1cHBlckJvdW5kKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBvcmRlcjoge1xuICAgICAgICBzdGFydFRpbWU6ICdBU0MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVNZXJnZWRUaW1lSW50ZXJ2YWxzKFxuICAgIG9mZmljZUhvdXJzOiBPZmZpY2VIb3VyTW9kZWxbXSxcbiAgKTogVGltZUludGVydmFsW10ge1xuICAgIGNvbnN0IHRpbWVJbnRlcnZhbHM6IFRpbWVJbnRlcnZhbFtdID0gW107XG4gICAgb2ZmaWNlSG91cnMuZm9yRWFjaCgob2ZmaWNlSG91cikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW50ZXJ2YWxzLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgIG9mZmljZUhvdXIuc3RhcnRUaW1lID4gdGltZUludGVydmFsc1t0aW1lSW50ZXJ2YWxzLmxlbmd0aCAtIDFdLmVuZFRpbWVcbiAgICAgICkge1xuICAgICAgICB0aW1lSW50ZXJ2YWxzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0VGltZTogb2ZmaWNlSG91ci5zdGFydFRpbWUsXG4gICAgICAgICAgZW5kVGltZTogb2ZmaWNlSG91ci5lbmRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2R3JvdXAgPSB0aW1lSW50ZXJ2YWxzW3RpbWVJbnRlcnZhbHMubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2R3JvdXAuZW5kVGltZSA9XG4gICAgICAgIG9mZmljZUhvdXIuZW5kVGltZSA+IHByZXZHcm91cC5lbmRUaW1lXG4gICAgICAgICAgPyBvZmZpY2VIb3VyLmVuZFRpbWVcbiAgICAgICAgICA6IHByZXZHcm91cC5lbmRUaW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRpbWVJbnRlcnZhbHM7XG4gIH1cblxuICAvLyBUT0RPOiBldmVudHVhbGx5IGZpZ3VyZSBvdXQgaG93IHN0YWZmIGdldCBzZW50IHRvIEZFIGFzIHdlbGxcbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBPbmVUb01hbnksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci1jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IFNlbWVzdGVyTW9kZWwgfSBmcm9tICcuL3NlbWVzdGVyLmVudGl0eSc7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb3Vyc2UgaW4gdGhlIGNvbnRleHQgb2Ygb2ZmaWNlIGhvdXJzLlxuICogQHBhcmFtIGlkIC0gVGhlIGlkIG51bWJlciBvZiB0aGlzIENvdXJzZS5cbiAqIEBwYXJhbSBuYW1lIC0gVGhlIHN1YmplY3QgYW5kIGNvdXJzZSBudW1iZXIgb2YgdGhpcyBjb3Vyc2UuIEV4OiBcIkNTIDI1MDBcIlxuICogQHBhcmFtIHNlbWVzdGVyIC0gVGhlIHNlbWVzdGVyIG9mIHRoaXMgY291cnNlLlxuICovXG4vKmludGVyZmFjZSBDb3Vyc2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNlbWVzdGVyOiBTZW1lc3RlcjtcbiAgICB1c2VyczogVXNlckNvdXJzZVtdXG59Ki9cblxuQEVudGl0eSgnY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE9uZVRvTWFueSgodHlwZSkgPT4gT2ZmaWNlSG91ck1vZGVsLCAob2gpID0+IG9oLmNvdXJzZSlcbiAgb2ZmaWNlSG91cnM6IE9mZmljZUhvdXJNb2RlbFtdO1xuXG4gIEBPbmVUb01hbnkoKHR5cGUpID0+IFF1ZXVlTW9kZWwsIChxKSA9PiBxLmNvdXJzZSlcbiAgcXVldWVzOiBRdWV1ZU1vZGVsW107XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKCd0ZXh0JywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGljYWxVUkw6IHN0cmluZztcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBVc2VyQ291cnNlTW9kZWwsICh1Y20pID0+IHVjbS5jb3Vyc2UpXG4gIEBFeGNsdWRlKClcbiAgdXNlckNvdXJzZXM6IFVzZXJDb3Vyc2VNb2RlbDtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBTZW1lc3Rlck1vZGVsLCAoc2VtZXN0ZXIpID0+IHNlbWVzdGVyLmNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ3NlbWVzdGVySWQnIH0pXG4gIEBFeGNsdWRlKClcbiAgc2VtZXN0ZXI6IFNlbWVzdGVyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgLy8gVE9ETzogY2FuIHdlIG1ha2UgdGhlc2Ugbm90IG51bGxhYmxlIGFuZCB3b3JrIHdpdGggVHlwZU9STVxuICBzZW1lc3RlcklkOiBudW1iZXI7XG5cbiAgQENvbHVtbignYm9vbGVhbicsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgZW5hYmxlZDogYm9vbGVhbjsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIGdpdmVuIHRoZSBjb3Vyc2UgaXMgdXNpbmcgb3VyIGFwcFxufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcbiAgT25lVG9NYW55LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IEV4Y2x1ZGUsIEV4cG9zZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdvZmZpY2VfaG91cicpXG5leHBvcnQgY2xhc3MgT2ZmaWNlSG91ck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLm9mZmljZUhvdXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgQEV4Y2x1ZGUoKVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIGNvdXJzZUlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHF1ZXVlKSA9PiBxdWV1ZS5vZmZpY2VIb3Vycywge1xuICAgIGVhZ2VyOiB0cnVlLFxuICB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGl0bGU6IHN0cmluZztcblxuICBAQ29sdW1uKClcbiAgc3RhcnRUaW1lOiBEYXRlO1xuXG4gIEBDb2x1bW4oKVxuICBlbmRUaW1lOiBEYXRlO1xuXG4gIEBFeHBvc2UoKVxuICBnZXQgcm9vbSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlPy5yb29tO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQmFzZUVudGl0eSxcbiAgTWFueVRvT25lLFxuICBKb2luQ29sdW1uLFxuICBPbmVUb01hbnksXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi91c2VyLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3VzZXJfY291cnNlX21vZGVsJylcbmV4cG9ydCBjbGFzcyBVc2VyQ291cnNlTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbCwgKHVzZXIpID0+IHVzZXIuY291cnNlcylcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAndXNlcklkJyB9KVxuICB1c2VyOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIHVzZXJJZDogbnVtYmVyO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsLCAoY291cnNlKSA9PiBjb3Vyc2UudXNlckNvdXJzZXMpXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogJ2NvdXJzZUlkJyB9KVxuICBjb3Vyc2U6IENvdXJzZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBjb3Vyc2VJZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oeyB0eXBlOiAnZW51bScsIGVudW06IFJvbGUsIGRlZmF1bHQ6IFJvbGUuU1RVREVOVCB9KVxuICByb2xlOiBSb2xlO1xufVxuIiwiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBDb2x1bW4sXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIEJhc2VFbnRpdHksXG4gIE9uZVRvTWFueSxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBTZWFzb24gfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3NlbWVzdGVyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBTZW1lc3Rlck1vZGVsIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgc2Vhc29uOiBTZWFzb247XG5cbiAgQENvbHVtbigpXG4gIHllYXI6IG51bWJlcjtcblxuICBAT25lVG9NYW55KCh0eXBlKSA9PiBDb3Vyc2VNb2RlbCwgKGNvdXJzZSkgPT4gY291cnNlLnNlbWVzdGVyKVxuICBjb3Vyc2VzOiBDb3Vyc2VNb2RlbFtdO1xufVxuIiwiaW1wb3J0IHsgT3BlblF1ZXN0aW9uU3RhdHVzLCBRdWVzdGlvblN0YXR1cywgUXVlc3Rpb25UeXBlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIEJhc2VFbnRpdHksXG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBKb2luQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFNlbGVjdFF1ZXJ5QnVpbGRlcixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuXG5ARW50aXR5KCdxdWVzdGlvbl9tb2RlbCcpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Nb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gUXVldWVNb2RlbCwgKHEpID0+IHEucXVlc3Rpb25zKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdxdWV1ZUlkJyB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlOiBRdWV1ZU1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKCd0ZXh0JylcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IFVzZXJNb2RlbClcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiAnY3JlYXRvcklkJyB9KVxuICBjcmVhdG9yOiBVc2VyTW9kZWw7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIEBFeGNsdWRlKClcbiAgY3JlYXRvcklkOiBudW1iZXI7XG5cbiAgQE1hbnlUb09uZSgodHlwZSkgPT4gVXNlck1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICd0YUhlbHBlZElkJyB9KVxuICB0YUhlbHBlZDogVXNlck1vZGVsO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBARXhjbHVkZSgpXG4gIHRhSGVscGVkSWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKClcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBoZWxwZWRBdDogRGF0ZTtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY2xvc2VkQXQ6IERhdGU7XG5cbiAgQENvbHVtbigndGV4dCcsIHsgbnVsbGFibGU6IHRydWUgfSlcbiAgcXVlc3Rpb25UeXBlOiBRdWVzdGlvblR5cGU7XG5cbiAgQENvbHVtbigndGV4dCcpXG4gIHN0YXR1czogUXVlc3Rpb25TdGF0dXM7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGxvY2F0aW9uOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGlzT25saW5lOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTY29wZXNcbiAgICovXG4gIHN0YXRpYyBvcGVuSW5RdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBTZWxlY3RRdWVyeUJ1aWxkZXI8UXVlc3Rpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncXVlc3Rpb24nKVxuICAgICAgLndoZXJlKCdxdWVzdGlvbi5xdWV1ZUlkID0gOnF1ZXVlSWQnLCB7IHF1ZXVlSWQgfSlcbiAgICAgIC5hbmRXaGVyZSgncXVlc3Rpb24uc3RhdHVzIElOICg6Li4uc3RhdHVzZXMpJywge1xuICAgICAgICBzdGF0dXNlczogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5vcmRlckJ5KCdxdWVzdGlvbi5jcmVhdGVkQXQnLCAnQVNDJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb3NlZFF1ZXN0aW9uU3RhdHVzLCBPcGVuUXVlc3Rpb25TdGF0dXMgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiwgQ3JvbkV4cHJlc3Npb24gfSBmcm9tICdAbmVzdGpzL3NjaGVkdWxlJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9xdWVzdGlvbi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlLmVudGl0eSc7XG5cbi8qKlxuICogQ2xlYW4gdGhlIHF1ZXVlIGFuZCBtYXJrIHN0YWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZUNsZWFuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBAQ3JvbihDcm9uRXhwcmVzc2lvbi5FVkVSWV9EQVlfQVRfTUlETklHSFQpXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5BbGxRdWV1ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWVzV2l0aE9wZW5RdWVzdGlvbnM6IFF1ZXVlTW9kZWxbXSA9IGF3YWl0IFF1ZXVlTW9kZWwuZ2V0UmVwb3NpdG9yeSgpXG4gICAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKCdxdWV1ZScpXG4gICAgICAubGVmdEpvaW5BbmRTZWxlY3QoJ3F1ZXVlX21vZGVsLnF1ZXN0aW9ucycsICdxdWVzdGlvbicpXG4gICAgICAud2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLnN0YXR1cyknLCB7XG4gICAgICAgIHN0YXR1czogT2JqZWN0LnZhbHVlcyhPcGVuUXVlc3Rpb25TdGF0dXMpLFxuICAgICAgfSlcbiAgICAgIC5nZXRNYW55KCk7XG5cbiAgICBxdWV1ZXNXaXRoT3BlblF1ZXN0aW9ucy5mb3JFYWNoKChxdWV1ZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhblF1ZXVlKHF1ZXVlLmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbGVhblF1ZXVlKHF1ZXVlSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHF1ZXVlSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIHF1ZXVlLnN0YWZmTGlzdCA9IFtdO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTsgLy8gVE9ETzogc29tZWhvdyBrZWVwIHRyYWNrIG9mIHRoaXMgaW4gdGhlIGZ1dHVyZSBhbmQgdGVsbCB0aGUgVEFzXG5cbiAgICBpZiAoIShhd2FpdCBxdWV1ZS5jaGVja0lzT3BlbigpKSkge1xuICAgICAgcXVldWUubm90ZXMgPSAnJztcbiAgICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICAgIGF3YWl0IHRoaXMudW5zYWZlQ2xlYW4ocXVldWUuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdW5zYWZlQ2xlYW4ocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShxdWV1ZUlkKS5nZXRNYW55KCk7XG4gICAgY29uc3Qgb3BlblF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICAocSkgPT4gcS5zdGF0dXMgaW4gT3BlblF1ZXN0aW9uU3RhdHVzLFxuICAgICk7XG5cbiAgICBvcGVuUXVlc3Rpb25zLmZvckVhY2goKHE6IFF1ZXN0aW9uTW9kZWwpID0+IHtcbiAgICAgIHEuc3RhdHVzID0gQ2xvc2VkUXVlc3Rpb25TdGF0dXMuU3RhbGU7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbk1vZGVsLnNhdmUob3BlblF1ZXN0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXJzZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIHJldHVybiB7IGNvdXJzZUlkLCB1c2VyIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIENhbkFjdGl2YXRlLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZsZWN0b3IgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZXNHdWFyZCB7XG4gIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIG1hdGNoUm9sZXMocm9sZXM6IHN0cmluZ1tdLCB1c2VyOiBVc2VyTW9kZWwsIGNvdXJzZUlkOiBudW1iZXIpOiBib29sZWFuO1xuXG4gIHNldHVwRGF0YShyZXF1ZXN0OiBhbnkpOiBQcm9taXNlPHsgY291cnNlSWQ6IG51bWJlcjsgdXNlcjogVXNlck1vZGVsIH0+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWZsZWN0b3I6IFJlZmxlY3Rvcikge31cblxuICBhc3luYyBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLnJlZmxlY3Rvci5nZXQ8c3RyaW5nW10+KCdyb2xlcycsIGNvbnRleHQuZ2V0SGFuZGxlcigpKTtcbiAgICBpZiAoIXJvbGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IGNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHsgY291cnNlSWQsIHVzZXIgfSA9IGF3YWl0IHRoaXMuc2V0dXBEYXRhKHJlcXVlc3QpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdNdXN0IGJlIGxvZ2dlZCBpbicpO1xuICAgIH1cblxuICAgIGlmICghY291cnNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignTm8gY291cnNlaWQgZm91bmQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXRjaFJvbGVzKHJvbGVzLCB1c2VyLCBjb3Vyc2VJZCk7XG4gIH1cblxuICBtYXRjaFJvbGVzKHJvbGVzOiBzdHJpbmdbXSwgdXNlcjogVXNlck1vZGVsLCBjb3Vyc2VJZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcblxuICAgIGlmICghdXNlckNvdXJzZSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgaXNuJ3QgaW4gdGhpcyBjb3Vyc2UsIHdlIHNob3VsZG4ndCBsZWFrIHRoYXQgdGhlIGNvdXJzZSBldmVudCBleGlzdHNcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignbm8gdXNlciBjb3Vyc2UnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1haW5pbmcgPSByb2xlcy5maWx0ZXIoKHJvbGUpID0+IHtcbiAgICAgIHJldHVybiB1c2VyQ291cnNlLnJvbGUudG9TdHJpbmcoKSA9PT0gcm9sZTtcbiAgICB9KTtcblxuICAgIGlmIChyZW1haW5pbmcubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIGBZb3UgbXVzdCBoYXZlIG9uZSBvZiByb2xlcyBbJHtyb2xlcy5qb2luKFxuICAgICAgICAgICcsICcsXG4gICAgICAgICl9XSB0byBhY2Nlc3MgdGhpcyBjb3Vyc2VgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtYWluaW5nLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnc3NlL3NzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXVlU2VydmljZSB9IGZyb20gJy4vcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUm9sZSwgU1NFUXVldWVSZXNwb25zZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcblxudHlwZSBRdWV1ZUNsaWVudE1ldGFkYXRhID0geyB1c2VySWQ6IG51bWJlcjsgcm9sZTogUm9sZSB9O1xuXG5jb25zdCBpZFRvUm9vbSA9IChxdWV1ZUlkOiBudW1iZXIpID0+IGBxLSR7cXVldWVJZH1gO1xuLyoqXG4gKiBIYW5kbGUgc2VuZGluZyBxdWV1ZSBzc2UgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVNTRVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3NlU2VydmljZTogU1NFU2VydmljZTxRdWV1ZUNsaWVudE1ldGFkYXRhPixcbiAgKSB7fVxuXG4gIHN1YnNjcmliZUNsaWVudChcbiAgICBxdWV1ZUlkOiBudW1iZXIsXG4gICAgcmVzOiBSZXNwb25zZSxcbiAgICBtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnN1YnNjcmliZUNsaWVudChpZFRvUm9vbShxdWV1ZUlkKSwgeyByZXMsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLy8gU2VuZCBldmVudCB3aXRoIG5ldyBxdWVzdGlvbnMsIGJ1dCBubyBtb3JlIHRoYW4gb25jZSBhIHNlY29uZFxuICB1cGRhdGVRdWVzdGlvbnMgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgdGhpcy5xdWV1ZVNlcnZpY2UuZ2V0UXVlc3Rpb25zKHF1ZXVlSWQpO1xuICAgIGlmIChxdWVzdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCAoeyByb2xlLCB1c2VySWQgfSkgPT4gKHtcbiAgICAgICAgcXVlc3Rpb25zOiB0aGlzLnF1ZXVlU2VydmljZS5hbm9ueW1pemVRdWVzdGlvbnMoXG4gICAgICAgICAgcXVlc3Rpb25zLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByb2xlLFxuICAgICAgICApLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlUXVldWUgPSB0aGlzLnRocm90dGxlVXBkYXRlKGFzeW5jIChxdWV1ZUlkKSA9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCB0aGlzLnF1ZXVlU2VydmljZS5nZXRRdWV1ZShxdWV1ZUlkKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgIHRoaXMuc2VuZFRvUm9vbShxdWV1ZUlkLCAoKSA9PiAoeyBxdWV1ZSB9KSk7XG4gICAgfVxuICB9KTtcblxuICBwcml2YXRlIHNlbmRUb1Jvb20oXG4gICAgcXVldWVJZDogbnVtYmVyLFxuICAgIGRhdGE6IChtZXRhZGF0YTogUXVldWVDbGllbnRNZXRhZGF0YSkgPT4gU1NFUXVldWVSZXNwb25zZSxcbiAgKSB7XG4gICAgdGhpcy5zc2VTZXJ2aWNlLnNlbmRFdmVudChpZFRvUm9vbShxdWV1ZUlkKSwgZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlVXBkYXRlKHVwZGF0ZUZ1bmN0aW9uOiAocXVldWVJZDogbnVtYmVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgcmV0dXJuIHRocm90dGxlKFxuICAgICAgYXN5bmMgKHF1ZXVlSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUZ1bmN0aW9uKHF1ZXVlSWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSxcbiAgICAgIDEwMDAsXG4gICAgICB7XG4gICAgICAgIGxlYWRpbmc6IGZhbHNlLFxuICAgICAgICB0cmFpbGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgKiBhcyBhcG0gZnJvbSAnZWxhc3RpYy1hcG0tbm9kZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50PFQ+IHtcbiAgbWV0YWRhdGE6IFQ7XG4gIHJlczogUmVzcG9uc2U7XG59XG4vKipcbiAqIFQgaXMgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIGVhY2ggQ2xpZW50XG4gKlxuICogTG93IGxldmVsIGFic3RyYWN0aW9uIGZvciBzZW5kaW5nIFNTRSB0byBcInJvb21zXCIgb2YgY2xpZW50cy5cbiAqIFByb2JhYmx5IGRvbid0IHVzZSB0aGlzIGRpcmVjdGx5LCBhbmQgd3JhcCBpdCBpbiBhIHNlcnZpY2Ugc3BlY2lmaWMgdG8gdGhhdCBldmVudCBzb3VyY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNTRVNlcnZpY2U8VD4ge1xuICBwcml2YXRlIGNsaWVudHM6IFJlY29yZDxhbnksIENsaWVudDxUPltdPiA9IHt9O1xuXG4gIC8qKiBBZGQgYSBjbGllbnQgdG8gYSByb29tICovXG4gIHN1YnNjcmliZUNsaWVudChyb29tOiBzdHJpbmcsIGNsaWVudDogQ2xpZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gS2VlcCB0cmFjayBvZiByZXNwb25zZXMgc28gd2UgY2FuIHNlbmQgc3NlIHRocm91Z2ggdGhlbVxuICAgIGlmICghKHJvb20gaW4gdGhpcy5jbGllbnRzKSkge1xuICAgICAgdGhpcy5jbGllbnRzW3Jvb21dID0gW107XG4gICAgfVxuICAgIGNvbnN0IHJvb21yZWYgPSB0aGlzLmNsaWVudHNbcm9vbV07XG4gICAgcm9vbXJlZi5wdXNoKGNsaWVudCk7XG5cbiAgICAvLyBSZW1vdmUgZGVhZCBjb25uZWN0aW9ucyFcbiAgICBjbGllbnQucmVzLnNvY2tldC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgcm9vbXJlZi5zcGxpY2Uocm9vbXJlZi5pbmRleE9mKGNsaWVudCksIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNlbmQgc29tZSBkYXRhIHRvIGV2ZXJ5b25lIGluIGEgcm9vbSAqL1xuICBzZW5kRXZlbnQ8RD4ocm9vbTogc3RyaW5nLCBwYXlsb2FkOiAobWV0YWRhdGE6IFQpID0+IEQpOiB2b2lkIHtcbiAgICBpZiAocm9vbSBpbiB0aGlzLmNsaWVudHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgc2VuZGluZyBzc2UgdG8gJHt0aGlzLmNsaWVudHNbcm9vbV0ubGVuZ3RofSBjbGllbnRzIGluICR7cm9vbX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUudGltZShgc2VuZGluZyBzc2UgdGltZTogYCk7XG4gICAgICBhcG0uc3RhcnRUcmFuc2FjdGlvbignc3NlJyk7XG4gICAgICBmb3IgKGNvbnN0IHsgcmVzLCBtZXRhZGF0YSB9IG9mIHRoaXMuY2xpZW50c1tyb29tXSkge1xuICAgICAgICBjb25zdCB0b1NlbmQgPSBgZGF0YTogJHtzZXJpYWxpemUocGF5bG9hZChtZXRhZGF0YSkpfVxcblxcbmA7XG4gICAgICAgIHJlcy53cml0ZSh0b1NlbmQpO1xuICAgICAgfVxuICAgICAgYXBtLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoYHNlbmRpbmcgc3NlIHRpbWU6IGApO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxhc3RpYy1hcG0tbm9kZVwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBMaXN0UXVlc3Rpb25zUmVzcG9uc2UsIFJvbGUgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAncXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEdldCBkYXRhIGluIHNlcnZpY2Ugb2YgdGhlIHF1ZXVlIGNvbnRyb2xsZXIgYW5kIFNTRVxuICogV0hZPyBUbyBlbnN1cmUgZGF0YSByZXR1cm5lZCBieSBlbmRwb2ludHMgaXMgKmV4YWN0bHkqIGVxdWFsIHRvIGRhdGEgc2VudCBieSBTU0VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbikge31cblxuICBhc3luYyBnZXRRdWV1ZShxdWV1ZUlkOiBudW1iZXIpOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnc3RhZmZMaXN0J10sXG4gICAgfSk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVUaW1lcygpO1xuICAgIGF3YWl0IHF1ZXVlLmNoZWNrSXNPcGVuKCk7XG4gICAgYXdhaXQgcXVldWUuYWRkUXVldWVTaXplKCk7XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBhc3luYyBnZXRRdWVzdGlvbnMocXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxMaXN0UXVlc3Rpb25zUmVzcG9uc2U+IHtcbiAgICAvLyB0b2RvOiBNYWtlIGEgc3R1ZGVudCBhbmQgYSBUQSB2ZXJzaW9uIG9mIHRoaXMgZnVuY3Rpb24sIGFuZCBzd2l0Y2ggd2hpY2ggb25lIHRvIHVzZSBpbiB0aGUgY29udHJvbGxlclxuICAgIC8vIGZvciBub3csIGp1c3QgcmV0dXJuIHRoZSBzdHVkZW50IHJlc3BvbnNlXG4gICAgY29uc3QgcXVldWVTaXplID0gYXdhaXQgUXVldWVNb2RlbC5jb3VudCh7XG4gICAgICB3aGVyZTogeyBpZDogcXVldWVJZCB9LFxuICAgIH0pO1xuICAgIC8vIENoZWNrIHRoYXQgdGhlIHF1ZXVlIGV4aXN0c1xuICAgIGlmIChxdWV1ZVNpemUgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShxdWV1ZUlkKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi5jcmVhdG9yJywgJ2NyZWF0b3InKVxuICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KCdxdWVzdGlvbi50YUhlbHBlZCcsICd0YUhlbHBlZCcpXG4gICAgICAuZ2V0TWFueSgpO1xuICB9XG5cbiAgLyoqIEhpZGUgc2Vuc2l0aXZlIGRhdGEgdG8gb3RoZXIgc3R1ZGVudHMgKi9cbiAgYW5vbnltaXplUXVlc3Rpb25zKFxuICAgIHF1ZXN0aW9uczogTGlzdFF1ZXN0aW9uc1Jlc3BvbnNlLFxuICAgIHVzZXJJZDogbnVtYmVyLFxuICAgIHJvbGU6IFJvbGUsXG4gICk6IExpc3RRdWVzdGlvbnNSZXNwb25zZSB7XG4gICAgaWYgKHJvbGUgPT09IFJvbGUuU1RVREVOVCkge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9ucy5tYXAoKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0b3IgPVxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgPyBxdWVzdGlvbi5jcmVhdG9yXG4gICAgICAgICAgICA6IHBpY2socXVlc3Rpb24uY3JlYXRvciwgWydpZCddKTtcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWwuY3JlYXRlKHsgLi4ucXVlc3Rpb24sIGNyZWF0b3IgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFF1ZXVlQ29udHJvbGxlciB9IGZyb20gJy4vcXVldWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1ZUNsZWFuU2VydmljZSB9IGZyb20gJy4vcXVldWUtY2xlYW4vcXVldWUtY2xlYW4uc2VydmljZSc7XG5pbXBvcnQgeyBTU0VNb2R1bGUgfSBmcm9tICdzc2Uvc3NlLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3F1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZVN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXVlLnN1YnNjcmliZXInO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWV1ZUNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtcbiAgICBRdWV1ZUNsZWFuU2VydmljZSxcbiAgICBRdWV1ZVNlcnZpY2UsXG4gICAgUXVldWVTU0VTZXJ2aWNlLFxuICAgIFF1ZXVlU3Vic2NyaWJlcixcbiAgXSxcbiAgZXhwb3J0czogW1F1ZXVlQ2xlYW5TZXJ2aWNlLCBRdWV1ZVNTRVNlcnZpY2VdLFxuICBpbXBvcnRzOiBbU1NFTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVldWVNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEJvZHksXG4gIENsYXNzU2VyaWFsaXplckludGVyY2VwdG9yLFxuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgUGF0Y2gsXG4gIFJlcyxcbiAgVXNlR3VhcmRzLFxuICBVc2VJbnRlcmNlcHRvcnMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEdldFF1ZXVlUmVzcG9uc2UsXG4gIExpc3RRdWVzdGlvbnNSZXNwb25zZSxcbiAgUm9sZSxcbiAgVXBkYXRlUXVldWVQYXJhbXMsXG59IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VySWQgfSBmcm9tICdwcm9maWxlL3VzZXIuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUXVldWVSb2xlIH0gZnJvbSAnLi9xdWV1ZS1yb2xlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBRdWV1ZVJvbGVzR3VhcmQgfSBmcm9tICcuL3F1ZXVlLXJvbGUuZ3VhcmQnO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9xdWV1ZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3F1ZXVlcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZCwgUXVldWVSb2xlc0d1YXJkKVxuQFVzZUludGVyY2VwdG9ycyhDbGFzc1NlcmlhbGl6ZXJJbnRlcmNlcHRvcilcbmV4cG9ydCBjbGFzcyBRdWV1ZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgICBwcml2YXRlIHF1ZXVlU2VydmljZTogUXVldWVTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IsIFJvbGUuU1RVREVOVClcbiAgYXN5bmMgZ2V0UXVldWUoQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyKTogUHJvbWlzZTxHZXRRdWV1ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICB9XG5cbiAgQEdldCgnOnF1ZXVlSWQvcXVlc3Rpb25zJylcbiAgQFJvbGVzKFJvbGUuVEEsIFJvbGUuUFJPRkVTU09SLCBSb2xlLlNUVURFTlQpXG4gIGFzeW5jIGdldFF1ZXN0aW9ucyhcbiAgICBAUGFyYW0oJ3F1ZXVlSWQnKSBxdWV1ZUlkOiBudW1iZXIsXG4gICAgQFF1ZXVlUm9sZSgpIHJvbGU6IFJvbGUsXG4gICAgQFVzZXJJZCgpIHVzZXJJZDogbnVtYmVyLFxuICApOiBQcm9taXNlPExpc3RRdWVzdGlvbnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXN0aW9ucyhxdWV1ZUlkKTtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVNlcnZpY2UuYW5vbnltaXplUXVlc3Rpb25zKHF1ZXN0aW9ucywgdXNlcklkLCByb2xlKTtcbiAgfVxuXG4gIEBQYXRjaCgnOnF1ZXVlSWQnKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXVlKFxuICAgIEBQYXJhbSgncXVldWVJZCcpIHF1ZXVlSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXVlUGFyYW1zLFxuICApOiBQcm9taXNlPFF1ZXVlTW9kZWw+IHtcbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IHRoaXMucXVldWVTZXJ2aWNlLmdldFF1ZXVlKHF1ZXVlSWQpO1xuICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5ub3RlcyA9IGJvZHkubm90ZXM7XG4gICAgcXVldWUuYWxsb3dRdWVzdGlvbnMgPSBib2R5LmFsbG93UXVlc3Rpb25zO1xuICAgIGF3YWl0IHF1ZXVlLnNhdmUoKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICAvLyBFbmRwb2ludCB0byBzZW5kIGZyb250ZW5kIHJlY2VpdmUgc2VydmVyLXNlbnQgZXZlbnRzIHdoZW4gcXVldWUgY2hhbmdlc1xuICBAR2V0KCc6cXVldWVJZC9zc2UnKVxuICBzZW5kRXZlbnQoXG4gICAgQFBhcmFtKCdxdWV1ZUlkJykgcXVldWVJZDogbnVtYmVyLFxuICAgIEBRdWV1ZVJvbGUoKSByb2xlOiBSb2xlLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgICBAUmVzKCkgcmVzOiBSZXNwb25zZSxcbiAgKTogdm9pZCB7XG4gICAgcmVzLnNldCh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdYLUFjY2VsLUJ1ZmZlcmluZyc6ICdubycsXG4gICAgICBDb25uZWN0aW9uOiAna2VlcC1hbGl2ZScsXG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlU1NFU2VydmljZS5zdWJzY3JpYmVDbGllbnQocXVldWVJZCwgcmVzLCB7IHJvbGUsIHVzZXJJZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGFyYW1EZWNvcmF0b3IsIEV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZVJvbGUgPSBjcmVhdGVQYXJhbURlY29yYXRvcihcbiAgYXN5bmMgKGRhdGE6IHVua25vd24sIGN0eDogRXhlY3V0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXVlSWQpO1xuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWU/LmNvdXJzZUlkO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZShyZXF1ZXN0LnVzZXIudXNlcklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsnY291cnNlcyddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZSA9IHVzZXIuY291cnNlcy5maW5kKChjb3Vyc2UpID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIoY291cnNlLmNvdXJzZUlkKSA9PT0gTnVtYmVyKGNvdXJzZUlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXNlckNvdXJzZS5yb2xlO1xuICB9LFxuKTtcbiIsImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWV1ZVJvbGVzR3VhcmQgZXh0ZW5kcyBSb2xlc0d1YXJkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgYXN5bmMgc2V0dXBEYXRhKFxuICAgIHJlcXVlc3Q6IGFueSxcbiAgKTogUHJvbWlzZTx7IGNvdXJzZUlkOiBudW1iZXI7IHVzZXI6IFVzZXJNb2RlbCB9PiB7XG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUocmVxdWVzdC5wYXJhbXMucXVldWVJZCk7XG4gICAgY29uc3QgY291cnNlSWQgPSBxdWV1ZT8uY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTU0VTZXJ2aWNlIH0gZnJvbSAnLi9zc2Uuc2VydmljZSc7XG5cbkBNb2R1bGUoeyBwcm92aWRlcnM6IFtTU0VTZXJ2aWNlXSwgZXhwb3J0czogW1NTRVNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgU1NFTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBRdWV1ZVNTRVNlcnZpY2UgfSBmcm9tICdxdWV1ZS9xdWV1ZS1zc2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIFVwZGF0ZUV2ZW50LFxufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3F1ZXVlLmVudGl0eSc7XG5cbkBFdmVudFN1YnNjcmliZXIoKVxuZXhwb3J0IGNsYXNzIFF1ZXVlU3Vic2NyaWJlciBpbXBsZW1lbnRzIEVudGl0eVN1YnNjcmliZXJJbnRlcmZhY2U8UXVldWVNb2RlbD4ge1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uLCBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSkge1xuICAgIHRoaXMucXVldWVTU0VTZXJ2aWNlID0gcXVldWVTU0VTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBRdWV1ZU1vZGVsO1xuICB9XG5cbiAgYXN5bmMgYWZ0ZXJVcGRhdGUoZXZlbnQ6IFVwZGF0ZUV2ZW50PFF1ZXVlTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGV2ZW50LmVudGl0eSkge1xuICAgICAgLy8gU2VuZCBhbGwgbGlzdGVuaW5nIGNsaWVudHMgYW4gdXBkYXRlXG4gICAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWV1ZShldmVudC5lbnRpdHkuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ25lc3Rqcy1jb21tYW5kJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJY2FsU2VydmljZSB9IGZyb20gJy4vaWNhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElDYWxDb21tYW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpY2FsU2VydmljZTogSWNhbFNlcnZpY2UpIHt9XG4gIEBDb21tYW5kKHtcbiAgICBjb21tYW5kOiAnaWNhbDpzY3JhcGUnLFxuICAgIGRlc2NyaWJlOiAnc2NyYXBlIGljYWwgZm9yIGEgY291cnNlJyxcbiAgICBhdXRvRXhpdDogdHJ1ZSxcbiAgfSlcbiAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaWNhbFNlcnZpY2UudXBkYXRlQWxsQ291cnNlcygpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXN0anMtY29tbWFuZFwiKTsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ3JvbiB9IGZyb20gJ0BuZXN0anMvc2NoZWR1bGUnO1xuaW1wb3J0IHtcbiAgZnJvbVVSTCxcbiAgQ2FsZW5kYXJDb21wb25lbnQsXG4gIENhbGVuZGFyUmVzcG9uc2UsXG4gIFZFdmVudCxcbn0gZnJvbSAnbm9kZS1pY2FsJztcbmltcG9ydCB7IERlZXBQYXJ0aWFsLCBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBPZmZpY2VIb3VyTW9kZWwgfSBmcm9tICcuL29mZmljZS1ob3VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IGZpbmRPbmVJYW5hIH0gZnJvbSAnd2luZG93cy1pYW5hL2Rpc3QnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IHsgUlJ1bGUgfSBmcm9tICdycnVsZSc7XG5cbnR5cGUgQ3JlYXRlT2ZmaWNlSG91ciA9IERlZXBQYXJ0aWFsPE9mZmljZUhvdXJNb2RlbD5bXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEljYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIC8vIHR6IHNob3VsZCBub3QgYmUgcHJlY29udmVydGVkIGJ5IGZpbmRPbmVJYW5hXG4gIHByaXZhdGUgZml4VGltZXpvbmUoZGF0ZTogRGF0ZSwgdHo6IHN0cmluZyk6IERhdGUge1xuICAgIGlmICghdHopIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICBjb25zdCBpYW5hID0gZmluZE9uZUlhbmEodHopOyAvLyBHZXQgSUFOQSB0aW1lem9uZSBmcm9tIHdpbmRvd3MgdGltZXpvbmVcblxuICAgIGNvbnN0IGV2ZW50b2Zmc2V0ID0gbW9tZW50LnR6LnpvbmUoaWFuYSB8fCB0eikudXRjT2Zmc2V0KGRhdGUuZ2V0VGltZSgpKTtcbiAgICBjb25zdCBzZXJ2ZXJvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgY29uc3QgbW9tZSA9IG1vbWVudChkYXRlKTtcbiAgICBpZiAoaWFuYSkge1xuICAgICAgbW9tZS5zdWJ0cmFjdChzZXJ2ZXJvZmZzZXQgLSBldmVudG9mZnNldCwgJ21pbnV0ZXMnKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbWUudG9EYXRlKCk7XG4gIH1cblxuICBwYXJzZUljYWwoaWNhbERhdGE6IENhbGVuZGFyUmVzcG9uc2UsIGNvdXJzZUlkOiBudW1iZXIpOiBDcmVhdGVPZmZpY2VIb3VyIHtcbiAgICBjb25zdCBpY2FsRGF0YVZhbHVlczogQXJyYXk8Q2FsZW5kYXJDb21wb25lbnQ+ID0gT2JqZWN0LnZhbHVlcyhpY2FsRGF0YSk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3VycyA9IGljYWxEYXRhVmFsdWVzLmZpbHRlcihcbiAgICAgIChpQ2FsRWxlbWVudCk6IGlDYWxFbGVtZW50IGlzIFZFdmVudCA9PlxuICAgICAgICBpQ2FsRWxlbWVudC50eXBlID09PSAnVkVWRU5UJyAmJlxuICAgICAgICBpQ2FsRWxlbWVudC5zdGFydCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGlDYWxFbGVtZW50LmVuZCAhPT0gdW5kZWZpbmVkLFxuICAgICk7XG5cbiAgICBjb25zdCBvZmZpY2VIb3Vyc0V2ZW50UmVnZXggPSAvXFxiXihPSHxIb3VycylcXGIvO1xuXG4gICAgY29uc3QgZmlsdGVyZWRPZmZpY2VIb3VycyA9IG9mZmljZUhvdXJzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBvZmZpY2VIb3Vyc0V2ZW50UmVnZXgudGVzdChldmVudC5zdW1tYXJ5KSxcbiAgICApO1xuXG4gICAgbGV0IHJlc3VsdE9mZmljZUhvdXJzID0gW107XG5cbiAgICBmaWx0ZXJlZE9mZmljZUhvdXJzLmZvckVhY2goKG9oOiBWRXZlbnQpID0+IHtcbiAgICAgIC8vIFRoaXMgb2ZmaWNlIGhvdXIgdGltZXpvbmUuIEFTU1VNSU5HIGV2ZXJ5IGRhdGUgZmllbGQgaGFzIHNhbWUgdGltZXpvbmUgYXMgb2guc3RhcnRcbiAgICAgIGNvbnN0IGV2ZW50VFogPSBvaC5zdGFydC50ejtcbiAgICAgIGNvbnN0IHsgcnJ1bGUgfSA9IG9oIGFzIGFueTtcbiAgICAgIGlmIChycnVsZSkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHJydWxlO1xuICAgICAgICBjb25zdCBkdHN0YXJ0ID0gdGhpcy5maXhUaW1lem9uZShvcHRpb25zLmR0c3RhcnQsIGV2ZW50VFopO1xuICAgICAgICBjb25zdCB1bnRpbCA9IG9wdGlvbnMudW50aWwgJiYgdGhpcy5maXhUaW1lem9uZShvcHRpb25zLnVudGlsLCBldmVudFRaKTtcblxuICAgICAgICBsZXQgYnl3ZWVrZGF5ID0gb3B0aW9ucy5ieXdlZWtkYXk7XG4gICAgICAgIGlmIChvcHRpb25zLmJ5aG91clswXSA+PSAwICYmIG9wdGlvbnMuYnlob3VyWzBdIDwgNCkge1xuICAgICAgICAgIGJ5d2Vla2RheSA9IG9wdGlvbnMuYnl3ZWVrZGF5Lm1hcCgoYndkKSA9PiAoYndkICsgMSkgJSA3KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydWxlID0gbmV3IFJSdWxlKHtcbiAgICAgICAgICBmcmVxOiBvcHRpb25zLmZyZXEsXG4gICAgICAgICAgaW50ZXJ2YWw6IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICAgICAgd2tzdDogb3B0aW9ucy53a3N0LFxuICAgICAgICAgIGNvdW50OiBvcHRpb25zLmNvdW50LFxuICAgICAgICAgIGJ5d2Vla2RheSxcbiAgICAgICAgICBkdHN0YXJ0OiBkdHN0YXJ0LFxuICAgICAgICAgIHVudGlsOiB1bnRpbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRGF0ZXMgdG8gZXhjbHVkZSBmcm9tIHJlY3VycmVuY2UsIHNlcGFyYXRlIGV4ZGF0ZSBJU09TdHJpbmdzIGZvciBmaWx0ZXJpbmdcbiAgICAgICAgY29uc3QgZXhkYXRlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGRhdGUgaW4gb2guZXhkYXRlKSB7XG4gICAgICAgICAgZXhkYXRlcy5wdXNoKG9oLmV4ZGF0ZVtkYXRlXS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvaW5nIG1hdGggaGVyZSBiZWNhdXNlIG1vbWVudC5hZGQgY2hhbmdlcyBiZWhhdmlvciBiYXNlZCBvbiBzZXJ2ZXIgdGltZXpvbmVcbiAgICAgICAgY29uc3QgaW4xMFdlZWtzID0gbmV3IERhdGUoXG4gICAgICAgICAgZHRzdGFydC5nZXRUaW1lKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogNyAqIDEwLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhbGxEYXRlcyA9IHJ1bGVcbiAgICAgICAgICAuYWxsKChkKSA9PiAhIXVudGlsIHx8IGQgPCBpbjEwV2Vla3MpXG4gICAgICAgICAgLmZpbHRlcigoZGF0ZSkgPT4gIWV4ZGF0ZXMuaW5jbHVkZXMoZGF0ZS50b0lTT1N0cmluZygpKSk7XG5cbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvaC5lbmQuZ2V0VGltZSgpIC0gb2guc3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZE9mZmljZUhvdXJzID0gYWxsRGF0ZXMubWFwKChkYXRlKSA9PiAoe1xuICAgICAgICAgIHRpdGxlOiBvaC5zdW1tYXJ5LFxuICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICByb29tOiBvaC5sb2NhdGlvbixcbiAgICAgICAgICBzdGFydFRpbWU6IGRhdGUsXG4gICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkdXJhdGlvbiksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMgPSByZXN1bHRPZmZpY2VIb3Vycy5jb25jYXQoZ2VuZXJhdGVkT2ZmaWNlSG91cnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0T2ZmaWNlSG91cnMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IG9oLnN1bW1hcnksXG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgIHJvb206IG9oLmxvY2F0aW9uLFxuICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5maXhUaW1lem9uZShvaC5zdGFydCwgZXZlbnRUWiksXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5maXhUaW1lem9uZShvaC5lbmQsIGV2ZW50VFopLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0T2ZmaWNlSG91cnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgT2ZmaWNlSG91cnMgZm9yIGEgZ2l2ZW4gQ291cnNlIGJ5IHJlc2NyYXBpbmcgaWNhbFxuICAgKiBAcGFyYW0gY291cnNlIHRvIHBhcnNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2FsZW5kYXJGb3JDb3Vyc2UoY291cnNlOiBDb3Vyc2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYHNjcmFwaW5nIGljYWwgZm9yIGNvdXJzZSBcIiR7Y291cnNlLm5hbWV9XCIoJHtjb3Vyc2UuaWR9IGF0IHVybDogJHtjb3Vyc2UuaWNhbFVSTH0uLi5gLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGxldCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb3Vyc2VJZDogY291cnNlLmlkLCByb29tOiAnT25saW5lJyB9LFxuICAgIH0pO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5jcmVhdGUoe1xuICAgICAgICByb29tOiAnT25saW5lJyxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5pZCxcbiAgICAgICAgc3RhZmZMaXN0OiBbXSxcbiAgICAgICAgcXVlc3Rpb25zOiBbXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGZhbHNlLFxuICAgICAgfSkuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gdGhpcy5wYXJzZUljYWwoXG4gICAgICBhd2FpdCBmcm9tVVJMKGNvdXJzZS5pY2FsVVJMKSxcbiAgICAgIGNvdXJzZS5pZCxcbiAgICApO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5kZWxldGUoeyBjb3Vyc2VJZDogY291cnNlLmlkIH0pO1xuICAgIGF3YWl0IE9mZmljZUhvdXJNb2RlbC5zYXZlKFxuICAgICAgb2ZmaWNlSG91cnMubWFwKChlKSA9PiB7XG4gICAgICAgIGUucXVldWVJZCA9IHF1ZXVlLmlkO1xuICAgICAgICByZXR1cm4gT2ZmaWNlSG91ck1vZGVsLmNyZWF0ZShlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc29sZS50aW1lRW5kKGBzY3JhcGUgY291cnNlICR7Y291cnNlLmlkfWApO1xuICAgIGNvbnNvbGUubG9nKCdkb25lIHNjcmFwaW5nIScpO1xuICB9XG5cbiAgQENyb24oJzUxIDAgKiAqIConKVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlQWxsQ291cnNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY291cnNlIGljYWxzJyk7XG4gICAgY29uc3QgY291cnNlcyA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmQoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb3Vyc2VzLm1hcCgoYykgPT4gdGhpcy51cGRhdGVDYWxlbmRhckZvckNvdXJzZShjKSkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWljYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luZG93cy1pYW5hL2Rpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJycnVsZVwiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyIH0gZnJvbSAnLi9kZXNrdG9wLW5vdGlmLXN1YnNjcmliZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vbm90aWZpY2F0aW9uLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbTm90aWZpY2F0aW9uQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW05vdGlmaWNhdGlvblNlcnZpY2UsIERlc2t0b3BOb3RpZlN1YnNjcmliZXIsIFR3aWxpb1NlcnZpY2VdLFxuICBleHBvcnRzOiBbTm90aWZpY2F0aW9uU2VydmljZSwgVHdpbGlvU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgRXZlbnRTdWJzY3JpYmVyLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBDb25uZWN0aW9uLFxuICBJbnNlcnRFdmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuXG5ARXZlbnRTdWJzY3JpYmVyKClcbmV4cG9ydCBjbGFzcyBEZXNrdG9wTm90aWZTdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIHRoaXMubm90aWZTZXJ2aWNlID0gbm90aWZTZXJ2aWNlO1xuICAgIGNvbm5lY3Rpb24uc3Vic2NyaWJlcnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIGxpc3RlblRvKCkge1xuICAgIHJldHVybiBEZXNrdG9wTm90aWZNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIGFmdGVySW5zZXJ0KGV2ZW50OiBJbnNlcnRFdmVudDxEZXNrdG9wTm90aWZNb2RlbD4pIHtcbiAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlEZXNrdG9wKFxuICAgICAgZXZlbnQuZW50aXR5LFxuICAgICAgXCJZb3UndmUgc3VjY2Vzc2Z1bGx5IHNpZ25lZCB1cCBmb3IgZGVza3RvcCBub3RpZmljYXRpb25zIVwiLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJhZFJlcXVlc3RFeGNlcHRpb24sIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgRGVlcFBhcnRpYWwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCAqIGFzIHdlYlB1c2ggZnJvbSAnd2ViLXB1c2gnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBEZXNrdG9wTm90aWZNb2RlbCB9IGZyb20gJy4vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9waG9uZS1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgVHdpbGlvU2VydmljZSB9IGZyb20gJy4vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuZXhwb3J0IGNvbnN0IE5vdGlmTXNncyA9IHtcbiAgcGhvbmU6IHtcbiAgICBXUk9OR19NRVNTQUdFOlxuICAgICAgJ1BsZWFzZSByZXNwb25kIHdpdGggZWl0aGVyIFlFUyBvciBOTy4gVGV4dCBTVE9QIGF0IGFueSB0aW1lIHRvIHN0b3AgcmVjZWl2aW5nIHRleHQgbWVzc2FnZXMnLFxuICAgIENPVUxEX05PVF9GSU5EX05VTUJFUjpcbiAgICAgICdDb3VsZCBub3QgZmluZCBhbiBPZmZpY2UgSG91cnMgYWNjb3VudCB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyLicsXG4gICAgVU5SRUdJU1RFUjpcbiAgICAgIFwiWW91J3ZlIHVucmVnaXN0ZXJlZCBmcm9tIHRleHQgbm90aWZpY2F0aW9ucyBmb3IgS2hvdXJ5IE9mZmljZSBIb3Vycy4gRmVlbCBmcmVlIHRvIHJlLXJlZ2lzdGVyIGFueSB0aW1lIHRocm91Z2ggdGhlIHdlYnNpdGVcIixcbiAgICBEVVBMSUNBVEU6XG4gICAgICBcIllvdSd2ZSBhbHJlYWR5IGJlZW4gdmVyaWZpZWQgdG8gcmVjZWl2ZSB0ZXh0IG5vdGlmaWNhdGlvbnMgZnJvbSBLaG91cnkgT2ZmaWNlIEhvdXJzIVwiLFxuICAgIE9LOlxuICAgICAgJ1RoYW5rIHlvdSBmb3IgdmVyaWZ5aW5nIHlvdXIgbnVtYmVyIHdpdGggS2hvdXJ5IE9mZmljZSBIb3VycyEgWW91IGFyZSBub3cgc2lnbmVkIHVwIGZvciB0ZXh0IG5vdGlmaWNhdGlvbnMhJyxcbiAgfSxcbiAgcXVldWU6IHtcbiAgICBBTEVSVF9CVVRUT046XG4gICAgICBcIlRoZSBUQSBjb3VsZCd0IHJlYWNoIHlvdSwgcGxlYXNlIGhhdmUgTWljcm9zb2Z0IFRlYW1zIG9wZW4gYW5kIGNvbmZpcm0geW91IGFyZSBiYWNrIVwiLFxuICAgIFRISVJEX1BMQUNFOiBgWW91J3JlIDNyZCBpbiB0aGUgcXVldWUuIEJlIHJlYWR5IGZvciBhIFRBIHRvIGNhbGwgeW91IHNvb24hYCxcbiAgICBUQV9ISVRfSEVMUEVEOiAodGFOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICAgIGAke3RhTmFtZX0gaXMgY29taW5nIHRvIGhlbHAgeW91IWAsXG4gICAgUkVNT1ZFRDogYFlvdSd2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuIFBsZWFzZSByZXR1cm4gdG8gdGhlIGFwcCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gLFxuICB9LFxuICB0YToge1xuICAgIFNUVURFTlRfSk9JTkVEX0VNUFRZX1FVRVVFOlxuICAgICAgJ0Egc3R1ZGVudCBoYXMgam9pbmVkIHlvdXIgKHByZXZpb3VzbHkgZW1wdHkpIHF1ZXVlIScsXG4gIH0sXG59O1xuXG4vL1RPRE8gdGVzdCB0aGlzIHNlcnZpY2Ugb21nXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIGRlc2t0b3BQdWJsaWNLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0d2lsaW9TZXJ2aWNlOiBUd2lsaW9TZXJ2aWNlLFxuICApIHtcbiAgICB3ZWJQdXNoLnNldFZhcGlkRGV0YWlscyhcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ0VNQUlMJyksXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdQVUJMSUNLRVknKSxcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BSSVZBVEVLRVknKSxcbiAgICApO1xuICAgIHRoaXMuZGVza3RvcFB1YmxpY0tleSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1BVQkxJQ0tFWScpO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJEZXNrdG9wKFxuICAgIGluZm86IERlZXBQYXJ0aWFsPERlc2t0b3BOb3RpZk1vZGVsPixcbiAgKTogUHJvbWlzZTxEZXNrdG9wTm90aWZNb2RlbD4ge1xuICAgIC8vIGNyZWF0ZSBpZiBub3QgZXhpc3RcbiAgICBsZXQgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogaW5mby51c2VySWQsIGVuZHBvaW50OiBpbmZvLmVuZHBvaW50IH0sXG4gICAgfSk7XG4gICAgaWYgKCFkbikge1xuICAgICAgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5jcmVhdGUoaW5mbykuc2F2ZSgpO1xuICAgICAgYXdhaXQgZG4ucmVsb2FkKCk7XG4gICAgfVxuICAgIHJldHVybiBkbjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgdXNlcjogVXNlck1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZnVsbE51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocGhvbmVOdW1iZXIpO1xuICAgIGlmICghZnVsbE51bWJlcikge1xuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ3Bob25lIG51bWJlciBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgbGV0IHBob25lTm90aWZNb2RlbCA9IGF3YWl0IFBob25lTm90aWZNb2RlbC5maW5kT25lKHtcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KTtcblxuICAgIGlmIChwaG9uZU5vdGlmTW9kZWwpIHtcbiAgICAgIC8vIFBob25lIG51bWJlciBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPT09IGZ1bGxOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBqdXN0IGNoYW5nZSBpdFxuICAgICAgICBwaG9uZU5vdGlmTW9kZWwucGhvbmVOdW1iZXIgPSBmdWxsTnVtYmVyO1xuICAgICAgICBwaG9uZU5vdGlmTW9kZWwudmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcGhvbmVOb3RpZk1vZGVsLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGhvbmVOb3RpZk1vZGVsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBmdWxsTnVtYmVyLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH0pLnNhdmUoKTtcblxuICAgICAgLy8gTVVUQVRFIHNvIGlmIHVzZXIuc2F2ZSgpIGlzIGNhbGxlZCBsYXRlciBpdCBkb2Vzbid0IGRpcy1hc3NvY2lhdGVcbiAgICAgIHVzZXIucGhvbmVOb3RpZiA9IHBob25lTm90aWZNb2RlbDtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm5vdGlmeVBob25lKFxuICAgICAgcGhvbmVOb3RpZk1vZGVsLFxuICAgICAgXCJZb3UndmUgc2lnbmVkIHVwIGZvciBwaG9uZSBub3RpZmljYXRpb25zIGZvciBLaG91cnkgT2ZmaWNlIEhvdXJzLiBUbyB2ZXJpZnkgeW91ciBudW1iZXIsIHBsZWFzZSByZXNwb25kIHRvIHRoaXMgbWVzc2FnZSB3aXRoIFlFUy4gVG8gdW5zdWJzY3JpYmUsIHJlc3BvbmQgdG8gdGhpcyBtZXNzYWdlIHdpdGggTk8gb3IgU1RPUFwiLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLy8gTm90aWZ5IHVzZXIgb24gYWxsIHBsYXRmb3Jtc1xuICBhc3luYyBub3RpZnlVc2VyKHVzZXJJZDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3RpZk1vZGVsc09mVXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2Rlc2t0b3BOb3RpZnMnLCAncGhvbmVOb3RpZiddLFxuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBwcm9taXNlcyBjb25jdXJyZW50bHlcbiAgICBpZiAobm90aWZNb2RlbHNPZlVzZXIuZGVza3RvcE5vdGlmc0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBub3RpZk1vZGVsc09mVXNlci5kZXNrdG9wTm90aWZzLm1hcChhc3luYyAobm0pID0+XG4gICAgICAgICAgdGhpcy5ub3RpZnlEZXNrdG9wKG5tLCBtZXNzYWdlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmICYmIG5vdGlmTW9kZWxzT2ZVc2VyLnBob25lTm90aWZzRW5hYmxlZCkge1xuICAgICAgdGhpcy5ub3RpZnlQaG9uZShub3RpZk1vZGVsc09mVXNlci5waG9uZU5vdGlmLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuICBhc3luYyBub3RpZnlEZXNrdG9wKG5tOiBEZXNrdG9wTm90aWZNb2RlbCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdlYlB1c2guc2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBubS5lbmRwb2ludCxcbiAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICBwMjU2ZGg6IG5tLnAyNTZkaCxcbiAgICAgICAgICAgIGF1dGg6IG5tLmF1dGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShubSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZpZXMgYSB1c2VyIHZpYSBwaG9uZSBudW1iZXJcbiAgYXN5bmMgbm90aWZ5UGhvbmUoXG4gICAgcG46IFBob25lTm90aWZNb2RlbCxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZm9yY2U6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChmb3JjZSB8fCBwbi52ZXJpZmllZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy50d2lsaW9TZXJ2aWNlLnNlbmRTTVMocG4ucGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncHJvYmxlbSBzZW5kaW5nIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5UGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwaG9uZU5vdGlmID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXBob25lTm90aWYpIHtcbiAgICAgIGFwbS5zZXRDdXN0b21Db250ZXh0KHsgcGhvbmVOdW1iZXIgfSk7XG4gICAgICBhcG0uY2FwdHVyZUVycm9yKFxuICAgICAgICBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHBob25lIG51bWJlciBkdXJpbmcgdmVyaWZpY2F0aW9uJyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5DT1VMRF9OT1RfRklORF9OVU1CRVI7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlICE9PSAnWUVTJyAmJiBtZXNzYWdlICE9PSAnTk8nICYmIG1lc3NhZ2UgIT09ICdTVE9QJykge1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5XUk9OR19NRVNTQUdFO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PT0gJ05PJyB8fCBtZXNzYWdlID09PSAnU1RPUCcpIHtcbiAgICAgIC8vIGRpZCBzb21lIG1vcmUgZGlnZ2luZywgU1RPUCBqdXN0IHN0b3BzIG1lc3NhZ2VzIGNvbXBsZXRlbHksIHdlJ2xsIG5ldmVyIHJlY2VpdmUgaXRcbiAgICAgIC8vIHNvIHVoLi4uIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhhdFxuICAgICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmRlbGV0ZShwaG9uZU5vdGlmKTtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuVU5SRUdJU1RFUjtcbiAgICB9IGVsc2UgaWYgKHBob25lTm90aWYudmVyaWZpZWQpIHtcbiAgICAgIHJldHVybiBOb3RpZk1zZ3MucGhvbmUuRFVQTElDQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaG9uZU5vdGlmLnZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHBob25lTm90aWYuc2F2ZSgpO1xuICAgICAgcmV0dXJuIE5vdGlmTXNncy5waG9uZS5PSztcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYi1wdXNoXCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0ICogYXMgdHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0d2lsaW8gU0RLIHRvIG1ha2UgdGVzdGluZyBlYXNpZXIuXG4gKiBTaG91bGQgTk9UIGludGVyYWN0IHdpdGggREIgbW9kZWxzIG9yIGRvIGFueXRoaW5nIHNtYXJ0LiBKdXN0IHdyYXAgVHdpbGlvLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvU2VydmljZSB7XG4gIHByaXZhdGUgdHdpbGlvQ2xpZW50OiB0d2lsaW8uVHdpbGlvO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudHdpbGlvQ2xpZW50ID0gdHdpbGlvKFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQUNDT1VOVFNJRCcpLFxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnVFdJTElPQVVUSFRPS0VOJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBwaG9uZSBudW1iZXIgb3IgcmV0dXJuIGZhbHNlIGlmIHBob25lIG51bWJlciBpc24ndCByZWFsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RnVsbFBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubG9va3Vwcy5waG9uZU51bWJlcnMocGhvbmVOdW1iZXIpLmZldGNoKCkpLnBob25lTnVtYmVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlIHBob25lIG51bWJlciBpcyBub3QgZm91bmQsIHRoZW4gZW5kcG9pbnQgc2hvdWxkIHJldHVybiBpbnZhbGlkXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgU01TIHRvIHBob25lIG51bWJlciB1c2luZyBvdXIgVHdpbGlvIG51bWJlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50d2lsaW9DbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdUV0lMSU9QSE9ORU5VTUJFUicpLFxuICAgICAgdG86IHBob25lTnVtYmVyLFxuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2lsaW9cIik7IiwiaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgRGVsZXRlLFxuICBHZXQsXG4gIEhlYWRlcixcbiAgSGVhZGVycyxcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQb3N0LFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IERlc2t0b3BOb3RpZkJvZHksIERlc2t0b3BOb3RpZlBhcnRpYWwsIFR3aWxpb0JvZHkgfSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgKiBhcyB0d2lsaW8gZnJvbSAndHdpbGlvJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJJZCB9IGZyb20gJy4uL3Byb2ZpbGUvdXNlci5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL2Rlc2t0b3Atbm90aWYuZW50aXR5JztcblxuQENvbnRyb2xsZXIoJ25vdGlmaWNhdGlvbnMnKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCdkZXNrdG9wL2NyZWRlbnRpYWxzJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGdldERlc2t0b3BDcmVkZW50aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm5vdGlmU2VydmljZS5kZXNrdG9wUHVibGljS2V5KTtcbiAgfVxuXG4gIEBQb3N0KCdkZXNrdG9wL2RldmljZScpXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBhc3luYyByZWdpc3RlckRlc2t0b3BVc2VyKFxuICAgIEBCb2R5KCkgYm9keTogRGVza3RvcE5vdGlmQm9keSxcbiAgICBAVXNlcklkKCkgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8RGVza3RvcE5vdGlmUGFydGlhbD4ge1xuICAgIGNvbnN0IGRldmljZSA9IGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyRGVza3RvcCh7XG4gICAgICBlbmRwb2ludDogYm9keS5lbmRwb2ludCxcbiAgICAgIGV4cGlyYXRpb25UaW1lOiBib2R5LmV4cGlyYXRpb25UaW1lICYmIG5ldyBEYXRlKGJvZHkuZXhwaXJhdGlvblRpbWUpLFxuICAgICAgcDI1NmRoOiBib2R5LmtleXMucDI1NmRoLFxuICAgICAgYXV0aDogYm9keS5rZXlzLmF1dGgsXG4gICAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGRldmljZS5pZCxcbiAgICAgIGVuZHBvaW50OiBkZXZpY2UuZW5kcG9pbnQsXG4gICAgICBjcmVhdGVkQXQ6IGRldmljZS5jcmVhdGVkQXQsXG4gICAgICBuYW1lOiBkZXZpY2UubmFtZSxcbiAgICB9O1xuICB9XG5cbiAgQERlbGV0ZSgnZGVza3RvcC9kZXZpY2UvOmRldmljZUlkJylcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZURlc2t0b3BVc2VyKFxuICAgIEBQYXJhbSgnZGV2aWNlSWQnKSBkZXZpY2VJZDogbnVtYmVyLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZG4gPSBhd2FpdCBEZXNrdG9wTm90aWZNb2RlbC5maW5kKHsgaWQ6IGRldmljZUlkLCB1c2VySWQgfSk7XG4gICAgaWYgKGRuLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IERlc2t0b3BOb3RpZk1vZGVsLnJlbW92ZShkbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlYmhvb2sgZnJvbSB0d2lsaW9cbiAgQFBvc3QoJy9waG9uZS92ZXJpZnknKVxuICBASGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKVxuICBhc3luYyB2ZXJpZnlQaG9uZVVzZXIoXG4gICAgQEJvZHkoKSBib2R5OiBUd2lsaW9Cb2R5LFxuICAgIEBIZWFkZXJzKCd4LXR3aWxpby1zaWduYXR1cmUnKSB0d2lsaW9TaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYm9keS5Cb2R5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlbmRlck51bWJlciA9IGJvZHkuRnJvbTtcblxuICAgIGNvbnN0IHR3aWxpb0F1dGhUb2tlbiA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ1RXSUxJT0FVVEhUT0tFTicpO1xuXG4gICAgY29uc3QgaXNWYWxpZGF0ZWQgPSB0d2lsaW8udmFsaWRhdGVSZXF1ZXN0KFxuICAgICAgdHdpbGlvQXV0aFRva2VuLFxuICAgICAgdHdpbGlvU2lnbmF0dXJlLnRyaW0oKSxcbiAgICAgIGAke3RoaXMuY29uZmlnU2VydmljZS5nZXQoJ0RPTUFJTicpfS9hcGkvdjEvbm90aWZpY2F0aW9ucy9waG9uZS92ZXJpZnlgLFxuICAgICAgYm9keSxcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkYXRlZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignTWVzc2FnZSBub3QgZnJvbSBUd2lsaW8nKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlVG9Vc2VyID0gYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2UudmVyaWZ5UGhvbmUoXG4gICAgICBzZW5kZXJOdW1iZXIsXG4gICAgICBtZXNzYWdlLFxuICAgICk7XG4gICAgY29uc3QgTWVzc2FnaW5nUmVzcG9uc2UgPSB0d2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2U7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgTWVzc2FnaW5nUmVzcG9uc2UoKTtcbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2VUb1VzZXIpO1xuXG4gICAgcmV0dXJuIHR3aW1sLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IExvZ2luQ29udHJvbGxlciB9IGZyb20gJy4vbG9naW4uY29udHJvbGxlcic7XG5pbXBvcnQgeyBKd3RTdHJhdGVneSB9IGZyb20gJy4uL2xvZ2luL2p3dC5zdHJhdGVneSc7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBKd3RNb2R1bGUucmVnaXN0ZXJBc3luYyh7XG4gICAgICBpbXBvcnRzOiBbQ29uZmlnTW9kdWxlXSxcbiAgICAgIGluamVjdDogW0NvbmZpZ1NlcnZpY2VdLFxuICAgICAgdXNlRmFjdG9yeTogYXN5bmMgKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+ICh7XG4gICAgICAgIHNlY3JldDogY29uZmlnU2VydmljZS5nZXQoJ0pXVF9TRUNSRVQnKSxcbiAgICAgIH0pLFxuICAgIH0pLFxuICBdLFxuICBjb250cm9sbGVyczogW0xvZ2luQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW0p3dFN0cmF0ZWd5LCBMb2dpbkNvdXJzZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQm9keSxcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgUG9zdCxcbiAgUXVlcnksXG4gIFJlcSxcbiAgUmVzLFxuICBVbmF1dGhvcml6ZWRFeGNlcHRpb24sXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQge1xuICBLaG91cnlEYXRhUGFyYW1zLFxuICBLaG91cnlSZWRpcmVjdFJlc3BvbnNlLFxuICBLaG91cnlTdHVkZW50Q291cnNlLFxuICBLaG91cnlUQUNvdXJzZSxcbiAgUm9sZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGh0dHBTaWduYXR1cmUgZnJvbSAnaHR0cC1zaWduYXR1cmUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vLi4vc3JjL25vbi1wcm9kdWN0aW9uLmd1YXJkJztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBMb2dpbkNvdXJzZVNlcnZpY2UgfSBmcm9tICcuL2xvZ2luLWNvdXJzZS5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIExvZ2luQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIGxvZ2luQ291cnNlU2VydmljZTogTG9naW5Db3Vyc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgand0U2VydmljZTogSnd0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICkge31cblxuICBAUG9zdCgnL2tob3VyeV9sb2dpbicpXG4gIGFzeW5jIHJlY2lldmVEYXRhRnJvbUtob3VyeShcbiAgICBAUmVxKCkgcmVxOiBSZXF1ZXN0LFxuICAgIEBCb2R5KCkgYm9keTogS2hvdXJ5RGF0YVBhcmFtcyxcbiAgKTogUHJvbWlzZTxLaG91cnlSZWRpcmVjdFJlc3BvbnNlPiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIENoZWNrIHRoYXQgcmVxdWVzdCBoYXMgY29tZSBmcm9tIEtob3VyeVxuICAgICAgY29uc3QgcGFyc2VkUmVxdWVzdCA9IGh0dHBTaWduYXR1cmUucGFyc2VSZXF1ZXN0KHJlcSk7XG4gICAgICBjb25zb2xlLmxvZygncGFyc2VkIHJlcXVlc3QnKTtcbiAgICAgIGNvbnN0IHZlcmlmeSA9IGh0dHBTaWduYXR1cmUudmVyaWZ5SE1BQyhcbiAgICAgICAgcGFyc2VkUmVxdWVzdCxcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnS0hPVVJZX1BSSVZBVEVfS0VZJyksXG4gICAgICApO1xuICAgICAgaWYgKCF2ZXJpZnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ludmFsaWQnKTtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZScpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ3ZhbGlkJyk7XG4gICAgfVxuXG4gICAgbGV0IHVzZXI6IFVzZXJNb2RlbDtcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfSxcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgY291cnNlczogW10gfSk7XG4gICAgfVxuXG4gICAgLy8gUTogRG8gd2UgbmVlZCB0aGlzIGlmIGl0J3Mgbm90IGdvaW5nIHRvIGNoYW5nZT9cbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB7XG4gICAgICBlbWFpbDogYm9keS5lbWFpbCxcbiAgICAgIG5hbWU6IGJvZHkuZmlyc3RfbmFtZSArICcgJyArIGJvZHkubGFzdF9uYW1lLFxuICAgICAgcGhvdG9VUkw6ICcnLFxuICAgIH0pO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdXNlckNvdXJzZXMgPSBbXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJvZHkuY291cnNlcy5tYXAoYXN5bmMgKGM6IEtob3VyeVN0dWRlbnRDb3Vyc2UpID0+IHtcbiAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2VNb2RlbCA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVNlY3Rpb25Ub0NvdXJzZShcbiAgICAgICAgICBjLmNvdXJzZSxcbiAgICAgICAgICBjLnNlY3Rpb24sXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvdXJzZSkge1xuICAgICAgICAgIGNvbnN0IHVzZXJDb3Vyc2UgPSBhd2FpdCB0aGlzLmxvZ2luQ291cnNlU2VydmljZS5jb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgICAgICAgICB1c2VyLmlkLFxuICAgICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgICAgUm9sZS5TVFVERU5ULFxuICAgICAgICAgICk7XG4gICAgICAgICAgdXNlckNvdXJzZXMucHVzaCh1c2VyQ291cnNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYm9keS50YV9jb3Vyc2VzLm1hcChhc3luYyAoYzogS2hvdXJ5VEFDb3Vyc2UpID0+IHtcbiAgICAgICAgLy8gUXVlcnkgZm9yIGFsbCB0aGUgY291cnNlcyB3aGljaCBtYXRjaCB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJpYyBjb3Vyc2UgZnJvbSBLaG91cnlcbiAgICAgICAgY29uc3QgY291cnNlTWFwcGluZ3MgPSBhd2FpdCBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLmZpbmQoe1xuICAgICAgICAgIHdoZXJlOiB7IGdlbmVyaWNDb3Vyc2VOYW1lOiBjLmNvdXJzZSB9LCAvLyBUT0RPOiBBZGQgc2VtZXN0ZXIgc3VwcG9ydFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvdXJzZU1hcHBpbmcgb2YgY291cnNlTWFwcGluZ3MpIHtcbiAgICAgICAgICBjb25zdCB0YUNvdXJzZSA9IGF3YWl0IHRoaXMubG9naW5Db3Vyc2VTZXJ2aWNlLmNvdXJzZVRvVXNlckNvdXJzZShcbiAgICAgICAgICAgIHVzZXIuaWQsXG4gICAgICAgICAgICBjb3Vyc2VNYXBwaW5nLmNvdXJzZUlkLFxuICAgICAgICAgICAgUm9sZS5UQSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHVzZXJDb3Vyc2VzLnB1c2godGFDb3Vyc2UpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIHVzZXIuY291cnNlcyA9IHVzZXJDb3Vyc2VzO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2Uuc2lnbkFzeW5jKFxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcbiAgICAgIHsgZXhwaXJlc0luOiA1ICogNjAgfSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICByZWRpcmVjdDpcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnRE9NQUlOJykgKyBgL2FwaS92MS9sb2dpbi9lbnRyeT90b2tlbj0ke3Rva2VufWAsXG4gICAgfTtcbiAgfVxuXG4gIC8vIE5PVEU6IEFsdGhvdWdoIHRoZSB0d28gcm91dGVzIGJlbG93IGFyZSBvbiB0aGUgYmFja2VuZCxcbiAgLy8gdGhleSBhcmUgbWVhbnQgdG8gYmUgdmlzaXRlZCBieSB0aGUgYnJvd3NlciBzbyBhIGNvb2tpZSBjYW4gYmUgc2V0XG5cbiAgLy8gVGhpcyBpcyB0aGUgcmVhbCBhZG1pbiBlbnRyeSBwb2ludFxuICBAR2V0KCcvbG9naW4vZW50cnknKVxuICBhc3luYyBlbnRlckZyb21LaG91cnkoXG4gICAgQFJlcygpIHJlczogUmVzcG9uc2UsXG4gICAgQFF1ZXJ5KCd0b2tlbicpIHRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlzVmVyaWZpZWQgPSBhd2FpdCB0aGlzLmp3dFNlcnZpY2UudmVyaWZ5QXN5bmModG9rZW4pO1xuXG4gICAgaWYgKCFpc1ZlcmlmaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuand0U2VydmljZS5kZWNvZGUodG9rZW4pIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcblxuICAgIHRoaXMuZW50ZXIocmVzLCBwYXlsb2FkLnVzZXJJZCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGZvciBsb2dpbiBvbiBkZXZlbG9wbWVudCBvbmx5XG4gIEBHZXQoJy9sb2dpbi9kZXYnKVxuICBAVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbiAgYXN5bmMgZW50ZXJGcm9tRGV2KFxuICAgIEBSZXMoKSByZXM6IFJlc3BvbnNlLFxuICAgIEBRdWVyeSgndXNlcklkJykgdXNlcklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZW50ZXIocmVzLCB1c2VySWQpO1xuICB9XG5cbiAgLy8gU2V0IGNvb2tpZSBhbmQgcmVkaXJlY3QgdG8gcHJvcGVyIHBhZ2VcbiAgcHJpdmF0ZSBhc3luYyBlbnRlcihyZXM6IFJlc3BvbnNlLCB1c2VySWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGF1dGhUb2tlbiA9IGF3YWl0IHRoaXMuand0U2VydmljZS5zaWduQXN5bmMoeyB1c2VySWQgfSk7XG4gICAgY29uc3QgaXNTZWN1cmUgPSB0aGlzLmNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXQ8c3RyaW5nPignRE9NQUlOJylcbiAgICAgIC5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgIHJlc1xuICAgICAgLmNvb2tpZSgnYXV0aF90b2tlbicsIGF1dGhUb2tlbiwgeyBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBpc1NlY3VyZSB9KVxuICAgICAgLnJlZGlyZWN0KDMwMiwgJy8nKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cC1zaWduYXR1cmVcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBpc1Byb2QgfSBmcm9tICdAa29oL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb25Qcm9kdWN0aW9uR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNhbkFjdGl2YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNQcm9kKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEVudGl0eSxcbiAgQ29sdW1uLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBCYXNlRW50aXR5LFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLmVudGl0eSc7XG5cbkBFbnRpdHkoJ2NvdXJzZV9zZWN0aW9uX21hcHBpbmdfbW9kZWwnKVxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIC8vIFRoaXMgaXMgdGhlIGNvdXJzZSBuYW1lIHRoYXQgaXMgc2VudCB0byB1cyBmcm9tIHRoZSBraG91cnkgYW1pbiBiYWNrZW5kXG4gIEBDb2x1bW4oKVxuICBnZW5lcmljQ291cnNlTmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oKVxuICBzZWN0aW9uOiBudW1iZXI7XG5cbiAgLy8gUmVwcmVzZW50cyB0aGUgY291cnNlIHRoYXQgdGhpcyBtYXBzIHRvXG4gIEBNYW55VG9PbmUoKHR5cGUpID0+IENvdXJzZU1vZGVsKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdjb3Vyc2VJZCcgfSlcbiAgY291cnNlOiBDb3Vyc2VNb2RlbDtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgY291cnNlSWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICdjb3Vyc2UvY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5Db3Vyc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VTZWN0aW9uVG9Db3Vyc2UoXG4gICAgY291cmVzTmFtZTogc3RyaW5nLFxuICAgIGNvdXJzZVNlY3Rpb246IG51bWJlcixcbiAgKTogUHJvbWlzZTxDb3Vyc2VNb2RlbD4ge1xuICAgIGNvbnN0IGNvdXJzZVNlY3Rpb25Nb2RlbCA9IGF3YWl0IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBnZW5lcmljQ291cnNlTmFtZTogY291cmVzTmFtZSwgc2VjdGlvbjogY291cnNlU2VjdGlvbiB9LFxuICAgICAgcmVsYXRpb25zOiBbJ2NvdXJzZSddLFxuICAgIH0pO1xuICAgIHJldHVybiBjb3Vyc2VTZWN0aW9uTW9kZWw/LmNvdXJzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3Vyc2VUb1VzZXJDb3Vyc2UoXG4gICAgdXNlcklkOiBudW1iZXIsXG4gICAgY291cnNlSWQ6IG51bWJlcixcbiAgICByb2xlOiBSb2xlLFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB1c2VyQ291cnNlOiBVc2VyQ291cnNlTW9kZWw7XG4gICAgdXNlckNvdXJzZSA9IGF3YWl0IFVzZXJDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZCwgY291cnNlSWQsIHJvbGUgfSxcbiAgICB9KTtcbiAgICBpZiAoIXVzZXJDb3Vyc2UpIHtcbiAgICAgIHVzZXJDb3Vyc2UgPSBhd2FpdCBVc2VyQ291cnNlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjb3Vyc2VJZCxcbiAgICAgICAgcm9sZSxcbiAgICAgIH0pLnNhdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXJDb3Vyc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IEV4dHJhY3RKd3QsIFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtand0JztcbmltcG9ydCB7IFBhc3Nwb3J0U3RyYXRlZ3kgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0U3RyYXRlZ3kgZXh0ZW5kcyBQYXNzcG9ydFN0cmF0ZWd5KFN0cmF0ZWd5KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBqd3RGcm9tUmVxdWVzdDogKHJlcTogUmVxdWVzdCkgPT4gcmVxLmNvb2tpZXNbJ2F1dGhfdG9rZW4nXSxcbiAgICAgIGlnbm9yZUV4cGlyYXRpb246IGZhbHNlLFxuICAgICAgc2VjcmV0T3JLZXk6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfU0VDUkVUJyksXG4gICAgfSk7XG4gIH1cblxuICB2YWxpZGF0ZShwYXlsb2FkOiB7IHVzZXJJZDogbnVtYmVyIH0pOiBhbnkge1xuICAgIHJldHVybiB7IC4uLnBheWxvYWQgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtand0XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByb2ZpbGVDb250cm9sbGVyIH0gZnJvbSAnLi9wcm9maWxlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW05vdGlmaWNhdGlvbk1vZHVsZV0sXG4gIGNvbnRyb2xsZXJzOiBbUHJvZmlsZUNvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQsIFVzZUd1YXJkcywgUGF0Y2gsIEJvZHkgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgRGVza3RvcE5vdGlmUGFydGlhbCxcbiAgR2V0UHJvZmlsZVJlc3BvbnNlLFxuICBVcGRhdGVQcm9maWxlUGFyYW1zLFxufSBmcm9tICdAa29oL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9sb2dpbi9qd3QtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ3Byb2ZpbGUnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBub3RpZlNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgYXN5bmMgZ2V0KFxuICAgIEBVc2VyKFsnY291cnNlcycsICdjb3Vyc2VzLmNvdXJzZScsICdwaG9uZU5vdGlmJywgJ2Rlc2t0b3BOb3RpZnMnXSlcbiAgICB1c2VyOiBVc2VyTW9kZWwsXG4gICk6IFByb21pc2U8R2V0UHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgY291cnNlcyA9IHVzZXIuY291cnNlc1xuICAgICAgLmZpbHRlcigodXNlckNvdXJzZSkgPT4gdXNlckNvdXJzZS5jb3Vyc2UuZW5hYmxlZClcbiAgICAgIC5tYXAoKHVzZXJDb3Vyc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb3Vyc2U6IHtcbiAgICAgICAgICAgIGlkOiB1c2VyQ291cnNlLmNvdXJzZUlkLFxuICAgICAgICAgICAgbmFtZTogdXNlckNvdXJzZS5jb3Vyc2UubmFtZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGU6IHVzZXJDb3Vyc2Uucm9sZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZGVza3RvcE5vdGlmczogRGVza3RvcE5vdGlmUGFydGlhbFtdID0gdXNlci5kZXNrdG9wTm90aWZzLm1hcChcbiAgICAgIChkKSA9PiAoe1xuICAgICAgICBlbmRwb2ludDogZC5lbmRwb2ludCxcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGNyZWF0ZWRBdDogZC5jcmVhdGVkQXQsXG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCB1c2VyUmVzcG9uc2UgPSBwaWNrKHVzZXIsIFtcbiAgICAgICdpZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ25hbWUnLFxuICAgICAgJ3Bob3RvVVJMJyxcbiAgICAgICdkZXNrdG9wTm90aWZzRW5hYmxlZCcsXG4gICAgICAncGhvbmVOb3RpZnNFbmFibGVkJyxcbiAgICBdKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXNlclJlc3BvbnNlLFxuICAgICAgY291cnNlcyxcbiAgICAgIHBob25lTnVtYmVyOiB1c2VyLnBob25lTm90aWY/LnBob25lTnVtYmVyLFxuICAgICAgZGVza3RvcE5vdGlmcyxcbiAgICB9O1xuICB9XG5cbiAgQFBhdGNoKClcbiAgYXN5bmMgcGF0Y2goXG4gICAgQEJvZHkoKSB1c2VyUGF0Y2g6IFVwZGF0ZVByb2ZpbGVQYXJhbXMsXG4gICAgQFVzZXIoWydjb3Vyc2VzJywgJ2NvdXJzZXMuY291cnNlJywgJ3Bob25lTm90aWYnLCAnZGVza3RvcE5vdGlmcyddKVxuICAgIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxHZXRQcm9maWxlUmVzcG9uc2U+IHtcbiAgICB1c2VyID0gT2JqZWN0LmFzc2lnbih1c2VyLCB1c2VyUGF0Y2gpO1xuICAgIGlmIChcbiAgICAgIHVzZXIucGhvbmVOb3RpZnNFbmFibGVkICYmXG4gICAgICB1c2VyUGF0Y2gucGhvbmVOdW1iZXIgIT09IHVzZXIucGhvbmVOb3RpZj8ucGhvbmVOdW1iZXJcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZTZXJ2aWNlLnJlZ2lzdGVyUGhvbmUodXNlclBhdGNoLnBob25lTnVtYmVyLCB1c2VyKTtcbiAgICB9XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXQodXNlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vcXVlc3Rpb24uY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWVzdGlvblN1YnNjcmliZXIgfSBmcm9tICcuL3F1ZXN0aW9uLnN1YnNjcmliZXInO1xuaW1wb3J0IHsgUXVldWVNb2R1bGUgfSBmcm9tICdxdWV1ZS9xdWV1ZS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtRdWVzdGlvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtRdWVzdGlvblN1YnNjcmliZXJdLFxuICBpbXBvcnRzOiBbTm90aWZpY2F0aW9uTW9kdWxlLCBRdWV1ZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDbG9zZWRRdWVzdGlvblN0YXR1cyxcbiAgQ3JlYXRlUXVlc3Rpb25QYXJhbXMsXG4gIENyZWF0ZVF1ZXN0aW9uUmVzcG9uc2UsXG4gIEdldFF1ZXN0aW9uUmVzcG9uc2UsXG4gIE9wZW5RdWVzdGlvblN0YXR1cyxcbiAgUXVlc3Rpb25TdGF0dXNLZXlzLFxuICBSb2xlLFxuICBVcGRhdGVRdWVzdGlvblBhcmFtcyxcbiAgVXBkYXRlUXVlc3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHtcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbiAgQm9keSxcbiAgQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IsXG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgTWV0aG9kTm90QWxsb3dlZEV4Y2VwdGlvbixcbiAgTm90Rm91bmRFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBQYXRjaCxcbiAgUG9zdCxcbiAgVW5hdXRob3JpemVkRXhjZXB0aW9uLFxuICBVc2VHdWFyZHMsXG4gIFVzZUludGVyY2VwdG9ycyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgSW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2xvZ2luL2p3dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gIE5vdGlmTXNncyxcbn0gZnJvbSAnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vcHJvZmlsZS9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgVXNlciwgVXNlcklkIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuLi9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVlc3Rpb25Sb2xlc0d1YXJkIH0gZnJvbSAnLi9xdWVzdGlvbi1yb2xlLmd1YXJkJztcbmltcG9ydCB7IFF1ZXN0aW9uTW9kZWwgfSBmcm9tICcuL3F1ZXN0aW9uLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdxdWVzdGlvbnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQsIFF1ZXN0aW9uUm9sZXNHdWFyZClcbkBVc2VJbnRlcmNlcHRvcnMoQ2xhc3NTZXJpYWxpemVySW50ZXJjZXB0b3IpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOnF1ZXN0aW9uSWQnKVxuICBhc3luYyBnZXRRdWVzdGlvbihcbiAgICBAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIsXG4gICk6IFByb21pc2U8R2V0UXVlc3Rpb25SZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHF1ZXN0aW9uSWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFJvbGUuU1RVREVOVClcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiBDcmVhdGVRdWVzdGlvblBhcmFtcyxcbiAgICBAVXNlcigpIHVzZXI6IFVzZXJNb2RlbCxcbiAgKTogUHJvbWlzZTxDcmVhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvblR5cGUsIHF1ZXVlSWQsIGZvcmNlIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXVlSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICB9KTtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignUG9zdGVkIHRvIGFuIGludmFsaWQgcXVldWUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXF1ZXVlLmFsbG93UXVlc3Rpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0aG9kTm90QWxsb3dlZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHRoaW5rIG9mIGEgbmVhdCB3YXkgdG8gbWFrZSB0aGlzIGFic3RyYWN0ZWRcbiAgICBjb25zdCBpc1VzZXJJbkNvdXJzZSA9XG4gICAgICAoYXdhaXQgVXNlckNvdXJzZU1vZGVsLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgICAgY291cnNlSWQ6IHF1ZXVlLmNvdXJzZUlkLFxuICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgfSxcbiAgICAgIH0pKSA9PT0gMTtcblxuICAgIGlmICghaXNVc2VySW5Db3Vyc2UpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgIFwiQ2FuJ3QgcG9zdCBxdWVzdGlvbiB0byBjb3Vyc2UgeW91J3JlIG5vdCBpbiFcIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCEoYXdhaXQgcXVldWUuY2hlY2tJc09wZW4oKSkpIHtcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxuICAgICAgICBcIllvdSBjYW4ndCBwb3N0IGEgcXVlc3Rpb24gdG8gYSBjbG9zZWQgcXVldWVcIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNVc2VyUXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY3JlYXRvcklkOiB1c2VyLmlkLFxuICAgICAgICBzdGF0dXM6IEluKE9iamVjdC52YWx1ZXMoT3BlblF1ZXN0aW9uU3RhdHVzKSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCEhcHJldmlvdXNVc2VyUXVlc3Rpb24pIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICBwcmV2aW91c1VzZXJRdWVzdGlvbi5zdGF0dXMgPSBDbG9zZWRRdWVzdGlvblN0YXR1cy5SZXNvbHZlZDtcbiAgICAgICAgYXdhaXQgcHJldmlvdXNVc2VyUXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXG4gICAgICAgICAgXCJZb3UgY2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiBvbmUgcXVlc3Rpb24gYXQgYSB0aW1lLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5jcmVhdGUoe1xuICAgICAgcXVldWVJZDogcXVldWVJZCxcbiAgICAgIGNyZWF0b3I6IHVzZXIsXG4gICAgICB0ZXh0LFxuICAgICAgcXVlc3Rpb25UeXBlLFxuICAgICAgc3RhdHVzOiBRdWVzdGlvblN0YXR1c0tleXMuRHJhZnRpbmcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc09ubGluZTogdHJ1ZSxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBAUGF0Y2goJzpxdWVzdGlvbklkJylcbiAgQFJvbGVzKFJvbGUuU1RVREVOVCwgUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIHVwZGF0ZVF1ZXN0aW9uKFxuICAgIEBQYXJhbSgncXVlc3Rpb25JZCcpIHF1ZXN0aW9uSWQ6IG51bWJlcixcbiAgICBAQm9keSgpIGJvZHk6IFVwZGF0ZVF1ZXN0aW9uUGFyYW1zLFxuICAgIEBVc2VySWQoKSB1c2VySWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxVcGRhdGVRdWVzdGlvblJlc3BvbnNlPiB7XG4gICAgLy8gVE9ETzogQ2hlY2sgdGhhdCB0aGUgcXVlc3Rpb25faWQgYmVsb25ncyB0byB0aGUgdXNlciBvciBhIFRBIHRoYXQgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGUgZ2l2ZW4gcXVldWVfaWRcbiAgICAvLyBUT0RPOiBVc2UgdXNlciB0eXBlIHRvIGRlcnRlcm1pbmUgd2V0aGVyIG9yIG5vdCB3ZSBzaG91bGQgaW5jbHVkZSB0aGUgdGV4dCBpbiB0aGUgcmVzcG9uc2VcbiAgICBsZXQgcXVlc3Rpb24gPSBhd2FpdCBRdWVzdGlvbk1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHF1ZXN0aW9uSWQgfSxcbiAgICAgIHJlbGF0aW9uczogWydjcmVhdG9yJywgJ3F1ZXVlJywgJ3RhSGVscGVkJ10sXG4gICAgfSk7XG4gICAgaWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ3JlYXRvciA9IHVzZXJJZCA9PT0gcXVlc3Rpb24uY3JlYXRvcklkO1xuXG4gICAgaWYgKGlzQ3JlYXRvcikge1xuICAgICAgLy8gQ3JlYXRvciBjYW4gYWx3YXlzIGVkaXRcbiAgICAgIGlmIChib2R5LnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAnU3R1ZGVudHMgY2Fubm90IG1hcmsgcXVlc3Rpb24gYXMgaGVscGluZycsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoYm9keS5zdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgJ1N0dWRlbnRzIGNhbm5vdCBtYXJrIHF1ZXN0aW9uIGFzIHJlc29sdmVkJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHF1ZXN0aW9uID0gT2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgYm9keSk7XG4gICAgICBhd2FpdCBxdWVzdGlvbi5zYXZlKCk7XG4gICAgICByZXR1cm4gcXVlc3Rpb247XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGNyZWF0b3IsIGNoZWNrIGlmIHVzZXIgaXMgVEEvUFJPRiBvZiBjb3Vyc2Ugb2YgcXVlc3Rpb25cbiAgICBjb25zdCBpc1RhT3JQcm9mID1cbiAgICAgIChhd2FpdCBVc2VyQ291cnNlTW9kZWwuY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjb3Vyc2VJZDogcXVlc3Rpb24ucXVldWUuY291cnNlSWQsXG4gICAgICAgICAgcm9sZTogSW4oW1JvbGUuVEEsIFJvbGUuUFJPRkVTU09SXSksXG4gICAgICAgIH0sXG4gICAgICB9KSkgPiAwO1xuXG4gICAgaWYgKGlzVGFPclByb2YpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggIT09IDEgfHwgT2JqZWN0LmtleXMoYm9keSlbMF0gIT09ICdzdGF0dXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oXG4gICAgICAgICAgJ1RBL1Byb2Zlc3NvcnMgY2FuIG9ubHkgZWRpdCBxdWVzdGlvbiBzdGF0dXMnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gSWYgdGhlIHRhSGVscGVkIGlzIGFscmVhZHkgc2V0LCBtYWtlIHN1cmUgdGhlIHNhbWUgdGEgdXBkYXRlcyB0aGUgc3RhdHVzXG4gICAgICBpZiAocXVlc3Rpb24udGFIZWxwZWQ/LmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAgICAgJ0Fub3RoZXIgVEEgaXMgY3VycmVudGx5IGhlbHBpbmcgd2l0aCB0aGlzIHF1ZXN0aW9uJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IENsb3NlZFF1ZXN0aW9uU3RhdHVzLlJlc29sdmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbihcbiAgICAgICAgICAgICdBbm90aGVyIFRBIGhhcyBhbHJlYWR5IHJlc29sdmVkIHRoaXMgcXVlc3Rpb24nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNBbHJlYWR5SGVscGluZ09uZSA9XG4gICAgICAgIChhd2FpdCBRdWVzdGlvbk1vZGVsLmNvdW50KHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgdGFIZWxwZWRJZDogdXNlcklkLFxuICAgICAgICAgICAgc3RhdHVzOiBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSkgPT09IDE7XG4gICAgICBpZiAoaXNBbHJlYWR5SGVscGluZ09uZSAmJiBib2R5LnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLkhlbHBpbmcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBUQSBhcyB0YUhlbHBlZCB3aGVuIHRoZSBUQSBzdGFydHMgaGVscGluZyB0aGUgc3R1ZGVudFxuICAgICAgaWYgKFxuICAgICAgICBxdWVzdGlvbi5zdGF0dXMgIT09IE9wZW5RdWVzdGlvblN0YXR1cy5IZWxwaW5nICYmXG4gICAgICAgIGJvZHkuc3RhdHVzID09PSBPcGVuUXVlc3Rpb25TdGF0dXMuSGVscGluZ1xuICAgICAgKSB7XG4gICAgICAgIHF1ZXN0aW9uLnRhSGVscGVkID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUodXNlcklkKTtcbiAgICAgICAgcXVlc3Rpb24uaGVscGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHF1ZXN0aW9uLmNyZWF0b3IuaWQsXG4gICAgICAgICAgTm90aWZNc2dzLnF1ZXVlLlRBX0hJVF9IRUxQRUQocXVlc3Rpb24udGFIZWxwZWQubmFtZSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbiA9IE9iamVjdC5hc3NpZ24ocXVlc3Rpb24sIGJvZHkpO1xuICAgICAgYXdhaXQgcXVlc3Rpb24uc2F2ZSgpO1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKFxuICAgICAgICAnTG9nZ2VkLWluIHVzZXIgZG9lcyBub3QgaGF2ZSBlZGl0IGFjY2VzcycsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBQb3N0KCc6cXVlc3Rpb25JZC9ub3RpZnknKVxuICBAUm9sZXMoUm9sZS5UQSwgUm9sZS5QUk9GRVNTT1IpXG4gIGFzeW5jIG5vdGlmeShAUGFyYW0oJ3F1ZXN0aW9uSWQnKSBxdWVzdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwuZmluZE9uZShxdWVzdGlvbklkLCB7XG4gICAgICByZWxhdGlvbnM6IFsncXVldWUnXSxcbiAgICB9KTtcblxuICAgIGlmIChxdWVzdGlvbi5zdGF0dXMgPT09IE9wZW5RdWVzdGlvblN0YXR1cy5DYW50RmluZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuQUxFUlRfQlVUVE9OLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnN0YXR1cyA9PT0gT3BlblF1ZXN0aW9uU3RhdHVzLlRBRGVsZXRlZCkge1xuICAgICAgYXdhaXQgdGhpcy5ub3RpZlNlcnZpY2Uubm90aWZ5VXNlcihcbiAgICAgICAgcXVlc3Rpb24uY3JlYXRvcklkLFxuICAgICAgICBOb3RpZk1zZ3MucXVldWUuUkVNT1ZFRCxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOb3RGb3VuZEV4Y2VwdGlvbixcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi4vcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9xdWVzdGlvbi5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL3JvbGUuZ3VhcmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb2xlc0d1YXJkIGV4dGVuZHMgUm9sZXNHdWFyZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIGFzeW5jIHNldHVwRGF0YShcbiAgICByZXF1ZXN0OiBhbnksXG4gICk6IFByb21pc2U8eyBjb3Vyc2VJZDogbnVtYmVyOyB1c2VyOiBVc2VyTW9kZWwgfT4ge1xuICAgIGxldCBxdWV1ZUlkO1xuXG4gICAgaWYgKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5maW5kT25lKHJlcXVlc3QucGFyYW1zLnF1ZXN0aW9uSWQpO1xuICAgICAgaWYgKCFxdWVzdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1F1ZXN0aW9uIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuICAgICAgcXVldWVJZCA9IHF1ZXN0aW9uLnF1ZXVlSWQ7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmJvZHkucXVldWVJZCkge1xuICAgICAgLy8gSWYgeW91IGFyZSBjcmVhdGluZyBhIG5ldyBxdWVzdGlvblxuICAgICAgcXVldWVJZCA9IHJlcXVlc3QuYm9keS5xdWV1ZUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbignQ2Fubm90IGZpbmQgcXVldWUgb2YgcXVlc3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShxdWV1ZUlkKTtcblxuICAgIC8vIFlvdSBjYW5ub3QgaW50ZXJhY3Qgd2l0aCBhIHF1ZXN0aW9uIGluIGEgbm9uZXhpc3RlbnQgcXVldWVcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ1RoaXMgcXVldWUgZG9lcyBub3QgZXhpc3QhJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvdXJzZUlkID0gcXVldWUuY291cnNlSWQ7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHJlcXVlc3QudXNlci51c2VySWQsIHtcbiAgICAgIHJlbGF0aW9uczogWydjb3Vyc2VzJ10sXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBjb3Vyc2VJZCwgdXNlciB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9zZWRRdWVzdGlvblN0YXR1cywgT3BlblF1ZXN0aW9uU3RhdHVzIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgUXVldWVTU0VTZXJ2aWNlIH0gZnJvbSAncXVldWUvcXVldWUtc3NlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJ3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uLFxuICBFbnRpdHlTdWJzY3JpYmVySW50ZXJmYWNlLFxuICBFdmVudFN1YnNjcmliZXIsXG4gIEluc2VydEV2ZW50LFxuICBSZW1vdmVFdmVudCxcbiAgVXBkYXRlRXZlbnQsXG59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZNc2dzLFxufSBmcm9tICcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4vcXVlc3Rpb24uZW50aXR5JztcblxuQEV2ZW50U3Vic2NyaWJlcigpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TdWJzY3JpYmVyXG4gIGltcGxlbWVudHMgRW50aXR5U3Vic2NyaWJlckludGVyZmFjZTxRdWVzdGlvbk1vZGVsPiB7XG4gIHByaXZhdGUgbm90aWZTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHF1ZXVlU1NFU2VydmljZTogUXVldWVTU0VTZXJ2aWNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uLFxuICAgIG5vdGlmU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBxdWV1ZVNTRVNlcnZpY2U6IFF1ZXVlU1NFU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5ub3RpZlNlcnZpY2UgPSBub3RpZlNlcnZpY2U7XG4gICAgdGhpcy5xdWV1ZVNTRVNlcnZpY2UgPSBxdWV1ZVNTRVNlcnZpY2U7XG4gICAgY29ubmVjdGlvbi5zdWJzY3JpYmVycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgbGlzdGVuVG8oKSB7XG4gICAgcmV0dXJuIFF1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBhc3luYyBhZnRlclVwZGF0ZShldmVudDogVXBkYXRlRXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICBhd2FpdCB0aGlzLnF1ZXVlU1NFU2VydmljZS51cGRhdGVRdWVzdGlvbnMoZXZlbnQuZW50aXR5LnF1ZXVlSWQpO1xuXG4gICAgLy8gU2VuZCBwdXNoIG5vdGlmaWNhdGlvbiB0byBzdHVkZW50cyB3aGVuIHRoZXkgYXJlIGhpdCAzcmQgaW4gbGluZVxuICAgIC8vIGlmIHN0YXR1cyB1cGRhdGVkIHRvIGNsb3NlZFxuICAgIGlmIChcbiAgICAgIGV2ZW50LnVwZGF0ZWRDb2x1bW5zLmZpbmQoKGMpID0+IGMucHJvcGVydHlOYW1lID09PSAnc3RhdHVzJykgJiZcbiAgICAgIGV2ZW50LmVudGl0eS5zdGF0dXMgaW4gQ2xvc2VkUXVlc3Rpb25TdGF0dXNcbiAgICApIHtcbiAgICAgIC8vIGdldCAzcmQgaW4gcXVldWUgYmVmb3JlIGFuZCBhZnRlciB0aGlzIHVwZGF0ZVxuICAgICAgY29uc3QgcHJldmlvdXNUaGlyZCA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwub3BlbkluUXVldWUoXG4gICAgICAgIGV2ZW50LmVudGl0eS5xdWV1ZUlkLFxuICAgICAgKVxuICAgICAgICAub2Zmc2V0KDIpXG4gICAgICAgIC5nZXRPbmUoKTtcbiAgICAgIGNvbnN0IHRoaXJkID0gYXdhaXQgUXVlc3Rpb25Nb2RlbC5vcGVuSW5RdWV1ZShldmVudC5lbnRpdHkucXVldWVJZClcbiAgICAgICAgLnNldFF1ZXJ5UnVubmVyKGV2ZW50LnF1ZXJ5UnVubmVyKSAvLyBSdW4gaW4gc2FtZSB0cmFuc2FjdGlvbiBhcyB0aGUgdXBkYXRlXG4gICAgICAgIC5vZmZzZXQoMilcbiAgICAgICAgLmdldE9uZSgpO1xuICAgICAgaWYgKHRoaXJkICYmIHByZXZpb3VzVGhpcmQ/LmlkICE9PSB0aGlyZD8uaWQpIHtcbiAgICAgICAgY29uc3QgeyBjcmVhdG9ySWQgfSA9IHRoaXJkO1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKGNyZWF0b3JJZCwgTm90aWZNc2dzLnF1ZXVlLlRISVJEX1BMQUNFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZnRlckluc2VydChldmVudDogSW5zZXJ0RXZlbnQ8UXVlc3Rpb25Nb2RlbD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJPZlF1ZXN0aW9ucyA9IGF3YWl0IFF1ZXN0aW9uTW9kZWwub3BlbkluUXVldWUoXG4gICAgICBldmVudC5lbnRpdHkucXVldWVJZCxcbiAgICApXG4gICAgICAuYW5kV2hlcmUoJ3F1ZXN0aW9uLnN0YXR1cyBJTiAoOi4uLm9wZW5TdGF0dXMpJywge1xuICAgICAgICBvcGVuU3RhdHVzOiBbT3BlblF1ZXN0aW9uU3RhdHVzLkRyYWZ0aW5nLCBPcGVuUXVlc3Rpb25TdGF0dXMuUXVldWVkXSxcbiAgICAgIH0pXG4gICAgICAuZ2V0Q291bnQoKTtcblxuICAgIGlmIChudW1iZXJPZlF1ZXN0aW9ucyA9PT0gMCkge1xuICAgICAgY29uc3Qgc3RhZmYgPSAoXG4gICAgICAgIGF3YWl0IFF1ZXVlTW9kZWwuZmluZE9uZShldmVudC5lbnRpdHkucXVldWVJZCwge1xuICAgICAgICAgIHJlbGF0aW9uczogWydzdGFmZkxpc3QnXSxcbiAgICAgICAgfSlcbiAgICAgICkuc3RhZmZMaXN0O1xuXG4gICAgICBzdGFmZi5mb3JFYWNoKChzdGFmZikgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmU2VydmljZS5ub3RpZnlVc2VyKFxuICAgICAgICAgIHN0YWZmLmlkLFxuICAgICAgICAgIE5vdGlmTXNncy50YS5TVFVERU5UX0pPSU5FRF9FTVBUWV9RVUVVRSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNlbmQgYWxsIGxpc3RlbmluZyBjbGllbnRzIGFuIHVwZGF0ZVxuICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gIH1cblxuICBhc3luYyBiZWZvcmVSZW1vdmUoZXZlbnQ6IFJlbW92ZUV2ZW50PFF1ZXN0aW9uTW9kZWw+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gZHVlIHRvIGNhc2NhZGVzIGVudGl0eSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBsb2FkZWRcbiAgICBpZiAoZXZlbnQuZW50aXR5KSB7XG4gICAgICAvLyBTZW5kIGFsbCBsaXN0ZW5pbmcgY2xpZW50cyBhbiB1cGRhdGVcbiAgICAgIGF3YWl0IHRoaXMucXVldWVTU0VTZXJ2aWNlLnVwZGF0ZVF1ZXN0aW9ucyhldmVudC5lbnRpdHkucXVldWVJZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBTZWVkQ29udHJvbGxlciB9IGZyb20gJy4vc2VlZC5jb250cm9sbGVyJztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtTZWVkQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1NlZWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VlZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnQGtvaC9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvdXJzZU1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLWNvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtcbiAgT2ZmaWNlSG91ckZhY3RvcnksXG4gIFF1ZXN0aW9uRmFjdG9yeSxcbiAgUXVldWVGYWN0b3J5LFxuICBVc2VyQ291cnNlRmFjdG9yeSxcbiAgU2VtZXN0ZXJGYWN0b3J5LFxuICBDb3Vyc2VGYWN0b3J5LFxuICBVc2VyRmFjdG9yeSxcbn0gZnJvbSAnLi4vLi4vdGVzdC91dGlsL2ZhY3Rvcmllcyc7XG5pbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4uL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgTm9uUHJvZHVjdGlvbkd1YXJkIH0gZnJvbSAnLi4vbm9uLXByb2R1Y3Rpb24uZ3VhcmQnO1xuaW1wb3J0IHsgUXVlc3Rpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vcXVldWUvcXVldWUuZW50aXR5JztcbmltcG9ydCB7IFNlZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAncHJvZmlsZS91c2VyLmVudGl0eSc7XG5cbkBDb250cm9sbGVyKCdzZWVkcycpXG5AVXNlR3VhcmRzKE5vblByb2R1Y3Rpb25HdWFyZClcbmV4cG9ydCBjbGFzcyBTZWVkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdGlvbixcbiAgICBwcml2YXRlIHNlZWRTZXJ2aWNlOiBTZWVkU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJ2RlbGV0ZScpXG4gIGFzeW5jIGRlbGV0ZUFsbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuc2VlZFNlcnZpY2UuZGVsZXRlQWxsKE9mZmljZUhvdXJNb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVlc3Rpb25Nb2RlbCk7XG4gICAgYXdhaXQgdGhpcy5zZWVkU2VydmljZS5kZWxldGVBbGwoUXVldWVNb2RlbCk7XG5cbiAgICByZXR1cm4gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHJlc2V0JztcbiAgfVxuXG4gIEBHZXQoJ2NyZWF0ZScpXG4gIGFzeW5jIGNyZWF0ZVNlZWRzKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gRmlyc3QgZGVsZXRlIHRoZSBvbGQgZGF0YVxuICAgIGF3YWl0IHRoaXMuZGVsZXRlQWxsKCk7XG5cbiAgICAvLyBUaGVuIGFkZCB0aGUgbmV3IHNlZWQgZGF0YVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSAtIDI0KTtcblxuICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICB0b21vcnJvdy5zZXRVVENIb3Vycyhub3cuZ2V0VVRDSG91cnMoKSArIDE5KTtcblxuICAgIGNvbnN0IG9mZmljZUhvdXJzVG9kYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBub3csXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpIC0gNDUwMDAwMCksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShub3cudmFsdWVPZigpICsgMTAwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNZZXN0ZXJkYXkgPSBhd2FpdCBPZmZpY2VIb3VyRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgc3RhcnRUaW1lOiB5ZXN0ZXJkYXksXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZSh5ZXN0ZXJkYXkudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG4gICAgY29uc3Qgb2ZmaWNlSG91cnNUb21vcnJvdyA9IGF3YWl0IE9mZmljZUhvdXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBzdGFydFRpbWU6IHRvbW9ycm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUodG9tb3Jyb3cudmFsdWVPZigpICsgNDUwMDAwMCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3Vyc2VFeGlzdHMgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IG5hbWU6ICdDUyAyNTAwJyB9LFxuICAgIH0pO1xuICAgIGlmICghY291cnNlRXhpc3RzKSB7XG4gICAgICBhd2FpdCBTZW1lc3RlckZhY3RvcnkuY3JlYXRlKHsgc2Vhc29uOiAnRmFsbCcsIHllYXI6IDIwMjAgfSk7XG4gICAgICBhd2FpdCBDb3Vyc2VGYWN0b3J5LmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IENvdXJzZU1vZGVsLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgbmFtZTogJ0NTIDI1MDAnIH0sXG4gICAgICByZWxhdGlvbnM6IFsnb2ZmaWNlSG91cnMnXSxcbiAgICB9KTtcblxuICAgIGNvdXJzZS5vZmZpY2VIb3VycyA9IFtcbiAgICAgIG9mZmljZUhvdXJzVG9kYXksXG4gICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgIG9mZmljZUhvdXJzVG9tb3Jyb3csXG4gICAgICBvZmZpY2VIb3Vyc1RvZGF5T3ZlcmxhcCxcbiAgICBdO1xuICAgIGNvdXJzZS5zYXZlKCk7XG5cbiAgICBjb25zdCB1c2VyRXhzaXN0cyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKCk7XG4gICAgaWYgKCF1c2VyRXhzaXN0cykge1xuICAgICAgLy8gU3R1ZGVudCAxXG4gICAgICBjb25zdCB1c2VyMSA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnbGl1LnN0YUBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ1N0YW5sZXkgTGl1JyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSMjBDRzM2RS1jZjBmMzc1MjUyYmQtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjEsXG4gICAgICAgIHJvbGU6IFJvbGUuU1RVREVOVCxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICAgIC8vIFN0dW5kZW50IDJcbiAgICAgIGNvbnN0IHVzZXIyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgZW1haWw6ICd0YWtheWFtYS5hQG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnQWxleCBUYWtheWFtYScsXG4gICAgICAgIHBob3RvVVJMOlxuICAgICAgICAgICdodHRwczovL2NhLnNsYWNrLWVkZ2UuY29tL1RFNTY1TlU3OS1VSkw5NzQ0M0QtNTAxMjEzMzk2ODZiLTUxMicsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHVzZXI6IHVzZXIyLFxuICAgICAgICByb2xlOiBSb2xlLlNUVURFTlQsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAxXG4gICAgICBjb25zdCB1c2VyMyA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnc3RlbnplbC53QG5vcnRoZWFzdGVybi5lZHUnLFxuICAgICAgICBuYW1lOiAnV2lsbCBTdGVuemVsJyxcbiAgICAgICAgcGhvdG9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vY2Euc2xhY2stZWRnZS5jb20vVEU1NjVOVTc5LVVSRjI1NktSVC1kMTAwOThlODc5ZGEtNTEyJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgVXNlckNvdXJzZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgdXNlcjogdXNlcjMsXG4gICAgICAgIHJvbGU6IFJvbGUuVEEsXG4gICAgICAgIGNvdXJzZTogY291cnNlLFxuICAgICAgfSk7XG4gICAgICAvLyBUQSAyXG4gICAgICBjb25zdCB1c2VyNCA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGVtYWlsOiAnY2h1LmRhakBub3J0aGVhc3Rlcm4uZWR1JyxcbiAgICAgICAgbmFtZTogJ0RhLUppbiBDaHUnLFxuICAgICAgICBwaG90b1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9jYS5zbGFjay1lZGdlLmNvbS9URTU2NU5VNzktVUU1Nlk1VVQxLTg1ZGI1OWE0NzRmNC01MTInLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICB1c2VyOiB1c2VyNCxcbiAgICAgICAgcm9sZTogUm9sZS5UQSxcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcm9vbTogJ1dIViAxMDEnLFxuICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICBvZmZpY2VIb3VyczogW1xuICAgICAgICBvZmZpY2VIb3Vyc1RvZGF5LFxuICAgICAgICBvZmZpY2VIb3Vyc1llc3RlcmRheSxcbiAgICAgICAgb2ZmaWNlSG91cnNUb21vcnJvdyxcbiAgICAgICAgb2ZmaWNlSG91cnNUb2RheU92ZXJsYXAsXG4gICAgICBdLFxuICAgICAgYWxsb3dRdWVzdGlvbnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDM1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMjUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBHZXQoJ2ZpbGxRdWV1ZScpXG4gIGFzeW5jIGZpbGxRdWV1ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHF1ZXVlID0gYXdhaXQgUXVldWVNb2RlbC5maW5kT25lKCk7XG5cbiAgICBhd2FpdCBRdWVzdGlvbkZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDE1MDAwMDApLFxuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXN0aW9uRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgcXVldWU6IHF1ZXVlLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDAwMCksXG4gICAgfSk7XG4gICAgYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICBxdWV1ZTogcXVldWUsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxNTAwMDAwKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAnRGF0YSBzdWNjZXNzZnVsbHkgc2VlZGVkJztcbiAgfVxuXG4gIEBQb3N0KCdjcmVhdGVVc2VyJylcbiAgYXN5bmMgY3JlYXRlVXNlcihcbiAgICBAQm9keSgpIGJvZHk6IHsgcm9sZTogUm9sZTsgY291cnNlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFVzZXJDb3Vyc2VNb2RlbD4ge1xuICAgIGxldCB0YTogVXNlckNvdXJzZU1vZGVsO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgdGEgPSBhd2FpdCBVc2VyQ291cnNlRmFjdG9yeS5jcmVhdGUoeyByb2xlOiBib2R5LnJvbGUsIGNvdXJzZTogY291cnNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9IGF3YWl0IFVzZXJDb3Vyc2VGYWN0b3J5LmNyZWF0ZSh7IHJvbGU6IGJvZHkucm9sZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXVlJylcbiAgYXN5bmMgY3JlYXRlUXVldWUoXG4gICAgQEJvZHkoKSBib2R5OiB7IGNvdXJzZUlkOiBudW1iZXI7IGFsbG93UXVlc3Rpb25zOiBib29sZWFuIH0sXG4gICk6IFByb21pc2U8UXVldWVNb2RlbD4ge1xuICAgIGxldCBxdWV1ZTogUXVldWVNb2RlbDtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG9mZmljZUhvdXJzID0gYXdhaXQgT2ZmaWNlSG91ckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgIHN0YXJ0VGltZTogbm93LFxuICAgICAgZW5kVGltZTogbmV3IERhdGUobm93LnZhbHVlT2YoKSArIDQ1MDAwMDApLFxuICAgIH0pO1xuICAgIGlmIChib2R5LmNvdXJzZUlkKSB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBhd2FpdCBDb3Vyc2VNb2RlbC5maW5kT25lT3JGYWlsKGJvZHkuY291cnNlSWQpO1xuICAgICAgcXVldWUgPSBhd2FpdCBRdWV1ZUZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgY291cnNlOiBjb3Vyc2UsXG4gICAgICAgIG9mZmljZUhvdXJzOiBbb2ZmaWNlSG91cnNdLFxuICAgICAgICBhbGxvd1F1ZXN0aW9uczogYm9keS5hbGxvd1F1ZXN0aW9ucyA/PyBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWV1ZSA9IGF3YWl0IFF1ZXVlRmFjdG9yeS5jcmVhdGUoe1xuICAgICAgICBvZmZpY2VIb3VyczogW29mZmljZUhvdXJzXSxcbiAgICAgICAgYWxsb3dRdWVzdGlvbnM6IGJvZHkuYWxsb3dRdWVzdGlvbnMgPz8gZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgQFBvc3QoJ2NyZWF0ZVF1ZXN0aW9uJylcbiAgYXN5bmMgY3JlYXRlUXVlc3Rpb24oXG4gICAgQEJvZHkoKSBib2R5OiB7IHF1ZXVlSWQ6IG51bWJlciB9LFxuICApOiBQcm9taXNlPFF1ZXN0aW9uTW9kZWw+IHtcbiAgICBsZXQgcXVlc3Rpb246IFF1ZXN0aW9uTW9kZWw7XG4gICAgaWYgKGJvZHkucXVldWVJZCkge1xuICAgICAgY29uc3QgcXVldWUgPSBhd2FpdCBRdWV1ZU1vZGVsLmZpbmRPbmVPckZhaWwoYm9keS5xdWV1ZUlkKTtcbiAgICAgIHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIHF1ZXVlOiBxdWV1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXN0aW9uID0gYXdhaXQgUXVlc3Rpb25GYWN0b3J5LmNyZWF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IFF1ZXN0aW9uVHlwZSwgUm9sZSB9IGZyb20gJ0Brb2gvY29tbW9uJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICd0eXBlb3JtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ291cnNlTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgT2ZmaWNlSG91ck1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9jb3Vyc2Uvc2VtZXN0ZXIuZW50aXR5JztcbmltcG9ydCB7IFVzZXJDb3Vyc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXN0aW9uL3F1ZXN0aW9uLmVudGl0eSc7XG5pbXBvcnQgeyBRdWV1ZU1vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi4vLi4vc3JjL2xvZ2luL2NvdXJzZS1zZWN0aW9uLW1hcHBpbmcuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFVzZXJGYWN0b3J5ID0gbmV3IEZhY3RvcnkoVXNlck1vZGVsKVxuICAuYXR0cignZW1haWwnLCBgdXNlckBuZXUuZWR1YClcbiAgLmF0dHIoJ25hbWUnLCBgVXNlcmApXG4gIC5hdHRyKCdwaG90b1VSTCcsIGBodHRwczovL3BpY3MvdXNlcmApO1xuXG5leHBvcnQgY29uc3QgU3R1ZGVudENvdXJzZUZhY3RvcnkgPSBuZXcgRmFjdG9yeShVc2VyQ291cnNlTW9kZWwpLmF0dHIoXG4gICdyb2xlJyxcbiAgUm9sZS5TVFVERU5ULFxuKTtcblxuZXhwb3J0IGNvbnN0IFRBQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbCkuYXR0cihcbiAgJ3JvbGUnLFxuICBSb2xlLlRBLFxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbWVzdGVyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFNlbWVzdGVyTW9kZWwpXG4gIC5hdHRyKCdzZWFzb24nLCAnRmFsbCcpXG4gIC5hdHRyKCd5ZWFyJywgMjAyMCk7XG5cbmV4cG9ydCBjb25zdCBDbG9zZWRPZmZpY2VIb3VyRmFjdG9yeSA9IG5ldyBGYWN0b3J5KE9mZmljZUhvdXJNb2RlbClcbiAgLmF0dHIoJ3RpdGxlJywgJ0FsZXggJiBTdGFubGV5JylcbiAgLmF0dHIoJ3N0YXJ0VGltZScsIG5ldyBEYXRlKCcyMDIwLTA1LTIwVDE0OjAwOjAwLjAwMFonKSlcbiAgLmF0dHIoJ2VuZFRpbWUnLCBuZXcgRGF0ZSgnMjAyMC0wNS0yMFQxNTozMDowMC4wMDBaJykpO1xuXG5leHBvcnQgY29uc3QgT2ZmaWNlSG91ckZhY3RvcnkgPSBuZXcgRmFjdG9yeShPZmZpY2VIb3VyTW9kZWwpXG4gIC5hdHRyKCd0aXRsZScsICdBbGV4ICYgU3RhbmxleScpXG4gIC5hdHRyKCdzdGFydFRpbWUnLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDM2MDAwMDApKVxuICAuYXR0cignZW5kVGltZScsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMzYwMDAwMCkpO1xuXG5leHBvcnQgY29uc3QgQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZU1vZGVsKVxuICAuYXR0cignbmFtZScsICdDUyAyNTAwJylcbiAgLmF0dHIoJ2ljYWxVUkwnLCAnaHR0cDovL2hpLmNvbScpXG4gIC5hdHRyKCdlbmFibGVkJywgdHJ1ZSlcbiAgLmFzc29jT25lKCdzZW1lc3RlcicsIFNlbWVzdGVyRmFjdG9yeSlcbiAgLmFzc29jTWFueSgnb2ZmaWNlSG91cnMnLCBPZmZpY2VIb3VyRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBDb3Vyc2VTZWN0aW9uRmFjdG9yeSA9IG5ldyBGYWN0b3J5KENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwpXG4gIC5hdHRyKCdnZW5lcmljQ291cnNlTmFtZScsICdDUyAyNTAwJylcbiAgLnNlcXVlbmNlKCdzZWN0aW9uJywgKGkpID0+IGkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ291cnNlRmFjdG9yeSA9IG5ldyBGYWN0b3J5KFVzZXJDb3Vyc2VNb2RlbClcbiAgLmFzc29jT25lKCd1c2VyJywgVXNlckZhY3RvcnkpXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ3JvbGUnLCBSb2xlLlNUVURFTlQpO1xuXG5leHBvcnQgY29uc3QgUXVldWVGYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVldWVNb2RlbClcbiAgLmF0dHIoJ3Jvb20nLCBgV1ZIIDEwMWApXG4gIC5hc3NvY09uZSgnY291cnNlJywgQ291cnNlRmFjdG9yeSlcbiAgLmF0dHIoJ2FsbG93UXVlc3Rpb25zJywgZmFsc2UpXG4gIC5hc3NvY01hbnkoJ29mZmljZUhvdXJzJywgT2ZmaWNlSG91ckZhY3RvcnkpO1xuXG4vLyBXQVJOSU5HOiBETyBOT1QgVVNFIENSRUFUT1JJRC4gQVMgWU9VIFNFRSBIRVJFLCBXRSBPTkxZIEFDQ0VQVCBDUkVBVE9SXG4vL1RPRE86IG1ha2UgaXQgYWNjZXB0IGNyZWF0b3JJZCBhcyB3ZWxsXG5leHBvcnQgY29uc3QgUXVlc3Rpb25GYWN0b3J5ID0gbmV3IEZhY3RvcnkoUXVlc3Rpb25Nb2RlbClcbiAgLnNlcXVlbmNlKCd0ZXh0JywgKGkpID0+IGBxdWVzdGlvbiAke2l9YClcbiAgLmF0dHIoJ3N0YXR1cycsICdRdWV1ZWQnKVxuICAuYXR0cigncXVlc3Rpb25UeXBlJywgUXVlc3Rpb25UeXBlLk90aGVyKVxuICAuYXR0cignY3JlYXRlZEF0JywgbmV3IERhdGUoKSlcbiAgLmFzc29jT25lKCdxdWV1ZScsIFF1ZXVlRmFjdG9yeSlcbiAgLmFzc29jT25lKCdjcmVhdG9yJywgVXNlckZhY3RvcnkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZW9ybS1mYWN0b3J5XCIpOyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uIH0gZnJvbSAndHlwZW9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWVkU2VydmljZSB7XG4gIGFzeW5jIGRlbGV0ZUFsbChtb2RlbDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZ2V0Q29ubmVjdGlvbigpLmNyZWF0ZVF1ZXJ5QnVpbGRlcigpLmRlbGV0ZSgpLmZyb20obW9kZWwpLmV4ZWN1dGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWRtaW5Db3JlTW9kdWxlRmFjdG9yeSxcbiAgQWRtaW5BdXRoTW9kdWxlRmFjdG9yeSxcbiAgRGVmYXVsdEFkbWluU2l0ZSxcbn0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IGFkbWluQ3JlZGVudGlhbFZhbGlkYXRvciB9IGZyb20gJy4vY3JlZGVudGlhbFZhbGlkYXRvcic7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQge1xuICBDb3Vyc2VBZG1pbixcbiAgUXVldWVBZG1pbixcbiAgVXNlckFkbWluLFxuICBVc2VyQ291cnNlQWRtaW4sXG4gIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4sXG59IGZyb20gJy4vYWRtaW4tZW50aXRpZXMnO1xuaW1wb3J0IHsgQWRtaW5Db21tYW5kIH0gZnJvbSAnLi9hZG1pbi5jb21tYW5kJztcblxuY29uc3QgQ29yZU1vZHVsZSA9IEFkbWluQ29yZU1vZHVsZUZhY3RvcnkuY3JlYXRlQWRtaW5Db3JlTW9kdWxlKHt9KTtcbmNvbnN0IEF1dGhNb2R1bGUgPSBBZG1pbkF1dGhNb2R1bGVGYWN0b3J5LmNyZWF0ZUFkbWluQXV0aE1vZHVsZSh7XG4gIGFkbWluQ29yZU1vZHVsZTogQ29yZU1vZHVsZSxcbiAgY3JlZGVudGlhbFZhbGlkYXRvcjogYWRtaW5DcmVkZW50aWFsVmFsaWRhdG9yLCAvLyBob3cgZG8geW91IHZhbGlkYXRlIGNyZWRlbnRpYWxzXG4gIGltcG9ydHM6IFtUeXBlT3JtTW9kdWxlLmZvckZlYXR1cmUoW0FkbWluVXNlck1vZGVsXSldLCAvLyB3aGF0IG1vZHVsZXMgZXhwb3J0IHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIGNyZWRlbnRpYWxWYWxpZGF0b3IgYXZhaWxhYmxlXG4gIHByb3ZpZGVyczogW10sXG59KTtcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgZXhwb3J0czogW0NvcmVNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtBZG1pbkNvbW1hbmRdLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYWRtaW5TaXRlOiBEZWZhdWx0QWRtaW5TaXRlKSB7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdDb3Vyc2UnLCBDb3Vyc2VBZG1pbik7XG4gICAgYWRtaW5TaXRlLnJlZ2lzdGVyKCdVc2VyJywgVXNlckFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ1VzZXJDb3Vyc2UnLCBVc2VyQ291cnNlQWRtaW4pO1xuICAgIGFkbWluU2l0ZS5yZWdpc3RlcignUXVldWUnLCBRdWV1ZUFkbWluKTtcbiAgICBhZG1pblNpdGUucmVnaXN0ZXIoJ0NvdXJzZVNlY3Rpb25NYXBwaW5nJywgQ291cnNlU2VjdGlvbk1hcHBpbmdBZG1pbik7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lc3Rqcy1hZG1pblwiKTsiLCJpbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vYWRtaW4tdXNlci5lbnRpdHknO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ2JjcnlwdCc7XG5cbmV4cG9ydCBjb25zdCBhZG1pbkNyZWRlbnRpYWxWYWxpZGF0b3IgPSB7XG4gIGluamVjdDogW10sXG4gIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVDcmVkZW50aWFscyhcbiAgICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICk6IFByb21pc2U8QWRtaW5Vc2VyTW9kZWw+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBBZG1pblVzZXJNb2RlbC5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBpZiAoYXdhaXQgY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgRW50aXR5LCBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLCBCYXNlRW50aXR5LCBDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0JztcblxuLyoqXG4gKiBBZG1pbiB1c2VycyBhcmUgdG90YWxseSBzZXBhcmF0ZSBmcm9tIHJlZ3VsYXIgdXNlcnMgYW5kIGNhbiBvbmx5IGJlIGNyZWF0ZWQgZnJvbSBjb21tYW5kIGxpbmUuXG4gKiBgeWFybiBjbGkgYWRtaW46Y3JlYXRlYFxuICovXG5ARW50aXR5KCdhZG1pbl91c2VyX21vZGVsJylcbmV4cG9ydCBjbGFzcyBBZG1pblVzZXJNb2RlbCBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgc2V0UGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGFzc3dvcmRIYXNoID0gaGFzaFN5bmMocGFzc3dvcmQsIDUpO1xuICB9XG5cbiAgQENvbHVtbih7IGxlbmd0aDogMTI4LCB1bmlxdWU6IHRydWUsIG51bGxhYmxlOiBmYWxzZSB9KVxuICB1c2VybmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEyOCwgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHBhc3N3b3JkSGFzaDogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsImltcG9ydCB7IEFkbWluRW50aXR5IH0gZnJvbSAnbmVzdGpzLWFkbWluJztcbmltcG9ydCB7IENvdXJzZU1vZGVsIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5lbnRpdHknO1xuaW1wb3J0IHsgUXVldWVNb2RlbCB9IGZyb20gJy4uL3F1ZXVlL3F1ZXVlLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICcuLi9wcm9maWxlL3VzZXIuZW50aXR5JztcbmltcG9ydCB7IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWwgfSBmcm9tICcuLi9sb2dpbi9jb3Vyc2Utc2VjdGlvbi1tYXBwaW5nLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICdwcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VBZG1pbiBleHRlbmRzIEFkbWluRW50aXR5IHtcbiAgZW50aXR5ID0gQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICduYW1lJ107XG59XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBRdWV1ZU1vZGVsO1xuICBsaXN0RGlzcGxheSA9IFsnaWQnLCAncm9vbScsICdjb3Vyc2VJZCddO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdlbWFpbCcsICduYW1lJ107XG4gIHNlYXJjaEZpZWxkcyA9IFsnZW1haWwnLCAnbmFtZSddO1xuICBmaWVsZHMgPSBbXG4gICAgJ2lkJyxcbiAgICAnZW1haWwnLFxuICAgICduYW1lJyxcbiAgICAnZGVza3RvcE5vdGlmc0VuYWJsZWQnLFxuICAgICdwaG9uZU5vdGlmc0VuYWJsZWQnLFxuICAgICdxdWV1ZXMnLFxuICBdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckNvdXJzZUFkbWluIGV4dGVuZHMgQWRtaW5FbnRpdHkge1xuICBlbnRpdHkgPSBVc2VyQ291cnNlTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICd1c2VySWQnLCAnY291cnNlSWQnXTtcbn1cblxuZXhwb3J0IGNsYXNzIENvdXJzZVNlY3Rpb25NYXBwaW5nQWRtaW4gZXh0ZW5kcyBBZG1pbkVudGl0eSB7XG4gIGVudGl0eSA9IENvdXJzZVNlY3Rpb25NYXBwaW5nTW9kZWw7XG4gIGxpc3REaXNwbGF5ID0gWydpZCcsICdnZW5lcmljQ291cnNlTmFtZScsICdzZWN0aW9uJywgJ2NvdXJzZUlkJ107XG59XG4iLCJpbXBvcnQgeyBDb21tYW5kLCBQb3NpdGlvbmFsIH0gZnJvbSAnbmVzdGpzLWNvbW1hbmQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsIH0gZnJvbSAnLi9hZG1pbi11c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBxdWVzdGlvbiwga2V5SW5ZTiB9IGZyb20gJ3JlYWRsaW5lLXN5bmMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWRtaW5Db21tYW5kIHtcbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdjcmVhdGU6YWRtaW4gPHVzZXJuYW1lPicsXG4gICAgZGVzY3JpYmU6ICdjcmVhdGUgYW4gYWRtaW4gdXNlcicsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBAUG9zaXRpb25hbCh7XG4gICAgICBuYW1lOiAndXNlcm5hbWUnLFxuICAgICAgZGVzY3JpYmU6ICd0aGUgYWRtaW4gdXNlcm5hbWUnLFxuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSlcbiAgICB1c2VybmFtZTogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlciA9IGF3YWl0IEFkbWluVXNlck1vZGVsLmZpbmRPbmUoeyB1c2VybmFtZSB9KTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3QgY2hhbmdlUGFzc3dvcmQgPSBrZXlJbllOKFxuICAgICAgICBgVXNlciAke3VzZXJuYW1lfSBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gY2hhbmdlIHRoZWlyIHBhc3N3b3JkP2AsXG4gICAgICApO1xuICAgICAgaWYgKCFjaGFuZ2VQYXNzd29yZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzZXIgPSBBZG1pblVzZXJNb2RlbC5jcmVhdGUoeyB1c2VybmFtZSB9KTtcbiAgICB9XG4gICAgY29uc3QgcGFzc3dvcmQ6IHN0cmluZyA9IHF1ZXN0aW9uKCdQYXNzd29yZDogJywge1xuICAgICAgaGlkZUVjaG9CYWNrOiB0cnVlLFxuICAgIH0pO1xuICAgIHVzZXIuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIHVzZXI6ICR7dXNlci51c2VybmFtZX1gKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhZGxpbmUtc3luY1wiKTsiLCJpbXBvcnQgeyBDb3Vyc2VNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9jb3Vyc2UuZW50aXR5JztcbmltcG9ydCB7IE9mZmljZUhvdXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9vZmZpY2UtaG91ci5lbnRpdHknO1xuaW1wb3J0IHsgU2VtZXN0ZXJNb2RlbCB9IGZyb20gJy4vc3JjL2NvdXJzZS9zZW1lc3Rlci5lbnRpdHknO1xuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSAnLi9zcmMvcHJvZmlsZS91c2VyLmVudGl0eSc7XG5pbXBvcnQgeyBVc2VyQ291cnNlTW9kZWwgfSBmcm9tICcuL3NyYy9wcm9maWxlL3VzZXItY291cnNlLmVudGl0eSc7XG5pbXBvcnQgeyBRdWVzdGlvbk1vZGVsIH0gZnJvbSAnLi9zcmMvcXVlc3Rpb24vcXVlc3Rpb24uZW50aXR5JztcbmltcG9ydCB7IFF1ZXVlTW9kZWwgfSBmcm9tICcuL3NyYy9xdWV1ZS9xdWV1ZS5lbnRpdHknO1xuaW1wb3J0IHsgRGVza3RvcE5vdGlmTW9kZWwgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb24vZGVza3RvcC1ub3RpZi5lbnRpdHknO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnLi9zcmMvbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gJy4vc3JjL2FkbWluL2FkbWluLXVzZXIuZW50aXR5JztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsIH0gZnJvbSAnLi9zcmMvbG9naW4vY291cnNlLXNlY3Rpb24tbWFwcGluZy5lbnRpdHknO1xuY29uZmlnKCk7XG5cbi8vIE9wdGlvbnMgb25seSB1c2VkIHdoZSBydW4gdmlhIENMSVxuY29uc3QgaW5DTEkgPSB7XG4gIG1pZ3JhdGlvbnM6IFsnbWlncmF0aW9uLyoudHMnXSxcbiAgY2xpOiB7XG4gICAgbWlncmF0aW9uc0RpcjogJ21pZ3JhdGlvbicsXG4gIH0sXG59O1xuXG5jb25zdCB0eXBlb3JtID0ge1xuICB0eXBlOiAncG9zdGdyZXMnLFxuICB1cmw6IHByb2Nlc3MuZW52LkRCX1VSTCB8fCAncG9zdGdyZXM6Ly9wb3N0Z3Jlc0Bsb2NhbGhvc3Q6NTQzMi9kZXYnLFxuICBzeW5jaHJvbml6ZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcbiAgZW50aXRpZXM6IFtcbiAgICBDb3Vyc2VNb2RlbCxcbiAgICBDb3Vyc2VTZWN0aW9uTWFwcGluZ01vZGVsLFxuICAgIE9mZmljZUhvdXJNb2RlbCxcbiAgICBTZW1lc3Rlck1vZGVsLFxuICAgIFVzZXJNb2RlbCxcbiAgICBVc2VyQ291cnNlTW9kZWwsXG4gICAgUXVlc3Rpb25Nb2RlbCxcbiAgICBRdWV1ZU1vZGVsLFxuICAgIERlc2t0b3BOb3RpZk1vZGVsLFxuICAgIFBob25lTm90aWZNb2RlbCxcbiAgICBBZG1pblVzZXJNb2RlbCxcbiAgXSxcbiAga2VlcENvbm5lY3Rpb25BbGl2ZTogdHJ1ZSxcbiAgbG9nZ2luZzogISFwcm9jZXNzLmVudi5UWVBFT1JNX0xPR0dJTkcsXG4gIC4uLighIXByb2Nlc3MuZW52LlRZUEVPUk1fQ0xJID8gaW5DTEkgOiB7fSksXG59O1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb3JtO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJ25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IEJhY2tmaWxsUGhvbmVOb3RpZnMgfSBmcm9tICcuL2JhY2tmaWxsLXBob25lLW5vdGlmcy5jb21tYW5kJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3RpZmljYXRpb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtCYWNrZmlsbFBob25lTm90aWZzXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxNb2R1bGUge31cbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICduZXN0anMtY29tbWFuZCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUGhvbmVOb3RpZk1vZGVsIH0gZnJvbSAnbm90aWZpY2F0aW9uL3Bob25lLW5vdGlmLmVudGl0eSc7XG5pbXBvcnQgeyBJc051bGwgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFR3aWxpb1NlcnZpY2UgfSBmcm9tICdub3RpZmljYXRpb24vdHdpbGlvL3R3aWxpby5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJ3Byb2ZpbGUvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2ZpbGxQaG9uZU5vdGlmcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHdpbGlvU2VydmljZTogVHdpbGlvU2VydmljZSkge31cbiAgQENvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdiYWNrZmlsbDpwaG9uZS1ub3RpZnMnLFxuICAgIGRlc2NyaWJlOlxuICAgICAgJ2RlbGV0ZSBwaG9uZSBub3RpZnMgd2l0aCBubyB1c2VyaWRzLCBkZWxldGUgZHVwbGljYXRlIHBob25lIG5vdGlmcywgYW5kIGZvcmNpYmx5IHNldCB2ZXJpZmllZCBvbiBleGlzdGluZyBwaG9uZW5vdGlmcycsXG4gICAgYXV0b0V4aXQ6IHRydWUsXG4gIH0pXG4gIGFzeW5jIGZpeCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBEZWxldGUgdGhvc2Ugd2l0aG91dCB1c2VyaWRzIGFzc29jaWF0ZWRcbiAgICBjb25zdCBub1VzZXIgPSBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHsgdXNlcklkOiBJc051bGwoKSB9KTtcbiAgICBjb25zb2xlLmxvZyhgZGVsZXRlZCAke25vVXNlci5hZmZlY3RlZH0gZGVza3RvcG5vdGlmbW9kZWxzIHdpdGggbm8gdXNlcmlkYCk7XG5cbiAgICAvLyBkZWxldGUgYXQgb25jZVxuICAgIGNvbnN0IHRvRGVsZXRlOiBQaG9uZU5vdGlmTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVsZXRlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBkdXBzID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmNyZWF0ZVF1ZXJ5QnVpbGRlcigncG5vdGlmJylcbiAgICAgIC5zZWxlY3QoW2BcInBob25lTnVtYmVyXCJgLCAnQ09VTlQoKiknXSlcbiAgICAgIC5ncm91cEJ5KCdwbm90aWYucGhvbmVOdW1iZXInKVxuICAgICAgLmhhdmluZygnQ09VTlQoKikgPiAxJylcbiAgICAgIC5nZXRSYXdNYW55KCk7XG4gICAgY29uc29sZS5sb2coYGZvdW5kICR7ZHVwcy5sZW5ndGh9IGR1cHNgKTtcbiAgICB0b0RlbGV0ZS5wdXNoKC4uLmR1cHMpO1xuXG4gICAgY29uc3QgdmFsaWQgPSBbXTtcbiAgICBsZXQgY2hhbmdlZE51bSA9IDA7XG4gICAgLy8gY2hhbmdlIHRvIHJlYWwgbnVtYmVyXG4gICAgY29uc3QgYWxsID0gYXdhaXQgUGhvbmVOb3RpZk1vZGVsLmZpbmQoeyByZWxhdGlvbnM6IFsndXNlciddIH0pO1xuICAgIGZvciAoY29uc3QgcCBvZiBhbGwpIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHRoaXMudHdpbGlvU2VydmljZS5nZXRGdWxsUGhvbmVOdW1iZXIocC5waG9uZU51bWJlcik7XG4gICAgICBpZiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT09IHAucGhvbmVOdW1iZXIpIHtcbiAgICAgICAgICBjaGFuZ2VkTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcC5waG9uZU51bWJlciA9IG51bWJlcjtcbiAgICAgICAgcC52ZXJpZmllZCA9IHRydWU7XG4gICAgICAgIHZhbGlkLnB1c2gocCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0RlbGV0ZS5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgVHdpbGlvIGNoYW5nZWQgJHtjaGFuZ2VkTnVtfSBwaG9uZSBudW1iZXJzIHRvIGZ1bGwgbnVtYCk7XG4gICAgYXdhaXQgUGhvbmVOb3RpZk1vZGVsLnNhdmUodmFsaWQpO1xuXG4gICAgLy8gRGVsZXRlIGFuZCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBwaG9uZW5vdGlmIGZvciB1c2VyXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnZGVsZXRpbmcgcGhvbmUgbm90aWZzOiAnLFxuICAgICAgdG9EZWxldGUubWFwKGQgPT4gZC5waG9uZU51bWJlciksXG4gICAgKTtcbiAgICBpZiAodG9EZWxldGUubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQaG9uZU5vdGlmTW9kZWwuZGVsZXRlKHRvRGVsZXRlLm1hcChkID0+IGQuaWQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2Vyc1RvRGlzYWJsZSA9IChcbiAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kKHtcbiAgICAgICAgd2hlcmU6IHsgcGhvbmVOb3RpZnNFbmFibGVkOiB0cnVlIH0sXG4gICAgICAgIHJlbGF0aW9uczogWydwaG9uZU5vdGlmJ10sXG4gICAgICB9KVxuICAgICkuZmlsdGVyKHUgPT4gIXUucGhvbmVOb3RpZik7XG4gICAgdXNlcnNUb0Rpc2FibGUuZm9yRWFjaCh1ID0+ICh1LnBob25lTm90aWZzRW5hYmxlZCA9IGZhbHNlKSk7XG5cbiAgICBhd2FpdCBVc2VyTW9kZWwuc2F2ZSh1c2Vyc1RvRGlzYWJsZSk7XG4gICAgY29uc29sZS5sb2coYGRpc2FibGVkIHBob25lbm90aWZzIGZvciAke3VzZXJzVG9EaXNhYmxlLmxlbmd0aH0gdXNlcnNgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgQXJndW1lbnRNZXRhZGF0YSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuLyoqXG4gKiBTdHJpcCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIGJvZHkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHJpcFVuZGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIG1ldGFkYXRhOiBBcmd1bWVudE1ldGFkYXRhKTogYW55IHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ2JvZHknKSB7XG4gICAgICB0aGlzLmRyb3BVbmRlZmluZWQodmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmRlZmluZWQob2JqOiB1bmtub3duKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZHJvcFVuZGVmaW5lZChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBOZXN0SW50ZXJjZXB0b3IsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIENhbGxIYW5kbGVyLFxuICBIdHRwRXhjZXB0aW9uLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgYXBtIGZyb20gJ2VsYXN0aWMtYXBtLW5vZGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBtSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICBuZXh0OiBDYWxsSGFuZGxlcixcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXhjZXB0aW9uKSB7XG4gICAgICAgICAgYXBtLmNhcHR1cmVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcG0uY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=