import CategoryMenu from "@component/components/CategoryMenu";
import ItemsList from "@component/components/ItemsList";
import styles from "../styles/BasicPage.module.scss";
import Cart from "@component/components/Cart";

export default function BasicPage() {
  return (
    <div className={`${styles.container} flex justify-between`}>
      <CategoryMenu/>
      <ItemsList/>
      <Cart/>
    </div>
  )
}