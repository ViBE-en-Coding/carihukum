import {
  Fish,
  LandPlot,
  Megaphone,
  Calculator,
  Truck,
  Building,
  Shield,
  FileText,
} from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'perikanan',
    name: 'Perikanan',
    query: 'Perikanan',
    icon: <Fish className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'agraria',
    name: 'Agraria',
    query: 'Agraria',
    icon: <LandPlot className="h-5 w-5" />,
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'periklanan',
    name: 'Periklanan',
    query: 'Periklanan',
    icon: <Megaphone className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'perpajakan',
    name: 'Perpajakan',
    query: 'Perpajakan',
    icon: <Calculator className="h-5 w-5" />,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'transportasi',
    name: 'Transportasi',
    query: 'Transportasi',
    icon: <Truck className="h-5 w-5" />,
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'pembangunan',
    name: 'Pembangunan',
    query: 'Pembangunan',
    icon: <Building className="h-5 w-5" />,
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'keamanan',
    name: 'Keamanan',
    query: 'Keamanan',
    icon: <Shield className="h-5 w-5" />,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'notaris',
    name: 'Notaris',
    query: 'Notaris',
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-orange-100 text-orange-700',
  },
];
