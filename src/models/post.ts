import { User } from "./user";

export class Post
{

    public id:string = '';
    public title:string = '';
    public content:string = '';
    public author:string = '';
    public comment:Comment[] = []
    
    constructor(title:string,content:string,author:string)
    {
        this.title = title;
        this.content = content;
        this.author = author;
    }

}