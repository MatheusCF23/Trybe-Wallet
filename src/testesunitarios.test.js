import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

describe('Testes unitatios para os requisitos de 1 ao 4', () => {
  test('Testando entrar.', () => {
    renderWithRouterAndRedux(<App />);
    const btnInput = screen.getByRole('button', { name: 'Entrar' });
    expect(btnInput).toBeInTheDocument();
  });

  test('testando email', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    expect(email).toBeInTheDocument();
  });

  test('Testando nome.', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByPlaceholderText('Nome');
    expect(name).toBeInTheDocument();
  });

  test('Testando senha.', () => {
    renderWithRouterAndRedux(<App />);
    const password = screen.getByPlaceholderText('Senha');
    expect(password).toBeInTheDocument();
  });

  test('Testes com o userEvent', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const btnInput = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, 'matheuscfarias@trybe.com.br');
    expect(btnInput).toBeDisabled();
    userEvent.type(inputPassword, '123456789');
    expect(btnInput).toBeEnabled();
    userEvent.click(btnInput);
    expect(history.location.pathname).toBe('/carteira');
  });
});
