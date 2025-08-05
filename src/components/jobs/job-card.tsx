'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock } from 'lucide-react';

interface JobWithRelations {
  id: string;
  title: string;
  description: string;
  salary?: string;
  city: string;
  contactPhone: string;
  jobType: string;
  createdAt: Date;
  category: {
    nameEn: string;
    nameHi: string;
    icon: string;
  };
  employer: {
    companyName?: string;
    name?: string;
  };
}

interface JobCardProps {
  job: JobWithRelations;
  locale: string;
  showApplyButton?: boolean;
}

export function JobCard({ job, locale, showApplyButton = false }: JobCardProps) {
  const t = useTranslations();
  
  const categoryName = locale === 'hi' ? job.category.nameHi : job.category.nameEn;
  const employerName = job.employer.companyName || job.employer.name || 'Company';
  
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('common.justNow');
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{job.category.icon}</span>
            <div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{employerName}</p>
            </div>
          </div>
          <Badge variant="secondary">{categoryName}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-2">{job.description}</p>
        
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{job.city}</span>
          </div>
          
          {job.salary && (
            <div className="flex items-center gap-1">
              <span>💰</span>
              <span>{job.salary}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo(job.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/${locale}/jobs/${job.id}`}>
              {t('common.view')}
            </Link>
          </Button>
          
          {showApplyButton && (
            <Button asChild size="sm">
              <Link href={`/${locale}/jobs/${job.id}/apply`}>
                {t('common.apply')}
              </Link>
            </Button>
          )}
          
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${job.contactPhone}`}>
              <Phone className="h-4 w-4 mr-1" />
              {t('common.contact')}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
