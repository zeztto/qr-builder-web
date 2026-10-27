'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { QRType, QROptions, QRContextValue } from '@/types/qr-types';
import { DEFAULT_QR_OPTIONS } from '@/constants/qr-config';

const QRContext = createContext<QRContextValue | undefined>(undefined);

export function QRProvider({ children }: { children: React.ReactNode }) {
  const [type, setTypeState] = useState<QRType>('url');
  const [data, setDataState] = useState<string>('');
  const [options, setOptionsState] = useState<QROptions>(DEFAULT_QR_OPTIONS);

  const setType = useCallback((newType: QRType) => {
    setTypeState(newType);
    // Reset data when type changes
    setDataState('');
  }, []);

  const setData = useCallback((newData: string) => {
    setDataState(newData);
  }, []);

  const setOptions = useCallback((newOptions: Partial<QROptions>) => {
    setOptionsState((prev) => ({ ...prev, ...newOptions }));
  }, []);

  const reset = useCallback(() => {
    setDataState('');
    setOptionsState(DEFAULT_QR_OPTIONS);
  }, []);

  const value: QRContextValue = {
    type,
    data,
    options,
    setType,
    setData,
    setOptions,
    reset,
  };

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>;
}

export function useQRContext() {
  const context = useContext(QRContext);
  if (context === undefined) {
    throw new Error('useQRContext must be used within a QRProvider');
  }
  return context;
}
