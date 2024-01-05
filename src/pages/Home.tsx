import { Layout } from '@/components/Layout'
import { Link } from 'wouter'

const Home = () => {
  return (
    <Layout>
      <div>Hola!</div>
      <div>Probando!</div>
      <Link href="/about">Ven a otra ruta</Link>
    </Layout>
  )
}

export { Home }
