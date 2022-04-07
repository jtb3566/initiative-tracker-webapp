# Roll for Initiative...

## Description

This is a locally hosted webapp to help dungeon masters set up encounters and track initiative. 

Users can create persistent characters and encounters.

They can populate these encounters with created characters and monsters from the 5e SRD

## Dependencies

This app uses a locally hosted mySQL database to store character and encounter data.

The API for accessing this database can be found at [https://github.com/jtb3566/initiative-tracker-db](https://github.com/jtb3566/initiative-tracker-db)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Future Features

- health tracking on encounter participants
- marker for current turn and ability to cycle through turn order
- user login functionality to save user specific characters and encounters

## Current Issues

- Autocomplete field (id="newCharacter") in Encounter.js should clear field after clicking "add character" button

## Acknowledgements 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

D&D 5e monster stats provided by [D&D 5e API](https://www.dnd5eapi.co/)