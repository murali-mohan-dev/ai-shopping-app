# ai-shopping-website
AI Smart Shoping Website
Team Name:Tech titans

MEMBERS:
1.Yuvan Shankar S
2.Murali Mohan M A 
3.Siddharth R
4.Rojin N Reji


Problem Statement:
1 Too many product options → confusion 
2 Hard to compare products across different platforms
3 Reviews are long, fake, or unreliable
4 Takes too much time to choose the right product 
5 Lack of personalized, conversational recommendations

Solution:
1.Natural Language Understanding:
· User types or speaks a query like "Best phone under ₹20,000 for gaming"
· AI extracts: budget, usage, must-have features, preferences.
2.Smart Product Fetching:
. Fetches live product data from multiple sources via APIs
· Filters products based on extracted user needs
3. Intelligent Comparison
· Compares prices, specs, and reviews across platforms.
· Creates a unified comparison table .
4. Fast Decision Making
· Reduces decision time from 30+ minutes → under 10 seconds
7. Clean Chat Interface
· Simple, minimal UI .

Key Features:
1.AI chat-based assistant  
2.Smart comparison.  
3.Personalized recommendations  
4.Fake review detection  
5.Clean modern UI  

Goal:To make the online shoping fast,intelligent and stress-free using AI




<!-- START OF index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AISSA - AI Smart Shopping Assistant</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#f5f5f7;color:#222}
    a{text-decoration:none;color:inherit}
    .header{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:15px 30px;display:flex;align-items:center;justify-content:space-between}
    .header-left{display:flex;align-items:center;gap:12px}
    .logo-icon{width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:20px}
    .logo-text{font-size:24px;font-weight:700;letter-spacing:1px}
    .header-right{display:flex;align-items:center;gap:16px}
    .budget-box{display:flex;align-items:center;gap:10px}
    .budget-input{padding:8px 14px;border-radius:8px;border:none;outline:none;width:200px}
    .btn-primary{padding:8px 18px;border:none;border-radius:8px;background:#4c51bf;color:#fff;cursor:pointer;font-weight:500}
    .icon-btn{width:40px;height:40px;border-radius:12px;border:none;background:rgba(255,255,255,0.16);color:#fff;cursor:pointer;position:relative}
    .icon-btn .badge{position:absolute;top:-4px;right:-4px;width:18px;height:18px;border-radius:50%;background:#ff4757;font-size:11px;display:flex;align-items:center;justify-content:center}
    .top-controls{padding:12px 30px;background:#fff;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;gap:18px}
    .eco-label{display:flex;align-items:center;gap:8px;font-size:14px;color:#2f855a}
    .switch{position:relative;display:inline-block;width:50px;height:26px}
    .switch input{opacity:0;width:0;height:0}
    .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#cbd5e0;transition:.3s;border-radius:26px}
    .slider:before{position:absolute;content:"";height:20px;width:20px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%}
    input:checked + .slider{background:#48bb78}
    input:checked + .slider:before{transform:translateX(24px)}
    .page{max-width:1400px;margin:20px auto;padding:0 30px 40px;display:grid;grid-template-columns:3fr 1.1fr;gap:25px}
    .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
    .card{background:#fff;border-radius:18px;box-shadow:0 4px 18px rgba(15,23,42,.12);overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
    .card:hover{transform:translateY(-3px);box-shadow:0 10px 25px rgba(15,23,42,.18)}
    .card-img{position:relative;padding:14px 14px 0;height:210px;display:flex;align-items:center;justify-content:center}
    .card-img img{width:100%;height:190px;border-radius:16px;object-fit:cover}
    .eco-pill{position:absolute;top:18px;left:18px;background:#22c55e;color:#fff;font-size:12px;padding:4px 10px;border-radius:999px;display:flex;align-items:center;gap:4px}
    .wish-btn{position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,0.92);cursor:pointer;display:flex;align-items:center;justify-content:center;color:#e11d48}
    .wish-btn.active{background:#e11d48;color:#fff}
    .card-body{padding:16px 18px 16px}
    .title{font-size:15px;font-weight:600;margin-bottom:6px}
    .rating{font-size:13px;color:#a0aec0;margin-bottom:8px}
    .rating i{color:#f6ad55;margin-right:4px}
    .price-row{display:flex;align-items:flex-end;gap:10px;margin-bottom:8px}
    .price-main{font-size:20px;font-weight:700;color:#2563eb}
    .price-old{text-decoration:line-through;font-size:13px;color:#94a3b8}
    .tag-off{font-size:11px;background:#22c55e;color:#fff;padding:2px 8px;border-radius:999px}
    .meta-row{font-size:11px;color:#94a3b8;margin-bottom:10px}
    .actions{display:flex;gap:10px}
    .btn-secondary{flex:1;padding:9px 0;border-radius:10px;border:1px solid #e2e8f0;background:#f8fafc;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;gap:6px}
    .btn-buy{flex:1;padding:9px 0;border-radius:10px;border:none;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;gap:6px}
    .cart-panel{background:#fff;border-radius:18px;box-shadow:0 4px 18px rgba(15,23,42,.12);padding:18px 18px 16px;display:flex;flex-direction:column;height:100%}
    .cart-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .cart-header-title{font-weight:600;font-size:15px;display:flex;align-items:center;gap:8px}
    .cart-items{flex:1;overflow-y:auto;padding-right:4px;margin-bottom:10px}
    .cart-empty{font-size:13px;color:#94a3b8;text-align:center;margin-top:35px}
    .cart-item{display:flex;gap:10px;padding:8px;border-radius:12px;background:#f8fafc;margin-bottom:8px}
    .cart-item-img img{width:54px;height:54px;border-radius:10px;object-fit:cover}
    .cart-item-main{flex:1}
    .cart-item-name{font-size:13px;font-weight:500;margin-bottom:4px}
    .cart-item-price{font-size:13px;color:#2563eb;font-weight:600}
    .qty-row{font-size:12px;color:#94a3b8}
    .cart-footer{border-top:1px solid #e2e8f0;padding-top:10px}
    .cart-total-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;font-size:14px}
    .cart-total-row strong{font-size:16px;color:#2563eb}
    .cart-checkout{width:100%;padding:10px 0;border-radius:10px;border:none;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;cursor:pointer;font-size:14px}
    .toast{position:fixed;top:90px;right:22px;background:#fff;border-radius:12px;padding:12px 16px;box-shadow:0 10px 30px rgba(15,23,42,.25);display:none;z-index:9999;border-left:4px solid #22c55e;min-width:230px}
    .toast.show{display:block;animation:slideIn .25s ease-out}
    @keyframes slideIn{from{transform:translateX(120%)}to{transform:translateX(0)}}
    .toast-title{font-weight:600;font-size:14px;margin-bottom:2px}
    .toast-msg{font-size:12px;color:#64748b}
    .chat-fab{position:fixed;right:26px;bottom:26px;width:56px;height:56px;border-radius:50%;border:none;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:20px;cursor:pointer;box-shadow:0 10px 30px rgba(15,23,42,.35)}
    .chat-window{position:fixed;right:26px;bottom:96px;width:340px;border-radius:18px;background:#fff;box-shadow:0 12px 35px rgba(15,23,42,.4);display:none;flex-direction:column;overflow:hidden;z-index:999}
    .chat-window.open{display:flex}
    .chat-header{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px}
    .chat-header-avatar{width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center}
    .chat-header-text{font-size:13px}
    .chat-header-text strong{display:block;font-size:14px}
    .chat-body{height:260px;padding:10px 12px;overflow-y:auto;background:#f8fafc;display:flex;flex-direction:column;gap:8px}
    .msg{max-width:80%;padding:8px 11px;border-radius:14px;font-size:13px;line-height:1.3}
    .msg.ai{align-self:flex-start;background:#e5edff}
    .msg.user{align-self:flex-end;background:#4c51bf;color:#fff}
    .chat-input-row{padding:10px;border-top:1px solid #e2e8f0;background:#fff;display:flex;align-items:center;gap:8px}
    .chat-input-row input{flex:1;border-radius:999px;border:1px solid #cbd5e0;padding:8px 12px;font-size:13px;outline:none}
    .mic-btn{width:34px;height:34px;border-radius:50%;border:none;background:#4c51bf;color:#fff;cursor:pointer;font-size:14px}
    .mic-btn.listening{background:#e11d48;animation:pulse 1s infinite}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
    .send-btn{width:34px;height:34px;border-radius:50%;border:none;background:#4c51bf;color:#fff;cursor:pointer;font-size:14px}
    .modal{position:fixed;inset:0;background:rgba(15,23,42,.55);display:none;align-items:center;justify-content:center;z-index:9999}
    .modal.show{display:flex}
    .modal-box{width:90%;max-width:420px;background:#fff;border-radius:18px;padding:20px 22px}
    .modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
    .modal-header h3{font-size:18px}
    .close-btn{border:none;background:none;font-size:20px;cursor:pointer}
    .pay-tabs{display:flex;gap:8px;margin-bottom:16px}
    .pay-tab{flex:1;padding:9px;border-radius:10px;border:1px solid #e2e8f0;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}
    .pay-tab.active{border-color:#4c51bf;background:#eef2ff;color:#4c51bf}
    .pay-section{display:none}
    .pay-section.active{display:block}
    .form-group{margin-bottom:10px}
    .form-group label{display:block;font-size:12px;margin-bottom:4px;color:#475569}
    .form-group input{width:100%;padding:8px 10px;border-radius:8px;border:1px solid #cbd5e0;font-size:13px;outline:none}
    .pay-main-btn{width:100%;padding:10px 0;border-radius:10px;border:none;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:14px;cursor:pointer;margin-top:10px}
    .upi-qr{padding:14px;border-radius:12px;background:#f8fafc;text-align:center;margin-bottom:10px}
    .upi-qr i{font-size:56px;color:#4c51bf;margin-bottom:4px}
    .cod-info{text-align:center;padding:14px 8px}
    .cod-info i{font-size:46px;color:#22c55e;margin-bottom:6px}
    .cod-info p{font-size:13px;color:#475569}
    .cod-info small{display:block;margin-top:4px;color:#94a3b8}
    @media(max-width:960px){.page{grid-template-columns:1fr}.cart-panel{order:-1;margin-bottom:16px}}
  </style>
</head>
<body>
  <header class="header">
    <div class="header-left">
      <div class="logo-icon"><i class="fas fa-robot"></i></div>
      <div class="logo-text">AISSA</div>
    </div>
    <div class="header-right">
      <div class="budget-box">
        <input id="budgetInput" class="budget-input" placeholder="Budget (e.g. 5000 less)">
        <button class="btn-primary" onclick="applyBudget()">Apply</button>
      </div>
      <button class="icon-btn" onclick="openWishlistToast()">
        <i class="fas fa-heart"></i>
        <span class="badge" id="wishBadge">0</span>
      </button>
      <button class="icon-btn" onclick="openCartToast()">
        <i class="fas fa-shopping-cart"></i>
        <span class="badge" id="cartBadge">0</span>
      </button>
    </div>
  </header>

  <section class="top-controls">
    <div class="eco-label">
      <i class="fas fa-leaf"></i>
      <span>Eco Mode</span>
      <label class="switch">
        <input type="checkbox" id="ecoToggle" onchange="toggleEco()">
        <span class="slider"></span>
      </label>
    </div>
  </section>

  <main class="page">
    <section class="products-grid" id="productsGrid"></section>

    <aside class="cart-panel">
      <div class="cart-header">
        <div class="cart-header-title">
          <i class="fas fa-shopping-cart"></i>
          <span>Your Cart</span>
        </div>
        <span style="font-size:12px;color:#94a3b8" id="cartCountLabel">0 items</span>
      </div>
      <div class="cart-items" id="cartItems">
        <div class="cart-empty">Cart is empty</div>
      </div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span>Total</span>
          <strong id="cartTotal">₹0</strong>
        </div>
        <button class="cart-checkout" onclick="openPaymentModal()">
          <i class="fas fa-lock"></i> Checkout securely
        </button>
      </div>
    </aside>
  </main>

  <button class="chat-fab" onclick="toggleChatWindow()">
    <i class="fas fa-comment"></i>
  </button>

  <div class="chat-window" id="chatWindow">
    <div class="chat-header">
      <div class="chat-header-avatar"><i class="fas fa-robot"></i></div>
      <div class="chat-header-text">
        <strong>AISSA Assistant</strong>
        <span style="font-size:11px;opacity:.8">Helps you pick the best gadgets</span>
      </div>
    </div>
    <div class="chat-body" id="chatBody">
      <div class="msg ai">
        Hi! I'm AISSA. Ask me for earbuds, phones, laptops or a budget like "earbuds under 3000".
      </div>
    </div>
    <div class="chat-input-row">
      <button class="mic-btn" id="micBtn" onclick="toggleVoice()"><i class="fas fa-microphone"></i></button>
      <input id="chatInput" placeholder="Ask about products, deals, or budget..." onkeypress="if(event.key==='Enter')sendChat()">
      <button class="send-btn" onclick="sendChat()"><i class="fas fa-paper-plane"></i></button>
    </div>
  </div>

  <div class="modal" id="paymentModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Complete Payment</h3>
        <button class="close-btn" onclick="closePaymentModal()">&times;</button>
      </div>
      <p style="font-size:13px;color:#64748b;margin-bottom:10px">
        Pay for your items securely using card, UPI, or cash on delivery.
      </p>
      <div class="pay-tabs">
        <button class="pay-tab active" id="tab-card" onclick="selectPayMethod('card')">
          <i class="fas fa-credit-card"></i> Card
        </button>
        <button class="pay-tab" id="tab-upi" onclick="selectPayMethod('upi')">
          <i class="fas fa-qrcode"></i> UPI
        </button>
        <button class="pay-tab" id="tab-cod" onclick="selectPayMethod('cod')">
          <i class="fas fa-truck"></i> COD
        </button>
      </div>
      <div class="pay-section active" id="pay-card">
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" oninput="formatCardNumber(this)">
        </div>
        <div style="display:flex;gap:8px">
          <div class="form-group" style="flex:1">
            <label>Expiry</label>
            <input type="text" placeholder="MM/YY">
          </div>
          <div class="form-group" style="flex:1">
            <label>CVV</label>
            <input type="password" placeholder="123" maxlength="3">
          </div>
        </div>
        <div class="form-group">
          <label>Name on Card</label>
          <input type="text" placeholder="John Doe">
        </div>
      </div>
      <div class="pay-section" id="pay-upi">
        <div class="upi-qr">
          <i class="fas fa-qrcode"></i>
          <div style="font-size:13px;color:#475569">Scan this QR using any UPI app</div>
        </div>
        <div class="form-group">
          <label>Or Enter UPI ID</label>
          <input type="text" placeholder="yourname@upi">
        </div>
      </div>
      <div class="pay-section" id="pay-cod">
        <div class="cod-info">
          <i class="fas fa-box"></i>
          <p>Pay in cash when your order is delivered.</p>
          <p id="codAmountText"></p>
          <small>₹50 COD handling fee may apply in some areas.</small>
        </div>
      </div>
      <button class="pay-main-btn" id="payMainBtn" onclick="processPayment()">
        <i class="fas fa-lock"></i> Pay Now
      </button>
    </div>
  </div>

  <div class="toast" id="toast">
    <div class="toast-title" id="toastTitle">Success</div>
    <div class="toast-msg" id="toastMsg">Message here</div>
  </div>

  <script>
    let products=[],cart=[],wishlist=[],ecoMode=false,budgetCut=0,currentPayMethod='card';
    let recognition=null,listening=false;
    function showToast(t,m){const el=document.getElementById('toast');document.getElementById('toastTitle').textContent=t;document.getElementById('toastMsg').textContent=m;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600);}
    async function loadProducts(){try{const res=await fetch('/api/products'+(ecoMode?'?eco=true':''));products=await res.json();renderProducts();}catch(e){console.error(e);showToast('Error','Could not load products');}}
    function renderProducts(){const grid=document.getElementById('productsGrid');const data=products.map(p=>({...p,displayPrice:Math.max(0,p.price-budgetCut)}));grid.innerHTML=data.map(p=>`<article class="card"><div class="card-img"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/320x200?text=Product'">${p.sustainability>=80?'<div class="eco-pill"><i class="fas fa-leaf"></i> Eco</div>':''}<button class="wish-btn ${wishlist.includes(p.id)?'active':''}" onclick="toggleWishlist(${p.id})"><i class="fas fa-heart"></i></button></div><div class="card-body"><div class="title">${p.name}</div><div class="rating"><i class="fas fa-star"></i> ${p.rating.toFixed(1)} • ${p.reviews.toLocaleString()} reviews</div><div class="price-row"><div class="price-main">₹${p.displayPrice.toLocaleString()}</div><div class="price-old">₹${p.originalPrice.toLocaleString()}</div><span class="tag-off">${p.discount}% OFF</span></div><div class="meta-row">Category: ${p.category.toUpperCase()} • Eco score: ${p.sustainability}/100</div><div class="actions"><button class="btn-secondary" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Add</button><button class="btn-buy" onclick="buyNow(${p.id})"><i class="fas fa-bolt"></i> Buy</button></div></div></article>`).join('');}
    function toggleEco(){ecoMode=document.getElementById('ecoToggle').checked;loadProducts();}
    function applyBudget(){const text=document.getElementById('budgetInput').value;const m=text.match(/(\d+)/);budgetCut=m?parseInt(m[1],10):0;if(budgetCut>0)showToast('Budget applied',`Showing prices with ₹${budgetCut} less`);else showToast('Budget cleared','Showing original prices');renderProducts();}
    async function loadCart(){try{const res=await fetch('/api/cart',{headers:{'x-session':'user1'}});cart=await res.json();updateCartUI();}catch(e){console.error(e);}}
    async function addToCart(id){try{await fetch('/api/cart/add',{method:'POST',headers:{'Content-Type':'application/json','x-session':'user1'},body:JSON.stringify({productId:id})});await loadCart();showToast('Added to cart','Item added to cart');}catch(e){console.error(e);}}
    function buyNow(id){const p=products.find(x=>x.id===id);if(!p)return;cart=[{...p,quantity:1}];updateCartUI();openPaymentModal();}
    function updateCartUI(){const itemsContainer=document.getElementById('cartItems');const badge=document.getElementById('cartBadge');const label=document.getElementById('cartCountLabel');const totalEl=document.getElementById('cartTotal');if(!cart||cart.length===0){itemsContainer.innerHTML='<div class="cart-empty">Cart is empty</div>';badge.textContent='0';label.textContent='0 items';totalEl.textContent='₹0';document.getElementById('codAmountText').textContent='';return;}itemsContainer.innerHTML=cart.map(item=>`<div class="cart-item"><div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div><div class="cart-item-main"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">₹${(item.price*item.quantity).toLocaleString()}</div><div class="qty-row">Qty: ${item.quantity}</div></div></div>`).join('');const totalCount=cart.reduce((s,i)=>s+i.quantity,0);const totalPrice=cart.reduce((s,i)=>s+i.price*i.quantity,0);badge.textContent=String(totalCount);label.textContent=`${totalCount} item${totalCount>1?'s':''}`;totalEl.textContent='₹'+totalPrice.toLocaleString();document.getElementById('codAmountText').textContent='Order total: ₹'+totalPrice.toLocaleString();}
    function toggleWishlist(id){const idx=wishlist.indexOf(id);if(idx>=0)wishlist.splice(idx,1);else wishlist.push(id);document.getElementById('wishBadge').textContent=wishlist.length;renderProducts();}
    function openWishlistToast(){showToast('Wishlist',`You have ${wishlist.length} item(s) saved`);}
    function openCartToast(){showToast('Cart','Use the right cart panel to review items');}
    const paymentModal=document.getElementById('paymentModal');function openPaymentModal(){if(!cart||cart.length===0){showToast('Cart empty','Add at least one item to pay');return;}selectPayMethod(currentPayMethod,true);paymentModal.classList.add('show');}function closePaymentModal(){paymentModal.classList.remove('show');}
    function selectPayMethod(method){currentPayMethod=method;['card','upi','cod'].forEach(m=>{document.getElementById('tab-'+m).classList.remove('active');document.getElementById('pay-'+m).classList.remove('active');});document.getElementById('tab-'+method).classList.add('active');document.getElementById('pay-'+method).classList.add('active');const btn=document.getElementById('payMainBtn');if(method==='card')btn.innerHTML='<i class="fas fa-lock"></i> Pay Now';else if(method==='upi')btn.innerHTML='<i class="fas fa-qrcode"></i> Pay with UPI';else btn.innerHTML='<i class="fas fa-box"></i> Place Order (COD)';}
    function formatCardNumber(input){let v=input.value.replace(/\D/g,'').slice(0,16);v=v.replace(/(.{4})/g,'$1 ').trim();input.value=v;}
    async function processPayment(){if(!cart||cart.length===0){showToast('Cart empty','Add items before paying');return;}const btn=document.getElementById('payMainBtn');const old=btn.innerHTML;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Processing...';btn.disabled=true;try{await fetch('/api/payments/mock',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method:currentPayMethod})});setTimeout(()=>{btn.disabled=false;btn.innerHTML=old;closePaymentModal();showToast(currentPayMethod==='cod'?'Order placed (COD)':'Payment successful',currentPayMethod==='cod'?'Pay in cash when your order arrives.':'Your order has been confirmed.');},800);}catch(e){console.error(e);btn.disabled=false;btn.innerHTML=old;showToast('Error','Payment failed, try again');}}
    const chatWindow=document.getElementById('chatWindow');const chatBody=document.getElementById('chatBody');const chatInput=document.getElementById('chatInput');function toggleChatWindow(){chatWindow.classList.toggle('open');if(chatWindow.classList.contains('open'))chatInput.focus();}
    async function sendChat(){const text=chatInput.value.trim();if(!text)return;chatBody.innerHTML+=`<div class="msg user">${text}</div>`;chatInput.value='';chatBody.scrollTop=chatBody.scrollHeight;try{const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});const data=await res.json();chatBody.innerHTML+=`<div class="msg ai">${data.message}</div>`;chatBody.scrollTop=chatBody.scrollHeight;}catch(e){console.error(e);chatBody.innerHTML+=`<div class="msg ai">Sorry, I could not respond right now.</div>`;}}
    function initVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){return;}recognition=new SR();recognition.lang='en-IN';recognition.onstart=()=>{listening=true;document.getElementById('micBtn').classList.add('listening');};recognition.onend=()=>{listening=false;document.getElementById('micBtn').classList.remove('listening');};recognition.onresult=e=>{const t=e.results[0][0].transcript;chatInput.value=t;setTimeout(sendChat,200);};}
    function toggleVoice(){if(!recognition){showToast('Voice not supported','Use Chrome on desktop for voice');return;}if(listening)recognition.stop();else recognition.start();}
    window.addEventListener('load',async()=>{initVoice();await loadProducts();await loadCart();});
  </script>
</body>
</html>
<!-- END OF index.html -->


MY SQL QUARIES

mysql> CREATE DATABASE IF NOT EXISTS aissa;
Query OK, 1 row affected (0.286 sec)

mysql> use aissa;
Database changed
mysql> CREATE TABLE IF NOT EXISTS payments (
    ->   id INT AUTO_INCREMENT PRIMARY KEY,
    ->   order_id VARCHAR(50) NOT NULL,
    ->   amount DECIMAL(10,2) NOT NULL,
    ->   method VARCHAR(20) NOT NULL,          -- 'card', 'upi', 'cod'
    ->   status VARCHAR(20) NOT NULL,          -- 'SUCCESS', 'FAILED', etc.
    ->   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );
Query OK, 0 rows affected (0.363 sec)

mysql> INSERT INTO payments (order_id, amount, method, status)
    -> VALUES ('ORDTEST123', 1999.00, 'card', 'SUCCESS');
Query OK, 1 row affected (0.268 sec)

mysql> SELECT * FROM payments;
+----+------------+---------+--------+---------+---------------------+
| id | order_id   | amount  | method | status  | created_at          |
+----+------------+---------+--------+---------+---------------------+
|  1 | ORDTEST123 | 1999.00 | card   | SUCCESS | 2026-04-09 04:10:00 |
+----+------------+---------+--------+---------+---------------------+
1 row in set (0.007 sec)

mysql> SELECT *
    -> FROM payments
    -> ORDER BY created_at DESC
    -> LIMIT 10;
+----+------------+---------+--------+---------+---------------------+
| id | order_id   | amount  | method | status  | created_at          |
+----+------------+---------+--------+---------+---------------------+
|  1 | ORDTEST123 | 1999.00 | card   | SUCCESS | 2026-04-09 04:10:00 |
+----+------------+---------+--------+---------+---------------------+
1 row in set (0.015 sec)


MYSQL CONNECTIVITY WITH JAVASCRIPT 
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
