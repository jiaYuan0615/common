import _ from 'lodash'

/** 交集取得更新項目
 * 
 * @param {Array} origin 
 * @param {Array} update 
 * @returns {object}
 */
export function yieldUpdateItem(origin, update) {
  const preserveItems = _.xor(origin, update);
  const payload = { "shouldUpdate": false }
  if (preserveItems.length) {
    payload["insertItem"] = _.intersection(preserveItems, update);
    payload["deleteItem"] = _.intersection(preserveItems, origin);
    payload["shouldUpdate"] = true
  }
  return payload
}