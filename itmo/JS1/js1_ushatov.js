"use strict";

// 1. document.write, работа c URL и строками
let documentWrite = document.write("Первое задание по JS"); // 1.1
let text = document.body.innerText;
document.write("<br/>");
document.writeln(text.split(" ").length, ' ', text.split(" ").join("").length); // 1.2
document.write("<br/>");


let linkLocal = document.location.href; //1.5
let linkInternet = "https://sun9-38.userapi.com/c854328/v854328810/47894/Sp8y7L0wKbc.jpg";
let linkProt = getProtocolName(linkInternet);
let linkNe = getFileNameAndExtension(linkInternet);


function getProtocolName(href) {
    let result = href.substring(0, href.indexOf(':'));
    return result;
}

function getFileNameAndExtension(href) {
     let dotPos = href.lastIndexOf('.');
     let slashPos = href.lastIndexOf('/');
     let FileExtension = href.substring(dotPos+1);
     let FileName = href.substring(slashPos+1, dotPos);
     return (FileName + " " + FileExtension);
}

document.write(linkLocal);
document.write("<br/>");
document.write(linkInternet);
document.write("<br/>");
document.write(linkProt);
document.write("<br/>");
document.write(linkNe);
document.write("<br/>");

//1.6 выделите подстроку параметров из адресной строки. 
let linkWithParams = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5Tjq_RmXNc45XgotXQ3_LpaerLqgcnfS0VjQYgJqI4FX8XWuiLKEphONS04gnFj1UP4wC0q6H-Wlb/pubchart?oid=1674811961&format=interactive";
document.write(linkWithParams);
document.write("<br/>");
function getParams(href) {
    let Params = href.substring(href.lastIndexOf('?')+1, href.lastIndexOf('&'));
    return Params;
}
document.write(getParams(linkWithParams));
document.write("<br/>");

// Задание №2
let task2 = document.createElement("h1");
task2.innerText = "Задание 2";
document.body.append(task2);

let anchor = (document.createElement('a'));
anchor.href = "https://yandex.ru/";
anchor.innerText = "Поиск"
anchor.style.marginRight = '5px';
document.body.append(anchor);
document.write("<br/>");

let anchor2 = (document.createElement('a'));
anchor2.href = "https://yandex.ru/images/";
anchor2.innerText = "Картинки"
anchor2.style.marginRight = '5px';
document.body.append(anchor2);
document.write("<br/>");

document.write('Количество анкоров: ', document.body.getElementsByTagName('a').length);
document.write('<br/>');

document.write('Количество ссылок:', document.getElementsByTagName('link').length);
document.write('<br/>');

document.write(document.body.getElementsByTagName('a').item(0).innerText); //Покажите содержимое (innerHTML) первого анкора на странице
document.write('<br/>');

let img1 = (document.createElement('img'));
img1.id = 1;
img1.src = "https://avatars.mds.yandex.net/get-pdb/49816/68f4f375-08b6-4e33-ad9e-996e86871444/s1200";
img1.style.height = '80px';
img1.style.width = '80px';
img1.style.marginRight = '10px';
document.body.append(img1);
 
let img2 = (document.createElement('img'));
img2.id = 2;
img2.src = "https://avatars.mds.yandex.net/get-pdb/1042636/b92954aa-0b64-470f-afb5-8fc8eee15f6f/s1200";
img2.style.height = '160px';
img2.style.width = '100px';
img2.style.marginRight = '10px';
document.body.append(img2);

let img3 = (document.createElement('img'));
img3.id = 3;
img3.src = "https://avatars.mds.yandex.net/get-pdb/877347/4d8302d9-8439-4c5f-9e08-d03fa709701b/s1200";
img3.style.height = '240px';
img3.style.width = '240px';
img3.style.marginRight = '10px';
document.body.append(img3);
document.write("<br/>");

document.write('Количество картинок: ' + document.body.getElementsByTagName('img').length);
document.write("<br/>");

