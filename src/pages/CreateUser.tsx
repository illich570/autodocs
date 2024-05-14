import { Layout } from '@/components/Layout'
import CreateUserForm from '@/components/sections/CreateUserForm'

const CreateUser = () => {
  return (
    <Layout>
      <div className="flex w-full justify-center pt-6">
        <CreateUserForm />
      </div>
    </Layout>
  )
}

export default CreateUser
