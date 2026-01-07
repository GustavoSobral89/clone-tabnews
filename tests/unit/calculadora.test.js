const calculadora = require("../../models/calculadora.js");

test("Somar 2 + 2 = 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 2 + 2 = 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});
