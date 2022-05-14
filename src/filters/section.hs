#!/usr/bin/env runhaskell
import Text.Pandoc.JSON

main :: IO ()
main = toJSONFilter section

section :: Block -> Block
section (Para ins) = Para (map (replace "Section" "TEST") ins)
section x = x
