import React, { useState } from 'react';
import './FarmCard.css';
import {
  Card, CardContent, Chip, Collapse, Grid, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';

/* Custom styling for material-ui components */
const useStyles = makeStyles({
  cardContainer: { // Overall card container
    background: 'lightblue', // change to lightblue for testing, #FFFFFF for actual
    borderWidth: '0px',
    borderColor: '#53AA48',
    margin: '5%',
    borderRadius: '20px',
    fontFamily: 'Work Sans',
  },
  collapsedBorder: {
    borderLeftWidth: '15px',
  },
  collapsedContent: {
    width: '95%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  expandedBorder: { // Border if card is expanded
    borderTopWidth: '20px',
  },
  expandedContent: {
    width: '93%',
    marginRight: '2%',
    marginLeft: '2%',
    fontSize: '16px',
  },
  headerContainer: {
    color: '#373737',
    fontFamily: 'Work Sans',
    marginTop: '3%',
    marginLeft: '4%',
    paddingRight: '8%',
  },
  titleContainer: {
    width: '93%',
  },
  titleText: {
    fontSize: '63%',
    textDecoration: 'underline',
    textDecorationColor: '#373737',
  },
  addressContainer: {
    width: '40%',
  },
  subTitleText: {
    fontSize: '50%',
    marginTop: '3px',
    marginLeft: '6%',
  },
  operationTags: {
    background: '#DBE2ED',
    color: '#373737',
    borderRadius: '6px',
    marginTop: '-3%',
    marginRight: '2%',
    paddingLeft: '0.8%',
    paddingRight: '0.8%',
    fontFamily: 'Work Sans',
    fontSize: '45%',
  },
  marketTags: {
    background: '#DBE2ED',
    color: '#373737',
    borderRadius: '6px',
    marginLeft: '1%',
    marginRight: '0.5%',
    paddingLeft: '0.7%',
    paddingRight: '0.7%',
    fontFamily: 'Work Sans',
    fontSize: '16px',
  },
  descriptionContainer: {
    marginTop: '-1.5%',
    marginBottom: '2%',
  },
  marketContainer: {
    marginTop: '3%',
  },
  iconColour: {
    color: '#53AA48',
  },
});

export default function FarmCard(props) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    farmName, address, zipCode, description, operationTypeTags, marketTags,
  } = props;

  return (
    <Card
      className={[
        classes.cardContainer,
        isExpanded ? classes.expandedBorder : classes.collapsedBorder,
      ]}
      variant="outlined"
    >
      {/* Header/non-collapsed card contains farm name, expand/collapse icon, tags for op type */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.headerContainer}
      >
        {/* Contains title (farm name) and subtitle (location) */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="start"
          className={classes.titleContainer}
        >
          <div className={classes.titleText}>
            {farmName}
          </div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="start"
            className={classes.addressContainer}
          >
            <div className={classes.subTitleText}>
              {address}
            </div>
            { // Only show zipcode if it exists
              (zipCode !== -1)
              && (
                <div className={classes.subTitleText}>
                  {zipCode}
                </div>
              )
            }
          </Grid>
        </Grid>
        <IconButton
          className={classes.iconColour}
          // On icon click, collapse or expand the card
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded && <ExpandMoreIcon />}
          {isExpanded && <ExpandLessIcon />}
        </IconButton>
      </Grid>
      <CardContent className={classes.collapsedContent}>
        {operationTypeTags.map((tag) => (
          <Chip
            label={tag}
            className={classes.operationTags}
            size="medium"
            variant="default"
            classes="tags"
          />
        ))}
      </CardContent>
      {/* If uncollapsed, shows description and additional tags */}
      <Collapse in={isExpanded} timout="auto" unmountOnExit>
        <CardContent className={classes.expandedContent}>
          <div>
            <div className={classes.descriptionContainer}>
              {description}
            </div>
          </div>
          <Grid /* Used to keep Market + market tags in 1 row */
            container
            direction="row"
            alignItems="center"
            className={classes.marketContainer}
          >
            <div>
              Market:
            </div>
            {marketTags.map((tag) => (
              <Chip
                label={tag}
                className={classes.marketTags}
                size="small"
                variant="default"
              />
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

FarmCard.propTypes = {
  farmName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  operationTypeTags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
  }).isRequired,
  marketTags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
  }).isRequired,
};