export default `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
  </style>
</head>
<body style="word-spacing:normal;">
  <div style="margin:0px auto;max-width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
            <div style="background-color:#673AB7;padding:20px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;">Welcome!</h1>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="background:#ffffff;margin:0px auto;max-width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;width:100%;">
      <tbody>
        <tr>
          <td style="padding:30px 20px;">
            <h2 style="color:#333;">Hello {{userName}},</h2>
            <p>Welcome to Conference Management System! Your account has been successfully created with the role of <strong>{{role}}</strong>.</p>
            <p>You can now log in and start using the platform:</p>
            <div style="text-align:center;margin:20px 0;">
              <a href="{{loginUrl}}" style="display:inline-block;padding:12px 24px;background-color:#673AB7;color:#ffffff;text-decoration:none;border-radius:4px;font-weight:bold;">Login Now</a>
            </div>
            <p style="color:#666;font-size:13px;margin-top:30px;">If you have any questions or need assistance, please don't hesitate to reach out.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="background:#f0f0f0;margin:0px auto;max-width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td style="padding:20px;text-align:center;font-size:12px;color:#666;">
            <p style="margin:0;">This is an automated email from Conference Management System</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
