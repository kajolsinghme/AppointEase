const formatAppointmentDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");
};

const formatAppointmentType = (type) => {
  return type === "in-person" ? "In Person" : "Video Consultation";
};

export const patientAppointmentTemplate = (appointmentDetails) => {
  const { patientName, doctorName, scheduledAt, type, location, zoomLink } =
    appointmentDetails;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { padding: 15px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: auto; }
      h2 { color: #007bff; }
      p { font-size: 16px; }
      .details { font-weight: bold; color: #000; }
      .message { font-style: italic; font-size: 17px; color: #28a745; text-align: center; padding: 10px 0; }
      .footer { font-size: 14px; color: #777; text-align: center; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Appointment Confirmation</h2>
      <p>Dear <strong>${patientName}</strong>,</p>
      <p>Your appointment with Dr. <strong>${doctorName}</strong> has been successfully booked.</p>
      <p class="details">📅 Date & Time: ${formatAppointmentDate(
        scheduledAt
      )}</p>
      <p class="details">📍 Type: ${formatAppointmentType(type)}</p>
      ${
        location != null
          ? `<p class="details">📍 Location: ${location}</p>`
          : ""
      }
      ${
        zoomLink
          ? `<p class="details">🔗 Virtual Appointment: <a href="${zoomLink}" target="_blank">Join Here</a></p>`
          : ""
      }
      <p>${
        type === "video-consultation"
          ? "Please ensure you have a stable internet connection and join the meeting a few minutes early to avoid any last-minute issues."
          : "Please ensure to arrive on time at the scheduled location. If you have any questions or need to reschedule, feel free to contact us."
      }
      </p>
      <p class="message"><i>We look forward to assisting you with the best care possible!</i></p>
      <p>Best Regards,</p>
      <p><strong>AppointEase Team</strong></p>
      <p class="footer">For inquiries, contact our support team at support@appointease.com</p>
    </div>
  </body>
  </html>
  `;
};

export const doctorAppointmentTemplate = (appointmentDetails) => {
  const { patientName, doctorName, scheduledAt, type, location, zoomLink } =
    appointmentDetails;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { padding: 15px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: auto; }
      h2 { color: #007bff; }
      p { font-size: 16px; }
      .details { font-weight: bold; color: #000; }
      .message { font-style: italic; font-size: 17px; color: #28a745; text-align: center; padding: 10px 0; }
      .footer { font-size: 14px; color: #777; text-align: center; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>New Appointment Scheduled</h2>
      <p>Dear Dr. <strong>${doctorName}</strong>,</p>
      <p>You have a new appointment scheduled with the following details:</p>
      <p class="details">👤 Patient: <strong>${patientName}</strong></p>
      <p class="details">📅 Date & Time: ${formatAppointmentDate(
        scheduledAt
      )}</p>
      <p class="details">📍 Type: ${formatAppointmentType(type)}</p>
      ${location ? `<p class="details">📍 Location: ${location}</p>` : ""}
      ${
        zoomLink
          ? `<p class="details">🔗 Virtual Appointment: <a href="${zoomLink}" target="_blank">Join Here</a></p>`
          : ""
      }
      <p>Please review your schedule and be prepared for the consultation.</p>
      <p class="message"><i>Thank you for your dedication to patient care!</i></p>
      <p>Best Regards,</p>
      <p><strong>AppointEase Team</strong></p>
      <p class="footer">For assistance, contact support@appointease.com</p>
    </div>
  </body>
  </html>
  `;
};
