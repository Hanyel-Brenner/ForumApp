import { PostRepo } from "./posts-repo";
import { UserRepo } from "./user-repo";
import { Post } from "../models/post";
import { User } from "../models/user";
import { UserAlreadyRegistered } from "../erros/user-already-registered";
import { EmptyPost } from "../erros/empty-post";
import { IApp } from "../interfaces/i-App";

export class App implements IApp{  //we will leave one instance of this class to represent the "database" containing all posts and users
    
public postRepo:PostRepo;
public userRepo:UserRepo;

    constructor(user:UserRepo,post:PostRepo)
    {
        this.postRepo = post;
        this.userRepo = user;
    }

    async registerUser(user:User):Promise<string>
    {
        let valid = await this.userRepo.find(user.email)
        if(!valid) {return await this.userRepo.add(user)} //if added sucessfully, returns id of added user.
        else throw new UserAlreadyRegistered()
    }

    async registerPost(title:string,content:string,author:string):Promise<string>
    {
        if(content == '') throw new EmptyPost();
        else return await this.postRepo.add(new Post(title,content,author));
    }
     async listUsers():Promise<User[]>
    {
        return await this.userRepo.list();
    }
    async listPosts(): Promise<Post[]> 
    {
        return await this.postRepo.list();
    }
    
}
let app:App = new App(new UserRepo(),new PostRepo()); 

(async () =>{await app.registerUser(new User('redfield','redfield@mail.com','123'));
await app.registerUser(new User('hanyel','hanyel@mail.com','123'));
await app.registerUser(new User('daniel','daniel@mail.com','123'));
await app.registerUser(new User('pedro','pedro@mail.com','123'));
await app.registerUser(new User('corno','corno@hotmail.com','123'));
})();

(async () => {
await app.registerPost('sharks','sharks are very interesting creatures', 'hanyel@mail.com');
await app.registerPost('dark souls 1 vs 2','dark souls 1 is way better of course', 'corno@hotmail.com');
await app.registerPost('????','noideia','daniel@mail.com');
})();


export {app};