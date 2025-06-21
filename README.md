# Pasos backoffice
![logo pasos](/src/assets/images/pasos_full.png)  
Pasos Backoffice es un proyecto académico para la escuela DaVinci de una aplicación web para el manejo de registros de pacientes y terapeutas. 

## Información del grupo
- Materia: Plataformas de desarrollo
- Comisión: ACN4AV
- Integrantes:
  - Emanuel Mauricio Cifuentes
  - Cristian Daniel Del Canto

## Acuerdos DoD y DoR

- ### DoR (Definition of Ready):
  - Diseñar el wireframe.
  - Refinar y asignar la tarea.
- ### DoD (Definition of Done):
  - Completar la implementación de la tarea.
  - Realizar pruebas unitarias y de integración.
  - Revisar el código (code review).
  - Mergear desde ramas feat/, fix/, refactor siguiendo conventional commits.
  - Una vez mergeado a main, se cierra la tarea.


## Información del proyecto
Tecnologías usadas:
 - Typescript
 - Vite
 - React
 - MUI
 - Axios
 - Zod
 - BiomeJS
 - Husky

### Funcionalidad del proyecto
Las principales funciones incluyen:
  - **Login**: Todas las pantallas están protegidas por un login.
  - **Pacientes**: Permite registrar y manejar información pertinente a los pacientes, como sus programas y terapeutas asignados
  - **Terapuetas**: Permite crear y asignar terapeutas a un paciente (funcionalidad del coordinador).

### Compilación y ejecución
Se requiere al menos node 20.
Para clonar el repositorio e instalar las dependencias, introducir en el terminal:
```
git clone https://github.com/Solaris-99/TP_CIFUENTES_DELCANTO.git
cd TP_CIFUENTES_DELCANTO
npm i
```
Para ejecutar en modo desarrollo, ingresar en el terminal:
```
npm run dev
```
Para buildear, ingresar en el terminal:
```
npm run build
```

### Arquitectura del proyecto
#### Principios de Clean Code Aplicados:

1. **Separación de Preocupaciones (Separation of Concerns):** Cada módulo o archivo tiene una única responsabilidad.
2. **Alta Cohesión, Bajo Acoplamiento:** Los elementos relacionados están agrupados, y la dependencia entre módulos es mínima.
3. **Modularidad:** Código dividido en módulos pequeños y manejables.
4. **Principio de Responsabilidad Única (SRP):** Cada archivo tiene una única razón para cambiar.
5. **Reusabilidad:** Componentes y lógica que pueden ser utilizados en diferentes partes de la aplicación.
6. **Legibilidad:** Estructura que facilita encontrar y entender el código.

#### Ejemplo de estructura

~~~
src/ 
├── api/ # Lógica de interacciones con APIs externas
│ └── patients.ts 
│ └── ... 
├── assets/ # Archivos estáticos 
│ ├── images/ 
│ ├── icons/ 
│ └── fonts/ 
├── components/ # Componentes UI reutilizables y atómicos (dumb components) 
│ ├── Button.tsx 
│ ├── Input.tsx 
│ └── ... 
├── constants/ # Valores inmutables y constantes globales 
│ ├── appConstants.ts 
│ └── errorMessages.ts 
├── hooks/ # Custom Hooks
│ ├── useAuth.ts 
│ └── ... 
├── layouts/ # Componentes de layout de alto nivel (Header, Sidebar, Footer) 
│ ├── AppLayout.tsx 
│ ├── AuthLayout.tsx 
│ └── ... 
├── lib/ # Utilidades de terceros o configuraciones de librerías 
│ ├── axios.ts # Instancia de Axios configurada 
│ ├── zod.ts # Configuración global de Zod
│ └── ... 
├── models/ # Definiciones de interfaces/tipos globales (si son transversales a varias features) 
│ ├── User.ts
│ ├── Product.ts
│ └── ... 
├── pages/ # Rutas principales de la aplicación (container components) 
│ ├── Auth/ 
│ │ ├── LoginPage.tsx 
│ │ └── RegisterPage.tsx 
│ ├── Dashboard/ 
│ │ ├── DashboardPage.tsx 
│ │ └── DashboardWidgets.tsx 
│ └── ... 
├── features/ # <-- Componentes separados por feature
│ ├── Auth/ 
│ │ ├── components/ 
│ │ │ ├── LoginForm/ 
│ │ │ │ └── LoginForm.tsx 
│ │ │ └── RegisterForm/ 
│ │ │ └── ... 
│ │ ├── hooks/ 
│ │ │ └── useLogin.ts 
│ │ ├── services/ 
│ │ │ └── authService.ts 
│ │ ├── schemas/ # <-- Zod Schemas para formularios de esta feature 
│ │ │ ├── loginSchema.ts 
│ │ │ └── registerSchema.ts 
│ │ ├── types/ # Tipos específicos de la feature (si no son globales) 
│ │ │ └── authTypes.ts 
│ │ └── index.ts (exporta componentes y hooks principales de la feature) 
│ ├── Products/ 
│ │ ├── components/  
│ │ │ ├── ProductForm.tsx # Componente de formulario React Hook Form 
│ │ │ └── ProductCard.tsx
│ │ │ └── ... 
│ │ ├── hooks/ 
│ │ │ └── useProductDetails.ts 
│ │ ├── services/ 
│ │ │ └── productService.ts 
│ │ ├── schemas/ # <-- Zod Schemas para formularios de esta feature 
│ │ │ ├── productSchema.ts 
│ │ │ └── productFilterSchema.ts 
│ │ ├── types/ 
│ │ │ └── productTypes.ts 
│ │ └── index.ts 
│ └── UserProfile/ 
│ └── ... 
├── utils/ # Funciones de utilidad pequeñas y genéricas (helpers) 
│ ├── formatters.ts 
│ ├── validators.ts (para validaciones genéricas, no de esquemas) 
│ └── ... 
├── main.tsx # Punto de entrada de la aplicación (ReactDOM.render) 
├── vite-env.d.ts # Archivos de declaración de tipos de Vite 
└── setupTests.ts # Configuración de pruebas
~~~