import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Code, Terminal, FileCode } from 'lucide-react'
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
    icon: <FileCode className="h-5 text-yellow-500 w-5" />,
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'cURL Command',
    language: 'bash',
    code: curlExample,
    icon: <Terminal className="h-5 text-green-600 w-5 dark:text-green-400" />,
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Python / Requests',
    language: 'python',
    code: pythonExample,
    icon: <Code className="h-5 text-purple-600 w-5 dark:text-purple-400" />,
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
