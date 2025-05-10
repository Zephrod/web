const Course = require('../models/course');
exports.createCourse = async (req, res, next) => {
    try {
      // Add validation for student/course existence
      const student = await User.findById(req.body.student);
      const course = await Course.findById(req.body.course);
      
      if (!student || student.role !== 'student') {
        return res.status(400).json({ error: 'Invalid student ID' });
      }
      
      if (!course) {
        return res.status(400).json({ error: 'Invalid course ID' });
      }

      const enrollment = await createDoc(Enrollment, req.body);
      res.status(201).json({
        student: enrollment.student,
        course: enrollment.course,
        status: enrollment.status
      });
    } catch (err) {
      next(err);
    }
  },

exports.updateSchedule = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { schedule: req.body.schedule },
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourses = async (req, res) => {
    try {
      console.log('Attempting to fetch courses');
      const courses = await Course.find().lean();
      console.log(`Found ${courses.length} courses`);
      
      if (!courses.length) {
        console.log('No courses found in database');
        return res.status(404).json({ message: "No courses available" });
      }
  
      res.json(courses);
    } catch (error) {
      console.error('Course fetch error:', error);
      res.status(500).json({ 
        error: error.message,
        stack: error.stack
      });
    }
  };

exports.assignProfessor = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { professor: req.body.professorId },
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};