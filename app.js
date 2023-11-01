let list = document.querySelector(".list");
let right = document.querySelector(".details");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let close = document.querySelector(".order");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let products = [
  {
    id: 1,
    name: "PRODUCT NAME 1",
    image: "img/1.PNG",
    price: 120000,
  },
  {
    id: 2,
    name: "PRODUCT NAME 2",
    image: "img/cappucino.jpg",
    price: 120000,
  },
  {
    id: 3,
    name: "PRODUCT NAME 3",
    image: "img/chocolate.jpg",
    price: 220000,
  },
  {
    id: 4,
    name: "PRODUCT NAME 4",
    image: "img/espresso.jpg",
    price: 123000,
  },
  {
    id: 5,
    name: "PRODUCT NAME 5",
    image: "img/matcha.jpg",
    price: 320000,
  },
  {
    id: 6,
    name: "PRODUCT NAME 6",
    image: "img/frappucino.jpg",
    price: 120000,
  },
];
let initApp = () => {
  return (list.innerHTML = products
    .map((x) => {
      let { id, name, image, price } = x;

      return `<div class="detail">
            <img src="${image}" >
            <div class="title">${name}</div>
            <div class="price">Rp. ${price.toLocaleString()}</div>
            <button onclick="addToCard(${id})" title="Add To Cart">Add To Cart</button></div>`;
    })
    .join(""));
};
initApp();
let addToCard = (id) => {
  let positionThisProductInCart = basket.find((value) => value.id === id);
  if (positionThisProductInCart === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    positionThisProductInCart.item += 1;
  }
  reloadCard2();
  localStorage.setItem("data", JSON.stringify(basket));
};

let reloadCard = () => {
  right.innerHTML = "";
  let total = 0;
  if (basket.length > 0) {
    basket.forEach((item) => {
      total = total + item.quantity;
      let newDiv = document.createElement("div");
      newDiv.classList.add("order");
      newDiv.dataset.id = item.product_id;

      let positionProduct = products.findIndex((value) => value.id == item.product_id);
      let info = products[positionProduct];
      right.appendChild(newDiv);
      newDiv.innerHTML = `<div class ="order">
                <img src="${info.image}" width="60"/>
                <div>
                <button class="plus">-</button>
                <div class="count" style="margin: 10px">${info.quantity}</div>
                <button class="minus">+</button>
              </div>
              <div><b>${info.name}</b></b></div>
              <div>Rp. ${info.price}</div>
              <div><button class="icon" title="Delete"><span class="material-symbols-outlined">
              delete
              </span></button></div
            </div></div>`;
    });
  }
};
let reloadCard2 = () => {
  if (basket.length !== 0) {
    return (right.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = products.find((y) => y.id === id) || [];

        return `<div class ="order">
      <img src="${search.image}" width="60"/>
      <div>
      <button onclick="decrement(${id})">-</button>
      <div id="${id}" class="count" style="margin: 10px">${item}</div>
      <button onclick="increment(${id})">+</button>
    </div>
    <div class="price"><b>${search.name}</b><p>Rp. ${search.price.toLocaleString()}</p></div>
    <div style="font-weight:bolder;">Rp. ${item * search.price}
    </div>
    <div><button onclick="remove(${id})" class="icon" title="Delete"><span class="material-symbols-outlined">
    delete
    </span></button></div
  </div></div>`;
      })
      .join(""));
  } else {
    right.innerHTML = `<i>Your Cart is Empty</i>`;
  }
};
reloadCard2();

// Increment
let increment = (id) => {
  let positionThisProductInCart = basket.find((value) => value.id === id);
  if (positionThisProductInCart === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    positionThisProductInCart.item += 1;
  }
  update(id);
  reloadCard2();
  localStorage.setItem("data", JSON.stringify(basket));
};

// Decrement
let decrement = (id) => {
  let search = basket.find((value) => value.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  reloadCard2();
  localStorage.setItem("data", JSON.stringify(basket));
};

// delete button
let remove = (id) => {
  basket = basket.filter((x) => x.id !== id);

  reloadCard2();
  localStorage.setItem("data", JSON.stringify(basket));
};

// update
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  TotalAmount();
};

// total
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = products.find((x) => x.id === id);
        return search.price * item;
      })
      .reduce((x, y) => x + y, 0);
    return (total.innerHTML = `Rp ${amount}<br>
    <button class="btn">Payment</button>`);
  } else return;
};
TotalAmount();
