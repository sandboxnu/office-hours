import useSWR from "swr";
import { API } from "@template/api-client";
import Router from "next/router";
import { User } from "@template/common";

type Hook = () => User;

export const useProfile: Hook = () => {
  const { data, error } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  // Redirect to login page (later Khoury Admin login) if API request returns an error or empty object
  if (
    error?.response?.status === 401
  ) {
    Router.push("/login");
  } else if (data) {
    return data;
  }
};
