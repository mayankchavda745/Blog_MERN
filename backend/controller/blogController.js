class BlogController {
    static getAllBlogs = async(req,res)=> {
        try {
            const fetchAllBlogs = await blogModel.find({user:req.user._id});
            return res.status(200).send(fetchAllBlogs);
        } catch (error) {
            return res.status(400).send({message:error.nessage});
        }
    };
    static addNewBlog = async(req,res)=> {
        const {title, category, description} = req.body;
        try{
            if(title && category && description){
                const addBlog = new blogModel({
                    title,description,category,thumbnail:req.file.filename,user:req.user._id
                });
                const savedBlog = await addBlog.save();
                if(savedBlog){
                    return res.status(200).send({message:"Blog added successfully"});
                }else{
                    throw({message:"All fields are required"});
                }
            }
        }catch(error){
            return res.status(400).send({message:error.message});
        }
    };
    static getSingleBlog = async(req,res)=> {
        const {id} = req.params;
        try {
            if(id){
                const fetchBlogsByID = await blogModel.findById(id);
                return res.status(200).send(fetchBlogsByID);
            }else{
                throw({message:"Invalid URL"});
            }
        } catch (error) {
            return res.status(400).send({message:error.message});
        }
    };
}

export default BlogController;