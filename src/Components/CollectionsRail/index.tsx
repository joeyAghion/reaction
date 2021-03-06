import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { CollectionsRailQuery } from "__generated__/CollectionsRailQuery.graphql"
import { ContextConsumer } from "Artsy"
import { CollectionsRailFragmentContainer as CollectionsRail } from "./CollectionsRail"

interface Props {
  showOnEditorial?: boolean
}

export const CollectionsRailContent: React.SFC<Props> = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<CollectionsRailQuery>
            environment={relayEnvironment}
            variables={{
              showOnEditorial: true,
              size: 4,
              randomize: true,
            }}
            query={graphql`
              query CollectionsRailQuery(
                $showOnEditorial: Boolean
                $size: Int
                $randomize: Boolean
              ) {
                collections: marketingCollections(
                  showOnEditorial: $showOnEditorial
                  size: $size
                  randomize: $randomize
                ) {
                  ...CollectionsRail_collections
                }
              }
            `}
            render={({ props }) => {
              if (props) {
                return <CollectionsRail {...props} />
              } else {
                return null
              }
            }}
            cacheConfig={{ force: true }}
          />
        )
      }}
    </ContextConsumer>
  )
}
