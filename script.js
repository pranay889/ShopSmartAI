
/* =========================
   PRODUCT DATA
========================= */

let  products = [
    {
        name: "Samsung Galaxy A15",
        category: "mobile",
        price: 14999,
        icon: "📱",
        description: "Affordable smartphone with a bright display and long battery life."
    },
    {
        name: "iPhone 15",
        category: "mobile",
        price: 54999,
        icon: "📱",
        description: "Premium smartphone with powerful performance and excellent camera quality."
    },
    {
        name: "OnePlus Nord CE",
        category: "mobile",
        price: 18999,
        icon: "📱",
        description: "Fast and stylish smartphone for daily use and gaming."
    },
    {
        name: "Realme Narzo",
        category: "mobile",
        price: 11999,
        icon: "📱",
        description: "Budget-friendly smartphone with smooth performance."
    },
    {
        name: "Android Tablet",
        category: "mobile",
        price: 12999,
        icon: "📲",
        description: "Useful tablet for studying, entertainment, and browsing."
    },
    {
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        icon: "⌚",
        description: "Track your fitness, heart rate, and daily activities."
    },
    {
        name: "Wireless Headphones",
        category: "electronics",
        price: 1799,
        icon: "🎧",
        description: "Enjoy clear sound and comfortable wireless listening."
    },
    {
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1499,
        icon: "🔊",
        description: "Portable speaker with powerful sound for parties and travel."
    },
    {
        name: "Gaming Mouse",
        category: "electronics",
        price: 899,
        icon: "🖱️",
        description: "Responsive gaming mouse with comfortable controls."
    },
    {
        name: "Mechanical Keyboard",
        category: "electronics",
        price: 3499,
        icon: "⌨️",
        description: "Mechanical keyboard suitable for work, study, and gaming."
    },
    {
        name: "Fast Charging Adapter",
        category: "electronics",
        price: 799,
        icon: "🔌",
        description: "Compact fast charger for compatible smartphones."
    },
    {
        name: "Power Bank",
        category: "electronics",
        price: 1299,
        icon: "🔋",
        description: "Portable power bank for charging devices while travelling."
    },
    {
        name: "USB-C Cable",
        category: "electronics",
        price: 299,
        icon: "🔗",
        description: "Durable USB-C charging and data cable."
    },
    {
        name: "Classic Sneakers",
        category: "fashion",
        price: 2299,
        icon: "👟",
        description: "Comfortable sneakers for everyday use."
    },
    {
        name: "Running Shoes",
        category: "fashion",
        price: 1999,
        icon: "👟",
        description: "Lightweight running shoes for workouts and outdoor activities."
    },
    {
        name: "Oversized Hoodie",
        category: "fashion",
        price: 1599,
        icon: "🧥",
        description: "Soft and comfortable casual hoodie."
    },
    {
        name: "Casual T-Shirt",
        category: "fashion",
        price: 699,
        icon: "👕",
        description: "Comfortable cotton T-shirt for everyday wear."
    },
    {
        name: "Denim Jacket",
        category: "fashion",
        price: 2499,
        icon: "🧥",
        description: "Stylish denim jacket for a modern casual look."
    },
    {
        name: "Slim Fit Jeans",
        category: "fashion",
        price: 1799,
        icon: "👖",
        description: "Comfortable slim-fit jeans for casual outfits."
    },
    {
        name: "Urban Backpack",
        category: "accessories",
        price: 1299,
        icon: "🎒",
        description: "Stylish backpack for college, office, and travel."
    },
    {
        name: "Premium Sunglasses",
        category: "accessories",
        price: 999,
        icon: "🕶️",
        description: "Modern sunglasses with a stylish look."
    },
    {
        name: "Leather Wallet",
        category: "accessories",
        price: 599,
        icon: "👛",
        description: "Compact wallet for cards, cash, and identification."
    },
    {
        name: "Smart Desk Lamp",
        category: "home",
        price: 1199,
        icon: "💡",
        description: "Brighten your study desk with a modern desk lamp."
    },
    {
        name: "Water Bottle",
        category: "home",
        price: 499,
        icon: "🧴",
        description: "Reusable water bottle for college, gym, and travel."
    },
    {
        name: "Study Table Organizer",
        category: "home",
        price: 799,
        icon: "🗂️",
        description: "Keep your study table clean and organized."
    },
    {
        name: "LED Strip Lights",
        category: "home",
        price: 899,
        icon: "✨",
        description: "Decorative LED lights for your room or gaming setup."
    }
];
function getProductIcon(productName) {
    const icons = {
        "Smartphone": "📱",
        "Wireless Headphones": "🎧",
        "Smart Watch": "⌚",
        "Wireless Mouse": "🖱️",
        "Mechanical Keyboard": "⌨️",
        "Power Bank": "🔋",
        "Laptop": "💻",
        "Bluetooth Speaker": "🔊"
    };

    return icons[productName] || "🛍️";
}
async function loadProductsFromBackend() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Could not load products");
        }

        const backendProducts = await response.json();

        products = backendProducts.map(function (product) {
            return {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                icon: getProductIcon(product.name),
                description: product.description,
                stock: product.stock,
                rating: product.rating
            };
        });

        displayProducts();
    } catch (error) {
        console.error("Backend product loading failed:", error);

        // Keep the existing local products as backup
        displayProducts();
    }
}

