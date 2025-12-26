'use client'

import { useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { SUPPORTED_COUNTRIES_REGIONS } from './constants'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import * as flags from 'country-flag-icons/react/3x2'

const FlagIcon = ({
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
export default function Home() {
  const [year, setYear] = useState('2025')
  const [code, setCode] = useState('cn')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [showAllCountries, setShowAllCountries] = useState(false)
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
      {/* Hero Section */}
      <header className="border-gray-200 dark:border-gray-700">
        <div className="flex mx-auto max-w-7xl py-4 px-4 items-center justify-between sm:px-6 lg:px-8">
          <div className="flex space-x-4 items-center">
            <img src="/favicon.ico" alt="Logo" className="h-6 w-6" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Public Holidays API
            </span>
          </div>
          <a
            href="https://github.com/headwindz/public-holidays"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="View on GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center py-20">
          <h1 className="font-extrabold tracking-tight text-5xl text-gray-900 sm:text-6xl dark:text-white">
            Accurate Public Holiday Data
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              For Every Country/Region
            </span>
          </h1>
          <p className="mx-auto mt-6 text-xl max-w-3xl text-gray-600 dark:text-gray-300">
            Free and open-source API providing comprehensive public holiday
            information for 59 countries/regions worldwide. Perfect for
            scheduling, calendar apps, and HR systems.
          </p>
          <div className="flex flex-col mt-10 gap-4 justify-center sm:flex-row">
            <a
              href="#try-it"
              className="rounded-lg font-semibold bg-blue-600 shadow-lg text-white py-4 px-8 transition-colors hover:bg-blue-700"
            >
              Try It Now
            </a>
            <a
              href="#documentation"
              className="bg-white rounded-lg font-semibold shadow-lg py-4 px-8 transition-colors text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View Documentation
            </a>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="font-bold text-center mb-12 text-3xl text-gray-900 dark:text-white">
            Why Choose Our API?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <div className="mb-4 text-4xl">🌐</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                59 Countries/Regions Covered
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive coverage across Asia-Pacific, Europe, Americas,
                Middle East, and Africa with accurate regional data.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <div className="mb-4 text-4xl">📅</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                Historical & Future Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access holiday data for 2023 and forward, with plans to expand
                further.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <div className="mb-4 text-4xl">🎯</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                Rich Metadata
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Includes local names, holiday types, duration support.
              </p>
            </div>
          </div>
        </section>

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
            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                Endpoint
              </h3>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <code className="text-blue-600 dark:text-blue-400">
                  GET /api/public-holidays
                </code>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                Query Parameters
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">
                      Parameter
                    </th>
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">
                      Type
                    </th>
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3">
                      <code className="text-blue-600 dark:text-blue-400">
                        year
                      </code>
                    </td>
                    <td className="py-3">string</td>
                    <td className="py-3">{`Year (e.g., "2024", "2025")`}</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <code className="text-blue-600 dark:text-blue-400">
                        code
                      </code>
                    </td>
                    <td className="py-3">string</td>
                    <td className="py-3">
                      {`ISO 2-letter country/region code (e.g., "cn", "us", "uk")`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                Response Format
              </h3>
              <div className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
                <JsonView
                  src={{
                    data: [
                      {
                        localName: '元旦',
                        name: "New Year's Day",
                        code: 'CN',
                        fixed: true,
                        global: true,
                        counties: null,
                        launchYear: null,
                        types: ['Public'],
                        startDate: '2025-01-01T00:00:00.000Z',
                        endDate: '2025-01-01T23:59:59.999Z',
                      },
                    ],
                  }}
                  theme="winter-is-coming"
                  collapsed={false}
                  collapseStringsAfterLength={100}
                  enableClipboard={true}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                Supported Countries & Regions (59)
              </h3>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {(showAllCountries
                  ? SUPPORTED_COUNTRIES_REGIONS
                  : SUPPORTED_COUNTRIES_REGIONS.slice(0, 12)
                ).map((countryOrRegions) => (
                  <div
                    key={countryOrRegions.code}
                    className="bg-gradient-to-r to-white border rounded-lg flex from-gray-50 border-gray-200 p-3 transition-all gap-3 items-center dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 hover:shadow-md hover:scale-105"
                  >
                    <FlagIcon
                      code={countryOrRegions.code}
                      className="rounded h-8 w-12"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate dark:text-white">
                        {countryOrRegions.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {countryOrRegions.code}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllCountries(!showAllCountries)}
                  className="font-medium text-sm py-2 px-4 transition-colors text-blue-600 gap-2 inline-flex items-center dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {showAllCountries ? (
                    <>
                      <span>View less</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>
                        View more ({SUPPORTED_COUNTRIES_REGIONS.length - 12}{' '}
                        more)
                      </span>
                      <svg
                        className="h-4 w-4"
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
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800">
              <h3 className="font-semibold text-xl mb-6 text-gray-900 dark:text-white">
                Example Usage
              </h3>
              <div className="space-y-6">
                <div className="border rounded-lg border-gray-200 overflow-hidden dark:border-gray-700">
                  <div className="bg-gradient-to-r border-b from-blue-50 to-indigo-50 border-gray-200 py-3 px-4 dark:from-gray-700 dark:to-gray-750 dark:border-gray-600">
                    <div className="flex gap-2 items-center">
                      <svg
                        className="h-5 text-yellow-500 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8a1 1 0 00.553.894l2 1A1 1 0 0018 9V7a1 1 0 00-1.447-.894l-2 1zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zM14.553 14.106A1 1 0 0014 15a1 1 0 00.553.894l2 1A1 1 0 0018 16v-2a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        JavaScript / Fetch API
                      </h4>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      fontSize: '0.875rem',
                      padding: '1rem',
                    }}
                    showLineNumbers={true}
                  >
                    {`fetch('/api/public-holidays?year=2025&code=cn')
  .then(res => res.json())
  .then(console.log)`}
                  </SyntaxHighlighter>
                </div>

                <div className="border rounded-lg border-gray-200 overflow-hidden dark:border-gray-700">
                  <div className="bg-gradient-to-r border-b from-green-50 to-emerald-50 border-gray-200 py-3 px-4 dark:from-gray-700 dark:to-gray-750 dark:border-gray-600">
                    <div className="flex gap-2 items-center">
                      <svg
                        className="h-5 text-green-600 w-5 dark:text-green-400"
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
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        cURL Command
                      </h4>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language="bash"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      fontSize: '0.875rem',
                      padding: '1rem',
                    }}
                    showLineNumbers={true}
                  >
                    {`curl "https://your-domain.com/api/public-holidays?year=2025&code=cn"`}
                  </SyntaxHighlighter>
                </div>

                <div className="border rounded-lg border-gray-200 overflow-hidden dark:border-gray-700">
                  <div className="bg-gradient-to-r border-b from-purple-50 to-pink-50 border-gray-200 py-3 px-4 dark:from-gray-700 dark:to-gray-750 dark:border-gray-600">
                    <div className="flex gap-2 items-center">
                      <svg
                        className="h-5 text-purple-600 w-5 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        Python / Requests
                      </h4>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      fontSize: '0.875rem',
                      padding: '1rem',
                    }}
                    showLineNumbers={true}
                  >
                    {`import requests

response = requests.get(
    'https://your-domain.com/api/public-holidays',
    params={'year': '2025', 'code': 'cn'}
)
data = response.json()
print(data)`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
