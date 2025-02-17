import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaborNutsApp() {
  const [cart, setCart] = useState({});
  const [products] = useState([
    { id: 1, name: 'Almendras', price: 100 },
    { id: 2, name: 'Maní', price: 80 },
    { id: 3, name: 'Nueces', price: 150 },
    // Añadir los productos que tengas
  ]);
  const [localName, setLocalName] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.id]) {
        updatedCart[product.id].quantity += 1;
      } else {
        updatedCart[product.id] = { ...product, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    if (!localName) {
      alert('Por favor, ingrese el nombre del local');
      return;
    }
    const total = Object.values(cart).reduce((sum, product) => sum + (product.quantity * product.price), 0);
    navigate('/resumen', {
      state: { cart, localName, total, products },
    });
  };

  return (
    <div>
      <h1>SaborNuts</h1>
      <input
        type="text"
        placeholder="Nombre del local"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
      />
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src="path/to/image" alt={product.name} width="50" />
            <span>{product.name}</span>
            <span>${product.price}</span>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Finalizar compra</button>
    </div>
  );
}

export default SaborNutsApp;
