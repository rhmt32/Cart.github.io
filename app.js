let list = document.querySelector(".list");
let body = document.querySelector("body");
let right = document.querySelector(".details");
let show = document.querySelector(".right");
let total = document.querySelector(".total");
let close = document.querySelector(".order");
let col = document.querySelector(".right");
let basket = JSON.parse(localStorage.getItem("data")) || [];

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
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let reloadCard2 = () => {
  if (basket.length !== 0) {
    return (right.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = products.find((y) => y.id === id) || [];
        let total = item * search.price;

        return `<div class ="order">
      <img src="${search.image}" width="60"/>
      <div>
      <button onclick="decrement(${id})">-</button>
      <div id="${id}" class="count" style="margin: 10px">${item}</div>
      <button onclick="increment(${id})">+</button>
    </div>
    <div class="price"><b>${search.name}</b><p>Rp. ${search.price.toLocaleString()}</p></div>
    <div style="font-weight:bolder;"> Rp. ${total.toLocaleString()}
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
  calculation();
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
    return (total.innerHTML = `Rp ${amount.toLocaleString()}<br>
    <button class="btn">Payment</button>`);
  } else return;
};
TotalAmount();

let calculation = () => {
  let icon = document.getElementById("cart");
  icon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

const openCart = document.querySelector(".right");
document.querySelector(".material-symbols-outlined").onclick = () => {
  openCart.classList.remove("active");
};
