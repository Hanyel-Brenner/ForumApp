import { User } from "./user";

export class Post
{

    public id:string = ''
    public comment:Comment[] = []

    constructor(
        public title:string = '',
        public content:string = '',
        public author: User,
    ){}

}