import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Nav from "./NavBar";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<Nav />);
    expect(isReact.classComponent(Nav)).toBeFalsy();
  });

  it('Debería renderizar un <Link to="" />.', () => {
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(1);
  });

  it('Debería tener un Link con el texto "Create Activity" que cambie la ruta hacia "/activity"', () => {
    expect(nav.find(Link).at(0).prop("to")).toEqual("/activity");
    expect(nav.find(Link).at(0).text()).toEqual("Create Activity");
  });

  it('Debería tener un h1 con una clase "title" para mostrar el logo"', () => {
    expect(nav.find("h1.title").length).toBeGreaterThanOrEqual(1);
  });
});
