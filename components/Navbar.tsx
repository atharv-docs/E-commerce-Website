'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { searchProducts, Product } from '@/data/products';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = searchProducts(searchQuery).slice(0, 5);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (id: string) => {
    router.push(`/products/${id}`);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛒</span>
          <span className={styles.logoText}>ShopNest</span>
        </Link>

        <div ref={searchRef}>
        <form onSubmit={handleSearch} className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map(product => (
                <div
                  key={product.id}
                  className={styles.searchResult}
                  onClick={() => handleResultClick(product.id)}
                >
                  <img src={product.images[0]} alt={product.name} className={styles.resultImage} />
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{product.name}</span>
                    <span className={styles.resultPrice}>${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
        </div>

        <div className={styles.navActions}>
          <Link href="/cart" className={styles.cartButton}>
            <ShoppingCart size={24} />
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <button className={styles.userButton}>
                <User size={24} />
              </button>
              <div className={styles.userDropdown}>
                <span className={styles.userName}>{user?.name}</span>
                <button onClick={logout} className={styles.logoutButton}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className={styles.userButton}>
              <User size={24} />
            </Link>
          )}

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/products" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            All Products
          </Link>
          <Link href="/cart" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            Cart ({itemCount})
          </Link>
          {isAuthenticated ? (
            <button onClick={() => { logout(); setMobileMenuOpen(false); }} className={styles.mobileLink}>
              Logout
            </button>
          ) : (
            <Link href="/login" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};