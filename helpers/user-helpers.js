var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('express')
const { use } = require('../routes/user')
var objectId=require('mongodb').ObjectId


module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(userData)
            })  
        })         
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }
        })
    },
    addToCart:(proId,userId)=>{
        let proObj={
            item:objectId(proId),
            quantity:1
        }
        return new Promise(async(resolve,reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(userCart){   
                let proExist=userCart.products.findIndex(product=> product.item==proId)
                console.log(proExist)
                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:objectId(userId),'products.item':objectId(proId)},
                    {
                        $inc:{'products.$.quantity':1}
                    }).then(()=>{
                        resolve() 
                    })
                }else{         
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:objectId(userId)},
                    {                        
                        $push:{products:proObj}                        
                    }
                    ).then((response)=>{
                        resolve()
                    })
                }
                
            }else{
                let cartObj={
                    user:objectId(userId),
                    products:[proObj],
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                }
                
            ]).toArray()
             resolve(cartItems)
        })
    },
    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count=0
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(cart){
            cart.products.forEach(element => {
                count+=element.quantity                
            });
        }
            // if(cart){
            //     count=cart.products.length
            // }
            resolve(count)
        })
    },
    changeProductQuantity:(details)=>{
        let count=parseInt(details.count)
        let quantity=parseInt(details.quantity)
        return new Promise((resolve,reject)=>{
            if(count==-1 && quantity==1){
                db.get().collection(collection.CART_COLLECTION).updateOne({_id:objectId(details.cart)},
                {
                    $pull:{products:{item:objectId(details.product)}}
                }).then((response)=>{
                    console.log(response);
                    resolve({removeProduct:true})
                })
            }else{
            db.get().collection(collection.CART_COLLECTION)
                    .updateOne({_id:objectId(details.cart),'products.item':objectId(details.product)},
                    {
                        $inc:{'products.$.quantity':count}
                    }).then((response)=>{
                        resolve({status:true}) 
                    })
                }
        })
        
    },
    removeProduct:(details)=>{
        return new Promise((resolve,reject)=>{
                db.get().collection(collection.CART_COLLECTION).updateOne({_id:objectId(details.cart)},
                {
                    $pull:{products:{item:objectId(details.product)}}
                }).then((response)=>{
                    console.log(response);
                    resolve({removeProduct:true})
                })
        })

    },
    getTotalAmount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let total=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $multiply: [ "$quantity", { $toDouble: "$product.Price" } ] } }
                      }
                      
                }                
            ]).toArray()   
            console.log('%%$%%%#%#');         
            console.log("total is "+total[0].total);
            resolve(total[0].total);
        })
        
    },
    placeOrder:(order,products,total)=>{
        return new Promise((resolve,reject)=>{ 
            let status=order['payment-method']==='COD'?'placed':'pending'
            let orderObj={
                deliveryDetails:{
                    mobile:order.mobile,
                    address:order.address,
                    pincode:order.pincode

                },
                userId:objectId(order.userId),
                paymentMethod:order['payment-method'],
                products:products,
                totalAmount:total,
                status:status,
                date:new Date()
            }

            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
                db.get().collection(collection.CART_COLLECTION).deleteOne({user:objectId(order.userId)})
                resolve()
            })
        })
    },
    getCartProductList:(userId)=>{
        return new Promise (async(resolve,reject)=>{
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            console.log('hjshjhdjdf'+cart);
            resolve(cart.products)
        })
    },
    getUserOrders:(userId)=>{
        return new Promise(async(resolve,rejecct)=>{
            let orders=await db.get().collection(collection.ORDER_COLLECTION).find({userId:objectId(userId)}).toArray()
            resolve(orders)
        })
    },
    getOrderProducts:(orderId)=>{
        return new Promise(async(resolve,reject)=>{
            let orderItems=await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:objectId(orderId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                }, 
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                }
                
            ]).toArray() 
            console.log(orderItems);
             resolve(orderItems)
        })
        
    }
    

}