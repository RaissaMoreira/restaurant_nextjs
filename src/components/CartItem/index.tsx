import styles from "./CartItem.module.scss";
import Image from "next/image";
import { IFood } from "@component/utils/types";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import Observations from "../Observations";

export default function Cart({ item }: IFood) {
  const imagePath = `/images/${item.id}.png`;

  return (
    <div className={styles.container}>
      <Accordion className="w-full">
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className={styles.item}>
            <div
              className={`${styles.product} flex justify-between items-center gap-3`}
            >
              <div className={styles.image}>
                <Image
                  src={imagePath}
                  alt={item.name}
                  width={50}
                  height={50}
                  unoptimized
                />
              </div>
              <div className={styles.description}>
                <h4 className="text-[1.1rem] font-semibold">{item.name}</h4>
                <p className="text-[0.8rem] cursor-pointer underline decoration-solid text-dark-grey">
                  Adicionar observação
                </p>
              </div>
            </div>
            <div className="flex items-center text-[1.1rem] font-bold text-yellow">{`R$ ${item?.price.toLocaleString(
              "pt-br",
              {
                minimumFractionDigits: 2,
              }
            )}`}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Observations item={item}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
