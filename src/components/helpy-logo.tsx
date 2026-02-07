import { Bot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sizes = {
  sm: {
    container: "h-7 w-7 rounded-md",
    icon: "h-3.5 w-3.5",
    text: "text-base",
  },
  default: {
    container: "h-8 w-8 rounded-lg",
    icon: "h-4 w-4",
    text: "text-lg",
  },
  lg: {
    container: "h-9 w-9 rounded-lg",
    icon: "h-5 w-5",
    text: "text-xl",
  },
};

interface HelpyLogoProps {
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  textClassName?: string;
  showText?: boolean;
}

export function HelpyLogo({
  size = "default",
  href,
  className,
  textClassName,
  showText = true,
}: HelpyLogoProps) {
  const s = sizes[size];

  const content = (
    <>
      <div
        className={cn(
          "flex items-center justify-center bg-primary",
          s.container,
        )}
      >
        <Bot className={cn("text-primary-foreground", s.icon)} />
      </div>
      {showText && (
        <span className={cn("font-semibold", s.text, textClassName)}>
          Helpy
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("flex items-center gap-2.5", className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>{content}</div>
  );
}
