import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { getExpenses } from '~/data/expenses.server'
import { useCatch, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import Error from '~/components/util/Error'
import { requireUserSession } from '~/data/auth.server'

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData()

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  )
}

export async function loader({ request }) {
  await requireUserSession(request)

  const expenses = await getExpenses()

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load expenses for analysis.'},
      {
        status: 404,
        statusText: 'Expenses not found.'
      }
    )
  }

  return expenses
}

export function CatchBoundary() {
  const caughtResponse = useCatch()
  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message ?? 'Something went wrong. Could not load expenses.'}</p>
      </Error>
    </main>
  )
}
