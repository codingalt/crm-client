import React from 'react'
import { ClipLoader } from 'react-spinners';

const ClipSpinner = ({ size = 43, color = "#01ABAB", speedMultiplier=0.9 }) => {
  return (
    <ClipLoader color={color} size={size} speedMultiplier={speedMultiplier} />
  );
};

export default ClipSpinner