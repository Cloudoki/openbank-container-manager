# openbank-container-manager

- [Installation](#Installation)
	- [Pre-requisites](#Pre-requisites)
- [Development](#Development)
	- [How to use the scripts](#How-to-use-the-scripts)
- [Before a release](#Before-a-pull-request-/-a-release)
	- [Clean the dependencies and audit the packages](#Clean-the-dependencies-and-audit-the-packages)
	- [Update the version](#Update-the-version)

## Installation

### Pre-requisites
Go to your project root folder and get the dependencies
```
git clone git@github.com:Cloudoki/openbank-container-manager.git
cd openbank-container-manager/
yarn // or npm install
```

> On MacOS, if `yarn` failed, you might need to update the active developer directory manager

For that, run

	xcode-select --install

## Development
### How to use the scripts

`yarn <script>` or `npm run <script>` | Description
--------------------------------------|----------------------------
`start`																| Starts the server
`lint`																| Runs the linter
`test`																| Runs the unit tests with `lab`
`doc`																	| Generates the api documentation accessible at http://localhost:3000/info/jsdoc
`release <options: major|minor|patch>`| Creates a new release tag with options and updates the `CHANGELOG.md`

## Before a pull request / a release

### Clean the dependencies and audit the packages

Test the audit for **at least** `yarn` to make sure the dependencies are proper.
```
rm yarn.lock // or rm package-lock.json
rm -rf node_modules
yarn // or npm i
yarn audit // npm audit
```

> Note that `npm i` would also run the audit after installing the dependencies

### Update the version

Increase the project `version` and update the `CHANGELOG`
```
yarn release // or npm run release
git push --follow-tags
```
This will execute the script
```
  "scripts": {
	...
    "release": "standard-version"
  },
```
