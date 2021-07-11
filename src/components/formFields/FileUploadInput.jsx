import { useField } from "formik";
import { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Flex,
  Input,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";

const FileUpload = (props) => {
  const { accept, multiple, children, ...rest } = props;

  const inputRef = useRef(null);
  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup display="inline" onClick={handleClick}>
      <Input
        type="file"
        {...rest}
        multiple={multiple || false}
        hidden
        accept={accept}
        onClick={(e) => console.log("File click data is", e)}
        onChange={(e) => console.log("File upload data is", e)}
        ref={inputRef}
      />
      <>{children}</>
    </InputGroup>
  );
};

const FileUploadInput = ({ label, icon: InputIcon, isRequired, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <FormControl isRequired={isRequired} isInvalid={meta.error && meta.touched}>
      <Flex alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Icon as={InputIcon} mb={2} />
      </Flex>
      <FileUpload accept={"image/*"} multiple={false} {...props}>
        <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
      </FileUpload>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUploadInput;
