import * as nodemailer from 'nodemailer';

export async function createTestAccount() {
  const { user, pass, smtp } = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      // user: process.env.NODEMAILER_USER!,
      // pass: process.env.NODEMAILER_PASSWORD!,
      user,
      pass,
    },
  });
  return transporter;
}

export async function sendResetPasswordLinkEMail(
  to: string,
  resetToken: string,
) {
  const resetLink = process.env.FRONTEND_URL! + '/forgotPassword/' + resetToken;
  const user = to?.split('@')[0];
  const transporter = await createTestAccount();
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_USER!,
    to,
    subject: 'ProdCom-E password recovery link',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProdCom-E Password Reset</title>
    <style>
        /* Add your custom styles here for branding and formatting */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ProdCom-E Password Reset</h1>
        <p>Hello ${user}</p>
        <p>We received a request to reset your password for your ProdCom-E account. To reset your password, click the button below:</p>
        <p><a class="button" href=${resetLink}>Reset Password</a></p>
        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you for using ProdCom-E!</p>
        <p>Sincerely,<br> The ProdCom-E Team</p>
    </div>
</body>
</html>
`,
  });

  return info;
}
