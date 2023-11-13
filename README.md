# Kit Platform (Take-Home Project)

## Repository Setup

This is an [Nx](https://nx.dev/) monorepo with an
[Apollo Federation](https://www.apollographql.com/docs/federation/) federated
GraphQL API.

To get you started, the graph currently has three rudimentary services, which
can be found in the `apps/` folder:

-   `gateway`: An Apollo Gateway that serves as the router for the federated
    graph (note we are not using the newer Apollo Router yet)
-   `services/auth`: A subgraph for authentication concerns
-   `services/content`: A subgraph for training content concerns

There is also a library `libs/user-access` which stubs out user authentication
calls - in the real system this would make calls to a provider like Firebase,
but integrating with Firebase is not really the main point of this exercise, so
you should feel free to leave those calls stubbed out, although you may end up
needing to create some new API methods for the library to expand the user access
functionality.

You can run and experiment with the supergraph by installing the dependencies
(`npm i`; Node.js 20 is recommended) and executing the following commands in
three separate terminal windows:

-   `npx nx serve services-auth`
-   `npx nx serve services-content`
-   `npx nx serve gateway`

Then navigate to http://localhost:6050 to query your supergraph.

Finding a better way to serve everything with a single command is left as an
exercise.

## Task

**Your task is to build out one or more new subgraphs that handle User
Progress/User Activity concerns as described in the problem statement and
integrate them into the supergraph and monorepo structure.**

Considerations include but are not limited to: federated entities, backend data
stores, REST API data sources, user data handling, and performance and
reliability. You need not go as far as actually deploying third party resources
(e.g. AWS RDS instances) - use mocks and fakes as appropriate - but your code
should run and you should be prepared to describe how the production environment
would be architected and deployed. Stellar solutions to this problem may include
Docker Compose stacks or other locally emulated cloud resources.

## Development Notes

-   Nx regards the name of, say, the Auth service as `services-auth` (i.e.
    instead of just `auth` or `services/auth`).
-   A shortcut for creating a new subgraph service is to use the `@nrwl/express`
    generator to create a new service in `apps` like so:

    ```sh
    npx nx g @nrwl/express:app --directory services myservice
    ```

    This command is how the boilerplate for the existing services was created.

-   In a similar vein, the `user-access` library was created using:

    ```sh
    npx nx g @nrwl/node:lib
    ```

-   You may notice that this monorepo is on an older version of Nx. Upgrading
    the dependencies is allowed and even encouraged! Just be prepared to explain
    the changes.
