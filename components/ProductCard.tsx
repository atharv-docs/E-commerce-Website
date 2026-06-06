'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.images[0]} alt={product.name} className={styles.image} />
        {discount > 0 && <span className={styles.discount}>{discount}% OFF</span>}
        {!product.inStock && <span className={styles.outOfStock}>Out of Stock</span>}
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.name}</h3>

        <div className={styles.rating}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={14}
                fill={star <= Math.round(product.rating) ? '#FFD700' : 'none'}
                stroke={star <= Math.round(product.rating) ? '#FFD700' : '#9CA3AF'}
              />
            ))}
          </div>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.price}>
            <span className={styles.currentPrice}>${product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice}</span>
            )}
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};