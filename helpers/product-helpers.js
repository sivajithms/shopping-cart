var db=require('../config/connection')
var collection=require('../config/collections');
const { ObjectId } = require('mongodb');
var objectId=require('mongodb').ObjectId

module.exports={

    addProduct:(product,callback)=>{
        console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data)
            console.log(data.insertedId)

            callback(data.insertedId)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            console.log(proId)
            db.get().collection(collection.PRODUCT_COLLECTIONS).deleteOne({_id:ObjectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    }
}
