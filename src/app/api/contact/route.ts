import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { sql } from '@vercel/postgres'
import { z } from 'zod'

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  service: z.enum(["Fleet Management", "Vehicle Maintenance", "Driver Services", "Business Solutions"]),
  additionalDetails: z.string().max(1000, "Additional details must be 1000 characters or less").optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received request body:', body)

    const validatedData = contactSchema.parse(body)

    // Insert into database
    await sql`
      INSERT INTO contact_submissions (name, email, mobile, service, additional_details)
      VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.mobile}, ${validatedData.service}, ${JSON.stringify(validatedData.additionalDetails)})
    `

    // Send email
    const emailContent = `
      <h1>Contact Us Request: ${validatedData.service}</h1>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Mobile:</strong> ${validatedData.mobile}</p>
      <p><strong>Service:</strong> ${validatedData.service}</p>
      <h2>Additional Details:</h2>
      <pre>${JSON.stringify(validatedData.additionalDetails, null, 2)}</pre>
    `

    const msg = {
      to: process.env.SENDGRID_TO_EMAIL || '',
      from: process.env.SENDGRID_FROM_EMAIL || '',
      subject: `Contact Us Request: ${validatedData.service}`,
      text: emailContent.replace(/<[^>]+>/g, ''),
      html: emailContent,
    }

    await sgMail.send(msg)

    return NextResponse.json({ 
      success: true, 
      message: 'Request submitted successfully' 
    })
  } catch (error) {
    console.error('Error processing request:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: error.errors
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process request. Please try again.' 
      },
      { status: 500 }
    )
  }
}

