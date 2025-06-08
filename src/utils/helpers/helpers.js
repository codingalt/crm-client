export const extractErrors = (errors) => {
  if (errors) {
    const errorsArray = Object.keys(errors).reduce((acc, key) => {
      return acc.concat(errors[key]);
    }, []);
    return errorsArray;
  }
};

// Format Time 
export const formatTime = (time) => {
  if (time > 0) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `00:00`;
  }
};

// Truncate Text 
export const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? `${text?.substring(0, maxLength)}..` : text;
};

// Helper function to check if a time slot has passed
export const isTimeSlotPassed = (slot) => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // For midnight slot (0-6), it's passed if current time is after 6 AM
  if (slot.id === 'midnight') {
    return currentHour >= 6;
  }
  
  // For other slots, check if current time is past the end hour
  return currentHour >= slot.endHour;
};