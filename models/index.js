// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'Category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'Category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
through: 'Product_Tag',
as: 'Tag',
foreignKey: 'Product_id',
});
// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: 'Product_Tag',
  as: 'Product',
  foreignKey: 'Tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};