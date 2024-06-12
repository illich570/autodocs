import { Layout } from '@/components/Layout'
import VinculateClientForm from '@/components/sections/VinculateClientForm'

const VinculateClient = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col items-center space-y-4 pt-6">
        <VinculateClientForm />
      </div>
    </Layout>
  )
}

export default VinculateClient
