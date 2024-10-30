"use client";

import React from "react";
import StaticCard from "../static-card/static-card";
import { Typography } from "../ui/typography";

interface FooterProps {
  className?: string; // Allow className as an optional prop
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <>
      <div className={`container mx-auto max-w-7xl w-full ${className}`}>
        <div className="mt-10 mb-10">
          <Typography variant={"h5"} className="mb-4 ml-4 pt-10 border-t border-gray-800">   
            More Info
          </Typography>

          <div className="flex flex-wrap">
            {/* Left Column */}
            <div className="w-full md:w-1/2 flex flex-col"> 
              <div className="flex w-full items-stretch"> {/* Ensure equal height */}
                <div className="flex-1 p-2"> {/* Suggest */}
                  <StaticCard title="Support" desc="Need assistance? Our support team is here to help with any issues." href="/support" />
                </div>
                <div className="flex-1 p-2"> {/* FAQ */}
                  <StaticCard title="FAQ" desc="Have questions? We have the answers!" href="/faq" />
                </div>
              </div>
              <div className="flex w-full mt-2">
                <div className="w-1/2 p-2"> {/* New Card 1 */}
                  <StaticCard title="Partnerships" desc="Explore collaboration opportunities." href="/partnerships" />
                </div>
                <div className="w-1/2 p-2"> {/* New Card 2 */}
                  <StaticCard title="Latest News" desc="Stay updated with our latest announcements." href="/news" />
                </div>
              </div>
              <div className="hidden md:flex w-full mt-2 "> {/* Additional Row for About and Legal */}
                <div className="w-1/2 p-2"> {/* About */}
                  <StaticCard title="Company" desc="" href="" />
                </div>
                <div className="w-1/2 p-2"> {/* Legal */}
                  <StaticCard title="Jargon" desc="" href="" />
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="w-full md:w-1/2 p-2 flex"> 
              <StaticCard title="Community" desc="Connect with fellow users, share your experiences, and stay updated with us!" className="flex-1 h-full" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col"> 
              <div className="flex w-full mt-2 md:hidden"> {/* Additional Row for About and Legal */}
                <div className="w-1/2 p-2"> {/* About */}
                  <StaticCard title="Company" desc="" href="" />
                </div>
                <div className="w-1/2 p-2"> {/* Legal */}
                  <StaticCard title="Jargon" desc="" href="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer; // Changed the export statement
