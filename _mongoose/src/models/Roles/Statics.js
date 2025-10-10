//  ══ ATOMICOS ════════════════════════════════════════════════════════
// comportamientos 

function _findOne(scope, criteria) {
  return {
    async findOneByName() {
      return await scope.findOne(criteria);
    },
  };
}

// Componente para create
function _create(scope, values) {
  return {
    async createOne() {
      const saved = await scope.create({ ...values });
      return saved;
    },
  };
}

function hasRole(scope, criteria) {
  return {
    ..._findOne(scope, criteria),
  }
}
//  ══ BASE - GENERICOS ════════════════════════════════════════════════

function rolBase(values) {
  const { name, description, module, action } = values;
  return {
    name,
    description,
    module,
    action,
  };
}


// ══ FUNCIÓN DE COMPOSICIÓN ════════════════════════════════════════
function componer(base, ...comportamientos) {
  // Cada comportamiento recibe la base y retorna un objeto con métodos
  return Object.assign({}, base, ...comportamientos.map((c) => c(base)));
}

// ══ ENSAMBLADORES / FÁBRICAS ESPECÍFICAS ═════════════════════════
export const _registerRol = (scope, values) =>
  componer(
    rolBase({
      name: values.name,
      description: values.description,
      module: values.module,
      action: values.action,
    }),
    () => _findOne(scope, { name: values.name }),
    () => _create(scope, values),
  );

// -------------------------------------------------
//legacy

function registerOne(scope, values) {
  return {
    ..._findOne(scope, { name: values.name }),
    ..._create(scope, values),
  };
}

export function registerRol(scope, values) {
  return {
    ...registerOne(scope, values),
  };
}
