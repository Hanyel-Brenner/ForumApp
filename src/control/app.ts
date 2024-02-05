import { PostRepo } from "./posts-repo";
import { UserRepo } from "./user-repo";
import { Post } from "../models/post";
import { User } from "../models/user";
import { UserAlreadyRegistered } from "../erros/user-already-registered";
import { EmptyPost } from "../erros/empty-post";
import { IApp } from "../interfaces/i-App";

export class App implements IApp{  //we will leave one instance of this class to represent the "database" containing all posts and users
    
    constructor(
       private postRepo:PostRepo,
       private userRepo:UserRepo
    ){}

    async registerUser(user:User):Promise<string>
    {
        let valid = this.userRepo.find(user.email)
        if(!valid) {return this.userRepo.add(user)} //if added sucessfully, returns id of added user.
        else throw new UserAlreadyRegistered()
    }

    async registerPost(post:Post):Promise<string>
    {
        if(post.content = '') throw new EmptyPost();
        else return this.postRepo.add(post);
    }
     async listUsers():Promise<User[]>
    {
        return await this.userRepo.list();
    }
    
}