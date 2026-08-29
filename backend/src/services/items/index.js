import dotenv from "dotenv";
import {itemModel} from "../../schemas/item.schema.js";
import {categoryModel} from "../../schemas/category.schema.js";
import {tagModel} from "../../schemas/tag.schema.js";

dotenv.config();

export const getItemsRoute = async (req, res) => {
  let itemsObjectArray = [];
  let jsonArrayItems = {};
  let options = [];

  if (req.query.include) {
    options = req.query.include.split(",");
  }

  // pagination
  let paginationSize = null;
  let pageNumber = null;
  if (req.query.page) {
    if (req.query.page.number) {
      pageNumber = +req.query.page.number;
    }
    if (req.query.page.size) {
      paginationSize = +req.query.page.size;
    }
  }

  // filtering
  let filters = {};
  if (req.query.filter) {
    filters = req.query.filter;
  }

  let sortValue;
  //sorting
  if (req.query.sort) {
    sortValue = req.query.sort;
  }

  // choose fields
  let fieldsItem;
  let fieldsTag;
  let fieldsCat;
  if (req.query.fields) {
    if (req.query.fields.item) {
      fieldsItem = req.query.fields.item.split(",");
    }
    if (req.query.fields.tags) {
      fieldsTag = req.query.fields.tags.split(",");
    }
    if (req.query.fields.category) {
      fieldsCat = req.query.fields.category.split(",");
    }
  }

  const allItems = await itemModel
    .find(filters)
    .select(fieldsItem)
    .limit(paginationSize)
    .skip((pageNumber - 1) * paginationSize)
    .sort(sortValue);

  itemsObjectArray = allItems.map((element) => {
    let jsonObj = {
      type: "items",
      id: element.id,
      attributes: {
        ...element._doc,
      },
      relationships: {
        category: {
          links: {
            self: `${process.env.APP_URL_API}/items/${element.id}/relationships/category`,
            related: `${process.env.APP_URL_API}/items/${element.id}/category`,
          },
        },
        tags: {
          links: {
            self: `${process.env.APP_URL_API}/items/${element.id}/relationships/tags`,
            related: `${process.env.APP_URL_API}/items/${element.id}/tags`,
          },
        },
      },
    };
    return (jsonArrayItems = {...jsonArrayItems, ...jsonObj});
  });

  let tagsObjectArray = [];
  let categoriesObjectArray = [];
  if (options.length > 0) {
    if (options.find((el) => el == "tags")) {
      const allTags = await tagModel.find().select(fieldsTag);
      let jsonArrayTags = {};
      tagsObjectArray = allTags.map((element) => {
        let jsonObj = {
          type: "tags",
          id: element.id,
          attributes: {
            ...element._doc,
          },
        };
        return (jsonArrayTags = {...jsonArrayTags, ...jsonObj});
      });
    }
    if (options.find((el) => el == "category")) {
      const allCategories = await categoryModel.find().select(fieldsCat);
      let jsonArrayCategories = {};
      categoriesObjectArray = allCategories.map((element) => {
        let jsonObj = {
          type: "categories",
          id: element.id,
          attributes: {
            ...element._doc,
          },
        };
        return (jsonArrayCategories = {...jsonArrayCategories, ...jsonObj});
      });
    }
  }

  const sentData = {data: [...itemsObjectArray], included: [...categoriesObjectArray, ...tagsObjectArray]};
  return res.status(200).send(sentData);
};

export const getCategoryOfItemRoute = async (req, res) => {
  const item = await itemModel.findById(req.params.id);
  const categoryOfItem = await categoryModel.findOne({_id: item.category_id});

  const sentData = {
    data: {
      type: "categories",
      id: categoryOfItem.id,
      attributes: {
        ...categoryOfItem._doc,
      },
    },
  };

  return res.status(200).send(sentData);
};

