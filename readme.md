Escenario 1: Solicitud sin API Key (401)

Comando:

Invoke-WebRequest http://localhost:3000/health

Salida obtenida:

{
  "error": "API Key faltante o inválida"
}

Código HTTP:

401 Unauthorized



Escenario 2: Solicitud con API Key válida (200)

Comando:

Invoke-WebRequest -Uri http://localhost:3000/health -Headers @{"x-api-key"="12345"}

Salida obtenida:

{
  "code": 200,
  "status": "API SALUDABLE",
  "timestamp": "2026-06-11T21:00:57.089Z"
}

Código HTTP:

200 OK


Escenario 3: Ruta inexistente (404)

Comando:

Invoke-WebRequest -Uri http://localhost:3000/noexiste -Headers @{"x-api-key"="12345"}

Salida obtenida:

{
  "code": 404,
  "error": "Ruta no encontrada"
}

Código HTTP:

404 Not Found

## Testing

Para esta actividad se implementaron pruebas unitarias utilizando Jest y ts-jest con el objetivo de validar el correcto funcionamiento de los middlewares desarrollados en el proyecto, sin necesidad de ejecutar el servidor.

### Comando de ejecución

```bash
npm test
```

### Resultado obtenido

```bash
PASS src/middlewares/auth.test.ts
PASS src/middlewares/logger.test.ts

Test Suites: 2 passed, 2 total
Tests: 5 passed, 5 total
Snapshots: 0 total
Time: 0.343 s
Ran all test suites.
```

### Casos probados

#### Middleware requireApiKey

* Validación cuando el encabezado `x-api-key` no existe.
* Validación cuando la API key es incorrecta.
* Validación cuando la API key es válida y permite continuar la ejecución mediante `next()`.

#### Middleware requestLogger

* Verificación de que el middleware invoque correctamente la función `next()`.
* Verificación de que el middleware registre la información de la petición realizada.

### Observaciones

Las pruebas ejecutadas permitieron comprobar que los dos middlewares funcionan correctamente tanto para escenarios válidos como inválidos. Además, se verificó que la autenticación mediante API key y el registro de solicitudes cumplen con el comportamiento esperado.
