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

function sendPostRequest(route, inputId) {
    // Проверить, существует ли элемент
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.error(`Element with id ${inputId} does not exist.`);
        return;
    }
 
    // Получить значение из текстового поля
    const msg = inputElement.value + '';
 
    // Отправить POST запрос на сервер
    fetch('/' + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: {
                value: msg
            }
        })
    })
    .then(response => {
        // Проверить, является ли ответ JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
 }
