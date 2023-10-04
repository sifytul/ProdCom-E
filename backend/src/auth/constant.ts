type TTokenPayload = {
  id: number;
  email: string;
  tokenVersion: number;
  role: string;
};
export function tokenPayloadGenerator({
  id,
  email,
  tokenVersion,
  role,
}: TTokenPayload) {
  return {
    userId: id,
    email,
    tokenVersion,
    role,
  };
}
