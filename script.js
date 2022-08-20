'use-strict';

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

function edit(index) {
  const editButtons = document.querySelectorAll('.edit');
  const chosenInput = document.getElementById(`input${index}`);
  if (editButtons[index].innerText.toLowerCase() === 'edit') {
    audioEdit.play();
    audioEdit.currentTime = 0;
    chosenInput.removeAttribute('readonly');
    chosenInput.focus();
    editButtons[index].innerText = 'Save';
  } else {
    chosenInput.setAttribute('readonly', 'readonly');
    editButtons[index].innerText = 'Edit';
    arrOfObjInLocalStorage[index] = chosenInput.value;
    localStorage.setItem('toDo_DB', JSON.stringify(arrOfObjInLocalStorage));
    audioSave.play();
    audioSave.currentTime = 0;
  }
}

function render(arr) {
  let html = '';
  for (let i = 0; i < arr.length; i++) {
    html += ` <div class="task">
    <div class="content" style="margin-bottom:5px">
      <input id="input${i}" class="text" type="text" readonly="readonly" value="${arr[i]}" />
    </div>
    <div class="actions">
      <button onclick="edit(${i})" class="edit" value="${arr[i]}">
      Edit
      </button>
      <button class="delete" onclick="remove(event)" value="${arr[i]}">
      Delete
      </button>
    </div>
  </div>`;
  }
  return html;
}
