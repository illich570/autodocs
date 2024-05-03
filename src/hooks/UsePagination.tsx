import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'

const UsePagination = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 5,
    pageIndex: 0,
  })
  const { pageSize, pageIndex } = pagination

  return {
    limit: pageSize,
    onPaginationChange: setPagination,
    pagination,
    offset: pageIndex * pageSize,
  }
}

export default UsePagination