export const getTagsOfItemRoute = async (req, res) => {
  const item = await itemModel
    .findById(req.params.id)
    .populate("tags")
    .select("tags");
  const tagsOfItem = item.tags;

  let tagsObjectArray = [];
  let jsonArrayTags = {};

  tagsObjectArray = tagsOfItem.map((element) => {
    let jsonObj = {
      type: "tags",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayTags = {...jsonArrayTags, ...jsonObj});
  });

  const sentData = {data: [...tagsObjectArray]};
  return res.status(200).send(sentData);
};

export const getItemRoute = async (req, res) => {
  // it can have included in the url category and tags
  let includedDataCategory;
  let includedDataTags = [];
  let options = [];

  const itemId = req.params.id;
  if (req.query.include) {
    options = req.query.include.split(",");
  }

  const item = await itemModel.findById(itemId);
  const categoryOfItem = await categoryModel.findById(item.category_id);
  const tagsOfItem = await tagModel.find({_id: {$in: item["tags"]}});
  let sentData = {
    type: "items",
    id: itemId,
    attributes: {
      ...item._doc,
    },
  };

  if (options.length > 0) {
    if (options.find((el) => el == "category")) {
      sentData = {
        ...sentData,
        relationships: {
          category: {
            data: [
              {
                type: "categories",
                id: categoryOfItem.id,
              },
            ],
          },
        },
      };
      includedDataCategory = {
        type: "categories",
        id: categoryOfItem.id,
        attributes: {
          ...categoryOfItem._doc,
        },
      };
    }
    if (options.find((el) => el == "tags")) {
      let jsonArray = {};
      includedDataTags = tagsOfItem.map((element) => {
        let jsonObj = {
          type: "tags",
          id: element.id,
          attributes: {
            ...element._doc,
          },
        };
        return (jsonArray = {...jsonArray, ...jsonObj});
      });
    }
  }
  const finalData = {
    data: {...sentData},
    included: [{...includedDataCategory}, ...includedDataTags],
  };
  return res.status(200).send(finalData);
};

export const createItemRoute = async (req, res) => {
  const {name, excerpt, description, status, is_on_homepage, date_at, image} =
    req.body.data.attributes;
  const categoryId = req.body.data.relationships.category.data.id;
  const tags = req.body.data.relationships.tags.data;

  if (!name) {
    return res
      .status(400)
      .send({errors: [{detail: "The name is required"}]});
  }
  if (!description) {
    return res
      .status(400)
      .send({errors: [{detail: "The description is required"}]});
  }

  const existingItem = await itemModel.findOne({name: name});
  if (existingItem) {
    return res
      .status(400)
      .send({errors: [{detail: "The item already exists"}]});
  }

  const newItem = new itemModel({
    name: name,
    excerpt: excerpt,
    description: description,
    status: status,
    is_on_homepage: is_on_homepage,
    date_at: date_at,
    image: image,
    category_id: categoryId,
    created_at: Date.now(),
    updated_at: Date.now(),
  });

  tags.map((tag) => newItem.tags.push(tag.id));
  await newItem.save();
  // add for category the item
  const category = await categoryModel.findById(categoryId);
  await categoryModel.updateOne(
    {_id: categoryId},
    {items: [...category.items, newItem._id]}
  );

  // add for tags the item
  await Promise.all(
    tags.map(async (element) => {
      const result = await tagModel.findById(element.id);
      await tagModel.updateOne(
        {_id: element.id},
        {items: [...result.items, newItem._id]}
      );
    })
  );

  const sentData = {
    data: {
      type: "items",
      id: newItem.id,
      attributes: {
        ...newItem._doc,
      },
      relationships: {
        category: {
          links: {
            self: `${process.env.APP_URL_API}/items/${newItem.id}/relationships/category`,
            related: `${process.env.APP_URL_API}/items/${newItem.id}/category`,
          },
        },
        tags: {
          links: {
            self: `${process.env.APP_URL_API}/items/${newItem.id}/relationships/tags`,
            related: `${process.env.APP_URL_API}/items/${newItem.id}/tags`,
          },
        },
      },
    },
  };
  return res.status(201).send(sentData);
};

