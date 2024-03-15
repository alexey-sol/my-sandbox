import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Link from "./Link";

describe("Link", () => {
  it("should render", () => {
    const output = shallow(
      <Link href="#" target="_blank">It's a link</Link>
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("should render without specified \"target\" prop", () => {
    const output = shallow(
      <Link href="#">It's a link</Link>
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });
});