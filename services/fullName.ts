import { AuthResponse, IUser } from "@/lib/interface";

export const fullName = (user: AuthResponse<IUser> | null | undefined) => {
  const firstName = user?.data?.firstName ?? ""
  const lastName = user?.data?.lastName ?? ""

  return [firstName, lastName].filter(Boolean).join(" ").trim()
}