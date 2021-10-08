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

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}).SENTRY_RELEASE={id:"b6625d47f25684e6446655b4b8aaf418579f5d1f"};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = __webpack_require__(4);
bootstrap_1.bootstrap(module.hot);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addGlobalsToApp = exports.bootstrap = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const core_1 = __webpack_require__(10);
const integrations_1 = __webpack_require__(11);
const Sentry = __webpack_require__(12);
const Tracing = __webpack_require__(13);
const cookieParser = __webpack_require__(14);
const morgan = __webpack_require__(15);
const app_module_1 = __webpack_require__(16);
const stripUndefined_pipe_1 = __webpack_require__(133);
async function bootstrap(hot) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    if (process.env.NODE_ENV === 'production') {
        setupAPM(app);
    }
    app.enableShutdownHooks();
    addGlobalsToApp(app);
    app.setGlobalPrefix('api/v1');
    if (common_1.isProd()) {
        console.log(`Running production at ${process.env.DOMAIN}.`);
    }
    else {
        console.log(`Running non-production at ${process.env.DOMAIN}. THIS MSG SHOULD NOT APPEAR ON PROD VM`);
    }
    addGlobalsToApp(app);
    app.setGlobalPrefix('api/v1');
    app.use(morgan('dev'));
    await app.listen(3002);
    if (hot) {
        hot.accept();
        hot.dispose(() => app.close());
    }
}
exports.bootstrap = bootstrap;
function setupAPM(app) {
    Sentry.init({
        dsn: process.env.SENTRY_APM_DSN,
        tracesSampleRate: 0.2,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Postgres(),
            new Tracing.Integrations.Express({
                app: app.getHttpAdapter().getInstance(),
            }),
            new integrations_1.RewriteFrames(),
        ],
        release: "b6625d47f25684e6446655b4b8aaf418579f5d1f",
        environment: common_1.getEnv(),
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
}
function addGlobalsToApp(app) {
    app.useGlobalPipes(new common_2.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalPipes(new stripUndefined_pipe_1.StripUndefinedPipe());
    app.use(cookieParser());
}
exports.addGlobalsToApp = addGlobalsToApp;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.InsightComponent = exports.SSEQueueResponse = exports.SemesterPartial = exports.SubmitCourseParams = exports.GetAlertsResponse = exports.CreateAlertResponse = exports.CreateAlertParams = exports.RephraseQuestionPayload = exports.Alert = exports.AlertPayload = exports.AlertType = exports.TACheckinPair = exports.TACheckinTimesResponse = exports.UpdateQueueParams = exports.TACheckoutResponse = exports.UpdateQuestionResponse = exports.UpdateQuestionParams = exports.CreateQuestionResponse = exports.CreateQuestionParams = exports.GetStudentQuestionResponse = exports.GetQuestionResponse = exports.ListQuestionsResponse = exports.GetCourseQueuesResponse = exports.GetQueueResponse = exports.UpdateCourseOverrideResponse = exports.UpdateCourseOverrideBody = exports.GetCourseOverridesResponse = exports.GetCourseOverridesRow = exports.GetSelfEnrollResponse = exports.GetCourseResponse = exports.UpdateProfileParams = exports.KhouryTACourse = exports.KhouryStudentCourse = exports.KhouryDataParams = exports.GetProfileResponse = exports.QuestionStatusKeys = exports.StatusSentToCreator = exports.StatusInPriorityQueue = exports.StatusInQueue = exports.ClosedQuestionStatus = exports.LimboQuestionStatus = exports.OpenQuestionStatus = exports.QuestionType = exports.Question = exports.QueuePartial = exports.Role = exports.UserPartial = exports.DesktopNotifPartial = exports.User = exports.timeDiffInMins = exports.isProd = exports.getEnv = exports.STAGING_URL = exports.PROD_URL = void 0;
const class_transformer_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(7);
__webpack_require__(8);
exports.PROD_URL = "https://officehours.khoury.northeastern.edu";
exports.STAGING_URL = "https://staging.khouryofficehours.com";
const domain = () => {
    var _a;
    return process.env.DOMAIN ||
        (typeof window !== "undefined" && ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin));
};
exports.getEnv = () => {
    switch (domain()) {
        case exports.PROD_URL:
            return "production";
        case exports.STAGING_URL:
            return "staging";
        default:
            return "dev";
    }
};
exports.isProd = () => domain() === exports.PROD_URL;
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
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], KhouryStudentCourse.prototype, "campus", void 0);
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
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], KhouryTACourse.prototype, "instructor", void 0);
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
class GetSelfEnrollResponse {
}
exports.GetSelfEnrollResponse = GetSelfEnrollResponse;
class GetCourseOverridesRow {
}
exports.GetCourseOverridesRow = GetCourseOverridesRow;
class GetCourseOverridesResponse {
}
__decorate([
    class_transformer_1.Type(() => GetCourseOverridesRow),
    __metadata("design:type", Array)
], GetCourseOverridesResponse.prototype, "data", void 0);
exports.GetCourseOverridesResponse = GetCourseOverridesResponse;
class UpdateCourseOverrideBody {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateCourseOverrideBody.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateCourseOverrideBody.prototype, "role", void 0);
exports.UpdateCourseOverrideBody = UpdateCourseOverrideBody;
class UpdateCourseOverrideResponse extends GetCourseOverridesRow {
}
exports.UpdateCourseOverrideResponse = UpdateCourseOverrideResponse;
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
class GetStudentQuestionResponse extends Question {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], GetStudentQuestionResponse.prototype, "queueId", void 0);
exports.GetStudentQuestionResponse = GetStudentQuestionResponse;
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
class TACheckinTimesResponse {
}
__decorate([
    class_transformer_1.Type(() => TACheckinPair),
    __metadata("design:type", Array)
], TACheckinTimesResponse.prototype, "taCheckinTimes", void 0);
exports.TACheckinTimesResponse = TACheckinTimesResponse;
class TACheckinPair {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TACheckinPair.prototype, "name", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], TACheckinPair.prototype, "checkinTime", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], TACheckinPair.prototype, "checkoutTime", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], TACheckinPair.prototype, "forced", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], TACheckinPair.prototype, "inProgress", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TACheckinPair.prototype, "numHelped", void 0);
exports.TACheckinPair = TACheckinPair;
var AlertType;
(function (AlertType) {
    AlertType["REPHRASE_QUESTION"] = "rephraseQuestion";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
class AlertPayload {
}
exports.AlertPayload = AlertPayload;
class Alert {
}
__decorate([
    class_validator_1.IsEnum(AlertType),
    __metadata("design:type", String)
], Alert.prototype, "alertType", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Alert.prototype, "sent", void 0);
__decorate([
    class_transformer_1.Type(() => AlertPayload),
    __metadata("design:type", AlertPayload)
], Alert.prototype, "payload", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], Alert.prototype, "id", void 0);
exports.Alert = Alert;
class RephraseQuestionPayload extends AlertPayload {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RephraseQuestionPayload.prototype, "questionId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RephraseQuestionPayload.prototype, "queueId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RephraseQuestionPayload.prototype, "courseId", void 0);
exports.RephraseQuestionPayload = RephraseQuestionPayload;
class CreateAlertParams {
}
__decorate([
    class_validator_1.IsEnum(AlertType),
    __metadata("design:type", String)
], CreateAlertParams.prototype, "alertType", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateAlertParams.prototype, "courseId", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", AlertPayload)
], CreateAlertParams.prototype, "payload", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateAlertParams.prototype, "targetUserId", void 0);
exports.CreateAlertParams = CreateAlertParams;
class CreateAlertResponse extends Alert {
}
exports.CreateAlertResponse = CreateAlertResponse;
class GetAlertsResponse {
}
__decorate([
    class_transformer_1.Type(() => Alert),
    __metadata("design:type", Array)
], GetAlertsResponse.prototype, "alerts", void 0);
exports.GetAlertsResponse = GetAlertsResponse;
class SubmitCourseParams {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "coordinator_email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "name", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], SubmitCourseParams.prototype, "sections", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "semester", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "timezone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "icalURL", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubmitCourseParams.prototype, "password", void 0);
exports.SubmitCourseParams = SubmitCourseParams;
class SemesterPartial {
}
exports.SemesterPartial = SemesterPartial;
class SSEQueueResponse {
}
exports.SSEQueueResponse = SSEQueueResponse;
var InsightComponent;
(function (InsightComponent) {
    InsightComponent["SimpleDisplay"] = "SimpleDisplay";
    InsightComponent["BarChart"] = "BarChart";
    InsightComponent["SimpleTable"] = "SimpleTable";
})(InsightComponent = exports.InsightComponent || (exports.InsightComponent = {}));
exports.ERROR_MESSAGES = {
    courseController: {
        checkIn: {
            cannotCreateNewQueueIfNotProfessor: "You can't create a new queue if you're not a professor",
            cannotCheckIntoMultipleQueues: "Cannot check into multiple queues at the same time",
        },
        courseNotFound: "The course was not found",
        courseOfficeHourError: "Unable to find a course's office hours",
        courseHeatMapError: "Unable to get course's cached heatmap",
        courseModelError: "Course Model not found",
        noUserFound: "No user found with given email",
        noSemesterFound: "No semester exists for the submitted course",
        updatedQueueError: "Error updating a course queue",
        queuesNotFound: "Queues not found",
        queueNotFound: "Queue not found",
        saveQueueError: "Unable to save queue",
        clearQueueError: "Unable to determine if queue can be cleared",
        createEventError: "An error occurred while creating an event",
        icalCalendarUpdate: "Unable to update calendar",
        checkInTime: "Unable to get TA check in times",
        removeCourse: "Error occurred while trying to remove a course",
        createCourse: "Error occurred while trying to create a course",
        updateCourse: "Error occurred while trying to update a course",
        createCourseMappings: "Unable to create a course mappings",
        invalidApplyURL: "You are unauthorized to submit an application. Please email help@khouryofficehours.com for the correct URL.",
    },
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
        saveQError: "Unable to save a question",
        notFound: "Question not found",
        unableToNotifyUser: "Unable to notify user",
    },
    loginController: {
        receiveDataFromKhoury: "Invalid request signature",
        invalidPayload: "The decoded JWT payload is invalid",
        invalidTempJWTToken: "Error occurred while signing a JWT token",
        addUserFromKhoury: "Error occurred while translating account from Khoury to Office Hours",
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
    queueController: {
        getQueue: "An error occurred while trying to retrieve a Queue",
        getQuestions: "Unable to get questions from queue",
        saveQueue: "Unable to save queue",
        cleanQueue: "Unable to clean queue",
    },
    queueRoleGuard: {
        queueNotFound: "Queue not found",
    },
    releaseNotesController: {
        releaseNotesTime: (e) => "Error Parsing release notes time: " + e,
    },
    insightsController: {
        insightUnathorized: "User is not authorized to view this insight",
        insightNameNotFound: "The insight requested was not found",
    },
    roleGuard: {
        notLoggedIn: "Must be logged in",
        noCourseIdFound: "No courseid found",
        notInCourse: "Not In This Course",
        mustBeRoleToJoinCourse: (roles) => `You must have one of roles [${roles.join(", ")}] to access this course`,
    },
    profileController: {
        accountNotAvailable: "The user account is undefined",
        userResponseNotFound: "The user response was not found",
        noDiskSpace: "There is no disk space left to store an image. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.",
    },
    alertController: {
        duplicateAlert: "This alert has already been sent",
        notActiveAlert: "This is not an alert that's open for the current user",
    },
    sseService: {
        getSubClient: "Unable to get the redis subscriber client",
        getDBClient: "Unable to get the redis database client",
        getPubClient: "Unable to get publisher client",
        moduleDestroy: "Unable to destroy the redis module",
        cleanupConnection: "Unable to cleanup the connection",
        clientIdSubscribe: "Client ID not found during subscribing to client",
        subscribe: "Unable to subscribe to the client",
        unsubscribe: "Unable to unsubscribe from the client",
        removeFromRoom: "Error removing from redis room",
        directConnections: "Unable to cleanup direct connections",
        roomMembers: "Unable to get room members",
        serialize: "Unable to serialize payload",
        publish: "Publisher client is unable to publish",
        clientIdNotFound: "Client ID not found during subscribing to client",
    },
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@sentry/integrations");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@sentry/node");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@sentry/tracing");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 16 */
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
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
const schedule_1 = __webpack_require__(18);
const typeorm_1 = __webpack_require__(19);
const insights_module_1 = __webpack_require__(20);
const alerts_module_1 = __webpack_require__(44);
const backfill_module_1 = __webpack_require__(48);
const nestjs_command_1 = __webpack_require__(22);
const nestjs_redis_1 = __webpack_require__(61);
const release_notes_module_1 = __webpack_require__(62);
const typeormConfig = __webpack_require__(64);
const admin_module_1 = __webpack_require__(69);
const course_module_1 = __webpack_require__(78);
const healthcheck_module_1 = __webpack_require__(103);
const login_module_1 = __webpack_require__(106);
const notification_module_1 = __webpack_require__(49);
const profile_module_1 = __webpack_require__(114);
const question_module_1 = __webpack_require__(122);
const queue_module_1 = __webpack_require__(79);
const seed_module_1 = __webpack_require__(126);
const sse_module_1 = __webpack_require__(90);
const semester_module_1 = __webpack_require__(131);
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
            insights_module_1.InsightsModule,
            nestjs_redis_1.RedisModule.register([{ name: 'pub' }, { name: 'sub' }, { name: 'db' }]),
            healthcheck_module_1.HealthcheckModule,
            alerts_module_1.AlertsModule,
            semester_module_1.SemesterModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

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
exports.InsightsModule = void 0;
const common_1 = __webpack_require__(9);
const insights_command_1 = __webpack_require__(21);
const insights_service_1 = __webpack_require__(24);
const insights_controller_1 = __webpack_require__(38);
let InsightsModule = class InsightsModule {
};
InsightsModule = __decorate([
    common_1.Module({
        controllers: [insights_controller_1.InsightsController],
        providers: [insights_command_1.InsightsCommand, insights_service_1.InsightsService],
    })
], InsightsModule);
exports.InsightsModule = InsightsModule;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsCommand = void 0;
const nestjs_command_1 = __webpack_require__(22);
const common_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(23);
const insights_service_1 = __webpack_require__(24);
const insight_objects_1 = __webpack_require__(25);
let InsightsCommand = class InsightsCommand {
    constructor(connection, insightsService) {
        this.connection = connection;
        this.insightsService = insightsService;
    }
    async generateSemesterInsights(courseId) {
        const insights = await this.insightsService.generateAllInsights({
            insights: [
                insight_objects_1.INSIGHTS_MAP.TotalStudents,
                insight_objects_1.INSIGHTS_MAP.QuestionTypeBreakdown,
            ],
            filters: [
                {
                    type: 'courseId',
                    conditional: `"courseId" = ${courseId}`,
                },
            ],
        });
        for (const insight of Object.values(insights)) {
            console.log('Name:   ', insight['displayName']);
            console.log('Output: ', insight['output']);
            console.log('-');
        }
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'semester_insights:generate <courseId>',
        describe: 'aggregates semesterly analytics for a course',
        autoExit: true,
    }),
    __param(0, nestjs_command_1.Positional({
        name: 'courseId',
        describe: 'the id of the coure to aggregate data for',
        type: 'number',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InsightsCommand.prototype, "generateSemesterInsights", null);
InsightsCommand = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        insights_service_1.InsightsService])
], InsightsCommand);
exports.InsightsCommand = InsightsCommand;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("nestjs-command");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

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
exports.InsightsService = void 0;
const common_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(23);
const insight_objects_1 = __webpack_require__(25);
let InsightsService = class InsightsService {
    constructor(connection) {
        this.connection = connection;
    }
    async computeOutput({ insight, filters, }) {
        const output = await insight.compute(filters);
        return output;
    }
    async generateAllInsights({ insights, filters, }) {
        return await Promise.all(insights.map(async (insight) => await this.computeOutput({ insight, filters })));
    }
    convertToInsightsListResponse(insightNames) {
        return insightNames.reduce((obj, insightName) => {
            const { displayName, description, component, size } = insight_objects_1.INSIGHTS_MAP[insightName];
            return Object.assign(Object.assign({}, obj), { [insightName]: {
                    displayName,
                    description,
                    component,
                    size,
                } });
        }, {});
    }
    async toggleInsightOn(user, insightName) {
        var _a;
        user.hideInsights = (_a = user.hideInsights) === null || _a === void 0 ? void 0 : _a.filter((insight) => insight !== insightName);
        await user.save();
        return;
    }
    async toggleInsightOff(user, insightName) {
        if (user.hideInsights === null) {
            user.hideInsights = [];
        }
        user.hideInsights = [insightName, ...user.hideInsights];
        await user.save();
        return;
    }
};
InsightsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], InsightsService);
exports.InsightsService = InsightsService;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INSIGHTS_MAP = exports.QuestionToStudentRatio = exports.MedianHelpingTime = exports.MedianWaitTime = exports.QuestionTypeBreakdown = exports.MostActiveStudents = exports.TotalQuestionsAsked = exports.TotalStudents = void 0;
const common_1 = __webpack_require__(5);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const question_entity_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(23);
function addFilters({ query, modelName, allowedFilters, filters, }) {
    for (const filter of filters) {
        if (allowedFilters.includes(filter.type)) {
            APPLY_FILTER_MAP[modelName][filter.type]({ query, filter });
        }
    }
    return query;
}
const APPLY_FILTER_MAP = {
    QuestionModel: {
        courseId: ({ query, filter }) => {
            query
                .innerJoin('QuestionModel.queue', 'queue')
                .andWhere('queue."courseId" = :courseId', {
                courseId: filter.courseId,
            });
        },
        timeframe: ({ query, filter }) => {
            query.andWhere('QuestionModel.createdAt BETWEEN :start AND :end', {
                start: filter.start,
                end: filter.end,
            });
        },
    },
    UserCourseModel: {
        courseId: ({ query, filter }) => {
            query.andWhere('"courseId" = :courseId', {
                courseId: filter.courseId,
            });
        },
    },
};
exports.TotalStudents = {
    displayName: 'Total Students',
    description: 'What is the total number of students that are enrolled in the course?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleDisplay,
    size: 'small',
    async compute(filters) {
        return await addFilters({
            query: typeorm_1.createQueryBuilder(user_course_entity_1.UserCourseModel).where("role = 'student'"),
            modelName: user_course_entity_1.UserCourseModel.name,
            allowedFilters: ['courseId', 'role'],
            filters,
        }).getCount();
    },
};
exports.TotalQuestionsAsked = {
    displayName: 'Total Questions',
    description: 'How many questions have been asked in total?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleDisplay,
    size: 'small',
    async compute(filters) {
        return await addFilters({
            query: typeorm_1.createQueryBuilder(question_entity_1.QuestionModel).select(),
            modelName: question_entity_1.QuestionModel.name,
            allowedFilters: ['courseId', 'timeframe'],
            filters,
        }).getCount();
    },
};
exports.MostActiveStudents = {
    displayName: 'Most Active Students',
    description: 'Who are the students who have asked the most questions in Office Hours? (limit 75)',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleTable,
    size: 'default',
    async compute(filters) {
        const dataSource = await addFilters({
            query: typeorm_1.createQueryBuilder()
                .select('"QuestionModel"."creatorId"', 'studentId')
                .addSelect('concat("UserModel"."firstName", \' \',"UserModel"."lastName")', 'name')
                .addSelect('"UserModel"."email"', 'email')
                .addSelect('COUNT(*)', 'questionsAsked')
                .from(question_entity_1.QuestionModel, 'QuestionModel')
                .where('"QuestionModel"."questionType" IS NOT NULL'),
            modelName: question_entity_1.QuestionModel.name,
            allowedFilters: ['courseId', 'timeframe'],
            filters,
        })
            .innerJoin(user_entity_1.UserModel, 'UserModel', '"UserModel".id = "QuestionModel"."creatorId"')
            .groupBy('"QuestionModel"."creatorId"')
            .addGroupBy('name')
            .addGroupBy('"UserModel".email')
            .orderBy('4', 'DESC')
            .limit(75)
            .getRawMany();
        return {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Questions Asked',
                    dataIndex: 'questionsAsked',
                    key: 'questionsAsked',
                },
            ],
            dataSource,
        };
    },
};
exports.QuestionTypeBreakdown = {
    displayName: 'Question Type Breakdown',
    description: 'What is the distribution of student-selected question-types on the question form?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.BarChart,
    size: 'default',
    async compute(filters) {
        const info = await addFilters({
            query: typeorm_1.createQueryBuilder(question_entity_1.QuestionModel)
                .select('"QuestionModel"."questionType"', 'questionType')
                .addSelect('COUNT(*)', 'totalQuestions')
                .andWhere('"QuestionModel"."questionType" IS NOT NULL'),
            modelName: question_entity_1.QuestionModel.name,
            allowedFilters: ['courseId', 'timeframe'],
            filters,
        })
            .groupBy('"QuestionModel"."questionType"')
            .having('"QuestionModel"."questionType" IS NOT NULL')
            .getRawMany();
        const typesFromInfo = info.map((obj) => obj['questionType']);
        info.forEach((pair) => {
            pair['totalQuestions'] = Number.parseInt(pair['totalQuestions']);
        });
        Object.values(common_1.QuestionType).forEach((v) => {
            if (!typesFromInfo.includes(v)) {
                info.push({ questionType: v, totalQuestions: 0 });
            }
        });
        const insightObj = {
            data: info.sort((a, b) => a.questionType === b.questionType
                ? 0
                : a.questionType > b.questionType
                    ? 1
                    : -1),
            xField: 'totalQuestions',
            yField: 'questionType',
            seriesField: 'questionType',
            xAxisName: 'totalQuestions',
            yAxisName: 'questionType',
        };
        return insightObj;
    },
};
exports.MedianWaitTime = {
    displayName: 'Median Wait Time',
    description: 'What is the median wait time for a student to get help in the queue?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleDisplay,
    size: 'small',
    async compute(filters) {
        const questions = await addFilters({
            query: typeorm_1.createQueryBuilder(question_entity_1.QuestionModel)
                .select()
                .where('QuestionModel.firstHelpedAt IS NOT NULL'),
            modelName: question_entity_1.QuestionModel.name,
            allowedFilters: ['courseId', 'timeframe'],
            filters,
        }).getMany();
        if (questions.length === 0) {
            return `0 min`;
        }
        const waitTimes = questions.map((question) => Math.floor((question.firstHelpedAt.getTime() - question.createdAt.getTime()) /
            1000) / 60);
        return `${Math.floor(Math.round(median(waitTimes)))} min`;
    },
};
exports.MedianHelpingTime = {
    displayName: 'Median Helping Time',
    description: 'What is the median duration that a TA helps a student on a call?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleDisplay,
    size: 'small',
    async compute(filters) {
        const questions = await addFilters({
            query: typeorm_1.createQueryBuilder(question_entity_1.QuestionModel)
                .select()
                .where('QuestionModel.helpedAt IS NOT NULL AND QuestionModel.closedAt IS NOT NULL'),
            modelName: question_entity_1.QuestionModel.name,
            allowedFilters: ['courseId', 'timeframe'],
            filters,
        }).getMany();
        if (questions.length === 0) {
            return `0 min`;
        }
        const helpTimes = questions.map((question) => Math.floor((question.closedAt.getTime() - question.helpedAt.getTime()) / 1000) / 60);
        return `${Math.round(median(helpTimes))} min`;
    },
};
const median = (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
};
exports.QuestionToStudentRatio = {
    displayName: 'Questions per Student',
    description: 'How many questions were asked per student?',
    roles: [common_1.Role.PROFESSOR],
    component: common_1.InsightComponent.SimpleDisplay,
    size: 'small',
    async compute(filters) {
        const totalQuestions = await exports.TotalQuestionsAsked.compute(filters);
        const totalStudents = await exports.TotalStudents.compute(filters);
        return totalStudents !== 0
            ? (totalQuestions / totalStudents).toFixed(2)
            : '0 students';
    },
};
exports.INSIGHTS_MAP = {
    TotalStudents: exports.TotalStudents,
    TotalQuestionsAsked: exports.TotalQuestionsAsked,
    MedianWaitTime: exports.MedianWaitTime,
    QuestionTypeBreakdown: exports.QuestionTypeBreakdown,
    MostActiveStudents: exports.MostActiveStudents,
    QuestionToStudentRatio: exports.QuestionToStudentRatio,
    MedianHelpingTime: exports.MedianHelpingTime,
};


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
exports.UserCourseModel = void 0;
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(29);
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
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserCourseModel.prototype, "override", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserCourseModel.prototype, "expires", void 0);
UserCourseModel = __decorate([
    typeorm_1.Entity('user_course_model')
], UserCourseModel);
exports.UserCourseModel = UserCourseModel;


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
exports.CourseModel = void 0;
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const alerts_entity_1 = __webpack_require__(28);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const queue_entity_1 = __webpack_require__(32);
const semester_entity_1 = __webpack_require__(37);
const office_hour_entity_1 = __webpack_require__(33);
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
    __metadata("design:type", String)
], CourseModel.prototype, "coordinator_email", void 0);
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
    typeorm_1.Column('boolean', { nullable: true }),
    __metadata("design:type", Boolean)
], CourseModel.prototype, "pending", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], CourseModel.prototype, "timezone", void 0);
__decorate([
    typeorm_1.OneToMany((type) => event_model_entity_1.EventModel, (event) => event.course),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], CourseModel.prototype, "events", void 0);
