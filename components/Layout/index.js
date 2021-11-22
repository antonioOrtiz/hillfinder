import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import dynamic from "next/dynamic";


import styles from './Layout.module.scss';

import { useUser } from '../../lib/hooks'
import { uiState, uiDispatch } from '../Context/UIContext'
import Modal from '../Modal'

const Footer = dynamic(() => import('./Footer'), { ssr: true });

export default function Layout({ children, showFooter = false }) {
  const { route, router } = useRouter();
  const { user, mutate } = useUser();
  const { showModal } = uiState().uiState;
  const { uidispatch } = uiDispatch();

  useEffect(() => {
    if (router === undefined) return;
  }, [router]);

  async function handleLogout() {
    axios
      .get('/api/logout').then(() => {
        mutate({ user: null })
        Router.push('/',)
      }).catch(err => console.log('err', err))
  }

  return <>
    <div className="shadow bg-base-200 drawer h-screen">
      <Modal
        message="Are you sure you want to log out of your account?"
        handleLogout={handleLogout}
        showModal={showModal}
        setShowModal={uidispatch}
      />
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <div className="w-full navbar bg-base-300">
          <div className={'flex-none lg:hidden'}>
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            {showModal ?
              <Modal
                message="Are you sure you want to log out of your account?"
                handleLogout={handleLogout}
              /> : null}
            <span>
              Hillfinder
            </span>
          </div>

          <div className="flex-none hidden lg:block">
            <ul className="menu horizontal">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              {user && user.isVerified
                ?
                <>
                  <li>
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      role="button"
                      onClick={() => uidispatch({ type: 'showModal' })}

                    >

                      Logout
                    </a>
                  </li>
                  <li className="avatar">
                    <div className="rounded-full w-10 h-10 m-1">
                      <img src="https://i.pravatar.cc/500?img=32" />
                    </div>
                  </li></>
                :
                <>
                  <li>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/registration">
                      <a>Register</a>
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
        <div className={`${route != '/' ? styles['bg-logo'] : styles.content}`} >
          {children}
        </div>
        {showFooter ? <Footer /> : null}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay" />
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user && user.isVerified ?
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => uidispatch({ type: 'showModal' })}
                >
                  Logout
                </a>
              </li>
            </>
            :
            <>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/registration">
                  <a>Register</a>
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  </>;
}
