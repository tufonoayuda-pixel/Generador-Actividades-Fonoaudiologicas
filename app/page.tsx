"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ActivityForm } from "@/components/activity-form"
import { ActivityResults } from "@/components/activity-results"
import { CreatorFooter } from "@/components/creator-footer"
import type { FormData, GeneratedActivity } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function Home() {
  const [activity, setActivity] = useState<GeneratedActivity | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [activityCount, setActivityCount] = useState(0)
  const [error, setError] = useState<string | undefined>()

  const handleFormSubmit = async (formData: FormData) => {
    if (activityCount >= 3) {
      setError("Has alcanzado el límite de 3 actividades. Por favor, dona para continuar usando la herramienta.")
      return
    }

    setIsLoading(true)
    setActivity(undefined)
    setError(undefined)

    try {
      // Convert FormData to API request format
      const requestData = {
        diagnosis: formData.diagnosis,
        characteristics: formData.characteristics,
        needs: formData.needs,
        area: formData.area,
        duration: formData.duration,
        creativity: formData.creativity,
        strategies: formData.strategies,
        customStrategies: formData.customStrategies,
        context: formData.context,
        pdfs: formData.pdfs.map((file) => file.name), // Just send file names for now
      }

      console.log("[v0] Sending request to API:", requestData)

      const response = await fetch("/api/generate-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate activity")
      }

      const generatedActivity: GeneratedActivity = await response.json()
      console.log("[v0] Received activity:", generatedActivity)

      setActivity(generatedActivity)
      setActivityCount((prev) => prev + 1)
    } catch (error) {
      console.error("Error generating activity:", error)
      setError("Error al generar la actividad. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Actividades generadas: {activityCount}/3</p>
          {activityCount >= 2 && (
            <Alert className="mt-2 max-w-md mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {activityCount === 2
                  ? "Te queda 1 actividad gratuita. Considera donar para uso ilimitado."
                  : "Has alcanzado el límite gratuito. Dona para continuar generando actividades."}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {error && (
          <Alert className="mb-6 max-w-md mx-auto" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityForm onSubmit={handleFormSubmit} isLoading={isLoading} disabled={activityCount >= 3} />
          <ActivityResults activity={activity} isLoading={isLoading} />
        </div>
      </main>

      <CreatorFooter />
    </div>
  )
}
