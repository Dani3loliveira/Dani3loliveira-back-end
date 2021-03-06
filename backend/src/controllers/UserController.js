/**UserController.js: Exporta um objeto com os métodos */
const connection = require('../database/connection');
const crypto = require ('crypto');

module.exports = {
    async index(request, response){
        const a = await connection ('a').select('*');
    
        return response.json(a);
        },

    async create(request, response){
        
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); /** criar o id do usuario de acordo com a minha vontade atraves do crypto */
    
       await connection('a').insert({ /**await para aguardar o return do id, para assim então liberar os dados */
            id,
            name,
            email,
            whatsapp,
            city,
            uf,   
        })
    
        return response.json({id});

    }
};