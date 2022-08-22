import { useState } from "react";

const useOpenModal = (initialValue) => {
  const [oepn, setOepn] = useState(initialValue);
  const handleClose = () => setOepn(false);
  const handleOpen = () => setOepn(true);
  return [oepn, handleOpen, handleClose];
};

export default useOpenModal;
