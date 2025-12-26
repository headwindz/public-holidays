import * as flags from 'country-flag-icons/react/3x2'

export const FlagIcon = ({
  code,
  className = 'w-6 h-4',
}: {
  code: string
  className?: string
}) => {
  // Map non-standard codes to ISO 3166-1 alpha-2 codes
  const codeMap: Record<string, string> = {
    UK: 'GB', // United Kingdom
  }

  const countryOrRegionCode = codeMap[code.toUpperCase()] || code.toUpperCase()
  //@ts-expect-error null
  const Flag = flags[countryOrRegionCode]
  return Flag ? (
    <Flag className={className} />
  ) : (
    <span className={className}>🏳️</span>
  )
}
