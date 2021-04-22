import React, { useMemo, useState, useCallback } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Box,
} from '@material-ui/core';
import { signupUser } from '../../lib/airlock/airlock';
import Fruit1 from '../../assets/images/Fruit1.svg';
import Fruit2 from '../../assets/images/Fruit2.svg';
import Fruit3 from '../../assets/images/Fruit3.svg';

const ROLE_NAMES = ['buyer', 'vendor', 'agency'];
const theme = createMuiTheme({
  spacing: 4,
});
/* eslint-disable no-debugger, no-console */
const useStyles = makeStyles({
  formGroup: {
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  form: {
    width: '100%',
  },
  paper: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageButtons: {
    marginTop: '50%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  underlinedSubtitleText: {
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
    fontWeight: 'bold',
    marginBottom: '2%',

  },
  subtitleText: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  regSubtitleText: {
    textAlign: 'left',
    paddingLeft: '10%',
    fontSize: '30px',
    marginBottom: '2%',
  },
  cenSubtitleText: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  cenRegSubtitleText: {
    textAlign: 'center',
    paddingLeft: '10%',
    fontSize: '30px',
    marginBottom: '2%',
  },
  labelText: {
    fontWeight: 'bold',
  },
  grayButton: {
    backgroundColor: '#5e5e5e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5e5e5e',
    },
  },
  blackButton: {
    backgroundColor: '#373737',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#373737',
    },
    marginTop: '10%',
  },
  greenButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    marginTop: '10%',
  },
  submitButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    width: '50%',
  },
  textBox: {
    width: '70%',
  },
  card: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepper: {
    margin: 'auto',
    width: '60%',
  },
  icon: {
    color: 'red !important',
  },
});
const ROLE_TITLES = ['buyer', 'nonprofit', 'seller'];
const BUTTONS = [
  {
    id: 0,
    title: 'Buyer',
    image: Fruit3,
    styling: useStyles.fruit3,
    fruit: {
      marginTop: '10%',

      height: '134px',
      width: '98px',
      left: '89px',
      top: '46px',
    },
  },
  {
    id: 1,
    title: 'Non-profit or Agency',
    image: Fruit2,
    styling: useStyles.fruit2,

    fruit: {
      marginTop: '10%',
      height: '130px',
      width: '105px',
      left: '96px',
      top: '50px',
    },
  },
  {
    id: 2,
    title: 'Seller',
    image: Fruit1,
    styling: useStyles.fruit1,

    fruit: {
      marginTop: '10%',
      height: '141px',
      width: '91px',
      left: '72px',
      top: '39px',
      // border-radius: '0px',
    },
  },
];

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  org: '',
  phone: '',
  zipcode: '',
  comments: '',
};

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3', 'Confirmation'];
}

