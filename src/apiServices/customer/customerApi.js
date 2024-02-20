import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCustomer: builder.mutation({
            query: (params) => {
                return {
                    method: "POST",
                    url: `/api/tenant/ultimatrue/add`,
                    headers: {
                        "Content-Type": "application/json",
                        slug: slug,
                        "Authorization": `Bearer ${params.token}`,
                    },
                    body: params.body
                };
            },
        }),


    }),

});


export const { useAddCustomerMutation } = customerApi

