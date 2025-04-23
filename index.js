import menuArray from '/data.js';
console.log(menuArray);
let orderItems = [];

/**
 * Add an event listener that listens for clicks on the entire document
 * 1. When a user clicks on the add button to add an item to their order
 * 2. When a user clicks on the remove button longside their order
 * 3. clicks on the complete order button, it brings up the payment function.
 */
document.addEventListener("click", function(event){
    if(event.target.dataset.id){
        addFoodToOrder(Number(event.target.dataset.id));
    }
    
    if(event.target.classList.contains('remove')){
        removeItem(Number(event.target.dataset.index))
    }
    
    if(event.target.classList.contains('completeBtn')){
        showPaymentForm()
    }
    
    if(event.target.classList.contains('closeBtn')){
       closeBtn() 
    }
    
})


document.addEventListener("submit", function(event){
    event.preventDefault()
    
    const form = event.target
    
    if(form.id === 'discount-form'){
        claimDiscount(form);
    }
    
    if (form.id === "payment-form") {
        const name = form.querySelector('input[name="name"]').value

        // Replace the entire modal with thank-you message
        document.getElementById('card-details').innerHTML = `
            <div class="details">
                <span class="closeBtn">❌</span>
                <h2>Thanks ${name}, your order is on its way! 🎉</h2>
            </div>
        `

        orderItems = []
        renderOrder()
    }
})

function claimDiscount(form){
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    
    document.querySelector('.discount-popUp').innerHTML = `
    <div class="card-claimDiscount">
        <div class="card-claimDiscount-content">
            <span class="closeBtn">❌</span>
                <p>Thanks ${name}, your 10% code will be sent to <strong>${email}</strong> shortly!</p>
        </div>
    </div>
    `
    
}

setTimeout(()=> {
   console.log("Pops up after 2 seconds");
   
   document.querySelector('.discount-popUp').innerHTML = `
   <div class="discount-content">
        <span class="closeBtn">❌</span>
        <h2>🎉 Get 10% Off! 🎉</h2>
        <form class="discount-form" id="discount-form">
            <input type="text" name="name" required placeholder="Enter your name">
            <input type="email" name="email" required placeholder="Enter your email">
            <button type="submit" class="discountBtn">Claim Discount</button>
        </form>

    </div>
   `
    
}, 2000)

function closeBtn(){
    const discountPopup = document.querySelector('.discount-content');
    const thankYouPopup = document.querySelector('.card-claimDiscount');

    if (discountPopup) {
        discountPopup.remove(); 
    }

    if (thankYouPopup) {
        thankYouPopup.remove(); 
    }

    const detailsPopup = document.getElementById('card-details');
    if (detailsPopup) {
        detailsPopup.classList.add('hidden');
    }

    console.log("Close button clicked");
}


/**
 * This brings up the payment method. 
 * Bring in the html 
 */
function showPaymentForm(){
    const detailsEl = document.getElementById('card-details');
    
    detailsEl.innerHTML = `
    <section class="details">
        <h3>Enter Card Details</h3>
        <form class="payment-form" id="payment-form">
            <input type="text" name="name" for="name" placeholder="Enter Name" required/>
            <input type="text" name="card" for="card" placeholder="1234 1234 1234 1234" required/>
            <input type="text" name="cvv" for="cvv" placeholder="Enter CVV" required/>
            <button type="submit" class="payBtn" id="payBtn">Pay Now</button>
        </form>
    </section>
    `
    detailsEl.classList.remove('hidden');
}

function removeItem(index){
    orderItems.splice(index, 1);
    renderOrder()
}

/**
 * This is your order review section for the user. 
 * 1. Add in the html for each item and 
 * 2. iterate through the items that you have in your order
 * 3. Use a reduce method to add these items for the total
 */
