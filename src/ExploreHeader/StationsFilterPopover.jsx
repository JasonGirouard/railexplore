import React, { useEffect, useRef} from "react";

import StationsFilterPopoverContent from "./StationsFilterPopoverContent";
import "./Filters.css";

const StationsFilterPopover = ({ buttonRef, onClose }) => {
   const PopoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        //check if the clicked target is outside both the Popover (PopoverRef.current) and the button (buttonRef.current).
        //If it is, we call the onClose function to close the Popover.
        PopoverRef.current &&
        !PopoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, onClose]);

  return (
    <div ref={PopoverRef} className="filters-Popover long">
      <StationsFilterPopoverContent/>
    </div>
  );
};

export default StationsFilterPopover;