const Student = User.discriminator('student', 
    new mongoose.Schema({
      studentId: { type: String, unique: true },
      enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course' 
      }]
    })
  );