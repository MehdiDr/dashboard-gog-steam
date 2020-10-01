"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const router = express_1.Router();
router.get('/user', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const data = yield node_fetch_1.default('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=76561197996442713')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const { personaname, profileurl, avatarmedium } = data.response.players[0];
    const formattedDataUser = [{
            username: personaname,
            profileUrl: profileurl,
            avatar: avatarmedium,
        }];
    res.send(formattedDataUser);
}));
router.get('/wishlist', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const urls = [
        'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0',
        'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1'
    ];
    const data = yield Promise.all(urls.map(url => node_fetch_1.default(url)
        .then(resp => resp.json())
        .catch(err => console.log(err))));
    const getGamesFromWishlist = (data) => {
        const getGamesList = data.reduce((acc, x) => {
            for (let key in x)
                acc[key] = x[key];
            return acc;
        }, {});
        return Object.values(getGamesList).map(({ capsule, name, release_date, subs, review_desc }) => {
            return {
                name,
                logo: capsule,
                linkToShop: capsule && `https://store.steampowered.com/app/${capsule.match(/\d+/g)}/${name}`,
                releaseDate: release_date,
                price: subs && subs.length > 0 && (subs[0].price / 100),
                discount: subs && subs.length > 0 && subs[0].discount_pct,
                reviews: review_desc,
                platform: 'steam'
            };
        });
    };
    res.send(getGamesFromWishlist(data));
}));
router.get('/friends', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const datas = yield node_fetch_1.default('http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&relationship=friend')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const formattedDataFriends = yield Promise.all(datas.friendslist.friends.map((friend) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield node_fetch_1.default(encodeURI(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=${friend.steamid}`));
            const data = yield resp.json();
            const { personaname, avatarfull, lastlogoff, loccountrycode, profileurl, steamid, timecreated } = data.response.players[0];
            return {
                username: personaname,
                avatar: avatarfull,
                lastLog: lastlogoff,
                joined: timecreated,
                country: loccountrycode,
                profileUrl: profileurl,
                steamId: steamid
            };
        }
        catch (e) {
            console.log(e);
        }
    })));
    res.send(formattedDataFriends);
}));
router.get('/friend/:steamid', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { steamid } = req.params;
    const urls = [
        `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=0`,
        `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=1`
    ];
    const data = yield Promise.all(urls.map(url => node_fetch_1.default(url)
        .then(resp => resp.json())
        .catch(err => console.log(err))));
    const getGamesFromWishlist = (data) => {
        const getGamesList = data.reduce((acc, x) => {
            for (let key in x)
                acc[key] = x[key];
            return acc;
        }, {});
        return Object.values(getGamesList).map(({ capsule, name, release_date, subs, review_desc }) => {
            return {
                name,
                logo: capsule,
                linkToShop: capsule && `https://store.steampowered.com/app/${capsule.match(/\d+/g)}/${name}`,
                releaseDate: release_date,
                price: subs && subs.length > 0 && (subs[0].price / 100),
                discount: subs && subs.length > 0 && subs[0].discount_pct,
                reviews: review_desc,
                platform: 'steam'
            };
        });
    };
    res.send(getGamesFromWishlist(data));
}));
exports.default = router;
//# sourceMappingURL=steamGames.js.map