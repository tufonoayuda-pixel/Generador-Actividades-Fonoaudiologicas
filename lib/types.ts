export interface FormData {
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

export interface GeneratedActivity {
  title: string
  area: string
  duration: number
  objective: string
  materials: string[]
  procedure: Array<{
    title: string
    description: string
  }>
  adaptations: Array<{
    title: string
    description: string
  }>
  strategies: string[]
  references: Array<{
    author: string
    title: string
    source: string
  }>
  diagnosis: string
  context: string
}
