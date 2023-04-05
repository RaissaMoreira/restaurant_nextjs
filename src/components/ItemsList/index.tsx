import { useEffect, useState } from 'react';
import Item from '../Item';
import { IBurger } from '@component/utils/types';

export default function ItemsList() {
    const [data, setData] = useState<IBurger[]>([])

    async function getFood() {
      try {
        const response = await fetch('/api/food');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getFood();
    }, [])

  return (
    <div className="flex space-x-2">
      {data.burguers?.map((el) => (
        <Item key={el.id} item={el}/>
      ))}
    </div>
  )
}