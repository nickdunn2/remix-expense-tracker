import { prisma } from '~/data/database.server'
import { hash, compare } from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true
  }
})

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession()
  const cookie = await sessionStorage.commitSession(session)
  session.set('userId', userId)

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': cookie
    }
  })
}

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

  const user = await prisma.user.create({ data })
  
  return createUserSession(user.id, '/expenses')
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email }})

  if (!existingUser) {
    const error = new Error('Invalid credentials.')
    error.status = 401

    throw error
  }

  const pwCorrect = await compare(password, existingUser.password)

  if (!pwCorrect) {
    const error = new Error('Invalid credentials.')
    error.status = 401

    throw error
  }

  return createUserSession(existingUser.id, '/expenses')
}
