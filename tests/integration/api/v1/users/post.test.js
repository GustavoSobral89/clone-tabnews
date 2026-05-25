import orchestrator from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST to /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      await database.query({
        text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        values: ["Gsobral", "Teste@gmail.com", "senha123"],
      });

      const users = await database.query("SELECT * FROM users;");
      console.log(users.rows);

      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
      });
      expect(response.status).toBe(201);

      const response1Body = await response.json();

      expect(Array.isArray(response1Body)).toBe(true);
      expect(response1Body.length).toBeGreaterThan(0);
    });
  });
});
