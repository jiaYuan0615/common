[![CI](https://github.com/jiaYuan0615/common/actions/workflows/node.js.yml/badge.svg)](https://github.com/jiaYuan0615/common/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/jiaYuan0615/common/badge.svg?branch=main)](https://coveralls.io/github/jiaYuan0615/common?branch=main)

# common

common library

### Version

```bash
NodeJS v12.22.12
NPM 6.14.16
```

### Notice

1. 測試指標

- Line coverage (行覆蓋率) : 每一行是否都有被執行。
- Statement coverage (敘述覆蓋率) : 每個敘述是否都有執行。
- Branch coverage (分支覆蓋率) : 每個條件是否都有執行。
- Function coverage (函數覆蓋率) : 每個函數是否都有執行。

### Tip

如果 nyc 無法正常顯示測試指標，請遵行以下步驟排除

```bash
1. npm i nyc -g
2. rm -rf node_modules package-lock.json
3. npm i
```

### Usage

```bash
import { yieldUpdateItem } from 'jyz-common-library';

const params1 = [1, 2, 3];
const params2 = [2, 3, 4];

console.log(yieldUpdateItem(params1, params2));

// Response
{ shouldUpdate: true, insertItem: [ 4 ], deleteItem: [ 1 ] }
```
