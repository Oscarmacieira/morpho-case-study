import { useState } from "react";

export type TransactionState = {
  status: "idle" | "pending" | "success" | "error";
  txHash?: string;
  error?: Error;
};

export const useTransactionState = () => {
  const [state, setState] = useState<TransactionState>({
    status: "idle",
  });

  const setPending = (txHash: string) => {
    setState({ status: "pending", txHash });
  };

  const setSuccess = () => {
    setState((prev) => ({ status: "success", txHash: prev.txHash }));
  };

  const setError = (error: Error) => {
    setState((prev) => ({ status: "error", txHash: prev.txHash, error }));
  };

  const reset = () => {
    setState({ status: "idle" });
  };

  return {
    state,
    setPending,
    setSuccess,
    setError,
    reset,
  };
};
