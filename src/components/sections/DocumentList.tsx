import DataTable from '@/components/ui/DataTable'
import { useGetDocuments } from '@/queryHooks/useDocuments'
import { formatAmount } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'

type Document = {
  id: number
  documentType: string
  holderId: number
  createdAt: string
}

const DocumentList = () => {
  const { data, isLoading } = useGetDocuments()

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
    ]
  }, [])

  return (
    <>
      {isLoading && <p>Cargando...</p>}
      <DataTable columns={columns} data={data?.data?.documents || []} />
    </>
  )
}

export default DocumentList
