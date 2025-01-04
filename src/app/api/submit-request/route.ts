import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { sql } from '@vercel/postgres'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received request body:', body)

    const { name, email, mobile, service, additionalDetails } = body

    console.log('Inserting data into database...')
    const { rows } = await sql`
      INSERT INTO requests (name, email, mobile, service, additional_details)
      VALUES (${name}, ${email}, ${mobile}, ${service}, ${JSON.stringify(additionalDetails)})
      RETURNING *
    `;
    console.log('Data inserted successfully:', rows[0])

    console.log('Sending email...')
    const emailContent = `
      <h1>New Request: ${service}</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Service:</strong> ${service}</p>
      <h2>Additional Details:</h2>
      <pre>${JSON.stringify(additionalDetails, null, 2)}</pre>
    `

    const msg = {
      to: process.env.SENDGRID_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL || '',
      subject: `New Request: ${service}`,
      text: emailContent.replace(/<[^>]+>/g, ''),
      html: emailContent,
    }

    await sgMail.send(msg)
    console.log('Email sent successfully')

    return NextResponse.json({ success: true, message: 'Request submitted successfully' })
  } catch (error) {
    console.error('Detailed error:', error)
    let errorMessage = 'Failed to process request'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

