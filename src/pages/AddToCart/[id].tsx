import { useRouter } from 'next/router';
import styles from '../../styles/AddToCart.module.scss';
import Link from 'next/link';
import { CgArrowLongLeft } from "react-icons/cg";
import { IFood } from '@component/utils/types';
import { useStore } from '@component/store/store';
import api from '@component/services/api';
import { useEffect, useState } from 'react';
import Item from '@component/components/Item';

export default function AddToCart() {
  const { selectedCategory } = useStore();
  const router = useRouter();
  const id = router.query.id;

  const [clickedItem, setClickedItem] = useState({});

  async function fetchApi() {
    try {
      const response = await api.get(`/${selectedCategory}/${id}`);
      setClickedItem(response.data);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [selectedCategory, id]);

  return (
    <div className='p-[1.5rem] bg-pink'>
      <Link href="/" className='font-bold flex items-center gap-1'>
        <CgArrowLongLeft className='h-[23px] w-[23px]'/>
        Voltar
      </Link>
      <h1>Add to cart { id }</h1>
      <div>
        <Item item={clickedItem}/>
      </div>
    </div>
  )
}