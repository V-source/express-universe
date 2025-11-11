import { expect, vi } from "vitest";

import { productRepository } from "../../domain2/repositories/product.repository";

import { createProductDbRepository } from "../../domain2/application/DbRepository";

describe.only("FUNCION: INTERFACES DE PRODUCTOS", () => {
  const repository = productRepository(createProductDbRepository());

  it("debe detectar si el repositorio es un objeto", () => {
    expect(productRepository({})).toBeTypeOf("object");
  });

  it("debe arrojar un error si no recibe un objeto", () => {
    expect(() => productRepository("lll")).toThrow(
      "El repositorio debe ser un objeto",
    );
  });

  it("debe detectar si un metodo no cumple el contrato", () => {
    expect(repository.clearProduct).toBeUndefined();
  });

  it("debe devolver el repositorio de productos", () => {
    expect(repository.save).toBeDefined();
    expect(repository.findById).toBeDefined();
  });

  it("el metodo que no cumple el contrato debe integrarse", () => {
    expect(repository.cleanProduct).toBeDefined();
  });

  it("el metodo que no cumple el contrato debe lanzar un mensaje de error", () => {
    expect(() => repository.cleanProduct()).toThrow("Este metodo no cumple con el contrato");
  });
});
