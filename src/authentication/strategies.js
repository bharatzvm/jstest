import passport from 'passport';

const serialDeserialLambda = (user, done) => done(null, user);

const passportStrategies = () => {
  passport.serializeUser(serialDeserialLambda);
  passport.deserializeUser(serialDeserialLambda);
};

export default passportStrategies;
