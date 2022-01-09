import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import getProfile from '../../clientApi/GetProfile'
import { useUser } from '../../lib/hooks'


export default function ProfilePage({ }) {
  const notInterestedActivitiesRef = useRef();
  const interestedActivitiesRef = useRef();
  const { user } = useUser();

  const [profileDataFromApi, setProfileDataFromApi] = useState([]);
  const [interestedActivities, setInterestedActivities] = useState([])
  const [memberSince, setMemberSince] = useState('')
  const [profileLoaded, setProfileLoaded] = useState(true);

  useEffect(() => console.log("interestedActivities ", interestedActivities))

  useEffect(async () => {
    notInterestedActivitiesRef.current = "notInterestedActivitiesRef"
    interestedActivitiesRef.current = "interestedActivitiesRef"
    if (user !== undefined && profileLoaded) {
      setProfileLoaded(false);

      const fetchProfile = async () => {
        const { data } = await getProfile();
        const { email } = data[0]._user
        const obj = data[0];
        const { __v, _user, _id, 'member-since': memberSince, ...profile } = obj;

        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');

        setMemberSince(fomatted_date)

        profile.email = email;

        for (const profileProp in profile) {
          if (profileProp === 'interested-activities') {
            setInterestedActivities(oldArray => [...oldArray, { id: uuidv4(), 'name': profileProp, 'value': profile[profileProp] }]);
          } else {
            setProfileDataFromApi(oldArray => [...oldArray, { id: uuidv4(), 'name': profileProp, 'value': profile[profileProp] }]);
          }
        }

      }
      fetchProfile()
    }
    return () => { setProfileLoaded(true) }
  }, [])


  function handleClick(e) {
    e.target.firstChild?.nextElementSibling?.focus()
    if (e.target.nextElementSibling?.nodeName === 'INPUT') {
      e.target.nextElementSibling?.focus()
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode === 188) {
      const newArr = [...interestedActivities];
      newArr[0].value.push(e.target.value.slice(0, - 1));
      setInterestedActivities(newArr)
      e.target.value = ''
    }
  }

  function profileDataFromApiHandleChange(index, e) {
    const newArr = [...profileDataFromApi];
    newArr[index].value = e.target.value;
    setProfileDataFromApi(newArr)
  };

  return (<div className="px-4 gap-3 grid">
    <div className="card-body card glass ">
      <div className="avatar online flex justify-center items-center">
        <div className="rounded-full w-24 h-24">
          <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
        </div>
        <p className="ml-2 text-sm  text-textColor">Member Since: <br />{memberSince}</p>



      </div>
      <div className="divider glass h-px " />
      <div className="px-4 mt-5">
        <p className="text-sm text-textColor block mb-5">Click on text e.g. "name, email" etc. to upate values.</p>
      </div>

      <div className="px-4 ">
        <ul className="list-none">
          {profileDataFromApi.map((data, index) => {
            const { id, name, value } = data
            return (
              <li key={id} className="text-textColor mt-1 mb-5" onClick={handleClick}>{`${name}:`}{' '}
                <input
                  ref={notInterestedActivitiesRef}
                  type="text"
                  value={value}
                  onChange={(e) => profileDataFromApiHandleChange(index, e)}
                  className="mt-2 mb-1 bg-input border-0 px-3 py-3 text-textColor   rounded focus:outline-none focus:ring w-full"
                />
              </li>
            )
          })}
        </ul>
        <ul className="mt-3">
          <li className="text-textColor" onClick={handleClick}>Interested activities: <span className='text-sm'><br />Accept comma separated input:</span></li>
          <input
            type="text"
            onKeyUp={handleKeyUp}
            className="mt-2 mb-5 bg-input border-0 px-3 py-3 text-textColor   rounded focus:outline-none focus:ring w-full"
          />
        </ul>
        <div className="mt-3">
          <p>{interestedActivities[0]?.value && interestedActivities[0].value.join(', ')}</p>
        </div>
      </div>
    </div>
  </div >)

}
