import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_SALON,
  DELETE_SALON,
  GET_SALONS,
  UPDATE_SALON,
} from "../server/graphql";
import { Salon } from "../types";

export const useSalons = () => {
  const { loading, error, data, refetch } = useQuery<{ getSalons: Salon[] }>(
    GET_SALONS,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const [addSalon] = useMutation(ADD_SALON, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error adding salon: ", error),
  });

  const [updateSalon] = useMutation(UPDATE_SALON, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error updating salon: ", error),
  });

  const [deleteSalon] = useMutation(DELETE_SALON, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error deleting salon: ", error),
  });

  return { loading, error, data, addSalon, updateSalon, deleteSalon };
};
