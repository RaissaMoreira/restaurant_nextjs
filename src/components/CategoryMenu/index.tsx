import { useState } from 'react';
import { categoriesList } from '../../utils/constants';
import styles from './CategoryMenu.module.scss';
import { useStore } from '../../store/store';

export default function CategoryMenu() {
  const [categoryActive, setCategoryActive] = useState('pizza');
  const category = useStore((state) => state.changeCategory);
  const { selectedCategory } = useStore();

  const onCategoryClick = (id: string) => {
    setCategoryActive(id);
    category(id);
  }

  console.log(selectedCategory)

  return (
    <div className={styles.categoryMenu}>
      <ul className={styles.scrollbar}>
      {categoriesList.map((category) => {
        const Icon = category.icon;
        return (
          <li 
            key={category?.id} 
            onClick={() => onCategoryClick(category?.id)}
            className={categoryActive === category?.id && styles.activeCategory}
          >
            <Icon size={40} className={styles.icons} />
            <span className={styles.textCategory}>{category?.label}</span>
          </li>
        );
      })}
      </ul>
    </div>
  )
}