const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection ('descricao').count();

        const incidents = await connection('descricao')
        .limit(5)
        .offset((page-1)*5)
        .select('*');

        response.header('X-total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const{title, description} = request.body;
        const user_id = request.headers.authorization;

       const [id] = await connection('descricao').insert({
            title,
            description,
            user_id,
        });

        return response.json({id});
    },

    async delete(request, response){
        const{id} = request.params;
        const user_id = request.headers.authorization;

        const incidents = await connection('descricao')
            .where('id', id)
            .select('user_id')
            .first();

        if (incidents[user_id] != user_id){
            return response.status(401).json({error: 'Operação não permitida.'});
        }

        await connection ('descricao').where('id', id).delete();

        return response.status(204).send();
    }
};