import * as Yup from 'yup';
import { fullNameRegex } from '../constants/uiConstants';

export const formUser = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório").matches(fullNameRegex, 'O campo "Nome" deve conter nome e sobrenome'),
  email: Yup.string().email("Endereço de email inválido").required("Email é obrigatório"),
});