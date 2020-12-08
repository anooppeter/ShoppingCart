var db = require("../config/connection");
var collection = require("../config/collections");
module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("items")
      .insertOne(product)
      .then((data) => {
        callback(data.ops[0]._id);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find()
        .toArray();
      resolve(products);
    });
  },
};
