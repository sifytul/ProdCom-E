import * as bcrypt from 'bcrypt';
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
