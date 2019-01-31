import {ApolloServer, gql} from "apollo-server-koa";
import {createTestClient} from 'apollo-server-testing';
import {importSchema} from "graphql-import";
import {makeExecutableSchema} from "graphql-tools";
import * as path from "path";

const testServer = (resolvers) => {
  const typeDefs = importSchema(path.join(__dirname, "./model/schema/schema.graphql"));

  const schema = makeExecutableSchema({
    allowUndefinedInResolve: false, // optional
    inheritResolversFromInterfaces: false,  // optional
    parseOptions: {},  // optional
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    }, // optional
    resolvers, // optional
    typeDefs,
  });

  const server = new ApolloServer({
    schema,
    context: () => ({user: {id: "bf1c16d5-118c-4ac4-9743-0df21ed29773"}}),
    formatError: error => {
      // noinspection TsLint
      console.log(JSON.stringify(error));
      return error;
    },
  });

  return createTestClient(server);
};

describe("App Integration Tests", () => {
  describe("Retrieve a non-empty list of songs", () => {
    it("Ideal case: a list of songs is retrieved", async () => {
      // given
      const GET_SONGS = gql`
        query getSongs {
          songs {
            edges {
              node {
                id
                url
                track            
              }
              cursor
            }
            totalCount
          }
        }
      `;
      const resolvers = {
        Query: {
          songs: async () => {
            return {
              "edges": [
                {
                  "cursor": "Y29ubmVjdGlvbl9wcmVmaXg6OTQ0OGQ2M2MtYjY3OS00YjE5LWEyOTItMjQwMjdiMGYzNTRj",
                  "node": {
                    "id": "9448d63c-b679-4b19-a292-24027b0f354c",
                    "track": "Amoeba",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd",
                  },
                },
                {
                  "cursor": "Y29ubmVjdGlvbl9wcmVmaXg6OWFkNjU1ZmUtN2ZhMC00YWZhLWEzYTAtZGQ3YTM0ZWQyYzEw",
                  "node": {
                    "id": "9ad655fe-7fa0-4afa-a3a0-dd7a34ed2c10",
                    "track": "Carlotta",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/Head_Vs_Wall_-_04_-_Carlotta.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=6e08f157b5c985956d4b5e3b1bf7895331f51bb82771affe45cc5ad1736c733b",
                  },
                },
                {
                  "cursor": "Y29ubmVjdGlvbl9wcmVmaXg6ZDdhODNkMGUtMDcyZC00MTM1LTg4NjUtMzY0OTllODYxZGUx",
                  "node": {
                    "id": "d7a83d0e-072d-4135-8865-36499e861de1",
                    "track": "Into Hyperspace",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/Astrometrics_-_01_-_Into_Hyperspace.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=d2d6e5b81b16a239b08e007ce18d278662155503b3b0393785477d0d130a5a71",
                  },
                },
                {
                  "cursor": "Y29ubmVjdGlvbl9wcmVmaXg6Y2M4ZGZjMDMtOGY5Yi00OWYzLWI2YzUtOWJjOWM5ZWQ1OWQ4",
                  "node": {
                    "id": "cc8dfc03-8f9b-49f3-b6c5-9bc9c9ed59d8",
                    "track": "Trought the Day (ID 952)",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/Lobo_Loco_-_06_-_Trought_the_Day_ID_952.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a5cf631fdcec52aa324a2dad73a66cc0bc8c863b4a19bdc34617fdc49f37d29d",
                  },
                },
              ],
              "totalCount": 4,
            };
          },
        }
      };
      const {query} = testServer(resolvers);
      // when
      const got = await query({
        query: GET_SONGS
      });
      // then
      expect(got).toMatchSnapshot();
    });
    it("Ideal case: a list of empty songs is returned in specific format", async () => {
      // given
      const GET_SONGS = gql`
        query getSongs {
          songs {
            edges {
              node {
                id
                url
                track            
              }
              cursor
            }
            totalCount
          }
        }
      `;
      const resolvers = {
        Query: {
          songs: async () => {
            return {edges: [], totalCount: 0};
          },
        }
      };
      const {query} = testServer(resolvers);
      // when
      const got = await query({
        query: GET_SONGS
      });
      // then
      expect(got).toMatchSnapshot();
    });
  });
  describe("Songs can be Played/Paused/Stopped", () => {
    describe("Song can be played", () => {
      it("Ideal case: Song can be played", async () => {
        // given
        const PLAY_SONG = gql`
        mutation playSong {
          PlaySong(input:{
            id:"9448d63c-b679-4b19-a292-24027b0f354c",
            clientMutationId: "T"
          }) {
            clientMutationId
            player{
              currentSongState
              currentSong{
                id
                url
                track
                artist
                album
                genre
              }
            }
          }
        }
      `;
        const resolvers = {
          Mutation: {
            PlaySong: async () => {
              return {
                "clientMutationId": "T",
                "player": {
                  "currentSongState": "PLAYING",
                  "currentSong": {
                    "id": "9448d63c-b679-4b19-a292-24027b0f354c",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd",
                    "track": "Amoeba",
                    "artist": "Head Vs. Wall",
                    "album": "Amoeba",
                    "genre": "Psych-Folk, Space-Rock, Instrumental"
                  }
                }
              };
            },
          }
        };
        const {mutate} = testServer(resolvers);
        // when
        const got = await mutate({
          query: PLAY_SONG
        });
        // then
        expect(got).toMatchSnapshot();
      });
    });
    describe("Song can be paused", () => {
      it("Ideal case: Song can be paused", async () => {
        // given
        const PAUSE_SONG = gql`
        mutation pauseSong {
          PauseSong(input:{
            id:"9448d63c-b679-4b19-a292-24027b0f354c",
            clientMutationId: "T"
          }) {
            clientMutationId
            player{
              currentSongState
              currentSong{
                id
                url
                track
                artist
                album
                genre
              }
            }
          }
        }
      `;
        const resolvers = {
          Mutation: {
            PauseSong: async () => {
              return {
                "clientMutationId": "T",
                "player": {
                  "currentSongState": "PAUSED",
                  "currentSong": {
                    "id": "9448d63c-b679-4b19-a292-24027b0f354c",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd",
                    "track": "Amoeba",
                    "artist": "Head Vs. Wall",
                    "album": "Amoeba",
                    "genre": "Psych-Folk, Space-Rock, Instrumental"
                  }
                }
              };
            },
          }
        };
        const {mutate} = testServer(resolvers);
        // when
        const got = await mutate({
          query: PAUSE_SONG
        });
        // then
        expect(got).toMatchSnapshot();
      });
    });
    describe("Song can be stopped", () => {
      it("Ideal case: Song can be stopped", async () => {
        // given
        const STOP_SONG = gql`
        mutation stopSong {
          StopSong(input:{
            id:"9448d63c-b679-4b19-a292-24027b0f354c",
            clientMutationId: "T"
          }) {
            clientMutationId
            player{
              currentSongState
              currentSong{
                id
                url
                track
                artist
                album
                genre
              }
            }
          }
        }
      `;
        const resolvers = {
          Mutation: {
            StopSong: async () => {
              return {
                "clientMutationId": "T",
                "player": {
                  "currentSongState": "STOPPED",
                  "currentSong": {
                    "id": "9448d63c-b679-4b19-a292-24027b0f354c",
                    "url": "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd",
                    "track": "Amoeba",
                    "artist": "Head Vs. Wall",
                    "album": "Amoeba",
                    "genre": "Psych-Folk, Space-Rock, Instrumental"
                  }
                }
              };
            },
          }
        };
        const {mutate} = testServer(resolvers);
        // when
        const got = await mutate({
          query: STOP_SONG
        });
        // then
        expect(got).toMatchSnapshot();
      });
    });
  });
  describe("Songs are stored/retrieved from some network storage (S3)", () => {
    it("#todo", async () => {
      // given
      // when
      // then
    });
  });
  describe("Metadata could be fetched from some external API instead of being statically stored in a JSON file.", () => {
    it("#todo", async () => {
      // given
      // when
      // then
    });
  });
  describe("Usage of websockets in order to implement some live information on what other users are listening", () => {
    it("#todo", async () => {
      // given
      // when
      // then
    });
  });
});
