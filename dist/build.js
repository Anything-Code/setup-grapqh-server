/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n// @ts-ignore\r\nconst connect_sqlite3_1 = __importDefault(__webpack_require__(/*! connect-sqlite3 */ \"connect-sqlite3\"));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst express_session_1 = __importDefault(__webpack_require__(/*! express-session */ \"express-session\"));\r\nconst apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nconst prisma_client_1 = __webpack_require__(/*! ./prisma-client */ \"./src/prisma-client.ts\");\r\nconst schema_1 = __webpack_require__(/*! ./schema */ \"./src/schema.ts\");\r\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\ndotenv_1.default.config();\r\n// I like to use redis for this: https://github.com/tj/connect-redis\r\nconst SQLiteStore = connect_sqlite3_1.default(express_session_1.default);\r\nconst app = express_1.default();\r\napp.use(express_session_1.default({\r\n    store: new SQLiteStore({\r\n        db: './prisma/db.db',\r\n        concurrentDB: true,\r\n    }),\r\n    name: 'qid',\r\n    secret: process.env.SESSION_SECRET || 'secret',\r\n    resave: false,\r\n    saveUninitialized: false,\r\n    cookie: {\r\n        httpOnly: true,\r\n        secure: \"development\" === 'production',\r\n        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years\r\n    },\r\n}));\r\nconst apolloServer = new apollo_server_express_1.ApolloServer({\r\n    schema: schema_1.schema,\r\n    context: ({ req, res }) => ({\r\n        req,\r\n        res,\r\n        prisma: prisma_client_1.pc,\r\n        playground: {\r\n            settings: {\r\n                'request.credentials': 'include',\r\n            },\r\n        },\r\n    }),\r\n});\r\napolloServer.applyMiddleware({ app, cors: false });\r\nconst port = process.env.PORT || 4000;\r\napp.listen(port, () => {\r\n    console.log(`Server started at http://localhost:${port}/graphql`);\r\n});\r\n\n\n//# sourceURL=webpack://setup-graphql-server/./src/index.ts?");

/***/ }),

/***/ "./src/prisma-client.ts":
/*!******************************!*\
  !*** ./src/prisma-client.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.pc = void 0;\r\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\r\nexports.pc = new client_1.PrismaClient();\r\n\n\n//# sourceURL=webpack://setup-graphql-server/./src/prisma-client.ts?");

/***/ }),

/***/ "./src/schema.ts":
/*!***********************!*\
  !*** ./src/schema.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.schema = void 0;\r\nconst nexus_prisma_1 = __webpack_require__(/*! nexus-prisma */ \"nexus-prisma\");\r\nconst nexus_plugin_prisma_1 = __webpack_require__(/*! nexus-plugin-prisma */ \"nexus-plugin-prisma\");\r\nconst nexus_1 = __webpack_require__(/*! nexus */ \"nexus\");\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\n// import { getStoredUser, storeUser } from './customUserResolvers';\r\nexports.schema = nexus_1.makeSchema({\r\n    plugins: [\r\n        nexus_plugin_prisma_1.nexusPrisma({\r\n            experimentalCRUD: true,\r\n        }),\r\n    ],\r\n    outputs: {\r\n        typegen: path_1.join(process.cwd(), 'src', 'types', 'generated', 'nexus.d.ts'),\r\n        schema: path_1.join(process.cwd(), 'src', 'types', 'generated', 'schema.graphql'),\r\n    },\r\n    types: [\r\n        nexus_1.objectType({\r\n            name: nexus_prisma_1.User.$name,\r\n            description: nexus_prisma_1.User.$description,\r\n            definition(t) {\r\n                t.field(nexus_prisma_1.User.id.name, nexus_prisma_1.User.id);\r\n                t.field(nexus_prisma_1.User.name.name, nexus_prisma_1.User.name);\r\n                t.field(nexus_prisma_1.User.email.name, nexus_prisma_1.User.email);\r\n                t.field(nexus_prisma_1.User.password.name, nexus_prisma_1.User.password);\r\n            },\r\n        }),\r\n        nexus_1.queryType({\r\n            definition(t) {\r\n                t.crud.users();\r\n                t.crud.user();\r\n            },\r\n        }),\r\n        nexus_1.mutationType({\r\n            definition(t) {\r\n                t.crud.createOneUser();\r\n                t.crud.upsertOneUser();\r\n                t.crud.updateOneUser();\r\n                t.crud.deleteOneUser();\r\n            },\r\n        }),\r\n    ],\r\n});\r\n\n\n//# sourceURL=webpack://setup-graphql-server/./src/schema.ts?");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");;

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");;

/***/ }),

/***/ "connect-sqlite3":
/*!**********************************!*\
  !*** external "connect-sqlite3" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("connect-sqlite3");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");;

/***/ }),

/***/ "nexus":
/*!************************!*\
  !*** external "nexus" ***!
  \************************/
/***/ ((module) => {

module.exports = require("nexus");;

/***/ }),

/***/ "nexus-plugin-prisma":
/*!**************************************!*\
  !*** external "nexus-plugin-prisma" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("nexus-plugin-prisma");;

/***/ }),

/***/ "nexus-prisma":
/*!*******************************!*\
  !*** external "nexus-prisma" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("nexus-prisma");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;