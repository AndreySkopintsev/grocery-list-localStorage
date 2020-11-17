const inputField = document.getElementById('input-value');
const submitBtn = document.querySelector('.submitBtn');
const itemList = document.querySelector('.list-items');
const clearBtn = document.querySelector('.clearBtn');
const feedback = document.querySelector('.feedback');

//Event listeners

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const itemText = inputField.value;

    addItem(itemText);

    addStorage(itemText);
})

clearBtn.addEventListener('click',()=>{
    itemList.innerHTML = '';
    clearStorage();
})

//DOM content loaded

document.addEventListener('DOMContentLoaded',()=>{
    loadItems();
})

//Functions 

//Adding an item

function addItem(value){
    let newItemDiv = document.createElement('div');
    newItemDiv.classList.add('item','my-3','d-flex','justify-content-between','p-2');
    newItemDiv.innerHTML = `
    <h5 class="item-title text-capitalize">${value}</h5>
    <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>`;
    addDelete(newItemDiv);
    itemList.appendChild(newItemDiv);
    feedback.classList.add('showItem');
    hideFeedback();
    inputField.value = '';
}
//Function for adding delete button functionality to a new item

function addDelete(item){
    item.addEventListener('click',(e)=>{
        if(e.target.classList.contains('remove-icon') || e.target.classList.contains('fa-trash')){
            item.parentElement.removeChild(item);
            let text = e.target.parentElement.previousElementSibling.textContent;
            clearSingle(text);
        }
    })
}

//Function showing the alert feedback

function hideFeedback(){
    setTimeout(()=>{
        feedback.classList.remove('showItem');
    },3000);
}

//Local storage

//Add items to local storage

function addStorage(value){
    let items;

    if(localStorage.getItem('grocery-list')){
        items = JSON.parse(localStorage.getItem('grocery-list'));
        console.log(items);
    }else {
        items = [];
    }

    items.push(value);
    localStorage.setItem('grocery-list',JSON.stringify(items));

};

//Clear local storage

function clearStorage(){
    localStorage.removeItem('grocery-list');
}

//Clear single item in local storage

function clearSingle(value){
    const tempItems = JSON.parse(localStorage.getItem('grocery-list'));
    const items = tempItems.filter((item)=>{
        if(item !== value){
            return item;
        }
    })

    localStorage.removeItem('grocery-list');
    localStorage.setItem('grocery-list',JSON.stringify(items));
}

//Load items

function loadItems(){

    if(localStorage.getItem('grocery-list')){
        const items = JSON.parse(localStorage.getItem('grocery-list'));

        items.forEach((item)=>{
            const div = document.createElement('div');
            div.classList.add('item', 'my-3', 'd-flex','justify-content-between','p-2');
            div.innerHTML = `<h5 class="item-title text-capitalize">${item}</h5>
            <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
            </div>`;
            itemList.appendChild(div);
        })
    }
}