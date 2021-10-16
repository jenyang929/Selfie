import React from "react";
import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { render, cleanup } from "@testing-library/react-native";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

describe("HomePage", () => {
  beforeEach(() => {
    AsyncStorageMock.getItem = jest.fn();
    AsyncStorageMock.setItem = jest.fn();
  });

  afterEach(cleanup);

  it("gets photos from Async Storage", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(AsyncStorageMock.getItem).toBeCalledWith("photos");
  });

  it("should set photos to Async Storage", () => {
    AsyncStorageMock.getItem.mockResolvedValue(
      JSON.stringify([
        {
          uri: "selfie-1.png",
          date: "10/15/21",
          time: "10:00 AM",
          width: 200,
          height: 200,
        },
        {
          uri: "selfie-2.png",
          date: "10/15/21",
          time: "09:00 AM",
          width: 200,
          height: 200,
        },
      ])
    );

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(AsyncStorageMock.setItem).not.toBeCalled();
  });

  // it("should default photos to empty array if no photos from Async Storage", async () => {
  //   AsyncStorageMock.getItem.mockResolvedValue(undefined);
  //   const { update, container } = render(
  //     <MemoryRouter>
  //       <HomePage />
  //     </MemoryRouter>
  //   );

  //   await act(async () => {
  //     await update(container);
  //   });
  //   expect(AsyncStorageMock.setItem).toBeCalledWith(
  //     "photos",
  //     JSON.stringify([])
  //   );
  // });

  // it("renders all the selfies", () => {
  //   AsyncStorageMock.getItem.mockResolvedValue(
  //     JSON.stringify([
  //       {
  //         uri: "selfie-1.png",
  //         date: "10/15/21",
  //         time: "10:00 AM",
  //         width: 200,
  //         height: 200,
  //       },
  //       {
  //         uri: "selfie-2.png",
  //         date: "10/15/21",
  //         time: "09:00 AM",
  //         width: 200,
  //         height: 200,
  //       },
  //     ])
  //   );
  //   const { getAllByTestId } = render(
  //     <MemoryRouter>
  //       <HomePage />
  //     </MemoryRouter>
  //   );
  //   expect(getAllByTestId("photo")).toHaveLength(2);
  // });
});
