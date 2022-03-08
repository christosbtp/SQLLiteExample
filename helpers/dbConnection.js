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

export const createDBTables = () => {
  try {
    makeQuery(
      'CREATE TABLE if not exists "Articles" ("ArticleId" VARCHAR PRIMARY KEY NOT NULL DEFAULT (CURRENT_TIMESTAMP) ,"Title" VARCHAR,"Author" VARCHAR,"SourceUrl" VARCHAR,"ImageUrl" VARCHAR,"Synopsis" VARCHAR,"FullText" TEXT,"ChannelId" NOT NULL ,"PubDate" INTEGER,"Notes" TEXT,"FilePublicationDate" INTEGER,"OrderID" INTEGER,"SubChannel" ,"ParentChannel" ,"btpGUID" VARCHAR,"Keywords" VARCHAR,"Rating" INTEGER DEFAULT (0) , "LanguageCode" VARCHAR DEFAULT en, "ThumbnailImageUrl" VARCHAR, "Stream" VARCHAR, "Shareable" BOOL DEFAULT false, "IsGallery" BOOL DEFAULT false, "GalleryImageArray" VARCHAR, "SurveyId" INTEGER)',
    );
    console.log(`Table Articles Created`);
  } catch (e) {
    console.log(e);
  }
  try {
    makeQuery(
      'CREATE TABLE if not exists "PreviewArticles" ("ArticleId" VARCHAR PRIMARY KEY NOT NULL DEFAULT (CURRENT_TIMESTAMP) ,"Title" VARCHAR,"Author" VARCHAR,"SourceUrl" VARCHAR,"ImageUrl" VARCHAR,"Synopsis" VARCHAR,"FullText" TEXT,"ChannelId" NOT NULL ,"PubDate" INTEGER,"Notes" TEXT,"FilePublicationDate" INTEGER,"OrderID" INTEGER,"SubChannel" ,"ParentChannel" ,"btpGUID" VARCHAR, "Keywords" VARCHAR, "Rating" INTEGER DEFAULT 0, "LanguageCode" VARCHAR DEFAULT en, "ThumbnailImageUrl" VARCHAR, "Stream" VARCHAR, "Shareable" BOOL DEFAULT false, "IsGallery" BOOL DEFAULT false, "GalleryImageArray" VARCHAR, "SurveyId" INTEGER)',
    );
    console.log(`Table PreviewArticles Created`);
  } catch (e) {}
  try {
    makeQuery(
      'CREATE TABLE if not exists "Channels" ("ChannelId" VARCHAR PRIMARY KEY NOT NULL UNIQUE DEFAULT CURRENT_TIMESTAMP, "ChannelName" VARCHAR NOT NULL , "ChannelImageUrl" VARCHAR)',
    );
    console.log(`Table Channels Created`);
  } catch (e) {}
  try {
    makeQuery(
      'CREATE TABLE if not exists "GalleryImages" ("RowId" INTEGER PRIMARY KEY, "btpGUID" VARCHAR NOT NULL , "ImageUrl" VARCHAR, "Rating" INTEGER DEFAULT (0) )',
    );
    console.log(`Table GalleryImages Created`);
  } catch (e) {}
  try {
    makeQuery(
      'CREATE TABLE if not exists "QueuedAPIRequests" ("RowId" INTEGER PRIMARY KEY, "RequestName" VARCHAR NOT NULL , "ParameterString" VARCHAR)',
    );
    console.log(`Table QueuedAPIRequests Created`);
  } catch (e) {}
  try {
    makeQuery(
      'CREATE TABLE if not exists "SubChannels" ("SubChannelName" TEXT NOT NULL , "ParentChannel" TEXT NOT NULL , "MainChannel" TEXT NOT NULL , "Enabled" BOOL NOT NULL DEFAULT 1, PRIMARY KEY ("SubChannelName", "ParentChannel", "MainChannel"))',
    );
    console.log(`Table SubChannels Created`);
  } catch (e) {}
  try {
    makeQuery(
      'CREATE TABLE if not exists "Surveys" ("SurveyId" INT PRIMARY KEY NOT NULL DEFAULT (CURRENT_DATE) ,"Question" VARCHAR,"Answer1" VARCHAR,"Answer2" VARCHAR,"Answer3" VARCHAR,"Answer1Result" DOUBLE DEFAULT (0) ,"Answer2Result" DOUBLE DEFAULT (0) ,"Answer3Result" DOUBLE DEFAULT (0) ,"LastUpdated" INTEGER,"UserResponseNumber" INTEGER)',
    );
    console.log(`Table Surveys Created`);
  } catch (e) {}
};

export const addColumnToArticlesDatabase = (columnName, columnType) => {
  try {
    let columnExists = false;
    db.transaction(tx => {
      tx.executeSql('PRAGMA table_info(Articles)', [], (_, {rows}) => {
        //   tableRows = JSON.stringify(rows.length);
        tableRows = rows.length;

        console.log('I am here');
        console.log(rows.item(2).name);
        for (var i = 0; i < tableRows; i++) {
          console.log(rows.item(i).name);
          if (columnName == rows.item(i).name) {
            alert('Exist');
            columnExists = true;
          }
        }
        if (!columnExists) {
          console.log('I AM IN !EXIST');
          // Ti.API.info('Adding column ' + columnName + ' of type ' + columnType + ' to Article Table');
          tx.executeSql(
            'ALTER TABLE Articles ADD COLUMN ' + columnName + ' ' + columnType,
          );
        }
        // console.log('the number of rows are', JSON.stringify(tableRows));
      });
    });

    // Ti.API.info('Articles DB columnn name count: ' + rows.rowCount);
  } catch (error) {
    console.log(`Error on the addColumnToArticleDatabase ${error}`);
  }
};

export const addColumnToPreviewArticlesDatabase = (columnName, columnType) => {
  try {
    let columnExists = false;
    db.transaction(tx => {
      tx.executeSql('PRAGMA table_info(PreviewArticles)', [], (_, {rows}) => {
        //   tableRows = JSON.stringify(rows.length);
        tableColumn = rows.length;
        console.log(rows.item(2).name);
        for (var i = 0; i < tableColumn; i++) {
          if (columnName == rows.item(i).name) {
            console.log(`Column Exist ${columnName}`);
            columnExists = true;
          }
        }
        if (!columnExists) {
          // Ti.API.info('Adding column ' + columnName + ' of type ' + columnType + ' to Article Table');
          tx.executeSql(
            'ALTER TABLE PreviewArticles ADD COLUMN ' +
              columnName +
              ' ' +
              columnType,
          );
        }
        // console.log('the number of rows are', JSON.stringify(tableRows));
      });
    });

    // Ti.API.info('Articles DB columnn name count: ' + rows.rowCount);
  } catch (error) {
    console.log(`Error on the addColumnToArticleDatabase ${error}`);
  }
};

export const addUser = (userName, userAge) => {
  db.transaction(tx => {
    try {
      tx.executeSql(
        `INSERT INTO Test (name,age) VALUES(${userName},${userAge}) `,
        '-',
        () => {
          console.log('Row Inserted Into Table');
        },
      );
    } catch (error) {
      console.log(error);
    }
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
  return new Promise((resolve, reject) => {
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
      tx.executeSql('SELECT * FROM test', [], (_, {rows}) => {
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
    try {
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
    } catch (error) {
      console.log(`Error on getData by Query ${error}`);
    }
  });
};

export const dropTable = tableName => {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE ${tableName};`);
  });
};
