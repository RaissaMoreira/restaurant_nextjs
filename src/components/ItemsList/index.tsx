import { useEffect, useState } from "react";
import Item from "../Item";
import styles from "./ItemsList.module.scss";
import api from "@component/services/api";
import { useStore } from "@component/store/store";
import { IFood } from "@component/utils/types";
import { capitalizeFirstLetter } from "@component/services/functions";
import Loading from "../Loading";

export default function ItemsList() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedCategory } = useStore();

  async function fetchApi() {
    try {
      setLoading(true);
      setTimeout(async () => {
        const response = await api.get(`/${selectedCategory}`);
        setFoods(response.data);
        setLoading(false);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [selectedCategory]);

  return (
    <div className={`${styles.container} ${loading && 'justify-center items-center w-full'} flex flex-col`}>
      {loading ? (
        <Loading active={loading} />
      ) : (
        <>
          <h3 className="mb-5 font-semibold text-[1.2rem]">
            {capitalizeFirstLetter(selectedCategory)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {foods?.map((el) => (
              <Item key={el.id} item={el} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
