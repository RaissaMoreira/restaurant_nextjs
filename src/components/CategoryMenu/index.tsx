import { useState } from "react";
import { categoriesList } from "../../utils/constants";
import styles from "./CategoryMenu.module.scss";
import { useStore } from "../../store/store";
import { BsGear } from "react-icons/bs";
import { showToast } from "@component/modules/toast";
import Link from "next/link";

export default function CategoryMenu() {
  const [categoryActive, setCategoryActive] = useState("pizza");
  const category = useStore((state) => state.changeCategory);

  const onCategoryClick = (id: string) => {
    setCategoryActive(id);
    category(id);
  };

  // const handleSoon = () => {
  //   showToast({ message: "Em Breve!", status: "warning" });
  // };

  return (
    <div className={styles.categoryMenu}>
      <ul className={styles.scrollbar}>
        {categoriesList.map((category) => {
          const Icon = category.icon;
          return (
            <li
              key={category?.id}
              onClick={() => onCategoryClick(category?.id)}
              className={
                categoryActive === category?.id && styles.activeCategory
              }
            >
              <Icon size={40} className={styles.icons} />
              <span className={styles.textCategory}>{category?.label}</span>
            </li>
          );
        })}

        <Link href="/Order" className="md:mt-5 flex flex-col items-center justify-center space-y-1">
          <BsGear size={35} className={styles.iconOrder} />
          <span className={`${styles.textOrder} text-pink`}>Gerenciamento</span>
        </Link>
      </ul>
    </div>
  );
}
