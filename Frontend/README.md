# 🧠 NexCognifive - Frontend
![Portada](../Frontend/public/screenshots/cover.png)

<img alt="Frontend" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="CSS" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" />
<img alt="Render" src="https://img.shields.io/badge/-Render-4C87C5?style=flat-square&logo=render&logoColor=white" />
<img alt="Figma" src="https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
<img alt="Git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" />


## 📋 Índice
- [📝 Descripción](#-descripción)
- [✨ Características](#-características)
- [💻 Tecnologías](#-tecnologías)
- [🔧 Requisitos](#-requisitos)
- [📥 Instalación](#-instalación)
- [🚀 Guía de Uso](#-guía-de-uso)
  - [✅ Acceso a la Plataforma](#-acceso-a-la-plataforma)
  - [✅ Enviar Juegos a Pacientes](#-enviar-juegos-a-pacientes)
  - [✅ Ejecución del Juego por el Paciente](#-ejecución-del-juego-por-el-paciente)
  - [✅ Seguimiento y Estadísticas](#-seguimiento-y-estadísticas)
- [🔀 Rutas y Navegación](#-rutas-y-navegación)
- [🧑‍💻 Equipo de Desarrollo](#-equipo-de-desarrollo)

## 📝 Descripción

El frontend de **NexCognifive** es una aplicación web desarrollada con React y Tailwind CSS, diseñada para que los profesionales de la salud gestionen a sus pacientes y les asignen sesiones de juego para la estimulación cognitiva.

La plataforma facilita la asignación de juegos interactivos, el seguimiento del desempeño de los pacientes y la visualización de estadísticas detalladas. Además, incluye un **modo daltónico** que ajusta la paleta de colores para mejorar la experiencia de los pacientes con deficiencias en la percepción del color.

La aplicación está diseñada para integrarse con el backend de NexCognifive, utilizando una API REST segura con autenticación mediante JWT.


## ✨ Características

- Autenticación segura con JWT por parte del profesional.
- Gestión de pacientes: permite registrar, visualizar y administrar la información de los pacientes.
- Asignación de sesiones de juego enviados automáticamente al paciente por correo electrónico.
Modo de accesibilidad para daltónicos, optimizando la experiencia visual.
- Visualización de estadísticas detalladas sobre el desempeño de los pacientes en cada sesión.
- Notificaciones por correo, informando sobre los resultados de los pacientes.
- Integración con el backend, permitiendo una comunicación eficiente mediante una API REST.


## 💻 Tecnologías

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Un framework CSS basado en utilidades para el desarrollo rápido de interfaces.
- **Vite**: Una herramienta de construcción rápida y un servidor de desarrollo.
- **Axios**: Un cliente HTTP basado en promesas para hacer solicitudes al backend.
- **React Router DOM**: Un sistema de enrutamiento para manejar la navegación dentro de la aplicación de una sola página (SPA).
- **Heroicons**: Un conjunto de íconos diseñados para ser usados con Tailwind CSS.
- **React Hook Form**: Una librería para gestionar formularios de manera eficiente en React.
- **Recharts**: Una biblioteca de gráficos basada en React para visualizar datos de manera interactiva.
- **React Toastify**: Una librería para mostrar notificaciones en la interfaz de usuario de manera sencilla.

## 🔧  Requisitos
- Node.js (se recomienda la última versión LTS)
- NPM (Node Package Manager)

## 📥 Instalación

1. **Clona el repositorio**:
    ```bash
    git clone git@github.com:No-Country-simulation/c24-71-ft-webapp.git
    ```

2. **Accede al directorio del proyecto**:
    ```bash
    cd c24-71-ft-webapp
    ```

3. **Accede al directorio del Frontend**:
    ```bash
    cd Frontend
    ```

4. **Instalar las dependencias:**

   ```bash
   npm install
   ```

5. **Configura las variables de entorno:**

   Crea un archivo `.env.local` en la carpeta Frontend y agrega la siguiente variable con la URL de la API:

   ```dotenv
   VITE_API_URL=http://localhost:8080/api
   ```

6. **Ejecuta el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Esto iniciará el servidor en `http://localhost:5173` (por defecto).

## 🚀 Guía de Uso

### ✅ Acceso a la Plataforma
1. Inicia sesión con una cuenta de profesional.  
2. Dirígete a la sección de **Pacientes** para visualizar el listado.  
3. Registra nuevos pacientes y gestiona su información. 

### 📸 Inicio de sesión:

<img src="../Frontend/public/screenshots/login.png" alt="Login" width="600">

### ✅ Enviar Juegos a Pacientes
1. Accede a la sección de **Juegos**.  
2. Selecciona el juego que deseas asignar a un paciente.  
3. Haz clic en **Asignar juego**, busca el paciente y configura la sesión:  
   - **Número de fichas mostradas en pantalla**.  
   - **Número de intentos estimado**.  
   - **Tiempo estimado para completar la sesión**.
4. Confirma la asignación. El paciente recibirá un correo con un enlace único para acceder a su partida.  

### 📸 Gestión de juegos:

<img src="../Frontend/public/screenshots/games.png" alt="Sección de administración y gestión de juegos" width="600">

### ✅ Ejecución del Juego por el Paciente
1. Al recibir el correo, el paciente podrá ver las instrucciones.  
2. Al hacer clic en el enlace, será redirigido a la sesión de juego asignada por el profesional.  
3. El paciente podrá **iniciar** o **cancelar** la sesión de juego:  
   - **Si cancela**, podrá enviar una observación sobre la cancelación.  
   - **Si inicia**, accederá al juego asignado por el profesional.  
     - **Juego asignado: Emparejamiento de fichas**  
       - Las fichas se revelarán durante **5 segundos** y luego se ocultarán.  
       - El paciente deberá emparejar todas las fichas.  
       - No hay límite de intentos ni tiempo.  

4. El paciente tiene acceso a un **modo para daltónicos**. Si lo requiere, puede pulsar el botón **Modo Daltonismo**, y los colores de la aplicación se ajustarán automáticamente para mejorar la accesibilidad.  

5. Al completar el juego, se enviarán automáticamente los resultados con:  
   - **Tiempo total empleado**.  
   - **Número de intentos realizados**.  

6. El profesional recibirá un correo con los datos de la sesión finalizada o una notificación si fue cancelada.  

### 📸 Menú de sesión de juego:

**Modo Normal** 

<img src="../Frontend/public/screenshots/session_menu.png" alt="Menú de la sección de juego" width="600">

**Modo Daltonismo**  

<img src="../Frontend/public/screenshots/session_menu_colorblind.png" alt="Menú de la sección de juego con modo daltonismo" width="600">

### 📸 Ejecución del juego:

**Modo Normal** 

<img src="../Frontend/public/screenshots/session_play.png" alt="Ejecución de la sesión de juego" width="600">

**Modo Daltonismo**  

<img src="../Frontend/public/screenshots/session_play_colorblind.png" alt="Ejecución de la sesión de juego con modo daltonismo" width="600">

### 📸 Resultados del juego:

**Modo Normal** 

<img src="../Frontend/public/screenshots/session_results.png" alt="Resultado de la sesión de jueg" width="600">

**Modo Daltonismo**  

<img src="../Frontend/public/screenshots/session_results_colorblind.png" alt="Resultado de la sesión de juego con modo daltonismo" width="600">
    

### ✅ Seguimiento y Estadísticas
1. El profesional puede visualizar en su **Dashboard**:  
   - Las últimas **10 sesiones de juego** asignadas.  
   - **Intentos, tiempo y fichas utilizadas** en cada sesión de juego.  
   - **Estadísticas globales** de los pacientes.  

### 📸 Dashboard:
<img src="../Frontend/public/screenshots/dashboard.png" alt="Dashboard del profesional con estadísticas y accesos rápidos" width="600">

## 🔀 Rutas y Navegación

La aplicación utiliza `React Router` para gestionar la navegación y la estructura de rutas. A continuación, se detallan las principales rutas:

### 🔓 Rutas Públicas
Estas rutas son accesibles sin autenticación:

- `/auth/login`: Página de inicio de sesión.
- `/game-sessions/patient/join/:sessionId`: Página para unirse a una sesión de juego.

### 🔒 Rutas Privadas
Estas rutas requieren autenticación para ser accedidas:

- `/dashboard`: Página principal del Dashboard.
- `/dashboard/patients`: Gestión de pacientes.
- `/dashboard/games`: Gestión de sesiones de juego.

### ⚠️ Página 404
- Cualquier ruta no definida redirigirá a una página de **"No Encontrado"** (`404`).

### 📌 Configuración de Rutas
Las rutas están organizadas en el componente `AppRouter`, que define los diferentes `Layouts` y protege las rutas privadas mediante `PrivateRoute` y `PublicRoute`.

```tsx
<Route path="auth/*" element={<PublicRoute />}>
  <Route element={<LayoutAuth />}>
    <Route path="login" element={<Login />} />
    <Route index element={<Navigate to="login" />} />
  </Route>
</Route>
```


## 🧑‍💻 Equipo de Desarrollo

<div align="center">

| **Christian Aránguiz** | **Jissy Merlano** | **Romina Gonzalez** |**William Medina** |
| :-------- |  :-------- |  :-------- |  :-------- |
| <img src="https://avatars.githubusercontent.com/u/35212431" width="120"> | <img src="https://avatars.githubusercontent.com/u/94768676?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/119947932?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/108200621?v=4" width="120"> | 
| [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/christian-aranguiz-a2b05a198/)|[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ing-jissy-merlano/)| [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rominagonzalezdesigner/)|[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/william-medinaa/)|
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NikoDemo96)|[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jissykakin)| [![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/orwen97)| [![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/william-medina)|

</div>