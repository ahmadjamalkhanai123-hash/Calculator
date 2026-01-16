"""
Basic Calculator
================
A simple calculator supporting addition, subtraction, multiplication, and division.
Includes input validation and error handling for zero division.
"""


def validate_number(value):
    """
    Validate that the input can be converted to a number.

    Args:
        value: The input to validate

    Returns:
        float: The validated number

    Raises:
        ValueError: If input cannot be converted to a number
    """
    if value is None or (isinstance(value, str) and value.strip() == ""):
        raise ValueError("Error: Input cannot be empty")

    try:
        return float(value)
    except (ValueError, TypeError):
        raise ValueError(f"Error: '{value}' is not a valid number")


def add(a, b):
    """Add two numbers."""
    num_a = validate_number(a)
    num_b = validate_number(b)
    return num_a + num_b


def subtract(a, b):
    """Subtract second number from first."""
    num_a = validate_number(a)
    num_b = validate_number(b)
    return num_a - num_b


def multiply(a, b):
    """Multiply two numbers."""
    num_a = validate_number(a)
    num_b = validate_number(b)
    return num_a * num_b


def divide(a, b):
    """
    Divide first number by second.

    Raises:
        ZeroDivisionError: If attempting to divide by zero
    """
    num_a = validate_number(a)
    num_b = validate_number(b)

    if num_b == 0:
        raise ZeroDivisionError("Error: Cannot divide by zero")

    return num_a / num_b


def calculate(num1, operator, num2):
    """
    Perform a calculation based on the operator.

    Args:
        num1: First number
        operator: One of '+', '-', '*', '/'
        num2: Second number

    Returns:
        The result of the calculation

    Raises:
        ValueError: If operator is invalid or inputs are not valid numbers
        ZeroDivisionError: If dividing by zero
    """
    operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide
    }

    if operator not in operations:
        raise ValueError(f"Error: Invalid operator '{operator}'. Use +, -, *, or /")

    return operations[operator](num1, num2)


def main():
    """Interactive calculator loop."""
    print("Basic Calculator")
    print("================")
    print("Operations: +, -, *, /")
    print("Type 'quit' or 'q' to exit\n")

    while True:
        try:
            # Get first number
            input1 = input("Enter first number: ").strip()
            if input1.lower() in ('quit', 'q'):
                print("Goodbye!")
                break

            # Get operator
            operator = input("Enter operator (+, -, *, /): ").strip()
            if operator.lower() in ('quit', 'q'):
                print("Goodbye!")
                break

            # Get second number
            input2 = input("Enter second number: ").strip()
            if input2.lower() in ('quit', 'q'):
                print("Goodbye!")
                break

            # Perform calculation
            result = calculate(input1, operator, input2)

            # Format result (remove trailing zeros for clean display)
            if result == int(result):
                print(f"Result: {int(result)}\n")
            else:
                print(f"Result: {result}\n")

        except (ValueError, ZeroDivisionError) as e:
            print(f"{e}\n")
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break


if __name__ == "__main__":
    main()
