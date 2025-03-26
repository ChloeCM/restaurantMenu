import menuArray from '/data.js'
// console.log(menuArray)
let orderItems = []

document.addEventListener("click", function(event) {
    if(event.target.dataset.id){
        addFoodToOrder(Number(event.target.dataset.id))
    }
     if(event.target.classList.contains('remove')){
        const itemIndex = Number(event.target.dataset.index)
        removeItem(itemIndex)
     }
})


function removeItem(index){
    orderItems.splice(index, 1)
    renderOrder()
}


function addFoodToOrder(foodId){
    const selectedItem = menuArray.find(item => item.id === foodId)
    
    if(selectedItem){
       orderItems.push(selectedItem) 
       renderOrder()
    }
}

function renderOrder(){
    let orderHtml = `<h3 id="order-section">Your Order</h3>`
    
    const total = orderItems.reduce((total, item) => total + item.price, 0)
    
    orderItems.forEach(function(item, index) {
        orderHtml += `
        <div class="foodItems">
            <h3>${item.name}</h3>
            <div class="price-X">
                <button class="remove" data-index="${index}">X</button>
                <h3>$${item.price}</h3>
            </div>
        </div>
        `
    })
    
    orderHtml += `
      <div class="total">
            <h3>Total price: </h3>
            <h3>$${total}</h3>
        </div>
        <div>
            <button class="orderNow" id="orderNow">Complete Order</button>
        </div>
        <div id="modal-container"></div>
    `
    
    document.getElementById("order-section").innerHTML = orderHtml
    
}

function getFullMenu(displayItems){
    return displayItems.map(({ name, ingredients, id, price, emoji }) => {
        return `
        <section class="card">
        <span>${emoji}</span>
            <div class="card-right">
                <h2>${name}</h2>
                <p>${ingredients.join(', ')}</p>
                <h3>$${price}</h2>
            </div>
            <div class="addItems">
                <button id="${id}" data-id="${id}">+</button>
            </div>
        </section>
        `
    })
}




document.getElementById('container').innerHTML = getFullMenu(menuArray)