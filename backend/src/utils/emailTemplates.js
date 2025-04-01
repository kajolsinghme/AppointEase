
const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).replace(",", " at"); 
};

const formatAppointmentType = (type) => {
    return type === "in-person" ? "In Person" : "Video Consultation";
};

export const patientAppointmentTemplate = (patientName, doctorName, scheduledAt, type, location) => `
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
</style>
  </style>
</head>
<body>
  <div class="container">
    <h2>Appointment Confirmation</h2>
    <p>Dear <strong>${patientName}</strong>,</p>
    <p>Your appointment with Dr. <strong>${doctorName}</strong> has been successfully booked.</p>
    <p class="details">📅 Date & Time: ${formatAppointmentDate(scheduledAt)}</p>
    <p class="details">📍 Type: ${formatAppointmentType(type)}</p>
    ${type === 'in-person' ? `<p class="details"> 📍 Location: ${location} </p>` : ""}
    <p>Please ensure to arrive on time. If you have any questions, feel free to reach out.</p>
    <br>
    <p class="message"> <i>We look forward to seeing you!</i></p>
    <p>Thank you!<br> - AppointEase</p>
  </div>
</body>
</html>
`;

export const doctorAppointmentTemplate = (doctorName, patientName, scheduledAt, type, location) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { padding: 15px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: auto; }
    h2 { color: #007bff; }
    p { font-size: 16px; }
    .details { font-weight: bold; color: #000; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Appointment Booked</h2>
    <p>Dear Dr. <strong>${doctorName}</strong>,</p>
    <p>You have a new appointment booked.</p>
    <p class="details">👤 Patient Name: ${patientName}</p>
    <p class="details">📅 Date & Time: ${formatAppointmentDate(scheduledAt)}</p>
    <p class="details">📍 Type: ${formatAppointmentType(type)}</p>
    ${type === "in-person" ? `<p class="details">📍 Location: ${location}</p>` : ""}
    <p>Please check your schedule accordingly.</p>
    <p>Best regards,<br> - AppointEase</p>
  </div>
</body>
</html>
`;
