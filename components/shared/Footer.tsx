import Link from 'next/link'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-500 text-center p-5">
      <div className="flex justify-center flex-no-shrink text-black mr-6 mb-2 lg:my-0">
        <Link
          href="/"
          className="pl-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-800"
        >
          TOP
        </Link>
      </div>
      <div className="my-2">Copyright© XXX , 2022 All Rights Reserved.</div>
    </footer>
  )
}

export default Footer
