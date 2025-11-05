# Guía Paso a Paso: Clean Architecture con ExpressJS y MongooseJS

Esta guía te llevará a través de la implementación de la Clean Architecture (Arquitectura Limpia) de Robert C. Martin (Uncle Bob) utilizando Node.js, ExpressJS como framework web y MongooseJS para la persistencia de datos.

El objetivo principal de esta arquitectura es la **Separación de Intereses** y la **Independencia de Frameworks**, haciendo que las reglas de negocio sean el centro de la aplicación y no dependan de la base de datos o la interfaz de usuario.

## 1. Estructura del Proyecto

Adoptaremos una estructura de carpetas que refleje las capas de la Clean Architecture:

```
.
├── src/
│   ├── domain/             # Capa 1: Entidades y Reglas de Negocio (El núcleo)
│   │   ├── entities/       # Entidades de Dominio (Ej: Product.js)
│   │   └── repositories/   # Interfaces de Repositorio (Contratos)
│   ├── application/        # Capa 2: Casos de Uso (Lógica de la aplicación)
│   │   └── use_cases/      # Clases que orquestan el flujo de datos (Ej: CreateProduct.js)
│   ├── infrastructure/     # Capa 3 & 4: Adaptadores y Frameworks
│   │   ├── controllers/    # Adaptadores de entrada (Manejan peticiones HTTP)
│   │   ├── repositories/   # Implementaciones de Repositorio (Ej: MongooseProductRepository.js)
│   │   ├── models/         # Modelos de Mongoose (Estructuras de la base de datos)
│   │   └── web/            # Configuración de Express (Servidor, Rutas)
│   └── index.js            # Punto de entrada de la aplicación
└── package.json
```

## 2. Capa de Dominio (Entities)

Esta es la capa más interna y el corazón de la aplicación. Contiene las **Entidades** (objetos de negocio) y las **Interfaces de Repositorio** (contratos de persistencia).

**Regla clave:** Nada en esta capa debe saber sobre la base de datos, el framework web o cualquier detalle externo.

### 2.1. Entidad de Dominio (`src/domain/entities/Product.js`)

Representa el objeto de negocio con sus reglas internas.

```javascript
// src/domain/entities/Product.js

/**
 * @class Product
 * @description Entidad de dominio que representa un Producto.
 * Las entidades contienen las reglas de negocio más generales y de alto nivel.
 * Son independientes de la base de datos, frameworks o UI.
 */
class Product {
    // ... (Código ya escrito en el archivo)
}

module.exports = Product;
```

### 2.2. Interfaz de Repositorio (`src/domain/repositories/ProductRepository.js`)

Define el contrato que la capa de Casos de Uso utilizará para interactuar con la persistencia.

```javascript
// src/domain/repositories/ProductRepository.js

/**
 * @interface ProductRepository
 * @description Interfaz (contrato) que define las operaciones de persistencia
 * que la capa de Casos de Uso necesita.
 * Esta interfaz es implementada por la capa de Frameworks & Drivers (Mongoose).
 */
class ProductRepository {
    // ... (Código ya escrito en el archivo)
}

module.exports = ProductRepository;
```

## 3. Capa de Aplicación (Use Cases)

Contiene la lógica específica de la aplicación. Los **Casos de Uso** orquestan el flujo de datos hacia y desde las Entidades, y utilizan las Interfaces de Repositorio para la persistencia.

**Regla clave:** Los Casos de Uso dependen de las Entidades y de las Interfaces de Repositorio, pero no de sus implementaciones.

### 3.1. Caso de Uso: Crear Producto (`src/application/use_cases/CreateProduct.js`)

```javascript
// src/application/use_cases/CreateProduct.js

const Product = require('../../domain/entities/Product');

/**
 * @class CreateProduct
 * @description Caso de Uso para crear un nuevo producto.
 * Orquesta la creación de la Entidad y su persistencia a través del Repositorio.
 */
class CreateProduct {
    /**
     * @param {ProductRepository} productRepository - La implementación del repositorio.
     */
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Ejecuta el caso de uso.
     * @param {object} productData - Datos del producto a crear.
     * @param {string} productData.name
     * @param {string} productData.description
     * @param {number} productData.price
     * @returns {Promise<Product>} El producto creado.
     */
    async execute(productData) {
        // 1. Aplicar reglas de negocio de la Entidad (la Entidad se valida a sí misma)
        const newProduct = new Product(
            productData.name,
            productData.description,
            productData.price
        );

        // 2. Persistir la Entidad a través del Repositorio (Inyección de Dependencia)
        const savedProduct = await this.productRepository.save(newProduct);

        return savedProduct;
    }
}

module.exports = CreateProduct;
```

