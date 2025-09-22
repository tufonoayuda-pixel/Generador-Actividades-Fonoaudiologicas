import { Instagram, Heart, Brain } from "lucide-react"

export function CreatorFooter() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          {/* Main creator info */}
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-muted-foreground">Creado con</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-muted-foreground">por</span>
            <span className="font-bold text-foreground">Flgo. Cristóbal San Martín</span>
          </div>

          {/* Instagram link */}
          <div className="flex items-center justify-center space-x-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <a
              href="https://instagram.com/tufonoayuda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              @tufonoayuda
            </a>
          </div>

          {/* App description */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4" />
            <span>Generador de actividades fonoaudiológicas con inteligencia artificial</span>
          </div>

          {/* Powered by */}
          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            <p>Powered by Vercel AI SDK • Next.js • OpenAI</p>
            <p className="mt-1">© 2024 FonoActivity Generator - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
