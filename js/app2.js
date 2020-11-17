const inputForm = document.getElementById('input-form')
const inputField = document.getElementById('input-value')
const itemList = document.querySelector('.list-items')
const feedback = document.querySelector('.feedback')
const clearBtn = document.querySelector('.clearBtn')


//Functions


function addItem(name){
    let div = document.createElement('div')
    div.classList.add('item','my-3','d-flex','justify-content-between','p-2')
    div.innerHTML = `
    <h5 class="item-title text-capitalize">${name}</h5>
    <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
    `
    itemList.appendChild(div)
    inputField.value = ''
    showFeedback(feedback,'Item added to the list','alert-success')
}

function showFeedback(element,text,result){
    element.classList.add('showItem',`${result}`)
    element.innerHTML = `<p>${text}</p>`

    setTimeout(()=>{
        element.classList.remove('showItem')
    },3000)
}

//Event listeners

document.addEventListener('DOMContentLoaded',()=>{
    loadStorage()
})

inputForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const value = inputField.value
    if(!value){
        const result = 'alert-danger'
        const text = 'Can not add empty value!'
        showFeedback(feedback,text,result)
    }else{
        addItem(value)
        addToStorage(value)
    }
    
})

itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-trash')){
        let item = e.target.parentElement.parentElement
        let text = item.querySelector('h5').textContent
        itemList.removeChild(item)
        clearStorageSingle(text)
    }
})

clearBtn.addEventListener('click',()=>{
    itemList.innerHTML = ''
    clearStorage()
})

//Local storage

function addToStorage(value){
    let items

    if(localStorage.getItem('grocery-list')){
        items = JSON.parse(localStorage.getItem('grocery-list'))
    }else{
        items = []
    }

    items.push(value)
    localStorage.setItem('grocery-list',JSON.stringify(items))

}

function clearStorage(){
    localStorage.removeItem('grocery-list')
}

function clearStorageSingle(value){
    const tempItems = JSON.parse(localStorage.getItem('grocery-list'))
    const items = tempItems.filter((item)=> item !== value)
    console.log(items)
    localStorage.removeItem('grocery-list')
    localStorage.setItem('grocery-list',JSON.stringify(items))
}

function loadStorage(){
    if(localStorage.getItem('grocery-list')){
        const items = JSON.parse(localStorage.getItem('grocery-list'))

        items.forEach((item)=>{
            let div = document.createElement('div')
            div.classList.add('item','my-3','d-flex','justify-content-between','p-2')
            div.innerHTML = `
            <h5 class="item-title text-capitalize">${item}</h5>
            <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
            `
            itemList.appendChild(div)
        })
    }
}