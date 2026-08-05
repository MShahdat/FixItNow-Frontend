import { AuthResponse, IUser } from "@/lib/interface";

export const fullName = (user: any) => {
  const firstName = user?.data?.firstName ?? ""
  const lastName = user?.data?.lastName ?? ""

  return [firstName, lastName].filter(Boolean).join(" ").trim()
}