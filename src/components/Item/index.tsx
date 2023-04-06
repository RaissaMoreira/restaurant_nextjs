import { IBurger } from "@component/utils/types";
import Image from "next/image";
import burguer from "../../assets/images/burguer.png";
import styles from "./Item.module.scss";

interface ItemProps {
  item: IBurger;
}

export default function Item({ item }: ItemProps) {
  return (
    <div
      className={`${styles.item} flex flex-col justify-between items-center`}
    >
      <div className={`${styles.imgFood}`}>
        {item?.offer && <div className={`${styles.offer}`}>oferta</div>}
        <Image src={burguer} alt="burguer" />
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <h2 className="font-bold">{item?.name}</h2>
        <p className={styles.description}>{item?.description}</p>
        <p
          className={`${styles.textPrice} text-[1.1rem] font-bold text-yellow`}
        >{`R$ ${item?.price.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}`}</p>
      </div>
    </div>
  );
}
