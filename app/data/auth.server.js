import { prisma } from '~/data/database.server'
import { hash, compare } from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false, // TODO: local session doesn't persist when using process.env.NODE_ENV === 'production'
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true
  }
})

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  const cookie = await sessionStorage.commitSession(session)

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': cookie
    }
  })
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId) {
    return null
  }

  return userId
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request)

  if (!userId) {
    throw redirect('/auth?mode=login')
  }

  return userId
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

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}
