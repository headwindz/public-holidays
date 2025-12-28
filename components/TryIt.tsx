'use client'

import { useState } from 'react'
import { Terminal, Calendar, Globe, Zap, Loader2 } from 'lucide-react'
import { SUPPORTED_COUNTRIES_REGIONS } from '@/app/constants'
import { FlagIcon } from './FlagIcon'
import { Dropdown } from './Dropdown'
import { Response } from './Response'
import { SectionTitle } from './SectionTitle'

export const TryIt = () => {
  const [year, setYear] = useState('2025')
  const [code, setCode] = useState('cn')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTryIt = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/public-holidays?year=${year}&code=${code}`)
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="try-it">
      <SectionTitle>Try It Out</SectionTitle>
      <div className="mx-auto max-w-4xl">
        <div className="bg-white border rounded-xl border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="py-5 px-6">
            <div className="flex mb-4 gap-3 items-center">
              <Terminal className="h-6 text-white w-6" />
              <h3 className="font-semibold text-white">API Endpoint</h3>
            </div>
            <div className="rounded-lg bg-white/10 py-2 px-4 backdrop-blur-sm">
              <code className="font-mono text-base text-white">
                GET /api/public-holidays?year={year}&code={code}
              </code>
            </div>
          </div>

          <div className="space-y-6 px-6 pb-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Dropdown
                label="Year"
                icon={<Calendar className="h-4 text-blue-500 w-4" />}
                value={year}
                onChange={setYear}
                options={['2020', '2021', '2022', '2023', '2024', '2025'].map(
                  (y) => ({
                    value: y,
                    label: y,
                  })
                )}
              />
              <Dropdown
                label="Country/Region Code"
                icon={<Globe className="h-4 text-blue-500 w-4" />}
                value={code}
                onChange={setCode}
                options={[...SUPPORTED_COUNTRIES_REGIONS]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country) => ({
                    value: country.code.toLowerCase(),
                    label: (
                      <span className="flex gap-2 items-center">
                        <FlagIcon
                          code={country.code}
                          className="rounded h-4 w-6 shrink-0"
                        />
                        <span className="truncate">
                          {country.code} - {country.name}
                        </span>
                      </span>
                    ),
                    searchText: `${country.code} ${country.name}`,
                  }))}
                searchable
                searchPlaceholder="Search countries or regions..."
                renderSelected={(value) => (
                  <span className="flex gap-2 items-center">
                    <FlagIcon code={value} className="rounded h-4 w-6" />
                    <span className="truncate">
                      {value.toUpperCase()} -{' '}
                      {
                        SUPPORTED_COUNTRIES_REGIONS.find(
                          (c) => c.code.toLowerCase() === value
                        )?.name
                      }
                    </span>
                  </span>
                )}
              />
            </div>

            <button
              onClick={handleTryIt}
              disabled={loading}
              className="bg-gradient-to-r rounded-lg flex font-semibold from-blue-600 to-indigo-600 text-white w-full py-3 px-6 transition-all gap-2 items-center justify-center hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 animate-spin w-5" />
                  Loading...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Send Request
                </>
              )}
            </button>

            <Response response={response} />
          </div>
        </div>
      </div>
    </section>
  )
}
