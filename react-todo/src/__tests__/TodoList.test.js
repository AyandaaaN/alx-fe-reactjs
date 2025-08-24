import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../components/TodoList.jsx';

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Ship it')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    render(<TodoList />);
    const input = screen.getByLabelText('todo-input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    const form = screen.getByRole('form', { name: 'add-todo-form' }) || input.closest('form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
  });

  test('toggles a todo', () => {
    render(<TodoList />);
    const checkbox = screen.getByLabelText('toggle-Learn React');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(screen.getByLabelText('todo-text-Learn React'));
    expect(checkbox).not.toBeChecked();
  });

  test('deletes a todo', async () => {
    render(<TodoList />);
    const del = screen.getByLabelText('delete-Ship it');
    fireEvent.click(del);
    await waitFor(() => expect(screen.queryByText('Ship it')).not.toBeInTheDocument());
  });
});
