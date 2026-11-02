const products = [
    {
        id: 1,
        name: "The Classic Bubu",
        price: 35000,
        image: "images/bubu1.jpeg"
    },
    {
        id: 2,
        name: "The Luxury Bubu",
        price: 55000,
        image: "images/bubu2.jpeg"
    },
    {
        id: 3,
        name: "The Signature Bubu",
        price: 45000,
        image: "images/bubu3.jpeg"
    }
];

let cart = [];

const formatPrice = price =>
    "₦" + price.toLocaleString("en-NG");

function displayProducts() {

    const container = document.getElementById("products");

    container.innerHTML = products.map(product => `
        <div class="product">

            <img src="${product.image}"
                 alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${formatPrice(product.price)}</p>

            <button onclick="addToCart(${product.id})">
                ADD TO BAG
            </button>

        </div>
    `).join("");
}

function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;

    const items = document.getElementById("cart-items");

    items.innerHTML = cart.map(item => `
        <div class="cart-row">
            <span>${item.name} x ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        "Total: " + formatPrice(total);
}

function showCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function checkout() {

    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    const phone = "2348000000000";

    let message = "Hello ADÉORA! I want to order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    message += `\nTotal: ${formatPrice(total)}`;
    message += "\nPlease confirm availability and payment details.";

    window.open(
        "https://wa.me/" + phone + "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

document.getElementById("custom-form").addEventListener(
    "submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("customer-name").value;
        const phone = document.getElementById("customer-phone").value;
        const style = document.getElementById("customer-style").value;
        const details = document.getElementById("customer-details").value;

        const businessPhone = "2348000000000";

        const message =
            `Hello ADÉORA! I want a custom Bubu outfit.\n\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Style: ${style}\n` +
            `Details: ${details}`;

        window.open(
            "https://wa.me/" + businessPhone +
            "?text=" + encodeURIComponent(message),
            "_blank"
        );
    }
);

displayProducts();