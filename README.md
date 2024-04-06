# Automatonia
A web-app for creating cellular automata

I am currently playing around with ideas on how to create a visual interface for creating cellular automata. I want to draw from some of the amazing work done over at https://github.com/TodePond/CellPond, but there are a few features of that web-app that I don't care to have in mind and some features missing from CellPond that I want mine to have.

Particularly, CellPond is really good for creating fairly simple direction cellular automata. There are tools to create visual rules and then those rules can be given rotational symmetry, vertical symmetry, and/or horizontal symmetry. The rules can also be given a set chance of occuring. However, if one were to try and create Conway's Game of Life (which is currently what I have this version of Automatonia programmed for), it would be quite verbose in terms of rules needed. The [Elementary Cellular Automaton](https://mathworld.wolfram.com/ElementaryCellularAutomaton.html) for instance is defined by 8 rules. In order to create rules for Conway's Game of Life, where a neighborhood is made up of 9 cells, we would need (I believe, I'm not checking my math right now) 512 rules (ignoring of course, any symmetric rules).

Some requirements I want Automatonia to have:

- We need to be able to make a wide variety of automata
- Automata must be able to have any number of states (or possibly capped to a reasonable number such as 8)
- We need to be able to create complex automata with few rules
- We must be able to create rules visually
