import { Scanner } from "./Scanner";
import { Expr } from "./Expr";

let hadError = false;

/**
 * Runs the source code
 * @param {string} source
 */
function run(source) {
  const scanner = new Scanner(source);
  console.log(scanner.scanTokens());
}

/**
 * Reports an error
 * @param {number} line
 * @param {string} message
 */
export function loxError(line, message) {
  reportError(line, "", message);
}

/**
 * Reports an error
 * @param {number} line
 * @param {string} where
 * @param {string} message
 */
function reportError(line, where, message) {
  const error = `[line ${line}] Error ${where} : ${message}`;
  throw new Error(error);
}

/**
 * Thin wrapper around the run function
 * runs a prompt
 * @param {string} source
 */
function runPrompt(source) {
  if (hadError) throw new Error("Fatal Error : Aborting...");
  run(source);
  hadError = false;
}

// runs the repl
export function Lox() {
  runPrompt(`
    // this is a comment
    (()){}; // grouping stuffs
    !*+-/=<> <= == != >= // operators

    var a = 123;

  `);
}
