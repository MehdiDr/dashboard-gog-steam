"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_1 = tslib_1.__importDefault(require("express"));
require("express-async-errors");
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default({ origin: 'https://dashboard-client.vercel.app/' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use('/api', cors_1.default(), routes_1.default);
app.get('/', cors_1.default(), (req, res) => {
    res.send('root route');
});
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
if (!process.env.IS_NOW) {
    const PORT = process.env.PORT || '9000';
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map