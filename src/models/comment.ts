import { User } from "./user";

export class Comment{

    public id:string = ''

    constructor(
        public content:string[250],
        public author:User
    ){}
}