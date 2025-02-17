import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VentaResumen() {
  const { state } = useLocation();
  const { cart, localName, total, products } = state || {};
  const navigate = useNavigate();

  if (!cart) return <p>No hay productos en el carrito.</p>;

  return (
    <div className="checkout-summary">
      <h1>Resumen de la Venta</h1>
      <p><strong>Local:</strong> {localName}</p>

      <div className="cart-summary">
        {Object.keys(cart).map((id) => {
          const product = products.find(p => p.id === Number(id));
          return (
            <div key={id} className="product-summary">
              <img src="path/to/image" alt={product.name} width="50" />
              <span>{product.name} x {cart[id].quantity}</span>
              <span>${cart[id].quantity * product.price}</span>
            </div>
          );
        })}
      </div>

      <p><strong>Total: ${total}</strong></p>

      <button onClick={() => navigate('/')}>Volver al Carrito</button>
    </div>
  );
}
