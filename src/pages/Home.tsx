import { Layout } from '@/components/Layout'
import { CertificateForm } from '@/components/sections/CertificateForm'

const Home = () => {
  return (
    <Layout>
      <div className="p-6">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Inicio</h2>
        <div className="pt-6">
          <CertificateForm />
        </div>
      </div>
    </Layout>
  )
}

export { Home }
