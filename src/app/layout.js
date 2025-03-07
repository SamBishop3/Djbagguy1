export const metadata = {
  title: 'BagGuy',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Use the logo as the favicon */}
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        {/* If using PNG */}
        {/* <link rel="icon" href="/logo.png" type="image/png" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
