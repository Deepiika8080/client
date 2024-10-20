import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    name: string;
    email: string;
    password: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here

        register: builder.mutation<RegistrationResponse,RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    )
                } catch (error: unknown) {
                    console.log(error);
                }
            }
        }),
        activation: builder.mutation({
            query: ({activation_token,activation_Code}) => ({
                
                url:"activate-user",
                method:"POST",
                body:{
                    activation_token,
                    activation_Code
                },
            }),
        }),
        login: builder.mutation({
            query:({email,password}) => ({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userLoggedIn({
                        accessToken:result.data.accessToken,
                        user: result.data.user,
                    })
                  )  
                } catch (error: unknown) {
                    console.log(error);
                }
            }
        }),
        socialAuth: builder.mutation({
            query: ({ email, name, avatar}) => ({
                url: "socialAuth",
                method: "POST",
                body: {
                    name,
                    email,
                    avatar
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userLoggedIn({
                        accessToken:result.data.accessToken,
                        user: result.data.user,
                    })
                  )  
                } catch (error: unknown) {
                    console.log(error);
                }
            }
        }),
        logOut: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",              
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}) {
                try {
                
                  dispatch(
                    userLoggedOut()
                  )  
                } catch (error: unknown) {
                    console.log(error);
                }
            }
        }),
    })
});

export const {useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation,useLogOutQuery} = authApi;