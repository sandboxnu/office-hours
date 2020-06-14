import { createContext } from "react";
import { User } from "@template/common";

type ProfileContextProps = {
  profile: User;
};

export const ProfileContext = createContext<Partial<ProfileContextProps>>({});
