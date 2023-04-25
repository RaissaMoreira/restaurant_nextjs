import Cart from "@component/components/Cart";
import Link from "next/link";
import { CgArrowLongLeft } from "react-icons/cg";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UseWindowSize from "@component/hooks/useWindowSize";
import styles from "../styles/Payment.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { formUser } from "@component/modules/schemas";
import { useFormStore, useStore } from "@component/store/store";
import Modal from "@mui/material/Modal";
import Address from "@component/components/Address";
import CardAddress from "@component/components/Address/CardAddress";
import { useRouter } from "next/router";
import { ToastContext } from "@component/context/ToastContext";

export default function Payment() {
  const { showToast } = useContext(ToastContext);
  const form = useFormStore((s) => s.form);
  const cart = useStore((s) => s.cart);
  const { cleanCart } = useStore();
  const { addDataForm, cleanValues, deleteAddress } = useFormStore();
  const [isOpen, setIsOpen] = useState(false);
  const size = UseWindowSize();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('loja');
  const [selectPayment, setSelectedPayment] = useState('card');

  const handleClick = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        await formUser.validate({
          name: form?.name,
          celular: form?.celular,
        });

        if(form?.deliveryType === 'delivery') {
          form?.cep ? 
            (
              onSubmit(e),
              
              showToast({
              message: "Pedido realizado com sucesso!",
              status: "success",
            }),
            router.push("/"),
            cleanCart()
            ):
            showToast({ message: "Adicione o endereço!", status: "error" });;
        } else {
          onSubmit(e);
          showToast({
            message: "Pedido realizado com sucesso!",
            status: "success",
          });
          router.push("/");
          cleanCart();
        }
      } catch (error) {
        showToast({ message: error?.message, status: "error" });
        console.warn(error);
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
    addDataForm({ ...form, order: cart });
    cleanValues();
  };

  useEffect(() => {
    if(selectedValue === 'loja') {
      deleteAddress();
    }
  }, [selectedValue])

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
          <div className="flex flex-col justify-evenly">
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
                  className="md:w-1/2 w-full"
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
                  className="md:w-1/2 w-full"
                  value={form.celular}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>

          <div className='mb-5'>
            <h1 className="font-semibold mb-3 text-[1.3rem]">Endereço</h1>
            <div className="flex items-center space-x-5 justify-start">
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="loja"
                  name="deliveryType"
                  value="loja"
                  checked={selectedValue === 'loja'}
                  onChange={(e) => {
                    setSelectedValue(e.target.value),
                    handleInputChange(e)
                  }}
                />
                <label htmlFor="loja" className="text-dark-grey">Retirar na loja</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="delivery"
                  name="deliveryType"
                  value="delivery"
                  checked={selectedValue === 'delivery'}
                  onChange={(e) => {
                    setSelectedValue(e.target.value),
                    handleInputChange(e)
                  }}
                />
                <label htmlFor="delivery" className="text-dark-grey">Delivery</label>
              </div>
            </div>
            {selectedValue === 'delivery' && <CardAddress/>}
            
            <p onClick={() => setOpen(true)} className={selectedValue === 'delivery' ? 'text-pink cursor-pointer underline decoration-solid text-[0.9rem] mt-3' : 'hidden'}>
              {form?.cep ? 'Editar endereço' : 'Adicionar endereço'}
            </p>
          </div>

          <div className={styles.payment}>
            <h1 className="font-semibold mb-3 text-[1.3rem]">Pagamento</h1>
            <p className="font-semibold mb-3 text-[1rem]">Método de pagamento:</p>
            <div className="flex items-center space-x-5 justify-start">
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="card"
                  name="paymentType"
                  value="card"
                  checked={selectPayment === 'card'}
                  onChange={(e) => {
                    setSelectedPayment(e.target.value),
                    handleInputChange(e)
                  }}
                />
                <label htmlFor="card" className="text-dark-grey">Cartão</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="pix"
                  name="paymentType"
                  value="pix"
                  checked={selectPayment === 'pix'}
                  onChange={(e) => {
                    setSelectedPayment(e.target.value),
                    handleInputChange(e)
                  }}
                />
                <label htmlFor="pix" className="text-dark-grey">Pix</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="dinheiro"
                  name="paymentType"
                  value="dinheiro"
                  checked={selectPayment === 'dinheiro'}
                  onChange={(e) => {
                    setSelectedPayment(e.target.value),
                    handleInputChange(e)
                  }}
                />
                <label htmlFor="dinheiro" className="text-dark-grey">Dinheiro</label>
              </div>
            </div>
          </div>
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
      >
        <>
          <Address closeModal={() => setOpen(false)}/>
        </>
      </Modal>

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
    </section>
  );
}
