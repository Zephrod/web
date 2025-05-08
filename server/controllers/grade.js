exports.submitGrade = async (req, res) => {
    try {
      const { student, course, gradeValue, gradeType } = req.body;
      
      const grade = await Grade.create({
        student,
        course,
        gradeValue,
        gradeType,
        gradedBy: req.user.id
      });
  
      res.status(201).json(grade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.calculateGPA = async (req, res) => {
    try {
      const grades = await Grade.find({ student: req.params.studentId })
        .populate('course', 'credits');
      
      const { totalPoints, totalCredits } = grades.reduce((acc, grade) => {
        if(grade.course?.credits) {
          acc.totalPoints += grade.gradeValue * grade.course.credits;
          acc.totalCredits += grade.course.credits;
        }
        return acc;
      }, { totalPoints: 0, totalCredits: 0 });
  
      const gpa = totalCredits > 0 ? (totalPoints / (totalCredits * 100)) * 4 : 0;
      
      res.json({ gpa: gpa.toFixed(2) });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };