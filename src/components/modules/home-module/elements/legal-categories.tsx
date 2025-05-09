'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../home.constant';

export function LegalCategories() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/search?q=&category=${categoryId}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Kategori Hukum</h2>
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center rounded-lg p-4 ${category.color} transition-all hover:opacity-90`}
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-2">{category.icon}</div>
            <span className="text-center text-sm font-medium">
              {category.name}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
