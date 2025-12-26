'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { FlagIcon } from './FlagIcon'
import { SUPPORTED_COUNTRIES_REGIONS } from '@/app/constants'

export const SupportedCountries = () => {
  const [showAllCountries, setShowAllCountries] = useState(false)

  const renderCountry = (
    countryOrRegions: { code: string; name: string },
    index: number
  ) => (
    <div
      key={countryOrRegions.code}
      className="bg-gradient-to-r to-white border rounded-lg flex from-gray-50 border-gray-200 p-3 transition-all animate-in gap-3 items-center fade-in dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 hover:shadow-md hover:scale-105"
      style={{
        animationDelay: `${index * 30}ms`,
        animationDuration: '300ms',
        animationFillMode: 'both',
      }}
    >
      <FlagIcon code={countryOrRegions.code} className="rounded h-8 w-12" />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-900 truncate dark:text-white">
          {countryOrRegions.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {countryOrRegions.code}
        </div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardTitle>Supported Countries & Regions</CardTitle>
      <div className="grid transition-all gap-3 grid-cols-1 duration-500 sm:grid-cols-2 lg:grid-cols-3">
        {(showAllCountries
          ? SUPPORTED_COUNTRIES_REGIONS
          : SUPPORTED_COUNTRIES_REGIONS.slice(0, 12)
        ).map(renderCountry)}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAllCountries(!showAllCountries)}
          className="cursor-pointer font-medium text-sm py-2 px-4 transition-colors gap-2 inline-flex items-center dark:text-blue-400  dark:hover:text-blue-300"
        >
          {showAllCountries ? (
            <>
              <span>View less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>
                View more ({SUPPORTED_COUNTRIES_REGIONS.length - 12} more)
              </span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </Card>
  )
}
