import axios from 'axios';

const baseUrl = 'https://ecommerce.routemisr.com/api/v1'; // رابط الـ API الخاص بك

// دالة الدفع كاش
export async function handelCashOrder(cartId: string, shippingAddress: any) {
    try {
        const { data } = await axios.post(
            `${baseUrl}/orders/${cartId}`,
            { shippingAddress },
            {
                headers: { token: localStorage.getItem('userToken') } // تأكد من إرسال التوكن
            }
        );
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}

// دالة الدفع أونلاين (Stripe)
export async function handelCheckoutSession(cartId: string, shippingAddress: any) {
    try {
        const { data } = await axios.post(
            `${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`, // استبدل الرابط برابط موقعك الفعلي
            { shippingAddress },
            {
                headers: { token: localStorage.getItem('userToken') }
            }
        );
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}