import { SearchForm } from "@/components/search-form"
import { RecentSearches } from "@/components/recent-searches"
import { LegalCategories } from "@/components/legal-categories"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <div className="w-full max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Cari<span className="text-primary">Hukum</span>
            </h1>
            <p className="text-muted-foreground">Mesin pencari peraturan perundang-undangan Indonesia</p>
          </div>
          <SearchForm />
          <RecentSearches />
          <LegalCategories />
        </div>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CariHukum. Semua hak dilindungi.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Tentang Kami
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Syarat Penggunaan
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
