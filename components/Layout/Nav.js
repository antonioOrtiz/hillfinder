import Link from 'next/link';

export default function Nav({ mobile = true, uidispatch, user, handleClickOnInput }) {
  const nav = [
    { id: 1, route: '/', name: 'Home' },
    { id: 2, route: '/profile', name: 'Profile' },
    { id: 3, route: '/dashboard', name: 'Dashboard' },
    { id: 4, route: '/logout', name: 'Logout' },
    { id: 5, route: '/login', name: 'Login' },
    { id: 6, route: '/registration', name: 'Registration' }
  ];

  function LogOutAnchor({ name }) {
    return (
      <a
        role="button"
        onClick={() => uidispatch({ type: 'showModal' })}
      >{name}</a>
    )
  }

  return (
    <ul className={mobile ? "p-4 overflow-y-auto menu w-80 bg-base-100" : "menu horizontal"}>
      {
        nav.map(({ route, name }) => (
          <>
            {
              user && user.isVerified ?
                ((route === '/login') || route === '/registration') ? null : <li
                  key={route.id + Math.random()}
                >
                  <Link
                    href={route}
                    key={route.id}
                  >
                    {route === '/logout' ? <LogOutAnchor name={name} /> : mobile ? <a onClick={handleClickOnInput}>{name}</a> : <a>{name}</a>}
                  </Link>
                </li>
                :
                ((route === '/profile') || route === '/dashboard' || route === '/logout') ? null : <li
                  key={route.id + Math.random()}
                >
                  <Link
                    href={route}
                    key={route.id}
                  >
                    {route === '/logout' ? <LogOutAnchor name={name} /> : mobile ? <a onClick={handleClickOnInput}>{name}</a> : <a>{name}</a>}
                  </Link>
                </li>
            }
          </>
        ))
      }
    </ul >
  )
}
