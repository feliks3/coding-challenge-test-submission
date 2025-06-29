import reducer, {
  addAddress,
  removeAddress,
  updateAddresses,
} from './addressBookSlice';
import { Address } from '@/types';

describe('addressBookSlice', () => {
  const mockAddress1: Address = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    houseNumber: '123',
    street: 'George St',
    city: 'Sydney',
    postcode: '2000',
  };

  const mockAddress2: Address = {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    houseNumber: '456',
    street: 'King St',
    city: 'Melbourne',
    postcode: '3000',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ addresses: [] });
  });

  it('should add a new address', () => {
    const state = reducer(undefined, addAddress(mockAddress1));
    expect(state.addresses).toEqual([mockAddress1]);
  });

  it('should not add a duplicate address (same firstName and lastName)', () => {
    const stateWithOne = { addresses: [mockAddress1] };
    const duplicate = { ...mockAddress1, id: '999', street: 'Another St' };
    const state = reducer(stateWithOne, addAddress(duplicate));
    expect(state.addresses.length).toBe(1);
  });

  it('should remove an address by id', () => {
    const stateWithTwo = { addresses: [mockAddress1, mockAddress2] };
    const state = reducer(stateWithTwo, removeAddress('1'));
    expect(state.addresses).toEqual([mockAddress2]);
  });

  it('should replace all addresses with updateAddresses', () => {
    const state = reducer(undefined, updateAddresses([mockAddress2]));
    expect(state.addresses).toEqual([mockAddress2]);
  });
});
