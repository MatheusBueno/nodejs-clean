import ExpressWebServer from "./infrastructures/express-server";

import EnvironmentVariables from "./infrastructures/environment-variables";
import JsonWebToken from "./infrastructures/json-web-token";
import MongoDb from "./infrastructures/mongodb";
import UniqueId from "./infrastructures/unique-id";

import AuthenticationInterface from "./interfaces/authentication";
import ConfigurationInterface from "./interfaces/configuration";
import DatabaseInterface from "./interfaces/database";
import WebServerInterface from "./interfaces/webserver";

import ConfigurationInteractor from "./usecases/configuration";
import VersionInteractor from "./usecases/version";
import UserInteractor from "./usecases/user";

const environmentVariable = new EnvironmentVariables();
const configurationInterface = new ConfigurationInterface({
  ConfigurationAdapter: environmentVariable,
});

const configurationInteractor = new ConfigurationInteractor({
  ConfigurationInterface: configurationInterface,
});

const configuraionData = configurationInteractor.load();

// Print out the current configuration data for testing purpose
console.log(configuraionData.toString());

const authenticationInterface = new AuthenticationInterface({
  UniqueIdAdapter: UniqueId,
  WebTokenAdapter: JsonWebToken,
});

const databaseInterface = new DatabaseInterface({
  DatabaseAdapter: MongoDb,
});

const userInteractor = new UserInteractor({
  ConfigurationData: configuraionData,
  AuthenticationInterface: authenticationInterface,
  DatabaseInterface: databaseInterface,
});

const output = userInteractor.createNewEmailUser({
  Email: "someone@somewhere.net",
  Password: "secret",
});

console.log(JSON.stringify(output, null, 2));

const versionInteractor = new VersionInteractor();
const webserverInterface = new WebServerInterface({
  VersionInteractor: versionInteractor,
});

const expressWebServer = new ExpressWebServer({
  WebServerInterface: webserverInterface,
});

expressWebServer.start();
