import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

module.exports = {
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svg.js",
    'globalVariables': "<rootDir>/globalVariables",
    'Contexts/UserContext': "<rootDir>/Contexts/UserContext",
    'Contexts/SongsPlayingContext': "<rootDir>/Contexts/SongsPlayingContext",
    'Utils/backEndUtils': "<rootDir>/Utils/backEndUtils",
    'Utils/userUtils': "<rootDir>/Utils/userUtils",
    'Utils/listOfSongsObj': "<rootDir>/Utils/listOfSongsObj",
    'Contexts/LayoutContext': "<rootDir>/Contexts/LayoutContext",
    'Utils/functionUtils': "<rootDir>/Utils/functionUtils",
    'Contexts/AllSongsContext': "<rootDir>/Contexts/AllSongsContext",

    
  },
  moduleDirectories: ["node_modules", "src"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
