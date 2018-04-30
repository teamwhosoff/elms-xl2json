'use strict';
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: 'excel.xlsx',
    header: {
        rows: 1
    },
    sheets: [{
        name: 'Accounts',
        header: { rows: 1 },
        columnToKey: {
            A: '{{A1}}',
            B: '{{B1}}',
            C: '{{C1}}',
            D: '{{D1}}',
            E: "{{E1}}",
            F: "{{F1}}",
            G: "{{G1}}",
            H: "{{H1}}"
        }
    }, {
        name: 'Teams',
        header: { rows: 1 },
        columnToKey: {
            A: '{{A1}}',
            B: '{{B1}}'
        }
    }, {
        name: 'Users',
        header: { rows: 1 },
        columnToKey: {
            A: '{{A1}}',
            B: '{{B1}}',
            C: '{{C1}}',
            D: '{{D1}}',
            E: "{{E1}}",
            F: "{{F1}}",
            G: "{{G1}}",
            H: "{{H1}}"
        }
    }]
});

result.Accounts.forEach(account => {
    account.uid = new String(account.uid);
    account.emailVerified = account.emailVerified == "TRUE" ? true : false;
    account.disabled = account.disabled == "TRUE" ? true : false;
})

result.Teams.forEach(team => { team.id = team.id.replace(/\s/g,'-'); team.name = team.name.replace(/\s/g,'-') })

result.Users.forEach(user => { user.empId = new String(user.empId); user.team = user.team.replace(/\s/g,'-'); user.isManager = user.isManager == "TRUE" ? true : false; })

console.log(JSON.stringify(result));