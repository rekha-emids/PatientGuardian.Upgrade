import { IMAGE_IDENTIFIER, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const Image = {
    name: IMAGE_IDENTIFIER,
    primaryKey: 'id',
    properties: {
        image: 'string',
        id: 'int'

    }
}

export function storeImageData(imageData, id) {
    return Realm.open({ path: TABLE_NAME.IMAGE_TABLE, schema: [Image] })
        .then((realm) => {
            const imageObj = realm.objectForPrimaryKey(IMAGE_IDENTIFIER, id);

            realm.write(() => {
                if (imageObj) {
                    imageObj.image = JSON.stringify(imageData)
                } else {
                    realm.create(IMAGE_IDENTIFIER, {
                        image: JSON.stringify(imageData),
                        id
                    })
                }
            });
        })
.catch((err) => {
            throw err
        })
}
export function getOfflineImage(id) {
    return Realm.open({ path: TABLE_NAME.IMAGE_TABLE, schema: [Image] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(IMAGE_IDENTIFIER, id);

            return JSON.parse(data.image);
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflineImage(){
    Realm.open({path: TABLE_NAME.IMAGE_TABLE,  schema: [Image] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(IMAGE_IDENTIFIER);

                realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
 throw err; 
})
}