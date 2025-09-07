import { createClient } from "@/lib/supabase/client";
import { createNewUserInDatabase } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  userRole: any;
  user: any;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const supabase = createClient();
          const {
            data: { session },
          } = await supabase.auth.getSession();
          const userRole = session?.user.user_metadata.role;
          console.log(session, userRole);

          const endpoint = `/user/${session?.user.email}`;
          //   const endpoint = `/user/admin@example.com`;
          let userDetailsResponse = await fetchWithBQ(endpoint);

          if (!userDetailsResponse.data) {
            userDetailsResponse = await createNewUserInDatabase(
              session,
              fetchWithBQ
            );
          }

          return {
            data: {
              user: userDetailsResponse.data,
              userRole: session?.user.user_metadata.role,
            },
          };
        } catch (error: any) {
          return { error: error.message || "error Fetching auth user" };
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = api;
