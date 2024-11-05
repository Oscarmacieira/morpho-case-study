import React, { createContext, useContext, ReactNode } from "react";
import { TransactionState, useTransactionState } from "./useTxState";

type TransactionContextType = {
  state: TransactionState;
  setPending: (txHash: string) => void;
  setSuccess: () => void;
  setError: (error: Error) => void;
  reset: () => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const { state, setPending, setSuccess, setError, reset } =
    useTransactionState();

  return (
    <TransactionContext.Provider
      value={{
        state,
        setPending,
        setSuccess,
        setError,
        reset,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
