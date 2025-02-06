import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
  UPDATE_SERVICE,
} from "../server/graphql";
import { Service } from "../types";

export const useServices = () => {
  const { salonId } = useParams();
  const { loading, error, data, refetch } = useQuery<{
    getServices: Service[];
  }>(GET_SERVICES, {
    variables: { salonId },
    fetchPolicy: "cache-and-network",
  });

  const [addService] = useMutation(ADD_SERVICE, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error adding service: ", error),
  });

  const [updateService] = useMutation(UPDATE_SERVICE, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error updating service: ", error),
  });

  const [deleteService] = useMutation(DELETE_SERVICE, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error deleting service: ", error),
  });

  const onAddService = async ({
    name,
    price,
  }: {
    name: string;
    price: number;
  }) => {
    await addService({ variables: { salonId, name, price } });
  };
  const onUpdateService = async (service: Service) => {
    return await updateService({
      variables: {
        id: service.id,
        name: service.name,
        price: service.price,
      },
    });
  };

  const onDeleteService = async (id: string) => {
    return await deleteService({ variables: { id } });
  };

  return {
    loading,
    error,
    data: data?.getServices || [],
    addService: onAddService,
    updateService: onUpdateService,
    deleteService: onDeleteService,
  };
};
