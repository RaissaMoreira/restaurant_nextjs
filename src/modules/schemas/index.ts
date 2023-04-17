import * as Yup from 'yup';
import { fullNameRegex } from '../constants/uiConstants';

export const formUser = Yup.object().shape({
  celular: Yup.string().min(11,"O campo 'Celular' está inválido").max(11,"O campo 'Celular' está inválido").required("O campo 'Celular' é obrigatório"),
  name: Yup.string().required("O campo 'Nome' é obrigatório").matches(fullNameRegex, 'O campo "Nome" deve conter nome e sobrenome'),
});