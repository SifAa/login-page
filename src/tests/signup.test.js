import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import App from "../App";

test("default render", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
  expect(screen.getByText("Cphbusiness mail"));
});

// test("Testing signup component", () => {
//   render(<App />);

//   expect(validateEmail("")).toBe("^[a-zA-Zd._-]+@cphbusiness.dk$");
// });
