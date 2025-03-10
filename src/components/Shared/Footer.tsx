import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-5 md:px-20 text-gray-700 mt-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-3">More from ReShop</h3>
          <ul className="space-y-2">
            <li>Sell Fast</li>
            <li>Membership</li>
            <li>Banner Ads</li>
            <li>Boost Ad</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Help & Support</h3>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Stay Safe</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">About ReShop</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Blog & Guides</h3>
          <ul className="space-y-2">
            <li>CarsGuide</li>
            <li>BikesGuide</li>
            <li>PropertyGuide</li>
            <li>Official Blog</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Facebook size={20} className="hover:text-blue-600 cursor-pointer" />
            <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
            <Instagram size={20} className="hover:text-pink-500 cursor-pointer" />
            <Youtube size={20} className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Download our app</h3>
          <div className="space-y-2">
            <Image src="/google-play.png" alt="Google Play" width={32} height={32} className="w-32" />
            <Image src="/app-store.png" alt="App Store" width={32} height={32} className="w-32" />
          </div>
          <h3 className="font-semibold mt-4">Other countries</h3>
          <p className="mt-2">Lk Sri Lanka</p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-xs text-gray-500">
        <p>© 2025. All rights reserved. Saltside Technologies</p>
      </div>
    </footer>
  );
}
