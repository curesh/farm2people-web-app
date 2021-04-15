import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Work Sans',
  },
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '0.1rem',
  },
  subheading: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1rem',
  },
  text: {
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
  },
  numberInputField: {
    maxWidth: '3.6em',
    fontFamily: 'Work Sans',
    padding: '0',
    fontSize: '1.2rem',
  },
  infoLabel: {
    fontWeight: 700,
    fontFamily: 'Work Sans',
    fontSize: '1.1rem',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '0.1rem',
  },
});

export default function ListingInputField({
  id, name, label, type, val, onChange, options,
  placeholder,
}) {
  const classes = useStyles();
  function getInputProps() {
    let InputProps = {
      classes: {
        input: classes.text,
      },
    };
    if (type === 'number') {
      InputProps = {
        ...InputProps,
        inputProps: {
          style: {
            textAlign: 'center',
          },
        },
      };
    }
    return InputProps;
  }
  const inputProps = getInputProps({});
  if (type === 'currency') {
    return (
      <>
        <CurrencyTextField
          variant="outlined"
          placeholder="0.00"
          currencySymbol="$"
          value={val}
          decimalCharacter="."
          onChange={onChange}
          textAlign="left"
          size="small"
        />
      </>
    );
  }
  if (type === 'autoComplete') {
    return (
      <>
        <Grid item xs={12}>
          <Typography className={classes.infoLabel} variant="h6" component="h6">{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            autoComplete
            options={options}
            onChange={onChange}
            value={val}
            renderInput={(params) => (
              <TextField
                name={name}
                {...params}
                placeholder={placeholder}
                variant="outlined"
                required
              />
            )}
            classes={{ input: classes.text }}
          />
        </Grid>
      </>
    );
  }

  if (type === 'multiline') {
    return (
      <>
        <Grid item xs={12}>
          <Typography className={classes.infoLabel} variant="h6" component="h6">{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            rows={3}
            id={id}
            name={name}
            type={type}
            value={val}
            InputProps={inputProps}
            onChange={onChange}
            className={classes.inputField}
            variant="outlined"
            placeholder={placeholder}
            fullWidth
          />
        </Grid>
      </>
    );
  }

  if (type === 'number') {
    return (
      <>
        <IconButton color="primary">
          <RemoveIcon />
        </IconButton>
        <TextField
          id={id}
          name={name}
          value={val}
          InputProps={inputProps}
          onChange={onChange}
          className={classes.numberInputField}
          variant="outlined"
          size="small"
        />
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography className={classes.subheading} variant="h6" component="h6">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id={id}
          name={name}
          type={type}
          value={val}
          InputProps={inputProps}
          onChange={onChange}
          className={classes.inputField}
          variant="outlined"
          placeholder={placeholder}
          size="small"
        />
        {(type === 'date')
        && (
        <>
          <IconButton color="primary">
            <CalendarTodayIcon />
          </IconButton>
        </>
        )}
      </Grid>
    </>
  );
}

ListingInputField.defaultProps = {
  id: 'outlined-basic',
  type: '',
  options: [],
  placeholder: '',
  label: '',
};

ListingInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};
