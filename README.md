# Supertest JavaScript API Reference

A JavaScript reference architecture for API test automation with Supertest, Mocha, Chai, Joi, reusable endpoint modules, response contract validation, and CI execution.

## Design principles

- **Tests describe behavior:** status, payload, and contract expectations belong in `*.spec.js` files.
- **Endpoints encapsulate API interactions:** each resource file keeps its path and HTTP request functions together.
- **The API client stays focused:** it centralizes only the base URL and shared Supertest instance.
- **Test data stays explicit:** request payload builders, exact expected responses, and response schemas have separate responsibilities.
- **Tests remain deterministic:** scenarios use known records rather than random identifiers.
- **Configuration fails fast:** required environment variables are validated with actionable messages.

## Prerequisites

- Node.js 24 LTS
- npm
- A free [ReqRes API key](https://reqres.in/signup)

The repository includes an `.nvmrc` file so compatible version managers such as nvm or fnm can select Node.js 24 with `nvm use` or `fnm use`.

## Getting started

```bash
git clone https://github.com/lucas-porto1/supertest-api-js.git
cd supertest-api-js
npm ci
```

Create the local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Replace `API_KEY` with a key from ReqRes. Never commit `.env` or real API keys.

## Running the tests

```bash
npm test                  # run the complete API suite
npm run test:watch        # rerun tests when files change
npm run lint              # static analysis
npm run format            # format project files
npm run format:check      # verify formatting without changing files
npm run check             # lint, formatting, and tests
```

## Project structure

```text
.
|-- .github/workflows/            # continuous integration pipeline
|-- config/                        # validated environment configuration
|-- core/                          # shared Supertest instance and base URL
|-- endpoints/                     # resource files with paths and HTTP request functions
|   |-- auth/
|   |   |-- login.js
|   |   `-- register.js
|   `-- users/
|       `-- users.js
|-- test-data/
|   |-- requests/                  # request payload builders
|   `-- responses/
|       |-- expected/              # exact response bodies used in assertions
|       `-- schemas/               # Joi response contracts
|-- tests/                         # behavior-focused API scenarios
|-- eslint.config.js               # JavaScript quality rules
`-- package.json                   # scripts and dependencies
```

## Request flow

```text
Test -> Endpoint -> API client
```

For example, a test calls `postLogin()` from `endpoints/auth/login.js`. That file keeps the `/login` path and the complete request construction together, while `core/apiClient.js` only provides the Supertest instance with the configured base URL.

## Payload strategies

The project demonstrates two payload factory strategies for different testing needs:

- `createAuthPayload()` adds only explicitly provided fields. This is useful for small payloads and negative scenarios that distinguish an omitted field from `null` or an empty value.
- `createUserPayload()` starts with complete valid defaults and accepts overrides, including a nested address merge. This keeps large positive payloads readable when each scenario changes only a few values.

Choose the simplest strategy that matches the payload and scenario instead of forcing every request through one generic builder.

## Adding an endpoint

1. Create or update the resource file in `endpoints/`, keeping its path and supported HTTP methods together.
2. Add request payload builders or expected responses only when they are reused or improve readability.
3. Add or update a Joi schema for the response contract.
4. Write behavior and assertions in a `*.spec.js` file under the relevant domain in `tests/`.
5. Run `npm run check` before submitting the change.

## CI configuration

The workflow runs linting, formatting validation, and API tests on pushes and pull requests. Add the ReqRes key as a GitHub Actions repository secret named `REQRES_API_KEY` before running the workflow.

Public example credentials can remain in the workflow, but API keys and credentials for real systems must always use repository secrets.
