
import Cart from '@component/components/Cart';
import Link from 'next/link';
import { CgArrowLongLeft } from 'react-icons/cg';
import { useState } from 'react';
import UseWindowSize from '@component/hooks/useWindowSize';
import styles from '../styles/Payment.module.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  const size = UseWindowSize();
  
  return (
    <section className='w-full flex justify-between'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.cartIcon} ${size.width <= 1100 ? 'flex' : 'hidden'}`}
      >
        <AiOutlineShoppingCart />
      </div>
      <div className='p-5'>
      <Link href="/" className='font-bold flex items-center gap-1'>
        <CgArrowLongLeft className='h-[23px] w-[23px]'/>
        Voltar
      </Link>
      <h1>Payment</h1>
      </div>
      <div className={`${(isOpen && size.width <= 1100) ? styles.menuOverlay : "hidden"}`} onClick={() => setIsOpen(false)} ></div>
      {(isOpen && size.width <= 1100) && (<Cart buttonActive={false} extendedClass="fixed right-0 h-[100%] w-full msm:w-[80%] md:w-[50%]" />)}
      {size.width > 1100 && <Cart buttonActive={false} />}
    </section>
  )
}