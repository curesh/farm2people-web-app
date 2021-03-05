import { React, useState } from 'react';
import Airtable from 'airtable';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CartItem from './CartItemDisplay';

// airtable setup
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);
const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function CartScreenHelper({ cropList }) {
  const classes = useStyles();
  const [cropListState, setCropListState] = useState();

  function newRemoveListing(id) {
    base('Reserved Listings').destroy([id]);
    // setCropListState(cropListState.filter((listing) => listing.id !== id));
  }

  // cropListState.map((listing) => {listing.props.removeListing = newRemoveListing);
  // setSelectedCards({ ...selectedCards, [key]: value });
  // console.log('hello');
  // console.log(cropListState.map((listing) => ({ ...listing.props, val: newRemoveListing })));
  const copy = [...cropList];
  const promiseArray = copy.map((element) => new Promise((resolve) => resolve(
    <CartItem
      key={element.props.id}
      id={element.props.id}
      reservedListingID={element.props.id}
      pallets={element.props.pallets}
      listingID={element.props.listingID}
      updateSubtotal={element.props.updateSubtotal}
      removeListing={newRemoveListing}
      crop={element.props.crop}
      unitsPerPallet={element.props.unitsPerPallet}
      unitType={element.props.unitType}
      price={element.props.price}
      maxAvailable={element.props.maxAvailable}
      usersInterested={element.props.usersInterested}
    />,
  )));

  Promise.all(promiseArray).then((cartPromiseListings) => {
    setCropListState(cartPromiseListings);
  });
  //   const item = { ...copy[1] };
  //   item.props.val = { newRemoveListing };
  //   console.log(copy);
  // make changes to ingredients
  //   for (let i = 0; i < copy.length; i += 1) {
  //     copy[i].props.removeListing = { newRemoveListing };
  //     console.log(copy[i]);
  //   }
  //   setCropListState(copy);

  //   const newCropList = Object.assign(cropListState, {
  //     ...cropListState,
  //     [cropListState.val]: { newRemoveListing },
  //   });
  //   console.log(newCropList);

  //   cropListState.forEach((element) => {
  //     element.props.removeListing = newRemoveListing;
  //   });

  return (
    <div className={classes.root}>
      <p>{cropListState}</p>
    </div>
  );
}

CartScreenHelper.propTypes = {

  cropList: PropTypes.arrayOf({
    label: PropTypes.node,
  }).isRequired,
};
