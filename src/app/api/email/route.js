import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { firstname, lastname, country, subject } = await req.json();

        // Validate inputs
        if (!firstname || !lastname || !country || !subject) {
            return new Response(JSON.stringify({ error: "All fields are required!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Configure SMTP Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "opulentsoundexp@gmail.com", // DJ Bagguy's email
            subject: `New Booking from ${firstname} ${lastname}`,
            text: `Name: ${firstname} ${lastname}\nCountry: ${country}\nMessage: ${subject}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
