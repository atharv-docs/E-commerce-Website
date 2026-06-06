'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const dealsProducts = products.filter(p => p.originalPrice).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>🔥 New Season Deals</span>
          <h1 className={styles.heroTitle}>
            Discover Amazing Products at Great Prices
          </h1>
          <p className={styles.heroSubtitle}>
            Your one-stop destination for electronics, fashion, home & living, and more.
            Shop now and enjoy exclusive discounts!
          </p>
          <div className={styles.heroActions}>
            <Link href="/products" className={styles.primaryBtn}>
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link href="/products?category=deals" className={styles.secondaryBtn}>
              View Deals
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600"
            alt="Shopping"
            className={styles.heroImg}
          />
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><Zap size={24} /></div>
              <h3>Fast Delivery</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><Shield size={24} /></div>
              <h3>Secure Payment</h3>
              <p>100% secure payment processing</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><RotateCcw size={24} /></div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free returns</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><Truck size={24} /></div>
              <h3>Track Order</h3>
              <p>Real-time order tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className={styles.categoryCard}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <ArrowRight size={20} className={styles.categoryArrow} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <Link href="/products" className={styles.viewAll}>
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className={styles.deals}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🔥 Hot Deals</h2>
            <Link href="/products?sort=discount" className={styles.viewAll}>
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {dealsProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get exclusive deals and updates straight to your inbox!</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className={styles.newsletterInput} />
              <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}