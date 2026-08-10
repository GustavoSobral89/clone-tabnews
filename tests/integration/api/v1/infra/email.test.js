import email from "infra/email.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices;
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Teste gus <gustavo.sobral.carneiro@gmail.com>",
      to: "gustavo.sobral@foursys.com.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<gustavo.sobral.carneiro@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<gustavo.sobral@foursys.com.br>");
    expect(lastEmail.subject).toBe("Teste de assunto");
    expect(lastEmail.text).toBe("Teste de corpo.");
  });
});
