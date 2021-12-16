import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";


import { uiState, uiDispatch } from '../Context/UIContext'
import Modal from '../Modal'


export default function ProfilePage({ }) {

  const { uistate } = uiState();
  const { showModal } = uistate;
  const { uidispatch } = uiDispatch();

  useEffect(() => {
  }, [])

  return (<div className="px-4 md:grid-cols-5 gap-3 grid">

    <div className="card-body card glass ">
      <div className="avatar online">
        <div className="rounded-full w-24 h-24">
          <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
        </div>
      </div>
      <div className="px-4 mt-5">
        <h2 className="card-title">Name</h2>
        <p className="text-sm text-white">*Click on Avatar, name etc. to upate</p>
      </div>
    </div>

    <div className="card-body card glass md:col-span-4" >
      <div className="px-4 ">
        <h2 className="card-title">Info</h2>
        <ul className="list-none">
          <li>Email: </li>
          <li>Interested Activities</li>
          <li>Password:</li>

        </ul>
        <p className="text-sm text-white">*Click on Avatar, namet etc. to upate</p>

      </div>
    </div>
  </div>)

}
