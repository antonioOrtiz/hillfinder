import Link from 'next/link';

export default function Nav({ mobile = true, uidispatch, user }) {
  const nav = [
    { route: '/', name: 'Home' },
    { route: '/profile', name: 'Profile' },
    { route: '/dashboard', name: 'Dashboard' },
    { route: '/logout', name: 'Logout' },
    { route: '/login', name: 'Login' },
    { route: '/registration', name: 'Registration' }
  ];

  function AnchorIsLogOut({ route, children }) {
    return (route === '/logout'
      ? <a role="button" onClick={route === '/logout' ? () => uidispatch({ type: 'showModal' }) : null}>{children}</a>
      : <a>{children}</a>)
  }

  return (
    <ul className={mobile ? "p-4 overflow-y-auto menu w-80 bg-base-100" : "menu horizontal"}>
      {
        nav.map(({ route, name }) => (
          <>
            {
              user && user.isVerified ?
                ((route === '/login') || route === '/registration') ? null :
                  <li>
                    <Link href={route}>
                      <AnchorIsLogOut route={'/logout'}>
                        {name}
                      </AnchorIsLogOut>
                    </Link>
                  </li>
                :
                ((route === '/profile') || route === '/dashboard' || route === '/logout') ? null : <li>
                  <Link href={route}>
                    <AnchorIsLogOut route={'/logout'}>
                      {name}
                    </AnchorIsLogOut>
                  </Link>
                </li>
            }
          </>
        ))
      }
    </ul >
  )
}
