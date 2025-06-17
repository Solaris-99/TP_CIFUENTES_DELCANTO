# Pasos backoffice
![logo pasos](/src/assets/images/logo-removebg-preview.png)
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