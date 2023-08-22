const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// GET /students/:studentId
router.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    try {
        const student = await Student.findOne({ studentId });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /students
router.post('/', async (req, res) => {
    const studentData = req.body;
    const studentId = studentData.studentId;

    try {
        let student = await Student.findOne({ studentId });

        if (!student) {
            student = new Student(studentData);
        } else {
            student = await Student.findOneAndUpdate({ studentId }, studentData, { new: true });
        }

        await student.save();
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /students/:studentId/courses/:courseId
router.get('/:studentId/courses/:courseId', async (req, res) => {
    const { studentId, courseId } = req.params;
    try {
        const student = await Student.findOne({ studentId });
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        const course = student.courses.find(course => course.courseId === courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found for the student' });
            return;
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
