'use client';

export default function LocationMap() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Us</h2>
          <p className="text-gray-600">Visit our showroom in Leicester</p>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg h-[450px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.6139366513466!2d-1.1025617233121312!3d52.63082037209039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48776120d9b22b9d%3A0xcc59254268cadb83!2sIron%20Auto%20Ltd!5e0!3m2!1sen!2suk!4v1779637666743!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Iron Auto Ltd Location Map"
          />
        </div>
        
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <p className="text-gray-700">
            <strong>Iron Auto Ltd</strong> <br />
            101-103 Margaret Road, Leicester, LE5 5FW, United Kingdom <br />
            <a href="tel:+447407403676" className="text-blue-600 hover:text-blue-800">
              📞 07407 403676
            </a>
            {" | "}
            <a href="mailto:info@ironsauto.co.uk" className="text-blue-600 hover:text-blue-800">
              ✉️ info@ironsauto.co.uk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
