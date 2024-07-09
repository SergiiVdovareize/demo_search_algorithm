# Demo search algorithm

## 1. Initialization
1. Make sure Postgresql is installed
2. Create a database there
3. Copy `.env.dev` file to `.env`
4. Open just created `.env` file and set the db user, password and name accordingly
5. Do `npn i` in terminal to install all the dependencies
6. Do `npm run initdb` in terminal to apply all needed migrations

## 2. Usage
Do `node src/main -t "search_line"` to run algorithm.

For example:
- `node src/main -t "vegan est"`
- `node src/main -t "free sea"`

## 3. Further improvements
1. Add levels of abstraction to split the code like:
    - data for similar tables seeder
    - sql query composer
    - fetched data processor
2. Add more complex input data validator:
    - smarted node script args validator
    - smarter term sanitizer
    - smarted term splitter to deal with prepositions like `on`, `at`, `in`, etc
3. Improve SQL query to group data by table
4. Add data validation before seeding