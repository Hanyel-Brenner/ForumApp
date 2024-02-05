import { Post } from "../models/post"
import { User } from "../models/user"

export interface IApp{
    registerUser(user:User):Promise<string>  //will return id most likely
    registerPost(post:Post):Promise<string> //will return id most likely
    listUsers():Promise<User[]>
   // unregisterUser()
   // unregisterPost()
    //authenticateUser()

}