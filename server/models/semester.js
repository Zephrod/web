const gradeSchema = new mongoose.Schema({
    student: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course',
      required: true 
    },
    gradeValue: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    gradeType: {
      type: String,
      enum: ['exam', 'assignment', 'participation', 'quiz'],
      default: 'exam'
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, { timestamps: true });