# Requirements
This projects uses Node 20 and npm

# Quickstart

To start playing with the snippet it's neccesary to setup the environment variables from .env file. There we can set vars important for MongoDB's and OpenAI's connection.

## OPENAI_APIKEY
This one is a string you can find in the OpenAI. You'll have to create an account and get in the configuration to create a project get the associated apikey of that project.

## OPENAI_MODEL
In this field I would recommend to use gpt-4.1-nano-2025-04-14 or any other model in the platform that does not need billing configuration.

## OPENAI_PROMPT
This is the general instruction you will command to you model on how to reply to future messages.
For mongo data: You can create a mongodb cluster in Mongo Atlas and connect to it by using the connection parameters as env vars.

## MONGO_INITDB_ROOT_USERNAME
Username of the mongo instance so you can login through the backend
## MONGO_INITDB_ROOT_PASSWORD
Password of the mongo instance.
## MONGO_APP_NAME
Name of the mongo cluster. You must choose one for yours.
## MONGO_HOSTNAME
Hostname in which the mongo instance/cluster lives. It looks like a criptyc string most of the times.

After setting all of those environment variables your are free to execute commands! Like the following:

```sh
  docker compose build && docker compose up
```

After that your container should be ready to accept requests. Also you can run it with `npm ci && npm start` if you are feeling lucky.

The app should be running at the URL [http://localhost:3000](http://localhost:3000).

### Endpoints
  There's two endpoints of interest in this app:
#### Snippet/:id GET
You can get any snipper previously created by giving its _id_

```sh
curl http://localhost:3000/snippet/68376b5359b8d84aa63d33de
```

#### Snippet POST
With the following curl request you can access the API for OpenAI

```sh
curl -X POST http://localhost:3000/snippet/ -H "Content-Type: application/json" -d '{"text":"This is a test to see if you fall for it"}'
```

# Reflection

If I had more time I would have created a unit test for the function in the Snippet controller responsible to handle the OpenAI stream. I would had created a new file so all controllers could register their endpoint in the Express Router.
I would had used more specific types for OpenAI's response.
I would had created a more robust way to build the project and deploy it somewhere in a container. I would had added more null/undefined checks.
