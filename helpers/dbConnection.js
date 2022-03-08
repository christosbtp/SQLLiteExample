import SQLite from 'react-native-sqlite-storage';

const successfullyCallBack = () => {
  return console.log('Connected Successfully!');
};

const errorCallBack = () => {
  return console.log(`couldn't Connect To The Database ${error}`);
};

export var db = SQLite.openDatabase(
  {
    name: 'todo.db',
    location: 'default',
    createdFromLocation: '~www/todo.db',
  },
  successfullyCallBack,
  errorCallBack,
);

export const addUser = (userName, userAge) => {
  db.transaction(tx => {
    try {
      tx.executeSql(
        `INSERT INTO testtable (name,age) VALUES(${userName},${userAge}) `,
      );
    } catch (error) {
      console.log(error);
    }

    console.log('User Added');
  });
};
export const getRows = () => {
  let tableRows = [];
  db.transaction(tx => {
    // let tableRows = '5';
    tx.executeSql('select * from testtable', [], (_, {rows}) => {
      //   tableRows = JSON.stringify(rows.length);
      tableRows = rows.length;

      console.log('the number of rows are', JSON.stringify(tableRows));
    });
    console.log(tableRows);
  });
};

export const createTable = tableName => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (name INT, age INT); `,
        );
        console.log(`Table:${tableName} Created`);
      });
    } catch (error) {
      console.log(`Error on Create Table Function ${error}`);
    }
  });
};

export const insertIntoTable = (a, b) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO testtable (name INT, age INT) Values (a,b) ');
  });
};

export const makeQuery = query => {
  return new Promise(async (resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(query);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM testtable', [], (_, {rows}) => {
        const length = rows.length;
        let arr = [];
        for (let i = 0; i < length; i++) {
          console.log(rows.item(i).age);
          arr.push(rows.item(i));
          console.log(`ArrayList:${arr[i]}`);
          if (i === length - 1) {
            resolve(arr);
          }
        }
      });
    });
  });
};

export const getDataByQuery = userQuery => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(userQuery, [], (_, {rows}) => {
        const length = rows.length;
        let arr = [];
        for (let i = 0; i < length; i++) {
          console.log(rows.item(i).age);
          arr.push(rows.item(i));
          console.log(`ArrayList:${arr[i]}`);
          if (i === length - 1) {
            resolve(arr);
          }
        }
      });
    });
  });
};

export const dropTable = tableName => {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE ${tableName};`);
  });
};
