# Que es la entidad en clean architecture?

> [idea]Resumen:
> Es el corazon **inmutable** del sistema.
> Su única responsabilidad es garantizar la validez y la consistencia de los datos siguiendo las reglas del negocio, sin importarle cómo o dónde se guarden o se muestren esos datos.

## Definición Precisa

La **entidad** [(pertenece a la capa dominio - la central)]
Es un **objeto de negocio** que **encapsula las reglas más generales y críticas**.

## DESGLOSE?

- **Entidad:** Es un Objeto de Dominio cuya identidad es fundamental y persistente a través del tiempo y los cambios.

- **Objeto de Negocio:** Representa los datos y el comportamiento de un concepto central y significativo para el negocio.

- **Encapsula Reglas** La Entidad contiene la lógica de negocio más crítica y transversal, también conocida como Reglas de Dominio.
  Estas reglas son independientes de la base de datos, la interfaz de usuario, o cualquier tecnología externa.

## -Ejemplo (Product):

- Es la definición de un producto.

- Contiene reglas como:
  - "El precio de un producto nunca puede ser negativo".
  - "El stock no debe bajar de cero", o "El código SKU debe tener un formato específico".

---

```javascript
// src/domain/entities/Product.js

/**
 * @class Product
 * @description Entidad de dominio que representa un Producto.
 * Contiene las reglas de negocio de alto nivel (ej: validación de datos).
 */
class Product {
  constructor(name, description, price, id = null) {
    // Regla de Negocio 1: El nombre es obligatorio
    if (!name || typeof name !== "string") {
      throw new Error(
        "El nombre del producto es obligatorio y debe ser una cadena de texto.",
      );
    }
    // Regla de Negocio 2: El precio debe ser un número positivo
    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio del producto debe ser un número positivo.");
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  // Método de negocio de ejemplo
  updatePrice(newPrice) {
    if (typeof newPrice !== "number" || newPrice <= 0) {
      throw new Error("El nuevo precio debe ser un número positivo.");
    }
    this.price = newPrice;
  }

  // Método para exponer el objeto sin exponer la clase interna
  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }
}

export default Product;
```

## interfaza de repositorio.

Este archivo es la definición del Contrato de Persistencia para la entidad Product.

**Propósito:** Define qué operaciones de persistencia son necesarias para la lógica del negocio.

## casos de uscasos de uso.

un caso de uso es la **logica** de la aplicacion **que orquesta** las acciones necesarias para lograr un objetivo específico de negocio .
esta capa **se encuentra en el Dominio (Capa de Aplicación)**


---


# inversion de dependencias ( DIP ).


La **Inversión de Dependencias** (Dependency Inversion Principle o **DIP**) es, en esencia, una forma de **romper el acoplamiento directo y rígido** entre los módulos de tu código, haciendo que las partes más importantes del sistema (la lógica de negocio) no dependan de los detalles menos importantes (la tecnología).

## 🏗️ La Esencia del Principio

El DIP se articula en torno a dos reglas clave:

1.  **Módulos de alto nivel no deben depender de módulos de bajo nivel.** Ambos deben depender de **abstracciones**.
2.  **Las abstracciones (interfaces) no deben depender de los detalles (implementaciones).** Los detalles deben depender de las abstracciones.

### 💡 Analogía: El Enchufe y el Aparato

Piensa en cómo conectas un electrodoméstico:

- **Sin DIP (Acoplamiento rígido):** Un televisor viejo venía con el cable pegado directamente a sus circuitos internos, sin enchufe. Si el tomacorriente cambia, o si quieres usar el televisor en otro país, ¡tienes que **modificar el televisor**! El televisor (módulo de alto nivel) depende del tipo específico de toma de corriente (módulo de bajo nivel).
- **Con DIP (Inversión):** El televisor (módulo de alto nivel) tiene una **interfaz** (el enchufe hembra). La toma de corriente de la pared (módulo de bajo nivel) también cumple con esa **interfaz** (el enchufe macho). **Ambos dependen de la abstracción del enchufe estándar.** El televisor no necesita saber si la electricidad viene de una planta nuclear o de un panel solar.

### En el Software (El Repositorio)

En el desarrollo de software, esto se traduce en:

1.  **Módulo de Alto Nivel (Caso de Uso):** La lógica de negocio que dice "Guarda este producto."
2.  **Módulo de Bajo Nivel (Mongoose, MySQL):** El código que realmente interactúa con la base de datos.
3.  **Abstracción (Interfaz de Repositorio):** El contrato (`ProductRepository.js`) que define solo los métodos (`save`, `findById`).

Al aplicar DIP, tu **Caso de Uso** interactúa solo con la **Interfaz (el contrato)**, lo que hace que la dependencia se haya "invertido": ahora la **Infraestructura (Mongoose)** depende de la **Interfaz** para saber qué métodos debe implementar.

Esto resulta en un código más **flexible**, **testeable** y con un **acoplamiento bajo**.
