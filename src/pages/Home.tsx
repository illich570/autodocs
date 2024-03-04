import { Layout } from '@/components/Layout'
import { CertificateForm } from '@/components/sections/CertificateForm'
import { useState } from 'react'

const Home = () => {
  const [resultPdf, setResultPdf] = useState<string | null>(null)
  return (
    <Layout>
      <div className="p-6">
        <div className="fle flex w-full flex-row space-x-4 pt-6">
          <CertificateForm handleResultPdf={setResultPdf} />
          {resultPdf && (
            <div className="max-w-xl flex-1 rounded-xl border bg-card p-6 text-card-foreground shadow">
              <iframe
                src={`${resultPdf}`}
                style={{
                  width: '100%',
                  height: '100vh',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export { Home }
