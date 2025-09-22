"use client"
import {
  Star,
  Bot,
  FileText,
  Target,
  Wrench,
  ListChecks,
  UniversityIcon as UniversalAccess,
  HandHeart,
  BookOpen,
  Info,
  Clock,
  Stethoscope,
  Save,
  Download,
  Share,
  CheckCircle,
  Quote,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GeneratedActivity } from "@/lib/types"

interface ActivityResultsProps {
  activity?: GeneratedActivity
  isLoading?: boolean
}

export function ActivityResults({ activity, isLoading = false }: ActivityResultsProps) {
  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Star className="text-yellow-500 mr-2" />
            Actividad Generada por IA
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Analizando documentos y generando actividad...</p>
            <p className="text-sm text-muted-foreground mt-2">
              La IA está creando una propuesta terapéutica personalizada
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!activity) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Star className="text-yellow-500 mr-2" />
            Actividad Generada por IA
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Bot className="w-16 h-16 mx-auto mb-4" />
            <p>Completa el formulario y haz clic en "Generar Actividad con IA"</p>
            <p className="text-sm mt-2">La IA analizará tus documentos y creará una actividad personalizada</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Star className="text-yellow-500 mr-2" />
          Actividad Generada por IA
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-4 rounded-lg">
          <h3 className="text-2xl font-bold text-balance">{activity.title}</h3>
          <div className="flex items-center mt-2 text-primary-foreground/80">
            <Clock className="w-4 h-4 mr-1" />
            <span>{activity.duration} minutos</span>
            <Stethoscope className="w-4 h-4 ml-4 mr-1" />
            <span>{activity.area}</span>
          </div>
        </div>

        {/* Diagnosis */}
        {activity.diagnosis && (
          <div>
            <h4 className="font-bold text-foreground flex items-center mb-2">
              <FileText className="text-primary w-5 h-5 mr-2" />
              Diagnóstico
            </h4>
            <p className="text-muted-foreground">{activity.diagnosis}</p>
          </div>
        )}

        {/* Objective */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <Target className="text-primary w-5 h-5 mr-2" />
            Objetivo Terapéutico
          </h4>
          <p className="text-muted-foreground">{activity.objective}</p>
        </div>

        {/* Materials */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <Wrench className="text-primary w-5 h-5 mr-2" />
            Materiales Necesarios
          </h4>
          <ul className="space-y-1">
            {activity.materials.map((material, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">{material}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Procedure */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <ListChecks className="text-primary w-5 h-5 mr-2" />
            Procedimiento
          </h4>
          <div className="space-y-3">
            {activity.procedure.map((step, index) => (
              <div key={index} className="flex">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adaptations */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <UniversalAccess className="text-primary w-5 h-5 mr-2" />
            Adaptaciones
          </h4>
          <div className="space-y-2">
            {activity.adaptations.map((adaptation, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="font-medium text-blue-800 dark:text-blue-200">{adaptation.title}:</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{adaptation.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Strategies */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <HandHeart className="text-primary w-5 h-5 mr-2" />
            Estrategias de Apoyo
          </h4>
          <div className="flex flex-wrap gap-2">
            {activity.strategies.map((strategy, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200"
              >
                {strategy}
              </Badge>
            ))}
          </div>
        </div>

        {/* References */}
        <div>
          <h4 className="font-bold text-foreground flex items-center mb-2">
            <BookOpen className="text-primary w-5 h-5 mr-2" />
            Referencias Científicas
          </h4>
          <ul className="space-y-2 text-sm">
            {activity.references.map((ref, index) => (
              <li key={index} className="flex items-start">
                <Quote className="text-primary/60 w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p className="font-medium">{ref.author}:</p>
                  <p>
                    "{ref.title}" - {ref.source}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Context */}
        {activity.context && (
          <div>
            <h4 className="font-bold text-foreground flex items-center mb-2">
              <Info className="text-primary w-5 h-5 mr-2" />
              Contexto de Aplicación
            </h4>
            <p className="text-muted-foreground">{activity.context}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-4 border-t border-border">
          <Button className="flex-1" variant="default">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button className="flex-1 bg-transparent" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button className="flex-1 bg-transparent" variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Compartir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
