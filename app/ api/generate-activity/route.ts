import { type NextRequest, NextResponse } from "next/server"

interface ActivityRequest {
  diagnosis: string
  characteristics: string
  needs: string
  area: string
  duration: number
  creativity: "basico" | "intermedio" | "avanzado"
  strategies: string[]
  customStrategies: string
  context: string
  pdfs: string[] // PDF file names for reference
}

interface GeneratedActivity {
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

const areaNames: Record<string, string> = {
  "lenguaje-adulto": "Lenguaje Adulto",
  "lenguaje-infantil": "Lenguaje Infantil",
  "habla-adulto": "Habla Adulto",
  "habla-infantil": "Habla Infantil",
  "deglucion-adulto": "Deglución Adulto",
  "deglucion-infantil": "Deglución Infantil",
  "motricidad-orofacial": "Motricidad Orofacial",
  voz: "Voz",
  "fonoaudiologia-estetica": "Fonoaudiología Estética",
  cognicion: "Cognición",
  audiologia: "Audiología",
}

export async function POST(request: NextRequest) {
  try {
    const data: ActivityRequest = await request.json()

    console.log("[v0] Processing activity request:", data)

    if (!process.env.AWANLLM_API_KEY) {
      console.error("[v0] Awan LLM API key is missing")
      return NextResponse.json(
        {
          error:
            "La clave de API de Awan LLM no está configurada. Por favor, configura la variable de entorno AWANLLM_API_KEY en tu proyecto de Vercel.",
        },
        { status: 500 },
      )
    }

    // Build the AI prompt
    const prompt = `
Eres un fonoaudiólogo experto con más de 15 años de experiencia clínica. Tu tarea es crear una actividad terapéutica detallada y profesional basada en la siguiente información:

**INFORMACIÓN DEL PACIENTE:**
- Diagnóstico: ${data.diagnosis}
- Características: ${data.characteristics}
- Necesidades específicas: ${data.needs}
- Área terapéutica: ${areaNames[data.area]}
- Duración de sesión: ${data.duration} minutos
- Contexto: ${data.context}

**PARÁMETROS DE LA ACTIVIDAD:**
- Nivel de creatividad: ${data.creativity}
- Estrategias de apoyo: ${data.strategies.join(", ")}
- Estrategias personalizadas: ${data.customStrategies}
- Documentos de referencia: ${data.pdfs.join(", ")}

**INSTRUCCIONES:**
Crea una actividad terapéutica completa que incluya:

1. **Título creativo y motivador** para la actividad
2. **Objetivo terapéutico específico** basado en las necesidades del paciente
3. **Lista de materiales necesarios** (3-6 items, adaptados al nivel de creatividad)
4. **Procedimiento paso a paso** dividido en 4 fases:
   - Preparación (tiempo estimado)
   - Actividad principal (tiempo estimado)
   - Reforzamiento (tiempo estimado)
   - Cierre (tiempo estimado)
5. **3 adaptaciones específicas** para diferentes necesidades del paciente
6. **Referencias científicas** (incluye al menos una referencia real del área)

**CONSIDERACIONES IMPORTANTES:**
- La actividad debe ser apropiada para el área terapéutica especificada
- Debe ser factible en el tiempo asignado
- Incluye técnicas basadas en evidencia
- Adapta el lenguaje y materiales según la población (adulto/infantil)
- Considera las estrategias de apoyo mencionadas

Responde ÚNICAMENTE en formato JSON con esta estructura exacta:
{
  "title": "string",
  "objective": "string", 
  "materials": ["string"],
  "procedure": [
    {"title": "string", "description": "string"}
  ],
  "adaptations": [
    {"title": "string", "description": "string"}
  ],
  "references": [
    {"author": "string", "title": "string", "source": "string"}
  ]
}
`

    const response = await fetch("https://api.awanllm.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AWANLLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Meta-Llama-3-8B-Instruct",
        messages: [
          {
            role: "system",
            content:
              "Eres un fonoaudiólogo experto especializado en crear actividades terapéuticas detalladas y profesionales.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: data.creativity === "avanzado" ? 0.8 : data.creativity === "intermedio" ? 0.6 : 0.4,
        max_tokens: 2048,
        top_p: 0.9,
        repetition_penalty: 1.1,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] Awan LLM API error:", response.status, errorData)
      throw new Error(`API request failed: ${response.status}`)
    }

    const aiResult = await response.json()
    const text = aiResult.choices?.[0]?.message?.content || ""

    console.log("[v0] AI response received:", text.substring(0, 200) + "...")

    // Parse the AI response
    let aiResponse
    try {
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No JSON found in AI response")
      }
      aiResponse = JSON.parse(jsonMatch[0])
      console.log("[v0] Successfully parsed AI response")
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      // Fallback response
      aiResponse = {
        title: `Actividad Terapéutica: ${data.needs.split(" ")[0] || "Fonoaudiológica"}`,
        objective: `Mejorar ${data.needs.toLowerCase()} a través de técnicas especializadas en ${areaNames[data.area]}`,
        materials: ["Material básico de fonoaudiología", "Tarjetas de apoyo visual", "Cronómetro"],
        procedure: [
          { title: "Preparación (3 min)", description: "Establecer rapport y explicar la actividad" },
          {
            title: "Actividad principal (8 min)",
            description: `Desarrollar ejercicio específico para ${data.needs.toLowerCase()}`,
          },
          { title: "Reforzamiento (3 min)", description: "Practicar en diferentes contextos" },
          { title: "Cierre (1 min)", description: "Resumir logros y asignar práctica" },
        ],
        adaptations: [
          { title: "Para pacientes con menor atención", description: "Dividir en segmentos más cortos" },
          { title: "Para limitaciones motoras", description: "Adaptar materiales y usar tecnología" },
          { title: "Para resistencia visual", description: "Incorporar elementos táctiles y auditivos" },
        ],
        references: [
          {
            author: "ASHA (2023)",
            title: "Guías de práctica clínica en fonoaudiología",
            source: "American Speech-Language-Hearing Association",
          },
        ],
      }
    }

    // Build complete activity response
    const activity: GeneratedActivity = {
      title: aiResponse.title,
      area: areaNames[data.area],
      duration: data.duration,
      objective: aiResponse.objective,
      materials: aiResponse.materials,
      procedure: aiResponse.procedure,
      adaptations: aiResponse.adaptations,
      strategies: [...data.strategies, ...(data.customStrategies ? [data.customStrategies] : [])],
      references: aiResponse.references,
      diagnosis: data.diagnosis,
      context: data.context,
    }

    console.log("[v0] Sending complete activity response")
    return NextResponse.json(activity)
  } catch (error) {
    console.error("[v0] Error generating activity:", error)

    let errorMessage = "Error al generar la actividad. Por favor, intenta nuevamente."

    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("401")) {
        errorMessage = "Error de autenticación con Awan LLM. Verifica que la clave API esté configurada correctamente."
      } else if (error.message.includes("rate limit") || error.message.includes("429")) {
        errorMessage =
          "Se ha excedido el límite de solicitudes. Por favor, espera un momento antes de intentar nuevamente."
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "Error de conexión. Verifica tu conexión a internet e intenta nuevamente."
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
