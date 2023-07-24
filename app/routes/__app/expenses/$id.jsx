import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { useNavigate } from '@remix-run/react'
import { deleteExpense, updateExpense } from '~/data/expenses.server'
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

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData)

    try {
      validateExpenseInput(expenseData)
    } catch (err) {
      return err
    }

    await updateExpense(expenseId, expenseData)
    return redirect('/expenses')
  } else { // DELETE
    await deleteExpense(expenseId)
    return redirect('/expenses')
  }
}

export function meta({params, parentsData}) {
  const expense = parentsData['routes/__app/expenses'].find(expense => expense.id === params.id)
  return {
    title: expense.title,
    description: 'Update expense.'
  }
}
