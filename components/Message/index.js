import React, { useEffect } from 'react';


export default function Message({ state, content }) {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const replacers = document.querySelectorAll('[data-replace]');
        for (var i = 0; i < replacers.length; i++) {
          const replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
          Object.keys(replaceClasses).forEach((key) => {
            replacers[i].classList.remove(key);
            replacers[i].classList.add(replaceClasses[key]);
          });
        }
      }, 0);
    });
  }, [])

  return (
    <>
      {{
        Warning:
          <div
            className="animate-fade-in-down my-4 py-2 p-3 text-orangeDark bg-orangeLight border border-orange-500 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Please note:</strong>
            <span className="block sm">{content}</span>
          </div>,
        Success:
          <div
            className="my-4 py-2 p-3  text-green-700 bg-green-100 border border-green-300 rounded relative animate-fade-in-down"
            role="alert"
          >
            <p className="font-bold">Success:</p>
            <strong className="font-bold">{content}</strong>
          </div>,
        Error:
          <div className="animate-fade-in-down relative my-4 py-2 pl-3 pr-10 leading-normal text-red-700 bg-red-100 border border-red-700 rounded-lg" role="alert">
            <p className="font-bold">Error:
            </p>
            <p>{content}</p>
          </div>,
        SuccessAlert:
          <div className="animate-fade-in-down alert alert-success flex items-center justify-center text-green-700 bg-green-100 border-4 border-green-300">
            <div className="center-self">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <label>{content}</label>
            </div>
          </div>
      }[state]}
    </>
  )
}
