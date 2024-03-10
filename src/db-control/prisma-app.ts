import { IApp } from "../interfaces/i-App";
import { Post } from "../models/post";
import { User } from "../models/user";
import { Comment} from "../models/comment"
import { PrismaPostRepo } from "./prisma-post-repo";
import { PrismaUserRepo } from "./prisma-user-repo";
import { PrismaCommentRepo } from "./prisma-comment-repo";

export class PrismaApp implements IApp{

    public users = new PrismaUserRepo();
    public posts = new PrismaPostRepo();
    public comments = new PrismaCommentRepo();
    
    async registerUser(user: User): Promise<string> 
    {
        let addedUser = await this.users.add(user)
        return addedUser    
    }
    
    async registerPost(post: Post): Promise<string> 
    {
        let addedPost = await this.posts.add(post)
        return addedPost   
    }

    async registerComment(comment:Comment):Promise<string>
    {
        let addedComment = await this.comments.add(comment)
        return addedComment
    }

    async listUsers():Promise<User[]>
    {
        return this.users.list();
    }

    async listPosts(): Promise<Post[]> 
    {
        return this.posts.list();    
    }

}



export default new PrismaApp();