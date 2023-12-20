const fs = require('fs');
const Thread = require('./thread/thread.js')

class Data{
    constructor(){

    }

    static async read(filename){
        return new Promise((resolve, reject) => {
            fs.readFile(filename+'.json', 'utf8', (err, data) => {
                if (err) {
                 reject(err);
                 return;
                }
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            });
        });
    }
 
    static write(filename, jsonData){
        return new Promise((resolve, reject) => {
            fs.writeFile(filename+'.json', JSON.stringify(jsonData), 'utf8', err => {
                if (err) {
                 reject(err);
                 return;
                }
                resolve('File has been saved!');
            });
        });
    }
 
    static async getThreads(){
        console.log(await Data.read('./data/Threads'))
        return  Data.read('./data/Threads');
    }
 
    static addThread(threadName){
        return Data.getThreads()
            .then(threads => {
                threads[threadName] = new Thread(threadName);
                return Data.write('./data/Threads', threads);
            });
    }
}

module.exports = Data;