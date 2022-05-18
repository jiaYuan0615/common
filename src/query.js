import { v4 as uuid } from 'uuid';

/** 新增資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {object} params 參數
 * @returns {object}
 */
export function insertQuery(tableName, params) {
  const columns = Object.keys(params).join(', ');
  const values = Object.keys(params).map((v) => params[v]);
  // First Item is P.K.
  const primaryKey = uuid();
  values.splice(0, 0, primaryKey);
  const replacement = new Array(Object.keys(params).length + 1).fill('?').join(', ')
  const sql = `INSERT INTO ${tableName} (id, ${columns}) VALUES (${replacement})`

  return {
    primaryKey,
    sql,
    values
  }
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {Array<object>} params 參數
 * @returns {object}
 */
export function insertMultipleQuery(tableName, params) {
  const columns = Object.keys(params[0]).join(', ');
  const values = []
  const primaryKeys = []

  const replacement = params.map(o => {
    const primaryKey = uuid();
    values.push(primaryKey);
    primaryKeys.push(primaryKey);
    Object.keys(o).map(v => values.push(o[v]))
    return `(${new Array(Object.keys(o).length + 1).fill('?').join(', ')})`
  })

  const sql = `INSERT INTO ${tableName} (id, ${columns}) VALUES ${replacement.join(', ')}`
  return {
    primaryKeys,
    sql,
    values
  }
}

/** 更新資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {object} params 參數
 * @param {string} id 主鍵值
 * @param {string} key 主鍵名稱
 */
export function updateQuery(tableName, params, id, key = 'id') {
  let columns;
  if (Object.keys(params).length === 1) {
    columns = `${Object.keys(params)[0]}=?`;
  } else {
    columns = `${Object.keys(params).join('=?, ')}=?`;
  }

  const values = Object.keys(params).map(v => params[v]);
  // Final Key is P.K.
  values.push(id);
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key} = ?`
  return {
    sql,
    values
  }
}

/** 刪除資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {string} key 主鍵名稱
 * @returns {string}
 */
export function deleteQuery(tableName, key = 'id') {
  const sql = `DELETE FROM ${tableName} WHERE ${key} = ?`;
  return sql
}

/** 刪除多筆資料的 SQL 指令
 * 
 * @param {string} tableName
 * @param {Array<string>} params 
 * @param {string} key 
 * @returns {string}
 */
export function deleteMultipleQuery(tableName, params, key = 'id') {
  const replacement = new Array(params.length).fill('?').join(', ');
  const sql = `DELETE FROM ${tableName} WHERE ${key} IN (${replacement})`;
  return sql
}