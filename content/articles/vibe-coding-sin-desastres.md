---
id: "8"
title: "Vibe Coding sin Desastres"
subtitle: "Cómo estructurar proyectos de IA sin ser ingeniero"
description: "La IA escribe código 10x más rápido que tú. Pero sin estructura, eso es 10x más caos. Te enseño las 15 capas que uso en todos mis proyectos para que la velocidad no se convierta en deuda técnica."
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
readTime: "20 min read"
publishDate: "2026-04-02"
status: "published"
author: "Sure 🧒"
tags: ["AI", "Vibe Coding", "Architecture", "T3 Stack", "Software"]
slug: "vibe-coding-sin-desastres"
contentType: "guide"
videoUrl: "https://youtu.be/EZty_XXUkIs"
---

> **TL;DR**: La IA escribe código a velocidad brutal. Sin estructura, esa velocidad genera caos. Después de construir Anlak Studio, Lobabell y media docena de productos más, aprendí que la arquitectura no es un lujo de ingenieros — es supervivencia. Te comparto las 15 capas que uso en mis proyectos T3 Stack para que "vibe coding" no termine en "vibe debugging".

## PHASE 1: EL PROBLEMA

### 1. La Paradoja de la Velocidad

Hace dos años, escribir una API me tomaba semanas. Hoy, le pido a Claude que la escriba y está lista en minutos. Sounds amazing, ¿no?

Aquí está el problema: **esa velocidad es peligrosa.**

Cuando programas manualmente, tu velocidad de escritura actúa como freno natural. Te da tiempo de pensar la arquitectura mientras escribes. Cada línea que tecleas es un momento de reflexión.

Pero cuando la IA escribe por ti, ese freno desaparece. Puedes generar 1000 líneas de código en 30 segundos. Y si no tienes estructura, esas 1000 líneas son un desastre ambulante.

He visto proyectos de "vibe coding" donde:
- La lógica de negocio está mezclada con el SQL
- Los componentes de UI hacen llamadas a base de datos directamente
- Las variables se llaman `data`, `data2` y `finalData`
- Un cambio en un archivo rompe otros tres que no sabías que existían

**La IA no va a resolver esto por ti.** Al contrario, la IA va a empeorarlo porque va a generar código mal estructurado 10x más rápido de lo que tú podrías escribirlo mal.

![Vibe Coding Setup](/powerideas/images/vibe-coding/frame-00-00-05.jpg)

### 2. Código Espagueti: El Enemigo Invisible

Hay un tipo de código que llamo "espagueti invisible".

No parece mal código cuando lo escribes. Cada función tiene sentido por separado. Cada archivo hace lo que tiene que hacer. El problema es que **todo está conectado con todo**.

Ejemplo real de un proyecto mío hace 3 años:

```typescript
// En un componente de React
async function handleSubmit() {
  const user = await db.user.findFirst(...);  // Llamada directa a BD
  if (user.credits < 10) {                    // Lógica de negocio
    alert("No tienes créditos");              // UI inline
    return;
  }
  const result = await fetch("/api/process"); // API call
  setCredits(user.credits - 10);              // Estado local
  sendEmail(user.email, result);              // Efecto secundario
}
```

Parece inocente. Pero cuando tienes 50 componentes así:
- ¿Dónde está la lógica de créditos? En 50 sitios
- ¿Cómo cambias el sistema de alertas? Buscas y reemplazas en 50 archivos
- ¿Cómo pruebas que los créditos se descuentan bien? No puedes mockear porque todo está acoplado
- ¿Qué pasa cuando la IA intenta modificar esto? Genera más del mismo caos

La IA no va a decir "oye, esto debería estar en una capa de servicios". La IA va a decir "claro, aquí tienes el código que pediste" y va a añadir otra función que mezcla 5 responsabilidades.

### 3. Por Qué los No Ingenieros Necesitamos Más Estructura

Soy psicólogo de formación. No estudié ingeniería. Y durante años pensé que la arquitectura de software era algo para gente que tenía títulos de CS.

Me equivocaba.

**Los no ingenieros necesitamos MÁS estructura que los ingenieros**, no menos. Y la razón es simple:

