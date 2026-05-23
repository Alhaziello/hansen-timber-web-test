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
      S.listItem()
        .title('Timber Slabs')
        .schemaType('slab')
        .child(
          S.list()
            .title('Timber Slabs')
            .items([
              S.listItem()
                .title('All Slabs')
                .schemaType('slab')
                .child(
                  S.documentTypeList('slab')
                    .title('All Slabs')
                ),
              S.listItem()
                .title('Slabs by Species')
                .schemaType('species')
                .child(
                  S.documentTypeList('species')
                    .title('Select Species')
                    .child(speciesId =>
                      S.documentList()
                        .title('Slabs')
                        .schemaType('slab')
                        .apiVersion('2024-03-14')
                        .filter('_type == "slab" && species._ref == $speciesId')
                        .params({ speciesId })
                    )
                )
            ])
        ),
      
      // Folder-like Products Navigation
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .child((productId) =>
              S.list()
                .title('Product Options')
                .items([
                  // 1. Edit General Product Info
                  S.listItem()
                    .title('Edit General Info')
                    .child(
                      S.document()
                        .schemaType('product')
                        .documentId(productId)
                    ),
                  // 2. Manage Species Variant Cards
                  S.listItem()
                    .title('Variant Cards')
                    .schemaType('productVariant')
                    .child(
                      S.documentList()
                        .title('Variant Cards')
                        .schemaType('productVariant')
                        .apiVersion('2024-03-14')
                        .filter('_type == "productVariant" && product._ref == $productId')
                        .params({ productId })
                        .initialValueTemplates([
                          S.initialValueTemplateItem('productVariant-by-product', { productId })
                        ])
                    )
                ])
            )
        ),
      
      S.divider(),
      // Filter out singletons, slabs, products, and variants from the default list
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "homePage", "slab", "product", "productVariant", "media.tag"].includes(listItem.getId()!)
      ),
    ])
