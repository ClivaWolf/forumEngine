// import Thread from "./thread/thread.js";

// document.querySelector('button').addEventListener('click', function() {
//     // Получить имя темы из поля ввода
//     let threadName = document.querySelector('input').value;
 
//     // Создать новую тему
//     let thread = new Thread(threadName);
 
//     // Добавить тему в список тем (если у вас есть такой список)
//     // threads.push(thread);
 
//     // Очистить поле ввода
//     document.querySelector('input').value = '';
//  });

function sendPostRequest() {
    // Получить значение из текстового поля
    const message = document.getElementById('message').value;
   
    // Отправить POST запрос на сервер
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}


function newThread() {
    // Получить значение из текстового поля
    const message = document.getElementById('thread').value;
   
    // Отправить POST запрос на сервер
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: {
                type:'newThread',
                threadName:message
            }
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}