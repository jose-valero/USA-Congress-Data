// 1.- Objeto donde voy a guardar mis datos
const statistics = {
    senate_total_dem: 0,
    senate_total_rep: 0,
    senate_total_ind: 0,
    senate_prc_vot_dem: 0,
    senate_prc_vot_rep: 0,
    senate_prc_vot_ind: 0,
    senate_most_engaged: [],
    senate_least_engaged: [],
    senate_most_loyal: [],
    senate_least_loyal: [],
    senate_total_final: 0,
    senate_prc_fInal: 0,
    
    house_total_dem: 0,
    house_total_rep: 0,
    house_total_ind: 0,
    house_prc_vot_dem: 0,
    house_prc_vot_rep: 0,
    house_prc_vot_ind: 0,
    house_most_engaged: [],
    house_least_engaged: [],
    house_most_loyal: [],
    house_least_loyal: [],
    house_total_final: 0,
    house_prc_fInal: 0
};


// 2.-  funcion para determinar partido politico
const getByparty = (array, party) =>  {
    let aux = array.filter(elm => {
        if (elm.party === party) {
            return elm;
        }
    });
    return aux;
}

// 3.-  funcion para determinar % de votos con el partido
const getTotal=(array, campo) => {
    let result = 0;
    array.forEach(element => {
        if (!isNaN(element[campo])) {
            result += element[campo];
        }
    });
    return result;
}

// 4.- funciones para llenar tablas de SENATE at glance - cargar datos
const senateCalSAG = (members, statistics) => {
    statistics.senate_total_dem = getByparty(members, "D").length;
    statistics.senate_total_rep = getByparty(members, "R").length;
    statistics.senate_total_ind = getByparty(members, "I").length;
    statistics.senate_prc_vot_dem = getTotal(getByparty(members, "D"), "votes_with_party_pct");
    statistics.senate_prc_vot_rep = getTotal(getByparty(members, "R"), "votes_with_party_pct");
    statistics.senate_prc_vot_ind = getTotal(getByparty(members, "I"), "votes_with_party_pct");

    statistics.senate_prc_vot_dem = Number(
        (statistics.senate_prc_vot_dem / statistics.senate_total_dem).toFixed(2)
    );
    statistics.senate_prc_vot_rep = Number(
        (statistics.senate_prc_vot_rep / statistics.senate_total_rep).toFixed(2)
    );
    statistics.senate_prc_vot_ind =
        Number((statistics.senate_prc_vot_ind / statistics.senate_total_ind).toFixed(2)) || 0;
    statistics.senate_total_final = Number(
        statistics.senate_total_dem + statistics.senate_total_rep + statistics.senate_total_ind
    );
    statistics.senate_prc_fInal = Number(
        (statistics.senate_prc_vot_dem + statistics.senate_prc_vot_rep + statistics.senate_prc_vot_ind) /
        3
    ).toFixed(2);
    return statistics;
}

// 5.- funciones para llenar tablas de HOUSE at glance - cargar datos
const houseCalSAG = (members, statistics) => {
    statistics.house_total_dem = getByparty(members, "D").length;
    statistics.house_total_rep = getByparty(members, "R").length;
    statistics.house_total_ind = getByparty(members, "I").length;
    statistics.house_prc_vot_dem = getTotal(getByparty(members, "D"), "votes_with_party_pct");
    statistics.house_prc_vot_rep = getTotal(getByparty(members, "R"), "votes_with_party_pct");
    statistics.house_prc_vot_ind = getTotal(getByparty(members, "I"), "votes_with_party_pct");

    statistics.house_prc_vot_dem = Number(
        (statistics.house_prc_vot_dem / statistics.house_total_dem).toFixed(2)
    );
    statistics.house_prc_vot_rep = Number(
        (statistics.house_prc_vot_rep / statistics.house_total_rep).toFixed(2)
    );
    statistics.house_prc_vot_ind =
        Number((statistics.house_prc_vot_ind / statistics.house_total_ind).toFixed(2)) || 0;
    statistics.house_total_final = Number(
        statistics.house_total_dem + statistics.house_total_rep + statistics.house_total_ind
    );
    statistics.house_prc_fInal = Number(
        (statistics.house_prc_vot_dem + statistics.house_prc_vot_rep + statistics.house_prc_vot_ind) /
        3
    ).toFixed(2);
    return statistics;
}

// 6.- funciones sort para atendance y loyalty de SENATE
const orderTablesSenate = (array, order, field, table) => {
    let aux = array;
    if (order === "asc") {
        aux.sort((a, b) => {
            return a[field] - b[field];
        });
    } else {
        aux.sort((a, b) => {
            return b[field] - a[field];
        });
    }
    console.log(Math.round(aux.length * 0.10))
    for (i = 0; i < Math.round(aux.length * 0.10); i++) {
        statistics[table].push(aux[i]);
    }
}

 // 7.- funciones sort para atendance y loyalty de SENATE
const orderTablesHouse = (array, order, field, table) => {
    let aux = array;
    if (order === "asc") {
        aux.sort((a, b) => {
            return a[field] - b[field];
        });
    } else {
        aux.sort((a, b) => {
            return b[field] - a[field];
        });
    }
    console.log(Math.round(aux.length * 0.10))
    for (i = 0; i < Math.round(aux.length * 0.10); i++) {
        statistics[table].push(aux[i]);
    }
}

console.log(statistics);