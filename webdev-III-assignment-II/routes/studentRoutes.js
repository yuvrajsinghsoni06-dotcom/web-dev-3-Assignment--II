const express = require('express');
const students = require('../data/students');

const router = express.Router();

// Helper: validate a positive integer student ID.
function getStudentId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /students - View all students.
router.get('/', (req, res) => {
  res.status(200).json({ success: true, count: students.length, data: students });
});

// GET /students/:id - View one student by ID.
router.get('/:id', (req, res) => {
  const id = getStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer.' });
  }

  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  res.status(200).json({ success: true, data: student });
});

// POST /students - Add a new student.
router.post('/', (req, res) => {
  const { name, age, course, email } = req.body || {};

  if (typeof name !== 'string' || !name.trim() || !Number.isInteger(age) || age <= 0 ||
      typeof course !== 'string' || !course.trim() || typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid name, positive integer age, course, and email.'
    });
  }

  const newId = students.length ? Math.max(...students.map((student) => student.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name: name.trim(),
    age,
    course: course.trim(),
    email: email.trim()
  };

  students.push(newStudent);
  res.status(201).json({ success: true, message: 'Student created successfully.', data: newStudent });
});

// PUT /students/:id - Update all editable fields of a student.
router.put('/:id', (req, res) => {
  const id = getStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer.' });
  }

  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  const { name, age, course, email } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || !Number.isInteger(age) || age <= 0 ||
      typeof course !== 'string' || !course.trim() || typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid name, positive integer age, course, and email.'
    });
  }

  student.name = name.trim();
  student.age = age;
  student.course = course.trim();
  student.email = email.trim();

  res.status(200).json({ success: true, message: 'Student updated successfully.', data: student });
});

// DELETE /students/:id - Delete a student by ID.
router.delete('/:id', (req, res) => {
  const id = getStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer.' });
  }

  const index = students.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.status(200).json({ success: true, message: 'Student deleted successfully.', data: deletedStudent });
});

module.exports = router;
