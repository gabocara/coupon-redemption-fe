// components/CartItem.tsx
import React from 'react';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => {
  return (
    <div className="cart-item">
      <p>{name}</p>
      <p>{quantity} x ${price.toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
