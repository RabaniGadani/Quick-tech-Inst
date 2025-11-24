import React from 'react';
import { IoMail, IoCall, IoLocation, IoTime } from 'react-icons/io5';

const Contact = () => {
    return (
        <section className="relative my-20">
            <div className="max-w-[90%] mx-auto">
                <h1 className="text-center text-[#044e83] font-extrabold text-3xl md:text-4xl mb-10">
                    Contact Us
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="flex items-start p-6 border rounded-lg shadow-lg">
                            <IoLocation className="text-[#044e83] text-4xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Address</h2>
                                <p className="text-gray-600">Office # Gill Colony Near Hazaray Shah Mohalla Mirpur Mathelo, Sindh, Pakistan</p>
                            </div>
                        </div>
                        <div className="flex items-start p-6 border rounded-lg shadow-lg">
                            <IoMail className="text-[#044e83] text-4xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Email</h2>
                                <p className="text-gray-600"><a href="mailto:info@qktech.pk" className="text-blue-500">education@quicktech.com</a></p>
                            </div>
                        </div>
                        <div className="flex items-start p-6 border rounded-lg shadow-lg">
                            <IoCall className="text-[#044e83] text-4xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Phone</h2>
                                <p className="text-gray-600">+92 300 3657852</p>
                            </div>
                        </div>
                        <div className="flex items-start p-6 border rounded-lg shadow-lg">
                            <IoTime className="text-[#044e83] text-4xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Working Hours</h2>
                                <p className="text-gray-600">Monday - Saturday: 2:00 PM - 8:00 PM</p>
                            </div>
                        </div>
                    </div>
                    {/* Map */}
                    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174432.6691434828!2d69.5357777!3d28.0259082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3936fb49b4de97fd%3A0x2fc11944d966db76!2sMirpur%20Mathelo%2C%20Pakistan!5e0!3m2!1sen!2s!4v1718182560000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
