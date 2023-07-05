import { prisma } from '~/data/database.server'
import { hash } from 'bcryptjs'

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email }})

  if (existingUser) {
    const error = new Error('A user with the provided email address already exists.')
    error.status = 422

    throw error
  }

  const pwHash = await hash(password, 12)
  const data = {
    email,
    password: pwHash
  }

  await prisma.user.create({ data })
}
