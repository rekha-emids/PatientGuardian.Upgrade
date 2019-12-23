import { TABLE_NAME, INTRO_VIDEO_IDENTIFIER } from '../../constants/constants';

const Realm = require('realm');
const IntroVideo = {
    name: INTRO_VIDEO_IDENTIFIER,
    properties: {
        introVideoLink: 'string?',
        isIntroVideoPlayed: 'bool?'

    }
}

export function storeIntroVideo(url, isVideoPlayed) {
    return Realm.open({ path: TABLE_NAME.INTRO_VIDEO_TABLE, schema: [IntroVideo] })
        .then((realm) => {
            let dbUrlData = realm.objects(INTRO_VIDEO_IDENTIFIER);

            realm.write(() => {
                if (dbUrlData[0]) {
                    dbUrlData[0].introVideoLink = url,
                    dbUrlData[0].isIntroVideoPlayed = isVideoPlayed
                } else {
                    let newDbUrlObj = realm.create(INTRO_VIDEO_IDENTIFIER, {
                        introVideoLink: url,
                        isIntroVideoPlayed: isVideoPlayed
                    })
                }
            });
            getIntroVideo()
            return dbUrlData;
        }).catch((err) => {
            throw err;
        })
}
export function updateIntroVideoPlayedStatus(isVideoPlayed){
    return Realm.open({ path: TABLE_NAME.INTRO_VIDEO_TABLE, schema: [IntroVideo] })
        .then((realm) => {
            let dbUrlData = realm.objects(INTRO_VIDEO_IDENTIFIER);

            realm.write(() => {
                if (dbUrlData && dbUrlData[0]) {
                    dbUrlData[0].isIntroVideoPlayed = isVideoPlayed
                }
            });
            return dbUrlData;
        }).catch((err) => {
            throw err;
        })
}
export function getIntroVideo() {
    let realmPromise = Realm.open({ path: TABLE_NAME.INTRO_VIDEO_TABLE, schema: [IntroVideo] })
        .then((realm) => {
            let data = realm.objects(INTRO_VIDEO_IDENTIFIER);

            return data && data[0] ? data[0] : {};
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}
