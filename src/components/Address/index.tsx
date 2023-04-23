import { ChangeEvent, SetStateAction, useCallback, useEffect } from "react";
import styles from "./Address.module.scss";
import { useFormStore } from "@component/store/store";
import { showToast } from "@component/modules/toast";
import { formAddress } from "@component/modules/schemas";
import axios from "axios";

interface IAddress {
  closeModal: () => void;
}

export default function Address({closeModal}: IAddress) {
  const form = useFormStore((s) => s.form);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    useFormStore.setState((s) => ({
      ...s,
      form: {
        ...s.form,
        [name]: value,
      },
    }));
  };

  const searchCEP = useCallback(async (e: string) => {
    try {
      const cepNewLength = e.includes("-") ? 9 : 8;

      if (e.length == cepNewLength) {
        const res = await axios.get(`https://viacep.com.br/ws/${e}/json/`);

        useFormStore.setState((prevState) => ({
          ...prevState,
          form: {
            ...prevState.form,
            city: res?.data?.cep ? res?.data?.localidade : "",
            street: res?.data?.cep ? res?.data?.logradouro : "",
            state: res?.data?.cep ? res?.data?.uf : "",
            neighborhood: res?.data?.cep ? res?.data?.bairro : "",
          },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCep = (e: string) => {
    useFormStore.setState((s) => ({ ...s, form: { ...s.form, cep: e } }));
    searchCEP(e);
  };

  const handleClickSaveAddress = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        await formAddress.validate({
          cep: form?.cep,
          street: form?.street,
          number: form?.number,
          city: form?.city,
          state: form?.state,
          neighborhood: form?.neighborhood,
        });
        onSave(e);
        showToast({
          message: "Endereço salvo com sucesso!",
          status: "success",
        });
      } catch (error) {
        showToast({ message: error?.message, status: "error" });
        console.warn(error);
      }
    },
    [form]
  );

  const onSave = (e: any) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className={styles.containerModal}>
      <h1 className="text-[1.5rem] w-full font-bold text-start">Adicionar endereço</h1>
      <form className="w-full space-y-3">
        <div className="w-full flex flex-col items-start space-y-2">
          <label htmlFor="cep" className="font-semibold">
            CEP*
          </label>
          <input
            name="cep"
            id="cep"
            tabIndex={1}
            maxLength={9}
            onChange={(e) => getCep(e.target.value)}
            value={form.cep || ""}
            required
            placeholder="Digite seu CEP"
            type="text"
          />
        </div>
        <div className="flex items-center flex-col space-y-3 ltm:space-y-0 ltm:flex-row ltm:space-x-5">
        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[30%]">
          <label htmlFor="city" className="font-semibold">
            Cidade*
          </label>
          <input
            name="city"
            id="city"
            value={form.city || ""}
            onChange={handleInputChange}
            required
            placeholder="Cidade"
            type="text"
          />
        </div>

        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[20%]">
          <label htmlFor="state" className="font-semibold">
            Estado*
          </label>
          <input
            name="state"
            id="state"
            value={form.state || ""}
            onChange={handleInputChange}
            required
            placeholder="Estado"
            type="text"
          />
        </div>

        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[60%]">
          <label htmlFor="neighborhood" className="font-semibold">
            Bairro*
          </label>
          <input
            name="neighborhood"
            id="neighborhood"
            value={form.neighborhood || ""}
            onChange={handleInputChange}
            required
            placeholder="Digite o Bairro"
            type="text"
          />
        </div>
        </div>

        <div className="flex items-center flex-col space-y-3 ltm:space-y-0 ltm:flex-row ltm:space-x-5">
        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[70%]">
          <label htmlFor="street" className="font-semibold">
            Rua*
          </label>
          <input
            name="street"
            id="street"
            value={form.street || ""}
            onChange={handleInputChange}
            required
            placeholder="Digite sua rua"
            type="text"
          />
        </div>

        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[30%]">
          <label htmlFor="number" className="font-semibold">
            Número*
          </label>
          <input
            name="number"
            id="number"
            value={form.number || ""}
            onChange={handleInputChange}
            required
            placeholder="Digite o número"
            type="text"
          />
        </div>
        </div>
      </form>

      <div className="w-full flex items-center justify-evenly">
        <button onClick={closeModal} className="btnCancel py-1">Cancelar</button>
        <button onClick={handleClickSaveAddress} type="submit" className="btnStyles py-1">Adicionar</button>
      </div>
    </div>
  );
}
