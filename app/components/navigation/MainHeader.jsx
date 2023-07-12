import Logo from '../util/Logo'
import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'

function MainHeader() {
  const userId = useLoaderData()

  /**
   * Generate either logout form button or login Link, based on existence of user.
   */
  const authEl = userId ?
    <Form id="logout-form" method="post" action="/logout">
      <button className="cta-alt">Logout</button>
    </Form> :
    <Link to="/auth" className="cta">Login</Link>

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {authEl}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
