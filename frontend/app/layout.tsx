import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "500",

});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "EDA Agent: Backbone",
  description: "An EDA (Exploratory Data Analysis) agent that will enable you in data-driven decision making. It will always have your back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${montserratAlternates.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
