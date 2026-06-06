'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SortAsc, X } from 'lucide-react';
import { products, categories, searchProducts, getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import styles from './page.module.css';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'default';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const filteredProducts = React.useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : getProductsByCategory(category);

    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    }

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'discount':
        return [...result].sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
      default:
        return result;
    }
  }, [category, searchQuery, sortBy, priceRange]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>
              {searchQuery ? `Search: "${searchQuery}"` : category === 'all' ? 'All Products' : categories.find(c => c.id === category)?.name}
            </h1>
            <span className={styles.count}>{filteredProducts.length} products</span>
          </div>

          <div className={styles.headerRight}>
            <button
              className={styles.filterBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </button>

            <div className={styles.sortWrapper}>
              <SortAsc size={18} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar Filters */}
          <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.filterSection}>
              <h4>Categories</h4>
              <div className={styles.categoryList}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.categoryBtn} ${category === cat.id ? styles.active : ''}`}
                    onClick={() => {
                      setCategory(cat.id);
                      setSearchQuery('');
                      setShowFilters(false);
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Price Range</h4>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className={styles.priceInput}
                />
                <span>to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className={styles.priceInput}
                />
              </div>
            </div>

            <button
              className={styles.clearBtn}
              onClick={() => {
                setCategory('all');
                setPriceRange([0, 2000]);
                setSortBy('default');
              }}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className={styles.content}>
            {searchQuery && (
              <div className={styles.searchInfo}>
                <span>Showing results for "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}>
                  <X size={16} /> Clear
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setCategory('all');
                    setSearchQuery('');
                    setPriceRange([0, 2000]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}