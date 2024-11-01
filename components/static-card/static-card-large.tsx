import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { 
  FaHandPaper, 
  FaLock, 
  FaShieldAlt, 
  FaUserShield,
  FaKey,
  // Add more icons as needed
} from "react-icons/fa";

interface StaticCardProps {
  title: string;
  desc: string;
  href?: string;
  className?: string;
  variant?: 'default' | 'large';
  icon?: React.ReactNode;
  iconName?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  'hand': FaHandPaper,
  'lock': FaLock,
  'shield': FaShieldAlt,
  'user-shield': FaUserShield,
  'key': FaKey,
  // Add more icon mappings as needed
};

const StaticCard: React.FC<StaticCardProps> = ({ 
  title, 
  desc, 
  href, 
  className,
  variant = 'default',
  icon,
  iconName = 'hand'
}) => {
  const IconComponent = iconMap[iconName];

  const renderLargeVariant = () => (
    <div className="flex flex-col space-y-6 p-3 md:p-8">
      <div className="text-blue-500 dark:text-blue-400">
        {icon || (IconComponent && <IconComponent className="w-12 h-12 text-black" />)}
      </div>
      <div className="space-y-4">
        <Typography 
          variant="h2" 
          className="text-2xl md:text-4xl font-semibold tracking-tight text-black dark:text-black"
        >
          {title}
        </Typography>
        <Typography 
          variant="body" 
          className="text-gray-600 text-sm md:text-xl leading-relaxed"
        >
          {desc}
        </Typography>
      </div>
    </div>
  );

  const renderDefaultVariant = () => (
    <div className="flex flex-col h-full">
      <Typography variant="small" className="text-lg font-semibold mb-1 leading-none">
        {title}
      </Typography>
      {desc && (
        <Typography 
          variant="xsmall" 
          className="text-gray-400 line-clamp-3 text-ellipsis overflow-hidden whitespace-normal break-anywhere mb-2"
        >
          {desc}
        </Typography>
      )}
    </div>
  );

  const cardContent = (
    <div 
      className={`
        block rounded-3xl 
        ${variant === 'large' ? 'bg-white shadow-lg' : 'bg-surface-elevation-2 backdrop-blur-lg p-4'} 
        relative h-full 
        ${className}
      `}
    >
      {variant === 'large' ? renderLargeVariant() : renderDefaultVariant()}
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