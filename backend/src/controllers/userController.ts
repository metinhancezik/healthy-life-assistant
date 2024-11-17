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

//To do

//User için daha fazla metot eklenebilir;

// export const updateUserProfile = async (req: Request, res: Response) => { ... }
// export const uploadProfileImage = async (req: Request, res: Response) => { ... }


//Meal controllerı ekleyip;
// export const addMeal = async (req: Request, res: Response) => { ... }
// export const getMeals = async (req: Request, res: Response) => { ... }
// export const updateMeal = async (req: Request, res: Response) => { ... }
// export const deleteMeal = async (req: Request, res: Response) => { ... }


//activity controllerı ekleyip;
// export const addActivity = async (req: Request, res: Response) => { ... }
// export const getActivities = async (req: Request, res: Response) => { ... }
// export const updateActivity = async (req: Request, res: Response) => { ... }
// export const deleteActivity = async (req: Request, res: Response) => { ... }


//Belki hataları yönetmek için bir yapı oluşturulabilir;
//Mesela, errorHandler.ts diye bir dosya oluşturup içerisine fonksiyonumuzu tanımlayabiliriz.
// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Bir hata oluştu' });
// };



