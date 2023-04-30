import { useEffect, useState } from "react";
import Item from "../Item";
import styles from "./ItemsList.module.scss";
import api from "@component/services/api";
import { useStore } from "@component/store/store";
import { IFood } from "@component/utils/types";
import Loading from "../Loading";
import { capitalizeFirstLetter } from "@component/utils/captalizeFirstLetter";

export default function ItemsList() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false); // componente aparece após renderizar a página
  const { selectedCategory } = useStore();

  async function fetchApi() {
    try {
      setLoading(true);
      const response = await api.get(`/${selectedCategory}`);
      setFoods(response?.data);
      setLoading(false);
      setIsReady(true);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [selectedCategory]);

  return (
    <>
      {isReady && (
        <div
          className={`${styles.container} ${
            loading && "justify-center items-center w-full"
          } w-full flex flex-col`}
        >
          {loading ? (
            <Loading active={loading} />
          ) : (
            <>
              <h3 className="mb-5 font-semibold text-[1.2rem]">
                {capitalizeFirstLetter(selectedCategory)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {foods?.map((el) => (
                  <Item key={el?.id} item={el} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
