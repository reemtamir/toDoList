'use-strict';

const form = document.getElementById('to-do-form');
const input = document.getElementById('to-do');
const list = document.getElementById('tasks');
// list.innerHTML = JSON.parse(localStorage.getItem('div'));
console.log(list.innerHTML);
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!input.value) {
    alert('please write something');
    return;
  }
  let info = {
    text: list.innerHTML,
  };
  localStorage.setItem(input.value, JSON.stringify(info.text));
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');

  taskElement.appendChild(contentElement);

  const taskInputElement = document.createElement('input');
  taskInputElement.classList.add('text');
  taskInputElement.type = 'text';
  taskInputElement.value = input.value;
  taskInputElement.setAttribute('readonly', 'readonly');
  contentElement.appendChild(taskInputElement);
  const actionElement = document.createElement('div');
  actionElement.classList.add('actions');
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.innerText = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerText = 'Delete';

  actionElement.appendChild(editBtn);
  actionElement.appendChild(deleteBtn);
  taskElement.appendChild(actionElement);
  list.appendChild(taskElement);

  input.value = '';
  console.log(list.innerHTML);
  editBtn.addEventListener('click', function () {
    if (editBtn.innerText.toLowerCase() === 'edit') {
      taskInputElement.removeAttribute('readonly');
      taskElement.focus();
      editBtn.innerText = 'Save';
    } else {
      taskInputElement.setAttribute('readonly', 'readonly');
      editBtn.innerText = 'Edit';
    }
  });

  deleteBtn.addEventListener('click', function () {
    list.removeChild(taskElement);
  });
});
// function saveToDos() {
//   let items = document.querySelectorAll('.task');
//   console.log(items);
//   for (let i = 0; i < items.length; ++i) {
//     list.push(items[i].innerHTML);
//     localStorage.setItem('savedValues', JSON.stringify(items[i]));
//   }
// }
