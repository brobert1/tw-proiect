export default `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Paper Decision - {{conference_name}}</title>
  <style type="text/css">
    body { margin: 0; padding: 0; font-family: Inter, sans-serif; background-color: #f4f4f7; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee; }
    .content { padding: 30px; }
    .button { display: inline-block; background: #007bff; color: #ffffff !important; font-size: 16px; font-weight: bold; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
    .footer { padding: 20px 30px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; }
    h1 { color: #111111; font-size: 24px; margin: 0 0 10px; }
    p { color: #333333; font-size: 16px; line-height: 1.6; margin: 10px 0; }
    .accepted { color: #16a34a; }
    .rejected { color: #dc2626; }
  </style>
</head>
<body>
  <div style="background-color: #f4f4f7; padding: 40px 20px;">
    <div class="container">
      <div class="header">
        <h1>Paper {{decision_text}}</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>We are writing to inform you about the decision regarding your paper <strong>"{{paper_title}}"</strong> submitted to <strong>{{conference_name}}</strong>.</p>
        <p>After careful review by our committee, your paper has been <strong class="{{decision_class}}">{{decision_text}}</strong>.</p>
        <p style="text-align: center;">
          <a href="{{url}}" class="button">View Paper Details</a>
        </p>
        <p>If you have any questions about this decision, please contact the conference organizers.</p>
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
