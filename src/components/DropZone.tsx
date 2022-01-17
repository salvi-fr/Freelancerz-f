import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Box from "./Box";
import Button from "./buttons/Button";
import Divider from "./Divider";
import Typography, { H5, Small } from "./Typography";

export interface DropZoneProps {
  onChange?: (files: []) => void;
  multiple?:boolean;
  accept?:string;
  maxFiles?:number;

}

const DropZone: React.FC<DropZoneProps> = (
  { onChange, multiple,accept,maxFiles}
  ) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (onChange) onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxFiles,
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      border="1px dashed"
      borderColor="gray.400"
      borderRadius="10px"
      bg={isDragActive && "gray.200"}
      transition="all 250ms ease-in-out"
      style={{ outline: "none" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb="18px" color="text.muted">
        Drag & drop image here
      </H5>

      <Divider width="200px" mx="auto" />
      <Typography
        color="text.muted"
        bg={isDragActive ? "gray.200" : "body.paper"}
        lineHeight="1"
        px="1rem"
        mt="-10px"
        mb="18px"
      >
        on
      </Typography>

      <Button
        color="primary"
        bg="primary.light"
        px="2rem"
        mb="22px"
        type="button"
      >
        { multiple? "Select files": "Select file"}
      </Button>

      <Small color="text.muted">Upload 280*280 image</Small>
    </Box>
  );
};

DropZone.defaultProps = {
  multiple:false,accept:".jpeg,.jpg,.png,.gif",maxFiles:10
}
export default DropZone;
