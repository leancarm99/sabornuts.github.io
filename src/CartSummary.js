import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CartSummary = ({ cart, products, setCart, clientName }) => {
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useState(cart);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setLocalCart({
      ...localCart,
      [id]: { ...localCart[id], quantity: parseInt(quantity) },
    });
  };

  const removeFromCart = (id) => {
    const updatedCart = { ...localCart };
    delete updatedCart[id];
    setLocalCart(updatedCart);
  };

  const getTotalPrice = () => {
    return Object.keys(localCart).reduce((total, id) => {
      const product = products.find(p => p.id === Number(id));
      return total + product.price * localCart[id].quantity;
    }, 0);
  };

  const handleSaveChanges = () => {
    setCart(localCart);
    navigate('/');
  };

  return (
    <div className="summary">
      <h1>Resumen de Compra</h1>
      <h2>Cliente: {clientName}</h2>
      <div className="summary-table-container">
        <table className="summary-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Foto</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(localCart).map((id, index) => {
              const product = products.find(p => p.id === Number(id));
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td><img src={product.image} alt={product.name} className="table-image" /></td>
                  <td>{product.name}</td>
                  <td>
                    <input
                      type="number"
                      value={localCart[id].quantity}
                      onChange={(e) => updateQuantity(id, e.target.value)}
                      min="1"
                      max="99"
                    />
                  </td>
                  <td>${product.price * localCart[id].quantity}</td>
                  <td><button onClick={() => removeFromCart(id)}>X</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="total-price">
        <h3>Precio Total: ${getTotalPrice()}</h3>
      </div>
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

export default CartSummary;