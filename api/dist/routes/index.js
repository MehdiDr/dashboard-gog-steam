"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const steamGames_1 = tslib_1.__importDefault(require("./steamGames"));
const gogGames_1 = tslib_1.__importDefault(require("./gogGames"));
const router = express_1.Router();
router.use('/steam', steamGames_1.default);
router.use('/gog', gogGames_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map