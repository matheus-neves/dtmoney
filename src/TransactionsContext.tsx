import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext<Transaction[]>([])

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {

  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(res => setTransactions(res.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )

}