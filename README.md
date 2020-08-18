# loopback-next-issues-5997
## 1. Create two table in your database
* issue5997
* issue5997_bis
## 2. Change the mysql credentials in this files
* src\datasources\database.datasource.ts
* src\datasources\anotherdatabase.datasource.ts

```js
const config = {
  name: 'database',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'youruser', //Here
  password: 'yourpassword', //And here
  database: 'issue5997'
};
```
## 3. Clean, build & migrate
Run the command below
```bash
npm run clean; npm run build; npm run migrate
```
