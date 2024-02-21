import { Post } from "../models/post";

export class PostRepo{

    public posts:Post[] = [];

    async find(title:string):Promise<Post>
    {
        return (this.posts || []).find(user => user.title === title);
    }
    async add(post:Post):Promise<string>
    {
        let newId = crypto.randomUUID();
        post.id = newId;
        this.posts.push(post);
        return post.id;
    }
    async remove(postId:string):Promise<boolean>
    {
        let index = this.posts.findIndex(post => post.id == postId);
        if(index != -1){
            this.posts.splice(index,1);
            return true;
        }
        else return false;
    }
    async list():Promise<Post[]>{
        return await this.posts;
    }
}