Un ingeniero tiene años de patrones internalizados. Sabe intuitivamente que "la lógica de negocio no va en el componente". Tiene reflejos condicionados de "esto huele mal".

Yo no tenía esos reflejos. Tú probablemente tampoco.

Pero lo que sí tenemos es capacidad de entender **sistemas**. La arquitectura no es magia — es organización. Y si hay algo que un no ingeniero puede hacer bien, es organizar.

La estructura que te voy a enseñar no requiere saber algoritmos. No requiere entender cómo funciona un garbage collector. Solo requiere entender **dónde va cada cosa**.

> "La arquitectura no es saber programar mejor. Es saber dónde poner lo que programas."

### 4. El Principio de una Slide, un Mensaje

La mejor manera de entender arquitectura de software es pensando en presentaciones.

Cuando haces una buena presentación, ¿qué sigue?
- Una slide = un mensaje
- Cada slide tiene un propósito único
- El título de la slide te dice de qué va
- Si una slide tiene tres ideas, la divides en tres slides

Código limpio es lo mismo:
- Un archivo = una responsabilidad
- Cada archivo tiene un propósito único
- El nombre del archivo te dice qué hace
- Si un archivo hace tres cosas, lo divides en tres archivos

La diferencia es que en presentaciones, si una slide es confusa, tu audiencia se pierde por 30 segundos. En código, si un archivo es confuso, tu proyecto se convierte en una pesadilla de meses.

**La Regla Boy Scout**: Deja el código más limpio de lo que lo encontraste. Cada vez que toques un archivo, mejora algo. Un nombre más claro. Una función extraída. Un comentario que explica el "por qué".

Con la IA, esto se vuelve crítico. Porque la IA va a tocar tus archivos. Mucho. Y si no están organizados, cada toque va a empeorar las cosas.

![Arquitectura de Capas](/powerideas/images/vibe-coding/frame-00-03-00.jpg)

## PHASE 2: LAS CAPAS DEL CLIENTE (FRONT-END)

### 5. Capa 1: Diseño

Empecemos por lo más básico: cómo se ve tu app.

El error número 1 que veo: estilos inline o "mágicos".

```typescript
// MAL
<div style={{ backgroundColor: "#3B82F6", padding: "12px" }}>
  <h1 style={{ color: "white", fontSize: "24px" }}>Hola</h1>
</div>
```

¿Por qué está mal?
- Si quieres cambiar el color primario, buscas y reemplazas en 200 sitios
- Si quieres modo oscuro, rewrite completo
- La IA no puede razonar sobre tu sistema de diseño

**La solución**: Design tokens y Tailwind a nivel global.

```typescript
// BIEN
<div className="bg-primary p-3">
  <h1 className="text-white text-2xl">Hola</h1>
</div>
```

Y en tu `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "#3B82F6",
      secondary: "#10B981"
    }
  }
}
```

Ahora, si quieres cambiar el color primario, cambias UNA línea. La IA puede razonar sobre "primary" como concepto. Puedes añadir modo oscuro tocando un solo archivo.

### 6. Capa 2: Rutas y Páginas

Las rutas son el esqueleto de tu app. Definen:
- Qué páginas existen
- Quién puede verlas
- Qué parámetros aceptan

En NextJS, la estructura de archivos define las rutas:
```
/app
  /page.tsx           → /
  /dashboard/page.tsx → /dashboard
  /user/[id]/page.tsx → /user/:id
```

**Públicas vs privadas**: Esta separación es crucial.
- `/login`, `/signup`, `/pricing` → públicas
- `/dashboard`, `/settings`, `/projects` → privadas

La forma más limpia de manejar esto en NextJS 13+ es con layout groups:
```
/app
  /(public)/login/page.tsx
  /(public)/signup/page.tsx
  /(private)/dashboard/page.tsx
  /(private)/settings/page.tsx
```

Cada grupo puede tener su propio `layout.tsx` que verifica autenticación.

