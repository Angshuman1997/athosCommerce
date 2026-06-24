import { useEffect } from "react";

import { useAppDispatch } from "./redux";

import {
  fetchProducts,
  setPage,
  setQuery,
} from "../redux/productSlice";

interface UseProductsProps {
  query: string;
}

export const useProducts = ({
  query,
}: UseProductsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuery(query));

    dispatch(setPage(1));

    dispatch(
      fetchProducts({
        query,
        page: 1,
      })
    );
  }, [query, dispatch]);
};