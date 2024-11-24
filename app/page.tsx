import styles from './page.module.scss'

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1>index</h1>
      </div>
      <div className={styles.rightSection}>
        <div>right</div>
      </div>
    </div>
  )
}