function renderOrder(){
    
    let orderHtml = `<h1 id="order-section">Your Order</h1>`
    
    const total = orderItems.reduce((total, item) => total + item.price, 0)
    
    orderItems.forEach(function(item, index){
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
        <h3>Total Price:</h3>
        <h3>$${total}</h3>
    </div>
    <div>
        <button class="completeBtn">Complete Order</button>
    </div>
    
    `
    
    document.getElementById("order-section").innerHTML = orderHtml
}

/**
 * find the item you are adding to your order and check it matches the food Id.
 * If both match, add the item to the orderItems array and render the order.
 */
function addFoodToOrder(foodId){
    const selectedFoodItem = menuArray.find(item => item.id === foodId)
    
    if(selectedFoodItem){
       orderItems.push(selectedFoodItem);
       renderOrder() 
    }
}

/**
 * Output the menu onto the screen, Iterate through each item in the menuArray and display it to the
 * screen using map method
 */
function getFullMenu(displayItems){
    const items = displayItems.map(({name, ingredients, id, price, emoji }) => {
        return `
        <section class="card">
        <span>${emoji}</span>
            <div class="card-items">
                <h2>${name}</h2>
                <p>${ingredients.join(', ')}</p>
                <h3>$${price}</h3>
            </div>
            <div class="addItems">
                <button id="${id}" data-id="${id}">+</button>
            </div>
        </section>
        `
    })
    return items.join('')
}

document.getElementById('main-container').innerHTML = getFullMenu(menuArray);


// /**
//  * Have an event listener for the entire document that listens for clicks
//  * 1. For the add button on the menu items
//  */
// document.addEventListener("click", function(event){
//     if(event.target.dataset.id){
//        addFoodToOrder(Number(event.target.dataset.id)) 
//     }
    
//     if(event.target.classList.contains('remove')){
//         removeItem(Number(event.target.dataset.index))
//     }
    
//     if(event.target.classList.contains('completeBtn')){
//        showPaymentForm() 
//     }
    
// })



// document.addEventListener("submit", function(event){
//     event.preventDefault()
    
//     const form = event.target
    
//     if (form.id === "payment-form") {
//         const name = form.querySelector('input[name="name"]').value

//         // Replace the entire modal with thank-you message
//         document.getElementById('card-details').innerHTML = `
//             <div class="details">
//                 <h2>Thanks ${name}, your order is on its way! 🎉</h2>
//             </div>
//         `

//         orderItems = []
//         render
//     }
// })


// function showPaymentForm(){
//    const detailsEl = document.getElementById('card-details');
   
//    detailsEl.innerHTML = `
//    <div class="details">
//         <h3>Enter Card Details</h3>
//         <form class="payment-form" id="payment-form" >
//             <input type="text" name="name" placeholder="Enter your name" required />
//             <input type="text" name="card" placeholder="1234 1234 1234 1234" maxlength="16" required />
//             <input type="password" name="cvv" placeholder="Enter CVV" required />
//             <button type="submit" class="payBtn" id="payBtn">Pay</button>
//         </form>
//    </div>
//    `
//    detailsEl.classList.remove('hidden');
   
// }

// function removeItem(index){
//     orderItems.splice(index, 1);
//     renderOrder()
// }

// /**
//  * This is your order review section for the user. 
//  * 1. Add in the html for each item and 
//  * 2. iterate through the items that you have in your order
//  * 3. Use a reduce method to add these items for the total
//  */
// function renderOrder(){
    
//     let orderHtml = `<h1 id="order-section">Your Order</h1>`
    
//     const total = orderItems.reduce((total, item) => total + item.price, 0)
    
//     orderItems.forEach(function(item, index){
//         orderHtml += `
//         <div class="foodItems">
//             <h3>${item.name}</h3>
//             <div class="price-X">
//                 <button class="remove" data-index="${index}">X</button>
//                 <h3>$${item.price}</h3>
//             </div>
//         </div>
//         `
//     })
    
//     orderHtml += `
//     <div class="total">
//         <h3>Total Price:</h3>
//         <h3>$${total}</h3>
//     </div>
//     <div>
//         <button class="completeBtn">Complete Order</button>
//     </div>
    
//     `
    
//     document.getElementById("order-section").innerHTML = orderHtml
// }

// /**
//  * This function adds the food to the order. Look for the food id and see
//  * does it match. If it does match, render it to the page.
//  */
// function addFoodToOrder(foodId){
//     const selectedFood = menuArray.find(item => item.id === foodId)
    
//     if(selectedFood){
//        orderItems.push(selectedFood)
//        renderOrder()
//     }
// }

// /**
//  * Display the full menu from the data.js
//  * 1. Iterate through each item in the array and display it to the screen
//  */
// function getFullMenu(displayItems){
//     const items = displayItems.map(({ name, ingredients, id, price, emoji }) => {
//         return `
//         <section class="card">
//         <span>${emoji}</span>
//             <div class="card-items">
//                 <h2>${name}</h2>
//                 <p>${ingredients.join(', ')}</p>
//                 <h3>$${price}</h3>
//             </div>
//             <div class="addItems">
//                 <button id="${id}" data-id="${id}">+</button>
//             </div>
//         </section>
//         `
//     })
//     return items.join('')
// }

// document.getElementById('main-container').innerHTML = getFullMenu(menuArray)