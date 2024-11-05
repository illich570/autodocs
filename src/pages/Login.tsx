import LoginForm from '@/components/sections/LoginForm'
import Card from '@/components/ui/Card'

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-blue-400 to-orange-400 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="flex h-full w-full flex-1">
        <div className="container flex w-full flex-col items-center justify-center">
          <Card className="w-full max-w-md space-y-1">
            <h3 className="pb-2 text-center text-2xl font-semibold leading-none tracking-tight first:mt-0">
              Iniciar sesión
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Ingresa tus credenciales para acceder
            </p>
            <LoginForm />
            <p className="text-balance text-center leading-loose text-muted-foreground">
              Built by IllichR. 2024
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Login
