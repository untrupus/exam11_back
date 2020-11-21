const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
        await db.dropCollection("products");

    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [user, user1] = await User.create({
        username: "user",
        password: "123",
        displayName: "User",
        phone: 7722343454,
        token: nanoid()
    }, {
        username: "user1",
        password: "123",
        displayName: "User1",
        phone: 7722343454,
        token: nanoid()
    });

    await Product.create({
            title: "Mercedes w220",
            category: "cars",
            user: user._id,
            price: 225,
            description: "product description",
            image: "car.jpg"
        }, {
            title: "Desert Eagle",
            category: "guns",
            user: user._id,
            price: 567,
            description: "product description",
            image: "gun.jpg"
        },{
            title: "Jeans",
            category: "clothes",
            user: user1._id,
            price: 123,
            description: "product description",
            image: "cloth.jpg"
        },{
            title: "Toyota Camry",
            category: "cars",
            user: user1._id,
            price: 225,
            description: "product description",
            image: "car.jpg"
        },{
            title: "Makarov",
            category: "guns",
            user: user._id,
            price: 8900,
            description: "product description",
            image: "gun.jpg"
        },{
            title: "Moskvitch 412",
            category: "cars",
            user: user._id,
            price: 345,
            description: "product description",
        },{
            title: "MacBook Pro",
            category: "computers",
            user: user1._id,
            price: 225,
            description: "product description",
            image: "comp.jpg"
        },
    );
    db.close();
});