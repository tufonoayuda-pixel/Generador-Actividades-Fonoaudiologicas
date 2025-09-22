# Generador de Actividades Fonoaudiológicas

Una herramienta de **TuFonoAyuda** creada por **Flgo. Cristóbal San Martín**.

## 🧠 Características

- **Generación con IA**: Utiliza Vercel AI SDK con Awan LLM para crear actividades terapéuticas personalizadas
- **Límite gratuito**: 3 actividades gratuitas por sesión
- **Interfaz profesional**: Diseño moderno y responsivo optimizado para profesionales de la salud
- **Múltiples áreas**: Soporte para todas las especialidades fonoaudiológicas
- **Personalización avanzada**: Adapta las actividades según diagnóstico, características del paciente y contexto

## 🚀 Tecnologías

- **Next.js 14** - Framework de React con App Router
- **Vercel AI SDK** - Integración con modelos de IA
- **Awan LLM (Meta-Llama-3-8B-Instruct)** - Generación de contenido inteligente
- **Tailwind CSS v4** - Estilos modernos y responsivos
- **Radix UI** - Componentes accesibles
- **TypeScript** - Tipado estático

## 📋 Áreas Terapéuticas Soportadas

- Lenguaje (Adulto/Infantil)
- Habla (Adulto/Infantil)
- Deglución (Adulto/Infantil)
- Motricidad Orofacial
- Voz
- Fonoaudiología Estética
- Cognición
- Audiología

## ⚠️ Limitaciones del Servicio

**IMPORTANTE**: Después de hacer una donación, el servicio **NO** ofrece uso ilimitado. El sistema tiene las siguientes limitaciones:

- Después de usar el servicio, se **bloquea durante 18 horas**
- Pasadas las 18 horas, el servicio vuelve a estar disponible
- Esta limitación aplica tanto para usuarios gratuitos como para donantes
- La donación ayuda a mantener el proyecto, pero no elimina las restricciones de uso

## 🛠️ Instalación y Configuración

### Opción 1: Despliegue en Vercel (Recomendado)

1. Haz fork de este repositorio en GitHub
2. Conecta tu repositorio con Vercel
3. En la configuración de Vercel, agrega la variable de entorno:
   - `AWANLLM_API_KEY`: Tu clave API de Awan LLM
4. Despliega el proyecto

### Opción 2: Desarrollo Local

1. Clona este repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/generador-actividades-fonoaudiologicas.git
cd generador-actividades-fonoaudiologicas
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configura las variables de entorno:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Obtén tu API key de Awan LLM:
   - Ve a [Awan LLM](https://www.awanllm.com/)
   - Regístrate y crea una nueva clave API
   - Cópiala en tu archivo `.env.local`:
\`\`\`
AWANLLM_API_KEY=tu_api_key_aqui
\`\`\`

5. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Uso

1. **Completa el formulario** con la información del paciente:
   - Diagnóstico fonoaudiológico
   - Características del paciente
   - Necesidades específicas
   - Área terapéutica
   - Duración de la sesión
   - Nivel de creatividad deseado
   - Estrategias de apoyo
   - Contexto adicional

2. **Genera la actividad** haciendo clic en "Generar Actividad con IA"

3. **Revisa la actividad** generada con todos los detalles terapéuticos

4. **Límite de uso**: Tienes 3 actividades gratuitas por sesión

## 🎯 Características de las Actividades Generadas

Cada actividad incluye:

- **Título creativo y motivador**
- **Objetivo terapéutico específico**
- **Lista de materiales necesarios**
- **Procedimiento paso a paso** con tiempos estimados
- **Adaptaciones** para diferentes necesidades
- **Estrategias de apoyo** personalizadas
- **Referencias científicas** relevantes

## 💝 Apoyo al Proyecto

Si esta herramienta te es útil, considera hacer una donación para mantener el proyecto funcionando y seguir mejorándolo.

**Recuerda**: La donación es un apoyo al desarrollo del proyecto, pero no elimina las limitaciones de uso (bloqueo de 18 horas).

## 👨‍⚕️ Creador

**Flgo. Cristóbal San Martín**
- Instagram: [@tufonoayuda](https://instagram.com/tufonoayuda)
- Especialista en Fonoaudiología

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 🔧 Solución de Problemas

### Error: "La clave de API de Awan LLM no está configurada"
- Verifica que hayas agregado `AWANLLM_API_KEY` en las variables de entorno de Vercel
- Si estás en desarrollo local, asegúrate de que el archivo `.env.local` contenga la clave

### Error: "Se ha excedido el límite de solicitudes"
- Espera unos minutos antes de generar otra actividad
- Verifica que tu cuenta de Awan LLM tenga cuota disponible

### Servicio bloqueado
- Si el servicio está bloqueado, debes esperar 18 horas para poder usarlo nuevamente
- Esta limitación es normal y aplica a todos los usuarios

### La aplicación no carga
- Verifica que todas las dependencias estén instaladas (`npm install`)
- Asegúrate de estar usando Node.js 18 o superior

## 📄 Licencia

© 2024 Generador de Actividades Fonoaudiológicas - Todos los derechos reservados

---

*Una herramienta de TuFonoAyuda • Powered by Vercel AI SDK • Next.js • Awan LLM*
