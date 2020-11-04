import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText,getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";
import axios from 'axios';

afterEach(cleanup);
describe("Application" , () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);
    await waitForElement(() => getByText(container,"Archie Cohen"));
    
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    /* Check for Saving mode after clicking Save */
    expect(getByText(appointment,"Saving")).toBeInTheDocument();
    /* Check that appointment is created with student name Lydia Miller-Jones  */
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    /* Check to see if no of spots remaining is updated for the day(Monday) appointment is created*/
    const days = getAllByTestId(container,"day");
    const day = days.find(day => queryByText(day,"Monday"));
    expect(getByText(day,"no spots remaining")).toBeInTheDocument(); 
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the Delete button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment,/delete the appointment?/i)).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment,"Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment,"Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment,"Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container,"day");
    const day = days.find(day => queryByText(day,"Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
    
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 3. Click the Edit button on booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  expect(queryByAltText(appointment,"Edit")).toBeInTheDocument();
  fireEvent.click(queryByAltText(appointment,"Edit"));

  // 7. Change the input student name and click on Save
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: {value: "Lydia Miller-Jones"}
  });
  fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

  expect(queryByText(appointment,"Save")).toBeInTheDocument();


  fireEvent.click(getByText(appointment,"Save"));

  // 8. Check that the element with the text 'Saving' is displayed. 
  expect(getByText(appointment,"Saving")).toBeInTheDocument();

  // 9 .Wait for the new appointment to be displayed.
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  
  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const days = getAllByTestId(container,"day");
  const day = days.find(day => queryByText(day,"Monday"));
  expect(getByText(day,"1 spot remaining")).toBeInTheDocument(); 

  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    expect(queryByAltText(appointment,"Edit")).toBeInTheDocument();
    fireEvent.click(queryByAltText(appointment,"Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    // fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    fireEvent.click(getByText(appointment,"Save"));
    await waitForElement(() => queryByText(appointment,"Error"));
    expect(getByText(appointment,"Could not save the appointment")).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment,"Close"));

    expect(getByDisplayValue(appointment,"Archie Cohen")).toBeInTheDocument();
    const days = getAllByTestId(container,"day");
    const day = days.find(day => queryByText(day,"Monday"));
    expect(getByText(day,"1 spot remaining")).toBeInTheDocument(); 


  });
  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));


    expect(getByText(appointment,/delete the appointment?/i)).toBeInTheDocument();

    fireEvent.click(queryByText(appointment,"Confirm"));

    await waitForElement(() => queryByText(appointment,"Error"));
    expect(getByText(appointment,"Could not cancel the appointment")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment,"Close"));
    expect(getByText(appointment,"Archie Cohen")).toBeInTheDocument();
    const days = getAllByTestId(container,"day");
    const day = days.find(day => queryByText(day,"Monday"));
    expect(getByText(day,"1 spot remaining")).toBeInTheDocument(); 
  })
})

