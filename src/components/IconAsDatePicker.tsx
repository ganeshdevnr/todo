import { useState, useRef, FC } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Timer } from "@mui/icons-material"; // Ensure correct import
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IconAsDatePickerProps {
  onDateSelect: any;
}

const IconAsDatePicker: FC<IconAsDatePickerProps> = ({ onDateSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const iconRef = useRef(null); // Reference for positioning

  return (
    <>
      <Timer
        ref={iconRef} // Attach ref to the icon
        onClick={() => setOpen(true)}
        className="mt-2 cursor-pointer text-2xl text-gray-600 hover:text-green-500"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast={true}
          open={open}
          onClose={() => setOpen(false)}
          value={selectedDate}
          onChange={(newDate: any) => {
            setSelectedDate(newDate);
            setOpen(false); // Close picker after selection
            if (onDateSelect) {
              onDateSelect(newDate); // Fire event when date is selected
            }
          }}
          slots={{
            textField: () => null, // Hide text field
          }}
          slotProps={{
            popper: {
              anchorEl: iconRef.current, // Set popper position relative to icon
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default IconAsDatePicker;
