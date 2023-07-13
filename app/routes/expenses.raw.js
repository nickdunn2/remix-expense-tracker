import { getExpenses } from '~/data/expenses.server'
import { requireUserSession } from '~/data/auth.server'

// expenses/raw
export async function loader({ request }) {
  await requireUserSession(request)

  return getExpenses()
}
