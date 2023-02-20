import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'

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

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DummyExpenses} />
      <ExpenseStatistics expenses={DummyExpenses} />
    </main>
  )
}
