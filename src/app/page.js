import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <span>pshenmic's development page</span>

      <div className={"github"}>
        <img src={"assets/img.png"}/>
        <div>open source blockchain developer</div>
        <a href={"https://github.com/pshenmic"}>github.com/pshenmic</a>
      </div>
    </main>
  )
}
