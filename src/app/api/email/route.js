"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.Resend_API_Key);

export const sendEmail = async (formData) => {
    const name = formData.get("fullname"); // Full name input
    const senderEmail = formData.get("senderEmail"); // Email input
    const country = formData.get("country"); // Country input
    const message = formData.get("message"); // Message input

    console.log("Fullname:", name);
    console.log("Email Address:", senderEmail);
    console.log("Country:", country);
    console.log("Message:", message);

    // Perform validation
    if (!name || !validateString(name, 100)) {
        return {
            error: "Invalid full name", // Error message for invalid name
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

    // Construct email body including all form data
    const emailBody = `
        $Ciabatta$
        
        Full Name: ${name}
        Email Address: ${senderEmail}
        Country: ${country}
        Message: ${message}
    `;

    // Send the email using the Resend API
    try {
        await resend.emails.send({
            from: "Book BagGuy <onbaording@resend.dev>",
            to: "samuelbishop06@yahoo.com",
            subject: "Message from Booking Form",
            reply_to: senderEmail,
            text: emailBody, // Include full data in the email body
        });

        console.log("Email sent successfully!"); // Success log
        return { success: true }; // Indicate success
    } catch (error) {
        console.error("Error sending email:", error); // Error log
        return { error: "Failed to send email" }; // Error handling
    }
};

// Helper function to validate string length
function validateString(str, maxLength) {
    return typeof str === "string" && str.length <= maxLength;
}
