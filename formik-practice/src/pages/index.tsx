import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, Field } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

// formik use provider to make formik and input comunicate with each other
const Index = () => {
  return (
    <Box mt={8} mx="auto" maxW="800px" w="100%">
      <Flex align="center">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl mt={4}>
                {/* htmlFor help user focus on input, if user click on label */}
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  // there is a onChange prop in Field
                  // and the onChange method will update formik values state
                  as={Field}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  as={Field}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                  as={Field}
                />
              </FormControl>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="purple"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default Index;
