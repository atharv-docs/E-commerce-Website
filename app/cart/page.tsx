'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem';
import styles from './page.module.css';

export default function CartPage() {
  const { state, clearCart } = useCart();
  const { items, total } = state;

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <ShoppingBag size={64} />
        </div>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link href="/products" className={styles.shopBtn}>
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.layout}>
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <span>{items.length} items</span>
              <button onClick={clearCart} className={styles.clearBtn}>
                Clear Cart
              </button>
            </div>

            <div className={styles.itemsList}>
              {items.map((item, index) => (
                <div key={item.product.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.summary}>
            <h2>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className={styles.free}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>

            {shipping > 0 && (
              <p className={styles.shippingNote}>
                Free shipping on orders over $50!
              </p>
            )}

            <div className={styles.summaryRow}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.summaryRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>${grandTotal.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout <ArrowRight size={20} />
            </Link>

            <Link href="/products" className={styles.continueBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}