let cart = [];
let authMode = "login";
let currentUser = null;

/* =========================
   PRODUCT IMAGES
========================= */

function getProductImage(productName) {
    const imageMap = {
        "Samsung Galaxy A15": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "iPhone 15": "https://images.unsplash.com/photo-1592286927505-2fd7f6c6b7b4",
        "OnePlus Nord CE": "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        "Realme Narzo": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "Android Tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        "Smart Watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        "Wireless Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        "Bluetooth Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        "Gaming Mouse": "https://images.unsplash.com/photo-1527814050087-3793815479db",
        "Mechanical Keyboard": "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        "Fast Charging Adapter": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
        "Power Bank": "https://images.unsplash.com/photo-1609592424845-6c9c5f7a4a5f",
        "USB-C Cable": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
        "Classic Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "Running Shoes": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
        "Oversized Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        "Casual T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "Denim Jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        "Slim Fit Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d",
        "Urban Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        "Premium Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        "Leather Wallet": "https://images.unsplash.com/photo-1627123424574-724758594e93",
        "Smart Desk Lamp": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        "Water Bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
        "Study Table Organizer": "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
        "LED Strip Lights": "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    };

    return imageMap[productName] || "";
}


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!productList) {
        return;
    }

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "all";

    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        const productCategory = product.category.toLowerCase();

        const matchesSearch =
            productName.includes(searchText) ||
            productDescription.includes(searchText) ||
            productCategory.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <p class="no-products">
                No products found. Try another search.
            </p>
        `;
        return;
    }

    productList.innerHTML = filteredProducts.map(product => {
        const productIndex = products.indexOf(product);

        return `
            <div class="product-card">
                <div class="product-image">
                    ${product.icon}
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button onclick="addToCart(${productIndex})">
                    Add to Cart
                </button>
            </div>
        `;
    }).join("");
}


/* =========================
   SEARCH AND CATEGORY FILTER
========================= */

function filterProducts() {
    displayProducts();
}


/* =========================
   CART
========================= */

function addToCart(productIndex) {
    const product = products[productIndex];

    if (!product) {
        return;
    }

    cart.push(product);
    updateCartCount();

    alert(`${product.name} added to your cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function openCart() {
    const cartModal = document.getElementById("cartModal");

    if (cartModal) {
        cartModal.style.display = "block";
        renderCart();
    }
}

