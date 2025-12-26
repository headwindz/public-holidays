interface CardProps {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
      {children}
    </div>
  )
}
