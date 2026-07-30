import { TUser } from "@/lib/interface";


export const fullName = (user: TUser) => {
  const firstName = user?.data?.firstName
  const lastName = user?.data?.lastName

  const fullName = firstName + " " + lastName
  return fullName
}