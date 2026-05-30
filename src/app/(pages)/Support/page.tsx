import Link from 'next/link';
import React from 'react';

export default function Support() {
    return <>

        <div className="bg-gradient-to-b from-green-700 via-green-600 to-green-500 w-full h-60 flex items-center">
            <div className="w-11/12 max-w-6xl mx-5 space-y-5">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-1.5">
                    <Link className="text-gray-300 font-semibold hover:text-white" href={"/"}>Home</Link>
                    <span className="text-white">/</span>
                    <h4 className="text-white font-semibold"> Contact Us</h4>
                </div>

                {/* Brand Info */}
                <div className="flex items-center gap-4">
                    <div className="bg-green-200 w-15 h-15 flex justify-center items-center rounded-2xl">
                        <i className="fa-solid fa-headset text-2xl text-green-900"></i>
                    </div>
                    <div className="text-shadow-4xl">
                        <h2 className="text-white font-bold text-4xl">Contact Us</h2>
                        <p className="text-gray-200 font-semibold">We'd love to hear from you. Get in touch with our team.</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="container mx-auto py-16 px-6">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* العمود الأيسر: معلومات الاتصال (نفس الرمادي في الكل) */}
                <div className="lg:w-1/3 space-y-4">
                    {[
                        { title: "Phone", desc: "Mon-Fri from 8am to 6pm", val: "+1 (800) 123-4567", icon: "fa-phone" },
                        { title: "Email", desc: "We'll respond within 24 hours", val: "support@freshcart.com", icon: "fa-envelope" },
                        { title: "Office", desc: "123 Commerce St, New York", val: "Mon-Fri: 8am - 6pm", icon: "fa-location-dot" },
                        {
                            title: "Office",
                            val: "123 Commerce St, New York",
                            icon: "fa-location-dot",
                            hours: [
                                { day: "Mon - Fri", time: "8am - 6pm" },
                                { day: "Saturday", time: "9am - 4pm" },
                                { day: "Sunday", time: "Closed" }
                            ]
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl flex gap-4 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shrink-0 border border-gray-200">
                                <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <div>
                                <h2 className="text-[20px] font-medium tracking-tight text-gray-900 mb-1">{item.title}</h2>
                                <p className="text-lg font-medium text-green-600 ">{item.val}</p>
                                <p className="text-sm font-medium text-gray-500 mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Social - بسيط جداً */}
                    <div className="p-6">
                        <h2 className="text-[20px] font-bold tracking-tight text-gray-800 mb-4">Follow Us</h2>
                        <div className="flex gap-4 text-gray-400 text-[20px]">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a key={social} href="#" className="hover:text-green-600 transition-colors">
                                    <i className={`fa-brands fa-${social} text-2xl`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* العمود الأيمن: الفورم (أبيض خالص مع رمادي خفيف) */}
                <div className="lg:w-2/3 bg-white p-8 md:p-12 border border-gray-100 rounded-3xl">
                    {/* العنوان مع الأيقونة */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-15 h-15 rounded-full bg-green-300 flex items-center justify-center text-gray-400 border border-gray-100">
                            <i className="fa-solid fa-headset text-3xl text-green-800"></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium tracking-tighter">Send us a Message</h2>
                            <p className='text-gray-500 text-sm font-medium'>Fill out the form and we'll get back to you</p>
                        </div>
                    </div>

                    <form className="space-y-4 font-medium">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className=" w-full bg-gray-50 p-4 rounded-xl outline-none border border-gray-100 focus:border-green-500 transition-all" />
                            <input type="email" placeholder="Email Address" className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-gray-100 focus:border-green-500 transition-all" />
                        </div>
                        <textarea placeholder="How can we help you?" rows={5} className="w-full bg-gray-50 p-4 rounded-xl outline-none border border-gray-100 focus:border-green-500 transition-all"></textarea>
                        <button className="bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-all">
                            Send Message
                        </button>
                    </form>

                    {/* Help Center */}
                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between font-medium">
                        <p className="text-lg text-gray-500">
                            Need quick answers? 
                            <a href="#" className="text-green-700 font-medium tracking-tight underline underline-offset-4 hover:text-green-600 transition-colors"> Visit Help Center </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
