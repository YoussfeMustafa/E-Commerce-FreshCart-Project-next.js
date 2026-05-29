import React from 'react';

export default function BuyCart() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-10">
      <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* الجزء الأيسر: معلومات الشحن والدفع */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="City *" className="p-3 border rounded-xl" />
              <input placeholder="Street Address *" className="p-3 border rounded-xl" />
              <input placeholder="Phone Number *" className="p-3 border rounded-xl md:col-span-2" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-slate-50">
                <input type="radio" name="payment" className="mr-3" />
                Cash on Delivery
              </label>
              <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-slate-50">
                <input type="radio" name="payment" className="mr-3" />
                Pay Online (Stripe)
              </label>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: ملخص الطلب */}
        <div className="bg-slate-50 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Woman Shawl</span>
            <span>149 EGP</span>
          </div>
          <div className="flex justify-between py-4 font-bold text-lg">
            <span>Total</span>
            <span>199 EGP</span>
          </div>
          <button className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}