__decorate([
    typeorm_1.OneToMany((type) => alerts_entity_1.AlertModel, (alert) => alert.course),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], CourseModel.prototype, "alerts", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], CourseModel.prototype, "selfEnroll", void 0);
CourseModel = __decorate([
    typeorm_1.Entity('course_model')
], CourseModel);
exports.CourseModel = CourseModel;


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
exports.AlertModel = void 0;
const common_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(29);
let AlertModel = class AlertModel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AlertModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: common_1.AlertType }),
    __metadata("design:type", String)
], AlertModel.prototype, "alertType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], AlertModel.prototype, "sent", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], AlertModel.prototype, "resolved", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserModel, (user) => user.alerts),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserModel)
], AlertModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], AlertModel.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => course_entity_1.CourseModel, (course) => course.alerts),
    typeorm_1.JoinColumn({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.CourseModel)
], AlertModel.prototype, "course", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], AlertModel.prototype, "courseId", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", common_1.AlertPayload)
], AlertModel.prototype, "payload", void 0);
AlertModel = __decorate([
    typeorm_1.Entity('alert_model')
], AlertModel);
exports.AlertModel = AlertModel;


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
exports.UserModel = void 0;
const class_transformer_1 = __webpack_require__(6);
const insight_objects_1 = __webpack_require__(25);
const typeorm_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(30);
const phone_notif_entity_1 = __webpack_require__(31);
const queue_entity_1 = __webpack_require__(32);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const alerts_entity_1 = __webpack_require__(28);
let UserModel = class UserModel extends typeorm_1.BaseEntity {
    computeInsights() {
        let hideInsights = this.hideInsights;
        if (!hideInsights) {
            hideInsights = [];
        }
        const insightNames = Object.keys(insight_objects_1.INSIGHTS_MAP);
        this.insights = insightNames.filter((name) => !hideInsights.includes(name));
    }
    setFullNames() {
        this.name = this.firstName + ' ' + this.lastName;
    }
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
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
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
__decorate([
    typeorm_1.OneToMany((type) => alerts_entity_1.AlertModel, (alert) => alert.user),
    __metadata("design:type", Array)
], UserModel.prototype, "alerts", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], UserModel.prototype, "hideInsights", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserModel.prototype, "computeInsights", null);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserModel.prototype, "setFullNames", null);
UserModel = __decorate([
    typeorm_1.Entity('user_model')
], UserModel);
exports.UserModel = UserModel;


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
exports.DesktopNotifModel = void 0;
const typeorm_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(29);
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
exports.PhoneNotifModel = void 0;
const typeorm_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(29);
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
exports.QueueModel = void 0;
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
const office_hour_entity_1 = __webpack_require__(33);
const user_entity_1 = __webpack_require__(29);
const question_entity_1 = __webpack_require__(34);
let QueueModel = class QueueModel extends typeorm_1.BaseEntity {
    async checkIsOpen() {
        if (this.staffList && this.staffList.length > 0) {
            this.isOpen = true;
            return true;
        }
        this.isOpen = await this.areThereOfficeHoursRightNow();
        return this.isOpen;
    }
    async areThereOfficeHoursRightNow(now = new Date()) {
        const MS_IN_MINUTE = 60000;
        const ohs = await this.getOfficeHours(now);
        return !!ohs.find((e) => e.startTime.getTime() - 10 * MS_IN_MINUTE < now.getTime() &&
            e.endTime.getTime() + 1 * MS_IN_MINUTE > now.getTime());
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
    async getOfficeHours(now = new Date()) {
        const lowerBound = new Date(now);
        lowerBound.setUTCHours(now.getUTCHours() - 30);
        lowerBound.setUTCHours(0, 0, 0, 0);
        const upperBound = new Date(now);
        upperBound.setUTCHours(now.getUTCHours() + 30);
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
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], QueueModel.prototype, "isProfessorQueue", void 0);
QueueModel = __decorate([
    typeorm_1.Entity('queue_model')
], QueueModel);
exports.QueueModel = QueueModel;


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
exports.OfficeHourModel = void 0;
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(32);
const course_entity_1 = __webpack_require__(27);
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
var QuestionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const common_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(32);
const question_fsm_1 = __webpack_require__(35);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canChangeQuestionStatus = void 0;
const common_1 = __webpack_require__(5);
const QUEUE_TRANSITIONS = {
    ta: [common_1.OpenQuestionStatus.Helping, common_1.LimboQuestionStatus.TADeleted],
    student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
};
const QUESTION_STATES = {
    [common_1.OpenQuestionStatus.Drafting]: {
        student: [common_1.OpenQuestionStatus.Queued, common_1.ClosedQuestionStatus.ConfirmedDeleted],
        ta: [common_1.OpenQuestionStatus.Helping, common_1.ClosedQuestionStatus.DeletedDraft],
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
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.ReQueueing]: {
        student: [
            common_1.OpenQuestionStatus.PriorityQueued,
            common_1.ClosedQuestionStatus.ConfirmedDeleted,
        ],
    },
    [common_1.LimboQuestionStatus.TADeleted]: {
        student: [common_1.ClosedQuestionStatus.ConfirmedDeleted],
    },
    [common_1.ClosedQuestionStatus.Resolved]: {},
    [common_1.ClosedQuestionStatus.ConfirmedDeleted]: {},
    [common_1.ClosedQuestionStatus.Stale]: {},
    [common_1.ClosedQuestionStatus.DeletedDraft]: {},
};
function canChangeQuestionStatus(oldStatus, goalStatus, role) {
    var _a;
    return (oldStatus === goalStatus || ((_a = QUESTION_STATES[oldStatus][role]) === null || _a === void 0 ? void 0 : _a.includes(goalStatus)));
}
exports.canChangeQuestionStatus = canChangeQuestionStatus;


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
exports.EventModel = exports.EventType = void 0;
const class_transformer_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(29);
var EventType;
(function (EventType) {
    EventType["TA_CHECKED_IN"] = "taCheckedIn";
    EventType["TA_CHECKED_OUT"] = "taCheckedOut";
    EventType["TA_CHECKED_OUT_FORCED"] = "taCheckedOutForced";
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
exports.SemesterModel = void 0;
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsController = void 0;
const insights_service_1 = __webpack_require__(24);
const common_1 = __webpack_require__(9);
const jwt_auth_guard_1 = __webpack_require__(39);
const typeorm_1 = __webpack_require__(23);
const common_2 = __webpack_require__(5);
const user_decorator_1 = __webpack_require__(41);
const insight_objects_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(29);
const roles_decorator_1 = __webpack_require__(42);
const course_role_decorator_1 = __webpack_require__(43);
let InsightsController = class InsightsController {
    constructor(connection, insightsService) {
        this.connection = connection;
        this.insightsService = insightsService;
    }
    async get(role, courseId, insightName, start, end) {
        const insightNames = Object.keys(insight_objects_1.INSIGHTS_MAP);
        if (!insightNames.includes(insightName)) {
            throw new common_1.BadRequestException(common_2.ERROR_MESSAGES.insightsController.insightNameNotFound);
        }
        if (!insight_objects_1.INSIGHTS_MAP[insightName].roles.includes(role)) {
            throw new common_1.BadRequestException(common_2.ERROR_MESSAGES.insightsController.insightUnathorized);
        }
        const filters = [
            {
                type: 'courseId',
                courseId,
            },
        ];
        if (start && end) {
            filters.push({
                type: 'timeframe',
                start: new Date(start),
                end: new Date(end),
            });
        }
        const insight = await this.insightsService.computeOutput({
            insight: insight_objects_1.INSIGHTS_MAP[insightName],
            filters,
        });
        return insight;
    }
    async getAllInsights() {
        return this.insightsService.convertToInsightsListResponse(Object.keys(insight_objects_1.INSIGHTS_MAP));
    }
    async toggleInsightOn(body, user) {
        await this.insightsService.toggleInsightOn(user, body.insightName);
        return;
    }
    async toggleInsightOff(body, user) {
        await this.insightsService.toggleInsightOff(user, body.insightName);
        return;
    }
};
__decorate([
    common_1.Get(':courseId/:insightName'),
    __param(0, course_role_decorator_1.CourseRole()),
    __param(1, common_1.Param('courseId')),
    __param(2, common_1.Param('insightName')),
    __param(3, common_1.Query('start')),
    __param(4, common_1.Query('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "get", null);
__decorate([
    common_1.Get('list'),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getAllInsights", null);
__decorate([
    common_1.Patch(''),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "toggleInsightOn", null);
__decorate([
    common_1.Delete(''),
    roles_decorator_1.Roles(common_2.Role.PROFESSOR),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "toggleInsightOff", null);
InsightsController = __decorate([
    common_1.Controller('insights'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        insights_service_1.InsightsService])
], InsightsController);
exports.InsightsController = InsightsController;


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
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(9);
const passport_1 = __webpack_require__(40);
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
};
JwtAuthGuard = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.User = void 0;
const common_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(29);
exports.User = common_1.createParamDecorator(async (relations, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return await user_entity_1.UserModel.findOne(request.user.userId, { relations });
});
exports.UserId = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return Number(request.user.userId);
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = __webpack_require__(9);
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRole = void 0;
const common_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(29);
exports.CourseRole = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const courseId = request.params.courseId;
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
exports.AlertsModule = void 0;
const common_1 = __webpack_require__(9);
const alerts_controller_1 = __webpack_require__(45);
const alerts_service_1 = __webpack_require__(47);
let AlertsModule = class AlertsModule {
};
AlertsModule = __decorate([
    common_1.Module({
        controllers: [alerts_controller_1.AlertsController],
        providers: [alerts_service_1.AlertsService],
    })
], AlertsModule);
exports.AlertsModule = AlertsModule;


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
exports.AlertsController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const lodash_1 = __webpack_require__(46);
const jwt_auth_guard_1 = __webpack_require__(39);
const user_decorator_1 = __webpack_require__(41);
const user_entity_1 = __webpack_require__(29);
const roles_decorator_1 = __webpack_require__(42);
const alerts_entity_1 = __webpack_require__(28);
const alerts_service_1 = __webpack_require__(47);
let AlertsController = class AlertsController {
    constructor(alertsService) {
        this.alertsService = alertsService;
    }
    async getAlerts(courseId, user) {
        const alerts = (await alerts_entity_1.AlertModel.find({
            where: {
                courseId,
                user,
                resolved: null,
            },
        })).map((alert) => lodash_1.pick(alert, ['sent', 'alertType', 'payload', 'id']));
        return { alerts: await this.alertsService.removeStaleAlerts(alerts) };
    }
    async createAlert(body) {
        const { alertType, courseId, payload, targetUserId } = body;
        const anotherAlert = await alerts_entity_1.AlertModel.findOne({
            where: {
                alertType,
                userId: targetUserId,
                resolved: null,
            },
        });
        if (anotherAlert) {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.alertController.duplicateAlert);
        }
        const alert = await alerts_entity_1.AlertModel.create({
            alertType,
            sent: new Date(),
            userId: targetUserId,
            courseId,
            payload,
        }).save();
        return alert;
    }
    async closeAlert(alertId) {
        const alert = await alerts_entity_1.AlertModel.findOne({
            where: {
                id: alertId,
            },
        });
        if (!alert) {
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.alertController.notActiveAlert);
        }
        alert.resolved = new Date();
        await alert.save();
    }
};
__decorate([
    common_2.Get(':courseId'),
    __param(0, common_2.Param('courseId')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "getAlerts", null);
__decorate([
    common_2.Post(),
    roles_decorator_1.Roles(common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_1.CreateAlertParams]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "createAlert", null);
__decorate([
    common_2.Patch(':alertId'),
    roles_decorator_1.Roles(common_1.Role.STUDENT, common_1.Role.TA, common_1.Role.PROFESSOR),
    __param(0, common_2.Param('alertId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "closeAlert", null);
AlertsController = __decorate([
    common_2.Controller('alerts'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [alerts_service_1.AlertsService])
], AlertsController);
exports.AlertsController = AlertsController;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("lodash");

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
exports.AlertsService = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const question_entity_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(32);
let AlertsService = class AlertsService {
    constructor(connection) {
        this.connection = connection;
    }
    async removeStaleAlerts(alerts) {
        const nonStaleAlerts = [];
        for (const alert of alerts) {
            switch (alert.alertType) {
                case common_1.AlertType.REPHRASE_QUESTION:
                    const payload = alert.payload;
                    const question = await question_entity_1.QuestionModel.findOne(payload.questionId);
                    const queue = await queue_entity_1.QueueModel.findOne(payload.queueId);
                    if (question.closedAt || !(await queue.checkIsOpen())) {
                        console.log(`Rephrase Question alert with id ${alert.id} expired`);
                        if (!question.closedAt) {
                            question.closedAt = new Date();
                        }
                    }
                    else {
                        nonStaleAlerts.push(alert);
                    }
            }
        }
        return nonStaleAlerts;
    }
};
AlertsService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AlertsService);
exports.AlertsService = AlertsService;


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
exports.BackfillModule = void 0;
const common_1 = __webpack_require__(9);
const notification_module_1 = __webpack_require__(49);
const backfill_course_timezones_1 = __webpack_require__(56);
const backfill_husky_emails_to_northeastern_1 = __webpack_require__(57);
const backfill_phone_notifs_command_1 = __webpack_require__(58);
const backfill_user_insights_command_1 = __webpack_require__(59);
const make_empty_photourl_null_command_1 = __webpack_require__(60);
let BackfillModule = class BackfillModule {
};
BackfillModule = __decorate([
    common_1.Module({
        imports: [notification_module_1.NotificationModule],
        providers: [
            backfill_phone_notifs_command_1.BackfillPhoneNotifs,
            make_empty_photourl_null_command_1.BackfillMakeEmptyPhotoURLNull,
            backfill_course_timezones_1.BackfillCourseTimezones,
            backfill_husky_emails_to_northeastern_1.BackfillHuskyEmailsAsNortheastern,
            backfill_user_insights_command_1.BackfillUserInsights,
        ],
    })
], BackfillModule);
exports.BackfillModule = BackfillModule;


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
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(9);
const desktop_notif_subscriber_1 = __webpack_require__(50);
const notification_controller_1 = __webpack_require__(55);
const notification_service_1 = __webpack_require__(51);
const twilio_service_1 = __webpack_require__(53);
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
exports.DesktopNotifSubscriber = void 0;
const typeorm_1 = __webpack_require__(23);
const desktop_notif_entity_1 = __webpack_require__(30);
const notification_service_1 = __webpack_require__(51);
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
exports.NotificationService = exports.NotifMsgs = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
const webPush = __webpack_require__(52);
const user_entity_1 = __webpack_require__(29);
const desktop_notif_entity_1 = __webpack_require__(30);
const phone_notif_entity_1 = __webpack_require__(31);
const twilio_service_1 = __webpack_require__(53);
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
/* 52 */
/***/ (function(module, exports) {

module.exports = require("web-push");

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
exports.TwilioService = void 0;
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
const twilio = __webpack_require__(54);
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
/* 54 */
/***/ (function(module, exports) {

module.exports = require("twilio");

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
const twilio = __webpack_require__(54);
const jwt_auth_guard_1 = __webpack_require__(39);
const user_decorator_1 = __webpack_require__(41);
const desktop_notif_entity_1 = __webpack_require__(30);
const notification_service_1 = __webpack_require__(51);
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
exports.BackfillCourseTimezones = void 0;
const nestjs_command_1 = __webpack_require__(22);
const common_1 = __webpack_require__(9);
const course_entity_1 = __webpack_require__(27);
let BackfillCourseTimezones = class BackfillCourseTimezones {
    async copy() {
        await course_entity_1.CourseModel.createQueryBuilder()
            .update()
            .set({ timezone: () => `'America/New_York'` })
            .callListeners(false)
            .execute();
        console.log(`Updated ${await course_entity_1.CourseModel.count()} courses`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:course-timezones',
        describe: 'set all course timezones from null to "America/New_York"',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillCourseTimezones.prototype, "copy", null);
BackfillCourseTimezones = __decorate([
    common_1.Injectable()
], BackfillCourseTimezones);
exports.BackfillCourseTimezones = BackfillCourseTimezones;


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
exports.BackfillHuskyEmailsAsNortheastern = void 0;
const common_1 = __webpack_require__(9);
const nestjs_command_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(29);
let BackfillHuskyEmailsAsNortheastern = class BackfillHuskyEmailsAsNortheastern {
    async fix() {
        const users = await user_entity_1.UserModel.find();
        const usersToBeUpdated = users.filter((user) => user.email.includes('@husky.neu.edu'));
        users.forEach((user) => {
            user.email = user.email.replace('@husky.neu.edu', '@northeastern.edu');
        });
        await user_entity_1.UserModel.save(users);
        console.log(`Updated the emails of ${usersToBeUpdated.length} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:husky-emails-to-northeastern',
        describe: 'Converts @husky.neu.edu emails to @northeastern.edu emails',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillHuskyEmailsAsNortheastern.prototype, "fix", null);
BackfillHuskyEmailsAsNortheastern = __decorate([
    common_1.Injectable()
], BackfillHuskyEmailsAsNortheastern);
exports.BackfillHuskyEmailsAsNortheastern = BackfillHuskyEmailsAsNortheastern;


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
exports.BackfillPhoneNotifs = void 0;
const common_1 = __webpack_require__(9);
const nestjs_command_1 = __webpack_require__(22);
const phone_notif_entity_1 = __webpack_require__(31);
const twilio_service_1 = __webpack_require__(53);
const user_entity_1 = __webpack_require__(29);
const typeorm_1 = __webpack_require__(23);
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
exports.BackfillUserInsights = void 0;
const common_1 = __webpack_require__(9);
const nestjs_command_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(29);
let BackfillUserInsights = class BackfillUserInsights {
    async copy() {
        await user_entity_1.UserModel.createQueryBuilder()
            .update()
            .set({ hideInsights: [] })
            .callListeners(false)
            .execute();
        console.log(`Updated ${await user_entity_1.UserModel.count()} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:user-insights',
        describe: "sets a user's hidden insights attribute to the empty list",
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillUserInsights.prototype, "copy", null);
BackfillUserInsights = __decorate([
    common_1.Injectable()
], BackfillUserInsights);
exports.BackfillUserInsights = BackfillUserInsights;


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
exports.BackfillMakeEmptyPhotoURLNull = void 0;
const common_1 = __webpack_require__(9);
const nestjs_command_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(29);
let BackfillMakeEmptyPhotoURLNull = class BackfillMakeEmptyPhotoURLNull {
    async fix() {
        let countOfChanged = 0;
        const users = await user_entity_1.UserModel.find();
        users.forEach((user) => {
            if (user.photoURL === '') {
                user.photoURL = null;
                countOfChanged += 1;
            }
        });
        await user_entity_1.UserModel.save(users);
        console.log(`Updated names for ${countOfChanged} users`);
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'backfill:make-empty-photoURL-null',
        describe: 'changes empty string photoURLs to null',
        autoExit: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackfillMakeEmptyPhotoURLNull.prototype, "fix", null);
BackfillMakeEmptyPhotoURLNull = __decorate([
    common_1.Injectable()
], BackfillMakeEmptyPhotoURLNull);
exports.BackfillMakeEmptyPhotoURLNull = BackfillMakeEmptyPhotoURLNull;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("nestjs-redis");

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
exports.ReleaseNotesModule = void 0;
const common_1 = __webpack_require__(9);
const release_notes_controller_1 = __webpack_require__(63);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseNotesController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const jwt_auth_guard_1 = __webpack_require__(39);
const typeorm_1 = __webpack_require__(23);
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
            const timeText = (_c = (_b = (_a = data[process.env.RELEASE_NOTE_TIMESTAMP_ID]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.properties) === null || _c === void 0 ? void 0 : _c.title[0][0];
            response.lastUpdatedUnixTime = timeText.split('Unix ')[1] * 1000;
        }
        catch (e) {
            throw new common_2.InternalServerErrorException(common_1.ERROR_MESSAGES.releaseNotesController.releaseNotesTime(e));
        }
        data[process.env.RELEASE_NOTE_TIMESTAMP_ID].value.properties.title = [];
        data[process.env.WANT_TO_SEE_MORE_ID].value.properties.title = [];
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(65);
const admin_user_entity_1 = __webpack_require__(66);
const course_entity_1 = __webpack_require__(27);
const office_hour_entity_1 = __webpack_require__(33);
const semester_entity_1 = __webpack_require__(37);
const course_section_mapping_entity_1 = __webpack_require__(68);
const desktop_notif_entity_1 = __webpack_require__(30);
const phone_notif_entity_1 = __webpack_require__(31);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const question_entity_1 = __webpack_require__(34);
const queue_entity_1 = __webpack_require__(32);
const alerts_entity_1 = __webpack_require__(28);
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
        alerts_entity_1.AlertModel,
    ], keepConnectionAlive: true, logging: !!process.env.TYPEORM_LOGGING }, (!!process.env.TYPEORM_CLI ? inCLI : {}));
module.exports = typeorm;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = void 0;
const typeorm_1 = __webpack_require__(23);
const bcrypt_1 = __webpack_require__(67);
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
/* 67 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

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
const typeorm_1 = __webpack_require__(23);
const course_entity_1 = __webpack_require__(27);
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
exports.AdminModule = void 0;
const common_1 = __webpack_require__(9);
const nestjs_admin_1 = __webpack_require__(70);
const credentialValidator_1 = __webpack_require__(71);
const typeorm_1 = __webpack_require__(19);
const admin_user_entity_1 = __webpack_require__(66);
const admin_entities_1 = __webpack_require__(72);
const admin_command_1 = __webpack_require__(73);
const session = __webpack_require__(75);
const connectRedis = __webpack_require__(76);
const redis_1 = __webpack_require__(77);
const redisClient = redis_1.createClient();
const RedisStore = connectRedis(session);
if (process.env.NODE_ENV === 'test') {
    redisClient.quit();
}
const CoreModule = nestjs_admin_1.AdminCoreModuleFactory.createAdminCoreModule({
    appConfig: {
        session: {
            store: new RedisStore({ client: redisClient }),
        },
    },
});
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
        adminSite.register('Semester', admin_entities_1.SemesterAdmin);
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
/* 70 */
/***/ (function(module, exports) {

module.exports = require("nestjs-admin");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCredentialValidator = void 0;
const bcrypt_1 = __webpack_require__(67);
const admin_user_entity_1 = __webpack_require__(66);
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterAdmin = exports.CourseSectionMappingAdmin = exports.UserCourseAdmin = exports.UserAdmin = exports.QueueAdmin = exports.CourseAdmin = void 0;
const nestjs_admin_1 = __webpack_require__(70);
const course_entity_1 = __webpack_require__(27);
const queue_entity_1 = __webpack_require__(32);
const user_entity_1 = __webpack_require__(29);
const course_section_mapping_entity_1 = __webpack_require__(68);
const user_course_entity_1 = __webpack_require__(26);
const semester_entity_1 = __webpack_require__(37);
class CourseAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = course_entity_1.CourseModel;
        this.listDisplay = ['id', 'name'];
        this.fields = ['id', 'name', 'icalURL', 'semesterId', 'enabled', 'timezone'];
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
class SemesterAdmin extends nestjs_admin_1.AdminEntity {
    constructor() {
        super(...arguments);
        this.entity = semester_entity_1.SemesterModel;
        this.listDisplay = ['id', 'season', 'year'];
    }
}
exports.SemesterAdmin = SemesterAdmin;


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
exports.AdminCommand = void 0;
const nestjs_command_1 = __webpack_require__(22);
const common_1 = __webpack_require__(9);
const admin_user_entity_1 = __webpack_require__(66);
const readline_sync_1 = __webpack_require__(74);
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
/* 74 */
/***/ (function(module, exports) {

module.exports = require("readline-sync");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("redis");

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
exports.CourseModule = void 0;
const common_1 = __webpack_require__(9);
const queue_module_1 = __webpack_require__(79);
const course_controller_1 = __webpack_require__(92);
const course_service_1 = __webpack_require__(94);
const heatmap_service_1 = __webpack_require__(95);
const ical_command_1 = __webpack_require__(102);
const ical_service_1 = __webpack_require__(96);
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        controllers: [course_controller_1.CourseController],
        imports: [queue_module_1.QueueModule, common_1.CacheModule.register()],
        providers: [ical_command_1.ICalCommand, ical_service_1.IcalService, heatmap_service_1.HeatmapService, course_service_1.CourseService],
    })
], CourseModule);
exports.CourseModule = CourseModule;


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
exports.QueueModule = void 0;
const common_1 = __webpack_require__(9);
const queue_controller_1 = __webpack_require__(80);
const queue_clean_service_1 = __webpack_require__(88);
const sse_module_1 = __webpack_require__(90);
const queue_service_1 = __webpack_require__(87);
const queue_sse_service_1 = __webpack_require__(84);
const queue_subscriber_1 = __webpack_require__(91);
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
exports.QueueController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const user_decorator_1 = __webpack_require__(41);
const typeorm_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(39);
const roles_decorator_1 = __webpack_require__(42);
const queue_role_decorator_1 = __webpack_require__(81);
const queue_role_guard_1 = __webpack_require__(82);
const queue_sse_service_1 = __webpack_require__(84);
const queue_service_1 = __webpack_require__(87);
const queue_clean_service_1 = __webpack_require__(88);
let QueueController = class QueueController {
    constructor(connection, queueSSEService, queueCleanService, queueService) {
        this.connection = connection;
        this.queueSSEService = queueSSEService;
        this.queueCleanService = queueCleanService;
        this.queueService = queueService;
    }
    async getQueue(queueId) {
        try {
            return this.queueService.getQueue(queueId);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.queueController.getQueue, common_2.HttpStatus.NOT_FOUND);
        }
    }
    async getQuestions(queueId, role, userId) {
        try {
            const questions = await this.queueService.getQuestions(queueId);
            return await this.queueService.personalizeQuestions(queueId, questions, userId, role);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.queueController.getQuestions, common_2.HttpStatus.NOT_FOUND);
        }
    }
    async updateQueue(queueId, body) {
        const queue = await this.queueService.getQueue(queueId);
        if (queue === undefined) {
            throw new common_2.NotFoundException();
        }
        queue.notes = body.notes;
        queue.allowQuestions = body.allowQuestions;
        try {
            await queue.save();
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.queueController.saveQueue, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return queue;
    }
    async cleanQueue(queueId) {
        try {
            setTimeout(async () => {
                await this.queueCleanService.cleanQueue(queueId, true);
                await this.queueSSEService.updateQueue(queueId);
            });
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.queueController.cleanQueue, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    sendEvent(queueId, role, userId, res) {
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            Connection: 'keep-alive',
        });
        try {
            this.queueSSEService.subscribeClient(queueId, res, { role, userId });
        }
        catch (err) {
            console.error(err);
        }
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRole = void 0;
const common_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(32);
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
    if (!userCourse) {
        throw new common_1.NotFoundException("cannot read propery 'role ' of undefined on user: " + user.id + user);
    }
    return userCourse.role;
});


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
exports.QueueRolesGuard = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const role_guard_1 = __webpack_require__(83);
const user_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(32);
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const core_1 = __webpack_require__(10);
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
exports.QueueSSEService = void 0;
const common_1 = __webpack_require__(9);
const lodash_1 = __webpack_require__(46);
const sse_service_1 = __webpack_require__(85);
const queue_service_1 = __webpack_require__(87);
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
        this.sseService.subscribeClient(idToRoom(queueId), res, metadata);
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
exports.SSEService = void 0;
const common_1 = __webpack_require__(9);
const async_1 = __webpack_require__(86);
const class_transformer_1 = __webpack_require__(6);
const nestjs_redis_1 = __webpack_require__(61);
const common_2 = __webpack_require__(5);
const Sentry = __webpack_require__(12);
let SSEService = class SSEService {
    constructor(redisService) {
        this.redisService = redisService;
        this.directConnnections = {};
        const redisSub = this.redisService.getClient('sub');
        if (!redisSub) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.getSubClient);
            throw new Error(common_2.ERROR_MESSAGES.sseService.getSubClient);
        }
        redisSub.on('message', (channel, message) => {
            const id = /sse::client-(\d+)/.exec(channel);
            if (id && id[1] in this.directConnnections) {
                this.directConnnections[id[1]].res.write(`data: ${message}\n\n`);
            }
        });
    }
    async onModuleDestroy() {
        await async_1.each(Object.values(this.directConnnections), async (conn) => {
            await conn.cleanup().catch((err) => {
                console.error(common_2.ERROR_MESSAGES.sseService.cleanupConnection);
                console.error(err);
                Sentry.captureException(err);
            });
        }).catch((err) => {
            console.error(common_2.ERROR_MESSAGES.sseService.moduleDestroy);
            console.error(err);
            Sentry.captureException(err);
        });
    }
    idToChannel(clientId) {
        return `sse::client-${clientId}`;
    }
    async subscribeClient(room, res, metadata) {
        const redisSub = this.redisService.getClient('sub');
        const redis = this.redisService.getClient('db');
        if (!redisSub) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.getSubClient);
            throw new Error(common_2.ERROR_MESSAGES.sseService.getSubClient);
        }
        if (!redis) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.getDBClient);
            throw new Error(common_2.ERROR_MESSAGES.sseService.getDBClient);
        }
        const clientId = await redis.incr('sse::client::id').catch((err) => {
            console.error(common_2.ERROR_MESSAGES.sseService.clientIdSubscribe);
            console.error(err);
            Sentry.captureException(err);
        });
        if (!clientId) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.clientIdNotFound);
            throw new Error(common_2.ERROR_MESSAGES.sseService.clientIdNotFound);
        }
        await redisSub.subscribe(this.idToChannel(clientId)).catch((err) => {
            console.error(common_2.ERROR_MESSAGES.sseService.subscribe);
            console.error(err);
            Sentry.captureException(err);
        });
        const clientInfo = JSON.stringify({
            clientId,
            metadata: metadata,
        });
        await redis.sadd(room, clientInfo).catch((err) => {
            console.error(err);
            Sentry.captureException(err);
        });
        this.directConnnections[clientId] = {
            res,
            cleanup: async () => {
                await redis.srem(room, clientInfo).catch((err) => {
                    console.error(common_2.ERROR_MESSAGES.sseService.removeFromRoom);
                    console.error(err);
                });
                await redisSub.unsubscribe(this.idToChannel(clientId)).catch((err) => {
                    console.error(common_2.ERROR_MESSAGES.sseService.unsubscribe);
                    console.error(err);
                    Sentry.captureException(err);
                });
                res.end();
            },
        };
        res.write('\n');
        res.socket.on('end', async () => {
            await this.directConnnections[clientId].cleanup().catch((err) => {
                console.error(common_2.ERROR_MESSAGES.sseService.directConnections);
                console.error(err);
                Sentry.captureException(err);
            });
            delete this.directConnnections[clientId];
        });
    }
    async sendEvent(room, payload) {
        const redisPub = this.redisService.getClient('pub');
        const redis = this.redisService.getClient('db');
        if (!redisPub) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.getPubClient);
            throw new Error(common_2.ERROR_MESSAGES.sseService.getPubClient);
        }
        if (!redis) {
            Sentry.captureException(common_2.ERROR_MESSAGES.sseService.getDBClient);
            throw new Error(common_2.ERROR_MESSAGES.sseService.getDBClient);
        }
        const roomInfo = await redis.smembers(room).catch((err) => {
            console.error(common_2.ERROR_MESSAGES.sseService.roomMembers);
            console.error(err);
            Sentry.captureException(err);
        });
        if (room && roomInfo) {
            const clients = roomInfo.map((s) => JSON.parse(s));
            console.log(`sending sse to ${clients.length} clients in ${room}`);
            console.time(`sending sse time: `);
            await async_1.each(clients, async ({ clientId, metadata }) => {
                const toSend = class_transformer_1.serialize(await payload(metadata).catch((err) => {
                    console.error(common_2.ERROR_MESSAGES.sseService.serialize);
                    console.error(err);
                    Sentry.captureException(err);
                }));
                await redisPub
                    .publish(this.idToChannel(clientId), toSend)
                    .catch((err) => {
                    console.error(common_2.ERROR_MESSAGES.sseService.publish);
                    console.error(err);
                    Sentry.captureException(err);
                });
            });
            console.timeEnd(`sending sse time: `);
        }
    }
};
SSEService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], SSEService);
exports.SSEService = SSEService;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("async");

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
exports.QueueService = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(6);
const lodash_1 = __webpack_require__(46);
const question_entity_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(32);
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
            newLQR.questionsGettingHelp = questions.questionsGettingHelp.map((question) => {
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
exports.QueueCleanService = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const schedule_1 = __webpack_require__(18);
const async_1 = __webpack_require__(86);
const office_hour_entity_1 = __webpack_require__(33);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(23);
const question_entity_1 = __webpack_require__(34);
const queue_entity_1 = __webpack_require__(32);
const moment = __webpack_require__(89);
let QueueCleanService = class QueueCleanService {
    constructor(connection) {
        this.connection = connection;
    }
    async cleanAllQueues() {
        const queuesWithOpenQuestions = await queue_entity_1.QueueModel.getRepository()
            .createQueryBuilder('queue_model')
            .leftJoinAndSelect('queue_model.questions', 'question')
            .where('question.status IN (:...status)', {
            status: [
                ...Object.values(common_1.OpenQuestionStatus),
                ...Object.values(common_1.LimboQuestionStatus),
            ],
        })
            .getMany();
        await async_1.default.mapLimit(queuesWithOpenQuestions, 1, async (queue) => await this.cleanQueue(queue.id));
    }
    async checkoutAllStaff() {
        const queuesWithCheckedInStaff = await queue_entity_1.QueueModel.getRepository().find({ relations: ['staffList'] });
        queuesWithCheckedInStaff.forEach(async (queue) => {
            if (!(await queue.areThereOfficeHoursRightNow())) {
                await queue.staffList.forEach(async (ta) => {
                    await event_model_entity_1.EventModel.create({
                        time: new Date(),
                        eventType: event_model_entity_1.EventType.TA_CHECKED_OUT_FORCED,
                        userId: ta.id,
                        courseId: queue.courseId,
                    }).save();
                });
                queue.staffList = [];
            }
        });
        await queue_entity_1.QueueModel.save(queuesWithCheckedInStaff);
    }
    async cleanSelfEnrollOverrides() {
        await user_course_entity_1.UserCourseModel.delete({
            expires: true,
        });
    }
    async cleanQueue(queueId, force) {
        const queue = await queue_entity_1.QueueModel.findOne(queueId, {
            relations: ['staffList'],
        });
        if (force || !(await queue.checkIsOpen())) {
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
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_3AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueCleanService.prototype, "checkoutAllStaff", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_3AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueCleanService.prototype, "cleanSelfEnrollOverrides", null);
QueueCleanService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QueueCleanService);
exports.QueueCleanService = QueueCleanService;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("moment");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEModule = void 0;
const common_1 = __webpack_require__(9);
const sse_service_1 = __webpack_require__(85);
let SSEModule = class SSEModule {
};
SSEModule = __decorate([
    common_1.Module({ providers: [sse_service_1.SSEService], exports: [sse_service_1.SSEService] })
], SSEModule);
exports.SSEModule = SSEModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSubscriber = void 0;
const queue_sse_service_1 = __webpack_require__(84);
const typeorm_1 = __webpack_require__(23);
const queue_entity_1 = __webpack_require__(32);
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
exports.CourseController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const async_1 = __webpack_require__(86);
const course_section_mapping_entity_1 = __webpack_require__(68);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(23);
const roles_decorator_1 = __webpack_require__(42);
const user_decorator_1 = __webpack_require__(41);
const course_roles_guard_1 = __webpack_require__(93);
const jwt_auth_guard_1 = __webpack_require__(39);
const user_entity_1 = __webpack_require__(29);
const queue_clean_service_1 = __webpack_require__(88);
const queue_sse_service_1 = __webpack_require__(84);
const queue_entity_1 = __webpack_require__(32);
const semester_entity_1 = __webpack_require__(37);
const course_entity_1 = __webpack_require__(27);
const course_service_1 = __webpack_require__(94);
const heatmap_service_1 = __webpack_require__(95);
const ical_service_1 = __webpack_require__(96);
const office_hour_entity_1 = __webpack_require__(33);
const moment = __webpack_require__(89);
let CourseController = class CourseController {
    constructor(connection, queueCleanService, queueSSEService, heatmapService, icalService, courseService) {
        this.connection = connection;
        this.queueCleanService = queueCleanService;
        this.queueSSEService = queueSSEService;
        this.heatmapService = heatmapService;
        this.icalService = icalService;
        this.courseService = courseService;
    }
    async get(id, user) {
        const course = await course_entity_1.CourseModel.findOne(id, {
            relations: ['queues', 'queues.staffList'],
        });
        if (course === null || course === undefined) {
            console.error(common_1.ERROR_MESSAGES.courseController.courseNotFound + 'Course ID: ' + id);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseNotFound, common_2.HttpStatus.NOT_FOUND);
        }
        try {
            course.officeHours = await typeorm_1.getRepository(office_hour_entity_1.OfficeHourModel)
                .createQueryBuilder('oh')
                .select(['id', 'title', `"startTime"`, `"endTime"`])
                .where('oh.courseId = :courseId', { courseId: course.id })
                .getRawMany();
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.courseOfficeHourError +
                '\n' +
                'Error message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseOfficeHourError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            course.heatmap = await this.heatmapService.getCachedHeatmapFor(id);
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.courseOfficeHourError +
                '\n' +
                'Error message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseHeatMapError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const userCourseModel = await user_course_entity_1.UserCourseModel.findOne({
            where: {
                user,
                courseId: id,
            },
        });
        if (userCourseModel === undefined || userCourseModel === null) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseModelError, common_2.HttpStatus.NOT_FOUND);
        }
        if (userCourseModel.role === common_1.Role.PROFESSOR) {
            course.queues = await async_1.default.filter(course.queues, async (q) => (await q.checkIsOpen()) || q.isProfessorQueue);
        }
        else {
            course.queues = await async_1.default.filter(course.queues, async (q) => await q.checkIsOpen());
        }
        try {
            await async_1.default.each(course.queues, async (q) => {
                await q.addQueueTimes();
                await q.addQueueSize();
            });
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.updatedQueueError +
                '\n' +
                'Error message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.updatedQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return course;
    }
    async checkIn(courseId, room, user) {
        const queues = await queue_entity_1.QueueModel.find({
            where: {
                courseId: courseId,
            },
            relations: ['staffList'],
        });
        if (queues &&
            queues.some((q) => q.staffList.some((staff) => staff.id === user.id))) {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.courseController.checkIn.cannotCheckIntoMultipleQueues);
        }
        let queue = await queue_entity_1.QueueModel.findOne({
            room,
            courseId,
        }, { relations: ['staffList'] });
        if (!queue) {
            const userCourseModel = await user_course_entity_1.UserCourseModel.findOne({
                where: {
                    user,
                    courseId,
                },
            });
            if (userCourseModel === null || userCourseModel === undefined) {
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseModelError, common_2.HttpStatus.NOT_FOUND);
            }
            if (userCourseModel.role === common_1.Role.PROFESSOR) {
                queue = await queue_entity_1.QueueModel.create({
                    room,
                    courseId,
                    staffList: [],
                    questions: [],
                    allowQuestions: true,
                    isProfessorQueue: true,
                }).save();
            }
            else {
                throw new common_2.ForbiddenException(common_1.ERROR_MESSAGES.courseController.checkIn.cannotCreateNewQueueIfNotProfessor);
            }
        }
        if (queue.staffList.length === 0) {
            queue.allowQuestions = true;
        }
        queue.staffList.push(user);
        try {
            await queue.save();
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.saveQueueError +
                '\nError message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.saveQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            await event_model_entity_1.EventModel.create({
                time: new Date(),
                eventType: event_model_entity_1.EventType.TA_CHECKED_IN,
                user,
                courseId,
            }).save();
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.createEventError +
                '\nError message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.createEventError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            await this.queueSSEService.updateQueue(queue.id);
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.createEventError +
                '\nError message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.updatedQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return queue;
    }
    async checkOut(courseId, room, user) {
        const queue = await queue_entity_1.QueueModel.findOne({
            room,
            courseId,
        }, { relations: ['staffList'] });
        if (queue === undefined || queue === null) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.queueNotFound, common_2.HttpStatus.NOT_FOUND);
        }
        queue.staffList = queue.staffList.filter((e) => e.id !== user.id);
        if (queue.staffList.length === 0) {
            queue.allowQuestions = false;
        }
        try {
            await queue.save();
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.saveQueueError +
                '\nError Message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.saveQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            await event_model_entity_1.EventModel.create({
                time: new Date(),
                eventType: event_model_entity_1.EventType.TA_CHECKED_OUT,
                user,
                courseId,
            }).save();
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.createEventError +
                '\nError message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.createEventError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let canClearQueue = null;
        try {
            canClearQueue = await this.queueCleanService.shouldCleanQueue(queue);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.clearQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
        try {
            await this.queueSSEService.updateQueue(queue.id);
        }
        catch (err) {
            console.error(common_1.ERROR_MESSAGES.courseController.createEventError +
                '\nError message: ' +
                err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.updatedQueueError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { queueId: queue.id, canClearQueue, nextOfficeHourTime };
    }
    async updateCalendar(courseId) {
        const course = await course_entity_1.CourseModel.findOne(courseId);
        if (course === null || course === undefined) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseNotFound, common_2.HttpStatus.NOT_FOUND);
        }
        try {
            await this.icalService.updateCalendarForCourse(course);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.icalCalendarUpdate, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourseOverrides(courseId) {
        const resp = await user_course_entity_1.UserCourseModel.find({
            where: { courseId, override: true },
            relations: ['user'],
        });
        if (resp === null || resp === undefined) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseModelError, common_2.HttpStatus.NOT_FOUND);
        }
        return {
            data: resp.map((row) => ({
                id: row.id,
                role: row.role,
                name: row.user.name,
                email: row.user.email,
            })),
        };
    }
    async addOverride(courseId, overrideInfo) {
        const user = await user_entity_1.UserModel.findOne({
            where: { email: overrideInfo.email },
        });
        if (!user)
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.courseController.noUserFound);
        const userId = user.id;
        let userCourse = await user_course_entity_1.UserCourseModel.findOne({
            where: { courseId, userId },
        });
        if (!userCourse) {
            try {
                userCourse = await user_course_entity_1.UserCourseModel.create({
                    userId,
                    courseId,
                    role: overrideInfo.role,
                    override: true,
                }).save();
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.createCourse, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            userCourse.override = true;
            userCourse.role = overrideInfo.role;
            try {
                await userCourse.save();
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.updateCourse, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return {
            id: userCourse.id,
            role: userCourse.role,
            name: user.name,
            email: user.email,
        };
    }
    async deleteOverride(courseId, overrideInfo) {
        const user = await user_entity_1.UserModel.findOne({
            where: { email: overrideInfo.email },
        });
        if (!user)
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.courseController.noUserFound);
        const userId = user.id;
        const userCourse = await user_course_entity_1.UserCourseModel.findOne({
            where: { courseId, userId, override: true },
        });
        if (!userCourse) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.courseNotFound, common_2.HttpStatus.NOT_FOUND);
        }
        try {
            await user_course_entity_1.UserCourseModel.remove(userCourse);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.removeCourse, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async submitCourse(body) {
        if (body.password !== process.env.APPLY_PASSWORD) {
            throw new common_2.UnauthorizedException(common_1.ERROR_MESSAGES.courseController.invalidApplyURL);
        }
        const season = body.semester.split(' ')[0];
        const year = parseInt(body.semester.split(' ')[1]);
        const semester = await semester_entity_1.SemesterModel.findOne({
            where: { season, year },
        });
        if (!semester)
            throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.courseController.noSemesterFound);
        let course = null;
        try {
            course = await course_entity_1.CourseModel.create({
                name: body.name,
                coordinator_email: body.coordinator_email,
                icalURL: body.icalURL,
                semesterId: semester.id,
                enabled: false,
                pending: true,
                timezone: body.timezone,
            }).save();
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.createCourse, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            new Set(body.sections).forEach(async (section) => {
                await course_section_mapping_entity_1.CourseSectionMappingModel.create({
                    genericCourseName: body.name,
                    section,
                    courseId: course.id,
                }).save();
            });
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.createCourseMappings, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async taCheckinTimes(courseId, startDate, endDate) {
        try {
            return await this.courseService.getTACheckInCheckOutTimes(courseId, startDate, endDate);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.courseController.checkInTime, common_2.HttpStatus.BAD_REQUEST);
        }
    }
    async toggleSelfEnroll(courseId) {
        const course = await course_entity_1.CourseModel.findOne(courseId);
        course.selfEnroll = !course.selfEnroll;
        await course.save();
    }
};
__decorate([
    common_2.Get(':id'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR, common_1.Role.STUDENT, common_1.Role.TA),
    __param(0, common_2.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "get", null);
__decorate([
    common_2.Post(':id/ta_location/:room'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
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
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR, common_1.Role.TA),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Param('room')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkOut", null);
__decorate([
    common_2.Post(':id/update_calendar'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCalendar", null);
__decorate([
    common_2.Get(':id/course_override'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseOverrides", null);
__decorate([
    common_2.Post(':id/update_override'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_1.UpdateCourseOverrideBody]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addOverride", null);
__decorate([
    common_2.Delete(':id/update_override'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_1.UpdateCourseOverrideBody]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteOverride", null);
__decorate([
    common_2.Post('submit_course'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_1.SubmitCourseParams]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "submitCourse", null);
__decorate([
    common_2.Get(':id/ta_check_in_times'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __param(1, common_2.Query('startDate')),
    __param(2, common_2.Query('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "taCheckinTimes", null);
__decorate([
    common_2.Post(':id/self_enroll'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard, course_roles_guard_1.CourseRolesGuard),
    roles_decorator_1.Roles(common_1.Role.PROFESSOR),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "toggleSelfEnroll", null);
CourseController = __decorate([
    common_2.Controller('courses'),
    common_2.UseInterceptors(common_2.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        queue_clean_service_1.QueueCleanService,
        queue_sse_service_1.QueueSSEService,
        heatmap_service_1.HeatmapService,
        ical_service_1.IcalService,
        course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;


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
exports.CourseRolesGuard = void 0;
const common_1 = __webpack_require__(9);
const role_guard_1 = __webpack_require__(83);
const user_entity_1 = __webpack_require__(29);
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
exports.CourseService = void 0;
const common_1 = __webpack_require__(9);
const lodash_1 = __webpack_require__(46);
const event_model_entity_1 = __webpack_require__(36);
const question_entity_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(23);
let CourseService = class CourseService {
    constructor(connection) {
        this.connection = connection;
    }
    async getTACheckInCheckOutTimes(courseId, startDate, endDate) {
        const startDateAsDate = new Date(startDate);
        const endDateAsDate = new Date(endDate);
        if (startDateAsDate.getUTCDate() === endDateAsDate.getUTCDate()) {
            endDateAsDate.setUTCDate(endDateAsDate.getUTCDate() + 1);
        }
        const taEvents = await event_model_entity_1.EventModel.find({
            where: {
                eventType: typeorm_1.In([
                    event_model_entity_1.EventType.TA_CHECKED_IN,
                    event_model_entity_1.EventType.TA_CHECKED_OUT,
                    event_model_entity_1.EventType.TA_CHECKED_OUT_FORCED,
                ]),
                time: typeorm_1.Between(startDateAsDate, endDateAsDate),
                courseId,
            },
            relations: ['user'],
        });
        const [checkinEvents, otherEvents] = lodash_1.partition(taEvents, (e) => e.eventType === event_model_entity_1.EventType.TA_CHECKED_IN);
        const taCheckinTimes = [];
        for (const checkinEvent of checkinEvents) {
            let closestEvent = null;
            let mostRecentTime = new Date();
            const originalDate = mostRecentTime;
            for (const checkoutEvent of otherEvents) {
                if (checkoutEvent.userId === checkinEvent.userId &&
                    checkoutEvent.time > checkinEvent.time &&
                    checkoutEvent.time.getTime() - checkinEvent.time.getTime() <
                        mostRecentTime.getTime() - checkinEvent.time.getTime()) {
                    closestEvent = checkoutEvent;
                    mostRecentTime = checkoutEvent.time;
                }
            }
            const numHelped = await question_entity_1.QuestionModel.count({
                where: {
                    taHelpedId: checkinEvent.userId,
                    helpedAt: typeorm_1.Between(checkinEvent.time, (closestEvent === null || closestEvent === void 0 ? void 0 : closestEvent.time) || new Date()),
                },
            });
            taCheckinTimes.push({
                name: checkinEvent.user.name,
                checkinTime: checkinEvent.time,
                checkoutTime: closestEvent === null || closestEvent === void 0 ? void 0 : closestEvent.time,
                inProgress: mostRecentTime === originalDate,
                forced: (closestEvent === null || closestEvent === void 0 ? void 0 : closestEvent.eventType) === event_model_entity_1.EventType.TA_CHECKED_OUT_FORCED,
                numHelped,
            });
        }
        return { taCheckinTimes };
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CourseService);
exports.CourseService = CourseService;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapService = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const lodash_1 = __webpack_require__(46);
const moment = __webpack_require__(89);
const nestjs_command_1 = __webpack_require__(22);
const question_entity_1 = __webpack_require__(34);
const typeorm_1 = __webpack_require__(23);
const office_hour_entity_1 = __webpack_require__(33);
const course_entity_1 = __webpack_require__(27);
function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    const spliced = arr.splice(0, count);
    return [...arr, ...spliced];
}
let HeatmapService = class HeatmapService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async getCachedHeatmapFor(courseId) {
        const cacheLengthInSeconds = 604800;
        return this.cacheManager.wrap(`heatmap/${courseId}`, () => this._getHeatmapFor(courseId), { ttl: cacheLengthInSeconds });
    }
    async _getHeatmapFor(courseId) {
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
        const tz = (await course_entity_1.CourseModel.findOne({ id: courseId })).timezone;
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
    async create(courseId) {
        console.log(await this._getHeatmapFor(courseId));
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'heatmap:generate <courseId>',
        describe: 'generate heatmap for a course',
        autoExit: true,
    }),
    __param(0, nestjs_command_1.Positional({
        name: 'courseId',
        describe: 'which course the heatmap will be generated for',
        type: 'number',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HeatmapService.prototype, "create", null);
HeatmapService = __decorate([
    common_2.Injectable(),
    __param(0, common_2.Inject(common_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], HeatmapService);
exports.HeatmapService = HeatmapService;


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
exports.IcalService = void 0;
const common_1 = __webpack_require__(9);
__webpack_require__(97);
const node_ical_1 = __webpack_require__(98);
const rrule_1 = __webpack_require__(99);
const typeorm_1 = __webpack_require__(23);
const dist_1 = __webpack_require__(100);
const queue_entity_1 = __webpack_require__(32);
const course_entity_1 = __webpack_require__(27);
const office_hour_entity_1 = __webpack_require__(33);
const moment = __webpack_require__(89);
const schedule_1 = __webpack_require__(18);
const nestjs_redis_1 = __webpack_require__(61);
const Redlock = __webpack_require__(101);
let IcalService = class IcalService {
    constructor(connection, redisService) {
        this.connection = connection;
        this.redisService = redisService;
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
    parseIcal(icalData, courseId, testRegex = /\b^(Online OH)\b/) {
        const icalDataValues = Object.values(icalData);
        const officeHours = icalDataValues.filter((iCalElement) => iCalElement.type === 'VEVENT' &&
            iCalElement.start !== undefined &&
            iCalElement.end !== undefined);
        const filteredOfficeHours = officeHours.filter((event) => testRegex.test(event.summary));
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
        const icalURL = await node_ical_1.fromURL(course.icalURL);
        const officeHours = this.parseIcal(icalURL, course.id);
        await office_hour_entity_1.OfficeHourModel.delete({ courseId: course.id });
        await office_hour_entity_1.OfficeHourModel.save(officeHours.map((e) => {
            e.queueId = queue.id;
            return office_hour_entity_1.OfficeHourModel.create(e);
        }));
        const professorHoursRegex = /\b^(Prof|Professor)/;
        const professorOfficeHours = this.parseIcal(icalURL, course.id, professorHoursRegex);
        const professorQueues = await queue_entity_1.QueueModel.find({
            where: {
                isProfessorQueue: true,
            },
        });
        const processedProfessorOfficeHours = [];
        for (const poh of professorOfficeHours) {
            const professorLocation = poh.title;
            if (!professorQueues.some((q) => q.room === professorLocation && q.courseId === course.id)) {
                const newProfQ = queue_entity_1.QueueModel.create({
                    room: professorLocation,
                    courseId: course.id,
                    staffList: [],
                    questions: [],
                    allowQuestions: false,
                    isProfessorQueue: true,
                });
                await newProfQ.save();
                professorQueues.push(newProfQ);
            }
            const professorQueue = professorQueues.find((q) => q.room === professorLocation);
            processedProfessorOfficeHours.push(office_hour_entity_1.OfficeHourModel.create(Object.assign({ queueId: professorQueue.id }, poh)));
        }
        await office_hour_entity_1.OfficeHourModel.save(processedProfessorOfficeHours);
        await queue_entity_1.QueueModel.save(professorQueues);
        console.timeEnd(`scrape course ${course.id}`);
        console.log('done scraping!');
    }
    async updateAllCourses() {
        const resource = 'locks:icalcron';
        const ttl = 60000;
        const redisDB = await this.redisService.getClient('db');
        const redlock = new Redlock([redisDB]);
        redlock.on('clientError', function (err) {
            console.error('A redis error has occurred:', err);
        });
        try {
            await redlock.lock(resource, ttl).then(async (lock) => {
                console.log('updating course icals');
                const courses = await course_entity_1.CourseModel.find({
                    where: { enabled: true },
                });
                await Promise.all(courses.map((c) => this.updateCalendarForCourse(c)));
                return lock.unlock().catch(function (err) {
                    console.error(err);
                });
            });
        }
        catch (error) {
            console.error('A problem locking Redlock has occurred:', error);
        }
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
    __metadata("design:paramtypes", [typeorm_1.Connection,
        nestjs_redis_1.RedisService])
], IcalService);
exports.IcalService = IcalService;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("node-ical");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("rrule");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("windows-iana/dist");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("redlock");

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICalCommand = void 0;
const nestjs_command_1 = __webpack_require__(22);
const common_1 = __webpack_require__(9);
const ical_service_1 = __webpack_require__(96);
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
exports.HealthcheckModule = void 0;
const common_1 = __webpack_require__(9);
const healthcheck_controller_1 = __webpack_require__(104);
let HealthcheckModule = class HealthcheckModule {
};
HealthcheckModule = __decorate([
    common_1.Module({
        controllers: [healthcheck_controller_1.HealthcheckController],
    })
], HealthcheckModule);
exports.HealthcheckModule = HealthcheckModule;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckController = void 0;
const common_1 = __webpack_require__(9);
const decorators_1 = __webpack_require__(105);
let HealthcheckController = class HealthcheckController {
    health() {
        return 'healthy';
    }
};
__decorate([
    decorators_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], HealthcheckController.prototype, "health", null);
HealthcheckController = __decorate([
    common_1.Controller('healthcheck')
], HealthcheckController);
exports.HealthcheckController = HealthcheckController;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common/decorators");

/***/ }),
/* 106 */
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
const common_1 = __webpack_require__(9);
const login_controller_1 = __webpack_require__(107);
const jwt_strategy_1 = __webpack_require__(112);
const jwt_1 = __webpack_require__(108);
const config_1 = __webpack_require__(17);
const login_course_service_1 = __webpack_require__(111);
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const common_2 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
const jwt_1 = __webpack_require__(108);
const Sentry = __webpack_require__(12);
const course_entity_1 = __webpack_require__(27);
const user_decorator_1 = __webpack_require__(41);
const jwt_auth_guard_1 = __webpack_require__(39);
const httpSignature = __webpack_require__(109);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const typeorm_1 = __webpack_require__(23);
const non_production_guard_1 = __webpack_require__(110);
const login_course_service_1 = __webpack_require__(111);
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
                Sentry.captureMessage('Invalid request signature: ' + parsedRequest);
                throw new common_2.UnauthorizedException('Invalid request signature');
            }
        }
        let user;
        try {
            user = await this.loginCourseService.addUserFromKhoury(body);
        }
        catch (e) {
            Sentry.captureException(e);
            console.error('Khoury login threw an exception, the body was ', body);
            console.error(e);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.loginController.addUserFromKhoury, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const token = await this.jwtService.signAsync({ userId: user.id }, { expiresIn: 60 });
        if (token === null || token === undefined) {
            console.error('Temporary JWT is invalid');
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.loginController.invalidTempJWTToken, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
        if (payload === null || payload === undefined) {
            console.error('Decoded JWT is invalid');
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.loginController.invalidPayload, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.enter(res, payload.userId);
    }
    async enterFromDev(res, userId) {
        this.enter(res, userId);
    }
    async enter(res, userId) {
        const authToken = await this.jwtService.signAsync({
            userId,
            expiresIn: 60 * 60 * 24 * 30,
        });
        if (authToken === null || authToken === undefined) {
            console.error('Authroziation JWT is invalid');
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.loginController.invalidTempJWTToken, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const isSecure = this.configService
            .get('DOMAIN')
            .startsWith('https://');
        res
            .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
            .redirect(302, '/');
    }
    async logout(res) {
        const isSecure = this.configService
            .get('DOMAIN')
            .startsWith('https://');
        res
            .clearCookie('auth_token', { httpOnly: true, secure: isSecure })
            .redirect(302, '/login');
    }
    async selfEnrollEnabledAnywhere() {
        const courses = await course_entity_1.CourseModel.find();
        return { courses: courses.filter((course) => course.selfEnroll) };
    }
    async createSelfEnrollOverride(courseId, user) {
        const course = await course_entity_1.CourseModel.findOne(courseId);
        if (!course.selfEnroll) {
            throw new common_2.UnauthorizedException('Cannot self-enroll to this course currently');
        }
        const prevUCM = await user_course_entity_1.UserCourseModel.findOne({
            where: {
                courseId,
                userId: user.id,
            },
        });
        if (prevUCM) {
            throw new common_2.BadRequestException('User already has an override for this course');
        }
        await user_course_entity_1.UserCourseModel.create({
            userId: user.id,
            courseId: courseId,
            role: common_1.Role.STUDENT,
            override: true,
            expires: true,
        }).save();
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
__decorate([
    common_2.Get('/logout'),
    __param(0, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
__decorate([
    common_2.Get('self_enroll_courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "selfEnrollEnabledAnywhere", null);
__decorate([
    common_2.Post('create_self_enroll_override/:id'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_2.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "createSelfEnrollOverride", null);
LoginController = __decorate([
    common_2.Controller(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        login_course_service_1.LoginCourseService,
        jwt_1.JwtService,
        config_1.ConfigService])
], LoginController);
exports.LoginController = LoginController;


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("http-signature");

/***/ }),
/* 110 */
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
const common_1 = __webpack_require__(9);
const common_2 = __webpack_require__(5);
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
const common_2 = __webpack_require__(9);
const course_section_mapping_entity_1 = __webpack_require__(68);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const typeorm_1 = __webpack_require__(23);
let LoginCourseService = class LoginCourseService {
    constructor(connection) {
        this.connection = connection;
    }
    async addUserFromKhoury(info) {
        let user;
        const neuEmail = info.email.replace('@husky.neu.edu', '@northeastern.edu');
        user = await user_entity_1.UserModel.findOne({
            where: { email: neuEmail },
            relations: ['courses', 'courses.course'],
        });
        if (!user) {
            user = user_entity_1.UserModel.create({
                courses: [],
                email: neuEmail,
                firstName: info.first_name,
                lastName: info.last_name,
                hideInsights: [],
            });
        }
        const userCourses = [];
        for (const c of info.courses) {
            const course = await this.courseSectionToCourse(c.course, c.section);
            if (course) {
                const userCourse = await this.courseToUserCourse(user.id, course.id, common_1.Role.STUDENT);
                userCourses.push(userCourse);
            }
        }
        if (info.ta_courses) {
            for (const c of info.ta_courses) {
                const courseMappings = (await course_section_mapping_entity_1.CourseSectionMappingModel.find({
                    where: { genericCourseName: c.course },
                    relations: ['course'],
                })).filter((cm) => cm.course.enabled);
                for (const courseMapping of courseMappings) {
                    const taCourse = await this.courseToUserCourse(user.id, courseMapping.courseId, c.instructor === 1 ? common_1.Role.PROFESSOR : common_1.Role.TA);
                    userCourses.push(taCourse);
                }
            }
        }
        for (const previousCourse of user.courses) {
            if (!this.hasUserCourse(userCourses, previousCourse) &&
                previousCourse.course.enabled) {
                if (!previousCourse.override) {
                    previousCourse.remove();
                }
                else {
                    userCourses.push(previousCourse);
                }
            }
        }
        user.courses = userCourses;
        await user.save();
        return user;
    }
    async courseSectionToCourse(courseName, courseSection) {
        const courseSectionModel = (await course_section_mapping_entity_1.CourseSectionMappingModel.find({
            where: { genericCourseName: courseName, section: courseSection },
            relations: ['course'],
        })).find((cm) => cm.course.enabled);
        return courseSectionModel === null || courseSectionModel === void 0 ? void 0 : courseSectionModel.course;
    }
    async courseToUserCourse(userId, courseId, role) {
        let userCourse;
        userCourse = await user_course_entity_1.UserCourseModel.findOne({
            where: { userId, courseId },
        });
        if (userCourse && userCourse.override && userCourse.role === role) {
            userCourse.override = false;
            await userCourse.save();
        }
        if (!userCourse) {
            userCourse = await user_course_entity_1.UserCourseModel.create({
                userId,
                courseId,
                role,
            }).save();
        }
        return userCourse;
    }
    hasUserCourse(userCourses, previousCourse) {
        return userCourses.some((uc) => uc.courseId === previousCourse.courseId &&
            uc.userId === previousCourse.userId &&
            uc.role === previousCourse.role);
    }
};
LoginCourseService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], LoginCourseService);
exports.LoginCourseService = LoginCourseService;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
const passport_jwt_1 = __webpack_require__(113);
const passport_1 = __webpack_require__(40);
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(17);
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
/* 113 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 114 */
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
const common_1 = __webpack_require__(9);
const profile_controller_1 = __webpack_require__(115);
const notification_module_1 = __webpack_require__(49);
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const common_2 = __webpack_require__(9);
const platform_express_1 = __webpack_require__(116);
const checkDiskSpace = __webpack_require__(117);
const fs = __webpack_require__(118);
const lodash_1 = __webpack_require__(46);
const multer_1 = __webpack_require__(119);
const path = __webpack_require__(120);
const sharp = __webpack_require__(121);
const typeorm_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(39);
const notification_service_1 = __webpack_require__(51);
const user_decorator_1 = __webpack_require__(41);
const user_entity_1 = __webpack_require__(29);
let ProfileController = class ProfileController {
    constructor(connection, notifService) {
        this.connection = connection;
        this.notifService = notifService;
    }
    async get(user) {
        var _a;
        if (user === null || user === undefined) {
            console.error(common_1.ERROR_MESSAGES.profileController.accountNotAvailable);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.profileController.accountNotAvailable, common_2.HttpStatus.NOT_FOUND);
        }
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
            'insights',
        ]);
        if (userResponse === null || userResponse === undefined) {
            console.error(common_1.ERROR_MESSAGES.profileController.userResponseNotFound);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.profileController.userResponseNotFound, common_2.HttpStatus.NOT_FOUND);
        }
        return Object.assign(Object.assign({}, userResponse), { courses, phoneNumber: (_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber, desktopNotifs });
    }
    async patch(userPatch, user) {
        var _a;
        user = Object.assign(user, userPatch);
        if (userPatch.phoneNotifsEnabled && userPatch.phoneNumber) {
            if (user.phoneNotifsEnabled &&
                userPatch.phoneNumber !== ((_a = user.phoneNotif) === null || _a === void 0 ? void 0 : _a.phoneNumber)) {
                await this.notifService.registerPhone(userPatch.phoneNumber, user);
            }
        }
        await user.save();
        return this.get(user);
    }
    async uploadImage(file, user) {
        if (user.photoURL) {
            fs.unlink(process.env.UPLOAD_LOCATION + '/' + user.photoURL, (err) => {
                console.error('Error deleting previous picture at: ', user.photoURL, err, 'the previous image was at an invalid location?');
            });
        }
        const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);
        if (spaceLeft.free < 1000000000) {
            throw new common_2.ServiceUnavailableException(common_1.ERROR_MESSAGES.profileController.noDiskSpace);
        }
        const fileName = user.id +
            '-' +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        await sharp(file.buffer)
            .resize(256)
            .toFile(path.join(process.env.UPLOAD_LOCATION, fileName));
        user.photoURL = fileName;
        await user.save();
    }
    async getImage(photoURL, res) {
        fs.stat(path.join(process.env.UPLOAD_LOCATION, photoURL), async (err, stats) => {
            if (stats) {
                res.sendFile(photoURL, { root: process.env.UPLOAD_LOCATION });
            }
            else {
                const user = await user_entity_1.UserModel.findOne({
                    where: {
                        photoURL,
                    },
                });
                user.photoURL = null;
                await user.save();
                throw new common_2.NotFoundException();
            }
        });
    }
    async deleteProfilePicture(user) {
        if (user.photoURL) {
            fs.unlink(process.env.UPLOAD_LOCATION + '/' + user.photoURL, async (err) => {
                if (err) {
                    const errMessage = 'Error deleting previous picture at : ' +
                        user.photoURL +
                        'the previous image was at an invalid location?';
                    console.error(errMessage, err);
                    throw new common_2.BadRequestException(errMessage);
                }
                else {
                    user.photoURL = null;
                    await user.save();
                    return;
                }
            });
        }
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
__decorate([
    common_2.Post('/upload_picture'),
    common_2.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.memoryStorage(),
    })),
    __param(0, common_2.UploadedFile()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadImage", null);
__decorate([
    common_2.Get('/get_picture/:photoURL'),
    __param(0, common_2.Param('photoURL')),
    __param(1, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getImage", null);
__decorate([
    common_2.Delete('/delete_profile_picture'),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserModel]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteProfilePicture", null);
ProfileController = __decorate([
    common_2.Controller('profile'),
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        notification_service_1.NotificationService])
], ProfileController);
exports.ProfileController = ProfileController;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("check-disk-space");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),
/* 122 */
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
const common_1 = __webpack_require__(9);
const notification_module_1 = __webpack_require__(49);
const question_controller_1 = __webpack_require__(123);
const question_subscriber_1 = __webpack_require__(125);
const queue_module_1 = __webpack_require__(79);
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(39);
const notification_service_1 = __webpack_require__(51);
const roles_decorator_1 = __webpack_require__(42);
const user_course_entity_1 = __webpack_require__(26);
const user_decorator_1 = __webpack_require__(41);
const user_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(32);
const question_role_guard_1 = __webpack_require__(124);
const question_entity_1 = __webpack_require__(34);
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
                previousUserQuestion.status = common_1.ClosedQuestionStatus.ConfirmedDeleted;
                await previousUserQuestion.save();
            }
            else {
                throw new common_2.BadRequestException(common_1.ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime);
            }
        }
        try {
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
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.saveQError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
            try {
                await question.save();
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.saveQError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
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
            try {
                await question.save();
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.saveQError, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
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
        if (question === undefined || question === null) {
            throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.notFound, common_2.HttpStatus.NOT_FOUND);
        }
        if (question.status === common_1.LimboQuestionStatus.CantFind) {
            try {
                await this.notifService.notifyUser(question.creatorId, notification_service_1.NotifMsgs.queue.ALERT_BUTTON);
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.unableToNotifyUser, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else if (question.status === common_1.LimboQuestionStatus.TADeleted) {
            try {
                await this.notifService.notifyUser(question.creatorId, notification_service_1.NotifMsgs.queue.REMOVED);
            }
            catch (err) {
                console.error(err);
                throw new common_2.HttpException(common_1.ERROR_MESSAGES.questionController.unableToNotifyUser, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
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
/* 124 */
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
const common_2 = __webpack_require__(9);
const role_guard_1 = __webpack_require__(83);
const user_entity_1 = __webpack_require__(29);
const queue_entity_1 = __webpack_require__(32);
const question_entity_1 = __webpack_require__(34);
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(23);
const notification_service_1 = __webpack_require__(51);
const queue_sse_service_1 = __webpack_require__(84);
const queue_entity_1 = __webpack_require__(32);
const question_entity_1 = __webpack_require__(34);
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
/* 126 */
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
const common_1 = __webpack_require__(9);
const seed_controller_1 = __webpack_require__(127);
const seed_service_1 = __webpack_require__(130);
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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const common_2 = __webpack_require__(9);
const alerts_entity_1 = __webpack_require__(28);
const course_section_mapping_entity_1 = __webpack_require__(68);
const desktop_notif_entity_1 = __webpack_require__(30);
const phone_notif_entity_1 = __webpack_require__(31);
const event_model_entity_1 = __webpack_require__(36);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const typeorm_1 = __webpack_require__(23);
const factories_1 = __webpack_require__(128);
const course_entity_1 = __webpack_require__(27);
const office_hour_entity_1 = __webpack_require__(33);
const non_production_guard_1 = __webpack_require__(110);
const question_entity_1 = __webpack_require__(34);
const queue_entity_1 = __webpack_require__(32);
const seed_service_1 = __webpack_require__(130);
let SeedController = class SeedController {
    constructor(connection, seedService) {
        this.connection = connection;
        this.seedService = seedService;
    }
    async deleteAll() {
        await this.seedService.deleteAll(office_hour_entity_1.OfficeHourModel);
        await this.seedService.deleteAll(question_entity_1.QuestionModel);
        await this.seedService.deleteAll(queue_entity_1.QueueModel);
        await this.seedService.deleteAll(user_course_entity_1.UserCourseModel);
        await this.seedService.deleteAll(event_model_entity_1.EventModel);
        await this.seedService.deleteAll(desktop_notif_entity_1.DesktopNotifModel);
        await this.seedService.deleteAll(phone_notif_entity_1.PhoneNotifModel);
        await this.seedService.deleteAll(alerts_entity_1.AlertModel);
        await this.seedService.deleteAll(user_entity_1.UserModel);
        await this.seedService.deleteAll(course_section_mapping_entity_1.CourseSectionMappingModel);
        await this.seedService.deleteAll(course_entity_1.CourseModel);
        const manager = typeorm_1.getManager();
        manager.query('ALTER SEQUENCE user_model_id_seq RESTART WITH 1;');
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
        const professorOfficeHours = await factories_1.OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
        });
        const courseExists = await course_entity_1.CourseModel.findOne({
            where: { name: 'CS 2500' },
        });
        if (!courseExists) {
            await factories_1.SemesterFactory.create({ season: 'Fall', year: 2020 });
            await factories_1.CourseFactory.create({ timezone: 'America/New_York' });
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
            professorOfficeHours,
        ];
        course.save();
        const userExists = await user_entity_1.UserModel.findOne();
        if (!userExists) {
            const user1 = await factories_1.UserFactory.create({
                email: 'liu.sta@northeastern.edu',
                firstName: 'Stanley',
                lastName: 'Liu',
            });
            await factories_1.UserCourseFactory.create({
                user: user1,
                role: common_1.Role.STUDENT,
                course: course,
            });
            const user2 = await factories_1.UserFactory.create({
                email: 'takayama.a@northeastern.edu',
                firstName: 'Alex',
                lastName: 'Takayama',
            });
            await factories_1.UserCourseFactory.create({
                user: user2,
                role: common_1.Role.STUDENT,
                course: course,
                override: true,
            });
            const user3 = await factories_1.UserFactory.create({
                email: 'stenzel.w@northeastern.edu',
                firstName: 'Will',
                lastName: 'Stenzel',
            });
            await factories_1.UserCourseFactory.create({
                user: user3,
                role: common_1.Role.TA,
                course: course,
            });
            const user4 = await factories_1.UserFactory.create({
                email: 'chu.daj@northeastern.edu',
                firstName: 'Da-Jin',
                lastName: 'Chu',
            });
            await factories_1.UserCourseFactory.create({
                user: user4,
                role: common_1.Role.TA,
                course: course,
            });
            const user5 = await factories_1.UserFactory.create({
                email: 'li.edwa@northeastern.edu',
                firstName: 'Eddy',
                lastName: 'Li',
                photoURL: 'https://ca.slack-edge.com/TE565NU79-UR6P32JBT-a6c89822c544-512',
                insights: [
                    'QuestionTypeBreakdown',
                    'TotalQuestionsAsked',
                    'TotalStudents',
                ],
            });
            await factories_1.UserCourseFactory.create({
                user: user5,
                role: common_1.Role.PROFESSOR,
                course: course,
            });
        }
        const queue = await factories_1.QueueFactory.create({
            room: 'Online',
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
        const eventTA = await user_entity_1.UserModel.findOne({
            where: {
                firstName: 'Will',
            },
        });
        await factories_1.EventFactory.create({
            user: eventTA,
            course: course,
            time: yesterday,
            eventType: event_model_entity_1.EventType.TA_CHECKED_IN,
        });
        await factories_1.EventFactory.create({
            user: eventTA,
            course: course,
            time: new Date(Date.now() - 80000000),
            eventType: event_model_entity_1.EventType.TA_CHECKED_OUT,
        });
        await factories_1.EventFactory.create({
            user: eventTA,
            course: course,
            time: new Date(Date.now() - 70000000),
            eventType: event_model_entity_1.EventType.TA_CHECKED_IN,
        });
        const todayAtMidnight = new Date();
        todayAtMidnight.setHours(0, 0, 0, 0);
        await factories_1.EventFactory.create({
            user: eventTA,
            course: course,
            time: todayAtMidnight,
            eventType: event_model_entity_1.EventType.TA_CHECKED_OUT_FORCED,
        });
        const professorQueue = await factories_1.QueueFactory.create({
            room: "Professor Li's Hours",
            course: course,
            officeHours: [professorOfficeHours],
            allowQuestions: true,
            isProfessorQueue: true,
        });
        await factories_1.QuestionFactory.create({
            queue: professorQueue,
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
        const question = await factories_1.QuestionFactory.create(Object.assign(Object.assign(Object.assign({}, options), body.data), { createdAt: new Date() }));
        return question;
    }
    async createQueueWithoutOfficeHour(body) {
        var _a;
        const options = {
            allowQuestions: (_a = body.allowQuestions) !== null && _a !== void 0 ? _a : false,
            officeHours: [],
        };
        if (body.courseId) {
            const course = await course_entity_1.CourseModel.findOneOrFail(body.courseId);
            options['course'] = course;
        }
        return await factories_1.QueueFactory.create(options);
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
__decorate([
    common_2.Post('createQueueWithoutOfficeHour'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "createQueueWithoutOfficeHour", null);
SeedController = __decorate([
    common_2.Controller('seeds'),
    common_2.UseGuards(non_production_guard_1.NonProductionGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        seed_service_1.SeedService])
], SeedController);
exports.SeedController = SeedController;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFactory = exports.QuestionFactory = exports.QueueFactory = exports.UserCourseFactory = exports.CourseSectionFactory = exports.CourseFactory = exports.OfficeHourFactory = exports.ClosedOfficeHourFactory = exports.SemesterFactory = exports.TACourseFactory = exports.StudentCourseFactory = exports.UserFactory = void 0;
const common_1 = __webpack_require__(5);
const event_model_entity_1 = __webpack_require__(36);
const typeorm_factory_1 = __webpack_require__(129);
const course_entity_1 = __webpack_require__(27);
const office_hour_entity_1 = __webpack_require__(33);
const semester_entity_1 = __webpack_require__(37);
const course_section_mapping_entity_1 = __webpack_require__(68);
const user_course_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(29);
const question_entity_1 = __webpack_require__(34);
const queue_entity_1 = __webpack_require__(32);
exports.UserFactory = new typeorm_factory_1.Factory(user_entity_1.UserModel)
    .attr('email', `user@neu.edu`)
    .attr('firstName', 'User')
    .attr('lastName', 'Person')
    .attr('hideInsights', []);
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
    .attr('role', common_1.Role.STUDENT)
    .attr('override', false);
exports.QueueFactory = new typeorm_factory_1.Factory(queue_entity_1.QueueModel)
    .attr('room', 'Online')
    .assocOne('course', exports.CourseFactory)
    .attr('allowQuestions', false)
    .assocMany('officeHours', exports.OfficeHourFactory)
    .assocMany('staffList', exports.UserFactory, 0)
    .attr('isProfessorQueue', false);
exports.QuestionFactory = new typeorm_factory_1.Factory(question_entity_1.QuestionModel)
    .attr('text', 'question description')
    .attr('status', 'Queued')
    .attr('questionType', common_1.QuestionType.Other)
    .assocOne('queue', exports.QueueFactory)
    .assocOne('creator', exports.UserFactory)
    .attr('createdAt', new Date());
exports.EventFactory = new typeorm_factory_1.Factory(event_model_entity_1.EventModel)
    .attr('time', new Date())
    .attr('eventType', event_model_entity_1.EventType.TA_CHECKED_IN)
    .assocOne('user', exports.UserFactory)
    .assocOne('course', exports.CourseFactory);


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = require("typeorm-factory");

/***/ }),
/* 130 */
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
const common_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(23);
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterModule = void 0;
const common_1 = __webpack_require__(9);
const semester_controller_1 = __webpack_require__(132);
let SemesterModule = class SemesterModule {
};
SemesterModule = __decorate([
    common_1.Module({
        controllers: [semester_controller_1.SemesterController],
    })
], SemesterModule);
exports.SemesterModule = SemesterModule;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterController = void 0;
const common_1 = __webpack_require__(9);
const semester_entity_1 = __webpack_require__(37);
let SemesterController = class SemesterController {
    async get() {
        return semester_entity_1.SemesterModel.find();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "get", null);
SemesterController = __decorate([
    common_1.Controller('semesters')
], SemesterController);
exports.SemesterController = SemesterController;


/***/ }),
/* 133 */
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
const common_1 = __webpack_require__(9);
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map