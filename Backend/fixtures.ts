import mongoose from 'mongoose';
import config from './config';
import User from './models/Users';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from "./models/Track";
import crypto from 'crypto';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }


    const user = await User.create({
        username: 'User',
        password: '0555',
        token: crypto.randomUUID(),
    });


    const [artist1,artist2] = await Artist.create([{
        name: 'Artist One',
        description: 'The first artist',
        image: 'artist1.jpeg',
    },{
        name: 'Artist Two',
        description: 'The second artist',
        image: 'artist2.jpeg',
    }]);


    const [album1Artist1,album2Artist1,album3Artist2,album4Artist2] = await Album.create([{
        title: '1 Album artist 1',
        YearOfProduction: '2020',
        artist: artist1._id,
        image: 'album1.jpeg',
    }, {
        title: '2 Album artist 1',
        YearOfProduction: '2021',
        artist: artist1._id,
        image: 'album1.jpeg',
        },{
        title: '1 Album artist 2',
        YearOfProduction: '2021',
        artist: artist2._id,
        image: 'album2.jpeg',
    },{
        title: '2 Album artist 2',
        YearOfProduction: '2021',
        artist: artist2._id,
        image: 'album2.jpeg',
    }]);

    const track1Album1 = await Track.create([{
        name:"1 track album1",
            length:"2:00",
        album:album1Artist1._id,
    },{
        name:"2 track album1",
        length:"2:01",
        album:album1Artist1._id,},
        {
            name:"3 track album1",
            length:"2:02",
            album:album1Artist1._id,
        },{
            name:"4 track album1",
            length:"2:03",
            album:album1Artist1._id,
        },{
            name:"5 track album1",
            length:"2:04",
            album:album1Artist1._id,
        }
    ]);
    await db.close();
};

run().catch(console.error);
