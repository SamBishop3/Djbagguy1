"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.Resend_API_Key);

export const sendEmail = async (formData) => {
    const name = formData.get("fullname"); // This is now the full name input
    const senderEmail = formData.get("senderEmail"); // This is the email input
    const country = formData.get("country");
    const message = formData.get("message");

    console.log("Fullname:", name);
    console.log("Email Address:", senderEmail);
    console.log("Country:", country);
    console.log("Message:", message);

        // // Perform validation
        if (!name || !validateString(name, 100)) {
            return {
                error: "Invalid full name", // Customize the error message as needed
            };
        }
    
        // Validate sender email (Ensure it's not empty and within the max length)
        if (!senderEmail || !validateString(senderEmail, 500)) {
            return {
                error: "Invalid sender email",
            };
        }
    
        // Validate country (Ensure it's not empty and one of the valid options)
        const validCountries = ["australia", "canada", "usa", "uk"];
        if (!country || !validCountries.includes(country)) {
            return {
                error: "Invalid country. Please select a valid country.",
            };
        }
    
        // Validate message (Ensure it's not empty)
        if (!message) {
            return {
                error: "Must fill out the booking info",
            };
        }

    await resend.emails.send({
        from: "onbaording@resend.dev",
        to: "samuelbishop06@yahoo.com",
        subject: "Message from Booking Form",
        reply_to: senderEmail,
        text: message,
    });
};

