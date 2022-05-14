#!/usr/bin/env runhaskell
import Text.Pandoc.JSON

main :: IO ()
main = toJSONFilter underline

-- This function replaces all occurrences of the string "____" with "<u>TEXT</u>"
