'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  sector: string;
}

interface CategoryGridProps {
  categories: Category[];
  locale: string;
}

export function CategoryGrid({ categories, locale }: CategoryGridProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const categoryName = locale === 'hi' ? category.nameHi : category.nameEn;
        
        return (
          <Link
            key={category.id}
            href={`/${locale}/jobs?category=${category.id}`}
            className="group"
          >
            <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/50">
              <CardContent className="flex flex-col items-center text-center p-4 h-full justify-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm line-clamp-2 leading-tight">
                  {categoryName}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.sector}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
