import React, { useState, useRef } from "react";
import BigButton from "./BigButton";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Headline } from "./Headline";

export const Newsletter = () => {
    const SITE_KEY = "6LdNF_EpAAAAAAMfvc84m_r5blo0-dzYp2Rqqy5F";
    const captcha = useRef(null);
    const [wasSuccessful, setWasSuccessful] = useState(false);

    const onSubmit = async (token: string) => {
        const email = document.getElementById("email").value;
        const privacy = document.getElementById("privacy").checked;

        if (!privacy) {
            return;
        }

        axios.post(`/api/signup`, { email, token }).then((res) => {
            setWasSuccessful(true);
        }).catch((err) => { });
    }

    return <div className="transition-opacity ease-in-out duration-500">
        {
            wasSuccessful &&
            <div className="flex flex-col justify-center items-center bg-opacity-70 bg-black z-10 p-10 shadow-black allAroundCustomShadow">
                <Headline level={2} className="text-center mb-4">Sign up for our newsletter</Headline>
                <p className="text-center mb-4 text-secondary">
                    Thank you for subscribing to our newsletter!
                </p>
            </div>
        }
        {
            !wasSuccessful &&
            <form onSubmit={(e) => { e.preventDefault(); console.log("Submitted!!"); captcha.current.execute() }}>
                <div className="flex flex-col justify-center items-center bg-opacity-70 bg-black z-10 p-10 shadow-black allAroundCustomShadow">
                    <Headline level={2} className="text-center mb-4">Sign up for our newsletter</Headline>
                    <p className="text-center mb-4 text-secondary">
                        We will not spam you inbox but keep you in the loop for upcomming events.
                    </p>
                    <div className="flex flex-row h-10 justify-center items-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e-mail"
                            className="rounded-lg bg-gray-300 px-2 py-1 text-black w-96 text-center"
                            required
                        />
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey={SITE_KEY}
                            size="invisible"
                            onChange={token => onSubmit(token)}
                        />
                        <BigButton hover className="ml-4">
                            <button
                                id="submit"
                                type="submit"
                            >Sign up</button>
                        </BigButton>
                    </div>
                    <div className="mt-4 text-center w-1/2">
                        <input type="checkbox" id="privacy" name="privacy" required className="mr-2 scale-125" />
                        <label htmlFor="privacy" className="text-secondary">I agree to receive your newsletters and accept the data privacy statement.</label>
                    </div>
                    <p className="text-center mb-4 text-secondary md:w-1/2 mt-4 text-sm">
                        By submitting this form you agree that the personal data you provided will be transferred to Brevo for processing in accordance with <a className="underline" href="https://www.brevo.com/legal/privacypolicy/">Brevos Privacy Policy</a>.
                    </p>
                </div>
            </form >
        }
    </div>;
}
