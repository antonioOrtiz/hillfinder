import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";


import { uiState, uiDispatch } from '../Context/UIContext'
import Modal from '../Modal'


export default function ProfilePage({ }) {
  const textInput = useRef([]);

  const profileData = [
    {
      id: 1,
      name: "Email:",
      value: "",
    },
    {
      id: 2,
      name: "Interested Activities:",
      value: "",
    },
    {
      id: 3,
      name: "Password:",
      value: "",

    },
    {
      id: 4,
      name: "Member since:",
      value: "",

    },
  ];

  function handleClick(ind) {
    textInput.current[ind].focus();
  }

  const [profileValues, setProfileValues] = useState(profileData)
  const { uistate } = uiState();
  const { showModal } = uistate;
  const { uidispatch } = uiDispatch();

  useEffect(() => {
  }, []);


  return (<div className="px-4 gap-3 grid">

    <div className="card-body card glass ">
      <div className="avatar online flex flex-row justify-center">
        <div className="rounded-full w-24 h-24">
          <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
        </div>
      </div>
      <div className="divider glass h-px " />
      <div className="px-4 mt-5">
        <h2 className="card-title text-textColor" >Name</h2>
        <p className="text-sm text-textColor block mb-5">Click on text e.g. "Interested Activities" to upate values.</p>

      </div>

      <div className="px-4 ">
        <ul className="list-none">
          {profileValues.map((data, index) => {
            const { id, name, value } = data
            return (
              <li key={id} className="text-textColor" onClick={() => handleClick(index)}>{name}{' '}
                <input
                  ref={(el) => textInput.current.push(el)}
                  type="text"
                  value={value}
                  className=" mt-1 mb-2 bg-transparent border-0 px-3 py-3 text-textColor   rounded focus:outline-none focus:ring w-full"
                  onChange={(e) => {
                    console.log("e.target.value; ", e.target.value);
                    data.value = e.target.value;
                    setProfileValues([...profileValues]);
                  }}
                />

              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </div >)

}
