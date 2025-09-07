import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createNewUserInDatabase = async (
  session:any,
  fetchWithBQ: any
) => {
  const createEndpoint ="/register"
  console.log(session.user.id);
  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      uid: session?.user.id,
      email: session?.user.email,
      role: session?.user.user_metadata.role,
    },
  });

  if (createUserResponse.error) {
    throw new Error("Failed to create user record");
  }

  return createUserResponse;
};