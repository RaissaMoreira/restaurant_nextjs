import { useStore } from "@component/store/store";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem";

export default function Cart() {
  const { cart } = useStore();

  return (
    <section className={styles.section}>
      <div className="flex flex-col justify-between h-full">
        <div className={`flex flex-col gap-5`}>
          <h3 className="text-[1.3rem] font-semibold">Seu pedido</h3>
          <div className={`${styles.container} flex flex-col gap-5`}>
            {cart.map((el) => (
              <CartItem key={el.id} item={el} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-end gap-3 mb-4">
            <p className="text-[1.1rem] font-semibold">Total:</p>
            <span className="text-[1.1rem] font-bold text-yellow">45,68</span>
          </div>
          <div className="flex items-center justify-center">
            <button className={styles.btn}>Finalizar compra</button>
          </div>
        </div>
      </div>
    </section>
  );
}