function closeCart() {
    const cartModal = document.getElementById("cartModal");

    if (cartModal) {
        cartModal.style.display = "none";
    }
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: ₹0";
        return;
    }

    let total = 0;

    cartItems.innerHTML = cart.map(function (product, index) {
        total += product.price;

        return `
            <div class="cart-product">

                <div>
                    <strong>${product.name}</strong>
                    <p>₹${product.price.toLocaleString("en-IN")}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    }).join("");

    cartTotal.textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;
}

function removeFromCart(cartIndex) {
    if (cartIndex < 0 || cartIndex >= cart.length) {
        return;
    }

    cart.splice(cartIndex, 1);

    updateCartCount();
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert(
        "Thank you for shopping with ShopSmartAI! " +
        "This is a demo checkout for your college project."
    );
}


/* =========================
   DARK MODE
========================= */

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDarkMode =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "shopSmartTheme",
        isDarkMode ? "dark" : "light"
    );
}

function loadTheme() {
    const savedTheme =
        localStorage.getItem("shopSmartTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}


/* =========================
   OFFERS
========================= */

function showOffer() {
    const offerMessage =
        document.getElementById("offerMessage");

    if (offerMessage) {
        offerMessage.textContent =
            "🎉 Congratulations! You unlocked a special 20% discount.";
    }
}


/* =========================
   LOGIN AND SIGNUP
========================= */

// Open login modal
function openLogin() {
    const loginModal = document.getElementById("loginModal");

    if (!loginModal) {
        return;
    }

    loginModal.style.display = "block";
    updateAuthForm();
}


// Close login modal
function closeLogin() {
    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.style.display = "none";
    }
}


// Switch between Login and Signup
function switchAuthMode() {
    authMode = authMode === "login" ? "signup" : "login";

    updateAuthForm();
}


// Update form according to the current mode
function updateAuthForm() {
    const authTitle = document.getElementById("authTitle");
    const authName = document.getElementById("authName");
    const authSubmit = document.querySelector(".auth-submit");
    const authSwitchText = document.getElementById("authSwitchText");
    const authSwitchButton = document.getElementById("authSwitchButton");
    const authMessage = document.getElementById("authMessage");

    if (!authTitle || !authName || !authSubmit) {
        return;
    }

    if (authMode === "login") {
        authTitle.textContent = "Login to ShopSmartAI";

        authName.style.display = "none";
        authName.required = false;

        authSubmit.textContent = "Login";

        if (authSwitchText) {
            authSwitchText.textContent = "Don't have an account?";
        }

        if (authSwitchButton) {
            authSwitchButton.textContent = "Sign Up";
        }
    } else {
        authTitle.textContent = "Create ShopSmartAI Account";

        authName.style.display = "block";
        authName.required = true;

        authSubmit.textContent = "Sign Up";

        if (authSwitchText) {
            authSwitchText.textContent = "Already have an account?";
        }

        if (authSwitchButton) {
            authSwitchButton.textContent = "Login";
        }
    }

    if (authMessage) {
        authMessage.textContent = "";
    }
}


// Submit Login or Signup form
async function submitAuth(event) {
    event.preventDefault();

    const nameInput = document.getElementById("authName");
    const emailInput = document.getElementById("authEmail");
    const passwordInput = document.getElementById("authPassword");
    const authMessage = document.getElementById("authMessage");

    if (!emailInput || !passwordInput || !authMessage) {
        return;
    }

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (authMode === "signup") {
        if (name === "" || email === "" || password === "") {
            authMessage.textContent = "Please fill all fields.";
            return;
        }

        if (password.length < 6) {
            authMessage.textContent =
                "Password must contain at least 6 characters.";
            return;
        }

        try {
            const response = await fetch(
                "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const result = await response.json();

            authMessage.textContent = result.message;

            if (response.ok && result.success) {
                passwordInput.value = "";
                authMode = "login";
                updateAuthForm();
                authMessage.textContent =
                    "Account created successfully. Please login.";
            }
        } catch (error) {
            console.error("Signup error:", error);

            authMessage.textContent =
                "Cannot connect to the backend. Start Flask first.";
        }

        return;
    }

    if (email === "" || password === "") {
        authMessage.textContent =
            "Please enter email and password.";
        return;
    }

    try {
        const response = await fetch(
            "/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {
            currentUser = result.user;
            localStorage.setItem(
                 "shopSmartLoggedInUser",
                 JSON.stringify(currentUser)
          );

            authMessage.textContent =
                `Welcome back, ${currentUser.name}!`;

            updateLoginButton();

            setTimeout(function () {
                closeLogin();
            }, 1000);
        } else {
            authMessage.textContent = result.message;
        }
    } catch (error) {
        console.error("Login error:", error);

        authMessage.textContent =
            "Cannot connect to the backend. Start Flask first.";
    }
}


// Update Login button
function updateLoginButton() {
    const loginButton = document.querySelector(".login-btn");

    if (!loginButton) {
        return;
    }

    if (currentUser) {
        loginButton.textContent = `👋 ${currentUser.name}`;
        loginButton.onclick = logoutUser;
    } else {
        loginButton.textContent = "👤 Login";
        loginButton.onclick = openLogin;
    }
}
function loadLoggedInUser() {
    const savedUser = localStorage.getItem(
        "shopSmartLoggedInUser"
    );

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    } else {
        currentUser = null;
    }

    updateLoginButton();
}


// Logout user
function logoutUser() {
    currentUser = null;
    updateLoginButton();

    alert("You have been logged out.");
}

/* =========================
   CHATBOT
========================= */

function toggleChat() {
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        return;
    }

    const isOpen =
        chatBox.style.display === "flex" ||
        chatBox.style.display === "block";

    chatBox.style.display =
        isOpen ? "none" : "flex";
}

function quickChat(message) {
    const chatInput =
        document.getElementById("chatInput");

    if (chatInput) {
        chatInput.value = message;
        sendMessage();
    }
}

function handleChatKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function detectRequestedProduct(message) {
    const text = message.toLowerCase();

    const productKeywords = [
        {
            keywords: ["iphone"],
            productName: "iPhone 15"
        },
        {
            keywords: ["mobile", "phone", "smartphone"],
            productName: "Samsung Galaxy A15"
        },
        {
            keywords: ["tablet"],
            productName: "Android Tablet"
        },
        {
            keywords: ["shoe", "shoes", "sneaker", "sneakers"],
            productName: "Classic Sneakers"
        },
        {
            keywords: ["headphone", "headphones", "audio"],
            productName: "Wireless Headphones"
        },
        {
            keywords: ["watch", "smartwatch"],
            productName: "Smart Watch"
        },
        {
            keywords: ["hoodie", "sweatshirt"],
            productName: "Oversized Hoodie"
        },
        {
            keywords: ["backpack", "college bag"],
            productName: "Urban Backpack"
        },
        {
            keywords: ["sunglass", "sunglasses"],
            productName: "Premium Sunglasses"
        },
        {
            keywords: ["keyboard"],
            productName: "Mechanical Keyboard"
        },
        {
            keywords: ["lamp", "desk light"],
            productName: "Smart Desk Lamp"
        },
        {
            keywords: ["speaker"],
            productName: "Bluetooth Speaker"
        },
        {
            keywords: ["power bank"],
            productName: "Power Bank"
        }
    ];

    for (const item of productKeywords) {
        for (const keyword of item.keywords) {
            if (text.includes(keyword)) {
                return item.productName;
            }
        }
    }

    return "";
}

function detectCategory(message) {
    const text = message.toLowerCase();

    if (
        text.includes("mobile") ||
        text.includes("phone") ||
        text.includes("tablet") ||
        text.includes("smartphone")
    ) {
        return "mobile";
    }

    if (
        text.includes("electronic") ||
        text.includes("gaming") ||
        text.includes("technology") ||
        text.includes("headphone") ||
        text.includes("keyboard") ||
        text.includes("speaker")
    ) {
        return "electronics";
    }

    if (
        text.includes("fashion") ||
        text.includes("clothing") ||
        text.includes("dress") ||
        text.includes("shirt") ||
        text.includes("jeans") ||
        text.includes("hoodie") ||
        text.includes("shoe")
    ) {
        return "fashion";
    }

    if (
        text.includes("accessor") ||
        text.includes("college bag") ||
        text.includes("backpack") ||
        text.includes("wallet") ||
        text.includes("sunglass")
    ) {
        return "accessories";
    }

    if (
        text.includes("home") ||
        text.includes("lamp") ||
        text.includes("bottle") ||
        text.includes("room")
    ) {
        return "home";
    }

    return "";
}

function detectBudget(message) {
    const budgetMatch =
        message.match(/₹?\s?(\d{3,6})/);

    if (budgetMatch) {
        return Number(budgetMatch[1]);
    }

    return 0;
}

function getRecommendation(message) {
    const text = message.toLowerCase();

    if (
        text === "hi" ||
        text === "hello" ||
        text.includes("good morning") ||
        text.includes("good evening")
    ) {
        return "Hello! 👋 Tell me what product you need and your budget.";
    }

    if (
        text.includes("offer") ||
        text.includes("discount")
    ) {
        return "🎁 Visit the Offers section to view our special discount.";
    }

    if (
        text.includes("cart") ||
        text.includes("basket")
    ) {
        return "🛒 You can open your cart to see your selected products.";
    }

    if (
        text.includes("cheapest") ||
        text.includes("cheap product")
    ) {
        const cheapest = [...products].sort(function (a, b) {
            return a.price - b.price;
        })[0];

        return `The cheapest product is ${cheapest.name} for ₹${cheapest.price.toLocaleString("en-IN")}.`;
    }

    const requestedProductName =
        detectRequestedProduct(message);

    const selectedCategory =
        detectCategory(message);

    const userBudget =
        detectBudget(message);

    if (requestedProductName) {
        const exactProduct = products.find(function (product) {
            return product.name === requestedProductName;
        });

        if (exactProduct) {
            if (
                userBudget > 0 &&
                exactProduct.price > userBudget
            ) {
                return `${exactProduct.name} costs ₹${exactProduct.price.toLocaleString("en-IN")}, which is above your budget of ₹${userBudget.toLocaleString("en-IN")}.`;
            }

            return `🤖 I recommend ${exactProduct.name} for ₹${exactProduct.price.toLocaleString("en-IN")}.`;
        }
    }

    let recommendations = products.filter(function (product) {
        const matchesCategory =
            selectedCategory === "" ||
            product.category === selectedCategory;

        const matchesBudget =
            userBudget === 0 ||
            product.price <= userBudget;

        return matchesCategory && matchesBudget;
    });

    recommendations.sort(function (a, b) {
        return a.price - b.price;
    });

    if (recommendations.length > 0) {
        const bestProduct = recommendations[0];

        return `🤖 I recommend ${bestProduct.name} for ₹${bestProduct.price.toLocaleString("en-IN")}.`;
    }

    if (userBudget > 0) {
        return `Sorry, I could not find a product under ₹${userBudget.toLocaleString("en-IN")}.`;
    }

    return "Please tell me what you need. Example: Suggest a mobile under ₹15000.";
}

function sendMessage() {
    const chatInput =
        document.getElementById("chatInput");

    const chatMessages =
        document.getElementById("chatMessages");

    if (!chatInput || !chatMessages) {
        return;
    }

    const message =
        chatInput.value.trim();

    if (message === "") {
        return;
    }

    const userMessage =
        document.createElement("p");

    userMessage.className = "user-message";
    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);

    const reply =
        getRecommendation(message);

    const botMessage =
        document.createElement("p");

    botMessage.className = "bot-message";
    botMessage.textContent = reply;

    chatMessages.appendChild(botMessage);

    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================
   INITIALIZE WEBSITE
========================= */

document.addEventListener("DOMContentLoaded", function () {
    loadProductsFromBackend();
    updateCartCount();
    loadTheme();
    loadLoggedInUser();
});