### 3.2. Caso de Uso: Obtener Productos (`src/application/use_cases/GetProducts.js`)

```javascript
// src/application/use_cases/GetProducts.js

/**
 * @class GetProducts
 * @description Caso de Uso para obtener todos los productos.
 */
class GetProducts {
    /**
     * @param {ProductRepository} productRepository - La implementación del repositorio.
     */
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Ejecuta el caso de uso.
     * @returns {Promise<Product[]>} Lista de productos.
     */
    async execute() {
        // 1. Obtener los datos a través del Repositorio
        const products = await this.productRepository.findAll();

        // 2. Se podría aplicar lógica de negocio adicional aquí (filtrado, ordenamiento, etc.)

        return products;
    }
}

module.exports = GetProducts;
```

## 4. Capa de Infraestructura (Interface Adapters & Frameworks)

Esta capa contiene los adaptadores que convierten los datos del formato más externo (HTTP, Base de Datos) al formato interno (Entidades) y viceversa.

### 4.1. Adaptador de Persistencia (Mongoose Model)

Define la estructura de la colección en MongoDB.

```javascript
// src/infrastructure/models/ProductModel.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
```

### 4.2. Implementación del Repositorio (`src/infrastructure/repositories/MongooseProductRepository.js`)

Implementa la Interfaz de Repositorio definida en la capa de Dominio, utilizando Mongoose.

**Regla clave:** Esta clase es la única que sabe sobre Mongoose y cómo mapear los objetos de Mongoose a las Entidades de Dominio.

```javascript
// src/infrastructure/repositories/MongooseProductRepository.js

const ProductRepository = require('../../domain/repositories/ProductRepository');
const Product = require('../../domain/entities/Product');
const ProductModel = require('../models/ProductModel');

/**
 * @class MongooseProductRepository
 * @extends ProductRepository
 * @description Implementación concreta del repositorio de productos usando Mongoose.
 */
class MongooseProductRepository extends ProductRepository {

    // Helper para mapear un documento de Mongoose a una Entidad de Dominio
    _toDomain(mongooseDoc) {
        if (!mongooseDoc) return null;
        return new Product(
            mongooseDoc.name,
            mongooseDoc.description,
            mongooseDoc.price,
            mongooseDoc._id.toString() // Mapeamos _id de Mongoose a id de la Entidad
        );
    }

    // Helper para mapear una Entidad de Dominio a un objeto para Mongoose
    _toPersistence(productEntity) {
        return {
            name: productEntity.name,
            description: productEntity.description,
            price: productEntity.price
            // No incluimos el ID aquí, Mongoose lo maneja
        };
    }

    async save(productEntity) {
        if (productEntity.id) {
            // Actualizar
            const persistenceData = this._toPersistence(productEntity);
            const updatedDoc = await ProductModel.findByIdAndUpdate(
                productEntity.id,
                persistenceData,
                { new: true }
            );
            return this._toDomain(updatedDoc);
        } else {
            // Crear
            const newDoc = await ProductModel.create(this._toPersistence(productEntity));
            return this._toDomain(newDoc);
        }
    }

    async findById(id) {
        const doc = await ProductModel.findById(id);
        return this._toDomain(doc);
    }

    async findAll() {
        const docs = await ProductModel.find({});
        return docs.map(doc => this._toDomain(doc));
    }

    async delete(id) {
        await ProductModel.findByIdAndDelete(id);
    }
}

module.exports = MongooseProductRepository;
```

### 4.3. Adaptador de Entrada (Controller)

Maneja la entrada de la web (peticiones HTTP) y llama al Caso de Uso apropiado.

**Regla clave:** El Controller solo se encarga de recibir la petición, validar los datos de entrada (formato), llamar al Caso de Uso y formatear la respuesta HTTP.