**Parámetros URL**: Son tu estado global gratuito. Si tienes un filtro de búsqueda, usa la URL:
```
/dashboard?status=active&sort=date
```
No guardes eso en React state. Guardalo en la URL. Así el usuario puede compartir links, hacer bookmark, y usar el botón de back.

### 7. Capa 3: Layouts

El layout es la carcasa que rodea tus páginas: sidebar, header, footer.

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
```

El error común: repetir el layout en cada página.

```typescript
// MAL
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main>...</main>
    </div>
  );
}

// app/settings/page.tsx
export default function Settings() {
  return (
    <div className="flex h-screen">
      <Sidebar />  {/* Repetido */}
      <main>...</main>
    </div>
  );
}
```

**La solución**: Layouts anidados de NextJS.

```
/app
  /layout.tsx          → Root layout (header, etc.)
  /(private)/
    /layout.tsx        → Private layout (sidebar)
    /dashboard/page.tsx
    /settings/page.tsx
```

Ahora el sidebar se renderiza una vez, y las páginas se incrustan dentro. Si necesitas cambiar el sidebar, tocas un archivo.

### 8. Capa 4: Componentes

Los componentes son los bloques de construcción de tus páginas. La clave está en la abstracción.

**Nivel 1: Componentes específicos**
```typescript
<UserProfileCard user={user} />
```
Solo se usa en un sitio. Fácil de mantener, pero no reutilizable.

**Nivel 2: Componentes genéricos**
```typescript
<Card title="Perfil" image={avatar}>
  <UserInfo user={user} />
</Card>
```
Se puede reutilizar para productos, posts, etc.

**Nivel 3: Componentes de biblioteca**
```typescript
<Button variant="primary" size="lg">Guardar</Button>
```
shadcn/ui, Radix, MUI — no reinventes la rueda.

La jerarquía:
- Usa componentes de biblioteca (shadcn) para lo básico
- Crea componentes genéricos para patrones de tu app
- Usa componentes específicos cuando no hay otra opción

**Mi regla**: Si uso algo 3 veces, lo convierto en componente reutilizable. Antes de eso, copia-pega es aceptable. La abstracción prematura es la raíz de todo mal.

![Componentes Reutilizables](/powerideas/images/vibe-coding/frame-00-06-00.jpg)

### 9. Capa 5: Transformaciones

Los datos que vienen del servidor no están listos para mostrar. Necesitan transformación.

```typescript
// Del servidor
{
  createdAt: "2026-04-01T12:34:56.789Z",
  price: 9999,
  status: "active"
}

// Al usuario
{
  createdAt: "1 abril 2026",
  price: "99,99 €",
  status: "Activo"
}
```

**El error**: Hacer transformaciones inline en el componente.

```typescript
// MAL
<span>{new Date(user.createdAt).toLocaleDateString('es-ES')}</span>
<span>{(product.price / 100).toFixed(2)} €</span>
<span>{status === 'active' ? 'Activo' : 'Inactivo'}</span>
```

**La solución**: Funciones de transformación puras.

```typescript
// lib/transformers.ts
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(cents / 100);
}

export function translateStatus(status: string): string {
  const translations = {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente'
  };
  return translations[status] || status;
}
```

Beneficios:
- Testeable (funciones puras)
- Reutilizable
- La IA puede generarlas automáticamente
- Un cambio de formato toca un archivo

### 10. Capa 6: Hooks

Los hooks son el cerebro de cada página. Manejan:
- Estado local
- Llamadas a API
- Interactividad
- Side effects

```typescript
// hooks/useUserDashboard.ts
export function useUserDashboard(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const data = await api.user.getById(userId);
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  const updateUser = async (updates) => {
    const updated = await api.user.update(userId, updates);
    setUser(updated);
  };

  return { user, loading, error, updateUser };
}
```

Ahora tu componente es limpio:

```typescript
// components/UserDashboard.tsx
export function UserDashboard({ userId }) {
  const { user, loading, error, updateUser } = useUserDashboard(userId);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => updateUser({ name: "Nuevo" })}>
        Actualizar
      </button>
    </div>
  );
}
```

**Principio**: El componente solo sabe de UI. El hook sabe de datos y lógica. Mantenlos separados.

### 11. Capa 7: Estado Global

El estado global es como un coordinador de señales. Lo usas cuando múltiples componentes necesitan acceder a los mismos datos.

Ejemplos típicos:
- Usuario autenticado
- Filtros activos
- Notificaciones
- Carrito de compra

En React, tienes varias opciones:
- **Context API**: Built-in, simple, suficiente para 90% de casos
- **Zustand**: Lightweight, fácil de usar
- **Redux**: Overkill para proyectos pequeños

**Mi preferencia**: Zustand. Es simple y evita el prop drilling de Context.

```typescript
// stores/useAuthStore.ts
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));
```

Uso:
```typescript
const { user, logout } = useAuthStore();
```

**Regla de oro**: Empieza con estado local. Cuando necesitas compartir entre componentes, sube a hook. Cuando necesitas compartir entre páginas, sube a estado global. No empieces con estado global.

### 12. Capa 8: Formatters y Utilidades

Funciones puras, determinísticas, sin side effects.

```typescript
// lib/utils.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

