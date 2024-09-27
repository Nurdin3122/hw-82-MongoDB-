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


    const users = await User.create({
        username: 'User',
        password: '0555',
        token: crypto.randomUUID(),
        role: "user",
    }, {
        username:"Admin",
        password: "1@345qWert",
        token: crypto.randomUUID(),
        role: "admin"
    });


    const [artist1,artist2,artist3] = await Artist.create([{
        name: 'Xxxtentacion',
        description: 'he was really good and polite',
        image: 'artist1.jpeg',
        isPublished:true,
    },{
        name: 'Kanye West',
        description: 'GOAT ',
        image: 'artist2.jpeg',
        isPublished:true,
    },{
        name: 'Kendrick Lamar',
        description: 'musician',
        image: 'artist3.jpg',
        isPublished:false,
    }]);


    const [album1Artist1,album2Artist1,album1Artist2,album2Artist2,album1Artist3] = await Album.create([{
        title: '17',
        YearOfProduction: 2017,
        artist: artist1._id,
        image: 'album1_artist1.jpeg',
        isPublished:true,
    }, {
        title: '?',
        YearOfProduction: 2018,
        artist: artist1._id,
        image: 'album2_artist1.jpeg',
        isPublished:true,
        },{
        title: 'Graduation',
        YearOfProduction: 2007,
        artist: artist2._id,
        image: 'album1_artist2.jpeg',
        isPublished:true,
    },{
        title: 'Donda',
        YearOfProduction: 2021,
        artist: artist2._id,
        image: 'album2_artist2.jpeg',
        isPublished:true,
    },{
        title: 'Damn.',
        YearOfProduction: 2017,
        artist: artist3._id,
        image: 'album1_artist3.jpg',
        isPublished:false,
    }]);

    const tracks_5_Album1_Artist1 = await Track.create([{
        name:"Fuck Love",
        length:"2:00",
        album:album1Artist1._id,
        number:1,
        isPublished:true,
    },{
        name:"Jocelyn Flores",
        length:"2:01",
        album:album1Artist1._id,
        number: 2,
        isPublished:true,
    },{
            name:"Everybody dies in their nightmares",
            length:"2:02",
            album:album1Artist1._id,
            number: 3,
        isPublished:true,
        },{
            name:"Revenge",
            length:"2:03",
            album:album1Artist1._id,
            number: 4,
        isPublished:true,
        },{
            name:"Save me",
            length:"2:04",
            album:album1Artist1._id,
            number: 5,
        isPublished:true,
        }
    ]);


    const tracks_5_Album2_Artist1 = await Track.create([{
        name:"Moonlight",
        length:"2:00",
        album:album2Artist1._id,
        number:1,
        isPublished:true,
    },{
        name:"Sad!",
        length:"2:01",
        album:album2Artist1._id,
        number:2,
        isPublished:true,
    }, {
            name:"Infinity(888)",
            length:"2:02",
            album:album2Artist1._id,
            number:3,
        isPublished:true,
        },{
            name:"Hope",
            length:"2:03",
            album:album2Artist1._id,
            number:4,
        isPublished:true,
        },{
            name:"the remedy for a broken heart",
            length:"2:04",
            album:album2Artist1._id,
            number: 5,
        isPublished:true,
        }
    ]);

    const tracks_5_Album1_Artist2 = await Track.create([{
        name:"Good morning",
        length:"2:00",
        album:album1Artist2._id,
        number:1,
        isPublished:true,
    },{
        name:"Stronger",
        length:"2:01",
        album:album1Artist2._id,
        number:2,
        isPublished:true,
    }, {
            name:"I wonder",
            length:"2:02",
            album:album1Artist2._id,
            number:3,
        isPublished:true,
        },{
            name:"Flashing lights",
            length:"2:03",
            album:album1Artist2._id,
            number:4,
        isPublished:true,
        },{
            name:"Homecoming",
            length:"2:04",
            album:album1Artist2._id,
            number:5,
        isPublished:true,
        }
    ]);

    const tracks_5_Album2_Artist2 = await Track.create([{
        name:"Off the Grid",
        length:"2:00",
        album:album2Artist2._id,
        number:1,
        isPublished:true,
    },{
        name:"Heaven and Hell",
        length:"2:01",
        album:album2Artist2._id,
        number:2,
        isPublished:true,
    }, {
            name:"No Child Left Behind",
            length:"2:02",
            album:album2Artist2._id,
            number:3,
        isPublished:true,
        },{
            name:"Praise God",
            length:"2:03",
            album:album2Artist2._id,
            number:4,
        isPublished:true,
        },{
            name:"Believe what i say",
            length:"2:04",
            album:album2Artist2._id,
            number:5,
        isPublished:true,
        }
    ]);

    const tracks_3_Album1_Artist3 = await Track.create([{
        name:"HUMBLE",
        length:"2:57",
        album:album1Artist3._id,
        number:1,
        isPublished:false,
    },{
        name:"LOVE.FEAT.ZACARI.",
        length:"2:01",
        album:album1Artist3._id,
        number:2,
        isPublished:false,
    }, {
        name:"PRIDE",
        length:"2:02",
        album:album1Artist3._id,
        number:3,
        isPublished:false,
    }]);


    await db.close();
};

run().catch(console.error);
