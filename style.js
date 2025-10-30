// Data menu makanan
const menuMakanan = [
  { id: 1, name: "Indomie Nyemek", price: 18000, image: "images/im.jpeg", category: "makanan" },
  { id: 2, name: "Nasi Mangkok Gyu-Tamago", price: 30000, image: "images/nmg.jpeg", category: "makanan" },
  { id: 3, name: "asi Mangkok Golden Trio", price: 35000, image: "images/rice bowl ebi furai dan beef teriyaki .jpeg", category: "makanan" },
  { id: 4, name: "Nasi Mangkok Golden Crunch", price: 28000, image: "images/ebi furai rice bowl .jpeg", category: "makanan" },
  { id: 5, name: "Dupi Nasgor Spesial", price: 23000, image: "images/nasi goreng telur.jpeg", category: "makanan" },
  { id: 6, name: "Tahu Cabe Garem", price: 15000, image: "images/tahu crispy sambal bawang.jpeg", category: "makanan" },
  // Makanan tambahan
  { id: 19, name: "Nasi Ayam Bumbu Hitam", price: 23000, image: "images/nasyam.jpeg", category: "makanan" },
  { id: 20, name: "Nasi Bebek Bumbu Hitam", price: 28000, image: "images/nasbekh.jpg", category: "makanan" },
  { id: 21, name: "Kentang Goreng (French Fries)", price: 18000, image: "images/kentang goreng (French fries).jpeg", category: "makanan" },
  { id: 22, name: "Roti Panggang Coklat Keju", price: 12000, image: "images/rotbag.jpg", category: "makanan" },
];

// Data menu minuman
const menuMinuman = [
  { id: 7, name: "Ice Coklat Susu", price: 13000, image: "images1/Ice coklat1.jpeg", category: "minuman" },
  { id: 8, name: "Ice Owreo Susu", price: 15000, image: "images1/ice oreo.jpeg", category: "minuman" },
  { id: 9, name: "Ice Dino Coklat Sport Susu", price: 15000, image: "images1/ice dino.jpeg", category: "minuman" },
  { id: 10, name: "Ice Coklat Hazelnut Susu", price: 13000, image: "images1/ice coklat.jpeg", category: "minuman" },
  { id: 11, name: "Ice Matcha Susu", price: 13000, image: "images1/Ice green.jpeg", category: "minuman" },
  { id: 12, name: "Ice Kurma Susu", price: 13000, image: "images1/ice kurma.jpeg", category: "minuman" },
  // Minuman tambahan
  { id: 29, name: "Ice Anggur Susu", price: 13000, image: "images1/ice anggur.jpeg", category: "minuman" },
  { id: 30, name: "Ice Taro Susu", price: 13000, image: "images1/icetar.jpeg", category: "minuman" },
  { id: 31, name: "Ice Thai Tea Susu", price: 13000, image: "images1/ice thai.jpeg", category: "minuman" },
  { id: 32, name: "Ice Regal Susu", price: 15000, image: "images1/regal.jpg", category: "minuman" },
  { id: 33, name: "Ice Kopsus Regal", price: 20000, image: "images1/kopreg.jpg", category: "minuman" },
  { id: 34, name: "Ice Kopsus Caramel", price: 20000, image: "images1/kopka.jpg", category: "minuman" },
  { id: 35, name: "Ice Kopsus Aren", price: 17000, image: "images1/kopar.jpeg", category: "minuman" },
  { id: 36, name: "Air Mineral", price: 5000, image: "images1/air.jpg", category: "minuman" },
];

// Data menu kopi spesial
const menuKopi = [
  { id: 13, name: "Hot Mardupicano Arent", price: 13000, image: "images2/hot arent.jpeg", category: "kopi" },
  { id: 14, name: "Hot Mardupicano", price: 10000, image: "images2/hotmar.jpeg", category: "kopi" },
  { id: 15, name: "Extra Shoot", price: 8000, image: "images2/ekstra.jpeg", category: "kopi" },
];

