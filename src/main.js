const { search } = require('./engine');

const argv = require('minimist')(process.argv.slice(2));
let term = argv.t.trim();
if (!term) {
    console.log('search term is empty');
    return;
}

console.log(`search term is: "${term}"`);

const searchTerm = async () => {
    const unions = ['a', 'the', 'or', 'and', 'in', 'at', 'on'];
    
    const unionString = unions.join('|');
    const separatorRegex = new RegExp(`\\b(?:${unionString})\\b|\\W+`, 'i');
    
    const dict = term.split(separatorRegex).filter(Boolean);
    const result = await search(dict);

    console.log(result);
    console.log(`in total: ${result.length}`);
}

searchTerm().then(() => {
    process.exit(1);
});
