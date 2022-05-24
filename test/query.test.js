import { equal } from 'assert';
import { insertQuery, insertMultipleQuery, updateQuery, deleteQuery, deleteMultipleQuery } from '../src/query'

describe('資料庫指令', () => {
  it('回傳新增單筆指令', () => {
    const payload = {
      "email": "test@email.com",
      "password": "password"
    }
    const expected = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const actual = insertQuery("users", payload);
    equal(actual, expected);
  })

  it('回傳新增多筆指令', () => {
    const payload = [
      {
        "id": "1",
        "email": "test@test.com",
        "password": "password"
      },
      {
        "id": "1",
        "email": "test@test.com",
        "password": "password"
      }
    ]
    const expected = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?), (?, ?, ?)';
    const actual = insertMultipleQuery("users", payload);
    equal(actual, expected);
  })

  it('回傳更新指令', () => {
    const payload = {
      "email": "test@test.com",
      "password": "password"
    }
    const expected = 'UPDATE users SET email=?, password=? WHERE id = ?'
    const actual = updateQuery("users", payload)
    equal(actual, expected)
  })

  it('回傳更新指令使用自訂鍵值', () => {
    const payload = {
      "password": "password"
    }
    const expected = 'UPDATE users SET password=? WHERE userId = ?'
    const actual = updateQuery("users", payload, "userId")
    equal(actual, expected)
  })

  it('回傳刪除單筆指令', () => {
    const expectd = 'DELETE FROM users WHERE id = ?';
    const actual = deleteQuery("users")
    equal(actual, expectd)
  })

  it('回傳刪除多筆指令', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE id IN (?, ?, ?)';
    const actual = deleteMultipleQuery("users", payloads)
    equal(actual, expectd)
  })
})