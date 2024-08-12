import React from 'react';
export interface FormPopupProps {
  title: string;
  submitText?: string;
  closeText?: string;
  body: React.ReactNode;
  trigger: React.ReactNode;
  onSubmit?: (data: FormPayload) => void;
  onClose?: () => void;
}
export interface FormPayload {
  code: string;
  discountType: 'percentage' | 'amount' | any;
  discountRate: string | number;
  expirationDate: string;
  maxUsageLimit: number;
  product: string;
}

export interface PopupProps {
  title: string;
  subtitle: string;
  responseType: 'success' | 'fail';
  duration: number;
  onClose: () => void;
}
export interface DecodedToken {
  id: string;
  email: string;
  userType: string;
  iat: number;
  exp: number;
}
export interface decodedTokenProps {
  testData?: DecodedToken;
}
