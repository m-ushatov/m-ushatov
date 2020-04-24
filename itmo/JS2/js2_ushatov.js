"use strict";


// Создаем форму для задания размеров таблицы
let form = document.createElement('form');
let inputCols = document.createElement('input');
let inputRows = document.createElement('input');
let button = document.createElement('button');

inputCols.type = 'text';
inputCols.placeholder = 'Количество столбцов';
inputCols.id = 'cols';
inputCols.style.display = 'block';

inputRows.type = 'text';
inputRows.placeholder = 'Количество строк';
inputRows.id = 'rows';
inputRows.style.display = 'block';

button.type = 'button';
button.innerText = 'Создать таблицу';


// По нажатию на кнопку создается таблица (страница не перезагружается). Форму создания таблицы спрятать
button.onclick = () => {
    form.style.display = 'none';
    createTable(
        document.getElementById('cols').value,
        document.getElementById('rows').value,
    );
    createFunctionPanel();
    form.reset();
};

form.append(inputCols, inputRows, button);
document.body.appendChild(form);

// Создаенм таблицу по введенному количеству строк и столбцов
function createTable(cols, rows) {
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.style.border = '1px solid black';
            td.appendChild(createTableContent(td));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

//3. Добавляем в ячейку поля
function createTableContent(td) {
    td.innerHTML = '';
    let form = document.createElement('form'),
        textarea = document.createElement('textarea'),
        button = document.createElement('button')
    ;
    button.innerText = 'Сохранить';
    button.type = 'button';
    button.style.display = 'block';
    textarea.cols = 20;
    textarea.rows = 1;
    // После нажатия на «сохранить», эта форма пропадает, а вместо нее появляется введенный пользователем текст.
    button.onclick = () => {
        td.innerText = button.previousSibling.value;
        form.remove();
    };
    form.appendChild(textarea);
    form.appendChild(button);
    return form;
}

// 4. Оформление для блока с функцией
function createFunctionPanel() {
    let divCont = document.createElement('div')
    ;
    divCont.className = 'function_container';
    divCont.appendChild(borderChanger());
    divCont.appendChild(captionChanger());
    divCont.appendChild(rowDeleter());
    divCont.appendChild(divRandomContentCreator());
    divCont.appendChild(tableDeleter());
    document.body.appendChild(divCont);
}

function createFunction(functionName) {
    let div = document.createElement('div'),
        p = document.createElement('p')
    ;
    p.innerText = functionName;
    div.className = 'function';
    div.appendChild(p);
    return div;
}

// 5. добавить элемент “Изменить границы таблицы”
function borderChanger() {
    let div = createFunction('Изменить границы таблицы');

    let form = document.createElement('form'),
        select = document.createElement('select'),
        inputBorderWidth = document.createElement('input'),
        button = document.createElement('button'),
        option = document.createElement('option')
    ;

    inputBorderWidth.type = 'text';

    button.type = 'button';
    button.innerText = 'Применить';

    option.innerText = 'Выберите стиль рамки';
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);

    getBorderOptions().forEach((option) =>
        select.appendChild(option)
    );
    //ПО МЕРЕ ИЗМЕНЕНИЯ ЗНАЧЕНИЯ ПОЛЕЙ МЕНЯЕТСЯ НАЗВАНИЕ КНОПКИ:
    inputBorderWidth.onchange = () => {
        button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ';
        if (select.value !== '') {
            button.innerText += ' и рамка ' + select.value;
        }
    };

    select.onchange = () => {
        if (inputBorderWidth.value !== '') {
            button.innerText = button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ' +
                'и рамка ' + select.value;
        } else {
            button.innerText = 'Применить' + ' ' + 'рамка ' + select.value;
        }
    };
//  ПРИ НАЖАТИИ НА КНОПКУ МЕНЯЕМ СТИЛЬ ТАБЛИЦЫ
    button.onclick = () => {
        let tdList = document.querySelectorAll('td');
        tdList.forEach((td) =>
            td.style.border = `${inputBorderWidth.value}px ${select.value}`
        );
    };

    form.appendChild(select);
    form.appendChild(inputBorderWidth);
    form.appendChild(button);
    div.appendChild(form);
    return div;
}
// зАДАЕМ СПИСОК ГРАНИЦ РАМКИ

