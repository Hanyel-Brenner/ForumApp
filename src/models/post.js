"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var Post = /** @class */ (function () {
    function Post(title, content, author) {
        this.id = '';
        this.title = '';
        this.content = '';
        this.author = '';
        this.comment = [];
        this.title = title;
        this.content = content;
        this.author = author;
    }
    return Post;
}());
exports.Post = Post;
