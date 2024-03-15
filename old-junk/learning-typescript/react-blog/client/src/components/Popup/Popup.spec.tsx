import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Popup from "./Popup";

jest.mock("react-dom");

describe("Popup", () => {
  it("should render", () => {
    const output = shallow(
      <Popup>It's a popup</Popup>
    );
// https://stackoverflow.com/questions/48094581/testing-react-portals-with-enzyme
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});