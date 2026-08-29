import { tagModel } from "../../schemas/tag.schema.js";

export const getTagsRoute = async (req, res) => {
  let tagsObjectArray = [];
  let jsonArrayTags = {};

  let paginationSize = null;
  let pageNumber = null;
  let sortValue;
  let fieldsTag;
  let filters = {};

  if (req.query.page) {
    if (req.query.page.number) {
      pageNumber = +req.query.page.number;
    }
    if (req.query.page.size) {
      paginationSize = +req.query.page.size;
    }
  }
  if (req.query.sort) {
    sortValue = req.query.sort;
  }
  if (req.query.fields) {
    if (req.query.fields.tags) {
      fieldsTag = req.query.fields.tags.split(",");
    }
  }
  if (req.query.filter) {
    filters = req.query.filter;
  }

  const allTags = await tagModel
    .find(filters)
    .select(fieldsTag)
    .limit(paginationSize)
    .skip((pageNumber - 1) * paginationSize)
    .sort(sortValue);

  tagsObjectArray = allTags.map((element) => {
    let jsonObj = {
      type: "tags",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayTags = { ...jsonArrayTags, ...jsonObj });
  });

  const sentData = {
    data: [...tagsObjectArray],
  };
  return res.status(200).send(sentData);
};

export const getTagRoute = async (req, res) => {
  const tagId = req.params.id;
  let fieldsTag;
  if (req.query.fields) {
    if (req.query.fields.tags) {
      fieldsTag = req.query.fields.tags.split(",");
    }
  }

  const foundTag = await tagModel.findById(tagId).select(fieldsTag);
  if (!foundTag) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The tag was not found" }] });
  }

  const sentData = {
    data: {
      type: "tags",
      id: foundTag.id,
      attributes: {
        ...foundTag._doc,
      },
    },
  };
  return res.status(200).send(sentData);
};

export const createTagRoute = async (req, res) => {
  const { name, color } = req.body.data.attributes;

  const existingTag = await tagModel.findOne({ name: name });
  if (existingTag) {
    return res
      .status(400)
      .send({ errors: [{ detail: "TThe tag name is already taken" }] });
  }
  const newTag = new tagModel({
    name: name,
    color: color,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  await newTag.save();
  const sentData = {
    data: {
      type: "tags",
      id: newTag.id,
      attributes: {
        ...newTag._doc,
      },
    },
  };
  return res.status(201).send(sentData);
};

export const editTagRoute = async (req, res) => {
  const tagId = req.params.id;
  const { name, color } = req.body.data.attributes;

  if (!name) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The name is required" }] });
  }

  const foundTag = await tagModel.findById(tagId);
  if (!foundTag) {
    return res.status(400).json({ errors: [{ detail: "No tag was found" }] });
  }
  const existingTagsWithName = await tagModel.find({ name: name, _id: { $ne: tagId }});
  if (existingTagsWithName.length > 0) {
    return res
      .status(400)
      .send({ errors: [{ detail: "Already exists a tag with this name" }] });
  }
  const updateTag = await tagModel.updateOne(
    { _id: tagId },
    {
      name: name,
      color: color,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  );

  const sentData = {
    data: {
      type: "tags",
      id: tagId,
      attributes: {
        ...updateTag._doc
      },
    },
  };
  return res.status(200).send(sentData);
};

export const deleteTagRoute = async (req, res) => {
  const toDeleteTag = await tagModel.findById(req.params.id);
  
  if (toDeleteTag.items.length > 0) {
    return res.status(400).send({
      errors: [
        { title: "The tag has items attached and it can not be deleted" },
      ],
    });
  }

  try {
    await tagModel.deleteOne({ _id: toDeleteTag._id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};
