# Prime Number Factorization

This project is a web application that performs prime number factorization using two different methods: Pure JavaScript and WebAssembly (Wasm). The application allows users to input a number and then factorize it using one of the two methods.

## How it works

The application consists of two main parts:

1. **Factorization using Pure JavaScript**: This part of the application uses a simple factorization algorithm in JavaScript to break down a number into its prime factors.

2. **Factorization using WebAssembly**: This part of the application uses a factorization algorithm written in C, which is then compiled to WebAssembly for execution in the browser. This allows for faster and more efficient computation, especially for large numbers.

## Dependencies

This project depends on the following technologies:

- JavaScript: used for the application logic and user interaction.
- C: used to write the factorization algorithm that is compiled to WebAssembly.
- Emscripten: a tool used to compile the C code to WebAssembly.
- HTML/CSS: used for the application's user interface.

## Installation

To install and run this project, follow these steps:

1. Clone the repository: `git clone https://github.com/IIC3585-2024/wasm-group-09`
2. Navigate to the project directory: `cd wasm-daw`
3. Compile the C code to WebAssembly using Emscripten: `emcc -O3 -s WASM=1 -o prime_factors.js prime_factors.c -sEXPORTED_FUNCTIONS="['_findPrimeFactors','_malloc','_free']" -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,getValue`
4. Open the `index.html` file in your browser to run the application.

## Usage

To use the application, simply input a number into the corresponding input field and click the "Factorize" button. The application will calculate the prime factors of the number and display the results on the page.

## Contributing

Contributions to this project are welcome. If you find a bug or have a suggestion for improving the application, feel free to open an issue or submit a pull request.

## License

This project is licensed under the terms of the MIT license.# wasm-daw

## Team Members
Jose Cáceres, Ricardo Urvina, Sofía Villalobos.
