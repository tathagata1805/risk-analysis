import { Box, Button, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DetailsModal = ({ isModalOpen, handleCloseModal, selectedLevelData }) => {
  console.log(selectedLevelData);
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px",
          color: "white",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          Beneficiary Details:
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          {selectedLevelData?.beneficiary_details.map((beneficiary, idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" color="white">
                Beneficiary Address: {beneficiary.beneficiary_address}
              </Typography>
              <Typography variant="body1" color="white">
                Amount: {beneficiary.amount} {beneficiary.token_type}
              </Typography>
              <Typography variant="body1" color="white">
                Date: {beneficiary.date}
              </Typography>
              <Typography variant="body1" color="white">
                Entity Name: {beneficiary.entity_name}
              </Typography>
              <Typography variant="body1" color="white">
                Transaction Type: {beneficiary.transaction_type}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" color="white" gutterBottom>
          Payer Details:
        </Typography>
        <Box>
          {selectedLevelData?.payer_details.map((payer, idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" color="white">
                Payer Address: {payer.payer_address}
              </Typography>
              <Typography variant="body1" color="white">
                Amount: {payer.amount} {payer.token_type}
              </Typography>
              <Typography variant="body1" color="white">
                Date: {payer.date}
              </Typography>
              <Typography variant="body1" color="white">
                Entity Name: {payer.entity_name}
              </Typography>
              <Typography variant="body1" color="white">
                Transaction Type: {payer.transaction_type}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            color: "blue",
            textTransform: "none",
            fontSize: "16px",
            padding: "0px",
          }}
        >
          Close
        </Button>
      </motion.div>
    </Modal>
  );
};

export default DetailsModal;
