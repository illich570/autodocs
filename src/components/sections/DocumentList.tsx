import DataTable from '@/components/ui/DataTable'
import { useGetDocumentFile, useGetDocuments } from '@/queryHooks/useDocuments'
import { formatAmount } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import usePagination from '@/hooks/UsePagination'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Document = {
  id: number
  documentType: string
  holderId: number
  createdAt: string
}

const DocumentList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null)

  const { limit, onPaginationChange, pagination, offset } = usePagination()
  const { data, isLoading } = useGetDocuments({ limit, offset })
  const { data: resultPdf } = useGetDocumentFile(selectedDocument)

  const columns = useMemo<ColumnDef<Document>[]>(() => {
    return [
      {
        accessorKey: 'id',
        header: 'N° de documento',
      },
      {
        accessorKey: 'holderId',
        header: 'C.I titular',
        cell: ({ row }) => formatAmount(row.getValue('holderId')) || 'N/A',
      },
      {
        accessorKey: 'documentType',
        header: 'Nombre',
      },
      {
        accessorKey: 'createdAt',
        header: 'Fecha de creación',
        cell: ({ row }) => format(row.getValue('createdAt'), 'dd/MM/yyyy hh:mm a'),
      },
      {
        header: 'Acciones',
        id: 'actions',
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSelectedDocument(row.getValue('id'))}
                  className="cursor-pointer"
                >
                  Ver documento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [])

  useEffect(() => {
    if (resultPdf) {
      setOpenModal(true)
    }
  }, [resultPdf])
  return (
    <>
      <h2 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">Lista de documentos</h2>
      {isLoading && <p>Cargando...</p>}
      <DataTable
        columns={columns}
        data={data?.data?.documents || []}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        totalRows={data?.data?.total || 0}
      />
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-h-screen md:max-w-3xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Documento</DialogTitle>
          </DialogHeader>
          <div className="flex flex-1 flex-col">
            <div className="w-full">
              {resultPdf ? (
                <iframe
                  src={URL.createObjectURL(resultPdf)}
                  style={{
                    width: '100%',
                    height: '65vh',
                    marginBottom: '1rem',
                  }}
                />
              ) : null}
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-3">
              <Button
                type="button"
                className="w-[240px]"
                variant="outline"
                onClick={() => {
                  setOpenModal(false)
                  setSelectedDocument(null)
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DocumentList
