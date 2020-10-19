"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const router = express_1.Router();
router.get('/user', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const dataGog = yield node_fetch_1.default('https://embed.gog.com/users/info/48800609011490?expand=friendStatus,wishlistStatus,blockedStatus')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const dataSteam = yield node_fetch_1.default('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=76561197996442713')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const { personaname, profileurl, avatarmedium } = dataSteam.response.players[0];
    const formattedDataUser = [
        {
            username: dataGog.username,
            avatar: dataGog.avatars.medium,
            profileUrl: 'https://www.gog.com/feed'
        },
        {
            username: personaname,
            profileUrl: profileurl,
            avatar: avatarmedium,
        }
    ];
    res.send(formattedDataUser);
}));
router.get('/friends', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const datas = yield node_fetch_1.default('https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&relationship=friend')
        .then(resp => resp.json())
        .catch(err => console.log(err));
    const formattedDataFriends = yield Promise.all(datas.friendslist.friends.map((friend) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield node_fetch_1.default(encodeURI(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=${friend.steamid}`));
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
exports.default = router;
//# sourceMappingURL=users.js.map