import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { router } from "expo-router";
import SignIn from "../app/sign-in";
import { useSession } from "../store/AuthContext";

jest.mock("expo-constants", () => ({
  ...jest.requireActual("expo-constants"),
  expoConfig: {
    extra: {
      protocol: "http",
      port: "3000",
    },
  },
}));

jest.mock("../store/AuthContext", () => ({
  useSession: jest.fn(),
}));

describe("App Integration Test", () => {
  const mockSignIn = jest.fn();
  const mockRouterReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Simulate no session.
    useSession.mockReturnValue({
      session: null,
      signIn: mockSignIn,
    });
    router.replace = mockRouterReplace;
  });
  describe("Login path", () => {
    it("should allow user to input email and password, and submit login", async () => {
      const { getByPlaceholderText, getByText } = render(<SignIn />);

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
        expect(mockSignIn).toHaveBeenCalledWith("test-token")
      );
      expect(mockRouterReplace).toHaveBeenCalledWith("/app");
    });
  });
});
