const express = require('express');
const firebase = require('firebase');

// eslint-disable-next-line new-cap
const router = express.Router();
const database = firebase.database();
const studentsRef = database.ref('/students');

router.post('/', (request, response) => {
  const createdStudent = studentsRef.push(request.body);
  response.send(createdStudent.key);
});

router.get('/', (request, response) => {
  studentsRef.on('value', (students) => {
    response.send(students.val());
  });
});

router.get('/:id', (request, response) => {
  const studentRef = database.ref(`/students/${request.params.id}`);
  studentRef.on('value', (student) => {
    response.send(student.val());
  });
});

router.delete('/:id', (request, response) => {
  // TODO: REVISAR, CAN'T SET HEADERS AFTER THEY ARE SEN'T
  const studentRef = database.ref(`/students/${request.params.id}`);
  // const operation = studentRef.remove().then(() => {
  studentRef.remove().then(() => {
    response.send();
  });
});

module.exports = router;
