import Link from 'next/link'
import type { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linkContainer}>
        <Link href='/' className={styles.link}>
          TOP
        </Link>
      </div>
      <div className={styles.copyright}>
        Copyright© XXX , 2024 All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
