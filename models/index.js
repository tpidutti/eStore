// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: '',
});
// Categories have many Products
Category.hasMany(Products, {
  foreignKey: '',
  onDelete: '',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {

});
// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {

});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};