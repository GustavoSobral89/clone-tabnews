import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = 14;
  return await bcryptjs.hash(password, rounds);
}

const password = {
  hash,
};

export default password;
