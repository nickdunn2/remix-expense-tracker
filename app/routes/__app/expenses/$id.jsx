import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { useNavigate } from '@remix-run/react'
import { getExpense } from '~/data/expenses.server'

export default function UpdateExpensesPage() {
  const navigate = useNavigate()

  function closeHandler() {
    navigate('..')
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  )
}

export function loader({params}) {
  return getExpense(params.id)
}
