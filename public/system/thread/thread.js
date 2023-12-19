export default class Thread{
    constructor(name){
        this.name = name
        this.posts = []

        console.log(name,'created')
    }
    addPost(name){
        this.posts.push(name)
    }
}
