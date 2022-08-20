'use-strict';

//FIX- CAN'T REMOVE FROM MOBILE
//FIX- EDIT SPECIFIC INPUT AND NOT ALL OF THEM
let arrOfObjInLocalStorage = [];
const form = document.getElementById('to-do-form');
const input = document.getElementById('to-do');
const list = document.getElementById('tasks');
const localStorageData = JSON.parse(localStorage.getItem('toDo_DB'));
const audioDelete = new Audio('sounds/delete.mp3');
const audioSave = new Audio('sounds/save.mp3');
const audioEdit = new Audio('sounds/edit.mp3');
const audioAdd = new Audio('sounds/add.mp3');
const audioWrong = new Audio('sounds/wrong.mp3');

window.addEventListener('load', function () {
  if (!localStorageData) return;
  arrOfObjInLocalStorage = localStorageData;
  list.innerHTML = render(arrOfObjInLocalStorage);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let task = input.value;
  if (!task) {
    audioWrong.play();
    audioWrong.currentTime = 0;
    alert('please write something');
    return;
  }

  arrOfObjInLocalStorage.push(task);
  localStorage.setItem('toDo_DB', JSON.stringify(arrOfObjInLocalStorage));
  audioAdd.play();
  audioAdd.currentTime = 0;
  list.innerHTML = render(arrOfObjInLocalStorage);
  input.value = '';
});

function remove(event) {
  let currValue = event.path[2].children[0].children[0].value;
  for (let i = 0; i < arrOfObjInLocalStorage.length; i++) {
    if (arrOfObjInLocalStorage[i] === currValue) {
      arrOfObjInLocalStorage.splice(i, 1);
      localStorage.setItem('toDo_DB', JSON.stringify(arrOfObjInLocalStorage));
      audioDelete.play();
      audioDelete.currentTime = 0;
      list.innerHTML = render(arrOfObjInLocalStorage);
    }
  }
}

function edit() {
  const editBtns = document.querySelectorAll('.edit');
  const inputs = document.querySelectorAll('.text');

  for (let i = 0; i < inputs.length; i++) {
    if (editBtns[i].innerText.toLowerCase() === 'edit') {
      audioEdit.play();
      audioEdit.currentTime = 0;
      inputs[i].removeAttribute('readonly');
      inputs[i].focus();
      editBtns[i].innerText = 'Save';
    } else {
      inputs[i].setAttribute('readonly', 'readonly');
      editBtns[i].innerText = 'Edit';
      arrOfObjInLocalStorage[i] = inputs[i].value;
      localStorage.setItem('toDo_DB', JSON.stringify(arrOfObjInLocalStorage));
      audioSave.play();
      audioSave.currentTime = 0;
      list.innerHTML = render(arrOfObjInLocalStorage);
    }
  }
}

function render(arr) {
  let html = '';
  for (let i = 0; i < arr.length; i++) {
    html += ` <div class="task">
    <div class="content">
      <input class="text" type="text" readonly="readonly" value="${arr[i]}" />
    </div>
    <div class="actions">
      <button onclick="edit()" class="edit" value="${arr[i]}">Edit</button
      ><button class="delete" onclick="remove(event)" value="${arr[i]}">Delete</button>
    </div>
  </div>`;
  }
  return html;
}
