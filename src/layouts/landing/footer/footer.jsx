import React from "react";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-[#0A3230] text-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-20">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold uppercase mb-6">Hint</h2>
            <p className="mb-6 text-[#F5F5F5]">
              No more last-minute parking hassles! Book now and enjoy a
              stress-free experience.
            </p>
            <div className="flex space-x-3">
              <SocialIcon
                icon={<div className="p-1.5 text-[#051a18]">G</div>}
              />
              <SocialIcon
                icon={<Twitter className="w-5 h-5 text-[#051a18]" />}
              />
              <SocialIcon
                icon={<Instagram className="w-5 h-5 text-[#051a18]" />}
              />
              <SocialIcon
                icon={<Linkedin className="w-5 h-5 text-[#051a18]" />}
              />
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Useful Links</h3>
            <ul className="space-y-4">
              <FooterLink text="Home" />
              <FooterLink text="About Us" />
              <FooterLink text="Features" />
              <FooterLink text="Contact Us" />
              <FooterLink text="Onboard Company" />
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <FooterLink text="Manage Services" />
              <FooterLink text="Newsletters" />
              <FooterLink text="Our Partners" />
              <FooterLink text="Career" />
              <FooterLink text="Get in Touch" />
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <ul className="space-y-4">
              <FooterLink text="LinkedIn" />
              <FooterLink text="Twitter" />
              <FooterLink text="Instagram" />
              <FooterLink text="Facebook" />
              <FooterLink text="YouTube" />
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, icon }) => (
  <li>
    <a
      href="#"
      className="hover:text-white text-gray-300 transition-colors flex items-center space-x-2"
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-white text-hintPrimary flex items-center justify-center hover:bg-[#10b5b2] transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
