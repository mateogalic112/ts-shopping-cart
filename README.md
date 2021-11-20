# Shopping Cart

This project is build with `React.js` and `Typescript` on _frontend_ and `Node.js`, `Express.js`, `MongoDB` on _backend_ side.

## Run project in development

Create `.env` file in _root_ directory and fill **MONGO_URI** field. Example of `.env` file can be found in `.env.example` file in _root_ directory.

Next, you need to install necessary packages for both _frontend_ and _backend_ folders.

Position yourself in **root** project directory and run following command

> npm install

Next, position yourself one directory above, in `./frontend` folder

Inside of here run the same command, which will install packages that frontend depends on

> npm install

Project is using `concurently` library for running _frontend_ and _backend_ code with a single command.

Navigate to project folder and run following:

If using **yarn** please run

> yarn dev

If using **npm** please run

> npm run dev
