
// - Дана textarea.
//     В неё вводится текст.
//     Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.

// let textOne = document.querySelector('#textarea1');
//
// textOne.addEventListener('change',()=>{
//     localStorage.setItem('text', textOne.value);
// })
//
// textOne.value = localStorage.getItem('text');


// - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
//     Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
//     Сделайте ваш скрипт как можно более универсальным.;


// localStorage.clear()


// let form = document.getElementById('form');
// for (const tagElement of form) {
//     tagElement.addEventListener('change', ()=>{
//         saveFunc(form)
//     })
// }
// getSaved(form)
//
//
// function saveFunc(tag){
//     for (let i = 0; i < tag.length; i++) {
//         console.log(tag[i].type);
//         if(tag[i].type ==='checkbox' || tag[i].type ==='radio'){
//                 tag[i].value = tag[i].checked;
//         }
//         localStorage.setItem(tag[i].id, tag[i].value)
//     }
// }
// function getSaved(tag){
//     for (let i = 0; i < localStorage.length; i++) {
//
//         tag[i].value = localStorage.getItem(tag[i].id);
//         if(tag[i].value === 'true'){
//             tag[i].setAttribute('checked','checked')
//         }
//     }
// }







// -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// Требование : хранить историю своих изменений (даже после перезагрузки страницы).
// Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).






//
// let textTwo = document.getElementById('textarea2');
// let btnSave = document.getElementById('save')
// btnSave.onclick  = ()=>{
//     localStorage.setItem((localStorage.length + 1).toString(),textTwo.value )
// }
// let prev = document.getElementById('prev');
// let next = document.getElementById('next');
// textTwo.value = localStorage.getItem(localStorage.length.toString())
// prev.onclick = ()=>{
//     let counter;
//     for (let i = 1; i < localStorage.length + 1 ; i++) {
//         if(localStorage.getItem(i.toString()) === textTwo.value){
//             counter = i;
//         }
//     }
//     if(counter === 1){
//         return
//     }
//     textTwo.value = localStorage.getItem((counter-1).toString())
// }
//
//
// next.onclick = ()=>{
//     let counter;
//     for (let i = 1; i <=localStorage.length ; i++) {
//         if(localStorage.getItem(i.toString()) === textTwo.value){
//             counter = i;
//         }
//     }
//
//     if(counter.toString() === (localStorage.length).toString()){
//         return
//     }
//
//     textTwo.value = localStorage.getItem((+counter +1).toString())
// }





let  saveButton = document.getElementById('saveData');
let form =  document.getElementById('pocketbook');

saveButton.onclick = () =>{

   let obj = {};
    for (let i = 0; i < form.length; i++) {
        obj[form[i].id] = form[i].value;
    }
    localStorage.setItem(obj.phone.toString(),JSON.stringify(obj) );
    appendObj(obj)
}

function appendList() {
    document.getElementById('list').innerHTML = '';
    if(localStorage.length){
        for (let i = 0; i < localStorage.length ; i++) {
            let obj = {};
            obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            appendObj(obj)
        }
    }
    }

function deleteFunction() {
    this.parentElement.parentElement.removeChild(this.parentElement);
    localStorage.removeItem(this.parentElement.id)
}

function appendObj(obj) {
    let  list =  document.getElementById('list');
    divka = document.createElement('div')
    divka.id = obj.phone;
    divka.style.padding = '20px'
    divka.innerHTML = `Name:${obj.name}<br>Phone number: ${obj.phone}<br>Email:${obj.email}<br>Company name:${obj.company}, 
                        department:${obj.dpartment}<br> Date of Bith:${obj.date}`;

    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'edit';

    editBtn.style.display = 'block';
     editBtn.addEventListener('click', editFunction)
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.style.display = 'block'
    delBtn.addEventListener('click',deleteFunction)
    divka.appendChild(editBtn)
    divka.appendChild(delBtn)
    list.appendChild(divka);
}

function editFunction() {

    let obj = JSON.parse(localStorage.getItem(this.parentElement.id));
    console.log(obj);
    this.disabled  = true;
     let form = document.createElement('Form');

     let editName = document.createElement('input');
    setValueAndType(editName, 'text', obj.name)

    let editPhone = document.createElement('input');
    setValueAndType(editPhone, 'number', obj.phone);

    let editEmail = document.createElement('input');
    setValueAndType(editEmail, 'email', obj.email);

    let editCompany = document.createElement('input');
    setValueAndType(editCompany, 'text', obj.company);

    let editDep = document.createElement('input');
    setValueAndType(editDep, 'text', obj.dpartment);

    let editDate = document.createElement('input');
    setValueAndType(editDate, 'date', obj.date);
    let btn = document.createElement('button');

    btn.innerText = 'save'
    btn.onclick =()=>{
        obj.name =  editName.value;
        obj.phone =  editPhone.value;
        obj.email =  editEmail.value;
        obj.company =  editCompany.value;
        obj.dpartment =  editDep.value;
        obj.date =  editDate.value;
        if(this.parentElement.id !== editPhone.value){
            localStorage.removeItem(this.parentElement.id)
        }
        localStorage.setItem(obj.phone.toString(),JSON.stringify(obj));
        appendList()
    }
    form.appendChild(editName)
    form.appendChild(editPhone)
    form.appendChild(editEmail)
    form.appendChild(editCompany)
    form.appendChild(editDep)
    form.appendChild(editDate);

    this.parentElement.appendChild(form) ;
    this.parentElement.appendChild(btn);

}
function setValueAndType(elem, type, value) {
    elem.type = type;
    elem.value = value;
}
