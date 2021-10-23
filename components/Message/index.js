import { useEffect } from 'react';


export default function Message({ state, content }) {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const replacers = document.querySelectorAll('[data-replace]');
        for (var i = 0; i < replacers.length; i++) {
          console.log('hit here2');
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
        Waring:
          <div
            className="animate-fade-in-down my-4 py-2 p-3  text-orangeDark bg-orangeLight border border-orangeDark-300 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Waring:</strong>
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
          </div>
      }[state]}
    </>
  )
}
