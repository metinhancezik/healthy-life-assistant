import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";

interface CognitoPayload {
  sub: string;
  username: string;
  email?: string;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Token bulunamadı' });
      return;
    }

    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID || '',
      tokenUse: "access",
      clientId: process.env.COGNITO_CLIENT_ID || ''
    });

    const payload = await verifier.verify(token) as unknown as CognitoPayload;
    
    req.user = {
      id: payload.sub,
      email: payload.email || payload.username
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Yetkilendirme başarısız' });
  }
};