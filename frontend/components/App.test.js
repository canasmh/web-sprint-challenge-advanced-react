import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe('Rendering functional component', () => {
  beforeEach(() => {
    render(<AppFunctional />)
  })

  test('Ensure coordinates are displayed', () => {
    const coordinates = screen.getByText(/Coordinates/i);
    expect(coordinates).toBeInTheDocument();
  });

  test('Ensure steps are displayed', () => {
    const steps = screen.getByText(/You moved 0 times/);
    expect(steps).toBeInTheDocument();
  });
  
  test('Buttons display on screen', () => {
    [/up/i, /left/i, /right/i, /down/i, /reset/i].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(6);
  });

  test('Check input field', () => {
    const inputField = screen.getByPlaceholderText(/type email/);
    expect(inputField).toBeInTheDocument();
  })

  test('Check input typing', () => {
    const inputField = screen.getByPlaceholderText(/type email/);

    fireEvent.change(inputField, { target: { value: 'manny@canas.com' } })
    expect(inputField).toHaveValue('manny@canas.com')
    expect(inputField).not.toBeFalsy()

    fireEvent.click(screen.getByText(/reset/i))
    expect(inputField.value).toBeFalsy()
  })
});
