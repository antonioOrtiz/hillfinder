import Link from 'next/link';

export default function Nav({ mobile = true, uidispatch, user, handleClickOnInput }) {
  const nav = [
    { route: '/', name: 'Home' },
    { route: '/profile', name: 'Profile' },
    { route: '/dashboard', name: 'Dashboard' },
    { route: '/logout', name: 'Logout' },
    { route: '/login', name: 'Login' },
    { route: '/registration', name: 'Registration' }
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
                ((route === '/login') || route === '/registration') ? null : <li>
                  <Link href={route}>
                    {route === '/logout' ? <LogOutAnchor name={name} /> : mobile ? <a onClick={handleClickOnInput}>{name}</a> : <a>{name}</a>}
                  </Link>
                </li>
                :
                ((route === '/profile') || route === '/dashboard' || route === '/logout') ? null : <li>
                  <Link href={route}>
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
