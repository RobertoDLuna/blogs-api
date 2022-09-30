const { Category } = require('../models');

const createNewCategory = async (name) => {
    const newCategory = await Category.create(name);
    return { tye: null, message: newCategory };
};

const getAllCategories = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
};
module.exports = {
    createNewCategory,
    getAllCategories,
};