import "reflect-metadata";
import * as TypeMoq from "typemoq";
import {IPlayerRepository, ISongRepository, IUserRepository} from "../../infrastructure/interfaces";
import {Player, Song, User} from "../entities";
import {PlayerService} from "./PlayerService";

let playerRepositoryMock = null;
let songRepositoryMock = null;
let userRepositoryMock = null;
let user = null;
let song = null;

describe("Player Service", () => {
  beforeEach(() => {
    songRepositoryMock = TypeMoq.Mock.ofType<ISongRepository<Song>>() as TypeMoq.IMock<ISongRepository<Song>>;
    userRepositoryMock = TypeMoq.Mock.ofType<IUserRepository<User>>() as TypeMoq.IMock<IUserRepository<User>>;
    playerRepositoryMock = TypeMoq.Mock.ofType<IPlayerRepository<Player>>() as TypeMoq.IMock<IPlayerRepository<Player>>;
  });
  describe("Audio Player Actions", () => {
    beforeEach(() => {
      user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      song = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      userRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => user);
      songRepositoryMock
        .setup(x => x.findOne(song.id))
        .returns(() => song);
    });
    it("should set selected song as playing", async () => {
      // given
      const player = new Player({
        userId: user.id,
        currentSongState: 'PLAYING',
        currentSongId: song.id,
      });

      playerRepositoryMock
        .setup(x => x.update(user.id, player));
      playerRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => player);

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.play(user, song);
      // then
      expect(got.currentSong).toEqual(song);
      expect(got.currentSongId).toEqual("9448d63c-b679-4b19-a292-24027b0f354c");
      expect(got.currentSongState).toEqual('PLAYING');
    });
    it("should set current song as paused", async () => {
      // given
      const player = new Player({
        userId: user.id,
        currentSongState: 'PAUSED',
        currentSongId: song.id,
      });

      playerRepositoryMock
        .setup(x => x.update(user.id, player));
      playerRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => player);

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.pause(user, song);
      // then
      expect(got.currentSong).toEqual(song);
      expect(got.currentSongId).toEqual("9448d63c-b679-4b19-a292-24027b0f354c");
      expect(got.currentSongState).toEqual('PAUSED');
    });
    it("should set current song as stopped", async () => {
      // given
      const player = new Player({
        userId: user.id,
        currentSongState: 'STOPPED',
        currentSongId: song.id,
      });

      playerRepositoryMock
        .setup(x => x.update(user.id, player));
      playerRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => player);

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.stop(user, song);
      // then
      expect(got.currentSong).toEqual(song);
      expect(got.currentSongId).toEqual("9448d63c-b679-4b19-a292-24027b0f354c");
      expect(got.currentSongState).toEqual('STOPPED');
    });
  });
  describe("Audio Player Actions - user cannot be found", () => {
    beforeEach(() => {
      user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      song = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      userRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => undefined);
    });
    it("should throw error when Play-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.play(user, song))
        .rejects
        .toThrow("User cannot be identified!");
    });
    it("should throw error when Pause-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.pause(user, song))
        .rejects
        .toThrow("User cannot be identified!");
    });
    it("should throw error when Stop-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.stop(user, song))
        .rejects
        .toThrow("User cannot be identified!");
    });
  });
  describe("Audio Player Actions - song cannot be found", () => {
    beforeEach(() => {
      user = new User({
        id: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        email: "test.user1@example.com",
        name: "Test User1"
      });
      song = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      userRepositoryMock
        .setup(x => x.findOne(user.id))
        .returns(() => user);
      songRepositoryMock
        .setup(x => x.findOne(song.id))
        .returns(() => undefined);
    });
    it("should throw error when Play-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.play(user, song))
        .rejects
        .toThrow("Cannot find requested song!");
    });
    it("should throw error when Pause-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.pause(user, song))
        .rejects
        .toThrow("Cannot find requested song!");
    });
    it("should throw error when Stop-ing a song", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.stop(user, song))
        .rejects
        .toThrow("Cannot find requested song!");
    });
  });
  describe("getPlayer", () => {
    it("should return current audio player state with song entity attached", async () => {
      // given
      const userId = "1";
      const song1 = new Song({
        id: "9448d63c-b679-4b19-a292-24027b0f354c",
        album: "Amoeba",
        artist: "Head Vs. Wall",
        duration: 0,
        genre: "Psych-Folk, Space-Rock, Instrumental",
        track: "Amoeba",
        url: "https://s3.eu-west-1.amazonaws.com/dd-public-sounds/H_-_07_-_Amoeba.mp3?response-content-disposition=inline&X-Amz-Security-Token=FQoGZXIvYXdzEAQaDKiosnY8CCqMi2kd2iK4A2IuHGNC7csQajUkqfmdIt5xVZmU9Av7Jksk80RVWWMo4LETAsghL9EbyNhA4XhlV%2FsmFNFpfzfsxNMoQXsOniEEuYfLxa4Avn6he5QWGgXn09qS%2BbCyxRp8nk5215F7qMGTreZFgh1uSJDeqFpDYzsqOQUEOtOn%2Bm7%2FVoyGqyPe4WfIvsuebPUKWHNIMxfB6sHBENbpes6dSg2WabIR5C6HXJeOC0jaAgf0v82c5MqZPQjGd1grjGHRnHSZOvrWzGlemMz%2BclMtMTTfcZ7cd%2B%2BI74qMnTV%2BUacZ3s7Ze6JAG4qFUOJRF5durddiK7B6knyF09P0NIwvzg5LI7smNhbvIXDU%2FXLzgVp5nTL1JFr%2B4rj%2BQg%2BHFs3zt0ezL%2Ftljy9M1bO0JiMzzkQYyB23gNueCniQmfJ7HFzg%2FB3RcOpN%2B0C%2FTEAlihXzb25QeuTIQ20RhEhNqyr31k1bNi6AyA3Il0SSGDndoPN5g0p2NSKmiQvZfvJ8uIAC9d95vBVkY1qXqdTxVuSN1VQISljiQcIqdSa%2FCBb8Q6ghKqsJ1ZuE%2FAo7V6kJC7Wx%2FsBrUvSqodAfaW5RGbUzKMSMveIF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190128T183221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3LR2QIXVNUZVWYOZ%2F20190128%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a4b15765f7a7690416b7f60a82863b888d0bb8047bca56444765870525682ecd"
      });
      const currentSongState = 'PLAYING';

      playerRepositoryMock
        .setup(x => x.findOne(userId))
        .returns(() => new Player({userId, currentSongId: song1.id, currentSongState}));
      songRepositoryMock
        .setup(x => x.findOne(song1.id))
        .returns(() => song1);

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.getPlayer(userId);
      // then
      expect(got.currentSongId).toEqual(song1.id);
      expect(got.currentSong).toEqual(song1);
      expect(got.currentSongState).toEqual(currentSongState);
    });
    it("should return player with currentSong null if no currentSongId is set", async () => {
      // given
      const userId = "1";

      playerRepositoryMock
        .setup(x => x.findOne(userId))
        .returns(() => new Player({userId}));

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.getPlayer(userId);
      // then
      expect(got.currentSongId).toEqual(null);
      expect(got.currentSong).toEqual(null);
    });
    it("should always return a valid player", async () => {
      // given
      const userId = "1";

      playerRepositoryMock
        .setup(x => x.findOne(userId))
        .returns(() => null);
      playerRepositoryMock
        .setup(x => x.create(new Player({userId})));
      playerRepositoryMock
        .setup(x => x.findOne(userId))
        .returns(() => new Player({userId}));

      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.getPlayer(userId);
      // then
      expect(got).toEqual(new Player({userId}));
    });
    it("throws exception if userId is null", async () => {
      // given
      const userId = null;
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      // then
      await expect(playerService.getPlayer(userId))
        .rejects
        .toThrow("An audio player instance depends on userId, it cannot be null!");
    });
  });
  describe("List all playing", () => {
    it("#todo", async () => {
      // given
      const playerService = new PlayerService(
        songRepositoryMock.object,
        userRepositoryMock.object,
        playerRepositoryMock.object
      );
      // when
      const got = await playerService.listPlaying();
      // then
      expect(got).toEqual(undefined);
    });
  });
});
