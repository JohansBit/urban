# UrbanStyle Web (React + Node)

Tienda en línea de ropa streetwear y zapatillas exclusivas, desarrollada para la
**Evaluación Parcial 2 — Desarrollo Fullstack II — Duoc UC**.

> Proyecto basado en el **Caso 4: "UrbanStyle" – Boutique de Moda Urbana y Calzado**.
> Es la migración del sitio HTML + CSS + JS de la Evaluación 1 a **React (Vite)**,
> con pruebas automatizadas y un sitio **responsivo** (PC, tablet y celular).

---

## 1. Descripción general

UrbanStyle Web tiene dos módulos:

- **Módulo Tienda** (público): catálogo por categoría, detalle de producto, carrito de
  compras, registro e inicio de sesión, blogs, nosotros y contacto.
- **Módulo Administrador** (privado): mantenedor de productos y de usuarios, protegido
  por rol.

La Evaluación 1 era 100% frontend (HTML, CSS y JS sin framework). En esta entrega las
vistas pasan a **componentes React**, la lógica de negocio se separa en módulos
reutilizables (`utils/`) y se agregan **tests**.

## 2. Alcance de la Entrega 2

**Incluye:**
- Migración de todas las vistas de la Evaluación 1 a componentes React.
- Diseño responsivo en PC, tablet y celular.
- Validaciones de formulario (RUN, correo, contraseña, dirección, producto).
- Carrito de compras (agregar, modificar cantidad, eliminar, total) con `localStorage`.
- Selección dependiente Región → Comuna.
- Control de acceso por rol (Administrador / Vendedor / Cliente).
- Tests con Vitest y Testing Library (ver sección 11).
- Integración con Node: *(a definir según la pauta de la evaluación)*.

**No incluye:**
- Pasarela de pago real (el flujo termina en el carrito).
- Despacho/logística de envíos ni cupones de descuento reales.

## 3. Sistema visual (paleta de colores y tipografía)

La identidad visual se construye sobre un **fondo negro elegante**, con dos acentos:
un **morado urbano** para la interacción general (botones secundarios, hover, bordes)
y un **dorado premium** reservado para precios y llamados a la acción de compra,
reforzando la idea de exclusividad frente al público de 18-35 años.

| Variable CSS | Uso | Hex |
|---|---|---|
| `--bg-primary` | Fondo principal (negro elegante) | `#121212` |
| `--bg-surface` | Fondo de tarjetas, modales y formularios | `#1E1E1E` |
| `--text-primary` | Texto principal (blanco suave) | `#F5F5F5` |
| `--text-secondary` | Texto secundario / subtítulos | `#808080` |
| `--accent-purple` | Morado urbano: botones secundarios, hover, bordes | `#8E24AA` |
| `--accent-gold` | Dorado premium: precios, ofertas, botones de acción | `#D4AF37` |
| `--accent-gold-hover` | Hover de elementos dorados | `#F1C40F` |
| `--color-error` | Mensajes de error en formularios | `#FF5252` |
| `--color-success` | Mensajes de éxito | `#4CAF50` |

```css
:root {
  /* Colores principales */
  --bg-primary: #121212;
  --bg-surface: #1E1E1E;
  --text-primary: #F5F5F5;
  --text-secondary: #808080;

  /* Colores de acento (UrbanStyle) */
  --accent-purple: #8E24AA;
  --accent-gold: #D4AF37;
  --accent-gold-hover: #F1C40F;

  /* Estados y alertas */
  --color-error: #FF5252;
  --color-success: #4CAF50;
}
```

**Dónde vive:** en `src/App.css`, que es el **CSS global** del proyecto. Ahí van la
paleta, la tipografía, el estilo base del `body`, las tarjetas compartidas y las
utilidades. Es de uso obligatorio en todos los componentes.

**Tipografía:** pendiente de confirmar por el equipo (una fuente de título y una de
texto, en Google Fonts, coherentes con negro + dorado + morado).

**Regla de uso:** el dorado se reserva **solo** para precios y botones de compra
("Añadir al carrito", "Pagar"). El morado se usa para el resto de la interacción
(links, hover de menú, bordes de foco).