Características:
- Input → Output predecible
- No dependen de estado externo
- Fácil de testear
- La IA las genera perfectamente

### 13. Capa 9: Constantes y Configuración

Aquí defines la ontología de tu app: enums, labels, umbrales, configuración.

```typescript
// lib/constants.ts
export const APP_NAME = "Anlak Studio";

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Gratis',
    price: 0,
    credits: 100,
    features: ['Básico', 'Soporte email']
  },
  PRO: {
    name: 'Pro',
    price: 29,
    credits: 1000,
    features: ['Todo lo de Gratis', 'API access', 'Soporte prioritario']
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: null, // Custom pricing
    credits: Infinity,
    features: ['Todo lo de Pro', 'Dedicated support', 'SLA']
  }
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
} as const;
```

Beneficios:
- Un solo sitio de verdad para valores
- Autocompletado del IDE
- Type safety con `as const`
- La IA puede referenciar estas constantes en lugar de hardcodear

![Estructura de Capas](/powerideas/images/vibe-coding/frame-00-09-00.jpg)

## PHASE 3: LAS CAPAS DEL SERVIDOR (BACK-END)

### 14. Capa 10: API Routes

Las API routes son la puerta de entrada externa a tu servidor.

Hay tres tipos principales:

**1. Crons (Tareas programadas)**
```typescript
// app/api/cron/daily-report/route.ts
export async function GET(request: Request) {
  // Verificar auth del cron service (Vercel Cron, etc.)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  await sendDailyReportEmail();
  return new Response('OK');
}
```

