import { Request, Response } from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import pool from '../config/db';

const cognito = new CognitoIdentityServiceProvider({
  region: process.env.COGNITO_REGION
});

export const register = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  
  try {
    const { username, email, password } = req.body;

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Geçerli bir email adresi giriniz' });
      return;
    }

    // Transaction başlat
    await client.query('BEGIN');

    // Email kullanımda mı kontrolü
    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor' });
      return;
    }

    // Cognito'ya kaydet
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: username }
      ]
    };

    const cognitoResult = await cognito.signUp(params).promise();
    const userId = cognitoResult.UserSub;

    // Veritabanına kaydet
    await client.query(
      'INSERT INTO users (id, email, name) VALUES ($1, $2, $3)',
      [userId, email, username]
    );

    // Transaction'ı tamamla
    await client.query('COMMIT');

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu. Lütfen email adresinizi doğrulayın.'
    });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Register error:', error);
    res.status(400).json({ 
      error: error.message || 'Kayıt işlemi başarısız oldu'
    });
  } finally {
    client.release();
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log('Login isteği alındı:', { email });
  
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID!,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      };
  
      console.log('Cognito\'ya istek gönderiliyor...');
      const authResult = await cognito.initiateAuth(params).promise();
      console.log('Cognito yanıtı:', authResult);
      
      if (!authResult.AuthenticationResult) {
        console.log('Cognito authentication başarısız');
        res.status(401).json({ error: 'Giriş başarısız' });
        return;
      }
  
      console.log('Veritabanından kullanıcı bilgileri alınıyor...');
      const userResult = await pool.query(
        'SELECT id, email, name FROM users WHERE email = $1',
        [email]
      );
  
      if (userResult.rows.length === 0) {
        console.log('Kullanıcı veritabanında bulunamadı');
        res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        return;
      }
  
      console.log('Login başarılı, token ve kullanıcı bilgileri gönderiliyor');
      res.json({
        token: authResult.AuthenticationResult.AccessToken,
        refreshToken: authResult.AuthenticationResult.RefreshToken,
        user: userResult.rows[0]
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(401).json({ 
        error: error.message || 'Email veya şifre hatalı'
      });
    }
  };

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await pool.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [(req as any).user.id]
    );

    if (user.rows.length === 0) {
      res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      return;
    }

    res.json({ user: user.rows[0] });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};