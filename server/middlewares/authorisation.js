exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  };
  
  exports.professorOnly = (req, res, next) => {
    if (req.user.role !== 'professor') {
      return res.status(403).json({ message: 'Professor access required' });
    }
    next();
  };