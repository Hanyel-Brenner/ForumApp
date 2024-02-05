import { Post } from "../models/post"

export interface IPostRepo{
    find(title:string):Promise<Post>
    add(post:Post):Promise<string>
    remove(postId:string):Promise<boolean>
    list():Promise<Post[]>
}