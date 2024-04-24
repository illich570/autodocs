import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}
const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow ${className ? className : null}`}
    >
      {children}
    </div>
  )
}

export default Card
