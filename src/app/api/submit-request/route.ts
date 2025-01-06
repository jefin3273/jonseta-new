import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { sql } from '@vercel/postgres'

// Email configuration
const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, mobile, service, additionalDetails } = body

    // Store data in Neon database
    await sql`
      INSERT INTO requests (name, email, mobile, service, additional_details)
      VALUES (${name}, ${email}, ${mobile}, ${service}, ${JSON.stringify(additionalDetails)})
    `

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email, // Set the reply-to address to the user's email
      subject: `New Request: ${service}`,
      text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Service: ${service}
        Additional Details: ${JSON.stringify(additionalDetails, null, 2)}
      `,
      html: `
        <h1>New Request: ${service}</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Service:</strong> ${service}</p>
        <h2>Additional Details:</h2>
        <pre>${JSON.stringify(additionalDetails, null, 2)}</pre>
      `,
    })

    return NextResponse.json({ success: true, message: 'Request submitted successfully' })
  } catch (error) {
    console.error('Detailed error:', error)
    let errorMessage = 'Failed to process request'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}

export const config = {
  runtime: 'nodejs',
}

