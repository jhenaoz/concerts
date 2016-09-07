var express = require('express');
var firebase = require("firebase");
var router = express.Router();
const database = firebase.database();
const studentsRef = database.ref('/students');

router.post('/', (request, response) =>{
  var createdStudent = studentsRef.push(request.body);
  response.send(createdStudent.key);
});
router.get('/', (request, response)=>{
  studentsRef.on('value', (students) =>{
    response.send(students.val());
  });
});
router.get('/:id', (request, response)=>{
  let studentRef = database.ref(`/students/${request.params.id}`);
  studentRef.on('value', (student) => {
    response.send(student.val());
  });
});
router.delete('/:id', (request, response) =>{
  // TODO: REVISAR, CAN'T SET HEADERS AFTER THEY ARE SEN'T
  let studentRef = database.ref(`/students/${request.params.id}`);
  var operation = studentRef.remove().then(() => {
    response.send();
  });
});

module.exports = router;
