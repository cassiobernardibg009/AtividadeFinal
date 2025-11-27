    //importar o Model
import Avaliacao from '../models/avaliacao.js'
import Usuario from '../models/usuario.js'
import Filme from '../models/filme.js'



export default class AvaliacaoController{

    constructor(caminhoBase='avaliacao/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Usuario.find({});
            const ewe = await Filme.find({});
            res.render(caminhoBase + "add", {Usuarios:resultado, Filmes:ewe})
        }

        this.add = async(req, res)=>{
            //cria a Avaliacao
           var usuario = null;
           var filme = null;


            if(req.body.usuario!=null)
            {
               usuario = await Usuario.findById(req.body.usuario)
            }

            if(req.body.filme!=null)
            {
               filme = await Filme.findById(req.body.filme)
            }

            await Avaliacao.create({
                nota: req.body.nota,
                comentario:req.body.comentario,
                filme:filme,
                usuario:usuario
                
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        
        this.list = async(req, res)=>{
            const resultado = await Avaliacao.find({}).populate('usuario filme')
            res.render(caminhoBase + 'lst', {Avaliacaos:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Avaliacao.find({ usuario: { $regex: filtro,$options: "i" }})
            res.render(caminhoBase + 'lst', {Avaliacaos:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const avaliacao = await Avaliacao.findById(id)
            const usuario = await Usuario.find({});
            const filme = await Filme.find({});
            console.log(avaliacao)
            res.render(caminhoBase + "edt", {Avaliacao:avaliacao, Usuarios:usuario, Filmes:filme})
        }

        this.edt = async(req, res)=>{
            await Avaliacao.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
        await Avaliacao.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }
    }
}