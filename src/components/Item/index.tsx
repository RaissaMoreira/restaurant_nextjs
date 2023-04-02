import { IBurger } from "@component/utils/types"

interface ItemProps {
  item: IBurger
}

export default function Item({ item }: ItemProps) {
  console.log(item)
  return (
    <div className="flex">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  )
}