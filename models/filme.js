import conexao from '../config/conexao.js'

const Filme = conexao.Schema({
    titulo: {type:String, required:true},
    classificacao:{type:String, required:true},
    anoLancamento:{type:Date, required:true},
    capa:{type:Buffer, required:false, get: (valor) => {if (!valor) return null; return `data:image/png;base64,${valor.toString('base64')}`; }},
    video:{type:String, required:false},
    categoria: {type: conexao.Types.ObjectId, ref: "Categoria", required: true},
})

export default conexao.model('Filme',Filme)