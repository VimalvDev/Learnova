import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('=== CALLBACK HIT ===')
  console.log('code:', code)
  console.log('origin:', origin)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log('exchange data:', JSON.stringify(data))
    console.log('exchange error:', JSON.stringify(error))

    if (!error) {
      console.log('redirecting to /onboarding')
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  console.log('falling through to /login')
  return NextResponse.redirect(`${origin}/login`)
}