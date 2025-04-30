"use server";
import { Resend } from 'resend';

// Async function that creates and returns a Resend client instance
export async function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

// Function to send contact form emails
export async function sendContactEmail({
  name,
  email,
  phone,
  company,
  subject,
  message,
  
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  
}) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // You can change this to your verified domain later
      to: ['info@ironsauto.co.uk'], // Replace with your actual email
      subject: `New contact form submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        ${company ? `Company: ${company}` : ''}
        
        
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}