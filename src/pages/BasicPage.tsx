import CategoryMenu from "@component/components/CategoryMenu";
import ItemsList from "@component/components/ItemsList";
import styles from "../styles/BasicPage.module.scss";

export default function BasicPage() {
  return (
    <div className={`${styles.container} flex`}>
      <CategoryMenu/>
      <ItemsList/>
    </div>
  )
}