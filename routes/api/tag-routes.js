const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}, { model: ProductTag}],
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.statusMessage(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });
     if (!tagData) {
       res.status(404).json({ message: 'No tag with that id found.'});
       return;
     }
     res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const tagData = await Tag.create(req.body);

  return res.json(tagData);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.tag_id
      },
    }
  );
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  });
  return res.json(tagData);
});

module.exports = router;
