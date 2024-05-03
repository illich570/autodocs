import DataTable from '@/components/ui/DataTable'
import { useGetDocuments } from '@/queryHooks/useDocuments'
import { formatAmount } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import UsePagination from '@/hooks/UsePagination'

type Document = {
  id: number
  documentType: string
  holderId: number
  createdAt: string
}

const DocumentList = () => {
  const { limit, onPaginationChange, pagination, offset } = UsePagination()
  const { data, isLoading } = useGetDocuments({ limit, offset })

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
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => console.log('Hola')}>
                  Ver documento
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [])

  return (
    <>
      {isLoading && <p>Cargando...</p>}
      <DataTable
        columns={columns}
        data={data?.data?.documents || []}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        totalRows={data?.data?.total || 0}
      />
    </>
  )
}

export default DocumentList
