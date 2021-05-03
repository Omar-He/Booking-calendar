import { render, fireEvent, waitFor } from "@testing-library/react";
import Main from "../components/main";

test("Component Successfully rendered", () => {
  const { container, getByText } = render(<Main />);
  const mainWrapper = container.querySelector(".calendar-container");
  expect(mainWrapper).toBeVisible();
  const mainTitle = getByText("CareerFoundry booking calendar");
  expect(mainTitle).toBeVisible();
});

const portalRoot = document.createElement("div");
portalRoot.setAttribute("id", "portal");
document.body.appendChild(portalRoot);

test("Modal Successfully rendered", async () => {
  const { container } = render(<Main />, {
    container: document.body,
  });
  const calendarTile = container.querySelector(".react-calendar__tile");
  expect(calendarTile).toBeVisible();
  fireEvent.click(calendarTile);

  await waitFor(() => {
    const modalHeader = container.querySelector(".modal-header");
    expect(modalHeader).toBeVisible();
  });
});
