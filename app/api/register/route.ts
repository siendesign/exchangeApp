import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";
import bcrypt from "bcrypt";
import { sendMail } from "@/lib/mail";
import Settings from "@/models/adminSettingsModel";
import UserCount from "@/models/userCountModel";
import moment from "moment";

export async function POST(req: NextRequest) {
  db.connect();

  const { uid, email, role } = await req.json();
  // const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hashedPassword = bcrypt.hashSync(password, salt);
  const exists = await Users.find({ email: email });

  console.log(exists.length);

  if (exists.length > 0) {
    return NextResponse.json(
      {
        error: "User already exists. Try another email",
        email: email,
      },
      { status: 200 }
    );
  }

  console.log({ email, uid, role });

  const newUser = new Users({
    uid: uid,
    email: email,
    password: "12345678",
    role: role,
    status: "active",
  });

  const saveUser = await newUser.save();

  const AdminEmail = await Settings.findOne({
    settingName: "notificationEmail",
  });

  const title = "New User Added";
  const message = "Hello Boss. We have a new Registered User!";

  await sendMail({
    to: "victoryessien01@gmail.com",
    name: "",
    subject: `New User Registered`,
    body: `<!--
    * This email was built using Tabular.
    * For more information, visit https://tabular.email
    -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: inherit;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    u + #body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    h1,img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;text-align:center}img,p{line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;mso-line-height-rule:exactly;mso-text-raise:2px}h1{line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;mso-line-height-rule:exactly;mso-text-raise:1px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t17{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.t18{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.t15{width:250px!important}.t12,.t2,.t5,.t9{width:600px!important}.t2{padding-bottom:15px!important}.t0{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}
    }
    </style>
    <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t17{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.moz-text-html .t18{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.moz-text-html .t15{width:250px!important}.moz-text-html .t2{padding-bottom:15px!important;width:600px!important}.moz-text-html .t0{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.moz-text-html .t12,.moz-text-html .t5,.moz-text-html .t9{width:600px!important}</style>
    <!--[if !mso]>-->
    <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;800&amp;display=swap" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <!--[if mso]>
    <style type="text/css">
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t17{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t18{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important;width:600px !important}td.t15{width:250px !important}td.t2{padding-bottom:15px !important;width:600px !important}h1.t0{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important}td.t12,td.t5,td.t9{width:600px !important}
    </style>
    <![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    <body id="body" class="t23" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t22" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t21" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color="#242424"/>
    </v:background>
    <![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t17" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
    <table class="t19" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t18" style="background-color:#F8F8F8;width:420px;padding:0 30px 40px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t18" style="background-color:#F8F8F8;width:480px;padding:0 30px 40px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><div class="t1" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t3" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t2" style="width:480px;padding:0 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t2" style="width:480px;padding:0 0 20px 0;"><![endif]-->
    <h1 class="t0" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:800;font-style:normal;font-size:26px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">${title}</h1></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t6" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t5" style="width:480px;padding:0 0 22px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t5" style="width:480px;padding:0 0 22px 0;"><![endif]-->
    <p class="t4" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">"${message}"</p></td>
    </tr></table>

    </td></tr><tr><td>
    
    </td></tr><tr><td>
    
    </td></tr><tr><td>
    
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td><div class="t20" style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
    </html>`,
  }).then((res) => {
    console.log("notifiying Admin of signup");
  });

  const userTitle = "Congratulations on Sign up";
  const userMessage =
    "GuyExchange would like to congratulate you for joining our plafrom. We are here to meet your money exchange need reliably and on time :)";

  await sendMail({
    to: email,
    name: "",
    subject: `New User Registered`,
    body: `<!--
    * This email was built using Tabular.
    * For more information, visit https://tabular.email
    -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: inherit;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    u + #body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    h1,img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;text-align:center}img,p{line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;mso-line-height-rule:exactly;mso-text-raise:2px}h1{line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;mso-line-height-rule:exactly;mso-text-raise:1px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t17{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.t18{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.t15{width:250px!important}.t12,.t2,.t5,.t9{width:600px!important}.t2{padding-bottom:15px!important}.t0{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}
    }
    </style>
    <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t17{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.moz-text-html .t18{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.moz-text-html .t15{width:250px!important}.moz-text-html .t2{padding-bottom:15px!important;width:600px!important}.moz-text-html .t0{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.moz-text-html .t12,.moz-text-html .t5,.moz-text-html .t9{width:600px!important}</style>
    <!--[if !mso]>-->
    <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;800&amp;display=swap" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <!--[if mso]>
    <style type="text/css">
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t17{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t18{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important;width:600px !important}td.t15{width:250px !important}td.t2{padding-bottom:15px !important;width:600px !important}h1.t0{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important}td.t12,td.t5,td.t9{width:600px !important}
    </style>
    <![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    <body id="body" class="t23" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t22" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t21" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color="#242424"/>
    </v:background>
    <![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t17" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
    <table class="t19" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t18" style="background-color:#F8F8F8;width:420px;padding:0 30px 40px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t18" style="background-color:#F8F8F8;width:480px;padding:0 30px 40px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><div class="t1" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t3" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t2" style="width:480px;padding:0 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t2" style="width:480px;padding:0 0 20px 0;"><![endif]-->
    <h1 class="t0" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:800;font-style:normal;font-size:26px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">${userTitle}</h1></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t6" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t5" style="width:480px;padding:0 0 22px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t5" style="width:480px;padding:0 0 22px 0;"><![endif]-->
    <p class="t4" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">"${userMessage}"</p></td>
    </tr></table>

    </td></tr><tr><td>
    
    </td></tr><tr><td>
    
    </td></tr><tr><td>
    
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td><div class="t20" style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
    </html>`,
  }).then((res) => console.log("email sent to new user"));

  // analytic Records

  const percentage = (last: number = 1, present: number) => {
    let prev = last == 0 ? 1 : last;
    const percentage = ((present - prev) / prev) * 100;
    return Number(percentage);
  };

  const users = await Users.find({ status: { $ne: "deleted" } });
  const usersCount = users.length;
  const date = moment().format("MMM Do YY");
  const month = date.split(" ")[0];
  const year = date.split(" ")[2];
  console.log(month, "-" + usersCount, "-" + year);

  const userCountTableData = await UserCount.find();

  console.log(userCountTableData);

  const newMonthData = {
    month: month,
    year: year,
    total: usersCount,
    percentage: percentage(
      Number(userCountTableData.length),
      Number(usersCount)
    ),
  };

  console.log("final data:", newMonthData);

  if (userCountTableData === null || userCountTableData.length === 0) {
    const newMonth = new UserCount(newMonthData);
    await newMonth.save();
  } else {
    const lastMonthData = userCountTableData[userCountTableData.length - 1];
    console.log(
      `last mounth ${lastMonthData.month},and this month ${newMonthData.month}`
    );

    if (lastMonthData.month === newMonthData.month) {
      console.log("same month id:" + lastMonthData._id);
      const updateMonth = await UserCount.findByIdAndUpdate(lastMonthData._id, {
        total: Number(lastMonthData.total) + 1,
        percentage: Number(newMonthData.percentage),
      });
    } else {
      const newMonth = new UserCount(newMonthData);
      await newMonth.save();
    }
  }

  console.log(saveUser);

  return NextResponse.json(saveUser, { status: 200 });
}