```javascript
// src/infrastructure/controllers/ProductController.js

/**
 * @class ProductController
 * @description Adaptador de entrada para peticiones HTTP relacionadas con productos.
 */
class ProductController {
    /**
     * @param {CreateProduct} createProductUseCase
     * @param {GetProducts} getProductsUseCase
     */
    constructor(createProductUseCase, getProductsUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.getProductsUseCase = getProductsUseCase;

        // Bindeamos 'this' para que Express pueda llamar a los métodos
        this.createProduct = this.createProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }

    /**
     * POST /products
     */
    async createProduct(req, res) {
        try {
            const { name, description, price } = req.body;

            // 1. Llamar al Caso de Uso
            const product = await this.createProductUseCase.execute({ name, description, price });

            // 2. Formatear la respuesta
            res.status(201).json(product.toObject());

        } catch (error) {
            // Manejo de errores (ej: validación de la Entidad)
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * GET /products
     */
    async getProducts(req, res) {
        try {
            // 1. Llamar al Caso de Uso
            const products = await this.getProductsUseCase.execute();

            // 2. Formatear la respuesta
            // Mapeamos las Entidades a objetos simples para la respuesta JSON
            const productsResponse = products.map(p => p.toObject());
            res.status(200).json(productsResponse);

        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

module.exports = ProductController;
```

### 4.4. Configuración del Framework Web (Express)

Configuración de rutas y el servidor.

```javascript
// src/infrastructure/web/routes.js

const express = require('express');

/**
 * @param {ProductController} productController
 */
module.exports = (productController) => {
    const router = express.Router();

    router.post('/products', productController.createProduct);
    router.get('/products', productController.getProducts);

    return router;
};
```

## 5. Orquestación (El Punto de Entrada)

El punto de entrada es donde se realiza la **Inyección de Dependencias** y se conecta todo.

```javascript
// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./infrastructure/web/routes');

// Capa de Dominio (Interfaces y Entidades)
const Product = require('./domain/entities/Product');
const ProductRepository = require('./domain/repositories/ProductRepository'); // Solo la interfaz

// Capa de Aplicación (Casos de Uso)
const CreateProduct = require('./application/use_cases/CreateProduct');
const GetProducts = require('./application/use_cases/GetProducts');

// Capa de Infraestructura (Implementaciones)
const MongooseProductRepository = require('./infrastructure/repositories/MongooseProductRepository');
const ProductController = require('./infrastructure/controllers/ProductController');

// --- Configuración ---
const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/clean_arch_db'; // Cambiar por tu URI

// Middleware
app.use(express.json());

// 1. Inicializar la Base de Datos
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa.'))
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1);
    });

// 2. Inyección de Dependencias (El corazón de la Clean Architecture)

// Implementación del Repositorio
const productRepository = new MongooseProductRepository();

// Casos de Uso (dependen de la Interfaz del Repositorio)
const createProductUseCase = new CreateProduct(productRepository);
const getProductsUseCase = new GetProducts(productRepository);

// Controlador (depende de los Casos de Uso)
const productController = new ProductController(
    createProductUseCase,
    getProductsUseCase
);

// 3. Configurar Rutas
app.use('/api', routes(productController));

// 4. Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

## 6. Pasos para Probar el Ejemplo

1.  **Inicializar el Proyecto:**
    ```bash
    mkdir clean_arch_example
    cd clean_arch_example
    npm init -y
    ```
2.  **Instalar Dependencias:**
    ```bash
    npm install express mongoose
    ```
3.  **Crear la Estructura de Carpetas:**
    ```bash
    mkdir -p src/domain/entities src/domain/repositories src/application/use_cases src/infrastructure/controllers src/infrastructure/repositories src/infrastructure/models src/infrastructure/web
    ```
4.  **Crear los Archivos:** Copia el código de los apartados 2, 3, 4 y 5 en sus respectivos archivos.
5.  **Asegurar MongoDB:** Asegúrate de tener una instancia de MongoDB corriendo localmente.
6.  **Ejecutar:**
    ```bash
    node src/index.js
    ```
7.  **Probar con cURL o Postman:**

    *   **Crear Producto (POST /api/products):**
        ```bash
        curl -X POST http://localhost:3000/api/products \
        -H "Content-Type: application/json" \
        -d '{"name": "Laptop Pro", "description": "Una laptop muy potente", "price": 1200.50}'
        ```

    *   **Obtener Productos (GET /api/products):**
        ```bash
        curl http://localhost:3000/api/products
        ```

## Conclusión

Hemos implementado la Clean Architecture. La clave es la **Dirección de las Dependencias**:

*   **Dominio** (Entidades) no depende de nada.
*   **Aplicación** (Casos de Uso) depende de **Dominio**.
*   **Infraestructura** (Repositorios, Controllers, Express) depende de **Aplicación** y **Dominio**.

Esto se logra invirtiendo la dependencia de la base de datos (a través de la Interfaz de Repositorio) y la dependencia del framework web (a través de la Interfaz del Controller).
