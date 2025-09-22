"use client"

import { Brain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="text-primary text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Generador de Actividades Fonoaudiológicas</h1>
              <p className="text-sm text-muted-foreground">una herramienta de TuFonoAyuda</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              IA Real
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-none hover:from-pink-600 hover:to-red-600"
              onClick={() => window.open("https://www.paypal.com/donate", "_blank")}
            >
              <Heart className="h-4 w-4 mr-2" />
              Donar para mantener la página
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
