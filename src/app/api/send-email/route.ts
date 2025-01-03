import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  // Here you would typically use a service like SendGrid or Nodemailer to send an email
  // For demonstration purposes, we'll just log the data
  console.log('Received search request:', body)

  // Simulate sending an email
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json({ message: 'Email sent successfully' })
}

