import { Request, Response } from 'express';
import pool from '../config/db';

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'Yetkilendirme gerekli' });
      return;
    }

    const query = 'SELECT * FROM users WHERE cognito_id = $1';
    const result = await pool.query(query, [req.user.id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};