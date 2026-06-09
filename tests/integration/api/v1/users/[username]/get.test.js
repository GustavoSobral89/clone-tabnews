import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET to /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "SameCase",
          email: "same.case@gmail.com",
          password: "senha123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/SameCase",
      );

      expect(response2.status).toBe(200);

      const response3 = await response2.json();

      expect(response3).toEqual({
        id: response3.id,
        username: "SameCase",
        email: "same.case@gmail.com",
        password: response3.password,
        created_at: response3.created_at,
        updated_at: response3.updated_at,
      });

      expect(uuidVersion(response3.id)).toBe(4);
      expect(Date.parse(response3.created_at)).not.toBeNaN();
      expect(Date.parse(response3.updated_at)).not.toBeNaN();
    });

    test("With case mismatch", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "CaseDiferente",
          email: "case.diferente@gmail.com",
          password: "senha123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/caseDiferente",
      );

      expect(response2.status).toBe(200);

      const response3 = await response2.json();

      expect(response3).toEqual({
        id: response3.id,
        username: "CaseDiferente",
        email: "case.diferente@gmail.com",
        password: "senha123",
        created_at: response3.created_at,
        updated_at: response3.updated_at,
      });

      expect(uuidVersion(response3.id)).toBe(4);
      expect(Date.parse(response3.created_at)).not.toBeNaN();
      expect(Date.parse(response3.updated_at)).not.toBeNaN();
    });

    test("With nonexistent username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username está digitado corretamente.",
        status_code: 404,
      });
    });
  });
});
