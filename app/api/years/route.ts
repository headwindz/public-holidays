import { readdir } from 'fs/promises'
import path from 'path'
import { corsHeaders, handleOPTIONS as OPTIONS } from '../cors'

export { OPTIONS }

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data')
    const entries = await readdir(dataPath, { withFileTypes: true })

    const years = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => /^\d{4}$/.test(name))
      .sort()

    return Response.json({ data: years }, { headers: corsHeaders })
  } catch (error) {
    return Response.json(
      { error: 'Failed to load supported years' },
      { status: 500, headers: corsHeaders }
    )
  }
}
