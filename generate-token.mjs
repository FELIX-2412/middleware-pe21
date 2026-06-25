import crypto from "crypto";

const secret = process.env.JWT_SECRET ?? "secreto-demo";

function base64url(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

const header = base64url({
  alg: "HS256",
  typ: "JWT",
});

const payload = base64url({
  sub: "20251042",
  iss: "https://auth.uide.edu.ec",
  aud: "https://api.uide.edu.ec/inscripciones",
  scope: "inscripciones:write",
  exp: Math.floor(Date.now() / 1000) + 3600,
  jti: crypto.randomUUID(),
});

const sig = crypto
  .createHmac("sha256", secret)
  .update(`${header}.${payload}`)
  .digest("base64url");

console.log(`${header}.${payload}.${sig}`);