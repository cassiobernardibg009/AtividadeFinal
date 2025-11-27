//importar o Model
import Filme from '../models/filme.js'
import Categoria from '../models/categoria.js'

export default class FilmeController{

    constructor(caminhoBase='filme/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Categoria.find({});
            res.render(caminhoBase + "add",{Categorias: resultado})
        }

        this.add = async(req, res)=>{
            var categoria = null;

                if(req.body.categoria!=null)
            {
                categoria = await Categoria.findById(req.body.categoria)
            }

            await Filme.create({
                titulo: req.body.titulo,
                classificacao:req.body.classificacao,
                anoLancamento:req.body.anoLancamento,
                capa:req.file.buffer,
                video:req.body.video, 
                categoria:categoria

            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
           
            const resultado = await Filme.find({}).populate('categoria');

            res.render(caminhoBase + 'lst', {Filmes:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Filme.find({ titulo: { $regex: filtro, $options: "i" }}).populate('categoria')

            res.render(caminhoBase + 'lst', {Filmes:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const filme = await Filme.findById(id)
            const resultado = await Filme.findById(req.params.id)
            const categorias = await Categoria.find({});
            console.log(filme)
            res.render(caminhoBase + "edt", {Filme:filme,Categorias:categorias})

            /*var jtime = null;
            //se vier a seleção de entidade, busca o objeto para, posteriomente,
            //atualizar

            res.redirect('/admin/filme/lst')
        */
        }

        this.edt = async(req, res)=>{
            var categoria = null;
            if(req.body.categoria!=null)
            {
                categoria = await Categoria.findById(req.body.categoria)
            }

            await Filme.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Filme.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
        }
    }
}