
# Proyecto de Registro Académico

## Descripción

Esta es una aplicación web desarrollada con Node.js y Express siguiendo el patrón MVC (Modelo-Vista-Controlador).  
Su objetivo es gestionar el registro de estudiantes y las materias en las que están inscritos, utilizando una base de datos MySQL.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- EJS (plantillas)
- MySQL (base de datos)
- Bootstrap (diseño responsivo y estilos)
- dotenv (variables de entorno)
- nodemon (desarrollo)

---

## Instalación y configuración

1. Clona o descarga el repositorio.
2. Instala las dependencias ejecutando:
   ```
   npm install
   ```
3. Asegúrate de tener MySQL corriendo localmente y crea la base de datos `PreSeleccion`.
4. Configura las variables de entorno en un archivo `.env`, por ejemplo:
   ```
   PORT=3000
   ```
5. Inicia la base de datos.
6. Ejecuta la aplicación en modo desarrollo:
   ```
   npm run dev
   ```
7. Abre el navegador y visita:
   ```
   http://localhost:3000
   ```

---

## Estructura del proyecto

```
/src
  /Controllers   # Lógica para manejo de rutas y acciones
  /Routes        # Definición de rutas y vinculación con controladores
  /Views         # Vistas EJS para renderización del frontend
/index.js        # Archivo principal que configura y levanta el servidor
/pool.js         # Configuración del pool de conexiones MySQL
```

---

## Base de datos

- Motor: MySQL
- Base de datos: `PreSeleccion`
- Tabla principal: `estudiantes`

### Campos tabla estudiantes:

| Campo    | Tipo      | Descripción                       |
|----------|-----------|---------------------------------|
| id       | INT (PK)  | Identificador único              |
| nombre   | VARCHAR   | Nombre del estudiante            |
| apellido | VARCHAR   | Apellido del estudiante          |
| cedula   | INT       | Número de cédula (único)         |
| correo   | VARCHAR   | Correo electrónico (único)       |
| materia  | VARCHAR   | Materia principal inscrita       |
| materia2 | VARCHAR   | Segunda materia (opcional)       |

---

## Funcionalidades

- Registro de estudiantes con validaciones.
- Manejo de errores por duplicados (correo o cédula).
- Edición y eliminación de estudiantes.
- Listado general y agrupado por materias con conteo de inscritos.
- Páginas de error personalizadas para 404 y errores inesperados.
- Interfaz amigable con Bootstrap para formularios, tablas y alertas.

---

## Rutas principales

| Ruta                  | Método | Descripción                              |
|-----------------------|--------|------------------------------------------|
| `/`                   | GET    | Formulario de registro y vista principal |
| `/`                   | POST   | Guardar estudiante nuevo                  |
| `/Administrador`      | GET    | Listado, búsqueda, edición y eliminación |
| `/estudiante/:id`     | GET    | Mostrar formulario para editar estudiante |
| `/estudiante/:id`     | POST   | Guardar cambios en estudiante             |
| `/eliminar/:id`       | POST   | Eliminar estudiante                        |

---

## Puntos importantes

- Validación básica implementada; se recomienda ampliar seguridad y validaciones.
- Pool de MySQL con `multipleStatements: true` para ejecutar múltiples consultas si es necesario.
- Organización modular del código para facilitar mantenimiento y escalabilidad.
- No incluye autenticación ni autorización, se recomienda implementarlas para producción.
- Uso de variables de entorno para configuraciones sensibles.

---

## Comandos útiles

- Iniciar la app:
  ```
  npm start
  ```
- Iniciar la app en modo desarrollo (con nodemon):
  ```
  npm run dev
  ```

---

## Autor

Delta

---

## Licencia

MIT

---

Si tienes dudas o sugerencias, no dudes en contactarme.
