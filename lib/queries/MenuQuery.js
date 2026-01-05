import { gql } from "@apollo/client";

export const MenuQuery = {
  GET_MENUS: gql`
    query GetMenus {
      footers(first: 1) {
        nodes {
          footerCoreFields {
            copyrightText
            fieldGroupName
            footerDescription
            logo {
              node {
                altText
                sourceUrl
              }
            }
            footerSections {
              footerSectionLabel
              footerSectionLinks {
                footerSectionLink
                footerSectionLinkLabel
                footerLabelIcon
              }
            }
            socialLinks {
              icon
              url
            }
            footerSlogan
          }
        }
      }
      headers(first: 1) {
        nodes {
          headerCoreFields {
            logo {
              node {
                altText
                sourceUrl
              }
            }
            loginCta {
              label
              url
            }
            menuItems {
              label
              link
              subMenuItems {
                label
                link
              }
            }
          }
        }
      }
    }
  `,
};
