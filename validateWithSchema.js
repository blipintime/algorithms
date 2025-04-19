const acmeCorp = [
    {
      "id": 1,
      "name": "alice",
      "title": "ceo",
      "salary": 1,
      "age": 3,
      "reports": [
        {
          "id": 2,
          "name": "bob",
          "title": "cfo",
          "salary": 1,
          "reports": [
            {
             "id": 3,
              "name": "charlie",
              "title": "controller",
              "salary": 100,
              "reports": []
            }
          ],
        },
      ]
    },
  ];
  
  const acmeSchema = {
    employee:  [
      {name: 'id', required: true, type: 'number'},
      {name: 'name', required: true, type: 'string'},
      {name: 'title', required: true, type: 'string'},
      {name: 'salary', required: true, type: 'number'},
      {name: 'age', required: false, type: 'number'},
      {name: 'reports', required: false, type: 'array:employee'},
    ]
  };
  
  const charlie = acmeCorp[0].reports[0].reports[0]; 
  const alice = acmeCorp[0]
  
  // Case 1: 
  charlie.reports.push(alice)
  //alice.reports.push(charlie);

const employeeSet = new Set()
const managers = []
function validateEmployee(employee, schema) {
  employeeSet.add(employee)
  const keys = Object.keys(employee)
  // check the schema
  for (let i=0; i<schema.length; i++) {
    const {name: fieldName, type: fieldType, required } = schema[i]
    if (required) {
      if (!keys.includes(fieldName)) {
        return {"ok": false, "message": `${fieldName} is required`}
      }
    }
    if (keys.includes(fieldName)) {
      // must validate
      const fieldValue = employee[fieldName]
      // check type
      if (!fieldType.startsWith('array:')) {
        if (typeof fieldValue !== fieldType) {
          return {"ok": false, "message": `type ${fieldType} expected for ${fieldName}`}
        }
      } else {
        // check each, the only allowed value in the schema is array:employee
        // check each
        managers.push(employee)
        
        // must check each
        for(let j=0; j<fieldValue.length; j++) {
          const employee1 = fieldValue[j]
          if (managers.includes(employee1)) {
            return {"ok": false, "message": `manager can not be a subordinate`}
          }
          const validated = validateEmployee(employee1, schema)
          if (!validated.ok) {
            return validated
          }
        }
        managers.pop()
      }
    }
  }
  // finally check for keys that are not in the shema
  const allowedfieldNames = schema.map(field => field.name)
  for(let i=0; i<keys.length; i++) {
    const fieldName = keys[i]
    if (allowedfieldNames.indexOf(fieldName) === -1) {
      return {"ok": false, "message": `unexpected property ${fieldName}`}
    }
  }

  return { ok: true, message: 'success' }
}

function validate(employees, schema) {
    let valid = false
    console.log('--->employees', employees, 'schema', schema)
    for(let i=0; i<employees.length; i++) {
        const retValue = validateEmployee(employees[i], schema)
        if(!retValue.ok) {
            return retValue
        }
    }
  // Complete this function!
  return { ok: true, message: "success" };
}

const result = validate(acmeCorp, acmeSchema.employee);
console.log('ok:', result.ok);
console.log('message:', result.message)
