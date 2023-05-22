import { Link, Outlet, useLoaderData } from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'
import { FaDownload, FaPlus } from 'react-icons/fa'
import { getExpenses } from '~/data/expenses.server'

// /expenses => shared layout

export default function ExpensesLayout() {
  const expenses = useLoaderData()

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
        <ExpensesList expenses={expenses} />
      </main>
    </main>
  )
}

export function loader() {
  return getExpenses()
}
