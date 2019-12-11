'use strict';
const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
const result = excelToJson({
    sourceFile: 'carcomplete.xlsx',
    header:{
          rows: 1
      },
      columnToKey: {
        A: 'node',
        B: 'name',
        C: 'description',
        D: 'stepno',
        E: 'stepdescription',
        F: 'expected',
        G: 'hop',
        H: 'screenname',
        I: 'fieldname',
        J: 'fieldtype',
        K: 'keyword',
        L: 'selector',
        M: 'testdata',
        N: 'brdreference',
        O: 'application',
        P: 'automatable'   
    }


});

console.log(result);
var resultdatajson = JSON.stringify(result);
fs.writeFileSync('carcomplete.json', resultdatajson);
