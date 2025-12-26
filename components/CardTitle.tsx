interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return (
    <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
      {children}
    </h3>
  )
}
