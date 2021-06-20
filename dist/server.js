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

/***/ "./src/db.ts":
/*!*******************!*\
  !*** ./src/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.appDb = void 0;\r\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\r\nexports.appDb = new client_1.PrismaClient();\r\n\n\n//# sourceURL=webpack://nexus-prisma-boilerplate/./src/db.ts?");

/***/ }),

/***/ "./src/schema.ts":
/*!***********************!*\
  !*** ./src/schema.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.schema = void 0;\r\nconst nexus_prisma_1 = __webpack_require__(/*! nexus-prisma */ \"nexus-prisma\");\r\nconst nexus_plugin_prisma_1 = __webpack_require__(/*! nexus-plugin-prisma */ \"nexus-plugin-prisma\");\r\nconst nexus_1 = __webpack_require__(/*! nexus */ \"nexus\");\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\n// import { getStoredUser, storeUser } from './customUserResolvers';\r\nexports.schema = nexus_1.makeSchema({\r\n    plugins: [\r\n        nexus_plugin_prisma_1.nexusPrisma({\r\n            experimentalCRUD: true,\r\n        }),\r\n    ],\r\n    outputs: {\r\n        schema: path_1.join(__dirname, 'generated/schema.gen.graphql'),\r\n        typegen: path_1.join(__dirname, 'generated/nexusTypes.gen.ts'),\r\n    },\r\n    // types: [nexusPrisma],\r\n    types: [\r\n        nexus_prisma_1.User,\r\n        // getStoredUser,\r\n        // storeUser,\r\n        nexus_1.objectType({\r\n            name: nexus_prisma_1.User.$name,\r\n            description: nexus_prisma_1.User.$description,\r\n            definition(t) {\r\n                t.field(nexus_prisma_1.User.id.name, { ...nexus_prisma_1.User.id, type: 'Int' });\r\n                t.field(nexus_prisma_1.User.email.name, nexus_prisma_1.User.email);\r\n            },\r\n        }),\r\n        nexus_1.queryType({\r\n            definition(t) {\r\n                t.crud.user();\r\n                t.crud.users();\r\n            },\r\n        }),\r\n        nexus_1.mutationType({\r\n            definition(t) {\r\n                t.crud.createOneUser();\r\n            },\r\n        }),\r\n    ],\r\n});\r\n\n\n//# sourceURL=webpack://nexus-prisma-boilerplate/./src/schema.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst apollo_server_1 = __webpack_require__(/*! apollo-server */ \"apollo-server\");\r\nconst db_1 = __webpack_require__(/*! ./db */ \"./src/db.ts\");\r\nconst schema_1 = __webpack_require__(/*! ./schema */ \"./src/schema.ts\");\r\nconst server = new apollo_server_1.ApolloServer({\r\n    schema: schema_1.schema,\r\n    context: () => {\r\n        return {\r\n            prisma: db_1.appDb,\r\n        };\r\n    },\r\n});\r\nserver.listen().then(({ url }) => {\r\n    console.log(`🚀 Server ready at ${url}`);\r\n});\r\n\n\n//# sourceURL=webpack://nexus-prisma-boilerplate/./src/server.ts?");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");;

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("apollo-server");;

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;