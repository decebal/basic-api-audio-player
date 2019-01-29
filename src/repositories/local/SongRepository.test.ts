import "reflect-metadata";
import {Song} from "../../model/entities";
import {SongRepository} from "./SongRepository";

const songRepository = new SongRepository();
describe("Song Repository", () => {
  beforeEach(() => {
    songRepository.songList = [];
  });
  describe("Retrieve a song from storage by id", () => {
    it("returns a valid Song entity when present in storage with same id", async () => {
      // given
      const song = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      songRepository.songList = [
        song
      ];
      // when
      const got = await songRepository.findOne(song.id);
      // then
      expect(got).toEqual(song);
    });
    it("returns undefined when there are no songs with the specified uuid in storage", async () => {
      // given
      songRepository.songList = [
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        })
      ];
      // when
      const got = await songRepository.findOne("7448d63c-b679-4b19-a292-24027b0f354c");
      // then
      expect(got).toEqual(undefined);
    });
    it("returns undefined when there are no songs in storage", async () => {
      // given
      // when
      const got = await songRepository.findOne("9448d63c-b679-4b19-a292-24027b0f354c");
      // then
      expect(got).toEqual(undefined);
    });
  });
  describe("Store a new song", () => {
    it("add song successfully to storage", async () => {
      // given
      const song = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      // when
      const got = await songRepository.create(song);
      // then
      expect(songRepository.songList).toEqual([song]);
      expect(got).toEqual(true);
    });
  });
  describe("Retrieve all songs from storage", () => {
    it("returns the list of valid song entities", async () => {
      // given
      const songs = [
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        })
      ];
      songRepository.songList = songs;
      // when
      const got = await songRepository.find();
      // then
      expect(got).toEqual(songs);
    });
    it("returns an empty array when no songs in storage", async () => {
      // given
      // when
      const got = await songRepository.find();
      // then
      expect(got).toEqual([]);
    });
  });
  describe("Retrieve total number of songs", () => {
    it("returns 0 for no songs", async () => {
      // given
      // when
      const got = await songRepository.total();
      // then
      expect(got).toBe(0);
    });
    it("returns 1 when just one song in storage", async () => {
      // given
      songRepository.songList = [
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        })
      ];
      // when
      const got = await songRepository.total();
      // then
      expect(got).toBe(1);
    });
    it("returns 10 when 10 songs in storage", async () => {
      // given
      songRepository.songList = [
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }),
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }),
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }),
        new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        }), new Song({
          id: "9448d63c-b679-4b19-a292-24027b0f354c",
          album: "Amoeba",
          artist: "Head Vs. Wall",
          duration: 0,
          genre: "Psych-Folk, Space-Rock, Instrumental",
          track: "Amoeba",
          url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
        })
      ];
      // when
      const got = await songRepository.total();
      // then
      expect(got).toBe(10);
    });
  });
});
