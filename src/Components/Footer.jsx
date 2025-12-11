import React from "react"
import { Box, Link, Stack, styled } from "@mui/material"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

import { COLORS, SPACING } from "../Utils/constants"

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", size: 24 },
  { icon: FaInstagram, href: "#", size: 24 },
  { icon: FaTwitter, href: "#", size: 24 },
  { icon: FaYoutube, href: "#", size: 28 },
]

const FOOTER_LINKS = [
  [
    {
      title: "Audio Description",
      link: "https://www.netflix.com/browse/audio-description",
    },
    {
      title: "Investor Relations",
      link: "https://ir.netflix.net/ir-overview/profile/default.aspx",
    },
    { title: "Legal Notices", link: "https://help.netflix.com/legal/notices" },
  ],
  [
    { title: "Help Centre", link: "https://help.netflix.com/en" },
    { title: "Jobs", link: "https://jobs.netflix.com/" },
  ],
  [
    {
      title: "Terms of Use",
      link: "https://help.netflix.com/legal/termsofuse",
    },
    {
      title: "Corporate Information",
      link: "https://help.netflix.com/en/node/134094",
    },
  ],
  [
    { title: "Privacy", link: "https://help.netflix.com/legal/privacy" },
    { title: "Contact Us", link: "https://help.netflix.com/en/contactus" },
  ],
]

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <FooterContent>
        {/* Social Links */}
        <Stack direction="row" spacing={3} sx={{ marginBottom: SPACING.md }}>
          {SOCIAL_LINKS.map(({ icon: Icon, href, size }, index) => (
            <SocialLink key={index} href={href}>
              <Icon size={size} />
            </SocialLink>
          ))}
        </Stack>

        {/* Footer Links */}
        <Stack direction="row" gap="125px">
          {FOOTER_LINKS.map((column, colIndex) => (
            <Stack key={colIndex} gap={SPACING.sm}>
              {column.map((item, linkIndex) => (
                <FooterLink
                  key={linkIndex}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {item.title}
                </FooterLink>
              ))}
            </Stack>
          ))}
        </Stack>
      </FooterContent>
    </FooterContainer>
  )
}

// Styled Components
const FooterContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: COLORS.background,
  padding: `70px ${SPACING.xxl} 40px`,
  color: COLORS.textMuted,
})

const FooterContent = styled(Stack)({
  width: "fit-content",
  flexDirection: "column",
})

const SocialLink = styled(Link)({
  color: COLORS.text,
  transition: "color 0.2s",
  "&:hover": {
    color: COLORS.textMuted,
  },
})

const FooterLink = styled(Link)({
  color: COLORS.textMuted,
  fontSize: "13px",
  "&:hover": {
    color: "#b3b3b3",
  },
})

export default Footer
