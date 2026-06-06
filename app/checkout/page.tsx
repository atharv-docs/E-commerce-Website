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
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
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

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = `SN-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(newOrderId);
      clearCart();
      setLoading(false);
      setStep('confirmation');
      showToast('Order placed successfully!', 'success');
    }, 2000);
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
                  placeholder="123 Main Street"
                />

                <div className={styles.row}>
                  <Input
                    label="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    error={errors.city}
                    placeholder="New York"
                  />
                  <Input
                    label="State"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    error={errors.state}
                    placeholder="NY"
                  />
                </div>

                <div className={styles.row}>
                  <Input
                    label="ZIP Code"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    error={errors.zip}
                    placeholder="10001"
                  />
                  <Input
                    label="Phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    error={errors.phone}
                    placeholder="(555) 123-4567"
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

                <div className={styles.cardInput}>
                  <CreditCard size={24} />
                  <input
                    type="text"
                    placeholder="Card Number"
                    defaultValue="4242 4242 4242 4242"
                    className={styles.cardNumber}
                  />
                </div>

                <div className={styles.row}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className={styles.cardExpiry}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="123"
                    className={styles.cardCvc}
                  />
                </div>

                <div className={styles.security}>
                  <Lock size={16} />
                  <span>Your payment information is secure</span>
                </div>

                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Place Order - ${grandTotal.toFixed(2)}
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
                  <span className={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.summaryRow}>
                <span className={styles.total}>Total</span>
                <span className={styles.totalValue}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}