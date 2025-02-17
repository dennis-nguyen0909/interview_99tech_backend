import jwt from 'jsonwebtoken';

interface TokenPayload {
  id?: string;
  email?: string;
  role?: string;
}

export const generateAccessToken = async (payload: TokenPayload): Promise<string> => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET || 'duydeptrai',
    { expiresIn: '30m' }
  );
};

export const generateRefreshToken = async (payload: TokenPayload): Promise<string> => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || 'duydeptrai',
    { expiresIn: '14d' }
  );
}; 