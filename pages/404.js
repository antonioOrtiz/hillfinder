import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function FourOhFour() {
  const router = useRouter()

  return (
    <>
      <div className="hero min- bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <div>
            <h1 className="mb-5 text-5xl text-white font-bold">
              404 - Page Not Found;
            </h1>
            <p className="mb-5 text-white">
              <span className="text-2xl">"/{router.asPath.substring(1)}"</span> could not be found.{' '}
            </p>
            <button className="btn btn-primary ">
              <Link href="/">
                <a className="block text-center">Home</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
