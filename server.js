const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise'); // keep ONLY this mysql line

const app = express();
const PORT = 3000;
// ====== MySQL CONFIG - CHANGE PASSWORD IF NEEDED ======

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',          // or your MySQL user
  password: 'root',  // <--- set it here
  database: 'aissa'
});
// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ====== PRODUCT DATA ======
const products = [
  {
    id: 1,
    name: 'Sony WF-1000XM5 Earbuds',
    price: 11990,
    originalPrice: 29990,
    discount: 17,
    rating: 4.8,
    reviews: 12500,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'earbuds',
    sustainability: 85
  },
  {
    id: 2,
    name: 'Dell XPS 13 Laptop',
    price: 101990,
    originalPrice: 129990,
    discount: 12,
    rating: 4.7,
    reviews: 4300,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'laptop',
    sustainability: 80
  },
  {
    id: 3,
    name: 'Samsung Galaxy Watch 6',
    price: 19999,
    originalPrice: 39999,
    discount: 18,
    rating: 4.6,
    reviews: 8500,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'watch',
    sustainability: 75
  },
  {
    id: 4,
    name: 'boAt Nirvana 525 Speaker',
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    rating: 4.4,
    reviews: 15600,
    image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'speaker',
    sustainability: 65
  },
  {
    id: 5,
    name: 'OnePlus 12R Phone',
    price: 39999,
    originalPrice: 45999,
    discount: 13,
    rating: 4.5,
    reviews: 9200,
    image: 'https://images.unsplash.com/photo-1592899677977-9e10ca6a1a39?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'phone',
    sustainability: 60
  },
  {
    id: 6,
    name: 'Apple AirPods Pro 2',
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    rating: 4.7,
    reviews: 28000,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aac6ab96f7?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'earbuds',
    sustainability: 70
  }
];

// In-memory carts: sessionId -> [items]
const carts = {};

// ====== PRODUCTS & CART API ======
app.get('/api/products', (req, res) => {
  let result = [...products];
  if (req.query.eco === 'true') {
    result.sort((a, b) => b.sustainability - a.sustainability);
  }
  res.json(result);
});

app.get('/api/cart', (req, res) => {
  const session = req.headers['x-session'] || 'default';
  res.json(carts[session] || []);
});

app.post('/api/cart/add', (req, res) => {
  const session = req.headers['x-session'] || 'default';
  const { productId } = req.body || {};

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  carts[session] = carts[session] || [];
  const existing = carts[session].find(i => i.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    carts[session].push({ ...product, quantity: 1 });
  }

  res.json(carts[session]);
});

// ====== PAYMENT API (saves into MySQL payments table) ======
app.post('/api/payments/mock', async (req, res) => {
  const session = req.headers['x-session'] || 'default';
  const method = (req.body && req.body.method) || 'unknown';
  const items = carts[session] || [];

  const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (amount <= 0) {
    return res.status(400).json({ success: false, error: 'Cart is empty' });
  }

  const orderId = 'ORD' + Date.now();

  try {
    await db.execute(
      'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
      [orderId, amount, method, 'SUCCESS']
    );

    // Optional: clear cart after payment
    // carts[session] = [];

    res.json({ success: true, orderId });
  } catch (err) {
    console.error('Payment DB error:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// ====== SIMPLE CHATBOT ======
app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  const text = (message || '').toLowerCase();

  let reply = "Try asking 'best earbuds', 'laptop suggestions', or 'phone under 40000'.";

  if (text.includes('hi') || text.includes('hello')) {
    reply = "Hi! I'm AISSA. I can help you with earbuds, phones, laptops, speakers and more. Tell me a budget or a category.";
  } else if (text.includes('earbud') || text.includes('airpods')) {
    reply = "Top earbuds here are Sony WF‑1000XM5 and AirPods Pro 2.";
  } else if (text.includes('laptop')) {
    reply = "Dell XPS 13 is a premium thin‑and‑light laptop with a great display.";
  } else if (text.includes('phone') || text.includes('mobile')) {
    reply = "OnePlus 12R at ₹39,999 has Snapdragon 8 Gen 2 and 120Hz display.";
  } else if (text.includes('speaker')) {
    reply = "boAt Nirvana 525 Speaker at ₹4,499 (44% OFF) is loud and budget friendly.";
  } else if (text.includes('watch')) {
    reply = "Samsung Galaxy Watch 6 offers AMOLED display and health tracking.";
  } else if (text.includes('under') || text.includes('budget')) {
    const m = text.match(/(\d+)/);
    if (m) {
      const b = parseInt(m[1], 10);
      if (b <= 5000) reply = "Under ₹5000: boAt Nirvana 525 Speaker at ₹4,499 is ideal.";
      else if (b <= 25000) reply = "Under ₹25,000: AirPods Pro 2 (₹19,999) or Sony WF‑1000XM5 if you stretch a bit.";
      else if (b <= 50000) reply = "Under ₹50,000: OnePlus 12R phone is a strong choice.";
      else reply = "With that budget you can consider Dell XPS 13 or multiple gadgets.";
    }
  }

  res.json({ message: reply });
});

// ====== FRONTEND ======
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log('========================================');
  console.log('AISSA server running at http://localhost:' + PORT);
  console.log('========================================');
});
// ... existing code ...-
