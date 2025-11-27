//importar o Model
import Usuario from '../models/usuario.js'
import Categoria from '../models/categoria.js'

export default class UsuarioController{

    constructor(caminhoBase='usuario/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Categoria.find({});
            res.render(caminhoBase + "add",{Categorias: resultado})
        }

        this.add = async(req, res)=>{
          

            await Usuario.create({
                nome: req.body.nome,
                email:req.body.email,
                senha:req.body.senha

            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
           
            const resultado = await Usuario.find({})

            res.render(caminhoBase + 'lst', {Usuarios:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Usuario.find({ nome: { $regex: filtro, $options: "i" }})

            res.render(caminhoBase + 'lst', {Usuarios:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const usuario = await Usuario.findById(id)
            console.log(usuario)
            res.render(caminhoBase + "edt", {Usuario:usuario})
        }

        this.edt = async(req, res)=>{
            var categoria = null;
            if(req.body.categoria!=null)
            {
                categoria = await Categoria.findById(req.body.categoria)
            }

            await Usuario.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Usuario.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
        }
    }
}