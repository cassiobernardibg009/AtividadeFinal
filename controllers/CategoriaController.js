//importar o Model
import Categoria from '../models/categoria.js'

export default class CategoriaController{

    constructor(caminhoBase='categoria/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            //cria a Categoria
           
            await Categoria.create({
                nome: req.body.nome,
                descricao:req.body.descricao,
                
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Categoria.find({})
            res.render(caminhoBase + 'lst', {Categorias:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Categoria.find({ nome: { $regex: filtro,$options: "i" }})
            res.render(caminhoBase + 'lst', {Categorias:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const categoria = await Categoria.findById(id) 
            console.log(categoria)
            res.render(caminhoBase + "edt", {Categoria:categoria})
        }

        this.edt = async(req, res)=>{
            await Categoria.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
        await Categoria.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }
    }
}