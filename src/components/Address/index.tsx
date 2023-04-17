import { SetStateAction } from "react";
import styles from "./Address.module.scss";

interface IAddress {
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function Address({closeModal}: IAddress) {
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
            // value={form.name}
            // onChange={handleInputChange}
            required
            placeholder="Digite seu CEP"
            type="text"
          />
        </div>
        <div className="w-full flex flex-col items-start space-y-2">
          <label htmlFor="city" className="font-semibold">
            Cidade*
          </label>
          <input
            name="city"
            id="city"
            // value={form.name}
            // onChange={handleInputChange}
            required
            placeholder="Digite sua cidade"
            type="text"
          />
        </div>

        <div className="flex items-center flex-col space-y-3 ltm:space-y-0 ltm:flex-row ltm:space-x-5">
        <div className="w-full flex flex-col items-start space-y-2 ltm:w-[70%]">
          <label htmlFor="street" className="font-semibold">
            Rua*
          </label>
          <input
            name="street"
            id="street"
            // value={form.name}
            // onChange={handleInputChange}
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
            // value={form.name}
            // onChange={handleInputChange}
            required
            placeholder="Digite o número"
            type="text"
          />
        </div>
        </div>
      </form>

      <div className="w-full flex items-center justify-evenly">
        <button onClick={closeModal} className="btnCancel py-1">Cancelar</button>
        <button className="btnStyles py-1">Adicionar</button>
      </div>
    </div>
  );
}
