const Student = User.discriminator('student', 
  new mongoose.Schema({
    studentId: { type: String, unique: true },
    enrollmentDate: { type: Date, required: true },
    graduationDate: Date,
    program: { type: String, required: true },
    enrolledCourses: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course' 
    }]
  })
);