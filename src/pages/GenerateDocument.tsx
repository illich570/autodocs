import { Layout } from '@/components/Layout'
import { CertificateForm } from '@/components/sections/CertificateForm'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSidebar } from '@/contexts/SidebarContext'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const GenerateDocument = () => {
  const [resultPdf, setResultPdf] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { isMobile } = useSidebar()

  useEffect(() => {
    if (resultPdf) {
      setOpenModal(true)
    }
  }, [resultPdf])

  const handleDownload = () => {
    if (!resultPdf) return
    const link = document.createElement('a')
    link.href = resultPdf
    link.setAttribute('download', 'documento.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Layout>
      <div className="flex w-full flex-row justify-center pt-6">
        <CertificateForm handleResultPdf={setResultPdf} />
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-h-screen md:max-w-3xl lg:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Documento generado!</DialogTitle>
            </DialogHeader>
            <div className="flex flex-1 flex-col">
              {!isMobile && (
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
              )}
              <div className="flex w-full flex-col items-center justify-center space-y-3">
                {isMobile ? (
                  <Button
                    type="button"
                    className="w-[240px]"
                    variant="success"
                    onClick={handleDownload}
                  >
                    Descargar documento
                  </Button>
                ) : null}
                <Button type="button" className="w-[240px]" variant="outline">
                  <Link to="/dashboard">Ir a Inicio</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default GenerateDocument
