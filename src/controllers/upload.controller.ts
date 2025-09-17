import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';

export const uploadCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const results: any[] = [];
    
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('Dados do CSV:', results);
        fs.unlinkSync(req.file.path);
        res.json({ 
          message: 'Arquivo processado com sucesso!', 
          data: results,
          insights: []
        });
      });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
