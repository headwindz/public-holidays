'use client'

import { Fragment, ReactNode, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Check } from 'lucide-react'

interface DropdownOption {
  value: string
  label: string | ReactNode
  searchText?: string
}

interface DropdownProps {
  label: string
  icon: ReactNode
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  searchable?: boolean
  searchPlaceholder?: string
  renderSelected?: (value: string) => ReactNode
}

export const Dropdown = ({
  label,
  icon,
  value,
  onChange,
  options,
  searchable = false,
  searchPlaceholder = 'Search...',
  renderSelected,
}: DropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOptions = searchable
    ? options.filter((option) =>
        searchQuery
          ? (option.searchText || String(option.value))
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true
      )
    : options

  return (
    <div>
      <label className="flex font-medium text-sm mb-2 text-gray-700 gap-2 items-center dark:text-gray-300">
        {icon}
        {label}
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="bg-white border rounded-lg cursor-pointer border-gray-300 text-left w-full py-3 pr-10 pl-4 transition-all relative dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {renderSelected ? (
              renderSelected(value)
            ) : (
              <span className="block truncate">{value}</span>
            )}
            <span className="flex pr-3 inset-y-0 right-0 pointer-events-none absolute items-center">
              <ChevronDown className="h-5 text-gray-400 w-5" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchQuery('')}
          >
            <Listbox.Options className="bg-white rounded-lg shadow-lg ring-black mt-1 w-full max-h-60 py-1 ring-1 ring-opacity-5 z-10 absolute dark:bg-gray-700 focus:outline-none">
              {searchable && (
                <div className="bg-white px-2 pt-1 pb-2 top-0 sticky dark:bg-gray-700">
                  <input
                    type="text"
                    className="border rounded-md border-gray-300 text-sm w-full py-2 px-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <div className={searchable ? 'max-h-48 overflow-auto' : ''}>
                {filteredOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
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
                            selected ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span className="flex pl-3 inset-y-0 left-0 text-blue-600 absolute items-center dark:text-blue-400">
                            <Check className="h-5 w-5" />
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
  )
}
