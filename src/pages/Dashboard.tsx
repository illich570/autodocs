import { Layout } from '@/components/Layout'
import DocumentList from '@/components/sections/DocumentList'

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">Lista de documentos</h2>
      <div className="flex w-full">
        <DocumentList />
      </div>
    </Layout>
  )
}

export default Dashboard
