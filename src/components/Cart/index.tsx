import { useStore } from "@component/store/store";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem";

interface ICart {
  extendedClass?: string;
}

export default function Cart({ extendedClass }: ICart) {
  const { cart, totalPrice } = useStore();

  return (
    <section
      className={`${styles.section} ${
        extendedClass ? extendedClass : "min-w-[500px]"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className={`flex flex-col gap-5`}>
          <h3 className="text-[1.3rem] font-semibold">Seu pedido</h3>
          {cart.length > 0 ? (
            <div className={`${styles.container} flex flex-col gap-5`}>
              {cart.map((el) => (
                <CartItem key={el.id} item={el} />
              ))}
            </div>
          ) : (
            <p className="text-pink font-semibold">
              Seu carrinho está vazio :(
            </p>
          )}
        </div>
        <div>
          {cart.length > 0 && (
            <div className="flex justify-end gap-3 mb-4">
              <p className="text-[1.1rem] font-semibold">Total:</p>
              <span className="text-[1.1rem] font-bold text-yellow">
                {`R$ ${totalPrice?.toLocaleString("pt-br", {minimumFractionDigits: 2,})}`}
              </span>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button disabled={cart.length < 1} className={styles.btn}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
