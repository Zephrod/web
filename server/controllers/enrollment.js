const Enrollment = require('../models/Enrollment');
const Student = require('../models/student');
const Course = require('../models/course');
const Semester = require('../models/semester');

exports.enrollStudent = async (req, res) => {
  const { studentId, courseId, semesterId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    const semester = await Semester.findById(semesterId);

    if (!student || !course || !semester) {
      return res.status(404).json({ message: 'Student, Course or Semester not found' });
    }

    const enrollment = new Enrollment({
      student: student._id,
      course: course._id,
      semester: semester._id
    });

    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