**2. Webhooks (Eventos externos)**
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
  }

  return new Response('OK');
}
```

**3. Endpoints públicos**
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

**Principio**: Las API routes NO contienen lógica de negocio. Validan, autentican, y delegan a servicios.

### 15. Capa 11: tRPC Router

Si usas T3 Stack, tRPC es tu mejor amigo. Te da type safety de extremo a extremo sin definir schemas manualmente.

```typescript
// server/api/routers/user.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id }
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      email: z.string().email().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      // NO pongas lógica de negocio aquí
      return UserService.update(input);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Validación de permisos
      if (ctx.user.id !== input.id && ctx.user.role !== 'ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return UserService.delete(input.id);
    })
});
```

**Lo que SÍ va aquí**:
- Validación de input con Zod
- Autenticación y autorización
- Delegación a servicios

**Lo que NO va aquí**:
- Lógica de negocio compleja
- Cálculos
- Transformaciones de datos

### 16. Capa 12: Servicios

Aquí es donde vive la magia. Los servicios contienen la lógica de negocio real.

```typescript
// server/services/UserService.ts
export const UserService = {
  async update(input: UpdateUserInput) {
    // Validaciones de negocio
    if (input.email) {
      const existing = await db.user.findUnique({
        where: { email: input.email }
      });
      if (existing && existing.id !== input.id) {
        throw new Error('Email ya está en uso');
      }
    }

    // Transformaciones
    const updateData = {
      ...input,
      updatedAt: new Date()
    };

    // Persistencia
    const user = await db.user.update({
      where: { id: input.id },
      data: updateData
    });

    // Side effects
    if (input.email) {
      await EmailService.sendEmailChangedNotification(user);
    }

    return user;
  },

  async delete(userId: string) {
    // Verificar dependencias
    const projects = await db.project.count({
      where: { ownerId: userId }
    });

    if (projects > 0) {
      throw new Error('No puedes eliminar un usuario con proyectos');
    }

    // Soft delete
    await db.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() }
    });

    // Cleanup
    await StorageService.deleteUserFiles(userId);
  }
};
```

**Por qué separar servicios**:
- Framework-agnostic: puedes cambiar de NextJS a Express sin reescribir
- Testeable: puedes probar la lógica sin montar el servidor
- Reutilizable: múltiples endpoints pueden usar el mismo servicio

### 17. Capa 13: Engines por Dominio

Los engines son especialistas. Cada uno maneja un dominio específico de lógica compleja.

```typescript
// server/engines/ChatbotEngine.ts
export const ChatbotEngine = {
  async processMessage(userId: string, message: string) {
    // 1. Obtener contexto del usuario
    const user = await UserService.getById(userId);
    const history = await ConversationService.getHistory(userId);

    // 2. Construir prompt con contexto
    const prompt = PromptBuilder.build({
      systemPrompt: SYSTEM_PROMPTS.chatbot,
      userContext: user,
      conversationHistory: history,
      currentMessage: message
    });

    // 3. Llamar a LLM
    const response = await LLMService.generate(prompt);

    // 4. Post-procesar respuesta
    const processedResponse = ResponseProcessor.format(response);

    // 5. Guardar en historial
    await ConversationService.addMessage(userId, message, processedResponse);

    return processedResponse;
  }
};
```

Ejemplos de engines:
- **ChatbotEngine**: Maneja conversaciones con IA
- **EvaluationEngine**: Evalúa calidad de respuestas
- **RecommendationEngine**: Genera recomendaciones personalizadas
- **SearchEngine**: Búsqueda semántica con embeddings

**Diferencia con servicios**: Los servicios son operaciones CRUD con lógica de negocio. Los engines son algoritmos complejos que orquestan múltiples servicios.

![Engines Especializados](/powerideas/images/vibe-coding/frame-00-12-00.jpg)

### 18. Capa 14: Pipelines y Schedulers

La orquestación de tareas complejas y la gestión de errores.

```typescript
// server/pipelines/OnboardingPipeline.ts
export const OnboardingPipeline = {
  async run(userId: string) {
    const steps = [
      { name: 'createWorkspace', fn: () => WorkspaceService.create(userId) },
      { name: 'sendWelcomeEmail', fn: () => EmailService.sendWelcome(userId) },
      { name: 'createSampleProject', fn: () => ProjectService.createSample(userId) },
      { name: 'scheduleFollowup', fn: () => Scheduler.schedule({
        task: 'followup-email',
        delay: 3 * 24 * 60 * 60 * 1000, // 3 días
        payload: { userId }
      })}
    ];

    const results = [];

    for (const step of steps) {
      try {
        const result = await step.fn();
        results.push({ step: step.name, status: 'success', result });
      } catch (error) {
        results.push({ step: step.name, status: 'error', error });
        // Decisión: ¿continuar o parar?
        if (CRITICAL_STEPS.includes(step.name)) {
          throw new PipelineError(`Critical step failed: ${step.name}`, error);
        }
      }
    }

    return results;
  }
};
```

**Schedulers**: Para tareas recurrentes o diferidas.
```typescript
// Usando Vercel Cron o similar
export const scheduler = {
  async schedule(task: string, delay: number, payload: any) {
    // Guardar en base de datos o encolar
    await db.scheduledTask.create({
      data: {
        task,
        payload,
        executeAt: new Date(Date.now() + delay)
      }
    });
  },

  async processPending() {
    const tasks = await db.scheduledTask.findMany({
      where: { executeAt: { lte: new Date() } }
    });

    for (const task of tasks) {
      await TaskRunner.run(task.task, task.payload);
      await db.scheduledTask.delete({ where: { id: task.id } });
    }
  }
};
```

### 19. Capa 15: ORM y Base de Datos

La capa de persistencia. Prisma en el ecosistema T3.

```typescript
// prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime?

  projects      Project[]
  subscriptions Subscription[]

  @@index([email])
  @@index([createdAt])
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([ownerId])
}
```

**Principios**:
- **Esquema tipado**: Prisma genera tipos automáticamente
- **Migraciones**: `prisma migrate dev` para cambios
- **NO lógica de negocio**: El schema define estructura, no comportamiento

**El error común**: Poner lógica de negocio en el cliente de Prisma.
```typescript
// MAL
const user = await db.user.update({
  where: { id },
  data: {
    credits: { decrement: 10 },  // Lógica de negocio
    lastCreditUse: new Date()     // en la consulta
  }
});

