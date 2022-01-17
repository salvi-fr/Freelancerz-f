import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H6, H1 } from "@component/Typography";
import React, {  } from "react";
import Button from "@component/buttons/Button";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Modal from "@component/modal/Modal";
import Card from "@component/Card";

export interface DeleteModalProps {
    message?: string;
    open?: boolean;
    onYes?: () => void;
    onNo?: () => void;
    onClose?: () => void;
  }
  
  const DeleteModal: React.FC<DeleteModalProps> = ({ onYes,open,message, onNo, onClose }) => {
  

  
      return (
        <Modal open={open} onClose={onClose}>
        <Card  position="relative">
        <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={1}>
       

        <Grid item md={10} xs={12} alignItems="center">
          <H1 mb="1rem">Are you sure </H1>

          <FlexBox alignItems="center" mb="1rem">
            
            <H6 ml="8px">A{message}</H6>
          </FlexBox>


         
          <FlexBox alignItems="center" m="8px">
          
            <Button
              variant="contained"
              size="small"
              ml="8px"
              color="error"
              mb="36px"
              p="9px"
              onClick={onYes}
            >
              Yes Delete
            </Button>

            <Button
              variant="contained"
              size="small"
              ml="8px"
              p="9px"
              color="primary"
              mb="36px"
              onClick={onNo}
            >
              Cancel
            </Button>
            </FlexBox>
        </Grid>
      </Grid>
    </Box>
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={onClose}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
      );
    
  };
  
  export default DeleteModal;
  

