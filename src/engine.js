const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const tablesToSearch = ['cities', 'brands', 'diets', 'dish_types'];
const tablesKeyMap = {
    cities: 'city',
    brands: 'brand',
    diets: 'diet',
    dish_types: 'dishType'
};

const composeQuery = (dict, tablesToSearch) => {
    const dictMap = dict.map(word => `'%${word}%'`);

    const select = composeSelect(tablesToSearch);
    const from = 'FROM (SELECT 1 AS dummy) AS dummy';
    const join = composeJoin(dictMap, tablesToSearch);
    const where = composeWhere(tablesToSearch);

    return `${select}\n${from}\n${join}\n${where}`;
}

const composeSelect = () => {
    const selectMap = tablesToSearch.map(table => `${table}.id AS ${table}_id, ${table}.name AS ${table}_name`);
    return `SELECT ${selectMap.join(',\n')}`;
}

const composeJoin = (dictMap) => {
    const joinMap = tablesToSearch.map(table => `LEFT JOIN ${table} ON ${table}.name ILIKE ANY (ARRAY[${dictMap}])`);
    return joinMap.join('\n');
}

const composeWhere = () => {
    const whereMap = tablesToSearch.map(table => `${table}.id IS NOT NULL`);
    return `WHERE ${whereMap.join(' OR ')}`;
}

const processData = (data) => {
    const items = data.map(row => {
        const item = {};
        tablesToSearch
            .filter(table => !!row[`${table}_id`])
            .forEach(table => {
                item[tablesKeyMap[table]] = {
                    id: row[`${table}_id`],
                    name: row[`${table}_name`]
                };
            });
        return item;
    })

    return items
}

exports.search = async function(dict) {
    const query = composeQuery(dict);
    const result = await knex.raw(query);

    return processData(result.rows);
}