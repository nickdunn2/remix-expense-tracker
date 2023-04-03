import { Link, Outlet } from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'
import { FaDownload, FaPlus } from 'react-icons/fa'

// /expenses => shared layout

const DummyExpenses = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString()
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 16.99,
    date: new Date().toISOString()
  },
]

export default function ExpensesLayout() {
  return (
    <main>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DummyExpenses} />
      </main>
    </main>
  )
}
