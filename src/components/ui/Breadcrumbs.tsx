import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center flex-wrap gap-1.5 text-[11px] font-sans text-foam/50 mb-8">
      <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1 p-1 rounded-lg">
        <Home className="w-3 h-3" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-foam/20" />
            {isLast || !item.href ? (
              <span className="text-gold font-medium truncate max-w-[200px]">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gold transition-colors truncate max-w-[150px]">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
