var config_comp = require('../../config/computadores');

function getSala(ip_computador){
    for(var i = 0; i < config_comp.length; i++){
        if(config_comp[i].ip == ip_computador){
            return config_comp[i].sala;
        }
    }
    return null; //IP solicitado não corresponde a nenhum pc
}

function getPorta(ip_computador){
    for(var i = 0; i < config_comp.length; i++){
        if(config_comp[i].ip == ip_computador){
            return config_comp[i].porta;
        }
    }
    return null; //IP solicitado não corresponde a nenhum pc
}