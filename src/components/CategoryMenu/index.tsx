import { useState } from 'react';
import { categoriesList } from '../../utils/constants';
import styles from './CategoryMenu.module.scss';

export default function CategoryMenu() {
  const [selectedCategory, setSelectedCategory] = useState('pizza');

  const onCategoryClick = (id: string) => {
    setSelectedCategory(id);
  }

  return (
    <div className={styles.categoryMenu}>
      <ul className={styles.scrollbar}>
      {categoriesList.map((category) => {
        const Icon = category.icon;
        return (
          <li 
            key={category?.id} 
            onClick={() => onCategoryClick(category?.id)}
            className={selectedCategory === category?.id && styles.activeCategory}
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