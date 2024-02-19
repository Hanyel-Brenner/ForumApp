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
//imports of class instances
var app_1 = require("./src/control/app");
var path = require('path');
var fs = require('fs');
var express = require('express');
var server = express();
var PORT = 3000;
var baseUrl = 'http://localhost:' + PORT.toString();
var viewsPath = './views/';
var srcPath = './src/';
server.use(express.static(path.join(__dirname, 'views'))); //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
//server.use("/js", express.static(__dirname + 'src'));
server.get('/', function (request, response) {
    fs.readFile(viewsPath + 'index.html', 'utf-8', function (err, html) {
        if (err != null) {
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    });
});
server.get('/users', function (req, res) {
    fs.readFile(viewsPath + 'users.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
});
server.get('/home', function (req, res) {
    fs.readFile(viewsPath + 'home.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
});
//api that sends json contaning the users registered in the App class instance
server.get('/api/getUsers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userList, array;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_1.app.listUsers()];
            case 1:
                userList = _a.sent();
                array = [1, 2, 3, 4, 5];
                //if(userList == null) res.status(500).send('Server could not acess list of users!');
                //else res.send(userList).json();
                return [4 /*yield*/, res.send(userList)];
            case 2:
                //if(userList == null) res.status(500).send('Server could not acess list of users!');
                //else res.send(userList).json();
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
server.get('/about', function (req, res) {
    fs.readFile(viewsPath + 'about.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    });
});
server.get('/policy', function (req, res) {
    fs.readFile(viewsPath + 'policy.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    });
});
server.listen(PORT, console.log('Server is up and listening on port ' + PORT.toString() + ', you can check it up on ' + baseUrl));
