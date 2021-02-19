const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
                
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            // Filtrar por tecnologias
            techs: {
                $in: techsArray, //$in = encontra o(s) valor(es) em um array
            },
            // Buscar todos devs num raio 10km
            location: {
                $near: { //encontra objetos perto de uma localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //a distancia é passada em metros (10000m = 10km)
                },
            },
        });

        return response.json({ devs });
    }
};