// BIEN
await UserService.useCredits(id, 10);  // Lógica encapsulada
```

![Base de Datos](/powerideas/images/vibe-coding/frame-00-15-00.jpg)

## PHASE 4: CAPAS TRANSVERSALES

### 20. Autenticación vs Autorización

Dos cosas distintas que la gente confunde.

**Autenticación**: ¿Quién eres?
- Login, logout
- Verificar identidad
- Session management

**Autorización**: ¿Qué puedes hacer?
- Permisos, roles
- Access control
- Resource ownership

```typescript
// Autenticación (Clerk, Auth.js, etc.)
const { userId } = auth();
if (!userId) throw new Error('No autenticado');

// Autorización
const user = await db.user.findUnique({ where: { id: userId } });
if (user.role !== 'ADMIN') throw new Error('No autorizado');
```

En T3 Stack, usas `protectedProcedure` de tRPC:
```typescript
const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user // Ahora TypeScript sabe que user existe
    }
  });
});
```

### 21. Caché

No repitas cálculos costosos.

**Niveles de caché**:
1. **Caché de función**: Memoización
2. **Caché de consulta**: Redis, Upstash
3. **Caché de CDN**: Vercel Edge, Cloudflare
4. **Caché de navegador**: HTTP headers

```typescript
// Caché de función (simple)
const cache = new Map();

async function getCachedUser(id: string) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user = await db.user.findUnique({ where: { id } });
  cache.set(id, user);
  
  // Expirar en 5 minutos
  setTimeout(() => cache.delete(id), 5 * 60 * 1000);
  
  return user;
}

// Caché con Redis (producción)
import { Redis } from '@upstash/redis';

const redis = new Redis({ url: process.env.UPSTASH_URL, token: process.env.UPSTASH_TOKEN });

async function getCachedUser(id: string) {
  const cached = await redis.get(`user:${id}`);
  if (cached) return cached;

  const user = await db.user.findUnique({ where: { id } });
  await redis.set(`user:${id}`, user, { ex: 300 }); // 5 min
  
  return user;
}
```

### 22. Observabilidad

Sin esto, estás volando a ciegas.

**Tres pilares**:
1. **Logs**: ¿Qué pasó? (Winston, Pino)
2. **Métricas**: ¿Cuántas veces? (Prometheus, Datadog)
3. **Traces**: ¿Dónde estuvo el tiempo? (Jaeger, Sentry)

**Sentry es el mínimo indispensable**:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% de requests
});

// En tu código
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

**Analytics**: Entiende quién usa qué.
- PostHog (open source, self-hostable)
- Mixpanel
- Google Analytics

Sin analytics, no sabes qué features importan. Sin error tracking, no sabes qué está roto.

### 23. La Jerarquía de Costos

Cuando optimices, recuerda esto:

**Storage > Computación > Tráfico**

El almacenamiento es lo más caro. La computación es media. El tráfico es barato.

Implicaciones:
- **Guarda menos, calcula más**: No guardes datos derivados que puedes calcular
- **Cachea lo costoso**: Si un cálculo tarda 5 segundos, guárdalo
- **Comprime respuestas**: El tráfico es barato, pero no lo desperdicies

```typescript
// MAL: Guardar todo
await db.analytics.create({
  data: {
    page: '/dashboard',
    timestamp: new Date(),
    userId,
    userAgent: request.headers['user-agent'],
    ip: request.ip,
    // ... 50 campos más
  }
});

