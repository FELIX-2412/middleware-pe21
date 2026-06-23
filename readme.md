## Escenario 1: Solicitud sin API Key (401)

### Comando

```powershell
Invoke-WebRequest http://localhost:3000/health
```

### Salida obtenida

```json
{
  "error": "API Key faltante o inválida"
}
```

### Código HTTP

```text
401 Unauthorized
```

---

## Escenario 2: Solicitud con API Key válida (200)

### Comando

```powershell
Invoke-WebRequest -Uri http://localhost:3000/health -Headers @{"x-api-key"="12345"}
```

### Salida obtenida

```json
{
  "code": 200,
  "status": "API SALUDABLE",
  "timestamp": "2026-06-11T21:00:57.089Z"
}
```

### Código HTTP

```text
200 OK
```

---

## Escenario 3: Ruta inexistente (404)

### Comando

```powershell
Invoke-WebRequest -Uri http://localhost:3000/noexiste -Headers @{"x-api-key"="12345"}
```

### Salida obtenida

```json
{
  "code": 404,
  "error": "Ruta no encontrada"
}
```

### Código HTTP

```text
404 Not Found
```

---

# Testing

Para esta actividad se implementaron pruebas unitarias utilizando Jest y ts-jest con el objetivo de validar el correcto funcionamiento de los middlewares desarrollados en el proyecto, sin necesidad de ejecutar el servidor.

## Comando de ejecución

```bash
npm test
```

## Resultado obtenido

```bash
PASS src/middlewares/auth.test.ts
PASS src/middlewares/logger.test.ts

Test Suites: 2 passed, 2 total
Tests: 5 passed, 5 total
Snapshots: 0 total
Time: 0.343 s
Ran all test suites.
```

## Casos probados

### Middleware requireApiKey

* Validación cuando el encabezado `x-api-key` no existe.
* Validación cuando la API key es incorrecta.
* Validación cuando la API key es válida y permite continuar la ejecución mediante `next()`.

### Middleware requestLogger

* Verificación de que el middleware invoque correctamente la función `next()`.
* Verificación de que el middleware registre la información de la petición realizada.

## Observaciones

Las pruebas ejecutadas permitieron comprobar que los dos middlewares funcionan correctamente tanto para escenarios válidos como inválidos. Además, se verificó que la autenticación mediante API key y el registro de solicitudes cumplen con el comportamiento esperado.

---

# Documentación OpenAPI 3.1

Como parte de esta práctica se implementó un contrato OpenAPI 3.1 para documentar los endpoints desarrollados en la API. Esto permite describir de manera clara las rutas disponibles, los datos requeridos, las respuestas esperadas y los posibles errores que pueden generarse durante el uso del sistema.

## Validación del contrato OpenAPI

Para verificar que la documentación cumple con la especificación OpenAPI se utilizó Redocly CLI.

### Comando ejecutado

```bash
npx @redocly/cli lint openapi.yaml
```

### Resultado obtenido

```text
Woohoo! Your API description is valid.
```

La validación fue exitosa, demostrando que la estructura del archivo `openapi.yaml` es correcta y puede ser utilizada para documentar la API.

## Verificación de TypeScript

También se verificó que el proyecto continúe compilando correctamente después de agregar la documentación OpenAPI.

### Comando ejecutado

```bash
npx tsc --noEmit
```

### Resultado obtenido

No se presentaron errores de compilación.

---

## Evidencias de los endpoints documentados

## LAS EVIDENCIAS SE LAS PUEDE VERIFICAR EN LA CARPETA DE DOCS, DONDE SE ENCUENTRAN
## CADA UNA DE LAS CAPTURAS QUE FUERON VALIDADAS Y ECHAS EN LA PRACTICA, CUMPLIENDO CON EL 
## OBJETIVO INDICADO DENTRO DEL DEBER

### Evidencia 1: Inscripción exitosa en V1

Se realizó una solicitud al endpoint `/v1/inscripciones` enviando los campos requeridos. El servidor respondió correctamente con un código HTTP 201, confirmando que la inscripción fue registrada exitosamente.


### Evidencia 2: Inscripción exitosa en V2

Se realizó una solicitud al endpoint `/v2/inscripciones` incluyendo el campo `payment_method`. El servidor respondió con un código HTTP 201 y devolvió la información registrada.

### Evidencia 3: Solicitud sin payment_method

Se realizó una solicitud al endpoint `/v2/inscripciones` omitiendo el campo `payment_method`. Como resultado, el sistema respondió con un código HTTP 400 indicando que faltan campos obligatorios.

### Evidencia 4: payment_method inválido

Se realizó una solicitud enviando un valor no permitido para `payment_method`. El sistema respondió con un código HTTP 400 indicando que el método de pago no cumple con los valores aceptados.

---

## Endpoint documentado

### POST /v2/inscripciones

Este endpoint permite registrar una inscripción académica enviando la información del estudiante, las materias seleccionadas, el período académico y el método de pago.

### Ejemplo de solicitud

```json
{
  "estudianteId": "550e8400-e29b-41d4-a716-446655440000",
  "materias": ["LTI_05A_458"],
  "periodoId": "2026-1",
  "payment_method": "scholarship"
}
```

### Ejemplo de respuesta exitosa

```json
{
  "version": "v2",
  "estudianteId": "550e8400-e29b-41d4-a716-446655440000",
  "materias": [
    "LTI_05A_458"
  ],
  "periodoId": "2026-1",
  "payment_method": "scholarship"
}
```

---

## Análisis de versionado

### Cambio compatible (Backward Compatible)

Un cambio compatible sería agregar un nuevo campo opcional llamado `correoInstitucional` dentro de la respuesta de la API. Este cambio permitiría ampliar la información entregada sin afectar a las aplicaciones que ya utilizan la versión actual.

### Cambio incompatible (Breaking Change)

Un cambio incompatible sería eliminar el campo `periodoId` o cambiar el nombre del campo `payment_method`. Esto provocaría errores en los clientes que consumen la API porque esperan recibir y enviar esos campos utilizando la estructura actual.

---

## Observaciones finales

La implementación de OpenAPI permitió documentar de forma clara y organizada el funcionamiento de la API. Además, las pruebas realizadas mediante Postman, Redocly, TypeScript y Jest permitieron comprobar que los endpoints funcionan correctamente y que la documentación generada coincide con el comportamiento real del sistema.

## REFLEXION DEL DEBER DE DOCUMENTACION OpenAPI  REFINADO
Si otro equipo comenzara a consumir esta API, sería importante mantener una documentación clara y actualizada para facilitar su integración donde el  uso de OpenAPI permite que los desarrolladores comprendan rápidamente los endpoints disponibles, los parámetros requeridos y las respuestas esperadas
Además la implementación del versionado mediante las rutas /v1 y /v2 permite incorporar nuevas funcionalidades sin afectar a los clientes que utilizan versiones anteriores en si esto ayuda a mantener la compatibilidad del sistema y facilita la evolución de la API de forma ordenada y segura
