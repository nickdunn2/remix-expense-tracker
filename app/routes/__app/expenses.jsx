import { Outlet } from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'

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
        <ExpensesList expenses={DummyExpenses} />
      </main>
    </main>
  )
}
