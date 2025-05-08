"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  BookOpen,
  Building2,
  GavelIcon as GavelSquare,
  LandPlot,
  Scale,
  Users,
  Briefcase,
  BadgeCheck,
} from "lucide-react"

const categories = [
  {
    id: "uu",
    name: "Undang-Undang",
    icon: <Scale className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "pp",
    name: "Peraturan Pemerintah",
    icon: <GavelSquare className="h-5 w-5" />,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "perpres",
    name: "Peraturan Presiden",
    icon: <BadgeCheck className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "permen",
    name: "Peraturan Menteri",
    icon: <Briefcase className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "perda",
    name: "Peraturan Daerah",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "putusan",
    name: "Putusan Pengadilan",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "agraria",
    name: "Hukum Agraria",
    icon: <LandPlot className="h-5 w-5" />,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "perdata",
    name: "Hukum Perdata",
    icon: <Users className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-700",
  },
]

export function LegalCategories() {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/search?q=&category=${categoryId}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Kategori Hukum</h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${category.color} hover:opacity-90 transition-all`}
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-2">{category.icon}</div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
