# Root Code Kata

[![NPM version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list)

To solve the problem of taking an input file of data, and processing it to give the desired output.

## Getting Started

To keep it simple, I chose JavaScript (utilizing node, npm, es6, and webpack). The code takes an input text file to generate the output in the command line - in my example, the data file is present in `src/data` and output in `build/`. 

### What it needed to handle
We needed to pay attention for two Commands: Driver & Trip (in this example, they appear as the first word).

**Driver** registers a Driver

**Trip**  registers an associated trip

For generating the data, we needed to discard any trips that average a speed of less than 5 mph or greater than 100 mph - this was simple JavaScript to verify the speed met our range.

### Prerequisites

The code was written utilizing `node v11.6.0` and `npm v6.5.0-next.0`, under the assumption that these versions would match what is on the production server they would be executed on. The _need_ for these versions is highlighted by the use of `async`/`await` - it will [fail on node versions earlier than](https://www.infoq.com/news/2017/02/node-76-async-await/) `v7.6`.


### Installing

Once this has been unbundled/untarballed/cloned from the main repository, you follow the standard steps to install from the `package.json`:
```
npm install // npm i for shorthand
```
Once completed, you can compile the code to the `build` directory:
```
webpack
```
or alternatively:
```
npm run build
```

Inside the `build` directory, we can execute against the example `data.txt`:
```
cd build/ && node main.js data.txt
```

## Running the tests

This project utilizes `jest`, to run unit tests, so testing is called:
```
jest
```
or alternatively:
```
npm run test
```

### Built With:

* Macbook Pro
* [VSCode](https://code.visualstudio.com/) - I converted from Sublime Text.
* [NVM](https://github.com/creationix/nvm) - Node Version Manager, to allow multiple versions of node to be installed.
* [Webpack](https://webpack.js.org/) - handles the build.
* [Jest](https://jestjs.io/) - for unit testing (I primarilly use Jasmine, but this was a fun test to compare).

## Final Write-up:

I develop primarilly on mac - Windows is coming along with `bash` being included, but Mac still is the easiest to test Windows and Apple browsers (and compiling iOS apps).

I utilize `nvm` ([node version manager](https://github.com/creationix/nvm) on my machines so I can switch node versions more easily, to avoid the issue of "this project needed node `v6.9.1`, but other code is more modern and needs to be updated to a stable branch."

[Webpack](https://webpack.js.org/) was chosen to quickly spin up the output of JavaScript (combined with a little configuration to copy the data file, and compress the JavaScript). es6 was utilized to use "the latest and greatest" of writing shorthand JS, which we then utilize babel to transpile it.

UnitTests were written in [Jest](https://jestjs.io/) - including utilizing some snapshots, and I didn't hit 100% coverage. This is a topic developers can wax philosophically about, depending on the rigidity of your tests where every line is covered, or are use-case driven. I played around with TDD at first, but lost track of myself and ended up with some tests focused on the actual task at hand (wanting the data sorted a certain way, whereas the function was written to be more flexible). In going through the tests, I could've written more false checks to handle the "bad" scenarios, but I aimed for hitting the main "happy path" and likely error ("you didn't pass a file", for example). SnapShots were used to help generate the main object for comparison so if the object updates, we can compare them to the original object. I did not cover the `request.js` as it is code node code - if `fs` fails, or `new Promise` fails at this level of the module, it would indicate a bigger problem (possibly an incorrect node version if someone overrides the `package.json`) that unit testing "core code works like core code should."

i.e. you wouldn't utilize jQuery and then write unit tests to be sure jQuery works - if jQuery isn't present, that test just fail spectacularly to highlight "there's a bigger problem here" (personal opinions of usage of jQuery set aside, mind you).