function getBorderOptions() {
    let borderOptions = [];
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach(
        (borderStyle) => {
            let option = document.createElement('option');
            option.innerText = borderStyle;
            borderOptions.push(option);
        }
    );
    return borderOptions;
}


// 6.  “Добавить заголовок”.
function captionChanger() {
    let div = createFunction('Добавить заголовок');
    let form = document.createElement('form'),
        inputElement = document.createElement('input'),
        button = document.createElement('button')
    ;

    inputElement.type = 'text';
    button.type = 'button';
    button.innerText = 'Добавить';

    // После нажатия у таблицы появляется заголовок.
    button.onclick = () => {
        let caption = document.createElement('caption');
        caption.innerText = inputElement.value;
        document.querySelector('table').appendChild(caption);

    };

    form.append(inputElement, button);
    div.appendChild(form);
    return div;
}

// 7. добавить элемент “Удалить строку”. проверяем корректно ли введенное значение и удаляем строку
function rowDeleter() {
    let div = createFunction('Удалить строку');
    let form = document.createElement('form'),
        inputElement = document.createElement('input'),
        button = document.createElement('button')
    ;

    inputElement.type = 'text';
    button.type = 'button';
    button.innerText = 'Удалить';

    button.onclick = () => {
        let tableRows = document.querySelectorAll('tr');
        if (inputElement.value < 1 || inputElement.value > tableRows.length
            || inputElement.value.match(/([^0-9])/g)) {
            alert('Некорректное число! Попробуйте еще раз.');
        } else {
            tableRows[inputElement.value - 1].remove();
        }
    };

    form.appendChild(inputElement);
    form.appendChild(button);
    div.appendChild(form);
    return div;
}

// 8. добавить элемент “Случайный выбор”
function divRandomContentCreator() {
    let divRan = createFunction('Случайный выбор');
    let button = document.createElement('button');

    button.type = 'button';
    button.innerText = 'Magic';

    button.onclick = function()  {
        let td = randomCell();
        magic(td);
    };
    divRan.appendChild(button);
    return divRan;
}

function randomCell() {
    let rowsNumber = document.querySelectorAll('tr');
    let rowIndex = Math.floor(Math.random() * (rowsNumber.length));
    let colIndex = Math.floor(Math.random() * (rowsNumber[rowIndex].cells.length));
    return rowsNumber[rowIndex].cells[colIndex];
}

function magic(td) {
    if (Math.floor(1 + Math.random() * (15 + 1 - 1)) === 7) {
        td.appendChild(createTableContent(td));
    } else {
        td.style.backgroundColor = randomColor();
        randomFontStyle(td);
    }
}

function randomColor() {
    var r=Math.floor(Math.random()*(256));
    var g=Math.floor(Math.random()*(256));
    var b=Math.floor(Math.random()*(256));
    var color='#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}


function randomFontStyle(td) {
    let newColor = randomColor();
    let newFontSize = Math.floor(15 + Math.random() * (25 + 1 - 15)) + 'pt';
    td.style.color = newColor;
    td.style.fontSize = newFontSize;
    /* если форма есть, то для каждого её внутреннего 
    тега задаем стиль
    */
    if (typeof td.childNodes[0] !== 'undefined') {
        td.childNodes[0].childNodes.forEach((elem) => {
            elem.style.color = newColor;
            elem.style.fontSize = newFontSize;
        });
    }
}
// 9. добавить элемент “Удалить”
function tableDeleter() {
    let div = createFunction('Удалить');
    let button = document.createElement('button')
    ;

    button.type = 'button';
    button.innerText = 'Удалить таблицу';

    button.onclick = () => {
        form.style.display = 'block';
        document.querySelector('table').remove();
        document.querySelector('div.function_container').remove();

    };
    div.appendChild(button);
    return div;
}