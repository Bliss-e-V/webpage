import axios from "axios";
import SibApiV3Sdk from 'sib-api-v3-sdk';
const API_KEY = process.env.BREVO_API_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const LIST_ID = 3;

const brevoClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = brevoClient.authentications['api-key'];
apiKey.apiKey = API_KEY;

export async function POST({ request }) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), { status: 405 });
    }
    if (request.headers.get('Content-Type') !== 'application/json') {
        return new Response(JOSN.stringify({ success: false, message: 'Invalid content type' }), { status: 400 });
    }

    const body = await request.json();
    const email = body['email'];
    const token = body['token'];

    // Verify reCAPTCHA token
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, {
        secret: RECAPTCHA_SECRET_KEY,
        response: token
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    )

    const recaptchaData = await recaptchaResponse.data;

    console.log(recaptchaData);
    if (!recaptchaData.success) {
        return new Response(JSON.stringify({ success: false, message: 'reCAPTCHA verification failed' }, { status: 400 }));
    }

    let apiInstance = new SibApiV3Sdk.ContactsApi();
    let createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = [LIST_ID];

    const result = await apiInstance.createContact(createContact).then((data) => {
        return new Response(JSON.stringify({ success: true, message: 'Email added to list' }), { status: 200 });
    }, (error) => {
        return new Response(JSON.stringify({ success: false, message: 'Failed to add email to list' }), { status: 500 });
    });

    return result;
}
