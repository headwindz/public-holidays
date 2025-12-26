import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { Card } from './Card'
import { CardTitle } from './CardTitle'

export const ResponseFormat = () => {
  return (
    <Card>
      <CardTitle>Response Format</CardTitle>
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
    </Card>
  )
}
