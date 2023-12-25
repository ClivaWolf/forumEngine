class Thread{
    constructor(name,posts=[]){
        this.name = name
        this.posts = posts
        this.link = ''
        if (name) {
            this.link = this.generateLink()
        }

        console.log(name,'created')
    }
    addPost(name){
        this.posts.push(name)
    }

    getPosts(){
        return this.posts
    }

    generateLink(){
        return this.name.replace(/\s+/g, '-').toLowerCase()
    }

    loadFromJSON(jsonObj) {
        for (let prop in jsonObj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = jsonObj[prop];
            }
        }
    }
}

module.exports = Thread;