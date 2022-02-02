'use strict';
window.onload = init;

function init() {
    let button = document.getElementById('add_button');
    let clearButton = document.getElementById('clear_button');
    let stickiesArray = getStickiesArray();

    button.onclick = createSticky;
    clearButton.onclick = clearStickyNotes;

    for (let i = 0; i < stickiesArray.length; i++) {
        let key = stickiesArray[i];
        let stickyObj = JSON.parse(localStorage[key]);

        addStickyToDOM(key, stickyObj);
    }
}

function getStickiesArray() {
    let stickiesArray = localStorage['stickiesArray'];

    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    return stickiesArray;
}

function createSticky() {
    let stickiesArray = getStickiesArray();
    let currentDate = new Date();
    let key = `sticky_${currentDate.getTime()}`
    let value = document.getElementById('note_text').value;
    let colorSelectObj = document.getElementById('note_color');
    let index = colorSelectObj.selectedIndex;
    let color = colorSelectObj[index].value;

    let stickyObj = {
        value: value,
        color: color
    };

    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    addStickyToDOM(key, stickyObj);
}

function addStickyToDOM(key, stickyObj) {
    let stickies = document.getElementById('stickies');
    let sticky = document.createElement('li');
    let span = document.createElement('span');

    sticky.setAttribute('id', key);
    sticky.style.backgroundColor = stickyObj.color;
    span.setAttribute('class', 'sticky');
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick = deleteSticky;
}

function deleteSticky(e) {
    let key = e.target.id;
    let stickiesArray = getStickiesArray();

    if (e.target.tagName.toLowerCase() === 'span') {
        key = e.target.parentNode.id;
    }

    if (stickiesArray) {
        for (let i = 0; i < stickiesArray.length; i++) {
            if (key === stickiesArray[i]) {
                stickiesArray.splice(i, 1);
            }
        }
    }

    localStorage.removeItem(key);
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    removeStickyFromDOM(key);
}

function removeStickyFromDOM(key) {
    let sticky = document.getElementById(key);

    sticky.parentNode.removeChild(sticky);
}

function clearStickyNotes() {
    localStorage.clear();

    let stickyList = document.getElementById('stickies');
    let stickies = stickyList.childNodes;

    for (let i = stickies.length - 1; i >= 0; i--) {
        stickyList.removeChild(stickies[i]);
    }
}