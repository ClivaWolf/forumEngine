const fs = require('fs');

class Data{
    constructor(){

    }

    static read(filename){
        fs.readFile(filename+'.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            const jsonData = JSON.parse(data);
            console.log(jsonData);
           });
    }

    static write(filename, jsonData){
        fs.writeFile(filename+'.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('File has been saved!');
           });
    }
}

module.exports = Data;