// contentful
const client = contentful.createClient({
  space: "na3huh65xh9j",
  accessToken: "StK03IER3-viGPSe0N5944UnE3tK7FPOnE5BLeHWtRI",
});

const pizzasDOM = document.querySelector(".pizzas-center");

class Pizzas {
  async getPizzas() {
    try {
      let contentful = await client.getEntries({
        content_type: "JSPizza",
      });
      // console.log(contentful);
      let pizzas = contentful.items;
      pizzas = pizzas.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return pizzas;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayPizzas(pizzas) {
    let result = "";
    pizzas.forEach((pizza) => {
      result += `
        <article class="pizza">
          <div class="img-container">
            <img
              src=${pizza.image}
              alt="pizza"
              class="pizza-img"
            />
            <button class="bag-btn" data-id=${pizza.id}>
              <i class="fa fa-shopping-cart"></i>
              add to cart
            </button>
          </div>
          <h3>${pizza.title}</h3>
          <h4>$${pizza.price}</h4>
        </article>
        `;
    });
    pizzasDOM.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const pizzas = new Pizzas();

  // all pizzas
  pizzas.getPizzas().then((pizzas) => {
    ui.displayPizzas(pizzas);
  });
});

// scrollbar navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("scroll-on");
  } else {
    nav.classList.remove("scroll-on");
  }
};

// nav hide
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
  a.addEventListener("click", function () {
    navCollapse.classList.remove("show");
  });
});
