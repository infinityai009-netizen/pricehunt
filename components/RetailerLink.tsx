'use client';

import { isLoggedIn, openLoginModal } from '@/lib/authClient';

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function RetailerLink({ href, className, children }: Props) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isLoggedIn()) {
      e.preventDefault();
      openLoginModal(href);
    }
    // Otherwise let the browser open the link normally.
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