## 4. Tecnologías

| Capa | Tecnología |
|---|---|
| Interfaz | React + Vite |
| Navegación entre vistas | `react-router-dom` *(por confirmar con el equipo)* |
| Estilos | **Bootstrap 5** (paquete npm) + **CSS propio** por componente + `App.css` global |
| Lógica | JavaScript ES6+ en módulos (`src/utils/`) |
| Persistencia | `localStorage` (carrito y sesión simulada) |
| Tests | Vitest + Testing Library |
| Backend | Node *(a definir según la pauta)* |
| Control de versiones | Git + GitHub |

**¿Por qué Bootstrap y CSS propio?** Cada integrante puede trabajar sus componentes
con uno u otro enfoque:

- **Componentes con Bootstrap:** usan las clases responsivas listas (`container`,
  `row`, `col-12 col-md-6 col-lg-3`, `d-flex`, `navbar-expand-lg`, etc.).
- **Componentes con CSS propio:** tienen su archivo `.css` junto al `.jsx` y definen
  sus propias media queries.
- **`App.css` global:** la paleta, la tipografía y lo que comparten todos los
  componentes.

**Orden de importación en `main.jsx`** (Bootstrap primero, para que nuestro CSS lo
sobrescriba):

```jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
```

## 5. Estructura del proyecto

```
urbanstyle/
├── public/                      Archivos estáticos
├── src/
│   ├── assets/                  Imágenes de productos, lookbook, etc.
│   ├── components/              Un .jsx por componente (+ su .css si usa CSS propio)
│   │   ├── Navbar.jsx           (Bootstrap)
│   │   ├── Footer.jsx / Footer.css
│   │   ├── ProductoCard.jsx / ProductoCard.css
│   │   └── ...
│   ├── pages/                   Una página por vista (Home, Productos, Carrito, ...)
│   ├── data/
│   │   ├── regiones.js          Arreglo de regiones y comunas
│   │   └── productos.js         Catálogo de muestra
│   ├── utils/
│   │   ├── validaciones.js      RUN, correo, contraseña, dirección, producto
│   │   └── carrito.js           Agregar, quitar, total, persistencia
│   ├── test/                    Archivos .spec.js / .spec.jsx
│   ├── App.jsx                  Compone las rutas y el layout general
│   ├── App.css                  CSS global (paleta, tipografía, tarjetas)
│   └── main.jsx                 Punto de entrada (importa Bootstrap y App.css)
├── index.html
├── package.json
└── README.md
```

La lógica (validaciones, carrito) va en `utils/` y **no dentro de los componentes**.
Así se puede testear sin renderizar nada y reutilizar entre vistas.

## 6. Reparto de módulos

| Módulo | Contenido | Responsable |
|---|---|---|
| **1. Home, identidad visual y Blog** | Home (lookbook, categorías destacadas, botones "Ver Ropa" / "Ver Calzado"), Nosotros, Blogs (listado + 2 detalles), `App.css`, Navbar y Footer, responsividad general | *(completar)* |
| **2. Catálogo, Carrito y Contacto** | Productos por categoría, detalle de producto, carrito (cantidades, total, `localStorage`), contacto | *(completar)* |
| **3. Cuentas y Administrador** | Registro (RUN, dirección, Región/Comuna), inicio de sesión, vista admin: home, mantenedor de productos y de usuarios | *(completar)* |

## 7. Roles del sistema

| Rol | Accesos |
|---|---|
| **Administrador** | Acceso total: gestión de productos y usuarios. |
| **Vendedor** | Ver listado y detalle de productos y de órdenes. |
| **Cliente** | Solo la tienda pública (catálogo, carrito, registro, contacto). |

> **⚠️ Por confirmar:** en la Evaluación 1, la regla de roles decía que el Vendedor
> solo puede *ver*, pero el requisito RF-09 decía que gestiona productos. Hay que
> decidir cuál vale antes de escribir los tests de permisos.

## 8. Requisitos funcionales