// BIEN: Guardar lo mínimo, calcular el resto
await db.analytics.create({
  data: {
    page: '/dashboard',
    userId,
    timestamp: new Date()
  }
});

// Calcular derivados en tiempo de consulta
const uniqueVisitors = await db.analytics.groupBy({
  by: ['userId'],
  where: { page: '/dashboard' },
  _count: true
});
```

![Monitoreo y Observabilidad](/powerideas/images/vibe-coding/frame-00-18-00.jpg)

## PHASE 5: EL NUEVO ROL DEL HUMANO

### 24. Eres el Orquestador, No el Programador

Esta es la parte más importante de todo el artículo.

Con la IA escribiendo código, tu rol cambia. Ya no eres el que teclea. Eres el que **decide qué se teclea y dónde va**.

Piensa en un director de orquesta:
- No toca ningún instrumento
- Pero sabe cómo debe sonar cada uno
- Y sabe cuándo cada uno debe entrar

Tú eres el director. La IA es la orquesta.

**Lo que tú haces**:
- Defines la arquitectura (las 15 capas)
- Decides qué va en cada capa
- Revisas el código que genera la IA
- Refactorizas cuando algo huele mal

**Lo que la IA hace**:
- Escribe el código
- Implementa funciones
- Genera tests
- Encuentra bugs

> "Con la IA, el cuello de botella ya no es la escritura de código. El cuello de botella es la arquitectura."

### 25. dangerouslySkipPermissions y Guardarrailes

Claude Code tiene un modo llamado `dangerouslySkipPermissions` que permite a la IA ejecutar comandos sin pedir confirmación.

Es tentador. Pero es peligroso.

La clave es establecer **guardarrailes**:

1. **Solo en proyectos controlados**: No en producción, no en repos compartidos
2. **Con backups**: `git commit` frecuente, poder volver atrás
3. **Con límites**: La IA no puede hacer `rm -rf` o modificar archivos críticos
4. **Con revisión**: Después de cada sesión, revisa qué cambió

```bash
# Tu flujo de trabajo
git checkout -b feature/nueva-funcionalidad
claude-code --dangerously-skip-permissions
# ... IA trabaja ...
git diff  # Revisar cambios
git commit -m "feat: nueva funcionalidad"
git push
```

**Regla de oro**: La IA escribe, tú revisas. Siempre.

### 26. Velocidad sin Deuda Técnica

La promesa del "vibe coding" es velocidad. Pero velocidad sin estructura es deuda técnica a largo plazo.

**Deuda técnica real**: No es código feo. Es código que te hace más lento en el futuro.

Si la IA genera 1000 líneas en 30 segundos, pero esas líneas están mal organizadas:
- Mañana, añadir un feature tomará 2 horas en lugar de 30 minutos
- La semana que viene, encontrar un bug tomará 1 día en lugar de 1 hora
- El mes que viene, el proyecto será inmantenible

**La solución**: Refactorizar capa a capa.

```
1. Identificar la capa más sucia
2. Refactorizar SOLO esa capa
3. Deploy y verificar
4. Repetir
```

No intentes refactorizar todo de golpe. La IA puede ayudarte a refactorizar una capa a la vez. Pero tú tienes que decidir qué capa refactorizar.

### 27. Memoria en el Sistema Agéntico

Los agentes de IA tienen memoria. Pero es limitada.

**Context window**: 200K tokens para Claude (≈ 150K palabras). Parece mucho, pero:
- Un proyecto mediano tiene 50K-100K líneas de código
- Cada línea que la IA lee consume tokens
- Si le pasas todo el proyecto, no queda espacio para generar

**Soluciones**:
1. **RAG (Retrieval-Augmented Generation)**: Indexar tu código y buscar solo lo relevante
2. **Memoria estructurada**: Archivos como `ARCHITECTURE.md` que explican la estructura
3. **Contexto incremental**: Empezar con archivos clave, expandir según necesidad

```markdown
# ARCHITECTURE.md (para que la IA lo lea)

