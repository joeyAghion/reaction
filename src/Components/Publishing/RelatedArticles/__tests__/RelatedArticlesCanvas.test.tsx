import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Waypoint from "react-waypoint"
import { mockTracking } from "../../../../Analytics"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticleCanvasLink } from "../RelatedArticleCanvasLink"
import { RelatedArticlesCanvas } from "../RelatedArticlesCanvas"

jest.unmock("react-tracking")

describe("RelatedArticlesCanvas", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesCanvas {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      articles: RelatedCanvas,
      vertical: { name: "Art Market" },
    }
  })

  it("renders the related articles canvas", () => {
    const related = renderer
      .create(<RelatedArticlesCanvas {...props} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders the vertical name if there is one", () => {
    const component = getWrapper(props)
    expect(component.html()).toMatch("Art Market")
  })

  it("renders a default message if there is no vertical", () => {
    delete props.vertical
    const component = getWrapper(props)
    expect(component.html()).toMatch("More from Artsy Editorial")
  })

  it("renders article links", () => {
    const component = getWrapper(props)
    expect(component.find(RelatedArticleCanvasLink)).toHaveLength(4)
  })

  it("Calls a tracking impression", () => {
    const { Component, dispatch } = mockTracking(RelatedArticlesCanvas)
    const component = mount(<Component articles={RelatedCanvas} />)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()

    expect(dispatch).toBeCalledWith({
      action: "Impression",
      context_module: "Further reading",
      subject: "Further reading",
    })
  })
})
