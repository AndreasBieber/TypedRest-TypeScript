import { Endpoint } from "../Endpoint";
import { HttpMethod } from "../../http";

/**
 * Base class for building RPC endpoints.
 */
export class RpcEndpointBase extends Endpoint {
    /**
     * Creates a new RPC endpoint.
     * @param referrer The endpoint used to navigate to this one.
     * @param relativeUri The URI of this endpoint relative to the `referrer`'s. Add a `./` prefix here to imply a trailing slash in the `referrer`'s URI.
     */
    constructor(referrer: Endpoint, relativeUri: URL | string) {
        super(referrer, relativeUri);
    }

    /**
     * Queries the server about capabilities of the endpoint without performing any action.
     * @throws {@link AuthenticationError}: {@link HttpStatusCode.Unauthorized}
     * @throws {@link AuthorizationError}: {@link HttpStatusCode.Forbidden}
     * @throws {@link NotFoundError}: {@link HttpStatusCode.NotFound} or {@link HttpStatusCode.Gone}
     * @throws {@link HttpError}: Other non-success status code
     */
    async probe() { await this.send(HttpMethod.Options); }

    /**
     * Shows whether the server has indicated that the invoke method is currently allowed.
     * Uses cached data from last response.
     * @returns `true` if the method is allowed, `false` if the method is not allowed, `undefined` If no request has been sent yet or the server did not specify allowed methods.
     */
    get invokeAllowed() { return this.isMethodAllowed(HttpMethod.Post); }
}
