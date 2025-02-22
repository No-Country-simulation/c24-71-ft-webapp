# Estructura del Proyecto y Convenciones de Código (Backend)

Este documento define la estructura del proyecto y las convenciones de código para mantener un desarrollo limpio, organizado y fácil de mantener.

## 📁 Estructura del Proyecto

El proyecto sigue una organización basada en capas para garantizar una separación clara de responsabilidades:

```
Backend/ 
├─ README.md                     # Documentación general del proyecto
├─ Dockerfile                    # Configuración para deploy en Docker
├─ LICENSE                        # Licencia del proyecto
├─ pom.xml                        # Archivo de configuración de Maven
└─ src/
   ├─ main/
   │   ├─ java/c24_71_ft_webapp/nexcognifix
   │   │   ├─ controller/
   │   │   │   └─ ProfessionalController
   │   │   ├─ domain/
   │   │   │   └─ Professional/
   │   │   │       ├─ Professional             # Entidad / Modelo
   │   │   │       ├─ ProfessionalService      # Servicio
   │   │   │       ├─ ProfessionalRepository   # Repositorio
   │   │   │       └─ dto/                     # Transferencia de datos
   │   │   │           └─ ProfessionalDTO
   │   │   ├─ infrastructure/
   │   │   │   ├─ security/                    # Seguridad
   │   │   │   ├─ config/                      # Configuración general
   │   │   │   └─ errors/                      # Manejo de errores
   │   │   └─ NexcognifixApplication
   │   └─ resources/
   │       ├─ application.properties           # Configuración de la app
   │       └─ db/
   │           └─ migration/
   │               └─ V1__create_professional_table
   └─ test/
       └─ java/c24_71_ft_webapp/nexcognifix/
           ├─ controller/                      # Pruebas de controladores
           ├─ domain/                          # Pruebas de repositorios
           └─ config/                          # Configuraciones de prueba


```

### 🔹 Descripción de carpetas principales:

- **controller/**: Contiene los controladores de la API que manejan las solicitudes HTTP.
- **domain/**: Incluye la lógica de negocio, modelos de datos y DTOs organizados por funcionalidad.
- **infrastructure/**: Define la configuración, servicios de seguridad, manejo de errores y servicios auxiliares.
- **resources/**: Archivos de configuración y migraciones de base de datos.
- **test/**: Pruebas unitarias y de integración.

---

## 📌 Convenciones de Código

Para mantener un código limpio y homogéneo, se deben seguir las siguientes convenciones:

### 1️⃣ Nomenclatura

- **Clases y archivos**: `PascalCase` (ProfessionalService, GameController).
- **Métodos y variables**: `camelCase` (getProfessionalById(), gameService).
- **Constantes**: `UPPER_CASE_SNAKE_CASE` (MAX_ATTEMPTS, DEFAULT_TIME).
- **DTOs**: Agregar `DTO` al final (ProfessionalDTO, GameDTO).

### 2️⃣ Estructura de Código

- Cada clase debe estar en el paquete correspondiente según su responsabilidad.
- Separar lógica de negocio en servicios (`Service`) y mantener controladores ligeros.
- `DTOs` deben utilizarse para transferir datos entre capas y evitar exposición de entidades.
- Métodos deben ser cortos y con una única responsabilidad.

### 3️⃣ Idiomas

- Nombres de variables, métodos y clases siempre en **inglés**.