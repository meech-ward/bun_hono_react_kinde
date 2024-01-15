import { hc } from "hono/client"
import { type ApiRoutes } from "../../../app"

const client = hc<ApiRoutes>("/")

export default client.api