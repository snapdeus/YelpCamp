const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //seeding objectid of a user to seed
            author: "615ddfeb95e7a81f8f805221",
            location: `${ cities[random1000].city }, ${ cities[random1000].state }`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [

                {

                    url: 'https://res.cloudinary.com/dcyyylsmi/image/upload/v1633632288/YelpCamp/lsj27zakczzchir2lzmf.jpg',
                    filename: 'YelpCamp/lsj27zakczzchir2lzmf'
                },
                {

                    url: 'https://res.cloudinary.com/dcyyylsmi/image/upload/v1633632287/YelpCamp/sjtt1qooum9w7kntv8hf.jpg',
                    filename: 'YelpCamp/sjtt1qooum9w7kntv8hf'
                },
                {

                    url: 'https://res.cloudinary.com/dcyyylsmi/image/upload/v1633632288/YelpCamp/idhsd6naxxlebwvdr657.png',
                    filename: 'YelpCamp/idhsd6naxxlebwvdr657'
                }
            ],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis magni vitae exercitationem doloribus officiis ipsam vero. Reiciendis sequi recusandae, officiis numquam ullam corrupti quisquam iure id sint rem alias",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})