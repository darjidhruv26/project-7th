import React, { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";

import { CSSTransition } from "react-transition-group";

import Backdrop from "../ui/Backdrop";
import "./../ui/styles/BackDrop.css";
import "./../ui/styles/Modal.css";

const ModalOverlay = forwardRef((props, ref) => {
  const content = (
    <div ref={ref} className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook"));
});

const UploadModal = (props) => {
  const modalRef = useRef(null);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={modalRef}
      >
        <ModalOverlay ref={modalRef} {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default UploadModal;
