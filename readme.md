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
