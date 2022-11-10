import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

describe('Testes unitatios para o projeto TrybeWallet', () => {
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
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByPlaceholderText('Senha');
    expect(inputPassword).toBeInTheDocument();
    const btnInput = screen.getByRole('button', { name: 'Entrar' });
    expect(btnInput).toBeInTheDocument();
    userEvent.type(inputEmail, 'matheuscfarias@trybe.com.br');
    expect(btnInput).toBeDisabled();
    userEvent.type(inputPassword, '123456789');
    expect(btnInput).toBeEnabled();
    userEvent.click(btnInput);
    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText('matheuscfarias@trybe.com.br')).toBeInTheDocument();
  });

  test('Verifica renderização ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));
    expect(screen.getByPlaceholderText('valor')).toBeInTheDocument();
    expect(screen.getByText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('descrição')).toBeInTheDocument();
    expect(screen.getByText('BRL')).toBeInTheDocument();
    expect(screen
      .getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });

  test('Verifica botão Adicionar despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));
    const BUTTON = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(BUTTON);
    expect(await screen.findByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
