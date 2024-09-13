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
        name: 'Xxxtentacion',
        description: 'he was really good and polite',
        image: 'artist1.jpeg',
    },{
        name: 'Kanye West',
        description: 'GOAT ',
        image: 'artist2.jpeg',
    }]);


    const [album1Artist1,album2Artist1,album1Artist2,album2Artist2] = await Album.create([{
        title: '17',
        YearOfProduction: '2017',
        artist: artist1._id,
        image: 'album1_artist1.jpeg',
    }, {
        title: '?',
        YearOfProduction: '2018',
        artist: artist1._id,
        image: 'album2_artist1.jpeg',
        },{
        title: 'Graduation',
        YearOfProduction: '2007',
        artist: artist2._id,
        image: 'album1_artist2.jpeg',
    },{
        title: 'Donda',
        YearOfProduction: '2021',
        artist: artist2._id,
        image: 'album2_artist2.jpeg',
    }]);

    const tracks_5_Album1_Artist1 = await Track.create([{
        name:"Fuck Love",
        length:"2:00",
        album:album1Artist1._id,
    },{
        name:"Jocelyn Flores",
        length:"2:01",
        album:album1Artist1._id,},
        {
            name:"Everybody dies in their nightmares",
            length:"2:02",
            album:album1Artist1._id,
        },{
            name:"Revenge",
            length:"2:03",
            album:album1Artist1._id,
        },{
            name:"Save me",
            length:"2:04",
            album:album1Artist1._id,
        }
    ]);


    const tracks_5_Album2_Artist1 = await Track.create([{
        name:"Moonlight",
        length:"2:00",
        album:album2Artist1._id,
    },{
        name:"Sad!",
        length:"2:01",
        album:album1Artist1._id,},
        {
            name:"Infinity(888)",
            length:"2:02",
            album:album1Artist1._id,
        },{
            name:"Hope",
            length:"2:03",
            album:album1Artist1._id,
        },{
            name:"the remedy for a broken heart",
            length:"2:04",
            album:album1Artist1._id,
        }
    ]);

    const tracks_5_Album1_Artist2 = await Track.create([{
        name:"Good morning",
        length:"2:00",
        album:album1Artist2._id,
    },{
        name:"Stronger",
        length:"2:01",
        album:album1Artist2._id,},
        {
            name:"I wonder",
            length:"2:02",
            album:album1Artist2._id,
        },{
            name:"Flashing lights",
            length:"2:03",
            album:album1Artist2._id,
        },{
            name:"Homecoming",
            length:"2:04",
            album:album1Artist2._id,
        }
    ]);

    const tracks_5_Album2_Artist2 = await Track.create([{
        name:"Off the Grid",
        length:"2:00",
        album:album2Artist2._id,
    },{
        name:"Heaven and Hell",
        length:"2:01",
        album:album2Artist2._id,},
        {
            name:"No Child Left Behind",
            length:"2:02",
            album:album2Artist2._id,
        },{
            name:"Praise God",
            length:"2:03",
            album:album2Artist2._id,
        },{
            name:"Believe what i say",
            length:"2:04",
            album:album2Artist2._id,
        }
    ]);

    await db.close();
};

run().catch(console.error);
