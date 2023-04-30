import { useEffect, useState } from "react";
import { categoriesList } from "../../utils/constants";
import styles from "./CategoryMenu.module.scss";
import { useStore } from "../../store/store";
import { BsGear } from "react-icons/bs";
import Link from "next/link";

export default function CategoryMenu() {
  const [categoryActive, setCategoryActive] = useState("");
  const category = useStore((state) => state.changeCategory);
  const { selectedCategory } = useStore();

  const onCategoryClick = (id: string) => {
    setCategoryActive(id);
    category(id);
  };

  useEffect(() => {
    setCategoryActive(selectedCategory)
  }, [selectedCategory])

  return (
    <div className={styles.categoryMenu}>
      <ul className={styles.scrollbar}>
        {categoriesList?.map((category) => {
          const Icon = category?.icon;
          return (
            <li
              key={category?.id}
              onClick={() => onCategoryClick(category?.id)}
              className={
                categoryActive === category?.id ? styles.activeCategory : ''
              }
            >
              <Icon size={40} className={styles.icons} />
              <span className={styles.textCategory}>{category?.label}</span>
            </li>
          );
        })}

        <Link href="/Order" className="md:mt-5 flex flex-col items-center justify-center space-y-1">
          <BsGear size={35} className={styles.icons} />
          <span className={styles.textCategory}>Gerenciamento</span>
        </Link>
      </ul>
    </div>
  );
}
