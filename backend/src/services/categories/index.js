import { categoryModel } from "../../schemas/category.schema.js";

export const getCategoriesRoute = async (req, res) => {
  let categoriesObjectArray = [];
  let jsonArrayCategories = {};

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

  // sorting
  let sortValue;
  if (req.query.sort) {
    sortValue = req.query.sort;
  }

  // choose fields
  let fieldsCategory;
  if (req.query.fields) {
    if (req.query.fields.categories) {
      fieldsCategory = req.query.fields.categories.split(",");
    }
  }

  const allCategories = await categoryModel
    .find(filters)
    .select(fieldsCategory)
    .limit(paginationSize)
    .skip((pageNumber - 1) * paginationSize)
    .sort(sortValue);

  categoriesObjectArray = allCategories.map((element) => {
    let jsonObj = {
      type: "categories",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayCategories = { ...jsonArrayCategories, ...jsonObj });
  });

  const sentData = { data: [...categoriesObjectArray] };
  return res.status(200).send(sentData);
};

export const getCategoryRoute = async (req, res) => {
  const categoryId = req.params.id;

  let fieldsCategory;
  if (req.query.fields) {
    if (req.query.fields.categories) {
      fieldsCategory = req.query.fields.categories.split(",");
    }
  }

  const foundCategory = await categoryModel.findOne({ _id: categoryId }).select(fieldsCategory);
  if (!foundCategory) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The category can not be found" }] });
  }

  const sentData = {
    data: {
      type: "categories",
      id: foundCategory.id,
      attributes: {
        ...foundCategory._doc,
      },
    },
  };
  return res.status(200).send(sentData);
};

export const createCategoryRoute = async (req, res) => {
  const { name, description } = req.body.data.attributes;

  if (!name) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The name is required" }] });
  }
  if (!description) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The description is required" }] });
  }

  const existingCategory = await categoryModel.findOne({ name: name });
  if (existingCategory) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The category already exists" }] });
  }
  const newCategory = new categoryModel({
    name: name,
    description: description,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  newCategory.save();
  const sentData = {
    data: {
      type: "categories",
      id: newCategory.id,
      attributes: {
        ...newCategory._doc
      },
    },
  };
  return res.status(201).send(sentData);
};

export const editCategoryRoute = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body.data.attributes;

  if (!name) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The name is required" }] });
  }
  if (!description) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The description is required" }] });
  }

  const foundCategory = await categoryModel.findById(categoryId);
  if (!foundCategory) {
    return res
      .status(400)
      .json({ errors: [{ detail: "No category was found" }] });
  }
  const existingCategoriesWithName = await categoryModel.find({ name: name, _id: { $ne: categoryId } });
  if (existingCategoriesWithName.length > 0) {
    return res.status(400).send({
      errors: [{ detail: "Already exists a category with this name" }],
    });
  }
  const updatedCategory = await categoryModel.updateOne({ _id: categoryId },
    {
      name: name,
      description: description,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  );

  const sentData = {
    data: {
      type: "categories",
      id: categoryId,
      attributes: {
        ...updatedCategory._doc
      },
    },
  };
  return res.status(200).send(sentData);
};

export const deleteCategoryRoute = async (req, res) => {
  const toDeleteCategory = await categoryModel.findById(req.params.id);

  if (!toDeleteCategory) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The category does not exist" }] });
  }

  if (toDeleteCategory.items.length > 0) {
    return res.status(400).send({
      errors: [
        {
          title:
            "The category can not be deleted because it is attached to items",
        },
      ],
    });
  }

  try {
    await categoryModel.deleteOne({_id: toDeleteCategory._id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};
