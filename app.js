window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  let date = new Date();
  let currentDate = date.toISOString().slice(0, 10);
  console.log(currentDate);
  const orderButotn = document.getElementById("header-main");
  const orderP = document.createElement("p");
  orderP.classList.add("currentDate");
  orderP.innerHTML = currentDate;

  orderButotn.appendChild(orderP);

});

let submitData = {
  margherita: 0,
  formaggi: 0,
  capricciosa: 0,
  schnitzel: 0,
  mixGrill: 0,
  bigBeefBun: 0,
  coffee: 0,
  latte: 0,
  softDrink: 0
};


function showOrderBoard() {

  document.getElementById('flex-menu').hidden = false;

}

function updateData(value, id) {
  if (id === "margherita" || id === "formaggi" || id === "capricciosa" || id === "schnitzel"
    || id === "mixGrill" || id === "bigBeefBun" || id === "coffee" || id === "coffee"
    || id === "latte" || id === "softDrink") {
    submitData[id] = value;
  } else {
    console.log("invalid");

  }
}

let selectedMenu = false;

function selected(id) {
  selectedMenu = !selectedMenu;

  if (selectedMenu) {
    document.getElementById('cart').hidden = false;
    document.getElementById(id).style.border = "2px solid black";
    const menuName = id.split("-");
    if (menuName[0] in submitData) {
      console.log(menuName[0]);
      addInCart(menuName[0]);
    }
  } else {
    document.getElementById(id).style.border = "1px solid black";

  }
}

function addInCart(addedItem) {

  console.log("test");
  //prevent natural behaviour
  //addedItem.preventDefault();
  const addCard = document.getElementById("add-card");
  const orderAndCart = document.getElementById("orderAndCart");
  orderAndCart.style.marginTop = "100px";
  const cartDiv = document.createElement("div");
  cartDiv.classList.add("cart-item");
  cartDiv.innerText += `${addedItem}-------${submitData[addedItem]}`;

  addCard.appendChild(cartDiv);
}

function myformSubmit(event) {
  event.preventDefault();

  document.getElementById('order-list').hidden = false;
  let firstName = document.form.firstName.value;
  let lastName = document.form.lastName.value;
  let phoneNumber = document.form.phoneNumber.value;
  let pickUpOrDelivery = document.form.pickUpOrDelivery.value;
  let orderTime = document.form.orderTime.value;

  let totalPrice = submitData.margherita * 12.00 + submitData.formaggi * 12.50 + submitData.capricciosa * 13.00 + submitData.schnitzel * 8.50 +
    submitData.mixGrill * 9.50 + submitData.bigBeefBun * 10.00 + submitData.coffee * 2.00 + submitData.latte * 2.50 + submitData.softDrink * 1.75;
  totalPrice = totalPrice.toFixed(2);

  const orderlist = document.getElementById("order-list");

  const orderDiv = document.createElement("div");
  orderDiv.classList.add("order-item");

  for (const [key, value] of Object.entries(submitData)) {
    if (value != 0) {
      orderDiv.innerHTML += `${key} : ${value} <hr><br /><br />`;
    }
  }

  const showingTotalPrice = document.createElement("div");
  showingTotalPrice.classList.add("total-price");
  showingTotalPrice.innerHTML = `<p>Total Order: $${totalPrice}<hr></p>`

  const orderCustomerInfo = document.createElement("div");
  orderCustomerInfo.classList.add("ordered-customerInfo");
  orderCustomerInfo.innerHTML = `<p>first name : ${firstName} <hr><br> Last name : ${lastName} <hr><br> Phone Number : ${phoneNumber} <hr><br>${pickUpOrDelivery} <hr><br> Time : ${orderTime}</p>`

  orderlist.appendChild(orderDiv);
  orderlist.appendChild(showingTotalPrice);
  orderlist.appendChild(orderCustomerInfo);
}



