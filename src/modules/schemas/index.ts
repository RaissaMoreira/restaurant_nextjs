import * as Yup from 'yup';
import { fullNameRegex } from '../constants/uiConstants';

export const formUser = Yup.object().shape({
  celular: Yup.string().min(11,"O campo 'Celular' está inválido").max(11,"O campo 'Celular' está inválido").required("O campo 'Celular' é obrigatório"),
  name: Yup.string().required("O campo 'Nome' é obrigatório").matches(fullNameRegex, 'O campo "Nome" deve conter nome e sobrenome'),
});

export const formAddress = Yup.object().shape({
    cep: Yup.string().min(8, 'Insira um CEP válido').max(8, 'Insira um CEP válido').required('O campo "CEP" é obrigatório'),
    street: Yup.string().required("O campo 'Rua' é obrigatório"),
    number: Yup.string().min(1, 'Número iválido').required("O campo 'Número' é obrigatório"),
    city: Yup.string().required("O campo 'Cidade' é obrigatório"),
    state: Yup.string().required("O campo 'Estado' é obrigatório"),
    neighborhood: Yup.string().required("O campo 'Bairro' é obrigatório"),
  });