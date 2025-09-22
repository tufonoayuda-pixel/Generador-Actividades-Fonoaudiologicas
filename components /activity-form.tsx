"use client"

import type React from "react"

import { useState } from "react"
import {
  ClipboardList,
  Stethoscope,
  UserX,
  Target,
  Clock,
  Lightbulb,
  HandHeart,
  FileText,
  Info,
  Sparkles,
  Upload,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface FormData {
  diagnosis: string
  characteristics: string
  needs: string
  area: string
  duration: number
  creativity: "basico" | "intermedio" | "avanzado"
  strategies: string[]
  customStrategies: string
  context: string
  pdfs: File[]
}

interface ActivityFormProps {
  onSubmit: (data: FormData) => void
  isLoading?: boolean
  disabled?: boolean
}

export function ActivityForm({ onSubmit, isLoading = false, disabled = false }: ActivityFormProps) {
  const [formData, setFormData] = useState<FormData>({
    diagnosis: "",
    characteristics: "",
    needs: "",
    area: "lenguaje-infantil",
    duration: 15,
    creativity: "intermedio",
    strategies: [],
    customStrategies: "",
    context: "",
    pdfs: [],
  })

  const therapeuticAreas = [
    { value: "lenguaje-adulto", label: "Lenguaje Adulto" },
    { value: "lenguaje-infantil", label: "Lenguaje Infantil" },
    { value: "habla-adulto", label: "Habla Adulto" },
    { value: "habla-infantil", label: "Habla Infantil" },
    { value: "deglucion-adulto", label: "Deglución Adulto" },
    { value: "deglucion-infantil", label: "Deglución Infantil" },
    { value: "motricidad-orofacial", label: "Motricidad Orofacial" },
    { value: "voz", label: "Voz" },
    { value: "fonoaudiologia-estetica", label: "Fonoaudiología Estética" },
    { value: "cognicion", label: "Cognición" },
    { value: "audiologia", label: "Audiología" },
  ]

  const supportStrategies = ["Refuerzo visual", "Modelado", "Tecnología", "Juego simbólico"]

  const creativityLevels = [
    { value: "basico", label: "Básico" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    onSubmit(formData)
  }

  const handleStrategyChange = (strategy: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      strategies: checked ? [...prev.strategies, strategy] : prev.strategies.filter((s) => s !== strategy),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter((file) => file.type === "application/pdf")

    setFormData((prev) => ({
      ...prev,
      pdfs: [...prev.pdfs, ...pdfFiles].slice(0, 3), // Max 3 files
    }))
  }

  const removePdf = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pdfs: prev.pdfs.filter((_, i) => i !== index),
    }))
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ClipboardList className="text-primary mr-2" />
          Crear Nueva Actividad
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Diagnóstico Fonoaudiológico */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Stethoscope className="w-4 h-4 mr-1" />
              Diagnóstico Fonoaudiológico
            </Label>
            <Textarea
              placeholder="Ej: Dislalia funcional, trastorno articulatorio..."
              value={formData.diagnosis}
              onChange={(e) => setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))}
              rows={2}
            />
          </div>

          {/* Características del Paciente */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <UserX className="w-4 h-4 mr-1" />
              Características del Paciente
            </Label>
            <Textarea
              placeholder="Ej: Niño de 7 años con TEA, lenguaje expresivo limitado..."
              value={formData.characteristics}
              onChange={(e) => setFormData((prev) => ({ ...prev, characteristics: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Necesidades Específicas */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Target className="w-4 h-4 mr-1" />
              Necesidades Específicas
            </Label>
            <Input
              placeholder="Ej: Mejorar producción de fonemas /s/ y /z/"
              value={formData.needs}
              onChange={(e) => setFormData((prev) => ({ ...prev, needs: e.target.value }))}
            />
          </div>

          {/* Área Terapéutica */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Stethoscope className="w-4 h-4 mr-1" />
              Área Terapéutica
            </Label>
            <Select value={formData.area} onValueChange={(value) => setFormData((prev) => ({ ...prev, area: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {therapeuticAreas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duración */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Clock className="w-4 h-4 mr-1" />
              Duración (minutos)
            </Label>
            <div className="space-y-2">
              <Slider
                value={[formData.duration]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value[0] }))}
                min={5}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5 min</span>
                <span className="font-medium text-primary">{formData.duration} min</span>
                <span>60 min</span>
              </div>
            </div>
          </div>

          {/* Creatividad */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Lightbulb className="w-4 h-4 mr-1" />
              Nivel de Creatividad
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {creativityLevels.map((level) => (
                <Button
                  key={level.value}
                  type="button"
                  variant={formData.creativity === level.value ? "default" : "outline"}
                  onClick={() => setFormData((prev) => ({ ...prev, creativity: level.value as any }))}
                  className="text-center"
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Estrategias de Apoyo */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <HandHeart className="w-4 h-4 mr-1" />
              Estrategias de Apoyo
            </Label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {supportStrategies.map((strategy) => (
                <div key={strategy} className="flex items-center space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={formData.strategies.includes(strategy)}
                    onCheckedChange={(checked) => handleStrategyChange(strategy, checked as boolean)}
                  />
                  <Label htmlFor={strategy} className="text-sm">
                    {strategy}
                  </Label>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Escribe otras estrategias personalizadas..."
              value={formData.customStrategies}
              onChange={(e) => setFormData((prev) => ({ ...prev, customStrategies: e.target.value }))}
              rows={2}
            />
          </div>

          {/* Carga de PDFs */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <FileText className="w-4 h-4 mr-1" />
              Documentos de Referencia (PDF)
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Arrastra PDFs aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-1">Máximo 3 archivos</p>
              </label>
            </div>

            {formData.pdfs.length > 0 && (
              <div className="space-y-1">
                {formData.pdfs.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removePdf(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contexto Adicional */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Info className="w-4 h-4 mr-1" />
              Contexto Adicional
            </Label>
            <Textarea
              placeholder="Ej: Sesión en clínica, con tablet disponible..."
              value={formData.context}
              onChange={(e) => setFormData((prev) => ({ ...prev, context: e.target.value }))}
              rows={2}
            />
          </div>

          {/* Botón Generar */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
            disabled={isLoading || disabled}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {disabled
              ? "Límite alcanzado - Dona para continuar"
              : isLoading
                ? "Generando..."
                : "Generar Actividad con IA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
