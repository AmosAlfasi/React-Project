import { useState } from "react";

const useOpenModal = (initialValue) => {
  const [open, setOepn] = useState(initialValue);
  const handleClose = () => setOepn(false);
  const handleOpen = () => setOepn(true);
  return [open, handleOpen, handleClose];
};

export default useOpenModal;
