import {
  BookOpen,
  Building2,
  GavelIcon as GavelSquare,
  LandPlot,
  Scale,
  Users,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'uu',
    name: 'Undang-Undang',
    icon: <Scale className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'pp',
    name: 'Peraturan Pemerintah',
    icon: <GavelSquare className="h-5 w-5" />,
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'perpres',
    name: 'Peraturan Presiden',
    icon: <BadgeCheck className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'permen',
    name: 'Peraturan Menteri',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'perda',
    name: 'Peraturan Daerah',
    icon: <Building2 className="h-5 w-5" />,
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'putusan',
    name: 'Putusan Pengadilan',
    icon: <BookOpen className="h-5 w-5" />,
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'agraria',
    name: 'Hukum Agraria',
    icon: <LandPlot className="h-5 w-5" />,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'perdata',
    name: 'Hukum Perdata',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-orange-100 text-orange-700',
  },
];
