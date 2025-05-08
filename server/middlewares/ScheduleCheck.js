const checkScheduleConflicts = async (req, res, next) => {
    try {
      const course = req.body;
      const existingCourses = await Course.find({
        professor: course.professor,
        'schedule.weeks.weekNumber': { $in: course.schedule.weeks.map(w => w.weekNumber) }
      });
      
      const hasConflict = existingCourses.some(existing => {
        return existing.schedule.weeks.some(existingWeek => {
          const newWeek = course.schedule.weeks.find(w => w.weekNumber === existingWeek.weekNumber);
          if (!newWeek) return false;
          
          return existingWeek.days.some(existingDay => {
            return newWeek.days.some(newDay => {
              if (existingDay.day !== newDay.day) return false;
              return timeOverlap(existingDay, newDay);
            });
          });
        });
      });
  
      if (hasConflict) return res.status(409).json({ error: 'Schedule conflict detected' });
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function timeOverlap(a, b) {
    const startA = timeToMinutes(a.startTime);
    const endA = timeToMinutes(a.endTime);
    const startB = timeToMinutes(b.startTime);
    const endB = timeToMinutes(b.endTime);
    return startA < endB && startB < endA;
  }
  
  module.exports = { checkScheduleConflicts };