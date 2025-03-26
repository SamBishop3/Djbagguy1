import React from "react";
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
    } from "@react-email/components";
    import { Tailwind } from "@react-email/tailwind";

    // Define the props that will be passed to the email component
    type BookingFormEmailProps = {
    name: string;
    senderEmail: string;
    country: string;
    message: string;
    };

    export default function BookingFormEmail({
    name,
    senderEmail,
    country,
    message,
    }: BookingFormEmailProps) {
    return (
        <Html>
        <Head />
        <Preview>New Booking Request for DJ Bagguy</Preview>
        <Tailwind>
            <Body className="bg-gray-100 text-black">
            <Container>
                <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
                <Heading className="leading-tight text-xl font-bold">
                    You received the following booking request
                </Heading>
                <Hr />
                <Text className="mt-4 text-lg">
                    <strong>Full Name:</strong> {name}
                </Text>
                <Text className="mt-4 text-lg">
                    <strong>Email Address:</strong> {senderEmail}
                </Text>
                <Text className="mt-4 text-lg">
                    <strong>Country:</strong> {country}
                </Text>
                <Text className="mt-4 text-lg">
                    <strong>Message:</strong> {message}
                </Text>
                </Section>
            </Container>
            </Body>
        </Tailwind>
        </Html>
    );
    }
