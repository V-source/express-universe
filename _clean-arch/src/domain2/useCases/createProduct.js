import Product  from "../../domain2/entities/product.entity.js";
import {basicValidation} from "../../domain2/entities/entity.js";
import {productLayout} from "../../domain2/entities/product.entity.js";
// recibe el repositorio/contrato ProductDbrepository
// use case
export default class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  
  async execute(product) {
    // validaciones de logica de aplicacion aqui
    let errors = basicValidation(product, productLayout());
   try{

    if(Object.keys(errors).length > 0){
      let newError = new Error('Campos invalidos o mal formados');
      newError.errors = errors;
      newError.status = 422;
      throw newError;
    }
    
    // validaciones de logica de negocio aqui
    const newProduct = new Product(product);

    const productCreated = this.productRepository.save(newProduct);

    return await productCreated;
    } catch(error){
    }

  }
}


