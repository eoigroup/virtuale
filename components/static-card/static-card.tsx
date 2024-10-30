import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { FaInstagram, FaReddit, FaTwitter, FaTiktok } from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // Use SiX for the X icon



interface StaticCardProps {
  title: string;
  desc: string;
  href?: string; // Make href optional
  className?: string; // Add className prop
}

const StaticCard: React.FC<StaticCardProps> = ({ title, desc, href, className }) => {
  const renderContent = () => {
    if (title === "Community") {
      return (
        <div className="flex flex-col h-full justify-between p-10">
          <div className="flex flex-col items-center mb-4">
            <Typography variant="large" className=" text-center text-lg font-semibold mb-2">
            Unite with a Like-Minded Community
            </Typography>
            {desc && (
              <Typography variant="body" className="text-gray-400 mb-2 text-center">
                {desc}
              </Typography>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 items-center flex-1">
          <div className="flex justify-center gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="h-10 w-10" />
                </a>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
                  <FaReddit className="h-10 w-10" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                  <SiX className="h-10 w-10" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="h-10 w-10" />
                </a>
            </div>
          </div>
        </div>
      );
    } else if (title === "Jargon") {
      return (
        <div className="flex flex-col h-full">
          <Typography variant="small" className="text-lg font-semibold mb-1">
            {title}
          </Typography>
          {desc && (
            <Typography variant="xsmall" className="text-gray-400 mb-2">
              {desc}
            </Typography>
          )}
          <ul className="pl-0">
          <li className="text-gray-500 text-sm mb-1">
              <Link href="/safety" className="text-blue-500 hover:underline">Safety Center</Link>
            </li>
            <li className="text-gray-500 text-sm mb-1">
              <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
            </li>
            <li className="text-gray-500 text-sm mb-1">
              <Link href="/tos" className="text-blue-500 hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>
      );
    } else if (title === "Company") {
      return (
        <div className="flex flex-col h-full">
          <Typography variant="small" className="text-lg font-semibold mb-1">
            {title}
          </Typography>
          {desc && (
            <Typography variant="xsmall" className="text-gray-400 mb-2">
              {desc}
            </Typography>
          )}
          <ul className="pl-0">
            <li className="text-gray-500 text-sm mb-1">
              <Link href="/company" className="text-blue-500 hover:underline">About</Link>
            </li>
            <li className="text-gray-500 text-sm mb-1">
              <Link href="/careers" className="text-blue-500 hover:underline">Careers</Link>
            </li>
            <li className="text-gray-500 text-sm mb-1">
              <Link href="/contact" className="text-blue-500 hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
      );
    }

    // Default card content
    return (
      <div className="flex flex-col h-full">
        <Typography variant="small" className="text-lg font-semibold mb-1 leading-none">
          {title}
        </Typography>
        {desc && (
          <Typography variant="xsmall" className="text-gray-400 line-clamp-3 text-ellipsis overflow-hidden whitespace-normal break-anywhere mb-2">
            {desc}
          </Typography>
        )}
      </div>
    );
  };

  const cardContent = (
    <div className={`block rounded-3xl bg-surface-elevation-2 backdrop-blur-lg p-4 relative h-full ${className}`}>
      {renderContent()}
    </div>
  );

  return href ? (
    <Link href={href}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default StaticCard;
