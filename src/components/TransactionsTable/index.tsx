import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(res => setTransactions(res.data.transactions))
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map(({ id, title, amount, type, category, createdAt }) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>
                  {type === 'withdraw' && '- '}
                  {
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(amount)
                  }
                </td>
                <td>{category}</td>
                <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  )
}