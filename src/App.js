import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import './styles.css';

const products = [
  { id: 1, name: 'Nueces', price: 1450, image: '/images/Nueces.png' },
  { id: 2, name: 'Avellanas', price: 2600, image: '/images/Avellanas.png' },
  { id: 3, name: 'Castañas de Caju', price: 2000, image: '/images/CastañasdeCaju.png' },
  { id: 4, name: 'Chips de Banana', price: 1550, image: '/images/Chipsdebanana.png' },
  { id: 5, name: 'Pasas de uva negras', price: 800, image: '/images/Pasasdeuvanegras.png' },
  { id: 6, name: 'Pasas de uva rubias', price: 1000, image: '/images/Pasasdeuvarubias.png' },
  { id: 7, name: 'Almendras', price: 2100, image: '/images/Almendras.png' },
  { id: 8, name: 'Maní', price: 650, image: '/images/Mani.png' },
  { id: 9, name: 'Maní Salado', price: 650, image: '/images/ManiSalado.png' },
  { id: 10, name: 'Maní Crocante Sabor Tradicional', price: 650, image: '/images/ManiCrocanteSaborTradicional.png' },
  { id: 11, name: 'Maní Crocante Sabor Pizza', price: 650, image: '/images/ManiCrocanteSaborPizza.png' },
  { id: 12, name: 'Maní Crocante Sabor Jamón', price: 650, image: '/images/ManiCrocanteSaborJamon.png' },
  { id: 13, name: 'Maní Crocante Sabor Queso', price: 650, image: '/images/ManiCrocanteSaborQueso.png' },
  { id: 14, name: 'Tomates Secos', price: 2000, image: '/images/Tomatessecos.png' },
  { id: 15, name: 'Mix Eco', price: 900, image: '/images/Mixeco.png' },
  { id: 16, name: 'Mix Energy', price: 1100, image: '/images/Mixenergy.png' },
  { id: 17, name: 'Mix Frutos Secos', price: 1750, image: '/images/Mixfrutossecos.png' },
  { id: 18, name: 'Mix Tropical', price: 1350, image: '/images/Mixtropical.png' },
];

const SaborNutsApp = ({ cart, setCart, clientName, setClientName }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const addToCart = (id, qty) => {
    if (qty <= 0) return;
    setCart({
      ...cart,
      [id]: { ...cart[id], quantity: (cart[id]?.quantity || 0) + parseInt(qty) },
    });
    setSelectedProduct(null);
    setQuantity('');
  };

  const removeFromCart = (id) => {
    const updatedCart = { ...cart };
    delete updatedCart[id];
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>SaborNuts</h1>
        <button className="cart-button" onClick={toggleCart}>Carrito</button>
        {showCart && (
          <div className="cart-dropdown">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart).map((id) => {
                  const product = products.find(p => p.id === Number(id));
                  return (
                    <tr key={id}>
                      <td>{product.name}</td>
                      <td>{cart[id].quantity}</td>
                      <td><button onClick={() => removeFromCart(id)}>X</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => navigate('/summary')}>Finalizar Compra</button>
          </div>
        )}
      </header>
      <div className="client-name">
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Ingresa el nombre del cliente"
        />
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => setSelectedProduct(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Agregar {selectedProduct.name}</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max="99"
              placeholder="Cantidad"
            />
            <button onClick={() => addToCart(selectedProduct.id, quantity)}>Agregar al carrito</button>
            <button onClick={() => setSelectedProduct(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState({});
  const [clientName, setClientName] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SaborNutsApp cart={cart} setCart={setCart} clientName={clientName} setClientName={setClientName} />} />
        <Route path="/summary" element={<CartSummary cart={cart} products={products} setCart={setCart} clientName={clientName} />} />
      </Routes>
    </Router>
  );
}