export const editItemRoute = async (req, res) => {
  const foundItem = await itemModel.findById(req.params.id);
  const itemId = req.params.id;
  const {name, excerpt, description, status, is_on_homepage, date_at, image} =
    req.body.data.attributes;

  let categoryId;
  let tags;
  let oldCategory = await categoryModel.findById(foundItem.category_id);
  let oldTags = await tagModel.find({_id: {$in: foundItem["tags"]}});
  if (req.body.data.relationships) {
    categoryId = req.body.data.relationships.category.data.id;
    tags = req.body.data.relationships.tags.data;
  } else {
    categoryId = foundItem.category_id;
    tags = await tagModel.find({_id: {$in: foundItem["tags"]}});
  }

  if (!foundItem) {
    return res
      .status(400)
      .json({errors: [{detail: "The item does not exist"}]});
  }

  if (name) {
    const existingItemsWithName = await itemModel.find({
      name: name,
      _id: {$ne: itemId},
    });
    if (existingItemsWithName.length > 0) {
      return res.status(400).send({
        errors: [{detail: "Already exists an item with this name"}],
      });
    }
  }

  const toSentTags = tags.map((tag) => tag.id);

  const updatedItem = await itemModel.updateOne(
    {_id: foundItem._id},
    {
      name: name,
      excerpt: excerpt,
      description: description,
      status: status,
      is_on_homepage: is_on_homepage,
      date_at: date_at,
      image: image,
      tags: [...toSentTags],
      category_id: categoryId,
      updated_at: Date.now(),
    }
  );

  // check category changed
  if (oldCategory._id != categoryId) {
    const results = oldCategory.items.filter(
      (value) => !value.equals(foundItem._id)
    );
    await categoryModel.updateOne(
      {_id: oldCategory._id},
      {items: [...results]}
    );
    const newCategory = await categoryModel.findById(categoryId);
    await categoryModel.updateOne(
      {_id: categoryId},
      {items: [...newCategory.items, foundItem._id]}
    );
  }
  //change tags
  await Promise.all(
    oldTags.map(async (tag) => {
      const results = tag.items.filter((value) => !value.equals(foundItem._id));
      await tagModel.updateOne({_id: tag._id}, {items: [...results]});
    })
  );

  await Promise.all(
    tags.map(async (tag) => {
      const elem = await tagModel.findById(tag.id);
      await tagModel.updateOne(
        {_id: tag.id},
        {items: [...elem.items, foundItem._id]}
      );
    })
  );

  const sentData = {
    data: "items",
    id: foundItem.id,
    attributes: {
      ...updatedItem._doc,
    },
  };
  return res.status(200).send(sentData);
};

export const deleteItemRoute = async (req, res) => {
  // here should be verification if demo and other stuff?
  const toDeleteItem = await itemModel.findById(req.params.id);
  if (!toDeleteItem) {
    return res
      .status(400)
      .send({errors: [{detail: "The item does not exist"}]});
  } else {
    try {
      // remove from tag the item
      const tags = await tagModel.find({_id: {$in: toDeleteItem["tags"]}});
      await Promise.all(
        tags.map(async (tag) => {
          const results = tag.items.filter(
            (value) => !value.equals(toDeleteItem._id)
          );
          await tagModel.updateOne({_id: tag._id}, {items: [...results]});
        })
      );

      // remove from categories the tag
      const category = await categoryModel.findById(toDeleteItem.category_id);
      const results = category.items.filter(
        (value) => !value.equals(toDeleteItem._id)
      );
      await categoryModel.updateOne(
        {_id: category._id},
        {items: [...results]}
      );

      await itemModel.deleteOne({_id: toDeleteItem._id});
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
    }
  }
};