export default function RegistrationScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [role, setRole] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    );
  }, [formState, setFormState]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    try {
      signupUser(formState.email, formState.password,
        ROLE_NAMES[role],
        formState.org, parseInt(formState.zipcode, 10), `${formState.firstName} ${formState.lastName}`,
        formState.phone, formState.comments);
    } catch (err) {
      if (err) {
        setErrorMsg(err);
      }
      console.log('Error in signupRegistration');
      console.log(err);
    }
    setFormState(INITIAL_FORM_STATE);
    setLoading(false);
    setCurrentStep(currentStep + 1);
  }, [formState, role, currentStep]);

  const onNext = useCallback(() => {
    if (currentStep >= 3) {
      setCurrentStep(4);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, role]);

  const onPrev = useCallback(() => {
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const roleChange = useCallback((event) => {
    event.preventDefault();
    setRole(parseInt(event.currentTarget.value, 10));
    setCurrentStep(currentStep + 1);
  }, [currentStep, role]);

  const isInvalid = useMemo(() => (
    formState.password !== formState.confirmPassword
      || formState.password === ''
      || formState.email === ''
  ),
  [formState]);

  const repeatPwdCheck = useMemo(() => {
    let msg = '';
    if (formState.password === '' && formState.confirmPassword === '') {
      msg = '';
    } else if (formState.password !== '' && formState.confirmPassword !== '') {
      if (formState.password !== formState.confirmPassword) {
        msg = "Passwords don't match!";
      }
    }
    return msg;
  },
  [formState]);

  const step3Check = useMemo(() => {
    let msg = '';
    if (formState.zipcode !== '' && Number.isNaN(formState.zipcode)) {
      msg = 'Location (zipcode) should hold a number!';
    }
    return msg;
  },
  [formState]);

  const step3IsInvalid = useMemo(() => (
    formState.zipcode === '' || formState.firstName === ''
      || formState.lastName === '' || formState.org === '' || formState.phone === ''
      || formState.zipcode === ''
  ),
  [formState]);

  function Step1() {
    if (currentStep !== 1) {
      return null;
    }
    return [
      <div className={classes.subtitleText}>
        Are you a...
      </div>,
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        {BUTTONS.map((bt) => (
          <Grid
            item
            className={classes.card}
            component={Card}
            xs={12}
            sm={6}
            md={3}
            key={BUTTONS.indexOf(bt)}
          >
            <CardActionArea onClick={roleChange} value={bt.id}>
              <CardMedia
                image={bt.image}
                style={bt.fruit}
              />
              <CardContent>
                <Typography className={classes.labelText}>
                  {bt.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>,
    ];
  }

  function Step4() {
    if (currentStep !== 4) {
      return null;
    }
    return [
      <div>
        <div className={classes.cenSubtitleText}>
          Account Created!
        </div>
        <div className={classes.cenRegSubtitleText}>
          { role === 1 ? 'Please await authentication from Farm2People.'
            : 'Farm2People will be in touch with you shortly.'}
        </div>
      </div>,
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box mt={5}>
            <Button
              type="button"
              className={classes.submitButton}
              color="primary"
              variant="contained"
              style={{ backgroundColor: '#53AA48' }}
              onClick={onPrev}
            >
              {role === 0 ? 'Back To Sign In' : 'Done'}
            </Button>
          </Box>
        </Grid>
      </Grid>,
    ];
  }

  const steps = getSteps();
  return [
    <Box mt={5} mb={5}>
      <Container component="main" maxWidth="md">
        <div>
          <ThemeProvider theme={theme}>
            {(currentStep === 1 || currentStep === 4) && (
            <Typography className={classes.labelText} color="textPrimary" gutterBottom variant="h4" align="center">
              Sign Up
            </Typography>
            )}
            {(currentStep === 2 || currentStep === 3) && (
            <Typography color="textPrimary" gutterBottom variant="h4" align="center">
              Sign up as a&nbsp;
              <span className={classes.underlinedSubtitleText}>
                {ROLE_TITLES[role]}
                {role}
              </span>
              {(role === 1)
                && (
                <>
                  &nbsp;or&nbsp;
                  <span className={classes.underlinedSubtitleText}>
                    agency
                  </span>
                </>
                )}
            </Typography>
            )}
          </ThemeProvider>
          <Stepper activeStep={currentStep - 1} alternativeLabel className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <form
            className={classes.form}
          >
            <Grid
              container
              align="center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Step1 />
              </Grid>
              <Container maxWidth="sm">
                <Grid item xs={12}>
                  <Step2
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    repeatPwdCheck={repeatPwdCheck}
                    isInvalid={isInvalid}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step3
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    role={role}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    step3Check={step3Check}
                    step3IsInvalid={step3IsInvalid}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step4 />
                </Grid>
              </Container>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>,
  ];
}

function Step2({
  currentStep, formState, classes, handleChange, onPrev, onNext, errorMsg, repeatPwdCheck,
  isInvalid,
}) {
  if (currentStep !== 2) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Create your account
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formState.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formState.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          type="password"
          fullWidth
          name="confirmPassword"
          id="standard-password-input"
          value={formState.confirmPassword}
          label="Confirm Password"
          onChange={handleChange}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {repeatPwdCheck && <Grid item xs={12} className="error-msg">{repeatPwdCheck}</Grid>}
      <Grid item xs={12} sm={6}>
        <Button
          type="button"
          onClick={onPrev}
          fullWidth
          color="primary"
          variant="contained"
          className={classes.blackButton}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className={classes.greenButton}
          type="button"
          onClick={onNext}
          fullWidth
          color="primary"
          variant="contained"
          disabled={isInvalid}
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step3({
  currentStep, formState, classes, role, handleChange, onPrev, handleSubmit, errorMsg,
  step3Check, step3IsInvalid, loading,
}) {
  const COMPANY_NAMES = ['Company Name', 'Agency', 'Farm Name'];
  if (currentStep !== 3) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Contact Information
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="org"
          label={COMPANY_NAMES[role]}
          value={formState.org}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Location"
          name="zipcode"
          value={formState.zipcode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="fname"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="lname"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Comments"
          name="comments"
          value={formState.comments}
          onChange={handleChange}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {step3Check && <Grid item xs={12} className="error-msg">{step3Check}</Grid>}
      <Grid item xs={12} sm={6}>
        <Button
          type="button"
          onClick={onPrev}
          fullWidth
          color="primary"
          variant="contained"
          className={classes.blackButton}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className={classes.greenButton}
          type="button"
          onClick={handleSubmit}
          fullWidth
          color="primary"
          variant="contained"
          disabled={step3IsInvalid || loading}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}
