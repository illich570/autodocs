import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/UseBreakpoint'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>
  pagination: {
    pageIndex: number
    pageSize: number
  }
  totalRows: number
}

const listRows = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '50',
    value: 50,
  },
]

const DataTable = <TData, TValue>({
  columns,
  data,
  onPaginationChange,
  pagination,
  totalRows,
}: DataTableProps<TData, TValue>) => {
  const isMobile = useIsMobile()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: onPaginationChange,
    manualPagination: true,
    rowCount: totalRows,
    state: {
      pagination,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  })

  const mobileTextClass = cn({ 'text-xs': isMobile })

  return (
    <div className="relative w-full overflow-auto rounded-md border bg-white p-2 shadow-sm dark:bg-gray-800">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={mobileTextClass}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={mobileTextClass}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {Array.from(
                {
                  length: table.getState().pagination.pageSize - table.getRowModel().rows.length,
                },
                (_, i) => i,
              ).map((element) => (
                <TableRow key={`index_${element}`} className="h-16 w-full border-transparent" />
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={cn('h-24 text-center', mobileTextClass)}
              >
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className={cn(
          'flex items-center justify-end space-x-2 py-4',
          isMobile && 'justify-center space-x-1',
        )}
      >
        <div className="flex items-center justify-center space-x-2">
          <p className={cn('text-sm font-medium', mobileTextClass)}>Filas por página: </p>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className={cn('h-8 w-[70px]', mobileTextClass)}>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {listRows.map((item) => (
                <SelectItem key={item.value} value={`${item.value}`} className={mobileTextClass}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          className={cn(
            'flex w-[100px] items-center justify-center text-sm font-medium',
            mobileTextClass,
          )}
        >
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={mobileTextClass}
        >
          <ArrowLeft size={isMobile ? 12 : 16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={mobileTextClass}
        >
          <ArrowRight size={isMobile ? 12 : 16} />
        </Button>
      </div>
    </div>
  )
}

export default DataTable
