import { useProfile } from "./useProfile";

export function useDefaultMessage() {
  const profile = useProfile();
  return (profile?.includeDefaultMessage && profile?.defaultMessage) || "";
}
