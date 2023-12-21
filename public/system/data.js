const fs = require('fs');
const Thread = require('./thread/thread.js')
const Member = require('./members/member.js');
const { json } = require('express/lib/response.js');

class Data {
    constructor() {

    }

    static async read(filename) {
        try {
            return new Promise((resolve, reject) => {
                fs.readFile(filename + '.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                });
            });
        } catch (err) {
            console.error(err);
        }
    }

    static write(filename, jsonData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename + '.json', JSON.stringify(jsonData), 'utf8', err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('File has been saved!');
            });
        });
    }

    static async getThreads() {
        //console.log(await Data.read('./data/Threads'))
        return Data.read('./data/Threads');
    }

    static addThread(threadName) {
        return Data.getThreads()
            .then(threads => {
                threads[threadName] = new Thread(threadName);
                return Data.write('./data/Threads', threads);
            });
    }

    static async getUsers() {
        //console.log(await Data.read('./data/members'))
        return Data.read('./data/members');
    }

    static regUser(name,pass){
        return Data.getUsers().then(users=>{
            users[name /*id??*/] = new Member(name,'123',pass)
            return Data.write('./data/members', users)
        })
    }

    static checkUser(name,pass){
        return Data.getUsers().then(users=>{
            console.log(users)
            if (users[name].pass==pass){
                console.log('first login')
                return '/main'
            } else {
                return '/oops'
            }
        })
    }
}

module.exports = Data;