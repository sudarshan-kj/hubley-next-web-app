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
  Image,
  Text,
  Box,
  Stack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";

const FileUploadPreview = ({ file, alt }) => {
  const [value, setValue] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setLoading(true);
        setValue(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!value)
    return (
      <Center
        bg="gray.200"
        width={["200px", "400px"]}
        height={["150px", "300px"]}
      >
        <Text fontWeight="bold">Preview {alt} image here</Text>
      </Center>
    );

  if (loading) return <Text>Loading...</Text>;
  return (
    <Image
      width={["200px", "400px"]}
      height={["150px", "300px"]}
      objectFit="cover"
      src={value || "/event-poster.png"}
      alt={alt}
    />
  );
};

const FileUpload = ({ buttonName }) => {
  const [fileData, setFileData] = useState("");
  const inputRef = useRef(null);

  const onUploadClick = () => inputRef.current?.click();

  const handleFileUpload = (event) => {
    setFileData(event.target.files[0]);
  };

  return (
    <Stack direction={["column", "row"]} spacing={8}>
      <InputGroup onClick={onUploadClick}>
        <Input
          type="file"
          multiple={false}
          hidden
          accept="image/*"
          onChange={handleFileUpload}
          ref={inputRef}
        />
        <Button leftIcon={<Icon as={FiFile} />}>Upload {buttonName}</Button>
      </InputGroup>
      <Box>
        <FileUploadPreview file={fileData} alt={buttonName} />
      </Box>
    </Stack>
  );
};

const FileUploadInput = ({ label, icon: InputIcon, isRequired, ...props }) => {
  const [field, meta, helpers] = useField(props);

  //dummy change
  return (
    <FormControl isRequired={isRequired} isInvalid={meta.error && meta.touched}>
      <Flex alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Icon as={InputIcon} mb={2} />
      </Flex>
      <VStack align="flex-start" spacing="8">
        <FileUpload buttonName="Main Event Poster" />
        <FileUpload buttonName="Event Poster 2" />
      </VStack>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUploadInput;
