import React, { createContext, useContext, useState } from "react";

const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  //Open and cloe side Navbar
  const [openNav, setOpenNav] = useState(false);

  //loader context
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  //Modals opening and closing
  const [isReModalOpen, setIsReModalOpen] = useState(false);
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({ title: "", body: "" });
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCancelSessionOpen, setIsCancelSessionOpen] = useState(false);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const [isConfirmSelectionOpen, setIsConfirmSelectionOpen] = useState(false);
  const [isSubjectDetailsOpen, setIsSubjectDetailsOpen] = useState(false);
  const [editEvent, setEditEvent] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isErrModalOpen, setIsErrModalOpen] = useState(false);
  const [modalErr, setModalErr] = useState({ title: "", body: "" });

  return (
    <globalContext.Provider
      value={{
        openNav,
        setOpenNav,
        isLoaderOpen,
        setIsLoaderOpen,
        isReModalOpen,
        setIsReModalOpen,
        isMsgModalOpen,
        setIsMsgModalOpen,
        modalMsg,
        setModalMsg,
        isUploadOpen,
        setIsUploadOpen,
        isCancelSessionOpen,
        setIsCancelSessionOpen,
        isChangePassOpen,
        setIsChangePassOpen,
        isConfirmSelectionOpen,
        setIsConfirmSelectionOpen,
        isSubjectDetailsOpen,
        setIsSubjectDetailsOpen,
        editEvent,
        setEditEvent,
        openEditModal,
        setOpenEditModal,
        isUploadDocOpen,
        setIsUploadDocOpen,
        isErrModalOpen,
        setIsErrModalOpen,
        modalErr,
        setModalErr,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(globalContext);
};
