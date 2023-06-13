import * as jose from 'jose';

const alg = 'RS256';
const RAW_PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsoRdVXqM57oa8qMndtTQ\nPfvEg1HaJjctWqHIiYGyKr0FVrCkznBVQgYPxyizBRL26+Iviy0L+Z9Ecq6ystcO\nbS+0ZqmBzGJE5S7MVP0ksnPrXvvqa/5Nd+jpO6nY8KfMoDliNaftRKRVTmDrP2i4\ngZt3vTBmJMoy9XmHAUqfWAAKZSATUIX+wySQ37XmogcgkWj5cGivhiVWFo/VKFWD\nICLqv/cpaOT8LtfJLdGqCGmrEZj26rxH1uTmZfx5Cko1zbmHW0kZVMa7ke+auBL8\ndM/j2plzOiror6PusimtKnHST3/++sOoLxVPdHk638KWpbExDJbGxhJkAwavNPDo\nuQIDAQAB\n-----END PUBLIC KEY-----';

let publicKey;

export default async function verifyToken(token) {
  if (!publicKey) publicKey = await jose.importSPKI(RAW_PUBLIC_KEY, alg);
  const { payload } = await jose.jwtVerify(token, publicKey);

  return payload;
}
