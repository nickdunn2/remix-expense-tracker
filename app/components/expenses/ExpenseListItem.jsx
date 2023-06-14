import { Form, Link, useFetcher } from '@remix-run/react'

function ExpenseListItem({ id, title, amount }) {
  /**
   * TODO
   * Fetcher is NOT working for DELETE requests. It 404s and throws this error...
   * "Error: You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead."
   */
  // const fetcher = useFetcher()

  // function deleteExpenseItem() {
  //   const shouldProceed = confirm('Are you sure you want to delete this item?')
  //   if (!shouldProceed) return
  //
  //   fetcher.submit(null, { method: 'delete', action: `/expense/${id}` })
  // }
  //
  // if (fetcher.state !== 'idle') {
  //
  //   return (
  //     <article className="expense-item locked">
  //       <p>Deleting...</p>
  //     </article>
  //   )
  // }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/*<button onClick={deleteExpenseItem}>Delete</button>*/}
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
