import Link from 'next/link';
import { useEffect } from 'react';

export default function Nav({ mobile = true, uidispatch, user, handleClickOnInput }) {
  const nav = [
    { id: 1, route: '/', name: 'Home' },
    { id: 2, route: '/profile', name: 'Profile' },
    { id: 3, route: '/dashboard', name: 'Dashboard' },
    { id: 4, route: '/logout', name: 'Logout' },
    { id: 5, route: '/login', name: 'Login' },
    { id: 6, route: '/registration', name: 'Registration' }
  ];

  function LogOutAnchor({ route, name, isMobile }) {
    if (route === '/logout' && isMobile) {
      console.log('foo')
      return (<li>
        <Link
          href='#'
          key={route.id}
        ><a
          role="button"
          onClick={() => { uidispatch({ type: 'showModal' }); handleClickOnInput() }}
        >{name}</a>
        </Link>
      </li>)
    } else if (route !== '/logout' && isMobile) {
      return (
        <li>
          <Link
            href={route}
            key={route.id}
          >
            <a
              role="button"
              onClick={() => { handleClickOnInput() }}
            >{name}</a>
          </Link>
        </li>)
    }
    else if (route == '/logout' && !isMobile) {
      return (
        <li>
          <Link
            href='#'
            key={route.id}
          >
            <a
              role="button"
              onClick={() => uidispatch({ type: 'showModal' })}
            >{name}</a></Link></li>)
    }
    else if (route != '/logout' && !isMobile) {
      return (<li>
        <Link
          href={route}
          key={route.id}
        ><a >{name}</a>
        </Link>
      </li>)
    }
  }

  return (
    <ul className={mobile ? "p-4 overflow-y-auto menu w-80 bg-base-100" : "menu horizontal"}>
      {
        nav.map(({ route, name }) => (
          <>
            {
              user && user.isVerified ?
                ((route === '/login') || route === '/registration') ? null :
                  <LogOutAnchor key={route.id} route={route} name={name} isMobile={mobile} />
                :
                ((route === '/profile') || route === '/dashboard' || route === '/logout') ? null :
                  <LogOutAnchor key={route.id} route={route} name={name} isMobile={mobile} />
            }
          </>
        ))
      }
    </ul >
  )
}
