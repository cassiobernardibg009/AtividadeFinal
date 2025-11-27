import conexao from '../config/conexao.js'
import usuario from './usuario.js'

const Avaliacao = conexao.Schema({
    nota: {type:String, required:true},
    comentario: {type:String, required:true},
    filme: {type: conexao.Types.ObjectId, ref: "Filme", required: true},
    usuario: {type: conexao.Types.ObjectId, ref: "Usuario", required: true}
})

export default conexao.model('Avaliacao',Avaliacao)