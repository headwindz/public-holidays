import { SUPPORTED_COUNTRIES_REGIONS } from '@/app/constants'
import { corsHeaders, handleOPTIONS as OPTIONS } from '../cors'

export { OPTIONS }

export async function GET() {
  try {
    return Response.json(
      { data: SUPPORTED_COUNTRIES_REGIONS },
      { headers: corsHeaders }
    )
  } catch (error) {
    return Response.json(
      { error: 'Failed to load supported countries' },
      { status: 500, headers: corsHeaders }
    )
  }
}
