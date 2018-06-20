import React from "react"
import { storiesOf } from "@storybook/react"
import { Artwork, Artist } from "../../"

storiesOf("Styleguide/Pages", module)
  .add("Static Artwork Page", () => {
    return <Artwork />
  })
  .add("Static Artist Page", () => {
    return <Artist />
  })
