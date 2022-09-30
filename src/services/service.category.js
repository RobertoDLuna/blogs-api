const { Category } = require('../models');

const createNewCategory = async (name) => {
    const newCategory = await Category.create(name);
    return { tye: null, message: newCategory };
};

module.exports = createNewCategory;