import { Link, useFetcher } from '@remix-run/react'

function ExpenseListItem({ id, title, amount }) {
  const fetcher = useFetcher()

  function deleteExpenseItem() {
    const shouldProceed = confirm('Are you sure you want to delete this item?')
    if (!shouldProceed) return

    fetcher.submit(null, { method: 'delete', action: `/expense/${id}` })
  }

  if (fetcher.state !== 'idle') {

    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItem}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
