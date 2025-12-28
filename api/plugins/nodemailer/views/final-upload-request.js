export default `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Upload Your Final Paper Version</title>
  <style type="text/css">
    body { margin: 0; padding: 0; font-family: Inter, sans-serif; background-color: #f4f4f7; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee; }
    .content { padding: 30px; }
    .button { display: inline-block; background: #007bff; color: #ffffff !important; font-size: 16px; font-weight: bold; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
    .footer { padding: 20px 30px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; }
    h1 { color: #111111; font-size: 24px; margin: 0 0 10px; }
    p { color: #333333; font-size: 16px; line-height: 1.6; margin: 10px 0; }
  </style>
</head>
<body>
  <div style="background-color: #f4f4f7; padding: 40px 20px;">
    <div class="container">
      <div class="header">
        <h1>Upload Your Final Paper Version</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>The review period for your paper <strong>"{{paper_title}}"</strong> submitted to <strong>{{conference_name}}</strong> has concluded.</p>
        <p>Based on the reviewer feedback, please upload your final revised version of the paper. This is an important step before the final decision can be made by the organizing committee.</p>
        <p style="text-align: center;">
          <a href="{{url}}" class="button">Upload Final Version</a>
        </p>
        <p>If you have any questions, please contact the conference organizers.</p>
        <p>Best regards,<br>The {{conference_name}} Organizing Committee</p>
      </div>
      <div class="footer">
        You are receiving this email because you submitted a paper to {{conference_name}}.
      </div>
    </div>
  </div>
</body>
</html>
`;