| ID | Requisito | Ruta sugerida |
|---|---|---|
| RF-01 | Visualizar página principal (Home) | `/` |
| RF-02 | Listar productos por categoría | `/productos` |
| RF-03 | Ver detalle de producto | `/productos/:id` |
| RF-04 | Gestionar carrito de compras | `/carrito` |
| RF-05 | Registrar nuevo usuario | `/registro` |
| RF-06 | Iniciar sesión | `/login` |
| RF-07 | Enviar mensaje de contacto | `/contacto` |
| RF-08 | Consultar Blogs | `/blogs`, `/blogs/:id` |
| RF-09 | Gestionar productos (Admin/Vendedor) | `/admin/productos` |
| RF-10 | Gestionar usuarios (Administrador) | `/admin/usuarios` |
| RF-11 | Control de acceso por rol | `/admin`, `/admin/*` |

## 9. Reglas de validación clave

Viven en `src/utils/validaciones.js` y son las mismas de la Evaluación 1:

- **Correo:** solo dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Contraseña:** requerida, entre 4 y 10 caracteres.
- **RUN:** requerido, sin puntos ni guion (ej. `190110222`), entre 7 y 9 caracteres,
  dígito verificador validado por módulo 11 (puede ser `K`).
- **Dirección de envío:** requerida, máx. 300 caracteres, con selección **dinámica y
  dependiente** de Región → Comuna.
- **Producto:** código (requerido, mín. 3), nombre (requerido, máx. 100), descripción
  (opcional, máx. 500), precio (requerido, mín. 0), stock (requerido, entero, mín. 0),
  stock crítico (opcional, entero, mín. 0), categoría (requerida).

## 10. Responsividad

El sitio debe verse bien en celular, tablet y PC. Breakpoints (los de Bootstrap):
576, 768 y 992 px.

- Bootstrap se importa en `main.jsx` antes que nuestros CSS.
- Evitar `!important` y anchos fijos grandes; usar `max-width`, `%` o clases de Bootstrap.
- Toda tabla va dentro de `.table-responsive` y toda imagen lleva `alt` y `max-width: 100%`.
- Antes de hacer push, revisar la vista en modo celular (360 px), tablet (768 px) y PC (1280 px) con las herramientas de desarrollo del navegador.

> Los tests automáticos no pueden comprobar cómo se ve el sitio, solo su código y su
> comportamiento. Por eso la revisión visual se hace a mano.

## 11. Tests

Se usa **Vitest + Testing Library** (entorno `jsdom`). Cada integrante escribe y explica
**2 tests**, los de su fila en la tabla. Si alguien prefiere cambiar uno, lo avisa en el
grupo antes de empezar.

### Los 6 tests del proyecto

| # | Módulo | Test | Archivo | Qué verifica | Si falla en la app real |
|---|---|---|---|---|---|
| 1 | Home e identidad | Menú móvil | `Navbar.spec.jsx` | El botón hamburguesa abre y cierra el menú (`aria-expanded` pasa de `false` a `true` y vuelve a `false`) | En celular nadie puede navegar |
| 2 | Home e identidad | Categorías del Home | `Home.spec.jsx` | Se muestran las 4 categorías y los botones "Ver Ropa" y "Ver Calzado" enlazan al catálogo | El usuario no llega a los productos |
| 3 | Catálogo y Carrito | Total del carrito | `carrito.spec.js` | Agregar el mismo producto suma la cantidad en una sola línea y el total (precio × cantidad) es correcto | Se cobra un monto equivocado |
| 4 | Catálogo y Carrito | Persistencia del carrito | `carrito.spec.js` | El carrito se guarda en `localStorage` y se recupera; si el dato guardado está dañado, devuelve un carrito vacío sin romper la app | El cliente pierde su compra al recargar, o la página se cae |
| 5 | Cuentas y Admin | RUN | `validaciones.spec.js` | Acepta RUN válidos (incluye dígito `K` y `0`) y rechaza dígito verificador incorrecto, puntos o guion, largo fuera de 7–9 y letras | Se registra gente con datos falsos o se rechaza a gente legítima |
| 6 | Cuentas y Admin | Región y comuna | `regiones.spec.js` | Cada región tiene al menos una comuna y, al elegir una región, solo se obtienen sus comunas | El usuario puede quedar con una comuna que no corresponde a su región |

