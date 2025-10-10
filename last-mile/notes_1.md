> [!STATUS]: TERMINADO
> - [x] conexión a contenedor de mongo.
> - [x] configuración básica del servidor.
> - [x] middleware para manejo de errores globales.
> - [x] registro de admin. *(**DB**)*.
> - [x] crear token de autenticacion *(**SERVER**)*.
> - [x] inicio de sesion de usuario admin desde apk *(**APK**)*.
> - [x] guardar token. *(**DB**)*
> - [x] schema instalaciones.
> - [x] schema usuarios.
> - [x] schema admin.
> - [x] schema token.
> - [x] ruta login.
> - [x] seed de usuario admin y activador.
> - [x] enviar token.
> - [x] validar usuario.



> [!ESTATUS]: PENDIENTE
> - [ ] registro de usuarios. *(**DB/ADMINISTRADOR**)*.
> - [ ] registro de clientes. _(DB/CLIENTES ULTIMA MILLA)_.
> - [ ] validar token de autenticacion *(**SERVER**)*.
> - [ ] registro de usuario desde apk *(**APK**)*.
> - [ ] interfaz de usuario admin desde apk **APK**.
> - [ ] interfaz de usuario final (instaladores) desde *(**APK**)*.
> - [ ] interfaz web de usuario admin y final *(**WEB**)*.
> - [ ] ruta logout.
> - [ ] ruta instalaciones.


---

> [!NOTAS IMPORTANTES]: (MONGOOSE).
> ** usa el metodo `findOne()` cuando necesites verificar usuarios en la base de datos. 
> El metodo `findOne()` devuelve **null** mientras que el metodo `find()` devuelve `[]`.
> Esto significa que al hacer una validacion `if(user)` el `[]` sera verdadero. Es el comportamiento por defecto de un `[]` de js en el contexto booleano.

> [!DIFERENCIA CLAVE ENTRE `find()` y `findOne()`]: (MONGOOSE).
> ** `find()` retorna un arreglo `[]` con o sin coincidencias.
> ** `findOne()` retorna un objeto o si no hay coincidencias retorna `null`.


> [!NOTAS IMPORTANTES]: MONGOOSE:eliminar-todo
> no se usa new para `deleteMany`.
> *ejemplo:* `const delToken = await TokenModel.deleteMany({ client: user._id })`


---

# ATOMICS

> [!ESTATUS]: PENDIENTE
> - [ ] almacenar token.
> - [ ] 
