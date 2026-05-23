"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowDown } from "lucide-react";

export interface DownloadItem {
  id: string;
  title: string;
  filename: string;
  url: string;
}

interface TechnicalDownloadsProps {
  downloads?: DownloadItem[];
  sampleRequestUrl?: string;
  onRequestSample?: () => void;
  title?: string;
  className?: string;
}

const DEFAULT_DOWNLOADS: DownloadItem[] = [
  {
    id: "brochure",
    title: "BROCHURE",
    filename: "Hansen-Timber-SPC-Flooring-Brochure.pdf",
    url: "/downloads/Hansen-Timber-SPC-Flooring-Brochure.pdf",
  },
  {
    id: "installation-guide",
    title: "INSTALLATION GUIDE",
    filename: "Hansen-Timber-SPC-Floor-Installation-Guide.pdf",
    url: "/downloads/Hansen-Timber-SPC-Floor-Installation-Guide.pdf",
  },
  {
    id: "warranty",
    title: "WARRANTY",
    filename: "Hansen-Timber-Warranty-Terms-and-Conditions-for-SPC-Flooring.pdf",
    url: "/downloads/Hansen-Timber-Warranty-Terms-and-Conditions-for-SPC-Flooring.pdf",
  },
];

export default function TechnicalDownloads({
  downloads,
  sampleRequestUrl = "/contact",
  onRequestSample,
  title = "Technical Downloads",
  className = "",
}: TechnicalDownloadsProps) {
  const items = downloads && downloads.length > 0 ? downloads : DEFAULT_DOWNLOADS;

  const handleRequestSampleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onRequestSample) {
      e.preventDefault();
      onRequestSample();
    }
  };

  return (
    <div className={`${className} flex flex-col w-full`}>
      {/* Section Title */}
      {title && (
        <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-8">
          {title}
        </h2>
      )}

      {/* Downloads List */}
      <div className="border-t border-gray-200">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            download={item.filename}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer transition-colors duration-300 hover:border-charcoal/30"
          >
            {/* Left side: Icon & File Meta */}
            <div className="flex items-center gap-4 flex-1 pr-4">
              <FileText className="w-5 h-5 text-muted-oak group-hover:text-charcoal transition-colors duration-300 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm uppercase tracking-widest font-sans font-bold text-charcoal group-hover:text-muted-oak transition-colors duration-300">
                  {item.title}
                </span>
                <span className="text-xs text-charcoal/50 font-sans group-hover:text-charcoal/70 transition-colors duration-300 mt-1">
                  {item.filename}
                </span>
              </div>
            </div>

            {/* Right side: Interactivity Arrow Indicator */}
            <div className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/50 group-hover:border-charcoal group-hover:text-charcoal group-hover:translate-y-1 transition-all duration-300 shrink-0">
              <ArrowDown className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>

      {/* Premium Request Sample Button */}
      {onRequestSample ? (
        <button
          onClick={onRequestSample}
          className="w-full bg-charcoal text-sand py-5 text-center text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500 focus:outline-none cursor-pointer mt-8"
        >
          Request Sample Pack
        </button>
      ) : (
        <Link
          href={sampleRequestUrl}
          onClick={handleRequestSampleClick}
          className="w-full mt-8 block"
        >
          <div className="w-full bg-charcoal text-sand py-5 text-center text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500 cursor-pointer">
            Request Sample Pack
          </div>
        </Link>
      )}
    </div>
  );
}
