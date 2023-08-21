import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CSSTransition } from "react-transition-group";

import "./styles/DropDown.css";

const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const eventHandler = (event) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
      // uncomment this for dropdown close on menu click
      handler();
    };
    document.addEventListener("mousedown", eventHandler);
    return () => {
      document.removeEventListener("mousedown", eventHandler);
    };
  });
  return domNode;
};

function DropDown({
  main,
  subHeading,
  subMenu,
  nameType,
  className,
  onDropdown,
  isTouched,
  errorText,
  id = "dropdown",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownHeader, setDropDownHeader] = useState(main);
  const dropdownNode = useClickOutside(() => {
    setIsOpen(false);
  });
  if (nameType === "secondary") {
    const dropDownSelectHandler = (text) => {
      onDropdown(text, id);
      setDropDownHeader(text);
    };
    const dropdownContentTransition = (
      <CSSTransition
        in={isOpen}
        classNames="dropdownContainer"
        timeout={300}
        unmountOnExit
        onEnter={() => setIsOpen(true)}
        onExited={() => setIsOpen(false)}
        nodeRef={dropdownNode}
      >
        <div className="absolute right-0 w-full mt-2 text-center bg-white rounded z-10">
          <ul className="px-3 py-4">
            {subMenu.map((text) => (
              <li key={text} className="py-1">
                <button
                  className="hover:bg-slate-100 w-full h-full cursor-pointer py-2"
                  onClick={() => dropDownSelectHandler(text)}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    );
    return (
      <div
        className={`w-full relative inline-block ${className}`}
        ref={dropdownNode}
      >
        <button
          className="w-full flex justify-between items-center rounded px-5 py-3 bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[#7D7D7D] font-normal">{dropDownHeader}</span>
          <i className="fa fa-angle-down"></i>
        </button>

        {dropdownContentTransition}
      </div>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full capitalize justify-center gap-x-[.1rem] rounded-md bg-white px-3 py-2 text-sm font-semibold ">
          {main}
          <ChevronDownIcon
            className="-mr-1 mt-[0.1rem] h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -left-[2rem] z-10 mt-3 w-[268px] origin-top-right rounded-md bg-transparent backdrop-blur-[2rem] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <div>
            <Menu.Item>
              {({ active }) => (
                <div
                  href="#"
                  className={`block px-4 py-4 text-sm uppercase bg-[#6E2AA3] text-white`}
                >
                  {subHeading}
                </div>
              )}
            </Menu.Item>
            {subMenu.map((text) => {
              return (
                <Menu.Item key={text}>
                  {({ active }) => (
                    <div>
                      <a
                        href="/"
                        className={`${
                          active ? "text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-sm`}
                      >
                        {text}
                      </a>
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDown;
