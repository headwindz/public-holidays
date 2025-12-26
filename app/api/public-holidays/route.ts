import { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = searchParams.get('year')
  const code = searchParams.get('code')

  if (!year || !code) {
    return Response.json(
      { error: 'Both year and code parameters are required' },
      { status: 400 }
    )
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'data',
      year,
      code.toLowerCase(),
      'index.json'
    )

    const fileContent = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    return Response.json({ data })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return Response.json(
        {
          error:
            'Data not found for the specified year and country/region code',
        },
        { status: 404 }
      )
    }

    return Response.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
