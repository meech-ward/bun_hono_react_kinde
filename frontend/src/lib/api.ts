import { hc, InferResponseType } from "hono/client"
import { type ApiRoutes } from "../../../app"

const client = hc<ApiRoutes>("/")

export default client.api

export type User = InferResponseType<typeof client.api.me.$get>["user"]