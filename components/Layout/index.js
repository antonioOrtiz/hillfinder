import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from './Layout.module.scss';

import { useUser } from 'lib/hooks'
import { userState } from 'components/Context/UserContext'
import { uiState } from 'components/Context/UIContext'
import Modal from '../Modal'
import Nav from './Nav'

const Footer = dynamic(() => import('./Footer'), { ssr: true });

export default function Layout({ children, showFooter = false }) {

  const inputRef = useRef();

  const { state: uistate, dispatch: uiDispatch } = uiState();
  const { dispatch: userDispatch, state: userstate } = userState();
  const { isLoggedIn } = userstate
  const { showModal } = uistate;
  const router = useRouter();
  const { user, mutate } = useUser(!isLoggedIn ? false : true);

  useEffect(() => () => {
    if (inputRef.current != null) inputRef.current.checked = false
  }, [])

  useEffect(() => {
    if (router === undefined) return;
  }, [router]);

  async function handleLogout() {
    axios
      .get('/api/logout').then(() => {
        const userFromLogOut = { user: null }
        mutate('/api/user', { ...user, userFromLogOut }, false)
        userDispatch({ type: 'setIsLoggedIn', payload: false })
        router.push('/');
      }).catch(err => console.log('err', err))
  }

  function handleClickOnInput() {
    inputRef.current.checked = false
  }

  return (
    <div className="shadow bg-base-200 drawer">
      <Modal
        message="Are you sure you want to log out of your account?"
        handleLogout={handleLogout}
        showModal={showModal}
        setShowModal={uiDispatch}
      />
      <input
        ref={inputRef}
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
      />
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
            <Nav
              mobile={false} uiDispatch={uiDispatch} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <div className={`${styles['bg-logo']}`} >
          {children}
        </div>

      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay" />
        <Nav
          mobile uiDispatch={uiDispatch} isLoggedIn={isLoggedIn} handleClickOnInput={handleClickOnInput} />
      </div>
    </div>
  )
}
