import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = async (transaction: TransactionInput) => {
    const response = await api.post('/transactions', transaction)
    setTransactions([
      ...transactions,
      response.data.transaction
    ]);
  }

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(res => setTransactions(res.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
}