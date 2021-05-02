import React from "react";
import classNames from "classnames";
import "./slotsList.scss";
const SlotsList = ({ slotsToRender, onSelectSlot }) => {
  return (
    <ul className="slots-list">
      {slotsToRender.map((slot, key) => {
        const { hour, selected, disabled, confirmed } = slot;
        return (
          <li
            key={key}
            className={classNames("time-slot", {
              selected: selected,
              disabled: disabled,
              confirmed: confirmed,
            })}
            onClick={() => onSelectSlot(key)}
          >
            {hour}
          </li>
        );
      })}
    </ul>
  );
};

export default SlotsList;
