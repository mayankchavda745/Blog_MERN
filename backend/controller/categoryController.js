import categoryModel from "../models/categoryModel.js"

class CategoryController {
    static getAllCategories = async (req,res) => {
        try {
            const fetchAllCategories = await categoryModel.find({});
            return res.status(200).send(fetchAllCategories);
        } catch (error) {
            return res.status(400).send({message:error.message});
        }
    };
    static addNewCategory = async (req,res) => {
        try {
            const {title} = req.body;
            if(title){
                const newCategory = new categoryModel({title});
                const savedCategory = await newCategory.save();
                if(savedCategory){
                    return res.status(200).send({message:"category added successfully..."});
                }else{
                    throw({message:"Error while saving the category..."});
                }
            }else{
                throw({message:"all fields are required..."});
            }
        } catch (error) {
            return res.status(400).send({message:error.message});
        }         
    };
}

export default CategoryController;