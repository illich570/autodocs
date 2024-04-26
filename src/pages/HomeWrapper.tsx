import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const HomeWrapper = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({
      to: '/login',
    })
  })
  return (
    <div>
      <h1>HomeWrapper</h1>
    </div>
  )
}
export default HomeWrapper
