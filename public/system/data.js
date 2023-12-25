const fs = require('fs');
const Thread = require('./thread/thread.js')
const Member = require('./members/member.js');
const { json } = require('express/lib/response.js');

class Data {
    constructor() {

    }

    static async read(filename) {
        try {
            const data = await fs.promises.readFile(filename + '.json', 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (err) {
            console.error(err);
        }
    }

    static async write(filename, jsonData) {
        try {
            await fs.promises.writeFile(filename + '.json', JSON.stringify(jsonData), 'utf8');
            return 'File has been saved!';
        } catch (err) {
            throw err;
        }
    }

    static async getThreads() {
        //console.log(await Data.read('./data/Threads'))
        return Data.read('./data/Threads');
    }

    static async addThread(threadName) {
        const threads = await Data.getThreads();
        threads[threadName] = new Thread(threadName);
        await Data.write('./data/Threads', threads);
    }

    static async delThread(threadName) {
        const threads = await Data.getThreads();
        delete threads[threadName];
        await Data.write('./data/Threads', threads);
    }

    static async getUsers() {
        //console.log(await Data.read('./data/members'))
        return Data.read('./data/members');
    }

    static async regUser(name, pass) {
        const users = await Data.getUsers();
        users[name] = new Member(name, '123', pass);
        return Data.write('./data/members', users);
    }

    static async checkUser(name, pass) {
        try {
            const users = await Data.getUsers();
            console.log(users);

            if (users[name].pass === pass) {
                //console.log('first login');
                return '/main';
            } else {
                return '/oops';
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Data;