import React, { useCallback, useState, KeyboardEvent, useEffect } from "react";
import { MicrophoneIcon, SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { FunctionDelegate } from "function-delegate";

interface SearchInputProps {
  onSearch(text: string): void;
  rootClassName?: string;
  getQueryDelegate?: FunctionDelegate<() => string>;
}

export function SearchInput({
  onSearch,
  rootClassName,
  getQueryDelegate,
}: SearchInputProps) {
  const router = useRouter();
  const [text, setText] = useState((router.query.q as string) ?? "");
  // const [isOpen, setIsOpen] = useState(false);

  const onKeyup = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setText("");
    } else if (event.key === "Enter") {
      onSearch(event.currentTarget.value);
      event.currentTarget.blur();
    }
  }, []);

  useEffect(() => {
    if (getQueryDelegate) {
      getQueryDelegate.callback = () => {
        return text;
      };
    }
  }, [getQueryDelegate, text]);

  // useEffect(() => {
  //   function onDocumentTap() {
  //     setIsOpen(false);
  //   }

  //   window.document.addEventListener("mouseup", onDocumentTap);
  //   return () => window.document.removeEventListener("mouseup", onDocumentTap);
  // }, []);

  // const showDropdown = isOpen && data && data.length !== 0;

  rootClassName = rootClassName || "w-full";

  return (
    <div className={rootClassName} onMouseUp={(e) => e.stopPropagation()}>
      <div
        className={`flex flex-col items-stretch hover:shadow-lg
      ${
        // showDropdown
        // ? "rounded-tl-lg rounded-tr-lg border border-transparent shadow-lg"
        // :
        "rounded-full border dark:border-yellow-400"
      }`}
      >
        <div className={`flex flex-row items-center w-full`}>
          <SearchIcon className="h-5 w-5 ml-4 text-gray-400" />
          <input
            onKeyUp={onKeyup}
            className="flex-1 p-3 text-sm text-black dark:text-white bg-transparent focus:outline-none"
            value={text}
            tabIndex={-1}
            onChange={(e) => {
              setText(e.target.value);
            }}
            // onFocus={(e) => setIsOpen(true)}
          />
          <MicrophoneIcon className="h-5 w-5 mr-4 text-blue-400" />
        </div>
        {/* <div
          className={` ${
            showDropdown
              ? "border-b border-gray-100"
              : "border-b-0 bg-transparent"
          } h-0.5 mx-2`}
        ></div> */}
        {/* {showDropdown && (
          <div className=" py-2 absolute top-full left-0 right-0 shadow-lg bg-white w-full rounded-bl-lg rounded-br-lg">
            <div className="overflow-y-auto max-h-72 ">
              <div className={`flex flex-col items-stretch justify-center`}>
                {data.map((item, i) => (
                  <div
                    key={i}
                    className="px-4 h-12 truncate py-3 hover:bg-gray-100 cursor-pointer text-xs text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: item.htmlTitle,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
