# 📌 Convención de Ramas y Commits en el Monorepo c24-71-ft-webapp 

## 💡 Estructura de Ramas  
El monorepo tiene una rama principal y luego cada carpeta tiene su propia rama, de la cual se desglosan las funcionalidades.  

```text
main ← (rama principal del monorepo)
│
├── frontend ← (rama base del frontend)
│          │
│          ├── fe/auth ← (rama: funcionalidad de autenticación)
│          ├── fe/dashboard ← (rama: funcionalidad del dashboard)
│          └── fe/ui-fixes ← (rama: mejoras en la UI)
│
├── backend ← (rama base del backend)
│          │
│          ├── be/auth ← (rama: módulo de autenticación)
│          ├── be/api-users ← (rama: endpoints de usuarios)
│          └── be/database ← (rama: gestión de base de datos)
│
├── qa ← (rama base para QA)
│         │
│         ├── qa/tests-api ← (rama: tests de API)
│         └── qa/tests-ui ← (rama: tests de interfaz)
│
└── ux-ui ← (rama base de UX/UI)
            │
            ├── ux/login-ui ← (rama: diseño de login)
            └── ux/dashboard-ui ← (rama: mejoras en el dashboard)
```

## 💡 Convención de Nombres de Ramas  
Cada rama debe seguir una estructura clara para evitar confusiones:  

### 📉 Formato:  

```
[prefijo]/[nombre-de-la-funcionalidad]
```

### 📉 Prefijos:  
- `fe/` → Frontend  
- `be/` → Backend  
- `qa/` → QA  
- `ux/` → UX/UI  

### 📉 Ejemplos de nombres correctos:  
✅ `be/auth` → Implementación de autenticación en backend  
✅ `fe/dashboard` → Desarrollo del dashboard en frontend  
✅ `qa/tests-api` → Pruebas de API  
✅ `ux/login-ui` → Diseño del login  

### 📉 Ejemplos de nombres incorrectos:  
❌ `feature-login` → No indica en qué parte del proyecto está  
❌ `backend-login-auth` → Demasiado largo y redundante  
❌ `qa` → No es específico  

---

## ✍️ Convención para los Commits  
Para mantener un historial claro y ordenado, seguimos el formato:  

### 📉 Formato de commits:  

```text
[tipo](módulo): Descripción corta del cambio
```

### 📉 Tipos de commits:  

| Tipo      | Descripción                                      |
|-----------|------------------------------------------------|
| feat      | Nueva funcionalidad                           |
| fix       | Corrección de errores                        |
| refactor  | Mejora del código sin cambiar funcionalidad  |
| docs      | Cambios en documentación                     |
| style     | Cambios en formato, espacios, puntos y comas |
| test      | Agregar o modificar tests                    |
| chore     | Cambios menores o mantenimiento              |

### 📉 Ejemplos de commits correctos:  
✅ `feat(auth): Add JWT authentication system`  
✅ `fix(api-users): Fix error in user data response`  
✅ `refactor(database): Enhance DB connection`  
✅ `docs(readme): Update installation guide`  

### 📉 Ejemplos de commits incorrectos:  
❌ `cambios` → No indica qué se hizo  
❌ `arreglé error en login` → No sigue el formato  
❌ `update file` → Demasiado genérico  

---

## 💡 Flujo de Trabajo con Ramas  
Ejemplo de cómo trabajar con las ramas:  

❶ **Cambiar a la rama base**  


```bash
git switch backend 
```
❷ **Crear una nueva rama desde la base**

```bash
git switch -c be/auth
```
❸ **Hacer cambios en el código y confirmar los commits**  

```bash
git status
git add [nombre-del-archivo]
git commit -m "feat(auth): Add JWT authentication system"  
```

❹ **Subir la rama al repositorio**

```bash
git push origin be/auth  
```

❺ **Crear un Pull Request (PR) desde `be/auth` hacia `backend`**