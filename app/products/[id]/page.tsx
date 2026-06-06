'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { ProductCard } from '@/components/ProductCard';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Link href="/products" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    showToast(`${product.name} added to cart!`, 'success');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to Products
        </Link>

        <div className={styles.productLayout}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
              {discount > 0 && <span className={styles.discount}>{discount}% OFF</span>}
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.rating}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={20}
                    fill={star <= Math.round(product.rating) ? '#FFD700' : 'none'}
                    stroke={star <= Math.round(product.rating) ? '#FFD700' : '#9CA3AF'}
                  />
                ))}
              </div>
              <span className={styles.ratingText}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className={styles.price}>
              <span className={styles.currentPrice}>${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>${product.originalPrice}</span>
                  <span className={styles.save}>Save ${product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.stock}>
              {product.inStock ? (
                <span className={styles.inStock}>
                  <Check size={18} /> In Stock
                </span>
              ) : (
                <span className={styles.outOfStock}>Out of Stock</span>
              )}
            </div>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                className={styles.addToCart}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {product.specs && (
              <div className={styles.specs}>
                <h3>Specifications</h3>
                <div className={styles.specsGrid}>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className={styles.specItem}>
                      <span className={styles.specKey}>{key}</span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <h2>Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((relProduct, index) => (
                <div key={relProduct.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}