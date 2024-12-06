import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3000/auth/login", async ({ request }) => {
    const { email, password } = await request.json();

    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json(
        {
          access_token: "test-token",
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),
];
