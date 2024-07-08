# Demo search algorithm

## 1. Initialization
1. Make sure Postgresql is installed
2. Create a database there
3. Rename `.env.dev` file into `.env`
4. Open `.env` file and set the db user, password and name accordingly
5. Do `npn i` in terminal to install all the dependencies
6. Do `npm run initdb` in terminal to apply all needed migrations

## 2. Usage
Do `node src/main -t "search_line"` to run algorithm.

For example:
- `node src/main -t "vegan est"`
- `node src/main -t "free sea"`

## 3. Expected improvements
1. Add levels of abstraction like:
    - data for similar tables seeder
    - sql query composer
    - fetched data processor
2. Add more complex input data validator:
    - smarted term splitter to deal with prepositions like `on`, `at`, `in`, etc
3. Improve SQL query to group data by table