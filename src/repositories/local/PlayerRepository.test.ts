import "reflect-metadata";
import {Player} from "../../model/entities";
import {PlayerRepository} from "./PlayerRepository";

const playerRepository = new PlayerRepository();

describe("Player Repository", () => {
  beforeEach(()=> {
    playerRepository.playerList = [];
  });
  describe("Retrieve a player from storage by user uuid", () => {
    it("returns a valid player when player in storage", async () => {
      // given
      const player = new Player({
          userId: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
        });
      playerRepository.playerList = [player];
      // when
      const got = await playerRepository.findOne(player.userId);
      // then
      expect(got).toEqual(player);
    });
    it("returns undefined if storage is empty", async () => {
      // given
      const player = new Player({
        userId: "bf1c16d5-118c-4ac4-9743-0df21ed29773",
      });
      // when
      const got = await playerRepository.findOne(player.userId);
      // then
      expect(got).toEqual(undefined);
    });
    it("returns undefined if there are no players in storage for the specified user id", async () => {
      // given
      const player = new Player({
        userId: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c",
        currentSongId: "cc8dfc03-8f9b-49f3-b6c5-9bc9c9ed59d8",
        currentSongState: 'PLAYING',
      });
      playerRepository.playerList = [player];
      // when
      const got = await playerRepository.findOne(player.userId);
      // then
      expect(got).toEqual(player);
    });
  });
  describe("Update Player", () => {
    it("update player current state", async () => {
      // given
      const player = new Player({
        userId: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c",
      });
      playerRepository.playerList = [player];
      const updatedPlayer = new Player({
        userId: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c",
        currentSongId: "cc8dfc03-8f9b-49f3-b6c5-9bc9c9ed59d8",
        currentSongState: 'PLAYING',
      });
      // when
      const got = await playerRepository.update(updatedPlayer.userId, updatedPlayer);
      // then
      expect(got).toEqual(true);
      expect(playerRepository.playerList).toEqual([updatedPlayer]);
    });
  });
  describe("Retrieve list of players from storage", () => {
    it("Returns all valid audio players currently in storage", async () => {
      // given
      const players = [
        new Player({
          userId: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c",
          currentSongId: "cc8dfc03-8f9b-49f3-b6c5-9bc9c9ed59d8",
          currentSongState: 'PLAYING',
        })
      ];
      playerRepository.playerList = players;
      // when
      const got = await playerRepository.find();
      // then
      expect(got).toEqual(players);
    });
    it("Returns empty array when no players in storage", async () => {
      // given
      // when
      const got = await playerRepository.find();
      // then
      expect(got).toEqual([]);
    });
  });
  describe("Create a new player for user", () => {
    it("add player to storage", async () => {
      // given
      const player = new Player({
        userId: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c",
      });
      // when
      const got = await playerRepository.create(player);
      // then
      expect(got).toEqual(true);
      expect(playerRepository.playerList).toEqual([player]);
    });
  });
});
