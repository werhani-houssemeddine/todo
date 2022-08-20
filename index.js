// the following obj represent the todo element
/*const todo = {
    id: 'Number',
    value: 'String',
    isCheck: 'true || false',
}
*/

// Get value from local storage and it will initialize as an empty
// array if the local storage is empty .
let dataBase = getFromLocalStorage() || [];

const inputValue = () =>  getValue('.form input'); // inputValue is a function to get the input value
const getParent = child => child.parentNode.parentNode; // get the parent node

// this function will create a new todo task store it in local storage 
// and add it to the html page 
const prepareData = value => {
    // get the id of the last todo
    // the (?.) when the db is empty there is not element so getting the id will throw an error
    // so with (?.) the property will skiped by javascript and will set the id 0
    let getTheLastId = dataBase.at(-1)?.id || 0;
    const todo = {id: ++getTheLastId, value, isCheck: false};
    dataBase.push(todo);
    setToLocalStorage(dataBase);
    selectItem('.form input').value = '';
    selectItem('main').appendChild(createDiv(todo));
}

selectItem('.form input').addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && inputValue()){
        prepareData(inputValue());
    }
});

selectItem('.form button').addEventListener('click', () => {
    if(inputValue()){
        prepareData(inputValue());
    }
});

function showData() {
    const main = selectItem('main');
    dataBase.forEach(task => {
        main.appendChild(createDiv(task));
        selectItem(`[todo-id="${task.id}"] .check`).checked = task.isCheck;
    });
}

// this div contains the data
function createDiv({id, value, isCheck}) {
    const template = document.createElement('template');
    const inputState = isCheck ? 'checked' : 'unchecked';

    template.innerHTML = `
        <div class="element ${inputState}" todo-id="${id}">
            <div>
                <input onclick="check(this)" type="checkbox" class='check' todo-id="${id}">
                <input type='text' name="task" value='${value}' readOnly='true' class='text unfocus'>
            </div>
            <figure>
                <img onclick="remove(this)" src="delete.png" todo-id='${id}'>
                <img src="pen.png" onclick="edit(this)" todo-id='${id}'>
            </figure>
        </div>`;

    let div = template.content.cloneNode(true);
    
    return div;
}

// change the color of the container:
// if the todo is done the container color is green otherwise is red
function check(inputNode) {
    const classValue = inputNode.checked ? 'element checked' : 'element unchecked'
    getParent(inputNode).setAttribute('class', classValue);
    const id = inputNode.getAttribute('todo-id');
    dataBase.forEach(element => {
        if(element.id == id){
            element.isCheck = !element.isCheck;
            return;
        }
    });
    setToLocalStorage(dataBase);
}

function remove(div) {
    const id = div.getAttribute('todo-id');
    let index;
    dataBase.forEach((element, i) => {
        if(element.id == id){
            index = i;
            return;
        }
    });

    dataBase.splice(index, 1);
    setToLocalStorage(dataBase);
    div.parentNode.parentNode.remove();
}

function edit(inputNode){
    let input = inputNode.parentElement.previousElementSibling.children[1];
    input.readOnly = false;
    input.setAttribute('class', 'text focus');

    input.focus();
    let id = inputNode.getAttribute('todo-id');
    input.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter' && input.value != '') {
            for(let db of dataBase){
                if(db.id == id){
                    db.value = input.value.trim();
                }
            }
            setToLocalStorage(dataBase);

            input.setAttribute('class', 'text unfocus');
            input.readOnly = 'true'
        }
    })
}

showData();