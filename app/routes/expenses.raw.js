import { getExpenses } from '~/data/expenses.server'

// expenses/raw
export function loader() {
  return getExpenses()
}
