class Post{
    constructor(name, data, user, date){
        this.name = name
        this.data = data
        this.userStarted = user
        this.date = date

        console.log(name,'post created')
    }
}

module.exports = Post;