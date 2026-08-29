# StandUrl — Guía de Diseño y Sistema Visual

## 1. Identidad Visual y Filosofía

- **Filosofía**: Estética **minimalista, editorial, luminosa y de alto contraste** (inspirada en marcas de hardware y SaaS moderno como *Apple, Aesop, Linear y Notion*).
- **El objeto físico es la estrella**: Presentado con elegancia sobre fondos claros y cálidos, contrastando con el logotipo geométrico en negro ónix y acentos tostados/dorados.
- **Tono**: Profesional, premium, confiable y accesible para negocios locales de hostelería, estética y bienestar.

---

## 2. Paleta de Colores Oficial (Warm Cream & Minimalist Light)

```css
@theme {
  /* Fondo y Lienzo */
  --color-bg:                  #FBFBF9;   /* Blanco Marfil / Warm White (fondo general de plataforma) */
  --color-surface:             #FFFFFF;   /* Blanco Puro (Tarjetas, contenedores principales y modales) */
  
  /* Toques y Contrastes Cremosos */
  --color-surface-2:           #F3EFE6;   /* Crema Cálido Suave (Badges, pills, tablas, fondos de acento) */
  --color-cream:               #F3EFE6;   /* Crema Cálido de Marca */
  --color-cream-dim:           #E5DFD3;   /* Crema Secundario / Hover en elementos cremosos */
  
  /* Logotipo y Acciones Principales */
  --color-accent:              #18181B;   /* Negro Ónix (Logotipo principal, CTAs primarios y estados activos) */
  --color-accent-dim:          #27272A;   /* Negro Grafito para hover de botones */
  
  /* Acentos Cálidos Secundarios */
  --color-accent-amber:        #B45309;   /* Ámbar Cálido Tostado (Highlight de marca, métricas y badges secundarios) */
  --color-accent-amber-light:  #FDE68A;   /* Tinte Ámbar suave */
  
  /* Tipografía */
  --color-text:                #111827;   /* Negro Carbón (Títulos, textos principales y números) */
  --color-text-muted:          #78716C;   /* Gris Piedra Cálido (Subtítulos, descripciones y metadatos) */
  --color-text-subtle:         #A8A29E;   /* Gris Neutro Claro (Placeholders y notas menores) */
  
  /* Estados del Sistema */
  --color-success:             #16A34A;   /* Dispositivo Activo / Redirect OK */
  --color-error:               #DC2626;   /* Errores y Alertas */
  
  /* Bordes y Divisores */
  --color-border:              #E7E5E4;   /* Borde Neutro Cálido Delicado */
  --color-border-dark:         #D6D3D1;   /* Borde de Énfasis / Hover */
}
```

---

## 3. Logotipo y Variaciones de Marca

El isotipo es un monograma geométrico que entrelaza la **"S"** con una barra diagonal (**/**) a 45 grados representando la conexión URL y el enlace físico-digital.

### Assets disponibles en `apps/web/public/`:
- **Horizontal**:
  - `logo-horizontal-dark.svg` / `.png` (Símbolo negro `#18181B` + texto negro para fondos claros).
  - `logo-horizontal-white.svg` / `.png` (Símbolo blanco `#FFFFFF` + texto blanco para fondos oscuros).
  - `logo-horizontal-accent.svg` / `.png` (Símbolo ámbar tostado `#B45309`).
- **Isotipo / Símbolo**:
  - `logo-mark-dark.svg` / `.png`
  - `logo-mark-white.svg` / `.png`
  - `logo-mark-accent.svg` / `.png`
- **Iconos de App Móvil (iOS / Android / PWA)**:
  - `app-icon-dark.png` (Master 1024x1024, 512, 192): Squircle negro ónix con isotipo blanco.
  - `app-icon-cream.png` (Master 1024x1024, 512, 192): Squircle crema `#F3EFE6` con isotipo `#18181B` y borde marfil.
- **Favicons**:
  - `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.

### Uso con el componente React `<Logo />`:
```tsx
import Logo from '@/components/Logo'

// Ejemplos:
<Logo variant="horizontal" theme="dark" height={28} />
<Logo variant="mark" theme="dark" height={32} />
<Logo variant="app-icon-cream" height={40} />
```

---

## 4. Tipografía y Componentes UI

- **Headings**: `Geist` o `Inter` (`font-extrabold` o `font-bold`), color `#111827`, tracking ajustado (`tracking-tight`).
- **Body**: `Inter` (`font-normal` o `font-medium`), color `#78716C`.
- **Tokens / Códigos NFC**: `JetBrains Mono` o `font-mono`, color `#18181B` o `#B45309`, `tracking-widest`.
- **Botones Primarios**: Fondo `#18181B`, texto blanco, `rounded-xl`, hover `#27272A`, sombra sutil `shadow-sm` o `shadow-md`.
- **Botones Secundarios**: Fondo `#FFFFFF`, borde `#E7E5E4`, texto `#111827`, hover `#F3EFE6`.
- **Tarjetas (Cards)**: Fondo `#FFFFFF`, borde `#E7E5E4`, `rounded-2xl` o `rounded-3xl`, sombra suave `shadow-sm` o `shadow-md`.
- **Badges y Pills**: Fondo `#F3EFE6`, borde `#E5DFD3`, texto `#78716C` o `#B45309`, `rounded-full`.
- **Inputs**: Fondo `#FBFBF9`, borde `#E7E5E4`, texto `#111827`, focus `#18181B`.

---

## 5. Reglas para Agentes de Código y Diseño

1. **Paleta Unificada**: NUNCA usar fondos negros oscuros antiguos (`#0A0A0A`, `#111`, `#1A1A1A`) en nuevas interfaces o rediseños. La plataforma sigue la paleta **Warm Cream & Minimalist Light**.
2. **Logotipo Estándar**: Usar siempre el componente `<Logo />` o las rutas de imagen oficiales de `public/`.
3. **Alto Contraste y Legibilidad**: Garantizar que el texto sobre fondos `#FBFBF9`, `#FFFFFF` y `#F3EFE6` use `#111827` (primario) y `#78716C` (secundario).
4. **Tailwind CSS v4**: Utilizar las clases semánticas `@theme` (`bg-[var(--color-bg)]`, `text-[var(--color-text)]`, etc.) o los códigos de la paleta oficial.
5. **Mobile-First**: Toda interfaz (landing, panel de cliente, panel admin) debe estar optimizada y probada para pantallas táctiles y escritorio.
