import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import App from "../index";
import { server } from "../../mocks/server";
import "@testing-library/jest-dom";

jest.mock("expo-constants", () => ({
  ...jest.requireActual("expo-constants"),
  expoConfig: {
    extra: {
      protocol: "http",
      port: "3000",
    },
  },
}));

describe("App Integration Test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should allow user to input email and password, and submit login", async () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    // Find inputs
    const emailInput = getByPlaceholderText("email");
    const passwordInput = getByPlaceholderText("password");
    const submitButton = getByText("Submit");

    // Fill inputs values
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Verify changed input values
    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");

    // Simulate submit
    fireEvent.press(submitButton);

    // Verify user succesfully login!
    await waitFor(() =>
      expect(screen.getByText("User: test-token")).toBeTruthy()
    );
  });
});
