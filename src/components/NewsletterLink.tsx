import BigButton from "./BigButton";
import { Headline } from "./Headline";

export const NewsletterLink = () => {
    return <div className="transition-opacity ease-in-out duration-500">
        <div className="flex flex-col justify-center items-center bg-opacity-70 bg-black z-10 p-10 shadow-black allAroundCustomShadow">
            <Headline level={2} className="text-center mb-4">Sign up for our newsletter</Headline>
            <p className="text-center mb-4 text-secondary">
                We will not spam your inbox but keep you in the loop for upcoming events.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <BigButton hover className="ml-4">
                    <a href="https://bfc8bc6f.sibforms.com/serve/MUIFADThvIMw2DWqa2-OmqeQLH0wBOmSQfZBe0TYK_gwTMsNwqeCRPXwLKhY6JX8RAnXnZQuRmwZkMFH5ogAYGUfdeO5t1rPp7tpCm_O4LuMv1bWgGlAWiBYZv8sg1f4QnPYpdWt6ROM2Mg6-7b9VZBDNvkeO_10LpBlsle1Xlg3hi77jS_zIAzN5cogsad806l9kPSANKoPs1Yb">Sign up</a>
                </BigButton>
            </div>
        </div>
    </div>;
}
