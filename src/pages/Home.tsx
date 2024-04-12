import { Layout } from '@/components/Layout'
import { CertificateForm } from '@/components/sections/CertificateForm'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

const Home = () => {
  const [resultPdf, setResultPdf] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (resultPdf) {
      setOpenModal(true)
    }
  }, [resultPdf])

  return (
    <Layout>
      <div className="p-6">
        <div className="flex w-full flex-row justify-center space-x-4 pt-6">
          <CertificateForm handleResultPdf={setResultPdf} />
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="max-h-screen md:max-w-3xl lg:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Documento generado!</DialogTitle>
              </DialogHeader>
              <div className="flex flex-1 flex-col">
                <div className="w-full">
                  <iframe
                    src={`${resultPdf}`}
                    style={{
                      width: '100%',
                      height: '65vh',
                      marginBottom: '1rem',
                    }}
                  />
                </div>
                <div className="flex w-full flex-col items-center justify-center space-y-3">
                  {/* <h4 className="text-center text-2xl">Acciones</h4>
                    <Button
                      type="button"
                      className="w-[240px]"
                      variant="informative"
                      onClick={returnToForm}
                    >
                      {' '}
                      Descargar
                    </Button>
                    <Button
                      type="button"
                      className="w-[240px]"
                      variant="success"
                      onClick={returnToForm}
                    >
                      {' '}
                      Descargar
                    </Button> */}
                  <Button type="button" className="w-[240px]" variant="outline">
                    Ir a Inicio
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  )
}

export { Home }
