import { Request, Response } from 'express';
import pool from '../config/db';

// AuthenticatedRequest tipini kaldırıyoruz çünkü global tanımlama yaptık
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [req.user.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Profil getirme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const { name, bio } = req.body;
        
        const query = 'UPDATE users SET name = $1, bio = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [name, bio, req.user.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};