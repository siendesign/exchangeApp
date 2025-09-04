import nodemailer from "nodemailer";

export async function sendMail({
  to,
  name,
  subject,
  body,
  attachments,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
  attachments?: [{ filename: string; path: string; cid: string }];
}) {
  const { SMTP_EMAIL, NODEMAILER_PW } = process.env;

  console.log({ to, name, subject, body });

  const transport = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@rayex.co",
      pass: "Rayexchange25@",
    },
    connectionTimeout:60000,
    greetingTimeout:30000,
    socketTimeout:60000,
    tls:{
      rejectUnauthorized:false,
      minVersion:'TLSv1'
    },
    debug:process.env.NODE_ENV === "development",
    logger:process.env.NODE_ENV === "development",
    ignoreTLS:false,
    requireTLS: process.env.EMAIL_PORT === "587"
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
    const sendResult = await transport.sendMail({
      from: "info@rayex.co",
      to: to,
      subject: subject,
      html: body,
    });
    console.log(sendResult);
    return sendResult;
  } catch (error) {
    console.log(error);
  }
}
