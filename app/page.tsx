'use client'

import { useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { SUPPORTED_COUNTRIES_REGIONS } from './constants'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FlagIcon } from '@/components/FlagIcon'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FeatureSection } from '@/components/FeatureSection'
import { QueryParams } from '@/components/QueryParams'
import { ResponseFormat } from '@/components/ResponseFormat'
import { ExampleUsage } from '@/components/ExampleUsage'
import { Card } from '@/components/Card'
import { CardTitle } from '@/components/CardTitle'
import { SupportedCountries } from '@/components/SupportedCountries'

export default function Home() {
  const [year, setYear] = useState('2025')
  const [code, setCode] = useState('cn')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [countrySearch, setCountrySearch] = useState('')

  const handleTryIt = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/public-holidays?year=${year}&code=${code}`)
      const data = await res.json()
      setResponse(data)
      setIsExpanded(true)
    } catch (error) {
      // @ts-expect-error null
      setResponse({ error: 'Error fetching data' })
      setIsExpanded(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-b to-white min-h-screen from-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <FeatureSection />

        {/* Try It Section */}
        <section id="try-it" className="py-20">
          <h2 className="font-bold text-center mb-4 text-3xl text-gray-900 dark:text-white">
            Try It Out
          </h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
            Test the API right here in your browser
          </p>

          <div className="mx-auto max-w-4xl">
            <div className="bg-white border rounded-xl border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
              <div className="py-5 px-6">
                <div className="flex mb-4 gap-3 items-center">
                  <svg
                    className="h-6 text-white w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
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
                  <div>
                    <label className="flex font-medium text-sm mb-2 text-gray-700 gap-2 items-center dark:text-gray-300">
                      <svg
                        className="h-4 text-blue-500 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Year
                    </label>
                    <Listbox value={year} onChange={setYear}>
                      <div className="relative">
                        <Listbox.Button className="bg-white border rounded-lg cursor-pointer border-gray-300 text-left w-full py-3 pr-10 pl-4 transition-all relative dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                          <span className="block truncate">{year}</span>
                          <span className="flex pr-3 inset-y-0 right-0 pointer-events-none absolute items-center">
                            <svg
                              className="h-5 text-gray-400 w-5"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 8l4 4 4-4"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="bg-white rounded-lg shadow-lg ring-black mt-1 w-full max-h-60 py-1 ring-1 ring-opacity-5 z-10 absolute overflow-auto dark:bg-gray-700 focus:outline-none">
                            {['2023', '2024', '2025'].map((yearOption) => (
                              <Listbox.Option
                                key={yearOption}
                                value={yearOption}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                                      : 'text-gray-900 dark:text-gray-100'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      }`}
                                    >
                                      {yearOption}
                                    </span>
                                    {selected && (
                                      <span className="flex pl-3 inset-y-0 left-0 text-blue-600 absolute items-center dark:text-blue-400">
                                        <svg
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <label className="flex font-medium text-sm mb-2 text-gray-700 gap-2 items-center dark:text-gray-300">
                      <svg
                        className="h-4 text-blue-500 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Country/Region Code
                    </label>
                    <Listbox value={code} onChange={setCode}>
                      <div className="relative">
                        <Listbox.Button className="bg-white border rounded-lg cursor-pointer border-gray-300 text-left w-full py-3 pr-10 pl-4 transition-all relative dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                          <span className="flex gap-2 items-center">
                            <FlagIcon code={code} className="rounded h-4 w-6" />
                            <span className="truncate">
                              {code.toUpperCase()} -{' '}
                              {
                                SUPPORTED_COUNTRIES_REGIONS.find(
                                  (c) => c.code.toLowerCase() === code
                                )?.name
                              }
                            </span>
                          </span>
                          <span className="flex pr-3 inset-y-0 right-0 pointer-events-none absolute items-center">
                            <svg
                              className="h-5 text-gray-400 w-5"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 8l4 4 4-4"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setCountrySearch('')}
                        >
                          <Listbox.Options className="bg-white rounded-lg shadow-lg ring-black mt-1 w-full max-h-60 py-1 ring-1 ring-opacity-5 z-10 absolute dark:bg-gray-700 focus:outline-none">
                            <div className="bg-white px-2 pt-1 pb-2 top-0 sticky dark:bg-gray-700">
                              <input
                                type="text"
                                className="border rounded-md border-gray-300 text-sm w-full py-2 px-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Search countries..."
                                value={countrySearch}
                                onChange={(e) =>
                                  setCountrySearch(e.target.value)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="max-h-48 overflow-auto">
                              {[...SUPPORTED_COUNTRIES_REGIONS]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .filter((country) =>
                                  countrySearch
                                    ? country.name
                                        .toLowerCase()
                                        .includes(
                                          countrySearch.toLowerCase()
                                        ) ||
                                      country.code
                                        .toLowerCase()
                                        .includes(countrySearch.toLowerCase())
                                    : true
                                )
                                .map((country) => (
                                  <Listbox.Option
                                    key={country.code}
                                    value={country.code.toLowerCase()}
                                    className={({ active }) =>
                                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                                          : 'text-gray-900 dark:text-gray-100'
                                      }`
                                    }
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`flex items-center gap-2 ${
                                            selected
                                              ? 'font-semibold'
                                              : 'font-normal'
                                          }`}
                                        >
                                          <FlagIcon
                                            code={country.code}
                                            className="rounded h-4 w-6 shrink-0"
                                          />
                                          <span className="truncate">
                                            {country.code} - {country.name}
                                          </span>
                                        </span>
                                        {selected && (
                                          <span className="flex pl-3 inset-y-0 left-0 text-blue-600 absolute items-center dark:text-blue-400">
                                            <svg
                                              className="h-5 w-5"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                            </div>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <button
                  onClick={handleTryIt}
                  disabled={loading}
                  className="bg-gradient-to-r rounded-lg flex font-semibold from-blue-600 to-indigo-600 text-white w-full py-3 px-6 transition-all gap-2 items-center justify-center hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 animate-spin w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Send Request
                    </>
                  )}
                </button>

                {response && (
                  <div className="border rounded-lg border-gray-200 mt-6 overflow-hidden dark:border-gray-700">
                    <div className="bg-gradient-to-r flex from-gray-50 to-gray-100 py-3 px-4 items-center justify-between dark:from-gray-700 dark:to-gray-750">
                      <div className="flex gap-2 items-center">
                        <svg
                          className="h-5 text-green-500 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          Response
                        </h4>
                      </div>
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex text-sm transition-colors text-gray-600 gap-1 items-center dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        aria-label={
                          isExpanded ? 'Collapse response' : 'Expand response'
                        }
                      >
                        {isExpanded ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="rounded-lg bg-gray-900 max-h-200 p-4 overflow-auto">
                        <JsonView
                          src={response}
                          theme="winter-is-coming"
                          collapsed={false}
                          collapseStringsAfterLength={100}
                          enableClipboard={true}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="documentation" className="pb-20">
          <h2 className="font-bold text-center mb-12 text-3xl text-gray-900 dark:text-white">
            API Documentation
          </h2>

          <div className="mx-auto space-y-8 max-w-4xl">
            <Card>
              <CardTitle>Endpoint</CardTitle>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <code className="text-blue-600 dark:text-blue-400">
                  GET /api/public-holidays
                </code>
              </div>
            </Card>

            <QueryParams />

            <ResponseFormat />

            <SupportedCountries />

            <ExampleUsage />
          </div>
        </section>
      </main>
    </div>
  )
}
