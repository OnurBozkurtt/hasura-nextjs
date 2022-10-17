import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home(products) {
  console.log(products);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <ul>
          {/* {products.map((products) => <li key={products.id}>{products.name}</li>)} */}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const options = {
    method: 'post',
    body: JSON.stringify({
      query: `query fetchProducts{
        products {
          id
          name
        }
      }`,
      operationName: "fetchProducts"
    })
  }
  const fetchResponse = await fetch('https://guiding-guppy-48.hasura.app/v1/graphql', options);
  const responseJson = await fetchResponse.json();
  console.log(responseJson);
  const products = responseJson.data.products;
  return {
    props: {
      products: products
    }, // will be passed to the page component as props
  }
}
