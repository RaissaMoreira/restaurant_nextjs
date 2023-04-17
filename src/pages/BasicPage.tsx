import CategoryMenu from "@component/components/CategoryMenu";
import ItemsList from "@component/components/ItemsList";
import styles from "../styles/BasicPage.module.scss";
import Cart from "@component/components/Cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import UseWindowSize from '../hooks/useWindowSize';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function BasicPage() {
  const [isOpen, setIsOpen] = useState(false);
  const size = UseWindowSize();

  return (
    <div className={`${styles.container} flex justify-between`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.cartIcon} ${size.width <= 1100 ? 'flex' : 'hidden'}`}
      >
        <AiOutlineShoppingCart />
      </div>

      <CategoryMenu />
      <ItemsList />

      <div className={`${(isOpen && size.width <= 1100) ? styles.menuOverlay : "hidden"}`} onClick={() => setIsOpen(false)} ></div>
      {(isOpen && size.width <= 1100) && (<Cart buttonActive={true} extendedClass="fixed right-0 h-[100%] w-full msm:w-[80%] md:w-[50%]" />)}
      {size.width > 1100 && <Cart buttonActive={true} />}

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
    </div>
  );
}
