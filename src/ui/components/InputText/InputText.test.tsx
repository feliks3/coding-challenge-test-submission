import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  it('renders with correct name, placeholder, and value for postCode', () => {
    render(
      <InputText
        name="postCode"
        placeholder="Enter post code"
        extraProps={{ value: '2000', onChange: () => {} }}
      />
    );

    const input = screen.getByPlaceholderText('Enter post code') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('postCode');
    expect(input.value).toBe('2000');
  });

  it('calls onChange when houseNumber input changes', () => {
    const handleChange = jest.fn();

    render(
      <InputText
        name="houseNumber"
        placeholder="Enter house number"
        extraProps={{
          value: '',
          onChange: handleChange,
        }}
      />
    );

    const input = screen.getByPlaceholderText('Enter house number');
    fireEvent.change(input, { target: { value: '123' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
