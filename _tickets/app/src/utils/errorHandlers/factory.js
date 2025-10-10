export default class ErrorFactory extends Error {
  constructor(message, details, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Indica que es un error esperado
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
  
  // Puedes dejar el método json() si quieres, pero es más fácil hacerlo en el middleware
  json() {
    return {
      status: this.status,
      message: this.message,
      details: this.details,
    };
  }
}
