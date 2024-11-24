import { Request, Response } from 'express';
import pool from '../config/db';

export const addMealPlan = async (req: Request, res: Response) => {
    try {
        const { meal_type, food_items, calories, meal_date } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const query = `
            INSERT INTO meal_plans (user_id, meal_type, food_items, calories, meal_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            userId, 
            meal_type, 
            food_items, 
            calories, 
            meal_date
        ]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Öğün planı ekleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const getMealPlans = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { date } = req.query; // YYYY-MM-DD formatında tarih

        if (!userId) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        let query = 'SELECT * FROM meal_plans WHERE user_id = $1';
        const queryParams = [userId];

        if (date) {
            query += ' AND meal_date = $2';
            queryParams.push(date as string);
        }

        query += ' ORDER BY meal_date DESC, meal_type';
        
        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        console.error('Öğün planları getirme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const updateMealPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { meal_type, food_items, calories, meal_date } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const query = `
            UPDATE meal_plans 
            SET meal_type = $1, food_items = $2, calories = $3, meal_date = $4
            WHERE id = $5 AND user_id = $6
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            meal_type,
            food_items,
            calories,
            meal_date,
            id,
            userId
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Öğün planı bulunamadı' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Öğün planı güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

export const deleteMealPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const query = 'DELETE FROM meal_plans WHERE id = $1 AND user_id = $2 RETURNING *';
        const result = await pool.query(query, [id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Öğün planı bulunamadı' });
        }

        res.json({ message: 'Öğün planı başarıyla silindi' });
    } catch (error) {
        console.error('Öğün planı silme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};