## Estructura de capas
1. Diseño: tokens en tailwind.config.js
2. Rutas: /app con (public) y (private) groups
3. Layouts: anidados en /(private)/layout.tsx
4. Componentes: /components/ui (shadcn) + /components/features
5. Hooks: /hooks con lógica de datos
6. Servicios: /server/services con lógica de negocio
7. Engines: /server/engines para algoritmos complejos

## Convenciones
- Nombres: camelCase para variables, PascalCase para componentes
- Imports: absolute paths (@/lib/...)
- Tests: junto al archivo (*.test.ts)
```

### 28. El Framework Práctico: Cómo Empezar

Si estás empezando un proyecto nuevo, aquí tienes el roadmap:

**Día 1: Estructura**
```bash
npx create-t3-app@latest mi-proyecto
# Selecciona: NextJS, tRPC, Prisma, Tailwind
```

Estructura de carpetas:
```
/app
  /(public)
  /(private)
  /api
/components
  /ui (shadcn)
  /features
/hooks
/lib
  /constants.ts
  /utils.ts
  /transformers.ts
/server
  /api/routers
  /services
  /engines
  /pipelines
/prisma
```

**Día 2: Capas base**
- Design tokens en `tailwind.config.js`
- Layout anidado
- Auth con Clerk o Auth.js

**Día 3: Primera feature**
- API route o tRPC router
- Servicio para la lógica
- Componentes para la UI
- Hook para el estado

**Día 4 en adelante**: Iterate.

![Iteración Constante](/powerideas/images/vibe-coding/frame-00-21-00.jpg)

## PHASE 6: LA LECCIÓN FINAL

### 29. La Arquitectura es Organización

Después de todo este recorrido por 15 capas, quiero que recuerdes una cosa:

**La arquitectura no es sobre tecnología. Es sobre organización.**

Cada capa que hemos visto es, en el fondo, una forma de organizar:
- Organizar datos (BD, ORM)
- Organizar lógica (Servicios, Engines)
- Organizar presentación (Componentes, Layouts)
- Organizar flujos (Pipelines, API Routes)

Si entiendes esto, puedes adaptar la arquitectura a cualquier stack. No importa si usas React, Vue, o Svelte. No importa si usas Node, Python, o Go. Los principios son los mismos:
- Separación de concerns
- Single responsibility
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

La IA no va a inventar estas capas por ti. La IA va a seguir el patrón que le digas. Si no le dices ningún patrón, va a generar código espagueti.

### 30. El Vibe Correcto

"Vibe coding" no significa "tirar código y ver qué pasa".

Significa: **codificar con flow, pero con estructura.**

Es la diferencia entre:
- Un jazzista que improvisa sin saber teoría (ruido)
- Un jazzista que improvisa conociendo los acordes (música)

La estructura no limita tu creatividad. La estructura **permite** tu creatividad.

Cuando sabes que cada cosa está en su sitio, puedes pensar en el problema real, no en "¿dónde carajos está esta función?".

> "La arquitectura buena es invisible. Solo notas su ausencia cuando el proyecto se convierte en una pesadilla."

### 31. El Futuro es Agéntico

En 2 años, todos vamos a programar así:
1. Defines la arquitectura
2. La IA genera el código
3. Tú revisas y refinas
4. Iterate

Los que aprendan arquitectura hoy tendrán una ventaja competitiva masiva. Porque la IA va a seguir mejorando en generar código. Pero la IA no va a mejorar en **decidir qué código generar y dónde ponerlo**.

Esa es tu responsabilidad. Y ahora tienes el framework para hacerlo.

---

*He construido Anlak Studio, Lobabell, y media docena de productos más con esta estructura. No porque sea ingeniero — soy psicólogo. Sino porque aprendí que la arquitectura es supervivencia cuando programas con IA. Si quieres ver más contenido así, sígueme en [Twitter](https://x.com/miguelsureda) o suscríbete al [newsletter de Anlak](https://anlak.es).*

*Y si quieres ver el video original donde explico todo esto, está [aquí](https://youtu.be/EZty_XXUkIs).*
