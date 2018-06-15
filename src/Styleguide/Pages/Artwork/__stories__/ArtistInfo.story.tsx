import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtistInfo } from "../ArtistInfo"
import { Grid, Row, Col } from "Styleguide/Elements/Grid"
import { bio } from "Styleguide/Components/__stories__/ArtistBio.story"
import { insights } from "Styleguide/Components/__stories__/MarketInsight.story"
import { exhibitions } from "Styleguide/Components/__stories__/SelectedExhibitions.story"

storiesOf("Styleguide/Artwork", module).add("ArtistInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artist Info">
        <Grid>
          <Row>
            <Col xl={8} lg={8} md={8} sm={12} xs={12}>
              <ArtistInfo
                name="Francesca DiMattio"
                insights={insights}
                exhibitions={exhibitions}
                bio={bio}
              />
            </Col>
          </Row>
        </Grid>
      </Section>
    </React.Fragment>
  )
})
