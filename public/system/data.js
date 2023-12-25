const fs = require('fs');
const Thread = require('./thread/thread.js')
const Post = require('./thread/post.js')
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

    static async getThread(threadName) {
        const threads = await Data.getThreads();
        return threads[threadName];
    }

    static async getThreadByLink(link) {
        const threads = await Data.getThreads();
        for (const threadName in threads) {
            if (threads[threadName].link === link) {
                return JSON.stringify(threads[threadName]);
            }
        }
    }

    static async addThread(threadName) {
        const threads = await Data.getThreads();
        threads[threadName] = new Thread(threadName);
        await Data.write('./data/Threads', threads);
    }

    static async delThread(threadName) {
        //console.log(threadName,'try to delete');
        const threads = await Data.getThreads();
        delete threads[threadName];
        await Data.write('./data/Threads', threads);
    }

    static async addPost(threadName, postName, postData) {
        const threads = await Data.getThreads();
        const posts = await Data.getPosts();
        threads[threadName].addPost(postName);

        const post = new Post(postName, postData);
        posts[threadName + '/' + postName] = post;
        await Data.write('./data/posts', posts);

    }

    static async getPostList(list=[]){
        const posts = await Data.getPosts();
        const ret = []
        for (const postname in posts) {
            if (posts[postname].name && list.includes(posts[postname].name)) {
                ret.push(posts[postname]);
            }
        }
        return ret
     }

    static async getPosts() {
        return Data.read('./data/posts');
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

    static async addSession(session_id, name) {
        const sessions = await Data.read('./data/sessions');
        sessions[session_id] = name;
        sessions[name] = session_id;
        await Data.write('./data/sessions', sessions);
    }

    static async getSessions() {
        return Data.read('./data/sessions');
    }

    static async delSession(session_id) {
        const sessions = await Data.getSessions();
        delete sessions[sessions[session_id]];
        delete sessions[session_id];
        await Data.write('./data/sessions', sessions);
    }

    static async delLastSession(name) {
        const sessions = await Data.getSessions();
        delete sessions[sessions[name]];
        delete sessions[name];
        await Data.write('./data/sessions', sessions);
    }

    static async getUserInfo(session) {
        if (!session) return null;
        const sessions = await Data.getSessions();
        const username = sessions[session];
        const users = await Data.getUsers();
        return users[username];
    }
}

module.exports = Data;