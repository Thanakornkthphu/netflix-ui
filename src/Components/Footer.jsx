import React from "react"
import { Box, Grid, Link, Stack, Typography } from "@mui/material"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Footer = () => {
  const footerLinks = [
    [
      {
        title: "Audio Description",
        link: "https://www.netflix.com/browse/audio-description",
      },
      {
        title: "Investor Relations",
        link: "https://ir.netflix.net/ir-overview/profile/default.aspx",
      },
      {
        title: "Legal Notices",
        link: "https://help.netflix.com/legal/notices",
      },
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

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#141414",
        padding: "70px 60px 40px",
        color: "#808080",
      }}
    >
      <Stack
        sx={{
            width: 'fit-content',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction="row" spacing={3} sx={{ marginBottom: "24px" }}>
          <Link
            href="#"
            sx={{
              color: "white",
              "&:hover": { color: "#808080" },
              transition: "color 0.2s",
            }}
          >
            <FaFacebookF size={24} />
          </Link>
          <Link
            href="#"
            sx={{
              color: "white",
              "&:hover": { color: "#808080" },
              transition: "color 0.2s",
            }}
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="#"
            sx={{
              color: "white",
              "&:hover": { color: "#808080" },
              transition: "color 0.2s",
            }}
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="#"
            sx={{
              color: "white",
              "&:hover": { color: "#808080" },
              transition: "color 0.2s",
            }}
          >
            <FaYoutube size={28} />
          </Link>
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: "125px" }}>
          {footerLinks.map((column, colIndex) => (
            <Stack key={colIndex} sx={{ flexDirection: "column", gap: "20px" }}>
              {column.map((item, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={item.link}
                  target="_blank"
                  underline="hover"
                  sx={{
                    color: "#808080",
                    fontSize: "13px",
                    "&:hover": { color: "#b3b3b3" },
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
