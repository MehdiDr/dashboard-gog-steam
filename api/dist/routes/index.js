"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const games_1 = tslib_1.__importDefault(require("./games"));
const users_1 = tslib_1.__importDefault(require("./users"));
const router = express_1.Router();
router.use('/games', games_1.default);
router.use('/users', users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map