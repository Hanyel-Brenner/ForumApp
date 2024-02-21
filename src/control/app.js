"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
var posts_repo_1 = require("./posts-repo");
var user_repo_1 = require("./user-repo");
var post_1 = require("../models/post");
var user_1 = require("../models/user");
var user_already_registered_1 = require("../erros/user-already-registered");
var empty_post_1 = require("../erros/empty-post");
var App = /** @class */ (function () {
    function App(user, post) {
        this.postRepo = post;
        this.userRepo = user;
    }
    App.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find(user.email)];
                    case 1:
                        valid = _a.sent();
                        if (!!valid) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepo.add(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new user_already_registered_1.UserAlreadyRegistered();
                }
            });
        });
    };
    App.prototype.registerPost = function (title, content, author) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(content == '')) return [3 /*break*/, 1];
                        throw new empty_post_1.EmptyPost();
                    case 1: return [4 /*yield*/, this.postRepo.add(new post_1.Post(title, content, author))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
var app = new App(new user_repo_1.UserRepo(), new posts_repo_1.PostRepo());
exports.app = app;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.registerUser(new user_1.User('redfield', 'redfield@mail.com', '123'))];
            case 1:
                _a.sent();
                return [4 /*yield*/, app.registerUser(new user_1.User('hanyel', 'hanyel@mail.com', '123'))];
            case 2:
                _a.sent();
                return [4 /*yield*/, app.registerUser(new user_1.User('daniel', 'daniel@mail.com', '123'))];
            case 3:
                _a.sent();
                return [4 /*yield*/, app.registerUser(new user_1.User('pedro', 'pedro@mail.com', '123'))];
            case 4:
                _a.sent();
                return [4 /*yield*/, app.registerUser(new user_1.User('corno', 'corno@hotmail.com', '123'))];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.registerPost('sharks', 'sharks are very interesting creatures', 'hanyel@mail.com')];
            case 1:
                _a.sent();
                return [4 /*yield*/, app.registerPost('dark souls 1 vs 2', 'dark souls 1 is way better of course', 'corno@hotmail.com')];
            case 2:
                _a.sent();
                return [4 /*yield*/, app.registerPost('????', 'noideia', 'daniel@mail.com')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
