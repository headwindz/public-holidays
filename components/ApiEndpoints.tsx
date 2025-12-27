import { Card } from './Card'
import { CardTitle } from './CardTitle'

export const ApiEndpoints = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/public-holidays',
      description: 'Get public holidays for a specific country and year',
      params: 'year, code',
    },
    {
      method: 'GET',
      path: '/api/years',
      description: 'Get all supported years',
      params: 'none',
    },
    {
      method: 'GET',
      path: '/api/countries',
      description: 'Get all supported countries/regions with codes and names',
      params: 'none',
    },
  ]

  return (
    <Card>
      <CardTitle>Available Endpoints</CardTitle>
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div
            key={endpoint.path}
            className="border rounded-lg bg-gray-50 border-gray-200 p-4 dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="flex mb-2 gap-3 items-start">
              <span className="rounded font-semibold bg-green-100 text-xs py-1 px-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                {endpoint.method}
              </span>
              <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                {endpoint.path}
              </code>
            </div>
            <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">
              {endpoint.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Parameters: <span className="font-mono">{endpoint.params}</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
