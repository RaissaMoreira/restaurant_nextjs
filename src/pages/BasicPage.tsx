import CategoryMenu from "@component/components/CategoryMenu";
import ItemsList from "@component/components/ItemsList";

export default function BasicPage() {
  return (
    <div className="flex">
      <CategoryMenu/>
      <ItemsList/>
    </div>
  )
}