import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";
import useAddressBook from "@/hooks/useAddressBook";
import useFormFields from "@/hooks/useFormFields";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";
import transformAddress, { RawAddressModel } from "./core/models/address";
import Spinner from "@/components/Spinner/Spinner";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const { values, handleChange, resetFields } = useFormFields({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [loading, setLoading] = React.useState(false);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /** DONE: Fetch addresses based on houseNumber and postCode using the local BE api
   * - Example URL of API: ${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=1345&streetnumber=350
   * - Ensure you provide a BASE URL for api endpoint for grading purposes!
   * - Handle errors if they occur
   * - Handle successful response by updating the `addresses` in the state using `setAddresses`
   * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
   * - Ensure to clear previous search results on each click
   * - Bonus: Add a loading state in the UI while fetching addresses
   */
  const handleAddressSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!values.postCode || !values.houseNumber){
      setError("Postcode and house number fields mandatory!");
      return;
    }

    if(!/^\d+$/.test(values.postCode) || !/^\d+$/.test(values.houseNumber)){
      setError("Postcode and house number be all digits!");
      return;
    }

    if(values.postCode.length < 4){
      setError("Postcode must be at least 4 digits");
      return;
    }

    setError(undefined);
    setAddresses([]);
    setLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_URL;
      const url = `${BASE_URL}/api/getAddresses?postcode=${values.postCode}&streetnumber=${values.houseNumber}`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) {
        setError(result.errormessage || "Unexpected error");
      } else {
        const rawAddresses = result.details as RawAddressModel[];
        const transformed = rawAddresses.map((item) => transformAddress(item));
        setAddresses(transformed);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  /** DONE: Add basic validation to ensure first name and last name fields aren't empty
   * Use the following error message setError("First name and last name fields mandatory!")
   */
  const handlePersonSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!values.firstName || !values.lastName){
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!values.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === values.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({
      ...foundAddress,
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

  const clearAllFields = () => {
    resetFields();
    setAddresses([]);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/* DONE: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form
          label="🏠 Find an address"
          loading={loading}
          formEntries={[
            {
              name: "postCode",
              placeholder: "Post Code",
              extraProps: {
                value: values.postCode,
                onChange: handleChange,
              },
            },
            {
              name: "houseNumber",
              placeholder: "House number",
              extraProps: {
                value: values.houseNumber,
                onChange: handleChange,
              },
            },
          ]}
          onFormSubmit={handleAddressSubmit}
          submitText="Find"
        ></Form>

        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {/* DONE: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {values.selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            loading={loading}
            formEntries={[
              {
                name: "firstName",
                placeholder: "First name",
                extraProps: {
                  value: values.firstName,
                  onChange: handleChange,
                },
              },
              {
                name: "lastName",
                placeholder: "Last name",
                extraProps: {
                  value: values.lastName,
                  onChange: handleChange,
                },
              },
            ]}
            onFormSubmit={handlePersonSubmit}
            submitText="Add to addressbook"
          ></Form>
        )}

        {/* DONE: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage message={error} />}

        {/* DONE: Add a button to clear all form fields. 
        Button must look different from the default primary button, see design. 
        Button text name must be "Clear all fields"
        On Click, it must clear all form fields, remove all search results and clear all prior
        error messages
        */}
        <Button variant="secondary" onClick={clearAllFields} type="reset">
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
