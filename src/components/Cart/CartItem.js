import React from 'react';
import PropTypes from 'prop-types';
import CartItemDisplay from './CartItemDisplay';

export default function CartItem({
  reservedListingID, pallets, updateSubtotal, removeListing, crop, unitsPerPallet,
  unitType,
  price,
  maxAvailable,
  usersInterested,
}) {
  if (reservedListingID) {
    return (
      <>
        <CartItemDisplay
          id={reservedListingID}
          crop={crop}
          pallets={pallets}
          unitsPerPallet={unitsPerPallet}
          unitType={unitType}
          price={price}
          updateSubtotal={updateSubtotal}
          removeListing={removeListing}
          maxAvailable={maxAvailable}
          usersInterested={usersInterested}
        />
      </>
    );
  }
  return null;
}

CartItem.propTypes = {
  reservedListingID: PropTypes.string.isRequired,
  pallets: PropTypes.number.isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
  crop: PropTypes.string.isRequired,
  unitsPerPallet: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxAvailable: PropTypes.number.isRequired,
  usersInterested: PropTypes.number.isRequired,
};
