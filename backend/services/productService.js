const Product=require('../models/product');

const addProduct=async(req,res)=>{
    try{
        const {name,price,quantity}=req.body;   
        const product=new Product({name,price,quantity});
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,price,quantity}=req.body;
        const product=await Product.findByIdAndUpdate(id,{name,price,quantity},{new:true});
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={addProduct,getProducts,updateProduct,deleteProduct};