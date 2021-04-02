const router = require('express').Router();

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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
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

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.id
      },
    });
    return res.json(tagData);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
if (!tagData) {
  res.status(404).json({
    message: 'No tag with that id found.'});
    return;
}
res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
