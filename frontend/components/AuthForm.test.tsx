import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, beforeEach, vi } from 'vitest';
import AuthForm from './AuthForm';

const loginMock = vi.fn();
const loginWithProviderMock = vi.fn();

vi.mock('@/components/DrawIcon', () => ({
  default: () => <svg data-testid="draw-icon" />,
}));

vi.mock('@/lib/api/auth', () => ({
  login: (...args: unknown[]) => loginMock(...args),
  loginWithProvider: (...args: unknown[]) => loginWithProviderMock(...args),
}));

describe('AuthForm', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    loginMock.mockReset();
    loginWithProviderMock.mockReset();
  });

  it('renders the auth fields and actions', () => {
    render(<AuthForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it('rejects passwords shorter than 7 characters before calling login', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), '123456');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/password must be over 6 characters/i)).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('trims the email before logging in', async () => {
    const user = userEvent.setup();
    loginMock.mockResolvedValue({ ok: true });

    render(<AuthForm />);

    await user.type(screen.getByLabelText(/email/i), '  test@example.com  ');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows an error when login fails', async () => {
    const user = userEvent.setup();
    loginMock.mockRejectedValue(new Error('Unable to sign in'));

    render(<AuthForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/unable to sign in/i)).toBeInTheDocument();
  });

  it('starts the google login flow when the provider button is clicked', async () => {
    const user = userEvent.setup();
    loginWithProviderMock.mockResolvedValue({ ok: true });

    render(<AuthForm />);

    await user.click(screen.getByRole('button', { name: /continue with google/i }));

    await waitFor(() => {
      expect(loginWithProviderMock).toHaveBeenCalledWith('google');
    });
  });
});
