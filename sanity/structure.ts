import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Hansen Timber Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      // Singleton: Home Page
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.documentTypeListItem("slab").title("Timber Slabs"),
      S.divider(),
      // Filter out singletons AND slabs from the main document list
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "homePage", "slab", "media.tag"].includes(listItem.getId()!)
      ),
    ])
