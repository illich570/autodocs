import { Layout } from '@/components/Layout'
import DocumentList from '@/components/sections/DocumentList'

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full flex-col">
        <DocumentList />
      </div>
    </Layout>
  )
}

export default Dashboard
