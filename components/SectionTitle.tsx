import { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
}

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="font-bold text-center mb-12 text-3xl text-gray-900 dark:text-white">
      {children}
    </h2>
  )
}
