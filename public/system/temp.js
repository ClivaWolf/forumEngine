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

async function sendPostRequest(route, inputId, pass, noInput = false) {
  const inputElement = document.getElementById(inputId);
  let msg = '';
  if (!inputElement) {
    if (noInput) {
      msg = inputId;
    } else {
      console.error(`Element with id ${inputId} does not exist.`);
      return;
    }
  } else {
    msg = inputElement.value;
  }

  //console.log(route, msg, pass, noInput);
  try {
    const response = await fetch('/' + route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          value: msg
        }
      })
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new TypeError(`Oops, we haven't got JSON! Instead we got: ${text}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
