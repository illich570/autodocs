import { Layout } from '@/components/Layout'
import { CertificateForm } from '@/components/sections/CertificateForm'

const Home = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex w-full flex-col items-center pt-6">
          <CertificateForm />
        </div>
      </div>
    </Layout>
  )
}

export { Home }
