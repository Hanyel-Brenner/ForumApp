import { Post } from "../models/post"
import { User } from "../models/user"

export interface IApp{
    registerUser(user:User):Promise<string>  //will return id most likely
    registerPost(title:string,content:string,author:string):Promise<string> //will return id most likely
    listUsers():Promise<User[]>
    listPosts():Promise<Post[]>
   // unregisterUser()
   // unregisterPost()
    //authenticateUser()

}