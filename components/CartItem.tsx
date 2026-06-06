'use client';

import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <img src={product.images[0]} alt={product.name} className={styles.image} />

      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.price}>${product.price}</span>
      </div>

      <div className={styles.quantity}>
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className={styles.quantityBtn}
        >
          <Minus size={16} />
        </button>
        <span className={styles.quantityValue}>{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className={styles.quantityBtn}
          disabled={quantity >= 10}
        >
          <Plus size={16} />
        </button>
      </div>

      <span className={styles.subtotal}>${(product.price * quantity).toFixed(2)}</span>

      <button
        onClick={() => removeItem(product.id)}
        className={styles.removeBtn}
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};