import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
//const url = "mongodb+srv://Raphaell:123@cluster0.w1qyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/"
const url = "mongodb+srv://cassiobernardibg009:abcd@cluster0.gd66l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao