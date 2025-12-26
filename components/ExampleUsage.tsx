import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from './CopyButton'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { jsExample, curlExample, pythonExample } from '@/app/constants'

interface Example {
  title: string
  language: string
  code: string
  icon: JSX.Element
  gradientFrom: string
  gradientTo: string
  iconColor: string
}

const examples: Example[] = [
  {
    title: 'JavaScript / Fetch API',
    language: 'javascript',
    code: jsExample,
    icon: (
      <svg
        className="h-5 text-yellow-500 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8a1 1 0 00.553.894l2 1A1 1 0 0018 9V7a1 1 0 00-1.447-.894l-2 1zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zM14.553 14.106A1 1 0 0014 15a1 1 0 00.553.894l2 1A1 1 0 0018 16v-2a1 1 0 00-1.447-.894l-2 1z" />
      </svg>
    ),
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'cURL Command',
    language: 'bash',
    code: curlExample,
    icon: (
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
    ),
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Python / Requests',
    language: 'python',
    code: pythonExample,
    icon: (
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
    ),
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-pink-50',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
]

const renderExample = ({
  title,
  language,
  code,
  icon,
  gradientFrom,
  gradientTo,
}: Example) => (
  <div
    key={title}
    className="border rounded-lg border-gray-200 overflow-hidden dark:border-gray-700"
  >
    <div
      className={`bg-linear-to-r border-b ${gradientFrom} ${gradientTo} border-gray-200 py-3 px-4 dark:from-gray-700 dark:to-gray-750 dark:border-gray-600`}
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          {icon}
          <h4 className="font-semibold text-sm dark:text-white">{title}</h4>
        </div>
        <CopyButton text={code} />
      </div>
    </div>
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        fontSize: '0.875rem',
        padding: '1rem',
      }}
      showLineNumbers={true}
    >
      {code}
    </SyntaxHighlighter>
  </div>
)

export const ExampleUsage = () => {
  return (
    <Card>
      <CardTitle>Example Usage</CardTitle>
      <div className="space-y-6">{examples.map(renderExample)}</div>
    </Card>
  )
}
