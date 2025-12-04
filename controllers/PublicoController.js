import Filme from "../models/filme.js";
import Avaliacao from "../models/avaliacao.js";

export default class PublicoController {

    static async exibirCatalogo(req, res) {
        try {
            // 1. Captura o termo digitado na barra de pesquisa
            const busca = req.query.busca;
            
            // 2. Define o filtro inicial como vazio (busca todos)
            let filtro = {};

            // 3. Se o usuário digitou algo, cria o filtro de busca
            if (busca) {
                // $regex: busca por partes do texto
                // $options: 'i' faz a busca ignorar maiúsculas/minúsculas
                filtro = { titulo: { $regex: busca, $options: 'i' } };
            }

            // 4. Busca os filmes no banco usando o filtro
            const filmes = await Filme.find(filtro).populate('categoria');
            
            // 5. Busca as avaliações para cada filme encontrado
            const filmesComDetalhes = await Promise.all(filmes.map(async (filme) => {
                const avaliacoes = await Avaliacao.find({ filme: filme._id }).populate('usuario');
                
                // Converte para objeto JS simples para podermos adicionar a propriedade 'avaliacoes'
                const filmeObj = filme.toObject({ getters: true }); 
                filmeObj.avaliacoes = avaliacoes;
                
                return filmeObj;
            }));

            // 6. Renderiza a página enviando os filmes e o termo de busca (para manter a barra preenchida)
            res.render('ParteUsuario/catalogo', { 
                filmes: filmesComDetalhes,
                termoBusca: busca // Importante: envia o termo de volta para a tela
            });

        } catch (e) {
            console.log(e);
            res.send("Erro ao carregar catálogo");
        }
    }
}