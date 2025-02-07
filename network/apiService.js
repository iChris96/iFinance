/* eslint-disable default-param-last */
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { setStorageItemAsync } from "../hooks/useStorageState";

class ApiService {
  static async getToken() {
    let token = null;

    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      token = JSON.parse(localStorage.getItem("session"))?.token;
    } else {
      token = await SecureStore.getItemAsync("session").then((value) => {
        if (value) {
          return JSON.parse(value)?.token;
        }
        return null;
      });
    }

    return token;
  }

  static async makeRequest(path, method = "GET", body, customHeaders = {}) {
    try {
      const token = await this.getToken();
      const response = await fetch(`${ApiService.baseURL}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...customHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorDetails = await response.text();

        if (response.status === 401) {
          await setStorageItemAsync("session", null);
          router.replace("logout");
        }
        throw new Error(
          `Request failed with status ${response.status}: ${errorDetails}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      console.error("API Call Error:", error);
      throw error;
    }
  }

  static async postCall(path, body, headers = {}) {
    const data = await ApiService.makeRequest(path, "POST", body, headers);
    if (typeof data !== "object") {
      throw new Error("Unexpected response format: expected JSON object");
    }
    return data;
  }

  static async patchCall(path, body, headers = {}) {
    const data = await ApiService.makeRequest(path, "PATCH", body, headers);
    if (typeof data !== "object") {
      throw new Error("Unexpected response format: expected JSON object");
    }
    return data;
  }

  static async getCall(path, headers = {}) {
    const data = await ApiService.makeRequest(path, "GET", undefined, headers);
    if (typeof data !== "object") {
      throw new Error("Unexpected response format: expected JSON object");
    }
    return data;
  }

  static async deleteCall(path, body, headers = {}) {
    const data = await ApiService.makeRequest(path, "DELETE", body, headers);
    if (typeof data !== "object") {
      throw new Error("Unexpected response format: expected JSON object");
    }
    return data;
  }
}

ApiService.baseURL = Constants.expoConfig.extra.baseURL;

export default ApiService;
