const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['student', 'teacher', 'staff'],
      required: true 
    }
  }, { discriminatorKey: 'role' }); // Magic happens here