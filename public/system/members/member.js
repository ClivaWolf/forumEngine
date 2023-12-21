class Member{
    constructor(name, token, pass){
        this.name = name
        this.token = token
        this.lastOnline = Date.now()
        this.pass = pass
    }

    dealActive(){
        this.lastOnline = Date.now()
    }
}

module.exports = Member;