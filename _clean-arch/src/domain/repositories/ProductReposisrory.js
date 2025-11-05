// src/domain/repositories/ProductRepository.js

/**
 * @interface ProductRepository
 * @description Interfaz (contrato) que define las operaciones de persistencia
 * que la capa de Casos de Uso necesita.
 * Esta interfaz será implementada por la capa de Infraestructura (Mongoose).
 */
class ProductRepository {
    async save(product) {
        throw new Error('Método save() debe ser implementado');
    }

    async findById(id) {
        throw new Error('Método findById() debe ser implementado');
    }

    async findAll() {
        throw new Error('Método findAll() debe ser implementado');
    }

    async delete(id) {
        throw new Error('Método delete() debe ser implementado');
    }
}

export default ProductRepository;
