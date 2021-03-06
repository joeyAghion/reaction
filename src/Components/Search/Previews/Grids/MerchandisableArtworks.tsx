import React from "react"

import { Box, Flex, Sans } from "@artsy/palette"
import { MerchandisableArtworks_viewer } from "__generated__/MerchandisableArtworks_viewer.graphql"
import { MerchandisableArtworksPreviewQuery } from "__generated__/MerchandisableArtworksPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer, ContextProps } from "Artsy/SystemContext"
import { SearchBarState } from "Components/Search/state"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Subscribe } from "unstated"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "./PreviewGridItem"

interface MerchandisableArtworksPreviewProps {
  viewer: MerchandisableArtworks_viewer
  searchState?: SearchBarState
}

class MerchandisableArtworksPreview extends React.Component<
  MerchandisableArtworksPreviewProps
> {
  componentDidMount() {
    const items = get(
      this.props.viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)

    this.props.searchState.registerItems(items)
  }

  render() {
    const { viewer, searchState } = this.props
    const artworks = get(
      viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)

    const { state } = searchState
    const merchandisableItems = artworks.map((artwork, i) => (
      <Box width={["0%", "100%", "100%", "50%"]} key={i}>
        <PreviewGridItem
          highlight={
            state.hasEnteredPreviews && i === state.selectedPreviewIndex
          }
          artwork={artwork}
        />
      </Box>
    ))

    return (
      <Box>
        <Sans size="3" weight="medium" color="black100" mb={2}>
          Now Available for Buy Now/ Make Offer
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {merchandisableItems.slice(0, 5)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {merchandisableItems}
          </Flex>
        </Media>
      </Box>
    )
  }
}

export const MerchandisableArtworksPreviewFragmentContainer = createFragmentContainer(
  (props: MerchandisableArtworksPreviewProps) => {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return (
            <MerchandisableArtworksPreview
              searchState={searchState}
              {...props}
            />
          )
        }}
      </Subscribe>
    )
  },
  graphql`
    fragment MerchandisableArtworks_viewer on Viewer {
      filter_artworks(aggregations: [TOTAL], sort: "-decayed_merch") {
        __id
        artworks_connection(first: 10) {
          edges {
            node {
              href
              ...PreviewGridItem_artwork
            }
          }
        }
      }
    }
  `
)

export const MerchandisableArtworksPreviewQueryRenderer: React.SFC<
  ContextProps
> = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<MerchandisableArtworksPreviewQuery>
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query MerchandisableArtworksPreviewQuery {
                viewer {
                  ...MerchandisableArtworks_viewer
                }
              }
            `}
            render={renderWithLoadProgress(
              MerchandisableArtworksPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
