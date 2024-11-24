import { Request, Response } from 'express';
import pool from '../config/db';

export const addHealthData = async (req: Request, res: Response) => {
    try {
        const { weight, height, activity_level, target_weight } = req.body;
        const userId = req.user?.id;

        const query = `
            INSERT INTO health_data (user_id, weight, height, activity_level, target_weight)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        
        const result = await pool.query(query, [userId, weight, height, activity_level, target_weight]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Sağlık verisi ekleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const getHealthData = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        
        const query = 'SELECT * FROM health_data WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1';
        const result = await pool.query(query, [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Sağlık verisi bulunamadı' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Sağlık verisi getirme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const updateHealthData = async (req: Request, res: Response) => {
    try {
        const { weight, height, activity_level, target_weight } = req.body;
        const userId = req.user?.id;

        const query = `
            UPDATE health_data 
            SET weight = $1, height = $2, activity_level = $3, target_weight = $4
            WHERE user_id = $5 AND id = (
                SELECT id FROM health_data 
                WHERE user_id = $5 
                ORDER BY created_at DESC 
                LIMIT 1
            )
            RETURNING *
        `;
        
        const result = await pool.query(query, [weight, height, activity_level, target_weight, userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Güncellenecek sağlık verisi bulunamadı' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Sağlık verisi güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};