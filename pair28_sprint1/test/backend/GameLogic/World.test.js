import {parse_world} from "../../../backend/GameLogic/World.js";

describe("World class", function() {
    describe('error_handling', () => {
        it("should detect less then 3 lines", () => {
          const world_file_data = "1\n2";
          expect(() => {parse_world(world_file_data)}).toThrowError("World file must have at least 3 lines");
        });
        it("should detect value out of legal", () => {
          const world_file_data = "4\n4\n# # # #\n# . + #\n# - a #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("Value out of legal");
        });
        it("should detect invalid height value", () => {
          const world_file_data = "-4\n4\n# # # #\n# . + #\n# - a #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("Height and width must be greater than 0");
        });
        it("should detect invalid width value", () => {
          const world_file_data = "4\n0\n# #";
          expect(() => {parse_world(world_file_data)}).toThrowError("Height and width must be greater than 0");
        });
        it("should detect invalid height dimension", () => {
          const world_file_data = "4\n2\n# #";
          expect(() => {parse_world(world_file_data)}).toThrowError("The field does not correspond to the indicated dimensions");
        });
        it("should detect invalid width dimension", () => {
          const world_file_data = "1\n5\n# #";
          expect(() => {parse_world(world_file_data)}).toThrowError("The field does not correspond to the indicated dimensions");
        });
        it('should detect invalid dimensions', () => {
          const world_file_data = "10\n10\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("The field does not correspond to the indicated dimensions");
        })
        it('should detect missing red swarm', () => {
          const world_file_data = "4\n4\n# # # #\n# . . #\n# - . #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("One of the bug swarms is missing");
        });
        it('should detect missing black swarm', () => {
          const world_file_data = "4\n4\n# # # #\n# + . #\n# . . #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("One of the bug swarms is missing");
        });
        it('should detect missing corner border', () => {
          const world_file_data = "4\n4\n# # # #\n# + . #\n# . - #\n# # # .";
          expect(() => {parse_world(world_file_data)}).toThrowError("There is no outer border");
        });
        it('should detect missing right border', () => {
          const world_file_data = "4\n4\n# # # #\n# + . .\n# . - #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("There is no outer border");
        });
        it('should detect missing left border', () => {
          const world_file_data = "4\n4\n# # # #\n# + . #\n. . - #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("There is no outer border");
        });
        it('should detect missing bottom border', () => {
          const world_file_data = "4\n4\n# # # #\n# + . #\n# . - #\n# 1 # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("There is no outer border");
        });
        it('should detect missing upper border', () => {
          const world_file_data = "4\n4\n# + # #\n# + . #\n# . - #\n# # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("There is no outer border");
        });
        it('should detect red swarm is not linked', () => {
          const world_file_data = "6\n6\n# # # # # #\n# + . + . #\n# . . 1 . #\n# 2 . . - #\n# 9 . - - #\n# # # # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("Swarm have to be linked");
        });
        it('should detect black swarm is not linked', () => {
          const world_file_data = "6\n6\n# # # # # #\n# + . + . #\n# + + . . #\n# 2 . . - #\n# - . . - #\n# # # # # #";
          expect(() => {parse_world(world_file_data)}).toThrowError("Swarm have to be linked");
        });
      });
});