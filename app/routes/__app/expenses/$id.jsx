import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { useNavigate } from '@remix-run/react'
import { updateExpense } from '~/data/expenses.server'
import { redirect } from '@remix-run/node'
import { validateExpenseInput } from '~/data/validation.server'

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

export async function action({params, request}) {
  const expenseId = params.id
  const formData = await request.formData()
  const expenseData = Object.fromEntries(formData)

  try {
    validateExpenseInput(expenseData)
  } catch (err) {
    return err
  }

  await updateExpense(expenseId, expenseData)
  return redirect('/expenses')
}
