export default class Member{
    constructor(name, token){
        this.name = name
        this.token = token
        this.lastOnline = Data.now()
    }

    dealActive(){
        this.lastOnline = Data.now()
    }

}