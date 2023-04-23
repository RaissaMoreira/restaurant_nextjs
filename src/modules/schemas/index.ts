import * as Yup from 'yup';
import { fullNameRegex } from '../constants/uiConstants';

export const formUser = Yup.object().shape({
  celular: Yup.string().min(11,"O campo 'Celular' está inválido").max(11,"O campo 'Celular' está inválido").required("O campo 'Celular' é obrigatório"),
  name: Yup.string().required("O campo 'Nome' é obrigatório").matches(fullNameRegex, 'O campo "Nome" deve conter nome e sobrenome'),
});

export const formAddress = Yup.object().shape({
    number: Yup.string().min(1, 'Número iválido').required("O campo 'Número' é obrigatório"),
    street: Yup.string().required("O campo 'Rua' é obrigatório"),
    neighborhood: Yup.string().required("O campo 'Bairro' é obrigatório"),
    state: Yup.string().required("O campo 'Estado' é obrigatório"),
    city: Yup.string().required("O campo 'Cidade' é obrigatório"),
    cep: Yup.string().required('O campo "CEP" é obrigatório'),
  });