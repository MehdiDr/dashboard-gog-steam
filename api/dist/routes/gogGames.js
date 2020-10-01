"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const router = express_1.Router();
router.get('/user', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const datas = yield node_fetch_1.default('https://embed.gog.com//users/info/48800609011490?expand=friendStatus,wishlistStatus,blockedStatus')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const formattedData = [{
            username: datas.username,
            avatar: datas.avatars.medium,
            profileUrl: 'https://www.gog.com/feed'
        }];
    res.send(formattedData);
}));
router.get('/wishlist', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = yield node_fetch_1.default('https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=refresh_token&code=0EOAkRSp2r3ITKWojCBPJTaAPsrSQ7CTL9EsDS_lOKcTgkeUUtlK7uizvcklp0oioPVeo-czpuX3qgqOQTLgoUZfRk0RSRbkn9r_0odU6E-SFd6E8OURLgCIAZR6Q69jdlmWHAR079PIUknySUKzGgqDB9Gg6pEbibmUJTIPgWM&refresh_token=AaAHnHnE3FNMYwVEm0MBDm-vgqcQ84uoRQ0iFWu5D1CmOVNqGpADZNEBXDMN_x_0')
        .then(resp => resp.json())
        .then(resp => resp.access_token)
        .catch(err => console.log(err));
    const wishlistData = yield node_fetch_1.default('https://embed.gog.com/user/wishlist.json', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const idsGames = Object.keys(wishlistData.wishlist);
    const gamesNamesArray = yield Promise.all(idsGames.map((id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield node_fetch_1.default(encodeURI(`https://api.gog.com/products/${id}?expand=downloads,expanded_dlcs,description,screenshots,videos,related_products,changelog`), {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = yield resp.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    })));
    const gamesInfosArray = yield Promise.all(gamesNamesArray.map(({ title, images }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield node_fetch_1.default(encodeURI(`https://embed.gog.com/games/ajax/filtered?mediaType=game&search=${title}`), {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = yield resp.json();
            return { data, images };
        }
        catch (e) {
            console.log(e);
        }
    })));
    const formattedData = gamesInfosArray.map(game => {
        var _a, _b, _c;
        if (!(((_a = game === null || game === void 0 ? void 0 : game.data) === null || _a === void 0 ? void 0 : _a.products.length) > 0))
            return null;
        const { title, url, releaseDate, price, rating } = (_b = game === null || game === void 0 ? void 0 : game.data) === null || _b === void 0 ? void 0 : _b.products[0];
        return {
            name: title,
            logo: `http://${(_c = game === null || game === void 0 ? void 0 : game.images) === null || _c === void 0 ? void 0 : _c.logo2x.slice(2)}`,
            linkToShop: `https://gog.com/${url}`,
            releaseDate,
            price: price.amount,
            discount: price.discountPercentage,
            reviews: rating,
            platform: 'gog'
        };
    });
    res.send(formattedData);
}));
exports.default = router;
//# sourceMappingURL=gogGames.js.map