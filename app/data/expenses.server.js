import { prisma } from './database.server'

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error('Failed to fetch expenses.')
  }
  try {
    return await prisma.expense.findMany(
      {
        where: { userId },
        orderBy: {
          date: 'desc'
        }
      }
    )
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch expenses.')
  }
}

/**
 * Get a single expense by id.
 */
export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch expense.')
  }
}

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId }}
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to add expense.')
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update expense.')
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete expense.')
  }
}
