export const usersSeed = [
  {
    email: "admin@example.com",
    password: "password1",
    role: "administrador",
  },
  {
    email: "operador@example.com",
    password: "password2",
    role: "operador",
  },
  {
    email: "operador3@example.com",
    password: "password3",
    role: "operador",
  },
  {
    email: "supervisor@example.com",
    password: "password3",
    role: "supervisor",
  },
  {
    email: "supervisor2@example.com",
    password: "password4",
    role: "supervisor",
  },
  {
    email: "tecnico@example.com",
    password: "password5",
    role: "tecnico",
  },
  {
    email: "tecnico2@example.com",
    password: "password6",
    role: "tecnico",
  },
  {
    email: "tecnico3@example.com",
    password: "password7",
    role: "tecnico",
  },
  {
    email: "tecnico4@example.com",
    password: "password8",
    role: "tecnico",
  },
  {
    email: "god@example.com",
    password: "password10",
    role: "god",
  },
];

export const rolesSeed = [
  { role: "administrador" },
  { role: "operador" },
  { role: "supervisor" },
  { role: "tecnico" },
];
//   ──────────────────────────────────────────────────────────────────────
//   operador
//  '688a2ebc5477828f40023a71'
//
//  tecnico
//  '688a2ebc5477828f40023a73'
// ──────────────────────────────────────────────────────────────────────

export const ticketsSeed = [
  {
    creatorId: "0083c77", // ID del usuario cliente
    creatorType: "client",
    subject: "Problema con la impresora de red",
    description:
      "La impresora en el departamento de contabilidad no responde, no se pueden imprimir documentos.",
    currentStatus: "Abierto",
  },
  {
    creatorId: "0023a71",
    creatorType: "client",
    subject: "Solicitud de software nuevo",
    description:
      "Necesito una licencia de software de diseño gráfico para mi departamento. Ya envié los requisitos.",
    currentStatus: "Abierto",
  },
  {
    creatorId: "0023a71", 
    creatorType: "client",
    subject: "Fallo en el servidor de base de datos",
    description:
      "El servicio de la base de datos principal está inactivo, afectando a múltiples aplicaciones.",
    currentStatus: "Cerrado", // Podría haber sido resuelto rápidamente
    closedReason: "Resuelto",
  },
  {
    creatorId: "c70e919",
    creatorType: "client",
    subject: "Corte de fibra optica",
    description: "El corte de fibra optica de la red principal se realizo en hora de la madrugada de hoy.",
    currentStatus: "Abierto",
  }
];


export const departmentsSeed = [
  { name: 'programacion' },
  { name: 'redes' },
  { name: 'soporte tecnico' },
  { name: 'atencion al cliente' },
  { name: 'administracion' },
  { name: 'cobranza' },
  { name: 'recursos humanos' },
  { name: 'gerencia' },
  { name: 'presidencia' },
  { name: 'mantenimiento' },
  { name: 'planta externa' }
];
