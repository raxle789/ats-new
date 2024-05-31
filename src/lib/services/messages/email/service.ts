'use server';

import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

export async function sendEmail(receiver, subject, html) {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'mail.erajaya.com',
    port: 465,
    secure: true,
    auth: {
      user: 'intern-fatkhur.rozak@erajaya.com',
      pass: 'Fatkhurrozak76#',
    },
  });

  const verifyTransporter = await transporter.verify();

  if (verifyTransporter) {
    const options = {
      from: 'intern-fatkhur.rozak@erajaya.com',
      to: String(receiver),
      subject: String(subject),
      html: String(html),
    };

    const send = await transporter.sendMail(options);

    if (send) {
      return {
        success: true,
        message: 'Email Sent Successfully',
      };
    }
  }

  return {
    success: false,
    message: 'Failed to Send Email',
  };

  // const emailHtml = render(<Email url="https://example.com" />);
}
