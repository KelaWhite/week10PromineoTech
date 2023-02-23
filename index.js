class Poem {
    constructor(poemtitle, entry) {
        this.poemtitle = poemtitle;
        this.entry = entry;
    }
}

class Author {
    constructor(id, poemtitle) {
        this.id = id;
        this.poemtitle = poemtitle;
        this.poems = [];
    }

    addPoem(poem) {
        this.poems.push(poem);
    }

    deletePoem(poem) {
        let index = this.poems.indexOf(poem);
        this.poems.splice(index, 1);
    }
}

let authors = [];
let authorId = 0;

onClick('new-author', () => {
    authors.push(new Author(authorId++, getValue('new-author-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let authorDiv = document.getElementById('authors');
    clearElement(authorDiv);
    for (author of authors) {
        let table = createAuthorTable(author);
        let title = document.createElement('h2');
        title.innerHTML = author.poemtitle;
        authorDiv.appendChild(title);
        authorDiv.appendChild(table);
        for(poem of author.poems) {
            createPoemRow(author, table, poem);
        }
    }
}

function createPoemRow(author, table, poem) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = poem.poemtitle;
    row.insertCell(1).innerHTML = poem.entry;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(author, poem));
}

function createDeleteRowButton(author, poem) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Remove';
    btn.onclick = () => {
        let index = author.poems.indexOf(poem);
        author.poems.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewPoemButton(author) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create Entry';
    btn.onclick = () => {
        author.poems.push(new Poem(getValue(`poemtitle-input-${author.id}`), getValue(`entry-input-${author.id}`)));
        drawDOM();
    };
    return btn;
}

function createAuthorTable(author) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');
    let row = table.insertRow(0);
    let poemtitleColumn = document.createElement('th');
    let entryColumn = document.createElement('th');
    let blankColumn = document.createElement('th');
    poemtitleColumn.innerHTML = 'Title';
    entryColumn.innerHTML = 'Entry';
    blankColumn.innerHTML = '';
    row.appendChild(poemtitleColumn);
    row.appendChild(entryColumn);
    row.appendChild(blankColumn);
    let formRow = table.insertRow(1);
    let poemtitleTh = document.createElement('th');
    let entryTh = document.createElement('th');
    let createTh = document.createElement('th');
    let poemtitleInput = document.createElement('input');
    poemtitleInput.setAttribute('id', `poemtitle-input-${author.id}`);
    poemtitleInput.setAttribute('type', 'text');
    poemtitleInput.setAttribute('class', 'form-control');
    let entryInput = document.createElement('input');
    entryInput.setAttribute('id', `entry-input-${author.id}`);
    entryInput.setAttribute('type', 'textarea');
    entryInput.setAttribute('class', 'form-control');
    let newPoemButton = createNewPoemButton(author);
    poemtitleTh.appendChild(poemtitleInput);
    entryTh.appendChild(entryInput);
    createTh.appendChild(newPoemButton);
    formRow.appendChild(poemtitleTh);
    formRow.appendChild(entryTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}