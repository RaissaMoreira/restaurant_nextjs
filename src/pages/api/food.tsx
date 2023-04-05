import axios from 'axios';
import db from '../../../db.json';

// export default (req, res) => {
//   const { categoria } = req.query;
  
//   if (db.hasOwnProperty(categoria)) {
//     const produtos = db[categoria];
//     res.status(200).json(produtos);
//   } else {
//     res.status(404).json({ message: 'Categoria não encontrada' });
//   }
// };

export default (req, res) => {
  res.status(200).json(db);
};
