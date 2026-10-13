// FLORA MODA FITNESS - APP.JS

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Elementos
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.querySelector('.modal-close');
    const cartModal = document.getElementById('cartModal');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const newsletterForm = document.getElementById('newsletterForm');
    const continueShopping = document.getElementById('continueShopping');

    // Carrinho
    let cart = JSON.parse(localStorage.getItem('floraCart')) || [];

    // Eventos
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('ativo');
        updateCartDisplay();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('ativo');
    });

    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target.id === 'cartModal') {
            cartModal.classList.remove('ativo');
        }
    });

    continueShopping.addEventListener('click', () => {
        cartModal.classList.remove('ativo');
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Obrigado por se inscrever!');
        newsletterForm.reset();
    });

    // Inicializar UI
    updateCartCount();
}

function addToCart(e) {
    const btn = e.target;
    const product = btn.closest('.product-card');
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const tamanho = product.querySelector('.size-btn.active')?.textContent || 'M';

    const item = { id, name, price, tamanho };
    let cart = JSON.parse(localStorage.getItem('floraCart')) || [];
    cart.push(item);
    localStorage.setItem('floraCart', JSON.stringify(cart));

    updateCartCount();
    
    // Feedback visual
    const original = btn.textContent;
    btn.textContent = '✓ Adicionado!';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
    }, 1500);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('floraCart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('floraCart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div>
                    <div style="font-weight: 600;">${item.name}</div>
                    <div style="font-size: 0.875rem; color: #555;">Tamanho: ${item.tamanho}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 700; color: #C4324D;">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #f44336; cursor: pointer; font-size: 0.75rem; margin-top: 0.25rem;">Remover</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('floraCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('floraCart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}
