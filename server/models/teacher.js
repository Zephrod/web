const Teacher = User.discriminator('teacher',
    new mongoose.Schema({
      department: String,
      office: String
    })
  );