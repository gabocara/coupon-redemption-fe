// components/CouponInput.tsx
import React, { useState } from 'react';

interface CouponInputProps {
  onApplyCoupon: (code: string) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ onApplyCoupon }) => {
  const [coupon, setCoupon] = useState('');

  const handleApply = () => {
    onApplyCoupon(coupon);
  };

  return (
    <div className="coupon-input">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button onClick={handleApply}>Apply Coupon</button>
    </div>
  );
};

export default CouponInput;