// State aplikasi
let cart = [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
  renderAllMenus();
  renderCart();
  renderOrderHistory();
  setupMenuTabs();
  
  // Event listeners
  document.getElementById('lanjut-checkout').addEventListener('click', showCheckout);
  document.getElementById('checkout-form').addEventListener('submit', processPayment);
  document.getElementById('lanjut-dapur').addEventListener('click', showDapur);
  document.getElementById('lanjut-pengiriman').addEventListener('click', showPengiriman);
  document.getElementById('selesai').addEventListener('click', completeOrder);
  document.getElementById('clear-cart').addEventListener('click', clearCart);
  document.getElementById('cancel-edit').addEventListener('click', closeEditModal);
  document.getElementById('edit-form').addEventListener('submit', saveEdit);
});

// Setup menu tabs
function setupMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Render semua menu
function renderAllMenus() {
  renderMenu('menu-makanan', menuMakanan, 'Makanan');
  renderMenu('menu-minuman', menuMinuman, 'Minuman');
  renderMenu('menu-kopi', menuKopi, 'Kopi Spesial');
}

// Render menu berdasarkan kategori
function renderMenu(containerId, items, category) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  items.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = `menu-item ${category.toLowerCase()}`;
    menuItem.innerHTML = `
      <div class="category-badge">${category}</div>
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
      <h3>${item.name}</h3>
      <p class="price">Rp ${item.price.toLocaleString('id-ID')}</p>
    `;
    menuItem.addEventListener('click', () => addToCart(item));
    container.appendChild(menuItem);
  });
}

// CREATE: Tambah item ke keranjang
function addToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      catatan: '',
      category: item.category
    });
  }
  
  renderCart();
  showNotification(`${item.name} ditambahkan ke keranjang`);
}

// READ: Render keranjang
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const emptyCart = document.getElementById('empty-cart');
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    totalElement.textContent = '0';
    return;
  }
  
  emptyCart.style.display = 'none';
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</div>
        ${item.catatan ? `<div class="cart-item-catatan"><small>Catatan: ${item.catatan}</small></div>` : ''}
      </div>
      <div class="cart-item-controls">
        <button class="decrease" data-id="${item.id}">-</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="edit-btn" data-id="${item.id}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  // Update total
  totalElement.textContent = total.toLocaleString('id-ID');
  
  // Add event listeners for cart controls
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').dataset.id);
      increaseQuantity(id);
    });
  });
  
  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').dataset.id);
      decreaseQuantity(id);
    });
  });
  
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').dataset.id);
      openEditModal(id);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').dataset.id);
      removeFromCart(id);
    });
  });
}

// UPDATE: Increase item quantity
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    renderCart();
    showNotification(`Jumlah ${item.name} ditambah menjadi ${item.quantity}`);
  }
}

// UPDATE: Decrease item quantity
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    renderCart();
    showNotification(`Jumlah ${item.name} dikurangi menjadi ${item.quantity}`);
  }
}

// UPDATE: Open edit modal
function openEditModal(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    document.getElementById('edit-item-id').value = item.id;
    document.getElementById('edit-item-name').value = item.name;
    document.getElementById('edit-item-price').value = item.price;
    document.getElementById('edit-item-quantity').value = item.quantity;
    document.getElementById('edit-item-catatan').value = item.catatan || '';
    
    document.getElementById('edit-modal').style.display = 'flex';
  }
}

// UPDATE: Save edit
function saveEdit(e) {
  e.preventDefault();
  
  const id = parseInt(document.getElementById('edit-item-id').value);
  const quantity = parseInt(document.getElementById('edit-item-quantity').value);
  const catatan = document.getElementById('edit-item-catatan').value;
  
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
    item.catatan = catatan;
    renderCart();
    closeEditModal();
    showNotification(`${item.name} berhasil diupdate`);
  }
}

// UPDATE: Close edit modal
function closeEditModal() {
  document.getElementById('edit-modal').style.display = 'none';
  document.getElementById('edit-form').reset();
}

// DELETE: Remove item from cart
function removeFromCart(id) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    const itemName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    renderCart();
    showNotification(`${itemName} dihapus dari keranjang`);
  }
}

