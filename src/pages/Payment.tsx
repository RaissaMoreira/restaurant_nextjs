import Cart from "@component/components/Cart";
import Link from "next/link";
import { CgArrowLongLeft } from "react-icons/cg";
import { useCallback, useState } from "react";
import UseWindowSize from "@component/hooks/useWindowSize";
import styles from "../styles/Payment.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { formUser } from "@component/modules/schemas";
import { useFormStore } from "@component/store/store";
import { showToast } from "@component/modules/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Modal from "@mui/material/Modal";
import Address from "@component/components/Address";
import CardAddress from "@component/components/Address/CardAddress";

export default function Payment() {
  const form = useFormStore((s) => s.form);
  const { addDataForm, cleanValues } = useFormStore();
  const [isOpen, setIsOpen] = useState(false);
  const size = UseWindowSize();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('store');

  const handleClick = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        await formUser.validate({
          name: form?.name,
          celular: form?.celular,
        });
        onSubmit(e);
        showToast({
          message: "Pedido realizado com sucesso!",
          status: "success",
        });
      } catch (error) {
        showToast({ message: error?.message, status: "error" });
        console.log(error);
      }
    },
    [form]
  );

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

  const onSubmit = (e: any) => {
    e.preventDefault();
    addDataForm({ ...form });
    cleanValues();
  };

  console.log("form:::", form);

  return (
    <section className="w-full flex justify-between">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.cartIcon} ${
          size.width <= 1100 ? "flex" : "hidden"
        }`}
      >
        <AiOutlineShoppingCart />
      </div>
      <div className="p-5 w-full">
        <Link href="/" className="font-bold flex items-center gap-1 mb-4">
          <CgArrowLongLeft className="h-[23px] w-[23px]" />
          Voltar
        </Link>
        <div className={styles.container}>
          <div className={`${styles.form} mb-10`}>
            <h1 className="font-semibold mb-3 text-[1.3rem]">Seus dados</h1>
            <form className="flex flex-col items-start gap-3 justify-center">
              <div className="w-full flex flex-col items-start">
                <label htmlFor="name" className="font-semibold">
                  Nome*
                </label>
                <input
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Seu nome"
                  type="text"
                />
              </div>
              <div className="w-full flex flex-col items-start">
                <label htmlFor="cellphone" className="font-semibold">
                  Celular*
                </label>
                <input
                  name="celular"
                  id="cellphone"
                  placeholder="Seu celular"
                  type="text"
                  required
                  value={form.celular}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>

          <div className={styles.address}>
            <h1 className="font-semibold mb-3 text-[1.3rem]">Endereço</h1>
            <div className="flex items-center space-x-5 justify-start">
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="store"
                  name="deliveryType"
                  value="store"
                  checked={selectedValue === 'store'}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="loja">Retirar na loja</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="delivery"
                  name="deliveryType"
                  value="delivery"
                  checked={selectedValue === 'delivery'}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="delivery">Delivery</label>
              </div>
            </div>
            <CardAddress/>
            <p onClick={() => setOpen(true)} className={selectedValue === 'delivery' ? 'text-pink cursor-pointer underline decoration-solid text-[0.9rem]' : 'hidden'}>Adicionar endereço</p>
          </div>
          <button
            className="btnStyles py-1"
            type="submit"
            onClick={(e) => handleClick(e)}
          >
            Confirmar pedido
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Address closeModal={() => setOpen(false)}/></Modal>

      <div
        className={`${
          isOpen && size.width <= 1100 ? styles.menuOverlay : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      {isOpen && size.width <= 1100 && (
        <Cart
          buttonActive={false}
          extendedClass="fixed right-0 h-[100%] w-full msm:w-[80%] md:w-[50%]"
        />
      )}
      {size.width > 1100 && <Cart buttonActive={false} />}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}
