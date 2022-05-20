
/** 新增資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {object} params 參數
 * @returns {string}
 */
export function insertQuery(tableName, params) {
  const columns = Object.keys(params).join(', ');
  const replacement = new Array(Object.keys(params).length).fill('?').join(', ')
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${replacement})`
  return sql
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {Array<object>} params 參數
 * @returns {string}
 */
export function insertMultipleQuery(tableName, params) {
  const columns = Object.keys(params[0]).join(', ');
  const replacement = params.map(o => `(${new Array(Object.keys(o).length).fill('?').join(', ')})`)
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES ${replacement.join(', ')}`
  return sql
}

/** 更新資料的 SQL 指令
 * 
 * @param {string} tableName 資料表名稱
 * @param {object} params 參數
 * @param {string} key 主鍵名稱
 * @returns {string}
 */
export function updateQuery(tableName, params, key = 'id') {
  let columns;
  if (Object.keys(params).length === 1) {
    columns = `${Object.keys(params)[0]}=?`;
  } else {
    columns = `${Object.keys(params).join('=?, ')}=?`;
  }
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key} = ?`
  return sql
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