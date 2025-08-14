import nodemailer from "nodemailer";

export async function sendMail({
  to,
  name,
  subject,
  body,
  attachments
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
  attachments?: [{ filename: string; path: string; cid: string }];
}) {
  const { SMTP_EMAIL, NODEMAILER_PW } = process.env;

  // const transport = nodemailer.createTransport({
  //   host: "mail.privatemail.com",
  //   port: 465,
  //   secure: false,
  //   auth: {
  //     user: "info@rayex.co",
  //     pass: "Rayexchange25@",
  //   },
  // });
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: NODEMAILER_PW,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: to,
      subject: subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