// DELETE: Clear entire cart
function clearCart() {
  if (cart.length === 0) {
    showNotification('Keranjang sudah kosong!');
    return;
  }
  
  if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
    cart = [];
    renderCart();
    showNotification('Keranjang berhasil dikosongkan');
  }
}

// Show checkout form
function showCheckout() {
  if (cart.length === 0) {
    showNotification('Keranjang masih kosong!');
    return;
  }
  
  document.getElementById('modul-keranjang').style.display = 'none';
  document.getElementById('modul-checkout').style.display = 'block';
}

// Process payment
function processPayment(e) {
  e.preventDefault();
  
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const metodePembayaran = document.getElementById('metode-pembayaran').value;
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Show payment info
  document.getElementById('modul-checkout').style.display = 'none';
  document.getElementById('modul-pembayaran').style.display = 'block';
  
  const infoPembayaran = document.getElementById('info-pembayaran');
  infoPembayaran.innerHTML = `
    <h3>Detail Pembayaran</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Alamat:</strong> ${alamat}</p>
    <p><strong>Metode Pembayaran:</strong> ${metodePembayaran}</p>
    <p><strong>Total Pembayaran:</strong> Rp ${total.toLocaleString('id-ID')}</p>
    <p>Silakan selesaikan pembayaran Anda</p>
  `;
}

// Show dapur module
function showDapur() {
  document.getElementById('modul-pembayaran').style.display = 'none';
  document.getElementById('modul-dapur').style.display = 'block';
}

// Show pengiriman module
function showPengiriman() {
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  
  document.getElementById('modul-dapur').style.display = 'none';
  document.getElementById('modul-pengiriman').style.display = 'block';
  
  const infoPengiriman = document.getElementById('info-pengiriman');
  infoPengiriman.innerHTML = `
    <h3>Detail Pengiriman</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Alamat:</strong> ${alamat}</p>
    <p><strong>Status:</strong> Pesanan sedang dalam perjalanan</p>
    <p>Perkiraan sampai: 30-45 menit</p>
  `;
}

// Complete order
function completeOrder() {
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const metodePembayaran = document.getElementById('metode-pembayaran').value;
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create order object
  const order = {
    id: Date.now(),
    nama,
    alamat,
    metodePembayaran,
    items: [...cart],
    total,
    date: new Date().toLocaleString('id-ID')
  };
  
  // Add to order history
  orderHistory.unshift(order);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  
  // Reset cart and form
  cart = [];
  document.getElementById('checkout-form').reset();
  
  // Show success message
  showNotification('Pesanan berhasil diselesaikan! Terima kasih.');
  
  // Return to initial state
  document.getElementById('modul-pengiriman').style.display = 'none';
  document.getElementById('modul-keranjang').style.display = 'block';
  
  // Update UI
  renderCart();
  renderOrderHistory();
}

// Render order history
function renderOrderHistory() {
  const riwayatElement = document.getElementById('riwayat');
  const emptyHistory = document.getElementById('empty-history');
  
  riwayatElement.innerHTML = '';
  
  if (orderHistory.length === 0) {
    emptyHistory.style.display = 'block';
    return;
  }
  
  emptyHistory.style.display = 'none';
  
  orderHistory.forEach(order => {
    const riwayatItem = document.createElement('div');
    riwayatItem.className = 'riwayat-item';
    
    const itemsList = order.items.map(item => 
      `${item.name} (${item.quantity}x)${item.catatan ? ` - ${item.catatan}` : ''}`
    ).join(', ');
    
    riwayatItem.innerHTML = `
      <div class="riwayat-header">
        <span class="riwayat-nama">${order.nama}</span>
        <span class="riwayat-tanggal">${order.date}</span>
      </div>
      <div class="riwayat-detail">
        <p><strong>Items:</strong> ${itemsList}</p>
        <p><strong>Total:</strong> Rp ${order.total.toLocaleString('id-ID')}</p>
        <p><strong>Metode Bayar:</strong> ${order.metodePembayaran}</p>
      </div>
    `;
    
    riwayatElement.appendChild(riwayatItem);
  });
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    z-index: 1000;
    transform: translateX(150%);
    transition: transform 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(150%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}