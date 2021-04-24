import React from "react";

export function Avatar() {
  return (
    <div className="rounded-full overflow-hidden flex flex-col justify-center align-center">
      <img
        className="object-cover h-10 w-10"
        src="/me.jpg"
        alt="set your picture here"
      />
    </div>
  );
}
