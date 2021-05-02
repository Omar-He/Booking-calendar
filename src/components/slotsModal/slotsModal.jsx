import React, { useState, useEffect } from "react";
import { insertConfirmedCall } from "../../helpers/requests";
import Modal from "./modal/modal";
import { toast } from "react-toastify";
import LegendsList from "../legendsList/legendsList";
import SlotsList from "../slotsList/slotsList";
import SubmitPanel from "../submitPanel/submitPanel";

export default function SlotsModal({
  openModal,
  onCloseModal,
  defaultSlots,
  selectedDay,
  getConfirmedSlots,
}) {
  const [slotsToRender, setSlotsToRender] = useState();
  const [panelState, showSubmitPanel] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    setSlotsToRender(defaultSlots);
  }, [defaultSlots]);
  const onSubmitSlot = async (inputValue) => {
    if (inputValue) {
      const submittedDate = new Date(selectedDay);
      submittedDate.setHours(Number(selectedSlot.hour.split(":")[0]));
      toast.success("Done, submitted call for " + submittedDate);
      showSubmitPanel(false);
      onCloseModal();
      await insertConfirmedCall({
        name: "Omar",
        call_reason: inputValue,
        call_date: new Date(submittedDate),
      });
      setTimeout(async () => await getConfirmedSlots(), 300);
      return;
    }
    toast.warn("Please Add reason for the call");
  };
  const onSelectSlot = (selectedKey) => {
    const newArr = slotsToRender.map((element, key) => {
      if (key === selectedKey && element.disabled) {
        showSubmitPanel(false);
        toast.error("Sorry, this slot isn't available");
      }
      if (key === selectedKey && element.confirmed) {
        showSubmitPanel(false);
        toast.error("You already confirmed this slot.");
      }
      if (key === selectedKey && !element.disabled && !element.confirmed) {
        setSelectedSlot(element);
        showSubmitPanel(!element.selected);
        return { ...element, selected: !element.selected };
      } else {
        return { ...element, selected: false };
      }
    });

    setSlotsToRender([...newArr]);
  };
  const onClose = () => {
    showSubmitPanel(false);
    onCloseModal();
  };
  return (
    <Modal open={openModal} title="Pick a time slot" onClose={onClose}>
      <LegendsList />
      {openModal && slotsToRender && (
        <SlotsList slotsToRender={slotsToRender} onSelectSlot={onSelectSlot} />
      )}
      {panelState && <SubmitPanel onSubmitSlot={onSubmitSlot} />}
    </Modal>
  );
}
