import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <nav className="flex items-center justify-center lg:justify-between flex-wrap bg-white p-4 border-b-4 border-black text-black top-0 z-10">
      <div className="flex items-center flex-no-shrink text-black mr-6 mb-2 lg:my-0">
        <Link href="/">
          <span className="font-bold text-2xl tracking-tight cursor-pointer">Sample</span>
        </Link>
        <Link
          href="/todo/ssr"
          className="pl-5 hidden lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-800"
        >
          Todos(SSR)
        </Link>
        <Link
          href="/todo/csr"
          className="pl-5 hidden lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-800"
        >
          Todos(CSR)
        </Link>
      </div>
      <div className="flex lg:items-center lg:w-auto">
        <div>right</div>
      </div>
    </nav>
  )
}

export default Header
