# Security Microservice

## Descripción

Este proyecto es un microservicio de seguridad desarrollado con Spring Boot. Proporciona funcionalidades como autenticación, autorización, manejo de roles y permisos, y más.

## Características principales

- **Autenticación y autorización**: Uso de JWT para la autenticación.
- **Gestión de usuarios y roles**: CRUD para usuarios, roles y permisos.
- **Encriptación**: Hashing de contraseñas con SHA-256.
- **Notificaciones**: Envío de correos electrónicos para 2FA, restablecimiento de contraseñas y notificaciones de pago.

## Requisitos previos

- **Java 17** o superior.
- **Maven** (opcional si usas el wrapper incluido `mvnw`).
- **MongoDB** como base de datos.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ms_security.git
   cd ms_security
   ```
2. Configura las credenciales de MongoDB en `src/main/resources/application.properties`.
3. Compila y ejecuta el proyecto:
   ```bash
   ./mvnw spring-boot:run
   ```

## Uso

El microservicio expone varios endpoints REST para manejar usuarios, roles, permisos, y más. Consulta el archivo `API.md` para más detalles.

## Estructura del proyecto

- **`src/main/java`**: Código fuente principal.
  - **Controllers**: Manejan las solicitudes HTTP.
  - **Services**: Contienen la lógica de negocio.
  - **Repositories**: Interactúan con la base de datos.
  - **Models**: Representan las entidades del sistema.
- **`src/main/resources`**: Archivos de configuración.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
