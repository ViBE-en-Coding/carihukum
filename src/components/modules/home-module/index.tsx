import { LegalCategories } from '@/components/modules/home-module/elements/legal-categories';
import { RecentSearches } from '@/components/modules/home-module/elements/recent-searches';
import { SearchForm } from '@/components/search-form';
import { Typography } from '@/components/ui/atoms/typogrpahy';
import { FC } from 'react';

export const HomeModule: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="">
          <Typography variant="h1" className="text-center">
            Cari<span className="text-primary">Hukum</span>
          </Typography>
        </div>

        <SearchForm />
        <RecentSearches />
        <LegalCategories />
      </div>
    </div>
  );
};
