const xlsx = require('node-xlsx')
const fs = require('fs')
const moment = require('moment')

const validDate = (val) => {
  let year = moment().year()
  let month = moment().month()
  if (month < 10) {
    month = `0${month}`
  }
  if (val < 10) {
    val = `0${val}`
  }
  let date = `${year}-${month}-${val}`
  return moment(date).isValid()
}

const createDate = () => {
  const ret = []
  for (let i = 1; i <= 31; i++) {
    if (validDate(i)) {
      ret.push(i)
    }
  }
  return ret
}

const getColumnIndex = (num) => {
  let colName = '',
    dividend = Math.floor(Math.abs(num)),
    rest;

  while (dividend > 0) {
    rest = (dividend - 1) % 26;
    colName = String.fromCharCode(65 + rest) + colName;
    dividend = parseInt((dividend - rest)/26);
  }
  return colName;
}

const writeExcel = () => {
  const columns = [
    {
      label: '项目名',
      wpx: 200
    },
    {
      label: '功能模块/类别',
      wpx: 100
    },
    {
      label: '一级功能点',
      wpx: 100
    },
    {
      label: '二级功能点',
      wpx: 100
    },
    {
      label: '三级功能点',
      wpx: 100
    },
    {
      label: '估算工时',
      wpx: 40
    },
    {
      label: '备注',
      wpx: 100
    },
    {
      label: '优先级',
      wpx: 40
    },
    {
      label: '月份',
      wpx: 40
    },
    {
      label: '实际工时',
      wpx: 40
    },
    {
      label: '已完成',
      wpx: 40
    }
  ]
  
  const options = {
    '!cols': columns.map(item => {
      return {
        wpx: item.wpx
      }
    })
  }
  const headerList = columns.map(item => item.label).concat(createDate())

  const data = [
    headerList
  ]
  const month = moment().format('YYYYMM')
  const buffer = xlsx.build([{ name: "工时评估", data }], options)
  fs.writeFileSync(`excel/林志忠-${month}-工时评估与执行.xlsx`, buffer)
  console.log(`${month} 工时评估，写入成功`)
}

// writeExcel()