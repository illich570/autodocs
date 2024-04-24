import LoginForm from '@/components/sections/LoginForm'
import Card from '@/components/ui/Card'

const Login = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <main className="flex h-full w-full flex-1 border-b">
        <div className="container flex w-full flex-col items-center justify-center">
          <Card className="w-full max-w-md">
            <h3 className="pb-2 text-center text-2xl font-semibold tracking-tight first:mt-0">
              Iniciar sesión
            </h3>
            <LoginForm />
          </Card>
        </div>
      </main>
      <footer className="border-t py-2 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4  md:h-24 md:flex-row">
          <p className="text-balance text-center leading-loose text-muted-foreground md:text-left">
            Built by IllichR. 2024
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Login
