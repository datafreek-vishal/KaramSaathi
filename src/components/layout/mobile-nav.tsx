'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Briefcase, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

interface MobileNavProps {
  locale: string;
  userRole?: 'WORKER' | 'EMPLOYER' | 'ADMIN';
}

export function MobileNav({ locale, userRole = 'WORKER' }: MobileNavProps) {
  const t = useTranslations();
  const pathname = usePathname();

  const getNavItems = (): MobileNavItem[] => {
    const baseItems: MobileNavItem[] = [
      {
        icon: Home,
        label: t('nav.home'),
        href: `/${locale}`,
        active: pathname === `/${locale}`,
      },
    ];

    switch (userRole) {
      case 'WORKER':
        return [
          ...baseItems,
          {
            icon: Briefcase,
            label: t('nav.jobs'),
            href: `/${locale}/jobs`,
            active: pathname.startsWith(`/${locale}/jobs`),
          },
          {
            icon: User,
            label: t('nav.profile'),
            href: `/${locale}/profile`,
            active: pathname.startsWith(`/${locale}/profile`),
          },
        ];
      
      case 'EMPLOYER':
        return [
          ...baseItems,
          {
            icon: Settings,
            label: t('nav.dashboard'),
            href: `/${locale}/employer`,
            active: pathname.startsWith(`/${locale}/employer`),
          },
          {
            icon: User,
            label: t('nav.profile'),
            href: `/${locale}/profile`,
            active: pathname.startsWith(`/${locale}/profile`),
          },
        ];
      
      case 'ADMIN':
        return [
          ...baseItems,
          {
            icon: Settings,
            label: t('nav.dashboard'),
            href: `/${locale}/admin`,
            active: pathname.startsWith(`/${locale}/admin`),
          },
          {
            icon: User,
            label: t('nav.profile'),
            href: `/${locale}/profile`,
            active: pathname.startsWith(`/${locale}/profile`),
          },
        ];
      
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[60px] h-12 rounded-lg transition-colors touch-friendly",
                item.active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
