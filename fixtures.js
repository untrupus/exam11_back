const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const TrackHistory = require("./models/TrackHistory");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("albums");
        await db.dropCollection("artists");
        await db.dropCollection("users");
        await db.dropCollection("tracks");
        await db.dropCollection("trackhistories");
    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [death, nin, morfer] = await Artist.create({
        name: "Death",
        image: "death.jpg"
    }, {
        name: "NIN",
        image: "nin.png"
    },{
        name: "Morfer",
        image: "morfer.png"
    });

    const [human, symbolic, spiral, tribunal] = await Album.create({
        name: "Human",
        year: 1991,
        artist: death._id,
        image: "Human.jpg"
    }, {
        name: "Symbolic",
        year: 1995,
        artist: death._id,
        image: "symbolic.jpg"
    }, {
        name: "The Downward Spiral",
        year: 1994,
        artist: nin._id,
        image: "downward.jpg"
    }, {
        name: "Tribunal",
        year: 2020,
        artist: morfer._id,
        image: "tribunal.png"
    });

    const [lack, see, sacred, crystal, hurt, vandallen] = await Track.create({
            name: "Lack Of Comprehension",
            duration: "3.47",
            album: human._id,
            number: 5,
            youtube: "7j8vUbMmOwM"
        }, {
            name: "See Through Dreams",
            duration: "3.56",
            album: human._id,
            number: 6,
        }, {
            name: "Sacred Serenity",
            duration: "4.29",
            album: symbolic._id,
            number: 3,
            youtube: "-as4LausEok"
        }, {
            name: "Crystal mountain",
            duration: "5.07",
            album: symbolic._id,
            number: 6,
            youtube: "zguCFjHyVeM"
        }, {
            name: "Hurt",
            duration: "3.56",
            album: spiral._id,
            number: 6,
            youtube: "6oGqIfnIAEA"
        }, {
            name: "Vandallen",
            duration: "6.29",
            album: tribunal._id,
            number: 666,
            youtube: "4A2N2u9ee1o"
        },
    );


    const [user, user1] = await User.create({
        username: "user",
        password: "123",
        token: nanoid()
    }, {
        username: "user1",
        password: "123",
        token: nanoid()
    });

    await TrackHistory.create({
            user: user._id,
            track: lack._id,
            datetime: "Wed Nov 18 2020 01:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user._id,
            track: see._id,
            datetime: "Wed Nov 18 2020 02:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user._id,
            track: sacred._id,
            datetime: "Wed Nov 18 2020 03:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user1._id,
            track: crystal._id,
            datetime: "Wed Nov 18 2020 04:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user1._id,
            track: hurt._id,
            datetime: "Wed Nov 18 2020 05:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user1._id,
            track: vandallen._id,
            datetime: "Wed Nov 18 2020 05:19:36 GMT+0600 (Kyrgyzstan Time)"
        },
    );

    db.close();
});