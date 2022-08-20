const selectItem = target => {
    const elements = document.querySelectorAll(target);
    if(elements.length === 1) return elements[0];
    if(elements.length) return elements;
    throw Error('There is no element with this selector ');
}

const key = 'todo';

const getFromLocalStorage = () => JSON.parse(localStorage.getItem(key));
const setToLocalStorage = (obj) => localStorage.setItem(key, JSON.stringify(obj));

const getValue = (target) => selectItem(target).value.trim();