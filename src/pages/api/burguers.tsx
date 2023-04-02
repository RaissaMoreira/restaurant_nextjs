import axios from 'axios';
import db from '../../../db.json';

// export default (req, res) => {
//   const { categoria } = req.query;
//   const produtos = db[categoria];
//   res.status(200).json(produtos);
// };

export default (req, res) => {
  res.status(200).json(db.burguers);
};
