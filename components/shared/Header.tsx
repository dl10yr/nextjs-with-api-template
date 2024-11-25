import Link from 'next/link'
import type { FC } from 'react'
import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navItem}>
        <Link href='/'>
          <span className={styles.title}>Sample</span>
        </Link>
        <Link href='/todo/ssr' className={styles.link}>
          Todos(SSR)
        </Link>
        <Link href='/todo/csr' className={styles.link}>
          Todos(CSR)
        </Link>
      </div>
      <div className={styles.rightSection}>
        <div>right</div>
      </div>
    </nav>
  )
}

export default Header
