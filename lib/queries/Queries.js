import { gql } from "@apollo/client";

export const HOME_HERO_QUERY = gql`
  query GetHomeHero {
    homeheros(first: 1) {
      nodes {
        homeHeroCoreFields {
          title
          description

          img {
            node {
              sourceUrl
              altText
            }
          }

          awardLabel {
            label
            img {
              node {
                sourceUrl
                altText
              }
            }
          }

          cta {
            label
            link
            hasArrow
          }

          listItems {
            listItem
            icon {
              node {
                sourceUrl
                altText
              }
            }
          }

          stats {
            amount
            label
            icon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const WHO_WE_ARE_QUERY = gql`
  query GetWhoWeAre {
    whoAreYouSections(first: 1) {
      nodes {
        whoAreYouCoreFields {
          description
          title
          backgroundColor
          cards {
            backgroundColor
            description
            textColor
            title
            icon {
              node {
                altText
                sourceUrl
              }
            }
            cta {
              label
              link
            }
            cardList {
              label
            }
          }
        }
      }
    }
  }
`;

export const TESTIMONIALS_QUERY = gql`
  query GetTestimonials {
    testimonials(first: 1) {
      nodes {
        testimonialsCoreFields {
          title
          description
          googleRatings
          testimonials {
            description
            name
            rating
            position
          }
        }
      }
    }
  }
`;

export const HERO_QUERY = gql`
  query Hero($slug: String!) {
    heroBy(slug: $slug) {
      id
      herosCoreFields {
        heroSlide {
          description
          hasCta
          subTitle
          title
          img {
            node {
              altText
              sourceUrl
            }
          }
          cta {
            label
            link
          }
        }
      }
    }
  }