**Funciones que deben existir** (nombres propuestos, para que los tests y el código
coincidan): `agregarProducto(carrito, producto)`, `calcularTotal(carrito)`,
`guardarCarrito(carrito)`, `cargarCarrito()`, `validarRun(run)` y `comunasDe(region)`.

**Tests de reserva**, si alguien quiere cambiar el suyo: correo y contraseña (dominios
permitidos y 4–10 caracteres), contacto (rechaza correo inválido y campos vacíos) y
permisos por rol (cuando se decida qué puede hacer el Vendedor, ver sección 7).

### Cómo escribir un test

Todos siguen tres pasos: **preparar**, **actuar** y **verificar**.

```js
import { test, expect } from 'vitest'
import { agregarProducto, calcularTotal } from '../utils/carrito'

test('agregar el mismo producto suma la cantidad y el total', () => {
  // 1. Preparar
  let carrito = []
  // 2. Actuar
  carrito = agregarProducto(carrito, { id: 1, precio: 15000 })
  carrito = agregarProducto(carrito, { id: 1, precio: 15000 })
  // 3. Verificar
  expect(carrito).toHaveLength(1)
  expect(carrito[0].cantidad).toBe(2)
  expect(calcularTotal(carrito)).toBe(30000)
})
```

Para explicar un test ante el profesor, bastan tres frases: **qué prueba**, **cómo lo
prueba** y **qué pasaría en la app si fallara** (la última columna de la tabla).

### Configuración

```sh
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

En `vite.config.js`:

```js
test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.js' }
```

En `src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

Se ejecutan con:

```sh
npm test
```

(agregar `"test": "vitest run"` en la sección `scripts` de `package.json`).

## 12. Cómo ejecutar

Requiere Node.js instalado.

```sh
git clone <url-del-repositorio>
cd urbanstyle
npm install
npm run dev
```

La terminal muestra la dirección local (normalmente `http://localhost:5173`). Los
cambios se reflejan automáticamente. Para crear el proyecto desde cero:

```sh
npm create vite@latest urbanstyle -- --template react
npm install bootstrap
```

## 13. Trabajo en equipo

- Cada integrante trabaja en su módulo (sección 6) y en su propia rama.
- Antes de hacer push: `npm test` y revisar la vista en modo celular.
- Formato de commits: `tipo: descripción corta`.

| Tipo | Uso | Ejemplo |
|---|---|---|
| `feat` | Funcionalidad nueva | `feat: agrega slider al Home` |
| `fix` | Corrección de un error | `fix: corrige tabla sin scroll en celular` |
| `style` | Cambios de CSS sin lógica | `style: ajusta tarjetas en tablet` |
| `test` | Tests nuevos o modificados | `test: agrega test del RUN` |
| `docs` | Documentación | `docs: actualiza el README` |

## 14. Checklist de la evaluación

- [ ] Vistas de la Evaluación 1 migradas a componentes React.
- [ ] Sitio responsivo en PC, tablet y celular.
- [ ] CSS global (`App.css`) con la paleta, más CSS propio y Bootstrap en componentes.
- [ ] Validaciones y carrito en `utils/`, fuera de los componentes.
- [ ] Al menos 2 tests por integrante, explicados.
- [ ] Integración con Node (según la pauta).
- [ ] Repositorio en GitHub con commits claros y tareas repartidas.

## 15. Equipo de trabajo

| Integrante |
|---|
| Diego Criado |
| Francisco Bustos |
| Johans Sepúlveda |

Docente: Gerardo Marchant

## 16. Roadmap (fuera del alcance de esta entrega)

- Base de datos real para productos, usuarios y órdenes.
- Integración con pasarela de pago (Webpay/Transbank).
- Seguimiento de pedidos y despacho.
- Cupones de descuento validados dinámicamente.
- Panel de reportes y estadísticas de venta.
