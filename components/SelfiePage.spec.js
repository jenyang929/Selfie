import React from "react";
import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { render } from "@testing-library/react-native";
import SelfiePage from "./SelfiePage";
import { MemoryRouter } from "react-router-dom";

describe("SelfiePage", () => {
  beforeEach(() => {
    AsyncStorageMock.getItem = jest.fn();
    AsyncStorageMock.setItem = jest.fn();
  });
  it("gets photos from Async Storage", () => {
    render(
      <MemoryRouter>
        <SelfiePage match={{ params: { id: 1 } }} />
      </MemoryRouter>
    );
    expect(AsyncStorageMock.getItem).toBeCalledWith("photos");
  });
});
