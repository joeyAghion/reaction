import React from "react"
import { get } from "Utils/get"

import { Box, Flex, Image, Link, Serif, space } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { PreviewGridItem_artwork } from "__generated__/PreviewGridItem_artwork.graphql"

interface PreviewGridItemProps {
  artwork: PreviewGridItem_artwork
}

export const PreviewGridItem: React.SFC<PreviewGridItemProps> = ({
  artwork,
}) => {
  const imageUrl = get(artwork, x => x.image.cropped.url, "")
  return (
    <Flex mr={`${space(2)}px`} mb={`${space(2)}px`}>
      <Link href={artwork.href} noUnderline>
        <Image mr={`${space(2)}px`} src={imageUrl} />
      </Link>
      <Link href={artwork.href} noUnderline>
        <Box>
          <Serif size="2" italic>
            {artwork.title}, {artwork.date}
          </Serif>
          <Serif size="2">{artwork.artist_names}</Serif>
        </Box>
      </Link>
    </Flex>
  )
}

export const PreviewGridItemFragmentContainer = createFragmentContainer(
  PreviewGridItem,
  graphql`
    fragment PreviewGridItem_artwork on Artwork {
      href
      title
      artist_names
      image {
        cropped(width: 40, height: 40) {
          url
        }
      }
      date
    }
  `
)
