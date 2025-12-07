import { Card, CardContent, Modal, Typography } from '@mui/material'
import React from 'react'

const ModalCardTrailer = ({ open, onClose }) => {
    return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-card-trailer-title"
          sx={{
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: 400,
              backgroundColor: "#141414",
              color: "white",
              borderRadius: 2,
              boxShadow: 24,
              outline: "none",
            }}
          >
            <CardContent>
              <Typography id="modal-card-trailer-title" variant="h6" mb={2}>
                Modal Card Trailer
              </Typography>
              <Typography variant="body2" color="gray">
                This is where you can show more details about the selected movie.
              </Typography>
            </CardContent>
          </Card>
        </Modal>
  )
}

export default ModalCardTrailer