`;

export const PARTNER_QUERY = gql`
  query GetPartner {
    partnerWithUsSections(first: 10) {
      nodes {
        partnerWithUsCoreFields {
          section
          title
          img {
            node {
              altText
              sourceUrl
            }
          }
          cards {
            description
            title
            titleColor
            icon {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const FOUNDERS_QUERY = gql`
  query GetPartner {
    founders(first: 1) {
      nodes {
        foundersCoreFields {
          description
          title
          img {
            node {
              altText
              sourceUrl
            }
          }
          about {
            name
            position
          }
        }
      }
    }
  }
`;

export const VALUES_QUERY = gql`
  query GetValues {
    ourValues(first: 1) {
      nodes {
        ourValuesCoreFields {
          title
          valuesList {
            description
            fieldGroupName
            icon {
              node {
                altText
                sourceUrl
              }
            }
            label
          }
          styling {
            backgroundColor
            fieldGroupName
            textColor
          }
        }
      }
    }
  }
`;

export const SOCIAL_IMPACT_QUERY = gql`
  query GetSocialImpact {
    ourSocialImpacts(first: 1) {
      nodes {
        ourSocialImageCoreFields {
          description
          title
          cta {
            label
            link
          }
          styling {
            backgroundColor
            ctaColor
            textColor
            titleColor
          }
          img {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const AWARDS_QUERY = gql`
  query GetOurAwards {
    ourAwards(first: 1) {
      nodes {
        ourAwards {
          title
          styling {
            backgroundColor
            fieldGroupName
            textColor
            titleColor
          }
          awards {
            label
            description
            icon {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const OFFER_QUERY = gql`
  query GetWhatWeOffer {
    whatWeOfferSections(first: 20) {
      nodes {
        whatWeOfferCoreFields {
          section
          title
          offers {
            label
            icon {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const ROLES_QUERY = gql`
  query GetOpenRoles {
    openRoles(first: 1) {
      nodes {
        openRolesCoreFields {
          description
          title
          roles {
            isactive
            link
            place
            title
          }
          styling {
            backgroundColor
          }
        }
      }
    }
  }
`;

export const EVENTS_QUERY = gql`
  query GetEvents {
    events(first: 1) {
      nodes {
        eventsCoreFields {
          title
          styling {
            backgroundColor
            textColor
          }
          gallery {
            nodes {
              altText
              sourceUrl
            }
          }
          gallerySquare {
            nodes {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const COMMUNITY_QUERY = gql`
  query GetCommunities {
    communities(first: 1) {
      nodes {
        communityCoreFields {
          title
          styling {
            backgroundColor
          }
          communities {
            description
            label
            link
            img {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const CONTACTS_QUERY = gql`
  query GetContacts {
    contacts {
      nodes {
        contactsCoreFields {
          mapLink
          contacts {
            icon {
              node {
                altText
                sourceUrl
              }
            }
            info {
              infoList {
                description
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const CONTACT_FORM_QUERY = gql`
  query GetContactForm {
    contactForms(first: 1) {
      nodes {
        contactFormCoreFields {
          title
          select {
            selection
          }
          img {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const COOKIE_POLICY_QUERY = gql`
  query GetCookiePolicies {
    cookiePolicies(first: 1) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

export const PRIVACY_POLICY_QUERY = gql`
  query GetPrivacyPolicies {
    privacyPolicies(first: 100) {
      nodes {
        content
        title
      }
    }
  }
`;

export const CALLBACK_QUERY = gql`
  query GetCallbackrequests {
    callbackrequests(first: 1) {
      nodes {
        callbackRequestCoreFields {
          title
          description
          img {
            node {
              altText
              sourceUrl
            }
          }
          type
        }
      }
    }
  }
`;

export const NEWS_POSTS_QUERY = gql`
  query GetNewsPost {
    newsPosts(first: 100) {
      nodes {
        newsPostsCoreFields {
          date
          description
          title
          tags
          featureImg {
            node {
              altText
              sourceUrl
            }
          }
          cardImg {
            node {
              altText
              sourceUrl
            }
          }
        }
        slug
      }
    }
    newsPostTags {
      nodes {
        newsPostTagFields {
          newsTags {
            tag
          }
        }
      }
    }
  }
`;

export const RECRUITER_POSTS_QUERY = gql`
  query GetRecruiterPost {
    recruiterPosts(first: 20) {
      nodes {
        recruiterPostsCoreFields {
          date
          title
          cta {
            label
            link
          }
          img {
            node {
              altText
              sourceUrl
            }
          }
        }
        slug
      }
    }
  }
`;

export const ALL_RECRUITER_SLUGS = gql`
  query GetAllRecruiterSlugs {
    recruiterPosts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const ALL_NEWS_SLUGS = gql`
  query GetAllNewsSlugs {
    newsPosts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const NEWS_POST_BY_SLUG_QUERY = gql`
  query GetNewsPostBySlug($slug: String!) {
    newsPostBy(slug: $slug) {
      id
      content
      newsPostsCoreFields {
        date
        description
        title
        tags
        featureImg {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
  }
`;

export const RECRUITER_POST_BY_SLUG_QUERY = gql`
  query GetRecruiterPostBySlug($slug: String!) {
    recruiterPostBy(slug: $slug) {
      id
      recruiterPostsCoreFields {
        cta {
          link
          label
        }
        title
        img {
          node {
            altText
            sourceUrl
          }
        }
        postPageContent {
          ... on RecruiterPostsCoreFieldsPostPageContentPageContentLayout {
            leftCol
            rightCol
          }
        }
      }
    }
  }
`;

export const CONTACT_INFO_QUERY = gql`
  query GetContactInfo {
    contactInfoBlocks(first: 20) {
      nodes {
        contactInfoBlockCoreFields {
          section
          description
          title
          styling {
            textcolor
            titlecolor
          }
          img {
            node {
              altText
              sourceUrl
            }
          }
          ctaLinks {
            icon {
              node {
                altText
                sourceUrl
              }
            }
            link
            title
            styling {
              backgroundcolor
              textcolor
              bordercolor
            }
          }
        }
      }
    }
  }
`;

export const CONTACTING_INFO_QUERY = gql`
  query GetAboutContracting {
    allMoreAboutContracting(first: 20) {
      nodes {
        aboutContractingFields {
          section
          title
          card {
            description
            title
          }
        }
      }
    }
  }
`;

export const TAX_INFO_QUERY = gql`
  query GetTaxInfo {
    taxCalculations(first: 1) {
      nodes {
        taxCalculatorFields {
          desc
          disclaimer
          title
        }
      }
    }
  }
`;

export const PROCESSES_INFO_QUERY = gql`
  query GetStartedSteps {
    getStartedSteps(first: 20) {
      nodes {
        getStartedStepsCoreFields {
          section
          title
          notes
          process {
            label
            icon {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const BANNERS_QUERY = gql`
  query GetBanners {
    banners(first: 20) {
      nodes {
        bannerCoreFields {
          section
          description
          title
          styling {
            backgroundColor
            textColor
            titleColor
            fontsize
          }
        }
      }
    }
  }
`;

export const FAQ_QUERY = gql`
  query GetFAQs {
    faqs(first: 20) {
      nodes {
        id
        faqFields {
          section
          title
          faq {
            question
            answer
          }
        }
      }
    }
  }
`;

export const KNOWLEDGE_QUERY = gql`
  query GetKnowledgeHubBlocks {
    knowledgeHubBlocks(first: 20) {
      nodes {
        knowledgeHubCoreBlocks {
          description
          title
          styling {
            backgroundColor
            textColor
            titleColor
          }
          slugtotag {
            slugselect
            tags
          }
        }
      }
    }
    newsPosts {
      nodes {
        newsPostsCoreFields {
          title
          description
          tags
          cardImg {
            node {
              altText
              sourceUrl
            }
          }
          date
        }
        slug
      }
    }
  }
`;

export const SOLUTIONS_QUERY = gql`
  query GetSolutions {
    solutionComparisons(first: 20) {
      nodes {
        solutionComparisonsCoreFields {
          section
          description
          title
          solutions {
            title
            cta {
              label
              link
            }
            priceMonth {
              price
              priceInfo
            }
            priceWeek {
              price
              priceInfo
            }
            solutionInfo {
              title
              info {
                title
                icon {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
            list {
              label
              icon {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const NEXT_STEPS_QUERY = gql`
  query GetNextSteps {
    nextSteps(first: 20) {
      nodes {
        nextStepsCoreFields {
          section
          descrption
          note
          title
          steps {
            color
            description
            title
            icon {
              node {
                altText
                sourceUrl
              }
            }
            link
          }
          background {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const IMPORTANT_DETAILS_QUERY = gql`
  query GetImportantDetails {
    importantDetails(first: 20) {
      nodes {
        importantDetailsCoreFields {
          section
          title
          note
          details {
            title
            icon {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const IMAGE_TEXT_SECTION = gql`
  query GetImageTextSections {
    imageTextSections(first: 20) {
      nodes {
        imageTextSectionsCoreFields {
          section
          order
          title
          description
          backgroundColor
          cols {
            isreversed
            img {
              node {
                altText
                sourceUrl
              }
            }
            cta {
              label
              link
            }
            list {
              label
              icon {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const COST_INFO_SECTION = gql`
  query GetCostInfo {
    costInfoSections {
      nodes {
        id
        costInfoSectionsCoreFields {
          note
          title
          cols {
            left {
              title
              priceInfo {
                note
                price
              }
            }
            right {
              title
              list {
                label
                icon {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          section
        }
      }
    }
  }
`;
