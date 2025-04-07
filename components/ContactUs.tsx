// components/ContactUs.tsx
"use client";

export default function ContactUs() {
  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Us</h1>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Have any questions or need support? You can reach us via the following methods:
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12l-6-6M3 12l6 6m12-6H9"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-700">Email: <a href="mailto:support@premiumautodeals.com" className="text-blue-600 hover:underline">support@premiumautodeals.com</a></p>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8a4 4 0 011.5-3.25C6.28 2.57 8.88 1.5 12 1.5s5.72 1.07 7.5 3.25A4 4 0 0121 8m-3 8a4 4 0 01-1.5 3.25C17.72 21.43 15.12 22.5 12 22.5s-5.72-1.07-7.5-3.25A4 4 0 013 16"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-700">Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">(123) 456-7890</a></p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">We’re here to help you with anything you need. Feel free to reach out!</p>
        </div>
      </section>
    </main>
  );
}
