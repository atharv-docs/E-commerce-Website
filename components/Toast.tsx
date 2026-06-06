'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast, ToastType } from '@/context/ToastContext';
import styles from './Toast.module.css';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
};

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
        >
          <span className={styles.icon}>{icons[toast.type]}</span>
          <span className={styles.message}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className={styles.closeBtn}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};