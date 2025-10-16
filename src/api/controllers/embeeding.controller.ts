import { Request, Response, NextFunction } from "express";
import { generateEmbedding } from "../services/embbeding.service";

export const getEmbedding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Se requiere 'text'" });

    const embedding = await generateEmbedding(text);
    res.json({ text, embedding });
  } catch (error) {
    next(error);
  }
};
