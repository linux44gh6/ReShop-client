import Image from "next/image";
import logo from "@/assets/DALL·E 2025-03-04 16.34.11 - A modern and sleek logo for an online buy and sell website named 'ReShop'. The logo should feature the name 'ReShop' in a clean, bold, and contemporar.webp"
const Logo = () => {
    return (
        <div>
            <Image src={logo} alt="Logo" width={40} height={40} />
        </div>
    );
};

export default Logo;