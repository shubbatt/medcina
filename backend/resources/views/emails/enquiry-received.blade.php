<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a2332; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #1e4fa3; padding: 32px 40px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.3px; }
    .header p { margin: 4px 0 0; color: #a8c4f0; font-size: 13px; }
    .body { padding: 36px 40px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #6b7a8d; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a2332; margin-bottom: 20px; line-height: 1.5; }
    .message-box { background: #f4f6f8; border-left: 3px solid #1e4fa3; border-radius: 4px; padding: 16px 20px; margin-bottom: 20px; }
    .message-box .value { margin-bottom: 0; white-space: pre-wrap; }
    .divider { border: none; border-top: 1px solid #e8ecf0; margin: 24px 0; }
    .cta { text-align: center; margin-top: 28px; }
    .btn { display: inline-block; background: #1e4fa3; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; }
    .footer { background: #f4f6f8; padding: 20px 40px; text-align: center; font-size: 12px; color: #9aa5b4; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Enquiry Received</h1>
      <p>{{ now()->format('d M Y, H:i') }} (Maldives Time)</p>
    </div>
    <div class="body">

      <div class="label">Name</div>
      <div class="value">{{ $enquiry->name }}</div>

      <div class="label">Email</div>
      <div class="value"><a href="mailto:{{ $enquiry->email }}" style="color:#1e4fa3;">{{ $enquiry->email }}</a></div>

      <div class="label">Phone</div>
      <div class="value">{{ $enquiry->phone }}</div>

      @if($enquiry->company)
      <div class="label">Company / Organisation</div>
      <div class="value">{{ $enquiry->company }}</div>
      @endif

      <div class="label">Subject</div>
      <div class="value">{{ $enquiry->subject }}</div>

      <hr class="divider" />

      <div class="label">Message</div>
      <div class="message-box">
        <div class="value">{{ $enquiry->message }}</div>
      </div>

      <div class="cta">
        <a href="{{ config('app.url') }}/admin/enquiries/{{ $enquiry->id }}" class="btn">
          View in Admin Panel
        </a>
      </div>
    </div>
    <div class="footer">
      Medcina Pvt Ltd &mdash; This is an automated notification. Do not reply to this email.
    </div>
  </div>
</body>
</html>
