/** 
 * config cors. cors sert a relier le front et le back au travers d'appel http
 */
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
  };
  
  module.exports = corsOptions;