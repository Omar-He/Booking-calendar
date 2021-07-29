export async function getTimeSlots() {
  const req = fetch(
    "https://private-anon-e753068fb6-cfcalendar.apiary-mock.com/mentors/1/agenda"
  );
  const res = await req;
  return res.json();
}

export async function getConfirmedCall() {
  const req = fetch("http://localhost:3001/calls");
  const res = await req;
  return res.json();
}

export async function insertConfirmedCall(info) {
  const req = fetch("http://localhost:3001/calls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  const res = await req;
  return res.json();
}
