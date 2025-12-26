import { Card } from './Card'
import { CardTitle } from './CardTitle'

export const QueryParams = () => {
  const headers = ['Parameter', 'Type', 'Description']

  const params = [
    {
      name: 'year',
      type: 'string',
      description: 'Year (e.g., "2024", "2025")',
    },
    {
      name: 'code',
      type: 'string',
      description: 'ISO 2-letter country/region code (e.g., "cn", "us", "uk")',
    },
  ]

  return (
    <Card>
      <CardTitle>Query Parameters</CardTitle>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            {headers.map((header) => (
              <th key={header} className="text-left py-2 text-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-400">
          {params.map((param, index) => (
            <tr
              key={param.name}
              className={
                index < params.length - 1 ? 'border-b border-gray-700' : ''
              }
            >
              <td className="py-3">
                <code className="text-blue-500">{param.name}</code>
              </td>
              <td className="py-3">{param.type}</td>
              <td className="py-3">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
