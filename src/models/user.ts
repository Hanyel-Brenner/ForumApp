import { Post } from "./post";

export class User{

    public id:string='';
    //public post:Post[];

    constructor(
        public nickname:string='',
        public email:string='',
        public password:string
    ){}
}