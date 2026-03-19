# Marvin Rendering Backend

Marvin Rendering Backend is a backend service for rendering chemical structure images in the new Marvin style. It exposes image generation functionality through a REST API.
In conjuction with Marvin Backend, the image generation is supported from different chemical formats such as SMILES, CXON, MRV...

This project provides a docker compose file that encapsulates `marvin-rendering-backend` and `marvin-backend` services.

# Logging into JFrog Artifactory with Docker

To pull Docker images from a private JFrog repository, you need to authenticate using your **username + identity token**.

1. Generate an **Identity Token** in JFrog:
   - Follow JFrog's guide to generate an [Identity token](https://docs.jfrog.com/user-management/docs/identity-tokens).
2. Use your identiy token as password during login

## Running the services

1. docker login `chemaxon.jfrog.io`
2. set `CHEMAXON_LICENSE_SERVER_KEY` environment variable to your license key
2. Run `docker compose up` . It downloads the latest images of `marvin-rendering-backend` and `marvin-backend` components, then starts the docker containers.
3. By default, rendering service is exposed to `http://localhost:3000`.