document.write('Ширина первой картинки: ' + img1.style.width);
document.write("<br/>");

let images = document.querySelectorAll('img');
let maxWidth = images[0].width;
if (images[1].width>images[2].width) {maxWidth = images[1].width;}
if (images[2].width>maxWidth) {maxWidth = images[2].width;}
document.write('Ширина самой широкой картинки: ' + maxWidth +'px');
document.write("<br/>");

let sumHeight = img1.height+img2.height+img3.height;
document.write('Сумма всех высот картинок: ' + sumHeight +'px');
document.write("<br/>");

document.write(document.body.getElementsByTagName('a').item(0).innerText);

let task3 = document.createElement("h1");
task3.innerText = "Задание 3";
document.body.append(task3);

// Добавить форму
let forms = [];
for (let i = 0; i < 10; i++) {
    let form = document.createElement('form');
    form.name = `formName${i+1}`;
    form.id = `formId${i-1+1}`;
    forms.push(form);
    document.body.append(form);
}

let formsHTML = document.body.getElementsByTagName('form');
console.log(formsHTML);
for (let i = 0; i < formsHTML.length ; i++) {
	formsHTML[i].name="form"+i;
    let inputCheck = document.createElement('input');
    let inputFile = document.createElement('input');
    let inputRadio = document.createElement('input');
    let inputText = document.createElement('input');
    inputCheck.type = "checkbox";
 	inputCheck.style.margin = "10px";
    inputFile.type = "file";
     inputFile.style.margin = "10px";
    inputRadio.type = "radio";
     inputRadio.style.margin = "10px";
    inputText.type = "text";
    inputText.style.marginTop = "10px";

    formsHTML[i].append(inputText);
    formsHTML[i].append(inputFile);
    formsHTML[i].append(inputCheck);
    formsHTML[i].append(inputRadio);
}

// добавить кнопку показатьимя формы
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = " Показать имя формы";
    button.style.margin = "5px";
    button.onclick = () => alert(formsHTML[i].name);
    formsHTML[i].append(button);
}

//создание кнопки принадлежность
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = " Принадлежность";
    button.style.margin = "5px";
    button.onclick = () => alert(button.parentNode.id);
    formsHTML[i].append(button);
}

// создание кнопки ресет
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'reset';
    button.innerText = " Сбросить";
    button.style.margin = "15px";
    formsHTML[i].append(button);
}

// показатьколичество полей
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = " Показать количество полей";
    button.style.margin = "5px";
    button.onclick = () => {
        alert(`Количество полей равно ${button.parentNode.childNodes.length}`);
    };
    formsHTML[i].append(button);
}

// иконки
document.body.querySelectorAll('button').forEach((button)=> {
    button.style.padding = '15px';
    button.style.borderRadius = '10px';
    button.style.border = '1px solid rgba(121, 121, 119, 4)';
    button.onmouseover = () => {
        button.style.backgroundColor = "purple";
        button.style.color = "white";
    };
    button.onmouseout = () => {
        button.style.color = 'blue';
        button.style.backgroundColor = 'lightblue';
    };
    let image = document.createElement('img');
    image.style.width = '20px';
    image.style.height = '20px';
    image.style.verticalAlign = 'bottom';
    switch (button.innerText) {
        case "Показать имя формы": image.src = 'icons8-аист-64.png';
            break;
        case "Принадлежность":image.src = 'icons8-пингвин-64.png';
            break;
        case "Сбросить": image.src = 'icons8-сова-64.png';
            break;
        case "Показать количество полей": image.src = 'icons8-сокол-64.png';
            break;
        
    }
    button.prepend(image);
});

// вывод четных форм

for (let i = 0; i < forms.length; i++) {
	if (i % 2 == 1) {
		document.write(forms[i].name);
		document.write(', ');
	}
	if (i == forms.length) {
		break;
	}
	
}