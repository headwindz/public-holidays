'use client'

import { useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { CheckCircle, ChevronDown, ChevronRight } from 'lucide-react'

interface ResponseProps {
  response: any
}

export const Response = ({ response }: ResponseProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!response) return null

  return (
    <div className="border rounded-lg border-gray-200 mt-6 overflow-hidden dark:border-gray-700">
      <div className="bg-gradient-to-r flex from-gray-50 to-gray-100 py-3 px-4 items-center justify-between dark:from-gray-700 dark:to-gray-750">
        <div className="flex gap-2 items-center">
          <CheckCircle className="h-5 text-green-500 w-5" />
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            Response
          </h4>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex text-sm transition-colors text-gray-600 gap-1 items-center dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          aria-label={isExpanded ? 'Collapse response' : 'Expand response'}
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
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
  )
}
