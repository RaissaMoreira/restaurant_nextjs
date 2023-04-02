import { useEffect, useState } from 'react';
import Item from '../Item';
import { IBurger } from '@component/utils/types';

export default function ItemsList() {
    const [data, setData] = useState<IBurger[]>([])
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/burguers')
        return response.json()
      }
  
      fetchData().then((data) => {
        setData(data)
      })
    }, [])

  return (
    <div className="flex">
      {data?.map((el) => (
        <Item key={el.id} item={el}/>
      ))}
    </div>
  )
}