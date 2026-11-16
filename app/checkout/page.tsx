'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './page.module.css';
import { formatCurrency, formatCurrencyExact } from '@/lib/format';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name || '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { items, total } = state;
  const shipping = total > 499 ? 0 : 49;
  const tax = 0;
  const grandTotal = total + shipping + tax;

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      let newOrderId = 'DEMO-' + Date.now().toString(36).toUpperCase();
      if (isSupabaseConfigured && supabase) {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        if (!accessToken) throw new Error('Sign in before placing an order.');
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
          body: JSON.stringify({ items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })), shippingAddress: shippingInfo }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to place order.');
        newOrderId = 'SN-' + String(result.orderId).slice(0, 8).toUpperCase();
      }
      setOrderId(newOrderId);
      clearCart();
      setStep('confirmation');
      showToast(isSupabaseConfigured ? 'Your order has been saved.' : 'Demo order created. Connect Supabase to save real orders.', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to place order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className={styles.empty}>
        <h1>No items to checkout</h1>
        <p>Your cart is empty. Add some products first!</p>
        <Link href="/products" className={styles.shopBtn}>
          Start Shopping
        </Link>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className={styles.confirmation}>
        <div className={styles.confetti}>
          <Check size={64} />
        </div>
        <h1>Order Confirmed! 🎉</h1>
        <p>Thank you for your order. Your order ID is:</p>
        <span className={styles.orderId}>{orderId}</span>
        <p>We've sent a confirmation email to your address.</p>
        <div className={styles.confirmActions}>
          <Link href="/products" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/cart" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            {/* Progress Steps */}
            <div className={styles.steps}>
              <div className={`${styles.step} ${step === 'shipping' ? styles.active : ''} ${step !== 'shipping' ? styles.completed : ''}`}>
                <span className={styles.stepNumber}>1</span>
                <span>Shipping</span>
              </div>
              <div className={styles.stepLine}></div>
              <div className={`${styles.step} ${step === 'payment' ? styles.active : ''}`}>
                <span className={styles.stepNumber}>2</span>
                <span>Payment</span>
              </div>
            </div>

            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className={styles.form}>
                <h2>Shipping Information</h2>

                <div className={styles.row}>
                  <Input
                    label="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    error={errors.firstName}
                    placeholder="John"
                  />
                  <Input
                    label="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    error={errors.lastName}
                    placeholder="Doe"
                  />
                </div>

                <Input
                  label="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  error={errors.address}
                  placeholder="House no., street, locality"
                />

                <div className={styles.row}>
                  <Input
                    label="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    error={errors.city}
                    placeholder="Jammu"
                  />
                  <Input
                    label="State"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    error={errors.state}
                    placeholder="Jammu & Kashmir"
                  />
                </div>

                <div className={styles.row}>
                  <Input
                    label="Pincode"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    error={errors.zip}
                    placeholder="180001"
                  />
                  <Input
                    label="Phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    error={errors.phone}
                    placeholder="9876543210"
                  />
                </div>

                <Button type="submit" fullWidth size="lg">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className={styles.form}>
                <h2>Payment Information</h2>
                <p className={styles.demoNote}>🔒 Demo Mode - No real payment will be processed</p>

                <p className={styles.demoNote}>Cash on Delivery. Pay when your order arrives. No card details are collected.</p>

                <div className={styles.security}>
                  <Lock size={16} />
                  <span>Your order will be confirmed before dispatch</span>
                </div>

                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Place COD Order - {formatCurrencyExact(grandTotal)}
                </Button>
              </form>
            )}
          </div>

          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>

            <div className={styles.itemsList}>
              {items.map(item => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.product.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCurrencyExact(total)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `${formatCurrencyExact(shipping)}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>GST (included)</span>
                <span>{formatCurrencyExact(tax)}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.summaryRow}>
                <span className={styles.total}>Total</span>
                <span className={styles.totalValue}>{formatCurrencyExact(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}