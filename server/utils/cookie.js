module.exports = {
    // Set JWT cookie
    setAuthCookie: (res, token) => {
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // on est paas en prod on verra plus tard 
        maxAge: 3600000, // 1 heure en millisecondes
        sameSite: 'strict'
        });
    },
  
    // Clear authentication cookie
    clearAuthCookie: (res) => {
      res.clearCookie('jwt', {
        maxAge: 0,
        httpOnly: true,
        path: '/',
        sameSite: 'Strict',
        expires: new Date(0)
      });
    }
  };